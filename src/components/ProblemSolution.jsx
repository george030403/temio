import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const ProblemSolution = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            De la frustración a la innovación
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Descubre cómo Temio transforma el desafío de capturar ideas en un motor de crecimiento empresarial
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-red-50/80 rounded-2xl p-8 border-2 border-red-100 shadow-soft"
          >
            <div className="flex items-center mb-6">
              <AlertCircle className="w-8 h-8 text-red-600 mr-3" />
              <h3 className="text-2xl font-bold text-slate-900">El Problema</h3>
            </div>
            <ul className="space-y-4">
              {[
                'Las mejores ideas se pierden en correos y reuniones',
                'Los empleados no se sienten escuchados',
                'La innovación queda bloqueada en silos departamentales',
                'No hay visibilidad sobre el impacto de las sugerencias',
                'Baja participación y compromiso del equipo'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl font-semibold">✗</span>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-emerald-50/80 rounded-2xl p-8 border-2 border-emerald-100 shadow-soft"
          >
            <div className="flex items-center mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-600 mr-3" />
              <h3 className="text-2xl font-bold text-slate-900">La Solución Temio</h3>
            </div>
            <ul className="space-y-4">
              {[
                'Centraliza todas las ideas en una plataforma intuitiva',
                'Cada voz importa: vota, comenta y colabora',
                'Transparencia total: seguimiento de principio a fin',
                'Reconocimiento automático a los mejores colaboradores',
                'Datos en tiempo real para decisiones informadas'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-emerald-500 mr-3 text-xl font-semibold">✓</span>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;