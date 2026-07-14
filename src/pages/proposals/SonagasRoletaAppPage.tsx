import { useState } from 'react';
import { useProposalMeta } from './useProposalMeta';

type View = 'gas' | 'wheel';

const VIEWS: { id: View; label: string; assetSrc: string; title: string }[] = [
  {
    id: 'gas',
    label: 'Roleta do Gás',
    assetSrc: '/propostas/sonagas/roleta-do-gas.html',
    title: 'Roleta do Gás — Proposta Sonagás · Alio Analytics',
  },
  {
    id: 'wheel',
    label: 'Roleta Digital',
    assetSrc: '/propostas/sonagas/roleta-digital.html',
    title: 'Roleta Digital — Proposta Sonagás · Alio Analytics',
  },
];

/**
 * Combined Sonagás proposal app — hosts both prototypes ("Roleta do Gás"
 * and "Roleta Digital") behind a single switcher at /propostas/sonagas/
 * roleta-digital, so the client can see both without a separate link.
 * Defaults to "Roleta do Gás".
 *
 * Each view is still a self-contained exported bundle embedded via iframe,
 * untouched (aside from the deliberate, verified rename applied to the gas
 * view's own copy — see scripts/rename-roleta-do-gas.py). A view's iframe
 * is only mounted once the user activates it (lazy mount), then kept
 * mounted and toggled with CSS so switching back and forth doesn't reload
 * or reset that game's in-progress state.
 */
export default function SonagasRoletaAppPage() {
  const [active, setActive] = useState<View>('gas');
  const [visited, setVisited] = useState<Set<View>>(() => new Set(['gas']));

  const activeConfig = VIEWS.find((v) => v.id === active)!;
  useProposalMeta(activeConfig.title);

  const select = (id: View) => {
    setActive(id);
    setVisited((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  };

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh' }}>
      {VIEWS.map((v) =>
        visited.has(v.id) ? (
          <iframe
            key={v.id}
            src={v.assetSrc}
            title={v.label}
            allow="clipboard-write"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 0,
              visibility: active === v.id ? 'visible' : 'hidden',
            }}
          />
        ) : null,
      )}

      <div
        role="tablist"
        aria-label="Escolher jogo"
        style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2147483647,
          display: 'flex',
          gap: '4px',
          padding: '4px',
          borderRadius: '999px',
          background: 'rgba(18, 20, 29, 0.72)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          fontFamily:
            "'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {VIEWS.map((v) => {
          const isActive = active === v.id;
          return (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => select(v.id)}
              style={{
                appearance: 'none',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '999px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.01em',
                color: '#F7F8FA',
                background: isActive
                  ? 'linear-gradient(90deg,#07B7D1,#2B3990)'
                  : 'transparent',
                transition: 'background 150ms ease, color 150ms ease',
              }}
            >
              {v.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
