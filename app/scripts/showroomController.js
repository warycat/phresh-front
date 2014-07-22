App.ShowroomRoute = Ember.Route.extend({
  model:function(params){
    return Api.getUserItems(params.uid);
  }
, setupController:function(controller, model){
    controller.model = model;
    controller.items = model.Items;
    $.each(model.Items,function(index,item){
      Api.getItem(item.iid.S,function(data){
        var sizes = JSON.parse(data.Item.imageSIZES.S);
        $('#'+item.iid.S).attr('src',sizes.Original.url);
      });
    });
  }
});

App.ShowroomController = Ember.ObjectController.extend((function(){
  var items = {};
  
  function exit(){
    console.log('exit');
    if(App.me){
      this.transitionToRoute('/discovery/' + App.me.gender );
    }else{
      this.transitionToRoute('login');
    }
  }

  function share(){
  }

  function item(iid){
    console.log('item',iid);
    this.transitionToRoute('/item/'+iid);
  }

  return {
    items:items
  , actions:{
      exit:exit
    , share:share
    , item:item
    }
  };
})());