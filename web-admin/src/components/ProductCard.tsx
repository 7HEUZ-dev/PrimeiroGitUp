"use client";
export interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
}

export default function ProductCard({ produto }: { produto: Produto }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="h-32 w-full rounded-xl bg-amber-50 grid place-items-center text-amber-700 text-sm">
        Imagem do produto
      </div>
      <div className="mt-3 font-semibold">{produto.nome}</div>
      {produto.descricao && (
        <div className="text-sm text-zinc-600">{produto.descricao}</div>
      )}
      <div className="mt-2 text-orange-600 font-bold">
        R$ {Number(produto.preco).toFixed(2)}
      </div>
      <AddToCart produto={produto} />
    </div>
  );
}

import { useCart } from "@/store/cart";
import QtyControl from "./QtyControl";
import { useState } from "react";

function AddToCart({ produto }: { produto: Produto }) {
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  return (
    <>
      <QtyControl onChange={setQty} initial={1} />
      <button
        onClick={() =>
          add(
            { produtoId: produto.id, nome: produto.nome, preco: Number(produto.preco) },
            qty
          )
        }
        className="mt-3 w-full h-10 rounded-full bg-orange-500 text-white hover:bg-orange-600"
      >
        Adicionar
      </button>
    </>
  );
}
