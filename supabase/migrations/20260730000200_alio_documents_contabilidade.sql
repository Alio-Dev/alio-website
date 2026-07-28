-- Add a third document category, "contabilidade" (accounting), alongside
-- "empresa" and "pessoal" — the 26 accounting/tax records added earlier
-- were seeded as "empresa" before this category existed and need to move.

alter table alio_documents drop constraint if exists alio_documents_category_check;
alter table alio_documents add constraint alio_documents_category_check
  check (category in ('empresa', 'pessoal', 'contabilidade'));

update alio_documents
set category = 'contabilidade'
where category = 'empresa'
  and title in (
    'Acta da Assembleia — 2022', 'Acta da Assembleia — 2023', 'Acta da Assembleia — 2024', 'Acta da Assembleia — 2025',
    'Balanço — 2022', 'Balanço — 2023', 'Balanço — 2024', 'Balanço — 2025',
    'Demonstração de Resultados — 2022', 'Demonstração de Resultados — 2023', 'Demonstração de Resultados — 2024', 'Demonstração de Resultados — 2025',
    'Fluxo de Caixa — 2022', 'Fluxo de Caixa — 2023', 'Fluxo de Caixa — 2024', 'Fluxo de Caixa — 2025',
    'Modelo 1 (Declaração Fiscal) — 2022', 'Modelo 1 (Declaração Fiscal) — 2023', 'Modelo 1 (Declaração Fiscal) — 2024',
    'Nota de Liquidação — Imposto Industrial 2023', 'Nota de Liquidação — Imposto Industrial 2024',
    'Relatório de Contas — 2022', 'Relatório de Contas — 2023', 'Relatório de Contas — 2024', 'Relatório de Contas — 2025',
    'Declaração Modelo II — 2025'
  );

drop function if exists alio_debug_constraints(text);
