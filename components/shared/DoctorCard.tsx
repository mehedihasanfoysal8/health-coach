// components/DoctorCard.tsx
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FC } from "react";
import clsx from "clsx";

export type Doctor = {
  id: string;
  name: string;
  degrees: string;
  specialty: string;
  rating: number;
  reviews: number;
  experienceYears: number;
  hospital: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  tags?: string[];
};

export type Appointment = {
  id: string;            // unique per booking
  doctorId: string;
  doctorName: string;
  specialty: string;
  price: number;
  hospital: string;
  bookedAt: string;      // ISO time
};

export const LS_APPTS_KEY = "demo_appointments"; // <-- history array

const DoctorCard: FC<{ doctor: Doctor; className?: string }> = ({ doctor, className }) => {
  const router = useRouter();

  const book = () => {
    const appt: Appointment = {
      id: crypto.randomUUID(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      price: doctor.price,
      hospital: doctor.hospital,
      bookedAt: new Date().toISOString(),
    };

    // Read current history
    const prev = typeof window !== "undefined"
      ? (JSON.parse(localStorage.getItem(LS_APPTS_KEY) || "[]") as Appointment[])
      : [];

    // Append and persist
    const next = [appt, ...prev];
    localStorage.setItem(LS_APPTS_KEY, JSON.stringify(next));

    alert("Appointment booked!");
    router.push("/dashboard");
  };

  return (
    <div className={clsx("bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6 flex justify-between gap-6", className)}>
      {/* left */}
      <div className="flex items-start gap-5 md:gap-6 flex-1">
        <div className="shrink-0">
          <div className="w-[120px] h-[140px] rounded-xl overflow-hidden bg-gray-100">
            <Image src={doctor.imageUrl} alt={doctor.name} width={120} height={140} className="w-full h-full object-cover" />
          </div>
          <div className="mt-3 flex items-center gap-1 text-gray-700">
            <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-amber-100">⭐</span>
            <span className="font-semibold">{doctor.rating}</span>
            <span className="text-gray-500 text-sm">({doctor.reviews})</span>
          </div>
          <div className="mt-3 text-sm">
            <div className="font-semibold">{doctor.experienceYears}+ Years</div>
            <div className="text-gray-500">Experience</div>
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
          <p className="mt-1 text-gray-700">{doctor.degrees}</p>
          <div className="mt-3 inline-flex rounded-full bg-[#e9f0ff] text-[#2e6ff2] px-3 py-1 font-semibold">
            {doctor.specialty}
          </div>
          <div className="mt-4">
            <div className="text-gray-500 text-sm">Working in</div>
            <div className="text-gray-800">{doctor.hospital}</div>
          </div>
          {doctor.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-4 text-[#2e6ff2]">
              {doctor.tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <span className="inline-block w-4 h-4 rounded-sm bg-[#2e6ff2] opacity-90" />
                  <span className="underline underline-offset-2">{t}</span>
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* right */}
      <div className="self-stretch pl-6 border-l hidden md:flex flex-col justify-between">
        <button onClick={book} className="self-end bg-[#2e6ff2] hover:bg-[#215be0] text-white font-semibold rounded-full px-6 py-2">
          Appointment
        </button>
        <div className="mt-8 text-right">
          <div className="text-4xl font-bold text-[#2e6ff2]">৳{doctor.price}</div>
          <div className="text-gray-500 mt-1">(Inc. VAT)</div>
          <div className="mt-2 text-gray-500 text-sm">Per Consultation</div>
        </div>
      </div>

      {/* mobile CTA */}
      <div className="md:hidden w-full mt-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-[#2e6ff2]">৳{doctor.price}</div>
            <div className="text-gray-500 text-sm">(Inc. VAT) • Per Consultation</div>
          </div>
          <button onClick={book} className="bg-[#2e6ff2] hover:bg-[#215be0] text-white font-semibold rounded-full px-5 py-2">
            Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
