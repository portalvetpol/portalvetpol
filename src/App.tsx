import React, { useState } from 'react';
import { PawPrint } from 'lucide-react';
import MissionVision from './components/MissionVision';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Services from './components/Services';
import Contact from './components/Contact';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'vet' | 'owner' | null>(null);
  const [ownerName, setOwnerName] = useState('');
  const [petName, setPetName] = useState('');
  const [petId, setPetId] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  const handleLogin = (type: 'vet' | 'owner', username: string, petName?: string, petId?: string) => {
    setIsLoggedIn(true);
    setUserType(type);
    setOwnerName(username);
    if (petName) setPetName(petName);
    if (petId) setPetId(petId);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setOwnerName('');
    setPetName('');
    setPetId('');
    setActiveSection('home');
  };

  if (isLoggedIn) {
    return (
      <Dashboard 
        userType={userType} 
        ownerName={ownerName} 
        petName={petName}
        petId={petId}
        onLogout={handleLogout} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PawPrint className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">PortalVetPol</span>
            </div>
            <div className="flex space-x-4">
              <button 
                className={`px-4 py-2 rounded-md ${
                  activeSection === 'home' 
                    ? 'text-purple-600 font-medium' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveSection('home')}
              >
                Inicio
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${
                  activeSection === 'services' 
                    ? 'text-purple-600 font-medium' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveSection('services')}
              >
                Servicios
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${
                  activeSection === 'contact' 
                    ? 'text-purple-600 font-medium' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveSection('contact')}
              >
                Contacto
              </button>
            </div>
          </nav>
        </header>

        {activeSection === 'home' ? (
          <>
            {/* Hero Section */}
            <div className="py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Cuidado veterinario de excelencia para tus mascotas
                  </h1>
                  <p className="text-lg text-gray-600 mb-8">
                    Bienvenido a PortalVetPol, tu plataforma integral para el seguimiento
                    y cuidado de la salud de tus mascotas.
                  </p>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1587764379873-97837921fd44?auto=format&fit=crop&q=80"
                    alt="Veterinario con mascota"
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>

            {/* Login Section */}
            <div className="py-12">
              <div className="max-w-4xl mx-auto">
                <LoginForm onLogin={handleLogin} />
              </div>
            </div>

            {/* Mission and Vision */}
            <MissionVision />
          </>
        ) : activeSection === 'services' ? (
          <Services />
        ) : (
          <Contact />
        )}

        {/* Footer */}
        <footer className="py-8 mt-12 border-t border-gray-200">
          <div className="text-center text-gray-600">
            © 2024 PortalVetPol. Todos los derechos reservados.
          </div>
        </footer>
      </div>
    </div>
  );
}