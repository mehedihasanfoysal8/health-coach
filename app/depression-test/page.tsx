"use client";
import { LS_APPTS_KEY } from "@/components/shared/DoctorCard";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/lib/type";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling asleep, staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you’re a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed — or being so fidgety or restless that you’ve been moving around a lot more than usual",
  "Thoughts that you would be better off dead or of hurting yourself in some way",
];

const interpretation = [
  { range: [0, 4], label: "None-minimal", action: "None" },
  { range: [5, 9], label: "Mild", action: "Watchful waiting; repeat PHQ-9 at follow-up" },
  { range: [10, 14], label: "Moderate", action: "Treatment plan, considering counseling, follow-up and/or pharmacotherapy" },
  { range: [15, 19], label: "Moderately Severe", action: "Active treatment with pharmacotherapy and/or psychotherapy" },
  { range: [20, 27], label: "Severe", action: "Immediate initiation of pharmacotherapy and, if severe impairment or poor response to therapy, expedited referral to a mental health specialist" },
];

export default function DepressionTest() {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(9).fill(null));
  const [score, setScore] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2);


  const handleChange = (qIndex: number, value: number) => {
    const updated = [...answers];
    updated[qIndex] = value;
    setAnswers(updated);
  };

  const calculateScore = () => {
    const total = answers.reduce((sum: number, val) => sum + (val ?? 0), 0);
    setScore(total);
    setShowModal(true);
  };

  const getInterpretation = () => {
    if (score === null) return null;
    return interpretation.find((i) => score >= i.range[0] && score <= i.range[1]);
  };

  const result = getInterpretation();

  const allAnswered = answers.every((a) => a !== null);

  const handleReset = () => {
    setAnswers(Array(9).fill(null));
    setShowModal(false);
  };

  // Doctor data state
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const router = useRouter();


  // Fetch JSON doctor data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/doctors.json");
        const data = await res.json();
        console.log("DAta", data);
        setDoctors(data);
      } catch (err) {
        console.error("Error loading doctors:", err);
      } finally {
        setLoadingDocs(false);
      }
    };
    fetchDoctors();
  }, []);

  /* ------------ Mapping severity → specialties ------------- */
  const specialtiesForSeverity = (label: string) => {
    switch (label) {
      case "Mild":
        return ["Clinical Psychologist", "Counselor"] as Doctor["specialty"][];
      case "Moderate":
        return ["Clinical Psychologist", "Psychiatrist"] as Doctor["specialty"][];
      case "Moderately Severe":
      case "Severe":
        return ["Psychiatrist", "Clinical Psychologist"] as Doctor["specialty"][];
      case "None-minimal":
      default:
        return ["Counselor", "Clinical Psychologist"] as Doctor["specialty"][];
    }
  };

  const relevantDoctors = useMemo(() => {
    if (!result) return [];
    const specs = specialtiesForSeverity(result.label);
    const rank = (s: Doctor["specialty"]) => specs.indexOf(s);
    return doctors
      .filter((d) => specs.includes(d.specialty))
      .sort((a, b) => rank(a.specialty) - rank(b.specialty));
  }, [result, doctors]);

  /* ------------ Local appointment storage ------------- */
  const book = (doc: Doctor) => {
    const appt = {
      id: crypto.randomUUID(),
      doctorId: doc.id,
      doctorName: doc.name,
      specialty: doc.specialty,
      price: doc.price,
      bookedAt: new Date().toISOString()
    };
    const prev = JSON.parse(localStorage.getItem(LS_APPTS_KEY) || "[]");
    localStorage.setItem(LS_APPTS_KEY, JSON.stringify([appt, ...prev]));
    alert("Appointment booked!");
    router.push("/dashboard");
  };


  return (
    <section>
      <div className="bg-[#E3F8F8] py-12">
        <h1 className="max-w-7xl mx-auto px-4 text-3xl sm:text-4xl font-semibold text-[#237591]">
          Take a Free Online Depression Test
        </h1>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="px-4 py-16 rounded-2xl space-y-6">
          {questions.map((q, i) => {
            const isLocked = i > 0 && answers[i - 1] === null;
            return (
              <div
                key={i}
                className={`${i == 8 ? "border-b-0" : "border-b"
                  } pb-4 mb-4 transition-all duration-300 ${isLocked ? "opacity-50 pointer-events-none" : ""
                  }`}
              >
                <p className="font-medium text-xl mb-4 mt-3">
                  {i + 1}. {q}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                  {[0, 1, 2, 3]?.map((val) => (
                    <label
                      key={val}
                      className={`cursor-pointer text-center border-2 rounded px-4 py-2 text-sm font-medium transition-all ${answers[i] === val
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
                        onChange={(e) =>
                          handleChange(i, Number(e.target.value))
                        }
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
              className={`w-[70%] py-6 rounded font-semibold text-white ${allAnswered
                ? "bg-[#237591] hover:bg-[#185F9D]"
                : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              {
                showModal && score !== null ? "Below is the answer" : "Submit & Get Result"
              }

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

      {/* ====== RESULT MODAL ====== */}
      {showModal && score !== null && (
        <div className="bg-white rounded-xl shadow-xl w-full mx-auto sm:px-10 md:px-20 lg:px-28 md:max-w-7xl my-8 p-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#185F9D] text-center leading-tight">
            Your Online Depression Test
          </h2>

          <p className="text-base sm:text-lg font-medium text-center">
            <strong>Total Score:</strong>{" "}
            <mark className="bg-yellow-100 px-2 rounded">
              {score}
            </mark>
          </p>

          {result && (
            <>
              <p className="mt-3 text-center text-base sm:text-lg">
                <strong>Depression Severity:</strong>{" "}
                <mark className="bg-blue-100 px-2 rounded">
                  {result.label}
                </mark>
              </p>
              <p className="mt-2 text-gray-700 text-sm sm:text-base text-center leading-relaxed">
                <strong>Recommended Action:</strong>{" "}
                <mark className="bg-green-100 px-2 rounded">
                  {result.action}
                </mark>
              </p>
            </>
          )}

          <details className="mt-6 sm:mt-8">
            <summary className="cursor-pointer font-medium text-sm sm:text-base">
              How scores are interpreted
            </summary>
            <div className="mt-2 text-gray-700 text-xs sm:text-sm">
              <ul className="list-disc pl-5 sm:pl-6 space-y-1">
                <li>0–4: None-minimal — None</li>
                <li>5–9: Mild — Watchful waiting; repeat PHQ-9 at follow-up</li>
                <li>10–14: Moderate — Consider counseling, follow-up and/or pharmacotherapy</li>
                <li>15–19: Moderately Severe — Pharmacotherapy and/or psychotherapy</li>
                <li>20–27: Severe — Start pharmacotherapy; consider expedited specialist referral</li>
              </ul>
            </div>
          </details>

          <details className="mt-6 sm:mt-8">
            <summary className="cursor-pointer font-medium text-sm sm:text-base">
              Sources              </summary>
            <div className="mt-2 text-gray-700 text-xs sm:text-sm">
              <ul className="list-disc pl-5 sm:pl-6 space-y-1">

                <li>
                  Kroenke K, Spitzer RL, Williams JB. The Patient Health Questionnaire-2: Validity of a Two-Item Depression Screener. Medical Care. 2003;41:1284-92.

                </li>
                <li>
                  Kroenke K, Spitzer RL, Williams JB. The PHQ-9: validity of a brief depression severity measure. J Gen Intern Med. 2001;16:606-13.
                </li>
                <li>
                  Kroenke K, Spitzer RL. The PHQ-9: a new depression diagnostic and severity measure. Psychiatr Ann. 2002;32:509-21.
                </li>

              </ul>
            </div>
          </details>

          {/* Relevant Doctors */}
          {result && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-6">Recommended Doctors</h3>

              {loadingDocs ? (
                <p>Loading doctors...</p>
              ) : (
                <>
                  {/* Responsive grid: 1 / 2 / 3 / 4 columns */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                    {relevantDoctors?.slice(0, visibleCount)?.map((d) => (
                      <div
                        key={d.id}
                        className="group bg-white border rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full"
                      >
                        {/* Top: media + info (stack on mobile, row on >=sm) */}
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                          {/* Image */}
                          <div className="relative w-full sm:w-24 md:w-28 h-40 sm:h-auto aspect-5/6 overflow-hidden rounded-xl bg-gray-100">
                            <img
                              src={d.imageUrl}
                              alt={d.name}
                              loading="lazy"
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </div>

                          {/* Info */}
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
                              {d?.tags?.map((tag, i) => {
                                // dynamic background + text color based on index
                                const tagColor =
                                  i === 0
                                    ? "bg-green-100 text-green-700"
                                    : i === 1
                                      ? "bg-blue-100 text-blue-700"
                                      : i === 2
                                        ? "bg-purple-100 text-purple-700"
                                        : "bg-gray-100 text-gray-700";

                                return (
                                  <span
                                    key={tag}
                                    className={`${tagColor} rounded-full px-2.5 py-1 font-medium border border-transparent`}
                                  >
                                    {tag}
                                  </span>
                                );
                              })}
                            </div>

                          </div>
                        </div>

                        {/* Bottom: price + CTA pinned to bottom */}
                        <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                          <div className="text-blue-600 font-bold text-lg sm:text-xl">
                            ৳{d.price}
                          </div>

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

                  {/* Show more */}
                  {visibleCount < relevantDoctors.length && (
                    <div className="mt-4 text-center">
                      <button
                        onClick={() =>
                          setVisibleCount((c) => Math.min(c + 2, relevantDoctors.length))
                        }
                        className="w-full sm:w-auto px-5 py-2 my-10 rounded border bg-white hover:bg-gray-50"
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

      )}

    </section>
  );
}
