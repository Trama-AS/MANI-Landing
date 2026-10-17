import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FlutterSettingsBar } from './components/layout/FlutterSettingsBar';
import { QuickEstimatorModal } from './components/sections/estimator/QuickEstimatorModal';

import { HeroSection } from './components/sections/hero/HeroSection';
import { BrandValuesSection } from './components/sections/brand/BrandValuesSection';
import { ServicesSection } from './components/sections/services/ServicesSection';
import { HowItWorksSection } from './components/sections/howItWorks/HowItWorksSection';
import { AppPreviewSection } from './components/sections/appPreview/AppPreviewSection';
import { ExpertsSection } from './components/sections/experts/ExpertsSection';
import { MascotVideoSection } from './components/sections/video/MascotVideoSection';
import { TestimonialsSection } from './components/sections/testimonials/TestimonialsSection';
import { CallToActionBanner } from './components/sections/cta/CallToActionBanner';

// Componente interno para mostrar el Toast flotante
const ToastNotification = () => {
  const { toastMessage } = useApp();
  if (!toastMessage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9999,
        backgroundColor: 'var(--color-navy)',
        color: '#FFFFFF',
        border: '3px solid var(--color-yellow)',
        borderRadius: 'var(--radius-pill)',
        padding: '0.9rem 1.6rem',
        boxShadow: 'var(--shadow-lg)',
        fontFamily: 'var(--font-display)',
        fontWeight: '700',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        animation: 'pulseSubtle 0.3s ease'
      }}
    >
      {toastMessage}
    </div>
  );
};

// Contenido principal de la Landing Page
const LandingContent = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <HeroSection />
        <BrandValuesSection />
        <ServicesSection />
        <HowItWorksSection />
        <AppPreviewSection />
        <ExpertsSection />
        <MascotVideoSection />
        <TestimonialsSection />
        <CallToActionBanner />
      </main>
      <Footer />

      {/* Modales y Notificaciones Globales */}
      <QuickEstimatorModal />
      <FlutterSettingsBar />
      <ToastNotification />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <LandingContent />
    </AppProvider>
  );
}

export default App;
