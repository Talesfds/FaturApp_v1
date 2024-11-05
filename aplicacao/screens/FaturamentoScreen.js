// screens/FaturamentoScreen.js
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BarChart } from 'react-native-chart-kit';
import { MaterialContext } from '../context/MaterialContext';

export default function FaturamentoScreen() {
  const { vendas } = useContext(MaterialContext);
  const [faturamentoTotal, setFaturamentoTotal] = useState(0);
  const [filtroDataInicio, setFiltroDataInicio] = useState(new Date());
  const [filtroDataFim, setFiltroDataFim] = useState(new Date());
  const [mostrarDataInicio, setMostrarDataInicio] = useState(false);
  const [mostrarDataFim, setMostrarDataFim] = useState(false);
  const [vendasFiltradas, setVendasFiltradas] = useState([]);
  const [dadosGrafico, setDadosGrafico] = useState({ labels: [], data: [] });

  useEffect(() => {
    calcularFaturamentoTotal();
    filtrarVendasPorData();
  }, [vendas, filtroDataInicio, filtroDataFim]);

  useEffect(() => {
    atualizarDadosGrafico();
  }, [vendasFiltradas]);

  const calcularFaturamentoTotal = () => {
    const total = vendas.reduce((acc, venda) => acc + venda.total, 0);
    setFaturamentoTotal(total);
  };

  const filtrarVendasPorData = () => {
    const vendasFiltradas = vendas.filter((venda) => {
      const dataVenda = new Date(venda.data.split('/').reverse().join('-'));
      return dataVenda >= filtroDataInicio && dataVenda <= filtroDataFim;
    });
    setVendasFiltradas(vendasFiltradas);
  };

  const atualizarDadosGrafico = () => {
    const vendasPorData = {};

    // Agrupa as vendas por data e calcula o total para cada mês
    vendasFiltradas.forEach((venda) => {
      const dataVenda = new Date(venda.data.split('/').reverse().join('-'));
      const mes = dataVenda.getMonth(); // Obtém o mês como um número (0 para janeiro, 11 para dezembro)
      const ano = dataVenda.getFullYear();
      const chaveMesAno = `${mes}-${ano}`; // Chave no formato "0-2024" para garantir a ordem correta

      if (vendasPorData[chaveMesAno]) {
        vendasPorData[chaveMesAno] += venda.total;
      } else {
        vendasPorData[chaveMesAno] = venda.total;
      }
    });

    // Ordena as chaves dos meses e anos
    const mesesOrdenados = Object.keys(vendasPorData)
      .sort((a, b) => {
        const [mesA, anoA] = a.split('-').map(Number);
        const [mesB, anoB] = b.split('-').map(Number);
        return anoA !== anoB ? anoA - anoB : mesA - mesB;
      });

    // Cria os arrays de labels e data para o gráfico
    const labels = mesesOrdenados.map((chave) => {
      const [mes, ano] = chave.split('-');
      return new Date(ano, mes).toLocaleString('pt-BR', { month: 'short' }); // Rótulo do mês abreviado
    });

    const data = mesesOrdenados.map((chave) => vendasPorData[chave]);

    setDadosGrafico({ labels, data });
  };

  const abrirCalendarioInicio = () => {
    setMostrarDataInicio(true);
  };

  const abrirCalendarioFim = () => {
    setMostrarDataFim(true);
  };

  const onChangeDataInicio = (event, selectedDate) => {
    const currentDate = selectedDate || filtroDataInicio;
    setMostrarDataInicio(false);
    setFiltroDataInicio(currentDate);
  };

  const onChangeDataFim = (event, selectedDate) => {
    const currentDate = selectedDate || filtroDataFim;
    setMostrarDataFim(false);
    setFiltroDataFim(currentDate);
  };

  return (
    <ImageBackground 
      source={require('../assets/background.jpg')} // Caminho para a imagem de fundo
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard de Faturamento</Text>

        <View style={styles.faturamentoContainer}>
          <Text style={styles.faturamentoLabel}>Faturamento Total:</Text>
          <Text style={styles.faturamentoValue}>R$ {faturamentoTotal.toFixed(2)}</Text>
        </View>

        <Text style={styles.label}>Filtrar por Período:</Text>
        
        <TouchableOpacity onPress={abrirCalendarioInicio} style={styles.dateButton}>
          <Text style={styles.dateText}>Data Início: {filtroDataInicio.toLocaleDateString('pt-BR')}</Text>
        </TouchableOpacity>
        {mostrarDataInicio && (
          <DateTimePicker
            value={filtroDataInicio}
            mode="date"
            display="default"
            onChange={onChangeDataInicio}
          />
        )}

        <TouchableOpacity onPress={abrirCalendarioFim} style={styles.dateButton}>
          <Text style={styles.dateText}>Data Fim: {filtroDataFim.toLocaleDateString('pt-BR')}</Text>
        </TouchableOpacity>
        {mostrarDataFim && (
          <DateTimePicker
            value={filtroDataFim}
            mode="date"
            display="default"
            onChange={onChangeDataFim}
          />
        )}

        <Text style={styles.label}>Gráfico de Faturamento:</Text>
        <BarChart
          data={{
            labels: dadosGrafico.labels,
            datasets: [
              {
                data: dadosGrafico.data,
              },
            ],
          }}
          width={Dimensions.get('window').width - 40} // Largura do gráfico
          height={220}
          yAxisLabel="R$ "
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#f5f5f5',
            backgroundGradientTo: '#f5f5f5',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 8,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#1976d2',
            },
          }}
          style={{
            marginVertical: 20,
            borderRadius: 8,
          }}
        />

        <Text style={styles.label}>Vendas no Período:</Text>
        <FlatList
          data={vendasFiltradas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.vendaItem}>
              <Text>Produto: {item.produto}</Text>
              <Text>Cliente: {item.cliente}</Text>
              <Text>Data: {item.data}</Text>
              <Text>Total: R$ {item.total.toFixed(2)}</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1977b9', // Cor do título ajustada para azul
  },
  faturamentoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
  },
  faturamentoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  faturamentoValue: {
    fontSize: 18,
    color: '#1976d2',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  dateButton: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#1977b9',
    borderRadius: 8,
    alignItems: 'center',
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
  },
  vendaItem: {
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginVertical: 10,
  },
});
