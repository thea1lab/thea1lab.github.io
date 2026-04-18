---
title: "Arquiteturas de RAG: como escolher para o seu caso"
slug: "arquiteturas-rag-e-como-escolher"
date: 2026-04-02T00:15:00-03:00
author: Claudio Scheer
image_webp: images/blog/rag-architectures-and-how-to-choose/about.webp
image: images/blog/rag-architectures-and-how-to-choose/about.jpg
description : "RAG vanilla, híbrido, com re-ranking, hierárquico (PageIndex), grafo, agentic e contextual, com um guia rápido para escolher o que serve aos seus documentos."
subtitle: "Chunk-e-embed é uma opção. Não é a única."
images:
  - images/blog/rag-architectures-and-how-to-choose/about.jpg
tags:
  - ai
  - rag
cluster: rag
draft: false
---

Se você está escolhendo como montar busca com IA em documentos reais, este guia encurta o caminho: mostra quando usar cada arquitetura de RAG e evita que você perca tempo com abordagens que funcionam só na demo.

RAG não é uma arquitetura única. É uma família com trade-offs diferentes, e escolher errado é exatamente o que faz muita feature parecer boa na demo e falhar em produção.

O ponto de partida costuma ser o pipeline ingênuo: picar os documentos em chunks, gerar embeddings dos chunks, gerar o embedding da pergunta do usuário, retornar os cinco mais parecidos e colar no prompt. Funciona para FAQ e textos de produto. Quebra em qualquer coisa longa, técnica ou estruturada, e a maioria dos times passa semanas ajustando o tamanho do chunk antes de aceitar que o tamanho do chunk nunca foi o problema.

Este artigo cobre as variantes de RAG que valem a pena conhecer em 2026, o que cada uma faz bem e um guia curto no final para escolher de acordo com o formato dos seus documentos e das suas perguntas.

### O baseline: RAG vanilla

O RAG vanilla é o pipeline descrito acima. Um modelo de embedding, um vector store, similaridade por cosseno, top-k, pronto.

Funciona bem quando os documentos são curtos, autocontidos e escritos no mesmo vocabulário que os usuários digitam. Artigos de central de ajuda, descrições de produto, histórico dentro de uma mesma conversa.

Quebra em três situações comuns:

- **Documentos longos.** Um contrato de 200 páginas picado em janelas de 800 tokens perde todo o contexto que dava sentido a cada parágrafo.
- **Descasamento de vocabulário.** O usuário digita "posso colocar isso no reembolso", o documento fala em "despesas reembolsáveis de viagem". Modelos de embedding resolvem parte disso, não tudo.
- **Entidades nomeadas.** Se a resposta depende de um número de nota fiscal específico, SKU de produto ou código de erro, a busca vetorial é genuinamente ruim. Embeddings borram correspondências exatas.

Se você já colocou RAG vanilla em produção e a recuperação parece "quase certa, errada justamente nas perguntas que importam", o problema quase nunca é o tamanho do chunk. O problema é que RAG vanilla é a ferramenta errada para essas perguntas.

### Busca híbrida

A busca híbrida roda dois recuperadores em paralelo: um índice clássico de palavras-chave (BM25) e um índice vetorial. Os dois devolvem listas ranqueadas. Você funde as listas, geralmente com reciprocal rank fusion, e manda o top-k combinado para o LLM.

Parece chato. Não é. BM25 acerta correspondências exatas em códigos, IDs, acrônimos e nomes de produto, que é exatamente onde a busca vetorial é mais fraca. A busca vetorial lida bem com sinônimos e paráfrases, que é onde o BM25 é mais fraco. Juntos, um cobre o ponto cego do outro.

O reciprocal rank fusion cabe em uma linha: para cada documento, a pontuação é a soma de `1 / (k + posição)` entre todos os recuperadores que o devolveram, com `k` normalmente em 60. Sem ajustes, sem pesos para balancear, e funciona.

Se o seu corpus tem qualquer coisa que um humano copiaria e colaria literalmente (número de pedido, part number, ticker, citação jurídica), híbrido é o piso, não um upgrade.

### Re-ranking

