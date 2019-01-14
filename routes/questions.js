'use strict';

const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.get('/next', (req, res, next) => {
  const userId = req.user._id;

  User.findOne({ _id: userId })
    .populate('list.emoji')
    .then(result => {
      if (result) {
        const head = result.head;
        const nextEmoji = result.list[head];
        res.json(nextEmoji);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

//save the value of the current head
// save the node that you just answered
//find the location of the answered node based on weight

//change the current head to whoever answered node's next 
//pointer is addressed to

//find the insertion point
//insert the node by changing the next pointer

router.post('/answer', (req, res, next) => {
  const userId = req.user._id;
  const {
    userAnswer
  } = req.body;
  User.findOne({ _id: userId })
    .then(user => {
 
      let answeredQ = user.list[user.head];
  
      let answeredQLast = user.head;
    
      if (userAnswer === true) {
        answeredQ.weight *= 2;
      } else {
        answeredQ.weight = 1;
      }
    
      user.head = answeredQ.next;

      let currentQ = answeredQ;
      for (let i = 0; i < answeredQ.weight; i++) {
        if (currentQ.next === null) {
          break;
        }
        let nextQ = currentQ.next;
        currentQ = user.list[nextQ];
      }
      answeredQ.next = currentQ.next;
      currentQ.next = answeredQLast;
      user.save();
    })
    .then(user => {
      res.sendStatus(204);
    });
});


/*quick reference 
correctAnswer => emoji.emojiName
currentEmojiId => Emoji.findbyId => answer => foundEmoji.emojiName
weight => user.list[someval].weight
next => user.list[someval].next
head => user.head */

module.exports = router;
