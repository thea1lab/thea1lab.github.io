---
title: "AI Planning: Uma Introdução"
date: 2023-12-23T15:48:14+03:00
author: Claudio Scheer
image_webp: images/blog/ai-planning/about.webp
image: images/blog/ai-planning/about.jpg
description : "Uma breve introdução a AI Planning e como ela pode ser usada para resolver problemas complexos em vários domínios."
images:
  - images/blog/ai-planning/about.jpg
draft: false
---

Em termos simples, o Planejamento de IA (AI Planning) é um ramo da Inteligência Artificial (IA) focado na geração de estratégias para alcançar objetivos específicos. Ele utiliza métodos autônomos para transitar de uma situação inicial para um estado final desejado por meio de uma série de ações. Por exemplo, no contexto de roteamento de veículos, cada decisão sobre a rota, como escolher ruas e sequenciar paradas, representa uma ação dependente de fatores como tráfego e distância.

Este artigo aborda os fundamentos do Planejamento de IA e seu potencial para resolver problemas em diferentes domínios.

### Planejamento para Diferentes Domínios

O Planejamento de IA é hábil na formulação de estratégias para alcançar metas específicas em diversos domínios. Esse processo envolve progredir de maneira autônoma de um estado inicial para um estado final desejado por meio de uma série de ações, guiado por regras lógicas. Por exemplo, na logística, o Planejamento de IA pode otimizar o roteamento de veículos ao determinar os caminhos mais eficientes, considerando fatores como tráfego e distância. Além da logística, essa metodologia pode ser aplicada a áreas como saúde, onde pode gerenciar planos de tratamento de pacientes, ou na manufatura, para otimizar processos de produção. A adaptabilidade do Planejamento de IA permite sua implementação eficaz na resolução de problemas complexos em diversos setores, demonstrando sua ampla aplicabilidade e potencial de inovação.

### O Papel do PDDL no Planejamento de IA

Central ao campo do Planejamento de IA está o Planning Domain Definition Language (PDDL), uma linguagem especializada projetada para expressar problemas de planejamento e agendamento. O PDDL fornece um framework padronizado para definir os componentes de um problema de planejamento, como ações, estados e objetivos. Seu formato estruturado permite que planejadores de IA interpretem e resolvam problemas complexos de maneira universal em diversos domínios. Para resolver problemas, o Planejamento de IA depende dos planejadores. Esses planejadores evoluíram junto com a linguagem, levando a diferentes níveis de suporte para as várias sintaxes do PDDL. Por exemplo, planejadores mais antigos podem não suportar sintaxes avançadas como o PDDL 3, enquanto planejadores mais recentes podem não ser compatíveis com certas variantes mais antigas da sintaxe do PDDL 2.1. Isso exige uma seleção cuidadosa de planejadores com base em sua compatibilidade com definições específicas de problemas.

### Planejamento de IA em Ação

