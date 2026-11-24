import React from 'react';
import { useApp } from '../../../context/AppContext';
import { useFlutterWeb } from '../../../hooks/useFlutterWeb';
import { Button } from '../../common/Button';
import { Badge } from '../../common/Badge';
import { MascotCard } from './MascotCard';
import { 
  Zap, 
  ExternalLink, 
  Calculator, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  ArrowRight,
  User,
  Wrench
} from 'lucide-react';

export const HeroSection = () => {
  const { openFlutterApp, openEstimator } = useApp();
  const { goToRole } = useFlutterWeb();

  return (
    <section
      style={{
        padding: '3.5rem 0 4.5rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '3.5rem'
          }}
        >
          {/* Columna Izquierda: Texto y CTAs */}
          <div>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
              <Badge variant="yellow" icon={Sparkles}>
                Servicios a Domicilio Inmediatos
              </Badge>
              <Badge variant="green" icon={ShieldCheck}>
                Técnicos 100% Verificados
              </Badge>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
                lineHeight: 1.05,
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                color: 'var(--color-navy)',
                marginBottom: '1.2rem'
              }}
            >
              SOLUCIONES PARA <span style={{ color: 'var(--color-red-text)' }}>TU HOGAR</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
                fontWeight: '700',
                color: 'var(--color-navy)',
                marginBottom: '1rem',
                fontFamily: 'var(--font-display)'
              }}
            >
              Expertos verificados en quienes puedes confiar.
            </p>

            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--color-navy-muted)',
                lineHeight: 1.6,
                marginBottom: '2.2rem',
                maxWidth: '540px'
              }}
            >
              ¿Fugas de agua, apagones, puertas atascadas o arreglos pendientes? 
              Encuentra al profesional ideal con atención personalizada y garantía asegurada en cada trabajo.
            </p>

            {/* Botones de Acción Prominentes */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
                marginBottom: '2.5rem'
              }}
            >
              {/* Botón Principal: Ingresar a la App Web Flutter */}
              <Button
                variant="primary"
                size="xl"
                icon={Zap}
                iconRight={ExternalLink}
                onClick={() => openFlutterApp()}
                title="Ir a la aplicación web de MANI"
              >
                Ingresar a la App Web
              </Button>

              {/* Botón Secundario: Solicitar Servicio */}
              <Button
                variant="secondary"
                size="lg"
                onClick={() => openEstimator('plomeria')}
              >
                Solicitar Servicio
              </Button>
            </div>

            {/* Entrada por rol (SCRUM-1647): cada rol llega al acceso de la app que le corresponde */}
            <div
              role="group"
              aria-label="Entrar según tu rol"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                alignItems: 'center',
                marginBottom: '2.5rem'
              }}
            >
              <span style={{ fontWeight: '800', color: 'var(--color-navy)' }}>¿Cómo quieres entrar?</span>
              <Button variant="outline" size="md" icon={User} onClick={() => goToRole('cliente')} title="Entrar a MANI como cliente">
                Soy cliente
              </Button>
              <Button variant="navy" size="md" icon={Wrench} onClick={() => goToRole('aliado')} title="Entrar a MANI como aliado técnico">
                Soy aliado
              </Button>
            </div>

            {/* Garantías Rápidas en fila */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '2px dashed rgba(27, 42, 74, 0.2)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Clock size={20} color="var(--color-red)" />
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-navy)' }}>
                  Asignación en &lt; 30 min
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <ShieldCheck size={20} color="#10B981" />
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-navy)' }}>
                  Garantía de Satisfacción
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Zap size={20} color="var(--color-navy)" fill="var(--color-yellow)" />
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-navy)' }}>
                  Atención Inmediata
                </span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta / Sticker Oficial de la Mascota */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MascotCard />
          </div>
        </div>
      </div>
    </section>
  );
};
