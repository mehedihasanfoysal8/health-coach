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

// utils/normalize.ts (or inline)
export const Normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD") // handle diacritics
    .replace(/[^\p{L}\p{N}]+/gu, " ") // keep letters/numbers; replace others (.,-,_,/) with space
    .replace(/\s+/g, " ") // collapse multiple spaces
    .trim();
