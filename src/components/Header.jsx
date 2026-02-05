import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Características', id: 'caracteristicas' },
    { label: 'Cómo funciona', id: 'como-funciona' },
    { label: 'Precios', id: 'precios' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contacto', id: 'contacto' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-soft backdrop-blur-md border-b border-slate-100' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent"
          >
            Temio
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-slate-700 hover:text-slate-900 transition-colors duration-200 font-medium"
              >
                {link.label}
              </button>
            ))}
            <Link to="/demo/login">
              <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 rounded-xl">
                <Play className="w-4 h-4 mr-2" />
                Probar Demo
              </Button>
            </Link>
            <Button onClick={() => scrollToSection('contacto')} className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 rounded-xl font-semibold shadow-soft">
              Solicitar Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-left"
                >
                  {link.label}
                </button>
              ))}
              <Link to="/demo/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Probar Demo
                </Button>
              </Link>
              <Button onClick={() => scrollToSection('contacto')} className="bg-blue-600 hover:bg-blue-700 w-full">
                Solicitar Demo
              </Button>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;