console.log('\'Allo \'Allo!');

document.ontouchmove = function(event){
  event.preventDefault();
};

var App = Ember.Application.create();

App.Router.map(function () {
	this.route('index',{path:'/'});
  this.route('splash');
  this.route('posts');
  this.route('tutorial');
  this.route('discovery');
  this.route('logout');
  this.route('showroom');
});

App.IndexRoute = Ember.Route.extend({
	afterModel: function(){
		console.log('index');
	}
});

App.LogoutRoute = Ember.Route.extend({
	afterModel: function(){
		console.log('logout');
		FB.logout(function(response) {
		  // user is now logged out
		  console.log(response.status);
		});
	}
});

App.TutorialRoute = Ember.Route.extend({
	afterModel: function(){
		console.log('tutorial');
	}
});

App.swipeView = Ember.View.extend({
  templateName: 'swipe',

  swipeOptions: {
    direction: Em.OneGestureDirection.Left | Em.OneGestureDirection.Right,
    cancelPeriod: 100,
    swipeThreshold: 10
  },

  touchMove: function(event) {
    event.preventDefault();
  },

  swipeEnd: function(recognizer, evt) {
    var direction = recognizer.get('swipeDirection');
    console.log(evt);
    if (direction === Em.OneGestureDirection.Right) {
      console.log('right');
    } else if (direction === Em.OneGestureDirection.Left) {
      console.log('left');
    }
  }
});

var currentIndex = 0;
var authToken = 'xxx';

/**************************
* START HELPER CLASSES
***************************/
/*********QUEUE************/
function queue() {
	this.internal = [];
}

//return: nothing, add element to queue
queue.prototype.push = function(val) {
	//add item to internal array
	this.internal.push(val);
};

//return: first element in internal array (FIFO)
queue.prototype.pop = function(){
	//if empty return undefined!
	if(this.internal.length === 0){
		return undefined;
	}else{
		return this.internal.shift();
	}
};

//return: nothing, appends to internal array
queue.prototype.append = function(toAppend){
	this.internal = this.internal.concat(toAppend);
};

//return: size of queue
queue.prototype.size = function(){
	return this.internal.length;
};

//return: front element
queue.prototype.peek = function(){
	return this.internal[0];
};

//return: #(index)th element in internal queue
queue.prototype.index = function(index){
	return this.internal[index];
};
/**********END QUEUE************/


var OFFLINE_ITEM_COUNT = 5; //number of offline images in offline image directory
var OFFLINE_IMAGE_DIRECTORY = "img/prodImages/"; //path to offline image directory
var NUM_TO_GET_MORE_ITEMS = 9; //NUMBER OF ITEMS LEFT IN QUEUE TO GET MORE ITEMS
var SWIPE_ACTION_LENGTH = 50; //how far swipe needs to be to be like/dislike
var NUM_TO_WAIT_AND_LOAD = 4; //number of items left in queue to show loading animation
var itemQ = new queue();
var leftSwipes = 0;
var rightSwipes = 0;

var man = 'JzaM1V8Elx';
var woman = 'sN2d9tvl4D';

function getMoreItems(limit, isFirst) {
	console.log(gender);
  $.ajax({
      url: 'http://phresh-lb-1028091368.us-west-2.elb.amazonaws.com/phresh-server/items?dev_test_user_id=' + ((gender == 'male') ? man : woman )+ '&limit=' + limit + '&offset=' + (Math.ceil(currentIndex / 10) * 10),
      crossDomain: true,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', authToken);
      },
      headers: {
        'Authorization': authToken
      }
    })
    .done(function (json) { //success
      itemQ.append(json.items);
      if (isFirst) { //first set of items loaded into stack
        $('div.productCard').each(function (index) { // go through each card
          var flipCont = $(this).find('div.flipCont'); //cache
          $(flipCont).find('div.frontSide').css('background-image', 'url(data:image/jpeg;base64,' + itemQ.index(index).image + ')'); //set image
          $(flipCont).find('div.backSide div.backSideDescription').text(itemQ.index(index).description); //set description
        });
        isFlipped = false;
        $('#productTitle').text(itemQ.peek().name);
        $('#productPrice').text('$' + Math.ceil(itemQ.peek().price));
        $('#mainSpinner').hide();
      }
    })
    .fail(function (jqXHR, textStatus) { //ERROR
      console.log('FAILURE: ' + textStatus);
    });
}

