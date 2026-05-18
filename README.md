# list-system
這是一個使用 Node.js (Express) 作為後端、MySQL 作為資料庫，並結合前端網頁（HTML/CSS/JS）的全端情資匯整系統。

請按照以下步驟，在您的本機電腦完成環境建置與系統啟動。

🛠️ 前置準備
在開始之前，請確保您的電腦已安裝以下軟體：

Node.js (建議 LTS 版本)

MySQL Server (或安裝 XAMPP 整合包)

🚀 快速啟動三步驟
🔹 步驟 1：初始化本機 MySQL 資料庫
打開您的 MySQL 管理工具（如 MySQL Workbench、Command Line Client 或 VS Code Database 套件）。

打開本專案內附的 schema.sql 檔案。

複製裡面的所有 SQL 指令並全部執行。這將會自動建立 reconnaissance_db 資料庫與 target_reports 情資資料表。

🔹 步驟 2：配置後端連線密碼
用編輯器打開 server.js。

找到資料庫連線設定區塊（約在第 20 行）：

JavaScript
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '您的MySQL密碼', // 填MySQL 密碼！
    database: 'reconnaissance_db'
});
將 password 欄位修改為您電腦的 MySQL 密碼並儲存檔案。

🔹 步驟 3：安裝套件並啟動伺服器
打開終端機（Terminal），切換到本專案的 REPORT APP 目錄下，依序執行以下指令：

Bash
# 1. 安裝專案所需的 Node.js 依賴套件 (Express, MySQL2, CORS, Body-Parser)
npm install

# 2. 啟動後端伺服器
node server.js
當終端機顯示以下兩行，代表系統已成功對接並順利運行：

Plaintext
✅ 後端已成功連線至 MySQL 資料庫！
🚀 後端伺服器正在 http://localhost:3000 運行中...
🌐 系統使用
伺服器啟動後，請打開瀏覽器並輸入以下網址即可開始登錄情資：
👉 http://localhost:3000/CGA.html (海巡署報表頁面)

系統會即時攔截表單資料，並安全地同步寫入您的本機 MySQL 資料庫中！
