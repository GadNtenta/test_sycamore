# Test Sycamore

Application de gestion hospitalière développée avec Flutter et AdonisJS.

## Structure du Projet

Le projet est composé de trois parties principales :

1. **Application Flutter** (`/lib`) : Interface utilisateur mobile
2. **Backend AdonisJS** (`/test_sycamore_backend`) : API REST
3. **Interface Web** (`/test_sycamore_web`) : Interface web Next.js

## Prérequis

- Flutter SDK
- Node.js (v18+)
- PostgreSQL
- Git

## Installation

### Application Flutter

1. Installer les dépendances :

```bash
flutter pub get
```

2. Lancer l'application :

```bash
flutter run
```

### Backend AdonisJS

1. Se placer dans le dossier du backend :

```bash
cd test_sycamore_backend
```

2. Installer les dépendances :

```bash
npm install
```

3. Configurer l'environnement :

```bash
cp .env.example .env
```

Modifier les variables dans le fichier `.env` selon votre configuration.

4. Exécuter les migrations :

```bash
node ace migration:run
```

5. Lancer le serveur :

```bash
node ace serve --watch
```

### Interface Web

1. Se placer dans le dossier web :

```bash
cd test_sycamore_web
```

2. Installer les dépendances :

```bash
npm install
```

3. Lancer le serveur de développement :

```bash
npm run dev
```

## Configuration

### Variables d'Environnement Backend

Créez un fichier `.env` dans le dossier `test_sycamore_backend` avec les variables suivantes :

```env
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=your-app-key-here
DRIVE_DISK=local

DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-password-here
DB_DATABASE=test_sycamore

SESSION_DRIVER=cookie
CORS_ORIGIN=http://localhost:3000
```

## Fonctionnalités

- Gestion des médecins
- Gestion des infirmières
- Gestion des chambres
- Gestion des patients
- Interface responsive
- API REST complète

## Développement

### Structure des Dossiers

```
├── lib/                    # Code source Flutter
├── test_sycamore_backend/  # API AdonisJS
├── test_sycamore_web/      # Interface web Next.js
└── test/                   # Tests Flutter
```

### Commandes Utiles

- `flutter pub get` : Mettre à jour les dépendances Flutter
- `flutter run` : Lancer l'application
- `node ace serve --watch` : Lancer le serveur backend
- `npm run dev` : Lancer l'interface web

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT.
