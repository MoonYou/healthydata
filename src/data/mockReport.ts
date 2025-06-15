export interface HealthReport {
  overview: string;
  riskFactors: string[];
  suggestions: string[];
  dnaModelData: number[];
}

export const mockReport: HealthReport = {
  overview: "根据您的化验数据综合分析，您的整体健康状况良好，但存在轻度炎症反应和贫血倾向。白细胞计数偏高提示可能存在感染或炎症，血红蛋白略低于正常值。",
  riskFactors: [
    "白细胞计数偏高(11.2 ×10^9/L)",
    "血红蛋白偏低(125 g/L)",
    "血小板计数正常范围内"
  ],
  suggestions: [
    "建议1-2周后复查血常规",
    "增加富含铁的食物摄入",
    "保持充足睡眠，避免过度劳累",
    "如出现发热等症状及时就医"
  ],
  dnaModelData: [0.8, 0.6, 0.7, 0.9, 0.5, 0.8, 0.7, 0.6]
};