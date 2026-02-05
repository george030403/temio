import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle } from 'lucide-react';

const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({ email: '', company: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "¡Solicitud enviada!",
      description: "Nuestro equipo te contactará en menos de 24 horas.",
    });
    setFormData({ email: '', company: '' });
  };

  return (
    <section id="contacto" ref={ref} className="py-24 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Empieza a transformar tu empresa hoy
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Únete a cientos de empresas que ya están convirtiendo ideas en acción con Temio
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Email corporativo *
                    </Label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="tu@empresa.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-gray-700 font-medium">
                      Nombre de la empresa *
                    </Label>
                    <input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="Tu Empresa S.L."
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6"
                >
                  Solicitar demo gratuita
                </Button>

                <p className="text-sm text-gray-600 text-center">
                  Al enviar este formulario, aceptas recibir comunicaciones de Temio. 
                  Puedes darte de baja en cualquier momento.
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Gracias por tu interés!</h3>
                <p className="text-gray-600 mb-6">
                  Nuestro equipo revisará tu solicitud y te contactará en menos de 24 horas 
                  para programar tu demo personalizada.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Enviar otra solicitud
                </Button>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid md:grid-cols-3 gap-8 text-center text-white"
          >
            <div>
              <div className="text-3xl font-bold mb-2">14 días</div>
              <div className="text-blue-100">Prueba gratuita</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Sin tarjeta</div>
              <div className="text-blue-100">No requiere pago</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Soporte incluido</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;