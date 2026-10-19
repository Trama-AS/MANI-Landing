# MANI - Landing Page (React + Vite)

Landing Page web de captación, cotización rápida y conversión para la plataforma **MANI (Servicios a Domicilio)**, diseñada bajo una arquitectura modular de componentes en **React 19 + Vite 8** y conectada con el cliente web de operación en **Flutter Web** (`MANI-Flutter`).

---

## Tabla de Contenidos

1. [Propósito en el Ecosistema MANI](#1-propósito-en-el-ecosistema-mani)
2. [Identidad de Marca y Sistema de Diseño](#2-identidad-de-marca-y-sistema-de-diseño)
3. [Arquitectura del Proyecto](#3-arquitectura-del-proyecto)
4. [Integración y Deep-Linking con MANI-Flutter Web](#4-integración-y-deep-linking-con-mani-flutter-web)
5. [Requisitos y Ejecución Local](#5-requisitos-y-ejecución-local)
6. [Variables de Entorno y Despliegue](#6-variables-de-entorno-y-despliegue)
7. [Documentación Adicional](#7-documentación-adicional)

---

## 1. Propósito en el Ecosistema MANI

Dentro de la arquitectura de **MANI**, este repositorio implementa el portal público web (`MANI-Landing`) orientado a:
- **Presentación del catálogo de categorías operativas** (Plomería, Electricidad, Pintura, Carpintería, Limpieza, Armado y Mantenimiento General) con tarifas base transparentes.
- **Estimador interactivo de presupuesto (`QuickEstimatorModal`)**: permite al cliente calcular un rango estimado según categoría, urgencia y alcance antes de iniciar su solicitud formal.
- **Previsualización interactiva del flujo operativo (`AppPreviewSection`)**: recorrido guiado paso a paso por las pantallas reales de la aplicación.
- **Puente directo hacia `MANI-Flutter` Web**: redirige al usuario hacia el cliente transaccional de MANI preservando el contexto seleccionado (servicio, reserva o perfil de aliado).

---

## 2. Identidad de Marca y Sistema de Diseño

Construido respetando el manual de marca oficial y una estética neo-brutalista / retro-cómic accesible:
- **Mostaza (`#F2B705`)**: Energía, confianza y dinamismo.
- **Tinta Azul (`#1B2A4A`)**: Solidez, contornos de alto contraste (`3px`) y jerarquía tipográfica.
- **Crema (`#FBF3E4`)**: Superficie cálida principal.
- **Rojo CTA (`#E4572E`)**: Acciones primarias de alta conversión.

Los tokens de diseño (colores, sombras desplazadas, radios de borde y tipografías) están centralizados en `src/index.css` y `src/constants/brandData.js`.

---

## 3. Arquitectura del Proyecto

Estructura modular basada en separación de configuración, datos de dominio estáticos, contexto global, hooks de integración y componentes presentacionales:

```text
MANI-Landing/
├── docs/
│   └── ARQUITECTURA_E_INTEGRACION.md  # Especificación técnica y contrato con Flutter Web
├── public/
│   └── assets/
│       ├── mani_logo.png              # Logo oficial circular de MANI
│       ├── mani_sticker.jpg           # Ilustración oficial de la mascota
│       ├── mani_walking.mp4           # Animación en video de la mascota
│       └── app_screens/               # Capturas reales del flujo operativo de la app
│           ├── pantalla_inicio.jpeg
│           ├── pantalla_buscar.jpeg
│           ├── pantalla_perfil_mani.jpeg
│           ├── pantalla_reserva.jpeg
│           └── pantalla_progreso.jpeg
├── src/
│   ├── config/
│   │   └── appConfig.js               # Configuración central de URLs, contacto y metadata
│   ├── constants/
│   │   ├── brandData.js               # Pilares de marca y paleta oficial
│   │   ├── servicesData.js            # Catálogo de categorías y tarifas de referencia
│   │   ├── expertsData.js             # Perfiles destacados de aliados verificados
│   │   ├── appScreensData.js          # Pasos del recorrido interactivo de la aplicación
│   │   └── testimonialsData.js        # Reseñas verificadas y preguntas frecuentes
│   ├── context/
│   │   └── AppContext.jsx             # Estado global (URL Flutter Web, estimador, ajustes, toast)
│   ├── hooks/
│   │   └── useFlutterWeb.js           # Hook de navegación y deep-linking hacia Flutter Web
│   ├── components/
│   │   ├── common/                    # Átomos de interfaz (Button, Badge, Card, SectionHeading)
│   │   ├── layout/                    # Estructura global (Navbar, Footer, FlutterSettingsBar)
│   │   └── sections/                  # Secciones de página (hero, brand, services, howItWorks,
│   │                                  # appPreview, experts, video, testimonials, estimator, cta)
│   ├── index.css                      # Sistema de diseño y variables CSS globales
│   ├── App.jsx                        # Composición de secciones, modales y notificaciones
│   └── main.jsx                       # Punto de entrada React DOM
├── package.json
└── vite.config.js
```

---

## 4. Integración y Deep-Linking con MANI-Flutter Web

La comunicación entre `MANI-Landing` y `MANI-Flutter` se gestiona mediante `AppContext.jsx` y el hook `useFlutterWeb.js`:

| Acción en Landing | Método (`useFlutterWeb`) | Ruta generada hacia Flutter Web |
| :--- | :--- | :--- |
| Abrir aplicación general | `openFlutterApp()` | `{FLUTTER_WEB_URL}` (Flutter redirige a `/login`) |
| Seleccionar categoría de servicio | `goToService(serviceId)` | `{FLUTTER_WEB_URL}/login?servicio={serviceId}` |
| Continuar desde el estimador | `goToBooking(serviceId, { urgencia, alcance })` | `{FLUTTER_WEB_URL}/login?servicio={serviceId}&urgencia=…&alcance=…` |
| Reservar con un aliado destacado | `goToExpert(expertId)` | `{FLUTTER_WEB_URL}/login?aliado={expertId}` |

Solo se usan rutas públicas que existen en `MANI-Flutter`; el contrato vive en `src/utils/flutterRoutes.js` (ver `docs/ARQUITECTURA_E_INTEGRACION.md` §3).

### Resolución dinámica del destino (`flutterWebUrl`)
1. **Variable de entorno**: `VITE_FLUTTER_WEB_URL` si está definida en tiempo de compilación (en la imagen Docker llega como `--build-arg`, ver §6).
2. **Persistencia local / Ajuste en vivo**: desde el botón de configuración de la barra superior (`FlutterSettingsBar`) se puede modificar en caliente el puerto o dominio de `MANI-Flutter` (almacenado en `localStorage` bajo la clave `mani_flutter_web_url`). Solo se guarda un ajuste manual; los valores que dejaron versiones anteriores (`localhost` fuera de un equipo local o `<origen de la landing>/app`) se descartan.
3. **Fallback automático por ambiente** (`src/config/flutterWebUrl.js`, probado en `tests/flutterWebUrl.test.js`):
   - En desarrollo (`localhost`): apunta a `http://localhost:8080` (puerto expuesto por el contenedor de `MANI-Flutter`).
   - Landing publicada en un puerto propio (DEV/QA/PROD: `:3001`): apunta al mismo host en `:8080`, donde corre `mani-flutter-web`.
   - Landing en el puerto estándar (despliegue unificado detrás de un proxy): apunta a `${window.location.origin}/app`.

---

## 5. Requisitos y Ejecución Local

### Prerrequisitos
- **Node.js** `>= 20.x`
- **npm** `>= 10.x`

### Instalación y arranque en desarrollo
```bash
npm install
npm run dev
```
La aplicación quedará disponible en `http://localhost:5173`.

### Verificación de linter y compilación de producción
```bash
npm run lint
npm test
npm run build
npm run preview
```

---

## 6. Variables de Entorno y Despliegue

Puedes crear un archivo `.env` en la raíz del proyecto para personalizar el destino del cliente Flutter Web:

```env
VITE_FLUTTER_WEB_URL=http://localhost:8080
```

### URL de Flutter Web por ambiente (imagen Docker)

Vite incrusta `VITE_FLUTTER_WEB_URL` en el bundle al compilar, así que la URL debe llegar al `docker build`, no al contenedor en ejecución. El `Dockerfile` la recibe como `ARG` y el workflow `.github/workflows/docker-publish.yml` la pasa desde la variable `FLUTTER_WEB_URL` del GitHub Environment de cada rama:

| Rama / tag | Tag de imagen | GitHub Environment | Variable a crear | Valor esperado |
| :--- | :--- | :--- | :--- | :--- |
| `develop` | `:develop` | `dev` | `FLUTTER_WEB_URL` | URL pública de `mani-flutter-web` en el host DEV (puerto `8080`) |
| `release` | `:staging` | `qa` | `FLUTTER_WEB_URL` | URL pública de `mani-flutter-web` en el host QA (puerto `8080`) |
| `main` y tags `v*` | `:latest`, `:x.y.z` | `prod` | `FLUTTER_WEB_URL` | URL pública de `mani-flutter-web` en el host PROD (puerto `8080`) |

- Se crea en *Settings → Environments → `<ambiente>` → Environment variables* (es una variable, no un secreto: queda visible en el bundle). Los hosts de cada ambiente están en `MANI-docs/product/DOCUMENTO_INFRAESTRUCTURA_V3.md` §3; no se versionan aquí.
- Si el environment restringe ramas (*Deployment branches*), `prod` debe admitir `main` y los tags `v*`.
- Si la variable falta, el workflow lo avisa con un *warning* y la landing usa el respaldo del navegador (§4): mismo host, puerto `8080`.
- En cada PR el job `verify-pr` corre lint y pruebas, compila la imagen con una URL de prueba y comprueba que quedó en el bundle.

Compilación manual de la imagen de un ambiente:

```bash
docker build --build-arg VITE_FLUTTER_WEB_URL=http://<host>:8080 -t mani-landing .
```

El comando `npm run build` genera los artefactos estáticos optimizados en la carpeta `dist/`, listos para servirse desde Nginx, GitHub Pages, Vercel o cualquier CDN frente al Gateway y al contenedor de `MANI-Flutter`.

---

## 7. Documentación Adicional

- [Arquitectura e Integración de MANI-Landing](./docs/ARQUITECTURA_E_INTEGRACION.md)
