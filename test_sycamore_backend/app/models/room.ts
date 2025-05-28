import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Patient from './patient.js'

/**
 * Modèle représentant une chambre d'hôpital
 * Gère les informations de la chambre et sa relation avec les patients
 */
export default class Room extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare number: string

  @column()
  declare capacity: number

  @column()
  declare status: 'free' | 'occupied'

  @hasMany(() => Patient)
  declare patients: HasMany<typeof Patient>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
