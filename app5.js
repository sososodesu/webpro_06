const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // 静的ファイル（CSSや画像）用

// 質問データ
const questions = [
  {
    question: "あなたの性格をアニメキャラに例えるなら",
    options: [
      { text: "冷静で頭脳派なリーダータイプ（シティーハンター:冴羽獠...）", score: 1 },
      { text: "熱血で元気いっぱい！ムードメーカー（ワンピース:ルフィ...）", score: 3 },
      { text: "自由奔放でちょっと謎めいてる（NARUTO疾風伝:ナルト...）", score: 5 },
    ],
  },
  {
    question: "戦うとしたらどんな能力が欲しい？",
    options: [
      { text: "冷静に戦略を練って相手を出し抜く能力（ハンターハンター:キルア...）", score: 1 },
      { text: "体力と気合で正面突破！（ハンターハンター:ゴン...）", score: 3 },
      { text: "派手で強力な特殊能力で一発逆転！（呪術廻戦:五条悟...）", score: 5 },
    ],
  },
  {
    question: "アニメのジャンルで好きなのは？",
    options: [
      { text: "感動するヒューマンドラマ系（ヴァイオレット・エヴァーガーデン...）", score: 1 },
      { text: "バトルや冒険が盛り上がる王道系（ドラゴンボール...）", score: 3 },
      { text: "SFやファンタジーで世界観がすごい作品（鋼の錬金術師...）", score: 5 },
    ],
  },
  {
    question: "休日、どんなシチュエーションで過ごしてみたい？",
    options: [
      { text: "静かな図書館やカフェで知的な会話（ＤＥＡＴＨ ＮＯＴＥ:夜神月...）", score: 1 },
      { text: "テーマパークやアウトドアで元気に遊ぶ（ドラゴンボール:孫悟空...）", score: 3 },
      { text: "異世界でモンスター退治や魔法を使った冒険（転スラ:リムル...）", score: 5 },
    ],
  },
  {
    question: "好きなアニメキャラのセリフは？",
    options: [
      { text: "『逃げちゃダメだ　逃げちゃダメだ　逃げちゃダメだ』（エヴァンゲリオン:碇シンジ...）", score: 1 },
      { text: "『希望に進むのが気持ちのいい人生ってもんだろ』（カイジ:カイジ...）", score: 3 },
      { text: "『真の失敗とはッ！ 開拓の心を忘れ！ 困難に挑戦する事に無縁のところにいる者たちの事をいうのだッ！』（ジョジョ:スティーブン・スティール...）", score: 5 },
    ],
  },
  {
    question: "アニメキャラの服装で憧れるのは？",
    options: [
        { text: "シンプルだけど洗練されてるスーツや制服（SLAM DUNK:流川楓...）", score: 1 },
        { text: "目立つけどカッコいいバトルスーツや鎧（ガンダム...）", score: 3 },
        { text: "超個性的な派手派手コスチューム！（ジョジョ:ディアボロ...）", score: 5 },
    ],
},
{
    question: "もし異世界に行けるとしたら、どんな役割がいい？",
    options: [
        { text: "頼れる参謀として、みんなを支えるポジション（僕のヒーローアカデミア:ホークス）", score: 1 },
        { text: "主人公として仲間を引っ張るリーダー（ポケットモンスター:サトシ）", score: 3 },
        { text: "隠された力を持つ謎の人物として、ストーリーを動かす存在（進撃の巨人:エレン）", score: 5 },
    ],
},
{
    question: "好きなスポーツは？",
    options: [
        { text: "バスケやサッカー", score: 3 },
        { text: "野球やラグビー", score: 5 },
        { text: "ゴルフやテニス", score: 1 },
    ],
},
{
    question: "ゲームのジャンル、あなたが好きなのは？",
    options: [
        { text: "戦略的に頭を使うパズルやシミュレーション（ソシャゲ...）", score: 1 },
        { text: "爽快感のあるアクションゲーム（スマブラ...）", score: 3 },
        { text: "バトルや冒険が盛り上がるMMORPGやRPG（モンハン...）", score: 5 },
    ],
},
{
    question: "もし魔法を使えるとしたら、どんな魔法がいい？",
    options: [
        { text: "瞬間移動や時間を止める能力（ジョジョ:ディオ...）", score: 5 },
        { text: "攻撃や防御を強化するバフやデバフ魔法（ドラクエ:バイキルト、スクルト）", score: 3 },
        { text: "癒しや治療系の魔法（ドラクエ:ベホマラー）", score: 1 },
    ],
},
{
    question: "好きな月はいつですか？",
    options: [
        { text: "1~4月", score: 1 },
        { text: "5~9月", score: 3 },
        { text: "10~12月", score: 5 },
    ],
},
{
    question: "理想のデートはどんな場所？",
    options: [
        { text: "静かなカフェでゆっくりおしゃべり", score: 1 },
        { text: "全身動かして遊べるテーマパーク", score: 3 },
        { text: "ロマンチックな夜景を見に行く", score: 5 },
    ],
},
{
    question: "あなたが一番影響を受けたアニメは？",
    options: [
        { text: "心に残る感動的な物語（千と千尋の神隠し...）", score: 1 },
        { text: "冒険と成長を描いた作品（ワンピース...）", score: 3 },
        { text: "驚きとワクワクのファンタジー（約束のネバーランド...）", score: 5 },
    ],
},
{
    question: "あなたが好きな色は？",
    options: [
        { text: "寒色", score: 1 },
        { text: "暖色", score: 3 },
        { text: "鮮やかで派手な色", score: 5 },
    ],
},
{
    question: "あなたの理想の仕事は？",
    options: [
        { text: "静かで安定した職業（例: 公務員）", score: 1 },
        { text: "創造的な仕事（例: クリエイター）", score: 3 },
        { text: "冒険的で刺激的な仕事（例: 研究者）", score: 5 },
    ],
},
];

// 精神年齢を計算する関数
function calculateMentalAge(score) {
  if (score <= 10) {
    return "精神年齢が若杉";
  } else if (score <= 20) {
    return "精神年齢が地味に若杉";
  } else if (score <= 30) {
    return "精神年齢がまあ、普通やね";
  } else if (score <= 40) {
    return "この精神年齢、、、ませているな？";
  } else if (score <= 50) {
    return "精神年齢が大人びてきた";
  } else if (score <= 60) {
    return "精神年齢が非常に大人びていらっしゃる";
  } else {
    return "精神年齢がパーフェクトアダルトだ！！";
  }
}

// 質問を表示するためのページ
app.get('/', (req, res) => {
  res.render('index', { 
    currentQuestionIndex: 0, 
    userScore: 0,
    question: questions[0] // 初期の質問を表示
  });
});

// POSTリクエストで質問の回答を処理
app.post('/answer', (req, res) => {
  const { currentQuestionIndex, userScore, optionScore } = req.body;

  // スコアを更新
  const updatedScore = parseInt(userScore) + parseInt(optionScore);
  const nextQuestionIndex = parseInt(currentQuestionIndex) + 1;

  if (nextQuestionIndex < questions.length) {
    // 次の質問を表示
    res.render('index', { 
      currentQuestionIndex: nextQuestionIndex,
      userScore: updatedScore,
      question: questions[nextQuestionIndex],
    });
  } else {
    // 最後の質問に達したら結果を表示
    const mentalAge = calculateMentalAge(updatedScore); // 精神年齢を計算
    res.render('result', { userScore: updatedScore, mentalAge: mentalAge }); // 結果を表示
  }
});

// サーバー起動
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});