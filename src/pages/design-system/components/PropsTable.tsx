import { Table, THead, TBody, TR, TH, TD } from '../../../components/ui/Table';

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <Table>
      <THead>
        <TR>
          <TH>Prop</TH>
          <TH>Type</TH>
          <TH>Default</TH>
          <TH>Description</TH>
        </TR>
      </THead>
      <TBody>
        {rows.map((r) => (
          <TR key={r.name}>
            <TD>
              <code className="font-mono text-body-s text-brand">{r.name}</code>
            </TD>
            <TD>
              <code className="font-mono text-caption text-tertiary">{r.type}</code>
            </TD>
            <TD>
              {r.default ? (
                <code className="font-mono text-caption text-tertiary">{r.default}</code>
              ) : (
                <span className="text-neutral-400">—</span>
              )}
            </TD>
            <TD className="text-body-s">{r.description}</TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
