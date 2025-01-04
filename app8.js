"use strict";
const express = require("express");
const app = express();

let bbs = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える
let userid = 1;

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/get_test", (req, res) => {
  res.json({
    answer: 0
  })
});

app.get("/add", (req, res) => {
  console.log("GET");
  console.log( req.query );
  const num1 = Number( req.query.num1 );
  const num2 = Number( req.query.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

app.post("/add", (req, res) => {
  console.log("POST");
  console.log( req.body );
  const num1 = Number( req.body.num1 );
  const num2 = Number( req.body.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

// これより下はBBS関係
app.post("/check", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  res.json( {number: bbs.length });
});

app.post("/read", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  const start = Number( req.body.start );
  console.log( "read -> " + start );
  if( start==0 ) res.json( {messages: bbs });
  else res.json( {messages: bbs.slice( start )});
});

app.post("/post", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  const createdAt = new Date();
  const id = userid++;

  console.log( [id,name, message] );
  // 本来はここでDBMSに保存する
  bbs.push( {id: id, name: name, message: message,space: "               ",createdAt: createdAt.toISOString()} );
  res.json( {number: bbs.length } );
});



app.put("/bbs/:id", (req, res) => {
  const id = Number(req.params.id); // リクエストされた投稿ID
  const newmessage = req.body.message; // 新しいメッセージ

  console.log(`PUT /bbs/${id}, New Message: ${newmessage}`);

  // IDで投稿を検索
  const post = bbs.find(post => post.id === id);

  if (post) {
    // メッセージを更新
    post.message = newmessage;
    res.json({ success: true, updatedPost: post }); // 成功レスポンス
  } else {
    // 該当IDが存在しない場合
    res.status(404).json({ success: false, message: "Post not found" });
  }
});


app.delete("/bbs/:id", (req, res) => {
  console.log(`DELETEリクエスト: ${req.params.id}`);
  const id = Number(req.params.id);

  // 投稿のインデックスを検索
  const index = bbs.findIndex(post => post.id === id);

  if (index !== -1) {
      // インデックスが見つかった場合、投稿を削除
      const deletedPost = bbs.splice(index, 1)[0];
      res.json({ success: true, deletedPost });
  } else {
      // 投稿が見つからない場合、404エラーを返す
      res.status(404).json({ success: false, message: "Post not found" });
  }
});

app.post('/post', (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  const timestamp = new Date().toISOString(); // ISO形式でタイムスタンプを生成

  const post = { id: bbs.length + 1, name, message, timestamp };
  bbs.push(post);

  res.json({ success: true, post });
});

app.get("/bbs", (req,res) => {
    console.log("GET /BBS");
    res.json( {test: "GET /BBS" });
});

app.post("/bbs", (req,res) => {
    console.log("POST /BBS");
    res.json( {test: "POST /BBS"});
})




app.get("/bbs/:id", (req,res) => {
    console.log( "GET /BBS/" + req.params.id );
    res.json( {test: "GET /BBS/" + req.params.id });
});

app.put("/bbs/:id", (req,res) => {
    console.log( "PUT /BBS/" + req.params.id );
    res.json( {test: "PUT /BBS/" + req.params.id });
});

app.delete("/bbs/:id", (req,res) => {
    console.log( "DELETE /BBS/" + req.params.id );
    res.json( {test: "DELETE /BBS/" + req.params.id });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
