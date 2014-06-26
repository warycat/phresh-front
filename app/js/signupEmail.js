var signUp = (function($){
	var pub = {};
	
	//start config variables
	pub.config = {
		'numberOfPages': 5,
		'baseURI': 'http://phresh-lb-1028091368.us-west-2.elb.amazonaws.com/phresh-server/user'
	}
	
	//start private variables
	var priv = {
		//'pictureSource': navigator.camera.PictureSourceType,
		//'destinationType': navigator.camera.DestinationType,
		'currentPage': 1,
		'cameraData': '',
		'username': '',
		'password': '',
		'email': '',
		'firstName': '',
		'lastName': '',
		'gender': 'female',
		'birthday': ''
	}
	
	/************************
	* START PRIVATE METHODS
	************************/
	//start camera functions
	var camera = {
		'onPhotoDataSuccess': function(imageData) {
			pictureData = imageData;
			$('#addPhotoButton').css('background-image', 'url(data:image/jpeg;base64,' + imageData + ')').text('').addClass('imageAdded');
		},
		'onPhotoURISuccess': function(imageURI) {
	  		$('#nextSignUp').text('gotimage!');
		},
		'capturePhoto': function() {
		  // Take picture using device camera and retrieve image as base64-encoded string
		  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
			destinationType: destinationType.DATA_URL });
		},
		'capturePhotoEdit': function() {
		  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
		  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
			destinationType: destinationType.DATA_URL });
		},
		'getPhoto': function(source) {
		  // Retrieve image and return as base 64 encoded string
		  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 30,
			destinationType: destinationType.FILE_URI,
			sourceType: source });
		},
		'onFail': function(message) {
		  
		}
	}
	
	//takes to next page
	function nextPage(){
		$('#signUpFormCont').addClass('page' + (++priv.currentPage)).removeClass('page' + (priv.currentPage-1)); //go to next screen	
	}
	
	//start validation function object
	var validate = {
		'email': function(email){
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		},
		'username': function(username){
			var re = /^[a-zA-Z0-9#._!a$]+$/; //allows alphanum, _, ., #, !, @, $, %, ^, *
			return re.test(username);
		},
		'password':function(password){
			var re = /^[a-zA-Z0-9#._!$%^*]+$/; //allows alphanum, _, ., #, !, $
			return re.test(password);	
		},
		'confirmPass': function(password,confirmpass){
			return (password === confirmpass);	
		},
		'name': function(name){
			var re = /^[a-zA-Z]*$/; //allows alpha
			return re.test(name);
		}
	}
	
	//validates the first form, checks each field with regex function in validate object
	function validateForm1(){
		var pass = $('#signUpPassword').val(),
			email = $('#signUpEmail').val(),
			username = $('#signUpUsername').val(),
			b_pass = validate.password(pass),
			b_confirm = validate.confirmPass(pass, $('#signUpConfirm').val()),
			b_username = validate.username(username),
			b_email = validate.email(email),
			errorString = '';

		if(b_username && b_email && b_pass && b_confirm){
			priv.password = pass;
			priv.username = username;
			priv.email = email;
			$('#signUpFormCont').addClass('page' + (++priv.currentPage)).removeClass('page' + (priv.currentPage-1));
			$('#signUpError').hide();
			return;
		}
		else{
			if(!b_username)
				errorString = 'Invalid Username';
			else if(!b_email)
				errorString = 'Invalid Email';
			else if(!b_pass){
				errorString = 'Invalid Password';	
			}
			else{
				errorString = 'Password and confirmation do not match';	
			}
			$('#signUpError').show(100).text(errorString);
			return;
		}
		
	}
	
	function setGender(){
		if($('.selectedGender'))
			priv.gender = $('.selectedGender').attr('data-gender');
	}
	
	function validateNameForm(){
		var first = $('#signUpFirstName').val(),
			last = $('#signUpLastName').val(),
			birthday = $('#signUpBirthday').val(),
			b_first = validate.name(first),
			b_last = validate.name(last),
			errorString = '';
			console.log(first + ' ' + last + ' ' + b_first + ' ' + b_last);
			
			if(b_first && b_last){
				priv.firstName = first;
				priv.lastName = last;
				priv.birthday = birthday;
				$('#signUpError').hide();
				nextPage();
				$('#nextSignUp').text('Finish');
				return;
			}
			else{
				if(!b_first)
					errorSting = 'Invalid first name';
				else
					errorString = 'Invalid last name';

				$('#signUpError').show(100).text(errorString);
				return;
			}
	}

	function makeUserData(){
		var dataSend= {
			"account_medium":"basic",
			"credentials": { 
				"username": priv.username, 
				"password": priv.password 
			},
			"profile": { 
				"email": priv.email,
				"first_name": priv.firstName,
      			"last_name": priv.lastName,
				"base_categories": priv.gender 
			}
		}
		
		return dataSend;
	}
	
	function makeUser(){
		$('#signUpSpinner').show();
		$.ajax({
			url: pub.config.baseURI,
			type: 'POST',
			data: JSON.stringify(makeUserData()),
			processData: false,
			dataType: 'json',
			headers: {
				"Content-Type":"application/json"
			},
			success: function(response, textStatus, jqXHR){
				$('#signUpSpinner').remove();
				MixPanel.track.generateUserEvent('user signup success');
				MixPanel.track.trackSignup(response.auth_token, response);
				$.mobile.changePage("#splash",{
					transition: "slide"
				});
			},
			error: function(jqXHR, textStatus, errorThrown){
				MixPanel.track.generateUserEvent('user signup failure');
				$('#signUpSpinner').hide();
			 	$('#signUpError').show(100).text("This username is already taken");
				$('#signUpFormCont').addClass('page1').removeClass('page5');
				priv.currentPage = 1;
			}
		});	
	}
	
	/***********************
	* START PUBLIC METHODS
	************************/
	pub.nextPage = function(){
		switch(priv.currentPage){
			case 1:
				validateForm1();
				break;
			case 4:
				validateNameForm();
				break;
			case 2:
				setGender();
			case 3:
				$('#nextSignUp').text('Skip');
				nextPage();
				break;	
			case 5:
				makeUser(); //make account!
				break;
		}
	}
	
	pub.prevPage = function(){
		$('#signUpError').hide();
		switch(priv.currentPage){
			case 1:
				$.mobile.changePage("#splash",{transition: "slide"});
				break;
			case 2:
			case 3:
			case 4:	
			case 5:
				$('#nextSignUp').text('Next');
				$('#signUpFormCont').addClass('page' + (--priv.currentPage)).removeClass('page' + (priv.currentPage+1)); //go to prev screen
				break;
		}
	}
	
	return pub;	
})(jQuery)

//This document contains all of the javascript for the signup page
$( document).delegate('#signUp', 'pageinit', function(){
	
	/*******************************
	* START INPUT EVENTS
	*******************************/
	$('ul.signUpForm input').focus(function(){
		$(this).parents('li').addClass('focused');
	})
	.blur(function(){
		$(this).parents('li').removeClass('focused');
	});
	
	/*******************************
	* START TAP HANDLERS
	********************************/
	$('#nextSignUp').on('tap',function(){
		signUp.nextPage();
	});
	
	$('#backSignUp').on('tap',function(){
		signUp.prevPage();
	});
	
	$('#genderList > li').tap(function(){
		$('#nextSignUp').text('Next');
		$(this).addClass('selectedGender');
		$(this).siblings('li').removeClass('selectedGender');	
	});
});

