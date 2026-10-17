import React from 'react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { Badge } from '../../common/Badge';
import { useApp } from '../../../context/AppContext';
import { Star, ShieldCheck, Award, ExternalLink } from 'lucide-react';

export const ExpertCard = ({ expert }) => {
  const { openFlutterApp } = useApp();

  return (
    <Card
      shadowType="md"
      padding="1.8rem"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
      }}
    >
      <div>
        {/* Cabecera del Experto: Avatar badge y verificación */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-cream)',
              border: '3px solid var(--color-navy)',
              boxShadow: '3px 3px 0px var(--color-navy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              flexShrink: 0
            }}
          >
            {expert.avatarBadge}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--color-navy)', lineHeight: 1.1 }}>
                {expert.name}
              </h3>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-red)', fontWeight: '700' }}>
              {expert.role}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#B45309', fontWeight: '800', fontSize: '0.9rem' }}>
                <Star size={16} fill="#F59E0B" color="#F59E0B" />
                <span>{expert.rating}</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-navy-muted)' }}>
                ({expert.reviewsCount} reseñas)
              </span>
            </div>
          </div>
        </div>

        {/* Badges de Verificación */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
          <Badge variant="yellow" size="sm" icon={ShieldCheck}>
            Verificado
          </Badge>
          <Badge variant="green" size="sm" icon={Award}>
            Garantía MANI
          </Badge>
        </div>

        {/* Bio */}
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--color-navy-muted)',
            lineHeight: 1.5,
            marginBottom: '1.2rem'
          }}
        >
          {expert.bio}
        </p>

        {/* Especialidades */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.2rem' }}>
          {expert.specialties.map((spec) => (
            <span
              key={spec}
              style={{
                fontSize: '0.75rem',
                backgroundColor: 'var(--color-cream-soft)',
                border: '1.5px solid var(--color-navy)',
                borderRadius: 'var(--radius-pill)',
                padding: '0.15rem 0.55rem',
                fontWeight: '700',
                color: 'var(--color-navy)'
              }}
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Disponibilidad y botón de contratación */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--color-cream-soft)',
            borderRadius: 'var(--radius-sm)',
            border: '2px solid var(--color-navy)',
            marginBottom: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block', boxShadow: '0 0 6px #10B981' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-navy)' }}>
              Disponible Hoy
            </span>
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-navy-muted)' }}>
            Llegada en &lt; 30 min
          </span>
        </div>

        <Button
          variant="primary"
          size="md"
          fullWidth
          iconRight={ExternalLink}
          onClick={() => openFlutterApp(`experts/${expert.id}`)}
        >
          Reservar con {expert.name}
        </Button>
      </div>
    </Card>
  );
};
