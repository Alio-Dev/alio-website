import { useState } from 'react';
import { Info } from 'lucide-react';
import { Seo } from '../components/Seo';
import { PageHeader, Section } from '../components/DocPrimitives';
import { ComponentPreview } from '../components/ComponentPreview';
import { PropsTable } from '../components/PropsTable';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { Drawer } from '../../../components/ui/Drawer';
import { Tooltip } from '../../../components/ui/Tooltip';
import { BASE } from '../nav';

export default function OverlaysPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <Seo title="Overlays" description="Modal, Drawer and Tooltip." path={`${BASE}/components/overlays`} />
      <PageHeader
        eyebrow="Components"
        title="Overlays"
        description="Content layered above the page. Modals and drawers trap focus, lock scroll and close on Escape or backdrop click."
      />

      <Section title="Modal">
        <ComponentPreview>
          <Button onClick={() => setModalOpen(true)}>Open modal</Button>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Delete project?"
            description="This removes Muenho GIS and all its datasets."
            footer={
              <>
                <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button variant="danger" onClick={() => setModalOpen(false)}>Delete project</Button>
              </>
            }
          >
            This action can't be undone. Exported reports remain available for 30 days.
          </Modal>
        </ComponentPreview>
      </Section>

      <Section title="Drawer">
        <ComponentPreview>
          <Button variant="outline" onClick={() => setDrawerOpen(true)}>Open drawer</Button>
          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            title="Filters"
            footer={<Button fullWidth onClick={() => setDrawerOpen(false)}>Apply filters</Button>}
          >
            Slide-over panel for filters, details or secondary flows. Content scrolls independently.
          </Drawer>
        </ComponentPreview>
      </Section>

      <Section title="Tooltip">
        <ComponentPreview>
          <Tooltip content="Data refreshed 4 minutes ago">
            <Button variant="ghost" leftIcon={<Info size={16} />}>Hover or focus me</Button>
          </Tooltip>
        </ComponentPreview>
      </Section>

      <Section title="Props">
        <PropsTable
          rows={[
            { name: 'Modal.open / onClose', type: 'boolean / () => void', description: 'Controlled visibility.' },
            { name: 'Modal.size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Max width of the dialog.' },
            { name: 'Modal.footer', type: 'ReactNode', description: 'Action row pinned to the bottom.' },
            { name: 'Drawer.side', type: "'left' | 'right'", default: "'right'", description: 'Edge the panel slides from.' },
            { name: 'Tooltip.side', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Placement relative to the trigger.' },
          ]}
        />
      </Section>
    </>
  );
}
