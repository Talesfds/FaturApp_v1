// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) { // Adiciona navigation como parâmetro
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username === 'adm123' && password === '123456') {
      navigation.navigate('Home'); // Navega para a página Home após login
    } else {
      Alert.alert('Erro', 'Usuário ou senha incorretos');
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/background.jpg')} // Caminho para a imagem de fundo
      style={styles.container}
    >
      {/* Logo e Nome da Aplicação fora da caixa de login */}
      <Image 
        source={require('../assets/logo2.png')} // Caminho para a logo
        style={styles.logo}
      />
      
      <View style={styles.appNameContainer}>
        <Text style={styles.appNameFatur}>Fatur</Text>
        <Text style={styles.appNameApp}>App</Text>
      </View>

      {/* Caixa de login */}
      <View style={styles.overlay}>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername} // Atualiza o estado do usuário
        />

        {/* Campo de senha com ícone de olho */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Senha"
            placeholderTextColor="#888"
            secureTextEntry={!showPassword} // Alterna entre mostrar e ocultar a senha
            value={password}
            onChangeText={setPassword} // Atualiza o estado da senha
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons 
              name={showPassword ? 'eye' : 'eye-off'} 
              size={24} 
              color="#888" 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
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
    width: 100,
    height: 100,
    position: 'absolute',
    top: 100,
  },
  appNameContainer: {
    flexDirection: 'row', // Organiza "Fatur" e "App" lado a lado
    position: 'absolute',
    top: 230,
  },
  appNameFatur: {
    fontSize: 50,
    color: '#1977b9', // Azul escuro
    fontWeight: 'bold',
  },
  appNameApp: {
    fontSize: 50,
    color: '#5b5a5e', // Cinza escuro
    fontWeight: 'bold',
  },
  overlay: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#dfe9f5', // Ajuste para cinza claro
    padding: 20,
    borderRadius: 8,
    marginTop: 50,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  inputPassword: {
    flex: 1,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1977b9',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
