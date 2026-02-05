import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Vote, CheckCircle, Sparkles } from 'lucide-react';

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: FileText,
      title: 'Proponer',
      description: 'Los empleados comparten ideas de forma rápida y estructurada',
      color: 'bg-blue-500'
    },
    {
      icon: Vote,
      title: 'Votar',
      description: 'La comunidad vota y comenta las mejores propuestas',
      color: 'bg-green-500'
    },
    {
      icon: CheckCircle,
      title: 'Evaluar',
      description: 'Los líderes revisan y aprueban ideas alineadas con objetivos',
      color: 'bg-amber-500'
    },
    {
      icon: Sparkles,
      title: 'Implementar',
      description: 'Las ideas se convierten en acciones reales con seguimiento',
      color: 'bg-purple-500'
    }
  ];

  return (
    <section id="como-funciona" ref={ref} className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cómo funciona
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un proceso simple que convierte ideas en innovación
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
                  <div className="flex items-center justify-center mb-6">
                    <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-semibold text-gray-600 mb-3">
                      Paso {index + 1}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;