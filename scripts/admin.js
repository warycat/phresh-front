function statusChangeCallback(a){console.log("statusChangeCallback"),"/admin.html"!==window.location.pathname&&-1===window.location.hash.indexOf("item")&&("connected"===a.status?FB.api("/me",function(a){App.me=a,window.location="/index.html#/discovery/"+a.gender}):window.location="not_authorized"===a.status?"/index.html#/login":"/index.html#/login")}function checkLoginState(){FB.getLoginStatus(function(a){statusChangeCallback(a)})}window.fbAsyncInit=function(){FB.init({appId:"834430399919781",cookie:!0,xfbml:!0,version:"v2.0"}),FB.getLoginStatus(function(a){statusChangeCallback(a)})},function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src="//connect.facebook.net/en_US/sdk.js",e.parentNode.insertBefore(d,e))}(document,"script","facebook-jssdk");var Api=function(){function a(a,b){return $.ajax({type:"PUT",url:F+"/users",data:a}).done(b)}function b(a,b){return $.ajax({type:"GET",url:F+"/users/"+a}).done(b)}function c(a){return $.ajax({type:"GET",url:F+"/users"}).done(a)}function d(){return $.ajax({type:"GET",url:F+"/users"})}function e(a,b,c){return $.ajax({type:"POST",url:F+"/users/"+a,data:b}).done(c)}function f(a,b){return $.ajax({type:"DELETE",url:F+"/users/"+a}).done(b)}function g(a,b){return $.ajax({type:"PUT",url:F+"/items/",data:a}).done(b)}function h(a,b){return $.ajax({type:"GET",url:F+"/items/"+a}).done(b)}function i(a){return $.ajax({type:"GET",url:F+"/items/"}).done(a)}function j(a,b,c){return $.ajax({type:"POST",url:F+"/items/"+a,data:b}).done(c)}function k(a,b){return $.ajax({type:"DELETE",url:F+"/items/"+a}).done(b)}function l(a,b,c){return $.ajax({type:"PUT",url:F+"/lists.users/",data:{lid:{S:a+""},uid:{S:b+""}}}).done(c)}function m(a,b,c){return $.ajax({type:"GET",url:F+"/lists.users/"+a+"/"+b}).done(c)}function n(a,b){return $.ajax({type:"GET",url:F+"/lists.users/"+a}).done(b)}function o(a){return $.ajax({type:"GET",url:F+"/lists.users/"}).done(a)}function p(a,b,c){return $.ajax({type:"DELETE",url:F+"/lists.users/"+a+"/"+b}).done(c)}function q(a,b,c){return $.ajax({type:"PUT",url:F+"/lists.items/",data:{lid:{S:a+""},iid:{S:b+""}}}).done(c)}function r(a,b,c){return $.ajax({type:"GET",url:F+"/lists.items/"+a+"/"+b}).done(c)}function s(a,b){return $.ajax({type:"GET",url:F+"/lists.items/"+a}).done(b)}function t(a){return $.ajax({type:"GET",url:F+"/lists.items/"}).done(a)}function u(a,b,c){return $.ajax({type:"DELETE",url:F+"/lists.items/"+a+"/"+b}).done(c)}function v(a,b,c,d){return $.ajax({type:"POST",url:F+"/items.users/"+a+"/"+b,data:c}).done(d)}function w(a,b,c){return $.ajax({type:"GET",url:F+"/items.users/"+a+"/"+b}).done(c)}function x(a,b){return $.ajax({type:"GET",url:F+"/items.users/"+a}).done(b)}function y(a){return $.ajax({type:"GET",url:F+"/items.users/"}).done(a)}function z(a,b,c){return $.ajax({type:"DELETE",url:F+"/items.users/"+a+"/"+b}).done(c)}function A(a,b,c,d){return $.ajax({type:"POST",url:F+"/users.items/"+a+"/"+b,data:c}).done(d)}function B(a,b,c){return $.ajax({type:"GET",url:F+"/users.items/"+a+"/"+b}).done(c)}function C(a,b){return $.ajax({type:"GET",url:F+"/users.items/"+a}).done(b)}function D(a){return $.ajax({type:"GET",url:F+"/users.items/"}).done(a)}function E(a,b,c){return $.ajax({type:"DELETE",url:F+"/users.items/"+a+"/"+b}).done(c)}var F="http://node.whatisphresh.com";return{putUser:a,getUser:b,getUsers:c,getUsersModel:d,postUser:e,deleteUser:f,putItem:g,getItem:h,getItems:i,postItem:j,deleteItem:k,putListUser:l,getListUser:m,getListUsers:n,getListsUsers:o,deleteListUser:p,putListItem:q,getListItem:r,getListItems:s,getListsItems:t,deleteListItem:u,postItemUser:v,getItemUser:w,getItemUsers:x,getItemsUsers:y,deleteItemUser:z,postUserItem:A,getUserItem:B,getUserItems:C,getUsersItems:D,deleteUserItem:E}}();console.log(Api);var SS=function(){function a(a,d){var e=0,f=0,g=0;async.whilst(function(){return 10>g&&f>=e},function(h){$.ajax({type:"GET",url:c+"/products?limit=50&cat="+a+"&offset="+e+b}).done(function(a){f=a.metadata.total,e+=a.metadata.limit,d(a.products),g++,h()})},function(a){a?console.log(a):console.log("count",g,"offset",e,"total",f)})}var b="&pid=uid1444-23870038-13",c="http://api.shopstyle.com/api/v2";return{getItemsInCat:a}}();console.log(SS),document.ontouchmove=function(a){-1===window.location.hash.indexOf("showroom")&&a.preventDefault()},$.ajaxSetup({contentType:"application/json",processData:!1}),$.ajaxPrefilter(function(a){a.data&&(a.data=JSON.stringify(a.data))});var App=Ember.Application.create({LOG_TRANSITIONS:!0});App.Router.map(function(){this.resource("index",{path:"/"}),this.resource("login"),this.resource("discovery",{path:"/discovery/:gender"},function(){this.route("description")}),this.resource("showroom",{path:"/showroom/:uid"}),this.resource("item",{path:"/item/:iid"},function(){this.route("description")}),this.resource("landing"),this.resource("ss"),this.resource("api"),this.resource("enter")}),App.ApiController=Ember.ObjectController.extend({actions:{put_user:function(){console.log("put_user"),Api.putUser({id:{S:"123"},name:{S:"lauren"}},function(a){console.log(a)})},get_user:function(){console.log("get_user"),Api.getUser("123",function(a){console.log(a)})},get_users:function(){console.log("get_users"),Api.getUsers(function(a){console.log(a)})},post_user:function(){console.log("post_user");var a={firstName:{Action:"PUT",Value:{S:"Lauren"}}};Api.postUser("123",a,function(a){console.log(a)})},delete_user:function(){console.log("delete_user"),Api.deleteUser("123",function(a){console.log(a)})},put_item:function(){console.log("put_item"),Api.putItem({id:{S:"123"},name:{S:"dress"}},function(a){console.log(a)})},get_item:function(){console.log("get_item"),Api.getItem("123",function(a){console.log(a)})},get_items:function(){console.log("get_items"),Api.getItems(function(a){console.log(a)})},post_item:function(){console.log("post_item");var a={size:{Action:"PUT",Value:{S:"large"}}};Api.postItem("123",a,function(a){console.log(a)})},delete_item:function(){console.log("delete_item"),Api.deleteItem("123",function(a){console.log(a)})},put_list_user:function(){console.log("put_list_user"),Api.putListUser("list123","user123",function(a){console.log(a)})},get_list_user:function(){console.log("get_list_user"),Api.getListUser("list123","user123",function(a){console.log(a)})},get_list_users:function(){console.log("get_list_users"),Api.getListUsers("list123",function(a){console.log(a)})},get_lists_users:function(){console.log("get_lists_users"),Api.getListsUsers(function(a){console.log(a)})},delete_list_user:function(){console.log("delete_list_user"),Api.deleteListUser("list123","user123",function(a){console.log(a)})},put_list_item:function(){console.log("put_list_item"),Api.putListItem("list123","item123",function(a){console.log(a)})},get_list_item:function(){console.log("get_list_item"),Api.getListItem("list123","item123",function(a){console.log(a)})},get_list_items:function(){console.log("get_list_items"),Api.getListItems("list123",function(a){console.log(a)})},get_lists_items:function(){console.log("get_lists_items"),Api.getListsItems(function(a){console.log(a)})},delete_list_item:function(){console.log("delete_list_item"),Api.deleteListItem("list123","item123",function(a){console.log(a)})},post_item_user:function(){console.log("post_item_user");var a={like:{Action:"PUT",Value:{S:(new Date).toISOString()}}};Api.postItemUser("item123","user123",a,function(a){console.log(a)})},get_item_user:function(){console.log("get_item_user"),Api.getItemUser("item123","user123",function(a){console.log(a)})},get_item_users:function(){console.log("get_item_users"),Api.getItemUsers("item123",function(a){console.log(a)})},get_items_users:function(){console.log("get_items_users"),Api.getItemsUsers(function(a){console.log(a)})},delete_item_user:function(){console.log("delete_item_user"),Api.deleteItemUser("item123","user123",function(a){console.log(a)})},post_user_item:function(){console.log("post_user_item");var a={share:{Action:"PUT",Value:{S:(new Date).toISOString()}}};Api.postUserItem("user123","item123",a,function(a){console.log(a)})},get_user_item:function(){console.log("get_user_item"),Api.getUserItem("user123","item123",function(a){console.log(a)})},get_user_items:function(){console.log("get_user_items"),Api.getUserItems("user123",function(a){console.log(a)})},get_users_items:function(){console.log("get_users_items"),Api.getUsersItems(function(a){console.log(a)})},delete_user_item:function(){console.log("delete_user_item"),Api.deleteUserItem("user123","item123",function(a){console.log(a)})},generate_all_womens:function(){Api.getItems("womens",function(a){async.each(a.Items,function(a,b){console.log(a.id),Api.putListItem("all-womens",a.id.S,function(a){console.log(a),b()})})})},fb_login:function(){console.log("fb_login"),FB.login(function(a){console.log(a)},{scope:"public_profile,email,user_friends"})},fb_logout:function(){console.log("fb_logout"),FB.logout(function(a){console.log(a)})},fb_register:function(){console.log("fb_register"),FB.api("/me",function(a){console.log(a);var b={};$.each(a,function(c){b[c]={S:a[c]+""}}),Api.putUser(b,function(a){console.log(a)})})},fb_friends:function(){console.log("fb_friends"),FB.api("/me/friends",function(a){console.log(a)})},fb_pagetab:function(){console.log("fb_pagetab"),FB.ui({method:"pagetab",redirect_uri:"YOUR_URL"},function(a){console.log(a)})},fb_share:function(){console.log("fb_share");var a={method:"share_open_graph",action_type:"og.likes",action_properties:JSON.stringify({object:"https://developers.facebook.com/docs/"})};FB.ui(a,function(a){console.log(a)})}}}),App.SsController=Ember.ObjectController.extend({actions:{clean:function(){$("#imagesContainer").empty()},category:function(a,b){console.log("category",a,b),SS.getItemsInCat(a,function(a){$.each(a,function(a,c){var d={SRC:{S:"ShopStyle"}};$.each(c,function(a,b){if("object"==typeof b)switch(a){case"retailer":d.retailerID={S:b.id},d.retailerNAME={S:b.name};break;case"brand":d.brandID={S:b.id},d.brandNAME={S:b.name};break;case"image":d.imageID={S:b.id},d.imageSIZES={S:JSON.stringify(b.sizes)};break;case"alternateImages":break;case"colors":break;case"sizes":break;case"categories":break;case"badges":break;default:console.log(a)}else switch(a){case"id":d[a]={S:"ss"+b};break;case"price":d[a]={N:""+b};break;default:d[a]={S:""+b}}});var e=JSON.parse(d.imageSIZES.S),f=$('<img style="height:40px;" class="item"  src="'+e.IPhone.url+'" />');Api.putItem(d,function(a){Api.putListItem("all-"+b,d.id.S,function(){a&&$("#imagesContainer").append(f)})})})})}}}),App.EnterRoute=Ember.Route.extend({model:function(){return null}}),App.EnterController=Ember.ObjectController.extend(function(){function a(a,b){if(b)try{dict=JSON.parse(b),this.set("id",dict.id),this.set("SRC",dict.SRC),this.set("brandedName",dict.brandedName),this.set("unbrandedName",dict.unbrandedName),this.set("brandID",dict.brandID),this.set("brandNAME",dict.brandNAME),this.set("retailerID",dict.retailerID),this.set("retailerNAME",dict.retailerNAME),this.set("description",dict.description),this.set("price",dict.price),this.set("salePrice",dict.salePrice),this.set("imageID",dict.imageID),this.set("imageURL",dict.imageURL),this.set("pageUrl",dict.pageUrl)}catch(c){console.log(c)}var d=this.get("id"),e=this.get("SRC"),f=this.get("brandedName"),g=this.get("unbrandedName"),h=this.get("brandID"),i=this.get("brandNAME"),j=this.get("retailerID"),k=this.get("retailerNAME"),l=this.get("description"),m=this.get("price"),n=this.get("salePrice"),o=this.get("imageID"),p=this.get("imageURL"),q=this.get("pageUrl");return JSON.stringify({id:d,SRC:e,brandedName:f,unbrandedName:g,brandID:h,brandNAME:i,retailerID:j,retailerNAME:k,description:l,price:m,salePrice:n,imageID:o,imageURL:p,pageUrl:q})}function b(){var a=this.get("id"),b=this.get("SRC"),c=this.get("brandedName"),d=this.get("unbrandedName"),e=this.get("brandID"),f=this.get("brandNAME"),g=this.get("retailerID"),h=this.get("retailerNAME"),i=this.get("description"),j=this.get("price"),k=this.get("salePrice"),l=this.get("imageID"),m=this.get("imageURL"),n=this.get("pageUrl"),o=this.get("idIsValid")&&this.get("SRCIsValid")&&this.get("brandedNameIsValid")&&this.get("unbrandedName")&&this.get("brandIDIsValid")&&this.get("brandNAMEIsValid")&&this.get("retailerIDIsValid")&&this.get("retailerNAMEIsValid")&&this.get("descriptionIsValid")&&this.get("priceIsValid")&&this.get("salePriceIsValid")&&this.get("imageIDIsValid")&&this.get("imageURLIsValid")&&this.get("pageUrlIsValid");if(o){alert("good");var p={id:{S:a},SRC:{S:b},brandedName:{S:c},unbrandedName:{S:d},brandID:{S:e},brandNAME:{S:f},retailerID:{S:g},retailerNAME:{S:h},description:{S:i},price:{N:j},salePrice:{N:k},imageID:{S:l},imageURL:{S:m},pageUrl:{S:n}};console.log(p)}else alert("bad")}function c(){var a=this.get("id");return validator.isNumeric(a.substring(1))&&"m"===a.substring(0,1)}function d(){return"m1"===this.get("SRC")}function e(){return!validator.isNull(this.get("brandedName"))}function f(){return!validator.isNull(this.get("unbrandedName"))}function g(){return validator.isNumeric(this.get("brandID"))}function h(){return!validator.isNull(this.get("brandNAME"))}function i(){return validator.isNumeric(this.get("retailerID"))}function j(){return validator.isAlphanumeric(this.get("retailerNAME"))}function k(){return!validator.isNull(this.get("description"))}function l(){var a=this.get("price");return validator.isFloat(a)}function m(){var a=this.get("salePrice");return validator.isFloat(a)||validator.isNull(a)}function n(){return validator.isAlphanumeric(this.get("imageID"))}function o(){return validator.isURL(this.get("imageURL"))}function p(){return validator.isURL(this.get("pageUrl"))}function q(){return this.get("idIsValid")?"form-group":"form-group has-error"}function r(){return this.get("SRCIsValid")?"form-group":"form-group has-error"}function s(){return this.get("brandedNameIsValid")?"form-group":"form-group has-error"}function t(){return this.get("unbrandedNameIsValid")?"form-group":"form-group has-error"}function u(){return this.get("brandIDIsValid")?"form-group":"form-group has-error"}function v(){return this.get("brandNAMEIsValid")?"form-group":"form-group has-error"}function w(){return this.get("retailerIDIsValid")?"form-group":"form-group has-error"}function x(){return this.get("retailerNAMEIsValid")?"form-group":"form-group has-error"}function y(){return this.get("descriptionIsValid")?"form-group":"form-group has-error"}function z(){return this.get("priceIsValid")?"form-group":"form-group has-error"}function A(){return this.get("salePriceIsValid")?"form-group":"form-group has-error"}function B(){return this.get("imageIDIsValid")?"form-group":"form-group has-error"}function C(){return this.get("imageURLIsValid")?"form-group":"form-group has-error"}function D(){return this.get("pageUrlIsValid")?"form-group":"form-group has-error"}var E="",F="m1",G="",H="",I="",J="",K="",L="",M="",N="",O="",P="",Q="",R="";return{id:E,SRC:F,brandedName:G,unbrandedName:H,brandID:I,brandNAME:J,retailerID:K,retailerNAME:L,description:M,price:N,salePrice:O,imageID:P,imageURL:Q,pageUrl:R,idIsValid:c.property("id"),SRCIsValid:d.property("SRC"),brandedNameIsValid:e.property("brandedName"),unbrandedNameIsValid:f.property("unbrandedName"),brandIDIsValid:g.property("brandID"),brandNAMEIsValid:h.property("brandNAME"),retailerIDIsValid:i.property("retailerID"),retailerNAMEIsValid:j.property("retailerNAME"),descriptionIsValid:k.property("description"),priceIsValid:l.property("price"),salePriceIsValid:m.property("salePrice"),imageIDIsValid:n.property("imageID"),imageURLIsValid:o.property("imageURL"),pageUrlIsValid:p.property("pageUrl"),idClass:q.property("idIsValid"),SRCClass:r.property("SRCIsValid"),brandedNameClass:s.property("brandedNameIsValid"),unbrandedNameClass:t.property("unbrandedNameIsValid"),brandIDClass:u.property("brandIDIsValid"),brandNAMEClass:v.property("brandNAMEIsValid"),retailerIDClass:w.property("retailerIDIsValid"),retailerNAMEClass:x.property("retailerNAMEIsValid"),descriptionClass:y.property("descriptionIsValid"),priceClass:z.property("priceIsValid"),salePriceClass:A.property("salePriceIsValid"),imageIDClass:B.property("imageIDIsValid"),imageURLClass:C.property("imageURLIsValid"),pageUrlClass:D.property("pageUrlIsValid"),jsonString:a.property("id","SRC","brandedName","unbrandedName","brandID","brandNAME","retailerID","retailerNAME","description","price","salePrice","imageID","imageURL","pageUrl"),actions:{submit:b}}}());