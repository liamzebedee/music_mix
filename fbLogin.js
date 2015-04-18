var graph = require('fbgraph');
var Parse = require('parse').Parse;
Parse.initialize("6g5rdM4QiKNQwXMCrr8tvEuHpad7mdYsjbgLRUhA", "KKRi6LU0KSyfVuKxA7xjfVTBCUpKg8vNVdjEyZGz");

module.exports.process = function(request, response) {
  var access_token = request.query.token;
  var user_details;
  var musicPages;
  graph.setAccessToken(access_token);

  graph.get('/me', { fields: 'name,first_name,last_name,id' }, function(err, res) {
    user_details = res;

    graph.get('/me/music', {}, function(err, firstMusicRes) {
      musicPages = firstMusicRes.data;
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

      // create user
      var User = Parse.Object.extend("User");
      var user;
      var user_query = new Parse.Query(User);
      user_query.equalTo("id", user_details.id);
      user_query.find({success: function(found) {
        user = found;

        if(user == undefined || !user) {
          user = new User();
          user.set('first_name', user_details.first_name);
          user.set('last_name', user_details.last_name);
          user.set('id', user_details.id);
          user.set('music', musicPages);
          user.save(null, {
            success: function(user) {
              // Execute any logic that should take place after the object is saved.
              console.log('New object created with objectId: ' + user.id);
            },
            error: function(user, error) {
              // Execute any logic that should take place if the save fails.
              // error is a Parse.Error with an error code and message.
              console.log('Failed to create new object, with error code: ' + error.message);
            }
          });
        }
        
        response.send(user);
      }});

      
    });

  });

  


};