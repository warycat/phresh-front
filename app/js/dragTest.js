//THIS IS JS DOCUMENT FOR MAINPAGE
//HANDLE OFFLINE AND ONLINE FUNCTIONALITY
//JANUARY 25TH 2014

/**************************
* START GLOBALS + MAGIC
***************************/
var IS_OFFLINE = false;
var USER_ID = 1;
var BASE_URI = "http://phresh-lb-1028091368.us-west-2.elb.amazonaws.com/";

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
	if(this.internal.length === 0)
		return undefined;
	else
		return this.internal.shift();
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

$('#main').on('touchmove', function(e) {
    e.preventDefault();
});


$( document ).delegate("#main", "pageinit", function(){
	
	/************************************
	* START DOC GLOBALS + MAGIC
	************************************/
	var OFFLINE_ITEM_COUNT = 5; //number of offline images in offline image directory
	var OFFLINE_IMAGE_DIRECTORY = "img/prodImages/"; //path to offline image directory
	var NUM_TO_GET_MORE_ITEMS = 9; //NUMBER OF ITEMS LEFT IN QUEUE TO GET MORE ITEMS
	var SWIPE_ACTION_LENGTH = 50; //how far swipe needs to be to be like/dislike
	var NUM_TO_WAIT_AND_LOAD = 4; //number of items left in queue to show loading animation
	var currentIndex = 0; //how many items called so far?
	var dragCard = null; 
	var relativeOffsetX, touchStartX;
	var pageX = $('#main').width();
	var pageY = $('#main').height();
	var cardWidth = $('#productCard').width();
	var indicatorShown = 0; //is indicator shown?
	var actionKindList = ['dislike', 'like']; //array for online mouseup call
	var itemQ = new queue();
	var isFlipped = true; //is it flipped over?
	var isEnabled = true;
	var auth_token = $('#main').data('auth_token');
	var defaultMessage = "Found this on #phresh";
	var leftSwipes = 0;
	var rightSwipes = 0;
    window.localStorage.setItem('fromCloset', 0);

	/*****************************
	* START DOC HELPER FUNCTIONS
	******************************/
	//plugin to animate card back to center
	(function ( $ ) {
		$.fn.centerCard = function() {
			this.animate({left: '10%', top: '15%', opacity: 1}, 400).css('-webkit-transform', 'rotate(0deg)');
			return this;
		};
	}( jQuery ));
	
	//input: movement variable
	//return array index in indicatorList:
	/*1: like
	  2: dislike                */
	function checkCardStatus(movement){
		if(movement > SWIPE_ACTION_LENGTH){ //dislike
			if(!indicatorShown){
				$('div.bottom').addClass('dislike').removeClass('like');
				indicatorShown = 1;
			}
		}
		else if(movement < -SWIPE_ACTION_LENGTH){ //like
			if(!indicatorShown){
				$('div.bottom').addClass('like').removeClass('dislike');
				indicatorShown = 2;
			}
		}
		else if(indicatorShown){ //moved from action to middle
			$('div.bottom').removeClass('like dislike');
			indicatorShown = 0;
		}
		return indicatorShown;
	}
	
	//input: none, sets productImg to next image in image directory
	function getNextOffline(){
		currentIndex++;
		$('.top > img').attr('src', OFFLINE_IMAGE_DIRECTORY + (currentIndex % OFFLINE_ITEM_COUNT) + '.jpg');	
	}
	
	//input: action_number (returned from checkCardStatus), item_id from json
	function getNextOnline(action_number){
		if( itemQ.size() <= NUM_TO_WAIT_AND_LOAD){
			isEnabled = false;
			$('#mainSpinner').show();	
		}else{
			var totalSwipes = window.localStorage.getItem('totalSwipes');
			window.localStorage.setItem('totalSwipes', 1 * totalSwipes + 1);
			console.log((1*totalSwipes+1));
			if((1*totalSwipes+1) == 12){
				navigator.notification.alert("Looks like you've got it from here...", function(){}, 'phresh', 'Continue');	
			}
		/*$.get( BASE_URI + //send action_kind to backend
		"phresh-server/post-action?" +
		"action_kind="+ actionKindList[action_number-1] +
		"&user_id=" + USER_ID + 
		"&rank=" + currentIndex +
		"&item_id=" + itemQ.pop().id);*/
		if(2 === action_number){
			$('#toCloset').addClass('glow');
			if(!window.localStorage.getItem('firstRight') && !rightSwipes){
				navigator.notification.alert('Yeah, that’s pretty awesome. We saved it in your Showroom', function(){}, 'phresh', 'Continue');
			}
			else if(window.localStorage.getItem('firstRight') == 5){
				navigator.notification.alert('Check out your Showroom to see all of the things you’ve liked', function(){}, 'phresh', 'Continue');
			}
			window.localStorage.setItem('firstRight', 1 * window.localStorage.getItem('firstRight') + 1);
			rightSwipes++;
			setTimeout(function(){$('#toCloset').removeClass('glow');}, 300);	
		}
		else{
			if(!window.localStorage.getItem('firstLeft') && !leftSwipes){
				navigator.notification.alert('Didn’t like it? It’s OK, neither did we.', function(){}, 'phresh', 'Continue');
				window.localStorage.setItem('firstLeft', 1);
			}
			leftSwipes++;
		}
		
		MixPanel.track.generateUserEvent('user has swiped', {actionKind: actionKindList[action_number-1]});
		
		var dataSend = {
			"kind": actionKindList[action_number-1],
			"item_id": itemQ.pop().id
		};
		
		$.ajax({
			url: BASE_URI + 'phresh-server/action',
			type: 'POST',
			data: JSON.stringify(dataSend),
			processData: false,
			contentType: "application/json",
			headers: {
				"Content-Type":"application/json",
				"Authorization": auth_token
			}
		});
			currentIndex++;
			
			/***SWITCH CARDS****/
			var temp = $('div.top');
			$('div.middle').removeClass('middle').addClass('top');
			//$('#productPrice').text('Size: ' + itemQ.size() + ' currentIndex: ' + currentIndex);
			$('#productTitle').text(itemQ.peek().name);
			$('#productPrice').text('$' + Math.ceil(itemQ.peek().price));
			$('div.bottom').removeClass('bottom').addClass('middle');
			$(temp).removeClass('top').addClass('bottom').removeAttr('style');
			$('div.bottom .frontSide').css('background-image',  'url(data:image/jpeg;base64,' + itemQ.index(2).image + ')');
			$('div.bottom div.backSide div.backSideDescription').text(itemQ.index(2).description);
			
			/***CHECK IF WE NEED MORE ITEMS***/
			if(itemQ.size() == NUM_TO_GET_MORE_ITEMS){
				getMoreItems(10, false);
			}
		}
	}

	
	//get #(limit) amount of items from backend and add to queue, if first time callin pass true
	function getMoreItems(limit, isFirst){
		$.ajax({
			url: "http://phresh-lb-1028091368.us-west-2.elb.amazonaws.com/phresh-server/items?limit="+ limit +"&offset=" + (Math.ceil(currentIndex/10)*10),
			crossDomain:true,
			beforeSend: function(xhr){
				xhr.setRequestHeader('Authorization', auth_token);	
			},
			headers: {
				"Authorization": auth_token
			}
		})
		.done(function(json){ //success
			itemQ.append(json.items);
			if(!isEnabled){
				isEnabled = true;
				$('#mainSpinner').hide();
			}
			if(isFirst){ //first set of items loaded into stack
				$('div.productCard').each(function(index){ // go through each card
					var flipCont = $(this).find('div.flipCont'); //cache
					$(flipCont).find('div.frontSide').css('background-image',  'url(data:image/jpeg;base64,' + itemQ.index(index).image + ')'); //set image
					$(flipCont).find('div.backSide div.backSideDescription').text(itemQ.index(index).description); //set description
				});
				isFlipped = false;
				$('#productTitle').text(itemQ.peek().name);
				$('#productPrice').text('$' + Math.ceil(itemQ.peek().price));
				$('#mainSpinner').hide();
			}
		})
		.fail(function(jqXHR, textStatus){ //ERROR
			console.log('FAILURE: ' + textStatus);
		});
	}
	
	getMoreItems(10, true); //get first set of items
	
	$('#main').on('touchstart', function(event){ //prevent scrolling
		event.preventDefault();
	});
	
	/***************************
	* START DRAG HANDLERS
	****************************/
	$('body').on({
		tap: function(event){
			$('.top').toggleClass('tap');
			isFlipped = !isFlipped;
		},
		vmousedown: function(event) {
			if(!isFlipped){
				indicatorShown = 0;
				dragCard = $(this);
				touchStartX = event.pageX;
				relativeOffsetX = touchStartX - $(this).offset().left;
			}			
		},
		vmouseup: function(event) {			
			if(IS_OFFLINE){ //OFFLINE MODE!
				switch(indicatorShown){
					case 1: //right swipe
					case 2: //left swipe
						getNextOffline();
						break;
					case 0: //no swipe
						$(dragCard).centerCard(); //go back to center
						break;
				}
			}
			else{ //ONLINE MODE!
				switch(indicatorShown){
						case 1: //right swipe
						case 2: //left swipe
							$('div.top').removeClass('dislike like');
							getNextOnline(indicatorShown, false);
							indicatorShown = 0;
							break;
						case 0: //no swipe
							$(dragCard).centerCard(); //go back to center
							break;
				}
			}
			
			$('.fadeIndicator').removeClass('fadeShow'); //remove any fades present
			dragCard = null;
		},
		vmousemove: function(event) {
			var movement = touchStartX - event.pageX; //cache movement
			var absMovement = Math.abs(movement);
			if(dragCard){
				$(dragCard).css({ //update position
					"left": event.pageX - relativeOffsetX,
					"opacity": 1- absMovement/350,
					"-webkit-transform": 'rotate(' + -(movement)/20 + 'deg)',
					"transform": 'rotate(' + -(movement)/20 + 'deg)'
				});
				
				checkCardStatus(movement); //check where the card is
			}
		}
	},'.top');
	
	
	/***************************
	* START BUTTON HANDLERS
	****************************/
	$('#toCloset').tap(function(){ //change pages to closet
		$('#grid').text('');
		MixPanel.track.generateUserEvent('entered showroom');
		$.mobile.changePage("#closet",{transition: "slide"});
        window.localStorage.setItem('fromCloset', 1);
	});
	$('#toSettings').tap(function(){ //change pages to closet
		MixPanel.track.generateUserEvent('entered settings');
		$.mobile.changePage("#settings",{transition: "slide"});
	});
	$('.backSideBottomCont>.first').tap(function(){ //shares the item via social share
		var shortened  = '',
			dataSend = {longUrl: itemQ.peek().click_url};
		MixPanel.track.generateUserEvent('user clicked share');
    	$.ajax({
			type: 'POST',
			url: "https://www.googleapis.com/urlshortener/v1/url",
			data: JSON.stringify(dataSend),
			dataType: 'json',
			contentType: 'application/json'
 		})
		.done(function(data){
			window.plugins.socialsharing.share(defaultMessage, null, 'data:image/jpeg;base64,' + itemQ.peek().image, data.id );
		});
	});
	$('.backSideBottomCont>.second').tap(function(){ //shares the item via social share
		MixPanel.track.generateUserEvent('user clicked on purchase from main screen');
		$('#iFrame').attr('src', itemQ.peek().click_url);
		$.mobile.changePage("#webFrame",{transition: "slide"});
	});
	$('#toLogout').tap(function(){
        navigator.notification.confirm("Are you sure you want to log out?", function(buttonIndex){
            if( buttonIndex == 2){
                window.localStorage.removeItem('keepLoggedIn');
                $.mobile.changePage("#splash",{transition: "slide"});
            }
        
        }, "Logout", ["No", "Yes"]);
	});
	
	/***************************
	* START TUT HANDLERS
	****************************/
	if(window.localStorage.getItem('skipTutorial') == 1){
		$('#mainTutorialCont').remove();
	}
	$('div.tutNext').tap(function(){
		window.localStorage.setItem('totalSwipes', 0);
		$('#mainTutorialCont').remove();	
		window.localStorage.setItem('skipTutorial', 1);
	});
	$('div.tutSkip').tap(function(){
		window.localStorage.setItem('totalSwipes', 0);
		MixPanel.track.generateUserEvent('user skipped tutorial');
		$('#mainTutorialCont').remove();	
		window.localStorage.setItem('skipTutorial', 1);
	});
});

$(document).delegate("#webFrame", "pageinit", function(){
	$('#iFrameHeaderLeft').on('tap', function(){
		$('#grid').text('');
        if( window.localStorage.getItem('fromCloset')  == 1){
            $.mobile.changePage("#closet",{transition: "slide"});
        }
        else{
            $.mobile.changePage("#main",{transition: "slide"});
        }
        
	});
	$('#iFrameBack').on('tap', function(){
		history.back();
	});
	$('#iFrameForward').on('tap', function(){
		history.forward();
	});
});
