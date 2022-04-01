const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
    
  .get('/', authenticate, async (req, res, next) => {
    try {
      const post = await Post.getAll(req.body);
      res.send(post);
    } catch (error) {
      next(error);   
    }
  })
    
  .post('/', authenticate, async (req, res, next) => {
    try {
      const post = await Post.insert({
        ...req.body,
        username: req.user.username
      });  
      res.send(post);
    } catch (error) {
      next(error);
    }
  });
