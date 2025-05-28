# Interface Web Sycamore

Interface web de gestion hospitalière développée avec Next.js et Tailwind CSS.

## Fonctionnalités

- 🌐 Interface web moderne et responsive
- 👨‍⚕️ Gestion des médecins
- 👩‍⚕️ Gestion des infirmières
- 🏥 Gestion des chambres
- 👥 Gestion des patients
- 🔄 Mise à jour en temps réel
- 🌙 Mode sombre/clair
- 📱 Design adaptatif

## Prérequis

- Node.js (v18+)
- npm ou yarn
- Un navigateur moderne

## Installation

1. Cloner le projet :

```bash
git clone https://github.com/GadNtenta/test_sycamore.git
cd test_sycamore/test_sycamore_web
```

2. Installer les dépendances :

```bash
npm install
# ou
yarn install
```

3. Configurer l'environnement :

- Créer un fichier `.env.local` à la racine du projet
- Ajouter les variables d'environnement nécessaires :

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

4. Lancer le serveur de développement :

```bash
npm run dev
# ou
yarn dev
```

## Structure du Code

```
src/
├── app/                # Pages et routes Next.js
├── components/        # Composants réutilisables
├── lib/              # Utilitaires et configurations
├── services/         # Services (API, etc.)
└── styles/          # Styles globaux
```

## Développement

### Commandes Utiles

- `npm run dev` : Lancer le serveur de développement
- `npm run build` : Générer la version de production
- `npm run start` : Démarrer la version de production
- `npm run lint` : Vérifier le code avec ESLint
- `npm run test` : Exécuter les tests

### Bonnes Pratiques

1. Suivre les conventions de nommage React/Next.js
2. Utiliser les composants fonctionnels
3. Implémenter la gestion d'état avec React Context
4. Gérer les erreurs et les états de chargement
5. Tester les composants et les services

## Déploiement

### Vercel (Recommandé)

1. Installer Vercel CLI :

```bash
npm i -g vercel
```

2. Déployer :

```bash
vercel
```

### Autres Plateformes

1. Générer la version de production :

```bash
npm run build
```

2. Démarrer le serveur :

```bash
npm run start
```

## Technologies Utilisées

- Next.js 14
- React 18
- Tailwind CSS
- TypeScript
- ESLint
- Prettier

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT.
