"use client";

import { useState } from "react";
import { createPatient } from "@/lib/apiClient";

export default function AddPatientModal({ onClose, onPatientAdded }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name || !age) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const newPatient = await createPatient({
        name,
        age: Number(age),
      });

      if (onPatientAdded) {
        onPatientAdded(newPatient);
      }

      onClose();
    } catch (err) {
      console.error("Create Patient Error:", err);
      setError("Failed to create patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all duration-300 scale-100">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🩺</div>
          <h2 className="text-xl font-bold text-blue-700">
            Add New Patient
          </h2>
          <p className="text-gray-500 text-sm">
            Enter patient medical details
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded-md text-center mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Patient Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Age
            </label>
            <input
              type="number"
              placeholder="Enter age"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 active:scale-95 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Patient"}
            </button>
          </div>

        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>

    </div>
  );
}
