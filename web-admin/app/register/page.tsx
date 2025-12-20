"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [endereco, setEndereco] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
      const res = await fetch(`${base}/autenticacao/registro/cliente`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, endereco }),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Falha no cadastro");
      }
      await res.json();
      router.push("/login");
    } catch (e: any) {
      setError(e?.message ?? "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white grid place-items-center">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
        <div className="font-display text-2xl">Cadastre-se</div>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome completo"
          className="w-full h-12 rounded-xl border border-zinc-200 px-4 outline-none focus:border-orange-400"
        />
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
          placeholder="Senha (mínimo 6)"
          className="w-full h-12 rounded-xl border border-zinc-200 px-4 outline-none focus:border-orange-400"
        />
        <input
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          placeholder="Endereço"
          className="w-full h-12 rounded-xl border border-zinc-200 px-4 outline-none focus:border-orange-400"
        />
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-full bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
        <div className="text-sm text-zinc-600">
          Já tem conta? <a href="/login" className="text-orange-600">Entrar</a>
        </div>
      </form>
    </div>
  );
}
