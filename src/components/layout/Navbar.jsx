import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { 
  Menu, 
  X, 
  ExternalLink, 
  Zap, 
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';

export const Navbar = () => {
  const { openFlutterApp, flutterWebUrl, isSettingsOpen, setIsSettingsOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: isScrolled ? 'rgba(251, 243, 228, 0.95)' : 'var(--color-cream)',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '3px solid var(--color-navy)' : '2px solid transparent',
        transition: 'all 0.3s ease',
        boxShadow: isScrolled ? '0 4px 12px rgba(27, 42, 74, 0.08)' : 'none'
      }}
    >
      {/* Top Banner de estado de la App Flutter */}
      <div
        style={{
          backgroundColor: 'var(--color-navy)',
          color: '#FFFFFF',
          fontSize: '0.8rem',
          padding: '0.4rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          fontFamily: 'var(--font-display)',
          letterSpacing: '0.02em'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            backgroundColor: '#10B981', 
            display: 'inline-block',
            boxShadow: '0 0 6px #10B981'
          }} />
          <span>Acceso Directo App Web: <strong>{flutterWebUrl}</strong></span>
        </div>
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          style={{
            color: 'var(--color-yellow)',
            textDecoration: 'underline',
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            cursor: 'pointer'
          }}
          title="Configurar URL de la App Web"
        >
          <SlidersHorizontal size={12} />
          <span>Cambiar URL</span>
        </button>
      </div>

      <div className="container" style={{ padding: '0.75rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          
          {/* Logo y Nombre de Marca */}
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              textDecoration: 'none'
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2.5px solid var(--color-navy)',
                boxShadow: '2px 2px 0px var(--color-navy)',
                backgroundColor: 'white',
                flexShrink: 0
              }}
            >
              <img
                src="/assets/mani_logo.png"
                alt="MANI Logo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: '800',
                  color: 'var(--color-navy)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1
                }}
              >
                MANI
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: 'var(--color-navy-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                Servicios a domicilio
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2rem',
              fontFamily: 'var(--font-display)',
              fontWeight: '600',
              fontSize: '1.05rem'
            }}
            className="desktop-nav"
          >
            <a href="#servicios" style={{ color: 'var(--color-navy)', transition: 'color 0.2s' }}>
              Servicios
            </a>
            <a href="#como-funciona" style={{ color: 'var(--color-navy)', transition: 'color 0.2s' }}>
              ¿Cómo Funciona?
            </a>
            <a href="#app-preview" style={{ color: 'var(--color-navy)', transition: 'color 0.2s' }}>
              App Móvil
            </a>
            <a href="#expertos" style={{ color: 'var(--color-navy)', transition: 'color 0.2s' }}>
              Expertos
            </a>
            <a href="#testimonios" style={{ color: 'var(--color-navy)', transition: 'color 0.2s' }}>
              Reseñas
            </a>
          </nav>

          {/* Action Button: Entrar a Flutter Web */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <Button
              variant="primary"
              size="md"
              icon={Zap}
              iconRight={ExternalLink}
              onClick={() => openFlutterApp()}
              title="Ingresar a la aplicación web de MANI"
            >
              Ingresar a MANI Web
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                padding: '0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: '2px solid var(--color-navy)',
                backgroundColor: 'white',
                boxShadow: '2px 2px 0px var(--color-navy)'
              }}
              className="mobile-toggle"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-cream)',
            borderBottom: '3px solid var(--color-navy)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            fontWeight: '600'
          }}
        >
          <a href="#servicios" onClick={() => setMobileMenuOpen(false)}>
            🛠️ Servicios
          </a>
          <a href="#como-funciona" onClick={() => setMobileMenuOpen(false)}>
            ⚡ ¿Cómo Funciona?
          </a>
          <a href="#app-preview" onClick={() => setMobileMenuOpen(false)}>
            📱 App Móvil
          </a>
          <a href="#expertos" onClick={() => setMobileMenuOpen(false)}>
            👨‍🔧 Expertos Verificados
          </a>
          <a href="#testimonios" onClick={() => setMobileMenuOpen(false)}>
            ⭐ Reseñas
          </a>
          <div style={{ paddingTop: '0.5rem' }}>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              icon={Zap}
              iconRight={ExternalLink}
              onClick={() => {
                setMobileMenuOpen(false);
                openFlutterApp();
              }}
            >
              Ingresar a MANI Web
            </Button>
          </div>
        </div>
      )}

      {/* Media query styling helper */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
        @media (max-width: 899px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};
