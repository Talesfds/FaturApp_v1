// screens/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('../assets/background.jpg')}
      style={styles.container}
    >
      {/* Adicionando a logo */}
      <Image 
        source={require('../assets/logo2.png')} // Caminho para a imagem da logo
        style={styles.logo} // Aplicando estilo
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegistroVenda')}>
        <Text style={styles.buttonText}>Registro de Venda</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AvaliacaoEstoque')}>
        <Text style={styles.buttonText}>Avaliação do Estoque</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RecebimentoMercadoria')}>
        <Text style={styles.buttonText}>Recebimento de Mercadoria</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Faturamento')}>
        <Text style={styles.buttonText}>Faturamento</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CadastroMaterial')}>
        <Text style={styles.buttonText}>Cadastro de Produto</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100, // Ajuste a largura conforme necessário
    height: 100, // Ajuste a altura conforme necessário
    marginBottom: 50, // Reduzir esse valor para subir a logo
    marginTop: -100, // Adicionar valor negativo para subir ainda mais
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  button: {
    width: '90%',
    padding: 15,
    backgroundColor: '#1977b9',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
