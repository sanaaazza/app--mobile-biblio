import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";

type MenuScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Menu"
>;

type MenuProps = {
  navigation: MenuScreenNavigationProp;
};

const MenuScreen: React.FC<MenuProps> = ({ navigation }) => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setRole(parsedUser.role);
          console.log("Rôle de l'utilisateur récupéré :", parsedUser.role);
        }
      } catch (error) {
        Alert.alert("Erreur", "Impossible de récupérer le rôle utilisateur.");
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace("Login");
  };

  const renderButton = (
    title: string,
    onPress: () => void,
    isLogout?: boolean
  ) => (
    <TouchableOpacity
      style={[styles.button, isLogout && styles.logoutButton]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Principal</Text>

      {renderButton("Liste des livres", () => navigation.navigate("BookList"))}

      {role === "admin" && (
        <>
          {renderButton("Espace Admin", () => navigation.navigate("HomeAdmin"))}
          {renderButton("Ajouter un livre", () =>
            navigation.navigate("AddBook")
          )}
          {renderButton("Liste des emprunts (admin)", () =>
            navigation.navigate("BorrowList")
          )}
        </>
      )}

      {role === "user" && (
        <>
          {renderButton("Espace Utilisateur", () =>
            navigation.navigate("HomeUser")
          )}
          {renderButton("Mes emprunts", () =>
            navigation.navigate("BorrowList")
          )}
        </>
      )}

      {renderButton("Profil", () => navigation.navigate("Profile"))}
      {renderButton("Déconnexion", handleLogout, true)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#333",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FF0000",
  },
});

export default MenuScreen;
