import React from 'react';

/**
 * Maqueta realista de smartphone con bordes de cómic y pantalla intercambiable
 */
export const PhoneDevice = ({ currentScreen, onNext, onPrev }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '320px',
        maxWidth: '100%',
        margin: '0 auto',
        userSelect: 'none'
      }}
    >
      {/* Sombra proyectada */}
      <div
        style={{
          position: 'absolute',
          bottom: '-15px',
          left: '10%',
          width: '80%',
          height: '24px',
          backgroundColor: 'rgba(27, 42, 74, 0.25)',
          borderRadius: '50%',
          filter: 'blur(10px)',
          zIndex: 0
        }}
      />

      {/* Chasis exterior del teléfono */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: '#0F172A',
          border: '4px solid var(--color-navy)',
          borderRadius: '44px',
          padding: '12px',
          boxShadow: '8px 8px 0px var(--color-navy)',
          overflow: 'hidden'
        }}
      >
        {/* Notch / Speaker superior */}
        <div
          style={{
            position: 'absolute',
            top: '18px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '110px',
            height: '20px',
            backgroundColor: '#0F172A',
            borderBottomLeftRadius: '14px',
            borderBottomRightRadius: '14px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {/* Lente cámara frontal */}
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#1E293B',
              border: '1px solid #334155'
            }}
          />
          {/* Altavoz */}
          <div
            style={{
              width: '40px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: '#334155'
            }}
          />
        </div>

        {/* Pantalla interior con la imagen real de la app */}
        <div
          style={{
            position: 'relative',
            borderRadius: '34px',
            overflow: 'hidden',
            backgroundColor: 'var(--color-cream)',
            aspectRatio: '399 / 868',
            width: '100%',
            border: '2px solid rgba(0, 0, 0, 0.1)'
          }}
        >
          <img
            key={currentScreen.id}
            src={currentScreen.imagePath}
            alt={currentScreen.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'opacity 0.3s ease'
            }}
          />

          {/* Reflejo de cristal sutil */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%)',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* Barra Home inferior */}
        <div
          style={{
            width: '110px',
            height: '4px',
            backgroundColor: '#FFFFFF',
            borderRadius: '2px',
            margin: '8px auto 2px auto',
            opacity: 0.6
          }}
        />
      </div>
    </div>
  );
};
