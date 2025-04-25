
export interface User {
  id: string;
  email: string;
  name?: string;
  certification_status: 'pending' | 'passed';
  certification_date?: string;
  onboard_complete: boolean;
  created_at: string;
  updated_at: string;
}

export interface EditorDraft {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CertAttempt {
  id: string;
  user_id: string;
  content: string;
  client_results: EdictsValidationResult;
  ai_results?: AIValidationResult;
  passed: boolean;
  created_at: string;
}

export interface BadCopySample {
  id: string;
  title: string;
  content: string;
  active: boolean;
  created_at: string;
}

export interface Edict {
  id: number;
  pillar_id: number;
  name: string;
  description: string;
  example: string;
  threshold: number;
  validator_type: 'client' | 'ai' | 'both';
}

export interface Pillar {
  id: number;
  name: string;
  description: string;
  edicts: Edict[];
}

export interface EdictsSystem {
  pillars: Pillar[];
}

export interface EdictsValidationResult {
  total_score: number;
  edict_results: {
    [edict_id: number]: {
      passed: boolean;
      score: number;
      feedback?: string;
      highlights?: Array<{
        start: number;
        end: number;
        type: 'success' | 'warning' | 'error';
      }>;
    }
  };
}

export interface AIValidationResult {
  total_score: number;
  passing_threshold: number;
  passed: boolean;
  feedback: string;
  edict_results: {
    [edict_id: number]: {
      passed: boolean;
      score: number;
      feedback: string;
    }
  };
}

export interface Thresholds {
  client_review_minimum_score: number;
  certification_minimum_score: number;
  edicts: {
    [edict_id: number]: {
      passing_threshold: number;
      weight: number;
    }
  };
}
