App.IndexController = Ember.ObjectController.extend({
  model:function(){
    console.log('in model');
    return null;
  }
});

App.IndexRoute = Ember.Route.extend({
  afterModel: function(){
    console.log('index');
  }
});
