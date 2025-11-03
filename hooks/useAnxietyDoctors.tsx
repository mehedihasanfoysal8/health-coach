// src/hooks/useAnxietyDoctors.ts
"use client";

import { useEffect, useMemo, useState } from "react";

export type Doctor = {
  id: string;
  name: string;
  specialty: "Counselor" | "Clinical Psychologist" | "Psychiatrist" | string;
  price: number;
  imageUrl: string;
  degrees?: string;
  hospital?: string;
  tags?: string[];
};

export type AnxietySeverity =
  | "Minimal Anxiety"
  | "Mild Anxiety"
  | "Moderate Anxiety"
  | "Severe Anxiety";

export function getAnxietySeverity(score: number): AnxietySeverity {
  if (score <= 4) return "Minimal Anxiety";
  if (score <= 9) return "Mild Anxiety";
  if (score <= 14) return "Moderate Anxiety";
  return "Severe Anxiety";
}

export function specialtiesForAnxiety(label: AnxietySeverity) {
  switch (label) {
    case "Minimal Anxiety":
      return ["Counselor", "Clinical Psychologist"] as Doctor["specialty"][];
    case "Mild Anxiety":
      return ["Clinical Psychologist", "Counselor"] as Doctor["specialty"][];
    case "Moderate Anxiety":
      return ["Clinical Psychologist", "Psychiatrist"] as Doctor["specialty"][];
    case "Severe Anxiety":
      return ["Psychiatrist", "Clinical Psychologist"] as Doctor["specialty"][];
  }
}

export function useAnxietyDoctors(score: number | null) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const severity = useMemo(
    () => (score == null ? null : getAnxietySeverity(score)),
    [score]
  );

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/doctors.json");
        const data = (await res.json()) as Doctor[];
        if (alive) setDoctors(data);
      } catch (e) {
        if (alive) setError(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const relevantDoctors = useMemo(() => {
    if (!severity) return [];
    const specs = specialtiesForAnxiety(severity);
    const rank = (s: Doctor["specialty"]) => specs.indexOf(s);
    return doctors
      .filter((d) => specs.includes(d.specialty))
      .sort((a, b) => rank(a.specialty) - rank(b.specialty));
  }, [severity, doctors]);

  return { severity, relevantDoctors, loading, error };
}
