/**
 * cn — tiny className combiner.
 * Joins truthy class fragments with a single space. Zero dependencies
 * so the component library stays install-free and portable.
 *
 *   cn('px-2', condition && 'font-bold', undefined) -> "px-2 font-bold"
 */
export type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (val: ClassValue) => {
    if (!val) return;
    if (typeof val === 'string' || typeof val === 'number') {
      out.push(String(val));
    } else if (Array.isArray(val)) {
      val.forEach(walk);
    } else if (typeof val === 'object') {
      for (const key in val) if (val[key]) out.push(key);
    }
  };
  inputs.forEach(walk);
  return out.join(' ');
}
