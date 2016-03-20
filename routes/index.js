var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  return knex.select().table('users')
  .then(function(results){
    res.send("It's up")
  })
});

router.get('/maps/:id', function(req, res, next) {
  return knex.select().table('user_maps').where("user_id", req.params.id)
  .innerJoin('maps', 'map_id', '=', 'maps.id')
  .then(function(results){
    res.json(results)
  })
});

router.post('/newuser', function(req, res){
  return knex('users').returning('id').insert({
    user_name: req.body.userName
  }).then(function(results){
    res.send(results)
    return results;
  })
  .catch(function(err){
    console.log('Oh NO');
    res.json(err);
  })
})

router.post('/newmap', function(req,res){
  return knex('maps').returning('id').insert({
    title:req.body.title,
    note:req.body.note,
    location:req.body.location
  }).then(function(results){
    console.log(results);
    return knex('user_maps').insert({
      user_id:req.body.userId,
      map_id:results[0]
    }).then(function(results){
      res.send(results)
    })
  })
})
module.exports = router;


// return knex.select().table('maps').where("id", results.map_id)
// .then(function(results){
//   res.send(results);
// })
