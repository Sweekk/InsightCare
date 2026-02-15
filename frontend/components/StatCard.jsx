export default function StatCard({ title, value, color = "text-black" }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
