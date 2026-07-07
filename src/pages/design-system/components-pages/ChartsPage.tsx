import { Seo } from '../components/Seo';
import { PageHeader, Section } from '../components/DocPrimitives';
import { ComponentPreview } from '../components/ComponentPreview';
import { PropsTable } from '../components/PropsTable';
import { BarChart, LineChart, DonutChart, Sparkline } from '../../../components/ui/Charts';
import { Card } from '../../../components/ui/Card';
import { BASE } from '../nav';

const REVENUE = [
  { label: 'Jan', value: 32 }, { label: 'Feb', value: 41 }, { label: 'Mar', value: 38 },
  { label: 'Apr', value: 55 }, { label: 'May', value: 61 }, { label: 'Jun', value: 72 },
];
const SECTORS = [
  { label: 'Government', value: 42 }, { label: 'Banking', value: 28 },
  { label: 'Oil & Gas', value: 18 }, { label: 'Healthcare', value: 12 },
];

export default function ChartsPage() {
  return (
    <>
      <Seo title="Charts" description="Bar, Line, Donut and Sparkline built on the Alio chart palette." path={`${BASE}/components/charts`} />
      <PageHeader
        eyebrow="Data visualisation"
        title="Charts"
        description="Dependency-free SVG charts wired to the categorical chart palette (--chart-1…8). Theme-aware and responsive."
      />

      <Section title="Bar chart">
        <ComponentPreview padded={false} align="start">
          <div className="w-full p-8">
            <BarChart data={REVENUE} />
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Line chart">
        <ComponentPreview padded={false} align="start">
          <div className="w-full p-8">
            <LineChart data={REVENUE} />
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Donut chart">
        <ComponentPreview align="start">
          <DonutChart data={SECTORS} />
        </ComponentPreview>
      </Section>

      <Section title="Sparkline" description="Inline trend for KPI tiles and table cells.">
        <ComponentPreview>
          <Card className="flex items-center gap-4">
            <div>
              <p className="text-caption uppercase tracking-wide text-tertiary">Sessions</p>
              <p className="font-display text-h4 text-primary">8,204</p>
            </div>
            <Sparkline values={[4, 6, 5, 8, 7, 10, 9, 12]} width={140} height={40} />
          </Card>
        </ComponentPreview>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'BarChart.data / LineChart.data', type: '{ label, value }[]', description: 'Series to plot.' },
            { name: 'colorIndex', type: 'number', description: 'Index into the 8-colour chart palette.' },
            { name: 'DonutChart.data', type: '{ label, value }[]', description: 'Segments with an auto legend + %.' },
            { name: 'Sparkline.values', type: 'number[]', description: 'Raw trend values.' },
          ]}
        />
      </Section>
    </>
  );
}
