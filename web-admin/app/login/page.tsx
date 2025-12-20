"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
      const res = await fetch(`${base}/autenticacao/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Falha no login");
      }
      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      router.push("/pedir");
    } catch (e: any) {
      setError(e?.message ?? "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white grid place-items-center">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
        <div className="font-display text-2xl">Entrar</div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full h-12 rounded-xl border border-zinc-200 px-4 outline-none focus:border-orange-400"
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          className="w-full h-12 rounded-xl border border-zinc-200 px-4 outline-none focus:border-orange-400"
        />
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-full bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <div className="text-sm text-zinc-600">
          Não tem conta? <a href="/register" className="text-orange-600">Cadastre-se</a>
        </div>
      </form>
    </div>
  );
}
