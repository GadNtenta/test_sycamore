"use client";

import { nursesApi } from "@/services/api";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Nurse {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  email: string;
}

export default function NursesList() {
  const queryClient = useQueryClient();
  const [editingNurse, setEditingNurse] = useState<Nurse | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    phone: "",
    email: "",
  });

  const { data: nurses, isLoading } = useQuery({
    queryKey: ["nurses"],
    queryFn: nursesApi.getAll,
  });

  const updateNurse = useMutation({
    mutationFn: nursesApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nurses"] });
      setEditingNurse(null);
    },
  });

  const deleteNurse = useMutation({
    mutationFn: nursesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nurses"] });
    },
  });

  const handleEdit = (nurse: Nurse) => {
    setEditingNurse(nurse);
    setFormData({
      firstName: nurse.firstName,
      lastName: nurse.lastName,
      role: nurse.role,
      phone: nurse.phone,
      email: nurse.email,
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNurse) {
      updateNurse.mutate({ id: editingNurse.id, ...formData });
    }
  };

  const handleDelete = (id: string) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette infirmière ?")
    ) {
      deleteNurse.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="text-gray-600">Chargement des infirmières...</div>;
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      {editingNurse ? (
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
                Rôle
              </label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="Infirmier de service">
                  Infirmier de service
                </option>
                <option value="Infirmier anesthésiste">
                  Infirmier anesthésiste
                </option>
                <option value="Infirmier de bloc opératoire">
                  Infirmier de bloc opératoire
                </option>
                <option value="Infirmier de réanimation">
                  Infirmier de réanimation
                </option>
                <option value="Infirmier de pédiatrie">
                  Infirmier de pédiatrie
                </option>
                <option value="Infirmier de psychiatrie">
                  Infirmier de psychiatrie
                </option>
                <option value="Infirmier coordinateur">
                  Infirmier coordinateur
                </option>
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
                {updateNurse.isPending ? "Modification..." : "Enregistrer"}
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
                  <div className="text-sm text-gray-500">{nurse.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{nurse.role}</div>
                  <div className="text-sm text-gray-500">{nurse.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(nurse)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(nurse.id)}
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
