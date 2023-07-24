![image](https://github.com/YangKD/restaurant_list/blob/main/public/images/snapshot3.png)

# 我的最愛餐廳清單


## 介紹


紀錄屬於自己的餐廳清單，可以看見餐廳名字和評分，點擊可以瀏覽餐廳詳細資料，也具有名字和類別搜索的功能

## 功能
* 查看所有清單內的餐廳
* 瀏覽餐廳的詳細資訊
* 連結餐廳的地址到Goole地圖
* 可以搜尋特定的餐廳
* 新增餐廳
* 編輯餐廳
* 刪除餐廳
* 可註冊帳號密碼,使用Facebook登入
* 具備安全認證,個別帳號只能看到自己創建的頁面

# 開始使用

1.請先確認有安裝 node.js 與 npm

2.將專案 clone 到本地

3.在本地開啟之後，透過終端機進入資料夾，輸入：

 `npm install`

4.安裝完畢後，繼續輸入：
 
 `npm run start`

5.若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址

 `Listening on http://localhost:3000`
 
6.若欲暫停使用

 `ctrl + c`

7.啟動種子帳號
 `npm run seed`

8.預設帳號密碼
Email : user1@example.com  密碼 : 12345678
Email : user2@example.com  密碼 : 12345678
 
 # 開發工具
 
 * Node.js 14.16.0
 * Express 4.16.4
 * Express-Handlebars 3.0.0
 * Bootstrap
 * Font-awesome
 * MongoDB
 * mongoose 6.0.5
 * dotenv 16.0.3
 * bcryptjs 2.4.3
 * connect-flash 0.1.1
 * passport 0.4.1
 * passport-facebook 3.0.0
