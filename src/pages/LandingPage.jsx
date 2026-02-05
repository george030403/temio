import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProblemSolution from '@/components/ProblemSolution';
import Features from '@/components/Features';
import Benefits from '@/components/Benefits';
import HowItWorks from '@/components/HowItWorks';
import UseCases from '@/components/UseCases';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import SocialProof from '@/components/SocialProof';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

function LandingPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Temio - Convierte ideas en acción | Plataforma de innovación empresarial</title>
        <meta name="description" content="Temio es la plataforma que transforma las ideas de tus empleados en acciones reales. Aumenta la participación, impulsa la innovación y mejora el compromiso de tu equipo." />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <ProblemSolution />
          <Features />
          <Benefits />
          <HowItWorks />
          <UseCases />
          <Pricing />
          <FAQ />
          <SocialProof />
          <FinalCTA />
        </main>
        <Footer />
        
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-slate-700 to-slate-800 text-white p-4 rounded-2xl shadow-soft-lg hover:shadow-xl hover:from-slate-600 hover:to-slate-700 transition-all duration-300 hover:scale-110 border border-slate-600"
            aria-label="Volver arriba"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}
        
        <Toaster />
      </div>
    </>
  );
}

export default LandingPage;
