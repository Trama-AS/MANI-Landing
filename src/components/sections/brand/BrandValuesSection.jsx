import React from 'react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { SectionHeading } from '../../common/SectionHeading';
import { BRAND_VALUES } from '../../../constants/brandData';
import { ShieldCheck, Zap, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';

export const BrandValuesSection = () => {
  const getIcon = (iconName, color) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck size={36} color={color} />;
      case 'Zap':
        return <Zap size={36} color={color} />;
      case 'HeartHandshake':
      default:
        return <HeartHandshake size={36} color={color} />;
    }
  };

  return (
    <section
      style={{
        padding: '4rem 0',
        backgroundColor: 'var(--color-cream-soft)',
        borderTop: '3px solid var(--color-navy)',
        borderBottom: '3px solid var(--color-navy)'
      }}
    >
      <div className="container">
        <SectionHeading
          kicker="Personalidad de Marca"
          badgeIcon={Sparkles}
          title="El ADN de MANI"
          subtitle="Diseñado para resolver con seguridad, rapidez y el trato humano que mereces."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '2rem'
          }}
        >
          {BRAND_VALUES.map((val) => (
            <Card
              key={val.id}
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
                {/* Header de la tarjeta con Icono y Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem'
                  }}
                >
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
                      boxShadow: '3px 3px 0px var(--color-navy)'
                    }}
                  >
                    {getIcon(val.iconName, val.accentColor)}
                  </div>
                  <Badge variant="cream">{val.badge}</Badge>
                </div>

                {/* Título y Subtítulo */}
                <h3
                  style={{
                    fontSize: '1.75rem',
                    textTransform: 'uppercase',
                    color: 'var(--color-navy)',
                    marginBottom: '0.4rem'
                  }}
                >
                  {val.title}
                </h3>

                <h4
                  style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: val.accentColor,
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  {val.subtitle}
                </h4>

                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--color-navy-muted)',
                    lineHeight: 1.6
                  }}
                >
                  {val.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: '1.5rem',
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
                <CheckCircle2 size={16} color="#10B981" />
                <span>Compromiso verificado en cada servicio</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
