import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () =>
    buildHead({
      title: "Acesso restrito",
      description: "Área de acesso restrito do escritório.",
      path: "/auth",
      noindex: true,
    }),
  component: AuthPage,
});

function mapError(err?: { message?: string }) {
  const msg = err?.message || "";
  if (msg.includes("Invalid login credentials")) return "E-mail ou senha incorretos.";
  if (msg.includes("Email not confirmed")) return "E-mail ainda não confirmado. Verifique sua caixa de entrada.";
  if (msg.includes("User already registered")) return "E-mail já cadastrado. Use a opção de entrar.";
  if (msg.includes("Password should be at least")) return "A senha deve ter pelo menos 6 caracteres.";
  if (msg.includes("Unable to validate")) return "E-mail ou senha inválidos.";
  return "Ocorreu um erro. Tente novamente.";
}

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/artigos", replace: true });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (mode === "signin") {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      setLoading(false);
      if (signInError) {
        setError(mapError(signInError));
        return;
      }
      navigate({ to: "/admin/artigos", replace: true });
      return;
    }

    // signup
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: window.location.origin + "/auth" },
    });
    setLoading(false);
    if (signUpError) {
      setError(mapError(signUpError));
      return;
    }

    if (signUpData.session) {
      // Auto-confirm: sessão criada automaticamente
      navigate({ to: "/admin/artigos", replace: true });
    } else {
      setSuccess("Conta criada. Verifique seu e-mail para confirmar.");
    }
  }

  function toggleMode() {
    setMode((m) => (m === "signin" ? "signup" : "signin"));
    setError(null);
    setSuccess(null);
  }

  const isSignIn = mode === "signin";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-card">
        <h1 className="font-serif text-2xl text-navy">
          {isSignIn ? "Acessar painel" : "Criar conta"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isSignIn
            ? "Área restrita à equipe do escritório."
            : "Cadastre-se para acessar o painel de artigos."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Senha
            </label>
            <input
              id="password"
              type="password"
              autoComplete={isSignIn ? "current-password" : "new-password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
            {mode === "signup" && (
              <p className="mt-1 text-xs text-muted-foreground">Mínimo de 6 caracteres.</p>
            )}
          </div>

          {error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}
          {success && (
            <p className="rounded-md bg-green-100 px-3 py-2 text-sm text-green-800">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold hover:text-navy disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSignIn ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <button
            type="button"
            onClick={toggleMode}
            className="text-sm text-muted-foreground hover:text-navy underline underline-offset-2"
          >
            {isSignIn ? "Não tem conta? Criar conta" : "Já tem conta? Entrar"}
          </button>
          <div>
            <Link to="/" className="text-xs text-muted-foreground hover:text-navy">
              ← Voltar ao site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
