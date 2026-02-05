import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Rocket, Target, Heart, LineChart } from 'lucide-react';

const Benefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: Rocket,
      title: 'Acelera la innovación',
      description: 'Convierte ideas en realidad 3x más rápido con workflows automatizados',
      color: 'blue'
    },
    {
      icon: Heart,
      title: 'Mejora el compromiso',
      description: 'Aumenta la satisfacción de empleados hasta un 68% con participación activa',
      color: 'green'
    },
    {
      icon: Target,
      title: 'Alinea objetivos',
      description: 'Conecta las ideas de tu equipo con las metas estratégicas de la empresa',
      color: 'amber'
    },
    {
      icon: LineChart,
      title: 'Impulsa resultados',
      description: 'Empresas reportan 45% más innovaciones implementadas en el primer año',
      color: 'purple'
    }
  ];

  const colorClasses = {
    blue: 'from-slate-600 to-slate-700',
    green: 'from-emerald-600 to-emerald-700',
    amber: 'from-amber-500 to-amber-600',
    purple: 'from-slate-700 to-slate-800'
  };

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
            Beneficios que transforman
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Resultados tangibles que impactan directamente en tu empresa
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 border border-slate-100"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorClasses[benefit.color]} flex items-center justify-center mb-6 shadow-soft`}>
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;