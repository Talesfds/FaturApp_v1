// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialProvider } from './context/MaterialContext';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegistroVendaScreen from './screens/RegistroVendaScreen';
import AvaliacaoEstoqueScreen from './screens/AvaliacaoEstoqueScreen';
import RecebimentoMercadoriaScreen from './screens/RecebimentoMercadoriaScreen';
import FaturamentoScreen from './screens/FaturamentoScreen';
import CadastroMaterialScreen from './screens/CadastroMaterialScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <MaterialProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Menu Principal' }}
          />
          <Stack.Screen 
            name="RegistroVenda" 
            component={RegistroVendaScreen} 
            options={{ title: 'Registro de Venda' }}
          />
          <Stack.Screen 
            name="AvaliacaoEstoque" 
            component={AvaliacaoEstoqueScreen} 
            options={{ title: 'Avaliação do Estoque' }}
          />
          <Stack.Screen 
            name="RecebimentoMercadoria" 
            component={RecebimentoMercadoriaScreen} 
            options={{ title: 'Recebimento de Mercadoria' }}
          />
          <Stack.Screen 
            name="Faturamento" 
            component={FaturamentoScreen} 
            options={{ title: 'Faturamento' }}
          />
          <Stack.Screen 
            name="CadastroMaterial" 
            component={CadastroMaterialScreen} 
            options={{ title: 'Cadastro de Produto' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MaterialProvider>
  );
}
