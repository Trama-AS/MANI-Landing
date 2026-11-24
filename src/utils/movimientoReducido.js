/**
 * `true` si el sistema pide reducir el movimiento (SCRUM-1735, WCAG 2.3.3 y 2.2.2).
 * Se recibe la ventana para poder probarlo sin navegador; sin `matchMedia` se asume que no hay preferencia.
 */
export const CONSULTA_MOVIMIENTO_REDUCIDO = '(prefers-reduced-motion: reduce)';

export function prefiereMovimientoReducido(ventana = globalThis.window) {
  try {
    return Boolean(ventana?.matchMedia?.(CONSULTA_MOVIMIENTO_REDUCIDO)?.matches);
  } catch {
    return false;
  }
}
