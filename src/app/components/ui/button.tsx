
import React, { JSX } from 'react';

interface ButtonProps {

  children?: React.ReactNode;
  onClick?: () => void;

}

declare function Button(props: ButtonProps): JSX.Element;

export default Button; // Or export { Button } if it's a named export