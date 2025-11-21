import { Link, useLocation } from 'react-router-dom';
import { Rss, User, LayoutDashboard, Globe, DollarSign } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';

export function Navbar() {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { isAuthenticated, user } = useAuth();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sv' : 'en');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-amber-600 rounded-lg" />
            <span className="text-xl">EventHub</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/about"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/about') ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <span className="hidden md:inline">Om Oss</span>
              <span className="md:hidden">Om</span>
            </Link>

            <Link
              to="/pricing"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/pricing') ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <DollarSign className="w-5 h-5" />
              <span className="hidden md:inline">{t('pricing')}</span>
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/feed"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive('/feed') ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <Rss className="w-5 h-5" />
                  <span className="hidden md:inline">{t('feed')}</span>
                </Link>

                {user?.isOrganizer && (
                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive('/dashboard') ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="hidden md:inline">{t('dashboard')}</span>
                  </Link>
                )}

                <Link
                  to="/profile"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive('/profile') ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline">{t('profile')}</span>
                </Link>
              </>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </Button>

            {!isAuthenticated && (
              <Link to="/signin">
                <Button>{t('signIn')}</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}