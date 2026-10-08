import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = '',
  id,
  onClick,
  ...props
}) => {
  return (
    <button
      id={id}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`btn btn-${variant} ${isLoading ? 'btn-loading' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="btn-spinner" size={18} />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="btn-icon" size={18} />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export default Button;
