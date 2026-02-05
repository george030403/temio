import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 99,
      description: 'Perfecto para equipos pequeños que comienzan',
      features: [
        'Hasta 50 usuarios',
        'Ideas ilimitadas',
        'Votación y comentarios',
        'Dashboard básico',
        'Soporte por email'
      ]
    },
    {
      name: 'Professional',
      monthlyPrice: 249,
      description: 'Para empresas en crecimiento',
      features: [
        'Hasta 200 usuarios',
        'Todo de Starter, más:',
        'Analítica avanzada',
        'Integraciones (Slack, Teams)',
        'Gestión de workflow',
        'Soporte prioritario'
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      monthlyPrice: null,
      description: 'Soluciones personalizadas',
      features: [
        'Usuarios ilimitados',
        'Todo de Professional, más:',
        'SSO y seguridad avanzada',
        'API personalizada',
        'Gestor de cuenta dedicado',
        'SLA garantizado'
      ]
    }
  ];

  const calculatePrice = (monthlyPrice) => {
    if (!monthlyPrice) return 'Personalizado';
    return isAnnual ? Math.round(monthlyPrice * 12 * 0.8) : monthlyPrice;
  };

  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="precios" ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Planes que se adaptan a ti
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comienza gratis por 14 días, sin tarjeta de crédito
          </p>

          <div className="flex items-center justify-center gap-4 mb-2">
            <span className={`font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Mensual
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                isAnnual ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  isAnnual ? 'translate-x-8' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Anual
            </span>
          </div>
          {isAnnual && (
            <p className="text-green-600 font-semibold">
              ✨ Ahorra hasta €600/año con el plan anual
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl scale-105 border-4 border-blue-400'
                  : 'bg-white border-2 border-gray-200 hover:border-blue-300 shadow-lg'
              } transition-all duration-300 hover:scale-105`}
            >
              {plan.highlighted && (
                <span className="inline-block px-4 py-1 bg-amber-400 text-gray-900 rounded-full text-sm font-semibold mb-4">
                  Más popular
                </span>
              )}
              
              <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <p className={`mb-6 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                {plan.description}
              </p>
              
              <div className="mb-6">
                {plan.monthlyPrice ? (
                  <>
                    <div className="flex items-baseline">
                      <span className={`text-5xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                        €{calculatePrice(plan.monthlyPrice)}
                      </span>
                      <span className={`ml-2 ${plan.highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
                        /{isAnnual ? 'año' : 'mes'}
                      </span>
                    </div>
                    {isAnnual && (
                      <p className={`text-sm mt-1 ${plan.highlighted ? 'text-blue-100' : 'text-gray-500'}`}>
                        €{Math.round(calculatePrice(plan.monthlyPrice) / 12)}/mes facturado anualmente
                      </p>
                    )}
                  </>
                ) : (
                  <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    Personalizado
                  </span>
                )}
              </div>

              <Button
                onClick={scrollToContact}
                className={`w-full mb-6 ${
                  plan.highlighted
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {plan.monthlyPrice ? 'Comenzar prueba' : 'Contactar ventas'}
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className={`w-5 h-5 mr-2 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-blue-200' : 'text-green-500'}`} />
                    <span className={plan.highlighted ? 'text-blue-50' : 'text-gray-700'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-gray-600 mt-12">
          Todos los planes incluyen 14 días de prueba gratuita • Sin compromiso • Cancela cuando quieras
        </p>
      </div>
    </section>
  );
};

export default Pricing;