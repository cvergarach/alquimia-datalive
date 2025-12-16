# Alquimia Datalive 🔮

Plataforma de AI que automatiza la lectura de documentación API extensa, extrae endpoints, conecta sistemas y descubre métricas de negocio ocultas.

## 🎯 Descripción

Alquimia Datalive es un MVP diseñado para:
- Procesar automáticamente documentación API compleja
- Extraer endpoints y parámetros de forma inteligente
- Conectar con sistemas externos
- Descubrir insights y métricas de negocio no evidentes

## 🏗️ Arquitectura

### Frontend
- **Framework**: React + Vite
- **Hosting**: Vercel
- **UI**: Componentes modulares y responsivos

### Backend
- **Runtime**: Node.js + Express
- **Hosting**: Render
- **APIs**: REST endpoints para procesamiento AI

### Base de Datos
- **Plataforma**: Supabase
- **Tipo**: PostgreSQL

### AI Engine
- **Modelos**: 
  - Gemini 2.0 Flash (procesamiento rápido)
  - Claude (análisis profundo)

## 📁 Estructura del Proyecto

```
alquimia-datalive/
├── frontend/          # Aplicación React + Vite
├── backend/           # API Node.js + Express
├── docs/              # Documentación del proyecto
└── README.md
```

## 🚀 Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## 📝 Variables de Entorno

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
```

### Backend (.env)
```
PORT=3001
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
GEMINI_API_KEY=your_gemini_key
ANTHROPIC_API_KEY=your_claude_key
```

## 👥 Team

- **CEO**: Cristián Vera
- **CTO**: Cesar

## 📄 Licencia

Propiedad privada - Todos los derechos reservados

## 🔗 Links

- [Frontend Deploy](https://alquimia-datalive.vercel.app)
- [Backend API](https://alquimia-backend.onrender.com)
