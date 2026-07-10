import {
  Download, FileText, CreditCard, Mail, Presentation, FileSpreadsheet,
  Share2, ImageIcon, Info, FileEdit,
} from 'lucide-react';
import { Seo } from './components/Seo';
import { PageHeader, Section } from './components/DocPrimitives';
import { Card } from '../../components/ui/Card';
import { Alert } from '../../components/ui/Alert';
import { LinkButton } from '../../components/ui/Button';
import { BASE } from './nav';

interface LogoAsset {
  icon: typeof FileText;
  title: string;
  desc: string;
  href: string;
}

const LOGO_PACK: LogoAsset[] = [
  { icon: ImageIcon, title: 'Logo — gradient', desc: 'Primary lockup, SVG', href: '/Alio.svg' },
  { icon: ImageIcon, title: 'Symbol — navy', desc: 'Mono navy mark, SVG', href: '/brand/alio-icon-navy.svg' },
  { icon: ImageIcon, title: 'Symbol — white', desc: 'For dark surfaces, SVG', href: '/brand/alio-icon-white.svg' },
  { icon: ImageIcon, title: 'Symbol — black', desc: 'Mono black mark, SVG', href: '/brand/alio-icon-black.svg' },
];

interface EditableFile {
  /** Short format label shown on the button, e.g. "DOCX". */
  format: string;
  href: string;
  /** Optional secondary file (e.g. the .dotx/.potx template variant). */
  templateHref?: string;
  templateFormat?: string;
}

interface DocAsset {
  icon: typeof FileText;
  title: string;
  desc: string;
  preview: string;
  files: { label: string; href: string }[];
  editable?: EditableFile;
}

const K = '/brand-kit';
const DOCUMENTS: DocAsset[] = [
  {
    icon: CreditCard, title: 'Business card', desc: 'Print-ready · 85×55mm + 3mm bleed',
    preview: `${K}/alio-business-card-front.png`,
    files: [
      { label: 'Front SVG', href: `${K}/alio-business-card-front.svg` },
      { label: 'Back SVG', href: `${K}/alio-business-card-back.svg` },
      { label: 'PNG', href: `${K}/alio-business-card-front.png` },
    ],
    editable: { format: 'Print PDF', href: `${K}/alio-business-card-print.pdf` },
  },
  {
    icon: Mail, title: 'Letterhead', desc: 'A4 · logo header + fiscal footer',
    preview: `${K}/alio-letterhead.png`,
    files: [
      { label: 'SVG', href: `${K}/alio-letterhead.svg` },
      { label: 'PNG', href: `${K}/alio-letterhead.png` },
    ],
    editable: {
      format: 'DOCX', href: `${K}/alio-letterhead.docx`,
      templateFormat: 'DOTX template', templateHref: `${K}/alio-letterhead.dotx`,
    },
  },
  {
    icon: Presentation, title: 'Presentation template', desc: '16:9 · 8 layouts — title, section, content, two-column, data, quote, team, closing',
    preview: `${K}/alio-presentation-title.png`,
    files: [
      { label: 'Title', href: `${K}/alio-presentation-title.svg` },
      { label: 'Section', href: `${K}/alio-presentation-section.svg` },
      { label: 'Content', href: `${K}/alio-presentation-content.svg` },
    ],
    editable: {
      format: 'PPTX', href: `${K}/alio-presentation.pptx`,
      templateFormat: 'POTX template', templateHref: `${K}/alio-presentation.potx`,
    },
  },
  {
    icon: FileText, title: 'Proposal template', desc: 'A4 · cover + structured sections + pricing & signature',
    preview: `${K}/alio-proposal-cover.png`,
    files: [
      { label: 'Cover', href: `${K}/alio-proposal-cover.svg` },
      { label: 'Content', href: `${K}/alio-proposal-content.svg` },
    ],
    editable: {
      format: 'DOCX', href: `${K}/alio-proposal.docx`,
      templateFormat: 'DOTX template', templateHref: `${K}/alio-proposal.dotx`,
    },
  },
  {
    icon: FileSpreadsheet, title: 'Invoice template', desc: 'A4 · IVA 14% auto-calculated · AGT-compliant',
    preview: `${K}/alio-invoice-template.png`,
    files: [
      { label: 'SVG', href: `${K}/alio-invoice-template.svg` },
      { label: 'PNG', href: `${K}/alio-invoice-template.png` },
    ],
    editable: { format: 'XLSX', href: `${K}/alio-invoice.xlsx` },
  },
  {
    icon: Share2, title: 'Social media kit', desc: 'LinkedIn banner + Instagram post & story',
    preview: `${K}/alio-social-instagram-post.png`,
    files: [
      { label: 'LinkedIn', href: `${K}/alio-social-linkedin-banner.png` },
      { label: 'IG post', href: `${K}/alio-social-instagram-post.png` },
      { label: 'IG story', href: `${K}/alio-social-instagram-story.png` },
    ],
  },
];

