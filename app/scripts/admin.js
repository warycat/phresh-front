var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Router.map(function () {
  this.resource('index',{path:'/'});

  this.resource('ss');
  this.resource('api');
  this.resource('enter');
  this.resource('item');
  this.resource('items');
});
