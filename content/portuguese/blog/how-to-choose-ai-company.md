---
title: "Como Escolher uma Empresa de IA (Checklist Técnico + Negócios)"
slug: "como-escolher-empresa-ia"
date: 2026-04-09T10:00:00-03:00
author: Claudio Scheer
image_webp: images/blog/como-escolher-empresa-ia/about.webp
image: images/blog/como-escolher-empresa-ia/about.jpg
description: "Checklist prático para avaliar fornecedores de software e IA: o que perguntar sobre arquitetura, o que é red flag e como evitar armadilhas de pricing."
subtitle: "Serve para qualquer projeto de software ou IA."
images:
  - images/blog/como-escolher-empresa-ia/about.jpg
tags:
  - ai
  - consultoria
cluster: decision
draft: false
---

Escolher a empresa certa para seu projeto de IA pode poupar meses de retrabalho e muito orçamento, e este checklist te ajuda a filtrar fornecedores com perguntas objetivas já na primeira conversa.

Quando essas perguntas são bem feitas, o projeto anda rápido; quando são puladas, vira poço de tempo e dinheiro.

Este é o checklist que usamos para avaliar fornecedores.

### Por que escolher errado custa caro

Um projeto mal conduzido consome tempo e orçamento antes de mostrar que não ia funcionar. Imagine dois cenários:

Uma empresa contratou um fornecedor que propôs fine-tuning antes de entender o problema. Foram 4 meses até descobrir que o cliente precisava de um pipeline de dados, não de um modelo treinado.

Em outro caso, o fornecedor trancou tudo numa plataforma proprietária. Quando o cliente quis migrar, descobriu que não tinha acesso ao código, aos prompts nem aos dados processados.

O custo de sair é maior que o custo de entrar. Quanto antes você identificar os sinais, melhor.

### Critérios de avaliação

Use estes critérios para filtrar fornecedores durante conversas, propostas e checagens de referência.

#### Profundidade técnica

Pergunte como o fornecedor abordaria o seu problema específico. Não "como vocês usam IA." Isso todo mundo sabe responder. Pergunte sobre arquitetura.

Se o fornecedor sugere LLM para tudo, sem avaliar se o problema é de classificação, previsão ou busca, está aplicando a ferramenta errada.

Se a resposta para "qual modelo e por quê" é só "GPT-5" ou "Claude", sem mencionar trade-offs de custo, latência ou janela de contexto, faltou critério.

Pergunte onde os dados ficam, quem tem acesso e o que acontece com eles depois do projeto. Se a resposta for vaga, é red flag.

Se o fornecedor só conhece o básico de [arquiteturas de RAG](/pt/blog/arquiteturas-rag-e-como-escolher/), vai ter problemas com bases maiores e mais bagunçadas. Pergunte sobre busca híbrida, re-ranking e contextual retrieval.

#### Prova de trabalho

Peça exemplos de projetos parecidos com o seu. Não depoimentos genéricos. Casos com desafio, arquitetura, resultado e tempo de entrega. Se o portfólio é só "chatbot" e "automação" sem detalhes, eles provavelmente não vão muito fundo.

Peça também um conjunto de avaliação. Um fornecedor sério consegue montar, nas primeiras semanas, um conjunto de 50-100 perguntas com respostas corretas conhecidas para medir qualidade. Se ninguém menciona avaliação, o projeto vai ser guiado por opinião.

#### Transparência de processo

Um fornecedor que diz "a gente entrega o resultado" sem mostrar o processo está escondendo algo. Pergunte:

- Como é a primeira semana?
- Quando você consegue ver o primeiro protótipo?
- Quanto tempo até uma demo que usa dados reais?
- O que acontece se as coisas não funcionam?

O processo deveria ser: diagnóstico → protótipo com dados reais → plano técnico → decisão de continuar ou não.

### Red flags

"Usamos IA" sem especificar que tipo, que modelo ou que abordagem é o equivalente a dizer "usamos tecnologia". Não quer dizer nada.

Se a proposta inclui "nossa plataforma proprietária" e não menciona exportação, isso é vendor lock-in explícito. Você vai ficar preso.

Se ninguém montou um conjunto de teste para medir a qualidade, "funciona" é opinião, não fato.

Se o fornecedor já sabe o que vai entregar antes de entender seus dados e processos, está vendendo, não diagnosticando.

