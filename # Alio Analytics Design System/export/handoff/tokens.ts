// ============================================================
// ALIO ANALYTICS — design tokens (TypeScript) v1.0
// ============================================================

export const colors = {
  primary: { 50:'#EEF0FB',100:'#DDE2F7',200:'#BCC5EF',300:'#93A1E3',400:'#6B7CD5',500:'#4C5DC2',600:'#3A49A9',700:'#2B3990',800:'#232E74',900:'#1D265C',950:'#131840' },
  accent:  { 50:'#ECFCFF',100:'#D0F6FC',200:'#A6EDF8',300:'#6EDFF0',400:'#2FCBE2',500:'#07B7D1',600:'#0793AC',700:'#0C7589',800:'#135E6E',900:'#144E5C',950:'#07333E' },
  neutral: { 50:'#F7F8FA',100:'#EEF0F4',200:'#DDE1E8',300:'#C4CAD6',400:'#9AA2B3',500:'#717A8F',600:'#565E72',700:'#444B5C',800:'#2E3340',900:'#1F2330',950:'#12141D' },
  success: { 50:'#EBFAF3',500:'#16A468',600:'#0D8454',700:'#0C6A45' },
  warning: { 50:'#FEF9EC',500:'#E5971B',600:'#CB7314',700:'#A95214' },
  danger:  { 50:'#FDF0F0',500:'#DC3D43',600:'#C42B31',700:'#A42226' },
  info:    { 50:'#EFF6FF',500:'#3B82F6',600:'#2565EB',700:'#1D50D8' },
  chart: ['#2B3990','#07B7D1','#16A468','#E5971B','#7C5CD6','#DC3D43','#D9679E','#5B8DEF'],
  chartSequential: ['#D0F6FC','#8FE3F1','#4FC7E0','#17A9CB','#1C7FB0','#245B9E','#2B3990'],
  chartDiverging: ['#C42B31','#E7666B','#F0BFC1','#EEF0F4','#93A1E3','#4C5DC2','#2B3990'],
} as const;

export const fonts = {
  display: "'Sora', ui-sans-serif, system-ui, sans-serif",
  body: "'Instrument Sans', 'Segoe UI', Helvetica, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, 'SF Mono', monospace",
} as const;

export const typeScale = {
  displayXl: { size: 72, lineHeight: 76, weight: 700, tracking: '-0.03em', font: 'display' },
  displayL:  { size: 60, lineHeight: 64, weight: 700, tracking: '-0.03em', font: 'display' },
  displayM:  { size: 48, lineHeight: 54, weight: 700, tracking: '-0.02em', font: 'display' },
  h1: { size: 40, lineHeight: 48, weight: 700, tracking: '-0.02em', font: 'display' },
  h2: { size: 32, lineHeight: 40, weight: 700, tracking: '-0.02em', font: 'display' },
  h3: { size: 26, lineHeight: 34, weight: 600, tracking: '-0.01em', font: 'display' },
  h4: { size: 22, lineHeight: 30, weight: 600, tracking: '-0.01em', font: 'display' },
  h5: { size: 18, lineHeight: 26, weight: 600, tracking: '0', font: 'display' },
  h6: { size: 16, lineHeight: 24, weight: 600, tracking: '0', font: 'display' },
  bodyL: { size: 18, lineHeight: 28, weight: 400, tracking: '0', font: 'body' },
  bodyM: { size: 16, lineHeight: 24, weight: 400, tracking: '0', font: 'body' },
  bodyS: { size: 14, lineHeight: 20, weight: 400, tracking: '0', font: 'body' },
  caption: { size: 12, lineHeight: 16, weight: 400, tracking: '0.01em', font: 'body' },
  overline: { size: 12, lineHeight: 16, weight: 500, tracking: '0.08em', font: 'mono' },
  code: { size: 14, lineHeight: 22, weight: 400, tracking: '0', font: 'mono' },
} as const;

export const spacing = { 0:0, 0.5:2, 1:4, 2:8, 3:12, 4:16, 6:24, 8:32, 10:40, 12:48, 16:64, 20:80, 24:96, 32:128, 40:160 } as const;
export const radius = { none:0, sm:6, md:8, lg:12, xl:16, '2xl':24, full:999 } as const;
export const breakpoints = { sm:640, md:768, lg:1024, xl:1280, '2xl':1536 } as const;

export const shadows = {
  xs: '0 1px 2px rgba(19,24,64,0.06)',
  sm: '0 1px 3px rgba(19,24,64,0.08), 0 1px 2px rgba(19,24,64,0.04)',
  md: '0 4px 12px rgba(19,24,64,0.08), 0 2px 4px rgba(19,24,64,0.04)',
  lg: '0 12px 24px rgba(19,24,64,0.10), 0 4px 8px rgba(19,24,64,0.05)',
  xl: '0 24px 48px rgba(19,24,64,0.14), 0 8px 16px rgba(19,24,64,0.06)',
  float: '0 16px 40px rgba(19,24,64,0.16), 0 0 0 1px rgba(19,24,64,0.04)',
  glowAccent: '0 0 0 1px rgba(47,203,226,0.25), 0 8px 32px rgba(7,183,209,0.12)',
} as const;

export const motion = {
  duration: { 75:'75ms', 150:'150ms', 200:'200ms', 300:'300ms', 400:'400ms', 500:'500ms', 700:'700ms' },
  easing: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    enter: 'cubic-bezier(0, 0, 0.2, 1)',
    exit: 'cubic-bezier(0.4, 0, 1, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const;

export const zIndex = { dropdown:1000, sticky:1100, drawer:1200, modal:1300, popover:1400, toast:1500, tooltip:1600 } as const;

export const gradients = {
  brand: 'linear-gradient(90deg, #07B7D1, #2B3990)',
  brand135: 'linear-gradient(135deg, #07B7D1, #2B3990)',
} as const;
