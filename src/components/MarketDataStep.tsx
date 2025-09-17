'use client';

import { FormData } from '@/lib/types';
import React, { useState, useEffect } from 'react';

// Define the shape of a single market data item
interface MarketItem {
  crop: string;
  price: number;
  demand: string;
}

// The component now needs formData to know the user's state
interface MarketDataStepProps {
  formData: FormData;
}

export default function MarketDataStep({ formData }: MarketDataStepProps) {
  const [marketData, setMarketData] = useState<MarketItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect runs once when the component loads
  useEffect(() => {
    const fetchMarketData = async () => {
      // We need a state to filter the market data
      if (!formData.state) {
        setError("State not provided. Please complete Step 1.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/market-prices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ state: formData.state }),
        });
        
        const result = await response.json();

        if (response.ok && !result.error) {
          setMarketData(result);
        } else {
          throw new Error(result.error || "Failed to fetch market data.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();
  }, [formData.state]); // The dependency array ensures this runs if the state changes

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Step 5: Review Market Data
      </h2>
      <p className="text-sm text-center text-gray-500 mb-6">
        Displaying top commodities for **{formData.state || 'your selected state'}**. Our AI uses live data like this to recommend the most profitable crops.
      </p>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden min-h-[200px]">
        {isLoading ? (
          <p className="p-6 text-center text-gray-500">Loading Market Data...</p>
        ) : error ? (
          <p className="p-6 text-center text-red-500">{error}</p>
        ) : (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-gray-50 font-semibold text-left">
              <div className="p-3">Crop</div>
              <div className="p-3">Price (₹ / Quintal)</div>
              <div className="p-3">Demand</div>
            </div>
            {/* Table Body */}
            <div>
              {marketData.map((item, index) => (
                <div key={index} className="grid grid-cols-3 border-t border-gray-200">
                  <div className="p-3 font-medium text-gray-800">{item.crop}</div>
                  <div className="p-3 text-gray-600">{item.price ? item.price.toLocaleString('en-IN') : 'N/A'}</div>
                  <div className="p-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      item.demand === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.demand}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}