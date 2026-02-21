export interface Country {
  code: string;
  name_ko: string;
  name_en: string;
  flag: string;
  currency: string;
}

export interface Industry {
  id: string;
  label_ko: string;
  label_en: string;
  icon: string;
}

export interface Option {
  value: string;
  label_ko: string;
  label_en: string;
  icon?: string;
}

export interface Question {
  id: string;
  text_ko: string;
  text_en: string;
  options: Option[];
}

export interface DiagnosisInput {
  country: string;
  industry: string;
  answers: Record<string, string>;
  locale: "ko" | "en";
}

export interface ChecklistItem {
  title: string;
  description: string;
  tag: string;
  estimatedCost: string;
  isRequired: boolean;
  checked?: boolean;
}

export interface RoadmapPhase {
  phase: string;
  icon: string;
  color: string;
  items: ChecklistItem[];
}

export interface TaxEvent {
  month: string;
  event: string;
  type: string;
}

export interface SupportProgram {
  name: string;
  amount: string;
  description: string;
}

export interface RoadmapResult {
  id: string;
  summary: string;
  phases: RoadmapPhase[];
  totalEstimatedCost: string;
  taxCalendar: TaxEvent[];
  governmentSupport: SupportProgram[];
  createdAt: string;
  input: DiagnosisInput;
}
