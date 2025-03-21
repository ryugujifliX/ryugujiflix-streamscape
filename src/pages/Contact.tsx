
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-ryugu-dark text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            <p className="text-white/80">
              Have questions, feedback, or need assistance? We're here to help! Use the form or contact us directly through one of our channels below.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-ryugu-red/20 rounded-full">
                  <Mail className="text-ryugu-red" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="text-white/70">support@ryugujiflix.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-ryugu-red/20 rounded-full">
                  <Phone className="text-ryugu-red" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p className="text-white/70">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-ryugu-red/20 rounded-full">
                  <MessageSquare className="text-ryugu-red" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">Live Chat</h3>
                  <p className="text-white/70">Available 9AM-6PM EST</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 p-6 rounded-lg">
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">Your Name</label>
                <Input id="name" placeholder="John Doe" className="bg-white/10 border-white/20" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                <Input id="email" type="email" placeholder="john@example.com" className="bg-white/10 border-white/20" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium">Subject</label>
                <Input id="subject" placeholder="How can we help?" className="bg-white/10 border-white/20" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">Message</label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us how we can help you..." 
                  className="bg-white/10 border-white/20 min-h-32" 
                />
              </div>
              
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
