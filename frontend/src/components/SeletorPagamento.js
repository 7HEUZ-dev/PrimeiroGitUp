"use client";
import React from "react";

export default function SeletorPagamento({ metodoPagamento, setMetodoPagamento }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2"><input type="radio" name="metodo" value="PIX" checked={metodoPagamento==='PIX'} onChange={(e)=>setMetodoPagamento(e.target.value)} /> PIX</label>
      <label className="flex items-center gap-2"><input type="radio" name="metodo" value="CARTAO" checked={metodoPagamento==='CARTAO'} onChange={(e)=>setMetodoPagamento(e.target.value)} /> Cartão</label>
      <label className="flex items-center gap-2"><input type="radio" name="metodo" value="DINHEIRO" checked={metodoPagamento==='DINHEIRO'} onChange={(e)=>setMetodoPagamento(e.target.value)} /> Dinheiro / Retirada</label>
    </div>
  );
}
