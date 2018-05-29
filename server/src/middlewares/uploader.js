const aws = require('aws-sdk');
const sharp = require('sharp');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const uuid = require('uuid/v4');
const config = require('../bin/config');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    shouldTransform: (req, file, cb) => {
      cb(null, /^image/i.test(file.mimetype));
    },
    transforms: [{
      id: 'resized',
      key: (req, file, cb) => {
        req.uuid = uuid();
        cb(null, req.uuid + config.photo.extension);
      },
      transform: (req, file, cb) => {
        cb(null, sharp().resize(config.photo.width, config.photo.height).jpeg());
      }
    }]
  })
});

module.exports = {
  s3,
  upload
}

