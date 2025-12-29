"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const STORAGE_KEY = "paoquentinho_cart_v1";

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      console.error("Cart load failed", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Cart save failed", e);
    }
  }, [items]);

  function addItem(produto, quantidade = 1) {
    setItems((prev) => {
      const copy = [...prev];
      const idx = copy.findIndex((i) => Number(i.produtoId) === Number(produto.id));
      if (idx >= 0) {
        copy[idx].quantidade = Number(copy[idx].quantidade) + Number(quantidade);
      } else {
        copy.push({ produtoId: Number(produto.id), nome: produto.nome, preco: Number(produto.preco), quantidade: Number(quantidade) });
      }
      return copy;
    });
  }

  function removeItem(produtoId, quantidade = 1) {
    setItems((prev) => {
      const copy = prev.map((i) => ({ ...i }));
      const idx = copy.findIndex((i) => Number(i.produtoId) === Number(produtoId));
      if (idx === -1) return prev;
      copy[idx].quantidade = Number(copy[idx].quantidade) - Number(quantidade);
      if (copy[idx].quantidade <= 0) {
        copy.splice(idx, 1);
      }
      return copy;
    });
  }

  function clearCart() {
    setItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  }

  const totalItems = items.reduce((s, i) => s + Number(i.quantidade), 0);
  const subtotal = items.reduce((s, i) => s + Number(i.preco) * Number(i.quantidade), 0);

  const value = { items, addItem, removeItem, clearCart, totalItems, subtotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
