-- Setup pgvector extension for semantic search
-- Run this in your NeonDB console first

-- 1. Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Add embedding columns to existing tables (384 dimensions for multilingual-e5-small)
ALTER TABLE rights_guide
ADD COLUMN IF NOT EXISTS embedding vector(384);

ALTER TABLE employment_laws
ADD COLUMN IF NOT EXISTS embedding vector(384);

ALTER TABLE faq
ADD COLUMN IF NOT EXISTS embedding vector(384);

ALTER TABLE wage_rules
ADD COLUMN IF NOT EXISTS embedding vector(384);

-- 3. Create indexes for fast vector similarity search using HNSW algorithm
-- HNSW (Hierarchical Navigable Small World) is faster than IVFFlat for most cases
CREATE INDEX IF NOT EXISTS idx_rights_guide_embedding
ON rights_guide USING hnsw (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS idx_employment_laws_embedding
ON employment_laws USING hnsw (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS idx_faq_embedding
ON faq USING hnsw (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS idx_wage_rules_embedding
ON wage_rules USING hnsw (embedding vector_cosine_ops);

-- 4. Create a function to search across all knowledge tables
CREATE OR REPLACE FUNCTION search_knowledge_base(
  query_embedding vector(384),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  id integer,
  content text,
  reference text,
  source text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM (
    -- Search rights_guide
    SELECT
      rg.id,
      ('Q: ' || rg.question || E'\nA: ' || rg.answer) as content,
      COALESCE(rg.law_ref, '') as reference,
      'rights_guide'::text as source,
      1 - (rg.embedding <=> query_embedding) as similarity
    FROM rights_guide rg
    WHERE rg.embedding IS NOT NULL

    UNION ALL

    -- Search employment_laws
    SELECT
      el.id,
      (el.title || ' - ' || COALESCE(el.section, '') || ': ' || el.content) as content,
      (el.title || '-' || COALESCE(el.section, '')) as reference,
      'employment_laws'::text as source,
      1 - (el.embedding <=> query_embedding) as similarity
    FROM employment_laws el
    WHERE el.embedding IS NOT NULL

    UNION ALL

    -- Search FAQ
    SELECT
      f.id,
      ('Q: ' || f.question || E'\nA: ' || f.answer) as content,
      ''::text as reference,
      'faq'::text as source,
      1 - (f.embedding <=> query_embedding) as similarity
    FROM faq f
    WHERE f.embedding IS NOT NULL

    UNION ALL

    -- Search wage_rules
    SELECT
      wr.id,
      (wr.rule_name || ': ' || wr.description || COALESCE(' Formula: ' || wr.formula, '')) as content,
      COALESCE(wr.law_reference, '') as reference,
      'wage_rules'::text as source,
      1 - (wr.embedding <=> query_embedding) as similarity
    FROM wage_rules wr
    WHERE wr.embedding IS NOT NULL
  ) combined_results
  WHERE similarity > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

-- 5. Verify pgvector is installed
SELECT * FROM pg_extension WHERE extname = 'vector';
