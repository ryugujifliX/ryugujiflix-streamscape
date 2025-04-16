
import React from 'react';

const Terms = () => {
  return (
    <div className="bg-ryugu-dark text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
        
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p className="text-white/80">
              By accessing or using RyugujiFlixStream, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you must not access or use our services.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">2. User Accounts</h2>
            <p className="text-white/80">
              To access certain features of RyugujiFlixStream, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            <p className="text-white/80">
              You must provide accurate and complete information when creating your account. You agree to promptly update your account information to keep it accurate and current.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Subscription and Billing</h2>
            <p className="text-white/80">
              Some features of RyugujiFlixStream require a paid subscription. By subscribing to our premium service, you agree to pay all fees associated with your selected subscription plan.
            </p>
            <p className="text-white/80">
              Subscription fees are billed in advance on a recurring basis depending on your subscription plan (monthly or annually). Your subscription will automatically renew unless you cancel it before the next billing date.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Content Usage</h2>
            <p className="text-white/80">
              RyugujiFlixStream content is licensed, not sold. Your subscription grants you a limited, non-exclusive, non-transferable license to access and view content solely for personal, non-commercial purposes.
            </p>
            <p className="text-white/80">
              You may not download (except through our official download feature), copy, reproduce, distribute, transmit, broadcast, display, sell, license, or exploit any content from our platform.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Prohibited Conduct</h2>
            <p className="text-white/80">
              When using RyugujiFlixStream, you agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Use our services for any illegal purpose</li>
              <li>Circumvent, remove, or alter any technological protection measures</li>
              <li>Use automation tools to access our content</li>
              <li>Share your account credentials with others</li>
              <li>Upload viruses or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Changes to Terms</h2>
            <p className="text-white/80">
              We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes through our website or by sending you an email. Your continued use of RyugujiFlixStream after such modifications constitutes your acceptance of the updated terms.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">7. Termination</h2>
            <p className="text-white/80">
              We may terminate or suspend your account and access to our services at our sole discretion, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
