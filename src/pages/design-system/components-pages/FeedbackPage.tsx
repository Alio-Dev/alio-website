import { Seo } from '../components/Seo';
import { PageHeader, Section } from '../components/DocPrimitives';
import { ComponentPreview } from '../components/ComponentPreview';
import { PropsTable } from '../components/PropsTable';
import { Alert } from '../../../components/ui/Alert';
import { Button } from '../../../components/ui/Button';
import { Progress } from '../../../components/ui/Progress';
import { Spinner } from '../../../components/ui/Spinner';
import { Skeleton } from '../../../components/ui/Skeleton';
import { useToast } from '../../../components/ui/Toast';
import { BASE } from '../nav';

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" onClick={() => toast({ variant: 'success', title: 'Report generated', description: 'Your Q2 export is ready to download.' })}>
        Success toast
      </Button>
      <Button variant="outline" onClick={() => toast({ variant: 'danger', title: 'Upload failed', description: 'Your data is safe. Try again in a moment.' })}>
        Error toast
      </Button>
      <Button variant="outline" onClick={() => toast({ variant: 'info', title: 'Sync started' })}>
        Info toast
      </Button>
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <>
      <Seo title="Feedback" description="Alert, Toast, Progress, Spinner and Skeleton." path={`${BASE}/components/feedback`} />
      <PageHeader
        eyebrow="Components"
        title="Feedback"
        description="Tell the user what's happening. Errors say what went wrong, reassure the data is safe, and give the next step."
      />

      <Section title="Alerts">
        <ComponentPreview align="start" padded>
          <div className="w-full space-y-3">
            <Alert variant="info" title="Scheduled maintenance">Analytics may be briefly unavailable on Sunday 02:00 WAT.</Alert>
            <Alert variant="success" title="Payment received">Invoice INV-0042 has been settled.</Alert>
            <Alert variant="warning" title="Storage almost full">You've used 92% of your plan's storage.</Alert>
            <Alert variant="danger" title="Connection lost" onClose={() => {}}>We couldn't reach the data source. Your work is saved.</Alert>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Toasts" description="Transient notifications, auto-dismiss after 4s. Wrap your app in ToastProvider and call useToast().">
        <ComponentPreview>
          <ToastDemo />
        </ComponentPreview>
      </Section>

      <Section title="Progress">
        <ComponentPreview align="start">
          <div className="w-full max-w-sm space-y-4">
            <Progress value={72} label="Importing parcels" showValue />
            <Progress value={40} variant="accent" />
            <Progress value={95} variant="success" label="Almost done" showValue />
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Spinner & Skeleton">
        <ComponentPreview>
          <div className="flex items-center gap-8">
            <Spinner size={28} className="text-brand" />
            <div className="w-56 space-y-2">
              <Skeleton variant="text" className="w-3/4" />
              <Skeleton variant="text" className="w-full" />
              <Skeleton variant="rect" className="h-16 w-full" />
            </div>
          </div>
        </ComponentPreview>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'Alert.variant', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", description: 'Semantic colour + icon.' },
            { name: 'Alert.onClose', type: '() => void', description: 'Renders a dismiss button when provided.' },
            { name: 'toast()', type: '(opts) => void', description: '{ title, description?, variant?, duration? }' },
            { name: 'Progress.value / max', type: 'number', description: 'Fraction filled; max defaults to 100.' },
            { name: 'Skeleton.variant', type: "'text' | 'rect' | 'circle'", default: "'rect'", description: 'Placeholder shape.' },
          ]}
        />
      </Section>
    </>
  );
}
