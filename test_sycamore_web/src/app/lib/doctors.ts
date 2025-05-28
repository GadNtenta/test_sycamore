import { apiClient } from "./api";
import type {
  ApiResponse,
  Doctor,
  PaginatedResponse,
  PaginationParams,
} from "./types";

class DoctorService {
  private static instance: DoctorService;

  private constructor() {}

  public static getInstance(): DoctorService {
    if (!DoctorService.instance) {
      DoctorService.instance = new DoctorService();
    }
    return DoctorService.instance;
  }

  public async getDoctors(
    params?: PaginationParams
  ): Promise<PaginatedResponse<Doctor>> {
    return await apiClient.get<PaginatedResponse<Doctor>>("/doctors", params);
  }

  public async getDoctor(id: string): Promise<ApiResponse<Doctor>> {
    return await apiClient.get<ApiResponse<Doctor>>(`/doctors/${id}`);
  }

  public async createDoctor(
    data: Omit<Doctor, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<Doctor>> {
    return await apiClient.post<ApiResponse<Doctor>>("/doctors", data);
  }

  public async updateDoctor(
    id: string,
    data: Partial<Doctor>
  ): Promise<ApiResponse<Doctor>> {
    return await apiClient.put<ApiResponse<Doctor>>(`/doctors/${id}`, data);
  }

  public async deleteDoctor(id: string): Promise<ApiResponse<void>> {
    return await apiClient.delete<ApiResponse<void>>(`/doctors/${id}`);
  }

  public async searchDoctors(
    query: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Doctor>> {
    return await apiClient.get<PaginatedResponse<Doctor>>("/doctors/search", {
      ...params,
      query,
    });
  }
}

export const doctorService = DoctorService.getInstance();
