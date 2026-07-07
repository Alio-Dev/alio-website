import { Seo } from '../components/Seo';
import { PageHeader, Section } from '../components/DocPrimitives';
import { ComponentPreview } from '../components/ComponentPreview';
import { PropsTable } from '../components/PropsTable';
import { Table, THead, TBody, TR, TH, TD } from '../../../components/ui/Table';
import { Badge } from '../../../components/ui/Badge';
import { BASE } from '../nav';

const ROWS = [
  { project: 'Muenho GIS', client: 'Gov. Kilamba', status: 'Active', value: 'Kz 42.000.000,00' },
  { project: 'Okwenda BI', client: 'BFA', status: 'Active', value: 'Kz 18.500.000,00' },
  { project: 'Kelesa App', client: 'Kelesa Ltd', status: 'Pending', value: 'Kz 9.200.000,00' },
  { project: 'Start Portal', client: 'Startup Inc', status: 'Closed', value: 'Kz 3.000.000,00' },
];

const statusVariant = { Active: 'success', Pending: 'warning', Closed: 'neutral' } as const;

export default function TablesPage() {
  return (
    <>
      <Seo title="Tables" description="Alio data table primitives." path={`${BASE}/components/tables`} />
      <PageHeader
        eyebrow="Components"
        title="Tables"
        description="Composable primitives for dense data. Bordered container, uppercase mono headers, hover-highlight rows."
      />

      <Section title="Data table">
        <ComponentPreview padded={false} align="start">
          <div className="w-full p-6">
            <Table>
              <THead>
                <TR>
                  <TH>Project</TH>
                  <TH>Client</TH>
                  <TH>Status</TH>
                  <TH className="text-right">Contract value</TH>
                </TR>
              </THead>
              <TBody>
                {ROWS.map((r) => (
                  <TR key={r.project} interactive>
                    <TD className="font-medium text-primary">{r.project}</TD>
                    <TD>{r.client}</TD>
                    <TD>
                      <Badge variant={statusVariant[r.status as keyof typeof statusVariant]} size="sm" dot>
                        {r.status}
                      </Badge>
                    </TD>
                    <TD className="text-right font-mono">{r.value}</TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Anatomy">
        <PropsTable
          rows={[
            { name: 'Table', type: 'element', description: 'Scroll container + <table>.' },
            { name: 'THead / TBody', type: 'element', description: 'Section wrappers; TBody divides rows.' },
            { name: 'TR', type: 'element', description: 'Row; interactive adds hover highlight + pointer.' },
            { name: 'TH', type: 'element', description: 'Column header (uppercase mono caption).' },
            { name: 'TD', type: 'element', description: 'Cell; pass className for alignment.' },
          ]}
        />
      </Section>
    </>
  );
}
