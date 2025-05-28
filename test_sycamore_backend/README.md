# API de Gestion Hospitalière

## Description

API RESTful pour la gestion d'un établissement hospitalier, permettant de gérer les médecins, infirmières, chambres et patients.

## Choix Techniques

### Backend

- **Framework**: AdonisJS 6.0
  - Framework Node.js moderne et robuste
  - Architecture MVC
  - Support TypeScript natif
  - ORM intégré (Lucid)
  - Validation des données intégrée
  - Gestion des migrations et seeders

### Base de Données

- **SGBD**: PostgreSQL
  - Base de données relationnelle robuste
  - Support des transactions ACID
  - Excellente performance pour les requêtes complexes
  - Support des relations et contraintes d'intégrité

### Langage

- **TypeScript**
  - Typage statique
  - Meilleure maintenabilité
  - Détection d'erreurs à la compilation
  - Support des fonctionnalités modernes d'ECMAScript

## Points Forts de l'Implémentation

### Architecture

- Architecture RESTful complète
- Routes API-only optimisées
- Controllers modulaires et réutilisables
- Modèles avec relations bien définies

### Fonctionnalités

- CRUD complet pour toutes les entités
- Gestion des relations entre entités
- Validation des données
- Gestion des erreurs standardisée
- Seeders pour les données de test

### Sécurité

- Validation des entrées
- Protection contre les injections SQL (via l'ORM)
- Gestion des erreurs sécurisée

### Performance

- Requêtes optimisées via l'ORM
- Chargement des relations à la demande
- Réponses JSON optimisées

## Limitations et Améliorations Futures

### Limitations Actuelles

- Pas d'authentification et d'autorisation
- Pas de pagination pour les listes
- Pas de filtrage avancé des requêtes
- Pas de documentation API (Swagger/OpenAPI)
- Pas de tests automatisés

### Améliorations Proposées

#### Court Terme

1. Ajout de l'authentification JWT
2. Implémentation de la pagination
3. Ajout de filtres de recherche
4. Documentation API avec Swagger
5. Tests unitaires et d'intégration

#### Moyen Terme

1. Mise en place d'un système de cache
2. Ajout de websockets pour les mises à jour en temps réel
3. Implémentation d'un système de logs
4. Ajout de métriques de performance
5. Mise en place d'un système de backup automatique

#### Long Terme

1. Microservices pour une meilleure scalabilité
2. Interface d'administration
3. Système de notifications
4. Intégration avec d'autres systèmes hospitaliers
5. Support multilingue

## Installation et Démarrage

### Prérequis

- Node.js 18+
- PostgreSQL 12+
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone [URL_DU_REPO]

# Installer les dépendances
npm install

# Configurer la base de données
cp .env.example .env
# Éditer .env avec vos paramètres de base de données

# Exécuter les migrations
node ace migration:run

# Remplir la base avec les données de test
node ace db:seed

# Démarrer le serveur
node ace serve --watch
```

## API Endpoints

### Médecins

- `GET /doctors` - Liste des médecins
- `POST /doctors` - Créer un médecin
- `GET /doctors/:id` - Détails d'un médecin
- `PUT /doctors/:id` - Modifier un médecin
- `DELETE /doctors/:id` - Supprimer un médecin

### Infirmières

- `GET /nurses` - Liste des infirmières
- `POST /nurses` - Créer une infirmière
- `GET /nurses/:id` - Détails d'une infirmière
- `PUT /nurses/:id` - Modifier une infirmière
- `DELETE /nurses/:id` - Supprimer une infirmière

### Chambres

- `GET /rooms` - Liste des chambres
- `POST /rooms` - Créer une chambre
- `GET /rooms/:id` - Détails d'une chambre
- `PUT /rooms/:id` - Modifier une chambre
- `DELETE /rooms/:id` - Supprimer une chambre

### Patients

- `GET /patients` - Liste des patients
- `POST /patients` - Créer un patient
- `GET /patients/:id` - Détails d'un patient
- `PUT /patients/:id` - Modifier un patient
- `DELETE /patients/:id` - Supprimer un patient
