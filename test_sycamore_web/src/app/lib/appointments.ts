import { apiClient } from "./api";
import type {
  ApiResponse,
  Appointment,
  PaginatedResponse,
  PaginationParams,
} from "./types";

class AppointmentService {
  private static instance: AppointmentService;

  private constructor() {}

  public static getInstance(): AppointmentService {
    if (!AppointmentService.instance) {
      AppointmentService.instance = new AppointmentService();
    }
    return AppointmentService.instance;
  }

  public async getAppointments(
    params?: PaginationParams
  ): Promise<PaginatedResponse<Appointment>> {
    return await apiClient.get<PaginatedResponse<Appointment>>(
      "/appointments",
      params
    );
  }

  public async getAppointment(id: string): Promise<ApiResponse<Appointment>> {
    return await apiClient.get<ApiResponse<Appointment>>(`/appointments/${id}`);
  }

  public async createAppointment(
    data: Omit<Appointment, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<Appointment>> {
    return await apiClient.post<ApiResponse<Appointment>>(
      "/appointments",
      data
    );
  }

  public async updateAppointment(
    id: string,
    data: Partial<Appointment>
  ): Promise<ApiResponse<Appointment>> {
    return await apiClient.put<ApiResponse<Appointment>>(
      `/appointments/${id}`,
      data
    );
  }

  public async deleteAppointment(id: string): Promise<ApiResponse<void>> {
    return await apiClient.delete<ApiResponse<void>>(`/appointments/${id}`);
  }

  public async getDoctorAppointments(
    doctorId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Appointment>> {
    return await apiClient.get<PaginatedResponse<Appointment>>(
      `/doctors/${doctorId}/appointments`,
      params
    );
  }

  public async getPatientAppointments(
    patientId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Appointment>> {
    return await apiClient.get<PaginatedResponse<Appointment>>(
      `/patients/${patientId}/appointments`,
      params
    );
  }

  public async updateAppointmentStatus(
    id: string,
    status: Appointment["status"]
  ): Promise<ApiResponse<Appointment>> {
    return await apiClient.put<ApiResponse<Appointment>>(
      `/appointments/${id}/status`,
      { status }
    );
  }
}

export const appointmentService = AppointmentService.getInstance();
