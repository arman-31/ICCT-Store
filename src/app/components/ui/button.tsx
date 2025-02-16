import React from 'react';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string; // Still useful for additional custom classes
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  // ... other props
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, variant, disabled, type, size, ...rest }) => {
  const buttonClasses = `
    button // Base button styles (from your CSS)
    ${className || ''} // Include any custom classes
    ${variant ? `button-${variant}` : ''} // Variant styles (e.g., button-primary)
    ${size ? `button-${size}` : ''} // Size styles (e.g., button-small)
    ${disabled ? 'button-disabled' : ''} // Disabled style
  `;

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
      type={type || 'button'}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;