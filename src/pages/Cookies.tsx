
import React from 'react';

const Cookies = () => {
  return (
    <div className="bg-ryugu-dark text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Cookie Policy</h1>
        
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">What Are Cookies</h2>
            <p className="text-white/80">
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the website owners.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">How We Use Cookies</h2>
            <p className="text-white/80">
              RyugujiFlixStream uses cookies for various purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly and cannot be switched off in our systems.</li>
              <li><strong>Performance Cookies:</strong> These allow us to count visits and traffic sources so we can measure and improve the performance of our site.</li>
              <li><strong>Functional Cookies:</strong> These enable the website to provide enhanced functionality and personalization, such as remembering your preferences.</li>
              <li><strong>Targeting Cookies:</strong> These may be set through our site by our advertising partners to build a profile of your interests and show you relevant ads on other sites.</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Managing Cookies</h2>
            <p className="text-white/80">
              Most web browsers allow some control of cookies through browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit www.allaboutcookies.org.
            </p>
            <p className="text-white/80">
              You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of RyugujiFlixStream may not function properly.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Types of Cookies We Use</h2>
            <table className="w-full border-collapse border border-white/20">
              <thead>
                <tr className="bg-white/10">
                  <th className="border border-white/20 p-2 text-left">Cookie Type</th>
                  <th className="border border-white/20 p-2 text-left">Purpose</th>
                  <th className="border border-white/20 p-2 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-white/20 p-2">Session</td>
                  <td className="border border-white/20 p-2">Keeps you logged in during your visit</td>
                  <td className="border border-white/20 p-2">Session</td>
                </tr>
                <tr>
                  <td className="border border-white/20 p-2">Preferences</td>
                  <td className="border border-white/20 p-2">Remembers your preferred settings</td>
                  <td className="border border-white/20 p-2">1 year</td>
                </tr>
                <tr>
                  <td className="border border-white/20 p-2">Analytics</td>
                  <td className="border border-white/20 p-2">Helps us understand how you use our site</td>
                  <td className="border border-white/20 p-2">2 years</td>
                </tr>
                <tr>
                  <td className="border border-white/20 p-2">Marketing</td>
                  <td className="border border-white/20 p-2">Used to deliver relevant ads</td>
                  <td className="border border-white/20 p-2">90 days</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Third-Party Cookies</h2>
            <p className="text-white/80">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These cookies may track your activities on other websites and build a profile of your interests.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Changes to Our Cookie Policy</h2>
            <p className="text-white/80">
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
