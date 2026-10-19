import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { SERVICES_DATA } from '../../../constants/servicesData';
import { ALCANCES, AVISO_ESTIMACION, URGENCIAS, estimarRango, formatearCop } from '../../../utils/estimator';
import { rutaFlutter } from '../../../utils/flutterRoutes';
import { Button } from '../../common/Button';
import { 
  X, 
  Wrench, 
  Zap, 
  ExternalLink, 
  Info
} from 'lucide-react';

export const QuickEstimatorModal = () => {
  const { isEstimatorOpen, closeEstimator, activeServiceId, openFlutterApp } = useApp();

  // La categoría elegida en el modal vale mientras no se abra desde otra tarjeta (activeServiceId).
  const [eleccion, setEleccion] = useState({ origen: activeServiceId, id: null });
  const [urgency, setUrgency] = useState('hoy');
  const [alcance, setAlcance] = useState('sencillo');

  if (!isEstimatorOpen) return null;

  const selectedServiceId =
    (eleccion.origen === activeServiceId && eleccion.id) || activeServiceId || 'plomeria';
  const setSelectedServiceId = (id) => setEleccion({ origen: activeServiceId, id });

  const currentService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];
  const rango = estimarRango(currentService, urgency, alcance);

  const handleConfirm = () => {
    closeEstimator();
    openFlutterApp(rutaFlutter('login', { servicio: currentService.id, urgencia: urgency, alcance }));
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
              Estima tu servicio
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-navy-muted)' }}>
              Calcula un rango de referencia y continúa en la App Web
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
            {URGENCIAS.map((item) => (
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

        {/* 3. Alcance del trabajo */}
        <div style={{ marginBottom: '1.2rem' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            3. ¿Qué tan grande es el trabajo?
          </label>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {ALCANCES.map((item) => (
              <button
                key={item.id}
                type="button"
                data-testid={`alcance-${item.id}`}
                onClick={() => setAlcance(item.id)}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  border: alcance === item.id ? '2.5px solid var(--color-navy)' : '1.5px solid #CBD5E1',
                  backgroundColor: alcance === item.id ? 'var(--color-yellow)' : '#F8FAFC',
                  color: 'var(--color-navy)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                {item.label}
                <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: '500', fontSize: '0.7rem', color: 'var(--color-navy-muted)' }}>
                  {item.detalle}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Rango estimado */}
        <div
          style={{
            backgroundColor: 'var(--color-cream)',
            border: '2.5px solid var(--color-navy)',
            borderRadius: 'var(--radius-sm)',
            padding: '1rem 1.2rem',
            marginBottom: '1.2rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <span style={{ color: 'var(--color-navy-muted)', fontSize: '0.9rem' }}>Especialidad:</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: '800', fontSize: '1rem', color: 'var(--color-navy)' }}>
              {currentService.title}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <span style={{ color: 'var(--color-navy-muted)', fontSize: '0.9rem' }}>Tarifa base:</span>
            <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{formatearCop(currentService.tarifaBase)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: '800' }}>
              Rango estimado:
            </span>
            <span
              data-testid="rango-estimado"
              style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-red)' }}
            >
              {formatearCop(rango.min)} – {formatearCop(rango.max)}
            </span>
          </div>

          <p
            data-testid="aviso-estimacion"
            role="note"
            style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start', fontSize: '0.75rem', color: 'var(--color-navy)', marginTop: '0.8rem', lineHeight: 1.4 }}
          >
            <Info size={14} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
            <span>{AVISO_ESTIMACION}</span>
          </p>
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
          Continuar en la App Web
        </Button>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-navy-muted)', marginTop: '0.8rem' }}>
          🔒 Inicia sesión o regístrate para describir el arreglo y recibir la cotización formal.
        </p>
      </div>
    </div>
  );
};
