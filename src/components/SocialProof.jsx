import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Building2 } from 'lucide-react';

const SocialProof = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      quote: "Temio transformó completamente nuestra cultura de innovación. En 6 meses implementamos más ideas que en los últimos 3 años combinados.",
      author: "María González",
      role: "Directora de Innovación",
      company: "TechCorp",
      rating: 5
    },
    {
      quote: "La plataforma es increíblemente intuitiva. Nuestros empleados la adoptaron en días y el engagement subió un 68%. Una inversión que vale cada euro.",
      author: "Carlos Rodríguez",
      role: "CEO",
      company: "RetailPlus",
      rating: 5
    },
    {
      quote: "Finalmente tenemos visibilidad sobre todas las ideas. El dashboard nos permite priorizar lo que realmente importa y medir el impacto real.",
      author: "Ana Martínez",
      role: "VP de Recursos Humanos",
      company: "HealthCare+",
      rating: 5
    },
    {
      quote: "El ROI fue evidente desde el primer mes. Las ideas de mejora de procesos nos ahorraron más de €50,000 en el primer trimestre.",
      author: "Pedro López",
      role: "Director de Operaciones",
      company: "LogiFlow",
      rating: 5
    }
  ];

  const metrics = [
    { value: '500+', label: 'Empresas confían en Temio' },
    { value: '50,000+', label: 'Empleados activos' },
    { value: '10M+', label: 'Ideas procesadas' },
    { value: '92%', label: 'Satisfacción del cliente' }
  ];

  const companies = ['TechCorp', 'RetailPlus', 'EduFuture', 'HealthCare+', 'LogiFlow', 'InnovateLab'];

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
            Empresas que ya están innovando
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre por qué líderes de todos los sectores eligen Temio
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{metric.value}</div>
              <div className="text-gray-600">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-blue-600">{testimonial.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-600 mb-8">Empresas que confían en Temio</p>
          <div className="flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto">
            {companies.map((company, index) => (
              <div
                key={index}
                className="flex items-center justify-center bg-gray-100 rounded-lg px-8 py-4 hover:bg-gray-200 transition-colors"
              >
                <Building2 className="w-6 h-6 text-gray-400 mr-2" />
                <span className="font-semibold text-gray-700">{company}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;