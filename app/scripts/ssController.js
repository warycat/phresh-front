App.SsController = Ember.ObjectController.extend({
  actions:{
    clean:function(){
      $('#imagesContainer').empty();
    }
  , category:function(cat,gender){
      console.log('category',cat,gender);
      SS.getItemsInCat(cat,function(products){
        $.each(products,function(index,product){
          var item = {SRC:{S:'ShopStyle'}};
          $.each(product,function(key,value){
            if(typeof value === 'object'){
              switch(key){
              case 'retailer':
                item.retailerID = {S:value.id};
                item.retailerNAME = {S:value.name};
                break;
              case 'brand':
                item.brandID = {S:value.id};
                item.brandNAME = {S:value.name};
                break;
              case 'image':
                item.imageID = {S:value.id};
                item.imageSIZES = {S:JSON.stringify(value.sizes)};
                break;
              case 'alternateImages':
                // item.alternateImages = {SS:[]};
                // $.each(value,function(index,image){
                //   item.alternateImages.SS.push(JSON.stringify(image));
                // });
                // if(item.alternateImages.SS.length === 0){
                //   delete item.alternateImages;
                // }else{
                //   console.log(item.alternateImages);
                // }
                break;
              case 'colors':
                // item.colors = {SS:[]};
                // $.each(value,function(index,color){
                //   item.colors.SS.push(JSON.stringify(color));
                // });
                // if(item.colors.SS.length === 0){
                //   delete item.colors;
                // }else{
                //   console.log(item.colors);
                // }
                break;
              case 'sizes':
                // item.sizes = {SS:[]};
                // $.each(value,function(index,size){
                //   item.sizes.SS.push(JSON.stringify(size));
                // });
                // if(item.sizes.SS.length === 0){
                //   delete item.sizes;
                // }else{
                //   console.log(item.sizes);
                // }
                break;
              case 'categories':
                // item.categories = {SS:[]};
                // $.each(value,function(index,category){
                //   item.categories.SS.push(JSON.stringify(category));
                // });
                // if(item.categories.SS.length === 0){
                //   delete item.categories;
                // }else{
                //   console.log(item.categories);
                // }
                break;
              case 'badges':
                // item.badges = {SS:[]};
                // $.each(value,function(index,category){
                //   item.badges.SS.push(JSON.stringify(category));
                // });
                // if(item.badges.SS.length === 0){
                //   delete item.badges;
                // }else{
                //   console.log(item.badges);
                // }
                break;
              default:
                console.log(key);
              }
            }else{
              switch(key){
              case 'id':
                item[key] = {'S':'ss' + value};
                break;
              case 'price':
                item[key] = {'N':'' + value};
                break;
              default:
                // console.log(key,value);
                item[key] = {'S': '' + value};
              }
            }
          });
          var dict = JSON.parse(item.imageSIZES.S);
          var $elem = $('<img style="height:40px;" class="item"  src="' + dict.IPhone.url + '" />');
          Api.putItem(item,function(data){
            Api.putListItem('all-'+gender,item.id.S,function(){
              if(data){
                $('#imagesContainer').append($elem);
              }
            });
          });
        });
      });
    }
  }
});

