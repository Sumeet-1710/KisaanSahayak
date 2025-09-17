'use client';

import { FormData } from '@/lib/types';
import React, { useState } from 'react';

interface LocationStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function LocationStep({ formData, setFormData }: LocationStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // This is the new function to handle getting the user's location
  const handleGetLocation = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch('http://127.0.0.1:8000/api/reverse-geocode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat: latitude, lon: longitude }),
          });
          
          const result = await response.json();

          if (response.ok && !result.error) {
            // Update the form with the city and state from our backend
            setFormData((prevData) => ({
              ...prevData,
              city: result.city,
              state: result.state,
            }));
          } else {
            throw new Error(result.error || "Failed to get address from coordinates.");
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred.");
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        // Handle errors from the browser (e.g., user denies permission)
        setError(`Geolocation Error: ${err.message}`);
        setIsLoading(false);
      }
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Step 1: Set Your Farm&apos;s Location
      </h2>
      <div className="space-y-6">
        <button
          onClick={handleGetLocation}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          {isLoading ? 'Getting Location...' : 'Use My Current Location'}
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input
            type="text"
            id="state"
            value={formData.state || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., Tamil Nadu"
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">District / City</label>
          <input
            type="text"
            id="city"
            value={formData.city || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., Chennai"
          />
        </div>
      </div>
    </div>
  );
}