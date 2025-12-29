"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, CartProvider } from "../../../context/CartContext";
import CardProduto from "../../../components/CardProduto";
import { fetchWithToken } from "../../../lib/fetchWithToken";

function PadariaContent({ padariaId }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { totalItems, subtotal } = useCart();

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchWithToken(`/produtos?padariaId=${padariaId}`).then(async (res) => {
      if (!active) return;
      if (!res.ok) {
        setProdutos([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setProdutos(data || []);
      setLoading(false);
    }).catch(()=>{setProdutos([]);setLoading(false)});
    return ()=>{active=false};
  }, [padariaId]);

  // agrupa por categoria dinâmica
  const categorias = produtos.reduce((map, p) => {
    const key = p.categoria || p.tipo || 'Outros';
    if (!map[key]) map[key] = [];
    map[key].push(p);
    return map;
  }, {});

  return (
    <div className="p-6 bg-[#FDFCFB] min-h-screen">
      <header className="flex items-center justify-between mb-6">
        <div className="font-bold text-xl">PãoQuentinho</div>
        <nav>Menu</nav>
        <button className="bg-[#E67E22] text-white px-3 py-1 rounded">Painel Admin</button>
      </header>

      {loading && <div>Carregando produtos...</div>}
      {!loading && produtos.length === 0 && <div className="text-center text-[#6B7280]">Nenhum produto cadastrado</div>}

      {Object.keys(categorias).map((cat) => (
        <section key={cat} className="mb-6">
          <h2 className="font-bold mb-3">{cat}</h2>
          <div className="grid gap-3">
            {categorias[cat].map((p) => <CardProduto key={p.id} produto={p} />)}
          </div>
        </section>
      ))}

      {/* Barra de carrinho flutuante */}
      <div className="fixed left-0 right-0 bottom-0 p-4 bg-white border-t border-[#F3F4F6] flex items-center justify-between">
        <div>
          <div className="text-sm text-[#6B7280]">Itens: {totalItems}</div>
          <div className="font-bold text-lg text-[#E67E22]">{new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(subtotal))}</div>
        </div>
        <button onClick={()=>router.push('/checkout')} className="bg-[#E67E22] text-white px-4 py-2 rounded">Ir para checkout</button>
      </div>
    </div>
  );
}

export default function Page({ params }) {
  const padariaId = params.id;
  return (
    <CartProvider>
      <PadariaContent padariaId={padariaId} />
    </CartProvider>
  );
}
