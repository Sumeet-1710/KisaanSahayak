'use client';

import { FormData } from '@/lib/types';
import React from 'react';

interface CropHistoryStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function CropHistoryStep({ formData, setFormData }: CropHistoryStepProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    const isNumber = e.target.type === 'number';
    setFormData((prevData) => ({
      ...prevData,
      [id]: isNumber && value !== '' ? Number(value) : value,
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Step 4: Crop History
      </h2>
      <div className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <p className="text-sm text-blue-700">
            <strong className="font-semibold">Why this matters:</strong> Knowing your past crops helps us recommend rotations that improve soil health and prevent pest buildup.
          </p>
        </div>

        <div>
          <label htmlFor="previousCrop" className="block text-sm font-medium text-gray-700">
            Previous Crop Grown
          </label>
          <input
            type="text"
            id="previousCrop"
            value={formData.previousCrop || ''}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., Wheat"
          />
        </div>

        <div>
          <label htmlFor="previousSeason" className="block text-sm font-medium text-gray-700">
            Season
          </label>
          <select
            id="previousSeason"
            value={formData.previousSeason || ''}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select a season</option>
            <option value="Kharif">Kharif</option>
            <option value="Rabi">Rabi</option>
            <option value="Zaid">Zaid</option>
          </select>
        </div>

        <div>
          <label htmlFor="previousYield" className="block text-sm font-medium text-gray-700">
            Previous Yield (Quintal/Acre)
          </label>
          <input
            type="number"
            id="previousYield"
            value={formData.previousYield || ''}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., 25"
          />
        </div>
      </div>
    </div>
  );
}