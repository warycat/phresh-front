App.DiscoveryRoute = Ember.Route.extend({
  beforeModel:function(transition){
    var gender = transition.params.discovery.gender;
    if(gender !== 'male' && gender !== 'female') {
      this.transitionToRoute('login');
    }
  }
, model: function(params){
    if(params.gender !== 'male'){
      return Api.getListItems('all-womens');
    }else{
      return Api.getListItems('all-mens');
    }
  }
, setupController:function(controller, model){
    controller.set('model',model);
    model.Items = _.shuffle(model.Items);
    if(controller.get('imgURL') === ''){
      Api.getItem(model.Items[0].iid.S,function(data){
        controller.set('currentItem',data.Item);
        var sizes = JSON.parse(data.Item.imageSIZES.S);
        controller.set('imgURL',sizes.Original.url);
      });
    }
  }
});

App.DiscoveryController = Ember.ObjectController.extend((function(){
  var leftBtnText = 'trash';
  var midBtnText = 'info';
  var rightBtnText = 'keep';
  var images = [];
  var current = 0;
  var imgURL = '';
  var currentItem = {};

  function leftBtnURL(){
    var text = this.get('leftBtnText');
    switch(text){
    case 'trash':
      return 'images/icons/tired.png';
    case 'share':
      return 'images/icons/sharebutton.png';
    default:
      return '';
    }
  }

  function midBtnURL(){
    var text = this.get('midBtnText');
    switch(text){
    case 'info':
      return 'images/icons/infobutton.png';
    case 'exit':
      return 'images/icons/x.png';
    default:
      return '';
    }
  }

  function rightBtnURL(){
    var text = this.get('rightBtnText');
    switch(text){
    case 'keep':
      return 'images/icons/phreshbutton.png';
    case 'buy':
      return 'images/icons/buybutton.png';
    default:
      return '';
    }
  }

  function next(){
    var model = this.get('model');
    this.set('current',this.get('current')+1);
    var self = this;
    Api.getItem(model.Items[this.get('current')].iid.S,function(data){
      self.set('currentItem',data.Item);
      var sizes = JSON.parse(data.Item.imageSIZES.S);
      self.set('imgURL',sizes.IPhone.url);
    });
  }

  function showroom(){
    console.log('showroom');
    this.transitionToRoute('/showroom/'+FB.getUserID());
  }

  function leftBtnClick(){
    var text = this.get('leftBtnText');
    var currentItem = this.get('currentItem');
    var iid = currentItem.id.S;

    switch(text){
    case 'trash':
      console.log('trash');
      next.apply(this);
      break;
    case 'share':
      console.log('share');
      var imageURL = this.get('imgURL');
      FB.api(
        '/me/objects/article',
        'POST',
        {
          'object': {
            'fb:app_id': '834430399919781',
            'og:type': 'article',
            'og:url': 'http://dev.whatisphresh.com/item/' + iid,
            'og:title': 'phresh',
            'og:image': imageURL
          }
        },
        function (response) {
          if (response && !response.error) {
            // var params = {
            //   method: 'share_open_graph',
            //   action_type: 'og.likes',
            //   action_properties: JSON.stringify({
            //     object:response.id
            //   })
            // };
            // console.log(params);
            // FB.ui(params, function(response){
            //   console.log(response);
            // });
            FB.api(
              'me/og.likes',
              'post',
              {
                object: response.id
              },
              function(response) {
              // handle the response
                console.log(response);
              }
            );
          }
        }
      );


      break;
    }
  }

  function midBtnClick(){
    var text = this.get('midBtnText');
    switch(text){
    case 'info':
      this.set('leftBtnText', 'share');
      this.set('rightBtnText', 'buy');
      this.set('midBtnText', 'exit');
      this.transitionToRoute('discovery.description');
      break;
    case 'exit':
      this.set('leftBtnText', 'trash');
      this.set('rightBtnText', 'keep');
      this.set('midBtnText', 'info');
      this.transitionToRoute('discovery');
      break;
    }
  }

  function rightBtnClick(){
    var text = this.get('rightBtnText');
    var self = this;
    var currentItem = this.get('currentItem');
    var iid = currentItem.id.S;
    var uid = FB.getUserID();
    // var clickUrl = currentItem.clickUrl.S;
    var pageUrl = currentItem.pageUrl.S;
    console.log(currentItem);
    switch(text){
    case 'keep':
      console.log('keep');
      var body = {
        keep:{
          Action:'PUT'
        , Value:{S:(new Date()).toISOString()}
        }
      };
      Api.postUserItem(uid,iid,body,function(){
        next.apply(self);
      });
      break;
    case 'buy':
      console.log('buy');
      var r = confirm('Go to the retailer web site?');
      if (r === true) {
        window.open(pageUrl);
      } else {
        // window.open(clickUrl);
      }
      break;
    }
  }

  return {
    leftBtnText:leftBtnText
  , midBtnText:midBtnText
  , rightBtnText:rightBtnText
  , leftBtnURL:leftBtnURL.property('leftBtnText')
  , midBtnURL:midBtnURL.property('midBtnText')
  , rightBtnURL:rightBtnURL.property('rightBtnText')
  , current:current
  , currentItem:currentItem
  , imgURL:imgURL
  , images:images
  , actions:{
      showroom:showroom
    , leftBtnClick:leftBtnClick
    , midBtnClick:midBtnClick
    , rightBtnClick:rightBtnClick
    }
  };
})());


