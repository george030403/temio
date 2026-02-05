import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const faqs = [
    {
      question: '¿Cómo funciona el periodo de prueba gratuito?',
      answer: 'Ofrecemos 14 días de prueba completamente gratis, sin necesidad de tarjeta de crédito. Tendrás acceso completo a todas las funcionalidades del plan que elijas. Si decides continuar, simplemente añade tu método de pago antes de que termine el periodo de prueba.'
    },
    {
      question: '¿Puedo cambiar de plan en cualquier momento?',
      answer: 'Sí, puedes actualizar o reducir tu plan en cualquier momento. Los cambios se aplicarán inmediatamente y ajustaremos el precio de forma proporcional en tu siguiente factura.'
    },
    {
      question: '¿Qué sucede con mis datos si cancelo?',
      answer: 'Tus datos permanecen seguros con nosotros durante 30 días después de la cancelación, por si decides regresar. Pasado ese tiempo, puedes solicitar una exportación completa de tus datos antes de la eliminación definitiva.'
    },
    {
      question: '¿Temio se integra con otras herramientas?',
      answer: 'Sí, ofrecemos integraciones nativas con Slack, Microsoft Teams, Google Workspace, y muchas otras herramientas. También disponemos de una API REST para integraciones personalizadas en planes Professional y Enterprise.'
    },
    {
      question: '¿Cómo se garantiza la seguridad de la información?',
      answer: 'Utilizamos encriptación de grado bancario (AES-256) para datos en reposo y TLS 1.3 para datos en tránsito. Cumplimos con GDPR, realizamos auditorías de seguridad regulares y ofrecemos SSO en planes Enterprise.'
    },
    {
      question: '¿Cuánto tiempo tarda la implementación?',
      answer: 'La mayoría de empresas están operativas en menos de 24 horas. Incluimos onboarding personalizado con todos los planes, y nuestro equipo te ayudará a configurar la plataforma según tus necesidades específicas.'
    },
    {
      question: '¿Ofrecen soporte en español?',
      answer: 'Sí, nuestro equipo de soporte habla español de forma nativa. Ofrecemos soporte por email en todos los planes, y soporte prioritario por chat y teléfono en planes Professional y Enterprise.'
    },
    {
      question: '¿Puedo personalizar la plataforma con mi marca?',
      answer: 'Sí, todos los planes permiten personalización básica (colores, logo). Los planes Professional y Enterprise incluyen personalización completa de la interfaz, dominios personalizados y white-label.'
    },
    {
      question: '¿Qué pasa si superamos el límite de usuarios?',
      answer: 'Te notificaremos cuando te acerques al límite. Puedes actualizar tu plan fácilmente o contactar a nuestro equipo para soluciones personalizadas. Nunca bloqueamos el acceso sin previo aviso.'
    },
    {
      question: '¿Ofrecen descuentos para ONGs o educación?',
      answer: 'Sí, ofrecemos descuentos especiales del 30-50% para organizaciones sin fines de lucro, instituciones educativas y startups en fase temprana. Contáctanos para más información.'
    }
  ];

  return (
    <section id="faq" ref={ref} className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Todo lo que necesitas saber sobre Temio
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold text-gray-900 hover:text-blue-600 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">¿No encuentras la respuesta que buscas?</p>
          <button
            onClick={() => {
              const element = document.getElementById('contacto');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-blue-600 hover:text-blue-700 font-semibold underline"
          >
            Contacta con nuestro equipo
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;