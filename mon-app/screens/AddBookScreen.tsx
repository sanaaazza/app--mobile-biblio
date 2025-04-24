import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { API_BASE_URL } from "../api/api"; // Assurez-vous d'avoir la constante de base URL de votre API
import { RootStackParamList } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AddBookScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddBook"
>;

type AddBookScreenProps = {
  navigation: AddBookScreenNavigationProp;
};

const AddBookScreen: React.FC<AddBookScreenProps> = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const handleAddBook = async () => {
    if (!title || !author || !year) {
      Alert.alert("Erreur", "Tous les champs doivent être remplis");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/books`,
        {
          title,
          author,
          year,
        },
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("authToken")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      Alert.alert("Succès", "Livre ajouté avec succès");

      navigation.replace("BookList");
    } catch (error: any) {
      Alert.alert("Erreur", "Erreur lors de l'ajout du livre");
      console.error("Erreur lors de l'ajout du livre:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un livre</Text>

      <Text style={styles.label}>Titre</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Entrez le titre du livre"
      />

      <Text style={styles.label}>Auteur</Text>
      <TextInput
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
        placeholder="Entrez l'auteur du livre"
      />

      <Text style={styles.label}>Année de publication</Text>
      <TextInput
        style={styles.input}
        value={year}
        onChangeText={setYear}
        placeholder="Entrez l'année de publication"
        keyboardType="numeric"
      />

      <Button title="Ajouter le livre" onPress={handleAddBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    marginTop: 12,
    fontSize: 16,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
});

export default AddBookScreen;
