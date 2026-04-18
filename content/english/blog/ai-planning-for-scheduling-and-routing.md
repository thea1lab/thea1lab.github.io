---
title: "How to Solve Scheduling and Routing Problems with AI Planning"
slug: "ai-planning-for-scheduling-and-routing"
date: 2023-12-23T15:48:14+03:00
author: Claudio Scheer
image_webp: images/blog/ai-planning-for-scheduling-and-routing/about.webp
image: images/blog/ai-planning-for-scheduling-and-routing/about.jpg
description : "How to use AI Planning to solve scheduling, routing, and sequencing problems, with a hands-on PDDL example you can adapt."
subtitle: "When the problem is 'do these things in the right order,' you want a planner, not an LLM."
images:
  - images/blog/ai-planning-for-scheduling-and-routing/about.jpg
tags:
  - ai
  - planning
cluster: planning
draft: false
---

If your team keeps wrestling with scheduling, routing, or sequencing decisions and every workaround feels brittle, this is the right place to start: AI Planning gives you a practical way to turn constraints into an executable plan, without guessing.

For this class of problem, you usually want a planner, not machine learning and not a general-purpose LLM.

Think of a delivery company deciding which stops to make in which order, a hospital arranging treatments around a patient's medications, or a factory sequencing jobs on a shared machine. They all share the same shape: a starting state, a goal, actions you can take, and rules that forbid certain combinations. You describe that to a planner, and it hands you back a valid sequence of actions.

This post walks through the basics and a small example you can adapt to your own case.

### Why the same approach works across domains

A planner is a generic solver. It doesn't know what your problem is about. It only knows three things: the state your world is in, the actions that can change that state (and the rules for when each action is allowed), and the goal you want to reach.

Describe your problem that way and the planner can solve it, whether you're routing a robot through a grid, scheduling surgeries into operating rooms, or sequencing factory jobs. The labels change. The planner doesn't care.

The work on your side is translating your real-world problem into states, actions, and a goal. Once that's written, swapping problems is just swapping files. The planner stays the same.

### PDDL: how you tell the planner what you want

The Planning Domain Definition Language (PDDL) is the format most planners read. You write two files:

- A **domain** file that describes the world: what kinds of objects exist, what actions you can take, and what each action needs and changes.
- A **problem** file that describes your specific case: what you have, where you start, and what "done" looks like.

Any planner that reads PDDL can, in principle, solve any problem you write in it. In practice, support varies. Older planners may not handle PDDL 3, and newer ones sometimes drop parts of PDDL 2.1. Match the planner to the features you need.

### A worked example you can steal

I'll use LAMA, a planner built for real-world problems. It uses heuristic forward search with landmarks and a progressively weighted A*. The full paper is [here](https://arxiv.org/abs/1401.3839).

#### Installing LAMA

The easiest way is [planutils](https://github.com/AI-Planning/planutils), a Linux toolkit for running and testing planners. Their README has the setup steps.

#### The scenario

A robot on a small grid needs to get from cell 1 to cell 5. Cell 3 is blocked, so the valid path is 1, 2, 4, 5.

{{< figure src="/images/blog/ai-planning-for-scheduling-and-routing/domain.png" height="200px" title="Simple Robot Domain" >}}

This is trivial on purpose. The point is the structure, not the puzzle. The same structure covers delivery routing, job scheduling, and workflow automation. You just change what the objects and actions mean.

#### The domain file

You describe objects, predicates, and actions. Objects are the things in your world (here, robots and locations). Predicates are facts that can be true or false: where the robot is, which cells are blocked, which cells are adjacent. Actions are what the robot can do, with preconditions (things that must be true before the action runs) and effects (what changes after).

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

#### The problem file

The problem file pins down the specific case: the objects that exist, where the robot starts, and the goal.

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

Read this as: "One robot, five cells. The robot starts at box1. Box3 is blocked. Here are which boxes are adjacent. Get the robot to box5."

#### Running it

```bash
lama domain.pddl problem.pddl
```

LAMA prints a valid plan, or tells you no solution exists.

```lisp
(move-down robot1 box1 box2)
(move-down robot1 box2 box4)
(move-down robot1 box4 box5)
; cost = 3 (unit cost)
```

One robot and one goal here, but the same domain scales to many robots with separate goals.

### Mapping your own problem to this

Take whatever problem you actually have and answer four questions:

1. What are the **objects**? (Trucks, tickets, orders, patients, jobs.)
2. What **facts** describe their state? (Where is the truck? Is this order packed? Is that machine free?)
3. What **actions** can change those facts, and what has to be true for the action to be valid?
4. What is the **starting state**, and what does **done** look like?

If you can answer those, you can write a PDDL file. And if you can write the PDDL, a planner can solve it.

### Going further

The [International Planning Competition](http://ipc.icaps-conference.org/) publishes benchmark problems if you want to see what harder domains look like.

Some planners also support numeric planning, with variables for things like cost, time, fuel, or capacity. That's useful when reaching the goal isn't enough and you also need to minimize something. Logistics and scheduling usually need it.

### Final take

If your problem is sequencing under hard constraints, use a planner. It gives you valid plans you can inspect, test, and improve. LLMs are a different tool for a different problem class.

### Resources

- [https://planning.wiki](https://planning.wiki/)

---

**See also:**
- [How to choose an AI company](/blog/how-to-choose-ai-company/)
- [How much does AI cost?](/blog/how-much-does-ai-cost/)
- [RAG architectures (how to choose)](/blog/rag-architectures-and-how-to-choose/)
