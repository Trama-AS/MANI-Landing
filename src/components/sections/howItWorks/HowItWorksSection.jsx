import React from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import { useApp } from '../../../context/AppContext';
import { 
  ClipboardList, 
  UserCheck, 
  Smile, 
  ArrowRight, 
  ExternalLink, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';

export const HowItWorksSection = () => {
  const { openFlutterApp } = useApp();

  const steps = [
    {
      num: '01',
      title: 'Describe el Problema',
      subtitle: 'En menos de 60 segundos',
      description: 'Elige la especialidad requerida (plomería, cables, muebles, cerrajería) y dinos qué ocurre. Puedes agregar fotos o notas adicionales.',
      icon: ClipboardList,
      color: '#3B82F6',
      badge: 'Fácil & Rápido'
    },
    {
      num: '02',
      title: 'Conecta con tu Mani',
      subtitle: 'Técnico verificado en tu zona',
      description: 'Te asignamos a un especialista certificado con calificación superior a 4.7★ y herramientas listas para tu solución a domicilio.',
      icon: UserCheck,
      color: '#F59E0B',
      badge: '100% Filtrado'
    },
    {
      num: '03',
      title: '¡Servicio Solucionado!',
      subtitle: 'Tranquilidad y garantía',
      description: 'Tu Mani llega puntual con sus herramientas, realiza el trabajo y tú pagas de forma 100% segura con garantía de satisfacción.',
      icon: Smile,
      color: '#10B981',
      badge: 'Garantía MANI'
    }
  ];

  return (
    <section id="como-funciona" className="section-padding">
      <div className="container">
        <SectionHeading
          kicker="Proceso Sencillo"
          badgeIcon={Zap}
          title="¿Cómo Funciona MANI?"
          subtitle="Olvídate del estrés de buscar técnicos desconocidos. En 3 pasos tienes a un experto en tu puerta."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            position: 'relative',
            marginBottom: '3.5rem'
          }}
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.num}
                shadowType="md"
                padding="2.2rem 1.8rem"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%'
                }}
              >
                <div>
                  {/* Top Bar con Número y Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: 'var(--color-navy)',
                        lineHeight: 1
                      }}
                    >
                      {step.num}
                    </span>
                    <Badge variant="yellow">{step.badge}</Badge>
                  </div>

                  {/* Icono */}
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
                      backgroundColor: 'var(--color-cream)',
                      border: '2.5px solid var(--color-navy)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '3px 3px 0px var(--color-navy)',
                      marginBottom: '1.2rem'
                    }}
                  >
                    <Icon size={32} color="var(--color-navy)" />
                  </div>

                  {/* Títulos */}
                  <h3
                    style={{
                      fontSize: '1.5rem',
                      textTransform: 'uppercase',
                      color: 'var(--color-navy)',
                      marginBottom: '0.3rem'
                    }}
                  >
                    {step.title}
                  </h3>

                  <h4
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      color: 'var(--color-red)',
                      marginBottom: '1rem',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    {step.subtitle}
                  </h4>

                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: 'var(--color-navy-muted)',
                      lineHeight: 1.6
                    }}
                  >
                    {step.description}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '1.8rem',
                    paddingTop: '1rem',
                    borderTop: '2px dashed #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    color: 'var(--color-navy)'
                  }}
                >
                  <ShieldCheck size={16} color="#10B981" />
                  <span>Sin anticipos fraudulentos</span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call to action centrado */}
        <div style={{ textAlign: 'center' }}>
          <Button
            variant="primary"
            size="lg"
            icon={Zap}
            iconRight={ExternalLink}
            onClick={() => openFlutterApp()}
          >
            Iniciar una Solicitud en la App Web
          </Button>
        </div>
      </div>
    </section>
  );
};
