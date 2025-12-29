"use client";
import React from "react";
import { useCart } from "../context/CartContext";

export default function CardProduto({ produto }) {
  const { addItem, removeItem, items } = useCart();
  const item = items.find((i) => Number(i.produtoId) === Number(produto.id));
  const quantidade = item ? Number(item.quantidade) : 0;

  function formatBRL(v) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v));
  }

  return (
    <div className="flex gap-4 p-4 bg-white rounded shadow-sm border border-[#F3F4F6]">
      <img src={produto.imagem || '/no-image.png'} alt={produto.nome} className="w-24 h-24 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-bold">{produto.nome}</h3>
        <p className="text-sm text-[#6B7280]">{produto.descricao || ''}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-lg font-semibold text-[#E67E22]">{formatBRL(produto.preco)}</div>
          <div className="flex items-center gap-2">
            <button onClick={() => removeItem(produto.id, 1)} className="px-3 py-1 bg-gray-100 rounded">-</button>
            <div className="w-6 text-center">{quantidade}</div>
            <button onClick={() => addItem(produto, 1)} className="px-3 py-1 bg-[#E67E22] text-white rounded">+</button>
          </div>
        </div>
      </div>
    </div>
  );
}
