export default function StatCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
      <div className="flex justify-between items-start">
        <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl text-xl">
          {icon}
        </div>
        <span className="text-green-500 text-sm font-medium">
          {trend}
        </span>
      </div>

      <h3 className="text-3xl font-bold mt-4">{value}</h3>
      <p className="text-gray-500 text-sm">{title}</p>
    </div>
  );
}
