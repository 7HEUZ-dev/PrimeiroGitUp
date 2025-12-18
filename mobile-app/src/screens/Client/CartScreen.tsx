
import React from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';

export default function CartScreen({ route, navigation }: any) {
  const { itens } = route.params;
  const total = itens.reduce((acc: number, curr: any) => acc + curr.preco, 0);

  const pagar = () => {
    Alert.alert('Pagamento', 'Pagamento efetuado com sucesso!', [
      { text: 'OK', onPress: () => navigation.navigate('Chat') }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      <FlatList
        data={itens}
        keyExtractor={(item: any, index: number) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.nome}</Text>
            <Text>R$ {item.preco.toFixed(2)}</Text>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
        <Button title="Pagar e Finalizar" onPress={pagar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' },
  totalContainer: { marginTop: 30, borderTopWidth: 1, paddingTop: 20 },
  totalText: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'right' }
});
