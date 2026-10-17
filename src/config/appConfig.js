/**
 * Configuración central de la Landing Page MANI
 * Permite definir dinámicamente la URL de destino de Flutter Web
 */
export const APP_CONFIG = {
  appName: 'MANI',
  tagline: 'Servicios a domicilio',
  headline: 'Soluciones para tu hogar',
  subheadline: 'Expertos verificados en quienes puedes confiar.',
  
  // URL por defecto de la aplicación Web (detecta automáticamente producción vs desarrollo local)
  flutterWebUrl: import.meta.env.VITE_FLUTTER_WEB_URL || (typeof window !== 'undefined' && window.location.hostname !== 'localhost' ? `${window.location.origin}/app` : 'http://localhost:8080'),
  
  // Enlaces de soporte y contacto
  supportWhatsApp: 'https://wa.me/573001234567?text=Hola%20MANI,%20necesito%20información%20sobre%20un%20servicio',
  supportEmail: 'contacto@mani.com.co',
  
  // Redes sociales
  socialLinks: {
    instagram: 'https://instagram.com/mani_app',
    facebook: 'https://facebook.com/maniapp',
    linkedin: 'https://linkedin.com/company/mani-servicios'
  },

  // Metadata de versión
  version: '1.2.0',
  releaseYear: 2026
};
