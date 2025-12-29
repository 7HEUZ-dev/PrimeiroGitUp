import React from "react";

export function formatBRL(v) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v));
}

export default function ResumoFinanceiro({ subtotal = 0, metodoPagamento = 'PIX' }) {
  const entrega = metodoPagamento === 'DINHEIRO' ? 0 : 5;
  const total = Number(subtotal) + Number(entrega);

  return (
    <div className="p-4 bg-white rounded border border-[#F3F4F6]">
      <div className="flex justify-between text-sm text-[#6B7280]"><span>Subtotal</span><span>{formatBRL(subtotal)}</span></div>
      <div className="flex justify-between text-sm text-[#6B7280]"><span>Entrega</span><span>{formatBRL(entrega)}</span></div>
      <hr className="my-3" />
      <div className="flex justify-between font-bold text-lg"><span>Total</span><span>{formatBRL(total)}</span></div>
    </div>
  );
}
