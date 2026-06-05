'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  trend?: number;
  trendPositive?: boolean;
}

export function KpiCard({ title, value, icon: Icon, subtitle, trend, trendPositive }: KpiCardProps) {
  return (
    <div className="rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-6 hover:border-emerald-500/30 transition-all hover:shadow-lg hover:shadow-emerald-500/10">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-400 mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-white">{value}</h3>
            {trend && (
              <span className={`text-sm font-semibold ${trendPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                {trendPositive ? '↓' : '↑'} {Math.abs(trend)}%
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-slate-500 mt-2">{subtitle}</p>}
        </div>
        <div className="rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 p-3 border border-emerald-500/20">
          <Icon className="h-6 w-6 text-emerald-400" />
        </div>
      </div>
    </div>
  );
}
