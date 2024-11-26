import React from 'react';
import { Pet, Vaccine, Exam } from '../types/pet';
import { Calendar, User } from 'lucide-react';

interface RecordsListProps {
  pet: Pet;
  type: 'vaccines' | 'exams';
}

const RecordsList: React.FC<RecordsListProps> = ({ pet, type }) => {
  const records = type === 'vaccines' ? pet.vaccines : pet.exams;

  if (!records || records.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay {type === 'vaccines' ? 'vacunas' : 'exámenes'} registrados.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {records.map((record: Vaccine | Exam) => (
        <div key={record.id} className="border rounded-lg p-4 hover:bg-gray-50">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">
                {type === 'vaccines' ? (record as Vaccine).name : (record as Exam).type}
              </h4>
              {type === 'vaccines' ? (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Aplicación: {(record as Vaccine).date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Próxima dosis: {(record as Vaccine).nextDueDate}
                  </div>
                </div>
              ) : (
                <div className="mt-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Fecha: {(record as Exam).date}
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {(record as Exam).results}
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <User className="h-4 w-4 mr-1" />
              {record.vet}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecordsList;