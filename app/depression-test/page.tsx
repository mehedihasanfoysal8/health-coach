"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
