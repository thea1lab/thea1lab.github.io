# Blog writing guide

Based on the full revision of "Quanto custa um projeto de IA de verdade (com números reais)" / "How Much Does an AI Project Really Cost (With Real Numbers)". Use this as the reference for every new post.

---

## The core rule

**Explain why, not just what.**

A reader who finishes a post should understand the reasoning behind a number, a recommendation, or a decision — not just the number itself. If you're giving a price range, explain what moves the reader inside that range. If you're making a claim, show the logic.

This is the difference between a post that builds trust and one that reads like a brochure.

---

## Voice

Write like someone who knows the subject and isn't trying to impress. Direct, slightly opinionated, no hedging.

**Vary sentence length.** Short is good. But a sentence that takes its time to explain something complex is also good. Alternating between them keeps the reader from going numb.

**Have a position.** Don't just report.

PT: "A maioria dos projetos resolve com modelo barato" is stronger than "existem várias opções de modelos com diferentes preços." The first has an opinion. The second says nothing.

EN: "Most internal use cases work fine with the cheap model" is stronger than "there are various model options at different price points." Same idea.

**Use first person when it fits.**

PT: "Por isso trabalhamos com protótipos" is more honest than "a abordagem recomendada é o uso de protótipos." The reader knows who wrote the post.

EN: "That's why we work with prototypes" vs. "the recommended approach is to use prototypes." Same difference.

---

## Structure

### Intro

One paragraph. Get to the core tension immediately.

The first paragraph is also the post preview in list pages. Make it inviting and specific, but do not compress away important context. If you replace a stronger explanatory opener with a tighter hook, move the displaced substance to the next paragraph.

**Bad (PT):**
> "O mercado de IA está crescendo rapidamente. Empresas de todos os setores estão adotando soluções de inteligência artificial. Mas quais são os custos envolvidos?"

**Bad (EN):**
> "The AI market is growing rapidly. Companies across every sector are adopting artificial intelligence solutions. But what are the costs involved?"

**Good (PT):**
> "Consultoras que não fazem perguntas tendem a propor projetos maiores do que o necessário. Uma empresa que precisa de uma classificação simples recebe proposta de LLM com RAG, banco vetorial e pipeline de dados. O orçamento estoura antes de entregar valor. Então tentamos fazer algo diferente: dar faixas reais com contexto suficiente para você entender o que está pagando."

**Good (EN):**
> "Vendors who don't ask questions tend to propose larger projects than necessary. A company that needs a simple classifier gets a proposal with an LLM, a vector database, and a full data pipeline. Budget runs out before value is delivered. So we try to do something different: give real ranges with enough context for you to understand what you're paying for."

The good version gets to the problem (over-scoping), the consequence (wasted budget), and the post's purpose — all in the opening paragraph.

### Cenário base / baseline scenario

If the post contains numbers, anchor them early with an explicit scenario. Who is this for? What does "typical" look like? Without an anchor, every number is meaningless.

### Body sections

Use `###` and `####` headings. Never use bold text as a substitute for a heading.

Keep sections focused. One idea per section. If a section is doing two things, split it.

### Ending

The ending should land on a position, not a summary. Don't restate what the post covered. Say what the reader should do or think next.

PT: "Ir direto ao projeto completo sem protótipo é uma aposta. O protótipo transforma isso numa decisão." works. "Esperamos que este post tenha sido útil para entender os custos de IA" does not.

EN: "Going straight to the full project without a prototype is a bet. The prototype turns that into a decision." works. "We hope this post was helpful in understanding AI costs" does not.

---

## Numbers and pricing

### Be specific

A range like "R$ 40–80 mil" or "$8k–$16k" is not useful without context.

PT: "+R$ 10–22 mil para documentos digitalizados com OCR" — where the reader can understand why — is.

EN: "+$2,000–4,500 for scanned documents requiring OCR" — same structure, same reasoning shown.

When giving a number, show its basis:
- What assumption is it based on?
- What would make it go higher?
- What controls it?

### State volume assumptions for recurring costs

Token costs are meaningless without a usage assumption. Always state it explicitly:

PT: "Para uma equipe de 5–20 pessoas fazendo cerca de 100 consultas por dia (3.000/mês):"

EN: "For a team of 5–20 people making around 100 queries per day (3,000/month):"

Then give the numbers. The reader can multiply for their own volume.

### Market reference vs your prices

If you're giving market reference prices (not yours), say so. Explicitly.

PT: "Estes são valores de referência de mercado para projetos de produção completos — não os preços da A1 Lab, que trabalha com protótipos."

EN: "These are market reference prices for full production projects — not A1 Lab's prices, since we work with prototypes."

### Model references

Don't name models that are deprecated or likely to change. Use tiers with an example where stable:

| Tier | Example |
|---|---|
| Modelo econômico / Cheap model | Gemini Flash |
| Modelo intermediário / Mid-tier model | (no fixed example) |
| Modelo avançado / Advanced model | GPT-5 |

If you do name a model, verify it's current. GPT-4o is deprecated. Avoid it.

---

## Technical content for business readers

### Explain the "why" behind the technical detail

Don't just say what something costs. Say why it costs that.

**Bad (PT):**
> "PDFs escaneados custam mais para processar."

**Bad (EN):**
> "Scanned PDFs cost more to process."

