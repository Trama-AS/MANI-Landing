import { useApp } from '../context/AppContext';

/**
 * Hook para disparar la navegación y acciones hacia la app Flutter Web
 */
export const useFlutterWeb = () => {
  const { openFlutterApp, flutterWebUrl, setFlutterWebUrl, showToast } = useApp();

  const goToService = (serviceId) => {
    openFlutterApp(`?service=${serviceId}`);
  };

  const goToBooking = (serviceId = 'general') => {
    openFlutterApp(`booking?service=${serviceId}`);
  };

  const goToExpert = (expertId) => {
    openFlutterApp(`experts/${expertId}`);
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
