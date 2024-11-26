import React from 'react';
import { Search } from 'lucide-react';
import { Pet } from '../types/pet';

interface PetSelectorProps {
  pets: Pet[];
  selectedPetId: string | null;
  onSelectPet: (petId: string) => void;
}

const PetSelector: React.FC<PetSelectorProps> = ({ pets, selectedPetId, onSelectPet }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Seleccionar Mascota</h3>
        <div className="relative w-64">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar mascota..."
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {pets.map((pet) => (
          <button
            key={pet.id}
            onClick={() => onSelectPet(pet.id)}
            className={`p-4 rounded-lg border ${
              selectedPetId === pet.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">{pet.name}</h4>
                <p className="text-sm text-gray-500">{pet.species} - {pet.breed}</p>
              </div>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {pet.id}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PetSelector;