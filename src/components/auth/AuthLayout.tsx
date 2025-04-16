
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerLinkUrl: string;
  additionalFooter?: ReactNode;
};

const AuthLayout = ({
  children,
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkUrl,
  additionalFooter
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-white/70 mt-2">{subtitle}</p>
        </div>
        
        {children}
        
        <div className="mt-6 text-center">
          <p className="text-white/70">
            {footerText}{' '}
            <Link to={footerLinkUrl} className="text-ryugu-red hover:underline">
              {footerLinkText}
            </Link>
          </p>
          
          {additionalFooter}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
