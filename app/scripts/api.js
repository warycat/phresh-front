var Api = (function(){
	var url = 'http://dev.whatisphresh.com:3000';

  function putUser(user, done){
    $.ajax({type:'PUT', url:url + '/users', data:user}).done(done);
  }

  function getUser(id,done){
    $.ajax({type:'GET', url:url + '/users/' + id}).done(done);
  }

  function getUsers(done){
    $.ajax({type:'GET', url:url+'/users'}).done(done);
  }

  function postUser(id,body,done){
    $.ajax({type:'POST', url:url + '/users/'+id, data:body}).done(done);
  }

  function deleteUser(id,done){
    $.ajax({type:'DELETE', url:url + '/users/'+id}).done(done);
  }

  function putItem(item,gender,done){
    $.ajax({type:'PUT', url:url + '/items/' + gender + '/', data:item}).done(done);
  }

  function getItem(id,gender,done){
    $.ajax({type:'GET', url:url + '/items/' + gender + '/' + id}).done(done);
  }

  function getItems(gender,done){
    $.ajax({type:'GET', url:url + '/items/' + gender + '/' }).done(done);
  }

  function postItem(id,body,gender,done){
    $.ajax({type:'POST', url:url + '/items/' + gender + '/' + id, data:body}).done(done);
  }

  function deleteItem(id,gender,done){
    $.ajax({type:'DELETE', url:url + '/items/' + gender + '/' + id}).done(done);
  }

  function putListUser(lid,uid,done){
    $.ajax({type:'PUT', url:url + '/lists/users/', data:{lid:{S:lid+''},uid:{S:uid+''}}}).done(done);
  }

  function getListUser(lid,uid,done){
    $.ajax({type:'GET', url:url + '/lists/users/' + lid + '/' + uid}).done(done);
  }

  function getListUsers(lid,done){
    $.ajax({type:'GET', url:url + '/lists/users/' + lid}).done(done);
  }

  function getListsUsers(done){
    $.ajax({type:'GET', url:url + '/lists/users/'}).done(done);
  }

  function deleteListUser(lid,uid,done){
    $.ajax({type:'DELETE',url:url + '/lists/users/' + lid + '/' + uid}).done(done);
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
  , putListUser:putListUser
  , getListUser:getListUser
  , getListUsers:getListUsers
  , getListsUsers:getListsUsers
  , deleteListUser:deleteListUser
  };
})();

console.log(Api);