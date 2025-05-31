import React from 'react';

const FocusCastLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 24"
    fill="currentColor"
    className="h-6 w-auto"
    {...props}
  >
    <title>FocusCast Logo</title>
    <circle cx="12" cy="12" r="10" className="text-primary" />
    <circle cx="12" cy="12" r="6" className="text-background" />
    <circle cx="12" cy="12" r="3" className="text-primary" />
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
