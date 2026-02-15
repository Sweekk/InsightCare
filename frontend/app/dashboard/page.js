"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPatients, getDoctorReport } from "@/lib/apiClient";

import StatCard from "@/components/StatCard";
import PatientCard from "@/components/PatientCard";
import DoctorReportCard from "@/components/DoctorReportCard";
import AddPatientModal from "@/components/AddPatientModal";

export default function DashboardPage() {
  const router = useRouter();

  const [patients, setPatients] = useState([]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    async function loadData() {
      try {
        setError("");

        const patientData = await getPatients();
        const doctorReport = await getDoctorReport();

        setPatients(patientData || []);
        setReport(doctorReport || null);
      } catch (err) {
        console.error("Dashboard Load Error:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-blue-700 text-lg font-medium animate-pulse">
          🩺 Loading Dashboard...
        </div>
      </div>
    );
  }

  const highRiskCount = patients.filter(
    (p) => p.risk === "high"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">
            Doctor Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Monitor patient health & AI risk insights
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 active:scale-95"
        >
          + Add Patient
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <StatCard
            title="Total Patients"
            value={patients.length}
          />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <StatCard
            title="High Risk"
            value={highRiskCount}
            color="text-red-500"
          />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <StatCard
            title="AI Alerts"
            value={report?.high_risk_count || 0}
            color="text-yellow-500"
          />
        </div>

      </div>

      {/* AI Weekly Insight */}
      {report && (
        <div className="mb-8 bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <DoctorReportCard report={report} />
        </div>
      )}

      {/* Recent Patients */}
      <div>
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Recent Patients
        </h2>

        {patients.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-gray-500 text-center">
            No patients found.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {patients.slice(0, 6).map((patient) => (
              <div
                key={patient.id}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300"
              >
                <PatientCard patient={patient} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <AddPatientModal
          onClose={() => setShowModal(false)}
          onPatientAdded={(newPatient) =>
            setPatients((prev) => [...prev, newPatient])
          }
        />
      )}

    </div>
  );
}
