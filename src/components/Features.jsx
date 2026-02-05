import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Briefcase, Lightbulb, MessageSquare, TrendingUp, Award, Shield, Zap } from 'lucide-react';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const employeeFeatures = [
    { icon: Lightbulb, title: 'Proponer ideas fácilmente', description: 'Comparte tus propuestas en segundos con formularios intuitivos' },
    { icon: MessageSquare, title: 'Votar y comentar', description: 'Apoya las mejores ideas y participa en discusiones constructivas' },
    { icon: TrendingUp, title: 'Seguimiento transparente', description: 'Visualiza el progreso de tus ideas en tiempo real' },
    { icon: Award, title: 'Reconocimiento', description: 'Gana puntos y badges por tus contribuciones valiosas' }
  ];

  const companyFeatures = [
    { icon: Users, title: 'Dashboard centralizado', description: 'Visualiza todas las ideas y métricas de participación' },
    { icon: Briefcase, title: 'Gestión de workflow', description: 'Aprueba, implementa y mide el impacto de cada iniciativa' },
    { icon: Shield, title: 'Control y seguridad', description: 'Permisos personalizables y datos protegidos' },
    { icon: Zap, title: 'Insights accionables', description: 'Analítica avanzada para detectar tendencias y oportunidades' }
  ];

  return (
    <section id="caracteristicas" ref={ref} className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Funcionalidades diseñadas para todos
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Una plataforma completa que empodera a empleados y directivos por igual
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Para Empleados */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Para Empleados</h3>
              <p className="text-slate-600">Herramientas intuitivas para que tu voz sea escuchada</p>
            </div>
            <div className="space-y-6">
              {employeeFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-4 p-5 rounded-xl bg-white border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-slate-700" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-1">{feature.title}</h4>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Para Empresa */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Para la Empresa</h3>
              <p className="text-slate-600">Control total y insights poderosos para tomar decisiones</p>
            </div>
            <div className="space-y-6">
              {companyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-4 p-5 rounded-xl bg-white border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-1">{feature.title}</h4>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;