Assinatura mensal por usuário sem escopo claro significa que você sabe o preço por usuário, mas não o que está incluído. O custo real tende a ser maior.

### Perguntas de arquitetura para fazer na primeira call

1. Vocês começam por diagnóstico ou já entram propondo solução?
2. Qual modelo vocês usariam para o meu caso e por quê?
3. Como vocês medem qualidade? Tem conjunto de avaliação?
4. Os dados ficam onde? Quem tem acesso?
5. O que eu levo se a gente encerra o contrato? Código, prompts, pipeline, dados?
6. Vocês propõem fine-tuning ou RAG ou API? Quando cada um faz sentido?
7. Qual é o prazo para um primeiro protótipo funcional com meus dados?

Se o fornecedor responde a tudo isso com clareza, você está em bom lugar. Se enrola, é porque não sabe ou porque a resposta não é favorável.

### Armadilhas de pricing

O modelo de pricing muda tudo sobre o que acontece depois do projeto.

Por assinatura por usuário funciona para SaaS genérico. Para IA, incentiva o fornecedor a manter você dependente. E o custo escala com adoção, que é o oposto do que você quer.

Por token ou chamada é transparente, mas difícil de prever. Pergunte a estimativa mensal para o volume esperado.

Por projeto com escopo fixo significa escopo claro, preço fixo, protótipo primeiro. Se funciona, você decide se continua. Se não funciona, você tem o diagnóstico e o código. Sem surpresas.

O que importa é saber o que está incluído e o que não está. Hosting, manutenção, ajustes de prompt, treinamento. Tudo isso tem custo e precisa estar claro.

### Como é um processo sério

Dá para perceber cedo quando o processo é sério. Normalmente funciona assim:

O fornecedor começa entendendo o problema antes de propor solução. Parece óbvio, mas muita gente pula essa parte. O diagnóstico precisa cobrir o fluxo atual, os dados disponíveis e as restrições. Se o fornecedor já chega com a resposta pronta, está vendendo, não diagnosticando.

Depois vem a prototipagem. Não um documento de requisitos, mas um protótipo funcional com dados reais que você consegue testar e revisar. Você participa do processo em vez de receber um pacote pronto no final. É aqui que ideias que parecem boas no papel mostram se funcionam na prática. Se a ideia for grande ou complexa demais, o protótipo traz isso à tona antes de comprometer mais orçamento e tempo.

Com o protótipo em mãos, fica mais fácil decidir. Você tem resultado concreto para avaliar, números reais de custo de infraestrutura e uma visão clara dos próximos passos. Se faz sentido seguir, segue. Se não, você sai com o código e os dados.

Se o fornecedor quer pular direto pra "vamos construir" sem prototipar, você fica com o risco.

Na A1 Lab, este é o nosso processo: diagnóstico em 1-2 semanas e protótipo funcional em 2-4 semanas. Você recebe um protótipo rodando, custos reais e clareza para decidir o próximo passo, com IA, software ou outra abordagem.

### Perguntas frequentes

**Como sei se preciso de IA ou de automação comum?**
Se o problema é regrado, repetitivo e bem definido (mover dados de A para B, disparar email quando X acontece), você precisa de automação, não de IA. Se o problema exige interpretação de texto, decisão com ambiguidade ou resposta em linguagem natural, IA faz sentido.

**Qual é o prazo mínimo para ver resultado?**
Diagnóstico em 1-2 semanas. Protótipo funcional em 2-4 semanas a partir dos dados. Se alguém promete menos, pergunte como.

**Preciso ter os dados organizados antes de contratar?**
Não necessariamente, mas ajuda. Um bom fornecedor vai ajudar a avaliar a qualidade dos dados como parte do diagnóstico. Se os dados estão uma bagunça, isso deveria aparecer no diagnóstico, não depois de três meses de projeto.

**O que eu levo comigo se o projeto não der certo?**
Código, prompts, pipeline de processamento e dados. Se o fornecedor não entrega isso, pergunte por quê antes de assinar.

---

**Veja também:**
- [Quanto custa implementar IA?](/pt/blog/quanto-custa-implementar-ia/)
- [Arquiteturas de RAG (como escolher)](/pt/blog/arquiteturas-rag-e-como-escolher/)
- [Processamento de documentos com IA](/pt/processamento-de-documentos/)
- [Agentes de IA](/pt/agentes-de-ia/)
