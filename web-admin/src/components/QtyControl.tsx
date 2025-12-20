"use client";
import { useState } from "react";

export default function QtyControl({
  onChange,
  initial = 1,
}: {
  onChange: (qty: number) => void;
  initial?: number;
}) {
  const [qty, setQty] = useState(initial);
  function set(n: number) {
    const v = Math.max(1, n);
    setQty(v);
    onChange(v);
  }
  return (
    <div className="mt-3 flex items-center gap-2">
      <button
        className="h-8 w-8 rounded-full border border-zinc-300 text-zinc-800 hover:bg-zinc-50"
        onClick={() => set(qty - 1)}
      >
        -
      </button>
      <div className="w-8 text-center">{qty}</div>
      <button
        className="h-8 w-8 rounded-full border border-zinc-300 text-zinc-800 hover:bg-zinc-50"
        onClick={() => set(qty + 1)}
      >
        +
      </button>
    </div>
  );
}
