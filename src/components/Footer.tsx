import React from 'react';
import Logo from './Logo';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream border-t-2 border-purple-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Logo size="sm" />
              <span className="text-xl font-bold text-purple-primary">Parenting Pal</span>
            </div>
            <p className="text-purple-primary/80">
              Making parenting magical, one moment at a time.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-purple-primary mb-4">Features</h3>
            <ul className="space-y-2 text-purple-primary/80">
              <li>AI Guidance</li>
              <li>Vaccination Tracking</li>
              <li>Development Analysis</li>
              <li>Expert Community</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-purple-primary mb-4">Company</h3>
            <ul className="space-y-2 text-purple-primary/80">
              <li>About Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-purple-primary mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-purple-primary hover:text-coral-primary cursor-pointer" />
              <Twitter className="w-6 h-6 text-purple-primary hover:text-coral-primary cursor-pointer" />
              <Instagram className="w-6 h-6 text-purple-primary hover:text-coral-primary cursor-pointer" />
              <Youtube className="w-6 h-6 text-purple-primary hover:text-coral-primary cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t-2 border-purple-primary/20 text-center text-purple-primary/80">
          © {currentYear} Parenting Pal. Crafted with love for little dreamers.
        </div>
      </div>
    </footer>
  );
};

export default Footer;