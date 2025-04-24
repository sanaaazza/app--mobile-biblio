import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { API_BASE_URL } from "../api/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Définir le type de navigation pour l'écran 'Login'
type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Tous les champs sont obligatoires!");
      return;
    }

    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("user");

      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        const user = response.data.user;
        const data = response.data;

        console.log("data:", data);

        await AsyncStorage.setItem("authToken", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));

        Alert.alert("Connexion réussie !");
        if (user.role === "user") {
          navigation.navigate("HomeUser");
        } else if (user.role === "admin") {
          navigation.navigate("HomeAdmin");
        }
      }
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        Alert.alert(error.response.data.message || "Erreur inconnue");
      } else {
        Alert.alert("Erreur de connexion au serveur");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Se connecter</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Se connecter" onPress={handleLogin} />
      <Text
        style={styles.signupLink}
        onPress={() => navigation.navigate("Signup")}
      >
        Pas de compte ? Créez-en un ici
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  signupLink: {
    marginTop: 16,
    textAlign: "center",
    color: "#007BFF",
  },
});

export default LoginScreen;
