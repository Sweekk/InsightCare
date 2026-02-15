"use client";

import { useParams } from "next/navigation";
import AIChatBox from "@/components/AIChatBox";

export default function PatientDetailPage() {
  const params = useParams();
  const patientId = params.id;

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-bold">
        Patient Details
      </h1>

      <p>Patient ID: {patientId}</p>

      <AIChatBox patientId={patientId} />
    </div>
  );
}
