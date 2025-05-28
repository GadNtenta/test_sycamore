import Patient from '#models/patient'
import Room from '#models/room'
import { HttpContext } from '@adonisjs/core/http'

export default class PatientsController {
  /**
   * Liste tous les patients avec leurs chambres assignées
   */
  async index({ response }: HttpContext) {
    const patients = await Patient.query().preload('room')
    return response.ok(patients)
  }

  /**
   * Crée un nouveau patient et met à jour le statut de la chambre si assignée
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['firstName', 'lastName', 'age', 'healthStatus', 'roomId'])

    if (data.roomId) {
      const room = await Room.findOrFail(data.roomId)
      if (room.status === 'occupied') {
        return response.badRequest({ message: 'Room is already occupied' })
      }
      room.status = 'occupied'
      await room.save()
    }

    const patient = await Patient.create(data)
    await patient.load('room')
    return response.created(patient)
  }

  /**
   * Affiche les détails d'un patient spécifique avec sa chambre
   */
  async show({ params, response }: HttpContext) {
    const patient = await Patient.findOrFail(params.id)
    await patient.load('room')
    return response.ok(patient)
  }

  /**
   * Met à jour les informations d'un patient et gère le changement de chambre
   */
  async update({ params, request, response }: HttpContext) {
    const patient = await Patient.findOrFail(params.id)
    const data = request.only(['firstName', 'lastName', 'age', 'healthStatus', 'roomId'])

    // Gestion du changement de chambre
    if (data.roomId !== patient.roomId) {
      // Libère l'ancienne chambre si elle existe
      if (patient.roomId) {
        const oldRoom = await Room.findOrFail(patient.roomId)
        oldRoom.status = 'free'
        await oldRoom.save()
      }

      // Assignation de la nouvelle chambre si fournie
      if (data.roomId) {
        const newRoom = await Room.findOrFail(data.roomId)
        if (newRoom.status === 'occupied') {
          return response.badRequest({ message: 'Room is already occupied' })
        }
        newRoom.status = 'occupied'
        await newRoom.save()
      }
    }

    patient.merge(data)
    await patient.save()
    await patient.load('room')
    return response.ok(patient)
  }

  /**
   * Supprime un patient et libère sa chambre si assignée
   */
  async destroy({ params, response }: HttpContext) {
    const patient = await Patient.findOrFail(params.id)

    // Libère la chambre si le patient en avait une
    if (patient.roomId) {
      const room = await Room.findOrFail(patient.roomId)
      room.status = 'free'
      await room.save()
    }

    await patient.delete()
    return response.noContent()
  }
}
