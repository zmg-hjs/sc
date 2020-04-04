/**
 * 小程序配置文件
 */
var apiUrl="http://127.0.0.1:8002"
var appid ="wx04dc99049cd52a84"
var config={
  apiUrl,
  appid,
  wxUrl:`${apiUrl}/sc/resident/user/register`
};
module.exports = config