**Good (PT):**
> "PDFs escaneados precisam de OCR antes de qualquer indexação. OCR não é só converter imagem em texto: envolve pipeline de pré-processamento, validação de qualidade e tratamento de falhas de reconhecimento. Impacto: +R$ 10–22 mil no desenvolvimento."

**Good (EN):**
> "Scanned documents need OCR before any indexing can happen. OCR isn't just converting image to text: it involves preprocessing, quality validation, and handling recognition failures. Impact: +$2,000–4,500 in development."

The second version gives the reader a mental model. They understand why, so they can reason about their own case.

### Frame technical concepts in business terms

RAG is not "a retrieval mechanism." RAG is cost control — it controls what goes into the context, which controls the token cost.

Context size is not "a technical parameter." It's the main variable that determines monthly API costs.

Model choice is not "an architectural decision." It's a multiplier — 30x between the cheapest and most expensive.

These framings make technical content usable by non-technical readers.

### Use hypothetical scenarios instead of "casos que vimos"

Don't write "em um projeto que trabalhamos" or "in a project we worked on" — as a company building credibility, this reads as unverifiable. Use explicit hypotheticals:

PT: "Imagine dois cenários:"

EN: "Imagine two scenarios:" or just state the scenario directly as a concrete example without attribution.

---

## AI writing patterns to avoid

These are patterns that make a post sound generated. They're subtle but consistent readers will feel them even if they can't name them.

### Structure patterns

**Bold mini-headers.** "**Tipo de documento**" or "**Document type**" as a standalone bold line before a paragraph is not a heading — it's a fake heading. Use `####` or restructure into prose.

**Inline bold header lists.** Bullet lists where each item starts with "**Term:** Explanation" read as AI output. Either write prose or use plain bullets.

**Rule of three openers.** Three questions or three items in a sentence to set up a point:

PT: "Os dados suportam a solução? A abordagem funciona? Quanto custa? Essas perguntas..."

EN: "Does the data support the solution? Does the approach work? What does it cost? These questions..."

Cut to two. Or one. The third is almost always redundant.

**Counting things in preview sentences.**

PT: "O que move o preço são seis decisões técnicas específicas" — don't announce a count. Just explain the decisions.

EN: "There are six technical decisions that drive the price" — same problem. Cut the count.

**Generic section endings.**

PT: "Esperamos que este post tenha ajudado..." or "O futuro é promissor para..."

EN: "We hope this post was helpful..." or "The future looks bright for..." — cut entirely.

### Transition patterns

**"É por isso que..." / "That's why..."** Formulaic setup for a conclusion.

PT bad: "É por isso que trabalhamos com protótipos."
PT good: "Por isso trabalhamos com protótipos." or just "Trabalhamos com protótipos."

EN bad: "That's why we work with prototypes."
EN good: "We work with prototypes." Just make the statement.

**"It's not just X, it's Y."** / "Não é só X, é Y."** Negative parallelism. Cut and state the actual point directly.

### Sentence patterns

**Perfect antithesis parallelism.**

PT bad: "Um RAG mal feito recupera trechos irrelevantes. Um RAG bem feito recupera exatamente o necessário."
PT good: "Um RAG com recuperação ruim enche a janela de contexto com ruído — e o custo pode ser 3–5x maior do que precisaria."

EN bad: "A poorly built RAG retrieves irrelevant chunks. A well-built RAG retrieves exactly what's needed."
EN good: "A RAG with poor retrieval fills the context window with noise — and monthly costs can run 3–5x higher than necessary."

Break the symmetry.

**Em dash punchlines.** Using "—" at the end of a paragraph to deliver a kicker:

PT: "O protótipo transforma isso numa decisão — por uma fração do custo."
EN: "The prototype turns that into a decision — for a fraction of the cost."

One or two in the whole post is fine. More than that and the rhythm becomes mechanical.

**Bureaucratic phrasing.**

PT bad: "Os valores abaixo são calculados para o cenário base desta análise"
PT good: "Para uma equipe de 20 pessoas fazendo ~100 consultas por dia:"

EN bad: "The values below are calculated for the baseline scenario of this analysis"
EN good: "For a team of 20 people making ~100 queries per day:"

Write like a person, not a paper.

### Word-level

Avoid: additionally, crucially, highlights, showcases, underscores, vibrant, rich (figurative), serves as, stands as, represents, encompasses.

These are high-frequency in AI output and low-frequency in human writing. Their presence is a signal.

---

## Tables

Use tables when the information is genuinely comparative and the reader needs to scan across rows.

Don't use tables when:
- The information has explanatory prose that matters (the "why")
- There are blank cells to handle nested categories
- The table has more than 4 columns

When you do use a table, every cell should earn its place. If a column is mostly "Varia" or "N/A," remove it and explain in prose.

---

## Checklist before publishing

- [ ] Does the intro reach the core tension within the first paragraph?
- [ ] If the intro was rewritten for preview quality, was any displaced context preserved in paragraph 2?
- [ ] Are all numbers anchored to an explicit assumption or scenario?
- [ ] Are model names current and non-deprecated?
- [ ] Is there a clear distinction between market prices and A1 Lab prices?
- [ ] Are there any bold mini-headers that should be `####` headings?
- [ ] Are there any "É por isso que" / "That's why" or "It's not just X" patterns?
- [ ] Are there three-question openers that could be cut to two?
- [ ] Does the ending land on a position, not a summary?
- [ ] Is there more than one CTA?
- [ ] Does every section explain the "why" behind its main point?
