import {
  Download, FileText, CreditCard, Mail, Presentation, FileSpreadsheet,
  Share2, Package, ImageIcon,
} from 'lucide-react';
import { Seo } from './components/Seo';
import { PageHeader, Section } from './components/DocPrimitives';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Alert } from '../../components/ui/Alert';
import { BASE } from './nav';

interface Asset {
  icon: typeof FileText;
  title: string;
  desc: string;
  href?: string;
  ready?: boolean;
}

const LOGO_PACK: Asset[] = [
  { icon: ImageIcon, title: 'Logo — gradient', desc: 'Primary lockup, SVG', href: '/Alio.svg', ready: true },
  { icon: ImageIcon, title: 'Symbol — navy', desc: 'Mono navy mark, SVG', href: '/brand/alio-icon-navy.svg', ready: true },
  { icon: ImageIcon, title: 'Symbol — white', desc: 'For dark surfaces, SVG', href: '/brand/alio-icon-white.svg', ready: true },
  { icon: ImageIcon, title: 'Symbol — black', desc: 'Mono black mark, SVG', href: '/brand/alio-icon-black.svg', ready: true },
];

const DOCUMENTS: Asset[] = [
  { icon: CreditCard, title: 'Business card', desc: 'Print-ready, 85×55mm' },
  { icon: Mail, title: 'Letterhead', desc: 'A4 with fiscal footer' },
  { icon: Presentation, title: 'Presentation template', desc: '16:9 deck' },
  { icon: FileText, title: 'Proposal template', desc: 'Structured document' },
  { icon: FileSpreadsheet, title: 'Invoice template', desc: 'IVA 14% · AGT-compliant' },
  { icon: Share2, title: 'Social media kit', desc: 'LinkedIn / Instagram sizes' },
];

function AssetCard({ icon: Icon, title, desc, href, ready }: Asset) {
  const inner = (
    <Card interactive={ready} className="flex h-full items-start gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-brand">
        <Icon size={20} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-body-m font-semibold text-primary">{title}</h3>
          {ready ? (
            <Download size={16} className="shrink-0 text-tertiary" />
          ) : (
            <Badge variant="neutral" size="sm">Soon</Badge>
          )}
        </div>
        <p className="mt-0.5 text-body-s text-tertiary">{desc}</p>
      </div>
    </Card>
  );
  return ready && href ? (
    <a href={href} download className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-lg">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}

export default function BrandKitPage() {
  return (
    <>
      <Seo title="Brand kit" description="Downloadable Alio Analytics assets — logos, documents and social templates." path={`${BASE}/brand-kit`} />
      <PageHeader
        eyebrow="Resources"
        title="Brand kit"
        description="Everything you need to represent Alio consistently. Logo files are ready now; document templates are marked “Soon” — drop the files into /public/brand to activate the links."
      />

      <Alert variant="info" title="Placeholder links" className="mb-8" icon={<Package size={18} />}>
        Items marked “Soon” are wired and waiting for their source files. Upload
        the asset to <code className="font-mono">/public/brand</code> and set its{' '}
        <code className="font-mono">href</code> to publish.
      </Alert>

      <Section title="Logo pack">
        <div className="grid gap-4 sm:grid-cols-2">
          {LOGO_PACK.map((a) => <AssetCard key={a.title} {...a} />)}
        </div>
      </Section>

      <Section title="Documents & templates">
        <div className="grid gap-4 sm:grid-cols-2">
          {DOCUMENTS.map((a) => <AssetCard key={a.title} {...a} />)}
        </div>
      </Section>

      <Section title="Fiscal details" description="For invoices and formal documents.">
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
