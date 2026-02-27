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

export interface CountryStartupInfo {
  code: string;
  businessStructures: BusinessStructure[];
  businessCategories: CountryBusinessCategory[];
  locationTypes: LocationType[];
  taxDeadlines: TaxDeadline[];
  governmentResources: GovernmentResource[];
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
    aiPromptContext: `중국 창업 전문가(15년 현지 경험)로서 답변해. 营业执照 발급, 外商独资企业(WFOE), 增值税, 企业所得税, 社保, 公积金을 정확히 안내해. 비용은 위안(¥/CNY)으로 표시. 외국인의 경우 WFOE 절차와 상해/심천/광주 등 주요 도시별 차이점 포함.`,
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
    aiPromptContext: `캐나다 창업 전문가로서 답변해. Sole Proprietorship/Corporation/Partnership 구분, BN(Business Number) 등록, GST/HST, 연방 vs 주 법인 설립, SBD(Small Business Deduction), SR&ED 세액공제를 안내해. 비용은 캐나다 달러(C$)로 표시.`,
    loadingTips_ko: ["💡 캐나다 소규모 법인은 첫 $500K 소득에 9% 세율이에요", "💡 GST/HST는 연 매출 C$30,000 이상부터 등록해요", "💡 SR&ED 세액공제로 R&D 비용의 35%까지 환급 가능해요"],
    loadingTips_en: ["💡 Canadian small business gets 9% tax on first $500K", "💡 GST/HST registration required over C$30,000 revenue", "💡 SR&ED credit refunds up to 35% of R&D costs"],
  },
};

// 데이터가 없는 나라에 대한 기본 fallback
export function getCountryStartupInfo(countryCode: string): CountryStartupInfo | null {
  return countryStartupData[countryCode] ?? null;
}
