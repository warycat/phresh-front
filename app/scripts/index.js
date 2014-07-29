Modernizr.addTest('iphone', function () {
  return !!navigator.userAgent.match(/iPhone/i);
});

document.ontouchmove = function(event){
  if(window.location.hash.indexOf('showroom') === -1){
    event.preventDefault();
  }
  if(window.location.hash.indexOf('discovery') !== -1){

    console.log(event.touches[0].pageX);
  }
};

var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.landing = function(){
  window.location = 'https://www.facebook.com/pages/phresh/539068489538023';
};

App.Router.map(function () {
  this.resource('index',{path:'/'});
  this.resource('login');
  this.resource('discovery', {path: '/discovery/:gender'}, function(){
    this.route('description');
  });
  this.resource('showroom', {path:'/showroom/:uid'});
  this.resource('item',{path:'/item/:iid'},function(){
    this.route('description');
  });
  this.resource('landing');
});

