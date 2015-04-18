var Parse = require('parse').Parse;
Parse.initialize("6g5rdM4QiKNQwXMCrr8tvEuHpad7mdYsjbgLRUhA", "KKRi6LU0KSyfVuKxA7xjfVTBCUpKg8vNVdjEyZGz");

module.exports.process = function(request, response) {
	var data = JSON.parse(request.query.q);

	/*
	{
		location: {
			lat: 121,
			lng: 121
		},
		fbid: 123213213213

	}
	*/

	// Find user, update their location
	var user_query = Parse.Query("User");
	user_query.equalTo('fbid', data.user_id);
	var user = null;
	query.find({success: function(found) {
		user = found;
	  	var user_location = new Parse.GeoPoint(data.location);
		user.set('location', user_location);
		user.save();

		// Find nearby users
		var users_query = new Parse.Query("User");
		var nearby_users = [];
		var DISTANCE = 20; // km
		users_query.withinKilometers("location", user_location, DISTANCE);
		users_query.limit(1000);
		users_query.containedIn('music', user.get('music'));
		users_query.find({success: function(found) {
		  	nearby_users = found;
		  	res.setHeader('Content-Type', 'application/json');
	    	res.send(JSON.stringify(nearby_users));
		}});
	}});
};