function LogoCard({ icon: Icon, title, desc, href }: LogoAsset) {
  return (
    <a href={href} download className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-lg">
      <Card interactive className="flex h-full items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-brand">
          <Icon size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-body-m font-semibold text-primary">{title}</h3>
            <Download size={16} className="shrink-0 text-tertiary" />
          </div>
          <p className="mt-0.5 text-body-s text-tertiary">{desc}</p>
        </div>
      </Card>
    </a>
  );
}

function DocumentCard({ icon: Icon, title, desc, preview, files, editable }: DocAsset) {
  return (
    <Card padding="none" className="flex h-full flex-col overflow-hidden">
      <div className="flex h-44 items-center justify-center border-b border-border-subtle bg-bg-subtle p-4">
        <img
          src={preview}
          alt={`${title} preview`}
          loading="lazy"
          className="max-h-full max-w-full rounded shadow-sm"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-brand">
            <Icon size={16} />
          </span>
          <h3 className="text-body-m font-semibold text-primary">{title}</h3>
        </div>
        <p className="mb-4 text-body-s text-tertiary">{desc}</p>

        {editable && (
          <div className="mb-3">
            <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wide text-tertiary">
              Editable
            </p>
            <div className="flex flex-wrap gap-2">
              <LinkButton
                href={editable.href}
                download
                size="sm"
                variant="primary"
                leftIcon={<FileEdit size={14} />}
                aria-label={`Download editable ${editable.format} for ${title}`}
              >
                {editable.format}
              </LinkButton>
              {editable.templateHref && (
                <LinkButton
                  href={editable.templateHref}
                  download
                  size="sm"
                  variant="outline"
                  leftIcon={<Download size={13} />}
                  aria-label={`Download ${editable.templateFormat} for ${title}`}
                >
                  {editable.templateFormat}
                </LinkButton>
              )}
            </div>
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {files.map((f) => (
            <a
              key={f.label}
              href={f.href}
              download
              aria-label={`Download ${title} — ${f.label}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1.5 text-caption font-medium text-secondary transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              <Download size={13} />
              {f.label}
            </a>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default function BrandKitPage() {
  return (
    <>
      <Seo title="Brand kit" description="Downloadable Alio Analytics assets — logos, editable document templates and social media kit." path={`${BASE}/brand-kit`} />
      <PageHeader
        eyebrow="Resources"
        title="Brand kit"
        description="Everything you need to represent Alio consistently — logos, editable document templates, and a social media kit. Every file is built to the design-system specification (colour, type, logo, fiscal details)."
      />

      <Alert variant="info" title="Formats & editing" className="mb-8" icon={<Info size={18} />}>
        Each template offers an <strong>editable</strong> version (Word/PowerPoint/Excel/print PDF —
        the file you reopen and fill in) alongside <strong>SVG</strong> (vector export) and{' '}
        <strong>PNG</strong> (ready to use) exports. Editable files use the brand fonts (Sora ·
        Instrument Sans · JetBrains Mono) by name — they render correctly if installed, and fall
        back safely otherwise so layout never breaks. Placeholders in{' '}
        <code className="mx-1 font-mono">{'{{ }}'}</code> or{' '}
        <code className="mx-1 font-mono">[ brackets ]</code> are meant to be replaced. The invoice's
        totals are live formulas — editing a quantity or price recalculates IVA (14%) and the
        grand total automatically.
      </Alert>

      <Section title="Logo pack">
        <div className="grid gap-4 sm:grid-cols-2">
          {LOGO_PACK.map((a) => <LogoCard key={a.title} {...a} />)}
        </div>
      </Section>

      <Section title="Documents & templates">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DOCUMENTS.map((a) => <DocumentCard key={a.title} {...a} />)}
        </div>
      </Section>

      <Section title="Fiscal details" description="Used in the invoice, letterhead and proposal templates.">
        <Card className="font-mono text-body-s text-secondary">
          <dl className="grid gap-2 sm:grid-cols-2">
            <div><dt className="text-tertiary">Entity</dt><dd className="text-primary">Alio Analytics, Lda</dd></div>
            <div><dt className="text-tertiary">NIF</dt><dd className="text-primary">5001021800</dd></div>
            <div><dt className="text-tertiary">IBAN</dt><dd className="text-primary">AO06 0006 0000 74963202301 93</dd></div>
            <div><dt className="text-tertiary">Bank</dt><dd className="text-primary">Banco de Fomento Angola (BFA)</dd></div>
            <div className="sm:col-span-2"><dt className="text-tertiary">Address</dt><dd className="text-primary">Rua 49, Bairro Nova Vida, Edifício E-67, Kilamba Kiaxi, Luanda</dd></div>
          </dl>
        </Card>
      </Section>
    </>
  );
}
