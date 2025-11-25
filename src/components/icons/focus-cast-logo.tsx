
import React from 'react';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

const FocusCastLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <div className={cn("flex items-center gap-2 font-extrabold text-xl tracking-tight text-slate-900", props.className)}>
    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
        <Play size={14} fill="white" />
    </div>
    <span>FocusCast</span>
  </div>
);

export default FocusCastLogo;
