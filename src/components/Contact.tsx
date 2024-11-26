import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Contáctanos</h2>
          <p className="mt-4 text-lg text-gray-600">Estamos aquí para atender a tus mascotas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800"
              alt="Gato llamando"
              className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -top-4 -right-4 bg-purple-100 rounded-full p-4 shadow-lg">
              <Phone className="h-8 w-8 text-purple-600 animate-bounce" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="bg-purple-50 rounded-lg p-8">
              <div className="flex items-center space-x-4 mb-2">
                <MapPin className="h-8 w-8 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Dirección</h3>
                  <p className="text-gray-600">Calle 150 # 25-36, Pereira</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-8">
              <div className="flex items-center space-x-4 mb-2">
                <Phone className="h-8 w-8 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Teléfono</h3>
                  <p className="text-gray-600">300 256 0000</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-8">
              <div className="flex items-center space-x-4 mb-2">
                <Mail className="h-8 w-8 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Correo Electrónico</h3>
                  <p className="text-gray-600">portalvetpol@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;