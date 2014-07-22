App.ItemDescriptionController = Ember.ObjectController.extend({
  needs:['item']
, actions:{
    exit:function(){
      this.transitionToRoute('item');
    }
  }
});