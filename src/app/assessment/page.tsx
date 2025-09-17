'use client'; 

import { useState } from 'react';
import { FormData } from '@/lib/types';
import LocationStep from '@/components/LocationStep';
import SoilStep from '@/components/SoilStep';
import WeatherStep from '@/components/WeatherStep';
import CropHistoryStep from '@/components/CropHistoryStep';
import MarketDataStep from '@/components/MarketDataStep';

export default function AssessmentPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const totalSteps = 5;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // --- This is the updated function ---
  const handleSubmit = async () => {
    console.log("Sending data to backend:", formData);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      console.log("Response from backend:", result);
      alert("Data sent successfully! Check your backend terminal.");

    } catch (error) {
      console.error("Error sending data to backend:", error);
      alert("Failed to send data. Is the backend server running?");
    }
  };
  // ------------------------------------

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-2">
            Crop Recommendation Assessment
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Step {step} of {totalSteps}
          </p>

          <div className="min-h-[300px] my-8">
            {step === 1 && <LocationStep formData={formData} setFormData={setFormData} />}
            {step === 2 && <SoilStep formData={formData} setFormData={setFormData} />}
            {step === 3 && <WeatherStep formData={formData} setFormData={setFormData} />}
            {step === 4 && <CropHistoryStep formData={formData} setFormData={setFormData} />}
            {step === 5 && <MarketDataStep formData={formData} />}
          </div>
          
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              className="bg-gray-300 text-gray-700 font-bold px-6 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={step === 1}
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="bg-green-600 text-white font-bold px-6 py-2 rounded-md hover:bg-green-700"
            >
              {step === totalSteps ? 'Get Recommendations' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}