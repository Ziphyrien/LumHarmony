import React from 'react';
import { clsx } from 'clsx';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className={clsx(
      "h-screen w-full bg-[oklch(0.09_0.005_260)] text-neutral-200 flex flex-col font-sans overflow-hidden",
      className
    )}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.12_0.01_260)] via-transparent to-[oklch(0.08_0.005_260)] pointer-events-none opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </div>
  );
}
