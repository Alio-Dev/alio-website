import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { Card } from '../../components/ui/Card';
import { Field } from '../../components/ui/Field';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';

export function LoginPanel() {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.href },
    });
    setSending(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <Alert variant="success" title="Verifica o teu email">
        Enviámos um link de acesso para <strong>{email}</strong>. Abre-o neste dispositivo para
        entrares.
      </Alert>
    );
  }

  return (
    <Card className="max-w-sm">
      <h3 className="text-h6 text-primary">Acesso a documentos protegidos</h3>
      <p className="mt-1 text-body-s text-tertiary">
        Usa o teu email corporativo (@alio.ao) para receberes um link de acesso.
      </p>
      <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
        <Field label="Email">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@alio.ao"
            leftIcon={<Mail size={16} />}
          />
        </Field>
        {error && <p className="text-body-s text-danger-600 dark:text-danger-400">{error}</p>}
        <Button type="submit" loading={sending} rightIcon={<Send size={15} />}>
          Enviar link de acesso
        </Button>
      </form>
    </Card>
  );
}
