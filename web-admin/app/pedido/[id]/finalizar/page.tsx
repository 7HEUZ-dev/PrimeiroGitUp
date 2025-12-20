"use client";
import { useCart } from "@/store/cart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FinalizarPage({ params }: { params: { id: string } }) {
  const cart = useCart();
  const router = useRouter();
  const [endereco, setEndereco] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const userRaw = localStorage.getItem("usuario");
      if (userRaw) {
        const u = JSON.parse(userRaw);
        setEndereco(u.endereco ?? "");
      }
    } catch {}
  }, []);

  async function finalizarPedido() {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const userRaw = localStorage.getItem("usuario");
      if (!token || !userRaw) {
        setError("Você precisa estar logado.");
        return;
      }
      const usuario = JSON.parse(userRaw);
      const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
      const body = {
        clienteId: usuario.id,
        padariaId: Number(params.id),
        enderecoEntrega: endereco,
        itens: cart.items.map((i) => ({
          produtoId: i.produtoId,
          quantidade: i.quantidade,
        })),
      };
      const res = await fetch(`${base}/pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Falha ao criar pedido");
      }
      const pedido = await res.json();
      cart.clear();
      router.push(`/chat/${pedido.id}`);
    } catch (e: any) {
      setError(e?.message ?? "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="font-display text-2xl">Finalizar pedido</div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="space-y-3">
            {cart.items.map((i) => (
              <div key={i.produtoId} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{i.nome}</div>
                  <div className="text-sm text-zinc-600">Qtd: {i.quantidade}</div>
                </div>
                <div className="text-orange-600 font-bold">
                  R$ {(i.preco * i.quantidade).toFixed(2)}
                </div>
              </div>
            ))}
            <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
              <div className="text-zinc-700">Total</div>
              <div className="text-orange-600 font-bold">R$ {cart.total().toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-700">Endereço de entrega</label>
          <input
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder="Rua, número, bairro"
            className="w-full h-12 rounded-xl border border-zinc-200 px-4 outline-none focus:border-orange-400"
          />
        </div>

        {error && <div className="text-red-600">{error}</div>}

        <button
          onClick={finalizarPedido}
          disabled={loading || cart.items.length === 0}
          className="w-full h-12 rounded-full bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Finalizar pedido"}
        </button>
      </div>
    </div>
  );
}
