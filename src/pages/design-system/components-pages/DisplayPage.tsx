import { FolderOpen, Plus } from 'lucide-react';
import { Seo } from '../components/Seo';
import { PageHeader, Section } from '../components/DocPrimitives';
import { ComponentPreview } from '../components/ComponentPreview';
import { PropsTable } from '../components/PropsTable';
import { Badge } from '../../../components/ui/Badge';
import { Avatar, AvatarGroup } from '../../../components/ui/Avatar';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Button } from '../../../components/ui/Button';
import { BASE } from '../nav';

export default function DisplayPage() {
  return (
    <>
      <Seo title="Display" description="Badge, Avatar and Empty state." path={`${BASE}/components/display`} />
      <PageHeader
        eyebrow="Components"
        title="Display"
        description="Small pieces that label, identify and fill space when there's no data yet."
      />

      <Section title="Badges">
        <ComponentPreview>
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="brand">Brand</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success" dot>Active</Badge>
          <Badge variant="warning" dot>Pending</Badge>
          <Badge variant="danger" dot>Failed</Badge>
          <Badge variant="info">Info</Badge>
        </ComponentPreview>
      </Section>

      <Section title="Avatars">
        <ComponentPreview>
          <Avatar name="Ana Bela" size="sm" />
          <Avatar name="João Mateus" size="md" />
          <Avatar name="Kelesa Ltd" size="lg" />
          <AvatarGroup max={3}>
            <Avatar name="Ana Bela" />
            <Avatar name="João Mateus" />
            <Avatar name="Rui Costa" />
            <Avatar name="Nia Kamba" />
            <Avatar name="Sara Lopez" />
          </AvatarGroup>
        </ComponentPreview>
      </Section>

      <Section title="Empty state" description="Say what's missing and offer the next step.">
        <ComponentPreview padded={false}>
          <div className="w-full p-8">
            <EmptyState
              icon={<FolderOpen size={22} />}
              title="No datasets yet"
              description="Connect a data source to start building dashboards and reports."
              action={<Button leftIcon={<Plus size={16} />}>Connect a source</Button>}
            />
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'Badge.variant', type: "'neutral' | 'brand' | 'accent' | 'success' | 'warning' | 'danger' | 'info'", default: "'neutral'", description: 'Semantic colour.' },
            { name: 'Badge.dot', type: 'boolean', default: 'false', description: 'Leading status dot.' },
            { name: 'Avatar.name', type: 'string', description: 'Used for initials fallback + alt text.' },
            { name: 'Avatar.size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Diameter.' },
            { name: 'EmptyState.action', type: 'ReactNode', description: 'Primary next-step control.' },
          ]}
        />
      </Section>
    </>
  );
}
