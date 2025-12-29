"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithToken } from "../../../lib/fetchWithToken";

export default function Page({ params }) {
  const { id } = params;
  const [pedido, setPedido] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetchWithToken(`/pedidos/${id}`).then(async res=>{
      if (!res.ok) { setPedido(null); setLoading(false); return; }
      const data = await res.json();
      setPedido(data); setLoading(false);
    }).catch(()=>setLoading(false));
  },[id]);

  async function enviarMensagem() {
    if (!mensagem) return;
    try {
      const res = await fetchWithToken(`/pedidos/${id}/mensagens`, { method: 'POST', body: JSON.stringify({ texto: mensagem }) });
      if (!res.ok) throw new Error('Erro');
      setMensagem('');
      // opcional: atualizar lista
    } catch (e) {
      alert('Erro ao enviar mensagem');
    }
  }

  if (loading) return <div className="p-6">Carregando...</div>;

  if (!pedido) return <div className="p-6">Pedido não encontrado</div>;

  return (
    <div className="p-6 bg-[#FDFCFB] min-h-screen">
      <h2 className="font-bold text-xl mb-4">Pedido #{pedido.id} - {pedido.status}</h2>
      <div className="mb-4">Total: {new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(pedido.valorTotal))}</div>

      <div className="mt-6 p-4 bg-white rounded border border-[#F3F4F6]">
        <h4 className="font-bold mb-2">Chat do pedido</h4>
        <div className="flex gap-2">
          <input value={mensagem} onChange={(e)=>setMensagem(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Escreva uma mensagem..." />
          <button onClick={enviarMensagem} className="bg-[#E67E22] text-white px-3 py-2 rounded">Enviar</button>
        </div>
      </div>
    </div>
  );
}
