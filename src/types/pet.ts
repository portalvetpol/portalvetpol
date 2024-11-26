export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  owner: string;
  lastVisit: string;
  color?: string;
  vaccines?: Vaccine[];
  exams?: Exam[];
}

export interface Vaccine {
  id: string;
  name: string;
  date: string;
  nextDueDate: string;
  vet: string;
}

export interface Exam {
  id: string;
  type: string;
  date: string;
  results: string;
  vet: string;
}