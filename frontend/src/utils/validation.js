/**
 * Validation utilities for CriChax Authentication
 */

export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Email address is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return null;
};

export const validateName = (name) => {
  if (!name || !name.trim()) {
    return 'Full name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  return null;
};

export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: '', color: 'transparent' };

  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 10) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  switch (score) {
    case 1:
      return { score: 1, label: 'Weak', color: '#f43f5e', width: '25%' };
    case 2:
      return { score: 2, label: 'Fair', color: '#f59e0b', width: '50%' };
    case 3:
      return { score: 3, label: 'Good', color: '#06b6d4', width: '75%' };
    case 4:
      return { score: 4, label: 'Strong', color: '#10b981', width: '100%' };
    default:
      return { score: 0, label: '', color: 'transparent', width: '0%' };
  }
};
