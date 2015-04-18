function redirectWithToken(token) {
	window.location = 'http://listenhere.herokuapp.com/auth/facebook/?token='+token;
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
      var access_token =   FB.getAuthResponse()['accessToken'];
      console.log('Access Token = '+ access_token);
      redirectWithToken(access_token);
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      //doLogin();
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      //doLogin();
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
     FB.api('/me/music', function(response) {
     console.log('Good to see you, ' + JSON.stringify(response) + '.');
     });
   } else {
     console.log('User cancelled login or did not fully authorize.');
   }
 }, {display: 'touch', response_type: 'token', scope: 'public_profile,email,user_likes' });

}
