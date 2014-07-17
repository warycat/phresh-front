App.LoginController = Ember.ObjectController.extend({
  actions:{
    fb_login:function(){
      console.log('fb_login');
      FB.login(function(response){
        console.log(response);
        FB.api('/me', function (response) {
          console.log(response);
          var user = {};
          $.each(response,function(key){
            user[key] = {S: response[key] + ''};
          });
          Api.putUser(user,function(data){
            console.log(data);
            window.location = '/index.html#discovery';
          });
        });
      },{scope:'public_profile,email,user_friends'});
    }
  }
});