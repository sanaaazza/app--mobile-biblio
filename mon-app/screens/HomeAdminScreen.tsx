// screens/HomeAdminScreen.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/types";

type HomeAdminProp = StackNavigationProp<RootStackParamList, "HomeAdmin">;

const HomeAdminScreen = () => {
  const navigation = useNavigation<HomeAdminProp>();

  const navigateToMenu = () => {
    navigation.navigate("Menu");
  };

  return (
    <View style={styles.container}>
      <Animatable.Text
        animation="fadeInDown"
        duration={1000}
        style={styles.title}
      >
        Bienvenue Admin 👑
      </Animatable.Text>

      <Animatable.View animation="fadeInUp" delay={500} style={styles.card}>
        <Text style={styles.text}>
          Vous avez accès à la gestion des livres 📚
        </Text>
        <Text style={styles.text}>Et aux emprunts des utilisateurs 👥</Text>
      </Animatable.View>

      {/* Bouton pour naviguer vers le menu */}
      <TouchableOpacity style={styles.button} onPress={navigateToMenu}>
        <Text style={styles.buttonText}>Aller au Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeAdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#3478f6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
