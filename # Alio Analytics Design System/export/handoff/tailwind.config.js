// ============================================================
// ALIO ANALYTICS — tailwind.config.js v1.0
// Dark mode: class strategy (toggle .dark on <html>)
// ============================================================
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { 50:'#EEF0FB',100:'#DDE2F7',200:'#BCC5EF',300:'#93A1E3',400:'#6B7CD5',500:'#4C5DC2',600:'#3A49A9',700:'#2B3990',800:'#232E74',900:'#1D265C',950:'#131840', DEFAULT:'#2B3990' },
        accent:  { 50:'#ECFCFF',100:'#D0F6FC',200:'#A6EDF8',300:'#6EDFF0',400:'#2FCBE2',500:'#07B7D1',600:'#0793AC',700:'#0C7589',800:'#135E6E',900:'#144E5C',950:'#07333E', DEFAULT:'#07B7D1' },
        neutral: { 50:'#F7F8FA',100:'#EEF0F4',200:'#DDE1E8',300:'#C4CAD6',400:'#9AA2B3',500:'#717A8F',600:'#565E72',700:'#444B5C',800:'#2E3340',900:'#1F2330',950:'#12141D' },
        success: { 50:'#EBFAF3',100:'#D0F3E2',200:'#A3E7C7',300:'#6DD4A6',400:'#37BC83',500:'#16A468',600:'#0D8454',700:'#0C6A45',800:'#0C5439',900:'#0B4530',950:'#05271B' },
        warning: { 50:'#FEF9EC',100:'#FBEFCB',200:'#F7DE92',300:'#F2C859',400:'#EDB232',500:'#E5971B',600:'#CB7314',700:'#A95214',800:'#8A4017',900:'#723516',950:'#421A08' },
        danger:  { 50:'#FDF0F0',100:'#FBDCDD',200:'#F7BFC0',300:'#F09496',400:'#E7666B',500:'#DC3D43',600:'#C42B31',700:'#A42226',800:'#872024',900:'#712124',950:'#3E0D0F' },
        info:    { 50:'#EFF6FF',100:'#DBEBFE',200:'#BFDCFE',300:'#93C4FD',400:'#60A5FA',500:'#3B82F6',600:'#2565EB',700:'#1D50D8',800:'#1E42AF',900:'#1E398A',950:'#172554' },
        chart: { 1:'#2B3990',2:'#07B7D1',3:'#16A468',4:'#E5971B',5:'#7C5CD6',6:'#DC3D43',7:'#D9679E',8:'#5B8DEF' },
      },
      fontFamily: {
        display: ['Sora','ui-sans-serif','system-ui','sans-serif'],
        sans: ['"Instrument Sans"','"Segoe UI"','Helvetica','sans-serif'],
        mono: ['"JetBrains Mono"','ui-monospace','"SF Mono"','monospace'],
      },
      fontSize: {
        'display-xl': ['72px',{ lineHeight:'76px', letterSpacing:'-0.03em', fontWeight:'700' }],
        'display-l':  ['60px',{ lineHeight:'64px', letterSpacing:'-0.03em', fontWeight:'700' }],
        'display-m':  ['48px',{ lineHeight:'54px', letterSpacing:'-0.02em', fontWeight:'700' }],
        h1: ['40px',{ lineHeight:'48px', letterSpacing:'-0.02em', fontWeight:'700' }],
        h2: ['32px',{ lineHeight:'40px', letterSpacing:'-0.02em', fontWeight:'700' }],
        h3: ['26px',{ lineHeight:'34px', letterSpacing:'-0.01em', fontWeight:'600' }],
        h4: ['22px',{ lineHeight:'30px', letterSpacing:'-0.01em', fontWeight:'600' }],
        h5: ['18px',{ lineHeight:'26px', fontWeight:'600' }],
        h6: ['16px',{ lineHeight:'24px', fontWeight:'600' }],
        'body-l': ['18px',{ lineHeight:'28px' }],
        'body-m': ['16px',{ lineHeight:'24px' }],
        'body-s': ['14px',{ lineHeight:'20px' }],
        caption: ['12px',{ lineHeight:'16px', letterSpacing:'0.01em' }],
        overline: ['12px',{ lineHeight:'16px', letterSpacing:'0.08em', fontWeight:'500' }],
      },
      borderRadius: { sm:'6px', md:'8px', lg:'12px', xl:'16px', '2xl':'24px' },
      boxShadow: {
        xs:'0 1px 2px rgba(19,24,64,0.06)',
        sm:'0 1px 3px rgba(19,24,64,0.08),0 1px 2px rgba(19,24,64,0.04)',
        md:'0 4px 12px rgba(19,24,64,0.08),0 2px 4px rgba(19,24,64,0.04)',
        lg:'0 12px 24px rgba(19,24,64,0.10),0 4px 8px rgba(19,24,64,0.05)',
        xl:'0 24px 48px rgba(19,24,64,0.14),0 8px 16px rgba(19,24,64,0.06)',
        float:'0 16px 40px rgba(19,24,64,0.16),0 0 0 1px rgba(19,24,64,0.04)',
        'glow-accent':'0 0 0 1px rgba(47,203,226,0.25),0 8px 32px rgba(7,183,209,0.12)',
      },
      transitionTimingFunction: {
        standard:'cubic-bezier(0.4,0,0.2,1)',
        enter:'cubic-bezier(0,0,0.2,1)',
        exit:'cubic-bezier(0.4,0,1,1)',
        spring:'cubic-bezier(0.34,1.56,0.64,1)',
      },
      transitionDuration: { 75:'75ms',150:'150ms',200:'200ms',300:'300ms',400:'400ms',500:'500ms',700:'700ms' },
      keyframes: {
        'fade-up': { from:{ opacity:'0', transform:'translateY(8px)' }, to:{ opacity:'1', transform:'translateY(0)' } },
        shimmer: { '0%':{ backgroundPosition:'-400px 0' }, '100%':{ backgroundPosition:'400px 0' } },
        spin: { to:{ transform:'rotate(360deg)' } },
      },
      animation: {
        'fade-up':'fade-up 300ms cubic-bezier(0,0,0.2,1) both',
        shimmer:'shimmer 1.4s linear infinite',
        'spin-fast':'spin 0.7s linear infinite',
      },
      backgroundImage: { 'gradient-brand':'linear-gradient(90deg,#07B7D1,#2B3990)', 'gradient-brand-135':'linear-gradient(135deg,#07B7D1,#2B3990)' },
      maxWidth: { container:'1200px', prose:'680px' },
      zIndex: { dropdown:'1000', sticky:'1100', drawer:'1200', modal:'1300', popover:'1400', toast:'1500', tooltip:'1600' },
    },
  },
  plugins: [],
};
