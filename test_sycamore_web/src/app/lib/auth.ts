import { apiClient } from "./api";
import type {
  ApiResponse,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from "./types";

class AuthService {
  private static instance: AuthService;
  private tokenKey = "token";
  private userKey = "user";

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(
    credentials: LoginCredentials
  ): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      credentials
    );
    this.setAuthData(response.data);
    return response;
  }

  public async register(
    data: RegisterData
  ): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/register",
      data
    );
    this.setAuthData(response.data);
    return response;
  }

  public async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      this.clearAuthData();
    }
  }

  public async getCurrentUser(): Promise<ApiResponse<User>> {
    return await apiClient.get<ApiResponse<User>>("/auth/me");
  }

  public isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return !!this.getToken();
  }

  public getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.tokenKey);
  }

  public getUser(): User | null {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  private setAuthData(data: ApiResponse<AuthResponse>): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.tokenKey, data.data.token);
    localStorage.setItem(this.userKey, JSON.stringify(data.data.user));
  }

  private clearAuthData(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
}

export const authService = AuthService.getInstance();
