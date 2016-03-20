
exports.seed = function(knex, Promise) {
  return knex('user_maps').del()
    .then(function(){
      return knex('users').del()
    }).then(function(){
      return knex('maps').del();
    }).then(function(){
      return knex.raw('ALTER SEQUENCE "user_maps_id_seq" RESTART WITH 1;');
    }).then(function(){
      return knex.raw('ALTER SEQUENCE "users_id_seq" RESTART WITH 1;');
    }).then(function(){
      return knex.raw('ALTER SEQUENCE "maps_id_seq" RESTART WITH 1;');
    }).then(function(){
      return Promise.all([
        knex('users').insert({
          user_name:"Eli"
        }),
        knex('users').insert({
          user_name:"Josh"
        })
      ])
    }).then(function(){
      return Promise.all([
        knex('maps').insert({
          title:"bakcyard",
          note:"pretty easy",
          location:{12:134}
        }),
        knex('maps').insert({
          title:"Westgate",
          note:"little harder",
          location:{13:1234}
        })
      ])
    }).then(function(){
      return Promise.all([
        knex('user_maps').insert({
          map_id:1,
          user_id:1
        }),
        knex('user_maps').insert({
          map_id:2,
          user_id:2
        })
      ])
    })
};
