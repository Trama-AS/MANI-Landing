import { useApp } from '../context/AppContext';
import { rutaFlutter } from '../utils/flutterRoutes';

/**
 * Hook para disparar la navegación y acciones hacia la app Flutter Web
 */
export const useFlutterWeb = () => {
  const { openFlutterApp, flutterWebUrl, setFlutterWebUrl, showToast } = useApp();

  // Contrato de CA-3: rutas públicas que existen en MANI-Flutter con el contexto en la consulta.
  const goToService = (serviceId) => {
    openFlutterApp(rutaFlutter('login', { servicio: serviceId }));
  };

  const goToBooking = (serviceId, contexto = {}) => {
    openFlutterApp(rutaFlutter('login', { servicio: serviceId, ...contexto }));
  };

  const goToExpert = (expertId) => {
    openFlutterApp(rutaFlutter('login', { aliado: expertId }));
  };

  return {
    flutterWebUrl,
    setFlutterWebUrl,
    openFlutterApp,
    goToService,
    goToBooking,
    goToExpert,
    showToast
  };
};
