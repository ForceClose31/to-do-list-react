// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddTodoScreen from './screens/AddTodoScreen';
import ViewTodosScreen from './screens/ViewTodosScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ViewTodos">
          <Stack.Screen 
            name="AddTodo" 
            component={AddTodoScreen} 
            options={{ title: 'Tambah To-Do' }} 
          />
          <Stack.Screen 
            name="ViewTodos" 
            component={ViewTodosScreen} 
            options={{ title: 'Daftar To-Do' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
