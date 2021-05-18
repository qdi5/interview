var express = require('express');
var router = express.Router();
var app = 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/jsonp', function(req, res, next) {
  const { callback, ...rest } = req.query
  console.log('callback:\r\n', callback)
  console.log(rest)
  res.jsonp({
    name: rest.name,
    age: rest.age,
    salary: rest.salary
  })
})

module.exports = router;
