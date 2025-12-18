import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo (Cliente)</Text>
      <Text>Lista de Padarias do Bairro:</Text>
      {/* TODO: Listar padarias */}
      <Button title="Ver Padaria Exemplo" onPress={() => console.log('Ir para padaria')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 20 },
});
