const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('form', {
    name: 'KIM MIN SOO',
    email: 'theory312@naver.com',
    homepage: 'naver.com'
  });
});
 
router.post('/', function(req,res,next){ 
  res.json(req.body)
});

module.exports = router;