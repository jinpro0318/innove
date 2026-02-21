import { GoogleGenerativeAI } from "@google/generative-ai";
import type { DiagnosisInput, RoadmapResult } from "@/lib/types";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? ""
);

const SYSTEM_PROMPT = `너는 전 세계 1인 창업자를 돕는 전문 창업 컨설턴트 AI야.
사용자의 국가, 업종, 예산, 경험에 맞는 맞춤형 창업 로드맵을 생성해.

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
          "estimatedCost": "예상 비용 (해당 국가 통화)",
          "isRequired": true
        }
      ]
    }
  ],
  "totalEstimatedCost": "총 예상 초기 비용",
  "taxCalendar": [
    { "month": "1월", "event": "부가가치세 신고", "type": "필수" }
  ],
  "governmentSupport": [
    { "name": "지원사업명", "amount": "금액", "description": "설명" }
  ]
}

국가별 실제 정보 반영:
- 한국: 홈택스, 간이과세자/일반과세자, 통신판매업, 소진공, 창진원
- 미국: LLC/Sole Proprietorship, EIN, SBA
- 일본: 株式会社/合同会社, 法務局, 税務署
- 중국: 营业执照, WFOE, 工商行政管理局

phases 3~5단계, 각 단계 항목 3~6개.
사용자 locale에 맞는 언어로 응답.`;

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
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    systemInstruction: SYSTEM_PROMPT,
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
