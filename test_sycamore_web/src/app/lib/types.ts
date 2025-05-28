// Types de base pour les réponses API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Types pour les erreurs API
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Types pour la pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Types pour l'authentification
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

// Types pour les médecins
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

// Types pour les rendez-vous
export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
