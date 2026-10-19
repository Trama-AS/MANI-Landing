import { urlFlutterInicial } from '../config/flutterWebUrl';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { APP_CONFIG } from '../config/appConfig';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Estado para la URL de Flutter Web con persistencia en localStorage
  const [flutterWebUrl, setFlutterWebUrl] = useState(() =>
    urlFlutterInicial(localStorage.getItem('mani_flutter_web_url'), APP_CONFIG.flutterWebUrl, window.location)
  );

  // Modal de cotización rápida
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState(null);

  // Notificación toast flotante
  const [toastMessage, setToastMessage] = useState(null);

  // Modal para configuración de URL
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    // Solo se guarda un ajuste manual: el valor por defecto lo fija la compilación de cada ambiente.
    if (flutterWebUrl === APP_CONFIG.flutterWebUrl) {
      localStorage.removeItem('mani_flutter_web_url');
    } else {
      localStorage.setItem('mani_flutter_web_url', flutterWebUrl);
    }
  }, [flutterWebUrl]);

  const showToast = (message, duration = 3000) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, duration);
  };

  const openFlutterApp = (extraPath = '') => {
    try {
      const cleanBase = flutterWebUrl.replace(/\/+$/, '');
      const cleanPath = extraPath ? `/${extraPath.replace(/^\/+/, '')}` : '';
      const targetUrl = `${cleanBase}${cleanPath}`;
      
      showToast(`🚀 Abriendo MANI Web (${targetUrl})...`);
      
      // Abrir en pestaña nueva
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Error al redirigir a Flutter Web:', err);
      window.open(flutterWebUrl, '_blank');
    }
  };

  const openEstimator = (serviceId = 'plomeria') => {
    setActiveServiceId(serviceId);
    setIsEstimatorOpen(true);
  };

  const closeEstimator = () => {
    setIsEstimatorOpen(false);
    setActiveServiceId(null);
  };

  return (
    <AppContext.Provider
      value={{
        flutterWebUrl,
        setFlutterWebUrl,
        openFlutterApp,
        isEstimatorOpen,
        activeServiceId,
        openEstimator,
        closeEstimator,
        isSettingsOpen,
        setIsSettingsOpen,
        showToast,
        toastMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser utilizado dentro de un AppProvider');
  }
  return context;
};
