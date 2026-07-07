import { useState } from 'react';
import { Mail, Search } from 'lucide-react';
import { Seo } from '../components/Seo';
import { PageHeader, Section } from '../components/DocPrimitives';
import { ComponentPreview } from '../components/ComponentPreview';
import { PropsTable } from '../components/PropsTable';
import { DoDont } from '../components/DoDont';
import { Field } from '../../../components/ui/Field';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { Select } from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Radio } from '../../../components/ui/Radio';
import { Switch } from '../../../components/ui/Switch';
import { BASE } from '../nav';

export default function FormsPage() {
  const [notify, setNotify] = useState(true);
  const [plan, setPlan] = useState('growth');
  return (
    <>
      <Seo title="Forms" description="Alio form controls — Field, Input, Textarea, Select, Checkbox, Radio, Switch." path={`${BASE}/components/forms`} />
      <PageHeader
        eyebrow="Components"
        title="Forms"
        description="Accessible inputs with always-visible labels. Focus draws a cyan border plus a soft 3px ring; errors use danger-500 borders on a danger-50 field."
      />

      <Section title="Field + Input" description="Field wires a visible label, help text and error to the control via aria-describedby.">
        <ComponentPreview align="start" padded>
          <div className="w-full max-w-sm space-y-4">
            <Field label="Work email" description="We'll only use this for account notices.">
              <Input type="email" placeholder="you@company.ao" leftIcon={<Mail size={16} />} />
            </Field>
            <Field label="Company" required>
              <Input placeholder="Alio Analytics, Lda" />
            </Field>
            <Field label="API key" error="This key has expired. Generate a new one.">
              <Input defaultValue="sk_live_2b3990" invalid />
            </Field>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Textarea & Select">
        <ComponentPreview align="start">
          <div className="w-full max-w-sm space-y-4">
            <Field label="Project brief">
              <Textarea placeholder="Describe the problem you're solving…" />
            </Field>
            <Field label="Industry">
              <Select defaultValue="">
                <option value="" disabled>Select an industry</option>
                <option value="gov">Government</option>
                <option value="oil">Oil &amp; Gas</option>
                <option value="bank">Banking</option>
                <option value="health">Healthcare</option>
              </Select>
            </Field>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Search input">
        <ComponentPreview align="start">
          <div className="w-full max-w-sm">
            <Input placeholder="Search datasets…" leftIcon={<Search size={16} />} />
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Checkbox, Radio & Switch">
        <ComponentPreview align="start">
          <div className="space-y-5">
            <div className="space-y-2">
              <Checkbox label="Enable audit logging" description="Records every data access event." defaultChecked />
              <Checkbox label="Share anonymised usage" />
              <Checkbox label="Indeterminate group" indeterminate />
            </div>
            <div className="space-y-2" role="radiogroup" aria-label="Plan">
              {['starter', 'growth', 'scale'].map((p) => (
                <Radio
                  key={p}
                  name="plan"
                  label={p[0].toUpperCase() + p.slice(1)}
                  checked={plan === p}
                  onChange={() => setPlan(p)}
                />
              ))}
            </div>
            <Switch label="Email me weekly reports" checked={notify} onChange={(e) => setNotify(e.target.checked)} />
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Props — Field & Input">
        <PropsTable
          rows={[
            { name: 'Field.label', type: 'ReactNode', description: 'Visible label (13px / 600).' },
            { name: 'Field.description', type: 'ReactNode', description: 'Help text below the control.' },
            { name: 'Field.error', type: 'ReactNode', description: 'Error message; also flags the control invalid.' },
            { name: 'Field.required', type: 'boolean', default: 'false', description: 'Appends a danger asterisk.' },
            { name: 'Input.leftIcon / rightIcon', type: 'ReactNode', description: 'Inline adornment.' },
            { name: 'Input.invalid', type: 'boolean', description: 'Force the error style (auto-set by Field).' },
          ]}
        />
      </Section>

      <Section title="Guidelines">
        <DoDont
          dos={[
            { text: 'Keep labels visible above the field — never rely on placeholders alone.' },
            { text: 'Explain what happened in errors and reassure the data is safe.' },
            { text: 'Group related toggles and give radio groups an accessible name.' },
          ]}
          donts={[
            { text: 'Use placeholder text as the only label.' },
            { text: 'Blame the user (“You entered an invalid value”).' },
            { text: 'Turn off focus rings to “clean up” the look.' },
          ]}
        />
      </Section>
    </>
  );
}
