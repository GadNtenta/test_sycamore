import Room from '#models/room'
import { HttpContext } from '@adonisjs/core/http'

export default class RoomsController {
  /**
   * Liste toutes les chambres
   */
  async index({ response }: HttpContext) {
    const rooms = await Room.all()
    return response.ok(rooms)
  }

  /**
   * Crée une nouvelle chambre avec le statut 'libre' par défaut
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['number', 'capacity'])
    const room = await Room.create({ ...data, status: 'free' })
    return response.created(room)
  }

  /**
   * Affiche les détails d'une chambre spécifique avec ses patients
   */
  async show({ params, response }: HttpContext) {
    const room = await Room.findOrFail(params.id)
    await room.load('patients')
    return response.ok(room)
  }

  /**
   * Met à jour les informations d'une chambre
   */
  async update({ params, request, response }: HttpContext) {
    const room = await Room.findOrFail(params.id)
    const data = request.only(['number', 'capacity'])
    room.merge(data)
    await room.save()
    return response.ok(room)
  }

  /**
   * Supprime une chambre si elle n'a pas de patients assignés
   */
  async destroy({ params, response }: HttpContext) {
    const room = await Room.findOrFail(params.id)
    await room.load('patients')

    if (room.patients.length > 0) {
      return response.badRequest({ message: 'Cannot delete room with assigned patients' })
    }

    await room.delete()
    return response.noContent()
  }
}
