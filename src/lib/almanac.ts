// 中国农历/黄历核心算法
// 基于寿星万年历

const heavenlyStems = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const earthlyBranches = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const zodiacAnimals = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];
const wuxingStems = ['木','木','火','火','土','土','金','金','水','水'];
const wuxingBranches = ['水','土','木','木','土','火','火','土','金','金','土','水'];

// 每日宜忌（简化版，基于天干地支组合）
const yiBase: Record<string, string[]> = {
  '甲子': ['祭祀','祈福','求嗣','开光','出行','嫁娶','纳采','修造','动土','安床'],
  '乙丑': ['祭祀','祈福','纳采','开市','交易','立券','纳财','栽种','牧养'],
  '丙寅': ['祭祀','祈福','求嗣','开光','出行','解除','伐木','拆卸','修造','动土'],
  '丁卯': ['祭祀','祈福','求嗣','开光','出行','嫁娶','纳采','修造','动土','安床','开市'],
  '戊辰': ['祭祀','祈福','求嗣','开光','出行','纳采','嫁娶','开市','交易','立券'],
  '己巳': ['祭祀','祈福','求嗣','开光','出行','纳采','嫁娶','修造','动土'],
  '庚午': ['祭祀','祈福','出行','嫁娶','纳采','修造','动土','安床','开市'],
  '辛未': ['祭祀','祈福','纳采','开市','交易','立券','纳财','栽种'],
  '壬申': ['祭祀','祈福','求嗣','开光','出行','解除','拆卸','修造'],
  '癸酉': ['祭祀','祈福','出行','嫁娶','纳采','修造','安床'],
};

const jiBase: Record<string, string[]> = {
  '甲子': ['开仓','出货财','安葬','行丧'],
  '乙丑': ['安葬','行丧','伐木','作梁'],
  '丙寅': ['安葬','行丧','开仓','出货财'],
  '丁卯': ['安葬','行丧','伐木','作梁'],
  '戊辰': ['安葬','行丧','开仓','出货财','动土'],
  '己巳': ['安葬','行丧','开仓','出货财'],
  '庚午': ['安葬','行丧','开仓','出货财'],
  '辛未': ['安葬','行丧','动土','破土'],
  '壬申': ['安葬','行丧','嫁娶','纳采'],
  '癸酉': ['安葬','行丧','动土','破土','开仓'],
};

function getGanZhi(year: number, month: number, day: number) {
  // 年干支
  const yearGan = (year - 4) % 10;
  const yearZhi = (year - 4) % 12;
  
  // 月干支（简化算法）
  const monthGan = ((year % 5 - 1) * 2 + month) % 10;
  const monthZhi = (month + 1) % 12;
  
  // 日干支（基于儒略日数简化）
  const jd = Math.floor(Date.UTC(year, month - 1, day) / 86400000) + 2440588;
  const dayGan = (jd + 9) % 10;
  const dayZhi = (jd + 1) % 12;
  
  return {
    year: { gan: yearGan, zhi: yearZhi },
    month: { gan: monthGan, zhi: monthZhi },
    day: { gan: dayGan, zhi: dayZhi },
  };
}

export function getAlmanac(date: Date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const gz = getGanZhi(y, m, d);
  
  const yearGZ = heavenlyStems[gz.year.gan] + earthlyBranches[gz.year.zhi];
  const monthGZ = heavenlyStems[gz.month.gan] + earthlyBranches[gz.month.zhi];
  const dayGZ = heavenlyStems[gz.day.gan] + earthlyBranches[gz.day.zhi];
  
  const zodiac = zodiacAnimals[gz.year.zhi];
  const wuxing = wuxingStems[gz.day.gan] + wuxingBranches[gz.day.zhi];
  
  // 纳音（简化版）
  const nayinIndex = (gz.day.gan * 12 + gz.day.zhi) % 30;
  const nayinList = [
    '海中金','海中金','炉中火','炉中火','大林木','大林木','路旁土','路旁土',
    '剑锋金','剑锋金','山头火','山头火','涧下水','涧下水','城头土','城头土',
    '白蜡金','白蜡金','杨柳木','杨柳木','泉中水','泉中水','屋上土','屋上土',
    '霹雳火','霹雳火','松柏木','松柏木','长流水','长流水'
  ];
  const nayin = nayinList[nayinIndex] || '海中金';
  
  // 宜忌
  const yi = yiBase[dayGZ] || ['祭祀','祈福','出行'];
  const ji = jiBase[dayGZ] || ['安葬','行丧'];
  
  // 冲煞
  const chongZhi = (gz.day.zhi + 6) % 12;
  const chong = `冲${earthlyBranches[chongZhi]}(${zodiacAnimals[chongZhi]})`;
  const sha = chongZhi % 2 === 0 ? '煞北' : '煞南';
  
  // 时辰
  const hours = earthlyBranches.map((zhi, i) => ({
    zhi,
    time: `${String((i * 2 + 23) % 24).padStart(2, '0')}:00-${String((i * 2 + 1) % 24 || 24).padStart(2, '0')}:00`,
    gan: heavenlyStems[(gz.day.gan % 5 * 2 + i) % 10],
  }));
  
  return {
    date: `${y}年${m}月${d}日`,
    yearGZ, monthGZ, dayGZ,
    zodiac,
    wuxing,
    nayin,
    yi,
    ji,
    chong,
    sha,
    hours,
  };
}
