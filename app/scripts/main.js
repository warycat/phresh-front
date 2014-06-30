console.log('\'Allo \'Allo!');

var App = Ember.Application.create();

App.Router.map(function () {
	this.route('index',{path:'/'});
  this.route('splash');
  this.route('posts');
  this.route('tutorial');
  this.route('discovery');
  this.route('logout');
  this.route('showroom');
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

  panChange: function(rec, evt) {
		console.log(evt);
    // var SMOOTH_FACTOR = 5,
        // x, y,
    var val = rec.get('translation');
        // canvasContext = this.get('canvasContext'),
        // image = this.image;

    // x = Math.min(this.x + SMOOTH_FACTOR * val.x,
    //   image.width - canvasContext.canvas.width * this.scale);

    // y = Math.min(this.y + SMOOTH_FACTOR * val.y,
    //   image.height - canvasContext.canvas.height * this.scale);

    // x = Math.max(x, 0);
    // y = Math.max(y, 0);

    // this.x = x;
    // this.y = y;

    // this.refreshImage();
    console.log(val.x, val.y);
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