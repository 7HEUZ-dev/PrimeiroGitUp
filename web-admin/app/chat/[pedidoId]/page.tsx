"use client";
import { useEffect, useState } from "react";

interface Msg {
  from: "cliente" | "padaria";
  text: string;
  ts: number;
}

export default function ChatPage({ params }: { params: { pedidoId: string } }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`chat_${params.pedidoId}`);
      if (raw) setMsgs(JSON.parse(raw));
    } catch {}
  }, [params.pedidoId]);

  function send() {
    if (!text.trim()) return;
    const m: Msg = { from: "cliente", text, ts: Date.now() };
    const next = [...msgs, m];
    setMsgs(next);
    setText("");
    try {
      localStorage.setItem(`chat_${params.pedidoId}`, JSON.stringify(next));
    } catch {}
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="font-display text-2xl">Chat com a padaria</div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm h-[60vh] overflow-y-auto">
          <div className="space-y-3">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[70%] rounded-2xl px-3 py-2 ${
                  m.from === "cliente"
                    ? "bg-orange-100 text-orange-900 ml-auto"
                    : "bg-zinc-100 text-zinc-900 mr-auto"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escreva sua mensagem..."
            className="flex-1 h-12 rounded-xl border border-zinc-200 px-4 outline-none focus:border-orange-400"
          />
          <button
            onClick={send}
            className="h-12 rounded-full bg-orange-500 px-6 text-white hover:bg-orange-600"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