Exploraremos a aplicação prática do Planejamento de IA usando o LAMA, um planejador especializado para desafios complexos do mundo real. O LAMA utiliza uma busca heurística progressiva combinada com estratégias baseadas em marcos (landmarks), múltiplas heurísticas e o algoritmo A com peso progressivo. Mais detalhes sobre o LAMA podem ser encontrados em seu artigo acadêmico dedicado [aqui](https://arxiv.org/abs/1401.3839).

#### Instalando o LAMA

Para instalar o LAMA, podemos usar o [planutils](https://github.com/AI-Planning/planutils), uma ferramenta projetada para ambientes Linux que ajuda a desenvolver, executar e avaliar planejadores. Consulte o README no GitHub para obter diretrizes completas de instalação.

#### Definindo o Domínio

Imagine um cenário básico com um robô navegando em uma grade bidimensional. A grade contém caixas marcadas com "X", indicando obstáculos que o robô não pode atravessar. O objetivo é guiar o robô de um ponto inicial até um destino. Nesse cenário, a jornada do robô da caixa 1 até a caixa 5 envolve contornar a caixa 3, que está bloqueada, exigindo uma rota pelas caixas 1, 2, 4 e finalmente 5.

{{< figure src="/images/blog/ai-planning/domain.png" height="200px" title="Simples Domínio do Robô" >}}

Para definir este domínio em PDDL, precisamos especificar:

- **Objetos**: Os objetos são as entidades no domínio.
- **Predicados**: Os predicados definem o estado do domínio.
- **Ações**: As ações que podem ser realizadas no domínio.
- **Estado Inicial**: O estado inicial do domínio.
- **Estado Final**: O estado objetivo do domínio.

Abaixo está a representação do domínio em PDDL para o cenário proposto:

```lisp
(define (domain robot)
  (:requirements :strips :typing)
  (:types robot location)

  (:predicates
    (at ?r - robot ?l - location)
    (blocked ?l - location)
    (adjacent ?l1 ?l2 - location)
  )

  (:action move-up
    :parameters (?r - robot ?l1 - location ?l2 - location)
    :precondition (and (at ?r ?l1) (adjacent ?l1 ?l2))
    :effect (and (at ?r ?l2) (not (at ?r ?l1))))

  (:action move-down
    :parameters (?r - robot ?l1 - location ?l2 - location)
    :precondition (and (at ?r ?l1) (adjacent ?l1 ?l2))
    :effect (and (at ?r ?l2) (not (at ?r ?l1))))

  (:action move-left
    :parameters (?r - robot ?l1 - location ?l2 - location)
    :precondition (and (at ?r ?l1) (adjacent ?l1 ?l2))
    :effect (and (at ?r ?l2) (not (at ?r ?l1))))

  (:action move-right
    :parameters (?r - robot ?l1 - location ?l2 - location)
    :precondition (and (at ?r ?l1) (adjacent ?l1 ?l2))
    :effect (and (at ?r ?l2) (not (at ?r ?l1)))))
```

#### Definindo o Problema

Para complementar a definição do domínio, precisamos do arquivo de problema em PDDL. Este arquivo descreve os objetos específicos dentro do domínio e define os estados inicial e final. Abaixo está uma ilustração de como seria o arquivo de problema PDDL para este cenário:

```lisp
(define (problem robot)
  (:domain robot)
  (:objects
    robot1 - robot
    box1 box2 box3 box4 box5 - location
  )
  (:init
    (at robot1 box1)
    (blocked box3)

    (adjacent box1 box2)
    (adjacent box1 box3)
    (adjacent box2 box4)
    (adjacent box3 box4)
    (adjacent box4 box5)
  )

  (:goal (at robot1 box5))
)
```

Este arquivo de problema PDDL, chamado robot, define um cenário específico para um robô navegando em uma grade:

- **Domínio**: O domínio no qual o problema é definido. Neste caso, o domínio é robot.
- **Objetos**: Existem dois tipos de objetos:
  - robot1, representando o robô.
  - box1, box2, box3, box4, box5, representando locais na grade.
- **Estado Inicial**: O robô (robot1) começa na caixa1. A caixa3 é marcada como uma localização bloqueada. As relações de adjacência entre as caixas são definidas, especificando quais caixas são acessíveis diretamente umas das outras.
- **Estado Final**: O objetivo é mover robot1 para box5.

#### Executando o LAMA

Para executar o LAMA e resolver o problema definido, você precisará rodar um comando específico. Este comando instruirá o LAMA a processar os arquivos de domínio e problema, aplicando seus algoritmos de planejamento para encontrar uma solução. Normalmente, o comando segue uma determinada sintaxe, incluindo os caminhos para os arquivos de domínio e problema, além de possíveis parâmetros adicionais específicos do LAMA.

Certifique-se de que o LAMA esteja devidamente instalado e acessível no seu ambiente de linha de comando antes de executar o comando.

```bash
lama domain.pddl problem.pddl
```

Depois que o comando for executado, o LAMA começará a processar os arquivos de domínio e problema. Se uma solução for encontrada, o LAMA exibirá o plano de solução, que é uma sequência de ações que podem ser realizadas para alcançar o estado objetivo. Caso nenhuma solução seja encontrada, o LAMA exibirá uma mensagem indicando que nenhuma solução foi encontrada.

```lisp
(move-down robot1 box1 box2)
(move-down robot1 box2 box4)
(move-down robot1 box4 box5)
; cost = 3 (unit cost)
```

Este exemplo apresenta um domínio simples com um robô visando um único objetivo. No entanto, o domínio pode ser facilmente expandido para incluir múltiplos robôs e vários objetivos. Por exemplo, é possível criar um cenário envolvendo diversos robôs, cada um com objetivos distintos.

### Considerações Finais

O Planejamento de IA é uma ferramenta poderosa para resolver problemas complexos em diversos domínios. Neste artigo, vimos como o Planejamento de IA pode ser usado para resolver um domínio simples de robô. Contudo, o Planejamento de IA também pode ser aplicado para resolver problemas muito mais complexos. Por exemplo, ele pode ser utilizado para competir no [International Planning Competition](http://ipc.icaps-conference.org/). A competição consiste em uma série de problemas de planejamento projetados para testar os limites do Planejamento de IA.

Alguns solucionadores também oferecem suporte a planejamento numérico, que permite o uso de variáveis numéricas no processo de planejamento. Por exemplo, o planejamento numérico pode ser utilizado para resolver problemas na área de logística, onde o objetivo é minimizar o custo de uma entrega. Nesse caso, o custo da entrega é uma variável numérica que pode ser usada no processo de planejamento.

### Recursos Adicionais

- [https://planning.wiki](https://planning.wiki/)
