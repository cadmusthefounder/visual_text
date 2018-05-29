const express = require('express');
const router = express.Router();
const db = require('../db/database');
const asyncMiddleware = require('../middlewares/async');

router.get('/:topicId', asyncMiddleware(async (req, res, next) => {
  const questions = await db['question'].findAll();
  res.json({ questions });
}));

module.exports = router;