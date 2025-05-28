"use client";

import { patientsApi, roomsApi } from "@/services/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePatient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    healthStatus: "stable",
    roomId: "",
  });

  const { data: rooms } = useQuery({
    queryKey: ["rooms"],
    queryFn: roomsApi.getAll,
  });

  const createPatient = useMutation({
    mutationFn: patientsApi.create,
    onSuccess: () => {
      router.push("/");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPatient.mutate({
      ...formData,
      age: parseInt(formData.age),
      roomId: formData.roomId ? parseInt(formData.roomId) : undefined,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Ajouter un nouveau patient
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="lastName"
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
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Âge
              </label>
              <input
                type="number"
                id="age"
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="healthStatus"
                className="block text-sm font-medium text-gray-700"
              >
                État de santé
              </label>
              <select
                id="healthStatus"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.healthStatus}
                onChange={(e) =>
                  setFormData({ ...formData, healthStatus: e.target.value })
                }
              >
                <option value="stable">Stable</option>
                <option value="critical">Critique</option>
                <option value="improving">En amélioration</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="roomId"
                className="block text-sm font-medium text-gray-700"
              >
                Chambre
              </label>
              <select
                id="roomId"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.roomId}
                onChange={(e) =>
                  setFormData({ ...formData, roomId: e.target.value })
                }
              >
                <option value="">Sélectionner une chambre</option>
                {rooms
                  ?.filter((room) => room.status === "free")
                  .map((room) => (
                    <option key={room.id} value={room.id}>
                      Chambre {room.number} (Capacité: {room.capacity} lits)
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={createPatient.isPending}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {createPatient.isPending ? "Création..." : "Créer le patient"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
