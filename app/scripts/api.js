var Api = (function(){
	var url = 'http://dev.whatisphresh.com:3000';
  $.ajaxSetup({
    contentType : 'application/json',
    processData : false
  });
  $.ajaxPrefilter( function(options) {
    if (options.data){
      options.data=JSON.stringify(options.data);
    }
  });

  function putUser(user, done){
    $.ajax({type:'PUT', url:url+'/users', data:user}).done(done);
  }

  function getUser(id,done){
    $.ajax({type:'GET', url:url+'/users/'+id}).done(done);
  }

  function getUsers(done){
    $.ajax({type:'GET', url:url+'/users'}).done(done);
  }

  function postUser(id,body,done){
    $.ajax({type:'POST',url:url+'/users/'+id, data:body}).done(done);
  }

  function deleteUser(id,done){
    $.ajax({type:'DELETE',url:url+'/users/'+id}).done(done);
  }

  function putItem(user, done){
    $.ajax({type:'PUT', url:url+'/items', data:user}).done(done);
  }

  function getItem(id,done){
    $.ajax({type:'GET', url:url+'/items/'+id}).done(done);
  }

  function getItems(done){
    $.ajax({type:'GET', url:url+'/items'}).done(done);
  }

  function postItem(id,body,done){
    $.ajax({type:'POST',url:url+'/items/'+id, data:body}).done(done);
  }

  function deleteItem(id,done){
    $.ajax({type:'DELETE',url:url+'/items/'+id}).done(done);
  }

  function putList(user, done){
    $.ajax({type:'PUT', url:url+'/lists', data:user}).done(done);
  }

  function getList(id,done){
    $.ajax({type:'GET', url:url+'/lists/'+id}).done(done);
  }

  function getLists(done){
    $.ajax({type:'GET', url:url+'/lists'}).done(done);
  }

  function postList(id,body,done){
    $.ajax({type:'POST',url:url+'/lists/'+id, data:body}).done(done);
  }

  function deleteList(id,done){
    $.ajax({type:'DELETE',url:url+'/lists/'+id}).done(done);
  }

  return {
    putUser:putUser
  , getUser:getUser
  , getUsers:getUsers
  , postUser:postUser
  , deleteUser:deleteUser
  , putItem:putItem
  , getItem:getItem
  , getItems:getItems
  , postItem:postItem
  , deleteItem:deleteItem
  , putList:putList
  , getList:getList
  , getLists:getLists
  , postList:postList
  , deleteList:deleteList
  };
})();

console.log(Api);