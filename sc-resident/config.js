/**
 * 小程序配置文件
 */
var apiUrl="http://127.0.0.1:8002"
var appid ="wx04dc99049cd52a84"
var config={
  apiUrl,
  appid,
  userUrl:`${apiUrl}/sc/resident/user/`,
  newsUrl:`${apiUrl}/sc/resident/news/`,
  carUrl:`${apiUrl}/sc/resident/car/`
};
module.exports = config