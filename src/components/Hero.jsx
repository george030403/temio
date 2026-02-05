import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1651009188116-bb5f80eaf6aa"
          alt="Team collaboration"
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/5 via-transparent to-slate-600/5"></div>
      </div>

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Cada voz cuenta,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900">
                cada idea puede convertirse en acción
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Transforma las ideas de tu equipo en innovaciones reales. Temio es la plataforma que impulsa la participación, 
            acelera la innovación y fortalece el compromiso de tus empleados.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={() => scrollToSection('contacto')}
              size="lg"
              className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white text-lg px-10 py-7 rounded-xl shadow-soft-lg hover:shadow-xl transition-all duration-300 group font-semibold"
            >
              Solicitar Demo
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollToSection('demo')}
              size="lg"
              variant="outline"
              className="text-lg px-10 py-7 rounded-xl group border-2 border-slate-300 hover:border-slate-700 hover:bg-slate-50 text-slate-700 font-semibold"
            >
              <Play className="mr-2 group-hover:scale-110 transition-transform" />
              Ver cómo funciona
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {[
              { value: '500+', label: 'Empresas' },
              { value: '50K+', label: 'Empleados activos' },
              { value: '10M+', label: 'Ideas procesadas' },
              { value: '92%', label: 'Satisfacción' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;