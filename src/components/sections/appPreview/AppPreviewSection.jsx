import React, { useState } from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { PhoneDevice } from './PhoneDevice';
import { APP_SCREENS_DATA } from '../../../constants/appScreensData';
import { Button } from '../../common/Button';
import { Badge } from '../../common/Badge';
import { useApp } from '../../../context/AppContext';
import { 
  Smartphone, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Zap, 
  CheckCircle2 
} from 'lucide-react';

export const AppPreviewSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { openFlutterApp } = useApp();

  const currentScreen = APP_SCREENS_DATA[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % APP_SCREENS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + APP_SCREENS_DATA.length) % APP_SCREENS_DATA.length);
  };

  return (
    <section
      id="app-preview"
      style={{
        padding: '5rem 0',
        backgroundColor: 'var(--color-cream-soft)',
        borderTop: '3px solid var(--color-navy)',
        borderBottom: '3px solid var(--color-navy)'
      }}
    >
      <div className="container">
        <SectionHeading
          kicker="Diseñada Para Ser Fácil"
          badgeIcon={Smartphone}
          title="Tu Solución en 5 Pasos"
          subtitle="Explora la experiencia de usuario real de MANI: desde que eliges tu problema hasta que el técnico llega a tu puerta."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '3.5rem'
          }}
        >
          {/* Columna Izquierda: Teléfono Interactivo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PhoneDevice
              currentScreen={currentScreen}
              onNext={handleNext}
              onPrev={handlePrev}
            />

            {/* Controles de navegación móvil abajo del teléfono */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginTop: '1.5rem'
              }}
            >
              <button
                onClick={handlePrev}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '2.5px solid var(--color-navy)',
                  backgroundColor: 'white',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                aria-label="Pantalla anterior"
              >
                <ChevronLeft size={22} />
              </button>

              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {APP_SCREENS_DATA.map((screen, idx) => (
                  <button
                    key={screen.id}
                    onClick={() => setCurrentIndex(idx)}
                    style={{
                      width: idx === currentIndex ? '28px' : '10px',
                      height: '10px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: idx === currentIndex ? 'var(--color-red)' : 'var(--color-navy)',
                      opacity: idx === currentIndex ? 1 : 0.3,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    aria-label={`Ver pantalla ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '2.5px solid var(--color-navy)',
                  backgroundColor: 'white',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                aria-label="Siguiente pantalla"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          {/* Columna Derecha: Detalle de la Pantalla y Selector de Pasos */}
          <div>
            {/* Lista interactiva de Pasos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2.5rem' }}>
              {APP_SCREENS_DATA.map((screen, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <div
                    key={screen.id}
                    onClick={() => setCurrentIndex(idx)}
                    style={{
                      padding: '1rem 1.4rem',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected ? '3px solid var(--color-navy)' : '2px solid rgba(27, 42, 74, 0.2)',
                      backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                      boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                      cursor: 'pointer',
                      transition: 'var(--transition-bounce)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transform: isSelected ? 'translateX(8px)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: isSelected ? 'var(--color-yellow)' : 'var(--color-cream)',
                          border: '2px solid var(--color-navy)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'var(--font-display)',
                          fontWeight: '800',
                          fontSize: '0.9rem'
                        }}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <h4 style={{ fontSize: '1.15rem', color: 'var(--color-navy)', marginBottom: '0.1rem' }}>
                          {screen.title}
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-navy-muted)' }}>
                          {screen.subtitle}
                        </p>
                      </div>
                    </div>

                    <Badge variant={isSelected ? 'red' : 'cream'} size="sm">
                      {screen.highlightTag}
                    </Badge>
                  </div>
                );
              })}
            </div>

            {/* Tarjeta de descripción detallada del paso actual */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '3px solid var(--color-navy)',
                borderRadius: 'var(--radius-md)',
                padding: '1.8rem',
                boxShadow: 'var(--shadow-md)',
                marginBottom: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                <CheckCircle2 size={18} color="#10B981" />
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                  {currentScreen.step} - Flujo de Servicio Garantizado
                </span>
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--color-navy-muted)', lineHeight: 1.6 }}>
                {currentScreen.description}
              </p>
            </div>

            {/* Botón directo a Flutter Web */}
            <div>
              <Button
                variant="primary"
                size="lg"
                icon={Zap}
                iconRight={ExternalLink}
                fullWidth
                onClick={() => openFlutterApp()}
              >
                Probar este Flujo en la App Web
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