function getNextOnline(action_number) {
	console.log(itemQ.size());
  if (itemQ.size() <= NUM_TO_WAIT_AND_LOAD) {
    isEnabled = false;
    $('#mainSpinner').show();
  } else {
    var totalSwipes = window.localStorage.getItem('totalSwipes');
    window.localStorage.setItem('totalSwipes', 1 * totalSwipes + 1);
    if ((1 * totalSwipes + 1) === 12) {
      alert('Looks like you\'ve got it from here...', function () {}, 'phresh', 'Continue');
    }
    /*$.get( BASE_URI + //send action_kind to backend
    "phresh-server/post-action?" +
    "action_kind="+ actionKindList[action_number-1] +
    "&user_id=" + USER_ID + 
    "&rank=" + currentIndex +
    "&item_id=" + itemQ.pop().id);*/
		itemQ.pop();
    if (2 === action_number) {
      $('#toCloset').addClass('glow');
      if (!window.localStorage.getItem('firstRight') && !rightSwipes) {
        alert('Yeah, that’s pretty awesome. We saved it in your Showroom', function () {}, 'phresh', 'Continue');
      } else if (window.localStorage.getItem('firstRight') === 5) {
        alert('Check out your Showroom to see all of the things you’ve liked', function () {}, 'phresh', 'Continue');
      }
      window.localStorage.setItem('firstRight', 1 * window.localStorage.getItem('firstRight') + 1);
      rightSwipes++;
      setTimeout(function () {
        $('#toCloset').removeClass('glow');
      }, 300);
    } else {
      if (!window.localStorage.getItem('firstLeft') && !leftSwipes) {
        alert('Didn’t like it? It’s OK, neither did we.', function () {}, 'phresh', 'Continue');
        window.localStorage.setItem('firstLeft', 1);
      }
      leftSwipes++;
    }

    // MixPanel.track.generateUserEvent('user has swiped', {
    //   actionKind: actionKindList[action_number - 1]
    // });

    // var dataSend = {
    //   'kind': actionKindList[action_number - 1],
    //   'item_id': itemQ.pop().id
    // };

    // $.ajax({
    //   url: BASE_URI + 'phresh-server/action',
    //   type: 'POST',
    //   data: JSON.stringify(dataSend),
    //   processData: false,
    //   contentType: 'application/json',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': auth_token
    //   }
    // });
    currentIndex++;

    /***SWITCH CARDS****/
    var temp = $('div.top');
    $('div.middle').removeClass('middle').addClass('top');
    //$('#productPrice').text('Size: ' + itemQ.size() + ' currentIndex: ' + currentIndex);
    $('#productTitle').text(itemQ.peek().name);
    $('#productPrice').text('$' + Math.ceil(itemQ.peek().price));
    $('div.bottom').removeClass('bottom').addClass('middle');
    $(temp).removeClass('top').addClass('bottom').removeAttr('style');
    $('div.bottom .frontSide').css('background-image', 'url(data:image/jpeg;base64,' + itemQ.index(2).image + ')');
    $('div.bottom div.backSide div.backSideDescription').text(itemQ.index(2).description);

    /***CHECK IF WE NEED MORE ITEMS***/
    if (itemQ.size() === NUM_TO_GET_MORE_ITEMS) {
      getMoreItems(10, false);
    }
  }
}

App.panView = Ember.View.extend({
  templateName: 'pan',
  panOptions: {
    numberOfRequiredTouches: 1
  },
  didInsertElement:function(){
		console.log('didInsertElement');
		getMoreItems(10,true);
  },
  touchStart: function(evt){
    var originalEvent = evt.originalEvent;
    console.log(originalEvent);
    sum = 0;
  },

  touchEnd: function(){
    sum = 0;
    $('.top').css({
      'left': (10 + sum/10) + '%',
      'opacity': 1,
      '-webkit-transform': 'rotate(' + (sum)/40 + 'deg)',
      'transform': 'rotate(' + (sum)/40 + 'deg)',
      'border-color':'#000000',
      'border-width':'1px'
    });
    getNextOnline(0, false);
  },

  panChange: function(rec) {
    var val = rec.get('translation');
    sum += val.x;
    $('.top').css({
      'left': (10 + sum/10) + '%',
      'opacity': 1- Math.abs(sum/1000),
      '-webkit-transform': 'rotate(' + (sum)/40 + 'deg)',
      'transform': 'rotate(' + (sum)/40 + 'deg)',
      'border-color':(sum<0)?'#EF4242':'#2eF131',
      'border-width':'30px'
    });
  },

  touchMove: function(event) {
    event.preventDefault();
  }

});


$(function () {
  $('#FBButton').click(function () {
		console.log('click');
		FB.login(function(response){
			console.log(response);
		},{scope:'public_profile,email,user_friends'});
  });
});