var graph = require('fbgraph');
var Parse = new require('./parse-api.js');
Parse.initialize("6g5rdM4QiKNQwXMCrr8tvEuHpad7mdYsjbgLRUhA", "KKRi6LU0KSyfVuKxA7xjfVTBCUpKg8vNVdjEyZGz");

module.exports.process = function(request, response) {
  var access_token = request.query.token;
  var user_details;
  graph.setAccessToken(access_token);

  graph.get('/me', { fields: 'about,name,first_name,last_name,id' }, function(err, res) {
    user_details = res;
  });

  
  graph.get('/me/music', {}, function(err, firstMusicRes) {
      var musicPages = firstMusicRes.data;
      var paging = firstMusicRes.paging;

      var i = 0;
      while(paging && paging.next) {
        if(i === 3) break; // test
        graph.get(paging.next, function(err, res) {
          paging = res.paging;
          musicPages.concat(res.data);
        });
        i += 1;
      }

      console.log(musicPages);
    });

  // create user
  var User = Parse.Object.extend("User");
  var newUser = new User();
  var user_query = new Parse.Query(User);
  user_query.equalTo("id", user_details);
  query.find({success: function(found) {
    console.log(JSON.stringify(found));
  }});

  var user_exists = false;
  if(!user_exists) {
    newUser.set('first_name', user_details.first_name);
    newUser.set('last_name', user_details.last_name);
    newUser.set('id', user_details.id);
  }

};