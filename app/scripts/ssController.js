App.SsController = Ember.ObjectController.extend({
  actions:{
    ss_cat:function(cat){
      console.log('ss_cat');
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
                item.alternateImages = {SS:[]};
                $.each(value,function(index,image){
                  item.alternateImages.SS.push(JSON.stringify(image));
                });
                break;
              case 'colors':
                item.colors = {SS:[]};
                $.each(value,function(index,color){
                  item.colors.SS.push(JSON.stringify(color));
                });
                break;
              case 'sizes':
                item.sizes = {SS:[]};
                $.each(value,function(index,size){
                  item.sizes.SS.push(JSON.stringify(size));
                });
                break;
              case 'categories':
                item.categories = {SS:[]};
                $.each(value,function(index,category){
                  item.categories.SS.push(JSON.stringify(category));
                });
                break;
              case 'badges':
                item.badges = {SS:[]};
                $.each(value,function(index,category){
                  item.badges.SS.push(JSON.stringify(category));
                });
                break;
              default:
                console.log(key);
              }
            }else{
              switch(key){
              case 'id':
                item[key] = {'S':'ss' + value};
                break;
              default:
                item[key] = {'S': '' + value};
              }
            }
          });
          var dict = JSON.parse(item.imageSIZES.S);
          $('#imagePreview').attr('src',dict.IPhone.url);
          console.log(dict.IPhone.url);
        });
      });
    }
  }
});
