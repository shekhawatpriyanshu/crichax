import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';
import Alert from '../common/Alert';
import {
  validateEmail,
  validatePassword,
  validateName,
  getPasswordStrength,
} from '../../utils/validation';
import { User, Mail, Lock, UserPlus, ArrowRight, CheckCircle2 } from 'lucide-react';

export const RegisterForm = ({ onSwitchToLogin, onSuccess }) => {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordStrength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (serverError) setServerError('');
  };

  const validate = () => {
    const newErrors = {};

    const nameErr = validateName(formData.name);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) newErrors.email = emailErr;

    const passErr = validatePassword(formData.password);
    if (passErr) newErrors.password = passErr;

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

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
      const response = await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      setSuccessMessage(response.message || 'Account created successfully! Welcome to CriChax.');
      if (onSuccess) {
        setTimeout(() => onSuccess(response.user), 600);
      }
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="form-register" className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="auth-form-header">
        <h2 className="auth-form-title">Join CriChax</h2>
        <p className="auth-form-subtitle">Create your account to unlock cricket stats, strategy, and analytics.</p>
      </div>

      {serverError && (
        <Alert
          id="register-error-alert"
          type="error"
          message={serverError}
          onClose={() => setServerError('')}
        />
      )}

      {successMessage && (
        <Alert
          id="register-success-alert"
          type="success"
          message={successMessage}
        />
      )}

      <div className="auth-inputs-stack">
        <Input
          id="register-input-name"
          name="name"
          type="text"
          label="Full Name"
          placeholder="Virat Kohli"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          icon={User}
          required
          autoComplete="name"
        />

        <Input
          id="register-input-email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="player@crichax.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={Mail}
          required
          autoComplete="email"
        />

        <div className="password-field-group">
          <Input
            id="register-input-password"
            name="password"
            type="password"
            label="Password"
            placeholder="At least 6 characters"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            icon={Lock}
            required
            autoComplete="new-password"
          />

          {formData.password && (
            <div className="password-strength-box">
              <div className="strength-bar-bg">
                <div
                  className="strength-bar-fill"
                  style={{
                    width: passwordStrength.width,
                    backgroundColor: passwordStrength.color,
                  }}
                />
              </div>
              <span className="strength-label" style={{ color: passwordStrength.color }}>
                {passwordStrength.label}
              </span>
            </div>
          )}
        </div>

        <Input
          id="register-input-confirm-password"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={Lock}
          required
          autoComplete="new-password"
        />
      </div>

      <div className="auth-form-footer">
        <Button
          id="btn-register-submit"
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          icon={UserPlus}
          className="btn-block"
        >
          Create Account
        </Button>
      </div>

      <div className="auth-switch-prompt">
        <span>Already have an account?</span>{' '}
        <button
          id="btn-switch-to-login"
          type="button"
          className="auth-inline-link"
          onClick={onSwitchToLogin}
        >
          Sign In <ArrowRight size={14} />
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
