import { ArrowRight, Plus, Trash2 } from 'lucide-react';
import { Seo } from '../components/Seo';
import { PageHeader, Section } from '../components/DocPrimitives';
import { ComponentPreview } from '../components/ComponentPreview';
import { PropsTable } from '../components/PropsTable';
import { DoDont } from '../components/DoDont';
import { Button } from '../../../components/ui/Button';
import { BASE } from '../nav';

export default function ButtonsPage() {
  return (
    <>
      <Seo title="Buttons" description="Alio button component — variants, sizes, states." path={`${BASE}/components/buttons`} />
      <PageHeader
        eyebrow="Components"
        title="Buttons"
        description="Actions the user can take. Primary uses indigo-700 (indigo-400 in dark mode); reserve one primary action per view."
      />

      <Section title="Variants">
        <ComponentPreview
          code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>
<Button variant="link">Link</Button>`}
        >
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="success">Success</Button>
          <Button variant="link">Link</Button>
        </ComponentPreview>
      </Section>

      <Section title="Sizes">
        <ComponentPreview
          code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
        >
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </ComponentPreview>
      </Section>

      <Section title="With icons">
        <ComponentPreview
          code={`<Button leftIcon={<Plus size={16} />}>New report</Button>
<Button variant="outline" rightIcon={<ArrowRight size={16} />}>Continue</Button>
<Button variant="danger" leftIcon={<Trash2 size={16} />}>Delete</Button>`}
        >
          <Button leftIcon={<Plus size={16} />}>New report</Button>
          <Button variant="outline" rightIcon={<ArrowRight size={16} />}>Continue</Button>
          <Button variant="danger" leftIcon={<Trash2 size={16} />}>Delete</Button>
        </ComponentPreview>
      </Section>

      <Section title="States">
        <ComponentPreview
          code={`<Button loading>Saving</Button>
<Button disabled>Disabled</Button>
<Button fullWidth>Full width</Button>`}
        >
          <Button loading>Saving</Button>
          <Button disabled>Disabled</Button>
          <div className="w-full">
            <Button fullWidth>Full width</Button>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'link'", default: "'primary'", description: 'Visual style / semantic intent.' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Height 32 / 40 / 48px.' },
            { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a spinner and disables the button.' },
            { name: 'leftIcon / rightIcon', type: 'ReactNode', description: 'Icon before / after the label.' },
            { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretch to container width.' },
            { name: '...props', type: 'ButtonHTMLAttributes', description: 'All native button attributes (onClick, type, etc.).' },
          ]}
        />
      </Section>

      <Section title="Guidelines">
        <DoDont
          dos={[
            { text: 'Use one primary button per view to signal the main action.' },
            { text: 'Lead labels with a verb — “Create report”, not “Report”.' },
            { text: 'Pair danger buttons with a confirmation for destructive actions.' },
          ]}
          donts={[
            { text: 'Stack multiple primary buttons competing for attention.' },
            { text: 'Use exclamation marks or ALL CAPS in labels.' },
            { text: 'Disable a button without explaining why nearby.' },
          ]}
        />
      </Section>
    </>
  );
}
