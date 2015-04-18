module.exports.process = function(request, response) {
	var data = JSON.parse(request);
	/*
	{
		location: {
			lat: 121,
			lng: 121
		}

	}
	*/

	// update user location
	var usersWeWouldLike = [];

	

	// users_wed_like = []

	// Locations.where(DISTANCE EQUATION < 5km):
	// foreach user:
	// 	include = false
	// 	shared_interests = []
	// 	foreach interest:
	// 		if thisuser.hasinterest(interest):
	// 	if(include) users_wed_like.push(user)
};