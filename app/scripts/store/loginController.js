App.LoginRoute = Ember.Route.extend({

});

App.LoginController = Ember.ObjectController.extend({
  actions:{
    fb_login:function(){
      console.log('fb_login');
      FB.login(function(response){
        console.log(response);
        FB.api('/me', function (response) {
          App.me = response;
          var user = {};
          $.each(response,function(key){
            user[key] = {S: response[key] + ''};
          });
          Api.putUser(user,function(data){
            console.log(data);
            window.location = '/index.html#/discovery/' + response.gender;
          });
        });
      },{scope:'public_profile,email,user_friends,publish_actions'});
    }
  }
});