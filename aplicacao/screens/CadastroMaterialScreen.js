// screens/CadastroMaterialScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { MaterialContext } from '../context/MaterialContext';

export default function CadastroMaterialScreen() {
  const { materiais, adicionarMaterial } = useContext(MaterialContext);
  const [nome, setNome] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');

  const handleAddMaterial = () => {
    if (nome && valorUnitario) {
      adicionarMaterial(nome, parseFloat(valorUnitario));
      setNome('');
      setValorUnitario('');
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/background.jpg')} // Caminho para a imagem de fundo
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro de Produto</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do Produto"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor Unitário"
          keyboardType="numeric"
          value={valorUnitario}
          onChangeText={setValorUnitario}
        />
        
        <Button title="Adicionar Material" onPress={handleAddMaterial} />

        <Text style={styles.subtitle}>Materiais Cadastrados:</Text>
        <FlatList
          data={materiais}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.materialItem}>
              <Text>Nome: {item.nome}</Text>
              <Text>Valor Unitário: R$ {item.valorUnitario.toFixed(2)}</Text>
            </View>
          )}
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
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1977b9', // Cor do título ajustada para azul
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  materialItem: {
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginVertical: 10,
  },
});
