// types/doctors.ts
export type Doctor = {
  id: string;
  name: string;
  degrees: string;
  specialty: "Psychiatrist" | "Clinical Psychologist" | "Counselor" | "Addiction Medicine";
  hospital: string;
  price: number;
  imageUrl: string;
  rating?: number;
  reviews?: number;
  experienceYears?: number;
  tags?: string[];
};
