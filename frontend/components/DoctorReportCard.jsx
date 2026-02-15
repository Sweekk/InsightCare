export default function DoctorReportCard({ report }) {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 p-8 rounded-2xl shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl text-xl">
          
        </div>
        <div>
          <h2 className="text-xl font-semibold">
            AI Weekly Insight
          </h2>
          <p className="text-sm text-green-600">
            Improving
          </p>
        </div>
      </div>

      <p className="text-gray-700 mb-4">
        {report.summary}
      </p>

      <div className="bg-white border border-indigo-200 p-4 rounded-xl">
        <span className="font-semibold text-indigo-600">
           Key Insight:
        </span>{" "}
        {report.advice}
      </div>
    </div>
  );
}
