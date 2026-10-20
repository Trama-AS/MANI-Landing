/**
 * Estimador de referencia de la landing (US-09.1.1, CA-2).
 *
 * Calcula un rango a partir de la tarifa base de la categoría, la urgencia y el
 * alcance. Es solo una orientación para el visitante: no es una cotización
 * formal; el precio real lo define la cotización dentro de la plataforma.
 */

export const URGENCIAS = [
  { id: 'hoy', label: '⚡ Hoy Mismo', factor: 1.3 },
  { id: 'manana', label: '📅 Mañana', factor: 1.15 },
  { id: 'programado', label: '🗓️ Esta Semana', factor: 1 },
];

export const ALCANCES = [
  { id: 'sencillo', label: 'Sencillo', detalle: 'Un arreglo puntual', factor: 1 },
  { id: 'medio', label: 'Medio', detalle: 'Varios puntos o piezas', factor: 1.8 },
  { id: 'amplio', label: 'Amplio', detalle: 'Trabajo extenso', factor: 3 },
];

/** El máximo del rango deja margen para lo que solo se ve en la visita. */
export const MARGEN_RANGO = 1.5;

export const AVISO_ESTIMACION =
  'Este valor es una estimación de referencia, no una cotización formal. El precio final lo define la cotización del aliado en la plataforma.';

const redondearMil = (valor) => Math.round(valor / 1000) * 1000;

const factorDe = (opciones, id) => {
  const opcion = opciones.find((o) => o.id === id);
  if (!opcion) throw new Error(`Opción desconocida: ${id}`);
  return opcion.factor;
};

/**
 * @param {{ tarifaBase: number }} servicio
 * @param {string} urgencia id de URGENCIAS
 * @param {string} alcance id de ALCANCES
 * @returns {{ min: number, max: number }} valores en COP redondeados a miles
 */
export function estimarRango(servicio, urgencia, alcance) {
  if (!servicio || !(servicio.tarifaBase > 0)) {
    throw new Error('La categoría no tiene tarifa base');
  }
  const base = servicio.tarifaBase * factorDe(URGENCIAS, urgencia) * factorDe(ALCANCES, alcance);
  return { min: redondearMil(base), max: redondearMil(base * MARGEN_RANGO) };
}

const formatoCop = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

export const formatearCop = (valor) => formatoCop.format(valor);
