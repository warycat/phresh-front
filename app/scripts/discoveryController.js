App.DiscoveryRoute = Ember.Route.extend({
  model: function(){
    return Api.getListItems('all-womens');
  }
, setupController:function(controller, model){
    controller.set('model',model);
    model.Items = _.shuffle(model.Items);
    if(controller.get('topImgURL') === ''){
      Api.getItem(model.Items[0].iid.S,'womens',function(data){
        var sizes = JSON.parse(data.Item.imageSIZES.S);
        controller.set('topImgURL',sizes.IPhone.url);
      });
    }
  }
});

App.DiscoveryController = Ember.ObjectController.extend({
  info_text:'i'
, topImgURL:''
, images:[]
, current:0
, actions:{
    trash:function(){
      var model = this.get('model');
      console.log(model);
      console.log('trash');
      this.set('current',this.get('current')+1);
      var self = this;
      Api.getItem(model.Items[this.get('current')].iid.S,'womens',function(data){
        var sizes = JSON.parse(data.Item.imageSIZES.S);
        self.set('topImgURL',sizes.IPhone.url);
      });

    }
  , info_btn:function(){
      console.log('info_btn');
      var info_text = this.get('info_text');
      if('i' === info_text){
        this.set('info_text','x');
        this.transitionToRoute('discovery.description');
      }else if('x' === info_text){
        this.set('info_text','i');
        this.transitionToRoute('discovery');
      }
    }
  , info_img:function(){
      console.log('info_img');
      this.set('current',this.get('current')+1);
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