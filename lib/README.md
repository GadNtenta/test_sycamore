# Application Mobile Sycamore

Application mobile de gestion hospitalière développée avec Flutter.

## Fonctionnalités

- 📱 Interface utilisateur moderne et responsive
- 👨‍⚕️ Gestion des médecins
- 👩‍⚕️ Gestion des infirmières
- 🏥 Gestion des chambres
- 👥 Gestion des patients
- 🔄 Synchronisation en temps réel avec le backend
- 🌙 Mode sombre/clair

## Prérequis

- Flutter SDK (dernière version stable)
- Android Studio / Xcode
- Un émulateur ou un appareil physique

## Installation

1. Cloner le projet :

```bash
git clone https://github.com/GadNtenta/test_sycamore.git
cd test_sycamore
```

2. Installer les dépendances :

```bash
flutter pub get
```

3. Configurer l'environnement :

- Pour Android : L'URL de l'API est automatiquement configurée pour utiliser `10.0.2.2:3333`
- Pour iOS : Modifier l'URL de l'API dans `lib/services/api_service.dart` pour utiliser `localhost:3333`

4. Lancer l'application :

```bash
flutter run
```

## Structure du Code

```
lib/
├── main.dart              # Point d'entrée de l'application
├── services/             # Services (API, stockage, etc.)
├── models/              # Modèles de données
├── screens/            # Écrans de l'application
├── widgets/           # Widgets réutilisables
└── utils/            # Utilitaires et helpers
```

## Développement

### Commandes Utiles

- `flutter pub get` : Mettre à jour les dépendances
- `flutter run` : Lancer l'application
- `flutter test` : Exécuter les tests
- `flutter build apk` : Générer l'APK Android
- `flutter build ios` : Générer l'application iOS

### Bonnes Pratiques

1. Suivre les conventions de nommage Flutter
2. Utiliser des widgets const quand possible
3. Implémenter la gestion d'état avec Provider
4. Gérer les erreurs et les états de chargement
5. Tester les widgets et les services

## Déploiement

### Android

1. Générer la clé de signature :

```bash
keytool -genkey -v -keystore android/app/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

2. Configurer le fichier `android/key.properties`

3. Générer l'APK :

```bash
flutter build apk --release
```

### iOS

1. Ouvrir le projet dans Xcode :

```bash
open ios/Runner.xcworkspace
```

2. Configurer les certificats et profils de provisionnement

3. Générer l'application :

```bash
flutter build ios --release
```

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT.
