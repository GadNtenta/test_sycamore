import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  healthStatus: string;
  roomId?: number;
  room?: Room;
}

export interface Room {
  id: number;
  number: string;
  status: "free" | "occupied";
  capacity: number;
  patient?: Patient;
}

export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  specialty: string;
}

export interface Nurse {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
}

export const patientsApi = {
  getAll: () => api.get<Patient[]>("/patients").then((res) => res.data),
  getById: (id: number) =>
    api.get<Patient>(`/patients/${id}`).then((res) => res.data),
  create: (data: Omit<Patient, "id">) =>
    api.post<Patient>("/patients", data).then((res) => res.data),
  update: (id: number, data: Partial<Patient>) =>
    api.put<Patient>(`/patients/${id}`, data).then((res) => res.data),
  delete: (id: number) => api.delete(`/patients/${id}`),
};

export const roomsApi = {
  getAll: () => api.get<Room[]>("/rooms").then((res) => res.data),
  getById: (id: number) =>
    api.get<Room>(`/rooms/${id}`).then((res) => res.data),
  create: (data: Omit<Room, "id">) =>
    api.post<Room>("/rooms", data).then((res) => res.data),
  update: (id: number, data: Partial<Room>) =>
    api.put<Room>(`/rooms/${id}`, data).then((res) => res.data),
  delete: (id: number) => api.delete(`/rooms/${id}`),
};

export const doctorsApi = {
  getAll: () => api.get<Doctor[]>("/doctors").then((res) => res.data),
  getById: (id: number) =>
    api.get<Doctor>(`/doctors/${id}`).then((res) => res.data),
  create: (data: Omit<Doctor, "id">) =>
    api.post<Doctor>("/doctors", data).then((res) => res.data),
  update: (id: number, data: Partial<Doctor>) =>
    api.put<Doctor>(`/doctors/${id}`, data).then((res) => res.data),
  delete: (id: number) => api.delete(`/doctors/${id}`),
};

export const nursesApi = {
  getAll: () => api.get<Nurse[]>("/nurses").then((res) => res.data),
  getById: (id: number) =>
    api.get<Nurse>(`/nurses/${id}`).then((res) => res.data),
  create: (data: Omit<Nurse, "id">) =>
    api.post<Nurse>("/nurses", data).then((res) => res.data),
  update: (id: number, data: Partial<Nurse>) =>
    api.put<Nurse>(`/nurses/${id}`, data).then((res) => res.data),
  delete: (id: number) => api.delete(`/nurses/${id}`),
};
