import { createContext, useContext, useId, useState } from 'react';
import { cn } from '../../lib/cn';

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
  baseId: string;
}
const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (v: string) => void;
  className?: string;
  children: React.ReactNode;
}

export function Tabs({
  defaultValue,
  value: controlled,
  onValueChange,
  className,
  children,
}: TabsProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? '');
  const value = controlled ?? uncontrolled;
  const baseId = useId();
  const setValue = (v: string) => {
    if (controlled === undefined) setUncontrolled(v);
    onValueChange?.(v);
  };
  return (
    <TabsContext.Provider value={{ value, setValue, baseId }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs.* must be used within <Tabs>');
  return ctx;
}

export function TabsList({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="tablist"
      className={cn('inline-flex items-center gap-1 border-b border-border', className)}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { value: active, setValue, baseId } = useTabs();
  const selected = active === value;
  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      onClick={() => setValue(value)}
      className={cn(
        'relative -mb-px px-3 py-2 text-body-s font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-t-sm',
        selected
          ? 'text-brand border-b-2 border-brand'
          : 'text-tertiary border-b-2 border-transparent hover:text-primary',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { value: active, baseId } = useTabs();
  if (active !== value) return null;
  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      className={cn('pt-4 animate-fade-in', className)}
    >
      {children}
    </div>
  );
}
