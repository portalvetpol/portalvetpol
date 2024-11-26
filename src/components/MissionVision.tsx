import React from 'react';
import { Target, Eye } from 'lucide-react';

const MissionVision = () => {
  return (
    <div className="py-12 bg-white rounded-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-6 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="h-8 w-8 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Misión</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Nuestra misión es proporcionar atención veterinaria excepcional y 
              personalizada, utilizando tecnología de vanguardia para garantizar 
              el bienestar y la salud óptima de cada mascota. Nos comprometemos 
              a ofrecer un servicio integral que facilite la comunicación entre 
              veterinarios y propietarios.
            </p>
          </div>

          <div className="p-6 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="h-8 w-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Visión</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Aspiramos a ser la plataforma líder en gestión de salud veterinaria, 
              reconocida por nuestra innovación, excelencia en el servicio y 
              compromiso con el bienestar animal. Buscamos transformar la manera 
              en que se gestiona la información médica de las mascotas, facilitando 
              el acceso y seguimiento tanto para veterinarios como para propietarios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;