import { LayoutDashboard, FileWarning, Map as MapIcon, BarChart3, Settings, Search, Plus, Compass } from 'lucide-react';
import { Seo } from './components/Seo';
import { PageHeader, Section } from './components/DocPrimitives';
import { AppShell } from '../../components/ui/AppShell';
import { KpiCard } from '../../components/ui/KpiCard';
import { Card } from '../../components/ui/Card';
import { BarChart, DonutChart } from '../../components/ui/Charts';
import { EmptyState } from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Avatar } from '../../components/ui/Avatar';
import { BASE } from './nav';

export default function PatternsPage() {
  return (
    <>
      <Seo title="Patterns" description="Dashboard layout, empty states and error page templates." path={`${BASE}/patterns`} />
      <PageHeader
        eyebrow="Templates"
        title="Patterns"
        description="Composed layouts assembled from the component library — the shapes real Alio products take."
      />

      <Section title="Dashboard layout" description="Navy sidebar shell, KPI row, and a chart grid — the canonical analytics view.">
        <AppShell
          brand={<span className="font-display font-bold">alio</span>}
          nav={[
            { label: 'Overview', icon: <LayoutDashboard size={16} />, active: true },
            { label: 'Analytics', icon: <BarChart3 size={16} /> },
            { label: 'Maps', icon: <MapIcon size={16} /> },
            { label: 'Settings', icon: <Settings size={16} /> },
          ]}
          topbar={
            <>
              <div className="w-full max-w-xs">
                <Input placeholder="Search…" leftIcon={<Search size={16} />} />
              </div>
              <div className="ml-auto flex items-center gap-3">
                <Button size="sm" leftIcon={<Plus size={16} />}>New report</Button>
                <Avatar name="Ana Bela" size="sm" />
              </div>
            </>
          }
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <KpiCard label="Revenue" value="Kz 84,2M" delta={4.1} deltaLabel="MTD" />
            <KpiCard label="Active users" value="12,480" delta={8.2} />
            <KpiCard label="Churn" value="2.1%" delta={-0.4} invertColors />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <p className="mb-4 text-h6 text-primary">Revenue trend</p>
              <BarChart
                data={[
                  { label: 'Jan', value: 32 }, { label: 'Feb', value: 41 }, { label: 'Mar', value: 38 },
                  { label: 'Apr', value: 55 }, { label: 'May', value: 61 }, { label: 'Jun', value: 72 },
                ]}
                height={160}
              />
            </Card>
            <Card>
              <p className="mb-4 text-h6 text-primary">By sector</p>
              <DonutChart
                size={140}
                data={[
                  { label: 'Gov', value: 42 }, { label: 'Bank', value: 28 },
                  { label: 'Oil', value: 18 }, { label: 'Health', value: 12 },
                ]}
              />
            </Card>
          </div>
        </AppShell>
      </Section>

      <Section title="Empty state" description="First-run and zero-data screens.">
        <div className="rounded-xl border border-border p-8">
          <EmptyState
            icon={<Compass size={22} />}
            title="Nothing here yet"
            description="Create your first project to bring datasets, dashboards and reports together."
            action={<Button leftIcon={<Plus size={16} />}>Create project</Button>}
          />
        </div>
      </Section>

      <Section title="Error page" description="404 / 500 template — calm, helpful, on-brand.">
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-bg-subtle px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-subtle text-brand">
            <FileWarning size={26} />
          </span>
          <div>
            <p className="font-mono text-overline uppercase tracking-[0.08em] text-tertiary">Error 404</p>
            <h3 className="mt-1 font-display text-h3 text-primary">We couldn't find that page</h3>
            <p className="mx-auto mt-2 max-w-md text-body-m text-secondary">
              The page may have moved. Your data is safe. Head back to the dashboard to continue.
            </p>
          </div>
          <div className="flex gap-3">
            <Button>Back to dashboard</Button>
            <Button variant="outline">Contact support</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
