// screens/RecebimentoMercadoriaScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialContext } from '../context/MaterialContext';

export default function RecebimentoMercadoriaScreen() {
  const { materiais, registrarRecebimento } = useContext(MaterialContext);
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const handleRecebimento = () => {
    if (produtoSelecionado && quantidade) {
      registrarRecebimento(produtoSelecionado, quantidade);
      Alert.alert('Sucesso', 'Recebimento registrado com sucesso!');
      setProdutoSelecionado('');
      setQuantidade('');
    } else {
      Alert.alert('Erro', 'Por favor, selecione um produto e insira a quantidade.');
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/background.jpg')} // Caminho para a imagem de fundo
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Recebimento de Mercadoria</Text>

          <Picker
            selectedValue={produtoSelecionado}
            style={styles.picker}
            onValueChange={(itemValue) => setProdutoSelecionado(itemValue)}
          >
            <Picker.Item label="Selecione um produto" value="" />
            {materiais.map((material) => (
              <Picker.Item key={material.id} label={material.nome} value={material.nome} />
            ))}
          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            keyboardType="numeric"
            value={quantidade}
            onChangeText={setQuantidade}
          />

          <Button title="Registrar Recebimento" onPress={handleRecebimento} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  overlay: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#D6E4F0', // Fundo semi-transparente
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
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
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
});
