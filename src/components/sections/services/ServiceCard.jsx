import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { Badge } from '../../common/Badge';
import { 
  Droplets, 
  Zap, 
  Hammer, 
  Wrench, 
  KeyRound, 
  Paintbrush, 
  Clock, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const ServiceCard = ({ service }) => {
  const { openEstimator, openFlutterApp } = useApp();

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Droplets': return <Droplets size={32} color="var(--color-navy)" />;
      case 'Zap': return <Zap size={32} color="var(--color-navy)" />;
      case 'Hammer': return <Hammer size={32} color="var(--color-navy)" />;
      case 'Wrench': return <Wrench size={32} color="var(--color-navy)" />;
      case 'KeyRound': return <KeyRound size={32} color="var(--color-navy)" />;
      case 'Paintbrush': return <Paintbrush size={32} color="var(--color-navy)" />;
      default: return <Wrench size={32} color="var(--color-navy)" />;
    }
  };

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
        {/* Cabecera con icono estilizado y badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.2rem'
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              backgroundColor: 'var(--color-yellow)',
              border: '2.5px solid var(--color-navy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '3px 3px 0px var(--color-navy)'
            }}
          >
            {getServiceIcon(service.iconName)}
          </div>
          <Badge variant="yellow">{service.badge}</Badge>
        </div>

        {/* Títulos */}
        <h3
          style={{
            fontSize: '1.6rem',
            textTransform: 'uppercase',
            color: 'var(--color-navy)',
            marginBottom: '0.3rem'
          }}
        >
          {service.title}
        </h3>

        <h4
          style={{
            fontSize: '0.95rem',
            fontWeight: '700',
            color: 'var(--color-red)',
            marginBottom: '0.8rem',
            fontFamily: 'var(--font-body)'
          }}
        >
          {service.subtitle}
        </h4>

        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--color-navy-muted)',
            lineHeight: 1.5,
            marginBottom: '1.2rem'
          }}
        >
          {service.description}
        </p>

        {/* Etiquetas de problemas comunes */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {service.popularTags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.75rem',
                backgroundColor: 'var(--color-cream)',
                border: '1.5px solid var(--color-navy)',
                borderRadius: 'var(--radius-pill)',
                padding: '0.2rem 0.6rem',
                fontWeight: '600',
                color: 'var(--color-navy)'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bloque inferior: Información y botones de acción */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.8rem 1rem',
            backgroundColor: 'var(--color-cream-soft)',
            borderRadius: 'var(--radius-sm)',
            border: '2px solid var(--color-navy)',
            marginBottom: '1.2rem'
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-navy-muted)', display: 'block', fontWeight: '600' }}>
              Modalidad
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: '800', color: 'var(--color-navy)' }}>
              A Domicilio
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--color-navy)', fontWeight: '700' }}>
            <Clock size={14} />
            <span>{service.estimatedTime}</span>
          </div>
        </div>

        {/* Botones de acción */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() => openEstimator(service.id)}
          >
            Solicitar Presupuesto
          </Button>

          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconRight={ExternalLink}
            onClick={() => openFlutterApp(`?service=${service.id}`)}
          >
            Explorar
          </Button>
        </div>
      </div>
    </Card>
  );
};
