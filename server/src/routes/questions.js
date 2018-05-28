const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middlewares/async');

module.exports = (db) => {
  router.get('/hello', asyncMiddleware(async (req, res, next) => {
    res.json({ Hello: "World" });
  }));

  router.get('/', asyncMiddleware(async (req, res, next) => {
    const questions = await db['questions'].findAll();
    res.json({ questions });
  }));
  return router;
}