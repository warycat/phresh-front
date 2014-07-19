App.ShowroomRoute = Ember.Route.extend({
  model:function(params){
    return Api.getUserItems(params.uid);
  }
, setupController:function(controller, model){
    controller.model = model;
    var items = {};
    async.each(
      model.Items
    , function(item,callback){
        if(item.keep){
          Api.getItem(item.iid.S,'womens',function(data){
            var sizes = JSON.parse(data.Item.imageSIZES.S);
            items[item.iid.S] = sizes.IPhone.url;
            callback();
          });
        }
      }
    , function(){
        $.each(items,function(index,item){
          $('<div class="item"><img style="width:10em;" src="' + item + '" /></div>').appendTo($('#list'));
        });
      }
    );
  }
});

App.ShowroomController = Ember.ObjectController.extend((function(){
  var items = {};
  
  function exit(){
    this.transitionToRoute('discovery');
  }

  function share(){
    console.log(itemsArray());
  }

  return {
    items:items
  , actions:{
      exit:exit
    , share:share
    }
  };
})());