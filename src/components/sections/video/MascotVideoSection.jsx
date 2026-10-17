import React, { useRef, useState } from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { useApp } from '../../../context/AppContext';
import { Play, Pause, Volume2, VolumeX, Sparkles, Zap, ExternalLink } from 'lucide-react';

export const MascotVideoSection = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const { openFlutterApp } = useApp();

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section
      style={{
        padding: '5rem 0',
        backgroundColor: 'var(--color-cream-soft)',
        borderTop: '3px solid var(--color-navy)',
        borderBottom: '3px solid var(--color-navy)'
      }}
    >
      <div className="container">
        <SectionHeading
          kicker="Personalidad en Movimiento"
          badgeIcon={Sparkles}
          title="Conoce a Mani en Acción"
          subtitle="Siempre listo, con sus herramientas en la cintura y el mejor ánimo para resolver cualquier imprevisto en tu hogar."
        />

        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            position: 'relative'
          }}
        >
          {/* Marco estilo Pantalla Retro Comic con Antena decorativa */}
          <div
            style={{
              position: 'relative',
              backgroundColor: '#FFFFFF',
              border: '4px solid var(--color-navy)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '8px 8px 0px var(--color-navy)',
              padding: '1.2rem',
              overflow: 'hidden'
            }}
          >
            {/* Cabecera del reproductor */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '0.8rem',
                marginBottom: '0.8rem',
                borderBottom: '2px solid var(--color-navy)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#EF4444', border: '1.5px solid var(--color-navy)' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F59E0B', border: '1.5px solid var(--color-navy)' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10B981', border: '1.5px solid var(--color-navy)' }} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: '700', marginLeft: '0.5rem' }}>
                  MANI AL SERVICIO • CLIP OFICIAL
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={toggleMute}
                  style={{
                    padding: '0.3rem 0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid var(--color-navy)',
                    backgroundColor: 'var(--color-cream)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.75rem',
                    fontWeight: '700'
                  }}
                  title={isMuted ? 'Activar sonido' : 'Silenciar'}
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  <span>{isMuted ? 'Mudo' : 'Audio'}</span>
                </button>
              </div>
            </div>

            {/* Video Container */}
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                backgroundColor: 'var(--color-cream)',
                border: '2px solid var(--color-navy)',
                aspectRatio: '16 / 9'
              }}
            >
              <video
                ref={videoRef}
                src="/assets/mani_walking.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />

              {/* Botón flotante para pausar/reproducir */}
              <button
                onClick={togglePlay}
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(27, 42, 74, 0.85)',
                  color: 'white',
                  border: '2px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(4px)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  transition: 'transform 0.2s'
                }}
                title={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
            </div>

            {/* Footer del Video con botón de ingreso a la App Web */}
            <div
              style={{
                marginTop: '1.2rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}
            >
              <span style={{ fontSize: '0.9rem', color: 'var(--color-navy-muted)', fontWeight: '600' }}>
                Mascota animada original de MANI Servicios a Domicilio.
              </span>
              <Button
                variant="primary"
                size="md"
                icon={Zap}
                iconRight={ExternalLink}
                onClick={() => openFlutterApp()}
              >
                Ingresar a la App Web
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
