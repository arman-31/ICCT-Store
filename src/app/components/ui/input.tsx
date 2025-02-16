import React, { ChangeEvent } from 'react';

interface InputProps {
  type?: string;
  id?: string;
  name?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  // ... other input props
}

const Input: React.FC<InputProps> = ({ type = 'text', id, name, value, onChange, placeholder, className, ...rest }) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input ${className || ''}`}
      {...rest}
    />
  );
};

export default Input;