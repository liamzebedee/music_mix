var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));



var FB_APP_ID = 474840302668268;
var FB_SECRET = "f0613480861a06dc54ac517b5730d5c4";

var PARSE_APP_ID = '6g5rdM4QiKNQwXMCrr8tvEuHpad7mdYsjbgLRUhA';
var PARSE_JS_KEY = 'KKRi6LU0KSyfVuKxA7xjfVTBCUpKg8vNVdjEyZGz';

/*
1. login user
2. get their info (name, music interests)
3. parse info

	"category": "Musician/band", 
      "name": "Alt-J", 
      "id": "200859576615757", 
      "created_time": "2015-04-18T02:22:263+0000"

add only if category == 'Musician/band'

	User:
		name: 
		profile_pic: 
		music: [
			{}
		]


4. add your own location

	Locations:
		location: {
			lat: 12312,
			lng: 12312,
			user: 12321321321
			last_here: 123213213,
		}

5. find users within 5km of you

users_wed_like = []

Locations.where(DISTANCE EQUATION < 5km):
	foreach user:
		include = false
		shared_interests = []
		foreach interest:
			if thisuser.hasinterest(interest):
		if(include) users_wed_like.push(user)


6. the app does the rest
*/

/*
chat room:

basic interface that collects the list of user ids, and sends a message to the server

/sendmsg:
{
	to: [],
	genre: "",
	msg: "HEY WE WOULD EB COOL TOGETHER"
}

/messages
{
	messages: [
		genre: "",
		from: 123213213,
		msg: "hey guys"
	]
}
*/

var findNearMe = require('./findNearMe.js');
var fbLogin = require('./fbLogin.js');
var chat = require('./chat.js');

app.get('/', function(request, response) {
	response.send('/hack');
});

app.get('/fb_login', function(request, response) {
	fbLogin.process(request, response);
});

app.get('/find_near_me', function(request, response) {
	findNearMe.process(request, response);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})