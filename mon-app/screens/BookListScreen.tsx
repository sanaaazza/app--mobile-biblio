import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { Book } from "../types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/types";
import { API_BASE_URL } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type BookListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "BookList"
>;

type BookListProps = {
  navigation: BookListScreenNavigationProp;
};

const BookListScreen: React.FC<BookListProps> = ({ navigation }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [borrowedBooks, setBorrowedBooks] = useState<{ [key: string]: string }>(
    {}
  );
  const [role, setRole] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const user = await AsyncStorage.getItem("user");
      setRole(JSON.parse(user || "{}").role);

      if (!token) {
        setError("Token non trouvé, veuillez vous reconnecter");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/books`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBooks(response.data);
    } catch {
      setError("Erreur lors du chargement des livres");
    } finally {
      setLoading(false);
    }
  };

  const fetchBorrows = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) return;

      const response = await axios.get(`${API_BASE_URL}/borrows`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;
      const valid: { [key: string]: string } = {};

      // Supposer que data est un tableau d'emprunts
      data.forEach((borrow: any) => {
        valid[borrow.bookId] = borrow.id; // Stocker l'ID de l'emprunt
      });

      setBorrowedBooks(valid);
    } catch (error) {
      console.error("Erreur lors de la récupération des emprunts:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchBooks();
      await fetchBorrows();
      setLoading(false);
    };
    loadData();
  }, []);

  const handleBorrow = async (bookId: string) => {
    const user = await AsyncStorage.getItem("user");
    const userId = JSON.parse(user || "{}").id;

    const token = await AsyncStorage.getItem("authToken");
    if (!token) return;

    try {
      const today = new Date();
      const returnDate = new Date(
        today.getTime() + 7 * 24 * 60 * 60 * 1000
      ).toISOString();

      await axios.post(
        `${API_BASE_URL}/borrows`,
        { userId, bookId, borrowDate: today.toISOString(), returnDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await fetchBorrows();
    } catch (err) {
      console.error("Erreur emprunt :", err);
    }
  };

  const handleCancelBorrow = async (bookId: string) => {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) return;

    const borrowId = borrowedBooks[bookId];

    if (!borrowId) {
      Alert.alert("Erreur", "Emprunt non trouvé");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/borrows/${borrowId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchBorrows();
      Alert.alert("Succès", "Emprunt annulé avec succès");
    } catch (err) {
      console.error("Erreur annulation emprunt :", err);
      Alert.alert("Erreur", "Impossible d'annuler l'emprunt");
    }
  };

  const handleDelete = async (bookId: string) => {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) return;

    try {
      await axios.delete(`${API_BASE_URL}/books/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchBooks();
      Alert.alert("Succès", "Livre supprimé avec succès");
    } catch (err) {
      Alert.alert("Erreur", "Erreur lors de la suppression du livre");
    }
  };

  const handleEdit = (bookId: string) => {
    navigation.navigate("EditBook", { bookId });
  };

  const isDisabled = (bookId: string) => {
    return !!borrowedBooks[bookId];
  };

  const renderBook = ({ item }: { item: Book }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>Auteur : {item.author}</Text>
      <Text style={styles.subtitle}>Année : {item.year}</Text>

      {role === "user" && (
        <>
          {!isDisabled(item.id) ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleBorrow(item.id)}
            >
              <Text style={styles.buttonText}>Emprunter</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#999" }]}
              onPress={() => handleCancelBorrow(item.id)}
            >
              <Text style={styles.buttonText}>Annuler l'emprunt</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {role === "admin" && (
        <>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.buttonText}>Supprimer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "orange" }]}
            onPress={() => handleEdit(item.id)}
          >
            <Text style={styles.buttonText}>Modifier</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3478f6" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id}
      renderItem={renderBook}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 2 },
  button: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#3478f6",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", fontSize: 18 },
});

export default BookListScreen;
