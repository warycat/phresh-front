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
  , ss_cat:function(cat){
      console.log('ss_cat');
      SS.getItemsInCat(cat,function(products){
        $.each(products,function(index,product){
          var item = {SRC:{S:'ShopStyle'}};
          $.each(product,function(key,value){
            if(typeof value === 'object'){
              switch(key){
              case 'retailer':
                item.retailerID = {S:value.id};
                item.retailerNAME = {S:value.name};
                break;
              case 'brand':
                item.brandID = {S:value.id};
                item.brandNAME = {S:value.name};
                break;
              case 'image':
                item.imageID = {S:value.id};
                item.imageSIZES = {S:JSON.stringify(value.sizes)};
                break;
              case 'alternateImages':
                item.alternateImages = {SS:[]};
                $.each(value,function(index,image){
                  item.alternateImages.SS.push(JSON.stringify(image));
                });
                break;
              case 'colors':
                item.colors = {SS:[]};
                $.each(value,function(index,color){
                  item.colors.SS.push(JSON.stringify(color));
                });
                break;
              case 'sizes':
                item.sizes = {SS:[]};
                $.each(value,function(index,size){
                  item.sizes.SS.push(JSON.stringify(size));
                });
                break;
              case 'categories':
                item.categories = {SS:[]};
                $.each(value,function(index,category){
                  item.categories.SS.push(JSON.stringify(category));
                });
                break;
              case 'badges':
                item.badges = {SS:[]};
                $.each(value,function(index,category){
                  item.badges.SS.push(JSON.stringify(category));
                });
                break;
              default:
                console.log(key);
              }
              // console.log(key);
            }else{
              switch(key){
              case 'id':
                item[key] = {'S':'ss' + value};
                break;
              default:
                item[key] = {'S': '' + value};
              }
            }
          });
          console.log(item);
        });
      });
    }
  }
});
