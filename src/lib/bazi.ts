// 八字排盘核心算法

const stems = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const branches = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const wuxingNames = ['木','火','土','金','水'];
const shishen = ['比肩','劫财','食神','伤官','偏财','正财','七杀','正官','偏印','正印'];

function stemWuxing(s: number): number {
  return [0, 0, 1, 1, 2, 2, 3, 3, 4, 4][s]; // 甲乙木 丙丁火...
}

function branchWuxing(b: number): number {
  return [4, 2, 0, 0, 2, 1, 1, 2, 3, 3, 2, 4][b]; // 子水 丑土...
}

// 日主五行关系
function getRelation(dayStem: number, otherStem: number): string {
  const dayWx = stemWuxing(dayStem);
  const otherWx = stemWuxing(otherStem);
  // 五行生克关系
  const relationMap: Record<string, string> = {
    '00': '比肩', '01': '劫财', // 同行
    '02': '食神', '03': '伤官', // 我生
    '04': '偏财', '05': '正财', // 我克
    '06': '七杀', '07': '正官', // 克我
    '08': '偏印', '09': '正印', // 生我
  };
  if (dayWx === otherWx) return dayStem === otherStem ? '比肩' : '劫财';
  // 简化版
  const sheng = (dayWx + 1) % 5; // 我生
  const ke = (dayWx + 2) % 5; // 我克
  const shengWo = (dayWx + 4) % 5; // 生我
  const keWo = (dayWx + 3) % 5; // 克我
  if (otherWx === sheng) return dayStem % 2 === otherStem % 2 ? '食神' : '伤官';
  if (otherWx === ke) return dayStem % 2 === otherStem % 2 ? '偏财' : '正财';
  if (otherWx === keWo) return dayStem % 2 === otherStem % 2 ? '七杀' : '正官';
  if (otherWx === shengWo) return dayStem % 2 === otherStem % 2 ? '偏印' : '正印';
  return '比肩';
}

export interface BaziResult {
  year: { gan: string; zhi: string; ganZhi: string; wuxing: string; };
  month: { gan: string; zhi: string; ganZhi: string; wuxing: string; };
  day: { gan: string; zhi: string; ganZhi: string; wuxing: string; dayMaster: string; };
  hour: { gan: string; zhi: string; ganZhi: string; wuxing: string; };
  wuxingCount: Record<string, number>;
  lacking: string;
  dayMaster: string;
  dayMasterWuxing: string;
}

export function getBazi(
  year: number,
  month: number,
  day: number,
  hour: number
): BaziResult {
  // 年干支
  const yGan = (year - 4) % 10;
  const yZhi = (year - 4) % 12;

  // 月干支（以节气为准，简化版）
  const mGan = ((year % 5 - 1) * 2 + month) % 10;
  const mZhi = (month + 1) % 12;

  // 日干支
  const jd = Math.floor(Date.UTC(year, month - 1, day) / 86400000) + 2440588;
  const dGan = (jd + 9) % 10;
  const dZhi = (jd + 1) % 12;

  // 时干支
  const hZhi = Math.floor((hour + 1) / 2) % 12;
  const hGan = (dGan % 5 * 2 + hZhi) % 10;

  // 日主
  const dayMaster = stems[dGan];
  const dayMasterWx = wuxingNames[stemWuxing(dGan)];

  // 五行统计
  const wxCount: Record<string, number> = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };
  [yGan, mGan, dGan, hGan].forEach(s => wxCount[wuxingNames[stemWuxing(s)]]++);
  [yZhi, mZhi, dZhi, hZhi].forEach(b => wxCount[wuxingNames[branchWuxing(b)]]++);

  const lacking = Object.entries(wxCount)
    .filter(([, v]) => v === 0)
    .map(([k]) => k)
    .join('、') || '五行俱全';

  return {
    year: { gan: stems[yGan], zhi: branches[yZhi], ganZhi: stems[yGan] + branches[yZhi], wuxing: wuxingNames[stemWuxing(yGan)] + wuxingNames[branchWuxing(yZhi)] },
    month: { gan: stems[mGan], zhi: branches[mZhi], ganZhi: stems[mGan] + branches[mZhi], wuxing: wuxingNames[stemWuxing(mGan)] + wuxingNames[branchWuxing(mZhi)] },
    day: { gan: stems[dGan], zhi: branches[dZhi], ganZhi: stems[dGan] + branches[dZhi], wuxing: wuxingNames[stemWuxing(dGan)] + wuxingNames[branchWuxing(dZhi)], dayMaster: stems[dGan] },
    hour: { gan: stems[hGan], zhi: branches[hZhi], ganZhi: stems[hGan] + branches[hZhi], wuxing: wuxingNames[stemWuxing(hGan)] + wuxingNames[branchWuxing(hZhi)] },
    wuxingCount: wxCount,
    lacking,
    dayMaster,
    dayMasterWuxing: dayMasterWx,
  };
}

// DeepSeek AI 解读 prompt
export function buildBaziPrompt(result: BaziResult, gender: string, question: string): string {
  return `你是一位精通命理学的师父，擅长以《渊海子平》《滴天髓》《子平真诠》等经典为据解读八字。

请根据以下八字信息进行详细解读：

【命主信息】
- 日主：${result.dayMaster}${result.dayMasterWuxing}
- 四柱：${result.year.ganZhi}年 ${result.month.ganZhi}月 ${result.day.ganZhi}日 ${result.hour.ganZhi}时
- 五行分布：木${result.wuxingCount['木']} 火${result.wuxingCount['火']} 土${result.wuxingCount['土']} 金${result.wuxingCount['金']} 水${result.wuxingCount['水']}
- 五行所缺：${result.lacking}
- 性别：${gender}
- 求问：${question || '综合运势'}

请从以下方面解读：
1. 命格分析：日主强弱、格局类型
2. 事业运势：适合的行业、发展方向
3. 财运分析：正财偏财、理财建议
4. 感情婚姻：姻缘特征、配偶方向
5. 健康提醒：需注意的方面
6. 流年运势：近期运势走向

要求：
- 引用经典原文（标注出处）
- 语气温和如师，不说恐吓之语
- 强调"命自我立，福自我求"
- 结尾给一句鼓励的话`;
}
