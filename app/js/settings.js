var Settings = (function($){
	var pub = {};
	var config = {};
	var priv = {};
	
	priv.sizeSections = {
		female:{
			clothing: {
				sizes: ['XXS (0)', 'XS (2)', 'S (4-6)', 'M (8-10)', 
						'L (12-14)', 'XL (16-18)', 'XXL (20-22)', 'Petite XXS (0)', 
						'Petite XS (2)', 'Petite M (8-10)', 'Petite L (12-14)', 'Petite XL (16-18)', 
						'Petite 1X (14-16)', 'Petite 2X (18-20)', 'Petite 3X (22-24)', 'Petite 4X (26-28)', 
						'Petite 5X (30-32)'
						]
			}
			, jeans: {
				sizes: ['22', '23', '24', '25',
						'26', '27', '28', '29', 
						'30', '31', '32', '33', 
						'34', '35', '36', '37',
						'38', '39', '40'
						]
			}
			, shoes: {
				sizes: ['4', '4.5', '5', '5.5',
						'6', '6.5', '7', '7.5',
						'8', '8.5', '9', '9.5',
						'10', '10.5', '11', '11.5',
						'12', '12.5', '13', '13.5',
						'14', '14.5', '15'
						]
			}
		}
		, male: {
			shirts: {
				sizes: ['XS (Neck 13-13.5)', 'S (Neck 14-14.5)', 'M (Neck 15-15.5)', 'L (Neck 16-16.5)',
				 		'Xl (Neck 17-17.5)', 'XXL (neck 18-18.5)', 'XXXL (Neck 19-19.5)'
						]
			}
			, suits: {
				sizes: ['32', '34', '36', '38',
				 		'40', '42', '44', '46',
						'48', '50', '52'
						]
			}
			, shoes: {
				sizes: ['4', '4.5', '5', '5.5',
						'6', '6.5', '7', '7.5',
						'8', '8.5', '9', '9.5',
						'10', '10.5', '11', '11.5',
						'12', '12.5', '13', '13.5',
						'14', '14.5', '15'
						]
			}
		}
	};
	
	pub.init = function(){
		for (var sizeSection in priv.sizeSections.female) {
			var $cont = $('<ul class="settingsSection">');
			console.log(sizeSection);
			priv.sizeSections.female[sizeSection].sizes.forEach(function(val){
				console.log(val);
				$cont.append('<li>' + val + '</li>');
			});
			$('#shoppingSettings .settingsDone').before('<h3 class="phreshColor">' + sizeSection + '</h3>').before($cont);
		}
	}
	
	return pub;	
})(jQuery)

$(document).delegate('#settings', 'pageinit', function(){
	Settings.init();
	
	$('#settingsBar > li').click(function(){
		if(!$(this).hasClass('selected')){ //check if it is not selected
			$(this).addClass('selected').siblings().removeClass('selected');
			$('#settingsSlideCont').toggleClass('page2');
		}	
	});
	
	$('ul.settingsSection > li').on('tap', function(){
		$(this).toggleClass('selected');
	});
	
	/*******************
	* HANDLE ICON TAPS
	********************/
	$('#settingsBack').tap(function(){
		$.mobile.changePage("#main",{transition: "slide"});	
	});
	
	$('#logout').tap(function(){
		$.mobile.changePage("#splash",{transition: "slide"});	
		window.localStorage.removeItem('keepLoggedIn');
	});
});