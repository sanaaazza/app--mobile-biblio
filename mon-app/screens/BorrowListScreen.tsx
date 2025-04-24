// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
//   Button,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { Borrowing, RootStackParamList } from "../types/types";
// import { API_BASE_URL } from "../api/api";

// type BorrowListScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   "BorrowList"
// >;

// type BorrowProps = {
//   navigation: BorrowListScreenNavigationProp;
// };

// const BorrowListScreen: React.FC<BorrowProps> = ({ navigation }) => {
//   const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fonction pour récupérer les emprunts
//   const fetchBorrows = async () => {
//     try {
//       const token = await AsyncStorage.getItem("authToken");
//       if (!token) {
//         setError("Aucun token trouvé. Veuillez vous reconnecter.");
//         return;
//       }

//       const response = await axios.get(`${API_BASE_URL}/borrows`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const now = new Date();

//       // Filtrer les emprunts dans les 7 derniers jours
//       const validBorrows = response.data.filter((b: Borrowing) => {
//         const borrowDate = new Date(b.borrowDate);
//         const diffInDays =
//           (now.getTime() - borrowDate.getTime()) / (1000 * 60 * 60 * 24);
//         return diffInDays < 7;
//       });

//       setBorrowings(validBorrows);
//     } catch (err) {
//       console.error(err);
//       setError("Erreur lors du chargement des emprunts.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBorrows();
//   }, []);

//   // Fonction pour calculer le nombre de jours restants
//   const getDaysLeft = (borrowDate: string) => {
//     const now = new Date();
//     const start = new Date(borrowDate);
//     const diff =
//       7 - Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
//     return diff;
//   };

//   // Rendu de chaque emprunt
//   const renderBorrow = ({ item }: { item: Borrowing }) => {
//     const daysLeft = getDaysLeft(item.borrowDate);
//     const isNearDeadline = daysLeft <= 2;

//     return (
//       <View style={[styles.card, isNearDeadline && styles.warningCard]}>
//         <Text style={styles.bookTitle}>📖 {item.book.title}</Text>
//         <Text>👤 Emprunté par : {item.user.name}</Text>
//         <Text>
//           📅 Emprunté Le : {new Date(item.borrowDate).toLocaleDateString()}
//         </Text>
//         <Text>
//           📤 Rendu Le : {new Date(item.returnDate).toLocaleDateString()}
//         </Text>
//         <Text style={isNearDeadline ? styles.warningText : styles.normalText}>
//           ⏳ Jours restants : {daysLeft} jour{daysLeft > 1 ? "s" : ""}
//         </Text>
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#007aff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text>{error}</Text>
//         <Button title="Réessayer" onPress={fetchBorrows} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>📚 Emprunts actifs (moins de 7 jours)</Text>
//       {borrowings.length === 0 ? (
//         <View style={styles.centered}>
//           <Text style={styles.noData}>Aucun emprunt récent trouvé.</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={borrowings}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={renderBorrow}
//         />
//       )}
//     </View>
//   );
// };

// export default BorrowListScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fafafa",
//     padding: 20,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: 15,
//     marginVertical: 8,
//     borderRadius: 8,
//     elevation: 2,
//   },
//   warningCard: {
//     borderLeftColor: "#ff3b30",
//     borderLeftWidth: 5,
//     backgroundColor: "#ffecec",
//   },
//   bookTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   warningText: {
//     color: "#d00",
//     fontWeight: "bold",
//   },
//   normalText: {
//     color: "#333",
//   },
//   noData: {
//     fontStyle: "italic",
//     color: "#777",
//   },
// });
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { Borrowing, RootStackParamList } from "../types/types";
import { API_BASE_URL } from "../api/api";

type BorrowListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "BorrowList"
>;

type BorrowProps = {
  navigation: BorrowListScreenNavigationProp;
};

const BorrowListScreen: React.FC<BorrowProps> = ({ navigation }) => {
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string>("user");

  // Fonction pour récupérer les emprunts
  const fetchBorrows = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        setError("Aucun token trouvé. Veuillez vous reconnecter.");
        return;
      }

      const savedUser = await AsyncStorage.getItem("user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        const isAdmin = parsedUser.role.toLowerCase() === "admin"; // Gestion de la casse
        setRole(isAdmin ? "admin" : "user");
      }

      const response = await axios.get(`${API_BASE_URL}/borrows`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Données reçues:", response.data); // Debug des données

      const now = new Date();
      const validBorrows = response.data.filter((b: Borrowing) => {
        const borrowDate = new Date(b.borrowDate);
        const diffInDays =
          (now.getTime() - borrowDate.getTime()) / (1000 * 3600 * 24);
        return diffInDays < 7;
      });

      setBorrowings(validBorrows);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des emprunts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrows();
  }, []);

  // Fonction pour calculer le nombre de jours restants
  const getDaysLeft = (borrowDate: string) => {
    const now = new Date();
    const start = new Date(borrowDate);
    const diff =
      7 - Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  // Rendu de chaque emprunt
  const renderBorrow = ({ item }: { item: Borrowing }) => {
    const daysLeft = getDaysLeft(item.borrowDate);
    const isNearDeadline = daysLeft <= 2;

    return (
      <View style={[styles.card, isNearDeadline && styles.warningCard]}>
        <Text style={styles.bookTitle}>
          📖 {item.book?.title || "Titre inconnu"}
        </Text>
        <Text>
          👤 Emprunté par : {item.user?.name || "Utilisateur inconnu"}
        </Text>
        <Text>
          📅 Emprunté Le : {new Date(item.borrowDate).toLocaleDateString()}
        </Text>
        <Text>
          📤 Rendu Le :{" "}
          {item.returnDate
            ? new Date(item.returnDate).toLocaleDateString()
            : "Non rendu"}
        </Text>
        <Text style={isNearDeadline ? styles.warningText : styles.normalText}>
          ⏳ Jours restants : {daysLeft} jour{daysLeft > 1 ? "s" : ""}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007aff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <Button title="Réessayer" onPress={fetchBorrows} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {role === "admin"
          ? "📚 Tous les emprunts actifs (moins de 7 jours)"
          : "📚 Mes emprunts actifs (moins de 7 jours)"}
      </Text>
      {borrowings.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.noData}>Aucun emprunt récent trouvé.</Text>
        </View>
      ) : (
        <FlatList
          data={borrowings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBorrow}
        />
      )}
    </View>
  );
};

export default BorrowListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  warningCard: {
    borderLeftColor: "#ff3b30",
    borderLeftWidth: 5,
    backgroundColor: "#ffecec",
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  warningText: {
    color: "#d00",
    fontWeight: "bold",
  },
  normalText: {
    color: "#333",
  },
  noData: {
    fontStyle: "italic",
    color: "#777",
  },
});
