// Second batch for the document vault: 2022-2025 accounting records
// (balance sheets, income statements, cash flow, meeting minutes, tax
// filings). All seeded as category "empresa" and visibility "protected"
// by default — financial statements and tax declarations are sensitive
// internal records, not something to default-publish the way the CV or
// business registry documents were in the first batch.
//
// Run with: node --env-file=.env.local scripts/seed-vault-documents-2.mjs

import { createClient } from '@supabase/supabase-js';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const url = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceRoleKey) {
  console.error('Missing VITE_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY. Run with --env-file=.env.local');
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey);
const BUCKET = 'alio';
const BASE_DIR = path.resolve('docs/Alio_Contabilidade_2022-2025/Alio');

const YEARS = ['2022', '2023', '2024', '2025'];

const TITLE_MAP = {
  'Acta_2022_ALIO.pdf': 'Acta da Assembleia — 2022',
  'BALANÇO_2022.pdf': 'Balanço — 2022',
  'DEMONSTRAÇÃO De ReSULTADO 2022.pdf': 'Demonstração de Resultados — 2022',
  'FLUXO DE CAIXA ALIO 2022.pdf': 'Fluxo de Caixa — 2022',
  'Modelo1_ALIO_2022.pdf': 'Modelo 1 (Declaração Fiscal) — 2022',
  'Relatório_2022.pdf': 'Relatório de Contas — 2022',

  'Acta_2023 ALIO.pdf': 'Acta da Assembleia — 2023',
  'Balanço_2023_Alio_.pdf': 'Balanço — 2023',
  'DEMONSTRAÇÃO De ReSULTADO_2023_ALIO.pdf': 'Demonstração de Resultados — 2023',
  'FLUXO DE CAIXA ALIO 2023.pdf': 'Fluxo de Caixa — 2023',
  'Modelo_1_2023 ALIO.pdf': 'Modelo 1 (Declaração Fiscal) — 2023',
  'NL_IMPOSTO INDUSTRIAL_2023 ALIO.pdf': 'Nota de Liquidação — Imposto Industrial 2023',
  'Relatório_2023_ALIO.pdf': 'Relatório de Contas — 2023',

  'Acta_2024 ALIO.pdf': 'Acta da Assembleia — 2024',
  'BALANÇO_2024.pdf': 'Balanço — 2024',
  'DEMONSTRAÇÃO De ReSULTADO 2024.pdf': 'Demonstração de Resultados — 2024',
  'FLUXO DE CAIXA ALIO 2024.pdf': 'Fluxo de Caixa — 2024',
  'Modelo_1_2024 ALIO.pdf': 'Modelo 1 (Declaração Fiscal) — 2024',
  'NL_IMPOSTO INDUSTRIAL_2024 ALIO.pdf': 'Nota de Liquidação — Imposto Industrial 2024',
  'Relatório_2024.pdf': 'Relatório de Contas — 2024',

  'Acta_2025 ALIO.pdf': 'Acta da Assembleia — 2025',
  'BALANÇO ALIO 2025.pdf': 'Balanço — 2025',
  'DR ALIO 2025.pdf': 'Demonstração de Resultados — 2025',
  'Declaração II de 2025 Submetida_ALIO.pdf': 'Declaração Modelo II — 2025',
  'FLUXO DE CAIXA ALIO 2025.pdf': 'Fluxo de Caixa — 2025',
  'Relatório_2025.pdf': 'Relatório de Contas — 2025',
};

async function main() {
  const { data: existing, error: listError } = await supabase
    .from('alio_documents')
    .select('title');
  if (listError) {
    console.error('Failed to read alio_documents:', listError.message);
    process.exit(1);
  }
  const alreadySeeded = new Set(existing.map((d) => d.title));

  for (const year of YEARS) {
    const dir = path.join(BASE_DIR, year);
    let files;
    try {
      files = await import('node:fs/promises').then((fs) => fs.readdir(dir));
    } catch {
      console.warn(`skip missing year dir: ${year}`);
      continue;
    }

    for (const file of files) {
      // readdir can return NFD-normalized filenames (some source
      // filesystems store accented characters as combining sequences)
      // while TITLE_MAP's keys are NFC — normalize both before lookup
      // so this doesn't silently fall back to an auto-generated title.
      const title = TITLE_MAP[file.normalize('NFC')] ?? `${file.replace(/\.pdf$/i, '')} — ${year}`;
      if (alreadySeeded.has(title)) {
        console.log(`skip (already seeded): ${title}`);
        continue;
      }

      const filePath = path.join(dir, file);
      const buffer = await readFile(filePath);
      const storagePath = `documents/empresa/${crypto.randomUUID()}.pdf`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, buffer, { contentType: 'application/pdf' });
      if (uploadError) {
        console.error(`upload failed for ${file}:`, uploadError.message);
        continue;
      }

      const { error: insertError } = await supabase.from('alio_documents').insert({
        title,
        description: `Documento de contabilidade — ano fiscal ${year}.`,
        category: 'empresa',
        visibility: 'protected',
        storage_path: storagePath,
        mime_type: 'application/pdf',
        size_bytes: buffer.byteLength,
      });
      if (insertError) {
        console.error(`db insert failed for ${file}, rolling back storage object:`, insertError.message);
        await supabase.storage.from(BUCKET).remove([storagePath]);
        continue;
      }

      console.log(`seeded (protected): ${title} -> ${storagePath}`);
    }
  }
}

main();
