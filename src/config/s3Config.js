const s3Config = {};
module.exports.default = s3Config;
module.exports.s3Config = s3Config;

Object.assign(s3Config, {
  accessKey: process.env.S3_ACCESS_KEY || '',
  secretKey: process.env.S3_SECRET_KEY || '',
  bucket: process.env.S3_BUCKET || '',
  bucketPrefix: process.env.S3_BUCKET_PREFIX || '',
  region: process.env.S3_REGION || 'ap-northeast-1', // Tokyo
  directAccess: !!(process.env.S3_DIRECT_ACCESS ? Number(process.env.S3_DIRECT_ACCESS) : 1),
});
