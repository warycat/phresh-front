function statusChangeCallback(a){console.log("statusChangeCallback"),"/admin.html"!==window.location.pathname&&-1===window.location.hash.indexOf("item")&&("connected"===a.status?FB.api("/me",function(a){App.me=a,window.location="/index.html#/discovery/"+a.gender}):window.location="not_authorized"===a.status?"/index.html#/login":"/index.html#/login")}function checkLoginState(){FB.getLoginStatus(function(a){statusChangeCallback(a)})}window.fbAsyncInit=function(){FB.init({appId:"834430399919781",cookie:!0,xfbml:!0,version:"v2.0"}),FB.getLoginStatus(function(a){statusChangeCallback(a)})},function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src="//connect.facebook.net/en_US/sdk.js",e.parentNode.insertBefore(d,e))}(document,"script","facebook-jssdk");var Api=function(){function a(a,b){return $.ajax({type:"PUT",url:F+"/users",data:a}).done(b)}function b(a,b){return $.ajax({type:"GET",url:F+"/users/"+a}).done(b)}function c(a){return $.ajax({type:"GET",url:F+"/users"}).done(a)}function d(){return $.ajax({type:"GET",url:F+"/users"})}function e(a,b,c){return $.ajax({type:"POST",url:F+"/users/"+a,data:b}).done(c)}function f(a,b){return $.ajax({type:"DELETE",url:F+"/users/"+a}).done(b)}function g(a,b){return $.ajax({type:"PUT",url:F+"/items/",data:a}).done(b)}function h(a,b){return $.ajax({type:"GET",url:F+"/items/"+a}).done(b)}function i(a){return $.ajax({type:"GET",url:F+"/items/"}).done(a)}function j(a,b,c){return $.ajax({type:"POST",url:F+"/items/"+a,data:b}).done(c)}function k(a,b){return $.ajax({type:"DELETE",url:F+"/items/"+a}).done(b)}function l(a,b,c){return $.ajax({type:"PUT",url:F+"/lists.users/",data:{lid:{S:a+""},uid:{S:b+""}}}).done(c)}function m(a,b,c){return $.ajax({type:"GET",url:F+"/lists.users/"+a+"/"+b}).done(c)}function n(a,b){return $.ajax({type:"GET",url:F+"/lists.users/"+a}).done(b)}function o(a){return $.ajax({type:"GET",url:F+"/lists.users/"}).done(a)}function p(a,b,c){return $.ajax({type:"DELETE",url:F+"/lists.users/"+a+"/"+b}).done(c)}function q(a,b,c){return $.ajax({type:"PUT",url:F+"/lists.items/",data:{lid:{S:a+""},iid:{S:b+""}}}).done(c)}function r(a,b,c){return $.ajax({type:"GET",url:F+"/lists.items/"+a+"/"+b}).done(c)}function s(a,b){return $.ajax({type:"GET",url:F+"/lists.items/"+a}).done(b)}function t(a){return $.ajax({type:"GET",url:F+"/lists.items/"}).done(a)}function u(a,b,c){return $.ajax({type:"DELETE",url:F+"/lists.items/"+a+"/"+b}).done(c)}function v(a,b,c,d){return $.ajax({type:"POST",url:F+"/items.users/"+a+"/"+b,data:c}).done(d)}function w(a,b,c){return $.ajax({type:"GET",url:F+"/items.users/"+a+"/"+b}).done(c)}function x(a,b){return $.ajax({type:"GET",url:F+"/items.users/"+a}).done(b)}function y(a){return $.ajax({type:"GET",url:F+"/items.users/"}).done(a)}function z(a,b,c){return $.ajax({type:"DELETE",url:F+"/items.users/"+a+"/"+b}).done(c)}function A(a,b,c,d){return $.ajax({type:"POST",url:F+"/users.items/"+a+"/"+b,data:c}).done(d)}function B(a,b,c){return $.ajax({type:"GET",url:F+"/users.items/"+a+"/"+b}).done(c)}function C(a,b){return $.ajax({type:"GET",url:F+"/users.items/"+a}).done(b)}function D(a){return $.ajax({type:"GET",url:F+"/users.items/"}).done(a)}function E(a,b,c){return $.ajax({type:"DELETE",url:F+"/users.items/"+a+"/"+b}).done(c)}var F="http://node.whatisphresh.com";return{putUser:a,getUser:b,getUsers:c,getUsersModel:d,postUser:e,deleteUser:f,putItem:g,getItem:h,getItems:i,postItem:j,deleteItem:k,putListUser:l,getListUser:m,getListUsers:n,getListsUsers:o,deleteListUser:p,putListItem:q,getListItem:r,getListItems:s,getListsItems:t,deleteListItem:u,postItemUser:v,getItemUser:w,getItemUsers:x,getItemsUsers:y,deleteItemUser:z,postUserItem:A,getUserItem:B,getUserItems:C,getUsersItems:D,deleteUserItem:E}}();console.log(Api);var SS=function(){function a(a,d){var e=0,f=0,g=0;async.whilst(function(){return 10>g&&f>=e},function(h){$.ajax({type:"GET",url:c+"/products?limit=50&cat="+a+"&offset="+e+b}).done(function(a){f=a.metadata.total,e+=a.metadata.limit,d(a.products),g++,h()})},function(a){a?console.log(a):console.log("count",g,"offset",e,"total",f)})}var b="&pid=uid1444-23870038-13",c="http://api.shopstyle.com/api/v2";return{getItemsInCat:a}}();console.log(SS),document.ontouchmove=function(a){-1===window.location.hash.indexOf("showroom")&&a.preventDefault()},$.ajaxSetup({contentType:"application/json",processData:!1}),$.ajaxPrefilter(function(a){a.data&&(a.data=JSON.stringify(a.data))});var App=Ember.Application.create({LOG_TRANSITIONS:!0});App.Router.map(function(){this.resource("index",{path:"/"}),this.resource("login"),this.resource("discovery",{path:"/discovery/:gender"},function(){this.route("description")}),this.resource("showroom",{path:"/showroom/:uid"}),this.resource("item",{path:"/item/:iid"},function(){this.route("description")}),this.resource("landing"),this.resource("ss"),this.resource("api"),this.resource("enter")}),App.IndexController=Ember.ObjectController.extend({model:function(){return console.log("in model"),null}}),App.IndexRoute=Ember.Route.extend({afterModel:function(){console.log("index")}}),App.LoginRoute=Ember.Route.extend({}),App.LoginController=Ember.ObjectController.extend({actions:{fb_login:function(){console.log("fb_login"),FB.login(function(a){console.log(a),FB.api("/me",function(a){App.me=a;var b={};$.each(a,function(c){b[c]={S:a[c]+""}}),Api.putUser(b,function(b){console.log(b),window.location="/index.html#/discovery/"+a.gender})})},{scope:"public_profile,email,user_friends,publish_actions"})}}}),App.DiscoveryRoute=Ember.Route.extend({beforeModel:function(a){var b=a.params.discovery.gender;"male"!==b&&"female"!==b&&this.transitionToRoute("login")},model:function(a){return Api.getListItems("male"!==a.gender?"all-womens":"all-mens")},setupController:function(a,b){a.set("model",b),b.Items=_.shuffle(b.Items),""===a.get("imgURL")&&Api.getItem(b.Items[0].iid.S,function(b){a.set("currentItem",b.Item);var c=JSON.parse(b.Item.imageSIZES.S);a.set("imgURL",c.Original.url)})}}),App.DiscoveryController=Ember.ObjectController.extend(function(){function a(){var a=this.get("leftBtnText");switch(a){case"trash":return"images/icons/tired.png";case"share":return"images/icons/sharebutton.png";default:return""}}function b(){var a=this.get("midBtnText");switch(a){case"info":return"images/icons/infobutton.png";case"exit":return"images/icons/x.png";default:return""}}function c(){var a=this.get("rightBtnText");switch(a){case"keep":return"images/icons/phreshbutton.png";case"buy":return"images/icons/buybutton.png";default:return""}}function d(){var a=this.get("model");this.set("current",this.get("current")+1);var b=this;Api.getItem(a.Items[this.get("current")].iid.S,function(a){b.set("currentItem",a.Item);var c=JSON.parse(a.Item.imageSIZES.S);b.set("imgURL",c.IPhone.url)})}function e(){console.log("showroom"),this.transitionToRoute("/showroom/"+FB.getUserID())}function f(){var a=this.get("leftBtnText"),b=this.get("currentItem"),c=b.id.S;switch(a){case"trash":console.log("trash"),d.apply(this);break;case"share":console.log("share");var e=this.get("imgURL");FB.api("/me/objects/article","POST",{object:{"fb:app_id":"834430399919781","og:type":"article","og:url":"http://dev.whatisphresh.com/item/"+c,"og:title":"phresh","og:image":e}},function(a){a&&!a.error&&FB.api("me/og.likes","post",{object:a.id},function(a){console.log(a)})})}}function g(){var a=this.get("midBtnText");switch(a){case"info":this.set("leftBtnText","share"),this.set("rightBtnText","buy"),this.set("midBtnText","exit"),this.transitionToRoute("discovery.description");break;case"exit":this.set("leftBtnText","trash"),this.set("rightBtnText","keep"),this.set("midBtnText","info"),this.transitionToRoute("discovery")}}function h(){var a=this.get("rightBtnText"),b=this,c=this.get("currentItem"),e=c.id.S,f=FB.getUserID(),g=c.pageUrl.S;switch(console.log(c),a){case"keep":console.log("keep");var h={keep:{Action:"PUT",Value:{S:(new Date).toISOString()}}};Api.postUserItem(f,e,h,function(){d.apply(b)});break;case"buy":console.log("buy");var i=confirm("Go to the retailer web site?");i===!0&&window.open(g)}}function i(){console.log("img click")}var j="trash",k="info",l="keep",m=[],n=0,o="",p={};return{leftBtnText:j,midBtnText:k,rightBtnText:l,leftBtnURL:a.property("leftBtnText"),midBtnURL:b.property("midBtnText"),rightBtnURL:c.property("rightBtnText"),current:n,currentItem:p,imgURL:o,images:m,actions:{showroom:e,leftBtnClick:f,midBtnClick:g,rightBtnClick:h,imgClick:i}}}()),App.DiscoveryDescriptionController=Ember.ObjectController.extend({needs:["discovery"],actions:{exit:function(){this.transitionToRoute("discovery")}}}),App.ShowroomRoute=Ember.Route.extend({model:function(a){return App.uid=a.uid,Api.getUserItems(a.uid)},setupController:function(a,b){a.model=b,a.items=b.Items,$.each(b.Items,function(a,b){Api.getItem(b.iid.S,function(a){var c=JSON.parse(a.Item.imageSIZES.S);console.log(c),$("#"+b.iid.S).attr("src",c.Original.url)})})}}),App.ShowroomController=Ember.ObjectController.extend(function(){function a(){console.log("exit"),this.transitionToRoute(App.me?"/discovery/"+App.me.gender:"login")}function b(){FB.ui({method:"share",href:"whatisphresh.com/#/showroom/"+App.uid},function(a){console.log(a)})}function c(a){console.log("item",a),this.transitionToRoute("/item/"+a)}var d={};return{items:d,actions:{exit:a,share:b,item:c}}}()),App.ItemRoute=Ember.Route.extend({model:function(a){return Api.getItem(a.iid)},setupController:function(a,b){console.log(b),a.set("model",b);var c=JSON.parse(b.Item.imageSIZES.S);a.set("imgURL",c.Original.url),App.me?a.set("backBtnText","back"):a.set("backBtnText","home")}}),App.ItemController=Ember.ObjectController.extend(function(){function a(){var a=this.get("backBtnText");switch(a){case"back":return"images/icons/backarrow.png";case"home":return"images/icons/home_button.png"}}function b(){var a=this.get("leftBtnText");switch(a){case"trash":return"images/icons/tired.png";case"share":return"images/icons/sharebutton.png";default:return""}}function c(){var a=this.get("midBtnText");switch(a){case"info":return"images/icons/infobutton.png";case"exit":return"images/icons/x.png";default:return""}}function d(){var a=this.get("rightBtnText");switch(a){case"keep":return"images/icons/phreshbutton.png";case"buy":return"images/icons/buybutton.png";default:return""}}function e(){var a=this.get("backBtnText");switch(a){case"back":console.log("back"),this.transitionToRoute("/showroom/"+FB.getUserID());break;case"home":console.log("home"),this.transitionToRoute("login")}}function f(){var a=this.get("leftBtnText"),b=this.get("model").Item,c=b.id.S;switch(a){case"share":console.log("share");var d=this.get("imgURL");FB.api("/me/objects/article","POST",{object:{"fb:app_id":"834430399919781","og:type":"article","og:url":"http://dev.whatisphresh.com/item/"+c,"og:title":"phresh","og:image":d}},function(a){a&&!a.error&&FB.api("me/og.likes","post",{object:a.id},function(a){console.log(a)})})}}function g(){var a=this.get("midBtnText");switch(a){case"info":this.set("midBtnText","exit"),this.transitionToRoute("item.description");break;case"exit":this.set("midBtnText","info"),this.transitionToRoute("item")}}function h(){var a=this.get("rightBtnText"),b=this.get("model").Item,c=b.pageUrl.S;switch(a){case"buy":console.log("buy");var d=confirm("Go to the retailer web site?");d===!0&&window.open(c)}}function i(){console.log("img click")}var j="back",k="share",l="info",m="buy",n=[],o="";return{backBtnText:j,leftBtnText:k,midBtnText:l,rightBtnText:m,backBtnURL:a.property("backBtnText"),leftBtnURL:b.property("leftBtnText"),midBtnURL:c.property("midBtnText"),rightBtnURL:d.property("rightBtnText"),imgURL:o,images:n,actions:{showroom:showroom,leftBtnClick:f,midBtnClick:g,rightBtnClick:h,backBtnClick:e,imgClick:i}}}()),App.ItemDescriptionController=Ember.ObjectController.extend({needs:["item"],actions:{exit:function(){this.transitionToRoute("item")}}});