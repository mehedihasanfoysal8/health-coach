"use client";
import Image from 'next/image'


import DoctorCard, { Doctor } from '@/components/shared/DoctorCard';

import { useMemo } from "react";

// --- Suggestion logic based on your test labels ---
type Severity = "none" | "mild" | "moderate" | "severe";
type AlcoholLevel = "low-risk" | "hazardous" | "harmful" | "dependent";

export function getSuggestedSpecialties(input: {
    depression?: Severity;
    anxiety?: Severity;
    alcohol?: AlcoholLevel;
}) {
    const set = new Set<string>();

    const push = (s: string) => set.add(s);

    // Depression/Anxiety
    if (input.depression || input.anxiety) {
        const sev = [input.depression, input.anxiety].includes("severe") ? "severe" : [input.depression, input.anxiety].includes("moderate") ? "moderate" : "mild";
        if (sev === "mild") {
            push("Clinical Psychologist");
            push("Counselor");
        } else if (sev === "moderate") {
            push("Clinical Psychologist");
            push("Psychiatrist");
        } else {
            // severe
            push("Psychiatrist");
            push("Clinical Psychologist");
        }
    }

    // Alcohol use
    if (input.alcohol) {
        if (input.alcohol === "low-risk") {
            // nothing extra
        } else if (input.alcohol === "hazardous" || input.alcohol === "harmful") {
            push("Addiction Medicine");
            push("Psychiatrist");
            push("Counselor");
        } else if (input.alcohol === "dependent") {
            push("Addiction Medicine");
            push("Psychiatrist");
        }
    }

    // If nothing matched, return generic
    if (set.size === 0) {
        push("General Practitioner");
    }
    return Array.from(set);
}

// ----- Demo doctors -----
const DOCTORS: Doctor[] = [
    {
        id: "d1",
        name: "Assoc. Prof. Dr. Md. Zillur Rahman Khan",
        degrees: "MBBS  BCS (Health)  FCPS (Psychiatry)",
        specialty: "Psychiatrist",
        rating: 5,
        reviews: 28,
        experienceYears: 20,
        hospital: "Shaheed Suhrawardy Medical College Hospital, Dhaka",
        price: 1000,
        imageUrl: "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=512&auto=format&fit=crop",
        tags: ["Instant Video Call", "Online Appointment"],
    },
    {
        id: "d2",
        name: "Asst. Prof. Dr. Masrun Mostafa Chowdhury",
        degrees: "MBBS  DDV (Dermatology)",
        specialty: "Dermatologist",
        rating: 4.9,
        reviews: 1735,
        experienceYears: 11,
        hospital: "Ad-din Barrister Rafiqul Haque Medical Hospital",
        price: 399,
        originalPrice: 500,
        imageUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=512&auto=format&fit=crop",
        tags: ["Instant Video Call", "Online Appointment"],
    },
    {
        id: "d3",
        name: "Dr. Shafkat Hasan",
        degrees: "MBBS  DDV (Dermatology)",
        specialty: "Dermatologist",
        rating: 5,
        reviews: 3850,
        experienceYears: 21,
        hospital: "Dhaka University Medical Center & Hospital",
        price: 500,
        imageUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=512&auto=format&fit=crop",
        tags: ["Instant Video Call", "Online Appointment"],
    },
    {
        id: "d4",
        name: "Dr. A. Rahman",
        degrees: "MBBS  MD (Psychiatry)",
        specialty: "Clinical Psychologist",
        rating: 4.8,
        reviews: 320,
        experienceYears: 12,
        hospital: "National Institute of Mental Health",
        price: 700,
        imageUrl: "https://ranchofamilymed.com/wp-content/uploads/2023/11/Dr.-Maisara-Rahman-Headshot.jpg",
        tags: ["Instant Video Call", "Online Appointment"],
    },
    {
        id: "d5",
        name: "Dr. T. Islam",
        degrees: "MBBS  MD (Addiction)",
        specialty: "Addiction Medicine",
        rating: 4.7,
        reviews: 210,
        experienceYears: 10,
        hospital: "NIKDU",
        price: 800,
        imageUrl: "https://ssl.du.ac.bd/fontView/assets/faculty_image/1588_7DAB1DDF-D3F4-4200-932B-048D01163E90.jpeg",
        tags: ["Instant Video Call", "Online Appointment"],
    },
];

export default function ConsultationPage() {
    // TODO: replace with real results you computed earlier
    const userTestSummary = {
        depression: "moderate" as const,
        anxiety: "mild" as const,
        alcohol: "hazardous" as const,
    };

    const suggested = useMemo(() => getSuggestedSpecialties(userTestSummary), [userTestSummary]);

    // Sort so suggested specialties appear first (but keep all doctors)
    const doctorsSorted = useMemo(() => {
        const rank = (spec: string) => (suggested.includes(spec) ? 0 : 1);
        return [...DOCTORS].sort((a, b) => rank(a.specialty) - rank(b.specialty));
    }, [suggested]);

    return (
        <div>
            <section className="flex items-center justify-center w-full h-[200px] sm:h-[300px] md:h-[300px] relative overflow-hidden">
                <Image
                    src='https://doctime-core-ap-southeast-1.s3.ap-southeast-1.amazonaws.com/images/banners/874/Nk1YQkXxkc6S8rinWTVOEclNwGi8qGqh4AjlY2or.jpg' alt="images"
                    fill
                    priority
                    className="object-center"
                />
            </section>

            <div className="max-w-6xl mx-auto px-4 py-8">

                {/* Suggestions banner */}
                <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                    <p className="text-sm text-blue-900">
                        Suggested specialties for you based on your tests:&nbsp;
                        <span className="font-semibold">{suggested.join(", ")}</span>
                    </p>
                    <p className="text-xs text-blue-800 mt-1">
                        • Depression/Anxiety: mild → Psychologist/Counselor; moderate → Psychologist + Psychiatrist; severe → Psychiatrist ASAP. <br />
                        • Alcohol: hazardous/harmful → Addiction Medicine, Psychiatrist, Counselor; dependent → Addiction Medicine + Psychiatrist.
                    </p>
                </div>

                <div className="grid gap-5">
                    {doctorsSorted.map((d) => (
                        <DoctorCard key={d.id} doctor={d} />
                    ))}
                </div>
            </div>
        </div>
    );
}
