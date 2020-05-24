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
  carUrl:`${apiUrl}/sc/resident/car/`,
  activityUrl:`${apiUrl}/sc/resident/activity/`,
  voteUrl:`${apiUrl}/sc/resident/activity/vote/`,
  repairUrl:`${apiUrl}/sc/resident/repair/`,
  shopUrl:`${apiUrl}/sc/resident/commodity/`,
  imageUrl:`${apiUrl}/sc/resident/upload/`,
  complaintUrl:`${apiUrl}/sc/resident/complaint/`,
  chargesUrl:`${apiUrl}/sc/resident/news`
};
module.exports = config