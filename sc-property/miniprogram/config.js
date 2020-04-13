/**
 * 小程序配置文件
 */
var apiUrl="http://127.0.0.1:8003"
var config={
  apiUrl,
  appid,
  userUrl:`${apiUrl}/sc/resident/user/`,
  newsUrl:`${apiUrl}/sc/resident/news/`,
  carUrl:`${apiUrl}/sc/resident/car/`,
  activityUrl:`${apiUrl}/sc/resident/activity/`,
  voteUrl:`${apiUrl}/sc/resident/activity/vote/`
};
module.exports = config