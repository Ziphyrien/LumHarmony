import React from 'react';
import { clsx } from 'clsx';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className={clsx(
      "h-screen w-full bg-neutral-950 text-neutral-200 flex flex-col font-sans overflow-hidden divide-y divide-neutral-800",
      className
    )}>
      {children}
    </div>
  );
}