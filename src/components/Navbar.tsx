'use client';

import React from 'react';
import { Leaf, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 p-2">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">GreenOps AI</h1>
            <p className="text-xs text-slate-400">Carbon Reduction Dashboard</p>
          </div>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2 text-sm text-slate-300">
            <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              v1.0 MVP
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
