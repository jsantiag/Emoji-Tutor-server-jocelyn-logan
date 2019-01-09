'use strict';

const express = require('express');

const User = require('../models/user');
const Emoji = require('../models/emoji'); 

const router = express.Router();




router.get('/next', (req, res, next) => {
  const userId = req.user.id; 
  // list.push(question);
  // res.json(question);
  User.findOne({userId})
    .populate('list.emoji')
    .then(result => {
      console.log('this is result', result); 
      if(result){
        const head = result.head; 
        const nextEmoji = result.list[head]; 
        res.json(nextEmoji); 
      }else{
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
  const userId = req.user.id; 
  const {
    answer,
    answeredEmojiId, 
    answeredEmojiNext 
  } = req.body; 
  let currentHead; 

  User.findOne({userId})
    .then(user =>  {
      currentHead=user.head;
    
    });
  
});




/*quick reference 
correctAnswer => emoji.emojiName
currentEmojiId => Emoji.findbyId => answer => foundEmoji.emojiName
weight => user.list[someval].weight
next => user.list[someval].next
head => user.head 

// const emojis = [
//   {
//     '_id': '222222222222222222222200',
//     'emojiCode': '\u{1F436}',
//     'emojiName': 'dog',
//   },
//   {
//     '_id': '222222222222222222222201',
//     'emojiCode': '\u{1F960}',
//     'emojiName': 'fortune cookie',
//   },
//   {
//     '_id': '222222222222222222222202',
//     'emojiCode': '\u{1F997}',
//     'emojiName': 'cricket',
//   },
//   {
//     '_id': '222222222222222222222203',
//     'emojiCode': '\u{1F9DF}',
//     'emojiName': 'zombie',
//   },
//   {
//     '_id': '222222222222222222222204',
//     'emojiCode': '\u{1F4A9}',
//     'emojiName': 'poop',
//   }
// ];
//user
// {
//   '_id': '333333333333333333333301',
//   'username': 'jojosan',
//   'password': '$2a$10$af0saLgnk2QbYYPYO1PMyO66ud8mHaUAdK4o/cxUsdQ7JeVAVMA8S',
//   'list': [
//     {
//       'emoji': '222222222222222222222200',
//       'weight': 1, 
//       'next': 1
//     },
//     {
//       'emoji': '222222222222222222222201',
//       'weight': 1, 
//       'next': 2
//     },
//     {
//       'emoji': '222222222222222222222202',
//       'weight': 1,
//       'next': 3
//     },
//     {
//       'emoji': '222222222222222222222203',
//       'weight': 1, 
//       'next':4
//     },
//     {
//       'emoji': '222222222222222222222204',
//       'weight': 1, 
//       'next': 0
//     },
//   ],
//   'head':0
// }*/
module.exports = router;