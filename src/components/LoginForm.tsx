import React, { useState } from 'react';
import { LogIn } from 'lucide-react';

interface LoginFormProps {
  onLogin: (type: 'vet' | 'owner', username: string, petName?: string, petId?: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState<'vet' | 'owner'>('vet');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    petName: '',
    petId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate owner login for Ana García
    if (activeTab === 'owner') {
      if (formData.username.toLowerCase() === 'ana garcía' && 
          formData.petName.toLowerCase() === 'max' && 
          formData.petId === 'P001') {
        onLogin(activeTab, formData.username, formData.petName, formData.petId);
      } else {
        alert('Credenciales incorrectas. Por favor verifique la información.');
        return;
      }
    } else {
      onLogin(activeTab, formData.username);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg border border-gray-200">
          <button
            className={`px-4 py-2 rounded-l-lg ${
              activeTab === 'vet'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600'
            }`}
            onClick={() => setActiveTab('vet')}
          >
            Veterinarios
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${
              activeTab === 'owner'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600'
            }`}
            onClick={() => setActiveTab('owner')}
          >
            Propietarios
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {activeTab === 'vet' ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Usuario
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre del propietario
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Ana García"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre de la mascota
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Max"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                value={formData.petName}
                onChange={(e) =>
                  setFormData({ ...formData, petName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ID de la mascota
              </label>
              <input
                type="text"
                required
                placeholder="Ej: P001"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                value={formData.petId}
                onChange={(e) =>
                  setFormData({ ...formData, petId: e.target.value })
                }
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full flex justify-center items-center space-x-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <LogIn className="h-5 w-5" />
          <span>Iniciar Sesión</span>
        </button>
      </form>
    </div>
  );
};

export default LoginForm;