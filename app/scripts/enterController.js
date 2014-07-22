App.EnterRoute = Ember.Route.extend({
  model:function(){
    return null;
  }
});

App.EnterController = Ember.ObjectController.extend((function(){
  var id = '';
  var SRC = 'M1.0';
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

  function jsonString(key, value){
    console.log(value);
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
    // var id = this.get('id');
    // var SRC = this.get('SRC');
    // var brandedName = this.get('brandedName');
    // var unbrandedName = this.get('unbrandedName');
    // var brandID = this.get('brandID');
    // var brandNAME = this.get('brandNAME');
    // var retailerID = this.get('retailerID');
    // var retailerNAME = this.get('retailerNAME');
    // var description = this.get('description');
    // var price = this.get('price');
    // var salePrice = this.get('salePrice');
    // var imageID = this.get('imageID');
    // var imageURL = this.get('imageURL');
    // var pageUrl = this.get('pageUrl');
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
  , jsonString:jsonString.property('id','SRC','brandedName','unbrandedName','brandID','brandNAME','retailerID','retailerNAME','description','price','salePrice','imageID','imageURL','pageUrl')
  , actions:{
      submit:submit
    }
  };
})());