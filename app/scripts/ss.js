var SS = (function(){
	var pid = '&pid=uid1444-23870038-13';
	var url = 'http://api.shopstyle.com/api/v2';

  function getItemsInCat(cat,done){
    var offset = 0;
    var total = 0;
    var count = 0;
    async.whilst(
      function () {
        return count < 10 && offset <= total;
      },
      function (callback) {
        $.ajax({type:'GET', url:url+ '/products?limit=50&cat=' + cat + '&offset=' + offset + pid }).done(function(data){
          total = data.metadata.total;
          offset += data.metadata.limit;
          done(data.products);
          count++;
          callback();
        });
      },
      function (err) {
        if(err){
          console.log(err);
        }else{
          console.log('count',count,'offset',offset,'total',total);
        }
      }
    );
  }

  return {
    getItemsInCat:getItemsInCat
  };

})();

console.log(SS);