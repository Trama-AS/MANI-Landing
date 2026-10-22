/**
 * Resolución de la URL base de MANI-Flutter Web por ambiente.
 *
 * En DEV, QA y PROD la landing (:3001) y Flutter Web (:8080) corren en el mismo
 * host con puertos distintos (DOCUMENTO_INFRAESTRUCTURA_V3 §3). La URL real llega
 * en la compilación de la imagen (`VITE_FLUTTER_WEB_URL`); estas funciones deciden
 * qué usar cuando no llega y qué hacer con lo guardado en `localStorage`.
 * Son puras para poder probarlas con `node:test` (sin `import.meta.env`).
 */

export const PUERTO_FLUTTER_WEB = '8080';

const esLocal = (hostname) => hostname === 'localhost' || hostname === '127.0.0.1';

/**
 * @param {string | undefined} urlCompilacion valor de `VITE_FLUTTER_WEB_URL`
 * @param {Pick<Location, 'protocol' | 'hostname' | 'port' | 'origin'> | undefined} ubicacion `window.location`
 * @returns {string} URL base de Flutter Web
 */
export function resolverUrlFlutter(urlCompilacion, ubicacion) {
  const explicita = String(urlCompilacion ?? '').trim();
  if (explicita) return explicita;
  if (!ubicacion || esLocal(ubicacion.hostname)) return `http://localhost:${PUERTO_FLUTTER_WEB}`;
  // Landing publicada en un puerto propio (p. ej. :3001): Flutter está en el mismo host, en :8080.
  if (ubicacion.port) return `${ubicacion.protocol}//${ubicacion.hostname}:${PUERTO_FLUTTER_WEB}`;
  // Landing en el puerto estándar (detrás de un proxy): despliegue unificado con Flutter bajo /app.
  return `${ubicacion.origin}/app`;
}

/**
 * Elige la URL inicial entre la guardada (ajuste manual de `FlutterSettingsBar`) y la por defecto.
 * Descarta valores que dejaron versiones anteriores, que guardaban siempre el respaldo:
 * `localhost` fuera de un equipo local y el `/app` del propio origen de la landing.
 *
 * @param {string | null} guardada valor de `localStorage`
 * @param {string} porDefecto `APP_CONFIG.flutterWebUrl`
 * @param {Pick<Location, 'hostname' | 'origin'> | undefined} ubicacion `window.location`
 */
export function urlFlutterInicial(guardada, porDefecto, ubicacion) {
  const valor = String(guardada ?? '').trim();
  if (!valor) return porDefecto;
  if (ubicacion && !esLocal(ubicacion.hostname)) {
    if (valor.includes('localhost')) return porDefecto;
    if (valor.replace(/\/+$/, '') === `${ubicacion.origin}/app`) return porDefecto;
  }
  return valor;
}
