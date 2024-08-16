import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface DivWrapperProps {
  children: ReactNode | undefined;
  className?: string;
  style?: React.CSSProperties;
}

const LayoutWrapper: React.FC<DivWrapperProps> = ({ children, className, style }) => {
  return (
    <div className={twMerge("md:w-4/5 pb-10 w-full m-auto flex items-center min-h-screen md:pt-40 pt-20 flex-col" , className)} style={style}>
      {children}
    </div>
  );
};

export default LayoutWrapper;
