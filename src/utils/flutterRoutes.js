/**
 * Contrato de redirección hacia MANI-Flutter Web (US-09.1.1, CA-3).
 *
 * Solo se usan rutas públicas que existen en `lib/core/routing/app_router.dart`
 * de MANI-Flutter. El visitante llega sin sesión, así que una ruta privada lo
 * mandaría a `/login` y perdería la consulta; por eso el contexto viaja como
 * parámetros de consulta de la ruta pública, que go_router conserva en la URL.
 */

export const RUTAS_FLUTTER = {
  login: '/login',
  registroCliente: '/register-cliente',
};

/** Parámetros de contexto admitidos (el resto se descarta). */
export const PARAMETROS_CONTEXTO = ['servicio', 'urgencia', 'alcance', 'aliado'];

/**
 * @param {keyof RUTAS_FLUTTER} destino
 * @param {Record<string, string | undefined>} [contexto]
 * @returns {string} ruta relativa a la URL base de Flutter Web, p. ej. `/login?servicio=plomeria`
 */
export function rutaFlutter(destino, contexto = {}) {
  const ruta = RUTAS_FLUTTER[destino];
  if (!ruta) throw new Error(`Destino de Flutter desconocido: ${destino}`);
  const query = new URLSearchParams();
  for (const clave of PARAMETROS_CONTEXTO) {
    const valor = contexto[clave];
    if (valor !== undefined && valor !== null && String(valor).trim() !== '') {
      query.set(clave, String(valor).trim());
    }
  }
  const texto = query.toString();
  return texto ? `${ruta}?${texto}` : ruta;
}

/**
 * Une la URL base de Flutter Web (p. ej. `https://mani.com.co/app`) con una ruta.
 */
export function urlFlutter(base, ruta = '') {
  const limpia = String(base).replace(/\/+$/, '');
  if (!ruta) return limpia;
  return `${limpia}/${ruta.replace(/^\/+/, '')}`;
}
