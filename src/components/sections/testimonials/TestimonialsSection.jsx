import React, { useState } from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { TESTIMONIALS_DATA, FAQ_DATA } from '../../../constants/testimonialsData';
import { Star, ChevronDown, ChevronUp, MessageCircle, HelpCircle } from 'lucide-react';

export const TestimonialsSection = () => {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id="testimonios" className="section-padding">
      <div className="container">
        {/* Parte 1: Reseñas */}
        <SectionHeading
          kicker="Comunidad Satisfecha"
          badgeIcon={Star}
          title="Lo Que Dicen Nuestros Clientes"
          subtitle="Historias reales de hogares que recuperaron su tranquilidad gracias a la red de técnicos de MANI."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '5rem'
          }}
        >
          {TESTIMONIALS_DATA.map((t) => (
            <Card
              key={t.id}
              shadowType="md"
              padding="2rem"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              <div>
                {/* Estrellas */}
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--color-navy)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.2rem' }}>
                  "{t.comment}"
                </p>
              </div>

              <div style={{ paddingTop: '1rem', borderTop: '2px dashed #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--color-navy)' }}>{t.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-navy-muted)' }}>{t.location}</span>
                  </div>
                  <Badge variant="yellow" size="sm">
                    {t.service}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Parte 2: Preguntas Frecuentes */}
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <Badge variant="navy" icon={HelpCircle}>Preguntas Frecuentes</Badge>
            <h3 style={{ fontSize: '2.2rem', textTransform: 'uppercase', marginTop: '0.6rem' }}>
              Todo lo que necesitas saber
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FAQ_DATA.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '2.5px solid var(--color-navy)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '1.2rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.15rem',
                      fontWeight: '700',
                      color: 'var(--color-navy)',
                      cursor: 'pointer',
                      backgroundColor: isOpen ? 'var(--color-cream-soft)' : 'transparent'
                    }}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: '1rem 1.5rem 1.5rem 1.5rem', borderTop: '1.5px solid rgba(27, 42, 74, 0.1)' }}>
                      <p style={{ color: 'var(--color-navy-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
