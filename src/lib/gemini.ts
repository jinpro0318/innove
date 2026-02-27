import { GoogleGenerativeAI } from "@google/generative-ai";
import type { DiagnosisInput, RoadmapResult } from "@/lib/types";
import { getCountryStartupInfo } from "@/data/country-startup-info";
import { countries } from "@/data/countries";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? ""
);

function buildSystemPrompt(countryCode: string, locale: string): string {
  const info = getCountryStartupInfo(countryCode);
  const country = countries.find((c) => c.code === countryCode);
  const countryName = locale === "en" ? (country?.name_en ?? countryCode) : (country?.name_ko ?? countryCode);

  // 나라별 세금 달력 컨텍스트
  let taxCalendarContext = "";
  if (info) {
    const isEn = locale === "en";
    taxCalendarContext = info.taxDeadlines.map((td) =>
      `- ${isEn ? td.month_en : td.month_ko}: ${isEn ? td.event_en : td.event_ko} (${td.type === "required" ? (isEn ? "Required" : "필수") : (isEn ? "Optional" : "선택")})`
    ).join("\n");
  }

  // 나라별 정부 지원 컨텍스트
  let govContext = "";
  if (info) {
    const isEn = locale === "en";
    govContext = info.governmentResources.map((r) =>
      `- ${isEn ? r.name_en : r.name_ko}: ${isEn ? r.desc_en : r.desc_ko} (${r.url})`
    ).join("\n");
  }

  // 나라별 AI 프롬프트 컨텍스트
  const aiContext = info?.aiPromptContext ?? "";

  return `너는 전 세계 1인 창업자를 돕는 전문 창업 컨설턴트 AI야.
사용자의 국가, 업종, 예산, 경험에 맞는 맞춤형 창업 로드맵을 생성해.

현재 상담 국가: ${countryName}
${aiContext}

반드시 아래 JSON 형식으로만 응답해. 마크다운 코드블록이나 다른 텍스트 절대 포함하지 마. 순수 JSON만.

{
  "summary": "한 줄 요약",
  "phases": [
    {
      "phase": "1단계: 준비",
      "icon": "📋",
      "color": "#6C5CE7",
      "items": [
        {
          "title": "할 일 제목",
          "description": "구체적 설명 (해당 국가의 실제 절차, 실제 비용, 실제 기관명 포함)",
          "tag": "소요 기간",
          "estimatedCost": "예상 비용 (해당 국가 통화: ${country?.currency ?? "KRW"})",
          "isRequired": true
        }
      ]
    }
  ],
  "totalEstimatedCost": "총 예상 초기 비용 (${country?.currency ?? "KRW"})",
  "taxCalendar": [
    { "month": "1월", "event": "세금 신고", "type": "필수" }
  ],
  "governmentSupport": [
    { "name": "지원사업명", "amount": "금액", "description": "설명" }
  ]
}

${countryName} 세금 달력 참고:
${taxCalendarContext || "일반적인 세금 일정을 생성해줘."}

${countryName} 정부 지원기관 참고:
${govContext || "해당 나라의 주요 정부 지원기관을 포함해줘."}

taxCalendar는 반드시 ${countryName}의 실제 세금 일정 기반으로 생성해.
비용은 반드시 ${countryName} 현지 통화(${country?.currency ?? "KRW"})로 표시해.

phases 3~5단계, 각 단계 항목 3~6개.
사용자 locale에 맞는 언어로 응답.`;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function cleanJSON(raw: string): string {
  let cleaned = raw.trim();
  // remove markdown code fences
  cleaned = cleaned.replace(/^```(?:json)?\s*\n?/i, "");
  cleaned = cleaned.replace(/\n?\s*```$/i, "");
  return cleaned.trim();
}

export async function generateRoadmap(
  input: DiagnosisInput
): Promise<RoadmapResult> {
  const systemPrompt = buildSystemPrompt(input.country, input.locale);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    systemInstruction: systemPrompt,
  });

  const langInstruction = input.locale === "en"
    ? "Respond entirely in English."
    : "한국어로 응답해줘.";

  const userPrompt = `국가: ${input.country}, 업종: ${input.industry}, 팀: ${input.answers.team_size}, 사업장: ${input.answers.location_type}, 예산: ${input.answers.budget}, 경험: ${input.answers.experience}. 맞춤 창업 로드맵을 JSON으로 생성해줘. ${langInstruction}`;

  const result = await model.generateContent(userPrompt);
  const text = result.response.text();

  const parsed = JSON.parse(cleanJSON(text));

  const roadmap: RoadmapResult = {
    id: generateId(),
    summary: parsed.summary,
    phases: parsed.phases,
    totalEstimatedCost: parsed.totalEstimatedCost,
    taxCalendar: parsed.taxCalendar,
    governmentSupport: parsed.governmentSupport,
    createdAt: new Date().toISOString(),
    input,
  };

  return roadmap;
}

// register-guide에서 사용하는 나라별 시스템 프롬프트 빌더
export function buildRegisterGuidePrompt(countryCode: string, locale: string): string {
  const info = getCountryStartupInfo(countryCode);
  const country = countries.find((c) => c.code === countryCode);
  const countryName = locale === "en" ? (country?.name_en ?? countryCode) : (country?.name_ko ?? countryCode);
  const currency = country?.currency ?? "KRW";
  const aiContext = info?.aiPromptContext ?? "";

  return `너는 ${countryName} 사업자등록 전문 컨설턴트 AI야.
${aiContext}

사용자의 업종, 사업자 유형, 사업장 유형에 맞는 사업자등록 가이드를 생성해.

반드시 아래 JSON 형식으로만 응답해. 마크다운 코드블록이나 다른 텍스트 절대 포함하지 마.

{
  "summary": "한 줄 요약",
  "steps": [
    {
      "title": "절차 제목",
      "description": "구체적 설명 (실제 사이트, 기관명 포함)",
      "where": "어디서",
      "documents": "필요 서류",
      "time": "소요 시간",
      "cost": "비용 (${currency})",
      "isRequired": true
    }
  ],
  "totalTime": "전체 예상 소요 시간",
  "totalCost": "전체 예상 비용 (${currency})",
  "tips": ["실용적인 팁 3~5개"],
  "warnings": ["주의사항 2~3개"]
}

steps는 5~8개, ${countryName}의 실제 사업자등록 절차를 반영.
비용은 반드시 ${currency}로 표시.
사용자 locale에 맞는 언어로 응답.`;
}
