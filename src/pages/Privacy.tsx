
import React from 'react';

const Privacy = () => {
  return (
    <div className="bg-ryugu-dark text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
            <p className="text-white/80">
              We collect several types of information from and about users of our platform, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Personal information such as name, email address, and payment details</li>
              <li>Usage data including viewing history, search queries, and interaction with content</li>
              <li>Device information such as IP address, browser type, and operating system</li>
              <li>Location data based on your IP address or device location settings</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
            <p className="text-white/80">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Providing, maintaining, and improving our services</li>
              <li>Processing transactions and sending related information</li>
              <li>Personalizing your experience and content recommendations</li>
              <li>Communicating with you about service updates and promotions</li>
              <li>Analyzing usage patterns to enhance our platform</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Information Sharing</h2>
            <p className="text-white/80">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Service providers who perform services on our behalf</li>
              <li>Business partners with whom we jointly offer products or services</li>
              <li>Law enforcement or other authorities when required by law</li>
              <li>Third parties in connection with a merger, acquisition, or sale of assets</li>
            </ul>
            <p className="text-white/80">
              We do not sell your personal information to third parties for their marketing purposes.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Data Security</h2>
            <p className="text-white/80">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p className="text-white/80">
              While we use commercially reasonable efforts to safeguard your data, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security of your information.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Your Rights and Choices</h2>
            <p className="text-white/80">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Accessing, correcting, or deleting your personal information</li>
              <li>Withdrawing consent for processing your data</li>
              <li>Requesting restriction of processing or objecting to processing</li>
              <li>Data portability rights</li>
            </ul>
            <p className="text-white/80">
              To exercise these rights, please contact us using the information provided in the "Contact Us" section.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Changes to This Policy</h2>
            <p className="text-white/80">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            <p className="text-white/80">
              You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
