
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// Auth
import LoginScreen from '../screens/Auth/LoginScreen';

// Client
import BakeryListScreen from '../screens/Client/BakeryListScreen';
import ProductListScreen from '../screens/Client/ProductListScreen';
import CartScreen from '../screens/Client/CartScreen';
import ChatScreen from '../screens/Client/ChatScreen';

// Owner
import OrdersScreen from '../screens/Owner/OrdersScreen';
import FinanceScreen from '../screens/Owner/FinanceScreen';
import HistoryScreen from '../screens/Owner/HistoryScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ClientStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BakeryList" component={BakeryListScreen} options={{ title: 'Padarias' }} />
      <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Produtos' }} />
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Carrinho' }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Status do Pedido', headerLeft: () => null }} />
    </Stack.Navigator>
  );
}

function OwnerDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Orders">
      <Drawer.Screen name="Orders" component={OrdersScreen} options={{ title: 'Pedidos' }} />
      <Drawer.Screen name="Finance" component={FinanceScreen} options={{ title: 'Financeiro (Gastos/Lucros)' }} />
      <Drawer.Screen name="History" component={HistoryScreen} options={{ title: 'Histórico de Pedidos' }} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={ClientStack} />
        <Stack.Screen name="DonoHome" component={OwnerDrawer} />
        {/* Adicione RegisterScreen aqui depois */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
