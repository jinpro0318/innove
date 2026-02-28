// 12개국 나라별 창업 데이터
export interface BusinessStructure {
  id: string;
  name_ko: string;
  name_en: string;
  name_local?: string;
  liability_ko: string;
  liability_en: string;
  setup_cost_ko: string;
  setup_cost_en: string;
  setup_time_ko: string;
  setup_time_en: string;
  pros_ko: string;
  pros_en: string;
  cons_ko: string;
  cons_en: string;
  recommend_ko: string;
  recommend_en: string;
}

export interface CountryBusinessCategory {
  id: string;
  label_ko: string;
  label_en: string;
  icon: string;
  desc_ko: string;
  desc_en: string;
}

export interface LocationType {
  id: string;
  name_ko: string;
  name_en: string;
  icon: string;
  cost_ko: string;
  cost_en: string;
  caution_ko: string;
  caution_en: string;
  suitable_ko: string;
  suitable_en: string;
}

export interface TaxDeadline {
  month_ko: string;
  month_en: string;
  event_ko: string;
  event_en: string;
  type: "required" | "optional";
}

export interface GovernmentResource {
  name_ko: string;
  name_en: string;
  url: string;
  desc_ko: string;
  desc_en: string;
}

export interface RegistrationStep {
  step: number;
  title_ko: string;
  title_en: string;
  desc_ko: string;
  desc_en: string;
  duration_ko: string;
  duration_en: string;
  cost_ko?: string;
  cost_en?: string;
}

export interface SupportProgram {
  name_ko: string;
  name_en: string;
  desc_ko: string;
  desc_en: string;
  amount_ko?: string;
  amount_en?: string;
  url?: string;
}

export interface CountryStartupInfo {
  code: string;
  businessStructures: BusinessStructure[];
  businessCategories: CountryBusinessCategory[];
  locationTypes: LocationType[];
  taxDeadlines: TaxDeadline[];
  governmentResources: GovernmentResource[];
  registrationSteps: RegistrationStep[];
  supportPrograms: SupportProgram[];
  tips_ko: string[];
  tips_en: string[];
  warningForForeigners_ko: string;
  warningForForeigners_en: string;
  aiPromptContext: string;
  loadingTips_ko: string[];
  loadingTips_en: string[];
}

