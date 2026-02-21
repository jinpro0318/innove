import { Question } from "@/lib/types";

export const questions: Question[] = [
  {
    id: "team_size",
    text_ko: "몇 명이서 시작하시나요?",
    text_en: "How many people are starting this business?",
    options: [
      { value: "solo", label_ko: "혼자서", label_en: "Solo", icon: "👤" },
      { value: "small", label_ko: "2~3명", label_en: "2-3 people", icon: "👥" },
      { value: "team", label_ko: "4명 이상", label_en: "4+ people", icon: "👥👥" },
    ],
  },
  {
    id: "location_type",
    text_ko: "사업장 유형은 어떻게 생각하세요?",
    text_en: "What type of business location do you prefer?",
    options: [
      { value: "home", label_ko: "자택 (홈오피스)", label_en: "Home office", icon: "🏠" },
      { value: "virtual", label_ko: "비상주 사무실", label_en: "Virtual office", icon: "🏢" },
      { value: "store", label_ko: "실제 매장·사무실", label_en: "Physical store / office", icon: "🏪" },
      { value: "unsure", label_ko: "모르겠어요", label_en: "Not sure", icon: "🤷" },
    ],
  },
  {
    id: "budget",
    text_ko: "초기 예산은 어느 정도인가요?",
    text_en: "What is your initial budget?",
    options: [
      { value: "under_1m", label_ko: "100만원 이하", label_en: "Under $1,000", icon: "💵" },
      { value: "1m_5m", label_ko: "100~500만원", label_en: "$1,000 - $5,000", icon: "💰" },
      { value: "5m_10m", label_ko: "500~1,000만원", label_en: "$5,000 - $10,000", icon: "💰💰" },
      { value: "over_10m", label_ko: "1,000만원 이상", label_en: "Over $10,000", icon: "💎" },
    ],
  },
  {
    id: "experience",
    text_ko: "창업 경험이 있으신가요?",
    text_en: "Do you have any business startup experience?",
    options: [
      { value: "none", label_ko: "완전 처음이에요", label_en: "Complete beginner", icon: "🌱" },
      { value: "studied", label_ko: "공부는 해봤어요", label_en: "Studied about it", icon: "📖" },
      { value: "registered", label_ko: "사업자는 있어요", label_en: "Already registered", icon: "📋" },
      { value: "experienced", label_ko: "창업 경험 있어요", label_en: "Experienced", icon: "🏆" },
    ],
  },
];
