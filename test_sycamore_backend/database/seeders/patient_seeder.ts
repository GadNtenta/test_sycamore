import Patient from '#models/patient'
import Room from '#models/room'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    const rooms = await Room.all()
    if (rooms.length < 3) {
      throw new Error('Pas assez de chambres pour assigner les patients')
    }
    await Patient.createMany([
      {
        firstName: 'Paul',
        lastName: 'Durand',
        age: 45,
        healthStatus: 'Stable',
        roomId: rooms[0].id,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
      {
        firstName: 'Emma',
        lastName: 'Leroy',
        age: 32,
        healthStatus: 'En observation',
        roomId: rooms[1].id,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
      {
        firstName: 'Lucas',
        lastName: 'Morel',
        age: 28,
        healthStatus: 'En convalescence',
        roomId: rooms[2].id,
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
    ])
  }
}
