-- Tabla de documentos procesados
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  text_content TEXT,
  gemini_analysis JSONB,
  claude_analysis JSONB,
  endpoints JSONB,
  metrics JSONB,
  processed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON documents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_documents_processed ON documents(processed);
CREATE INDEX IF NOT EXISTS idx_documents_filename ON documents(filename);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para updated_at
DROP TRIGGER IF EXISTS update_documents_updated_at ON documents;
CREATE TRIGGER update_documents_updated_at 
  BEFORE UPDATE ON documents 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserts (ajustar según necesidades de auth)
CREATE POLICY "Allow inserts for all users" ON documents
  FOR INSERT
  WITH CHECK (true);

-- Política para permitir selects
CREATE POLICY "Allow selects for all users" ON documents
  FOR SELECT
  USING (true);

-- Comentarios de documentación
COMMENT ON TABLE documents IS 'Almacena documentos de API procesados con análisis de Gemini y Claude';
COMMENT ON COLUMN documents.gemini_analysis IS 'Análisis rápido realizado por Gemini 2.0 Flash';
COMMENT ON COLUMN documents.claude_analysis IS 'Análisis profundo realizado por Claude';
COMMENT ON COLUMN documents.endpoints IS 'Array de endpoints extraídos de la documentación';
COMMENT ON COLUMN documents.metrics IS 'Métricas de negocio descubiertas por el análisis';
