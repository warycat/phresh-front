App.DiscoveryRoute = Ember.Route.extend({
  model: function(params){
    if(params.gender !== 'male'){
      return Api.getListItems('all-womens');
    }else{
      return Api.getListItems('all-mens');
    }
  }
, setupController:function(controller, model){
    controller.set('model',model);
    console.log(model);
    model.Items = _.shuffle(model.Items);
    if(controller.get('topImgURL') === ''){
      Api.getItem(model.Items[0].iid.S,function(data){
        controller.set('currentItem',data.Item);
        var sizes = JSON.parse(data.Item.imageSIZES.S);
        controller.set('topImgURL',sizes.IPhone.url);
      });
    }
  }
});

App.DiscoveryController = Ember.ObjectController.extend((function(){
  var info_text = 'i';
  var topImgURL = '';
  var images = [];
  var current = 0;
  var currentItem = {};
  
  function share(){
    console.log('share func');
  }

  function next(){
    var model = this.get('model');
    this.set('current',this.get('current')+1);
    var self = this;
    Api.getItem(model.Items[this.get('current')].iid.S,function(data){
      self.set('currentItem',data.Item);
      var sizes = JSON.parse(data.Item.imageSIZES.S);
      self.set('topImgURL',sizes.IPhone.url);
    });
  }

  function trash(){
    console.log('trash');
    next.apply(this);
  }

  function keep(){
    console.log('keep');
    var self = this;
    var iid = this.get('currentItem').id.S;
    var uid = FB.getUserID();
    var body = {
      keep:{
        Action:'PUT'
      , Value:{S:(new Date()).toISOString()}
      }
    };
    Api.postUserItem(uid,iid,body,function(){
      next.apply(self);
    });
  }

  function popinfo(){
    var info_text = this.get('info_text');
    if('i' === info_text){
      this.set('info_text','x');
      this.transitionToRoute('discovery.description');
    }else if('x' === info_text){
      this.set('info_text','i');
      this.transitionToRoute('discovery');
    }
  }

  function info_btn(){
    console.log('info_btn');
    popinfo.apply(this);
  }

  function info_img(){
    console.log('info_img');
    popinfo.apply(this);
  }

  function showroom(){
    console.log('showroom');
    this.transitionToRoute('/showroom/'+FB.getUserID());
  }

  return {
    info_text:info_text
  , current:current
  , currentItem:currentItem
  , topImgURL:topImgURL
  , images:images
  , actions:{
      share:share
    , keep:keep
    , trash:trash
    , info_img:info_img
    , info_btn:info_btn
    , showroom:showroom
    }
  };
})());


