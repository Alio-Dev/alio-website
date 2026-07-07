import tokensCss from '../../styles/tokens.css?raw';
import tokensTs from '../../design-system/tokens.ts?raw';
import tokensJson from '../../design-system/tokens.json?raw';
import { Seo } from './components/Seo';
import { PageHeader, Section } from './components/DocPrimitives';
import { CodeBlock } from './components/CodeBlock';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import { Alert } from '../../components/ui/Alert';
import { BASE } from './nav';

const TAILWIND_SNIPPET = `// tailwind.config.js — Alio Analytics
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { 700: '#2B3990', /* …full scale */ DEFAULT: '#2B3990' },
        accent:  { 500: '#07B7D1', /* …full scale */ DEFAULT: '#07B7D1' },
        // Semantic aliases bound to CSS custom properties:
        bg: 'var(--bg)', surface: 'var(--surface)', border: 'var(--border)',
        brand: 'var(--brand)',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        sans: ['"Instrument Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: { sm: '6px', md: '8px', lg: '12px', xl: '16px', '2xl': '24px' },
    },
  },
};`;

export default function TokensPage() {
  return (
    <>
      <Seo
        title="Tokens"
        description="Every Alio design token in CSS, Tailwind, JSON and TypeScript — with copy buttons."
        path={`${BASE}/tokens`}
      />
      <PageHeader
        eyebrow="Foundations"
        title="Design tokens"
        description="One source of truth, four formats. Copy the whole file or grab individual values. Components bind to semantic tokens (--bg, --brand, --text-primary) — never raw scale values — so light/dark theming is automatic."
      />

      <Alert variant="info" title="Dark mode strategy" className="mb-8">
        Tokens ship as CSS custom properties on <code className="font-mono">:root</code> and{' '}
        <code className="font-mono">.dark</code>. Toggle the <code className="font-mono">dark</code>{' '}
        class on <code className="font-mono">&lt;html&gt;</code> to switch themes.
      </Alert>

      <Section>
        <Tabs defaultValue="css">
          <TabsList>
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
            <TabsTrigger value="ts">TypeScript</TabsTrigger>
          </TabsList>
          <TabsContent value="css">
            <CodeBlock code={tokensCss} language="css" title="tokens.css" />
          </TabsContent>
          <TabsContent value="tailwind">
            <CodeBlock code={TAILWIND_SNIPPET} language="js" title="tailwind.config.js" />
          </TabsContent>
          <TabsContent value="json">
            <CodeBlock code={tokensJson} language="json" title="tokens.json (W3C)" />
          </TabsContent>
          <TabsContent value="ts">
            <CodeBlock code={tokensTs} language="ts" title="tokens.ts" />
          </TabsContent>
        </Tabs>
      </Section>
    </>
  );
}
