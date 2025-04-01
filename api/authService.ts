import apiClient from "./apiClient"

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  role: "ADMIN" | "INSTRUCTOR" | "STUDENT"
}

export interface AuthResponse {
  token: string
  user: {
    id: number
    email: string
    firstName: string
    lastName: string
    profileImage?: string
    role: string
  }
}

const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/login", credentials)
    // Store the token for future requests
    localStorage.setItem("token", response.data.token)
    return response.data
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/register", userData)
    // Store the token for future requests
    localStorage.setItem("token", response.data.token)
    return response.data
  },

  logout: (): void => {
    localStorage.removeItem("token")
  },

  getCurrentUser: (): AuthResponse["user"] | null => {
    const userJson = localStorage.getItem("user")
    return userJson ? JSON.parse(userJson) : null
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token")
  },
}

export default authService

