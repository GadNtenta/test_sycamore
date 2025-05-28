"use client";

import AddDoctorModal from "@/components/AddDoctorModal";
import AddNurseModal from "@/components/AddNurseModal";
import AddPatientModal from "@/components/AddPatientModal";
import AddRoomModal from "@/components/AddRoomModal";
import { doctorsApi, nursesApi, patientsApi, roomsApi } from "@/services/api";
import { Tab } from "@headlessui/react";
import {
  HeartIcon,
  HomeIcon,
  PencilIcon,
  TrashIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  healthStatus: string;
  roomId?: number;
  room?: Room;
}

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false);
  const [isAddNurseModalOpen, setIsAddNurseModalOpen] = useState(false);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [editingNurse, setEditingNurse] = useState<Nurse | null>(null);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [patientFormData, setPatientFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
  });
  const [doctorFormData, setDoctorFormData] = useState({
    firstName: "",
    lastName: "",
    specialty: "",
    phone: "",
    email: "",
  });
  const [nurseFormData, setNurseFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    phone: "",
    email: "",
  });
  const [roomFormData, setRoomFormData] = useState({
    number: "",
    capacity: "1",
  });

  const queryClient = useQueryClient();

  const { data: patients, isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: patientsApi.getAll,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const { data: doctors } = useQuery({
    queryKey: ["doctors"],
    queryFn: doctorsApi.getAll,
  });

  const { data: nurses } = useQuery({
    queryKey: ["nurses"],
    queryFn: nursesApi.getAll,
  });

  const { data: rooms } = useQuery({
    queryKey: ["rooms"],
    queryFn: roomsApi.getAll,
  });

  const updatePatient = useMutation({
    mutationFn: ({ id, data }) => patientsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.refetchQueries({ queryKey: ["patients"] });
      setEditingPatient(null);
    },
  });

  const updateDoctor = useMutation({
    mutationFn: ({ id, data }) => doctorsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      setEditingDoctor(null);
    },
  });

  const updateNurse = useMutation({
    mutationFn: ({ id, data }) => nursesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nurses"] });
      setEditingNurse(null);
    },
  });

  const updateRoom = useMutation({
    mutationFn: ({ id, data }) => roomsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setEditingRoom(null);
    },
  });

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setPatientFormData({
      firstName: patient.firstName,
      lastName: patient.lastName,
      dateOfBirth: new Date().toISOString().split("T")[0],
      gender: "M",
      phone: "",
      email: "",
      address: "",
    });
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setDoctorFormData({
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      specialty: doctor.specialty,
      phone: doctor.phone,
      email: doctor.email,
    });
  };

  const handleEditNurse = (nurse: Nurse) => {
    setEditingNurse(nurse);
    setNurseFormData({
      firstName: nurse.firstName,
      lastName: nurse.lastName,
      role: nurse.role,
      phone: nurse.phone,
      email: nurse.email,
    });
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    setRoomFormData({
      number: room.number,
      capacity: room.capacity.toString(),
    });
  };

  const handleUpdatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPatient) {
      const age = calculateAge(patientFormData.dateOfBirth);
      updatePatient.mutate({
        id: editingPatient.id,
        data: {
          firstName: patientFormData.firstName,
          lastName: patientFormData.lastName,
          age: age,
          healthStatus: "stable",
        },
      });
    }
  };

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleUpdateDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDoctor) {
      updateDoctor.mutate({ id: editingDoctor.id, data: doctorFormData });
    }
  };

  const handleUpdateNurse = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNurse) {
      updateNurse.mutate({ id: editingNurse.id, data: nurseFormData });
    }
  };

  const handleUpdateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRoom) {
      updateRoom.mutate({
        id: editingRoom.id,
        data: {
          ...roomFormData,
          capacity: parseInt(roomFormData.capacity),
        },
      });
    }
  };

  const handleDeletePatient = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce patient ?")) {
      deletePatient.mutate(id);
    }
  };

  const handleDeleteDoctor = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce médecin ?")) {
      deleteDoctor.mutate(parseInt(id));
    }
  };

  const handleDeleteNurse = (id: string) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette infirmière ?")
    ) {
      deleteNurse.mutate(parseInt(id));
    }
  };

  const handleDeleteRoom = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette chambre ?")) {
      deleteRoom.mutate(parseInt(id));
    }
  };

  const deletePatient = useMutation({
    mutationFn: (id: number) => patientsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.refetchQueries({ queryKey: ["patients"] });
    },
  });

  const deleteDoctor = useMutation({
    mutationFn: (id: number) => doctorsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });

  const deleteNurse = useMutation({
    mutationFn: (id: number) => nursesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nurses"] });
    },
  });

  const deleteRoom = useMutation({
    mutationFn: (id: number) => roomsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });

  const createPatient = useMutation({
    mutationFn: (data: Omit<Patient, "id">) => patientsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.refetchQueries({ queryKey: ["patients"] });
    },
  });

  const tabs = [
    { name: "Patients", icon: UserGroupIcon },
    { name: "Chambres", icon: HomeIcon },
    { name: "Médecins", icon: UserIcon },
    { name: "Infirmières", icon: HeartIcon },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Système de Gestion Hospitalière
          </h1>
          <p className="text-lg text-gray-600">
            Gérez efficacement vos patients, chambres et personnel médical
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className="flex space-x-1 border-b border-gray-200 p-4">
              {tabs.map((tab) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    classNames(
                      "flex items-center space-x-2 px-4 py-2.5 text-sm font-medium rounded-lg",
                      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                      selected
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    )
                  }
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="p-6">
              <Tab.Panel>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Liste des Patients
                    </h2>
                    <button
                      onClick={() => setIsAddPatientModalOpen(true)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Ajouter un patient
                    </button>
                  </div>
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    {editingPatient ? (
                      <div className="p-6 border-b">
                        <form
                          onSubmit={handleUpdatePatient}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Prénom
                              </label>
                              <input
                                type="text"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={patientFormData.firstName}
                                onChange={(e) =>
                                  setPatientFormData({
                                    ...patientFormData,
                                    firstName: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Nom
                              </label>
                              <input
                                type="text"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={patientFormData.lastName}
                                onChange={(e) =>
                                  setPatientFormData({
                                    ...patientFormData,
                                    lastName: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Date de naissance
                              </label>
                              <input
                                type="date"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={patientFormData.dateOfBirth}
                                onChange={(e) =>
                                  setPatientFormData({
                                    ...patientFormData,
                                    dateOfBirth: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Genre
                              </label>
                              <select
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={patientFormData.gender}
                                onChange={(e) =>
                                  setPatientFormData({
                                    ...patientFormData,
                                    gender: e.target.value,
                                  })
                                }
                              >
                                <option value="M">Masculin</option>
                                <option value="F">Féminin</option>
                                <option value="O">Autre</option>
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Téléphone
                              </label>
                              <input
                                type="tel"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={patientFormData.phone}
                                onChange={(e) =>
                                  setPatientFormData({
                                    ...patientFormData,
                                    phone: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Email
                              </label>
                              <input
                                type="email"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={patientFormData.email}
                                onChange={(e) =>
                                  setPatientFormData({
                                    ...patientFormData,
                                    email: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Adresse
                            </label>
                            <textarea
                              required
                              rows={3}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              value={patientFormData.address}
                              onChange={(e) =>
                                setPatientFormData({
                                  ...patientFormData,
                                  address: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="flex justify-end space-x-4">
                            <button
                              type="button"
                              onClick={() => setEditingPatient(null)}
                              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              Annuler
                            </button>
                            <button
                              type="submit"
                              disabled={updatePatient.isPending}
                              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              {updatePatient.isPending
                                ? "Modification..."
                                : "Enregistrer"}
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nom
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Âge
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                État de santé
                              </th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {patients?.map((patient) => (
                              <tr key={patient.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {patient.firstName} {patient.lastName}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">
                                    {patient.age} ans
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      patient.healthStatus === "stable"
                                        ? "bg-green-100 text-green-800"
                                        : patient.healthStatus === "critical"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {patient.healthStatus === "stable"
                                      ? "Stable"
                                      : patient.healthStatus === "critical"
                                      ? "Critique"
                                      : "En amélioration"}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button
                                    onClick={() => handleEditPatient(patient)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                  >
                                    <PencilIcon className="h-5 w-5" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeletePatient(patient.id)
                                    }
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <TrashIcon className="h-5 w-5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Liste des Chambres
                    </h2>
                    <button
                      onClick={() => setIsAddRoomModalOpen(true)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Ajouter une chambre
                    </button>
                  </div>
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    {editingRoom ? (
                      <div className="p-6 border-b">
                        <form onSubmit={handleUpdateRoom} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Numéro de chambre
                            </label>
                            <input
                              type="text"
                              required
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              value={roomFormData.number}
                              onChange={(e) =>
                                setRoomFormData({
                                  ...roomFormData,
                                  number: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Capacité (nombre de lits)
                            </label>
                            <select
                              required
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              value={roomFormData.capacity}
                              onChange={(e) =>
                                setRoomFormData({
                                  ...roomFormData,
                                  capacity: e.target.value,
                                })
                              }
                            >
                              <option value="1">1 lit</option>
                              <option value="2">2 lits</option>
                              <option value="3">3 lits</option>
                              <option value="4">4 lits</option>
                            </select>
                          </div>
                          <div className="flex justify-end space-x-4">
                            <button
                              type="button"
                              onClick={() => setEditingRoom(null)}
                              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              Annuler
                            </button>
                            <button
                              type="submit"
                              disabled={updateRoom.isPending}
                              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              {updateRoom.isPending
                                ? "Modification..."
                                : "Enregistrer"}
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Numéro
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Capacité
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Statut
                              </th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {rooms?.map((room) => (
                              <tr key={room.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    Chambre {room.number}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {room.capacity} lits
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      room.status === "free"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {room.status === "free"
                                      ? "Libre"
                                      : "Occupée"}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button
                                    onClick={() => handleEditRoom(room)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                  >
                                    <PencilIcon className="h-5 w-5" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteRoom(room.id.toString())
                                    }
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <TrashIcon className="h-5 w-5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Liste des Médecins
                    </h2>
                    <button
                      onClick={() => setIsAddDoctorModalOpen(true)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Ajouter un médecin
                    </button>
                  </div>
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    {editingDoctor ? (
                      <div className="p-6 border-b">
                        <form
                          onSubmit={handleUpdateDoctor}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Prénom
                              </label>
                              <input
                                type="text"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={doctorFormData.firstName}
                                onChange={(e) =>
                                  setDoctorFormData({
                                    ...doctorFormData,
                                    firstName: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Nom
                              </label>
                              <input
                                type="text"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={doctorFormData.lastName}
                                onChange={(e) =>
                                  setDoctorFormData({
                                    ...doctorFormData,
                                    lastName: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Spécialité
                            </label>
                            <select
                              required
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              value={doctorFormData.specialty}
                              onChange={(e) =>
                                setDoctorFormData({
                                  ...doctorFormData,
                                  specialty: e.target.value,
                                })
                              }
                            >
                              <option value="">
                                Sélectionner une spécialité
                              </option>
                              <option value="Cardiologie">Cardiologie</option>
                              <option value="Dermatologie">Dermatologie</option>
                              <option value="Gynécologie">Gynécologie</option>
                              <option value="Neurologie">Neurologie</option>
                              <option value="Ophtalmologie">
                                Ophtalmologie
                              </option>
                              <option value="Orthopédie">Orthopédie</option>
                              <option value="Pédiatrie">Pédiatrie</option>
                              <option value="Psychiatrie">Psychiatrie</option>
                              <option value="Radiologie">Radiologie</option>
                              <option value="Urgences">Urgences</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Téléphone
                              </label>
                              <input
                                type="tel"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={doctorFormData.phone}
                                onChange={(e) =>
                                  setDoctorFormData({
                                    ...doctorFormData,
                                    phone: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Email
                              </label>
                              <input
                                type="email"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={doctorFormData.email}
                                onChange={(e) =>
                                  setDoctorFormData({
                                    ...doctorFormData,
                                    email: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="flex justify-end space-x-4">
                            <button
                              type="button"
                              onClick={() => setEditingDoctor(null)}
                              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              Annuler
                            </button>
                            <button
                              type="submit"
                              disabled={updateDoctor.isPending}
                              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              {updateDoctor.isPending
                                ? "Modification..."
                                : "Enregistrer"}
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nom
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Spécialité
                              </th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {doctors?.map((doctor) => (
                              <tr key={doctor.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {doctor.firstName} {doctor.lastName}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">
                                    {doctor.specialty}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button
                                    onClick={() => handleEditDoctor(doctor)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                  >
                                    <PencilIcon className="h-5 w-5" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteDoctor(doctor.id.toString())
                                    }
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <TrashIcon className="h-5 w-5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Liste des Infirmières
                    </h2>
                    <button
                      onClick={() => setIsAddNurseModalOpen(true)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Ajouter une infirmière
                    </button>
                  </div>
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    {editingNurse ? (
                      <div className="p-6 border-b">
                        <form
                          onSubmit={handleUpdateNurse}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Prénom
                              </label>
                              <input
                                type="text"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={nurseFormData.firstName}
                                onChange={(e) =>
                                  setNurseFormData({
                                    ...nurseFormData,
                                    firstName: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Nom
                              </label>
                              <input
                                type="text"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={nurseFormData.lastName}
                                onChange={(e) =>
                                  setNurseFormData({
                                    ...nurseFormData,
                                    lastName: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Rôle
                            </label>
                            <select
                              required
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              value={nurseFormData.role}
                              onChange={(e) =>
                                setNurseFormData({
                                  ...nurseFormData,
                                  role: e.target.value,
                                })
                              }
                            >
                              <option value="">Sélectionner un rôle</option>
                              <option value="Infirmière en chef">
                                Infirmière en chef
                              </option>
                              <option value="Infirmière">Infirmière</option>
                              <option value="Infirmière assistante">
                                Infirmière assistante
                              </option>
                            </select>
                          </div>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Téléphone
                              </label>
                              <input
                                type="tel"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={nurseFormData.phone}
                                onChange={(e) =>
                                  setNurseFormData({
                                    ...nurseFormData,
                                    phone: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Email
                              </label>
                              <input
                                type="email"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={nurseFormData.email}
                                onChange={(e) =>
                                  setNurseFormData({
                                    ...nurseFormData,
                                    email: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="flex justify-end space-x-4">
                            <button
                              type="button"
                              onClick={() => setEditingNurse(null)}
                              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              Annuler
                            </button>
                            <button
                              type="submit"
                              disabled={updateNurse.isPending}
                              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              {updateNurse.isPending
                                ? "Modification..."
                                : "Enregistrer"}
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nom
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rôle
                              </th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {nurses?.map((nurse) => (
                              <tr key={nurse.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {nurse.firstName} {nurse.lastName}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">
                                    {nurse.role}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button
                                    onClick={() => handleEditNurse(nurse)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                  >
                                    <PencilIcon className="h-5 w-5" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteNurse(nurse.id.toString())
                                    }
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    <TrashIcon className="h-5 w-5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>

      <AddPatientModal
        isOpen={isAddPatientModalOpen}
        onClose={() => setIsAddPatientModalOpen(false)}
      />

      <AddRoomModal
        isOpen={isAddRoomModalOpen}
        onClose={() => setIsAddRoomModalOpen(false)}
      />

      <AddDoctorModal
        isOpen={isAddDoctorModalOpen}
        onClose={() => setIsAddDoctorModalOpen(false)}
      />

      <AddNurseModal
        isOpen={isAddNurseModalOpen}
        onClose={() => setIsAddNurseModalOpen(false)}
      />
    </main>
  );
}
