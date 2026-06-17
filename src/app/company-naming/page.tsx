"use client";

import { useState } from "react";

const industries = [
  "科技互联网", "文化传媒", "金融投资", "餐饮美食", "教育培训",
  "医疗健康", "房地产", "建筑装饰", "物流运输", "农业生态",
  "服饰时尚", "广告营销", "咨询管理", "新能源", "电子商务",
];

const companyNames = {
  "科技互联网": ["云尚科技", "智联未来", "星辰科技", "凌创科技", "数融科技", "锐智科技", "量子矩阵", "鸿鹄科技", "凌宇科技", "创享互联"],
  "文化传媒": ["墨轩文化", "盛世华章", "云帆传媒", "博雅文化", "天籁之声", "墨韵文化", "清风明月", "鸿文书画", "嘉禾影业", "星辉传媒"],
  "金融投资": ["鼎盛资本", "九鼎投资", "金信投资", "汇通金融", "瑞丰资本", "智信金融", "中融资产", "华信投资", "嘉实财富", "源石资本"],
  "餐饮美食": ["食尚餐饮", "味觉盛宴", "稻香村", "味之道", "满庭芳", "知味观", "一品堂", "国色天香", "味来可期", "舌尖味道"],
  "教育培训": ["明德教育", "知行教育", "博闻教育", "启迪未来", "桃李春风", "思辨教育", "瀚文学堂", "鹏程教育", "立德树人", "书香教育"],
  "医疗健康": ["仁心医疗", "康健人生", "济世堂", "华医健康", "颐和康养", "百草堂", "善医堂", "同康医疗", "瑞康医疗", "福寿康"],
  "房地产": ["安居置业", "广厦地产", "瑞景地产", "恒基置业", "万达置业", "佳兆地产", "盛世家园", "万景地产", "金碧辉煌", "宜居房产"],
  "建筑装饰": ["匠心装饰", "鲁班装饰", "雅筑装饰", "精工装饰", "巧匠装饰", "华庭装饰", "瑞丽装饰", "筑梦空间", "经典装饰", "美居装饰"],
  "物流运输": ["顺达物流", "万里物流", "迅捷物流", "畅通物流", "天下物流", "平安物流", "快捷物流", "四方物流", "联动物流", "极速达"],
  "农业生态": ["绿源农业", "田园生态", "青山绿水", "丰年农业", "绿野仙踪", "自然源", "生态家园", "硕果农业", "沃土农业", "春华秋实"],
  "服饰时尚": ["风尚服饰", "霓裳羽衣", "锦绣华服", "潮牌前线", "丽人服饰", "雅致时尚", "云裳衣阁", "明丽服饰", "风尚达人", "倾城服饰"],
  "广告营销": ["创意无限", "锐意广告", "品效合一", "翰墨广告", "点睛之笔", "灵犀广告", "博雅营销", "新意广告", "飞扬传媒", "智创广告"],
  "咨询管理": ["睿智咨询", "领军管理", "智晟咨询", "天行管理", "明略咨询", "致远管理", "智诚咨询", "和君咨询", "启航管理", "韬略智库"],
  "新能源": ["绿能未来", "阳光能源", "清源科技", "零碳能源", "新能之光", "蔚蓝能源", "正泰新能源", "华能科技", "绿色动力", "天源能源"],
  "电子商务": ["易购电商", "云商天下", "悦购网", "商联电商", "易达电商", "品购优选", "好物优选", "一点电商", "悦享商城", "易选电商"],
};

