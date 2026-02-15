import Link from "next/link";

export default function PatientCard({ patient }) {
  const riskStyles =
    patient.risk === "high"
      ? "bg-red-100 text-red-600"
      : patient.risk === "moderate"
      ? "bg-yellow-100 text-yellow-600"
      : "bg-green-100 text-green-600";

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-indigo-100 text-indigo-600 p-4 rounded-full text-xl">
          👤
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            {patient.name}
          </h3>
          <p className="text-sm text-gray-500">
            Age {patient.age}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center border-t pt-4">
        <span
          className={`text-xs px-3 py-1 rounded-full ${riskStyles}`}
        >
          {patient.risk} Risk
        </span>

        <Link
          href={`/patients/${patient.id}`}
          className="text-sm text-gray-500"
        >
          View →
        </Link>
      </div>
    </div>
  );
}
