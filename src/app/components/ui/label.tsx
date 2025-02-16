import React, { ReactNode } from 'react';

interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children, className }) => {
  return (
    <label htmlFor={htmlFor} className={`label ${className || ''}`}>
      {children}
    </label>
  );
};

export default Label;