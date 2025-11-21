import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-amber-600 rounded-lg" />
              <span className="text-xl text-white">EventHub</span>
            </Link>
            <p className="text-sm text-gray-400">
              Upptäck och boka de bästa kulturupplevelserna i Stockholm. Teater, balett, konst och mycket mer.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Snabblänkar</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-orange-500 transition-colors">
                  Hem
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-orange-500 transition-colors">
                  Om Oss
                </Link>
              </li>
              <li>
                <Link to="/feed" className="text-sm hover:text-orange-500 transition-colors">
                  Flöde
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm hover:text-orange-500 transition-colors">
                  Arrangörspanel
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white mb-4">Kategorier</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/?category=theater" className="text-sm hover:text-orange-500 transition-colors">
                  Teater
                </Link>
              </li>
              <li>
                <Link to="/?category=ballet" className="text-sm hover:text-orange-500 transition-colors">
                  Balett
                </Link>
              </li>
              <li>
                <Link to="/?category=opera" className="text-sm hover:text-orange-500 transition-colors">
                  Opera
                </Link>
              </li>
              <li>
                <Link to="/?category=arts" className="text-sm hover:text-orange-500 transition-colors">
                  Konst & Kultur
                </Link>
              </li>
              <li>
                <Link to="/?category=music" className="text-sm hover:text-orange-500 transition-colors">
                  Musik
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white mb-4">Följ Oss</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">Kontakt</p>
              <p className="text-sm">info@eventhub.se</p>
              <p className="text-sm">+46 8 123 456 78</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2025 EventHub. Alla rättigheter förbehållna.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm hover:text-orange-500 transition-colors">
              Integritetspolicy
            </Link>
            <Link to="/terms" className="text-sm hover:text-orange-500 transition-colors">
              Användarvillkor
            </Link>
            <Link to="/cookies" className="text-sm hover:text-orange-500 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
