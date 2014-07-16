App.ApiController = Ember.ObjectController.extend({
  actions:{
    put_user:function(){
      console.log('put_user');
      Api.putUser({id:{S:'123'},name:{S:'lauren'}},function(data){
        console.log(data);
      });
    }
  , get_user:function(){
      console.log('get_user');
      Api.getUser('123',function(data){
        console.log(data);
      });
    }
  , get_users:function(){
      console.log('get_users');
      Api.getUsers(function(data){
        console.log(data);
      });
    }
  , post_user:function(){
      console.log('post_user');
      var body = {
        firstName:{
          Action:'PUT'
        , Value:{S:'Lauren'}
        }
      };
      Api.postUser('123',body,function(data){
        console.log(data);
      });
    }
  , delete_user:function(){
      console.log('delete_user');
      Api.deleteUser('123',function(data){
        console.log(data);
      });
    }
  , put_item:function(){
      console.log('put_item');
      Api.putItem({id:{S:'123'},name:{S:'dress'}},'mens',function(data){
        console.log(data);
      });
    }
  , get_item:function(){
      console.log('get_item');
      Api.getItem('123','mens',function(data){
        console.log(data);
      });
    }
  , get_items:function(){
      console.log('get_items');
      Api.getItems('mens',function(data){
        console.log(data);
      });
    }
  , post_item:function(){
      console.log('post_item');
      var body = {
        size:{
          Action:'PUT'
        , Value:{S:'large'}
        }
      };
      Api.postItem('123',body,'mens',function(data){
        console.log(data);
      });
    }
  , delete_item:function(){
      console.log('delete_item');
      Api.deleteItem('123','mens',function(data){
        console.log(data);
      });
    }
  , put_list_user:function(){
      console.log('put_list_user');
      Api.putListUser('list123','user123',function(data){
        console.log(data);
      });
    }
  , get_list_user:function(){
      console.log('get_list_user');
      Api.getListUser('list123','user123',function(data){
        console.log(data);
      });
    }
  , get_list_users:function(){
      console.log('get_list_users');
      Api.getListUsers('list123',function(data){
        console.log(data);
      });
    }
  , get_lists_users:function(){
      console.log('get_lists_users');
      Api.getListsUsers(function(data){
        console.log(data);
      });
    }
  , delete_list_user:function(){
      console.log('delete_list_user');
      Api.deleteListUser('list123','user123',function(data){
        console.log(data);
      });
    }
  , fb_login:function(){
      console.log('fb_login');
      FB.login(function(response){
        console.log(response);
      },{scope:'public_profile,email,user_friends'});
    }
  , fb_logout:function(){
      console.log('fb_logout');
      FB.logout(function(response){
        console.log(response);
      });
    }
  , fb_register:function(){
      console.log('fb_register');
      FB.api('/me', function (response) {
        console.log(response);
        var user = {};
        $.each(response,function(key){
          user[key] = {S: response[key] + ''};
        });
        Api.putUser(user,function(data){
          console.log(data);
        });
      });
    }
  , fb_friends:function(){
      console.log('fb_friends');
      FB.api('/me/friends', function (response) {
        console.log(response);
      });
    }
  , fb_pagetab:function(){
      console.log('fb_pagetab');
      FB.ui({
        method: 'pagetab',
        redirect_uri: 'YOUR_URL'
      }, function(response){
        console.log(response);
      });
    }
  , fb_share:function(){
      console.log('fb_share');
      var params = {
        method: 'share_open_graph',
        action_type: 'og.likes',
        action_properties: JSON.stringify({
          object:'https://developers.facebook.com/docs/',
        })
      };
      FB.ui(params, function(response){
        console.log(response);
      });
    }
  }
});
