---
title: "RAG Architectures: How to Choose for Your Use Case"
slug: "rag-architectures-and-how-to-choose"
date: 2026-04-02T00:15:00-03:00
author: Claudio Scheer
image_webp: images/blog/rag-architectures-and-how-to-choose/about.webp
image: images/blog/rag-architectures-and-how-to-choose/about.jpg
description : "Vanilla, hybrid, re-ranking, hierarchical (PageIndex), graph, agentic, and contextual RAG, with a short guide for picking the one that fits your documents."
subtitle: "Chunk-and-embed is one option, not the only one."
images:
  - images/blog/rag-architectures-and-how-to-choose/about.jpg
tags:
  - ai
  - rag
cluster: rag
draft: false
---

RAG matters because it is what separates an AI system that sounds confident from one that can answer based on what your company actually knows. Without solid retrieval, the model fills gaps, mixes context, and gets the most important business questions wrong.

In practice, that is why companies end up needing RAG so often: internal policies change, contracts are long, product catalogs contain exact codes, knowledge bases keep growing, and nobody wants generic answers when the question affects operations, support, compliance, or revenue. RAG is the layer that connects the model to the right source material at the right time.

The problem is that "using RAG" does not mean much by itself. RAG is not one architecture. It is a family of approaches with different trade-offs, and choosing the wrong one is why many features look strong in a demo but fail in production.

The usual starting point is the naive pipeline: chop documents into chunks, embed the chunks, embed the user's question, return the top five, paste them into the prompt. It works on FAQs and product copy. It breaks on anything long, technical, or structured, and most teams spend weeks tweaking chunk sizes before accepting that chunk size was never the actual problem.

This post walks through the RAG variants worth knowing in 2026, what each one is good at, and a short guide at the end for matching them to the shape of your documents and questions.

### The baseline: vanilla RAG

Vanilla RAG is the pipeline above. One embedding model, one vector store, cosine similarity, top-k, done.

It works well when your documents are short, self-contained, and written in the same vocabulary your users type. Help center articles, product descriptions, chat history inside a single conversation.

It breaks down in three common ways:

- **Long documents.** A 200-page contract chunked into 800-token windows loses all the context that gave any one paragraph its meaning.
- **Jargon mismatch.** Users type "can I expense this," the document says "reimbursable travel and entertainment." Embedding models handle some of this, not all of it.
- **Named entities.** If the answer depends on a specific invoice number, product SKU, or error code, vector search is genuinely bad at it. Embeddings blur exact matches.

If you are shipping vanilla RAG and retrieval feels "mostly right but wrong on the questions that matter," the problem is almost never the chunk size. The problem is that vanilla RAG is the wrong tool for those questions.

### Hybrid search

Hybrid search runs two retrievers in parallel: a classic keyword index (BM25) and a vector index. Both return ranked lists. You fuse the lists, usually with reciprocal rank fusion, and hand the combined top-k to the LLM.

It sounds boring. It is not. BM25 nails exact matches on codes, IDs, acronyms, and product names, which is exactly where vector search is weakest. Vector search handles synonyms and paraphrasing, which is where BM25 is weakest. Together they cover each other's blind spots.

Reciprocal rank fusion is a one-liner: for each document, score it as the sum of `1 / (k + rank)` across all the retrievers that returned it, with `k` usually set to 60. No tuning, no weights to balance, and it works.

If your corpus contains anything a human would copy-paste exactly (order numbers, part numbers, ticker symbols, legal citations), hybrid is the floor, not an upgrade.

### Re-ranking

Retrieval has two stages and most teams only build the first. Stage one is cheap and approximate: pull 50 or 100 candidates fast. Stage two is expensive and precise: take those candidates and score each one against the query with a cross-encoder, then keep the top five.

The cross-encoder sees the query and the document together, so it can weigh them against each other properly instead of relying on two separately-computed vectors. You pay more per query, but you only pay for 50 pairs, not for your whole corpus.

Managed options like Cohere Rerank drop into an existing pipeline in a few lines. Open weights like `bge-reranker-v2-m3` run on a single GPU and are good enough for most use cases.

In our experience, re-ranking is the single cheapest change with the biggest quality jump. If you only do one thing after vanilla RAG, do this.

### Hierarchical, reasoning-based RAG (PageIndex)

All of the above still assumes you want to find the right chunk. For long, structured documents, that assumption is wrong. What you want is to find the right **section**, and then read from there.

