/**
 * 小程序配置文件
 */
var apiUrl="http://127.0.0.1:8080"
var appid ="wx04dc99049cd52a84"
var config={
  apiUrl,
  appid,
  wxUrl:`${apiUrl}/wxUrl/`
};
module.exports = config