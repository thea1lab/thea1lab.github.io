---
title: "AI Planning: An Introduction"
date: 2023-12-23T15:48:14+03:00
author: Claudio Scheer
image_webp: images/blog/ai-planning/about.webp
image: images/blog/ai-planning/about.jpg
description : "A brief introduction to AI Planning and how it can be used to solve complex problems across various domains."
draft: false
---

In straightforward terms, AI Planning is a branch of AI (Artificial Intelligence) focused on generating strategies to accomplish specific objectives. It involves using autonomous methods to transition from an initial situation to a targeted end state via a series of actions. For example, in the context of vehicle routing, each decision about the route, such as choosing streets and sequencing stops, represents an action contingent on various factors like traffic and distance.

This article covers the basics of AI Planning and its potential to address problems from different domains.

### Planning for Different Domains

AI Planning is adept at formulating strategies to achieve specific goals across various domains. This process involves autonomously progressing from an initial state to a desired goal state through a series of actions, guided by logical rules. For instance, in logistics, AI Planning can optimize vehicle routing by determining the most efficient paths, considering factors like traffic and distance. Beyond logistics, this methodology can be applied to diverse areas such as healthcare, where it could manage patient treatment plans, or in manufacturing, for streamlining production processes. The adaptability of AI Planning allows for its effective implementation in solving complex problems in different sectors, showcasing its broad applicability and potential for innovation.

### The Role of PDDL in AI Planning

Central to the field of AI Planning is the Planning Domain Definition Language (PDDL), a specialized language designed to express planning and scheduling problems. PDDL provides a standardized framework for defining the components of a planning problem, such as actions, states, and objectives. Its structured format allows AI planners to universally interpret and solve complex problems across various domains. To actually solve problems, AI Planning relies on the planners. These planners have evolved with the language, leading to varying levels of support for different PDDL syntaxes. For instance, older planners might not support advanced syntaxes like PDDL 3, while newer planners may not accommodate certain older syntax variants from PDDL 2.1. This divergence necessitates careful selection of planners based on their compatibility with specific problem definitions.

### AI Planning in Action

We'll explore the practical application of AI Planning using LAMA, a specialized planner for intricate real-world challenges. LAMA employs a heuristic forward search, combined with landmark-based strategies, multiple heuristics, and a progressively weighted A* algorithm. Further details on LAMA can be found in its dedicated academic paper [here](https://arxiv.org/abs/1401.3839).

#### Installing LAMA

To install LAMA, we can use [planutils](https://github.com/AI-Planning/planutils), a toolkit designed for Linux environments to develop, execute, and assess planners. Refer to their GitHub README for complete installation guidelines.

#### Defining the Domain

Envision a basic scenario with a robot navigating a two-dimensional grid. The grid contains 'X'-marked boxes, indicating obstacles the robot cannot traverse. The objective is to guide the robot from a starting point to a destination. In our scenario, the robot's journey from box 1 to box 5 involves circumventing box 3, which is obstructed, necessitating a route through boxes 1, 2, 4, and finally 5.

{{< figure src="/images/blog/ai-planning/domain.png" height="200px" title="Simple Robot Domain" >}}

To define this domain in PDDL, we need to specify the following:

- **Objects**: The objects are the entities in the domain.
- **Predicates**: The predicates that define the state of the domain.
- **Actions**: The actions that can be performed in the domain.
- **Initial State**: The initial state of the domain.
- **Goal State**: The goal state of the domain.

Below is the PDDL domain representation for the given scenario:

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

#### Defining the Problem

To complement the domain definition, we need the problem PDDL file. This file delineates the specific objects within the domain and describes both the initial and goal states. Below is an illustration of how the PDDL problem file would be structured for this scenario:

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

This PDDL problem file, named robot, defines a specific scenario for a robot navigating a grid:

- **Domain**: The domain that the problem is defined in. In this case, the domain is robot.
- **Objects**: There are two types of objects:
  - robot1, representing the robot.
  - box1, box2, box3, box4, box5, representing locations on the grid.
- **Initial State**: The robot (robot1) starts at box1. box3 is marked as a blocked location. Adjacency relationships between boxes are defined, specifying which boxes are directly accessible from each other.
- **Goal State**: The objective is to move robot1 to box5.

#### Running LAMA

To execute LAMA for solving the defined problem, you'll need to run a specific command. This command will direct LAMA to process the domain and problem files, applying its planning algorithms to find a solution. Typically, the command follows a certain syntax, including the paths to both the domain and problem files, and possibly additional parameters specific to LAMA.

Ensure that LAMA is properly installed and accessible from your command line environment before executing the command.

```bash
lama domain.pddl problem.pddl
```

Once the command is executed, LAMA will begin processing the domain and problem files. If a solution is found, LAMA will output the solution plan, which is a sequence of actions that can be performed to achieve the goal state. If no solution is found, LAMA will output a message indicating that no solution was found.

```lisp
(move-down robot1 box1 box2)
(move-down robot1 box2 box4)
(move-down robot1 box4 box5)
; cost = 3 (unit cost)
```

This example features a straightforward domain with one robot aiming for a single goal. However, the domain can be readily expanded to encompass multiple robots and various goals. For instance, it's possible to create a scenario involving several robots, each with distinct objectives.

### Final Thoughts

AI Planning is a powerful tool for solving complex problems across various domains. In this article, we have seen how AI Planning can be used to solve a simple robot domain. However, AI Planning can be used to solve much more complex problems. For example, AI Planning can be used to solve the [International Planning Competition](http://ipc.icaps-conference.org/). The competition consists of a series of planning problems that are designed to test the limits of AI Planning.

Some solvers also support numeric planning, which allows for the use of numeric variables in the planning process. For example, numeric planning can be used to solve problems in logistics, where the goal is to minimize the cost of a delivery. In this case, the cost of a delivery is a numeric variable that can be used in the planning process.

### Resources

- [https://planning.wiki](https://planning.wiki/)