A recuperação tem duas etapas e a maior parte dos times só implementa a primeira. A etapa um é rápida e aproximada: trazer 50 ou 100 candidatos depressa. A etapa dois é cara e precisa: pegar esses candidatos e pontuar cada um em relação à pergunta com um cross-encoder, ficando só com os cinco melhores.

O cross-encoder vê a pergunta e o documento juntos, então consegue pesar um contra o outro de verdade, em vez de depender de dois vetores calculados separadamente. Custa mais por consulta, mas você paga por 50 pares, não pelo corpus inteiro.

Opções gerenciadas como Cohere Rerank entram num pipeline existente em poucas linhas. Modelos abertos como o `bge-reranker-v2-m3` rodam em uma GPU só e são bons o suficiente para a maioria dos casos.

Na nossa experiência, re-ranking é a mudança mais barata com o maior salto de qualidade. Se você fizer só uma coisa depois do RAG vanilla, faça essa.

### RAG hierárquico, baseado em raciocínio (PageIndex)

Tudo acima continua assumindo que você quer achar o chunk certo. Para documentos longos e estruturados, essa suposição está errada. O que você quer é achar a **seção** certa e ler a partir dali.

O [PageIndex](https://github.com/VectifyAI/PageIndex) leva isso a sério. Em vez de gerar embeddings dos chunks, ele monta uma árvore que espelha a estrutura do próprio documento, algo próximo de um sumário, e deixa o LLM caminhar pela árvore até a seção relevante. Sem embeddings. Sem chunking. Sem banco vetorial. O time formula assim: "similaridade não é relevância". Em documentos longos, eles estão certos. O que você precisa de uma recuperação sobre um 10-K ou sobre uma regulamentação é raciocínio sobre onde a resposta mora, não uma pontuação de cosseno.

A abordagem foi pensada para documentos que já têm estrutura: relatórios financeiros, contratos, documentos regulatórios, artigos acadêmicos, manuais técnicos. Eles reportam 98,7% de acurácia no FinanceBench, bem acima do RAG vetorial no mesmo benchmark. E as decisões de recuperação ficam rastreáveis, porque o LLM nomeia as seções pelas quais passou até chegar à resposta.

Se o seu produto responde perguntas sobre documentos formais longos, essa é a arquitetura para avaliar primeiro, não por último.

### Graph RAG

Às vezes a resposta não está em nenhum chunk, seção ou documento. Ela depende de uma conexão: quais clientes compraram o produto A e abriram um chamado sobre o produto B no último trimestre, quais autores citaram este artigo e também publicaram sobre aquele tópico, quais funcionários se reportam a alguém que aprovou determinada política.

Graph RAG lida com esse formato. Você extrai entidades e relacionamentos do corpus para um grafo de conhecimento, e a recuperação percorre arestas em vez de calcular similaridade. Para perguntas com cara de join, esse é o modelo certo.

O [GraphRAG da Microsoft](https://github.com/microsoft/graphrag) é a implementação de referência por onde começar. Ele também gera "resumos de comunidade" que permitem responder perguntas amplas sobre todo o corpus ("quais são os principais temas") que nenhum recuperador por chunks responde bem, porque nenhum chunk sozinho contém a resposta.

Graph RAG tem custos reais: a extração de entidades é uma conta de LLM na entrada, o grafo precisa ser mantido em sincronia com os documentos de origem e a parte de consulta é mais difícil de ajustar. Use quando as perguntas exigirem de fato. Se ninguém está fazendo perguntas de conexão, você não precisa de grafo.

### Agentic RAG

Agentic RAG transforma a recuperação em loop, em vez de uma única etapa. O LLM recebe uma ferramenta de busca e decide quando chamá-la, com qual consulta, quantas vezes e quando já tem informação suficiente para responder.

É o padrão para perguntas multi-hop, em que a resposta é montada a partir de várias consultas que dependem umas das outras. "Ache a subsidiária, depois o CEO dela, depois os outros conselhos em que esse CEO participa" são três recuperações, e a segunda consulta só dá para escrever depois que a primeira volta.

O trade-off é latência e custo. Uma chamada de recuperação vira cinco. Para assistentes de pesquisa, ferramentas de due diligence e qualquer coisa que se comporte mais como analista do que como caixa de busca, isso é aceitável. Para um chatbot que precisa responder em menos de dois segundos, não é.

Tool calling dos provedores principais já deixou a implementação direta. O difícil é limitar o loop para o agente não entrar num espiral de 30 recuperações em uma pergunta simples.

### Contextual retrieval

A Anthropic publicou no ano passado um truque pequeno que merece seção própria porque combina bem com tudo acima. Antes de gerar o embedding de cada chunk, você adiciona uma frase de resumo indicando onde aquele chunk se encaixa no documento maior, gerada em um passe barato de LLM sobre o documento inteiro. Depois, você gera o embedding do chunk-com-contexto, não do chunk cru.

Os embeddings ficam muito melhores, porque cada chunk agora carrega o contexto de onde foi arrancado. A Anthropic reportou queda de cerca de metade nas falhas de recuperação no benchmark deles, e a mudança é de poucas linhas de código mais um custo único de batch.

Contextual retrieval empilha por cima de busca híbrida e re-ranking. Se você ainda não testou, teste antes de qualquer coisa mais exótica.

### Os truques do lado da consulta, resumidos

Mais dois padrões ficam na frente de qualquer recuperador. **HyDE** gera uma resposta hipotética a partir da pergunta, gera o embedding dessa resposta e usa esse vetor na busca. **Multi-query** reescreve uma pergunta em várias variações e faz a busca para cada uma. Ambos ajudam quando a forma como o usuário escreve está longe da forma como o documento escreve. Nenhum substitui arrumar o recuperador em si, mas vale testar depois que o recuperador já está bom.

### Como escolher

Versão curta, cruzada com o que você realmente tem:

| Sua situação | Comece por |
| --- | --- |
| Documentos curtos e autocontidos (FAQ, textos de produto) | Vanilla + re-ranking |
| Corpus cheio de códigos, IDs ou acrônimos | Híbrido + re-ranking |
| Documentos longos e estruturados (relatórios, contratos, regulamentos) | Hierárquico (PageIndex) |
| Perguntas que dependem de relações entre entidades | Graph RAG |
| Perguntas multi-hop ou de pesquisa | Agentic RAG |
| RAG vanilla já em produção, recuperação imprecisa | Contextual retrieval + re-ranking |

Uma observação honesta: a maioria dos projetos não precisa da opção mais sofisticada. Busca híbrida, com um re-ranker e contextual retrieval, leva mais longe do que a timeline do Twitter sugere, e os modos de falha são legíveis quando acontecem. Comece por aí, meça a qualidade da recuperação com um conjunto de avaliação real e só suba para hierárquico, grafo ou agentic quando a medição apontar nessa direção.

O que costumamos sugerir em um projeto novo: gastar o primeiro sprint montando um conjunto de avaliação com 50 a 100 perguntas reais e fontes corretas conhecidas, plugar híbrido mais re-ranking mais contextual retrieval contra esse conjunto, e só depois decidir se o formato dos documentos ou das perguntas justifica ir adiante. O conjunto de avaliação é o que deixa toda decisão posterior barata, e os times que pulam essa etapa acabam discutindo arquitetura em vez de medir.

### Recomendação final

Comece mais simples do que parece necessário. Para a maioria dos times, busca híbrida com re-ranking e contextual retrieval já entrega uma primeira versão forte. Só suba para hierárquico, grafo ou agentic quando o conjunto de avaliação mostrar uma lacuna clara.

### Recursos

- [PageIndex](https://github.com/VectifyAI/PageIndex): RAG hierárquico e baseado em raciocínio para documentos longos e estruturados.
- [GraphRAG da Microsoft](https://github.com/microsoft/graphrag): implementação de referência para recuperação baseada em grafo.
- [Anthropic: Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval): método com números de benchmark.
- [bge-reranker-v2-m3](https://huggingface.co/BAAI/bge-reranker-v2-m3): cross-encoder aberto e forte para re-ranking.
- [Reciprocal Rank Fusion](https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf): paper original.

---

**Veja também:**
- [Como escolher uma empresa de IA](/pt/blog/como-escolher-empresa-ia/)
- [Quanto custa implementar IA?](/pt/blog/quanto-custa-implementar-ia/)
- [Planejamento de IA para roteamento e agendamento](/pt/blog/planejamento-de-ia-para-roteamento-e-agendamento/)
