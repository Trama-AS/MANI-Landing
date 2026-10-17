import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Wrench, Zap, CheckCircle2, Sparkles, Star } from 'lucide-react';

export const MascotCard = () => {
  const { openFlutterApp } = useApp();
  const [isWinking, setIsWinking] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      {/* Glow de fondo decorativo amarillo */}
      <div
        style={{
          position: 'absolute',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-yellow-light)',
          filter: 'blur(60px)',
          opacity: 0.6,
          zIndex: 0
        }}
      />

      {/* Globo de diálogo de Mani */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          backgroundColor: '#FFFFFF',
          border: '3px solid var(--color-navy)',
          borderRadius: 'var(--radius-lg)',
          padding: '0.8rem 1.4rem',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '1rem',
          maxWidth: '320px',
          textAlign: 'center',
          animation: 'floatWobble 4s ease-in-out infinite'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.15rem',
            fontWeight: '700',
            color: 'var(--color-navy)'
          }}
        >
          ¡Hola! Soy Mani 🧢 ¿Qué arreglamos hoy en tu casa?
        </span>
        {/* Triángulo del globo */}
        <div
          style={{
            position: 'absolute',
            bottom: '-14px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: '14px solid var(--color-navy)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: '11px solid #FFFFFF'
          }}
        />
      </div>

      {/* Contenedor principal de la Mascota con Sticker Oficial */}
      <div
        className="comic-box animate-float"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          padding: '12px',
          backgroundColor: 'white',
          border: '4px solid var(--color-navy)',
          boxShadow: '8px 8px 0px var(--color-navy)',
          cursor: 'pointer',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={() => openFlutterApp()}
        onMouseEnter={() => setIsWinking(true)}
        onMouseLeave={() => setIsWinking(false)}
        title="¡Haz clic para entrar a la App Web de Flutter!"
      >
        <img
          src="/assets/mani_sticker.jpg"
          alt="Mascota Oficial de MANI con gorra y cinturón de herramientas"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: isWinking ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.3s ease'
          }}
        />
      </div>

      {/* Badge flotante: 100% Verificado */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '-20px',
          zIndex: 3,
          backgroundColor: '#FFFFFF',
          border: '2.5px solid var(--color-navy)',
          borderRadius: 'var(--radius-pill)',
          padding: '0.4rem 0.9rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontFamily: 'var(--font-display)',
          fontWeight: '700',
          fontSize: '0.85rem'
        }}
      >
        <CheckCircle2 size={16} color="#10B981" />
        <span>Garantía 100% MANI</span>
      </div>

      {/* Badge flotante: Calificación 4.9 */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-15px',
          zIndex: 3,
          backgroundColor: 'var(--color-yellow)',
          border: '2.5px solid var(--color-navy)',
          borderRadius: 'var(--radius-pill)',
          padding: '0.4rem 0.9rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontFamily: 'var(--font-display)',
          fontWeight: '700',
          fontSize: '0.85rem'
        }}
      >
        <Star size={16} fill="var(--color-navy)" color="var(--color-navy)" />
        <span>4.9 / 5 Calificación</span>
      </div>
    </div>
  );
};
