# Alquimia Datalive - Backend API

API REST para procesamiento de documentación de APIs con inteligencia artificial dual (Gemini + Claude).

## 🚀 Quick Start

```bash
npm install
cp .env.example .env
# Configurar variables de entorno
npm run dev
```

## 📡 Endpoints

### GET `/`
Información general del API
```json
{
  "message": "🔮 Alquimia Datalive API",
  "version": "0.1.0",
  "status": "active"
}
```

### POST `/api/upload`
Subir y procesar documento
- **Content-Type**: `multipart/form-data`
- **Field**: `document` (archivo PDF, TXT o DOCX)
- **Max Size**: 50MB

**Response**:
```json
{
  "success": true,
  "documentId": "uuid",
  "summary": "...",
  "endpoints": [...],
  "metrics": [...],
  "stats": {...}
}
```

### GET `/api/analysis/:id`
Obtener análisis completo de un documento

### GET `/api/endpoints/:id`
Obtener solo endpoints extraídos

### GET `/api/metrics/:id`
Obtener solo métricas descubiertas

## 🔧 Configuración

### Variables de Entorno

```env
PORT=3001
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx
GEMINI_API_KEY=xxx
ANTHROPIC_API_KEY=xxx
```

## 🏗️ Estructura

```
backend/
├── src/
│   ├── server.js           # Punto de entrada
│   ├── config/             # Configuraciones
│   │   ├── supabase.js
│   │   ├── gemini.js
│   │   └── claude.js
│   ├── controllers/        # Controladores
│   │   ├── uploadController.js
│   │   └── analysisController.js
│   ├── services/           # Lógica de negocio
│   │   ├── documentService.js
│   │   ├── geminiService.js
│   │   └── claudeService.js
│   └── routes/             # Rutas
│       ├── upload.js
│       └── analysis.js
├── package.json
└── supabase-schema.sql     # Schema de BD
```

## 🤖 Servicios de AI

### Gemini Service
- Análisis rápido inicial
- Extracción de endpoints
- Detección de tecnologías

### Claude Service
- Descubrimiento de métricas
- Análisis profundo
- Insights de negocio

## 📦 Dependencias Principales

- `express`: Framework web
- `@google/generative-ai`: SDK de Gemini
- `@anthropic-ai/sdk`: SDK de Claude
- `@supabase/supabase-js`: Cliente de Supabase
- `multer`: Upload de archivos
- `pdf-parse`: Extracción de texto PDF

## 🔐 Seguridad

- CORS habilitado
- Validación de tipos de archivo
- Límites de tamaño
- Limpieza de archivos temporales
- Variables de entorno para credenciales

## 🐛 Debugging

```bash
# Modo desarrollo con auto-reload
npm run dev

# Logs detallados
DEBUG=* npm run dev
```

## 📊 Monitoring

- Logs a consola
- Error tracking
- Performance metrics (próximamente)

## 🚢 Deploy

### Render

1. Conectar repo
2. Configurar build: `cd backend && npm install`
3. Configurar start: `cd backend && npm start`
4. Agregar variables de entorno
5. Deploy!

### Variables Requeridas
- PORT (automático en Render)
- SUPABASE_URL
- SUPABASE_ANON_KEY
- GEMINI_API_KEY
- ANTHROPIC_API_KEY
