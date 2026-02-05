import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = {
    producto: [
      { label: 'Características', id: 'caracteristicas' },
      { label: 'Cómo funciona', id: 'como-funciona' },
      { label: 'Precios', id: 'precios' },
      { label: 'Casos de éxito', action: () => {} },
      { label: 'Integraciones', action: () => {} }
    ],
    empresa: [
      { label: 'Sobre nosotros', action: () => {} },
      { label: 'Equipo', action: () => {} },
      { label: 'Carreras', action: () => {} },
      { label: 'Blog', action: () => {} },
      { label: 'Contacto', id: 'contacto' }
    ],
    recursos: [
      { label: 'Centro de ayuda', action: () => {} },
      { label: 'FAQ', id: 'faq' },
      { label: 'Documentación', action: () => {} },
      { label: 'API', action: () => {} },
      { label: 'Estado del servicio', action: () => {} }
    ],
    legal: [
      { label: 'Privacidad', action: () => {} },
      { label: 'Términos de uso', action: () => {} },
      { label: 'Cookies', action: () => {} },
      { label: 'GDPR', action: () => {} }
    ]
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold text-white mb-4">Temio</div>
            <p className="text-gray-400 mb-4">
              Convirtiendo ideas en acción desde 2020
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Producto</h3>
            <ul className="space-y-2">
              {footerLinks.producto.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => link.id ? scrollToSection(link.id) : link.action()}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => link.id ? scrollToSection(link.id) : link.action()}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              {footerLinks.recursos.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => link.id ? scrollToSection(link.id) : link.action()}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-2">Suscríbete a nuestro newsletter</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Recibe las últimas novedades y consejos sobre innovación empresarial
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2026 Temio. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <button className="text-gray-400 hover:text-white transition-colors">
                Privacidad
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Términos
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;