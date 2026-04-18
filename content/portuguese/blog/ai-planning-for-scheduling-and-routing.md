---
title: "Como Resolver Problemas de Agendamento e Roteamento com AI Planning"
slug: "planejamento-de-ia-para-roteamento-e-agendamento"
date: 2023-12-23T15:48:14+03:00
author: Claudio Scheer
image_webp: images/blog/ai-planning-for-scheduling-and-routing/about.webp
image: images/blog/ai-planning-for-scheduling-and-routing/about.jpg
description : "Introdução a AI Planning: o que é, como o PDDL funciona e um exemplo prático com o planejador LAMA."
subtitle: "Quando o problema é 'faz essas coisas na ordem certa', você quer um planejador, não um LLM."
images:
  - images/blog/ai-planning-for-scheduling-and-routing/about.jpg
cluster: planning
draft: false
---

Se sua equipe vive travando em decisões de agendamento, roteamento ou sequência de tarefas, este post é um ótimo ponto de partida: AI Planning transforma restrições reais em um plano executável, sem depender de tentativa e erro.

Para esse tipo de problema, o caminho costuma ser um planejador, não machine learning e não LLM de propósito geral.

Pense numa empresa de entregas decidindo quais paradas fazer e em qual ordem, um hospital organizando tratamentos ao redor dos medicamentos de um paciente, ou uma fábrica sequenciando jobs numa máquina compartilhada. Todos têm o mesmo formato: um estado inicial, um objetivo, ações que você pode tomar e regras que proíbem certas combinações. Você descreve isso para um planejador, e ele te devolve uma sequência válida de ações.

Este post cobre o básico e um exemplo pequeno que você pode adaptar para o seu caso.

### Por que a mesma abordagem funciona em vários domínios

Um planejador é um solver genérico. Ele não sabe qual é o seu problema. Ele só conhece três coisas: o estado em que o mundo está, as ações que podem mudar esse estado (e as regras para quando cada ação é permitida), e o objetivo que você quer atingir.

Descreva o problema dessa forma e o planejador resolve, seja roteando um robô por uma grade, escalonando cirurgias em salas de operação, ou sequenciando jobs numa fábrica. Os nomes mudam. O planejador não liga.

O trabalho do seu lado é traduzir o problema real para estados, ações e um objetivo. Uma vez escrito, trocar de problema é só trocar de arquivo. O planejador continua o mesmo.

### PDDL: como você diz ao planejador o que quer

A Planning Domain Definition Language (PDDL) é o formato que a maioria dos planejadores lê. Você escreve dois arquivos:

- Um arquivo de **domínio** que descreve o mundo: que tipos de objetos existem, que ações você pode tomar e o que cada ação precisa e muda.
- Um arquivo de **problema** que descreve o seu caso específico: o que você tem, onde começa e como fica o "pronto".

Qualquer planejador que lê PDDL pode, em princípio, resolver qualquer problema que você escrever nele. Na prática, o suporte varia. Planejadores mais antigos podem não lidar com PDDL 3, e os mais novos às vezes deixam de fora partes do PDDL 2.1. Escolha o planejador compatível com os recursos que você precisa.

### Um exemplo pronto para copiar

Vou usar o LAMA, um planejador feito para problemas reais. Ele usa busca heurística progressiva com marcos e um A* com peso progressivo. O artigo completo está [aqui](https://arxiv.org/abs/1401.3839).

#### Instalando o LAMA

O jeito mais fácil é o [planutils](https://github.com/AI-Planning/planutils), um toolkit Linux pra rodar e testar planejadores. O README deles tem os passos de instalação.

#### O cenário

Um robô numa grade pequena precisa ir da célula 1 até a célula 5. A célula 3 está bloqueada, então o caminho válido é 1, 2, 4, 5.

{{< figure src="/images/blog/ai-planning-for-scheduling-and-routing/domain.png" height="200px" title="Domínio Simples do Robô" >}}

Isso é trivial de propósito. O importante é a estrutura, não o quebra-cabeça. A mesma estrutura serve pra roteamento de entregas, escalonamento de jobs e automação de workflows. É só mudar o que os objetos e ações significam.

#### O arquivo de domínio

Você descreve objetos, predicados e ações. Objetos são as coisas do seu mundo (aqui, robôs e locais). Predicados são fatos que podem ser verdadeiros ou falsos: onde o robô está, quais células estão bloqueadas, quais são adjacentes. Ações são o que o robô pode fazer, com pré-condições (coisas que precisam ser verdade antes de a ação rodar) e efeitos (o que muda depois).

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

#### O arquivo de problema

O arquivo de problema fixa o caso específico: os objetos que existem, onde o robô começa e o objetivo.

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

Lê assim: "Um robô, cinco células. O robô começa na box1. A box3 está bloqueada. Aqui estão quais box são adjacentes. Leve o robô até a box5."

#### Rodando

```bash
lama domain.pddl problem.pddl
```

O LAMA imprime um plano válido, ou avisa que não existe solução.

```lisp
(move-down robot1 box1 box2)
(move-down robot1 box2 box4)
(move-down robot1 box4 box5)
; cost = 3 (unit cost)
```

Aqui tem um robô e um objetivo, mas o mesmo domínio escala pra vários robôs com objetivos separados.

### Mapeando o seu problema pra isso

Pegue o problema que você realmente tem e responda quatro perguntas:

1. Quais são os **objetos**? (Caminhões, tickets, pedidos, pacientes, jobs.)
2. Quais **fatos** descrevem o estado deles? (Onde está o caminhão? Esse pedido está embalado? Aquela máquina está livre?)
3. Quais **ações** podem mudar esses fatos, e o que precisa ser verdade pra a ação ser válida?
4. Qual é o **estado inicial**, e como fica o **pronto**?

Se você consegue responder isso, você consegue escrever um arquivo PDDL. E se consegue escrever o PDDL, um planejador consegue resolver.

### Indo além

A [International Planning Competition](http://ipc.icaps-conference.org/) publica problemas de referência se você quiser ver como são domínios mais difíceis.

Alguns planejadores também suportam planejamento numérico, com variáveis pra coisas como custo, tempo, combustível ou capacidade. Isso é útil quando chegar ao objetivo não basta e você também precisa minimizar alguma coisa. Logística e escalonamento costumam precisar.

### Ponto final

Se o seu problema é sequenciamento com restrições duras, use planejador. Ele te dá planos válidos, que você consegue inspecionar, testar e melhorar. LLM é outra ferramenta, para outra classe de problema.

### Recursos

- [https://planning.wiki](https://planning.wiki/)

---

**Veja também:**
- [Como escolher uma empresa de IA](/pt/blog/como-escolher-empresa-ia/)
- [Quanto custa implementar IA?](/pt/blog/quanto-custa-implementar-ia/)
- [Arquiteturas de RAG (como escolher)](/pt/blog/arquiteturas-rag-e-como-escolher/)
