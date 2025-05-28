import Nurse from '#models/nurse'
import { HttpContext } from '@adonisjs/core/http'

export default class NursesController {
  async index({ response }: HttpContext) {
    const nurses = await Nurse.all()
    return response.ok(nurses)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['firstName', 'lastName', 'role', 'phone', 'email'])
    const nurse = await Nurse.create(data)
    return response.created(nurse)
  }

  async show({ params, response }: HttpContext) {
    const nurse = await Nurse.findOrFail(params.id)
    return response.ok(nurse)
  }

  async update({ params, request, response }: HttpContext) {
    const nurse = await Nurse.findOrFail(params.id)
    const data = request.only(['firstName', 'lastName', 'role', 'phone', 'email'])
    nurse.merge(data)
    await nurse.save()
    return response.ok(nurse)
  }

  async destroy({ params, response }: HttpContext) {
    const nurse = await Nurse.findOrFail(params.id)
    await nurse.delete()
    return response.noContent()
  }
}
