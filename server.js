const express = require('express');
const path = require('path');
const app = express();
const port = 4500;

// JSONデータを扱うためのミドルウェア
app.use(express.json());

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, 'public')));

// データ保存用のPOSTエンドポイント
app.post('/save-data', (req, res) => {
    const { date, weight, calories, exerciseTime } = req.body;

    // ここでデータを保存する処理を実装します
    console.log(`データ受信: 日付: ${date}, 体重: ${weight}, 摂取カロリー: ${calories}, 運動時間: ${exerciseTime}`);

    // 保存が成功した場合のレスポンス
    res.json({ message: 'データが正常に保存されました' });
});

// サーバーの起動
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});