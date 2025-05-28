/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

/**
 * Routes de l'API pour la gestion hospitalière
 * Toutes les routes sont en mode API-only (pas de vues)
 */

// Routes pour les médecins (CRUD complet)
router.group(() => {
  router.resource('doctors', () => import('#controllers/doctors_controller')).apiOnly()
  router.resource('nurses', () => import('#controllers/nurses_controller')).apiOnly()
  router.resource('rooms', () => import('#controllers/rooms_controller')).apiOnly()
  router.resource('patients', () => import('#controllers/patients_controller')).apiOnly()
})

// Route de test par défaut
router.get('/', async () => {
  return {
    hello: 'world I am Gad',
  }
})
