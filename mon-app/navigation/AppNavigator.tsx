import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome"; // Importation des icônes

// Import des types
import { RootStackParamList } from "../types/types";

// Import des écrans
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import BookListScreen from "../screens/BookListScreen";
import BorrowListScreen from "../screens/BorrowListScreen";
import MenuScreen from "../screens/Menu";
import AddBookScreen from "../screens/AddBookScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeAdminScreen from "../screens/HomeAdminScreen";
import HomeUserScreen from "../screens/HomeUserScreen";
import EditBookScreen from "../screens/EditBookScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Connexion",
            headerRight: () => <Icon name="sign-in" size={20} color="#000" />,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            title: "Créer un compte",
            headerRight: () => <Icon name="user-plus" size={20} color="#000" />,
          }}
        />
        <Stack.Screen
          name="HomeAdmin"
          component={HomeAdminScreen}
          options={{
            title: "Accueil Admin",
            headerRight: () => <Icon name="home" size={20} color="#000" />,
          }}
        />
        <Stack.Screen
          name="HomeUser"
          component={HomeUserScreen}
          options={{
            title: "Accueil Utilisateur",
            headerRight: () => <Icon name="home" size={20} color="#000" />,
          }}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{
            title: "Menu",
            headerRight: () => <Icon name="bars" size={20} color="#000" />,
          }}
        />
        <Stack.Screen
          name="BookList"
          component={BookListScreen}
          options={{
            title: "Livres",
            headerRight: () => <Icon name="book" size={20} color="#000" />,
          }}
        />
        <Stack.Screen
          name="BorrowList"
          component={BorrowListScreen}
          options={{
            title: "Mes Emprunts",
            headerRight: () => <Icon name="bookmark" size={20} color="#000" />,
          }}
        />
        <Stack.Screen
          name="AddBook"
          component={AddBookScreen}
          options={{
            title: "Ajouter un Livre",
            headerRight: () => (
              <Icon name="plus-circle" size={20} color="#000" />
            ),
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profil",
            headerRight: () => <Icon name="user" size={20} color="#000" />,
          }}
        />
        <Stack.Screen
          name="EditBook"
          component={EditBookScreen}
          options={{
            title: "EditBook",
            headerRight: () => <Icon name="user" size={20} color="#000" />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
