document.ontouchmove = function(event){
  event.preventDefault();
};

var App = Ember.Application.create();

App.Router.map(function () {
	this.route('index',{path:'/'});
  this.route('splash');
  this.route('posts');
  this.route('tutorial');
  this.route('discovery');
  this.route('logout');
  this.route('showroom');
  this.route('api');
});

App.ApiRoute = Ember.Route.extend({

});

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

App.IndexRoute = Ember.Route.extend({
	afterModel: function(){
		console.log('index');
	}
});

App.LogoutRoute = Ember.Route.extend({
	afterModel: function(){
		console.log('logout');
		FB.logout(function(response) {
		  // user is now logged out
		  console.log(response.status);
		});
	}
});

App.TutorialRoute = Ember.Route.extend({
	afterModel: function(){
		console.log('tutorial');
	}
});

App.DiscoveryRoute = Ember.Route.extend({
  model:function(){
    return Ember.$.getJSON('http://node.whatisphresh.com/scan');
  }
});

App.swipeView = Ember.View.extend({
  templateName: 'swipe',

  swipeOptions: {
    direction: Em.OneGestureDirection.Left | Em.OneGestureDirection.Right,
    cancelPeriod: 100,
    swipeThreshold: 10
  },

  touchMove: function(event) {
    event.preventDefault();
  },

  swipeEnd: function(recognizer, evt) {
    var direction = recognizer.get('swipeDirection');
    console.log(evt);
    if (direction === Em.OneGestureDirection.Right) {
      console.log('right');
    } else if (direction === Em.OneGestureDirection.Left) {
      console.log('left');
    }
  }
});

App.panView = Ember.View.extend({
  templateName: 'pan',
  panOptions: {
    numberOfRequiredTouches: 1
  },
  didInsertElement:function(){
		// console.log('didInsertElement');
		// getMoreItems(10,true);
  },
  touchStart: function(evt){
    var originalEvent = evt.originalEvent;
    console.log(originalEvent);
    sum = 0;
  },

  touchEnd: function(){
    sum = 0;
    $('.top').css({
      'left': (10 + sum/10) + '%',
      'opacity': 1,
      '-webkit-transform': 'rotate(' + (sum)/40 + 'deg)',
      'transform': 'rotate(' + (sum)/40 + 'deg)',
      'border-color':'#000000',
      'border-width':'1px'
    });
    getNextOnline(0, false);
  },

  panChange: function(rec) {
    var val = rec.get('translation');
    sum += val.x;
    $('.top').css({
      'left': (10 + sum/10) + '%',
      'opacity': 1- Math.abs(sum/1000),
      '-webkit-transform': 'rotate(' + (sum)/40 + 'deg)',
      'transform': 'rotate(' + (sum)/40 + 'deg)',
      'border-color':(sum<0)?'#EF4242':'#2eF131',
      'border-width':'30px'
    });
  },

  touchMove: function(event) {
    event.preventDefault();
  }

});

$(function () {
  $('#FBButton').click(function () {
		console.log('click');
		FB.login(function(response){
			console.log(response);
		},{scope:'public_profile,email,user_friends'});
  });
});

