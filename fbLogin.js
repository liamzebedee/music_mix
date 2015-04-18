var conf = {
    client_id:      '474840302668268'
  , client_secret:  'f0613480861a06dc54ac517b5730d5c4'
  , scope:          'email, user_about_me'
  , redirect_uri:   'http://listenhere.herokuapp.com/auth/facebook'
};
var graph     = require('fbgraph');


module.exports.process = function(request, response) {
  // we don't have a code yet
  // so we'll redirect to the oauth dialog
  if (!req.query.code) {
    var authUrl = graph.getOauthUrl({
        "client_id":     conf.client_id
      , "redirect_uri":  conf.redirect_uri
      , "scope":         conf.scope
    });

    if (!request.query.error) { //checks whether a user denied the app facebook login/permissions
      response.redirect(authUrl);
    } else {  //req.query.error == 'access_denied'
      response.send('access denied');
    }
    return;
  }

  // code is set
  // we'll send that and get the access token
  graph.authorize({
      "client_id":      conf.client_id
    , "redirect_uri":   conf.redirect_uri
    , "client_secret":  conf.client_secret
    , "code":           request.query.code
  }, function (err, facebookRes) {
    console.log('code: ' + request.query.code);
    graph.get("me/music", function(err, data) { console.log(data); response.send(data); });
  });
};

// var express   = require('express')
//   , graph     = require('fbgraph')
//   , app       = module.exports = express.createServer();

// var FB_APP_ID = 474840302668268;
// var FB_SECRET = "f0613480861a06dc54ac517b5730d5c4";

// // this should really be in a config file!
// var conf = {
//     client_id:      '474840302668268'
//   , client_secret:  'f0613480861a06dc54ac517b5730d5c4'
//   , scope:          'email, user_about_me'
//   , redirect_uri:   'http://listenhere.herokuapp.com/app/'
// };

// // Configuration

// app.configure(function(){
//   app.set('views', __dirname + '/views');
//   app.set('view engine', 'jade');
//   app.use(express.bodyParser());
//   app.use(express.methodOverride());
//   app.use(app.router);
//   app.use(express.static(__dirname + '/public'));
// });



// app.configure('production', function(){
//   app.use(express.errorHandler());
// });

// // Routes

// app.get('/', function(req, res){
//   res.render("index", { title: "click link to connect" });
// });

// app.get('/auth/facebook', function(req, res) {

//   // we don't have a code yet
//   // so we'll redirect to the oauth dialog
//   if (!req.query.code) {
//     var authUrl = graph.getOauthUrl({
//         "client_id":     conf.client_id
//       , "redirect_uri":  conf.redirect_uri
//       , "scope":         conf.scope
//     });

//     if (!req.query.error) { //checks whether a user denied the app facebook login/permissions
//       res.redirect(authUrl);
//     } else {  //req.query.error == 'access_denied'
//       res.send('access denied');
//     }
//     return;
//   }

//   // code is set
//   // we'll send that and get the access token
//   graph.authorize({
//       "client_id":      conf.client_id
//     , "redirect_uri":   conf.redirect_uri
//     , "client_secret":  conf.client_secret
//     , "code":           req.query.code
//   }, function (err, facebookRes) {
//     res.redirect('/UserHasLoggedIn');
//   });


// });


// // user gets sent here after being authorized
// app.get('/UserHasLoggedIn', function(req, res) {
//   res.render("index", { title: "Logged In" });
// });


// var port = process.env.PORT || 3000;
// app.listen(port, function() {
//   console.log("Express server listening on port %d", port);
// });