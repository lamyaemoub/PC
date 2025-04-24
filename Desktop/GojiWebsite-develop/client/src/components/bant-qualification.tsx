import React from 'react';

export function BANTQualification() {
  return (
    <div className="space-y-6 py-4">
      {/* Budget Section */}
      <div className="space-y-2 border-b pb-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-blue-500 text-xl">💰</span>
          <span className="font-semibold text-lg">Budget</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Qualification Score</span>
          <span className="font-semibold">75%</span>
        </div>
        <div className="w-full h-2 bg-blue-100 rounded-full">
          <div className="h-2 bg-blue-600 rounded-full" style={{ width: "75%" }}></div>
        </div>
        <div className="mt-3 bg-blue-50 p-3 rounded-md">
          <div className="mb-1 text-sm font-medium text-blue-800">Prospect Response:</div>
          <p className="text-sm text-gray-600 italic">"We've set aside $50k-$100k for improving our demo process this year."</p>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-600">$50k-$100k budget identified</p>
        </div>
      </div>
      
      {/* Authority Section */}
      <div className="space-y-2 border-b pb-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-blue-500 text-xl">🎯</span>
          <span className="font-semibold text-lg">Authority</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Qualification Score</span>
          <span className="font-semibold">90%</span>
        </div>
        <div className="w-full h-2 bg-blue-100 rounded-full">
          <div className="h-2 bg-blue-600 rounded-full" style={{ width: "90%" }}></div>
        </div>
        <div className="mt-3 bg-blue-50 p-3 rounded-md">
          <div className="mb-1 text-sm font-medium text-blue-800">Prospect Response:</div>
          <p className="text-sm text-gray-600 italic">"I'm the VP of Sales and I have final sign-off on all sales tools."</p>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-600">VP of Sales with full purchasing authority</p>
        </div>
      </div>
      
      {/* Need Section */}
      <div className="space-y-2 border-b pb-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-blue-500 text-xl">📈</span>
          <span className="font-semibold text-lg">Need</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Qualification Score</span>
          <span className="font-semibold">85%</span>
        </div>
        <div className="w-full h-2 bg-blue-100 rounded-full">
          <div className="h-2 bg-blue-600 rounded-full" style={{ width: "85%" }}></div>
        </div>
        <div className="mt-3 bg-blue-50 p-3 rounded-md">
          <div className="mb-1 text-sm font-medium text-blue-800">Prospect Response:</div>
          <p className="text-sm text-gray-600 italic">"Our current process is manual and error-prone. We need something that scales with our team."</p>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-600">Multiple critical needs identified</p>
        </div>
      </div>
      
      {/* Timeline Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-blue-500 text-xl">🕒</span>
          <span className="font-semibold text-lg">Timeline</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span>Qualification Score</span>
          <span className="font-semibold">65%</span>
        </div>
        <div className="w-full h-2 bg-blue-100 rounded-full">
          <div className="h-2 bg-blue-600 rounded-full" style={{ width: "65%" }}></div>
        </div>
        <div className="mt-3 bg-blue-50 p-3 rounded-md">
          <div className="mb-1 text-sm font-medium text-blue-800">Prospect Response:</div>
          <p className="text-sm text-gray-600 italic">"We need to implement before our Q2 expansion. That gives us about 3 months."</p>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-600">Implementation needed by Q2</p>
        </div>
      </div>
      
      {/* Summary Quote Box */}
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-blue-500 mt-1">💬</span>
          <div>
            <div className="mb-1 font-medium">Qualification Summary</div>
            <p className="text-sm text-gray-600">
              "We have allocated budget for Q2 to improve our demo process. I'm the final decision maker and we need to implement before our expansion."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}