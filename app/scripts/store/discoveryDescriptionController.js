App.DiscoveryDescriptionController = Ember.ObjectController.extend({
  needs:['discovery']
, actions:{
    exit:function(){
      this.transitionToRoute('discovery');
    }
  }
});