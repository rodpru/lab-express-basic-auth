const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const { Mongoose } = require('mongoose');


router.get('/signup', (req, res) =>{
    res.render('signup');
});

router.post('/signup', (req, res) =>{
    try {
        const {username, password} = req.body;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(password, salt);
        console.log(username, password);
        if(username === '' || password === '') {
            res.render('signup', {errorMessage: 'No empty fields allowed'});
            return;            
        } else {
            User.create({username, password: hashPassword});
        }
    } catch (error) {
        res.render(error)
    }
});
router.post('/login', (req, res) => {
    const {username, password} = req.body;
  
    if(!username || !password) {
      res.render('login', {errorMessage: 'Please enter username and password'});
      return;
    }
    User.findOne({'username': username})
      .then((user) =>{
        if(!user) {
          res.render('login', {errorMessage: 'Invalid Login'})
          return;
        } 
        if(bcrypt.compareSync(password, user.password)) {
          //login sucess
          req.session.currentUser = user;
          res.redirect('/');
          res.render('index', {user})
        } else {
          //pass dont match
          res.render('login', {errorMessage: 'Invalid Login'});
        }
      })
  });
  router.post('/logout', (req, res) =>{
    req.session.destroy();
    res.redirect('/');
  })

module.exports = router;
