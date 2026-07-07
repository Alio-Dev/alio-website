import { useState } from 'react';
import { Seo } from '../components/Seo';
import { PageHeader, Section } from '../components/DocPrimitives';
import { ComponentPreview } from '../components/ComponentPreview';
import { PropsTable } from '../components/PropsTable';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/Tabs';
import { Breadcrumb } from '../../../components/ui/Breadcrumb';
import { Pagination } from '../../../components/ui/Pagination';
import { Stepper } from '../../../components/ui/Stepper';
import { BASE } from '../nav';

export default function NavigationPage() {
  const [page, setPage] = useState(3);
  return (
    <>
      <Seo title="Navigation" description="Tabs, Breadcrumb, Pagination and Stepper." path={`${BASE}/components/navigation`} />
      <PageHeader
        eyebrow="Components"
        title="Navigation"
        description="Move between views and communicate progress. Keyboard-navigable and ARIA-wired."
      />

      <Section title="Tabs">
        <ComponentPreview align="start" padded>
          <div className="w-full">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="usage">Usage</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">Project health and recent activity.</TabsContent>
              <TabsContent value="usage">API calls, storage and seats this cycle.</TabsContent>
              <TabsContent value="billing">Invoices with IVA 14% and milestone billing.</TabsContent>
            </Tabs>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Breadcrumb">
        <ComponentPreview align="start">
          <Breadcrumb
            items={[
              { label: 'Dashboard', href: '#' },
              { label: 'Projects', href: '#' },
              { label: 'Muenho GIS' },
            ]}
          />
        </ComponentPreview>
      </Section>

      <Section title="Pagination">
        <ComponentPreview>
          <Pagination page={page} pageCount={12} onPageChange={setPage} />
        </ComponentPreview>
      </Section>

      <Section title="Stepper">
        <ComponentPreview align="start" padded>
          <div className="w-full max-w-xl">
            <Stepper
              current={1}
              steps={[
                { label: 'Account', description: 'Company details' },
                { label: 'Configure', description: 'Data sources' },
                { label: 'Review', description: 'Confirm & launch' },
              ]}
            />
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'Tabs.defaultValue / value', type: 'string', description: 'Uncontrolled / controlled active tab.' },
            { name: 'Pagination.page', type: 'number', description: 'Current 1-indexed page.' },
            { name: 'Pagination.pageCount', type: 'number', description: 'Total pages.' },
            { name: 'Stepper.current', type: 'number', description: '0-indexed active step; earlier steps show complete.' },
            { name: 'Breadcrumb.items', type: 'Crumb[]', description: '{ label, href? } — last item is the current page.' },
          ]}
        />
      </Section>
    </>
  );
}
