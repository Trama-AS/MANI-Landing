// tarifaBase: valor de referencia en COP de la visita con el arreglo más sencillo.
// Es informativo para el visitante; el precio real lo fija la cotización en la plataforma.
export const SERVICES_DATA = [
  {
    id: 'plomeria',
    title: 'Plomería',
    subtitle: 'Grifos, fugas y reparaciones.',
    description: 'Solución inmediata a fugas de agua, cambio de griferías, destapes de cañerías, sellado de sanitarios e instalación de calentadores.',
    iconName: 'Droplets',
    badge: 'Más Solicitado',
    estimatedTime: '1 - 2 hrs',
    tarifaBase: 80000,
    popularTags: ['Fuga de agua', 'Grifo goteando', 'Destape lavamanos', 'Calentador'],
    color: '#3B82F6'
  },
  {
    id: 'electricidad',
    title: 'Electricidad',
    subtitle: 'Instalaciones, apagones y más.',
    description: 'Reparación de cortocircuitos, instalación de tomas e interruptores, lámparas, ventiladores de techo y revisión de tableros eléctricos.',
    iconName: 'Zap',
    badge: 'Certificados',
    estimatedTime: '1 - 3 hrs',
    tarifaBase: 90000,
    popularTags: ['Cortocircuito', 'Instalar lámpara', 'Tomas quemadas', 'Breakers'],
    color: '#F59E0B'
  },
  {
    id: 'carpinteria',
    title: 'Carpintería',
    subtitle: 'Muebles, puertas y madera.',
    description: 'Ajuste de puertas caídas que arrastran, instalación de repisas, bisagras, cerraduras de madera, armado de closets y restauración de muebles.',
    iconName: 'Hammer',
    badge: 'Acabados Finos',
    estimatedTime: '2 - 4 hrs',
    tarifaBase: 100000,
    popularTags: ['Puerta caída', 'Repisas flotantes', 'Armado de muebles', 'Bisagras'],
    color: '#D97706'
  },
  {
    id: 'arreglos',
    title: 'Arreglos Locativos',
    subtitle: 'Cualquier detalle de tu hogar.',
    description: 'Instalación de cuadros, cortinas, persianas, soportes de TV, sellado de juntas en silicona y mantenimiento general con herramientas listas.',
    iconName: 'Wrench',
    badge: 'Multiusos',
    estimatedTime: '1 - 2 hrs',
    tarifaBase: 70000,
    popularTags: ['Soporte de TV', 'Cortinas y persianas', 'Cuadros y repisas', 'Silicona'],
    color: '#10B981'
  },
  {
    id: 'cerrajeria',
    title: 'Cerrajería',
    subtitle: 'Aperturas y cambio de guardas.',
    description: 'Apertura de cerraduras bloqueadas, cambio de cilindros y chapas de seguridad para puertas principales y recámaras.',
    iconName: 'KeyRound',
    badge: 'Emergencia 24/7',
    estimatedTime: '45 - 60 min',
    tarifaBase: 75000,
    popularTags: ['Cambio de chapa', 'Puerta trancada', 'Cerradura digital', 'Duplicados'],
    color: '#8B5CF6'
  },
  {
    id: 'pintura',
    title: 'Pintura y Resanes',
    subtitle: 'Retoques y renovación de paredes.',
    description: 'Resane de grietas y huecos por clavos, aplicación de pintura en paredes interiores, techos y eliminación de humedad superficial.',
    iconName: 'Paintbrush',
    badge: 'Alta Calidad',
    estimatedTime: '3 - 6 hrs',
    tarifaBase: 150000,
    popularTags: ['Resane de grietas', 'Pintura habitación', 'Retoque de muros', 'Techos'],
    color: '#EC4899'
  }
];
