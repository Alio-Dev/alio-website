import { Users, DollarSign, Activity } from 'lucide-react';
import { Seo } from '../components/Seo';
import { PageHeader, Section } from '../components/DocPrimitives';
import { ComponentPreview } from '../components/ComponentPreview';
import { PropsTable } from '../components/PropsTable';
import { DoDont } from '../components/DoDont';
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { KpiCard } from '../../../components/ui/KpiCard';
import { BASE } from '../nav';

export default function CardsPage() {
  return (
    <>
      <Seo title="Cards" description="Alio card and KPI components." path={`${BASE}/components/cards`} />
      <PageHeader
        eyebrow="Components"
        title="Cards"
        description="Surfaces that group related content. White with a subtle border and 12px radius; interactive cards lift 2px on hover over 200ms."
      />

      <Section title="Composition">
        <ComponentPreview align="start">
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Muenho GIS platform</CardTitle>
              <CardDescription>Land parcel management for Kilamba Kiaxi.</CardDescription>
            </CardHeader>
            <CardContent className="mt-3">
              Real-time spatial analytics across 14,000 parcels with offline field capture.
            </CardContent>
            <CardFooter>
              <Button size="sm">Open</Button>
              <Button size="sm" variant="ghost">Details</Button>
            </CardFooter>
          </Card>
        </ComponentPreview>
      </Section>

      <Section title="Interactive">
        <ComponentPreview>
          <Card interactive className="max-w-xs">
            <CardTitle>Hover me</CardTitle>
            <CardContent className="mt-1">Lifts on hover — use for clickable cards.</CardContent>
          </Card>
        </ComponentPreview>
      </Section>

      <Section title="KPI cards" description="Dashboard metric tiles with directional deltas.">
        <ComponentPreview padded={false}>
          <div className="grid w-full grid-cols-1 gap-4 p-8 sm:grid-cols-3">
            <KpiCard label="Active users" value="12,480" delta={8.2} deltaLabel="vs last month" icon={<Users size={16} />} />
            <KpiCard label="Revenue" value="Kz 84,2M" delta={4.1} deltaLabel="MTD" icon={<DollarSign size={16} />} />
            <KpiCard label="Churn" value="2.1%" delta={-0.4} deltaLabel="improved" invertColors icon={<Activity size={16} />} />
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'Card.interactive', type: 'boolean', default: 'false', description: 'Adds hover lift + shadow.' },
            { name: 'Card.padding', type: "'none' | 'sm' | 'md' | 'lg'", default: "'md'", description: '0 / 16 / 24 / 32px.' },
            { name: 'KpiCard.value', type: 'string', description: 'Formatted metric (e.g. Kz 84,2M).' },
            { name: 'KpiCard.delta', type: 'number', description: 'Percent change; sign drives arrow + colour.' },
            { name: 'KpiCard.invertColors', type: 'boolean', default: 'false', description: 'When down is good (cost, churn).' },
          ]}
        />
      </Section>

      <Section title="Guidelines">
        <DoDont
          dos={[
            { text: 'Use borders as the primary separation; keep shadows subtle.' },
            { text: 'Format currency as Kz 1.000.000,00 in KPI values.' },
            { text: 'Reserve interactive cards for genuinely clickable surfaces.' },
          ]}
          donts={[
            { text: 'Nest cards more than one level deep.' },
            { text: 'Use pure-black shadows — always indigo-tinted.' },
            { text: 'Put more than one primary action in a card footer.' },
          ]}
        />
      </Section>
    </>
  );
}
