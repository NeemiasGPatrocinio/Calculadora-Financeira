
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicial from './inicial.jsx';
import Entrada from './entrada.jsx';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicial">
        <Stack.Screen name="Inicial" component={Inicial} />
        <Stack.Screen name="Entrada" component={Entrada} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
