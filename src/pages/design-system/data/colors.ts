export interface Scale {
  name: string;
  token: string; // prefix, e.g. primary
  note?: string;
  steps: { step: string; hex: string }[];
}

const s = (
  step: string,
  hex: string,
): { step: string; hex: string } => ({ step, hex });

export const SCALES: Scale[] = [
  {
    name: 'Primary — Indigo',
    token: 'primary',
    note: 'Logo indigo at 700. Brand action colour.',
    steps: [
      s('50', '#EEF0FB'), s('100', '#DDE2F7'), s('200', '#BCC5EF'), s('300', '#93A1E3'),
      s('400', '#6B7CD5'), s('500', '#4C5DC2'), s('600', '#3A49A9'), s('700', '#2B3990'),
      s('800', '#232E74'), s('900', '#1D265C'), s('950', '#131840'),
    ],
  },
  {
    name: 'Accent — Cyan',
    token: 'accent',
    note: 'Logo cyan at 500. Use 600 for text on white (500 fails contrast).',
    steps: [
      s('50', '#ECFCFF'), s('100', '#D0F6FC'), s('200', '#A6EDF8'), s('300', '#6EDFF0'),
      s('400', '#2FCBE2'), s('500', '#07B7D1'), s('600', '#0793AC'), s('700', '#0C7589'),
      s('800', '#135E6E'), s('900', '#144E5C'), s('950', '#07333E'),
    ],
  },
  {
    name: 'Neutral — Indigo-cast slate',
    token: 'neutral',
    note: 'Text, borders, surfaces. Cool indigo cast.',
    steps: [
      s('50', '#F7F8FA'), s('100', '#EEF0F4'), s('200', '#DDE1E8'), s('300', '#C4CAD6'),
      s('400', '#9AA2B3'), s('500', '#717A8F'), s('600', '#565E72'), s('700', '#444B5C'),
      s('800', '#2E3340'), s('900', '#1F2330'), s('950', '#12141D'),
    ],
  },
];

export const SEMANTIC_SCALES: Scale[] = [
  {
    name: 'Success',
    token: 'success',
    steps: [
      s('50', '#EBFAF3'), s('100', '#D0F3E2'), s('200', '#A3E7C7'), s('300', '#6DD4A6'),
      s('400', '#37BC83'), s('500', '#16A468'), s('600', '#0D8454'), s('700', '#0C6A45'),
      s('800', '#0C5439'), s('900', '#0B4530'), s('950', '#05271B'),
    ],
  },
  {
    name: 'Warning',
    token: 'warning',
    steps: [
      s('50', '#FEF9EC'), s('100', '#FBEFCB'), s('200', '#F7DE92'), s('300', '#F2C859'),
      s('400', '#EDB232'), s('500', '#E5971B'), s('600', '#CB7314'), s('700', '#A95214'),
      s('800', '#8A4017'), s('900', '#723516'), s('950', '#421A08'),
    ],
  },
  {
    name: 'Danger',
    token: 'danger',
    steps: [
      s('50', '#FDF0F0'), s('100', '#FBDCDD'), s('200', '#F7BFC0'), s('300', '#F09496'),
      s('400', '#E7666B'), s('500', '#DC3D43'), s('600', '#C42B31'), s('700', '#A42226'),
      s('800', '#872024'), s('900', '#712124'), s('950', '#3E0D0F'),
    ],
  },
  {
    name: 'Info',
    token: 'info',
    steps: [
      s('50', '#EFF6FF'), s('100', '#DBEBFE'), s('200', '#BFDCFE'), s('300', '#93C4FD'),
      s('400', '#60A5FA'), s('500', '#3B82F6'), s('600', '#2565EB'), s('700', '#1D50D8'),
      s('800', '#1E42AF'), s('900', '#1E398A'), s('950', '#172554'),
    ],
  },
];

export const CHART_PALETTE = [
  { name: 'Chart 1', hex: '#2B3990', token: '--chart-1' },
  { name: 'Chart 2', hex: '#07B7D1', token: '--chart-2' },
  { name: 'Chart 3', hex: '#16A468', token: '--chart-3' },
  { name: 'Chart 4', hex: '#E5971B', token: '--chart-4' },
  { name: 'Chart 5', hex: '#7C5CD6', token: '--chart-5' },
  { name: 'Chart 6', hex: '#DC3D43', token: '--chart-6' },
  { name: 'Chart 7', hex: '#D9679E', token: '--chart-7' },
  { name: 'Chart 8', hex: '#5B8DEF', token: '--chart-8' },
];
