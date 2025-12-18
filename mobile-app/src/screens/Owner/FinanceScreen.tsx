
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

// Tipo Mockado para Gasto e Venda (idealmente viria do backend)
interface Gasto {
  id: number;
  descricao: string;
  valor: number;
  data: string;
}

interface Venda {
  id: number;
  produto: string;
  quantidade: number;
  valor: number;
  data: string;
}

export default function FinanceScreen() {
  const [view, setView] = useState<'gastos' | 'lucros'>('gastos');
  const [gastos, setGastos] = useState<Gasto[]>([
    { id: 1, descricao: 'Caixa de Leite (10un)', valor: 50.00, data: '2023-10-01' },
    { id: 2, descricao: 'Farinha de Trigo (5kg)', valor: 25.00, data: '2023-10-02' },
  ]);
  const [vendas, setVendas] = useState<Venda[]>([
    { id: 1, produto: 'Bolo de Cenoura', quantidade: 1, valor: 20.00, data: '2023-10-03' },
    { id: 2, produto: 'Pão Francês (10un)', quantidade: 1, valor: 8.00, data: '2023-10-03' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [novoGasto, setNovoGasto] = useState({ descricao: '', valor: '' });

  const totalGastos = gastos.reduce((acc, curr) => acc + curr.valor, 0);
  const totalVendas = vendas.reduce((acc, curr) => acc + curr.valor, 0);
  const lucroLiquido = totalVendas - totalGastos;

  const adicionarGasto = () => {
    if (novoGasto.descricao && novoGasto.valor) {
      setGastos([...gastos, {
        id: Date.now(),
        descricao: novoGasto.descricao,
        valor: parseFloat(novoGasto.valor),
        data: new Date().toISOString().split('T')[0]
      }]);
      setNovoGasto({ descricao: '', valor: '' });
      setModalVisible(false);
    }
  };

  const renderGasto = ({ item }: { item: Gasto }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.descricao}</Text>
      <Text style={styles.cell}>R$ {item.valor.toFixed(2)}</Text>
    </View>
  );

  const renderVenda = ({ item }: { item: Venda }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.quantidade}x {item.produto}</Text>
      <Text style={styles.cell}>R$ {item.valor.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Balanço Mensal</Text>
        <Text style={styles.summaryText}>Total Gastos: <Text style={{ color: 'red' }}>R$ {totalGastos.toFixed(2)}</Text></Text>
        <Text style={styles.summaryText}>Total Vendas: <Text style={{ color: 'green' }}>R$ {totalVendas.toFixed(2)}</Text></Text>
        <Text style={[styles.summaryText, { fontWeight: 'bold' }]}>Lucro Líquido: R$ {lucroLiquido.toFixed(2)}</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, view === 'gastos' && styles.activeTab]} 
          onPress={() => setView('gastos')}
        >
          <Text style={styles.tabText}>Gastos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, view === 'lucros' && styles.activeTab]} 
          onPress={() => setView('lucros')}
        >
          <Text style={styles.tabText}>Lucros / Vendas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>{view === 'gastos' ? 'Descrição' : 'Produto Vendido'}</Text>
        <Text style={styles.headerText}>Valor</Text>
      </View>

      {view === 'gastos' ? (
        <FlatList
          data={gastos}
          renderItem={renderGasto}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <FlatList
          data={vendas}
          renderItem={renderVenda}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      {view === 'gastos' && (
        <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Gasto</Text>
            <TextInput 
              placeholder="Descrição (ex: Leite)" 
              style={styles.input} 
              value={novoGasto.descricao}
              onChangeText={(t) => setNovoGasto({...novoGasto, descricao: t})}
            />
            <TextInput 
              placeholder="Valor (ex: 50.00)" 
              style={styles.input} 
              keyboardType="numeric"
              value={novoGasto.valor}
              onChangeText={(t) => setNovoGasto({...novoGasto, valor: t})}
            />
            <Button title="Salvar" onPress={adicionarGasto} />
            <Button title="Cancelar" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  summaryContainer: { padding: 15, backgroundColor: 'white', borderRadius: 10, marginBottom: 15, elevation: 3 },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  summaryText: { fontSize: 16, marginBottom: 5 },
  tabs: { flexDirection: 'row', marginBottom: 10 },
  tab: { flex: 1, padding: 10, alignItems: 'center', backgroundColor: '#e0e0e0' },
  activeTab: { backgroundColor: '#2196F3' },
  tabText: { fontWeight: 'bold' },
  tableHeader: { flexDirection: 'row', padding: 10, backgroundColor: '#ddd' },
  headerText: { flex: 1, fontWeight: 'bold' },
  row: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: 'white' },
  cell: { flex: 1 },
  fab: { position: 'absolute', right: 20, bottom: 20, width: 50, height: 50, borderRadius: 25, backgroundColor: '#2196F3', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  fabText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { margin: 20, padding: 20, backgroundColor: 'white', borderRadius: 10 },
  modalTitle: { fontSize: 18, marginBottom: 15, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
});
