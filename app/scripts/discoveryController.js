App.DiscoveryController = Ember.ObjectController.extend({
  model:function(){
    console.log('model');
    return null;
  }
, actions:{
    trash:function(){
      console.log('trash');
    }
  , info_btn:function(){
      console.log('info_btn');
      this.transitionToRoute('discovery.description');
    }
  , info_img:function(){
      console.log('info_img');
      this.transitionToRoute('discovery.description');
    }
  , keep:function(){
      console.log('keep');
    }
  , showroom:function(){
      console.log('showroom');
      this.transitionToRoute('showroom');
    }
  }
});

// App.DiscoveryRoute = Ember