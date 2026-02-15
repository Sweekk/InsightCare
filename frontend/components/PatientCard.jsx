import Link from "next/link";

export default function PatientCard({ patient }) {
  const riskStyles =
    patient.risk === "high"
      ? "bg-red-100 text-red-600 border-red-200"
      : patient.risk === "moderate"
      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
      : "bg-green-100 text-green-600 border-green-200";

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-blue-100">

      {/* Patient Info */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-blue-700">
          {patient.name}
        </h3>
        <p className="text-sm text-gray-500">
          Age: {patient.age}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center">

        {/* Risk Badge */}
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full border ${riskStyles}`}
        >
          {patient.risk?.toUpperCase()} RISK
        </span>

        {/* View Button */}
        <Link
          href={`/patients/${patient.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
        >
          View Details →
        </Link>

      </div>
    </div>
  );
}
