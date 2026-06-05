'use client';

import React from 'react';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Dashboard', icon: Home },
  ];

  return (
    <aside className="hidden lg:flex flex-col gap-6 w-64 border-r border-slate-700/50 bg-slate-900/30 p-6 min-h-screen">
      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/30'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-700/50">
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-lg p-4 border border-emerald-500/20">
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Quick Tip</p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Regularly monitor your carbon footprint and implement recommendations to reduce emissions.
          </p>
        </div>
      </div>
    </aside>
  );
}
