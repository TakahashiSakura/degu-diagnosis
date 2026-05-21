const questions = [
  { text: "よく走っている", types: ["エネルギッシュ","安定"] },
  { text: "寝るのが大好きだ", types: ["安定","エネルギッシュ"] },
  { text: "脱走しがち", types: ["エネルギッシュ","安定"] },
  { text: "抱っこしても、じっとしている", types: ["安定","エネルギッシュ"] },
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
  const result = [
    score.エネルギッシュ >= score.安定 ? "エネルギッシュ" : "安定",
    score.好奇心 >= score.堅実 ? "好奇心" : "堅実",
    score.感情豊か >= score.クール ? "感情豊か" : "クール",
    score.甘えん坊 >= score.自立 ? "甘えん坊" : "自立"
  ].join("・");

  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h2>診断結果</h2>
    <h1>${result}</h1>
    <p>あなたのペットは ${result} タイプ！🐾</p>
    <button onclick="location.reload()">もう一度</button>
  `;

  document.getElementById("container").appendChild(card);
}

addQuestion(0);