import React, { ReactNode } from 'react';

interface DivWrapperProps {
  children: ReactNode | undefined;
  className?: string;
  style?: React.CSSProperties;
}

const Wrapper: React.FC<DivWrapperProps> = ({ children, className, style }) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default Wrapper;