[PageIndex](https://github.com/VectifyAI/PageIndex) takes this seriously. Instead of embedding chunks, it builds a tree that mirrors the document's own structure, something close to a table of contents, and lets the LLM walk the tree to find the relevant section. No embeddings. No chunking. No vector database. The team frames it as "similarity is not relevance," and on long documents they're right. What you actually need from retrieval on a 10-K filing or a regulation is reasoning about where the answer lives, not a cosine score.

The approach is built for documents that already have a structure: financial reports, legal contracts, regulatory filings, academic papers, technical manuals. They report 98.7% accuracy on FinanceBench, well above vector RAG on the same benchmark. The retrieval decisions are also traceable, because the LLM names the sections it walked through on the way to the answer.

If your product answers questions about long formal documents, this is the architecture to evaluate first, not last.

### Graph RAG

Sometimes the answer is not in any single chunk, section, or document. It depends on a connection: which customers bought product A and filed a support ticket about product B in the last quarter, which authors cited this paper and also published on that topic, which employees report to someone who approved a given policy.

Graph RAG handles that shape. You extract entities and relationships from your corpus into a knowledge graph, and retrieval traverses edges instead of computing similarity. For questions that look like joins, this is the right model.

Microsoft's [GraphRAG](https://github.com/microsoft/graphrag) is the reference implementation worth starting from. It also produces "community summaries" that let you answer broad questions across a corpus ("what are the main themes") that no chunk-based retriever can answer well, because no single chunk contains the answer.

Graph RAG has real costs: entity extraction is an upfront LLM bill, the graph has to be kept in sync with the source documents, and the query side is harder to tune. Use it when the questions genuinely need it. If nobody is asking connection questions, you don't need a graph.

### Agentic RAG

Agentic RAG makes retrieval a loop instead of a single step. The LLM is given a retrieval tool and decides when to call it, with what query, how many times, and when it has enough to answer.

This is the pattern for multi-hop questions, where the answer is assembled from several lookups that depend on each other. "Find the subsidiary, then find its CEO, then find that CEO's other board seats" is three retrievals, and the second query is not knowable until the first one returns.

The trade-off is latency and cost. A single retrieval call becomes five. For research assistants, due-diligence tooling, and anything that behaves more like an analyst than a search box, that is acceptable. For a chatbot expected to respond in under two seconds, it isn't.

Modern tool-calling from the major providers makes the implementation straightforward. The hard part is bounding the loop so the agent does not spiral into 30 retrievals on a simple question.

### Contextual retrieval

Anthropic published a small trick last year that is worth its own section because it composes well with everything above. Before embedding each chunk, prepend a one-sentence summary of where that chunk sits in the larger document, generated by a cheap LLM pass over the full document. Then embed the chunk-plus-context, not the raw chunk.

Embeddings get much better because each chunk now carries the context it was torn out of. Anthropic reported retrieval failures dropping by around half on their benchmark, and the change is a few lines of code plus a one-time batch cost.

Contextual retrieval stacks on top of hybrid search and re-ranking. If you haven't tried it, try it before anything more exotic.

### The query-side tricks, briefly

Two more patterns sit in front of any retriever. **HyDE** generates a hypothetical answer from the query, then embeds that answer and uses it as the search vector. **Multi-query** rewrites a single question into several variations and retrieves for each. Both help when the user's phrasing is far from the document's phrasing. Neither is a substitute for fixing the retriever itself, but either is worth a try once the retriever is already good.

### How to pick

The short version, matched to what you actually have:

| Your situation | Start with |
| --- | --- |
| Short, self-contained docs (FAQs, product copy) | Vanilla + re-ranking |
| Corpus full of codes, IDs, or acronyms | Hybrid + re-ranking |
| Long, structured documents (reports, contracts, filings) | Hierarchical (PageIndex) |
| Questions that hinge on relationships between entities | Graph RAG |
| Multi-hop or research-style questions | Agentic RAG |
| Vanilla RAG in production, retrieval feels fuzzy | Contextual retrieval + re-ranking |

One honest note: most projects don't need the fancy option. Hybrid search plus a re-ranker plus contextual retrieval will carry you further than the Twitter timeline suggests, and the failure modes are legible when they happen. Start there, measure retrieval quality with a real eval set, and only move to hierarchical or graph or agentic once the measurements point you there.

What we usually suggest on a new project: spend the first sprint building an eval set of 50 to 100 real questions with known correct sources, wire up hybrid plus re-ranking plus contextual retrieval against it, and only then decide whether the document shape or question shape justifies going further. The eval set is the thing that makes every later decision cheap, and teams that skip it end up arguing about architecture instead of measuring it.

### Final recommendation

Start simpler than you think. For most teams, hybrid search plus re-ranking plus contextual retrieval is enough for a strong first version. Only move to hierarchical, graph, or agentic once your eval data shows a clear gap.

### Resources

- [PageIndex](https://github.com/VectifyAI/PageIndex): hierarchical, reasoning-based RAG for long structured documents.
- [Microsoft GraphRAG](https://github.com/microsoft/graphrag): reference implementation for graph-based retrieval.
- [Anthropic: Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval): the method with benchmark numbers.
- [bge-reranker-v2-m3](https://huggingface.co/BAAI/bge-reranker-v2-m3): strong open-weights cross-encoder for re-ranking.
- [Reciprocal Rank Fusion](https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf): original paper.

---

**See also:**
- [How to choose an AI company](/blog/how-to-choose-ai-company/)
- [How much does AI cost?](/blog/how-much-does-ai-cost/)
- [AI Planning for scheduling and routing](/blog/ai-planning-for-scheduling-and-routing/)
