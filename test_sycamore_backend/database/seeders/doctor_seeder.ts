import Doctor from '#models/doctor'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await Doctor.createMany([
      {
        firstName: 'Jean',
        lastName: 'Dupont',
        specialty: 'Cardiologie',
        phone: '0601020304',
        email: 'jean.dupont@hopital.fr',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
      {
        firstName: 'Marie',
        lastName: 'Curie',
        specialty: 'Radiologie',
        phone: '0605060708',
        email: 'marie.curie@hopital.fr',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
      {
        firstName: 'Pierre',
        lastName: 'Martin',
        specialty: 'Neurologie',
        phone: '0609080706',
        email: 'pierre.martin@hopital.fr',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
    ])
  }
}
