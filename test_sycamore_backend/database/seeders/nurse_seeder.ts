import Nurse from '#models/nurse'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await Nurse.createMany([
      {
        firstName: 'Sophie',
        lastName: 'Dubois',
        role: 'Infirmière en chef',
        phone: '0601020305',
        email: 'sophie.dubois@hopital.fr',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
      {
        firstName: 'Thomas',
        lastName: 'Bernard',
        role: 'Infirmier de nuit',
        phone: '0605060709',
        email: 'thomas.bernard@hopital.fr',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
      {
        firstName: 'Julie',
        lastName: 'Moreau',
        role: 'Infirmière de jour',
        phone: '0609080707',
        email: 'julie.moreau@hopital.fr',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      },
    ])
  }
}
