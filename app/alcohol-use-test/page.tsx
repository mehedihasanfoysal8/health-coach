"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const questions = [
    "How often do you have a drink containing alcohol?",
    "How many drinks containing alcohol do you have on a typical day when you are drinking?",
    "How often do you have six or more drinks on one occasion?",
];

const options = [
    // For Question 1
    [
        { label: "Never", value: 0 },
        { label: "Monthly or less", value: 1 },
        { label: "2–4 times a month", value: 2 },
        { label: "2–3 times a week", value: 3 },
        { label: "4 or more times a week", value: 4 },
    ],
    // For Question 2
    [
        { label: "1 or 2", value: 0 },
        { label: "3 or 4", value: 1 },
        { label: "5 or 6", value: 2 },
        { label: "7 to 9", value: 3 },
        { label: "10 or more", value: 4 },
    ],
    // For Question 3
    [
        { label: "Never", value: 0 },
        { label: "Less than monthly", value: 1 },
        { label: "Monthly", value: 2 },
        { label: "Weekly", value: 3 },
        { label: "Daily or almost daily", value: 4 },
    ],
];

export default function AlcoholUseTest() {
    const [answers, setAnswers] = useState<(number | null)[]>(Array(3).fill(null));
    const [score, setScore] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [gender, setGender] = useState<"male" | "female" | null>(null);

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

    const allAnswered = answers.every((a) => a !== null);

    const handleReset = () => {
        setAnswers(Array(3).fill(null));
        setScore(null);
    };

    const getInterpretation = () => {
        if (score === null || !gender) return null;
        if (gender === "male" && score >= 4)
            return {
                label: "Positive (Hazardous Drinking or Alcohol Use Disorder)",
                note:
                    "A score of 4 or more in men indicates hazardous drinking or possible alcohol use disorder.",
            };
        if (gender === "female" && score >= 3)
            return {
                label: "Positive (Hazardous Drinking or Alcohol Use Disorder)",
                note:
                    "A score of 3 or more in women indicates hazardous drinking or possible alcohol use disorder.",
            };
        return {
            label: "Negative (Below Risk Threshold)",
            note:
                "If points come only from Question 1, review the patient's drinking pattern over recent months.",
        };
    };

    const result = getInterpretation();

    return (
        <section>
            <div className="bg-[#E3F8F8] py-12">
                <h1 className="max-w-7xl mx-auto px-6 text-3xl sm:text-4xl font-semibold text-[#237591]">
                    Alcohol Use Disorders Identification Test (AUDIT-C)
                </h1>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="px-4 sm:px-6 py-16 rounded-2xl space-y-6">
                    {/* Gender Selection */}
                    <div className="mb-8">
                        <p className="text-lg font-medium mb-2">Please select your gender:</p>
                        <div className="flex gap-4">
                            {["male", "female"].map((g) => (
                                <button
                                    key={g}
                                    onClick={() => setGender(g as "male" | "female")}
                                    className={`px-6 py-2 border-2 rounded-lg font-medium capitalize transition-all ${gender === g
                                        ? "bg-[#185F9D] text-white border-[#185F9D]"
                                        : "border-gray-300 hover:border-[#185F9D]"
                                        }`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Questions */}
                    {questions.map((q, i) => {
                        const isLocked = i > 0 && answers[i - 1] === null;
                        return (
                            <div
                                key={i}
                                className={`${i === 2 ? "border-b-0" : "border-b"} pb-4 mb-4 transition-all duration-300 ${isLocked ? "opacity-50 pointer-events-none" : ""
                                    }`}
                            >
                                <p className="font-medium text-xl mb-4 mt-3">{i + 1}. {q}</p>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
                                    {options[i].map((opt) => (
                                        <label
                                            key={opt.value}
                                            className={`cursor-pointer text-center border-2 rounded px-4 py-2 text-sm font-medium transition-all ${answers[i] === opt.value
                                                ? "bg-[#185F9D] text-white border-[#185F9D]"
                                                : "border-gray-300 text-gray-700 hover:border-[#185F9D]"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name={`q${i}`}
                                                hidden
                                                value={opt.value}
                                                checked={answers[i] === opt.value}
                                                onChange={(e) => handleChange(i, Number(e.target.value))}
                                            />
                                            {opt.label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {/* Buttons */}
                    <div className="mt-12 flex justify-between sm:w-[500px] mx-auto gap-3 sm:pr-7 pr-3">
                        <Button
                            onClick={calculateScore}
                            disabled={!allAnswered || !gender}
                            className={`w-[70%] py-6 rounded font-semibold text-white ${allAnswered && gender
                                ? "bg-[#237591] hover:bg-[#185F9D]"
                                : "bg-gray-400 cursor-not-allowed"
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

            {/* ====== RESULT MODAL ====== */}
            {showModal && score !== null && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3 sm:px-6 overflow-y-auto">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md sm:max-w-xl md:max-w-2xl my-8 p-6 sm:p-8 md:p-10">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#185F9D] text-center leading-tight">
                            Your AUDIT-C Alcohol Use Test Result
                        </h2>

                        <p className="text-base sm:text-lg font-medium text-center">
                            <strong>Total Score:</strong>{" "}
                            <mark className="bg-yellow-100 px-2 rounded">{score}</mark>
                        </p>

                        {result && (
                            <>
                                <p className="mt-3 text-center text-base sm:text-lg">
                                    <strong>Interpretation:</strong>{" "}
                                    <mark className="bg-blue-100 px-2 rounded">{result.label}</mark>
                                </p>
                                <p className="mt-2 text-gray-700 text-sm sm:text-base text-center leading-relaxed">
                                    <mark>
                                        {result.note}
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
                                    <li>
                                        <strong>Men:</strong> A score of 4 or more suggests hazardous drinking or active alcohol use disorder.
                                    </li>
                                    <li>
                                        <strong>Women:</strong> A score of 3 or more suggests hazardous drinking or active alcohol use disorder.
                                    </li>
                                    <li>
                                        <strong>Note:</strong> If all points are from Question 1, review drinking habits over the past few months.
                                    </li>
                                </ul>
                            </div>
                        </details>
                        <details className="mt-6 sm:mt-8">
                            <summary className="cursor-pointer font-medium text-sm sm:text-base">
                                Sources              </summary>
                            <div className="mt-2 text-gray-700 text-xs sm:text-sm">
                                <ul className="list-disc pl-5 sm:pl-6 space-y-1">

                                    <li>
                                        <strong>National Institute on Alcohol Abuse and Alcoholism.
                                        </strong>
                                    </li>

                                </ul>
                            </div>
                        </details>

                        <div className="mt-6 sm:mt-8 text-center sm:text-right">
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full sm:w-auto px-8 sm:px-12 py-2 bg-[#185F9D] text-white rounded hover:bg-[#124a78] transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
