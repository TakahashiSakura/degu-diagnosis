const questions = [
  { text: "よく走る", types: ["エネルギッシュ","安定"] },
  { text: "寝るのが大好きだ", types: ["安定","エネルギッシュ"] },
  { text: "脱走しがち", types: ["エネルギッシュ","安定"] },
  { text: "優しい甘噛みをする", types: ["安定","エネルギッシュ"] },
  { text: "落ち着きや貫禄がある", types: ["安定","エネルギッシュ"] },

  { text: "新しいものはとにかく齧る", types: ["好奇心","堅実"] },
  { text: "知らない人を警戒する", types: ["堅実","好奇心"] },
  { text: "新しいエサをあげても、最初はあまり食べない", types: ["堅実","好奇心"] },
  { text: "インターホンなどの物音に驚く", types: ["堅実","好奇心"] },
  { text: "ケージを噛む", types: ["好奇心","堅実"] },

  { text: "ご機嫌なときよく歌う", types: ["感情豊か","クール"] },
  { text: "呼び鳴きをする", types: ["感情豊か","クール"] },
  { text: "何を考えているかわからないときがある", types: ["クール","感情豊か"] },
  { text: "起動哀楽がはっきりしてる", types: ["感情豊か","クール"] },
  { text: "名前を読んでも無視する", types: ["クール","感情豊か"] },


  { text: "飼い主や同居のデグーとはなれ、一匹でいることがおおい", types: ["自立","甘えん坊"] },
  { text: "飼い主や同居のデグーとよく喧嘩している", types: ["自立","甘えん坊"] },
  { text: "飼い主の体の上で寝る", types: ["甘えん坊","自立"] },
  { text: "知らない人からなでなでされても嬉しそうである", types: ["甘えん坊","自立"] },
  { text: "部屋んぽや飼い主との触れ合いが大好き", types: ["甘えん坊","自立"] }
];

const results = [
  {type:["エネルギッシュ","好奇心","感情豊か","甘えん坊"], text:"元気いっぱいで甘え上手！愛され体質のデグーちゃん"},
  {type:["エネルギッシュ","好奇心","感情豊か","自立"], text:"ワクワクを止められない！自分の道を進む自由人なデグーちゃん"},
  {type:["エネルギッシュ","好奇心","クール","甘えん坊"], text:"クールだけど実は甘えん坊！ギャップが魅力のデグーちゃん"},
  {type:["エネルギッシュ","好奇心","クール","自立"], text:"誰にも縛られない！静かに燃え続けるデグーちゃん"},

  {type:["エネルギッシュ","堅実","感情豊か","甘えん坊"], text:"しっかり者だけど寂しがり屋！長男長女タイプのデグーちゃん"},
  {type:["エネルギッシュ","堅実","感情豊か","自立"], text:"情熱と安定をあわせ持つ！バランス型リーダーのデグーちゃん"},
  {type:["エネルギッシュ","堅実","クール","甘えん坊"], text:"かっこよさと甘えのバランス！ツンデレ気質のデグーちゃん"},
  {type:["エネルギッシュ","堅実","クール","自立"], text:"無駄なく突き進む！経営者体質のデグーちゃん"},

  {type:["安定","好奇心","感情豊か","甘えん坊"], text:"優しさで包み込む！みんなのお母さんタイプのデグーちゃん"},
  {type:["安定","好奇心","感情豊か","自立"], text:"軸はぶらさず挑戦する！芯のある計画家タイプのデグーちゃん"},
  {type:["安定","好奇心","クール","甘えん坊"], text:"クールなのにどこか温かい！不思議な魅力のデグーちゃん"},
  {type:["安定","好奇心","クール","自立"], text:"自分の世界を大切にする！マイペースなデグーちゃん"},

  {type:["安定","堅実","感情豊か","甘えん坊"], text:"安心感抜群！みんなを癒すデグーちゃん"},
  {type:["安定","堅実","感情豊か","自立"], text:"落ち着きと優しさを兼ね備えた！信頼されるデグーちゃん"},
  {type:["安定","堅実","クール","甘えん坊"], text:"距離感が絶妙！さりげなく甘える大人なデグーちゃん"},
  {type:["安定","堅実","クール","自立"], text:"自分の道を極める！究極の職人気質なデグーちゃん"}
];

let score = { エネルギッシュ:0,安定:0,好奇心:0,堅実:0,感情豊か:0,クール:0,甘えん坊:0,自立:0};

// 左→右
const values = [2,1,0,-1,-2];

function addQuestion(index) {
  const q = questions[index];

  const card = document.createElement("div");
  card.className = "card";

  const title = document.createElement("p");
  title.textContent = q.text;

  const scale = document.createElement("div");
  scale.className = "scale";

  const leftLabel = document.createElement("span");
  leftLabel.className = "label";
  leftLabel.textContent = "当てはまる";

  const rightLabel = document.createElement("span");
  rightLabel.className = "label";
  rightLabel.textContent = "当てはまらない";

  const circles = document.createElement("div");
  circles.className = "circles";

  values.forEach(v => {
    const c = document.createElement("div");
    c.className = "circle";

    c.onclick = () => {
      // 選択UI
      circles.querySelectorAll(".circle").forEach(el => el.classList.remove("selected"));
      c.classList.add("selected");

      // スコア
      if (v > 0) {
        score[q.types[0]] += v;
      } else if (v < 0) {
        score[q.types[1]] += Math.abs(v);
      }

      // 次へ（1回だけ）
      if (!card.classList.contains("answered")) {
        card.classList.add("answered");

        setTimeout(() => {
          if (index + 1 < questions.length) {
            addQuestion(index + 1);
          } else {
            showResult();
          }
        }, 200); // 少し余韻
      }
    };

    circles.appendChild(c);
  });

  scale.appendChild(leftLabel);
  scale.appendChild(circles);
  scale.appendChild(rightLabel);

  card.appendChild(title);
  card.appendChild(scale);

  document.getElementById("container").appendChild(card);

  card.scrollIntoView({ behavior: "smooth", block: "end" });
}

function showResult() {
  
  const finalTypes = [
    score.エネルギッシュ >= score.安定 ? "エネルギッシュ" : "安定",
    score.好奇心 >= score.堅実 ? "好奇心" : "堅実",
    score.感情豊か >= score.クール ? "感情豊か" : "クール",
    score.甘えん坊 >= score.自立 ? "甘えん坊" : "自立"
  ];

  // 該当する結果を探す
  const match = results.find(r =>
    r.type.every((t, i) => t === finalTypes[i])
  );

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h2>診断結果</h2>
    <h1>${match ? match.text : "診断結果が見つかりませんでした"}</h1>
    <p>${match ? match.text : "診断結果が見つかりませんでした"}</p>
    <button onclick="location.reload()">もう一度診断する</button>
  `;

  document.getElementById("container").appendChild(card);
}

addQuestion(0);
