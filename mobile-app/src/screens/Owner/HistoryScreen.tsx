
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function HistoryScreen() {
  // Mock de histórico
  const historico = [
    { id: 99, cliente: 'Carlos', data: '2023-10-01', total: 50.00, status: 'Entregue' },
    { id: 98, cliente: 'Ana', data: '2023-09-30', total: 15.00, status: 'Entregue' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Pedidos</Text>
      <FlatList
        data={historico}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.pedidoId}>Pedido #{item.id}</Text>
            <Text>{item.data} - {item.cliente}</Text>
            <Text style={styles.total}>R$ {item.total.toFixed(2)}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  card: { backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 1 },
  pedidoId: { fontWeight: 'bold' },
  total: { fontWeight: 'bold', color: 'green' },
  status: { color: 'gray', fontSize: 12 }
});
