const express = require('express');
const router = express.Router();
const db = require('../db/database');
const asyncMiddleware = require('../middlewares/async');
const { s3, upload } = require('../middlewares/uploader');

router.get('/', asyncMiddleware(async (req, res, next) => {
  const topics = await db['topic'].findAll();
  res.json({ topics });
}));

router.post('/', upload.single('photo'), asyncMiddleware(async (req, res, next) => {
  console.log(req.uuid);
  console.log(req.file);
  console.log(req.body);
  res.send('OK');
}));

module.exports = router;