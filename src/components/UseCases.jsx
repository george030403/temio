import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, ShoppingCart, GraduationCap, Heart } from 'lucide-react';

const UseCases = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const useCases = [
    {
      icon: Building2,
      industry: 'Tecnología',
      company: 'TechCorp',
      result: 'Aumentó innovación en 65%',
      description: 'Implementaron 40 ideas de empleados en 6 meses, mejorando productos y procesos internos.'
    },
    {
      icon: ShoppingCart,
      industry: 'Retail',
      company: 'RetailPlus',
      result: 'Reducción de costos 28%',
      description: 'Ideas de optimización logística generaron ahorros significativos en toda la cadena.'
    },
    {
      icon: GraduationCap,
      industry: 'Educación',
      company: 'EduFuture',
      result: 'Satisfacción 85% profesores',
      description: 'Plataforma mejoró comunicación y permitió implementar mejoras pedagógicas rápidamente.'
    },
    {
      icon: Heart,
      industry: 'Salud',
      company: 'HealthCare+',
      result: 'Mejora atención pacientes',
      description: 'Personal médico propuso cambios que redujeron tiempos de espera en 40%.'
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Casos de éxito
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empresas de todos los sectores están transformando sus equipos con Temio
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100"
            >
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <useCase.icon className="w-7 h-7 text-blue-600" />
              </div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-4">
                {useCase.industry}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{useCase.company}</h3>
              <p className="text-green-600 font-semibold mb-3">{useCase.result}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;