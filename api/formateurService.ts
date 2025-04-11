import apiClient from "./apiClient"

export interface Formateur {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage?: string;
  bio?: string;
  yearsOfExperience?: number;
  dailyRate?: number;
  linkedinProfile?: string;
  cvPath?: string;
  specializations: string[];
  availabilities?: Availability[];
}

export interface Availability {
  id?: number;
  startDateTime: string;
  endDateTime: string;
  isAvailable: boolean;
  notes?: string;
}

const formateurService = {
  getAllFormateurs: async (): Promise<Formateur[]> => {
    const response = await apiClient.get<Formateur[]>("/users/instructors")
    return response.data
  },

  getFormateurById: async (id: number): Promise<Formateur> => {
    const response = await apiClient.get<Formateur>(`/users/instructors/${id}`)
    return response.data
  },

  createFormateur: async (formateur: Formateur): Promise<Formateur> => {
    const response = await apiClient.post<Formateur>("/users/instructors", formateur)
    return response.data
  },

  updateFormateur: async (id: number, formateur: Formateur): Promise<Formateur> => {
    const response = await apiClient.put<Formateur>(`/users/instructors/${id}`, formateur)
    return response.data
  },

  deleteFormateur: async (id: number): Promise<void> => {
    await apiClient.delete(`/users/instructors/${id}`)
  },

  getFormateursBySpecialization: async (specialization: string): Promise<Formateur[]> => {
    const response = await apiClient.get<Formateur[]>(`/users/instructors/specialization/${specialization}`)
    return response.data
  }
}

export default formateurService