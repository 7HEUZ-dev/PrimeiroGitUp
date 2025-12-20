import ProductCard, { Produto } from "@/components/ProductCard";
import { notFound } from "next/navigation";
import CartSummary from "@/components/CartSummary";

async function fetchProdutos(padariaId: string) {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  const res = await fetch(`${base}/produtos/padaria/${padariaId}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return (await res.json()) as Produto[];
}

async function fetchPadaria(padariaId: string) {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  const res = await fetch(`${base}/padarias/${padariaId}`, { cache: "no-store" });
  if (!res.ok) return null;
  return await res.json();
}

export default async function PadariaPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { q?: string };
}) {
  const [produtos, padaria] = await Promise.all([
    fetchProdutos(params.id),
    fetchPadaria(params.id),
  ]);
  if (!produtos) notFound();
  const q = (searchParams.q ?? "").toLowerCase();
  const filtered = produtos.filter((p) =>
    p.nome.toLowerCase().includes(q)
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="rounded-3xl overflow-hidden">
          <div className="relative h-44 w-full">
            <img
              src="https://images.unsplash.com/photo-1542683082-22c3f02eb3d6?q=80&w=1600&auto=format&fit=crop"
              alt={padaria?.nome ?? "Padaria"}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-xl px-4 py-2">
              <div className="font-display text-xl">{padaria?.nome ?? "Padaria"}</div>
              <div className="text-sm text-zinc-600">{padaria?.endereco ?? ""}</div>
            </div>
          </div>
        </div>

        <form className="flex-1">
          <input
            name="q"
            defaultValue={q}
            placeholder="Buscar produto..."
            className="w-full h-12 rounded-xl border border-zinc-200 px-4 outline-none focus:border-orange-400"
          />
        </form>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
        <CartSummary padariaId={params.id} />
      </div>
    </div>
  );
}
