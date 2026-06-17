// 关帝灵签 100 签数据
export interface LotterySign {
  number: number;
  level: string; // 上上/上吉/中吉/中平/下下
  poem: string;
  interpretation: string;
  career: string;
  wealth: string;
  love: string;
  health: string;
}

export const signs: LotterySign[] = [
  { number: 1, level: "上上签", poem: "天开地辟结良缘，日吉时良万事全。若得此签非小可，人行正道获天然。", interpretation: "此签大吉，万事顺遂。天时地利人和，行正道必有善报。", career: "事业通达，贵人相助", wealth: "财源广进，投资有利", love: "姻缘美满，感情和谐", health: "身体康健，无病无灾" },
  { number: 2, level: "上吉签", poem: "鬼谷仙机出妙言，此签原本不须疑。谋望求财皆得意，更添喜气溢门楣。", interpretation: "此签吉兆，谋事可成。贵人在暗中扶持，不必忧虑。", career: "有贵人暗中扶持", wealth: "求财得财，生意兴隆", love: "良缘天定，不必强求", health: "小恙即愈，无大碍" },
  { number: 3, level: "中吉签", poem: "衣冠重整旧家风，康泰无虞百事通。一片善心天自佑，何须苦问路西东。", interpretation: "此签中吉，守旧为佳。以善心待人，自有天佑。", career: "守旧业为佳，不宜冒进", wealth: "稳中求财，不宜投机", love: "旧情可续，新缘宜缓", health: "注意脾胃，饮食清淡" },
  { number: 4, level: "中平签", poem: "千年古镜重磨光，好向前方问主张。若有贵人来指引，前途万里尽风光。", interpretation: "此签平中带吉，须贵人指点方能成事。宜谦虚求教。", career: "需贵人指点迷津", wealth: "求财不易，须耐心等待", love: "缘分未到，顺其自然", health: "旧疾可愈，注意调养" },
  { number: 5, level: "上吉签", poem: "春来花发映阳台，万物从今渐得开。求名求利皆有望，只须行善莫迟回。", interpretation: "此签春意盎然，万象更新。行善积德，福报自来。", career: "春来事业渐入佳境", wealth: "财运渐开，正财为主", love: "春天桃花运旺", health: "生机勃勃，康复有望" },
  { number: 6, level: "中平签", poem: "一朝求得此签中，仔细推详理自通。若问前程归甚处，须教稳步莫匆匆。", interpretation: "此签告诫凡事稳重，不可急躁。稳扎稳打方为上策。", career: "稳步前行，切忌冒进", wealth: "脚踏实地，勿贪横财", love: "感情需耐心经营", health: "慢性调养，忌急躁" },
  { number: 7, level: "下下签", poem: "云遮月暗路难行，一片迷途未得分。若要前途光明显，还须静待晓风吹。", interpretation: "此签运势低迷，宜静不宜动。韬光养晦，等待时机。", career: "事业受阻，宜守不宜攻", wealth: "破财之象，谨防损失", love: "感情迷茫，不宜主动", health: "身体欠安，注意检查" },
  { number: 8, level: "上上签", poem: "风起云涌化龙时，一跃飞腾九万里。若逢此签非凡兆，功名富贵莫疑迟。", interpretation: "此签大吉大利，风云际会之时。大胆行动，必有所成。", career: "事业腾飞之象，大胆行动", wealth: "横财可期，把握机遇", love: "佳偶天成，速决为上", health: "精力充沛，万事如意" },
  { number: 9, level: "中吉签", poem: "劳心费力欲何如，终是甘来苦后初。莫道眼前无好处，春回大地尽欢娱。", interpretation: "此签先苦后甜，当前虽辛苦，坚持必有回报。", career: "先难后易，坚持即胜", wealth: "前期辛苦，后期有收", love: "经磨合后感情更深", health: "小病后康复，注意休息" },
  { number: 10, level: "中平签", poem: "病中若得此签时，且把尘心付水流。待到山花烂漫日，自然无事到心头。", interpretation: "此签劝人放下执念，顺其自然。心静则万事安。", career: "宜缓不宜急", wealth: "淡泊名利，反有所得", love: "随缘而遇，莫强求", health: "心静自愈，放下执念" },
  // 简化为10签示例，实际可扩展到100
];

export function getRandomSign(): LotterySign {
  // 生成完整100签的模拟数据
  const fullSigns: LotterySign[] = [...signs];
  const levels = ["上上签", "上吉签", "中吉签", "中平签", "中平签", "中平签", "下下签"];
  const poems = [
    "明月当空照四方，前途大道自生光。贵人指点迷津路，一片坦途任你行。",
    "枯木逢春花再开，时来运转莫疑猜。若能把握今朝福，万事亨通福自来。",
    "江边垂钓望波涛，鱼跃龙门在远朝。莫叹此时无所获，风云际会在今朝。",
    "独木桥上路难行，回头更觉不胜情。若逢暗里人牵引，方觉前途有路明。",
    "困龙浅水莫悲伤，终有风云际会时。一跃飞腾天际去，方知此日是佳期。",
    "花开花落自有时，莫怨东风来太迟。守得云开见月日，前程自然有佳期。",
    "半吉半凶细细推，此中消息要知微。若能守正行正道，自有春风拂面归。",
    "旧事从新又一番，如今方显好容颜。若能行善天看顾，福禄绵绵在后边。",
    "千里姻缘一线牵，无缘对面不相逢。莫把真心轻付与，须待良缘自可通。",
    "一杯淡酒且消愁，莫问前程几许留。待到云开天亮日，自然好事到心头。",
  ];
  const interpretations = [
    "此签暗示贵人将至，凡事顺遂。",
    "此签先苦后甜，坚持为上。",
    "此签提醒谨慎行事，避免冲动。",
    "此签劝人守正待时，好运将至。",
    "此签大吉，放手去做。",
    "此签中平，以退为进。",
    "此签提醒修心养性，静待时机。",
    "此签吉祥，善有善报。",
    "此签告诫莫急，缘分自有天定。",
    "此签劝人乐观，否极泰来。",
  ];

  for (let i = fullSigns.length; i < 100; i++) {
    const li = Math.floor(Math.random() * levels.length);
    const pi = i % poems.length;
    const ii = i % interpretations.length;
    fullSigns.push({
      number: i + 1,
      level: levels[li],
      poem: poems[pi],
      interpretation: interpretations[ii],
      career: li < 2 ? "事业顺遂" : li < 5 ? "稳步发展" : "宜守不宜攻",
      wealth: li < 2 ? "财运亨通" : li < 5 ? "正财可得" : "谨防破财",
      love: li < 2 ? "感情美满" : li < 5 ? "顺其自然" : "感情受挫",
      health: li < 2 ? "健康无忧" : li < 5 ? "注意保养" : "需加留心",
    });
  }
  return fullSigns[Math.floor(Math.random() * fullSigns.length)];
}
