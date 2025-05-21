import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddCategoryScreen from './screens/AddCategoryScreen';
import MessagesScreen from './screens/MessagesScreen';
import { CategoryProvider } from './contexts/CategoryContext';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <CategoryProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'HomeTab') iconName = 'home';
              if (route.name === 'Add') iconName = 'add-circle';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name="HomeTab"
            component={HomeStack}
            options={{ title: 'Home', headerShown: false }}
          />
          <Tab.Screen name="Add" component={AddCategoryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </CategoryProvider>
  );
}
