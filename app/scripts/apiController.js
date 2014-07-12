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
      Api.putItem({id:{S:'123'},name:{S:'dress'}},function(data){
        console.log(data);
      });
    }
  , get_item:function(){
      console.log('get_item');
      Api.getItem('123',function(data){
        console.log(data);
      });
    }
  , get_items:function(){
      console.log('get_items');
      Api.getItems(function(data){
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
      Api.postItem('123',body,function(data){
        console.log(data);
      });
    }
  , delete_item:function(){
      console.log('delete_item');
      Api.deleteItem('123',function(data){
        console.log(data);
      });
    }
  , put_list:function(){
      console.log('put_list');
      Api.putList({id:{S:'123'},name:{S:'young'},ids:{SS:['123','234']}},function(data){
        console.log(data);
      });
    }
  , get_list:function(){
      console.log('get_list');
      Api.getList('123',function(data){
        console.log(data);
      });
    }
  , get_lists:function(){
      console.log('get_lists');
      Api.getLists(function(data){
        console.log(data);
      });
    }
  , post_list:function(){
      console.log('post_list');
      var body = {
        ids:{
          Action:'ADD'
        , Value:{SS:['345']}
        }
      };
      Api.postList('123',body,function(data){
        console.log(data);
      });
    }
  , delete_list:function(){
      console.log('delete_list');
      Api.deleteList('123',function(data){
        console.log(data);
      });
    }
  }
});
