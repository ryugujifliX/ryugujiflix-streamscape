
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '@/services/authService';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  const navigate = useNavigate();

  // If already logged in, redirect to home
  if (isAuthenticated()) {
    navigate('/');
    return null;
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue to RyuguJiFlix"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkUrl="/register"
      additionalFooter={
        <div className="mt-8 text-sm text-white/50 px-4 py-3 bg-white/5 rounded-md">
          <p className="font-medium text-white/70 mb-1">For demo purposes:</p>
          <p>Email: demo@example.com</p>
          <p>Password: password</p>
        </div>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
