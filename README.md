Cette application mobile permet de gérer les livres d’une bibliothèque et les emprunts effectués par les utilisateurs.
Elle propose deux types de rôles : utilisateur et administrateur. Les utilisateurs peuvent s’inscrire, se connecter, consulter la liste des livres disponibles, 
emprunter ou annuler un emprunt, et suivre l’historique de leurs emprunts. L’administrateur, quant à lui, a la possibilité de gérer le catalogue de livres en ajoutant,
modifiant ou supprimant des ouvrages. L’application repose sur une architecture client-serveur, communique avec un backend via des API REST sécurisées, 
et offre une expérience fluide grâce à React Native et l’utilisation d’animations, d’icônes, ainsi qu’une navigation intuitive.

🗺️ Roadmap du projet "BookEase"
1. Phase de planification
Définir les besoins fonctionnels (emprunts, livres, rôles, sécurité).

Choisir les technologies : React Native (Expo), Node.js, MySQL, Sequelize, JWT.

Structurer la base de données (utilisateurs, livres, emprunts).

2. Phase backend (API REST avec Node.js + Express)
Authentification : inscription, connexion (JWT)

Gestion des utilisateurs (admin / normal)

Routes CRUD pour : Livres, Emprunts

Sécurité (CORS, validation, erreurs, middleware)

3. Phase frontend (React Native avec Expo)
Connexion / Inscription (validation, redirections)

Interface admin : ajout, modification, suppression des livres, liste des emprunts

Interface utilisateur : liste des livres, emprunt, annulation, profil

Intégration API avec Axios, gestion des tokens avec AsyncStorage

4. Tests et validation
Tester les endpoints avec Postman

Test manuel sur Android Emulator et Expo Go

Vérifier les cas d’erreurs (mot de passe, email, conflits)

5. Améliorations futures (optionnel)
Ajouter notifications de retard

Intégrer un scan de QR code pour les livres

Mettre en place une recherche filtrée par auteur, titre, etc.

Ajouter un tableau de bord statistique pour l’admin
