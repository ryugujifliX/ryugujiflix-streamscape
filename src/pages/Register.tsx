
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '@/services/authService';
import AuthLayout from '@/components/auth/AuthLayout';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  const navigate = useNavigate();

  // If already logged in, redirect to home
  if (isAuthenticated()) {
    navigate('/');
    return null;
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join RyuguJiFlix today"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkUrl="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
