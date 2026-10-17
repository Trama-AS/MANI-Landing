import React, { useState } from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { ServiceCard } from './ServiceCard';
import { SERVICES_DATA } from '../../../constants/servicesData';
import { useApp } from '../../../context/AppContext';
import { Button } from '../../common/Button';
import { Wrench, Sparkles, ExternalLink, Zap } from 'lucide-react';

export const ServicesSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { openFlutterApp } = useApp();

  const filteredServices = activeFilter === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.id === activeFilter);

  return (
    <section id="servicios" className="section-padding">
      <div className="container">
        <SectionHeading
          kicker="Soluciones Para Tu Hogar"
          badgeIcon={Wrench}
          title="¿Qué necesitas reparar hoy?"
          subtitle="Profesionales especializados y herramientas listas para atender cualquier emergencia o mejora en tu domicilio."
        />

        {/* Botones de filtro de categorías */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.6rem',
            marginBottom: '3rem'
          }}
        >
          <button
            onClick={() => setActiveFilter('all')}
            style={{
              padding: '0.5rem 1.2rem',
              borderRadius: 'var(--radius-pill)',
              border: '2.5px solid var(--color-navy)',
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              fontSize: '0.95rem',
              cursor: 'pointer',
              backgroundColor: activeFilter === 'all' ? 'var(--color-navy)' : 'white',
              color: activeFilter === 'all' ? 'white' : 'var(--color-navy)',
              boxShadow: activeFilter === 'all' ? 'var(--shadow-hover)' : 'var(--shadow-sm)',
              transition: 'var(--transition-bounce)'
            }}
          >
            ⭐ Todos los Servicios
          </button>

          {SERVICES_DATA.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveFilter(service.id)}
              style={{
                padding: '0.5rem 1.2rem',
                borderRadius: 'var(--radius-pill)',
                border: '2.5px solid var(--color-navy)',
                fontFamily: 'var(--font-display)',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                backgroundColor: activeFilter === service.id ? 'var(--color-yellow)' : 'white',
                color: 'var(--color-navy)',
                boxShadow: activeFilter === service.id ? 'var(--shadow-hover)' : 'var(--shadow-sm)',
                transition: 'var(--transition-bounce)'
              }}
            >
              {service.title}
            </button>
          ))}
        </div>

        {/* Cuadrícula de Servicios */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}
        >
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Banner Inferior: CTA Directo a Flutter Web */}
        <div
          style={{
            marginTop: '3.5rem',
            backgroundColor: 'var(--color-cream-card)',
            border: '3px solid var(--color-navy)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            padding: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}
        >
          <div>
            <h4 style={{ fontSize: '1.5rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
              ¿Tienes un arreglo especial o no ves tu categoría?
            </h4>
            <p style={{ color: 'var(--color-navy-muted)', fontSize: '0.95rem' }}>
              Nuestra aplicación web cuenta con catálogo extendido y cotizaciones personalizadas.
            </p>
          </div>

          <Button
            variant="secondary"
            size="lg"
            icon={Zap}
            iconRight={ExternalLink}
            onClick={() => openFlutterApp()}
          >
            Explorar
          </Button>
        </div>
      </div>
    </section>
  );
};
