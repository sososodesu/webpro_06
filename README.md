# webpro_06
10/29
# webpro06
##　このプログラムについて
# ファイル一覧

ファイル名|説明
-|-
app5.js|プログラム本体
public/janken.html|じゃんけん開始画面
janken.ejs|じゃんけんファイル
```javascript
console.log("Hello");
```
## 仕様書
1. ```app5.js``` をnodeでポート開放行う
1. 他のターミナルでポートにアクセスする
1. Webブラウザでlocalhost:8080/public/janken.htmlにアクセスする
1. 自分の手を入力する

```mermaid
flowchart TD;
開始 --> 終了;
```

```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"条件に合うか"}
win["勝ち"]
loose["負け"]

start --> if
if -->|yes| win
win --> end1
if -->|no| loose
loose --> end1
```
ファイル名|説明
-|-
app5.js|プログラム本体
public/number.html|数予想開始画面
number.ejs|数予想ファイル

## 仕様書
1.```app5.js``` をnodeでポート開放行う
1. 他のターミナルでポートにアクセスする
1. Webブラウザでlocalhost:8080/public/number.htmlにアクセスする
1. コンピュータが出す数を予想する
1. 連続的中数とゲーム数が表示されるので,ゲームを続ける


```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"予想が的中しているか"}
win["正解"]
loose["ハズレ"]

start --> if
if -->|yes| win
win --> end1
if -->|no| loose
loose --> end1
```

## 仕様書
1.```app5.js``` をnodeでポート開放行う
1. 他のターミナルでポートにアクセスする
1. Webブラウザでlocalhost:8080/public/whether.htmlにアクセスする
1. 明日の天気を予想する
1. 連続的中数とゲーム数が表示されるので,ゲームを続ける

```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"予想が的中しているか"}
win["正解"]
loose["ハズレ"]

start --> if
if -->|yes| win
win --> end1
if -->|no| loose
loose --> end1
```