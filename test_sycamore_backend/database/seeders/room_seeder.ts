import Room from '#models/room'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await Room.createMany([
      {
        number: '101',
        capacity: 2,
        status: 'free',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
      {
        number: '102',
        capacity: 1,
        status: 'free',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
      {
        number: '201',
        capacity: 2,
        status: 'free',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
      {
        number: '202',
        capacity: 1,
        status: 'free',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
    ])
  }
}
