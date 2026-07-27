// One-time migration: uploads docs/upload/*.pdf into Supabase Storage
// (bucket "alio") and inserts the matching alio_documents metadata rows.
//
// Uses the SERVICE ROLE key (bypasses RLS) because this runs locally as
// the person who owns these documents, not as an app user — it must never
// run in the browser. Run with:
//
//   node --env-file=.env.local scripts/seed-vault-documents.mjs
//
// Idempotent: re-running skips any storage_path that's already present in
// alio_documents.

import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'node:crypto';
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
const UPLOAD_DIR = path.resolve('docs/upload');

// visibility: 'protected' is the safe default. BI and Registo Criminal stay
// protected regardless — see the conversation note on why those two are a
// deliberate exception to "make everything public for now".
const DOCUMENTS = [
  {
    file: 'Alio - Alvara Comercial.pdf',
    title: 'Alvará Comercial',
    description: 'Alvará comercial da Alio Analytics, Lda.',
    category: 'empresa',
    visibility: 'public',
  },
  {
    file: 'Alio - CERTIDÃO DA EMPRESA ALIO - PRESTAÇÃO DE SERVIÇOS.pdf',
    title: 'Certidão da Empresa — Prestação de Serviços',
    description: 'Certidão comercial de prestação de serviços.',
    category: 'empresa',
    visibility: 'public',
  },
  {
    file: 'Alio - Certidao Contributiva INSS.pdf',
    title: 'Certidão Contributiva — INSS',
    description: 'Certidão de regularidade contributiva junto do INSS.',
    category: 'empresa',
    visibility: 'public',
  },
  {
    file: 'Alio - Certidao de Conformidade.pdf',
    title: 'Certidão de Conformidade',
    category: 'empresa',
    visibility: 'public',
  },
  {
    file: 'Alio Analytics - BFA Coordenadas Bancarias.pdf',
    title: 'Coordenadas Bancárias — BFA',
    description: 'Dados bancários da Alio Analytics junto do BFA, para facturação.',
    category: 'empresa',
    visibility: 'public',
  },
  {
    file: 'Alio- Diário da República.pdf',
    title: 'Publicação — Diário da República',
    category: 'empresa',
    visibility: 'public',
  },
  {
    file: 'Aristoteles Bernardo - Registo Criminal.pdf',
    title: 'Registo Criminal — Aristóteles Bernardo',
    category: 'pessoal',
    visibility: 'protected',
  },
  {
    file: 'Aristoteles Bernardo BI.pdf',
    title: 'Bilhete de Identidade — Aristóteles Bernardo',
    category: 'pessoal',
    visibility: 'protected',
  },
  {
    file: 'Aristoteles_Bernardo_CTO_Resume_PT.pdf',
    title: 'Currículo — Aristóteles Bernardo (CTO)',
    category: 'pessoal',
    visibility: 'public',
  },
];

async function main() {
  const { data: existing, error: listError } = await supabase
    .from('alio_documents')
    .select('storage_path, title');
  if (listError) {
    console.error('Failed to read alio_documents — did you run the migration SQL yet?', listError.message);
    process.exit(1);
  }
  const alreadySeeded = new Set(existing.map((d) => d.title));

  for (const doc of DOCUMENTS) {
    if (alreadySeeded.has(doc.title)) {
      console.log(`skip (already seeded): ${doc.title}`);
      continue;
    }

    const filePath = path.join(UPLOAD_DIR, doc.file);
    const buffer = await readFile(filePath);
    const subfolder = doc.category === 'pessoal' ? 'pessoal/aristoteles_bernardo' : 'empresa';
    const storagePath = `documents/${subfolder}/${randomUUID()}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, buffer, { contentType: 'application/pdf' });
    if (uploadError) {
      console.error(`upload failed for ${doc.file}:`, uploadError.message);
      continue;
    }

    const { error: insertError } = await supabase.from('alio_documents').insert({
      title: doc.title,
      description: doc.description ?? null,
      category: doc.category,
      visibility: doc.visibility,
      storage_path: storagePath,
      mime_type: 'application/pdf',
      size_bytes: buffer.byteLength,
    });
    if (insertError) {
      console.error(`db insert failed for ${doc.file}, rolling back storage object:`, insertError.message);
      await supabase.storage.from(BUCKET).remove([storagePath]);
      continue;
    }

    console.log(`seeded (${doc.visibility}): ${doc.title} -> ${storagePath}`);
  }
}

main();
