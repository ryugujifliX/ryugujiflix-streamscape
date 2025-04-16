
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="bg-ryugu-dark text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-white/10 rounded-lg px-6 py-2 bg-white/5">
              <AccordionTrigger className="text-lg font-medium">Is RyugujiFlixStream free to use?</AccordionTrigger>
              <AccordionContent className="text-white/80">
                RyugujiFlixStream offers both free and premium tiers. The free tier gives you access to a limited library with ads, while our premium subscription removes ads and unlocks our full catalog, including exclusive content and early releases.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border border-white/10 rounded-lg px-6 py-2 bg-white/5">
              <AccordionTrigger className="text-lg font-medium">How can I watch on multiple devices?</AccordionTrigger>
              <AccordionContent className="text-white/80">
                You can access RyugujiFlixStream on any device with a web browser. We also offer dedicated apps for iOS, Android, smart TVs, and gaming consoles. Your watchlist and progress sync automatically across all your devices.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border border-white/10 rounded-lg px-6 py-2 bg-white/5">
              <AccordionTrigger className="text-lg font-medium">Can I download episodes for offline viewing?</AccordionTrigger>
              <AccordionContent className="text-white/80">
                Premium subscribers can download episodes for offline viewing on our mobile apps. Downloads remain available for 30 days after you download them, or 48 hours after you start watching.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border border-white/10 rounded-lg px-6 py-2 bg-white/5">
              <AccordionTrigger className="text-lg font-medium">How do I cancel my subscription?</AccordionTrigger>
              <AccordionContent className="text-white/80">
                You can cancel your subscription at any time from your account settings. Your premium access will continue until the end of your current billing period, and you won't be charged again.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border border-white/10 rounded-lg px-6 py-2 bg-white/5">
              <AccordionTrigger className="text-lg font-medium">Do you offer subtitles and dubs?</AccordionTrigger>
              <AccordionContent className="text-white/80">
                Yes! We provide subtitles in multiple languages for all our content. English dubs are available for many popular titles, and we're constantly expanding our dubbed catalog based on user requests.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6" className="border border-white/10 rounded-lg px-6 py-2 bg-white/5">
              <AccordionTrigger className="text-lg font-medium">When are new episodes released?</AccordionTrigger>
              <AccordionContent className="text-white/80">
                For ongoing series, we typically release new episodes within 24 hours of their Japanese broadcast. Premium members get access to simulcast episodes as soon as they're available.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7" className="border border-white/10 rounded-lg px-6 py-2 bg-white/5">
              <AccordionTrigger className="text-lg font-medium">How do I request a specific anime?</AccordionTrigger>
              <AccordionContent className="text-white/80">
                You can submit content requests through our feedback form in the app or on our website. We regularly review user requests when considering new additions to our library.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
