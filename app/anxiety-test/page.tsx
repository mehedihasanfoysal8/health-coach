"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
  { range: [5, 9], label: "Mild Anxiety", action: "Monitor symptoms; consider lifestyle or relaxation techniques" },
  { range: [10, 14], label: "Moderate Anxiety", action: "Consider counseling, follow-up and/or therapy" },
  { range: [15, 21], label: "Severe Anxiety", action: "Active treatment; psychotherapy and/or pharmacotherapy recommended" },
];

export default function AnxietyDisorderTest() {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(7).fill(null));
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
    setAnswers(Array(7).fill(null));
    setScore(null);
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
                className={`${i == 6 ? "border-b-0" : "border-b"} pb-4 mb-4 transition-all duration-300 ${isLocked ? "opacity-50 pointer-events-none" : ""
                  }`}
              >
                <p className="font-medium text-xl mb-4 mt-3">
                  {i + 1}. {q}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                  {[0, 1, 2, 3].map((val) => (
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
              className={`w-[70%] py-6 rounded font-semibold text-white ${allAnswered ? "bg-[#237591] hover:bg-[#185F9D]" : "bg-gray-400 cursor-not-allowed"
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

            <details className="mt-6 sm:mt-8">
              <summary className="cursor-pointer font-medium text-sm sm:text-base">
                Sources              </summary>
              <div className="mt-2 text-gray-700 text-xs sm:text-sm">
                <ul className="list-disc pl-5 sm:pl-6 space-y-1">

                  <li>
                    Spitzer RL, Kroenke K, Williams JB, Löwe B. A brief measure for assessing generalized anxiety disorder: the GAD-7. Arch Intern Med. 2006;166:1092-7.
                  </li>
                  <li>
                    Plummer F, Manea L, Trepel D, McMillan D. Screening for anxiety disorders with the GAD-7 and GAD-2: a systematic review and diagnostic metaanalysis. Gen Hosp Psychiatry. 2016;39:24-31.                                    </li>
                  <li>
                    Kroenke K, Spitzer RL, Williams JB, Monahan PO, Löwe B. Anxiety disorders in primary care: prevalence, impairment, comorbidity, and detection. Ann Intern Med. 2007;146:317-25.                                    </li>

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
