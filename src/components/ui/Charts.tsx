import { useId } from 'react';
import { cn } from '../../lib/cn';

export const CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'var(--chart-6)',
  'var(--chart-7)',
  'var(--chart-8)',
];

interface Datum {
  label: string;
  value: number;
}

/* ---------------- Bar chart ---------------- */
export function BarChart({
  data,
  height = 200,
  className,
  colorIndex,
}: {
  data: Datum[];
  height?: number;
  className?: string;
  colorIndex?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className={cn('flex items-end gap-3', className)} style={{ height }}>
      {data.map((d, i) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="relative flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-md transition-[height] duration-500 ease-standard"
              style={{
                height: `${(d.value / max) * 100}%`,
                background: CHART_COLORS[colorIndex ?? i % CHART_COLORS.length],
              }}
              title={`${d.label}: ${d.value}`}
            />
          </div>
          <span className="text-caption text-tertiary">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Line chart ---------------- */
export function LineChart({
  data,
  width = 480,
  height = 200,
  className,
  colorIndex = 1,
}: {
  data: Datum[];
  width?: number;
  height?: number;
  className?: string;
  colorIndex?: number;
}) {
  const gradId = useId();
  const pad = 8;
  const max = Math.max(...data.map((d) => d.value), 1);
  const min = Math.min(...data.map((d) => d.value), 0);
  const span = max - min || 1;
  const stepX = (width - pad * 2) / Math.max(data.length - 1, 1);
  const points = data.map((d, i) => {
    const x = pad + i * stepX;
    const y = height - pad - ((d.value - min) / span) * (height - pad * 2);
    return [x, y] as const;
  });
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
  const area = `${line} L${points[points.length - 1][0]},${height - pad} L${points[0][0]},${height - pad} Z`;
  const stroke = CHART_COLORS[colorIndex % CHART_COLORS.length];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn('w-full', className)}
      role="img"
      aria-label="Line chart"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.24" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} />
      <path d={line} fill="none" stroke={stroke} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={3} fill="var(--surface)" stroke={stroke} strokeWidth={2} />
      ))}
    </svg>
  );
}

/* ---------------- Donut chart ---------------- */
export function DonutChart({
  data,
  size = 180,
  thickness = 24,
  className,
}: {
  data: Datum[];
  size?: number;
  thickness?: number;
  className?: string;
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const circ = 2 * Math.PI * radius;

  // Precompute each segment's dash length and cumulative start offset with a
  // pure prefix-sum (no mutation inside render — keeps the component pure).
  const dashes = data.map((d) => (d.value / total) * circ);
  const segments = data.map((d, i) => ({
    label: d.label,
    dash: dashes[i],
    offset: dashes.slice(0, i).reduce((a, b) => a + b, 0),
    color: CHART_COLORS[i % CHART_COLORS.length],
  }));

  return (
    <div className={cn('flex items-center gap-6', className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Donut chart">
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {segments.map((s) => (
            <circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={`${s.dash} ${circ - s.dash}`}
              strokeDashoffset={-s.offset}
            />
          ))}
        </g>
      </svg>
      <ul className="flex flex-col gap-1.5 text-body-s">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2 text-secondary">
            <span
              className="h-3 w-3 rounded-sm"
              style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
            />
            {d.label}
            <span className="ml-auto font-mono text-tertiary">
              {Math.round((d.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Sparkline ---------------- */
export function Sparkline({
  values,
  width = 120,
  height = 32,
  colorIndex = 1,
  className,
}: {
  values: number[];
  width?: number;
  height?: number;
  colorIndex?: number;
  className?: string;
}) {
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const span = max - min || 1;
  const stepX = width / Math.max(values.length - 1, 1);
  const line = values
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${i * stepX},${height - ((v - min) / span) * height}`)
    .join(' ');
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={cn('overflow-visible', className)} aria-hidden="true">
      <path
        d={line}
        fill="none"
        stroke={CHART_COLORS[colorIndex % CHART_COLORS.length]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
