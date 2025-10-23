"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Appointment, LS_APPTS_KEY } from "@/components/shared/DoctorCard";

const LS_EMAIL_KEY = "demo_email";

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [history, setHistory] = useState<Appointment[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const e = localStorage.getItem(LS_EMAIL_KEY);
    if (e) setEmail(e);

    try {
      const arr = JSON.parse(localStorage.getItem(LS_APPTS_KEY) || "[]") as Appointment[];
      setHistory(arr);
    } catch {
      setHistory([]);
    }
    setLoaded(true);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem(LS_APPTS_KEY);
    setHistory([]);
  };

  // ✅ Delete a single appointment by id
  const deleteAppointment = (id: string) => {
    setHistory((prev) => {
      const next = prev.filter((a) => a.id !== id);
      localStorage.setItem(LS_APPTS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const formatDT = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-3">
            {email && <span className="text-sm text-gray-600">Signed in as <b>{email}</b></span>}
            <button
              onClick={() => {
                localStorage.removeItem(LS_EMAIL_KEY);
                router.replace("/login");
              }}
              className="text-sm px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {history.length > 0 ? (
          <div className="rounded-xl border shadow-sm p-6">
            <h2 className="text-lg font-semibold">Latest Appointment</h2>
            <p className="mt-2 text-gray-700">
              {history[0].doctorName} — {history[0].specialty} · ৳{history[0].price}
            </p>
            <p className="text-sm text-gray-500">Booked: {formatDT(history[0].bookedAt)}</p>
          </div>
        ) : (
          <div className="rounded-xl border p-6 text-gray-600">
            No appointments yet. <a href="/doctors" className="text-blue-600 underline">Browse doctors</a>.
          </div>
        )}

        {/* Full history table */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Appointment History</h3>
            {history.length > 0 && (
              <button onClick={clearHistory} className="text-sm text-red-600 hover:underline">
                Clear history
              </button>
            )}
          </div>

          <div className="overflow-x-auto rounded-xl border">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Doctor</th>
                  <th className="px-4 py-3 font-semibold">Specialty</th>
                  <th className="px-4 py-3 font-semibold">Hospital</th>
                  <th className="px-4 py-3 font-semibold">Fee</th>
                  <th className="px-4 py-3 font-semibold">Booked (Date & Time)</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {history.map((a) => (
                  <tr key={a.id} className="border-t">
                    <td className="px-4 py-3">{a.doctorName}</td>
                    <td className="px-4 py-3">{a.specialty}</td>
                    <td className="px-4 py-3">{a.hospital}</td>
                    <td className="px-4 py-3">৳{a.price}</td>
                    <td className="px-4 py-3">{formatDT(a.bookedAt)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          if (confirm("Delete this appointment?")) deleteAppointment(a.id);
                        }}
                        className="text-red-600 hover:text-red-700 hover:underline"
                        aria-label={`Delete appointment with ${a.doctorName}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {history.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                      Nothing here yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
