import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { SERVICES_DATA } from '../../../constants/servicesData';
import { Button } from '../../common/Button';
import { Badge } from '../../common/Badge';
import { 
  X, 
  Wrench, 
  Zap, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  CheckCircle2,
  Calendar 
} from 'lucide-react';

export const QuickEstimatorModal = () => {
  const { isEstimatorOpen, closeEstimator, activeServiceId, openFlutterApp } = useApp();

  const [selectedServiceId, setSelectedServiceId] = useState('plomeria');
  const [urgency, setUrgency] = useState('hoy');

  useEffect(() => {
    if (activeServiceId) {
      setSelectedServiceId(activeServiceId);
    }
  }, [activeServiceId]);

  if (!isEstimatorOpen) return null;

  const currentService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  const handleConfirm = () => {
    closeEstimator();
    openFlutterApp(`booking?service=${selectedServiceId}&urgency=${urgency}`);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(27, 42, 74, 0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflowY: 'auto'
      }}
      onClick={closeEstimator}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '4px solid var(--color-navy)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '10px 10px 0px var(--color-navy)',
          maxWidth: '560px',
          width: '100%',
          padding: '2.2rem',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar */}
        <button
          onClick={closeEstimator}
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            border: '2px solid var(--color-navy)',
            backgroundColor: 'var(--color-cream)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        {/* Encabezado */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              backgroundColor: 'var(--color-yellow)',
              border: '2.5px solid var(--color-navy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '2px 2px 0px var(--color-navy)'
            }}
          >
            <Wrench size={26} color="var(--color-navy)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.6rem', textTransform: 'uppercase', lineHeight: 1.1 }}>
              Solicitud de Servicio
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-navy-muted)' }}>
              Elige tu categoría y conecta de inmediato con la App Web
            </p>
          </div>
        </div>

        {/* 1. Selección de Categoría */}
        <div style={{ marginBottom: '1.2rem' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            1. Selecciona la Especialidad:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {SERVICES_DATA.map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => setSelectedServiceId(srv.id)}
                style={{
                  padding: '0.6rem 0.4rem',
                  borderRadius: 'var(--radius-sm)',
                  border: selectedServiceId === srv.id ? '2.5px solid var(--color-navy)' : '1.5px solid #CBD5E1',
                  backgroundColor: selectedServiceId === srv.id ? 'var(--color-yellow)' : '#F8FAFC',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  color: 'var(--color-navy)',
                  cursor: 'pointer',
                  boxShadow: selectedServiceId === srv.id ? '2px 2px 0px var(--color-navy)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {srv.title}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Cuándo lo necesitas */}
        <div style={{ marginBottom: '1.2rem' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            2. ¿Para cuándo requieres el servicio?
          </label>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {[
              { id: 'hoy', label: '⚡ Hoy Mismo' },
              { id: 'manana', label: '📅 Mañana' },
              { id: 'programado', label: '🗓️ Esta Semana' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setUrgency(item.id)}
                style={{
                  flex: 1,
                  padding: '0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  border: urgency === item.id ? '2.5px solid var(--color-navy)' : '1.5px solid #CBD5E1',
                  backgroundColor: urgency === item.id ? 'var(--color-navy)' : '#F8FAFC',
                  color: urgency === item.id ? '#FFFFFF' : 'var(--color-navy)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Resumen del Servicio */}
        <div
          style={{
            backgroundColor: 'var(--color-cream-soft)',
            border: '2.5px solid var(--color-navy)',
            borderRadius: 'var(--radius-md)',
            padding: '1.2rem',
            marginBottom: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <span style={{ color: 'var(--color-navy-muted)', fontSize: '0.9rem' }}>Especialidad:</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: '800', fontSize: '1rem', color: 'var(--color-navy)' }}>
              {currentService.title}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <span style={{ color: 'var(--color-navy-muted)', fontSize: '0.9rem' }}>Modalidad:</span>
            <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Atención a Domicilio</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <span style={{ color: 'var(--color-navy-muted)', fontSize: '0.9rem' }}>Garantía:</span>
            <span style={{ fontWeight: '700', color: '#10B981', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <CheckCircle2 size={15} /> 100% Escrita MANI
            </span>
          </div>

          <div
            style={{
              borderTop: '2px dashed rgba(27, 42, 74, 0.2)',
              paddingTop: '0.6rem',
              marginTop: '0.6rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: '800' }}>
              Asignación:
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: '800', color: 'var(--color-red)' }}>
              Técnico Verificado en tu Zona
            </span>
          </div>
        </div>

        {/* Botón de Confirmación Directo a Flutter Web */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          icon={Zap}
          iconRight={ExternalLink}
          onClick={handleConfirm}
        >
          Continuar y Agendar en la App Web
        </Button>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-navy-muted)', marginTop: '0.8rem' }}>
          🔒 Podrás especificar dirección, detalles del arreglo y confirmar tu cita desde la app web.
        </p>
      </div>
    </div>
  );
};
