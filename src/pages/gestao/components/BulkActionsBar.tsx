import { Eye, EyeOff, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export function BulkActionsBar({
  count,
  onPublish,
  onUnpublish,
  onDelete,
  onClear,
}: {
  count: number;
  onPublish: () => void;
  onUnpublish: () => void;
  onDelete: () => void;
  onClear: () => void;
}) {
  if (count === 0) return null;
  return (
    <div className="flex items-center justify-between rounded-lg border border-brand bg-brand-subtle px-4 py-2.5">
      <span className="text-body-s font-medium text-brand">{count} seleccionado{count > 1 ? 's' : ''}</span>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" leftIcon={<Eye size={14} />} onClick={onPublish}>Publicar</Button>
        <Button size="sm" variant="outline" leftIcon={<EyeOff size={14} />} onClick={onUnpublish}>Despublicar</Button>
        <Button size="sm" variant="ghost" leftIcon={<Trash2 size={14} />} onClick={onDelete}>Apagar</Button>
        <Button size="sm" variant="ghost" onClick={onClear}>Cancelar</Button>
      </div>
    </div>
  );
}
