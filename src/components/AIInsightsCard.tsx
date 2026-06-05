'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { AIInsight } from '@/types';
import { getSeverityColor } from '@/utils/colors';

interface AIInsightsCardProps {
  insight: AIInsight;
}

export function AIInsightsCard({ insight }: AIInsightsCardProps) {
  return (
    <div className={`rounded-lg border p-6 ${getSeverityColor(insight.severity)}`}>
      <div className="flex gap-4">
        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold mb-2">{insight.title}</h4>
          <p className="text-sm opacity-90 mb-3">{insight.message}</p>
          <div className="bg-white/10 rounded p-3 text-sm">
            <p className="font-medium mb-1">Suggested Action:</p>
            <p className="opacity-90">{insight.suggestion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
