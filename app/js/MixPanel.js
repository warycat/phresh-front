var MixPanel = (function(){
	var pub = {};
	var priv = {};

	pub.track = {
		trackUser: function(auth){
			console.log('trackUser called');
			mixpanel.identify(auth);	
		},
		trackSignup: function(auth, profile){
			console.log('trackSignUp called');
	
			var fname, lname, bday;
			if( profile.first_name != undefined){
				fname = profile.first_name;
			}
			else{
				fname = 'N/A';
			}
			if( profile.last_name != undefined){
				lname = profile.last_name;
			}
			else{
				lname = 'N/A';
			}
			if( profile.birthday != undefined){
				bday = profile.birthday;
			}
			else{
				bday = 'N/A';
			}
			
			mixpanel.people.set({
				"email": profile.email, 
				"first_name":fname, 
				"last_name":lname,
				"birthday":bday, 
				"base_categories":profile.base_categories } 
			);
	
			this.trackUser(auth);
		},
		generateUserEvent: function(type, prop){
		console.log('generateUserEvent called');
			mixpanel.track(
				type,
				prop
			);
		}
	};
	
	return pub;
}())