var Parse = new require('./parse-api.js');
Parse.initialize("6g5rdM4QiKNQwXMCrr8tvEuHpad7mdYsjbgLRUhA", "KKRi6LU0KSyfVuKxA7xjfVTBCUpKg8vNVdjEyZGz");

module.exports.process = function(request, response) {
	var data = JSON.parse(request);
	/*
	{
		location: {
			lat: 121,
			lng: 121
		},
		user_id: 123213213213

	}
	*/

	// Find user, update their location
	var user_query = Parse.Query("User");
	user_query.equalTo('id', data.user_id);
	var user = null;
	query.find({success: function(found) {
		user = found;
	  	var user_location = new Parse.GeoPoint(data.location);
		user.set('location', user_location);

		// Find nearby users
		var users_query = new Parse.Query("User");
		var nearby_users = [];
		var DISTANCE = 20; // km
		users_query.withinKilometers("location", user_location, DISTANCE);
		users_query.limit(1000);
		users_query.containedIn('music', user.get('music'));
		users_query.find().then(function(found) {
		  	nearby_users = found;
		  	res.setHeader('Content-Type', 'application/json');
	    	res.end(JSON.stringify(nearby_users));
		});
	}});
};