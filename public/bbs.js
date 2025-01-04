"use strict";

let number = 0;
const bbs = document.querySelector('#bbs');

// 投稿ボタン
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {
        method: "POST",
        body: `name=${encodeURIComponent(name)}&message=${encodeURIComponent(message)}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    fetch("/post", params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            document.querySelector('#message').value = "";
        });
});

// サーバーから新しい投稿を定期的に確認
document.querySelector('#check').addEventListener('click', () => {
    const params = {
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch(url, params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then((response) => {
            let value = response.number;

            if (number != value) {
                const params = {
                    method: "POST",
                    body: `start=${number}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                const url = "/read";
                fetch(url, params)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Error');
                        }
                        return response.json();
                    })
                    .then((response) => {
                        number += response.messages.length;
                        for (let mes of response.messages) {
                            let cover = document.createElement('div');
                            cover.className = 'cover';

                            let name_area = document.createElement('span');
                            name_area.className = 'name';
                            name_area.innerText = mes.name;

                            let mes_area = document.createElement('span');
                            mes_area.className = 'mes';
                            mes_area.innerText = mes.message;

                          // タイムスタンプを追加
   // タイムスタンプの表示（「Posted at」の部分は削除）
   let timestamp_area = document.createElement('span');
   timestamp_area.className = 'timestamp';
   const timestamp = new Date(mes.createdAt); // サーバーから返されたタイムスタンプを Date オブジェクトに変換
   timestamp_area.innerText = timestamp.toLocaleString(); // ローカル形式で表示

                            // 編集ボタン
                            let edit_button = document.createElement('button');
                            edit_button.className = 'edit-button';
                            edit_button.innerText = '編集';
                            edit_button.addEventListener('click', () => {
                                const new_message = prompt('新しいメッセージを入力してください:', mes.message);
                                if (new_message) {
                                    const params = {
                                        method: "PUT",
                                        body: `id=${mes.id}&message=${encodeURIComponent(new_message)}`,
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        }
                                    };
                                    const url = `/bbs/${mes.id}`;
                                    fetch(url, params)
                                        .then((response) => {
                                            if (!response.ok) {
                                                throw new Error('Error');
                                            }
                                            return response.json();
                                        })
                                        .then(() => {
                                            mes_area.innerText = new_message;
                                        });
                                }
                            });

                            // 削除ボタン
                            let delete_button = document.createElement('button');
                            delete_button.className = 'delete-button';
                            delete_button.innerText = '削除';
                            delete_button.addEventListener('click', () => {
                                if (confirm('本当に削除しますか？')) {
                                    const params = {
                                        method: "DELETE",
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        }
                                    };
                                    const url = `/bbs/${mes.id}`;
                                    fetch(url, params)
                                        .then((response) => {
                                            if (!response.ok) {
                                                throw new Error('削除リクエスト失敗');
                                            }
                                            return response.json();
                                        })
                                        .then((response) => {
                                            if (response.success) {
                                                cover.remove();
                                                number -= 1;
                                            } else {
                                                alert('削除に失敗しました: ' + response.message);
                                            }
                                        });
                                }
                            });

                            cover.appendChild(name_area);
                            cover.appendChild(mes_area);
                            cover.appendChild(timestamp_area);
                            cover.appendChild(edit_button);
                            cover.appendChild(delete_button);
                            cover.appendChild(timestamp_area);
                            bbs.appendChild(cover);
                        }
                    });
            }
        });
});