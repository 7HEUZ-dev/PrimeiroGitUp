
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';

interface Pedido {
  id: number;
  cliente: string;
  endereco: string;
  itens: string[];
  total: number;
  status: 'Pendente' | 'Preparando' | 'A Caminho' | 'Entregue';
}

export default function OrdersScreen({ navigation }: any) {
  const [pedidos, setPedidos] = useState<Pedido[]>([
    { id: 101, cliente: 'João Silva', endereco: 'Rua A, 123', itens: ['1x Bolo de Cenoura'], total: 20.00, status: 'Pendente' },
    { id: 102, cliente: 'Maria Oliveira', endereco: 'Av B, 456', itens: ['5x Pão Francês'], total: 4.00, status: 'Preparando' },
  ]);

  const atualizarStatus = (id: number) => {
    // Lógica simples de progressão de status
    setPedidos(pedidos.map(p => {
      if (p.id === id) {
        let novoStatus: Pedido['status'] = p.status;
        if (p.status === 'Pendente') novoStatus = 'Preparando';
        else if (p.status === 'Preparando') novoStatus = 'A Caminho';
        else if (p.status === 'A Caminho') novoStatus = 'Entregue';
        
        return { ...p, status: novoStatus };
      }
      return p;
    }).filter(p => p.status !== 'Entregue')); // Remove da lista se entregue (vai para histórico)
  };

  const renderPedido = ({ item }: { item: Pedido }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.pedidoId}>Pedido #{item.id}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
      <Text style={styles.cliente}>{item.cliente}</Text>
      <Text style={styles.endereco}>{item.endereco}</Text>
      <View style={styles.itens}>
        {item.itens.map((prod, idx) => <Text key={idx}>- {prod}</Text>)}
      </View>
      <Text style={styles.total}>Total: R$ {item.total.toFixed(2)}</Text>
      
      <Button 
        title={item.status === 'A Caminho' ? 'Finalizar Entrega' : 'Avançar Status'} 
        onPress={() => atualizarStatus(item.id)} 
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos Ativos</Text>
      <FlatList
        data={pedidos}
        renderItem={renderPedido}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum pedido ativo.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  card: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  pedidoId: { fontWeight: 'bold', fontSize: 16 },
  status: { color: '#2196F3', fontWeight: 'bold' },
  cliente: { fontSize: 16, marginBottom: 2 },
  endereco: { color: '#666', marginBottom: 10 },
  itens: { marginBottom: 10, paddingLeft: 10 },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'right' },
  empty: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#888' },
});
