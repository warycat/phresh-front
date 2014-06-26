//This document holds the javascript for the splash screen
$( document).delegate('#splash', 'pageinit', function(){
	/***************************
	* START DOC GLOBALS
	****************************/
	var isLogin = false; //is the sign in button tapped?
	var isLoading = false;
	
	/***************************
	* START DOC FUNCTIONS
	****************************/
	//check if keepUserLoggedIn is set
	(function iskeepUserLoggedIn(){
		if(window.localStorage.getItem('keepLoggedIn') != undefined){
			$('#main').data('auth_token', window.localStorage.getItem('keepLoggedIn'));
			$.mobile.changePage("#main",{
					transition: "slide"
				});
		}
	})()
	
	//input: username and password
	//output: error or login
	function login(username, password){
		var dataSend = {
			"account_medium":"basic",
			"credentials":
				{
				  "username":username,
				  "password":password 
				}
			};
			
			$.ajax({
				url: 'http://phresh-lb-1028091368.us-west-2.elb.amazonaws.com/phresh-server/user/login',
				type: 'POST',
				data: JSON.stringify(dataSend),
				processData: false,
				contentType: "application/json",
				headers: {
					"Content-Type":"application/json"
				}
			})
			.done(function(json){
				MixPanel.track.trackUser(json.auth_token);
				MixPanel.track.generateUserEvent('user logged in');
				isLoading = false;
				$('#splashSpinner').remove();
				$('#main').data('auth_token', json.auth_token);
				window.localStorage.removeItem('username');
				window.localStorage.setItem('username', json.username);		
				if($('#keepLoggedIn:checked').length != 0){
					window.localStorage.setItem('keepLoggedIn', json.auth_token);
				} else{
					window.localStorage.removeItem('keepLoggedIn');
				}
				$.mobile.changePage("#main",{
					transition: "slide"
				});
			})
			.fail(function(jqXHR, textStatus){ //ERROR
				MixPanel.track.generateUserEvent('user failed to login');
				isLoading = false;
				$('#splashSpinner').hide();
				$('#signInError').show(200);
			});
		}
	
	/***************************
	* HANDLE TAPPING
	***************************/
	$('#signIn').tap(function(){
		if(isLogin && !isLoading){
			isLoading = true;
			$('#splashSpinner').show(100);
			login($('#usernameLogin').val(),$('#passwordLogin').val());
			/*$.mobile.changePage("#main",{
				transition: "slide"
			});*/
		}
		else{
			$(this).text('log in');
			$('#homeTitleCont').addClass('signIn');
			$('#signupFacebook').text('log in with facebook');
			$('#signupEmail').addClass('remove');
			$('#termsAndConditionsSplash').addClass('show');
			$('#backSplash').show(100);
			isLogin = true;
		}
	});
	
	$('#signupEmail').on('tap',function(){
		console.log('changing to sign up');
		$.mobile.changePage("#signUp",{transition: "slide"});
	});
	
	$('#signupFacebook').on('tap', function(){
		$('#splashSpinner').show(100);
		getLoginStatus();
	});
	
	$('#backSplash').on('tap', function(){
			$(this).hide();
			$('#signupEmail').removeClass('remove');
			$('#signupFacebook').text('sign up with facebook');
			$('#homeTitleCont').removeClass('signIn');
			$('#termsAndConditionsSplash').removeClass('show');
			isLogin=false;
			
	});
});