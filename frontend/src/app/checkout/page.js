"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, CartProvider } from "../../context/CartContext";
import ResumoFinanceiro, { formatBRL } from "../../components/ResumoFinanceiro";
import SeletorPagamento from "../../components/SeletorPagamento";
import { fetchWithToken } from "../../lib/fetchWithToken";

function CheckoutContent() {
  const { items, subtotal, clearCart } = useCart();
  const [metodoPagamento, setMetodoPagamento] = useState('PIX');
  const [clienteId, setClienteId] = useState('');
  const [endereco, setEndereco] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const entrega = metodoPagamento === 'DINHEIRO' ? 0 : 5;

  async function handlePay() {
    if (!metodoPagamento) return alert('Selecione um método de pagamento');
    if (!clienteId) return alert('Informe o clienteId');
    if (!endereco) return alert('Informe endereço de entrega');
    if (!items || items.length===0) return alert('Carrinho vazio');

    const dto = {
      clienteId: Number(clienteId),
      padariaId: Number(items[0].padariaId || 1),
      enderecoEntrega: endereco,
      itens: items.map(i=>({ produtoId: Number(i.produtoId), quantidade: Number(i.quantidade) })),
      metodoPagamento: metodoPagamento
    };

    setLoading(true);
    try {
      const res = await fetchWithToken('/pedidos', { method: 'POST', body: JSON.stringify(dto) });
      if (res.status === 400) {
        const body = await res.json().catch(()=>({message:'Erro de validação'}));
        alert(body.message || 'Erro: Estoque insuficiente ou dados inválidos');
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error('Erro no servidor');
      const data = await res.json();
      clearCart();
      router.push(`/pedido/${data.id}`);
    } catch (e) {
      console.error(e);
      alert('Erro ao criar pedido. Tente novamente.');
    } finally { setLoading(false); }
  }

  return (
    <div className="p-6 bg-[#FDFCFB] min-h-screen">
      <header className="flex items-center justify-between mb-6">
        <div className="font-bold text-xl">Finalizar Pedido</div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold mb-3">Itens</h3>
          <div className="flex flex-col gap-3">
            {items.map(i=> (
              <div key={i.produtoId} className="p-3 bg-white rounded border border-[#F3F4F6]"><div className="flex justify-between"><div>{i.nome} x{i.quantidade}</div><div className="text-[#E67E22]">{formatBRL(Number(i.preco)*Number(i.quantidade))}</div></div></div>
            ))}
            {items.length===0 && <div className="text-[#6B7280]">Carrinho vazio</div>}
          </div>

          <div className="mt-6">
            <label className="block">ClienteId</label>
            <input value={clienteId} onChange={(e)=>setClienteId(e.target.value)} className="w-full p-2 border rounded" />
            <label className="block mt-2">Endereço de entrega</label>
            <input value={endereco} onChange={(e)=>setEndereco(e.target.value)} className="w-full p-2 border rounded" />
          </div>

          <div className="mt-6">
            <h4 className="font-bold mb-2">Método de pagamento</h4>
            <SeletorPagamento metodoPagamento={metodoPagamento} setMetodoPagamento={setMetodoPagamento} />
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-3">Resumo</h3>
          <ResumoFinanceiro subtotal={subtotal} metodoPagamento={metodoPagamento} />

          <button disabled={loading || !metodoPagamento} onClick={handlePay} className="mt-4 w-full bg-[#E67E22] text-white py-2 rounded disabled:opacity-50">{loading? 'Processando...' : 'Pagar'}</button>
        </div>
      </div>
    </div>
  );
}

export default function Page(){
  return (
    <CartProvider>
      <CheckoutContent />
    </CartProvider>
  );
}
"use client";
// Importe o que for necessário...

export default function CheckoutPage() {
  // ... seus states de método, etc.

  const finalizarPedidoReal = async () => {
    // 1. Pegamos os dados do carrinho (que idealmente estão no seu estado global ou localStorage)
    // Exemplo de como montar o objeto baseado no seu Service:
    const dadosParaEnvio = {
      clienteId: 1, // Aqui você pegará o ID do usuário logado
      padariaId: 1, // Aqui o ID da padaria dona dos produtos
      enderecoEntrega: "Rua das Padarias, 123", // Pegar de um input de endereço
      itens: [
        { produtoId: 1, quantidade: 1 }, // IDs reais dos produtos cadastrados
        { produtoId: 2, quantidade: 2 }
      ]
    };

    try {
      // Faz a chamada para o seu @Post() no PedidosController
      const response = await fetch('http://localhost:3000/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Necessário pois você usa AuthGuard('jwt')
        },
        body: JSON.stringify(dadosParaEnvio),
      });

      if (!response.ok) {
        const erro = await response.json();
        alert(`Erro: ${erro.message}`); // Exibe o erro de "Estoque Insuficiente" do seu service
        return;
      }

      const pedidoCriado = await response.json();
      
      // Se deu certo, redireciona para a tela de chat/status que criamos
      window.location.href = `/pedido/${pedidoCriado.id}`;
      
    } catch (error) {
      console.error("Falha na conexão com o servidor:", error);
    }
  };

  return (
    // ... no seu botão laranja de Pagar:
    <button onClick={finalizarPedidoReal} className="w-full bg-[#E67E22] ...">
       Pagar R$ 45,00
    </button>
  );
}