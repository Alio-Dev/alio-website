import { cn } from '../../lib/cn';

export interface MapMarker {
  x: number; // 0-100 (% of width)
  y: number; // 0-100 (% of height)
  label?: string;
  colorIndex?: number;
}

export interface MapLegendItem {
  color: string;
  label: string;
}

const CHART = [
  'var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)',
  'var(--chart-5)', 'var(--chart-6)', 'var(--chart-7)', 'var(--chart-8)',
];

/**
 * MapSurface — framework-agnostic GIS canvas placeholder with brand grid,
 * node-dot markers and an optional legend. Drop a real tile layer (Leaflet /
 * MapLibre) behind the same chrome in production.
 */
export function MapSurface({
  markers = [],
  legend = [],
  height = 320,
  className,
  children,
}: {
  markers?: MapMarker[];
  legend?: MapLegendItem[];
  height?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn('relative overflow-hidden rounded-lg border border-border bg-primary-950', className)}
      style={{ height }}
      role="img"
      aria-label="Map surface"
    >
      {/* Grid */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="ds-map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ds-map-grid)" />
      </svg>

      {/* Markers */}
      {markers.map((m, i) => (
        <span
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${m.x}%`, top: `${m.y}%` }}
        >
          <span
            className="block h-3 w-3 rounded-full ring-4 ring-white/10"
            style={{ background: CHART[(m.colorIndex ?? i) % CHART.length] }}
            title={m.label}
          />
        </span>
      ))}

      {/* Legend */}
      {legend.length > 0 && (
        <div className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-primary-950/80 p-3 backdrop-blur-sm">
          <ul className="flex flex-col gap-1.5">
            {legend.map((l) => (
              <li key={l.label} className="flex items-center gap-2 text-caption text-neutral-200">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: l.color }} />
                {l.label}
              </li>
            ))}
          </ul>
        </div>
      )}
      {children}
    </div>
  );
}
