"use client";

import { doctorsApi } from "@/services/api";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  phone: string;
  email: string;
}

export default function DoctorsList() {
  const queryClient = useQueryClient();
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    specialty: "",
    phone: "",
    email: "",
  });

  const { data: doctors, isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: doctorsApi.getAll,
  });

  const updateDoctor = useMutation({
    mutationFn: doctorsApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      setEditingDoctor(null);
    },
  });

  const deleteDoctor = useMutation({
    mutationFn: doctorsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      specialty: doctor.specialty,
      phone: doctor.phone,
      email: doctor.email,
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDoctor) {
      updateDoctor.mutate({ id: editingDoctor.id, ...formData });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce médecin ?")) {
      deleteDoctor.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="text-gray-600">Chargement des médecins...</div>;
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      {editingDoctor ? (
        <div className="p-6 border-b">
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
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
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
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
                value={formData.specialty}
                onChange={(e) =>
                  setFormData({ ...formData, specialty: e.target.value })
                }
              >
                <option value="Cardiologie">Cardiologie</option>
                <option value="Dermatologie">Dermatologie</option>
                <option value="Gynécologie">Gynécologie</option>
                <option value="Neurologie">Neurologie</option>
                <option value="Ophtalmologie">Ophtalmologie</option>
                <option value="Orthopédie">Orthopédie</option>
                <option value="Pédiatrie">Pédiatrie</option>
                <option value="Psychiatrie">Psychiatrie</option>
                <option value="Radiologie">Radiologie</option>
                <option value="Urgences">Urgences</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                type="tel"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
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
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
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
                {updateDoctor.isPending ? "Modification..." : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      ) : (
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
                  <div className="text-sm text-gray-500">{doctor.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {doctor.specialty}
                  </div>
                  <div className="text-sm text-gray-500">{doctor.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(doctor)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(doctor.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
