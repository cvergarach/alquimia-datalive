# Arquitectura - Alquimia Datalive

## 📐 Visión General

Alquimia Datalive es una plataforma de microservicios que combina múltiples modelos de AI para procesar documentación de APIs de forma inteligente.

## 🏗️ Componentes Principales

### Frontend (React + Vite)
- **Ubicación**: `/frontend`
- **Hosting**: Vercel
- **Responsabilidades**:
  - Interfaz de usuario
  - Upload de documentos
  - Visualización de resultados
  - Exportación de datos

### Backend (Node.js + Express)
- **Ubicación**: `/backend`
- **Hosting**: Render
- **Responsabilidades**:
  - API REST
  - Procesamiento de documentos
  - Orquestación de AI
  - Gestión de base de datos

### Base de Datos (Supabase/PostgreSQL)
- **Hosting**: Supabase
- **Responsabilidades**:
  - Almacenamiento de documentos
  - Cache de análisis
  - Histórico de procesamiento

## 🤖 Flujo de AI Dual

### 1. Gemini 2.0 Flash (Procesamiento Rápido)
**Responsabilidades**:
- Análisis rápido inicial
- Extracción de endpoints
- Identificación de métodos HTTP
- Detección de parámetros
- Categorización de tecnologías

**Ventajas**:
- Velocidad de procesamiento
- Bajo costo
- Alta disponibilidad

### 2. Claude Sonnet 4 (Análisis Profundo)
**Responsabilidades**:
- Descubrimiento de métricas de negocio
- Análisis arquitectónico
- Identificación de best practices
- Sugerencias de mejora
- Análisis de seguridad

**Ventajas**:
- Razonamiento profundo
- Contexto extenso
- Insights de negocio

## 🔄 Flujo de Procesamiento

```
1. Usuario sube documento (PDF/DOCX/TXT)
   ↓
2. Backend extrae texto del documento
   ↓
3. Gemini realiza análisis rápido y extrae endpoints
   ↓
4. Claude analiza métricas y genera insights
   ↓
5. Resultados se guardan en Supabase
   ↓
6. Frontend recibe y visualiza resultados
```

## 📊 Estructura de Datos

### Documento
```json
{
  "id": "uuid",
  "filename": "string",
  "file_size": "number",
  "mime_type": "string",
  "text_content": "string",
  "gemini_analysis": {
    "summary": "string",
    "technologies": ["array"],
    "endpointCount": "number",
    "complexity": "string"
  },
  "claude_analysis": {
    "architecture": "string",
    "bestPractices": ["array"],
    "improvements": ["array"],
    "useCases": ["array"],
    "security": "string"
  },
  "endpoints": [
    {
      "method": "string",
      "path": "string",
      "description": "string",
      "parameters": ["array"]
    }
  ],
  "metrics": [
    {
      "name": "string",
      "description": "string",
      "type": "string",
      "calculation": "string",
      "value": "string"
    }
  ],
  "processed": "boolean",
  "created_at": "timestamp"
}
```

## 🔐 Seguridad

### Frontend
- Variables de entorno para API URL
- Validación de archivos en cliente
- HTTPS en producción

### Backend
- CORS configurado
- Validación de tipos de archivo
- Límites de tamaño (50MB)
- Limpieza de archivos temporales
- Sanitización de inputs

### Base de Datos
- Row Level Security (RLS)
- Políticas de acceso
- Encriptación en tránsito
- Backups automáticos

## ⚡ Optimizaciones

### Procesamiento Paralelo
- Gemini y Claude trabajan en paralelo cuando es posible
- Análisis asíncrono

### Caché
- Resultados guardados en Supabase
- Evita reprocesar documentos idénticos

### Escalabilidad
- Stateless backend (fácil horizontal scaling)
- CDN para frontend (Vercel)
- Database connection pooling

## 🔮 Futuras Mejoras (Phase 2)

1. **MCP Integration**
   - Conectar con sistemas externos
   - Validación en vivo de endpoints
   - Testing automático

2. **Análisis Incremental**
   - Procesamiento de documentos grandes en chunks
   - Streaming de resultados

3. **Collaborative Features**
   - Compartir análisis
   - Comentarios y anotaciones
   - Teams

4. **Advanced AI**
   - Fine-tuning de modelos
   - Aprendizaje de preferencias
   - Auto-mejora de prompts

## 📈 Métricas de Sistema

### Performance
- Tiempo de procesamiento: < 30s para docs de 100 páginas
- Uptime: 99.9% target
- API latency: < 200ms p95

### Costos
- Gemini: ~$0.002 por documento
- Claude: ~$0.015 por documento
- Storage: Incluido en Supabase free tier

## 🛠️ Stack Tecnológico Completo

**Frontend**:
- React 18
- Vite 5
- Axios
- CSS Modules

**Backend**:
- Node.js 18+
- Express 4
- Multer (file upload)
- pdf-parse

**AI**:
- Google Generative AI SDK
- Anthropic SDK

**Database**:
- Supabase (PostgreSQL)
- JSONB para análisis

**DevOps**:
- GitHub (version control)
- Vercel (frontend)
- Render (backend)
- Supabase (database)
