console.log('\'Allo \'Allo!');

var Phresh = Ember.Application.create();

Phresh.Router.map(function () {
  this.route('splash',{path:"/splash"});
  this.route('posts',{path:"/posts"});
});



$(function () {
  $('#FBButton').click(function () {

  });
});