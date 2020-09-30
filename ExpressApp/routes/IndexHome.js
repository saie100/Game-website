var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Home');
});

//Get Method to practice
router.get('/practice', function(req, res, next) {
    
  res.render('Practice');
 
});


module.exports = router;
