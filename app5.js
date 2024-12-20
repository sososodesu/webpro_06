const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

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
  let win = Number( req.query.win )||0;
  let total = Number( req.query.total )||0;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  let judgement = '';
  if((hand=='グー' && cpu=='チョキ')||
  (hand=='チョキ' && cpu=='パー')||
  (hand=='パー' && cpu=='グー')){
    judgement ='勝ち';
    win +=1;
  } else if (hand === cpu) {
  judgement = 'あいこ';
} else {
  judgement = '負け';
}

  // 今はダミーで人間の勝ちにしておく


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

app.get('/number', (req,res) => {
  let number = req.query.number;
  let win = Number( req.query.win )||0;
  let total = Number( req.query.total )||0;
  console.log( {number, win, total});
  const num = Math.floor( Math.random()* 3+1);
let cpu = '';
if( num==1 ) cpu = '1';
else if( num==2 ) cpu = '2';
else if( num==3 ) cpu = '3';
let judgement='';
if ((number == '3' && cpu == '3') || (number == '2' && cpu == '2') || (number == '1' && cpu == '1')) {
  judgement='正解';
win +=1;}
  else{
    judgement = 'ハズレ';
  }
if(win == '3'){
  
}


  total += 1;
  const display = {
    your: number,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'number', display );
});

app.get('/whether', (req,res) => {
  let whether = req.query.whether;
  let win = Number( req.query.win )||0;
  let total = Number( req.query.total )||0;
  console.log( {whether, win, total});
  const num = Math.floor( Math.random()* 3+1);
let cpu = '';
if( num==1 )cpu = '晴れ';
else if( num==2 )cpu = '曇り';
else if( num==3 ) cpu = '雨';
let judgement='';
if ((whether === cpu)){
  judgement='正解';
win +=1;}
  else{
    judgement = 'ハズレ';
  }
  total += 1;
  const display = {
    your: whether,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
res.render( 'whether', display );
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
