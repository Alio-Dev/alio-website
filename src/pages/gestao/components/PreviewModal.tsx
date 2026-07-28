import { Modal } from '../../../components/ui/Modal';

/**
 * Renders the actual public-facing components (no site chrome — nav/footer
 * would look broken this small) so what the admin sees here matches what
 * goes live, before they flip "published" on.
 */
export function PreviewModal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Modal open={open} onClose={onClose} title="Pré-visualização" size="lg">
      <div className="-m-6 max-h-[75vh] overflow-y-auto bg-bg">{children}</div>
    </Modal>
  );
}
