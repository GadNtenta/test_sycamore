import Doctor from '#models/doctor'
import { HttpContext } from '@adonisjs/core/http'

/**
 * Contrôleur gérant les opérations CRUD pour les médecins
 */
export default class DoctorsController {
  /**
   * Liste tous les médecins
   */
  async index({ response }: HttpContext) {
    const doctors = await Doctor.all()
    return response.ok(doctors)
  }

  /**
   * Crée un nouveau médecin
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['firstName', 'lastName', 'specialty', 'phone', 'email'])
    const doctor = await Doctor.create(data)
    return response.created(doctor)
  }

  /**
   * Affiche les détails d'un médecin spécifique
   */
  async show({ params, response }: HttpContext) {
    const doctor = await Doctor.findOrFail(params.id)
    return response.ok(doctor)
  }

  /**
   * Met à jour les informations d'un médecin
   */
  async update({ params, request, response }: HttpContext) {
    const doctor = await Doctor.findOrFail(params.id)
    const data = request.only(['firstName', 'lastName', 'specialty', 'phone', 'email'])
    doctor.merge(data)
    await doctor.save()
    return response.ok(doctor)
  }

  /**
   * Supprime un médecin
   */
  async destroy({ params, response }: HttpContext) {
    const doctor = await Doctor.findOrFail(params.id)
    await doctor.delete()
    return response.noContent()
  }
}
