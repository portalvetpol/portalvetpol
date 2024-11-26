import React, { useState } from 'react';
import { PawPrint, Activity, Syringe, FileText, BarChart, Search, Plus, ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import { Pet, Vaccine, Exam } from '../types/pet';

// Initial pets data
const initialPets: Pet[] = [
  {
    id: 'P001',
    name: 'Max',
    species: 'Perro',
    breed: 'Labrador',
    age: 3,
    owner: 'Ana García',
    color: 'Dorado',
    lastVisit: '2024-03-15',
    vaccines: [
      {
        id: 'V001',
        name: 'Rabia',
        date: '2024-02-15',
        nextDueDate: '2025-02-15',
        vet: 'Dr. Martínez'
      },
      {
        id: 'V002',
        name: 'Parvovirus',
        date: '2024-01-20',
        nextDueDate: '2024-07-20',
        vet: 'Dra. Rodríguez'
      }
    ],
    exams: [
      {
        id: 'E001',
        type: 'Análisis de sangre',
        date: '2024-03-01',
        results: 'Valores normales en todos los parámetros',
        vet: 'Dr. Martínez'
      }
    ]
  },
  {
    id: 'P002',
    name: 'Luna',
    species: 'Gato',
    breed: 'Siamés',
    age: 2,
    owner: 'Carlos Pérez',
    color: 'Blanco y Negro',
    lastVisit: '2024-03-10',
    vaccines: [],
    exams: []
  }
];

interface DashboardProps {
  userType: 'vet' | 'owner' | null;
  ownerName: string;
  petName: string;
  petId: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userType, ownerName, petName, petId, onLogout }) => {
  const [pets, setPets] = useState<Pet[]>(initialPets);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPet, setExpandedPet] = useState<string | null>(petId);
  const [showNewPetForm, setShowNewPetForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'vaccines' | 'exams'>('info');
  const [newPet, setNewPet] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    owner: '',
    color: '',
    id: `P${(pets.length + 1).toString().padStart(3, '0')}`,
    lastVisit: new Date().toISOString().split('T')[0],
    vaccines: [] as Vaccine[],
    exams: [] as Exam[]
  });
  const [newVaccine, setNewVaccine] = useState<Vaccine>({
    id: '',
    name: '',
    date: '',
    nextDueDate: '',
    vet: ''
  });
  const [newExam, setNewExam] = useState<Exam>({
    id: '',
    type: '',
    date: '',
    results: '',
    vet: ''
  });

  const filteredPets = pets.filter(pet => {
    if (userType === 'owner') {
      return pet.owner.toLowerCase() === ownerName.toLowerCase() &&
             pet.name.toLowerCase() === petName.toLowerCase() &&
             pet.id === petId;
    }
    return pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           pet.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
           pet.id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const stats = {
    dogs: pets.filter(pet => pet.species === 'Perro').length,
    cats: pets.filter(pet => pet.species === 'Gato').length,
    total: pets.length
  };

  const handleAddVaccine = () => {
    if (newVaccine.name && newVaccine.date && newVaccine.nextDueDate && newVaccine.vet) {
      const vaccine: Vaccine = {
        ...newVaccine,
        id: `V${Date.now()}`
      };
      setNewPet({
        ...newPet,
        vaccines: [...newPet.vaccines, vaccine]
      });
      setNewVaccine({
        id: '',
        name: '',
        date: '',
        nextDueDate: '',
        vet: ''
      });
    }
  };

  const handleAddExam = () => {
    if (newExam.type && newExam.date && newExam.results && newExam.vet) {
      const exam: Exam = {
        ...newExam,
        id: `E${Date.now()}`
      };
      setNewPet({
        ...newPet,
        exams: [...newPet.exams, exam]
      });
      setNewExam({
        id: '',
        type: '',
        date: '',
        results: '',
        vet: ''
      });
    }
  };

  const handleNewPetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPets([...pets, { ...newPet, age: parseInt(newPet.age) }]);
    setShowNewPetForm(false);
    setNewPet({
      name: '',
      species: '',
      breed: '',
      age: '',
      owner: '',
      color: '',
      id: `P${(pets.length + 2).toString().padStart(3, '0')}`,
      lastVisit: new Date().toISOString().split('T')[0],
      vaccines: [],
      exams: []
    });
    setActiveTab('info');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <PawPrint className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                PortalVetPol
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {userType === 'vet' ? 'Veterinario' : 'Propietario'}: {ownerName}
              </span>
              <button
                onClick={onLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {userType === 'vet' && (
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Mascotas</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
                </div>
                <BarChart className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Perros</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.dogs}</p>
                </div>
                <PawPrint className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Gatos</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.cats}</p>
                </div>
                <PawPrint className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        )}

        {userType === 'vet' && (
          <div className="mb-6 flex justify-between items-center">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar mascota..."
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowNewPetForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nueva Mascota
            </button>
          </div>
        )}

        {showNewPetForm && userType === 'vet' && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Registrar Nueva Mascota</h3>
            
            <div className="flex space-x-4 mb-6 border-b">
              <button
                className={`pb-2 px-4 ${
                  activeTab === 'info'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('info')}
              >
                Información Básica
              </button>
              <button
                className={`pb-2 px-4 ${
                  activeTab === 'vaccines'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('vaccines')}
              >
                Vacunas
              </button>
              <button
                className={`pb-2 px-4 ${
                  activeTab === 'exams'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('exams')}
              >
                Exámenes
              </button>
            </div>

            <form onSubmit={handleNewPetSubmit}>
              {activeTab === 'info' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      value={newPet.name}
                      onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Especie</label>
                    <select
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      value={newPet.species}
                      onChange={(e) => setNewPet({ ...newPet, species: e.target.value })}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Perro">Perro</option>
                      <option value="Gato">Gato</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Raza</label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      value={newPet.breed}
                      onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Edad</label>
                    <input
                      type="number"
                      required
                      min="0"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      value={newPet.age}
                      onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Propietario</label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      value={newPet.owner}
                      onChange={(e) => setNewPet({ ...newPet, owner: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Color</label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      value={newPet.color}
                      onChange={(e) => setNewPet({ ...newPet, color: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'vaccines' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nombre de la vacuna</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        value={newVaccine.name}
                        onChange={(e) => setNewVaccine({ ...newVaccine, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Fecha de aplicación</label>
                      <input
                        type="date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        value={newVaccine.date}
                        onChange={(e) => setNewVaccine({ ...newVaccine, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Próxima aplicación</label>
                      <input
                        type="date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        value={newVaccine.nextDueDate}
                        onChange={(e) => setNewVaccine({ ...newVaccine, nextDueDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Veterinario</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        value={newVaccine.vet}
                        onChange={(e) => setNewVaccine({ ...newVaccine, vet: e.target.value })}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddVaccine}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Agregar Vacuna
                  </button>

                  {newPet.vaccines.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Vacunas registradas:</h4>
                      <div className="space-y-2">
                        {newPet.vaccines.map((vaccine) => (
                          <div key={vaccine.id} className="bg-purple-50 p-3 rounded-md">
                            <div className="flex justify-between">
                              <span className="font-medium">{vaccine.name}</span>
                              <span className="text-sm text-gray-500">{vaccine.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'exams' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tipo de examen</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        value={newExam.type}
                        onChange={(e) => setNewExam({ ...newExam, type: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Fecha</label>
                      <input
                        type="date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        value={newExam.date}
                        onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Resultados</label>
                      <textarea
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        value={newExam.results}
                        onChange={(e) => setNewExam({ ...newExam, results: e.target.value })}
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Veterinario</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        value={newExam.vet}
                        onChange={(e) => setNewExam({ ...newExam, vet: e.target.value })}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddExam}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Agregar Examen
                  </button>

                  {newPet.exams.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Exámenes registrados:</h4>
                      <div className="space-y-2">
                        {newPet.exams.map((exam) => (
                          <div key={exam.id} className="bg-purple-50 p-3 rounded-md">
                            <div className="flex justify-between">
                              <span className="font-medium">{exam.type}</span>
                              <span className="text-sm text-gray-500">{exam.date}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{exam.results}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewPetForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Registrar Mascota
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {userType === 'vet' ? 'Lista de Mascotas' : 'Información de la Mascota'}
            </h2>
            
            {filteredPets.map((pet) => (
              <div key={pet.id} className="mb-4 border rounded-lg">
                <div
                  className="p-4 cursor-pointer flex justify-between items-center"
                  onClick={() => setExpandedPet(expandedPet === pet.id ? null : pet.id)}
                >
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{pet.name}</h3>
                    <p className="text-sm text-gray-500">
                      {pet.species} - {pet.breed} - {pet.age} años
                    </p>
                    <p className="text-sm text-gray-500">Propietario: {pet.owner}</p>
                  </div>
                  {expandedPet === pet.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                
                {expandedPet === pet.id && (
                  <div className="border-t p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Información Básica</h4>
                        <dl className="space-y-1">
                          <div className="flex justify-between">
                            <dt className="text-sm text-gray-500">ID:</dt>
                            <dd className="text-sm text-gray-900">{pet.id}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm text-gray-500">Color:</dt>
                            <dd className="text-sm text-gray-900">{pet.color}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm text-gray-500">Última visita:</dt>
                            <dd className="text-sm text-gray-900">{pet.lastVisit}</dd>
                          </div>
                        </dl>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Vacunas</h4>
                        {pet.vaccines && pet.vaccines.length > 0 ? (
                          <div className="space-y-2">
                            {pet.vaccines.map((vaccine) => (
                              <div key={vaccine.id} className="bg-gray-50 p-2 rounded">
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">{vaccine.name}</span>
                                  <span className="text-sm text-gray-500">{vaccine.date}</span>
                                </div>
                                <div className="text-sm text-gray-500">
                                  Próxima: {vaccine.nextDueDate}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No hay vacunas registradas</p>
                        )}
                      </div>
                      
                      <div className="md:col-span-2">
                        <h4 className="font-medium text-gray-900 mb-2">Exámenes</h4>
                        {pet.exams && pet.exams.length > 0 ? (
                          <div className="space-y-2">
                            {pet.exams.map((exam) => (
                              <div key={exam.id} className="bg-gray-50 p-3 rounded">
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm font-medium">{exam.type}</span>
                                  <span className="text-sm text-gray-500">{exam.date}</span>
                                </div>
                                <p className="text-sm text-gray-600">{exam.results}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No hay exámenes registrados</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;