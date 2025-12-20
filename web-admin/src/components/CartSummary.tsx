"use client";
import Link from "next/link";
import { useCart } from "@/store/cart";

export default function CartSummary({ padariaId }: { padariaId: string }) {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total)();
  const clear = useCart((s) => s.clear);

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto max-w-7xl px-4">
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-lg p-4 flex items-center justify-between">
        <div className="text-zinc-800">
          {items.length} item(s) • <span className="text-orange-600 font-bold">R$ {total.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="h-10 rounded-full border border-zinc-300 px-4 text-zinc-800 hover:bg-zinc-50"
            onClick={clear}
          >
            Limpar
          </button>
          <Link
            href={`/pedido/${padariaId}/finalizar`}
            className="inline-flex h-10 items-center rounded-full bg-orange-500 px-6 text-white hover:bg-orange-600"
          >
            Finalizar pedido
          </Link>
        </div>
      </div>
    </div>
  );
}
