import React, { useState } from 'react';
import { Pet } from '../types/pet';

interface ExamFormProps {
  pet: Pet;
  onSubmit: (examData: any) => void;
}

const ExamForm: React.FC<ExamFormProps> = ({ pet, onSubmit }) => {
  const [examData, setExamData] = useState({
    type: '',
    date: '',
    results: '',
    vet: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...examData,
      id: `E${Date.now()}`,
      petId: pet.id
    });
    setExamData({
      type: '',
      date: '',
      results: '',
      vet: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-purple-50 p-4 rounded-lg mb-4">
        <h3 className="font-medium text-purple-800">
          Registrando examen para: {pet.name}
        </h3>
        <p className="text-sm text-purple-600">ID: {pet.id}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipo de examen
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          value={examData.type}
          onChange={(e) => setExamData({ ...examData, type: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fecha
        </label>
        <input
          type="date"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          value={examData.date}
          onChange={(e) => setExamData({ ...examData, date: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Resultados
        </label>
        <textarea
          rows={4}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          value={examData.results}
          onChange={(e) => setExamData({ ...examData, results: e.target.value })}
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Veterinario
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          value={examData.vet}
          onChange={(e) => setExamData({ ...examData, vet: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Registrar Resultados
      </button>
    </form>
  );
};

export default ExamForm;