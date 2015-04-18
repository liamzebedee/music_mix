

// This is called with the results from from FB.getLoginStatus().
  var statusChangeCallback = function(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      //doLogin();
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      //doLogin();
    }
  }

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
     FB.api('/me/music', function(response) {
     console.log('Good to see you, ' + JSON.stringify(response) + '.');
     });
   } else {
     console.log('User cancelled login or did not fully authorize.');
   }
 }, {display: 'touch', response_type: 'token', scope: 'public_profile,email,user_likes'});

  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  var checkLoginState = function() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '474840302668268',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });



  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};