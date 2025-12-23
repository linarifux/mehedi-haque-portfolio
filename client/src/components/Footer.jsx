import { Facebook, Linkedin, Instagram, Twitter, Mail, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & Bio */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white font-serif tracking-tighter mb-4">
              MEHEDI<span className="text-red-600">.</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              The official digital archive of Mehedi Haque. Documenting over two decades 
              of political satire, comic strips, and character design. 
              Executive Editor of <em>Unmad</em> & Founder of <em>Dhaka Comics</em>.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Political Satire</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Comic Strips</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Character Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dhaka Comics</a></li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h3 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">
              Connect
            </h3>
            <div className="flex space-x-4">
              {/* Actual Social Links (Placeholders based on your images) */}
              <a href="https://www.facebook.com/mehedihaquecartoons" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.linkedin.com/in/mehedi-haque" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.behance.net/mehedihaque" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Globe size={20} /> {/* Behance icon alternative */}
              </a>
              <a href="mailto:mehedihque@gmail.com" className="text-gray-400 hover:text-red-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              Open for collaborations and workshops.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {currentYear} Mehedi Haque. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="/login" className="hover:text-white transition-colors">Admin Login</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;