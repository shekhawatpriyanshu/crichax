import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';
import Alert from '../common/Alert';
import { validateEmail, validatePassword } from '../../utils/validation';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

export const LoginForm = ({ onSwitchToRegister, onSuccess }) => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (serverError) setServerError('');
  };

  const validate = () => {
    const newErrors = {};
    const emailErr = validateEmail(formData.email);
    const passErr = validatePassword(formData.password);

    if (emailErr) newErrors.email = emailErr;
    if (passErr) newErrors.password = passErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      setSuccessMessage(response.message || 'Login successful! Welcome back.');
      if (onSuccess) {
        setTimeout(() => onSuccess(response.user), 600);
      }
    } catch (err) {
      setServerError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="form-login" className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="auth-form-header">
        <h2 className="auth-form-title">Welcome Back</h2>
        <p className="auth-form-subtitle">Enter your credentials to access your CriChax dashboard.</p>
      </div>

      {serverError && (
        <Alert
          id="login-error-alert"
          type="error"
          message={serverError}
          onClose={() => setServerError('')}
        />
      )}

      {successMessage && (
        <Alert
          id="login-success-alert"
          type="success"
          message={successMessage}
        />
      )}

      <div className="auth-inputs-stack">
        <Input
          id="login-input-email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="captain@crichax.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={Mail}
          required
          autoComplete="email"
        />

        <Input
          id="login-input-password"
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={Lock}
          required
          autoComplete="current-password"
        />
      </div>

      <div className="auth-form-footer">
        <Button
          id="btn-login-submit"
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          icon={LogIn}
          className="btn-block"
        >
          Sign In
        </Button>
      </div>

      <div className="auth-switch-prompt">
        <span>Don't have a CriChax account?</span>{' '}
        <button
          id="btn-switch-to-register"
          type="button"
          className="auth-inline-link"
          onClick={onSwitchToRegister}
        >
          Create an account <ArrowRight size={14} />
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
