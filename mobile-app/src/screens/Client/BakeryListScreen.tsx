
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function BakeryListScreen({ navigation }: any) {
  const padarias = [
    { id: 1, nome: 'Padaria Estrela', endereco: 'Rua das Flores, 10' },
    { id: 2, nome: 'Padaria do João', endereco: 'Av. Central, 500' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Padarias no Bairro</Text>
      <FlatList
        data={padarias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('ProductList', { padariaId: item.id, nome: item.nome })}
          >
            <Text style={styles.name}>{item.nome}</Text>
            <Text style={styles.address}>{item.endereco}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 10, marginBottom: 15, elevation: 3 },
  name: { fontSize: 18, fontWeight: 'bold' },
  address: { color: 'gray' },
});
