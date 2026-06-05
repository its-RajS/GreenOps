import '@/styles/globals.css';
import { ReactNode } from 'react';
import { Navbar, Sidebar } from '@/components';

export const metadata = {
  title: 'GreenOps AI - Carbon Reduction Dashboard',
  description: 'AI-powered sustainability dashboard for tracking carbon emissions and optimizing cloud infrastructure.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-50 antialiased">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
