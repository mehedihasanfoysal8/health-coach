// app/search/page.tsx (or wherever this page lives)
"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Doctor, Normalize } from "@/lib/type";
import { LS_APPTS_KEY } from "@/components/shared/DoctorCard";

// 👇 prevent prerendering/SSG for this route
export const dynamic = "force-dynamic";

// Keep the hook usage in a child that is wrapped by Suspense
function SearchInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get the ?q= term from URL
  const query = (searchParams.get("q") || "").toLowerCase().trim();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const res = await fetch("/doctors.json", { cache: "no-store" });
        const data = await res.json();
        setDoctors(data);
      } catch (error) {
        console.error("Failed to load doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDoctors();
  }, []);

  const qNorm = Normalize(query);
  const tokens = qNorm ? qNorm.split(/\s+/) : [];

  const filteredDoctors = useMemo(() => {
    if (!tokens.length) return [];
    return doctors.filter((d) => {
      const hay = `${Normalize(d.name)} ${Normalize(d.specialty)} ${Normalize(
        d.degrees ?? ""
      )}`;
      return tokens.every((t) => hay.includes(t));
    });
  }, [doctors, tokens.join("|")]); // stable dep

  const book = (doc: Doctor) => {
    if (typeof window === "undefined") return;

    const userEmail = localStorage.getItem("demo_email");
    if (!userEmail) {
      alert("Please login first to book an appointment.");
      router.push("/login");
      return;
    }

    const appt = {
      id: crypto.randomUUID(),
      doctorId: doc.id,
      doctorName: doc.name,
      specialty: doc.specialty,
      price: doc.price,
      bookedAt: new Date().toISOString(),
      bookedBy: userEmail,
    };

    const prev = JSON.parse(localStorage.getItem(LS_APPTS_KEY) || "[]");
    localStorage.setItem(LS_APPTS_KEY, JSON.stringify([appt, ...prev]));

    alert(`Appointment booked successfully for ${doc.name}`);
    router.push("/dashboard");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#185F9D] mb-6">
        Search Results
      </h1>

      {loading && <p className="text-gray-500">Loading doctors...</p>}
      {!loading && query && filteredDoctors.length === 0 && (
        <p className="text-gray-500">
          No doctors found for <strong>{query}</strong>
        </p>
      )}
      {!loading && !query && (
        <p className="text-gray-500">Please enter a search term.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {filteredDoctors.map((d) => (
          <div
            key={d.id}
            className="border rounded-2xl p-4 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <img
              src={d.imageUrl}
              alt={d.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="font-semibold text-gray-900 text-lg line-clamp-2">
              {d.name}
            </h2>
            <p className="text-sm text-gray-700 mt-1">{d.degrees}</p>
            <p className="text-sm mt-1 font-semibold text-blue-700">
              {d.specialty}
            </p>
            <p className="text-sm text-gray-600 mt-1">{d.hospital}</p>

            <div className="mt-auto pt-4 flex justify-between items-center">
              <span className="text-blue-600 font-bold">৳{d.price}</span>
              <button
                onClick={() => book(d)}
                className="bg-[#185F9D] text-white text-xs px-4 py-2 rounded-full hover:bg-[#124a78] transition-colors"
              >
                Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// The page component only provides the Suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={<section className="p-8">Loading search…</section>}>
      <SearchInner />
    </Suspense>
  );
}
