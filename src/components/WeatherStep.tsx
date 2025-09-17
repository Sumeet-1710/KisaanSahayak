'use client';

import { FormData } from '@/lib/types';
import React, { useState } from 'react';

interface WeatherStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function WeatherStep({ formData, setFormData }: WeatherStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // This function now calls our backend API
  const handleFetchWeather = async () => {
    setIsLoading(true);
    setError(null);
    
    // Check if a city was entered in Step 1
    if (!formData.city) {
      setError("Please enter a city in Step 1 first.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: formData.city }),
      });

      const result = await response.json();

      if (response.ok && !result.error) {
        // Update the form state with the live data from the backend
        setFormData((prevData) => ({
          ...prevData,
          temperature: result.temperature,
          humidity: result.humidity,
        }));
      } else {
        throw new Error(result.error || 'Failed to fetch weather data.');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error("Error fetching weather:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Step 3: Confirm Weather Data
      </h2>
      <div className="space-y-6">
        <p className="text-sm text-center text-gray-500">
          Click the button to fetch the current weather conditions for your selected location.
        </p>
        <button
          onClick={handleFetchWeather}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19.5 16 18l1.5-1.5"/><path d="M22 10.5a8.5 8.5 0 0 0-17 0"/><path d="M12 2v2.5"/></svg>
          {isLoading ? 'Fetching...' : 'Fetch Current Weather'}
        </button>

        {/* Display error message if something goes wrong */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
              Temperature (°C)
            </label>
            <input
              type="number"
              id="temperature"
              value={formData.temperature || ''}
              readOnly
              className="mt-1 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="humidity" className="block text-sm font-medium text-gray-700">
              Humidity (%)
            </label>
            <input
              type="number"
              id="humidity"
              value={formData.humidity || ''}
              readOnly
              className="mt-1 w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}