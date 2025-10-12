
import React from 'react';
import { cn } from '@/lib/utils';

const FocusCastLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <div className={cn("flex items-center gap-3", props.className)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-full w-auto"
      aria-labelledby="focusCastLogoTitle"
    >
      <title id="focusCastLogoTitle">FocusCast Logo Icon</title>
      <path 
        d="M1,12 C1,12 5,4 12,4 C19,4 23,12 23,12 C23,12 19,20 12,20 C5,20 1,12 1,12 Z" 
        stroke="hsl(var(--primary))" 
        strokeWidth="2" 
        fill="none" 
      />
      <path 
        d="M10 9 L15 12 L10 15 Z" 
        className="fill-primary"
      />
    </svg>
    <span className="text-4xl md:text-5xl font-bold text-foreground font-headline">
        FocusCast
    </span>
  </div>
);

export default FocusCastLogo;
