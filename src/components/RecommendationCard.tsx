'use client';

import React from 'react';
import { Recommendation } from '@/types';
import { ArrowRight } from 'lucide-react';
import { getPriorityColor } from '@/utils/colors';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <div className="rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-6 hover:border-emerald-500/30 transition-all hover:shadow-lg hover:shadow-emerald-500/10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-white mb-2">{recommendation.title}</h4>
          <p className="text-sm text-slate-400 mb-4">{recommendation.description}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-lg whitespace-nowrap ml-4 ${getPriorityColor(recommendation.priority)}`}>
          {recommendation.priority}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700/50">
        <div>
          <p className="text-xs text-slate-500 mb-1">Savings</p>
          <p className="text-sm font-bold text-emerald-400">{recommendation.savings}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Carbon Reduction</p>
          <p className="text-sm font-bold text-emerald-400">{recommendation.carbonReduction}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Impact</p>
          <p className="text-sm font-bold text-slate-300">{recommendation.impact}</p>
        </div>
      </div>

      <button className="flex items-center gap-2 mt-4 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
        Learn More
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
