'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MonthlyEmission } from '@/types';

interface CarbonTrendChartProps {
  data: MonthlyEmission[];
  forecastData?: {
    forecast: number[];
    months: string[];
  };
  title?: string;
}

export function CarbonTrendChart({ data, forecastData, title = 'Carbon Emissions Trend & Forecast' }: CarbonTrendChartProps) {
  // Combine historical and forecast data for a unified timeline
  const chartData = data.map((item) => ({
    month: item.month,
    historical: item.co2,
    forecast: null as number | null,
  }));

  if (forecastData && forecastData.forecast && forecastData.forecast.length > 0) {
    // Connect the historical line to the forecast line by seeding the last historical point
    if (chartData.length > 0) {
      chartData[chartData.length - 1].forecast = chartData[chartData.length - 1].historical;
    }

    forecastData.forecast.forEach((value, index) => {
      chartData.push({
        month: forecastData.months[index] || `Month ${index + 1}`,
        // historical: null as number | null,
        historical: 0,
        forecast: value,
      });
    });
  }

  return (
    <div className="rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-6">
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.1)" />
          <XAxis dataKey="month" stroke="rgb(148, 163, 184)" />
          <YAxis stroke="rgb(148, 163, 184)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(51, 65, 85, 0.5)',
              borderRadius: '8px',
              color: 'white',
            }}
            formatter={(value) => `${value} Kg CO₂`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="historical"
            stroke="#cb2eba"
            strokeWidth={3}
            dot={{ fill: '#cb2eba', r: 5 }}
            activeDot={{ r: 7 }}
            name="Historical CO₂"
            connectNulls
          />
          {forecastData && (
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#d8bfd8"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: '#d8bfd8', r: 4 }}
              activeDot={{ r: 6 }}
              name="Projected CO₂ (AI)"
              connectNulls
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

