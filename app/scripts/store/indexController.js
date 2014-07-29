App.IndexRoute = Ember.Route.extend({
  beforeModel: function(){
    if(!Modernizr.iphone){
      App.landing();
    }
  }
});

App.IndexController = Ember.ObjectController.extend({
  model:function(){
    console.log('in model');
    return null;
  }
});


