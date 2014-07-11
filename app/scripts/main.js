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
    }
  , get_user:function(){
      console.log('get_user');
    }
  , get_users:function(){
      console.log('get_users');
    }
  , post_user:function(){
      console.log('post_user');
    }
  , delete_user:function(){
      console.log('delete_user');
    }
  , put_item:function(){
      console.log('put_item');
    }
  , get_item:function(){
      console.log('get_item');
    }
  , get_items:function(){
      console.log('get_items');
    }
  , post_item:function(){
      console.log('post_item');
    }
  , delete_item:function(){
      console.log('delete_item');
    }
  , put_list:function(){
      console.log('put_list');
    }
  , get_list:function(){
      console.log('get_list');
    }
  , get_lists:function(){
      console.log('get_lists');
    }
  , post_list:function(){
      console.log('post_list');
    }
  , delete_list:function(){
      console.log('delete_list');
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