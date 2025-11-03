// app/anxiety-test/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAnxietyDoctors } from "@/hooks/useAnxietyDoctors";

const questions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
];

const interpretation = [
  { range: [0, 4], label: "Minimal Anxiety", action: "None" },
  {
    range: [5, 9],
    label: "Mild Anxiety",
    action: "Monitor symptoms; consider lifestyle or relaxation techniques",
  },
  {
    range: [10, 14],
    label: "Moderate Anxiety",
    action: "Consider counseling, follow-up and/or therapy",
  },
  {
    range: [15, 21],
    label: "Severe Anxiety",
    action: "Active treatment; psychotherapy and/or pharmacotherapy recommended",
  },
];

// LocalStorage keys
export const LS_APPTS_KEY = "demo_appts";
export const LS_EMAIL_KEY = "demo_email";

export default function AnxietyDisorderTest() {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(7).fill(null));
  const [score, setScore] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4); // for "Show more"
  const router = useRouter();

  const handleChange = (qIndex: number, value: number) => {
    const updated = [...answers];
    updated[qIndex] = value;
    setAnswers(updated);
  };

  const calculateScore = () => {
    const total = answers.reduce((sum: number, val) => sum + (val ?? 0), 0);
    setScore(total);
    setShowResult(true);
  };

  const result = useMemo(() => {
    if (score === null) return null;
    return interpretation.find((i) => score >= i.range[0] && score <= i.range[1]);
  }, [score]);

  const allAnswered = answers.every((a) => a !== null);

  const handleReset = () => {
    setAnswers(Array(7).fill(null));
    setScore(null);
    setShowResult(false);
    setVisibleCount(4);
  };

  // Doctors suggestion (based on score)
  const { severity, relevantDoctors, loading } = useAnxietyDoctors(score);

  // Booking (login gate + localStorage save)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const book = (doc: any) => {
    if (typeof window === "undefined") return;
    const userEmail = localStorage.getItem(LS_EMAIL_KEY);
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
    <section>
      <div className="bg-[#E3F8F8] py-12">
        <h1 className="max-w-7xl mx-auto px-6 text-3xl sm:text-4xl font-semibold text-[#237591]">
          Take a Free Online Anxiety Disorder (GAD-7) Test
        </h1>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="px-6 py-16 rounded-2xl space-y-6">
          {questions.map((q, i) => {
            const isLocked = i > 0 && answers[i - 1] === null;
            return (
              <div
                key={i}
                className={`${i === 6 ? "border-b-0" : "border-b"} pb-4 mb-4 transition-all duration-300 ${
                  isLocked ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <p className="font-medium text-xl mb-4 mt-3">
                  {i + 1}. {q}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                  {[0, 1, 2, 3].map((val) => (
                    <label
                      key={val}
                      className={`cursor-pointer text-center border-2 rounded px-4 py-2 text-sm font-medium transition-all ${
                        answers[i] === val
                          ? "bg-[#185F9D] text-white border-[#185F9D]"
                          : "border-gray-300 text-gray-700 hover:border-[#185F9D]"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q${i}`}
                        hidden
                        value={val}
                        checked={answers[i] === val}
                        onChange={(e) => handleChange(i, Number(e.target.value))}
                      />
                      {val === 0
                        ? "Not at all"
                        : val === 1
                        ? "Several days"
                        : val === 2
                        ? "More than half"
                        : "Nearly every day"}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="mt-12 flex justify-between sm:w-[500px] mx-auto gap-3 sm:pr-7 pr-3">
            <Button
              onClick={calculateScore}
              disabled={!allAnswered}
              className={`w-[70%] py-6 rounded font-semibold text-white ${
                allAnswered ? "bg-[#237591] hover:bg-[#185F9D]" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Submit & Get Result
            </Button>

            <Button
              type="button"
              variant={"outline"}
              onClick={handleReset}
              className="w-[30%] px-8 py-6 rounded border font-semibold bg-red-500 hover:bg-red-600 text-white hover:text-white"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* ====== INLINE RESULT + DOCTORS (no modal) ====== */}
      {showResult && score !== null && (
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-28 my-8">
          <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 md:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#185F9D] text-center leading-tight">
              Your GAD-7 Anxiety Disorder Test Result
            </h2>

            <p className="text-base sm:text-lg font-medium text-center">
              <strong>Total Score:</strong>{" "}
              <mark className="bg-yellow-100 px-2 rounded">{score}</mark>
            </p>

            {result && (
              <>
                <p className="mt-3 text-center text-base sm:text-lg">
                  <strong>Anxiety Severity:</strong>{" "}
                  <mark className="bg-blue-100 px-2 rounded">{result.label}</mark>
                </p>
                <p className="mt-2 text-gray-700 text-sm sm:text-base text-center leading-relaxed">
                  <strong>Recommended Action:</strong>{" "}
                  <mark className="bg-green-100 px-2 rounded">{result.action}</mark>
                </p>
              </>
            )}

            <details className="mt-6 sm:mt-8">
              <summary className="cursor-pointer font-medium text-sm sm:text-base">
                How scores are interpreted
              </summary>
              <div className="mt-2 text-gray-700 text-xs sm:text-sm">
                <ul className="list-disc pl-5 sm:pl-6 space-y-1">
                  <li>0–4: Minimal Anxiety — None</li>
                  <li>5–9: Mild Anxiety — Monitor and self-care</li>
                  <li>10–14: Moderate Anxiety — Counseling or therapy recommended</li>
                  <li>15–21: Severe Anxiety — Active treatment, possible pharmacotherapy</li>
                </ul>
              </div>
            </details>

            {/* Doctors for this severity */}
            {severity && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-6">Recommended Doctors for {severity}</h3>

                {loading ? (
                  <p>Loading doctors...</p>
                ) : relevantDoctors.length === 0 ? (
                  <p className="text-gray-600">No matching doctors found.</p>
                ) : (
                  <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                      {relevantDoctors.slice(0, visibleCount).map((d) => (
                        <div
                          key={d.id}
                          className="group bg-white border rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full"
                        >
                          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                            <div className="relative w-full sm:w-24 md:w-28 h-40 sm:h-auto aspect-5/6 overflow-hidden rounded-xl bg-gray-100">
                              <img
                                src={d.imageUrl}
                                alt={d.name}
                                loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-gray-900 leading-snug line-clamp-2">
                                {d.name}
                              </div>
                              <div className="text-sm text-gray-700 mt-0.5 line-clamp-2">
                                {d.degrees}
                              </div>

                              <div className="mt-2 inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-2 py-0.5 text-xs sm:text-[13px] font-semibold">
                                {d.specialty}
                              </div>

                              <div className="mt-1 text-sm text-gray-600 truncate">
                                {d.hospital}
                              </div>

                              <div className="flex flex-wrap items-center text-xs mt-3 gap-2 sm:gap-3 w-full mb-3">
                                {d?.tags?.map((tag: string, i: number) => {
                                  const tagColor =
                                    i === 0
                                      ? "bg-green-100 text-green-700"
                                      : i === 1
                                      ? "bg-blue-100 text-blue-700"
                                      : i === 2
                                      ? "bg-purple-100 text-purple-700"
                                      : "bg-gray-100 text-gray-700";
                                  return (
                                    <span key={tag} className={`${tagColor} rounded-full px-2.5 py-1 font-medium`}>
                                      {tag}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                            <div className="text-blue-600 font-bold text-lg sm:text-xl">৳{d.price}</div>
                            <button
                              onClick={() => book(d)}
                              className="w-full sm:w-auto text-xs sm:text-sm px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                            >
                              Appointment
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {visibleCount < relevantDoctors.length && (
                      <div className="mt-4 text-center">
                        <button
                          onClick={() =>
                            setVisibleCount((c) => Math.min(c + 2, relevantDoctors.length))
                          }
                          className="w-full sm:w-auto px-5 py-2 my-6 rounded border bg-white hover:bg-gray-50"
                        >
                          Show more doctors
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
