# Alquimia Datalive - Frontend

Interfaz web moderna para la plataforma de análisis de documentación API con IA.

## 🚀 Quick Start

```bash
npm install
cp .env.example .env
# Configurar VITE_API_URL
npm run dev
```

Abrir http://localhost:5173

## ✨ Features

- 📤 Upload de documentos drag & drop
- 🤖 Procesamiento con AI en tiempo real
- 📊 Visualización de resultados
- 🔗 Exploración de endpoints
- 💡 Dashboard de métricas
- 💾 Exportación de datos

## 🏗️ Estructura

```
frontend/
├── public/              # Assets estáticos
├── src/
│   ├── main.jsx        # Punto de entrada
│   ├── App.jsx         # Componente principal
│   ├── components/     # Componentes reutilizables
│   │   ├── DocumentUploader.jsx
│   │   └── ResultsDisplay.jsx
│   ├── services/       # Servicios de API
│   │   └── api.js
│   └── pages/          # Páginas (futuro)
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Componentes

### DocumentUploader
Maneja la carga de archivos y visualiza el estado del procesamiento.

**Props**:
- `onResults(data)`: Callback con resultados
- `onLoading(bool)`: Callback de estado de carga

### ResultsDisplay
Muestra los resultados del análisis de forma visual.

**Props**:
- `results`: Objeto con endpoints, métricas y análisis

## 🔧 Configuración

### Variables de Entorno

```env
VITE_API_URL=http://localhost:3001
```

En producción:
```env
VITE_API_URL=https://api.alquimia-datalive.onrender.com
```

## 🎨 Estilos

- CSS Modules
- Variables CSS (dark theme)
- Animaciones suaves
- Responsive design

### Color Palette
```css
--primary-color: #6366f1    /* Indigo */
--secondary-color: #8b5cf6  /* Purple */
--background: #0f172a       /* Dark blue */
--surface: #1e293b          /* Lighter dark blue */
```

## 📦 Build

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 🚢 Deploy en Vercel

### Automático (Recomendado)

1. Conectar repo en Vercel
2. Configurar:
   - Framework: Vite
   - Root: `frontend`
3. Agregar variable: `VITE_API_URL`
4. Deploy!

### Manual

```bash
npm run build
vercel --prod
```

## 🧪 Testing

```bash
# Ejecutar tests (próximamente)
npm test
```

## 📱 Responsive

- Mobile first
- Breakpoints estándar
- Touch friendly
- PWA ready (futuro)

## ♿ Accesibilidad

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader friendly

## 🔮 Próximas Features

- [ ] Historial de uploads
- [ ] Comparación de documentos
- [ ] Dark/Light theme toggle
- [ ] Búsqueda en resultados
- [ ] Filtros avanzados
- [ ] Compartir resultados
