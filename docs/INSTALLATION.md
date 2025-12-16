# Guía de Instalación - Alquimia Datalive

## Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta en Supabase
- API Key de Google Gemini
- API Key de Anthropic (Claude)
- Cuenta en Vercel (para frontend)
- Cuenta en Render (para backend)

## 🚀 Instalación Local

### 1. Clonar Repositorio

```bash
git clone https://github.com/tu-usuario/alquimia-datalive.git
cd alquimia-datalive
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

Crear archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Editar `.env` con tus credenciales:
- SUPABASE_URL
- SUPABASE_ANON_KEY  
- GEMINI_API_KEY
- ANTHROPIC_API_KEY

### 3. Configurar Base de Datos

1. Ir a [Supabase](https://supabase.com)
2. Crear nuevo proyecto
3. Ir a SQL Editor
4. Ejecutar el contenido de `backend/supabase-schema.sql`
5. Copiar URL y Anon Key a tu `.env`

### 4. Configurar Frontend

```bash
cd ../frontend
npm install
```

Crear archivo `.env`:

```bash
cp .env.example .env
```

Editar `.env`:
```
VITE_API_URL=http://localhost:3001
```

### 5. Ejecutar en Desarrollo

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

Abrir http://localhost:5173

## 🌐 Deploy en Producción

### Deploy Backend (Render)

1. Ir a [Render](https://render.com)
2. Crear nuevo Web Service
3. Conectar repo de GitHub
4. Configurar:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment: Node
5. Agregar variables de entorno desde `.env.example`
6. Deploy!

### Deploy Frontend (Vercel)

1. Ir a [Vercel](https://vercel.com)
2. Importar proyecto de GitHub
3. Configurar:
   - Framework Preset: Vite
   - Root Directory: `frontend`
4. Agregar variable de entorno:
   - `VITE_API_URL`: URL de tu backend en Render
5. Deploy!

## 🔑 Obtener API Keys

### Google Gemini
1. Ir a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crear API Key
3. Copiar a GEMINI_API_KEY

### Anthropic Claude
1. Ir a [Anthropic Console](https://console.anthropic.com/)
2. Crear API Key
3. Copiar a ANTHROPIC_API_KEY

## ✅ Verificar Instalación

1. Backend: http://localhost:3001 debe mostrar mensaje de bienvenida
2. Frontend: http://localhost:5173 debe cargar la interfaz
3. Subir un documento de prueba para verificar el flujo completo

## 🐛 Troubleshooting

### Error de CORS
- Verificar que CORS esté habilitado en backend
- Verificar URL del API en frontend

### Error de Supabase
- Verificar credenciales en .env
- Verificar que el schema esté ejecutado
- Verificar políticas RLS

### Error de AI APIs
- Verificar que las API Keys sean válidas
- Verificar límites de uso/cuota

## 📚 Próximos Pasos

- Revisar la documentación en `/docs`
- Explorar ejemplos de uso
- Configurar monitoring y logs
