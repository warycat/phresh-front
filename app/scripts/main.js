console.log('\'Allo \'Allo!');

var Phresh = Ember.Application.create();

Phresh.Router.map(function () {
  this.resource('splash');
  this.resource('posts');
});

$(function(){
  $('#FBButton').click( function () {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '{your-app-id}',
        xfbml: true,
        version: 'v2.0'
      });
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  });
});