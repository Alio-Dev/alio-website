import { useCallback, useEffect, useState } from 'react';
import { LogOut, ShieldCheck } from 'lucide-react';
import Layout from '../../components/Layout';
import { useProposalMeta } from '../proposals/useProposalMeta';
import { useForceLightTheme } from './useForceLightTheme';
import { ToastProvider } from '../../components/ui/Toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { Button } from '../../components/ui/Button';
import { useVaultSession } from './useVaultSession';
import { LoginPanel } from './LoginPanel';
import { DocumentCard } from './DocumentCard';
import { DocumentViewerModal } from './DocumentViewerModal';
import { AdminPanel } from './AdminPanel';
import { listDocuments } from './api';
import type { VaultDocument } from './types';

function VaultInner() {
  useProposalMeta('Documentos — Alio Analytics');
  useForceLightTheme();
  const { loading: sessionLoading, email, isCorporate, signOut } = useVaultSession();

  const [documents, setDocuments] = useState<VaultDocument[] | null>(null);
  const [category, setCategory] = useState<'todos' | 'empresa' | 'pessoal'>('todos');
  const [viewer, setViewer] = useState<{ doc: VaultDocument; url: string } | null>(null);

  const refresh = useCallback(() => {
    listDocuments()
      .then(setDocuments)
      .catch(() => setDocuments([]));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh, email]);

  const filtered = (documents ?? []).filter((d) => category === 'todos' || d.category === category);

  return (
    <Layout showBackButton hideThemeToggle>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-h3 text-primary">Documentos</h1>
            <p className="mt-1 text-body-s text-tertiary">
              Documentos da empresa e pessoais — cada um com o seu próprio nível de acesso.
            </p>
          </div>
          {email && (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-body-s text-secondary">
                <ShieldCheck size={15} className="text-success-500" />
                {email}
              </span>
              <Button size="sm" variant="ghost" leftIcon={<LogOut size={14} />} onClick={signOut}>
                Sair
              </Button>
            </div>
          )}
        </div>

        {!email && !sessionLoading && (
          <div className="mt-8">
            <LoginPanel />
          </div>
        )}

        <div className="mt-8">
          <Tabs defaultValue="documentos">
            <TabsList>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
              {isCorporate && <TabsTrigger value="gerir">Gerir</TabsTrigger>}
            </TabsList>

            <TabsContent value="documentos">
              <div className="mb-5 flex gap-2">
                {(['todos', 'empresa', 'pessoal'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={
                      'rounded-full px-3 py-1.5 text-body-s font-medium transition-colors ' +
                      (category === c
                        ? 'bg-brand-subtle text-brand'
                        : 'text-tertiary hover:text-primary')
                    }
                  >
                    {c === 'todos' ? 'Todos' : c === 'empresa' ? 'Empresa' : 'Pessoal'}
                  </button>
                ))}
              </div>

              {documents === null ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-40" />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <EmptyState
                  title="Nenhum documento visível"
                  description={
                    email
                      ? 'Não há documentos nesta categoria.'
                      : 'Inicia sessão para veres documentos protegidos, ou não há documentos públicos nesta categoria.'
                  }
                />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      doc={doc}
                      onView={(d, url) => setViewer({ doc: d, url })}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            {isCorporate && (
              <TabsContent value="gerir">
                <AdminPanel documents={documents ?? []} onChanged={refresh} />
              </TabsContent>
            )}
          </Tabs>
        </div>

        <DocumentViewerModal
          doc={viewer?.doc ?? null}
          url={viewer?.url ?? null}
          onClose={() => setViewer(null)}
        />
      </div>
    </Layout>
  );
}

export default function DocumentVaultPage() {
  return (
    <ToastProvider>
      <VaultInner />
    </ToastProvider>
  );
}
