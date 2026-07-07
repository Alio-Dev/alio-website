---
name: alio-project-skill
description: >
  Use this skill at the START of every Alio Analytics project or task. It governs
  how the team plans, discusses, divides work, and delivers. Load this file before
  loading any agent-specific file.
---

# Alio Analytics — Project Execution Skill

This skill defines **how the Alio Analytics agent team operates on any project**. It is the execution layer on top of CLAUDE.md. All agents follow these instructions without exception.

---

## Step 1 — Project Intake

When a new project or task arrives, the **active lead agent** (typically ARIA or the most relevant domain lead) performs the following:

```
[ ] Read and fully understand the brief before responding.
[ ] Identify the client's stated goal AND underlying need (they may differ).
[ ] List any ambiguities or missing information.
[ ] Ask clarifying questions BEFORE planning if critical information is absent.
[ ] Identify which agent roles are needed for this project.
```

**Output:** A written **Project Brief Summary** including:
- Client name and context
- Goal (what they want)
- Success criteria (how we'll know we succeeded)
- Constraints (budget, timeline, tech stack, regulatory)
- Open questions (if any)

---

## Step 2 — Team Assembly

Based on the brief, identify the active agents for this engagement:

```markdown
## Active Team for [Project Name]

| Agent | Role | Responsibility |
|-------|------|----------------|
| ARIA  | Lead | Overall direction, client communication |
| FE-1  | Frontend | ... |
| BE-2  | Backend  | ... |
| ...   | ...      | ... |
```

Only activate agents whose skills are genuinely needed. Do not involve all agents in every project — that creates noise, not quality.

---

## Step 3 — Planning Session

Before any work begins, the active team runs a **planning session**. This is documented, not verbal.

### Planning Document Structure

```markdown
# Project Plan — [Project Name]
**Date:** [date]  
**Lead:** [agent]  
**Active Team:** [list]

## Objective
[One sentence. What are we delivering?]

## Approach
[How will we solve this? What's the technical/strategic approach?]

## Work Breakdown

| Task | Owner | Dependency | Estimate |
|------|-------|------------|----------|
| ... | FE-1 | BE-1 API spec | 2 days |
| ... | BE-2 | Schema approved | 1 day |

## Interface Contracts
[API schemas, component props, data models — agreed BEFORE parallel work starts]

## Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| ... | Medium | High | ... |

## Definition of Done
[ ] All tasks completed
[ ] Tests passing
[ ] Reviewed by lead
[ ] Client acceptance criteria met
[ ] Documentation updated
```

---

## Step 4 — Execution

### Coding Projects
- Write code in the agreed stack. No unilateral stack changes.
- TypeScript-first for all JS/TS projects.
- All functions, components, and modules must be documented.
- Tests are written alongside code — not after.
- Commit messages follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).

### Analysis Projects
- State methodology before running any analysis.
- Include data source, date range, and assumptions in all outputs.
- Validate data quality before drawing conclusions.
- All findings must include confidence level and caveats.

### Strategy / Content Projects
- Ground all recommendations in data or domain evidence.
- Present options with tradeoffs — not just a single recommendation.
- Tailor language and format to the intended audience.

---

## Step 5 — Review Protocol

Before any deliverable leaves the team:

```
[ ] Self-review by the owning agent (does it meet the brief?)
[ ] Peer review by at least one other agent (technical or strategic check)
[ ] ARIA review for anything client-facing or architecturally significant
[ ] Definition of Done checklist completed
```

**No deliverable ships without passing review.**

---

## Step 6 — Delivery

Structure all client deliverables as follows:

```markdown
# [Deliverable Title]
**Prepared by:** Alio Analytics — [Agent(s)]  
**Date:** [date]  
**Project:** [project name]

## Executive Summary
[2-3 sentences. What did we deliver and why does it matter?]

## Deliverable
[The actual output — code, report, plan, analysis, etc.]

## Decisions Made
[Key decisions, with rationale]

## Assumptions
[What we assumed — client should validate]

## Next Steps
[What comes next, and who owns it]
```

---

## Communication Standards

### Within the Team
- Be direct. Say what you think, backed by reasoning.
- Disagreements are welcome — but must be constructive and evidence-based.
- When blocked, say so immediately with: what you're blocked on, what you've tried, what you need.

### With the Client (via ARIA or designated lead)
- Never make commitments without team agreement.
- Use plain language. Avoid jargon unless the client is technical.
- Proactively communicate risks and delays — never let the client be surprised.

---

## Project Closure

When a project completes:

```
[ ] All deliverables accepted by client
[ ] Documentation finalized and stored
[ ] Retrospective notes written (what went well, what to improve)
[ ] CX team briefed for ongoing relationship (if applicable)
[ ] Financial team updated with final actuals
[ ] Lessons learned recorded for future projects
```

---

## Quick Reference: Which Agent for What

| Need | Lead Agent |
|------|-----------|
| Web app (full) | FS-1 or FS-2 + specialists |
| Frontend only | FE-1, FE-2, FE-3 |
| Backend API | BE-1, BE-2, BE-3 |
| Mobile app | MOB-1, MOB-2 |
| Map / spatial feature | GIS-1, GIS-2 |
| Database schema / Supabase setup | DB-1, DB-2 |
| PostGIS / spatial DB design | DB-2 + GIS-1 |
| Data dashboard / analysis | DA-1, DA-2 |
| SEO audit / content plan | SEO-1, SEO-2 |
| Sales strategy / outreach | SALES-1, SALES-2 |
| Financial model / forecast | FIN-1, FIN-2 |
| Client onboarding / NPS | CX-1, CX-2 |
| Cross-cutting / architecture | ARIA |
