// screens/HomeUserScreen.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/types";

type HomeUserProp = StackNavigationProp<RootStackParamList, "HomeUser">;

const HomeUserScreen = () => {
  const navigation = useNavigation<HomeUserProp>();

  const navigateToMenu = () => {
    navigation.navigate("Menu");
  };

  return (
    <View style={styles.container}>
      <Animatable.Text
        animation="bounceInDown"
        duration={1000}
        style={styles.title}
      >
        Bienvenue 👋
      </Animatable.Text>

      <Animatable.View animation="fadeIn" delay={600} style={styles.card}>
        <Text style={styles.text}>Consultez les livres disponibles 📖</Text>
        <Text style={styles.text}>Suivez vos emprunts en un clic 🕓</Text>
      </Animatable.View>

      <TouchableOpacity style={styles.button} onPress={navigateToMenu}>
        <Text style={styles.buttonText}>Aller au Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#e3f2fd",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1a237e",
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
    color: "#333",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007BFF",
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
