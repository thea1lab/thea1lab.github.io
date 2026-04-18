---
title: "How to Choose an AI Company (Technical + Business Checklist)"
date: 2026-04-09T10:00:00-03:00
author: Claudio Scheer
image_webp: images/blog/how-to-choose-ai-company/about.webp
image: images/blog/how-to-choose-ai-company/about.jpg
description: "A practical checklist for evaluating software and AI vendors: what to ask about architecture, what counts as a red flag, and how to avoid pricing traps."
subtitle: "Works for any software or AI project."
images:
  - images/blog/how-to-choose-ai-company/about.jpg
tags:
  - ai
  - consulting
cluster: decision
draft: false
---

Choosing the right AI partner can save months of rework and a lot of budget, and this checklist helps you do exactly that by showing what to ask before you sign anything.

Get those questions right and you move fast; skip them and the project can turn into a time and money pit.

This is the checklist we use when evaluating vendors.

### Why choosing wrong is expensive

A badly run project eats through time and budget before revealing it was never going to work. Imagine two scenarios:

One company hired a vendor who proposed fine-tuning before understanding the problem. Four months later, they discovered the client needed a data pipeline, not a custom model.

In another case, the vendor locked everything into their platform. When the client wanted to leave, they had no access to the code, the prompts, or the processed data.

The cost of getting out is higher than the cost of getting in. The sooner you spot the signals, the better.

### Evaluation criteria

Use these criteria to filter vendors during conversations, proposals, and reference checks.

#### Technical depth

Ask how they'd approach your specific problem. Not "how do you use AI." Everyone has a canned answer for that. Ask about architecture.

If a vendor suggests LLMs for everything without checking whether the problem is classification, prediction, or search, they're applying the wrong tool.

If the answer to "which model and why" is just "GPT-5" or "Claude" without mentioning cost, latency, or context window trade-offs, the vendor lacks criteria.

Ask where data lives, who has access, and what happens to it after the project. Vague answers are a red flag.

If the vendor only knows the basics in [RAG architectures](/blog/rag-architectures-and-how-to-choose/), they'll struggle with larger, messier document sets. Ask about hybrid search, re-ranking, and contextual retrieval.

#### Proof of work

Ask for examples similar to your problem. Not generic testimonials. Cases with the challenge, architecture, result, and timeline. If the portfolio is just "chatbot" and "automation" without specifics, they probably can't go deep.

Also ask for an evaluation set. A serious vendor can put together 50-100 questions with known correct answers in the first few weeks to measure quality. If nobody mentions evaluation, the project will be guided by opinion.

#### Process transparency

A vendor that says "we deliver the result" without showing the process is hiding something. Ask:

- What does the first week look like?
- When do you get to see the first prototype?
- How long until a demo that runs on real data?
- What happens when things don't work?

The process should be: diagnosis → prototype with real data → technical plan → decide whether to continue.

### Red flags

"We use AI" without specifying what kind, what model, or what approach is the equivalent of saying "we use technology." It means nothing.

If the proposal includes "our proprietary platform" and doesn't mention export, that's explicit vendor lock-in. You'll get stuck.

If nobody built a test set to measure output quality, "it works" is an opinion, not a fact.

If the vendor already knows what they'll deliver before understanding your data and processes, they're selling, not diagnosing.

Per-seat monthly pricing with no clear scope means you know the monthly price per user, but not what is actually included. The real cost will usually be higher.

### Architecture questions for the first call

1. Do you start with diagnosis, or do you jump to proposing a solution?
2. Which model would you use for my case, and why?
3. How do you measure quality? Do you use an evaluation set?
4. Where do my data live? Who has access?
5. If I end the contract, what do I walk away with? Code, prompts, pipelines, data?
6. Do you propose fine-tuning, RAG, or APIs? When does each make sense?
7. What's the timeline to a working prototype on my data?

If the vendor answers all of these clearly, you're in good shape. If they dodge, they either don't know or the answer isn't favorable.

### Pricing traps

The pricing model changes everything about what happens after the project.

Per-seat subscription works for generic SaaS. For AI, it incentivizes the vendor to keep you dependent. And the cost scales with adoption, which is the opposite of what you want.

Per-token or per-call pricing is transparent, but hard to predict. Ask for the estimated monthly cost at your expected volume.

Fixed-scope project means clear scope, fixed price, prototype first. If it works, you decide to continue. If it doesn't, you keep the diagnosis and the code. No surprises.

What matters is knowing what's included and what isn't. Hosting, maintenance, prompt adjustments, training. All of it costs money and needs to be clear upfront.

### What a serious process looks like

You can tell early when the process is serious. It usually looks like this:

The vendor starts by understanding the problem before proposing a solution. That sounds obvious, but many teams skip it. Diagnosis needs to cover the current workflow, available data, and constraints. If the vendor shows up with a ready-made answer, they're selling, not diagnosing.

Then comes prototyping. Not a requirements document, but a working prototype on real data that you can test and review. You stay involved instead of receiving a finished package at the end. This is where ideas that look good on paper prove whether they work in practice. If the idea is too big or too complex, the prototype shows that before you commit more budget and time.

With the prototype in hand, the decision gets easier. You have concrete results, real infrastructure cost numbers, and a clear picture of next steps. If it makes sense to continue, you continue. If not, you walk away with the code and the data.

If the vendor wants to skip straight to "let's build" without prototyping, you carry the risk.

At A1 Lab, this is how we work: diagnosis in 1-2 weeks, working prototype in 2-4 weeks. You get a running prototype, real costs, and clarity on the next step, whether that is AI, software, or another approach.

### Frequently asked questions

**How do I know if I need AI or just regular automation?**
If the problem is rule-based, repetitive, and well-defined (move data from A to B, send an email when X happens), you need automation, not AI. If the problem requires text interpretation, ambiguous decisions, or natural language responses, AI makes sense.

**What's the minimum timeline to see results?**
Diagnosis in 1-2 weeks. Working prototype in 2-4 weeks from data delivery. If someone promises less, ask how.

**Do I need to have my data organized before hiring?**
Not necessarily, but it helps. A good vendor will help you assess data quality as part of diagnosis. If the data is messy, that should surface during diagnosis, not after three months of development.

**What do I keep if the project doesn't work out?**
Code, prompts, processing pipeline, and data. If the vendor won't give you that, ask why before signing.

---

**See also:**
- [How much does AI cost?](/blog/how-much-does-ai-cost/)
- [RAG architectures (how to choose)](/blog/rag-architectures-and-how-to-choose/)
- [Document processing with AI](/document-processing/)
- [AI agents](/ai-agents/)
