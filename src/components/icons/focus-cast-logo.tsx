import React from 'react';

const FocusCastLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 125 24" // Increased width from 100 to 125
    className="h-6 w-auto"
    {...props}
  >
    <title>FocusCast Logo</title>
    {/* Main circle using primary theme color */}
    <circle cx="12" cy="12" r="10" className="fill-primary" />
    {/* Inner contrasting element */}
    <circle cx="12" cy="12" r="4" className="fill-primary-foreground" /> 
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