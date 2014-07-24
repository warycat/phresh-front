App.EnterRoute = Ember.Route.extend({
  model:function(){
    return null;
  }
});

App.EnterController = Ember.ObjectController.extend((function(){
  var id = '';
  var SRC = 'm1';
  var brandedName = '';
  var unbrandedName = '';
  var brandID = '';
  var brandNAME = '';
  var retailerID = '';
  var retailerNAME = '';
  var description = '';
  var price = '';
  var salePrice = '';
  var imageID = '';
  var imageURL = '';
  var pageUrl = '';
  var tagInput = '';
  var tags = Ember.ArrayController.create();
  var sizes = Ember.ArrayController.create();

  function jsonString(key, value){
    if(value){
      try{
        dict=JSON.parse(value);
        this.set('id',dict.id);
        this.set('SRC',dict.SRC);
        this.set('brandedName',dict.brandedName);
        this.set('unbrandedName',dict.unbrandedName);
        this.set('brandID',dict.brandID);
        this.set('brandNAME',dict.brandNAME);
        this.set('retailerID',dict.retailerID);
        this.set('retailerNAME',dict.retailerNAME);
        this.set('description',dict.description);
        this.set('price',dict.price);
        this.set('salePrice',dict.salePrice);
        this.set('imageID',dict.imageID);
        this.set('imageURL',dict.imageURL);
        this.set('pageUrl',dict.pageUrl);
      }catch(e){
        console.log(e);
      }
    }

    var id = this.get('id');
    var SRC = this.get('SRC');
    var brandedName = this.get('brandedName');
    var unbrandedName = this.get('unbrandedName');
    var brandID = this.get('brandID');
    var brandNAME = this.get('brandNAME');
    var retailerID = this.get('retailerID');
    var retailerNAME = this.get('retailerNAME');
    var description = this.get('description');
    var price = this.get('price');
    var salePrice = this.get('salePrice');
    var imageID = this.get('imageID');
    var imageURL = this.get('imageURL');
    var pageUrl = this.get('pageUrl');
    return JSON.stringify({
      id:id
    , SRC:SRC
    , brandedName:brandedName
    , unbrandedName:unbrandedName
    , brandID:brandID
    , brandNAME:brandNAME
    , retailerID:retailerID
    , retailerNAME:retailerNAME
    , description:description
    , price:price
    , salePrice:salePrice
    , imageID:imageID
    , imageURL:imageURL
    , pageUrl:pageUrl
    });
  }

  function submit(){
    var id = this.get('id');
    var SRC = this.get('SRC');
    var brandedName = this.get('brandedName');
    var unbrandedName = this.get('unbrandedName');
    var brandID = this.get('brandID');
    var brandNAME = this.get('brandNAME');
    var retailerID = this.get('retailerID');
    var retailerNAME = this.get('retailerNAME');
    var description = this.get('description');
    var price = this.get('price');
    var salePrice = this.get('salePrice');
    var imageID = this.get('imageID');
    var imageURL = this.get('imageURL');
    var pageUrl = this.get('pageUrl');
    var tags = this.get('tags').map(function(item){return item.tag + '';});
    var sizes = this.get('sizes').map(function(item){return item.size + '';});

    var allValid = this.get('idIsValid') && this.get('SRCIsValid') && this.get('brandedNameIsValid') && this.get('unbrandedName') && this.get('brandIDIsValid') && this.get('brandNAMEIsValid') && this.get('retailerIDIsValid') && this.get('retailerNAMEIsValid') && this.get('descriptionIsValid') && this.get('priceIsValid') && this.get('salePriceIsValid') && this.get('imageIDIsValid') && this.get('imageURLIsValid') && this.get('pageUrlIsValid') && (tags.length > 0);
    if(allValid){
      var item = {
        id:{S:id + ''}
      , SRC:{S:SRC + ''}
      , brandedName:{S:brandedName + ''}
      , unbrandedName:{S:unbrandedName + ''}
      , brandID:{S:brandID + ''}
      , brandNAME:{S:brandNAME + ''}
      , retailerID:{S:retailerID + ''}
      , retailerNAME:{S:retailerNAME + ''}
      , description:{S:description + ''}
      , price:{N:price + ''}
      , imageID:{S:imageID + ''}
      , imageURL:{S:imageURL + ''}
      , pageUrl:{S:pageUrl + ''}
      , tags:{SS:tags}
      , sizes:{SS:sizes}
      };
      if(salePrice){
        item.salePrice = {N:salePrice + ''};
      }
      console.log(item);
      Api.putItem(item,function(data){
        console.log(data);
        $.each(tags,function(index,tag){
          Api.putListItem(tag,id,function(response){
            console.log(response);
          });
        });
        $.each(sizes,function(index,size){
          Api.putListItem(size,id,function(response){
            console.log(response);
          });
        });
      });
    }else{
      alert('bad input data');
    }
  }

  function idIsValid(){
    var id = this.get('id');
    return validator.isNumeric(id.substring(1)) && (id.substring(0,1)==='m');
  }

  function SRCIsValid(){
    return this.get('SRC') === 'm1';
  }

  function brandedNameIsValid(){
    return !validator.isNull(this.get('brandedName'));
  }

  function unbrandedNameIsValid(){
    return !validator.isNull(this.get('unbrandedName'));
  }

  function brandIDIsValid(){
    return validator.isNumeric(this.get('brandID'));
  }

  function brandNAMEIsValid(){
    return !validator.isNull(this.get('brandNAME'));
  }

  function retailerIDIsValid(){
    return validator.isNumeric(this.get('retailerID'));
  }

  function retailerNAMEIsValid(){
    return validator.isAlphanumeric(this.get('retailerNAME'));
  }

  function descriptionIsValid(){
    return !validator.isNull(this.get('description'));
  }

  function priceIsValid(){
    var price = this.get('price');
    return validator.isFloat(price);
  }

  function salePriceIsValid(){
    var salePrice = this.get('salePrice');
    return validator.isFloat(salePrice) || validator.isNull(salePrice);
  }

  function imageIDIsValid(){
    return validator.isAlphanumeric(this.get('imageID'));
  }

  function imageURLIsValid(){
    return validator.isURL(this.get('imageURL'));
  }

  function pageUrlIsValid(){
    return validator.isURL(this.get('pageUrl'));
  }

  function idClass(){
    return this.get('idIsValid') ? 'form-group' : 'form-group has-error';
  }

  function SRCClass(){
    return this.get('SRCIsValid') ? 'form-group' : 'form-group has-error';
  }

  function brandedNameClass(){
    return this.get('brandedNameIsValid') ? 'form-group' : 'form-group has-error';
  }

  function unbrandedNameClass(){
    return this.get('unbrandedNameIsValid') ? 'form-group' : 'form-group has-error';
  }

  function brandIDClass(){
    return this.get('brandIDIsValid') ? 'form-group' : 'form-group has-error';
  }

  function brandNAMEClass(){
    return this.get('brandNAMEIsValid') ? 'form-group' : 'form-group has-error';
  }

  function retailerIDClass(){
    return this.get('retailerIDIsValid') ? 'form-group' : 'form-group has-error';
  }

  function retailerNAMEClass(){
    return this.get('retailerNAMEIsValid') ? 'form-group' : 'form-group has-error';
  }

  function descriptionClass(){
    return this.get('descriptionIsValid') ? 'form-group' : 'form-group has-error';
  }

  function priceClass(){
    return this.get('priceIsValid') ? 'form-group' : 'form-group has-error';
  }

  function salePriceClass(){
    return this.get('salePriceIsValid') ? 'form-group' : 'form-group has-error';
  }

  function imageIDClass(){
    return this.get('imageIDIsValid') ? 'form-group' : 'form-group has-error';
  }

  function imageURLClass(){
    return this.get('imageURLIsValid') ? 'form-group' : 'form-group has-error';
  }

  function pageUrlClass(){
    return this.get('pageUrlIsValid') ? 'form-group' : 'form-group has-error';
  }

  function addTag(tag){
    if(!tag){
      tag = this.get('tagInput');
    }
    if(tag !== ''){
      this.tags.addObject({tag:tag});
    }
  }

  function deleteTag(tag){
    this.tags.removeObject(this.tags.find(function(item){return item.tag === tag;}));
  }

  function addSize(size){
    if(size !== ''){
      this.sizes.addObject({size:size});
    }
  }

  function deleteSize(size){
    this.sizes.removeObject(this.sizes.find(function(item){return item.size === size;}));
  }

  return {
    id:id
  , SRC:SRC
  , brandedName:brandedName
  , unbrandedName:unbrandedName
  , brandID:brandID
  , brandNAME:brandNAME
  , retailerID:retailerID
  , retailerNAME:retailerNAME
  , description:description
  , price:price
  , salePrice:salePrice
  , imageID:imageID
  , imageURL:imageURL
  , pageUrl:pageUrl
  , tagInput:tagInput
  , tags:tags
  , sizes:sizes
  , idIsValid:idIsValid.property('id')
  , SRCIsValid:SRCIsValid.property('SRC')
  , brandedNameIsValid:brandedNameIsValid.property('brandedName')
  , unbrandedNameIsValid:unbrandedNameIsValid.property('unbrandedName')
  , brandIDIsValid:brandIDIsValid.property('brandID')
  , brandNAMEIsValid:brandNAMEIsValid.property('brandNAME')
  , retailerIDIsValid:retailerIDIsValid.property('retailerID')
  , retailerNAMEIsValid:retailerNAMEIsValid.property('retailerNAME')
  , descriptionIsValid:descriptionIsValid.property('description')
  , priceIsValid:priceIsValid.property('price')
  , salePriceIsValid:salePriceIsValid.property('salePrice')
  , imageIDIsValid:imageIDIsValid.property('imageID')
  , imageURLIsValid:imageURLIsValid.property('imageURL')
  , pageUrlIsValid:pageUrlIsValid.property('pageUrl')
  , idClass:idClass.property('idIsValid')
  , SRCClass:SRCClass.property('SRCIsValid')
  , brandedNameClass:brandedNameClass.property('brandedNameIsValid')
  , unbrandedNameClass:unbrandedNameClass.property('unbrandedNameIsValid')
  , brandIDClass:brandIDClass.property('brandIDIsValid')
  , brandNAMEClass:brandNAMEClass.property('brandNAMEIsValid')
  , retailerIDClass:retailerIDClass.property('retailerIDIsValid')
  , retailerNAMEClass:retailerNAMEClass.property('retailerNAMEIsValid')
  , descriptionClass:descriptionClass.property('descriptionIsValid')
  , priceClass:priceClass.property('priceIsValid')
  , salePriceClass:salePriceClass.property('salePriceIsValid')
  , imageIDClass:imageIDClass.property('imageIDIsValid')
  , imageURLClass:imageURLClass.property('imageURLIsValid')
  , pageUrlClass:pageUrlClass.property('pageUrlIsValid')
  , jsonString:jsonString.property('id','SRC','brandedName','unbrandedName','brandID','brandNAME','retailerID','retailerNAME','description','price','salePrice','imageID','imageURL','pageUrl')
  , actions:{
      submit:submit
    , addTag:addTag
    , deleteTag:deleteTag
    , addSize:addSize
    , deleteSize:deleteSize
    }
  };
})());
