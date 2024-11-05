// context/MaterialContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MaterialContext = createContext();

export const MaterialProvider = ({ children }) => {
  const [materiais, setMateriais] = useState([]);
  const [recebimentos, setRecebimentos] = useState([]);
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    carregarMateriais();
    carregarRecebimentos();
    carregarVendas();

    // Descomente a linha abaixo para limpar o AsyncStorage
    // limparDados();
  }, []);

  const limparDados = async () => {
    try {
      await AsyncStorage.clear();
      setMateriais([]);
      setRecebimentos([]);
      setVendas([]);
      console.log("Dados do AsyncStorage limpos com sucesso!");
    } catch (error) {
      console.log("Erro ao limpar dados do AsyncStorage:", error);
    }
  };

  const carregarMateriais = async () => {
    try {
      const materiaisSalvos = await AsyncStorage.getItem('materiais');
      if (materiaisSalvos !== null) {
        setMateriais(JSON.parse(materiaisSalvos));
      }
    } catch (error) {
      console.log("Erro ao carregar materiais:", error);
    }
  };

  const carregarRecebimentos = async () => {
    try {
      const recebimentosSalvos = await AsyncStorage.getItem('recebimentos');
      if (recebimentosSalvos !== null) {
        setRecebimentos(JSON.parse(recebimentosSalvos));
      }
    } catch (error) {
      console.log("Erro ao carregar recebimentos:", error);
    }
  };

  const carregarVendas = async () => {
    try {
      const vendasSalvas = await AsyncStorage.getItem('vendas');
      if (vendasSalvas !== null) {
        setVendas(JSON.parse(vendasSalvas));
      }
    } catch (error) {
      console.log("Erro ao carregar vendas:", error);
    }
  };

  const adicionarMaterial = async (nome, valorUnitario) => {
    const novoMaterial = {
      id: Date.now().toString(),
      nome,
      valorUnitario: parseFloat(valorUnitario),
    };
    const materiaisAtualizados = [...materiais, novoMaterial];
    setMateriais(materiaisAtualizados);

    try {
      await AsyncStorage.setItem('materiais', JSON.stringify(materiaisAtualizados));
    } catch (error) {
      console.log("Erro ao salvar materiais:", error);
    }
  };

  const registrarRecebimento = async (produto, quantidade) => {
    const index = recebimentos.findIndex((item) => item.produto === produto);
    let recebimentosAtualizados;

    if (index >= 0) {
      // Se o produto já existe no estoque, atualize a quantidade
      recebimentosAtualizados = recebimentos.map((item) =>
        item.produto === produto
          ? { ...item, quantidade: item.quantidade + parseInt(quantidade) }
          : item
      );
    } else {
      // Se o produto não existe, adicione um novo recebimento
      const novoRecebimento = {
        id: Date.now().toString(),
        produto,
        quantidade: parseInt(quantidade),
      };
      recebimentosAtualizados = [...recebimentos, novoRecebimento];
    }

    setRecebimentos(recebimentosAtualizados);

    try {
      await AsyncStorage.setItem('recebimentos', JSON.stringify(recebimentosAtualizados));
    } catch (error) {
      console.log("Erro ao salvar recebimento:", error);
    }
  };

  const registrarVenda = async (venda) => {
    const vendasAtualizadas = [...vendas, venda];
    setVendas(vendasAtualizadas);

    // Atualize a quantidade em estoque do produto vendido
    const recebimentosAtualizados = recebimentos.map((recebimento) => {
      if (recebimento.produto === venda.produto) {
        return {
          ...recebimento,
          quantidade: recebimento.quantidade - venda.quantidade,
        };
      }
      return recebimento;
    });
    setRecebimentos(recebimentosAtualizados);

    try {
      await AsyncStorage.setItem('vendas', JSON.stringify(vendasAtualizadas));
      await AsyncStorage.setItem('recebimentos', JSON.stringify(recebimentosAtualizados));
    } catch (error) {
      console.log("Erro ao salvar venda ou atualizar estoque:", error);
    }
  };

  return (
    <MaterialContext.Provider value={{ materiais, adicionarMaterial, recebimentos, registrarRecebimento, vendas, registrarVenda }}>
      {children}
    </MaterialContext.Provider>
  );
};
