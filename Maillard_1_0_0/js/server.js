const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 1. 連接資料庫 (請確保已安裝 MongoDB)
mongoose.connect('mongodb://127.0.0.1:27017/SOM_System')
    .then(() => console.log('✅ 成功連接到 MongoDB'))
    .catch(err => console.error('❌ 資料庫連接失敗:', err));

// 2. 定義 CGA 資料結構
const cgaSchema = new mongoose.Schema({
    date: String,
    vessel: String,
    category: String,
    weather: String,
    location: String,
    detail: String,
    timestamp: { type: Date, default: Date.now }
});

const CGARecord = mongoose.model('CGARecord', cgaSchema);

// 3. 建立接收資料的路由
app.post('/api/cga', async (req, res) => {
    try {
        const newData = new CGARecord(req.body);
        await newData.save();
        res.status(200).json({ message: '資料已成功存入資料庫！' });
    } catch (err) {
        res.status(500).json({ error: '儲存失敗' });
    }
});

app.listen(3000, () => console.log('🚀 後端伺服器在 http://localhost:3000 執行中'));