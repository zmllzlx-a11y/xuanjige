"use client";

import { useState } from "react";

const MERIDIANS = [
  {
    name: "手太阴肺经",
    alias: "肺经",
    element: "金",
    time: "3:00-5:00",
    points: 11,
    color: "#5D8A66",
    description: "肺主气，司呼吸，主宣发肃降，通调水道，朝百脉。主治咳嗽、气喘、咽喉肿痛。",
    points_detail: [
      { name: "中府", location: "胸部，横平第1肋间隙，锁骨下窝外侧", effect: "咳嗽、气喘、胸痛", method: "向外斜刺0.5-0.8寸" },
      { name: "尺泽", location: "肘横纹中，肱二头肌腱桡侧凹陷处", effect: "咳嗽、气喘、咽喉肿痛", method: "直刺0.8-1.2寸" },
      { name: "孔最", location: "前臂前区，腕掌侧远端横纹上7寸", effect: "咳嗽、气喘、咽喉肿痛、痔疮", method: "直刺1-1.5寸" },
      { name: "列缺", location: "腕掌侧远端横纹上1.5寸，拇短伸肌腱与拇长展肌腱之间", effect: "咳嗽、气喘、头痛、颈项强痛", method: "向上斜刺0.3-0.5寸" },
      { name: "太渊", location: "腕掌侧远端横纹桡侧，桡动脉搏动处", effect: "咳嗽、气喘、咽喉肿痛、心悸", method: "避开桡动脉，直刺0.3-0.5寸" },
      { name: "鱼际", location: "手拇指本节后凹陷处，约第1掌骨中点桡侧", effect: "咳嗽、咽喉肿痛、失音、发热", method: "直刺0.5-0.8寸" },
      { name: "少商", location: "拇指末节桡侧，指甲角旁开0.1寸", effect: "咽喉肿痛、发热、昏迷、癫狂", method: "浅刺0.1寸，或点刺出血" },
    ],
  },
  {
    name: "手阳明大肠经",
    alias: "大肠经",
    element: "金",
    time: "5:00-7:00",
    points: 20,
    color: "#8FBC9A",
    description: "大肠传化糟粕，主津液代谢。与肺相表里。主治腹痛、肠鸣、便秘、咽喉肿痛。",
    points_detail: [
      { name: "合谷", location: "手背第1、2掌骨间，第2掌骨桡侧中点", effect: "头痛、牙痛、咽喉肿痛、发热、月经不调", method: "直刺0.5-1寸，孕妇慎用" },
      { name: "曲池", location: "肘横纹外侧端，屈肘时肱骨外上髁与肘横纹中点", effect: "热病、咽喉肿痛、腹痛、吐泻、上肢不遂", method: "直刺1-1.5寸" },
      { name: "肩髃", location: "肩部三角肌上，肩峰外侧缘前端", effect: "肩臂疼痛、上肢不遂、瘰疬", method: "直刺或向下斜刺0.8-1.5寸" },
      { name: "迎香", location: "面部，鼻翼外缘中点旁，鼻唇沟中", effect: "鼻塞、鼻渊、鼻息肉、口歪、面痒", method: "斜刺或平刺0.3-0.5寸" },
    ],
  },
  {
    name: "足阳明胃经",
    alias: "胃经",
    element: "土",
    time: "7:00-9:00",
    points: 45,
    color: "#C9A35A",
    description: "胃主受纳腐熟水谷，为后天之本。与脾相表里。主治胃痛、呕吐、腹胀、便秘。",
    points_detail: [
      { name: "足三里", location: "小腿外侧，犊鼻穴下3寸，胫骨前嵴旁开1横指", effect: "胃痛、呕吐、腹胀、消化不良、虚劳羸瘦", method: "直刺1-2寸，强身保健常用穴" },
      { name: "上巨虚", location: "小腿外侧，犊鼻穴下6寸，胫骨前嵴旁开1横指", effect: "肠鸣、腹痛、腹泻、便秘、肠痈", method: "直刺1-1.5寸" },
      { name: "天枢", location: "腹部，脐中旁开2寸", effect: "腹痛、腹胀、腹泻、便秘、痛经", method: "直刺1-1.5寸" },
      { name: "归来", location: "下腹部，脐中下4寸，前正中线旁开2寸", effect: "腹痛、痛经、闭经、崩漏、疝气", method: "直刺1-1.5寸" },
    ],
  },
  {
    name: "足太阴脾经",
    alias: "脾经",
    element: "土",
    time: "9:00-11:00",
    points: 21,
    color: "#D4956A",
    description: "脾主运化，统血，为气血生化之源。与胃相表里。主治腹胀、便溏、月经过多。",
    points_detail: [
      { name: "三阴交", location: "小腿内侧，内踝尖上3寸，胫骨内侧缘后际", effect: "月经不调、痛经、失眠、脾胃虚弱、湿疹", method: "直刺1-1.5寸，孕妇禁针" },
      { name: "阴陵泉", location: "小腿内侧，胫骨内侧髁下缘与胫骨内侧缘之间的凹陷处", effect: "腹胀、腹泻、水肿、小便不利、遗尿", method: "直刺1-2寸" },
      { name: "血海", location: "股前区，髌底内侧端上2寸，股内侧肌隆起处", effect: "月经不调、痛经、崩漏、湿疹、贫血", method: "直刺1-1.5寸" },
      { name: "太白", location: "足内侧缘，第1跖骨小头后缘，赤白肉际处", effect: "胃痛、腹胀、便秘、体重节痛", method: "直刺0.5-0.8寸" },
    ],
  },
  {
    name: "足少阴肾经",
    alias: "肾经",
    element: "水",
    time: "17:00-19:00",
    points: 27,
    color: "#5A8FAF",
    description: "肾藏精，主生长、发育与生殖，主水液代谢。与膀胱相表里。主治遗精、阳痿、月经不调。",
    points_detail: [
      { name: "涌泉", location: "足底，屈足卷趾时足心最凹陷处", effect: "头痛、头晕、失眠、咽喉肿痛、失音、便秘", method: "直刺0.5-1寸，常用于保健" },
      { name: "太溪", location: "足内侧，内踝尖与跟腱之间的凹陷处", effect: "头痛、眩晕、耳鸣、失眠、月经不调、腰痛", method: "直刺0.5-1寸" },
      { name: "照海", location: "足内侧，内踝尖下1寸，内踝下方凹陷处", effect: "咽喉干痛、月经不调、失眠、小便频数", method: "直刺0.5-0.8寸" },
      { name: "复溜", location: "小腿内侧，内踝尖上2寸，跟腱前缘", effect: "水肿、汗证、腹胀、腰痛、尿路感染", method: "直刺1-1.5寸" },
    ],
  },
  {
    name: "任脉",
    alias: "任脉",
    element: "阴",
    time: "全天",
    points: 24,
    color: "#C07060",
    description: '任脉为"阴脉之海"，主胞胎，与女子妊娠、月经关系密切。主治妇科、泌尿系统疾病。',
    points_detail: [
      { name: "关元", location: "下腹部，脐中下3寸，前正中线上", effect: "遗尿、尿频、阳痿、痛经、月经不调、虚劳羸瘦", method: "直刺1-1.5寸，保健要穴，孕妇慎用" },
      { name: "气海", location: "下腹部，脐中下1.5寸，前正中线上", effect: "腹痛、泄泻、便秘、遗尿、阳痿、痛经", method: "直刺1-1.5寸，保健常用穴" },
      { name: "神阙", location: "脐中央", effect: "腹痛、腹泻、虚脱、脱肛、阳虚证", method: "艾灸为主，隔盐灸、隔姜灸" },
      { name: "中脘", location: "上腹部，脐中上4寸，前正中线上", effect: "胃痛、呕吐、腹胀、吞酸、呃逆、消化不良", method: "直刺1-1.5寸" },
    ],
  },
];

