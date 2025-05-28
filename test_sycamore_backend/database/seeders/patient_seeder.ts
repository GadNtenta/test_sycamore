import Patient from '#models/patient'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await Patient.createMany([
      {
        firstName: 'Paul',
        lastName: 'Durand',
        age: 45,
        healthStatus: 'Stable',
        roomId: 1,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
      {
        firstName: 'Emma',
        lastName: 'Leroy',
        age: 32,
        healthStatus: 'En observation',
        roomId: 2,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
      {
        firstName: 'Lucas',
        lastName: 'Morel',
        age: 28,
        healthStatus: 'En convalescence',
        roomId: 3,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
    ])
  }
}
