export interface BusinessCode {
  code: string;
  name_ko: string;
  name_en: string;
  desc_ko: string;
  desc_en: string;
}

export interface BusinessCategory {
  id: string;
  label_ko: string;
  label_en: string;
  icon: string;
  codes: BusinessCode[];
}

export const businessCategories: BusinessCategory[] = [
  {
    id: "online-shop",
    label_ko: "온라인쇼핑몰",
    label_en: "Online Shop",
    icon: "🛒",
    codes: [
      { code: "47911", name_ko: "통신판매업", name_en: "Mail order sales", desc_ko: "인터넷 쇼핑몰, 스마트스토어", desc_en: "Internet shopping mall, Smart Store" },
      { code: "47912", name_ko: "전자상거래 소매업", name_en: "E-commerce retail", desc_ko: "자사 쇼핑몰, 쿠팡 입점 등", desc_en: "Own mall, Coupang marketplace, etc." },
      { code: "52991", name_ko: "기타 무점포 소매업", name_en: "Other non-store retail", desc_ko: "SNS 판매, 인스타마켓", desc_en: "SNS sales, Instagram market" },
    ],
  },
  {
    id: "cafe-restaurant",
    label_ko: "카페·음식점",
    label_en: "Cafe & Restaurant",
    icon: "☕",
    codes: [
      { code: "56211", name_ko: "커피전문점", name_en: "Coffee shop", desc_ko: "커피, 차 등 음료 판매", desc_en: "Coffee, tea, and beverage sales" },
      { code: "56219", name_ko: "기타 비알코올 음료점", name_en: "Other non-alcoholic beverage shop", desc_ko: "디저트 카페, 주스바", desc_en: "Dessert cafe, juice bar" },
      { code: "56111", name_ko: "한식 일반 음식점", name_en: "Korean restaurant", desc_ko: "한식 위주의 일반 음식점", desc_en: "General Korean food restaurant" },
    ],
  },
  {
    id: "it-service",
    label_ko: "IT서비스",
    label_en: "IT Service",
    icon: "💻",
    codes: [
      { code: "62010", name_ko: "컴퓨터 프로그래밍 서비스업", name_en: "Computer programming services", desc_ko: "소프트웨어 개발, 앱 개발", desc_en: "Software development, app development" },
      { code: "62021", name_ko: "컴퓨터시스템 통합 자문 및 구축", name_en: "Computer system integration & consulting", desc_ko: "IT 컨설팅, 시스템 구축", desc_en: "IT consulting, system implementation" },
      { code: "63120", name_ko: "인터넷 포털 및 기타 정보 매개", name_en: "Internet portal & information service", desc_ko: "웹 서비스, SaaS", desc_en: "Web service, SaaS" },
    ],
  },
  {
    id: "purchasing-agent",
    label_ko: "구매대행",
    label_en: "Purchasing Agent",
    icon: "📦",
    codes: [
      { code: "47911", name_ko: "통신판매업", name_en: "Mail order sales", desc_ko: "해외 직구 대행, 구매대행", desc_en: "Overseas direct purchase agency" },
      { code: "46900", name_ko: "기타 전문 도매업", name_en: "Other specialized wholesale", desc_ko: "소싱 및 도매 판매", desc_en: "Sourcing and wholesale" },
      { code: "52992", name_ko: "위탁 판매업", name_en: "Consignment sales", desc_ko: "위탁 판매, 드롭쉬핑", desc_en: "Consignment, dropshipping" },
    ],
  },
  {
    id: "freelancer",
    label_ko: "프리랜서",
    label_en: "Freelancer",
    icon: "🎨",
    codes: [
      { code: "73901", name_ko: "디자인업", name_en: "Design services", desc_ko: "그래픽, UI/UX, 제품 디자인", desc_en: "Graphic, UI/UX, product design" },
      { code: "73902", name_ko: "광고 대행업", name_en: "Advertising agency", desc_ko: "마케팅 대행, 콘텐츠 제작", desc_en: "Marketing agency, content creation" },
      { code: "62010", name_ko: "컴퓨터 프로그래밍 서비스업", name_en: "Computer programming services", desc_ko: "프리랜서 개발자", desc_en: "Freelance developer" },
    ],
  },
  {
    id: "education",
    label_ko: "교육",
    label_en: "Education",
    icon: "📚",
    codes: [
      { code: "85501", name_ko: "일반 교습 학원", name_en: "General academy", desc_ko: "학원, 교습소 운영", desc_en: "Academy, tutoring center" },
      { code: "85599", name_ko: "기타 기술 및 직업훈련", name_en: "Other technical & vocational training", desc_ko: "코딩 부트캠프, 직업훈련", desc_en: "Coding bootcamp, vocational training" },
      { code: "63999", name_ko: "그 외 기타 정보 서비스업", name_en: "Other information services", desc_ko: "온라인 강의, e-러닝 플랫폼", desc_en: "Online courses, e-learning platform" },
    ],
  },
  {
    id: "real-estate",
    label_ko: "부동산",
    label_en: "Real Estate",
    icon: "🏠",
    codes: [
      { code: "68221", name_ko: "부동산 관리업", name_en: "Property management", desc_ko: "건물 관리, 시설 관리", desc_en: "Building management, facility management" },
      { code: "68112", name_ko: "부동산 중개 및 대리업", name_en: "Real estate brokerage", desc_ko: "부동산 중개, 임대 대리", desc_en: "Real estate brokerage, rental agency" },
      { code: "68209", name_ko: "기타 부동산 임대업", name_en: "Other real estate rental", desc_ko: "상가, 사무실 임대", desc_en: "Commercial, office rental" },
    ],
  },
  {
    id: "other",
    label_ko: "기타",
    label_en: "Other",
    icon: "📌",
    codes: [
      { code: "47911", name_ko: "통신판매업", name_en: "Mail order sales", desc_ko: "가장 범용적인 업종코드", desc_en: "Most versatile business code" },
      { code: "74900", name_ko: "그 외 기타 전문, 과학 및 기술 서비스업", name_en: "Other professional services", desc_ko: "컨설팅, 전문 서비스", desc_en: "Consulting, professional services" },
      { code: "63999", name_ko: "그 외 기타 정보 서비스업", name_en: "Other information services", desc_ko: "정보 제공, 플랫폼 서비스", desc_en: "Information provision, platform services" },
    ],
  },
];
