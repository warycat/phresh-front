var Closet = (function($){
	var pub = {};
	var priv = {
		'checkOutItems': [],
		'subtotal': 0,
	};
	var config = {
		'user_id': 5,
		'closet_uri': 'http://phresh-lb-1028091368.us-west-2.elb.amazonaws.com/phresh-server/closet?', 
		'limit_call': 20,
		'defaultMessage': "Found this on #phresh"
	};
	
	/************************
	* START PRIVATE FUNCTION
	*************************/
	priv.makeItem = function(json){
			return '<li><img src="data:image/jpeg;base64,'+ json.image +'"></li>';
	}
	priv.makeCheckOutItem = function(json){
		return '<li><div class="checkOutImages" style="background-image:url(data:image/jpeg;base64,' + json.image + ')"></div><div class="right"><h4 class="checkOutListTitle">' + json.name + '</h4><div class="checkOutDescription">' + json.description + '</div> <div class="checkOutAfterDescription"><div class="checkOutQuantity"><label for="quantity">Q: </label><input type="number" name="quantity" value="1"/></div><div class="checkOutItemPrice phreshColor">$' + json.price + '</div></div></div></li>'	
	}
	
	/**************************
	* START PUBLIC FUNCTIONS
	***************************/
	pub.connect = {
		getItems: function(){
			return $.ajax({
					url: config.closet_uri + "limit="+ config.limit_call,
					crossDomain:true,
					beforeSend: function(xhr){
						xhr.setRequestHeader('Authorization', $('#main').data('auth_token'));	
					},
					headers: {
						"Authorization": $('#main').data('auth_token')
					}
			})
			.done(function(json){
				$('#closetSpinner').hide();
				return json;
			});
		},
		addItems: function(){
			return this.getItems().then(function(json){
				var jsonIndex = json.items.length,
					jsonLength = jsonIndex;
				
				while(jsonIndex--){
					var $itemHtml = $(priv.makeItem(json.items[jsonIndex]));
					$itemHtml.data(json.items[jsonIndex]);
					$('#grid').prepend($itemHtml); //prepend to internal html element (preserve order)
				}
			});
		}
	};
	
	
	pub.checkOut = {
		addItems: function(){
			var $items = $('#grid > .selected');
			if ($items.length === 0){
				return;
			}
			$items.each(function(){
				priv.checkOutItems.push($(this).data());
				priv.subtotal += parseFloat($(this).data('price'));
			});
			$.mobile.changePage("#checkOutPage",{transition: "slide"});
		},
		displayItems: function(){
			var numItems = priv.checkOutItems.length;
			for(var i = 0; i < numItems; i++){
				$('#checkOutList').append(priv.makeCheckOutItem(priv.checkOutItems[i]));	
			}
		},
		showDetails: function(){
			$('#checkOutSubtotal').text('Subtotal: $' + priv.subtotal);
			$('#checkOutItemCount').text(priv.checkOutItems.length + ' items');
		}
	};
	
	return pub;
})(jQuery);


$( document ).delegate("#closet", "pageinit", function() {
	var isAddToCart = false;

	$('#closetProfileName').text(window.localStorage.getItem('username'));
	
	$('#grid').on({
		tap: function(){
			if(isAddToCart){
				$(this).toggleClass('selected');
			}
			else{
				var $tapImage = $('#tapImage');
				$tapImage.find('div.image').css('background-image', 'url(' + $(this).find('img').attr('src') + ')');
				$tapImage.find('div.desc').html($(this).data('description') + '<div class="headerStat">' + $(this).data('price_label') + '</p>');
				$tapImage.data('click_url', $(this).data('click_url'));
				$('#tapTitle').text($(this).data('name'));
				$('#tapImageBG').show(500);
			}
		}
	}, 'li');
	
	/*******************************************
	* START BUTTON HANDLERS
	********************************************/
	$('#closetHeaderRight').on('tap', function(){
		$('#checkOut').toggleClass('show');
		isAddToCart = !isAddToCart;
	});
	$('#closetHeaderLeft').on('tap', function(){
		$.mobile.changePage("#main",{transition: "slide"});
        window.localStorage.setItem('fromCloset', 0);
	});
	$('#tapImageCloseBtn').on('tap',function(){
		$('#tapImage').removeClass('tap');
		$('#tapImageBG').hide(200);
	});
	$('#tapImage').on('tap',function(){
		$(this).toggleClass('tap');
	});
	$('#checkOut').on('tap', function(){
		Closet.checkOut.addItems();	
	});
	$('#showroomBuy').on('tap', function(){
		MixPanel.track.generateUserEvent('user clicked on purchase from showroom screen');
		$('#iFrame').attr('src', $('#tapImage').data('click_url'));
		$.mobile.changePage("#webFrame",{transition: "slide"});
	});
	$('#showroomShare').on('tap', function(){
		var dataSend = {longUrl: $('#tapImage').data('click_url')};
		$.ajax({
			type: 'POST',
			url: "https://www.googleapis.com/urlshortener/v1/url",
			data: JSON.stringify(dataSend),
			dataType: 'json',
			contentType: 'application/json'
 		})
		.done(function(data){
			window.plugins.socialsharing.share(defaultMessage, null, $('#tapImage').find('div.image').css('background-image'), data.id );
		});
	});
	
	
});
$(document).delegate("#closet", "pageshow", function(){
	$('#closetSpinner').show();
	var likes = window.localStorage.getItem('firstRight'),
	 	swipes = window.localStorage.getItem('totalSwipes'),
		ratio = Math.floor((likes/swipes)*100);
		
	$('#statLikes').text(likes);
	$('#statSwipes').text(swipes);
	$('#statRatio').text(ratio + '%');
	Closet.connect.addItems();
});
$( document ).delegate("#checkOutPage", "pageinit", function() {
	Closet.checkOut.displayItems();
	Closet.checkOut.showDetails();
	
	$('#checkOutHeaderLeft').on('tap', function(){
		$.mobile.changePage("#closet",{transition: "slide"});
        window.localStorage.setItem('fromCloset', 1);
	});
});
