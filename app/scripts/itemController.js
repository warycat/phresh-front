App.ItemRoute = Ember.Route.extend({
  model:function(params){
    return Api.getItem(params.iid);
  }
, setupController:function(controller, model){
    console.log(model);
    controller.set('model',model);
    var sizes = JSON.parse(model.Item.imageSIZES.S);
    controller.set('imgURL',sizes.Original.url);
    if(App.me){
      controller.set('backBtnText','back');
    }else{
      controller.set('backBtnText','home');
    }
  }
});

App.ItemController = Ember.ObjectController.extend((function(){
  var backBtnText = 'back';
  var leftBtnText = 'share';
  var midBtnText = 'info';
  var rightBtnText = 'buy';
  var images = [];
  var current = 0;
  var imgURL = '';

  function backBtnURL(){
    var text = this.get('backBtnText');
    switch(text){
    case 'back':
      return 'images/icons/backarrow.png';
    case 'home':
      return 'images/icons/home_button.png';
    }
  }

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

  function showroom(){
    console.log('showroom');
    this.transitionToRoute('/showroom/'+FB.getUserID());
  }

  function backBtnClick(){
    var text = this.get('backBtnText');
    switch(text){
    case 'back':
      this.transitionToRoute('showroom');
      break;
    case 'home':
      this.transitionToRoute('login');
      break;
    }
  }


  function leftBtnClick(){
    var text = this.get('leftBtnText');

    switch(text){
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
      this.set('midBtnText', 'exit');
      this.transitionToRoute('item.description');
      break;
    case 'exit':
      this.set('midBtnText', 'info');
      this.transitionToRoute('item');
      break;
    }
  }

  function rightBtnClick(){
    var text = this.get('rightBtnText');
    var self = this;
    var item = this.get('model').Item;
    var iid = item.id.S;
    var uid = FB.getUserID();
    var pageUrl = item.pageUrl.S;
    console.log(currentItem);
    switch(text){
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
  function imgClick(){
    console.log('img click');
  }

  return {
    backBtnText:backBtnText
  , leftBtnText:leftBtnText
  , midBtnText:midBtnText
  , rightBtnText:rightBtnText
  , backBtnURL:backBtnURL.property('backBtnText')
  , leftBtnURL:leftBtnURL.property('leftBtnText')
  , midBtnURL:midBtnURL.property('midBtnText')
  , rightBtnURL:rightBtnURL.property('rightBtnText')
  , imgURL:imgURL
  , images:images
  , actions:{
      showroom:showroom
    , leftBtnClick:leftBtnClick
    , midBtnClick:midBtnClick
    , rightBtnClick:rightBtnClick
    , backBtnClick:backBtnClick
    , imgClick:imgClick
    }
  };
})());