
Listen Here Manifesto ;)
========================
Synopsis
--------
Using Heroku to host Node.JS
Node.JS will statically serve the website interface
- The website interface is going to use various libraries for responsive design and application functionality.
- All buttons and functionality will be stubbed until the back end functions.
Node.JS coupled with Socket.IO will provide chat functionality and live updating of the clients with the Facebook functionality.

http://www.last.fm/api

UX Pathway
----------
1 - Login user
2 - Get their info (name, music interests)
3 - Parse info

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

4 - Add your own location

	Locations:
		location: {
			lat: 12312,
			lng: 12312,
			user: 12321321321
			last_here: 123213213,
		}

5 - Find users within 5km of you

	users_wed_like = []

	Locations.where(DISTANCE EQUATION < 5km):
		foreach user:
			include = false
			shared_interests = []
			foreach interest:
				if thisuser.hasinterest(interest):
			if(include) users_wed_like.push(user)


6 - The app does the REST ;)


UX Pathway - Sub Chatroom
-------------------------
Basic interface that collects the list of user ids, and sends a message to the server

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