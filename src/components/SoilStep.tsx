'use client';

import { FormData } from '@/lib/types';
import React from 'react';

interface SoilStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function SoilStep({ formData, setFormData }: SoilStepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value === '' ? undefined : Number(value),
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Step 2: Provide Soil Data
      </h2>
      <div className="space-y-4">
        <p className="text-sm text-center text-gray-500 mb-6">
          Enter your soil&apos;s nutrient values. You can find these in a standard soil test report.
        </p>
        
        {/* Manual Input Fields */}
        <div>
          <label htmlFor="nitrogen" className="block text-sm font-medium text-gray-700">
            Nitrogen (N)
          </label>
          <input
            type="number"
            id="nitrogen"
            value={formData.nitrogen || ''}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., 90"
          />
        </div>
        <div>
          <label htmlFor="phosphorus" className="block text-sm font-medium text-gray-700">
            Phosphorus (P)
          </label>
          <input
            type="number"
            id="phosphorus"
            value={formData.phosphorus || ''}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., 42"
          />
        </div>
        <div>
          <label htmlFor="potassium" className="block text-sm font-medium text-gray-700">
            Potassium (K)
          </label>
          <input
            type="number"
            id="potassium"
            value={formData.potassium || ''}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., 43"
          />
        </div>
        <div>
          <label htmlFor="ph" className="block text-sm font-medium text-gray-700">
            pH Level
          </label>
          <input
            type="number"
            id="ph"
            value={formData.ph || ''}
            onChange={handleChange}
            step="0.1" // Allows decimal values for pH
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., 6.5"
          />
        </div>
      </div>
    </div>
  );
}