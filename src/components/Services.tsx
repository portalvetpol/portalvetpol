import React from 'react';
import { Stethoscope, Syringe, Bug, Sparkles } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Stethoscope className="h-8 w-8 text-purple-600" />,
      title: "Consulta General",
      description: "Evaluación completa del estado de salud de tu mascota",
      image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800"
    },
    {
      icon: <Syringe className="h-8 w-8 text-purple-600" />,
      title: "Vacunas",
      description: "Programa completo de vacunación para perros y gatos",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800"
    },
    {
      icon: <Bug className="h-8 w-8 text-purple-600" />,
      title: "Desparasitación",
      description: "Control y prevención de parásitos internos y externos",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-purple-600" />,
      title: "Profilaxis",
      description: "Limpieza dental profesional para una mejor salud bucal",
      image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Nuestros Servicios</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;