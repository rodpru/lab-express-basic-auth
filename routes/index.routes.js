const express = require('express');
const router = express.Router();

function requireLogin(req, res, next) {
    if (req.session.currentUser) {
      next();
    } else {
      res.redirect('/login');
    }
  }
  

/* GET home page */
router.get('/', (req, res, next) => {
    req.app.locals.loggedUser = req.session.currentUser; 
    res.render('index', {user: req.session.currentUser});
});
router.get('/login', (req, res) =>{
    res.render('login');
});

router.get('/main', requireLogin, (req,res) =>{
    res.render('main');
})
router.get('/private', requireLogin, (req, res) =>{
    res.render('private');
})
  


module.exports = router;
