import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  hint,
  icon: Icon,
  required = false,
  autoComplete,
  disabled = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`input-group ${error ? 'has-error' : ''} ${className}`}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label} {required && <span className="required-star">*</span>}
        </label>
      )}

      <div className="input-wrapper">
        {Icon && (
          <div className="input-icon-left">
            <Icon size={18} />
          </div>
        )}

        <input
          id={id}
          name={name}
          type={effectiveType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
          className={`input-field ${Icon ? 'with-left-icon' : ''} ${isPassword ? 'with-right-icon' : ''}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className="input-password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <p className="input-error-msg">{error}</p>}
      {!error && hint && <p className="input-hint-msg">{hint}</p>}
    </div>
  );
};

export default Input;
