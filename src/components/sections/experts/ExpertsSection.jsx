import React from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { ExpertCard } from './ExpertCard';
import { EXPERTS_DATA } from '../../../constants/expertsData';
import { Badge } from '../../common/Badge';
import { ShieldCheck, UserCheck, Award, Heart } from 'lucide-react';

export const ExpertsSection = () => {
  return (
    <section id="expertos" className="section-padding">
      <div className="container">
        <SectionHeading
          kicker="Comunidad de Confianza"
          badgeIcon={UserCheck}
          title="Nuestros Manis Más Recomendados"
          subtitle="Técnicos evaluados por cientos de clientes satisfechos. Puntuales, honestos y con garantía escrita en cada servicio."
        />

        {/* Grid de Expertos */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem'
          }}
        >
          {EXPERTS_DATA.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>

        {/* Barra de verificación y filtros de seguridad */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '3px solid var(--color-navy)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            padding: '2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-yellow)',
                border: '2px solid var(--color-navy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <ShieldCheck size={26} color="var(--color-navy)" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', textTransform: 'uppercase', marginBottom: '0.1rem' }}>
                Filtro de Seguridad
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-navy-muted)' }}>
                Revisión de antecedentes penales y validación de identidad oficial.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-yellow)',
                border: '2px solid var(--color-navy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Award size={26} color="var(--color-navy)" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', textTransform: 'uppercase', marginBottom: '0.1rem' }}>
                Pruebas Técnicas
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-navy-muted)' }}>
                Certificación de experiencia real en plomería, electricidad y carpintería.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-yellow)',
                border: '2px solid var(--color-navy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Heart size={26} color="var(--color-red)" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', textTransform: 'uppercase', marginBottom: '0.1rem' }}>
                Trato Amable y Limpio
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-navy-muted)' }}>
                Protocolos estrictos de respeto al hogar y limpieza al culminar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
