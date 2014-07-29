$.ajaxSetup({
  contentType : 'application/json',
  processData : false
});

$.ajaxPrefilter( function(options) {
  if (options.data){
    options.data=JSON.stringify(options.data);
  }
});






// App.LogoutRoute = Ember.Route.extend({
// 	afterModel: function(){
// 		console.log('logout');
// 		FB.logout(function(response) {
// 		  // user is now logged out
// 		  console.log(response.status);
// 		});
// 	}
// });

// App.TutorialRoute = Ember.Route.extend({
// 	afterModel: function(){
// 		console.log('tutorial');
// 	}
// });

// App.DiscoveryRoute = Ember.Route.extend({
//   model:function(){
//     return Ember.$.getJSON('http://node.whatisphresh.com/scan');
//   }
// });

// App.swipeView = Ember.View.extend({
//   templateName: 'swipe',

//   swipeOptions: {
//     direction: Em.OneGestureDirection.Left | Em.OneGestureDirection.Right,
//     cancelPeriod: 100,
//     swipeThreshold: 10
//   },

//   touchMove: function(event) {
//     event.preventDefault();
//   },

//   swipeEnd: function(recognizer, evt) {
//     var direction = recognizer.get('swipeDirection');
//     console.log(evt);
//     if (direction === Em.OneGestureDirection.Right) {
//       console.log('right');
//     } else if (direction === Em.OneGestureDirection.Left) {
//       console.log('left');
//     }
//   }
// });

// App.panView = Ember.View.extend({
//   templateName: 'pan',
//   panOptions: {
//     numberOfRequiredTouches: 1
//   },

//   didInsertElement:function(){
// 		// console.log('didInsertElement');
// 		// getMoreItems(10,true);
//   },
  
//   touchStart: function(evt){
//     var originalEvent = evt.originalEvent;
//     console.log(originalEvent);
//     sum = 0;
//   },

//   touchEnd: function(){
//     sum = 0;
//     $('.top').css({
//       'left': (10 + sum/10) + '%',
//       'opacity': 1,
//       '-webkit-transform': 'rotate(' + (sum)/40 + 'deg)',
//       'transform': 'rotate(' + (sum)/40 + 'deg)',
//       'border-color':'#000000',
//       'border-width':'1px'
//     });
//     getNextOnline(0, false);
//   },

//   panChange: function(rec) {
//     var val = rec.get('translation');
//     sum += val.x;
//     $('.top').css({
//       'left': (10 + sum/10) + '%',
//       'opacity': 1- Math.abs(sum/1000),
//       '-webkit-transform': 'rotate(' + (sum)/40 + 'deg)',
//       'transform': 'rotate(' + (sum)/40 + 'deg)',
//       'border-color':(sum<0)?'#EF4242':'#2eF131',
//       'border-width':'30px'
//     });
//   },

//   touchMove: function(event) {
//     event.preventDefault();
//   }

// });

// $(function () {
//   $('#FBButton').click(function () {
//     console.log('click');
//     FB.login(function(response){
//       console.log(response);
//     },{scope:'public_profile,email,user_friends'});
//   });
// });

