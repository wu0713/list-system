const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const path = require('path');

// 🎯 因為 server.js 現在就住在 REPORT APP 裡面了，直接往下一層 front 找就可以了！
app.use(express.static(path.join(__dirname, 'front', 'Maillard_1_0_0')));

// 1. 連線至你的 MySQL 資料庫
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123ewq??', // 👈 ⚠️ 記得改成你本機真實的 MySQL 密碼！
    database: 'reconnaissance_db'
});

db.connect(err => {
    if (err) {
        console.error('❌ 資料庫連線失敗: ' + err.message);
        return;
    }
    console.log('✅ 後端已成功連線至 MySQL 資料庫！');
});

// 2. 接收表單並寫入
app.post('/submit_data.php', (req, res) => {
    console.log("📥 成功收到前端原始表單資料:", req.body);

    // 🎯 超乾淨的一對一綁定！完全不需任何型態轉換！
    const formData = {
        page_title: "海巡署 (CGA)",
        target_type: req.body.target_type || null,
        military: req.body.military || null,
        nationality: req.body.nationality || null,
        target_number: req.body.target_number ? parseInt(req.body.target_number) : 1,
        latitude: req.body.latitude ? parseFloat(req.body.latitude) : null,
        longitude: req.body.longitude ? parseFloat(req.body.longitude) : null,
        heading: req.body.heading ? parseInt(req.body.heading) : null,
        speed: req.body.speed ? parseInt(req.body.speed) : null,
        altitude: req.body.altitude ? parseInt(req.body.altitude) : null,
        status: req.body.status || null,
        
        // 🎯 這裡直接收前端傳來的英文字母 (A, B, C, D)，因為資料庫現在裝得下了！
        conf_coord: req.body.conf_id || null, 
        reliability: req.body.reliability || null
    };

    const sql = `INSERT INTO target_reports SET ?`;

    db.query(sql, formData, (err, result) => {
        if (err) {
            console.error("❌ MySQL 資料庫寫入失敗:", err.message);
            return res.status(500).send(`<h1>❌ 寫入失敗: ${err.message}</h1>`);
        }
        
        res.send(`
            <meta charset="utf-8">
            <div style="text-align:center; margin-top:100px; font-family:sans-serif;">
                <h1 style="color:#d84b2a;">🎉 偵察報告已成功同步至國防資料庫！</h1>
                <p>MySQL 自動產生的情資流水號 (ID) 為：<b>${result.insertId}</b></p>
                <p>資料已安全存檔，您可以返回或關閉視窗。</p>
                <button onclick="window.history.back()" style="padding:12px 24px; background:#000; color:#fff; border:none; cursor:pointer; font-weight:bold;">返回上一頁</button>
            </div>
        `);
    });
});

app.listen(3000, () => {
    console.log('🚀 後端伺服器正在 http://localhost:3000 運行中...');
});