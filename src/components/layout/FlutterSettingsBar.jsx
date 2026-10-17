import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { X, Check, Globe, RefreshCw, ExternalLink } from 'lucide-react';

export const FlutterSettingsBar = () => {
  const { isSettingsOpen, setIsSettingsOpen, flutterWebUrl, setFlutterWebUrl, showToast } = useApp();
  const [tempUrl, setTempUrl] = useState(flutterWebUrl);

  if (!isSettingsOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (!tempUrl.trim()) return;
    setFlutterWebUrl(tempUrl.trim());
    setIsSettingsOpen(false);
    showToast(`✅ URL de la App Web actualizada a: ${tempUrl.trim()}`);
  };

  const setPreset = (url) => {
    setTempUrl(url);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(27, 42, 74, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={() => setIsSettingsOpen(false)}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '3.5px solid var(--color-navy)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          maxWidth: '520px',
          width: '100%',
          padding: '2rem',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsSettingsOpen(false)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '2px solid var(--color-navy)',
            backgroundColor: 'var(--color-cream)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-yellow)',
              border: '2.5px solid var(--color-navy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Globe size={24} color="var(--color-navy)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', textTransform: 'uppercase' }}>Conexión con App Web</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-navy-muted)' }}>
              Define a qué dirección redirigen los botones de la landing page.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <label
            style={{
              display: 'block',
              fontFamily: 'var(--font-display)',
              fontSize: '0.95rem',
              fontWeight: '700',
              marginBottom: '0.5rem'
            }}
          >
            URL de destino de la App Web
          </label>
          <input
            type="text"
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            placeholder="http://localhost:8080"
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: '2.5px solid var(--color-navy)',
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              fontWeight: '600',
              outline: 'none',
              marginBottom: '1rem',
              backgroundColor: 'var(--color-cream-soft)'
            }}
          />

          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-navy-muted)' }}>
              Atajos rápidos:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.4rem' }}>
              <button
                type="button"
                onClick={() => setPreset('http://localhost:8080')}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.3rem 0.6rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1.5px solid var(--color-navy)',
                  backgroundColor: 'var(--color-cream)',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Docker Local (:8080)
              </button>
              <button
                type="button"
                onClick={() => setPreset('http://localhost:5000')}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.3rem 0.6rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1.5px solid var(--color-navy)',
                  backgroundColor: 'var(--color-cream)',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Flutter Run (:5000)
              </button>
              <button
                type="button"
                onClick={() => setPreset('http://localhost:3000')}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.3rem 0.6rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1.5px solid var(--color-navy)',
                  backgroundColor: 'var(--color-cream)',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Dev Port (:3000)
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
            <Button variant="ghost" size="md" onClick={() => setIsSettingsOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" size="md" type="submit" icon={Check}>
              Guardar URL
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
