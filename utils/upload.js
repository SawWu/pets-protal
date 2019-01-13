const qiniu =require('qiniu');

import config from './config'

let accessKey = config.qiniu.AK;
let secretKey = config.qiniu.SK;
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
