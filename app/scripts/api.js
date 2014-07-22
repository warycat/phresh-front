var Api = (function(){
  var url = 'http://node.whatisphresh.com';
  // var url = 'http://dev.whatisphresh.com:3000';

  function putUser(user, done){
    return $.ajax({type:'PUT', url:url + '/users', data:user}).done(done);
  }

  function getUser(id,done){
    return $.ajax({type:'GET', url:url + '/users/' + id}).done(done);
  }

  function getUsers(done){
    return $.ajax({type:'GET', url:url+'/users'}).done(done);
  }

  function getUsersModel(){
    return $.ajax({type:'GET', url:url+'/users'});
  }

  function postUser(id,body,done){
    return $.ajax({type:'POST', url:url + '/users/'+id, data:body}).done(done);
  }

  function deleteUser(id,done){
    return $.ajax({type:'DELETE', url:url + '/users/'+id}).done(done);
  }

  function putItem(item,done){
    return $.ajax({type:'PUT', url:url + '/items/', data:item}).done(done);
  }

  function getItem(id,done){
    return $.ajax({type:'GET', url:url + '/items/' + id}).done(done);
  }

  function getItems(done){
    return $.ajax({type:'GET', url:url + '/items/' }).done(done);
  }

  function postItem(id,body,gender,done){
    return $.ajax({type:'POST', url:url + '/items/' + id, data:body}).done(done);
  }

  function deleteItem(id,gender,done){
    return $.ajax({type:'DELETE', url:url + '/items/' + id}).done(done);
  }

  function putListUser(lid,uid,done){
    return $.ajax({type:'PUT', url:url + '/lists.users/', data:{lid:{S:lid+''},uid:{S:uid+''}}}).done(done);
  }

  function getListUser(lid,uid,done){
    return $.ajax({type:'GET', url:url + '/lists.users/' + lid + '/' + uid}).done(done);
  }

  function getListUsers(lid,done){
    return $.ajax({type:'GET', url:url + '/lists.users/' + lid}).done(done);
  }

  function getListsUsers(done){
    return $.ajax({type:'GET', url:url + '/lists.users/'}).done(done);
  }

  function deleteListUser(lid,uid,done){
    return $.ajax({type:'DELETE',url:url + '/lists.users/' + lid + '/' + uid}).done(done);
  }

  function putListItem(lid,iid,done){
    return $.ajax({type:'PUT', url:url + '/lists.items/', data:{lid:{S:lid+''},iid:{S:iid+''}}}).done(done);
  }

  function getListItem(lid,iid,done){
    return $.ajax({type:'GET', url:url + '/lists.items/' + lid + '/' + iid}).done(done);
  }

  function getListItems(lid,done){
    return $.ajax({type:'GET', url:url + '/lists.items/' + lid}).done(done);
  }

  function getListsItems(done){
    return $.ajax({type:'GET', url:url + '/lists.items/'}).done(done);
  }

  function deleteListItem(lid,iid,done){
    return $.ajax({type:'DELETE',url:url + '/lists.items/' + lid + '/' + iid}).done(done);
  }

  function postItemUser(iid,uid,body,done){
    return $.ajax({type:'POST', url:url + '/items.users/' + iid + '/' + uid, data:body}).done(done);
  }

  function getItemUser(iid,uid,done){
    return $.ajax({type:'GET', url:url + '/items.users/' + iid + '/' + uid}).done(done);
  }

  function getItemUsers(iid,done){
    return $.ajax({type:'GET', url:url + '/items.users/' + iid }).done(done);
  }

  function getItemsUsers(done){
    return $.ajax({type:'GET', url:url + '/items.users/'}).done(done);
  }

  function deleteItemUser(iid,uid,done){
    return $.ajax({type:'DELETE', url:url + '/items.users/' + iid + '/' + uid}).done(done);
  }

  function postUserItem(uid,iid,body,done){
    return $.ajax({type:'POST', url:url + '/users.items/' + uid + '/' + iid, data:body}).done(done);
  }

  function getUserItem(uid,iid,done){
    return $.ajax({type:'GET', url:url + '/users.items/' + uid + '/' + iid}).done(done);
  }

  function getUserItems(uid,done){
    return $.ajax({type:'GET', url:url + '/users.items/' + uid }).done(done);
  }

  function getUsersItems(done){
    return $.ajax({type:'GET', url:url + '/users.items/'}).done(done);
  }

  function deleteUserItem(uid,iid,done){
    return $.ajax({type:'DELETE', url:url + '/users.items/' + uid + '/' + iid}).done(done);
  }

  return {
    putUser:putUser
  , getUser:getUser
  , getUsers:getUsers
  , getUsersModel:getUsersModel
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

  , putListItem:putListItem
  , getListItem:getListItem
  , getListItems:getListItems
  , getListsItems:getListsItems
  , deleteListItem:deleteListItem

  , postItemUser:postItemUser
  , getItemUser:getItemUser
  , getItemUsers:getItemUsers
  , getItemsUsers:getItemsUsers
  , deleteItemUser:deleteItemUser

  , postUserItem:postUserItem
  , getUserItem:getUserItem
  , getUserItems:getUserItems
  , getUsersItems:getUsersItems
  , deleteUserItem:deleteUserItem
  };
})();

console.log(Api);