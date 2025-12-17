# 💒 Invitación Digital de Boda - Naydelin & Emmanuel

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0.3-646cff?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

**Invitación de boda digital elegante y personalizada**

[Demo](#) | [Características](#características) | [Instalación](#instalación) | [Documentación](#documentación)

</div>

---

## 📖 Índice

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Componentes Principales](#componentes-principales)
- [Integración con API](#integración-con-api)
- [Deployment](#deployment)
- [Personalización](#personalización)
- [Créditos](#créditos)

---

## 📝 Descripción

Invitación digital de boda moderna y elegante desarrollada con React y Vite. Presenta un diseño sofisticado con elementos decorativos florales, animaciones suaves, y funcionalidades interactivas como contador regresivo, formulario RSVP, galería de fotos, y mapa de ubicación.

**Evento:** Boda de Naydelin & Emmanuel  
**Fecha:** 28 de Febrero, 2026  
**Lugar:** Chocamán, Veracruz, México

---

## ✨ Características

### 🎨 Diseño y UI

- ✅ **Diseño responsive** - Optimizado para móvil, tablet y desktop
- ✅ **Tema elegante** - Paleta de colores cálidos (dorado, café, crema)
- ✅ **Tipografías personalizadas** - Alex Brush, Cormorant, Crimson Text
- ✅ **Elementos decorativos** - Flores vectoriales SVG, texturas sutiles
- ✅ **Animaciones suaves** - Transiciones CSS y efectos hover
- ✅ **Hero interactivo** - Portada con fade-in y botón de apertura

### 📅 Funcionalidades Interactivas

- ⏰ **Contador regresivo** - Días, horas, minutos y segundos hasta el evento
- 📋 **Formulario RSVP** - Confirmación de asistencia con:
  - Selección de número de adultos
  - Menú personalizado por adulto
  - Registro de alergias alimentarias
  - Validación de campos
  - Integración con API backend
- 📸 **Galería de fotos** - Compartir fotos del evento con código único
- 🗺️ **Mapas de ubicación** - Google Maps embebido para ceremonia y recepción
- 🎁 **Registro de regalos** - Enlaces a tiendas y opción de transferencia
- 📞 **Modal de contacto** - Formulario para solicitar invitaciones personalizadas

### 🔐 Seguridad y Backend

- 🔒 **Autenticación Basic Auth** - Credenciales seguras para API
- 🛡️ **Token CSRF** - Protección contra ataques Cross-Site Request Forgery
- 📡 **API REST** - Integración con backend para almacenar confirmaciones y contactos

### 🚀 Rendimiento

- ⚡ **Vite** - Build tool ultrarrápido
- 📦 **Optimización de assets** - Imágenes y fuentes optimizadas
- 🎯 **Lazy loading** - Carga diferida de componentes pesados
- 💨 **Fast Refresh** - Desarrollo con HMR (Hot Module Replacement)

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 18.3.1** - Librería UI con Hooks
- **Vite 6.0.3** - Build tool y dev server
- **TailwindCSS 3.4.17** - Framework CSS utility-first
- **Lucide React 0.469.0** - Iconos SVG modernos
- **PostCSS 8.4.49** - Procesador CSS
- **Autoprefixer 10.4.20** - Prefijos CSS automáticos

### Dependencias de Desarrollo

- **ESLint 9.17.0** - Linter JavaScript/React
- **@vitejs/plugin-react 4.3.4** - Plugin React para Vite
- **Tailwind Config** - Configuración personalizada de Tailwind

### APIs y Servicios Externos

- **Google Fonts** - Alex Brush, Cormorant, Crimson Text
- **Google Maps** - Mapas embebidos para ubicaciones
- **Backend API** - Endpoints para RSVP y contacto
  - `GET https://form.myinvitacion.com.mx/api/csrf` - Token CSRF
  - `POST https://form.myinvitacion.com.mx/api/blog-forms` - Formulario contacto

---

## 📁 Estructura del Proyecto

```
boda-naydelin-emmanuel/
├── public/                          # Assets estáticos
│   └── vite.svg
├── src/
│   ├── components/                  # Componentes React
│   │   ├── ContactModal.jsx        # Modal de contacto con CSRF
│   │   ├── ContactModal-CSRF.jsx   # Versión con logs
│   │   ├── LocationMaps.jsx        # Mapas de ubicación
│   │   └── ...
│   ├── App.jsx                      # Componente principal
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Estilos globales
├── .gitignore
├── eslint.config.js
├── index.html                       # Template HTML
├── package.json                     # Dependencias
├── postcss.config.js                # Config PostCSS
├── tailwind.config.js               # Config Tailwind
├── vite.config.js                   # Config Vite
└── README.md                        # Este archivo
```

### Componentes Principales

```
App.jsx
├── Hero Section
│   ├── FloralTop (SVG)
│   ├── Nombres de los novios
│   ├── Fecha del evento
│   └── Botón "Abrir invitación"
├── Main Content
│   ├── Welcome Section
│   ├── Countdown Timer
│   ├── Ceremony & Reception Cards
│   ├── Itinerary Timeline
│   ├── LocationMaps
│   ├── Photo Gallery
│   ├── Gift Registry
│   ├── RSVP Form (con Modal)
│   └── Sunset Image
└── Footer
    ├── Contact Button
    └── ContactModal
```

---

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/boda-naydelin-emmanuel.git
   cd boda-naydelin-emmanuel
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Instalar Lucide React (iconos)**
   ```bash
   npm install lucide-react
   ```

4. **Configurar variables de entorno (opcional)**
   ```bash
   cp .env.example .env
   ```
   
   Editar `.env`:
   ```env
   VITE_API_USERNAME=usuario
   VITE_API_PASSWORD=contraseña
   ```

5. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

6. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

---

## ⚙️ Configuración

### Tailwind CSS

El archivo `tailwind.config.js` está configurado con:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Vite

El archivo `vite.config.js` incluye el plugin de React:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### PostCSS

El archivo `postcss.config.js` procesa Tailwind y Autoprefixer:

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 🧩 Componentes Principales

### 1. ContactModal.jsx

**Propósito:** Modal de contacto para solicitar invitaciones personalizadas.

**Props:**
- `isOpen` (boolean) - Controla visibilidad del modal
- `onClose` (function) - Callback para cerrar el modal

**Características:**
- Formulario con validación
- Integración con API (flujo de 2 pasos con CSRF)
- Estados de carga y éxito/error
- Diseño responsive

**Flujo de Envío:**
```
1. Usuario llena formulario (nombre, email, mensaje)
2. GET /api/csrf → Obtiene token CSRF
3. POST /api/blog-forms con token → Guarda contacto
4. Muestra mensaje de éxito
5. Cierra modal automáticamente
```

**Uso:**
```jsx
const [showContactModal, setShowContactModal] = useState(false);

<button onClick={() => setShowContactModal(true)}>
  Solicita la tuya aquí
</button>

<ContactModal 
  isOpen={showContactModal} 
  onClose={() => setShowContactModal(false)} 
/>
```

### 2. LocationMaps.jsx

**Propósito:** Mostrar mapas de ubicación para ceremonia y recepción.

**Características:**
- Google Maps embebido (iframe)
- Dos columnas en desktop, stacked en móvil
- Botones para abrir en Google Maps
- Información de dirección y horario
- Responsive design

**Uso:**
```jsx
import LocationMaps from './LocationMaps';

<LocationMaps />
```

### 3. RSVP Modal

**Propósito:** Formulario de confirmación de asistencia.

**Campos:**
- Nombre del invitado
- Asistirá (Sí/No)
- Número de adultos (1-10)
- Menú por adulto (Carne/Pescado/Vegetariano)
- Alergias alimentarias (opcional)

**Validaciones:**
- Campos requeridos
- Si "No" asiste, no se envía a la API
- Si "Sí" asiste, valida que haya nombres de adultos

**Estados:**
- Inicial, Enviando, Éxito, Error

---

## 🔌 Integración con API

### Endpoints

#### 1. Obtener Token CSRF

```http
GET https://form.myinvitacion.com.mx/api/csrf
Authorization: Basic dXNlcjpwYXNzd29yZA==
```

**Response:**
```json
{
  "csrfToken": "3af21827-d7c2-4b0f-81d0-0442ca26b6c5",
  "headerName": "X-XSRF-TOKEN",
  "parameterName": "_csrf"
}
```

#### 2. Enviar Formulario de Contacto

```http
POST https://form.myinvitacion.com.mx/api/blog-forms
Authorization: Basic dXNlcjpwYXNzd29yZA==
X-XSRF-TOKEN: {token del paso 1}
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "usuario@example.com",
  "fullName": "Nombre Usuario",
  "description": "Mensaje del formulario",
  "country": "México"
}
```

**Response (201 Created):**
```json
{
  "id": "69421e222525302ba5f76cf1",
  "email": "usuario@example.com",
  "fullName": "Nombre Usuario",
  "description": "Mensaje del formulario",
  "country": "México",
  "createdAt": "2025-12-17T03:06:10.453207194",
  "updatedAt": "2025-12-17T03:06:10.453230529",
  "deleted": false
}
```

### Autenticación

**Basic Auth:**
- Username: `usuario`
- Password: `contraseña`
- Base64: `dXNlcjpwYdsidosndyZA==`

**Header:**
```
Authorization: Basic dXNlcjpwYXNzd29yZA==
```

### Seguridad CSRF

El flujo de 2 pasos previene ataques CSRF:

1. **GET** para obtener token único
2. **POST** con token en header `X-XSRF-TOKEN`

---

## 🚢 Deployment

### Build de Producción

```bash
npm run build
```

Genera carpeta `dist/` con assets optimizados.

### Plataformas Recomendadas

#### Netlify
```bash
# Configuración
Build command: npm run build
Publish directory: dist

# Variables de entorno
VITE_API_USERNAME=usuario
VITE_API_PASSWORD=contraseña
```

#### Vercel
```bash
# Configuración automática detecta Vite

# Variables de entorno
VITE_API_USERNAME=usuario
VITE_API_PASSWORD=contraseña
```

#### Railway
```bash
# Dockerfile o configuración de build
npm run build

# Variables de entorno en Variables tab
VITE_API_USERNAME=usuario
VITE_API_PASSWORD=contraseña
```

### Variables de Entorno en Producción

Configurar en el dashboard de la plataforma:

```env
VITE_API_USERNAME=usuario
VITE_API_PASSWORD=contraseña
```

---

## 🎨 Personalización

### Colores

Editar en `App.jsx` o crear variables CSS:

```javascript
// Paleta actual
const colors = {
  primary: '#8b6f47',      // Café dorado
  secondary: '#6d5838',    // Café oscuro
  accent: '#e8d5c4',       // Crema
  text: '#6b5d52',         // Café grisáceo
  light: '#b5a090'         // Beige claro
};
```

### Tipografías

Cambiar fuentes en `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=TuFuente&display=swap" rel="stylesheet">
```

Y actualizar en los estilos:
```javascript
fontFamily: "'TuFuente', serif"
```

### Imágenes

Reemplazar imágenes en:
- Hero: `url('/ruta/a/tu/imagen.jpg')`
- Sunset: `url('/ruta/a/tu/sunset.jpg')`
- Flores: Modificar componentes SVG `FloralTop`, `FloralDivider`

### Mapas

Actualizar en `LocationMaps.jsx`:

1. **Obtener código de Google Maps:**
   - Ir a [Google Maps](https://www.google.com/maps)
   - Buscar ubicación
   - Click en "Compartir" → "Insertar un mapa"
   - Copiar el `src` del iframe

2. **Actualizar enlaces de navegación:**
   ```javascript
   // Formato: https://www.google.com/maps/dir/?api=1&destination=LAT,LNG
   href="https://www.google.com/maps/dir/?api=1&destination=19.4326,-99.1332"
   ```

### Fechas y Horarios

Actualizar en `App.jsx`:

```javascript
// Fecha del evento
const weddingDate = new Date('2026-02-28T17:00:00');

// Hora de ceremonia
<p>Ceremonia: 5:00 PM</p>

// Hora de recepción  
<p>Recepción: 7:30 PM</p>
```

---

## 📚 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Build optimizado para producción
npm run preview      # Preview del build de producción

# Linting
npm run lint         # Ejecuta ESLint
```

---

## 🐛 Troubleshooting

### Error: "Module not found: lucide-react"

```bash
npm install lucide-react
```

### Error de CORS en desarrollo

El servidor de desarrollo de Vite corre en `localhost:5173` (HTTP). Si la API requiere HTTPS, puede haber problemas de mixed content.

**Solución:** Configurar proxy en `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://form.myinvitacion.com.mx',
        changeOrigin: true,
      }
    }
  }
})
```

### Modal no se cierra al hacer clic afuera

Asegúrate de que el `onClick` del overlay incluye `onClose`:

```jsx
<div onClick={onClose} className="fixed inset-0...">
  <div onClick={(e) => e.stopPropagation()}>
    {/* Contenido del modal */}
  </div>
</div>
```

---

## 📖 Documentación Adicional

### Guías Creadas

- `BOTONES-MEJORADOS.md` - Diseños alternativos para botón de contacto
- `GUIA-CSRF.md` - Documentación del flujo CSRF
- `VERIFICACION-API.md` - Cómo verificar la integración con API
- `DIAGNOSTICO-CSRF.md` - Troubleshooting de problemas con CSRF
- `SOLUCION-GET-CSRF.md` - Corrección del método GET para CSRF

### Componentes Alternativos

- `ContactModal-DEBUG-CSRF.jsx` - Versión con logs detallados
- `footer-mejorado.jsx` - Footer con botón opción 1
- `footer-opcion2.jsx` - Footer con botón opción 2
- `footer-opcion3.jsx` - Footer con botón opción 3
- `footer-opcion4.jsx` - Footer con botón opción 4

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 👥 Créditos

### Desarrollo
- **Desarrollador:** Emmanuel (Pakal Soluciones MX - Digital Software Engineering Senior Analyst)
- **Diseño:** Personalizado para Naydelin & Emmanuel

### Tecnologías
- React Team
- Vite Team
- Tailwind CSS Team
- Lucide Icons

### Inspiración
Diseño inspirado en invitaciones de boda elegantes con temática vintage y romántica.

---

## 📞 Contacto

Para solicitar una invitación personalizada similar:
- 🌐 Website: [myinvitacion.com.mx](https://myinvitacion.com.mx)
- 📧 Email: [contacto@myinvitacion.com.mx](mailto:contacto@myinvitacion.com.mx)
- 💬 WhatsApp: Disponible en el sitio web

---

## 🎉 Agradecimientos Especiales

Gracias a Naydelin y Emmanuel por confiar en este proyecto para celebrar su día especial.

**¡Felicidades a los novios!** 💒💕

---

<div align="center">

**Hecho con Emmanuel Sandoval usando React + Vite**

[⬆ Volver arriba](#-invitación-digital-de-boda---naydelin--emmanuel)

</div>