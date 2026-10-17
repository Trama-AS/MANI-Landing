import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Button } from '../../common/Button';
import { Zap, ExternalLink, Calculator, ShieldCheck, Check } from 'lucide-react';

export const CallToActionBanner = () => {
  const { openFlutterApp, openEstimator } = useApp();

  return (
    <section style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container">
        <div
          style={{
            backgroundColor: 'var(--color-navy)',
            backgroundImage: 'radial-gradient(rgba(242, 183, 5, 0.15) 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px',
            color: '#FFFFFF',
            border: '4px solid var(--color-navy)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '10px 10px 0px var(--color-yellow)',
            padding: '4rem 2.5rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Badge superior */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--color-red)', color: 'white', padding: '0.4rem 1.2rem', borderRadius: 'var(--radius-pill)', border: '2px solid white', fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '0.9rem', marginBottom: '1.5rem', textTransform: 'uppercase', boxShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>
            <Zap size={16} />
            <span>Disponible Ahora en Tu Ciudad</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              lineHeight: 1.1,
              maxWidth: '850px',
              margin: '0 auto 1.2rem auto'
            }}
          >
            ¿TIENES UNA EMERGENCIA O QUIERES RENOVAR TU CASA?
          </h2>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
              color: '#E2E8F0',
              maxWidth: '680px',
              margin: '0 auto 2.5rem auto',
              lineHeight: 1.6
            }}
          >
            Haz clic abajo para ingresar a la versión interactiva de MANI en la web y conectar con un técnico verificado en menos de 2 minutos.
          </p>

          {/* Botones de acción principales */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1.2rem',
              marginBottom: '2.5rem'
            }}
          >
            <Button
              variant="primary"
              size="xl"
              icon={Zap}
              iconRight={ExternalLink}
              onClick={() => openFlutterApp()}
            >
              Ingresar a la App Web Ahora
            </Button>

            <Button
              variant="secondary"
              size="xl"
              onClick={() => openEstimator('plomeria')}
            >
              Solicitar Asistencia
            </Button>
          </div>

          {/* Micro garantías */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '2rem',
              color: 'var(--color-yellow)',
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              fontSize: '0.95rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Check size={18} />
              <span>Sin costos de suscripción</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={18} />
              <span>Garantía respaldada MANI</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Check size={18} />
              <span>Diagnóstico claro y acordado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
