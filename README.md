# 簡介

這是一個提供貨幣轉換API的Node.js程式。
它將一個貨幣金額從一種貨幣轉換為另一種貨幣，將結果四捨五入到小數點後兩位，並使用逗號進行千位分隔的格式化。

## 程式版本與使用框架

- Node 16.1.0
- Express 4.16.1

### 使用說明

- 先使用 npm i 命令安裝套件，使用 npm start 命令執行程式。
- 直接執行已打包程式(在build資料夾中，根據使用的OS對應執行應用程式)。

- 查詢參數：<br>
   1.source：原始貨幣 (TWD/JPY/USD)。<br>
   2.target：目標貨幣 (TWD/JPY/USD)。<br>
   3.amount：要轉換的金額(格式:$金額，使用逗號進行千位分隔)。

- 輸入範例:?source=USD&target=JPY&amount=$1,525

- 程式執行後，使用此連結[查看輸出結果](http://localhost:3000/?source=USD&target=JPY&amount=$1,525)