export default function CompanyNamingPage() {
  const [industry, setIndustry] = useState("");
  const [founder, setFounder] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    if (!industry) return;
    const pool = companyNames[industry as keyof typeof companyNames] || [];
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
    setResults(shuffled);
    setGenerated(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center mb-10 animate-float-up">
        <div className="hero-icon mx-auto mb-4" style={{ width: 64, height: 64 }}>
          <span className="text-4xl">🏢</span>
        </div>
        <h1 className="text-4xl font-display gold-text tracking-widest mb-2" style={{ textShadow: "0 0 30px rgba(201,160,94,0.3)" }}>
          公司起名
        </h1>
        <p style={{ color: "rgba(212, 196, 160, 0.5)" }}>名不正则言不顺，好名字成就大事业</p>
        <div className="divider-gold mx-auto mt-6 w-32" />
      </div>

      {/* 输入区 */}
      <div className="card-featured p-6 animate-float-up" style={{ animationDelay: "0.1s" }}>
        <div className="space-y-5">
          {/* 行业 */}
          <div>
            <label className="block text-sm text-gold font-display mb-2">所属行业</label>
            <div className="flex gap-2 flex-wrap">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setIndustry(ind)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    industry === ind ? "ring-2 ring-gold/40" : "opacity-50 hover:opacity-80"
                  }`}
                  style={{
                    border: `1px solid ${industry === ind ? "rgba(201,160,94,0.4)" : "rgba(201,160,94,0.1)"}`,
                    background: industry === ind ? "rgba(201,160,94,0.12)" : "transparent",
                    color: industry === ind ? "#c9a05e" : "rgba(212,196,160,0.5)",
                  }}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* 法人姓名（可选） */}
          <div>
            <label className="block text-sm text-gold font-display mb-2">法人姓名（可选，用于八字结合）</label>
            <input
              type="text"
              value={founder}
              onChange={(e) => setFounder(e.target.value)}
              placeholder="输入企业主姓名"
              className="w-full rounded-xl px-4 py-2 text-sm"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(201,160,94,0.1)",
                color: "#d4c4a0",
              }}
            />
          </div>

          <button
            onClick={generate}
            disabled={!industry}
            className="w-full py-3 rounded-xl text-sm transition-all"
            style={{
              background: industry ? "rgba(201,160,94,0.12)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${industry ? "rgba(201,160,94,0.3)" : "rgba(201,160,94,0.05)"}`,
              color: industry ? "#c9a05e" : "rgba(212,196,160,0.2)",
            }}
          >
            🏢 生成公司名称
          </button>
        </div>
      </div>

      {/* 结果展示 */}
      {generated && (
        <div className="mt-6 space-y-4 animate-float-up" style={{ animationDelay: "0.2s" }}>
          <div className="card-glass p-5">
            <p className="text-xs text-gold font-display mb-4">🏆 推荐名称 · {industry}行业</p>
            <div className="space-y-3">
              {results.map((name, i) => (
                <div
                  key={name}
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{
                    border: "1px solid rgba(201,160,94,0.08)",
                    background: "rgba(201,160,94,0.03)",
                  }}
                >
                  <div>
                    <p className="text-lg font-display gold-text">{name}</p>
                    <p className="text-xs mt-1" style={{ color: "rgba(212,196,160,0.4)" }}>
                      {industry} · 推荐指数 {5 - i}/5
                    </p>
                  </div>
                  <button
                    className="px-3 py-1 rounded-lg text-xs"
                    style={{
                      border: "1px solid rgba(201,160,94,0.2)",
                      color: "rgba(201,160,94,0.6)",
                    }}
                    onClick={() => navigator.clipboard.writeText(name)}
                  >
                    📋 复制
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            className="w-full py-3 rounded-xl text-sm"
            style={{
              border: "1px dashed rgba(201,160,94,0.2)",
              color: "rgba(212,196,160,0.4)",
            }}
          >
            🔄 换一批推荐
          </button>

          <div className="p-4 rounded-xl text-center" style={{ border: "1px dashed rgba(201,160,94,0.1)", background: "rgba(201,160,94,0.02)" }}>
            <p className="text-xs" style={{ color: "rgba(212,196,160,0.4)" }}>
              💡 AI 结合法人八字、行业五行深度命名方案（即将上线 ¥99.9）
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
