export default function DoctorReportCard({ report }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-blue-100 space-y-5">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-xl">
          📊
        </div>
        <div>
          <h2 className="text-xl font-bold text-blue-700">
            Weekly AI Insight
          </h2>
          <p className="text-xs text-gray-400">
            Generated Health Analytics Report
          </p>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
        <h4 className="text-sm font-semibold text-blue-700 mb-2">
          Summary
        </h4>
        <p className="text-gray-700 text-sm leading-relaxed">
          {report?.summary || "No summary available."}
        </p>
      </div>

      {/* Advice Section */}
      <div className="bg-white border border-green-100 p-4 rounded-xl">
        <h4 className="text-sm font-semibold text-green-600 mb-2">
          Recommended Actions
        </h4>
        <p className="text-gray-700 text-sm leading-relaxed">
          {report?.advice || "No advice provided."}
        </p>
      </div>

    </div>
  );
}
