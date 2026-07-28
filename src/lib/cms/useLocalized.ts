import { useLanguage } from '../../hooks/useLanguage';
import type { Localized } from './types';

/** Picks the current-language string out of a {pt, en} field. */
export function useLocalizedPicker() {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'en' ? 'en' : 'pt';
  return (field: Localized | null | undefined): string =>
    field ? field[lang] || field.pt || field.en || '' : '';
}
