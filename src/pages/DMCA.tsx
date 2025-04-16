
import React from 'react';

const DMCA = () => {
  return (
    <div className="bg-ryugu-dark text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">DMCA Policy</h1>
        
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Digital Millennium Copyright Act Notice</h2>
            <p className="text-white/80">
              RyugujiFlixStream respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998 ("DMCA"), we will respond expeditiously to claims of copyright infringement committed using our service.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">DMCA Notification Process</h2>
            <p className="text-white/80">
              If you are a copyright owner, or authorized to act on behalf of one, and you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please submit a notification containing the following information:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-white/80">
              <li>A physical or electronic signature of a person authorized to act on behalf of the owner of the copyright that has been allegedly infringed;</li>
              <li>Identification of the copyrighted work claimed to have been infringed;</li>
              <li>Identification of the material that is claimed to be infringing and information reasonably sufficient to permit RyugujiFlixStream to locate the material;</li>
              <li>Your contact information, including address, telephone number, and email address;</li>
              <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and</li>
              <li>A statement, under penalty of perjury, that the information in the notification is accurate and that you are authorized to act on behalf of the copyright owner.</li>
            </ol>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Submit DMCA Notices to:</h2>
            <div className="bg-white/5 p-6 rounded-lg">
              <p className="text-white/80">DMCA Compliance Officer</p>
              <p className="text-white/80">RyugujiFlixStream</p>
              <p className="text-white/80">Email: dmca@ryugujiflix.com</p>
              <p className="text-white/80">Address: 123 Anime Street, Tokyo, Japan 100-0001</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Counter-Notification</h2>
            <p className="text-white/80">
              If you believe that your content that was removed (or to which access was disabled) is not infringing, or that you have the authorization from the copyright owner, the copyright owner's agent, or pursuant to the law, to post and use the material in your content, you may send a counter-notification containing the following information:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-white/80">
              <li>Your physical or electronic signature;</li>
              <li>Identification of the content that has been removed or to which access has been disabled and the location at which the content appeared before it was removed or disabled;</li>
              <li>A statement that you have a good faith belief that the content was removed or disabled as a result of mistake or a misidentification of the content; and</li>
              <li>Your name, address, telephone number, and email address, and a statement that you consent to the jurisdiction of the federal court in the district where you reside and that you will accept service of process from the person who provided notification of the alleged infringement.</li>
            </ol>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Repeat Infringers</h2>
            <p className="text-white/80">
              It is our policy to terminate the accounts of users who repeatedly infringe copyright in appropriate circumstances.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DMCA;
