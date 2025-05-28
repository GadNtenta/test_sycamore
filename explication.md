# Hôpital Sycamore - Guide d'Installation et d'Utilisation

Ce projet est une application de gestion d'hôpital composée de trois parties :

- Une application mobile Flutter
- Une application web Next.js
- Une API backend AdonisJS

## Prérequis

### Outils nécessaires

- Node.js (v18 ou supérieur)
- Flutter (dernière version stable)
- Git
- Un IDE (VS Code recommandé)
- Postman ou un autre client API (pour tester l'API)

### Extensions VS Code recommandées

- Dart
- Flutter
- ESLint
- Prettier
- Tailwind CSS IntelliSense

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/GadNtenta/test_sycamore.git
cd test_sycamore
```

### 2. Installation du Backend (AdonisJS)

```bash
cd test_sycamore_backend
npm install
```

### 3. Installation de l'Application Web (Next.js)

```bash
cd test_sycamore_web
npm install
```

### 4. Installation de l'Application Mobile (Flutter)

```bash
flutter pub get
```

## Configuration

### Backend (AdonisJS)

1. Créer un fichier `.env` dans le dossier `test_sycamore_backend` :

```env
# TZ=UTC
# PORT=3333
# HOST=localhost
# LOG_LEVEL=info
# APP_KEY=BjZS5ApizWTcT86X6i4g8rVKdPattQ3r
# NODE_ENV=development
# DB_HOST=127.0.0.1
# DB_PORT=5432
# DB_USER=postgres
# DB_PASSWORD=admin
# DB_DATABASE=hopital_db
```

2. Initialiser la base de données :

```bash
cd test_sycamore_backend
node ace migration:run
node ace db:seed
```

### Application Web (Next.js)

1. Créer un fichier `.env.local` dans le dossier `test_sycamore_web` :

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

### Application Mobile (Flutter)

Aucune configuration supplémentaire n'est nécessaire pour le développement local.

## Démarrage

### 1. Démarrer le Backend

```bash
cd test_sycamore_backend
npm run dev
```

Le serveur sera accessible sur `http://localhost:3333`

### 2. Démarrer l'Application Web

```bash
cd test_sycamore_web
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### 3. Démarrer l'Application Mobile

```bash
flutter run
```

Choisissez votre appareil ou émulateur préféré.

## Structure du Projet

```
test_sycamore/
├── lib/                    # Code source Flutter
│   ├── models/            # Modèles de données
│   ├── screens/           # Écrans de l'application
│   ├── services/          # Services (API, etc.)
│   └── widgets/           # Widgets réutilisables
├── test_sycamore_backend/ # API AdonisJS
│   ├── app/
│   │   ├── controllers/   # Contrôleurs API
│   │   └── models/        # Modèles de données
│   └── start/             # Configuration et routes
└── test_sycamore_web/     # Application Next.js
    ├── src/
    │   ├── app/          # Pages et composants
    │   ├── components/   # Composants réutilisables
    │   └── services/     # Services API
    └── public/           # Fichiers statiques
```

## Fonctionnalités

### Application Mobile

- Gestion des médecins
- Gestion des infirmières
- Gestion des chambres
- Gestion des patients
- Interface utilisateur intuitive
- Synchronisation en temps réel

### Application Web

- Interface d'administration
- Tableaux de bord
- Gestion des utilisateurs
- Rapports et statistiques

### API Backend

- RESTful API
- Authentification
- Validation des données
- Base de données SQLite

## Développement

### Bonnes Pratiques

1. Suivre les conventions de nommage
2. Documenter le code
3. Écrire des tests unitaires
4. Utiliser les linters et formatters
5. Faire des commits atomiques

### Workflow Git

1. Créer une branche pour chaque fonctionnalité
2. Faire des commits réguliers
3. Créer une pull request pour la revue
4. Fusionner après approbation

## Dépannage

### Problèmes Courants

1. **Erreur de connexion à l'API**

   - Vérifier que le backend est en cours d'exécution
   - Vérifier les variables d'environnement
   - Vérifier les CORS

2. **Erreurs de build Flutter**

   - Exécuter `flutter clean`
   - Exécuter `flutter pub get`
   - Vérifier les dépendances

3. **Erreurs Next.js**
   - Supprimer le dossier `.next`
   - Exécuter `npm run build`
   - Vérifier les dépendances

## Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

