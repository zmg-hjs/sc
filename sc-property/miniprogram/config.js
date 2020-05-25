/**
 * 小程序配置文件
 */
var apiUrl="http://127.0.0.1:8001"
var config={
  apiUrl,
  activityUrl:`${apiUrl}/sc/property/activity/`,
  repairUrl:`${apiUrl}/sc/property/repair/`,
  workUrl:`${apiUrl}/sc/property/work/`
};
module.exports = config