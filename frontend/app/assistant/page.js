"use client";

import AIChatBox from "@/components/AIChatBox";
import { Activity, Brain, TrendingUp, FileText, Sparkles } from "lucide-react";

export default function AssistantPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Section */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-xl blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Doctor Assistant
              </h1>
              <p className="text-sm text-gray-500">Intelligent Medical Insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Welcome Card */}
        <div className="mb-6 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Welcome to Your AI Medical Assistant</h2>
            </div>
            <p className="text-blue-50 text-sm">
              Get instant insights and analysis powered by advanced AI technology
            </p>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer group">
              <div className="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-900">Patient Trends</h3>
                <p className="text-xs text-gray-600 mt-0.5">Analyze patterns</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer group">
              <div className="p-2 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-900">Risk Patterns</h3>
                <p className="text-xs text-gray-600 mt-0.5">Identify risks</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors cursor-pointer group">
              <div className="p-2 bg-green-500 rounded-lg group-hover:scale-110 transition-transform">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-900">Clinical Advice</h3>
                <p className="text-xs text-gray-600 mt-0.5">Get suggestions</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer group">
              <div className="p-2 bg-orange-500 rounded-lg group-hover:scale-110 transition-transform">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-900">Weekly Summary</h3>
                <p className="text-xs text-gray-600 mt-0.5">View reports</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="border-b bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">AI Assistant Online</span>
              </div>
              <span className="text-xs text-gray-500">Powered by Advanced AI</span>
            </div>
          </div>

          <div className="p-6">
            <AIChatBox />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            💡 <span className="font-medium">Tip:</span> Ask specific questions for more accurate insights
          </p>
        </div>
      </div>
    </div>
  );
}
