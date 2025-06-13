export interface ConceptRelation {
  to: string;
  type: 'prerequisite-for' | 'related-to' | 'part-of' | 'leads-to';
}

export interface ConceptMeta {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  difficulty?: number;
  relations?: ConceptRelation[];
  type?: 'concept' | 'task' | 'collection';
}

export interface Concept {
  meta: ConceptMeta;
  content: string;
}
