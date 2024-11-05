// screens/RegistroVendaScreen.js
import React, { useContext, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Alert, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground, 
  ScrollView 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialContext } from '../context/MaterialContext';

export default function RegistroVendaScreen() {
  const { materiais, registrarVenda, recebimentos } = useContext(MaterialContext);
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [precoUnitario, setPrecoUnitario] = useState('');
  const [quantidadeEstoque, setQuantidadeEstoque] = useState(0);
  const [quantidade, setQuantidade] = useState('');
  const [cliente, setCliente] = useState('');
  const [telefone, setTelefone] = useState('');
  const [totalVenda, setTotalVenda] = useState('');
  const [data, setData] = useState(new Date());
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const formatarDataBrasileira = (data) => {
    return data.toLocaleDateString('pt-BR');
  };

  const handleProdutoSelecionado = (itemValue) => {
    setProdutoSelecionado(itemValue);
    const material = materiais.find((item) => item.nome === itemValue);
    if (material) {
      setPrecoUnitario(material.valorUnitario.toFixed(2));
      const recebimento = recebimentos.find((item) => item.produto === itemValue);
      setQuantidadeEstoque(recebimento ? recebimento.quantidade : 0); // Atualiza a quantidade em estoque
    }
    setTotalVenda('');
  };

  const handleQuantidadeChange = (value) => {
    setQuantidade(value);
    const quantidadeInt = parseInt(value);
    if (isNaN(quantidadeInt)) {
      setTotalVenda('');
      return;
    }
    if (quantidadeInt > quantidadeEstoque) {
      Alert.alert('Erro', 'Quantidade solicitada maior do que a disponível em estoque.');
    } else {
      const total = quantidadeInt * parseFloat(precoUnitario);
      setTotalVenda(total.toFixed(2));
    }
  };

  const formatarTelefone = (text) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 11) cleaned = cleaned.slice(0, 11);
    if (cleaned.length <= 2) return `(${cleaned}`;
    if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)})${cleaned.slice(2)}`;
    return `(${cleaned.slice(0, 2)})${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  };

  const handleTelefoneChange = (value) => {
    setTelefone(formatarTelefone(value));
  };

  const registrarNovaVenda = () => {
    const quantidadeInt = parseInt(quantidade);
    if (!produtoSelecionado || isNaN(quantidadeInt) || !cliente || !telefone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (quantidadeInt > quantidadeEstoque) {
      Alert.alert('Erro', 'Quantidade solicitada maior do que a disponível em estoque.');
      return;
    }
    const total = parseFloat(precoUnitario) * quantidadeInt;
    const novaVenda = {
      id: Date.now().toString(),
      produto: produtoSelecionado,
      precoUnitario: parseFloat(precoUnitario),
      quantidade: quantidadeInt,
      total,
      cliente,
      telefone,
      data: formatarDataBrasileira(data),
    };
    registrarVenda(novaVenda);
    Alert.alert('Sucesso', 'Venda registrada com sucesso!');
    // Resetar campos
    setProdutoSelecionado('');
    setPrecoUnitario('');
    setQuantidadeEstoque(0);
    setQuantidade('');
    setCliente('');
    setTelefone('');
    setTotalVenda('');
    setData(new Date());
  };

  const abrirCalendario = () => {
    setMostrarCalendario(true);
  };

  const onChangeData = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setMostrarCalendario(false);
    setData(currentDate);
  };

  return (
    <ImageBackground 
      source={require('../assets/background.jpg')} // Caminho para a imagem de fundo
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Registro de Venda</Text>

        <View style={styles.overlay}>

         
          <Picker
            selectedValue={produtoSelecionado}
            style={styles.picker}
            onValueChange={handleProdutoSelecionado}
          >
            <Picker.Item label="Selecione um produto" value="" />
            {materiais.map((material) => (
              <Picker.Item key={material.id} label={material.nome} value={material.nome} />
            ))}
          </Picker>

          {precoUnitario !== '' && (
            <Text style={styles.label}>Preço Unitário: R$ {precoUnitario}</Text>
          )}

          <Text style={styles.label}>Quantidade em Estoque: {quantidadeEstoque}</Text>

          <TextInput
            style={styles.input}
            placeholder="Quantidade"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={quantidade}
            onChangeText={handleQuantidadeChange}
          />

          <TextInput
            style={styles.input}
            placeholder="Nome do Cliente"
            placeholderTextColor="#888"
            value={cliente}
            onChangeText={setCliente}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Telefone do Cliente"
            placeholderTextColor="#888"
            value={telefone}
            onChangeText={handleTelefoneChange}
            keyboardType="phone-pad"
          />

          <TouchableOpacity onPress={abrirCalendario} style={styles.button}>
            <Text style={styles.buttonText}>Data: {formatarDataBrasileira(data)}</Text>
          </TouchableOpacity>
          {mostrarCalendario && (
            <DateTimePicker
              value={data}
              mode="date"
              display="default"
              onChange={onChangeData}
            />
          )}

          {totalVenda !== '' && (
            <Text style={styles.label}>Total da Venda: R$ {totalVenda}</Text>
          )}

          <TouchableOpacity onPress={registrarNovaVenda} style={styles.registrarButton}>
            <Text style={styles.registrarText}>Registrar Venda</Text>
          </TouchableOpacity>

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
    backgroundColor: '#D6E4F0', 
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1977b9', // Cor do título
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
    color: '#333',
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
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#D6DEE2',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registrarButton: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#1977b9',
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  registrarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
