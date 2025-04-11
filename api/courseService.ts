import apiClient from "./apiClient"

export interface Course {
  id?: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  category?: string;
  type?: string;
  level?: string;
  durationHours?: number;
  address?: string;
  room?: string;
  capacity?: number;
  onlineLink?: string;
  connectionInstructions?: string;
  cost?: number;
  fullPayment?: boolean;
  installmentPayment?: boolean;
  fundingAvailable?: boolean;
}

const courseService = {
  getAllCourses: async (): Promise<Course[]> => {
    const response = await apiClient.get<Course[]>("/courses")
    return response.data
  },

  getCourseById: async (id: number): Promise<Course> => {
    const response = await apiClient.get<Course>(`/courses/${id}`)
    return response.data
  },

  getCoursesByInstructor: async (instructorId: number): Promise<Course[]> => {
    const response = await apiClient.get<Course[]>(`/courses/instructor/${instructorId}`)
    return response.data
  },

  getCoursesByStudent: async (studentId: number): Promise<Course[]> => {
    const response = await apiClient.get<Course[]>(`/courses/student/${studentId}`)
    return response.data
  },

  createCourse: async (course: Course): Promise<Course> => {
    try {
      const response = await apiClient.post<Course>("/courses", course, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Use token from storage
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  },

  updateCourse: async (id: number, course: Course): Promise<Course> => {
    const response = await apiClient.put<Course>(`/courses/${id}`, course)
    return response.data
  },

  deleteCourse: async (id: number): Promise<void> => {
    await apiClient.delete(`/courses/${id}`)
  },

  enrollStudent: async (courseId: number, studentId: number): Promise<void> => {
    await apiClient.post(`/courses/${courseId}/enroll/${studentId}`)
  },

  unenrollStudent: async (courseId: number, studentId: number): Promise<void> => {
    await apiClient.delete(`/courses/${courseId}/unenroll/${studentId}`)
  },
}

export default courseService

