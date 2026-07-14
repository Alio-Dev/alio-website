import { useProposalMeta } from './useProposalMeta';

export interface ProposalIframePageProps {
  /** Path under /public to the self-contained exported bundle. */
  assetSrc: string;
  /** Browser tab title and iframe accessible title. */
  title: string;
}

/**
 * Shared shell for client proposal/prototype pages. Each embeds a
 * self-contained exported bundle (its own fonts/images/runtime baked in)
 * untouched, via iframe, so the bundle's internal asset-unpacking script is
 * never at risk of breaking. No site chrome (Layout/Nav/Footer): the
 * prototype is full-screen and carries its own branding.
 *
 * Unlisted by design — direct-link only for the client, not indexed or in
 * the sitemap (see useProposalMeta).
 */
export default function ProposalIframePage({ assetSrc, title }: ProposalIframePageProps) {
  useProposalMeta(title);

  return (
    <iframe
      src={assetSrc}
      title={title}
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', border: 0 }}
      allow="clipboard-write"
    />
  );
}
