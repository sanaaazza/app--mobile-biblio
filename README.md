Cette application mobile permet de gérer les livres d’une bibliothèque et les emprunts effectués par les utilisateurs.
Elle propose deux types de rôles : utilisateur et administrateur. Les utilisateurs peuvent s’inscrire, se connecter, consulter la liste des livres disponibles, 
emprunter ou annuler un emprunt, et suivre l’historique de leurs emprunts. L’administrateur, quant à lui, a la possibilité de gérer le catalogue de livres en ajoutant,
modifiant ou supprimant des ouvrages. L’application repose sur une architecture client-serveur, communique avec un backend via des API REST sécurisées, 
et offre une expérience fluide grâce à React Native et l’utilisation d’animations, d’icônes, ainsi qu’une navigation intuitive.

🚀 Étapes de démarrage de l'application "BookEase"
📦 1. Cloner le projet
bash
Copier
Modifier
git clone <url-du-repo>
cd bookease
📁 2. Installation des dépendances
🔧 Backend (Node.js + Express)
bash
Copier
Modifier
cd backend
npm install
📱 Frontend (React Native avec Expo)
bash
Copier
Modifier
cd ../frontend
npm install
🔑 3. Configuration des fichiers
Créer un fichier .env dans le dossier backend avec :

env
Copier
Modifier
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=bookease
JWT_SECRET=your_secret_key
🛠️ 4. Lancer le backend
bash
Copier
Modifier
cd backend
npx sequelize db:migrate   # si tu utilises Sequelize migrations
npm run dev
📲 5. Lancer le frontend
bash
Copier
Modifier
cd frontend
npx expo start
Ouvre l'app Expo Go sur ton téléphone ou utilise l’émulateur Android pour tester.

🧪 6. Tester l’API
Utilise Postman pour tester les routes (auth, livres, emprunts)

Vérifie les retours JSON et les statuts HTTP

🧹 7. (Facultatif) Réinitialisation de la BDD
bash
Copier
Modifier
npx sequelize db:drop
npx sequelize db:create
npx sequelize db:migrate
Tu veux que je te prépare un script d'installation complet ou un fichier README.md pour que tu n'oublies rien ?







Vous avez dit :
de front end et backend


ChatGPT a dit :
Parfait ! Voici un README complet pour ton projet BookEase, couvrant le frontend (React Native avec Expo) et le backend (Node.js + Express + Sequelize). Tu peux le copier tel quel dans un fichier README.md à la racine de ton projet.

markdown
Copier
Modifier
# 📚 BookEase – Application mobile de gestion de bibliothèque

BookEase est une application mobile permettant de gérer les livres d'une bibliothèque, les opérations d'emprunt et les retours, avec un backend sécurisé en Node.js et une interface mobile développée avec React Native (Expo). Le tout communique via des API REST.

---

## 🔧 Technologies utilisées

### 🖥 Backend
- Node.js
- Express
- Sequelize ORM
- MySQL
- JWT pour l’authentification
- Postman (tests)

### 📱 Frontend
- React Native (Expo)
- TypeScript
- Axios
- AsyncStorage (token)
- React Navigation
- Animatable (animations)

---

## 🚀 Lancement du projet

### ⚙️ 1. Cloner le projet
```bash
git clone <url-du-repo>
cd bookease
📦 2. Backend – Installation et lancement
📁 Aller dans le dossier backend :
bash
Copier
Modifier
cd backend
🔑 Créer un fichier .env :
env
Copier
Modifier
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=bookease
JWT_SECRET=your_jwt_secret
📥 Installer les dépendances :
bash
Copier
Modifier
npm install
🗃 Lancer les migrations :
bash
Copier
Modifier
npx sequelize db:migrate
▶️ Lancer le serveur :
bash
Copier
Modifier
npm run dev
📱 3. Frontend – Installation et lancement
📁 Aller dans le dossier frontend :
bash
Copier
Modifier
cd ../frontend
📥 Installer les dépendances :
bash
Copier
Modifier
npm install
▶️ Lancer le projet Expo :
bash
Copier
Modifier
npx expo start
Tu peux scanner le QR Code avec l'app Expo Go ou utiliser un émulateur Android.

🧪 4. Tests et validation
Utilisation de Postman pour tester les routes (/auth, /books, /loans)

Vérification des statuts HTTP et des retours JSON

Contrôle des erreurs (mots de passe, droits, duplications)

✅ Fonctionnalités principales
Authentification (admin/utilisateur)

Gestion des livres (ajout, modification, suppression)

Emprunts et annulations

Page de profil avec mise à jour d’infos

Sécurité JWT, rôles utilisateur, navigation fluide

🔮 Pistes d'amélioration
Notifications de retard

Recherche avancée

Scan de livres via QR code

Tableau de bord statistique pour l'admin

👨‍💻 Auteur
Projet réalisé dans le cadre du module Web Sémantique.
