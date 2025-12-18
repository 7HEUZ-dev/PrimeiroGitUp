
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function ChatScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Seus pedidos foram concluídos!</Text>
      <Text style={styles.subMessage}>Aguarde a entrega.</Text>
      <Button title="Voltar ao Início" onPress={() => navigation.popToTop()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  message: { fontSize: 24, fontWeight: 'bold', color: 'green', textAlign: 'center', marginBottom: 10 },
  subMessage: { fontSize: 18, color: '#555', marginBottom: 30 }
});
