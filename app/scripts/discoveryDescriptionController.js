App.DiscoveryDescriptionController = Ember.ObjectController.extend({
  action:{
    exit:function(){
      this.transitionToRoute('discovery');
    }
  }
});