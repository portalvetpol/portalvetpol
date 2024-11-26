import React, { useState } from 'react';
import { Pet } from '../types/pet';

interface VaccineFormProps {
  pet: Pet;
  onSubmit: (vaccineData: any) => void;
}

const VaccineForm: React.FC<VaccineFormProps> = ({ pet, onSubmit }) => {
  const [vaccineData, setVaccineData] = useState({
    name: '',
    date: '',
    nextDueDate: '',
    vet: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...vaccineData,
      id: `V${Date.now()}`,
      petId: pet.id
    });
    setVaccineData({
      name: '',
      date: '',
      nextDueDate: '',
      vet: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-purple-50 p-4 rounded-lg mb-4">
        <h3 className="font-medium text-purple-800">
          Registrando vacuna para: {pet.name}
        </h3>
        <p className="text-sm text-purple-600">ID: {pet.id}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre de la vacuna
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={vaccineData.name}
            onChange={(e) => setVaccineData({ ...vaccineData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha de aplicación
          </label>
          <input
            type="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={vaccineData.date}
            onChange={(e) => setVaccineData({ ...vaccineData, date: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Próxima aplicación
          </label>
          <input
            type="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={vaccineData.nextDueDate}
            onChange={(e) => setVaccineData({ ...vaccineData, nextDueDate: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Veterinario
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={vaccineData.vet}
            onChange={(e) => setVaccineData({ ...vaccineData, vet: e.target.value })}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Registrar Vacunación
      </button>
    </form>
  );
};

export default VaccineForm;