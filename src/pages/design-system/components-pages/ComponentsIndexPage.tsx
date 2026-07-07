import { Link } from 'react-router-dom';
import {
  MousePointerClick, TextCursorInput, SquareStack, Navigation,
  MessageSquareWarning, Layers, LayoutList, Table2, BarChart3, Map, ArrowRight,
} from 'lucide-react';
import { Seo } from '../components/Seo';
import { PageHeader } from '../components/DocPrimitives';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { BASE } from '../nav';

const CATEGORIES = [
  { to: `${BASE}/components/buttons`, icon: MousePointerClick, title: 'Buttons', count: '7 variants', desc: 'Primary, secondary, outline, ghost, danger, success, link.' },
  { to: `${BASE}/components/forms`, icon: TextCursorInput, title: 'Forms', count: '7 controls', desc: 'Field, Input, Textarea, Select, Checkbox, Radio, Switch.' },
  { to: `${BASE}/components/cards`, icon: SquareStack, title: 'Cards', count: '2 components', desc: 'Card composition and KPI metric tiles.' },
  { to: `${BASE}/components/navigation`, icon: Navigation, title: 'Navigation', count: '4 components', desc: 'Tabs, Breadcrumb, Pagination, Stepper.' },
  { to: `${BASE}/components/feedback`, icon: MessageSquareWarning, title: 'Feedback', count: '5 components', desc: 'Alert, Toast, Progress, Spinner, Skeleton.' },
  { to: `${BASE}/components/overlays`, icon: Layers, title: 'Overlays', count: '3 components', desc: 'Modal, Drawer, Tooltip.' },
  { to: `${BASE}/components/display`, icon: LayoutList, title: 'Display', count: '3 components', desc: 'Badge, Avatar, Empty state.' },
  { to: `${BASE}/components/tables`, icon: Table2, title: 'Tables', count: '1 component', desc: 'Composable data table primitives.' },
  { to: `${BASE}/components/charts`, icon: BarChart3, title: 'Charts', count: '4 components', desc: 'Bar, Line, Donut, Sparkline.' },
  { to: `${BASE}/components/maps`, icon: Map, title: 'GIS / Maps', count: 'Pattern', desc: 'Map surface, legend and marker conventions.' },
];

export default function ComponentsIndexPage() {
  return (
    <>
      <Seo
        title="Components"
        description="The Alio Analytics component library — live, accessible, production React components."
        path={`${BASE}/components`}
      />
      <PageHeader
        eyebrow="Library"
        title="Components"
        description="Every component here is the real component shipped in the codebase (src/components/ui). What you preview is what you build with — one source of truth."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {CATEGORIES.map(({ to, icon: Icon, title, count, desc }) => (
          <Link key={to} to={to} className="group focus-visible:outline-none">
            <Card interactive className="h-full">
              <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-subtle text-brand">
                  <Icon size={20} />
                </span>
                <Badge variant="neutral" size="sm">{count}</Badge>
              </div>
              <h3 className="mt-4 flex items-center gap-1 text-h6 text-primary">
                {title}
                <ArrowRight size={15} className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
              </h3>
              <p className="mt-1 text-body-s text-tertiary">{desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
