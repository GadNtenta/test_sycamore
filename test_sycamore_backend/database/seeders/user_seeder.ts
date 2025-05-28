import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        email: 'admin@hopitalkinshasa.cd',
        password: 'admin123',
        fullName: 'Admin Kinshasa',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
      {
        email: 'user@hopitalkinshasa.cd',
        password: 'user123',
        fullName: 'Jean-Pierre Mukeba',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
    ])
  }
}
