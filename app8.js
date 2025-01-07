"use strict";  // 'use strict' を追加

const healthData = [];
const weightData = [];
const caloriesData = [];
const exerciseData = [];
const dates = [];
let goalWeight = 0; // 目標体重

// 目標体重との差を表示（ユーモアを追加）
const displayGoalDifference = () => {
    const lastWeight = weightData[weightData.length - 1];
    const difference = goalWeight - lastWeight;
    const goalDiffElement = document.getElementById('goal-difference');
    if (difference > 0) {
        goalDiffElement.innerHTML = `あと ${difference.toFixed(1)} kg で目標体重達成！さあ、がんばれ！`;
    } else if (difference < 0) {
        goalDiffElement.innerHTML = `目標体重を ${Math.abs(difference).toFixed(1)} kg オーバーしています...でも、大丈夫！また頑張ろう！`;
    } else {
        goalDiffElement.innerHTML = '目標体重に達成しました！おめでとう！🎉';
    }
};

// 食べ物のカロリー計算（仮のデータ）
const calculateCalories = (foods) => {
    const foodCalories = {
        'りんご': 100,   // りんご100kcal
        'バナナ': 90,    // バナナ90kcal
        '鶏むね肉': 150, // 鶏むね肉150kcal
        'ご飯': 250     // ご飯250kcal
    };
    const foodArray = foods.split(',').map(food => food.trim());
    let totalCalories = 0;
    foodArray.forEach(food => {
        totalCalories += foodCalories[food] || 0; // 定義されていない食べ物は0kcal
    });
    return totalCalories;
};

// グラフを更新する関数
let chart;
const updateChart = () => {
    const ctx = document.getElementById('weightChart').getContext('2d');
    if (chart) {
        chart.destroy(); // 既存のグラフを破棄
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: '体重 (kg)',
                data: weightData,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            },
            {
                label: '摂取カロリー (kcal)',
                data: caloriesData,
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false
            },
            {
                label: '運動時間 (分)',
                data: exerciseData,
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

// サーバーにデータを送信して保存する処理
const saveData = async (weight, foods, exerciseTime) => {
    const date = new Date().toISOString().split('T')[0]; // 日付を取得
    const calories = calculateCalories(foods); // 食べ物のカロリーを計算
    const newData = { date, weight, calories, exerciseTime };

    try {
        const response = await fetch('/save-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('保存されたデータ:', responseData);
            // サーバーからのレスポンスを元にグラフとデータ表示を更新
            healthData.push(newData);  // ローカルでもデータを保存
            dates.push(date);
            weightData.push(weight);
            caloriesData.push(calories);
            exerciseData.push(exerciseTime);

            displayData();
            displayGoalDifference();
            updateChart();
            alert(`データが保存されました！今日は${foods}を食べたんですね。カロリー計算完了！`);
        } else {
            alert('データの保存に失敗しました。');
        }
    } catch (error) {
        console.error('エラー:', error);
        alert('データの送信中にエラーが発生しました。');
    }
};

// 保存されたデータを表示する関数
const displayData = () => {
    const dataList = document.getElementById('data-list');
    dataList.innerHTML = '';
    healthData.forEach(data => {
        const listItem = document.createElement('li');
        listItem.textContent = `日付: ${data.date}, 体重: ${data.weight} kg, 摂取カロリー: ${data.calories} kcal, 運動時間: ${data.exerciseTime} 分`;
        dataList.appendChild(listItem);
    });
};

// フォーム送信時にデータを保存する
document.getElementById('health-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    const foods = document.getElementById('foods').value;
    const exerciseTime = parseInt(document.getElementById('exerciseTime').value, 10);

    if (goalWeight === 0) {
        goalWeight = parseFloat(document.getElementById('goalWeight').value);
    }

    saveData(weight, foods, exerciseTime);
});