export default function AcupointPage() {
  const [selected, setSelected] = useState<typeof MERIDIANS[0] | null>(MERIDIANS[0]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="text-center mb-8">
        <span className="badge-green mb-3">🌿 经络穴位</span>
        <h1 className="text-3xl md:text-4xl font-display green-text mb-2">经络穴位图</h1>
        <p className="text-sm" style={{ color: "rgba(232,228,218,0.5)" }}>
          循经取穴，疏通经络 · {MERIDIANS.reduce((s, m) => s + m.points, 0)}个常用穴位
        </p>
      </div>

      {/* 经络选择 */}
      <div className="card-glass p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {MERIDIANS.map(m => (
            <button key={m.name} onClick={() => setSelected(m)}
              className="px-3 py-1.5 rounded-full text-xs transition-all"
              style={{
                background: selected?.name === m.name ? `${m.color}22` : "rgba(93,138,102,0.05)",
                border: `1px solid ${selected?.name === m.name ? m.color + "55" : "rgba(93,138,102,0.12)"}`,
                color: selected?.name === m.name ? m.color : "rgba(232,228,218,0.5)",
              }}>
              {m.alias}
            </button>
          ))}
        </div>
      </div>

      {/* 选中经络详情 */}
      {selected && (
        <div className="card-featured p-6 mb-5" style={{ borderColor: `${selected.color}44` }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ background: `${selected.color}22`, border: `1px solid ${selected.color}44` }}>
              🌿
            </div>
            <div>
              <h2 className="text-xl font-display" style={{ color: selected.color }}>{selected.name}</h2>
              <p className="text-xs" style={{ color: "rgba(232,228,218,0.4)" }}>
                {selected.element}行 · {selected.points}穴 · 当令时辰 {selected.time}
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(232,228,218,0.6)" }}>
            {selected.description}
          </p>
          <p className="text-xs" style={{ color: `${selected.color}88` }}>
            💡 {selected.time} 为本经当令时辰，此时敲打或按摩效果更佳
          </p>
        </div>
      )}

      {/* 穴位列表 */}
      {selected && (
        <div className="space-y-4">
          {selected.points_detail.map((point, i) => (
            <div key={point.name} className="card-base p-5"
              style={{ borderLeft: `3px solid ${selected.color}` }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-base font-display" style={{ color: selected.color }}>{point.name}</h3>
                  <p className="text-xs" style={{ color: "rgba(232,228,218,0.35)" }}>
                    #{i + 1}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-3 text-xs mb-3">
                <div>
                  <span className="font-medium" style={{ color: "rgba(232,228,218,0.4)" }}>定位：</span>
                  <span style={{ color: "rgba(232,228,218,0.6)" }}>{point.location}</span>
                </div>
                <div>
                  <span className="font-medium" style={{ color: "rgba(232,228,218,0.4)" }}>主治：</span>
                  <span style={{ color: "rgba(232,228,218,0.6)" }}>{point.effect}</span>
                </div>
                <div>
                  <span className="font-medium" style={{ color: "rgba(232,228,218,0.4)" }}>刺法：</span>
                  <span style={{ color: "rgba(232,228,218,0.6)" }}>{point.method}</span>
                </div>
              </div>
              <a href="/ask"
                className="text-xs transition-colors"
                style={{ color: `${selected.color}88` }}>
                🤖 咨询此穴位的更多用法 →
              </a>
            </div>
          ))}
        </div>
      )}

      {/* 养生提示 */}
      <div className="card-glass p-6 mt-8 text-center">
        <p className="text-sm mb-2" style={{ color: "rgba(232,228,218,0.5)" }}>
          💡 日常养生建议
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(232,228,218,0.4)" }}>
          每条经络有其当令时辰（见上），此时敲打或按摩该经络易见效。
          足三里、涌泉、神阙、关元为四大保健要穴，适合日常按摩养生。
          如需针刺治疗，请咨询专业中医师。
        </p>
      </div>
    </div>
  );
}
