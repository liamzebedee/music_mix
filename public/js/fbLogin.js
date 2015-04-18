function redirectWithToken(token) {
	window.location = 'http://listenhere.herokuapp.com/login/?token='+token;
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '474840302668268',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });

  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      $('#status').text('Logged in from your Facebook - redirecting to app!')
      var access_token =   FB.getAuthResponse()['accessToken'];
      console.log('Access Token = '+ access_token);
      redirectWithToken(access_token);
    } else {
      $('#status').text("Please login with Facebook to continue :-)");
      $('#fblogin').show();
    }
  });
};


var testAPI = function() {
	FB.api('/me/music', function(response) {
     console.log('Good to see you, ' + JSON.stringify(response) + '.');
     });
}

var doLogin = function() {
	FB.login(function(response) {
   if (response.authResponse) {
     var access_token =   FB.getAuthResponse()['accessToken'];
     console.log('Access Token = '+ access_token);
     redirectWithToken(access_token);
   } else {
     console.log('User cancelled login or did not fully authorize.');
   }
 }, {response_type: 'token', scope: 'public_profile,user_likes' });
//user_actions:music
}
