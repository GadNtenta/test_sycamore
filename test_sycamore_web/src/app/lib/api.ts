import axios, { AxiosError, AxiosInstance } from "axios";

class ApiClient {
  private static instance: ApiClient;
  private api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private setupInterceptors() {
    // Intercepteur pour les requêtes
    this.api.interceptors.request.use(
      (config) => {
        // Récupération du token depuis le localStorage côté client
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Intercepteur pour les réponses
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Gestion de l'expiration du token
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, params?: any) {
    try {
      const response = await this.api.get<T>(url, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async post<T>(url: string, data?: any) {
    try {
      const response = await this.api.post<T>(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async put<T>(url: string, data?: any) {
    try {
      const response = await this.api.put<T>(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async delete<T>(url: string) {
    try {
      const response = await this.api.delete<T>(url);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw {
        message:
          axiosError.response?.data?.message || "Une erreur est survenue",
        status: axiosError.response?.status,
        data: axiosError.response?.data,
      };
    }
    throw error;
  }
}

export const apiClient = ApiClient.getInstance();