export const countryStartupData: Record<string, CountryStartupInfo> = {
  // ─── 한국 (KR) ───
  KR: {
    code: "KR",
    businessStructures: [
      {
        id: "simplified", name_ko: "간이과세자", name_en: "Simplified Taxpayer",
        liability_ko: "무한책임", liability_en: "Unlimited liability",
        setup_cost_ko: "무료 (홈택스)", setup_cost_en: "Free (Hometax)",
        setup_time_ko: "1~3일", setup_time_en: "1-3 days",
        pros_ko: "세금 부담 적음, 간편한 신고", pros_en: "Low tax burden, simple filing",
        cons_ko: "세금계산서 발행 불가, 매입세액 공제 제한", cons_en: "Cannot issue tax invoices, limited input tax credit",
        recommend_ko: "소규모 1인 사업자", recommend_en: "Small-scale solo business",
      },
      {
        id: "general", name_ko: "일반과세자", name_en: "General Taxpayer",
        liability_ko: "무한책임", liability_en: "Unlimited liability",
        setup_cost_ko: "무료 (홈택스)", setup_cost_en: "Free (Hometax)",
        setup_time_ko: "1~3일", setup_time_en: "1-3 days",
        pros_ko: "매입세액 전액 공제, 거래처 신뢰", pros_en: "Full input tax credit, business credibility",
        cons_ko: "세금 부담 높음, 복잡한 신고", cons_en: "Higher tax burden, complex filing",
        recommend_ko: "B2B 거래가 많거나 매출이 큰 경우", recommend_en: "High B2B or large revenue",
      },
      {
        id: "corporation", name_ko: "법인사업자", name_en: "Corporation",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "등록면허세 + 법무사 비용 (약 50~100만원)", setup_cost_en: "Registration tax + legal fees (~₩500K-1M)",
        setup_time_ko: "1~2주", setup_time_en: "1-2 weeks",
        pros_ko: "신용도 높음, 절세 가능", pros_en: "High credibility, tax optimization",
        cons_ko: "설립 비용, 복잡한 운영", cons_en: "Setup cost, complex operations",
        recommend_ko: "투자 유치, 대외 신용이 필요한 경우", recommend_en: "Need investment or credibility",
      },
    ],
    businessCategories: [
      { id: "online-shop", label_ko: "온라인쇼핑몰", label_en: "Online Shop", icon: "🛒", desc_ko: "통신판매업, 전자상거래", desc_en: "E-commerce, mail order sales" },
      { id: "cafe-restaurant", label_ko: "카페·음식점", label_en: "Cafe & Restaurant", icon: "☕", desc_ko: "음식점, 커피전문점", desc_en: "Restaurant, coffee shop" },
      { id: "it-service", label_ko: "IT서비스", label_en: "IT Service", icon: "💻", desc_ko: "소프트웨어, 앱 개발", desc_en: "Software, app development" },
      { id: "purchasing-agent", label_ko: "구매대행", label_en: "Purchasing Agent", icon: "📦", desc_ko: "해외 직구 대행", desc_en: "Overseas purchasing agency" },
      { id: "freelancer", label_ko: "프리랜서", label_en: "Freelancer", icon: "🎨", desc_ko: "디자인, 마케팅 대행", desc_en: "Design, marketing agency" },
      { id: "education", label_ko: "교육", label_en: "Education", icon: "📚", desc_ko: "학원, 온라인 강의", desc_en: "Academy, online courses" },
      { id: "real-estate", label_ko: "부동산", label_en: "Real Estate", icon: "🏠", desc_ko: "중개, 임대업", desc_en: "Brokerage, rental" },
      { id: "other", label_ko: "기타", label_en: "Other", icon: "📌", desc_ko: "기타 서비스업", desc_en: "Other services" },
    ],
    locationTypes: [
      { id: "home", name_ko: "자택", name_en: "Home", icon: "🏠", cost_ko: "무료", cost_en: "Free", caution_ko: "주거용은 일부 업종 제한", caution_en: "Some restrictions for residential", suitable_ko: "온라인사업, 프리랜서", suitable_en: "Online business, freelancers" },
      { id: "virtual", name_ko: "비상주 사무실", name_en: "Virtual Office", icon: "📮", cost_ko: "월 3~10만원", cost_en: "₩30K-100K/mo", caution_ko: "주소만 빌리는 방식", caution_en: "Address-only rental", suitable_ko: "초기 비용 절감", suitable_en: "Cost savings" },
      { id: "office", name_ko: "실제 매장/사무실", name_en: "Physical Office", icon: "🏢", cost_ko: "지역별 상이", cost_en: "Varies by area", caution_ko: "임대차 계약서 필요", caution_en: "Lease agreement required", suitable_ko: "오프라인 사업", suitable_en: "Offline business" },
    ],
    taxDeadlines: [
      { month_ko: "1월", month_en: "Jan", event_ko: "부가가치세 확정신고 (2기)", event_en: "VAT final return (2nd period)", type: "required" },
      { month_ko: "3월", month_en: "Mar", event_ko: "법인세 신고", event_en: "Corporate tax return", type: "required" },
      { month_ko: "5월", month_en: "May", event_ko: "종합소득세 신고", event_en: "Income tax return", type: "required" },
      { month_ko: "7월", month_en: "Jul", event_ko: "부가가치세 확정신고 (1기)", event_en: "VAT final return (1st period)", type: "required" },
    ],
    governmentResources: [
      { name_ko: "소상공인시장진흥공단", name_en: "Small Enterprise & Market Service", url: "https://www.semas.or.kr", desc_ko: "소상공인 지원금, 컨설팅", desc_en: "SME grants, consulting" },
      { name_ko: "창업진흥원", name_en: "Korea Startup Agency", url: "https://www.kised.or.kr", desc_ko: "창업 지원사업, 멘토링", desc_en: "Startup support, mentoring" },
      { name_ko: "홈택스", name_en: "Hometax", url: "https://www.hometax.go.kr", desc_ko: "사업자등록, 세금신고", desc_en: "Business registration, tax filing" },
    ],
    registrationSteps: [
      { step: 1, title_ko: "업종 및 사업형태 결정", title_en: "Decide business type & structure", desc_ko: "간이과세/일반과세/법인 중 선택", desc_en: "Choose simplified/general/corporation", duration_ko: "1일", duration_en: "1 day" },
      { step: 2, title_ko: "사업자등록 신청", title_en: "Apply for business registration", desc_ko: "홈택스 온라인 또는 세무서 방문", desc_en: "Online via Hometax or visit tax office", duration_ko: "1~3일", duration_en: "1-3 days", cost_ko: "무료", cost_en: "Free" },
      { step: 3, title_ko: "통신판매업 신고 (해당 시)", title_en: "Online sales notification (if applicable)", desc_ko: "온라인 판매 시 구청에 신고", desc_en: "Report to district office for online sales", duration_ko: "1~3일", duration_en: "1-3 days", cost_ko: "무료", cost_en: "Free" },
      { step: 4, title_ko: "사업용 계좌 개설", title_en: "Open business bank account", desc_ko: "사업자등록증으로 은행 방문", desc_en: "Visit bank with registration certificate", duration_ko: "1일", duration_en: "1 day" },
      { step: 5, title_ko: "카드결제 단말기 설치 (해당 시)", title_en: "Set up card payment (if applicable)", desc_ko: "PG사 가입 또는 카드 단말기 신청", desc_en: "Sign up with PG or apply for card terminal", duration_ko: "3~7일", duration_en: "3-7 days" },
    ],
    supportPrograms: [
      { name_ko: "소상공인 정책자금", name_en: "SME Policy Fund", desc_ko: "저금리 운전/시설 자금 대출", desc_en: "Low-interest operating/facility loans", amount_ko: "최대 1억원", amount_en: "Up to ₩100M", url: "https://www.semas.or.kr" },
      { name_ko: "창업사관학교", name_en: "Startup Academy", desc_ko: "예비창업자 교육+사업화 지원", desc_en: "Pre-startup education + commercialization support", amount_ko: "최대 1억원", amount_en: "Up to ₩100M", url: "https://www.kised.or.kr" },
      { name_ko: "청년창업사관학교", name_en: "Youth Startup Academy", desc_ko: "만 39세 이하 청년 창업 지원", desc_en: "Startup support for age 39 and under", amount_ko: "최대 1억원", amount_en: "Up to ₩100M" },
    ],
    tips_ko: [
      "간이과세자는 연 매출 1억 400만원 미만 시 부가세 부담이 적어 초기 사업에 유리합니다",
      "사업자등록 전 지출한 비용도 사전에 영수증을 모아두면 비용 처리 가능합니다",
      "통신판매업 신고 없이 온라인 판매 시 과태료가 부과됩니다",
      "소진공·창진원 지원사업은 매년 1~3월에 공고가 집중됩니다",
    ],
    tips_en: [
      "Simplified taxpayer status is beneficial for early-stage businesses with revenue under ₩104M",
      "Keep receipts for pre-registration expenses — they can be claimed as business costs",
      "Online sales without notification may result in fines",
      "Government support programs are mainly announced between January and March",
    ],
    warningForForeigners_ko: "외국인은 외국인등록증(체류자격)이 필요하며, F-2/F-5/F-6 비자 또는 D-8(투자) 비자가 있어야 사업자등록이 가능합니다. E-7(취업) 비자로는 사업자등록이 불가합니다.",
    warningForForeigners_en: "Foreigners need an Alien Registration Card with eligible visa status (F-2/F-5/F-6 or D-8 investment visa). E-7 work visa holders cannot register a business.",
    aiPromptContext: `한국 창업 전문가로서 답변해. 홈택스 기반 사업자등록, 간이과세/일반과세/법인 구분, 통신판매업 신고, 소진공·창진원 지원사업을 정확히 안내해. 비용은 원화(₩)로 표시.`,
    loadingTips_ko: ["💡 사업자등록은 홈택스에서 온라인으로 가능해요", "💡 간이과세자는 연 매출 1억 400만원 미만이면 유리해요", "💡 통신판매업은 별도 신고가 필요해요"],
    loadingTips_en: ["💡 Registration can be done online via Hometax", "💡 Simplified tax is beneficial under ₩104M annual revenue", "💡 Online sales require separate notification"],
  },

  // ─── 미국 (US) ───
  US: {
    code: "US",
    businessStructures: [
      {
        id: "sole_prop", name_ko: "개인사업자", name_en: "Sole Proprietorship",
        liability_ko: "무한책임", liability_en: "Unlimited liability",
        setup_cost_ko: "무료~$100 (주별 상이)", setup_cost_en: "Free-$100 (varies by state)",
        setup_time_ko: "즉시~1주", setup_time_en: "Instant-1 week",
        pros_ko: "설립 간단, 비용 최소", pros_en: "Simple setup, minimal cost",
        cons_ko: "개인 자산 위험, 자금 조달 어려움", cons_en: "Personal asset risk, limited funding",
        recommend_ko: "프리랜서, 소규모 사업", recommend_en: "Freelancers, small businesses",
      },
      {
        id: "llc", name_ko: "유한책임회사", name_en: "LLC",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "$50~$500 (주별 상이)", setup_cost_en: "$50-$500 (varies by state)",
        setup_time_ko: "1~3주", setup_time_en: "1-3 weeks",
        pros_ko: "유한책임, 세금 유연성 (pass-through)", pros_en: "Limited liability, tax flexibility (pass-through)",
        cons_ko: "주별 연간 보고 의무, Annual Fee", cons_en: "State annual report required, annual fee",
        recommend_ko: "1인 창업에 가장 인기", recommend_en: "Most popular for solo founders",
      },
      {
        id: "s_corp", name_ko: "S-Corp", name_en: "S-Corporation",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "$100~$800 + 변호사비", setup_cost_en: "$100-$800 + legal fees",
        setup_time_ko: "2~4주", setup_time_en: "2-4 weeks",
        pros_ko: "자영업세(Self-employment tax) 절감", pros_en: "Self-employment tax savings",
        cons_ko: "주주 100명 제한, 엄격한 규정", cons_en: "100 shareholder limit, strict rules",
        recommend_ko: "연 수익 $50K+ 시 절세 효과", recommend_en: "Tax savings when revenue >$50K/yr",
      },
      {
        id: "c_corp", name_ko: "C-Corp", name_en: "C-Corporation",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "$100~$800 + 변호사비", setup_cost_en: "$100-$800 + legal fees",
        setup_time_ko: "2~4주", setup_time_en: "2-4 weeks",
        pros_ko: "투자 유치 용이, 주식 발행 가능", pros_en: "Easy fundraising, stock issuance",
        cons_ko: "이중과세 (법인세+배당소득세)", cons_en: "Double taxation (corporate + dividend)",
        recommend_ko: "VC 투자, IPO 목표", recommend_en: "VC funding, IPO target",
      },
    ],
    businessCategories: [
      { id: "ecommerce", label_ko: "이커머스", label_en: "E-commerce", icon: "🛒", desc_ko: "온라인 판매, Amazon, Shopify", desc_en: "Online sales, Amazon, Shopify" },
      { id: "food-service", label_ko: "요식업", label_en: "Food Service", icon: "☕", desc_ko: "레스토랑, 카페, 푸드트럭", desc_en: "Restaurant, cafe, food truck" },
      { id: "tech", label_ko: "테크/SaaS", label_en: "Tech/SaaS", icon: "💻", desc_ko: "소프트웨어, 앱, SaaS", desc_en: "Software, apps, SaaS" },
      { id: "import-export", label_ko: "수출입/무역", label_en: "Import/Export", icon: "📦", desc_ko: "국제 무역, 물류", desc_en: "International trade, logistics" },
      { id: "consulting", label_ko: "컨설팅", label_en: "Consulting", icon: "🎨", desc_ko: "전문 서비스, 컨설팅", desc_en: "Professional services" },
      { id: "education", label_ko: "교육", label_en: "Education", icon: "📚", desc_ko: "온라인 강의, 코칭", desc_en: "Online courses, coaching" },
      { id: "real-estate", label_ko: "부동산", label_en: "Real Estate", icon: "🏠", desc_ko: "부동산 투자, 관리", desc_en: "Real estate investment" },
      { id: "other", label_ko: "기타", label_en: "Other", icon: "📌", desc_ko: "기타 사업", desc_en: "Other business" },
    ],
    locationTypes: [
      { id: "home", name_ko: "자택", name_en: "Home", icon: "🏠", cost_ko: "무료", cost_en: "Free", caution_ko: "HOA/시 조례 확인 필요", caution_en: "Check HOA/city zoning", suitable_ko: "온라인 사업, 프리랜서", suitable_en: "Online business, freelancers" },
      { id: "virtual", name_ko: "가상 오피스", name_en: "Virtual Office", icon: "📮", cost_ko: "$50~$300/월", cost_en: "$50-$300/mo", caution_ko: "일부 주에서 Registered Agent 필요", caution_en: "Some states require Registered Agent", suitable_ko: "LLC 등록 주소용", suitable_en: "LLC registered address" },
      { id: "coworking", name_ko: "코워킹 스페이스", name_en: "Coworking Space", icon: "🏢", cost_ko: "$200~$800/월", cost_en: "$200-$800/mo", caution_ko: "사업자 주소 사용 가능 여부 확인", caution_en: "Check if business address available", suitable_ko: "미팅, 네트워킹 필요 시", suitable_en: "Meetings, networking" },
    ],
    taxDeadlines: [
      { month_ko: "1월", month_en: "Jan", event_ko: "분기별 예상세금 납부 (Q4)", event_en: "Quarterly estimated tax (Q4)", type: "required" },
      { month_ko: "3월", month_en: "Mar", event_ko: "S-Corp/파트너십 세금 신고 (3/15)", event_en: "S-Corp/Partnership tax return (3/15)", type: "required" },
      { month_ko: "4월", month_en: "Apr", event_ko: "개인소득세 신고 (4/15)", event_en: "Individual income tax return (4/15)", type: "required" },
      { month_ko: "4월", month_en: "Apr", event_ko: "분기별 예상세금 납부 (Q1)", event_en: "Quarterly estimated tax (Q1)", type: "required" },
      { month_ko: "6월", month_en: "Jun", event_ko: "분기별 예상세금 납부 (Q2)", event_en: "Quarterly estimated tax (Q2)", type: "required" },
      { month_ko: "9월", month_en: "Sep", event_ko: "분기별 예상세금 납부 (Q3)", event_en: "Quarterly estimated tax (Q3)", type: "required" },
    ],
    governmentResources: [
      { name_ko: "미국 중소기업청 (SBA)", name_en: "Small Business Administration (SBA)", url: "https://www.sba.gov", desc_ko: "대출, 멘토링, 교육 프로그램", desc_en: "Loans, mentoring, education programs" },
      { name_ko: "IRS (국세청)", name_en: "Internal Revenue Service (IRS)", url: "https://www.irs.gov", desc_ko: "EIN 발급, 세금 신고", desc_en: "EIN issuance, tax filing" },
      { name_ko: "SCORE", name_en: "SCORE", url: "https://www.score.org", desc_ko: "무료 멘토링, 워크숍", desc_en: "Free mentoring, workshops" },
    ],
    registrationSteps: [
      { step: 1, title_ko: "주(State) 선택", title_en: "Choose your state", desc_ko: "Delaware, Wyoming, 실제 거주 주 중 선택", desc_en: "Choose Delaware, Wyoming, or your home state", duration_ko: "1일", duration_en: "1 day" },
      { step: 2, title_ko: "사업체 이름 등록", title_en: "Register business name", desc_ko: "주 정부 Secretary of State에 이름 확인·등록", desc_en: "Check & register with Secretary of State", duration_ko: "1~3일", duration_en: "1-3 days", cost_ko: "$50~300", cost_en: "$50-300" },
      { step: 3, title_ko: "EIN 발급", title_en: "Get EIN", desc_ko: "IRS 웹사이트에서 즉시 발급", desc_en: "Apply instantly on IRS website", duration_ko: "즉시", duration_en: "Instant", cost_ko: "무료", cost_en: "Free" },
      { step: 4, title_ko: "Operating Agreement 작성", title_en: "Draft Operating Agreement", desc_ko: "LLC 운영 규정 문서 작성", desc_en: "Create LLC operating rules document", duration_ko: "1~3일", duration_en: "1-3 days" },
      { step: 5, title_ko: "비즈니스 은행 계좌 개설", title_en: "Open business bank account", desc_ko: "EIN으로 Chase, Mercury 등에서 계좌 개설", desc_en: "Open account at Chase, Mercury, etc. with EIN", duration_ko: "1일", duration_en: "1 day" },
    ],
    supportPrograms: [
      { name_ko: "SBA 소기업 대출", name_en: "SBA Small Business Loans", desc_ko: "정부 보증 저금리 대출", desc_en: "Government-backed low-interest loans", amount_ko: "최대 $5M", amount_en: "Up to $5M", url: "https://www.sba.gov" },
      { name_ko: "SCORE 멘토링", name_en: "SCORE Mentoring", desc_ko: "무료 1:1 창업 멘토링", desc_en: "Free 1-on-1 startup mentoring", url: "https://www.score.org" },
      { name_ko: "SBIR/STTR 그랜트", name_en: "SBIR/STTR Grants", desc_ko: "기술 스타트업 연방 보조금", desc_en: "Federal grants for tech startups", amount_ko: "Phase I: $275K, Phase II: $1M", amount_en: "Phase I: $275K, Phase II: $1M" },
    ],
    tips_ko: [
      "LLC는 미국에서 1인 창업자에게 가장 인기 있는 형태입니다 (유한책임 + 세금 유연성)",
      "Delaware/Wyoming주는 법인 설립에 유리하지만, 실제 거주 주에도 등록이 필요할 수 있습니다",
      "Sales Tax는 주마다 다르며 일부 주(OR, MT, NH 등)는 면세입니다",
      "분기별 예상세금(Estimated Tax) 미납 시 페널티가 부과됩니다",
    ],
    tips_en: [
      "LLC is the most popular structure for solo founders (limited liability + tax flexibility)",
      "Delaware/Wyoming are popular, but you may still need to register in your home state",
      "Sales Tax varies by state — some states (OR, MT, NH) have no sales tax",
      "Quarterly estimated tax penalties apply if payments are missed",
    ],
    warningForForeigners_ko: "비거주 외국인도 LLC/C-Corp 설립 가능하지만, ITIN(개인납세자번호) 또는 SSN이 필요합니다. 비자 없이 원격으로 운영 가능하나, 미국 내 소득에 대해 세금 신고 의무가 있습니다.",
    warningForForeigners_en: "Non-resident foreigners can form LLC/C-Corp but need an ITIN or SSN. You can operate remotely without a visa, but must file taxes on US-sourced income.",
    aiPromptContext: `미국 창업 전문가로서 답변해. LLC/S-Corp/C-Corp 구분, EIN 발급, 주별 등록 절차, State Tax vs Federal Tax, Sales Tax, Self-employment Tax를 정확히 안내해. 비용은 달러($)로 표시. Delaware/Wyoming/Florida 등 인기 등록 주 정보 포함.`,
    loadingTips_ko: ["💡 미국에서 가장 인기 있는 사업 형태는 LLC예요", "💡 EIN(사업자번호)은 IRS에서 무료로 즉시 발급 가능해요", "💡 Delaware주는 법인 설립에 가장 유리한 주로 알려져 있어요"],
    loadingTips_en: ["💡 LLC is the most popular business structure in the US", "💡 EIN can be obtained instantly for free from the IRS", "💡 Delaware is known as the most business-friendly state"],
  },

  // ─── 일본 (JP) ───
  JP: {
    code: "JP",
    businessStructures: [
      {
        id: "kojin", name_ko: "개인사업주", name_en: "Sole Proprietor", name_local: "個人事業主",
        liability_ko: "무한책임", liability_en: "Unlimited liability",
        setup_cost_ko: "무료 (개업届 제출)", setup_cost_en: "Free (submit opening notification)",
        setup_time_ko: "즉시", setup_time_en: "Immediate",
        pros_ko: "설립 간단, 비용 없음", pros_en: "Simple setup, no cost",
        cons_ko: "무한책임, 신용도 낮음", cons_en: "Unlimited liability, low credibility",
        recommend_ko: "프리랜서, 소규모 사업", recommend_en: "Freelancers, small businesses",
      },
      {
        id: "kabushiki", name_ko: "주식회사", name_en: "Stock Corporation", name_local: "株式会社",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "약 25만엔 (등록면허세+정관인증)", setup_cost_en: "~¥250,000 (registration + articles)",
        setup_time_ko: "1~2주", setup_time_en: "1-2 weeks",
        pros_ko: "최고 신용도, 주식 발행 가능", pros_en: "Highest credibility, stock issuance",
        cons_ko: "설립 비용 높음, 결산 공고 의무", cons_en: "High setup cost, financial disclosure required",
        recommend_ko: "투자 유치, 대기업 거래", recommend_en: "Investment, large business partners",
      },
      {
        id: "godo", name_ko: "합동회사", name_en: "LLC", name_local: "合同会社",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "약 10만엔 (등록면허세)", setup_cost_en: "~¥100,000 (registration tax)",
        setup_time_ko: "1~2주", setup_time_en: "1-2 weeks",
        pros_ko: "설립비 저렴, 운영 유연", pros_en: "Low setup cost, flexible operations",
        cons_ko: "주식 발행 불가", cons_en: "Cannot issue stock",
        recommend_ko: "1인 창업에 추천 (Apple Japan도 合同会社)", recommend_en: "Recommended for solo (Apple Japan is also LLC)",
      },
    ],
    businessCategories: [
      { id: "ec", label_ko: "EC사이트(이커머스)", label_en: "E-commerce", icon: "🛒", desc_ko: "네트쇼핑, Amazon JP", desc_en: "Online shopping, Amazon JP" },
      { id: "food", label_ko: "음식점", label_en: "Food Service", icon: "☕", desc_ko: "레스토랑, 카페, 이자카야", desc_en: "Restaurant, cafe, izakaya" },
      { id: "it", label_ko: "IT서비스", label_en: "IT Service", icon: "💻", desc_ko: "시스템 개발, SaaS", desc_en: "System development, SaaS" },
      { id: "trading", label_ko: "무역업", label_en: "Trading", icon: "📦", desc_ko: "수출입, 바이어 대행", desc_en: "Import/export, buyer agency" },
      { id: "consulting", label_ko: "컨설팅", label_en: "Consulting", icon: "🎨", desc_ko: "경영 컨설팅, 전문 서비스", desc_en: "Management consulting" },
      { id: "education", label_ko: "교육", label_en: "Education", icon: "📚", desc_ko: "학원, 온라인 강의", desc_en: "Tutoring, online courses" },
      { id: "real-estate", label_ko: "부동산", label_en: "Real Estate", icon: "🏠", desc_ko: "부동산 관리업", desc_en: "Property management" },
      { id: "other", label_ko: "기타", label_en: "Other", icon: "📌", desc_ko: "기타", desc_en: "Other" },
    ],
    locationTypes: [
      { id: "home", name_ko: "자택", name_en: "Home", icon: "🏠", cost_ko: "무료", cost_en: "Free", caution_ko: "관리조합 규약 확인 필요", caution_en: "Check building regulations", suitable_ko: "온라인 사업, 프리랜서", suitable_en: "Online business, freelancers" },
      { id: "virtual", name_ko: "버추얼 오피스", name_en: "Virtual Office", icon: "📮", cost_ko: "월 5,000~30,000엔", cost_en: "¥5,000-30,000/mo", caution_ko: "법인등기 가능 여부 확인", caution_en: "Check if incorporation address available", suitable_ko: "법인등기 주소용", suitable_en: "Company registration address" },
      { id: "office", name_ko: "사무실/점포", name_en: "Office/Store", icon: "🏢", cost_ko: "지역별 상이", cost_en: "Varies by area", caution_ko: "보증금(시키킨) 6~12개월분", caution_en: "Deposit (shikikin) 6-12 months", suitable_ko: "오프라인 사업", suitable_en: "Offline business" },
    ],
    taxDeadlines: [
      { month_ko: "2월~3월", month_en: "Feb-Mar", event_ko: "확정신고 (소득세)", event_en: "Final tax return (income tax)", type: "required" },
      { month_ko: "3월", month_en: "Mar", event_ko: "소비세 신고", event_en: "Consumption tax return", type: "required" },
      { month_ko: "6월", month_en: "Jun", event_ko: "주민세 납부", event_en: "Resident tax payment", type: "required" },
      { month_ko: "11월", month_en: "Nov", event_ko: "법인세 중간신고 (법인)", event_en: "Corporate tax interim return", type: "optional" },
    ],
    governmentResources: [
      { name_ko: "일본정책금융공고", name_en: "Japan Finance Corporation", url: "https://www.jfc.go.jp", desc_ko: "창업 융자, 무담보 대출", desc_en: "Startup loans, unsecured loans" },
      { name_ko: "법무국", name_en: "Legal Affairs Bureau", url: "https://houmukyoku.moj.go.jp", desc_ko: "법인등기", desc_en: "Corporate registration" },
      { name_ko: "세무서 (税務署)", name_en: "Tax Office", url: "https://www.nta.go.jp", desc_ko: "개업届 제출, 세금 신고", desc_en: "Opening notification, tax filing" },
    ],
    registrationSteps: [
      { step: 1, title_ko: "사업형태 결정", title_en: "Choose business structure", desc_ko: "個人事業主/株式会社/合同会社 중 선택", desc_en: "Choose Sole Proprietor/Corporation/LLC", duration_ko: "1일", duration_en: "1 day" },
      { step: 2, title_ko: "정관 작성 및 인증 (법인)", title_en: "Draft & certify articles (corp.)", desc_ko: "공증인에게 정관 인증 (株式会社만)", desc_en: "Notarize articles (Kabushiki only)", duration_ko: "1~3일", duration_en: "1-3 days", cost_ko: "약 5만엔", cost_en: "~¥50,000" },
      { step: 3, title_ko: "법무국 등기 (법인)", title_en: "Register at Legal Affairs Bureau", desc_ko: "法務局에 설립등기 신청", desc_en: "Submit incorporation at Legal Affairs Bureau", duration_ko: "1~2주", duration_en: "1-2 weeks", cost_ko: "6~15만엔", cost_en: "¥60K-150K" },
      { step: 4, title_ko: "세무서 신고", title_en: "Tax office notification", desc_ko: "개업届·청색신고 승인 신청", desc_en: "Submit opening notice & blue return application", duration_ko: "즉시", duration_en: "Immediate", cost_ko: "무료", cost_en: "Free" },
      { step: 5, title_ko: "은행 계좌 개설", title_en: "Open bank account", desc_ko: "법인은 등기 완료 후 은행 방문", desc_en: "Visit bank after registration is complete", duration_ko: "1~2주", duration_en: "1-2 weeks" },
    ],
    supportPrograms: [
      { name_ko: "일본정책금융공고 창업 융자", name_en: "JFC Startup Loan", desc_ko: "무담보·무보증인 창업 대출", desc_en: "Unsecured, no-guarantor startup loan", amount_ko: "최대 7,200만엔", amount_en: "Up to ¥72M", url: "https://www.jfc.go.jp" },
      { name_ko: "소규모사업자 지원금", name_en: "Small Business Subsidy", desc_ko: "판로 개척 등 경영 지원 보조금", desc_en: "Sales channel development subsidy", amount_ko: "최대 200만엔", amount_en: "Up to ¥2M" },
      { name_ko: "창업 보조금 (사업재구축)", name_en: "Startup Subsidy", desc_ko: "신사업 진출 지원 보조금", desc_en: "New business expansion subsidy", amount_ko: "최대 1,500만엔", amount_en: "Up to ¥15M" },
    ],
    tips_ko: [
      "合同会社(LLC)는 설립비가 株式会社의 절반이며 Apple Japan도 합동회사입니다",
      "青色申告(청색신고)를 하면 65만엔 특별공제를 받을 수 있습니다",
      "消費税는 연 매출 1,000만엔 이하면 면제됩니다 (인보이스 제도 도입 후 변경사항 있음)",
      "일본정책금융공고 창업 융자는 무담보·무보증인으로 최대 7,200만엔까지 가능합니다",
    ],
    tips_en: [
      "LLC setup costs half of Corporation — Apple Japan is also an LLC (合同会社)",
      "Blue tax return (青色申告) gives you a ¥650,000 special deduction",
      "Consumption tax is exempt under ¥10M annual revenue (changes with invoice system)",
      "JFC startup loan offers up to ¥72M without collateral or guarantor",
    ],
    warningForForeigners_ko: "외국인은 経営・管理(경영관리) 비자가 필요하며, 자본금 500만엔 이상 + 사무소 확보가 비자 요건입니다. 日本語 능력이 없으면 행정서사(行政書士) 대행을 추천합니다.",
    warningForForeigners_en: "Foreigners need a Business Manager visa (経営・管理), requiring ¥5M+ capital and a physical office. Consider hiring an administrative scrivener (行政書士) if you don't speak Japanese.",
    aiPromptContext: `일본 창업 전문가로서 답변해. 個人事業主/株式会社/合同会社 구분, 法務局 등기, 税務署 개업届, 消費税, 確定申告을 정확히 안내해. 비용은 엔화(¥)로 표시. 在留資格(비자) 관련 정보도 외국인 창업 시 포함.`,
    loadingTips_ko: ["💡 일본에서 合同会社(LLC)는 설립비가 株式会社의 절반이에요", "💡 개업届는 세무서에 무료로 제출할 수 있어요", "💡 일본정책금융공고에서 무담보 창업 대출이 가능해요"],
    loadingTips_en: ["💡 In Japan, LLC setup costs half of Corporation", "💡 Opening notification can be submitted for free", "💡 Japan Finance Corp offers unsecured startup loans"],
  },

  // ─── 중국 (CN) ───
  CN: {
    code: "CN",
    businessStructures: [
      {
        id: "getihu", name_ko: "개체공상호", name_en: "Individual Business", name_local: "个体工商户",
        liability_ko: "무한책임", liability_en: "Unlimited liability",
        setup_cost_ko: "무료~소액", setup_cost_en: "Free-minimal",
        setup_time_ko: "3~5일", setup_time_en: "3-5 days",
        pros_ko: "설립 간단, 세금 우대", pros_en: "Simple setup, tax benefits",
        cons_ko: "사업 범위 제한, 외국인 불가", cons_en: "Limited scope, not for foreigners",
        recommend_ko: "중국인 소규모 창업", recommend_en: "Small-scale Chinese nationals",
      },
      {
        id: "youxian", name_ko: "유한책임공사", name_en: "Limited Liability Company", name_local: "有限责任公司",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "등록자본금 + 대행비 (약 5,000~20,000위안)", setup_cost_en: "Registered capital + agent fee (~¥5K-20K CNY)",
        setup_time_ko: "2~4주", setup_time_en: "2-4 weeks",
        pros_ko: "가장 보편적, 외자기업(WFOE) 가능", pros_en: "Most common, WFOE available for foreigners",
        cons_ko: "등록자본금 필요, 연간 보고", cons_en: "Registered capital required, annual report",
        recommend_ko: "외국인 창업 시 WFOE 형태", recommend_en: "WFOE for foreign entrepreneurs",
      },
      {
        id: "gufen", name_ko: "주식유한공사", name_en: "Joint Stock Company", name_local: "股份有限公司",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "등록자본금 500만위안+ ", setup_cost_en: "Registered capital ¥5M+ CNY",
        setup_time_ko: "1~3개월", setup_time_en: "1-3 months",
        pros_ko: "IPO 가능, 대규모 자금 조달", pros_en: "IPO possible, large fundraising",
        cons_ko: "높은 자본금, 복잡한 규정", cons_en: "High capital, complex regulations",
        recommend_ko: "대규모 사업, 상장 목표", recommend_en: "Large-scale, IPO target",
      },
    ],
    businessCategories: [
      { id: "ecommerce", label_ko: "전자상거래", label_en: "E-commerce", icon: "🛒", desc_ko: "타오바오, 핀둬둬, 더우인", desc_en: "Taobao, Pinduoduo, Douyin" },
      { id: "food", label_ko: "요식업", label_en: "Food Service", icon: "☕", desc_ko: "음식점, 밀크티 전문점", desc_en: "Restaurant, milk tea shop" },
      { id: "tech", label_ko: "기술서비스", label_en: "Tech Service", icon: "💻", desc_ko: "소프트웨어 개발, 미니프로그램", desc_en: "Software, mini programs" },
      { id: "trading", label_ko: "무역/구매대행", label_en: "Trading/Purchasing", icon: "📦", desc_ko: "수출입, 크로스보더 EC", desc_en: "Import/export, cross-border EC" },
      { id: "consulting", label_ko: "컨설팅", label_en: "Consulting", icon: "🎨", desc_ko: "경영 자문, 시장 조사", desc_en: "Management advisory, market research" },
      { id: "education", label_ko: "교육", label_en: "Education", icon: "📚", desc_ko: "교육 컨설팅, 어학원", desc_en: "Education consulting, language school" },
      { id: "real-estate", label_ko: "부동산", label_en: "Real Estate", icon: "🏠", desc_ko: "부동산 중개", desc_en: "Real estate agency" },
      { id: "other", label_ko: "기타", label_en: "Other", icon: "📌", desc_ko: "기타 서비스", desc_en: "Other services" },
    ],
    locationTypes: [
      { id: "home", name_ko: "자택 (일부 도시)", name_en: "Home (some cities)", icon: "🏠", cost_ko: "무료", cost_en: "Free", caution_ko: "대부분 도시에서 상업용 주소 필요", caution_en: "Most cities require commercial address", suitable_ko: "일부 도시의 온라인 사업", suitable_en: "Online business in some cities" },
      { id: "virtual", name_ko: "대리 주소 (集群注册)", name_en: "Cluster Registration", icon: "📮", cost_ko: "년 2,000~8,000위안", cost_en: "¥2K-8K CNY/yr", caution_ko: "합법적 대리 주소 확인", caution_en: "Verify legality of address", suitable_ko: "초기 비용 절감", suitable_en: "Cost savings" },
      { id: "office", name_ko: "사무실/점포", name_en: "Office/Store", icon: "🏢", cost_ko: "도시별 상이", cost_en: "Varies by city", caution_ko: "상업용 건물만 등록 가능", caution_en: "Only commercial buildings allowed", suitable_ko: "오프라인 사업", suitable_en: "Offline business" },
    ],
    taxDeadlines: [
      { month_ko: "매월 15일", month_en: "15th monthly", event_ko: "증치세(부가세) 신고", event_en: "VAT return", type: "required" },
      { month_ko: "분기말+15일", month_en: "Qtr end+15d", event_ko: "기업소득세 예납", event_en: "Corporate income tax prepayment", type: "required" },
      { month_ko: "5월 31일", month_en: "May 31", event_ko: "기업소득세 연도 결산", event_en: "Annual corporate tax settlement", type: "required" },
      { month_ko: "6월 30일", month_en: "Jun 30", event_ko: "연도 보고 (工商年报)", event_en: "Annual business report", type: "required" },
    ],
    governmentResources: [
      { name_ko: "시장감독관리총국", name_en: "State Administration for Market Regulation", url: "https://www.samr.gov.cn", desc_ko: "영업집조(营业执照) 발급", desc_en: "Business license issuance" },
      { name_ko: "국가세무총국", name_en: "State Taxation Administration", url: "https://www.chinatax.gov.cn", desc_ko: "세무 등록, 신고", desc_en: "Tax registration, filing" },
      { name_ko: "전국기업신용정보공시시스템", name_en: "National Enterprise Credit Information Publicity System", url: "https://www.gsxt.gov.cn", desc_ko: "기업 정보 조회, 연보 제출", desc_en: "Company info, annual report" },
    ],
    registrationSteps: [
      { step: 1, title_ko: "회사명 사전 심사", title_en: "Company name pre-approval", desc_ko: "시장감독관리국에서 이름 검색·승인", desc_en: "Search & approve name at Market Regulation Bureau", duration_ko: "1~3일", duration_en: "1-3 days", cost_ko: "무료", cost_en: "Free" },
      { step: 2, title_ko: "영업집조 신청", title_en: "Apply for Business License", desc_ko: "营业执照 온라인 또는 방문 신청", desc_en: "Apply for 营业执照 online or in person", duration_ko: "3~7일", duration_en: "3-7 days", cost_ko: "무료~소액", cost_en: "Free-minimal" },
      { step: 3, title_ko: "인장 각인", title_en: "Carve company seals", desc_ko: "공장(公章), 재무장, 법인장 등 각인", desc_en: "Company seal, financial seal, legal person seal", duration_ko: "1~2일", duration_en: "1-2 days", cost_ko: "200~500위안", cost_en: "¥200-500 CNY" },
      { step: 4, title_ko: "은행 기본 계좌 개설", title_en: "Open basic bank account", desc_ko: "영업집조로 은행 방문, 기본 계좌 개설", desc_en: "Visit bank with Business License", duration_ko: "1~2주", duration_en: "1-2 weeks" },
      { step: 5, title_ko: "세무 등록 및 발표 매입", title_en: "Tax registration & invoice purchase", desc_ko: "세무국에 등록, 전자발표(电子发票) 설정", desc_en: "Register at tax bureau, set up e-invoices", duration_ko: "1~3일", duration_en: "1-3 days" },
    ],
    supportPrograms: [
      { name_ko: "소형미리기업 세금 우대", name_en: "Small & Micro Enterprise Tax Benefits", desc_ko: "연 이익 300만위안 이하 기업소득세 감면", desc_en: "CIT reduction for annual profit under ¥3M", amount_ko: "세율 5%까지 감면", amount_en: "Tax rate reduced to 5%" },
      { name_ko: "창업 보조금 (각 도시별)", name_en: "City-level Startup Grants", desc_ko: "상해/심천/광주 등 지방정부 창업 보조금", desc_en: "Local government startup grants in Shanghai/Shenzhen/Guangzhou", amount_ko: "도시별 상이 (1~50만위안)", amount_en: "Varies (¥10K-500K CNY)" },
      { name_ko: "사회보험 감면", name_en: "Social Insurance Reduction", desc_ko: "소규모 기업 사회보험료 감면", desc_en: "Social insurance fee reduction for small businesses" },
    ],
    tips_ko: [
      "외국인은 WFOE(외상독자기업) 형태로 설립하며, 100% 외국인 소유 가능합니다",
      "营业执照(영업집조)는 한국의 사업자등록증에 해당하는 필수 서류입니다",
      "중국은 매월 세금 신고가 필요하며, 지연 시 벌금이 부과됩니다",
      "도시별로 창업 환경이 크게 다릅니다 — 상해(국제), 심천(IT), 광주(제조)가 대표적",
    ],
    tips_en: [
      "Foreigners set up as WFOE (Wholly Foreign-Owned Enterprise) for 100% ownership",
      "营业执照 (Business License) is the essential document like a business registration",
      "China requires monthly tax filing — late filing incurs penalties",
      "Business environments vary by city: Shanghai (international), Shenzhen (IT), Guangzhou (manufacturing)",
    ],
    warningForForeigners_ko: "WFOE 설립 시 등록자본금 납입, 실제 사무실 임대가 필요합니다. 업종에 따라 외국인 투자 제한(네거티브 리스트)이 있으며, 일부 업종(교육, 미디어)은 외국인 투자가 금지됩니다.",
    warningForForeigners_en: "WFOE requires registered capital contribution and a physical office lease. Some industries have foreign investment restrictions (Negative List), and sectors like education and media may prohibit foreign investment.",
    aiPromptContext: `중국 창업 전문가(15년 현지 경험)로서 답변해. 营业执照 발급, 外商独资企业(WFOE), 增值税, 企业所得税, 社保, 公积금을 정확히 안내해. 비용은 위안(¥/CNY)으로 표시. 외국인의 경우 WFOE 절차와 상해/심천/광주 등 주요 도시별 차이점 포함.`,
    loadingTips_ko: ["💡 중국에서 외국인은 WFOE(외상독자기업)로 설립해요", "💡 营业执照는 한국의 사업자등록증에 해당해요", "💡 중국은 매월 세금 신고가 필요해요"],
    loadingTips_en: ["💡 Foreigners in China set up as WFOE", "💡 营业执照 (Business License) equals business registration", "💡 China requires monthly tax filing"],
  },

  // ─── 베트남 (VN) ───
  VN: {
    code: "VN",
    businessStructures: [
      {
        id: "sole", name_ko: "1인 유한회사", name_en: "Single-member LLC", name_local: "Công ty TNHH một thành viên",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "약 500~2,000만 VND (대행비 포함)", setup_cost_en: "~$200-800 (incl. agent fee)",
        setup_time_ko: "2~4주", setup_time_en: "2-4 weeks",
        pros_ko: "의사결정 빠름, 설립 간단", pros_en: "Fast decisions, simple setup",
        cons_ko: "자본 확대 제한", cons_en: "Limited capital expansion",
        recommend_ko: "소규모 1인 창업", recommend_en: "Small solo business",
      },
      {
        id: "multi_llc", name_ko: "2인 이상 유한회사", name_en: "Multi-member LLC", name_local: "Công ty TNHH hai thành viên trở lên",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "약 500~2,000만 VND", setup_cost_en: "~$200-800",
        setup_time_ko: "2~4주", setup_time_en: "2-4 weeks",
        pros_ko: "2~50명 출자 가능", pros_en: "2-50 members possible",
        cons_ko: "주식 양도 제한", cons_en: "Share transfer restrictions",
        recommend_ko: "공동 창업", recommend_en: "Co-founding businesses",
      },
      {
        id: "jsc", name_ko: "주식회사", name_en: "Joint Stock Company", name_local: "Công ty cổ phần",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "약 1,000~3,000만 VND", setup_cost_en: "~$400-1,200",
        setup_time_ko: "3~6주", setup_time_en: "3-6 weeks",
        pros_ko: "주식 발행/양도 자유, IPO 가능", pros_en: "Free stock issuance/transfer, IPO possible",
        cons_ko: "최소 주주 3명 필요", cons_en: "Minimum 3 shareholders required",
        recommend_ko: "투자 유치, 대규모 사업", recommend_en: "Investment, large-scale business",
      },
    ],
    businessCategories: [
      { id: "ecommerce", label_ko: "이커머스", label_en: "E-commerce", icon: "🛒", desc_ko: "Shopee, Lazada, Tiki", desc_en: "Shopee, Lazada, Tiki" },
      { id: "food", label_ko: "요식업", label_en: "Food Service", icon: "☕", desc_ko: "레스토랑, 카페, 분짜", desc_en: "Restaurant, cafe, bun cha" },
      { id: "tech", label_ko: "IT/소프트웨어", label_en: "IT/Software", icon: "💻", desc_ko: "소프트웨어 개발, BPO", desc_en: "Software development, BPO" },
      { id: "trading", label_ko: "무역업", label_en: "Trading", icon: "📦", desc_ko: "수출입, 물류", desc_en: "Import/export, logistics" },
      { id: "consulting", label_ko: "컨설팅", label_en: "Consulting", icon: "🎨", desc_ko: "경영 컨설팅", desc_en: "Management consulting" },
      { id: "education", label_ko: "교육", label_en: "Education", icon: "📚", desc_ko: "어학원, 교육 서비스", desc_en: "Language school, education" },
      { id: "manufacturing", label_ko: "제조업", label_en: "Manufacturing", icon: "🏭", desc_ko: "의류, 전자 부품 제조", desc_en: "Garment, electronics manufacturing" },
      { id: "other", label_ko: "기타", label_en: "Other", icon: "📌", desc_ko: "기타 서비스", desc_en: "Other services" },
    ],
    locationTypes: [
      { id: "home", name_ko: "자택", name_en: "Home", icon: "🏠", cost_ko: "무료", cost_en: "Free", caution_ko: "사업자등록 주소로 제한적", caution_en: "Limited as business address", suitable_ko: "개인 프리랜서", suitable_en: "Individual freelancer" },
      { id: "virtual", name_ko: "가상 오피스", name_en: "Virtual Office", icon: "📮", cost_ko: "월 100~300만 VND", cost_en: "$40-120/mo", caution_ko: "합법적 주소 확인 필수", caution_en: "Verify legal address", suitable_ko: "초기 비용 절감", suitable_en: "Cost savings" },
      { id: "office", name_ko: "사무실/점포", name_en: "Office/Store", icon: "🏢", cost_ko: "도시별 상이", cost_en: "Varies by city", caution_ko: "임대차 계약 + 공증 필요", caution_en: "Lease + notarization required", suitable_ko: "오프라인 사업", suitable_en: "Offline business" },
    ],
    taxDeadlines: [
      { month_ko: "매월 20일", month_en: "20th monthly", event_ko: "부가세(VAT) 신고", event_en: "VAT return", type: "required" },
      { month_ko: "분기 말+30일", month_en: "Qtr+30d", event_ko: "법인세 예납", event_en: "Corporate tax prepayment", type: "required" },
      { month_ko: "3월 31일", month_en: "Mar 31", event_ko: "연도 법인세 결산", event_en: "Annual corporate tax settlement", type: "required" },
    ],
    governmentResources: [
      { name_ko: "기획투자국 (DPI)", name_en: "Dept of Planning & Investment (DPI)", url: "https://dangkykinhdoanh.gov.vn", desc_ko: "기업 등록, 투자 인허가", desc_en: "Business registration, investment license" },
      { name_ko: "세무총국", name_en: "General Dept of Taxation", url: "https://www.gdt.gov.vn", desc_ko: "세금 등록, 신고", desc_en: "Tax registration, filing" },
    ],
    registrationSteps: [
      { step: 1, title_ko: "투자등록증(IRC) 발급", title_en: "Obtain IRC (Investment Registration Certificate)", desc_ko: "기획투자국(DPI)에 투자 프로젝트 등록", desc_en: "Register investment project at DPI", duration_ko: "15일", duration_en: "15 days", cost_ko: "무료", cost_en: "Free" },
      { step: 2, title_ko: "기업등록증(ERC) 발급", title_en: "Obtain ERC (Enterprise Registration Certificate)", desc_ko: "DPI에서 법인 등록", desc_en: "Register company at DPI", duration_ko: "3~5일", duration_en: "3-5 days", cost_ko: "약 20만 VND", cost_en: "~$8" },
      { step: 3, title_ko: "인장 등록", title_en: "Register company seal", desc_ko: "회사 인감 제작 및 등록", desc_en: "Create and register company seal", duration_ko: "2~3일", duration_en: "2-3 days", cost_ko: "약 50~100만 VND", cost_en: "$20-40" },
      { step: 4, title_ko: "세무 등록", title_en: "Tax registration", desc_ko: "세무서에 납세자 등록", desc_en: "Register as taxpayer at tax office", duration_ko: "5~7일", duration_en: "5-7 days" },
      { step: 5, title_ko: "은행 계좌 개설", title_en: "Open bank account", desc_ko: "법인 계좌 개설 (자본금 입금)", desc_en: "Open corporate account (deposit capital)", duration_ko: "1~2일", duration_en: "1-2 days" },
    ],
    supportPrograms: [
      { name_ko: "SME 발전 기금", name_en: "SME Development Fund", desc_ko: "중소기업 저금리 대출 및 기술 지원", desc_en: "Low-interest loans and technical support for SMEs", amount_ko: "프로젝트별 상이", amount_en: "Varies by project" },
      { name_ko: "하이테크 단지 인센티브", name_en: "Hi-Tech Park Incentives", desc_ko: "사이공 하이테크파크 등 입주 시 세금 감면", desc_en: "Tax incentives for Hi-Tech Park tenants", amount_ko: "법인세 4년 면세", amount_en: "4-year CIT exemption" },
    ],
    tips_ko: [
      "외국인은 IRC(투자등록증) + ERC(기업등록증) 이중 등록이 필요합니다",
      "호치민시는 상업·서비스, 하노이는 정부·제조업 중심입니다",
      "법인세율 20%는 아시아에서 경쟁력 있는 수준입니다",
      "부동산·유통 등 일부 업종은 외국인 지분율 제한(49%)이 있습니다",
    ],
    tips_en: [
      "Foreigners need dual registration: IRC (Investment) + ERC (Enterprise)",
      "HCMC focuses on commerce/services, Hanoi on government/manufacturing",
      "20% corporate tax rate is competitive in Asia",
      "Some sectors (real estate, distribution) have 49% foreign ownership caps",
    ],
    warningForForeigners_ko: "외국인은 IRC+ERC 이중 등록 필수이며, 투자 프로젝트 등록에 약 15일이 소요됩니다. 업종별 외국인 지분율 제한이 있으며, 현지 법률사무소 자문을 강력 권장합니다.",
    warningForForeigners_en: "Foreigners must obtain both IRC and ERC — IRC takes about 15 days. Foreign ownership limits vary by sector. Strongly recommend consulting a local law firm.",
    aiPromptContext: `베트남 창업 전문가로서 답변해. 1인 유한회사/2인 유한회사/주식회사 구분, 기획투자국(DPI) 등록, IRC(투자등록증)/ERC(기업등록증), VAT, CIT를 정확히 안내해. 비용은 베트남 동(VND)과 달러 병기. 외국인은 IRC+ERC 이중 등록 절차 안내.`,
    loadingTips_ko: ["💡 베트남에서 외국인은 IRC+ERC 이중 등록이 필요해요", "💡 호치민시와 하노이의 사업 환경이 크게 달라요", "💡 베트남 법인세율은 20%로 아시아에서 경쟁력 있어요"],
    loadingTips_en: ["💡 Foreigners in Vietnam need dual IRC+ERC registration", "💡 HCMC and Hanoi have different business environments", "💡 Vietnam's corporate tax rate is competitive at 20%"],
  },

  // ─── 태국 (TH) ───
  TH: {
    code: "TH",
    businessStructures: [
      {
        id: "sole", name_ko: "개인사업자", name_en: "Sole Proprietorship", name_local: "กิจการเจ้าของคนเดียว",
        liability_ko: "무한책임", liability_en: "Unlimited liability",
        setup_cost_ko: "약 1,000~5,000 바트", setup_cost_en: "~฿1,000-5,000",
        setup_time_ko: "1~3일", setup_time_en: "1-3 days",
        pros_ko: "설립 간단, 저비용", pros_en: "Simple, low cost",
        cons_ko: "외국인 제한 많음", cons_en: "Many restrictions for foreigners",
        recommend_ko: "태국인 소규모 사업", recommend_en: "Thai nationals, small business",
      },
      {
        id: "ltd", name_ko: "유한회사", name_en: "Company Limited", name_local: "บริษัท จำกัด",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "약 20,000~50,000 바트 (대행 포함)", setup_cost_en: "~฿20K-50K (incl. agent)",
        setup_time_ko: "2~4주", setup_time_en: "2-4 weeks",
        pros_ko: "외국인 설립 가능 (BOI 인센티브)", pros_en: "Available for foreigners (BOI incentives)",
        cons_ko: "태국인 주주 51% 규정 (일반)", cons_en: "51% Thai ownership rule (general)",
        recommend_ko: "외국인 창업 시 가장 일반적", recommend_en: "Most common for foreign entrepreneurs",
      },
      {
        id: "boi", name_ko: "BOI 인증 회사", name_en: "BOI Promoted Company",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "약 50,000~200,000 바트", setup_cost_en: "~฿50K-200K",
        setup_time_ko: "2~6개월", setup_time_en: "2-6 months",
        pros_ko: "100% 외국인 소유 가능, 세금 감면", pros_en: "100% foreign ownership, tax incentives",
        cons_ko: "BOI 승인 필요, 업종 제한", cons_en: "BOI approval needed, sector restrictions",
        recommend_ko: "기술·제조업 외국인 투자", recommend_en: "Tech/manufacturing foreign investment",
      },
    ],
    businessCategories: [
      { id: "ecommerce", label_ko: "이커머스", label_en: "E-commerce", icon: "🛒", desc_ko: "Shopee, Lazada 입점", desc_en: "Shopee, Lazada marketplace" },
      { id: "food", label_ko: "요식업", label_en: "Food Service", icon: "☕", desc_ko: "레스토랑, 카페, 길거리 음식", desc_en: "Restaurant, cafe, street food" },
      { id: "tech", label_ko: "IT서비스", label_en: "IT Service", icon: "💻", desc_ko: "소프트웨어, 디지털 서비스", desc_en: "Software, digital services" },
      { id: "trading", label_ko: "무역", label_en: "Trading", icon: "📦", desc_ko: "수출입, 유통", desc_en: "Import/export, distribution" },
      { id: "tourism", label_ko: "관광/숙박", label_en: "Tourism/Hotel", icon: "🏖️", desc_ko: "호텔, 투어, 마사지샵", desc_en: "Hotel, tour, massage shop" },
      { id: "education", label_ko: "교육", label_en: "Education", icon: "📚", desc_ko: "어학원, 교육 서비스", desc_en: "Language school, education" },
      { id: "health", label_ko: "헬스케어", label_en: "Healthcare", icon: "🏥", desc_ko: "클리닉, 웰니스", desc_en: "Clinic, wellness" },
      { id: "other", label_ko: "기타", label_en: "Other", icon: "📌", desc_ko: "기타", desc_en: "Other" },
    ],
    locationTypes: [
      { id: "home", name_ko: "자택", name_en: "Home", icon: "🏠", cost_ko: "무료", cost_en: "Free", caution_ko: "법인등록 주소로 어려움", caution_en: "Difficult as company address", suitable_ko: "개인사업자만", suitable_en: "Sole proprietors only" },
      { id: "virtual", name_ko: "가상 오피스", name_en: "Virtual Office", icon: "📮", cost_ko: "월 3,000~10,000 바트", cost_en: "฿3K-10K/mo", caution_ko: "DBD 등록 가능한 주소인지 확인", caution_en: "Verify DBD-registrable address", suitable_ko: "초기 비용 절감", suitable_en: "Cost savings" },
      { id: "office", name_ko: "사무실/점포", name_en: "Office/Store", icon: "🏢", cost_ko: "지역별 상이", cost_en: "Varies by area", caution_ko: "임대계약서 필요, 보증금 2~3개월", caution_en: "Lease required, 2-3 month deposit", suitable_ko: "오프라인 사업", suitable_en: "Offline business" },
    ],
    taxDeadlines: [
      { month_ko: "매월 15일", month_en: "15th monthly", event_ko: "원천징수세 납부", event_en: "Withholding tax payment", type: "required" },
      { month_ko: "매월 15일", month_en: "15th monthly", event_ko: "VAT 신고", event_en: "VAT return", type: "required" },
      { month_ko: "5월", month_en: "May", event_ko: "연간 법인세 신고", event_en: "Annual corporate tax return", type: "required" },
      { month_ko: "8월", month_en: "Aug", event_ko: "반기 법인세 예납", event_en: "Half-year corporate tax prepayment", type: "required" },
    ],
    governmentResources: [
      { name_ko: "상무부 (DBD)", name_en: "Dept of Business Development (DBD)", url: "https://www.dbd.go.th", desc_ko: "법인등록, 사업자등록", desc_en: "Company registration" },
      { name_ko: "투자청 (BOI)", name_en: "Board of Investment (BOI)", url: "https://www.boi.go.th", desc_ko: "외국인 투자 인센티브", desc_en: "Foreign investment incentives" },
    ],
    registrationSteps: [
      { step: 1, title_ko: "회사명 예약", title_en: "Reserve company name", desc_ko: "DBD(상무부)에서 회사명 예약", desc_en: "Reserve name at DBD (Dept of Business Development)", duration_ko: "1~3일", duration_en: "1-3 days", cost_ko: "무료", cost_en: "Free" },
      { step: 2, title_ko: "설립 준비 (MOA)", title_en: "Prepare Memorandum of Association", desc_ko: "정관 작성, 최소 3명의 발기인 확보", desc_en: "Draft articles, secure minimum 3 promoters", duration_ko: "1~3일", duration_en: "1-3 days" },
      { step: 3, title_ko: "법인 등기", title_en: "Company registration", desc_ko: "DBD에 법인 등록 신청", desc_en: "Submit registration to DBD", duration_ko: "1~2주", duration_en: "1-2 weeks", cost_ko: "약 5,000~10,000 바트", cost_en: "~฿5K-10K" },
      { step: 4, title_ko: "세무 등록", title_en: "Tax registration", desc_ko: "세무서(Revenue Department)에 등록, VAT 등록", desc_en: "Register at Revenue Department, VAT registration", duration_ko: "1~2일", duration_en: "1-2 days" },
      { step: 5, title_ko: "사회보험 등록", title_en: "Social security registration", desc_ko: "직원 1명 이상 시 사회보험 등록", desc_en: "Register if you have 1+ employee", duration_ko: "1~3일", duration_en: "1-3 days" },
    ],
    supportPrograms: [
      { name_ko: "BOI 투자 인센티브", name_en: "BOI Investment Incentives", desc_ko: "법인세 최대 8년 면제, 수입관세 면제 등", desc_en: "Up to 8-year CIT exemption, import duty exemption", amount_ko: "업종별 상이", amount_en: "Varies by sector", url: "https://www.boi.go.th" },
      { name_ko: "SME 개발 은행 대출", name_en: "SME Development Bank Loans", desc_ko: "중소기업 전용 저금리 대출", desc_en: "Low-interest loans for SMEs", amount_ko: "최대 1,500만 바트", amount_en: "Up to ฿15M" },
    ],
    tips_ko: [
      "외국인은 일반적으로 태국인 51% 지분이 필요합니다 (외국인사업법)",
      "BOI 인증을 받으면 100% 외국인 소유 가능 + 법인세 최대 8년 면제",
      "VAT 7%는 동남아시아에서 경쟁력 있는 수준입니다",
      "방콕 외에 치앙마이, 푸켓도 디지털 노마드 창업에 인기입니다",
    ],
    tips_en: [
      "Foreigners generally need 51% Thai ownership (Foreign Business Act)",
      "BOI promotion allows 100% foreign ownership + up to 8-year CIT exemption",
      "7% VAT is competitive in Southeast Asia",
      "Besides Bangkok, Chiang Mai and Phuket are popular for digital nomad startups",
    ],
    warningForForeigners_ko: "외국인사업법(FBA)에 따라 외국인은 대부분 업종에서 51% 이상 지분 보유 불가합니다. BOI 인증 또는 FBA 면허를 통해 우회 가능하나, 노미니(명의 대여)는 불법입니다.",
    warningForForeigners_en: "Under the Foreign Business Act (FBA), foreigners cannot hold majority shares in most sectors. Bypass is possible via BOI promotion or FBA license, but nominee arrangements are illegal.",
    aiPromptContext: `태국 창업 전문가로서 답변해. บริษัท จำกัด(유한회사), BOI 인센티브, 외국인사업법(FBA), 51% 태국인 지분 규정, VAT(7%), 법인세(20%)를 안내해. 비용은 바트(฿)로 표시.`,
    loadingTips_ko: ["💡 태국에서 외국인은 일반적으로 태국인 51% 지분이 필요해요", "💡 BOI 인증을 받으면 100% 외국인 소유가 가능해요", "💡 태국 VAT는 7%로 비교적 낮아요"],
    loadingTips_en: ["💡 Foreigners generally need 51% Thai ownership", "💡 BOI promotion allows 100% foreign ownership", "💡 Thailand's VAT is relatively low at 7%"],
  },

  // ─── 인도네시아 (ID) ───
  ID: {
    code: "ID",
    businessStructures: [
      {
        id: "pt", name_ko: "유한책임회사", name_en: "Limited Liability Company", name_local: "PT (Perseroan Terbatas)",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "약 500만~2,000만 IDR", setup_cost_en: "~$300-1,300",
        setup_time_ko: "2~4주", setup_time_en: "2-4 weeks",
        pros_ko: "내국인 사업에 가장 보편적", pros_en: "Most common for locals",
        cons_ko: "외국인 제한, 최소 자본금", cons_en: "Foreign restrictions, minimum capital",
        recommend_ko: "인도네시아인 창업", recommend_en: "Indonesian entrepreneurs",
      },
      {
        id: "pt_pma", name_ko: "외국인투자회사", name_en: "Foreign Investment Company", name_local: "PT PMA",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "약 100억 IDR 투자계획 (실투자 25%)", setup_cost_en: "~$650K investment plan (25% realized)",
        setup_time_ko: "1~3개월", setup_time_en: "1-3 months",
        pros_ko: "외국인 100% 소유 가능 (업종별)", pros_en: "100% foreign ownership possible (by sector)",
        cons_ko: "높은 최소 투자금, 복잡한 절차", cons_en: "High minimum investment, complex process",
        recommend_ko: "외국인 창업 필수", recommend_en: "Required for foreign entrepreneurs",
      },
    ],
    businessCategories: [
      { id: "ecommerce", label_ko: "이커머스", label_en: "E-commerce", icon: "🛒", desc_ko: "Tokopedia, Shopee, Bukalapak", desc_en: "Tokopedia, Shopee, Bukalapak" },
      { id: "food", label_ko: "요식업", label_en: "Food Service", icon: "☕", desc_ko: "레스토랑, 카페, 와룽", desc_en: "Restaurant, cafe, warung" },
      { id: "tech", label_ko: "IT서비스", label_en: "IT Service", icon: "💻", desc_ko: "소프트웨어, 핀테크", desc_en: "Software, fintech" },
      { id: "trading", label_ko: "무역", label_en: "Trading", icon: "📦", desc_ko: "수출입, 유통", desc_en: "Import/export, distribution" },
      { id: "tourism", label_ko: "관광/숙박", label_en: "Tourism/Hotel", icon: "🏖️", desc_ko: "호텔, 리조트, 투어", desc_en: "Hotel, resort, tour" },
      { id: "manufacturing", label_ko: "제조업", label_en: "Manufacturing", icon: "🏭", desc_ko: "의류, 가구, 전자", desc_en: "Garment, furniture, electronics" },
      { id: "education", label_ko: "교육", label_en: "Education", icon: "📚", desc_ko: "교육 서비스", desc_en: "Education services" },
      { id: "other", label_ko: "기타", label_en: "Other", icon: "📌", desc_ko: "기타", desc_en: "Other" },
    ],
    locationTypes: [
      { id: "home", name_ko: "자택", name_en: "Home", icon: "🏠", cost_ko: "무료", cost_en: "Free", caution_ko: "PT PMA는 사무실 주소 필수", caution_en: "PT PMA requires office address", suitable_ko: "개인 프리랜서만", suitable_en: "Individual freelancers only" },
      { id: "virtual", name_ko: "가상 오피스", name_en: "Virtual Office", icon: "📮", cost_ko: "월 50만~200만 IDR", cost_en: "$30-130/mo", caution_ko: "법인등록 가능한 주소인지 확인", caution_en: "Verify registrable address", suitable_ko: "초기 비용 절감", suitable_en: "Cost savings" },
      { id: "office", name_ko: "사무실/점포", name_en: "Office/Store", icon: "🏢", cost_ko: "지역별 상이", cost_en: "Varies", caution_ko: "DOMISILI(주소 확인서) 필요", caution_en: "DOMISILI (address certificate) required", suitable_ko: "PT PMA 필수", suitable_en: "Required for PT PMA" },
    ],
    taxDeadlines: [
      { month_ko: "매월", month_en: "Monthly", event_ko: "VAT 신고 (PPN 11%)", event_en: "VAT return (PPN 11%)", type: "required" },
      { month_ko: "4월", month_en: "Apr", event_ko: "연간 법인세 신고", event_en: "Annual corporate tax return", type: "required" },
      { month_ko: "3월", month_en: "Mar", event_ko: "개인소득세 신고", event_en: "Individual income tax return", type: "required" },
    ],
    governmentResources: [
      { name_ko: "투자조정청 (BKPM)", name_en: "Investment Coordinating Board (BKPM)", url: "https://www.bkpm.go.id", desc_ko: "외국인 투자 등록, OSS 시스템", desc_en: "Foreign investment registration, OSS system" },
      { name_ko: "법무인권부", name_en: "Ministry of Law and Human Rights", url: "https://www.kemenkumham.go.id", desc_ko: "법인 설립 승인", desc_en: "Company establishment approval" },
    ],
    registrationSteps: [
      { step: 1, title_ko: "회사명 승인", title_en: "Company name approval", desc_ko: "법무인권부(AHU Online)에서 이름 승인", desc_en: "Approve name via Ministry of Law (AHU Online)", duration_ko: "1~3일", duration_en: "1-3 days" },
      { step: 2, title_ko: "정관 작성 (공증)", title_en: "Notarize articles of association", desc_ko: "공증인(Notaris)에게 정관 작성 의뢰", desc_en: "Engage Notaris for articles of association", duration_ko: "3~5일", duration_en: "3-5 days", cost_ko: "약 200~500만 IDR", cost_en: "$130-330" },
      { step: 3, title_ko: "OSS에서 NIB 발급", title_en: "Obtain NIB via OSS", desc_ko: "Online Single Submission 시스템으로 사업자식별번호 발급", desc_en: "Get Business Identification Number via OSS", duration_ko: "1~3일", duration_en: "1-3 days", cost_ko: "무료", cost_en: "Free" },
      { step: 4, title_ko: "세무 등록 (NPWP)", title_en: "Tax registration (NPWP)", desc_ko: "세무서에서 법인 납세번호 발급", desc_en: "Obtain corporate tax ID at tax office", duration_ko: "1~5일", duration_en: "1-5 days" },
      { step: 5, title_ko: "은행 계좌 개설", title_en: "Open bank account", desc_ko: "법인 계좌 개설 및 자본금 입금", desc_en: "Open corporate account and deposit capital", duration_ko: "1~2주", duration_en: "1-2 weeks" },
    ],
    supportPrograms: [
      { name_ko: "KUR (국민사업 대출)", name_en: "KUR (People's Business Credit)", desc_ko: "중소기업 전용 정부 보조 대출", desc_en: "Government-subsidized loans for SMEs", amount_ko: "최대 5억 IDR", amount_en: "Up to IDR 500M (~$33K)" },
      { name_ko: "세금 인센티브 (Tax Holiday)", name_en: "Tax Holiday", desc_ko: "대규모 투자 시 법인세 면제 (5~20년)", desc_en: "CIT exemption for large investments (5-20 years)", amount_ko: "투자액별 상이", amount_en: "Varies by investment" },
    ],
    tips_ko: [
      "외국인 투자는 OSS(Online Single Submission) 시스템으로 온라인 처리됩니다",
      "PT PMA 최소 투자금은 약 100억 루피아(약 $650K)이며 실투자 25% 필요",
      "자카르타는 비즈니스 중심, 발리는 관광·디지털노마드 중심입니다",
      "Negative Investment List에 따라 외국인 투자 제한 업종이 있습니다",
    ],
    tips_en: [
      "Foreign investment is processed online via OSS (Online Single Submission)",
      "PT PMA minimum investment is ~IDR 10B (~$650K) with 25% realized",
      "Jakarta is the business hub, Bali focuses on tourism and digital nomads",
      "Negative Investment List restricts foreign ownership in certain sectors",
    ],
    warningForForeigners_ko: "PT PMA 설립 시 최소 투자금 100억 IDR(~$650K)이 필요하며, 업종별 외국인 투자 제한(Negative Investment List)을 반드시 확인해야 합니다. 현지 공증인(Notaris)이 필수입니다.",
    warningForForeigners_en: "PT PMA requires minimum IDR 10B (~$650K) investment. Must check the Negative Investment List for sector restrictions. A local Notaris is mandatory for the process.",
    aiPromptContext: `인도네시아 창업 전문가로서 답변해. PT/PT PMA 구분, OSS(Online Single Submission) 시스템, NIB(사업자식별번호), Negative Investment List, PPN(VAT 11%)을 안내해. 비용은 루피아(IDR)와 달러 병기.`,
    loadingTips_ko: ["💡 인도네시아 외국인 투자는 OSS 시스템으로 온라인 처리돼요", "💡 PT PMA 최소 투자금은 약 100억 루피아예요", "💡 자카르타와 발리의 사업 환경이 크게 달라요"],
    loadingTips_en: ["💡 Foreign investment uses the OSS online system", "💡 PT PMA minimum investment is ~IDR 10 billion", "💡 Jakarta and Bali have very different business environments"],
  },

  // ─── 싱가포르 (SG) ───
  SG: {
    code: "SG",
    businessStructures: [
      {
        id: "sole", name_ko: "개인사업자", name_en: "Sole Proprietorship",
        liability_ko: "무한책임", liability_en: "Unlimited liability",
        setup_cost_ko: "S$115 (등록비)", setup_cost_en: "S$115 (registration fee)",
        setup_time_ko: "1~2일", setup_time_en: "1-2 days",
        pros_ko: "설립 간단, 저비용", pros_en: "Simple, low cost",
        cons_ko: "무한책임, 외국인은 현지 매니저 필요", cons_en: "Unlimited liability, foreigners need local manager",
        recommend_ko: "소규모 로컬 사업", recommend_en: "Small local business",
      },
      {
        id: "pte_ltd", name_ko: "비공개유한회사", name_en: "Private Limited Company", name_local: "Pte. Ltd.",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "S$315 (등록비) + 대행비 S$500~2,000", setup_cost_en: "S$315 + agent S$500-2,000",
        setup_time_ko: "1~3일 (BizFile+)", setup_time_en: "1-3 days (BizFile+)",
        pros_ko: "세금 혜택 (17%), 국제 신뢰도 높음", pros_en: "Tax benefits (17%), high global credibility",
        cons_ko: "현지 이사 필수, 연간 감사", cons_en: "Local director required, annual audit",
        recommend_ko: "외국인 창업에 가장 추천", recommend_en: "Most recommended for foreigners",
      },
    ],
    businessCategories: [
      { id: "ecommerce", label_ko: "이커머스", label_en: "E-commerce", icon: "🛒", desc_ko: "온라인 판매, Shopee SG", desc_en: "Online sales, Shopee SG" },
      { id: "food", label_ko: "요식업", label_en: "Food Service", icon: "☕", desc_ko: "레스토랑, 호커센터", desc_en: "Restaurant, hawker center" },
      { id: "tech", label_ko: "IT/핀테크", label_en: "IT/Fintech", icon: "💻", desc_ko: "소프트웨어, 핀테크", desc_en: "Software, fintech" },
      { id: "trading", label_ko: "무역/물류", label_en: "Trading/Logistics", icon: "📦", desc_ko: "중계무역, 물류", desc_en: "Entrepot trade, logistics" },
      { id: "consulting", label_ko: "컨설팅", label_en: "Consulting", icon: "🎨", desc_ko: "경영 컨설팅, 전문 서비스", desc_en: "Management consulting" },
      { id: "education", label_ko: "교육", label_en: "Education", icon: "📚", desc_ko: "사립 교육기관", desc_en: "Private education" },
      { id: "finance", label_ko: "금융서비스", label_en: "Financial Services", icon: "🏦", desc_ko: "펀드, 자산관리", desc_en: "Fund, wealth management" },
      { id: "other", label_ko: "기타", label_en: "Other", icon: "📌", desc_ko: "기타", desc_en: "Other" },
    ],
    locationTypes: [
      { id: "home", name_ko: "자택 (HDB)", name_en: "Home (HDB)", icon: "🏠", cost_ko: "무료", cost_en: "Free", caution_ko: "HDB Home Office Scheme 승인 필요", caution_en: "HDB Home Office Scheme approval needed", suitable_ko: "소규모 온라인 사업", suitable_en: "Small online business" },
      { id: "virtual", name_ko: "가상 오피스", name_en: "Virtual Office", icon: "📮", cost_ko: "S$50~300/월", cost_en: "S$50-300/mo", caution_ko: "ACRA 등록 가능 주소 확인", caution_en: "Verify ACRA-registrable address", suitable_ko: "비용 절감", suitable_en: "Cost savings" },
      { id: "office", name_ko: "사무실", name_en: "Office", icon: "🏢", cost_ko: "S$3,000~10,000+/월", cost_en: "S$3K-10K+/mo", caution_ko: "싱가포르 임대료 매우 높음", caution_en: "Singapore rent is very high", suitable_ko: "오프라인 사업, 대면 서비스", suitable_en: "Offline, face-to-face services" },
    ],
    taxDeadlines: [
      { month_ko: "4월 15일", month_en: "Apr 15", event_ko: "개인소득세 신고", event_en: "Personal income tax return", type: "required" },
      { month_ko: "11월 30일", month_en: "Nov 30", event_ko: "법인세 신고 (ECI)", event_en: "Corporate tax return (ECI)", type: "required" },
      { month_ko: "분기별", month_en: "Quarterly", event_ko: "GST 신고 (해당 시)", event_en: "GST return (if applicable)", type: "optional" },
    ],
    governmentResources: [
      { name_ko: "기업등록청 (ACRA)", name_en: "ACRA", url: "https://www.acra.gov.sg", desc_ko: "법인 설립, 사업자등록", desc_en: "Company incorporation, registration" },
      { name_ko: "Enterprise Singapore", name_en: "Enterprise Singapore", url: "https://www.enterprisesg.gov.sg", desc_ko: "스타트업 지원, 보조금", desc_en: "Startup support, grants" },
      { name_ko: "내국세청 (IRAS)", name_en: "IRAS", url: "https://www.iras.gov.sg", desc_ko: "세금 등록, 신고", desc_en: "Tax registration, filing" },
    ],
    registrationSteps: [
      { step: 1, title_ko: "회사명 승인", title_en: "Approve company name", desc_ko: "ACRA BizFile+에서 이름 검색·예약", desc_en: "Search & reserve name on ACRA BizFile+", duration_ko: "즉시~1일", duration_en: "Instant-1 day", cost_ko: "S$15", cost_en: "S$15" },
      { step: 2, title_ko: "법인 설립 등록", title_en: "Incorporate company", desc_ko: "BizFile+에서 온라인 법인 설립 신청", desc_en: "Apply online via BizFile+", duration_ko: "1~3일", duration_en: "1-3 days", cost_ko: "S$300", cost_en: "S$300" },
      { step: 3, title_ko: "은행 계좌 개설", title_en: "Open bank account", desc_ko: "DBS, OCBC, UOB 등에서 법인 계좌 개설", desc_en: "Open corporate account at DBS, OCBC, UOB", duration_ko: "1~2주", duration_en: "1-2 weeks" },
      { step: 4, title_ko: "GST 등록 (해당 시)", title_en: "GST registration (if applicable)", desc_ko: "연 매출 S$1M 초과 시 IRAS에 GST 등록", desc_en: "Register GST at IRAS if revenue >S$1M", duration_ko: "1~3일", duration_en: "1-3 days" },
      { step: 5, title_ko: "취업비자 신청 (외국인)", title_en: "Apply for work pass (foreigners)", desc_ko: "EntrePass 또는 Employment Pass 신청", desc_en: "Apply for EntrePass or Employment Pass", duration_ko: "4~8주", duration_en: "4-8 weeks" },
    ],
    supportPrograms: [
      { name_ko: "Startup SG Founder", name_en: "Startup SG Founder", desc_ko: "첫 창업자 멘토링 + 최대 S$50K 지원", desc_en: "First-time founder mentoring + up to S$50K", amount_ko: "최대 S$50,000", amount_en: "Up to S$50,000", url: "https://www.startupsg.gov.sg" },
      { name_ko: "Enterprise Development Grant", name_en: "Enterprise Development Grant (EDG)", desc_ko: "사업 역량 강화 지원금 (비용 70% 지원)", desc_en: "Business capability development (up to 70% support)", amount_ko: "프로젝트별 상이", amount_en: "Varies by project", url: "https://www.enterprisesg.gov.sg" },
      { name_ko: "스타트업 면세 (SUTE)", name_en: "Start-Up Tax Exemption (SUTE)", desc_ko: "처음 3년간 법인세 면세 혜택", desc_en: "Tax exemption for first 3 years", amount_ko: "첫 S$200K 소득 면세", amount_en: "First S$200K income exempt" },
    ],
    tips_ko: [
      "Pte. Ltd.는 1~3일이면 설립 완료 — 세계에서 가장 빠른 수준입니다",
      "처음 3년간 첫 S$200K 소득에 대해 법인세 면세 혜택이 있습니다 (SUTE)",
      "외국인은 현지 이사(Local Director)가 반드시 1명 필요합니다",
      "싱가포르는 아시아 금융 허브로 글로벌 사업 거점에 최적입니다",
    ],
    tips_en: [
      "Pte. Ltd. can be set up in 1-3 days — among the fastest in the world",
      "Start-Up Tax Exemption (SUTE) provides tax-free status on first S$200K for 3 years",
      "Foreigners must have at least 1 Local Director (Singapore resident)",
      "Singapore is Asia's financial hub — ideal as a global business base",
    ],
    warningForForeigners_ko: "외국인은 현지 이사(Local Director, 싱가포르 시민권/영주권자) 1명이 반드시 필요합니다. 직접 운영하려면 EntrePass(창업비자)가 필요하며, 혁신적 사업 계획이 요구됩니다.",
    warningForForeigners_en: "Foreigners must appoint at least 1 Local Director (Singapore citizen/PR). To run the business personally, you need an EntrePass (entrepreneur visa) with an innovative business plan.",
    aiPromptContext: `싱가포르 창업 전문가로서 답변해. Pte. Ltd. 설립, ACRA/BizFile+, 법인세(17%, 스타트업 면세), GST(9%), EntrePass(창업비자), Enterprise SG 지원사업을 안내해. 비용은 싱가포르 달러(S$)로 표시.`,
    loadingTips_ko: ["💡 싱가포르 Pte. Ltd.는 1~3일이면 설립 완료돼요", "💡 처음 3년간 법인세 면세 혜택이 있어요", "💡 싱가포르는 아시아 금융 허브로 글로벌 사업에 유리해요"],
    loadingTips_en: ["💡 Singapore Pte. Ltd. can be set up in 1-3 days", "💡 Tax exemption for first 3 years available", "💡 Singapore is Asia's financial hub for global business"],
  },

  // ─── 영국 (GB) ───
  GB: {
    code: "GB",
    businessStructures: [
      {
        id: "sole_trader", name_ko: "개인사업자", name_en: "Sole Trader",
        liability_ko: "무한책임", liability_en: "Unlimited liability",
        setup_cost_ko: "무료 (HMRC 등록)", setup_cost_en: "Free (HMRC registration)",
        setup_time_ko: "즉시", setup_time_en: "Immediate",
        pros_ko: "설립 간단, 비용 없음", pros_en: "Simple setup, no cost",
        cons_ko: "무한책임", cons_en: "Unlimited liability",
        recommend_ko: "프리랜서, 소규모 사업", recommend_en: "Freelancers, small businesses",
      },
      {
        id: "ltd", name_ko: "유한회사", name_en: "Private Limited Company", name_local: "Ltd",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "£12 (Companies House 온라인)", setup_cost_en: "£12 (Companies House online)",
        setup_time_ko: "24시간 이내", setup_time_en: "Within 24 hours",
        pros_ko: "설립비 매우 저렴, 빠른 처리", pros_en: "Very low cost, fast processing",
        cons_ko: "이사 정보 공개, 연간 보고", cons_en: "Director info public, annual reports",
        recommend_ko: "외국인 포함 가장 인기", recommend_en: "Most popular including foreigners",
      },
      {
        id: "llp", name_ko: "유한책임 파트너십", name_en: "LLP",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "£12 (Companies House)", setup_cost_en: "£12 (Companies House)",
        setup_time_ko: "24시간 이내", setup_time_en: "Within 24 hours",
        pros_ko: "파트너 간 유연한 이익 배분", pros_en: "Flexible profit sharing between partners",
        cons_ko: "최소 2명 파트너 필요", cons_en: "Minimum 2 partners required",
        recommend_ko: "전문직 (회계사, 변호사)", recommend_en: "Professionals (accountants, lawyers)",
      },
    ],
    businessCategories: [
      { id: "ecommerce", label_ko: "이커머스", label_en: "E-commerce", icon: "🛒", desc_ko: "온라인 판매, Amazon UK", desc_en: "Online sales, Amazon UK" },
      { id: "food", label_ko: "요식업", label_en: "Food Service", icon: "☕", desc_ko: "레스토랑, 카페, 펍", desc_en: "Restaurant, cafe, pub" },
      { id: "tech", label_ko: "IT서비스", label_en: "IT Service", icon: "💻", desc_ko: "소프트웨어, SaaS", desc_en: "Software, SaaS" },
      { id: "trading", label_ko: "무역", label_en: "Trading", icon: "📦", desc_ko: "수출입", desc_en: "Import/export" },
      { id: "consulting", label_ko: "컨설팅", label_en: "Consulting", icon: "🎨", desc_ko: "전문 서비스", desc_en: "Professional services" },
      { id: "education", label_ko: "교육", label_en: "Education", icon: "📚", desc_ko: "교육, 코칭", desc_en: "Education, coaching" },
      { id: "real-estate", label_ko: "부동산", label_en: "Real Estate", icon: "🏠", desc_ko: "부동산 투자, 관리", desc_en: "Property investment, management" },
      { id: "other", label_ko: "기타", label_en: "Other", icon: "📌", desc_ko: "기타", desc_en: "Other" },
    ],
    locationTypes: [
      { id: "home", name_ko: "자택", name_en: "Home", icon: "🏠", cost_ko: "무료", cost_en: "Free", caution_ko: "임대 계약서 확인 (사업용 허가)", caution_en: "Check lease for business use", suitable_ko: "프리랜서, 온라인 사업", suitable_en: "Freelancers, online business" },
      { id: "virtual", name_ko: "가상 오피스", name_en: "Virtual Office", icon: "📮", cost_ko: "£15~100/월", cost_en: "£15-100/mo", caution_ko: "Companies House 등록 가능 주소 확인", caution_en: "Verify registrable address", suitable_ko: "법인 등록 주소용", suitable_en: "Company registered address" },
      { id: "office", name_ko: "사무실/점포", name_en: "Office/Store", icon: "🏢", cost_ko: "지역별 상이", cost_en: "Varies by area", caution_ko: "Business rates (사업용 세금) 확인", caution_en: "Check Business rates", suitable_ko: "오프라인 사업", suitable_en: "Offline business" },
    ],
    taxDeadlines: [
      { month_ko: "1월 31일", month_en: "Jan 31", event_ko: "Self Assessment 세금 신고·납부", event_en: "Self Assessment tax return & payment", type: "required" },
      { month_ko: "4월 5일", month_en: "Apr 5", event_ko: "회계연도 종료 (표준)", event_en: "Standard accounting year end", type: "required" },
      { month_ko: "분기별", month_en: "Quarterly", event_ko: "VAT 신고 (해당 시)", event_en: "VAT return (if applicable)", type: "optional" },
      { month_ko: "회계연도+9개월", month_en: "FY+9mo", event_ko: "법인세 납부", event_en: "Corporation tax payment", type: "required" },
    ],
    governmentResources: [
      { name_ko: "Companies House", name_en: "Companies House", url: "https://www.gov.uk/government/organisations/companies-house", desc_ko: "법인 설립, 연간 보고", desc_en: "Company incorporation, annual reports" },
      { name_ko: "HMRC", name_en: "HM Revenue & Customs", url: "https://www.gov.uk/government/organisations/hm-revenue-customs", desc_ko: "세금 등록, Self Assessment", desc_en: "Tax registration, Self Assessment" },
      { name_ko: "Start Up Loans", name_en: "Start Up Loans", url: "https://www.startuploans.co.uk", desc_ko: "최대 £25,000 무이자 대출", desc_en: "Up to £25,000 interest-free loans", },
    ],
    registrationSteps: [
      { step: 1, title_ko: "회사명 확인", title_en: "Check company name", desc_ko: "Companies House에서 이름 중복 확인", desc_en: "Check name availability at Companies House", duration_ko: "즉시", duration_en: "Instant", cost_ko: "무료", cost_en: "Free" },
      { step: 2, title_ko: "법인 등록", title_en: "Register company", desc_ko: "Companies House 온라인 등록 (Form IN01)", desc_en: "Register online at Companies House", duration_ko: "24시간 이내", duration_en: "Within 24 hours", cost_ko: "£12", cost_en: "£12" },
      { step: 3, title_ko: "HMRC 등록", title_en: "Register with HMRC", desc_ko: "법인세, PAYE, VAT 등록", desc_en: "Register for Corporation Tax, PAYE, VAT", duration_ko: "1~5일", duration_en: "1-5 days", cost_ko: "무료", cost_en: "Free" },
      { step: 4, title_ko: "비즈니스 은행 계좌", title_en: "Open business bank account", desc_ko: "법인 계좌 개설 (Barclays, HSBC, Monzo 등)", desc_en: "Open account at Barclays, HSBC, Monzo, etc.", duration_ko: "1~2주", duration_en: "1-2 weeks" },
      { step: 5, title_ko: "보험 가입", title_en: "Get business insurance", desc_ko: "Employers' Liability Insurance (직원 있을 경우 필수)", desc_en: "Employers' Liability Insurance (required if hiring)", duration_ko: "1일", duration_en: "1 day" },
    ],
    supportPrograms: [
      { name_ko: "Start Up Loans", name_en: "Start Up Loans", desc_ko: "정부 지원 무이자 대출 + 멘토링", desc_en: "Government-backed interest-free loan + mentoring", amount_ko: "최대 £25,000", amount_en: "Up to £25,000", url: "https://www.startuploans.co.uk" },
      { name_ko: "SEIS/EIS 세제 혜택", name_en: "SEIS/EIS Tax Relief", desc_ko: "투자자에게 세금 감면 → 투자 유치 용이", desc_en: "Tax relief for investors → easier fundraising", amount_ko: "SEIS 최대 £250K 투자", amount_en: "SEIS up to £250K investment" },
      { name_ko: "Innovate UK 보조금", name_en: "Innovate UK Grants", desc_ko: "혁신 프로젝트 R&D 보조금", desc_en: "R&D grants for innovation projects", amount_ko: "프로젝트별 상이", amount_en: "Varies by project" },
    ],
    tips_ko: [
      "영국 Ltd는 £12에 24시간 이내 설립 가능 — 세계에서 가장 쉽고 저렴합니다",
      "VAT는 연 매출 £85,000 이상부터 등록 의무이며, 세율은 20%입니다",
      "SEIS/EIS 제도를 활용하면 투자자에게 세금 혜택을 줄 수 있어 투자 유치에 유리합니다",
      "Self Assessment 신고는 매년 1월 31일까지 완료해야 합니다",
    ],
    tips_en: [
      "UK Ltd costs just £12 and takes under 24 hours — easiest and cheapest globally",
      "VAT registration required above £85,000 annual revenue, rate is 20%",
      "SEIS/EIS schemes provide tax relief to investors, making fundraising easier",
      "Self Assessment must be filed by January 31st each year",
    ],
    warningForForeigners_ko: "외국인도 영국 거주 없이 Ltd 설립 가능합니다. 다만 최소 1명의 이사(Director)가 필요하며, 영국 주소(Registered Office)가 필요합니다. 비자 없이 원격 운영 가능합니다.",
    warningForForeigners_en: "Foreigners can set up a UK Ltd without being a UK resident. At least 1 Director is required plus a UK Registered Office address. Remote operation is possible without a visa.",
    aiPromptContext: `영국 창업 전문가로서 답변해. Sole Trader/Ltd/LLP 구분, Companies House 등록, HMRC Self Assessment, Corporation Tax(25%), VAT(20%), National Insurance를 안내해. 비용은 파운드(£)로 표시.`,
    loadingTips_ko: ["💡 영국 Ltd는 £12에 24시간 이내 설립 가능해요", "💡 VAT는 연 매출 £85,000 이상부터 등록 필요해요", "💡 Start Up Loans에서 최대 £25,000 대출 가능해요"],
    loadingTips_en: ["💡 UK Ltd can be set up for £12 within 24 hours", "💡 VAT registration required over £85,000 annual revenue", "💡 Start Up Loans offers up to £25,000"],
  },

  // ─── 독일 (DE) ───
  DE: {
    code: "DE",
    businessStructures: [
      {
        id: "einzelunternehmen", name_ko: "개인사업자", name_en: "Sole Proprietor", name_local: "Einzelunternehmen",
        liability_ko: "무한책임", liability_en: "Unlimited liability",
        setup_cost_ko: "약 €20~50 (Gewerbeanmeldung)", setup_cost_en: "~€20-50 (trade registration)",
        setup_time_ko: "즉시~1주", setup_time_en: "Instant-1 week",
        pros_ko: "설립 간단, 저비용", pros_en: "Simple setup, low cost",
        cons_ko: "무한책임", cons_en: "Unlimited liability",
        recommend_ko: "프리랜서(Freiberufler), 소규모 사업", recommend_en: "Freelancers (Freiberufler), small businesses",
      },
      {
        id: "gmbh", name_ko: "유한회사", name_en: "Limited Liability Company", name_local: "GmbH",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "최소 자본금 €25,000 + 공증비 €1,000~2,000", setup_cost_en: "Min capital €25,000 + notary €1,000-2,000",
        setup_time_ko: "2~4주", setup_time_en: "2-4 weeks",
        pros_ko: "높은 신뢰도, 유한책임", pros_en: "High credibility, limited liability",
        cons_ko: "높은 최소 자본금", cons_en: "High minimum capital",
        recommend_ko: "중대형 사업", recommend_en: "Medium to large businesses",
      },
      {
        id: "ug", name_ko: "미니 유한회사", name_en: "Mini LLC", name_local: "UG (haftungsbeschränkt)",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "최소 자본금 €1 + 공증비", setup_cost_en: "Min capital €1 + notary fees",
        setup_time_ko: "2~4주", setup_time_en: "2-4 weeks",
        pros_ko: "최소 자본금 €1, GmbH로 전환 가능", pros_en: "Min capital €1, convertible to GmbH",
        cons_ko: "신뢰도 GmbH보다 낮음, 이익 25% 적립 의무", cons_en: "Lower credibility, must reserve 25% profit",
        recommend_ko: "소자본 창업에 추천", recommend_en: "Recommended for low-capital startups",
      },
    ],
    businessCategories: [
      { id: "ecommerce", label_ko: "이커머스", label_en: "E-commerce", icon: "🛒", desc_ko: "온라인 판매, Amazon DE", desc_en: "Online sales, Amazon DE" },
      { id: "food", label_ko: "요식업", label_en: "Food Service", icon: "☕", desc_ko: "레스토랑, 카페", desc_en: "Restaurant, cafe" },
      { id: "tech", label_ko: "IT서비스", label_en: "IT Service", icon: "💻", desc_ko: "소프트웨어, SaaS", desc_en: "Software, SaaS" },
      { id: "trading", label_ko: "무역", label_en: "Trading", icon: "📦", desc_ko: "수출입, 유통", desc_en: "Import/export, distribution" },
      { id: "consulting", label_ko: "컨설팅", label_en: "Consulting", icon: "🎨", desc_ko: "Freiberufler, 전문 서비스", desc_en: "Freiberufler, professional services" },
      { id: "manufacturing", label_ko: "제조업", label_en: "Manufacturing", icon: "🏭", desc_ko: "기계, 자동차 부품", desc_en: "Machinery, auto parts" },
      { id: "education", label_ko: "교육", label_en: "Education", icon: "📚", desc_ko: "교육, 코칭", desc_en: "Education, coaching" },
      { id: "other", label_ko: "기타", label_en: "Other", icon: "📌", desc_ko: "기타", desc_en: "Other" },
    ],
    locationTypes: [
      { id: "home", name_ko: "자택", name_en: "Home", icon: "🏠", cost_ko: "무료", cost_en: "Free", caution_ko: "Gewerbeanmeldung에 자택 주소 사용 가능", caution_en: "Home address can be used for trade registration", suitable_ko: "Freiberufler, 소규모 사업", suitable_en: "Freiberufler, small businesses" },
      { id: "virtual", name_ko: "가상 오피스", name_en: "Virtual Office", icon: "📮", cost_ko: "€50~200/월", cost_en: "€50-200/mo", caution_ko: "법인등기 가능 여부 확인", caution_en: "Verify registrable address", suitable_ko: "비용 절감", suitable_en: "Cost savings" },
      { id: "office", name_ko: "사무실/점포", name_en: "Office/Store", icon: "🏢", cost_ko: "도시별 상이", cost_en: "Varies by city", caution_ko: "Gewerbesteuer (영업세) 발생", caution_en: "Gewerbesteuer (trade tax) applies", suitable_ko: "오프라인 사업", suitable_en: "Offline business" },
    ],
    taxDeadlines: [
      { month_ko: "5월 31일", month_en: "May 31", event_ko: "소득세/법인세 신고", event_en: "Income/corporate tax return", type: "required" },
      { month_ko: "매월 10일", month_en: "10th monthly", event_ko: "부가세(USt) 예납 신고", event_en: "VAT (USt) prepayment return", type: "required" },
      { month_ko: "분기별", month_en: "Quarterly", event_ko: "소득세 예납", event_en: "Income tax prepayment", type: "required" },
    ],
    governmentResources: [
      { name_ko: "연방경제에너지부", name_en: "Federal Ministry for Economic Affairs", url: "https://www.bmwk.de", desc_ko: "창업 지원, 보조금 정보", desc_en: "Startup support, grants" },
      { name_ko: "KfW 은행", name_en: "KfW Bank", url: "https://www.kfw.de", desc_ko: "창업 대출 (ERP-Gründerkredit)", desc_en: "Startup loans (ERP-Gründerkredit)" },
      { name_ko: "Finanzamt (세무서)", name_en: "Finanzamt (Tax Office)", url: "https://www.elster.de", desc_ko: "세금 등록, 신고", desc_en: "Tax registration, filing" },
    ],
    registrationSteps: [
      { step: 1, title_ko: "사업 형태 결정", title_en: "Choose business structure", desc_ko: "Einzelunternehmen/GmbH/UG 또는 Freiberufler 판단", desc_en: "Determine if Einzelunternehmen/GmbH/UG or Freiberufler", duration_ko: "1일", duration_en: "1 day" },
      { step: 2, title_ko: "영업등록 (Gewerbeanmeldung)", title_en: "Trade registration (Gewerbeanmeldung)", desc_ko: "관할 시청(Gewerbeamt)에서 영업 등록", desc_en: "Register at local Gewerbeamt (trade office)", duration_ko: "즉시~1일", duration_en: "Instant-1 day", cost_ko: "€20~50", cost_en: "€20-50" },
      { step: 3, title_ko: "세무서 등록 (Finanzamt)", title_en: "Tax office registration", desc_ko: "Fragebogen zur steuerlichen Erfassung 제출", desc_en: "Submit tax registration questionnaire", duration_ko: "2~4주", duration_en: "2-4 weeks", cost_ko: "무료", cost_en: "Free" },
      { step: 4, title_ko: "공증 및 상업등기 (법인)", title_en: "Notarize & commercial register (corp.)", desc_ko: "Notar 공증 후 Handelsregister 등록", desc_en: "Notarize at Notar, register at Handelsregister", duration_ko: "2~4주", duration_en: "2-4 weeks", cost_ko: "€1,000~2,500", cost_en: "€1,000-2,500" },
      { step: 5, title_ko: "비즈니스 은행 계좌", title_en: "Open business bank account", desc_ko: "법인 계좌 개설 (N26 Business, Commerzbank 등)", desc_en: "Open account at N26 Business, Commerzbank, etc.", duration_ko: "1~2주", duration_en: "1-2 weeks" },
    ],
    supportPrograms: [
      { name_ko: "KfW ERP-Gründerkredit", name_en: "KfW ERP Startup Credit", desc_ko: "정부 보증 저금리 창업 대출", desc_en: "Government-backed low-interest startup loan", amount_ko: "최대 €125,000", amount_en: "Up to €125,000", url: "https://www.kfw.de" },
      { name_ko: "EXIST 창업 보조금", name_en: "EXIST Startup Grant", desc_ko: "대학 기반 기술 창업 보조금", desc_en: "University-based tech startup grant", amount_ko: "최대 €150,000/12개월", amount_en: "Up to €150,000/12 months" },
      { name_ko: "Gründungszuschuss", name_en: "Startup Subsidy", desc_ko: "실업급여 수급자 창업 지원금", desc_en: "Startup subsidy for unemployment benefit recipients", amount_ko: "6개월간 실업급여+€300/월", amount_en: "6 months benefits + €300/mo" },
    ],
    tips_ko: [
      "UG(미니 유한회사)는 자본금 €1부터 법인 설립이 가능합니다",
      "Freiberufler(자유직업: IT, 컨설팅, 디자인 등)는 Gewerbeanmeldung 불요",
      "KfW에서 최대 €125,000 저금리 창업 대출이 가능합니다",
      "Gewerbesteuer(영업세)는 시/군별로 세율이 달라 입지 선정 시 확인 필요",
    ],
    tips_en: [
      "UG (mini LLC) can be formed with just €1 capital",
      "Freiberufler (freelancers in IT, consulting, design) don't need trade registration",
      "KfW offers startup loans up to €125,000 at low interest",
      "Gewerbesteuer (trade tax) rates vary by municipality — check when choosing location",
    ],
    warningForForeigners_ko: "EU 시민은 자유롭게 창업 가능합니다. 비EU 시민은 체류허가(Aufenthaltserlaubnis)에 자영업 허가가 포함되어야 합니다. 프리랜서 비자(Freiberufler-Visum)가 비교적 취득이 용이합니다.",
    warningForForeigners_en: "EU citizens can freely start businesses. Non-EU citizens need a residence permit (Aufenthaltserlaubnis) with self-employment authorization. Freelancer visa (Freiberufler-Visum) is relatively easy to obtain.",
    aiPromptContext: `독일 창업 전문가로서 답변해. Einzelunternehmen/GmbH/UG 구분, Gewerbeanmeldung(영업등록), Finanzamt 세무등록, USt(부가세 19%), Gewerbesteuer(영업세), KfW 대출을 안내해. 비용은 유로(€)로 표시. Freiberufler(자유직업)과 Gewerbetreibende(영업자) 구분 설명.`,
    loadingTips_ko: ["💡 독일 UG는 자본금 €1부터 법인 설립이 가능해요", "💡 Freiberufler는 Gewerbeanmeldung 없이 사업 가능해요", "💡 KfW에서 최대 €125,000 창업 대출이 가능해요"],
    loadingTips_en: ["💡 German UG can be formed with just €1 capital", "💡 Freiberufler don't need trade registration", "💡 KfW offers startup loans up to €125,000"],
  },

  // ─── 호주 (AU) ───
  AU: {
    code: "AU",
    businessStructures: [
      {
        id: "sole_trader", name_ko: "개인사업자", name_en: "Sole Trader",
        liability_ko: "무한책임", liability_en: "Unlimited liability",
        setup_cost_ko: "무료 (ABN 등록)", setup_cost_en: "Free (ABN registration)",
        setup_time_ko: "즉시", setup_time_en: "Immediate",
        pros_ko: "설립 즉시, 비용 없음", pros_en: "Instant setup, no cost",
        cons_ko: "무한책임", cons_en: "Unlimited liability",
        recommend_ko: "프리랜서, 소규모 사업", recommend_en: "Freelancers, small businesses",
      },
      {
        id: "pty_ltd", name_ko: "비공개 유한회사", name_en: "Proprietary Limited", name_local: "Pty Ltd",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "A$538 (ASIC 등록비)", setup_cost_en: "A$538 (ASIC registration)",
        setup_time_ko: "1~3일", setup_time_en: "1-3 days",
        pros_ko: "유한책임, 낮은 법인세(25%)", pros_en: "Limited liability, low corporate tax (25%)",
        cons_ko: "연간 ASIC 수수료, 감사 의무", cons_en: "Annual ASIC fee, audit requirements",
        recommend_ko: "성장 계획이 있는 사업", recommend_en: "Businesses with growth plans",
      },
      {
        id: "partnership", name_ko: "파트너십", name_en: "Partnership",
        liability_ko: "무한책임 (일반) / 유한책임 (LP)", liability_en: "Unlimited (general) / Limited (LP)",
        setup_cost_ko: "무료~A$100", setup_cost_en: "Free-A$100",
        setup_time_ko: "즉시~1주", setup_time_en: "Instant-1 week",
        pros_ko: "설립 간단, 유연한 구조", pros_en: "Simple setup, flexible structure",
        cons_ko: "공동 책임, 분쟁 가능", cons_en: "Joint liability, potential disputes",
        recommend_ko: "2인 이상 공동 사업", recommend_en: "Joint ventures with 2+ people",
      },
    ],
    businessCategories: [
      { id: "ecommerce", label_ko: "이커머스", label_en: "E-commerce", icon: "🛒", desc_ko: "온라인 판매, eBay AU", desc_en: "Online sales, eBay AU" },
      { id: "food", label_ko: "요식업", label_en: "Food Service", icon: "☕", desc_ko: "레스토랑, 카페", desc_en: "Restaurant, cafe" },
      { id: "tech", label_ko: "IT서비스", label_en: "IT Service", icon: "💻", desc_ko: "소프트웨어, SaaS", desc_en: "Software, SaaS" },
      { id: "trading", label_ko: "수출입", label_en: "Import/Export", icon: "📦", desc_ko: "수출입, 유통", desc_en: "Import/export, distribution" },
      { id: "consulting", label_ko: "컨설팅", label_en: "Consulting", icon: "🎨", desc_ko: "전문 서비스", desc_en: "Professional services" },
      { id: "construction", label_ko: "건설/인테리어", label_en: "Construction", icon: "🔨", desc_ko: "건설, 인테리어", desc_en: "Construction, interior" },
      { id: "education", label_ko: "교육", label_en: "Education", icon: "📚", desc_ko: "교육, 코칭", desc_en: "Education, coaching" },
      { id: "other", label_ko: "기타", label_en: "Other", icon: "📌", desc_ko: "기타", desc_en: "Other" },
    ],
    locationTypes: [
      { id: "home", name_ko: "자택", name_en: "Home", icon: "🏠", cost_ko: "무료", cost_en: "Free", caution_ko: "지방정부 허가 필요할 수 있음", caution_en: "Local council approval may be needed", suitable_ko: "온라인 사업, 프리랜서", suitable_en: "Online business, freelancers" },
      { id: "virtual", name_ko: "가상 오피스", name_en: "Virtual Office", icon: "📮", cost_ko: "A$50~300/월", cost_en: "A$50-300/mo", caution_ko: "ASIC 등록 가능 주소 확인", caution_en: "Verify ASIC-registrable address", suitable_ko: "비용 절감", suitable_en: "Cost savings" },
      { id: "office", name_ko: "사무실/점포", name_en: "Office/Store", icon: "🏢", cost_ko: "도시별 상이", cost_en: "Varies by city", caution_ko: "임대계약 확인", caution_en: "Check lease agreement", suitable_ko: "오프라인 사업", suitable_en: "Offline business" },
    ],
    taxDeadlines: [
      { month_ko: "10월 31일", month_en: "Oct 31", event_ko: "소득세 신고 (개인/개인사업자)", event_en: "Income tax return (individual/sole trader)", type: "required" },
      { month_ko: "2월 28일", month_en: "Feb 28", event_ko: "법인세 신고", event_en: "Corporate tax return", type: "required" },
      { month_ko: "분기별", month_en: "Quarterly", event_ko: "BAS (Business Activity Statement)", event_en: "BAS (Business Activity Statement)", type: "required" },
    ],
    governmentResources: [
      { name_ko: "ASIC", name_en: "Australian Securities & Investments Commission", url: "https://www.asic.gov.au", desc_ko: "법인 설립, 등록", desc_en: "Company incorporation, registration" },
      { name_ko: "ATO", name_en: "Australian Taxation Office", url: "https://www.ato.gov.au", desc_ko: "ABN 등록, 세금 신고", desc_en: "ABN registration, tax filing" },
      { name_ko: "business.gov.au", name_en: "business.gov.au", url: "https://business.gov.au", desc_ko: "창업 가이드, 보조금", desc_en: "Startup guide, grants" },
    ],
    registrationSteps: [
      { step: 1, title_ko: "ABN 등록", title_en: "Register ABN", desc_ko: "Australian Business Register에서 즉시 발급", desc_en: "Obtain instantly from Australian Business Register", duration_ko: "즉시", duration_en: "Instant", cost_ko: "무료", cost_en: "Free" },
      { step: 2, title_ko: "사업명 등록 (해당 시)", title_en: "Register business name (if applicable)", desc_ko: "ASIC에서 사업명 등록 (개인 이름 외 사용 시)", desc_en: "Register with ASIC if using name other than personal", duration_ko: "1~3일", duration_en: "1-3 days", cost_ko: "A$39/년", cost_en: "A$39/yr" },
      { step: 3, title_ko: "법인 등록 (Pty Ltd)", title_en: "Register company (Pty Ltd)", desc_ko: "ASIC에서 ACN 발급 및 법인 등록", desc_en: "Obtain ACN and incorporate at ASIC", duration_ko: "1~3일", duration_en: "1-3 days", cost_ko: "A$538", cost_en: "A$538" },
      { step: 4, title_ko: "GST 등록 (해당 시)", title_en: "Register for GST (if applicable)", desc_ko: "연 매출 A$75,000 초과 시 ATO에 GST 등록", desc_en: "Register with ATO if revenue >A$75,000", duration_ko: "1일", duration_en: "1 day" },
      { step: 5, title_ko: "비즈니스 은행 계좌", title_en: "Open business bank account", desc_ko: "ANZ, CommBank, NAB 등에서 계좌 개설", desc_en: "Open account at ANZ, CommBank, NAB, etc.", duration_ko: "1~5일", duration_en: "1-5 days" },
    ],
    supportPrograms: [
      { name_ko: "New Enterprise Incentive Scheme", name_en: "NEIS (New Enterprise Incentive Scheme)", desc_ko: "구직자 대상 창업 교육 + 수당 지급", desc_en: "Startup training + income support for job seekers", amount_ko: "최대 39주 수당", amount_en: "Up to 39 weeks allowance" },
      { name_ko: "R&D Tax Incentive", name_en: "R&D Tax Incentive", desc_ko: "R&D 비용 세액 공제 (43.5%)", desc_en: "R&D expenditure tax offset (43.5%)", amount_ko: "R&D 비용의 43.5%", amount_en: "43.5% of R&D costs" },
      { name_ko: "Export Market Development Grant", name_en: "EMDG (Export Market Development Grant)", desc_ko: "해외 시장 진출 마케팅 비용 보조", desc_en: "Reimbursement for export marketing costs", amount_ko: "최대 A$150,000", amount_en: "Up to A$150,000" },
    ],
    tips_ko: [
      "ABN(사업자번호)은 온라인으로 즉시 무료 발급 가능합니다",
      "GST는 연 매출 A$75,000 이상부터 등록 의무이며, 세율은 10%입니다",
      "직원 고용 시 Superannuation(퇴직연금, 현재 11.5%)을 반드시 납부해야 합니다",
      "호주는 BAS(Business Activity Statement)를 분기별로 제출해야 합니다",
    ],
    tips_en: [
      "ABN can be obtained online instantly for free",
      "GST registration required above A$75,000 annual revenue, rate is 10%",
      "Employers must pay Superannuation (currently 11.5%) for all employees",
      "BAS (Business Activity Statement) must be lodged quarterly",
    ],
    warningForForeigners_ko: "외국인은 유효한 비자(서브클래스 188/132 등 비즈니스 비자)가 필요합니다. 임시 비자 소지자도 ABN 취득은 가능하나, 비자 조건에 따라 사업 활동이 제한될 수 있습니다.",
    warningForForeigners_en: "Foreigners need a valid visa (Subclass 188/132 business visa). Temporary visa holders can get an ABN, but business activities may be restricted by visa conditions.",
    aiPromptContext: `호주 창업 전문가로서 답변해. Sole Trader/Pty Ltd/Partnership 구분, ABN/ACN 등록, BAS(Business Activity Statement), GST(10%), 법인세(25%), Superannuation(퇴직연금)을 안내해. 비용은 호주 달러(A$)로 표시.`,
    loadingTips_ko: ["💡 호주 ABN(사업자번호)은 온라인으로 즉시 발급 가능해요", "💡 GST는 연 매출 A$75,000 이상부터 등록 필요해요", "💡 호주 Pty Ltd는 법인세 25%로 비교적 낮아요"],
    loadingTips_en: ["💡 Australian ABN can be obtained online instantly", "💡 GST registration required over A$75,000 annual revenue", "💡 Australian Pty Ltd has relatively low 25% corporate tax"],
  },

  // ─── 캐나다 (CA) ───
  CA: {
    code: "CA",
    businessStructures: [
      {
        id: "sole_prop", name_ko: "개인사업자", name_en: "Sole Proprietorship",
        liability_ko: "무한책임", liability_en: "Unlimited liability",
        setup_cost_ko: "C$60~200 (주별 상이)", setup_cost_en: "C$60-200 (varies by province)",
        setup_time_ko: "즉시~1주", setup_time_en: "Instant-1 week",
        pros_ko: "설립 간단, 저비용", pros_en: "Simple setup, low cost",
        cons_ko: "무한책임", cons_en: "Unlimited liability",
        recommend_ko: "프리랜서, 소규모 사업", recommend_en: "Freelancers, small businesses",
      },
      {
        id: "corporation", name_ko: "법인", name_en: "Corporation",
        liability_ko: "유한책임", liability_en: "Limited liability",
        setup_cost_ko: "C$200~500 (연방/주별 상이)", setup_cost_en: "C$200-500 (federal/provincial)",
        setup_time_ko: "1~5일", setup_time_en: "1-5 days",
        pros_ko: "유한책임, 소규모 사업 공제(SBD)", pros_en: "Limited liability, SBD tax deduction",
        cons_ko: "이중과세 가능, 연간 보고", cons_en: "Possible double taxation, annual reports",
        recommend_ko: "성장 계획이 있는 사업", recommend_en: "Businesses with growth plans",
      },
      {
        id: "partnership", name_ko: "파트너십", name_en: "Partnership",
        liability_ko: "무한책임 (일반) / 유한책임 (LP)", liability_en: "Unlimited (general) / Limited (LP)",
        setup_cost_ko: "C$60~200", setup_cost_en: "C$60-200",
        setup_time_ko: "즉시~1주", setup_time_en: "Instant-1 week",
        pros_ko: "유연한 구조", pros_en: "Flexible structure",
        cons_ko: "공동 책임", cons_en: "Joint liability",
        recommend_ko: "공동 창업", recommend_en: "Co-founding businesses",
      },
    ],
    businessCategories: [
      { id: "ecommerce", label_ko: "이커머스", label_en: "E-commerce", icon: "🛒", desc_ko: "온라인 판매, Shopify", desc_en: "Online sales, Shopify" },
      { id: "food", label_ko: "요식업", label_en: "Food Service", icon: "☕", desc_ko: "레스토랑, 카페", desc_en: "Restaurant, cafe" },
      { id: "tech", label_ko: "IT서비스", label_en: "IT Service", icon: "💻", desc_ko: "소프트웨어, AI", desc_en: "Software, AI" },
      { id: "trading", label_ko: "무역", label_en: "Trading", icon: "📦", desc_ko: "수출입", desc_en: "Import/export" },
      { id: "consulting", label_ko: "컨설팅", label_en: "Consulting", icon: "🎨", desc_ko: "전문 서비스", desc_en: "Professional services" },
      { id: "real-estate", label_ko: "부동산", label_en: "Real Estate", icon: "🏠", desc_ko: "부동산 투자, 관리", desc_en: "Property investment" },
      { id: "education", label_ko: "교육", label_en: "Education", icon: "📚", desc_ko: "교육, 코칭", desc_en: "Education, coaching" },
      { id: "other", label_ko: "기타", label_en: "Other", icon: "📌", desc_ko: "기타", desc_en: "Other" },
    ],
    locationTypes: [
      { id: "home", name_ko: "자택", name_en: "Home", icon: "🏠", cost_ko: "무료", cost_en: "Free", caution_ko: "시 조례(zoning) 확인", caution_en: "Check municipal zoning", suitable_ko: "온라인, 프리랜서", suitable_en: "Online, freelancers" },
      { id: "virtual", name_ko: "가상 오피스", name_en: "Virtual Office", icon: "📮", cost_ko: "C$50~300/월", cost_en: "C$50-300/mo", caution_ko: "법인등록 가능 주소 확인", caution_en: "Verify registrable address", suitable_ko: "비용 절감", suitable_en: "Cost savings" },
      { id: "office", name_ko: "사무실/점포", name_en: "Office/Store", icon: "🏢", cost_ko: "도시별 상이", cost_en: "Varies by city", caution_ko: "임대계약 확인", caution_en: "Check lease agreement", suitable_ko: "오프라인 사업", suitable_en: "Offline business" },
    ],
    taxDeadlines: [
      { month_ko: "4월 30일", month_en: "Apr 30", event_ko: "개인소득세 신고", event_en: "Personal income tax return", type: "required" },
      { month_ko: "6월 15일", month_en: "Jun 15", event_ko: "자영업자 소득세 신고", event_en: "Self-employed income tax return", type: "required" },
      { month_ko: "회계연도+6개월", month_en: "FY+6mo", event_ko: "법인세 신고", event_en: "Corporate tax return", type: "required" },
      { month_ko: "분기별", month_en: "Quarterly", event_ko: "GST/HST 신고 (해당 시)", event_en: "GST/HST return (if applicable)", type: "optional" },
    ],
    governmentResources: [
      { name_ko: "CRA (캐나다 국세청)", name_en: "Canada Revenue Agency (CRA)", url: "https://www.canada.ca/en/revenue-agency.html", desc_ko: "BN 등록, 세금 신고", desc_en: "BN registration, tax filing" },
      { name_ko: "BDC", name_en: "Business Development Bank of Canada", url: "https://www.bdc.ca", desc_ko: "창업 대출, 멘토링", desc_en: "Startup loans, mentoring" },
      { name_ko: "Corporations Canada", name_en: "Corporations Canada", url: "https://www.ic.gc.ca/eic/site/cd-dgc.nsf/eng/home", desc_ko: "연방 법인 설립", desc_en: "Federal incorporation" },
    ],
    registrationSteps: [
      { step: 1, title_ko: "사업 형태 결정", title_en: "Choose business structure", desc_ko: "개인사업자/법인/파트너십 중 선택", desc_en: "Choose Sole Proprietorship/Corporation/Partnership", duration_ko: "1일", duration_en: "1 day" },
      { step: 2, title_ko: "사업명 등록", title_en: "Register business name", desc_ko: "주정부에 사업명 등록 (법인명 검색·예약)", desc_en: "Register name with provincial government", duration_ko: "1~5일", duration_en: "1-5 days", cost_ko: "C$60~200", cost_en: "C$60-200" },
      { step: 3, title_ko: "법인 설립 (해당 시)", title_en: "Incorporate (if applicable)", desc_ko: "연방 또는 주정부에 법인 설립 신청", desc_en: "Apply for incorporation federally or provincially", duration_ko: "1~5일", duration_en: "1-5 days", cost_ko: "C$200~500", cost_en: "C$200-500" },
      { step: 4, title_ko: "BN 등록 및 세금 계정", title_en: "Register BN & tax accounts", desc_ko: "CRA에서 Business Number + GST/HST/급여 계정 등록", desc_en: "Register BN + GST/HST/payroll accounts at CRA", duration_ko: "1~5일", duration_en: "1-5 days", cost_ko: "무료", cost_en: "Free" },
      { step: 5, title_ko: "비즈니스 은행 계좌", title_en: "Open business bank account", desc_ko: "RBC, TD, BMO 등에서 법인 계좌 개설", desc_en: "Open account at RBC, TD, BMO, etc.", duration_ko: "1~3일", duration_en: "1-3 days" },
    ],
    supportPrograms: [
      { name_ko: "Canada Small Business Financing", name_en: "CSBFP (Canada Small Business Financing)", desc_ko: "정부 보증 소기업 대출", desc_en: "Government-guaranteed small business loan", amount_ko: "최대 C$1,150,000", amount_en: "Up to C$1,150,000" },
      { name_ko: "SR&ED 세액공제", name_en: "SR&ED Tax Incentive", desc_ko: "R&D 비용의 최대 35% 환급", desc_en: "Up to 35% refund on R&D expenditures", amount_ko: "R&D 비용의 35%", amount_en: "35% of R&D costs" },
      { name_ko: "BDC 창업 대출", name_en: "BDC Startup Loans", desc_ko: "캐나다 사업개발은행 저금리 대출", desc_en: "Low-interest loans from Business Development Bank", amount_ko: "C$100K~", amount_en: "C$100K+", url: "https://www.bdc.ca" },
    ],
    tips_ko: [
      "소규모 법인(CCPC)은 첫 C$500K 소득에 9% 세율이 적용됩니다 (SBD)",
      "GST/HST는 연 매출 C$30,000 이상부터 등록 의무입니다",
      "SR&ED 세액공제로 R&D 비용의 최대 35%까지 환급 가능합니다",
      "온타리오/BC/앨버타 등 주마다 법인세율과 규정이 다릅니다",
    ],
    tips_en: [
      "Canadian-Controlled Private Corp (CCPC) gets 9% tax on first C$500K income (SBD)",
      "GST/HST registration required above C$30,000 annual revenue",
      "SR&ED tax credit refunds up to 35% of R&D costs",
      "Tax rates and regulations vary by province (Ontario/BC/Alberta, etc.)",
    ],
    warningForForeigners_ko: "비거주자도 캐나다에서 법인 설립 가능하나, 연방 법인은 25% 이상의 이사가 캐나다 거주자여야 합니다 (주별 상이). 취업 비자 없이 원격 운영 가능하나, 캐나다 소득에 대해 세금 신고 의무가 있습니다.",
    warningForForeigners_en: "Non-residents can incorporate in Canada, but federal corporations need 25%+ Canadian resident directors (varies by province). Remote operation is possible without a work visa, but Canadian-sourced income must be reported.",
    aiPromptContext: `캐나다 창업 전문가로서 답변해. Sole Proprietorship/Corporation/Partnership 구분, BN(Business Number) 등록, GST/HST, 연방 vs 주 법인 설립, SBD(Small Business Deduction), SR&ED 세액공제를 안내해. 비용은 캐나다 달러(C$)로 표시.`,
    loadingTips_ko: ["💡 캐나다 소규모 법인은 첫 $500K 소득에 9% 세율이에요", "💡 GST/HST는 연 매출 C$30,000 이상부터 등록해요", "💡 SR&ED 세액공제로 R&D 비용의 35%까지 환급 가능해요"],
    loadingTips_en: ["💡 Canadian small business gets 9% tax on first $500K", "💡 GST/HST registration required over C$30,000 revenue", "💡 SR&ED credit refunds up to 35% of R&D costs"],
  },
};

// 데이터가 없는 나라에 대한 기본 fallback
export function getCountryStartupInfo(countryCode: string): CountryStartupInfo | null {
  return countryStartupData[countryCode] ?? null;
}
