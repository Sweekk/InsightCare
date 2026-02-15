"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getPatients,
  getDoctorReport,
  getCurrentDoctor,
} from "@/lib/apiClient";

import StatCard from "@/components/StatCard";
import PatientCard from "@/components/PatientCard";
import DoctorReportCard from "@/components/DoctorReportCard";
import AddPatientModal from "@/components/AddPatientModal";
import { Sparkles, TrendingUp, AlertCircle, Users, Plus, Brain } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

        // async function loadData() {
    //   try {
    //     const doctorInfo = await getCurrentDoctor();
    //     const patientData = await getPatients();
    //     const doctorReport = await getDoctorReport();

    //     setDoctor(doctorInfo);
    //     setPatients(patientData || []);
    //     setReport(doctorReport || null);
    //   } catch (err) {
    //     console.error("Dashboard Load Error:", err);
    //   } finally {
    //     setLoading(false);
    //   }
    // }

    async function loadData() {
      try {
        // MOCK DATA
        const mockPatients = [
{
  id: "1",
  name: "Rahul Sharma",
  age: 32,
  risk: "high",
  description: "Rahul has been experiencing persistent low mood, sleep disturbances, and high work-related stress over the past 6 weeks. He reports frequent anxiety episodes and difficulty concentrating. Recent mood logs indicate declining emotional stability, placing him in a high-risk category for major depressive symptoms."
},

          {
            id: "2",
            name: "Priya Menon",
            age: 27,
            risk: "moderate",
          },
          {
            id: "3",
            name: "Amit Verma",
            age: 45,
            risk: "low",
          },
        ];

        const mockReport = {
          summary:
            "You handled 12 patients this week. 3 are high risk.",
          high_risk_count: 1,
          advice:
            "Prioritize follow-up sessions for high-risk patients.",
        };

        const mockDoctor = {
          name: "Dr. Sweekar",
        };

        setDoctor(mockDoctor);
        setPatients(mockPatients);
        setReport(mockReport);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-blue-400/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-blue-400 rounded-full animate-spin"></div>
          </div>
          <p className="text-white/80 text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const highRiskCount = patients.filter(
    (p) => p.risk === "high"
  ).length;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      
      {/* Floating Orbs Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        
        {/* HEADER */}
        <div className="px-8 md:px-12 pt-8 pb-6">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-xl opacity-60"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-2xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {doctor?.name || "Doctor"}
                </h1>
                <p className="text-blue-200 text-sm">{today}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => router.push("/assistant")}
                className="group relative px-6 py-3 rounded-xl font-semibold overflow-hidden transition-all hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 transition-transform group-hover:scale-110"></div>
                <div className="relative flex items-center gap-2 text-black">
                  <Brain className="w-5 h-5" />
                  <span className="hidden md:inline">AI Assistant</span>
                </div>
              </button>

              <button
                onClick={() => setShowModal(true)}
                className="group relative px-6 py-3 rounded-xl font-medium overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 text-white transition-all hover:bg-white/20 hover:scale-105"
              >
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  <span className="hidden md:inline">Add Patient</span>
                </div>
              </button>
            </div>
          </div>

          {/* Greeting Card */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">System Active</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Your Patient Overview
            </h2>
            <p className="text-blue-200 text-lg">
              Here's what's happening with your patients today
            </p>
          </div>
        </div>

        {/* BODY */}
        <div className="px-8 md:px-12 pb-12 space-y-8">

          {/* Stats Grid - Unique Card Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Total Patients Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl transition-all group-hover:blur-2xl"></div>
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-2xl p-6 transition-all hover:scale-105 hover:border-blue-400/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-right">
                    <p className="text-blue-200 text-sm font-medium mb-1">Total Patients</p>
                    <p className="text-4xl font-bold text-white">{patients.length}</p>
                  </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              </div>
            </div>

            {/* High Risk Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl blur-xl transition-all group-hover:blur-2xl"></div>
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-400/30 rounded-2xl p-6 transition-all hover:scale-105 hover:border-red-400/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-red-500/20 rounded-xl">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="text-right">
                    <p className="text-red-200 text-sm font-medium mb-1">High Risk</p>
                    <p className="text-4xl font-bold text-white">{highRiskCount}</p>
                  </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
              </div>
            </div>

            {/* AI Alerts Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-2xl blur-xl transition-all group-hover:blur-2xl"></div>
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-400/30 rounded-2xl p-6 transition-all hover:scale-105 hover:border-yellow-400/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-yellow-500/20 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-200 text-sm font-medium mb-1">AI Alerts</p>
                    <p className="text-4xl font-bold text-white">{report?.high_risk_count || 0}</p>
                  </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* AI Insight */}
          {report && (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl transition-all group-hover:blur-2xl"></div>
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-3xl overflow-hidden">
                <DoctorReportCard report={report} />
              </div>
            </div>
          )}

          {/* Recent Patients */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-1 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">
                Recent Patients
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {patients.slice(0, 6).map((patient, index) => (
                <div 
                  key={patient.id}
                  className="relative group"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-lg transition-all group-hover:blur-xl"></div>
                  <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all hover:border-white/30 hover:scale-105">
                    <PatientCard patient={patient} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <AddPatientModal
          onClose={() => setShowModal(false)}
          onPatientAdded={(newPatient) =>
            setPatients((prev) => [...prev, newPatient])
          }
        />
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
