"use client";
import React, { useState } from 'react';
import { Send, CheckCircle2, Utensils, Bike, Check, Clock } from 'lucide-react';

export default function OrderTrackingPage() {
  const [mensagem, setMensagem] = useState("");

  return (
    <div className="min-h-screen bg-[#FDFCFB] p-4 font-sans text-[#4A4A4A]">
      <div className="max-w-4xl mx-auto space-y-4">
        
        {/* Card de Status - Exatamente como na imagem */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Status do Pedido</h2>
            <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold">Em Preparo</span>
          </div>

          <div className="flex justify-between items-center relative pt-4">
            {/* Linha de fundo dos steps */}
            <div className="absolute top-[42px] left-0 w-full h-[2px] bg-gray-100 -z-0"></div>
            
            {/* Steps conforme seu mockup */}
            {[
              { label: 'Pedido Recebido', icon: <CheckCircle2 size={18}/>, active: true },
              { label: 'Em Preparo', icon: <Utensils size={18}/>, active: true },
              { label: 'Pronto para Entrega', icon: <Clock size={18}/>, active: false },
              { label: 'Entregue', icon: <Check size={18}/>, active: false },
            ].map((step, i) => (
              <div key={i} className="z-10 text-center flex flex-col items-center w-1/4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-sm border ${step.active ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-300 border-gray-100'}`}>
                  {step.icon}
                </div>
                <p className={`text-[10px] font-bold px-1 ${step.active ? 'text-gray-800' : 'text-gray-300'}`}>{step.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card de Tempo Estimado */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-2xl text-orange-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Tempo estimado</p>
            <p className="text-xl font-bold text-orange-600">15-25 min</p>
          </div>
        </div>

        {/* Área do Chat */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col h-[400px]">
          <div className="p-4 border-b font-bold text-sm text-gray-700">Chat com a Padaria</div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F9F9F9]">
            {/* Mensagem da Loja */}
            <div className="max-w-[85%]">
              <div className="bg-[#EFEBE6] text-gray-800 p-4 rounded-2xl rounded-tl-none shadow-sm text-sm border border-gray-200">
                <p>🥖 Seu pedido foi recebido! Estamos preparando com todo carinho. Aguarde, em breve estará prontinho!</p>
                <span className="text-[10px] text-gray-400 mt-2 block italic">14:31</span>
              </div>
            </div>
          </div>

          {/* Input do Chat Estilizado conforme imagem */}
          <div className="p-4 bg-white border-t flex gap-2 items-center rounded-b-3xl">
            <input 
              type="text" 
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Digite sua mensagem..." 
              className="flex-1 bg-gray-50 border border-gray-100 p-3 rounded-xl outline-none text-sm focus:ring-1 ring-orange-400 transition"
            />
            <button className="bg-orange-500 text-white p-3 rounded-xl shadow-md hover:bg-orange-600 transition active:scale-95">
              <Send size={18}/>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}