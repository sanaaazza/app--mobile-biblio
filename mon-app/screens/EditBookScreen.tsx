import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { API_BASE_URL } from '../api/api'; // Assurez-vous d'avoir la constante de base URL de votre API
import { RootStackParamList } from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type EditBookScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditBook'>;

type EditBookScreenProps = {
  navigation: EditBookScreenNavigationProp;
  route: { params: { bookId: string } }; // Paramètre pour récupérer l'ID du livre
};

const EditBookScreen: React.FC<EditBookScreenProps> = ({ navigation, route }) => {
  const { bookId } = route.params; // Récupération de l'ID du livre
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [year, setYear] = useState<string>('');

  // Fonction pour récupérer les détails du livre à partir de l'ID
  const getBookDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/books/${bookId}`);
      const { title, author, year } = response.data;

      setTitle(title);
      setAuthor(author);
      setYear(year);
    } catch (error: any) {
      Alert.alert('Erreur', 'Erreur lors de la récupération des informations du livre');
      console.error('Erreur lors de la récupération des informations du livre:', error);
    }
  };

  // Effet pour récupérer les détails du livre dès que l'écran est monté
  useEffect(() => {
    getBookDetails();
  }, []);

  // Fonction pour modifier le livre
  const handleEditBook = async () => {
    if (!title || !author || !year) {
      Alert.alert('Erreur', 'Tous les champs doivent être remplis');
      return;
    }

    try {
      const response = await axios.put(`${API_BASE_URL}/books/${bookId}`, {
        title,
        author,
        year
      },{
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('authToken')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });

      Alert.alert('Succès', 'Livre modifié avec succès');
      
      // Naviguer vers l'écran des livres après la modification
      navigation.replace('BookList'); // Tu peux naviguer vers n'importe quel écran que tu veux après la modification du livre
    } catch (error: any) {
      Alert.alert('Erreur', 'Erreur lors de la modification du livre');
      console.error('Erreur lors de la modification du livre:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier un livre</Text>

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

      <Button title="Modifier le livre" onPress={handleEditBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    marginTop: 12,
    fontSize: 16,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
});

export default EditBookScreen;
