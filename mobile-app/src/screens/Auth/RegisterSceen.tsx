import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, Alert } from 'react-native';

export default function RegisterScreen({ navigation }: any) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isDono, setIsDono] = useState(false);

  const handleRegister = () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    if (isDono) {
      navigation.replace('DonoHome');
    } else {
      navigation.replace('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <View style={styles.row}>
        <Text>Sou dono de padaria</Text>
        <Switch value={isDono} onValueChange={setIsDono} />
      </View>
      <Button title="Cadastrar" onPress={handleRegister} />
      <View style={{ height: 12 }} />
      <Button title="Voltar ao Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }
});
