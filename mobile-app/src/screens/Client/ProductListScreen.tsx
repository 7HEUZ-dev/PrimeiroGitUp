
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';

export default function ProductListScreen({ route, navigation }: any) {
  const { nome } = route.params;
  const [carrinho, setCarrinho] = useState<any[]>([]);

  const produtos = [
    { id: 1, nome: 'Pão Francês', preco: 0.80 },
    { id: 2, nome: 'Bolo de Cenoura', preco: 20.00 },
    { id: 3, nome: 'Leite', preco: 5.00 },
  ];

  const adicionarAoCarrinho = (produto: any) => {
    setCarrinho([...carrinho, produto]);
    Alert.alert('Sucesso', `${produto.nome} adicionado ao carrinho!`);
  };

  const finalizarCompra = () => {
    navigation.navigate('Cart', { itens: carrinho });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{nome}</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.itemName}>{item.nome}</Text>
              <Text>R$ {item.preco.toFixed(2)}</Text>
            </View>
            <Button title="Adicionar" onPress={() => adicionarAoCarrinho(item)} />
          </View>
        )}
      />
      {carrinho.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.cartInfo}>{carrinho.length} itens no carrinho</Text>
          <Button title="Ver Carrinho" onPress={finalizarCompra} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  footer: { marginTop: 20, padding: 15, backgroundColor: '#eee', borderRadius: 10 },
  cartInfo: { fontSize: 16, marginBottom: 10, textAlign: 'center' }
});
