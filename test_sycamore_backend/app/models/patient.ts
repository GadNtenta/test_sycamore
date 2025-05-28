import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Room from './room.js'

/**
 * Modèle représentant un patient dans l'hôpital
 * Gère les informations du patient et sa relation avec la chambre assignée
 */
export default class Patient extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare age: number

  @column()
  declare healthStatus: string

  @column()
  declare roomId: number | null

  @belongsTo(() => Room)
  declare room: BelongsTo<typeof Room>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
