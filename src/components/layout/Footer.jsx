import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { BRAND_COLORS } from '../../constants/brandData';
import { Zap, ExternalLink, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer = () => {
  const { openFlutterApp } = useApp();

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-navy-dark)',
        color: '#FFFFFF',
        borderTop: '4px solid var(--color-navy)',
        padding: '5rem 0 2.5rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        {/* Banner Superior del Footer con CTA */}
        <div
          style={{
            backgroundColor: 'var(--color-yellow)',
            border: '3.5px solid var(--color-navy)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            padding: '2.5rem 2rem',
            color: 'var(--color-navy)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            marginBottom: '4rem'
          }}
        >
          <div style={{ maxWidth: '620px' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: '700',
                textTransform: 'uppercase',
                backgroundColor: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                border: '2px solid var(--color-navy)',
                fontSize: '0.85rem',
                display: 'inline-block',
                marginBottom: '0.8rem'
              }}
            >
              ¡Tu hogar en las mejores manos!
            </span>
            <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', lineHeight: 1.1, textTransform: 'uppercase' }}>
              ¿Listo para solucionar tu problema hoy mismo?
            </h3>
            <p style={{ marginTop: '0.5rem', fontSize: '1rem', fontWeight: '500' }}>
              Accede de inmediato a nuestra aplicación web interactiva y agenda tu servicio en 2 minutos.
            </p>
          </div>

          <div>
            <Button
              variant="primary"
              size="lg"
              icon={Zap}
              iconRight={ExternalLink}
              onClick={() => openFlutterApp()}
            >
              Abrir MANI Web
            </Button>
          </div>
        </div>

        {/* Columnas Principales */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Columna 1: Brand & Mascot */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2.5px solid var(--color-yellow)',
                  backgroundColor: 'white'
                }}
              >
                <img
                  src="/assets/mani_logo.png"
                  alt="MANI"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <h4 style={{ color: 'var(--color-yellow)', fontSize: '1.8rem', lineHeight: 1 }}>MANI</h4>
                <span style={{ fontSize: '0.8rem', letterSpacing: '0.05em', color: '#CBD5E1', textTransform: 'uppercase' }}>
                  Servicios a domicilio
                </span>
              </div>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              La plataforma más amigable y segura para encontrar plomeros, electricistas, carpinteros y especialistas de confianza en minutos.
            </p>

            {/* Paleta de Color Visual (Como en el Brand Board) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: '600' }}>Paleta Oficial:</span>
              {BRAND_COLORS.map((col) => (
                <div
                  key={col.name}
                  title={`${col.name} (${col.hex})`}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: col.hex,
                    border: '1.5px solid #FFFFFF'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Columna 2: Servicios */}
          <div>
            <h5 style={{ color: '#FFFFFF', fontSize: '1.2rem', marginBottom: '1.2rem', textTransform: 'uppercase' }}>
              Servicios
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: '#94A3B8' }}>
              <li><a href="#servicios" style={{ transition: 'color 0.2s' }}>Plomería y Fugas</a></li>
              <li><a href="#servicios" style={{ transition: 'color 0.2s' }}>Electricidad Certificada</a></li>
              <li><a href="#servicios" style={{ transition: 'color 0.2s' }}>Carpintería y Muebles</a></li>
              <li><a href="#servicios" style={{ transition: 'color 0.2s' }}>Arreglos e Instalaciones</a></li>
              <li><a href="#servicios" style={{ transition: 'color 0.2s' }}>Cerrajería de Emergencia</a></li>
              <li><a href="#servicios" style={{ transition: 'color 0.2s' }}>Pintura y Resanes</a></li>
            </ul>
          </div>

          {/* Columna 3: Navegación & App */}
          <div>
            <h5 style={{ color: '#FFFFFF', fontSize: '1.2rem', marginBottom: '1.2rem', textTransform: 'uppercase' }}>
              Plataforma
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: '#94A3B8' }}>
              <li><a href="#como-funciona">¿Cómo Funciona?</a></li>
              <li><a href="#app-preview">Muestra de App Móvil</a></li>
              <li><a href="#expertos">Expertos Verificados</a></li>
              <li><a href="#testimonios">Garantía MANI</a></li>
              <li>
                <button
                  onClick={() => openFlutterApp()}
                  style={{ color: 'var(--color-yellow)', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <ExternalLink size={14} /> Abrir MANI Web
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 4: Valores de Marca */}
          <div>
            <h5 style={{ color: '#FFFFFF', fontSize: '1.2rem', marginBottom: '1.2rem', textTransform: 'uppercase' }}>
              ADN MANI
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#E2E8F0', fontSize: '0.9rem' }}>
                <ShieldCheck size={18} color="var(--color-yellow)" />
                <span><strong>Confiable:</strong> Técnicos 100% verificados</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#E2E8F0', fontSize: '0.9rem' }}>
                <Zap size={18} color="var(--color-yellow)" />
                <span><strong>Ágil:</strong> Respuesta rápida en minutos</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#E2E8F0', fontSize: '0.9rem' }}>
                <Heart size={18} color="var(--color-red)" />
                <span><strong>Cercano:</strong> Trato humano y transparente</span>
              </div>
            </div>
          </div>
        </div>

        {/* Línea Divisoria y Copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            color: '#64748B',
            fontSize: '0.85rem'
          }}
        >
          <div>
            © {new Date().getFullYear()} MANI Servicios a Domicilio. Todos los derechos reservados.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: '#94A3B8' }}>Aviso de Privacidad</a>
            <a href="#" style={{ color: '#94A3B8' }}>Términos de Servicio</a>
            <a href="#" style={{ color: '#94A3B8' }}>Habeas Data</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
