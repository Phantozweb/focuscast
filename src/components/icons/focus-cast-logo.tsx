
import React from 'react';

const FocusCastLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 125 24"
    className="h-6 w-auto"
    {...props}
  >
    <title>FocusCast Logo</title>
    {/* Abstract eye shape */}
    <path 
      d="M1,12 C1,12 5,4 12,4 C19,4 23,12 23,12 C23,12 19,20 12,20 C5,20 1,12 1,12 Z" 
      stroke="hsl(var(--primary))" 
      strokeWidth="2" 
      fill="none" 
    />
    {/* Pupil / Play icon */}
    <path 
      d="M10 9 L15 12 L10 15 Z" 
      className="fill-primary"
    />
    <text
      x="30"
      y="17"
      fontFamily="Inter, sans-serif"
      fontSize="16"
      fontWeight="bold"
      className="fill-foreground"
    >
      FocusCast
    </text>
  </svg>
);

export default FocusCastLogo;
