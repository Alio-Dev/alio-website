import { Modal } from '../../components/ui/Modal';
import type { VaultDocument } from './types';

export function DocumentViewerModal({
  doc,
  url,
  onClose,
}: {
  doc: VaultDocument | null;
  url: string | null;
  onClose: () => void;
}) {
  return (
    <Modal open={Boolean(doc && url)} onClose={onClose} title={doc?.title} size="lg">
      {url && (
        <iframe
          src={url}
          title={doc?.title}
          className="h-[75vh] w-full rounded-md border border-border-subtle"
        />
      )}
    </Modal>
  );
}
