import { create } from "zustand";

export interface CartItem {
  produtoId: number;
  nome: string;
  preco: number;
  quantidade: number;
}

interface CartState {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantidade">, qty?: number) => void;
  remove: (produtoId: number) => void;
  setQty: (produtoId: number, qty: number) => void;
  clear: () => void;
  total: () => number;
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  add: (item, qty = 1) =>
    set((state) => {
      const idx = state.items.findIndex((i) => i.produtoId === item.produtoId);
      if (idx >= 0) {
        const items = [...state.items];
        items[idx] = {
          ...items[idx],
          quantidade: items[idx].quantidade + qty,
        };
        return { items };
      }
      return {
        items: [...state.items, { ...item, quantidade: qty }],
      };
    }),
  remove: (produtoId) =>
    set((state) => ({ items: state.items.filter((i) => i.produtoId !== produtoId) })),
  setQty: (produtoId, qty) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.produtoId === produtoId ? { ...i, quantidade: qty } : i
      ),
    })),
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((sum, i) => sum + i.preco * i.quantidade, 0),
}));
