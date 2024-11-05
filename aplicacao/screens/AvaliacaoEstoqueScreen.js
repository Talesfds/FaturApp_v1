// screens/AvaliacaoEstoqueScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialContext } from '../context/MaterialContext';

export default function AvaliacaoEstoqueScreen() {
  const { recebimentos } = useContext(MaterialContext);
  const [statusFiltro, setStatusFiltro] = useState('Todos');

  // Função para determinar o estilo e a mensagem de acordo com a quantidade
  const getEstiloQuantidade = (quantidade) => {
    if (quantidade === 0) {
      return { estilo: styles.critico, mensagem: 'Crítico' };
    } else if (quantidade > 0 && quantidade <= 50) {
      return { estilo: styles.alerta, mensagem: 'Alerta' };
    } else {
      return { estilo: styles.adequado, mensagem: 'Adequado' };
    }
  };

  // Filtra os itens de acordo com o status selecionado
  const itensFiltrados = recebimentos.filter((item) => {
    const { mensagem } = getEstiloQuantidade(item.quantidade);
    return statusFiltro === 'Todos' || mensagem === statusFiltro;
  });

  return (
    <ImageBackground 
      source={require('../assets/background.jpg')} // Caminho para a imagem de fundo
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Avaliação do Estoque</Text>

        <Text style={styles.label}>Filtrar por Status:</Text>
        <Picker
          selectedValue={statusFiltro}
          style={styles.picker}
          onValueChange={(itemValue) => setStatusFiltro(itemValue)}
        >
          <Picker.Item label="Todos" value="Todos" />
          <Picker.Item label="Crítico" value="Crítico" />
          <Picker.Item label="Alerta" value="Alerta" />
          <Picker.Item label="Adequado" value="Adequado" />
        </Picker>

        <FlatList
          data={itensFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const { estilo, mensagem } = getEstiloQuantidade(item.quantidade);
            return (
              <View style={[styles.recebimentoItem, estilo]}>
                <Text>Produto: {item.produto}</Text>
                <Text>Quantidade em Estoque: {item.quantidade}</Text>
                <Text>Status: {mensagem}</Text>
              </View>
            );
          }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f9fa', // Fundo semi-transparente
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: '90%', // Ajuste a largura
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1977b9', // Cor do título
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
  },
  recebimentoItem: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  critico: {
    backgroundColor: '#ffcccc', // Vermelho claro
  },
  alerta: {
    backgroundColor: '#fff3cd', // Amarelo claro
  },
  adequado: {
    backgroundColor: '#d4edda', // Verde claro
  },
});
