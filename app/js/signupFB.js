//comment out alerts for production version
FB.Event.subscribe('auth.login', function (response) {
    //login();
});

FB.Event.subscribe('auth.logout', function (response) {
    //alert('auth.logout event');
});

FB.Event.subscribe('auth.sessionChange', function (response) {
    //alert('auth.sessionChange event');
});

FB.Event.subscribe('auth.statusChange', function (response) {
    //alert('auth.statusChange event');
});

/*function getSession() {
alert("session: " + JSON.stringify(FB.getSession()));
}
*/
function getLoginStatus() {
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            var uid, firstName, lastName, bday, gender, accessToken = response.authResponse.accessToken, expiresIn = response.authResponse.expiresIn;
            FB.api('/me', function (response) {
                //alert('Good to see you, ' + response.first_name + '.');
                firstName = response.first_name;
                lastName = response.last_name;
                bday = response.birthday;
                gender = response.gender;
                uid = response.id;
                createParse(uid, accessToken, expiresIn, firstName, lastName, bday, gender);
                //loginParse(uid, accessToken, expiresIn);
            });

            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token 
            // and signed request each expire

        } else if (response.status === 'not_authorized') {
            //alert("not authorized");
            // the user is logged in to Facebook, 
            // but has not authenticated your app
            login();
        } else {
            //alert("user isn't logged in to Facebook");
            // the user isn't logged in to Facebook.
            login();
        }
    }, true);
}
/*
var friendIDs = [];
var fdata;

function me() {
    FB.api('/me/friends', {
        fields: 'id, name, picture'
    }, function (response) {
        if (response.error) {
            alert(JSON.stringify(response.error));
        } else {
            var data = document.getElementById('data');
            fdata = response.data;
            console.log("fdata: " + fdata);
            response.data.forEach(function (item) {
                var d = document.createElement('div');
                d.innerHTML = "<img src=" + item.picture + "/>" + item.name;
                data.appendChild(d);
            });
        }
        var friends = response.data;
        console.log(friends.length);
        for (var k = 0; k < friends.length && k < 200; k++) {
            var friend = friends[k];
            var index = 1;

            friendIDs[k] = friend.id;
            //friendsInfo[k] = friend;
        }
        console.log("friendId's: " + friendIDs);
    });
}
*/

function logout() {
    FB.logout(function (response) {
        alert('logged out');
    });
}

function login() {
    FB.login(
        function (response) {
            if (response.authResponse) {
                // the user is logged in and has authenticated your
                // app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed
                // request, and the time the access token 
                // and signed request each expire
                var uid, firstName, lastName, bday, gender;
                var accessToken = response.authResponse.accessToken;
                var expiresIn = response.authResponse.expiresIn;
                FB.api('/me', function (response) {
                    firstName = response.first_name;
                    lastName = response.last_name;
                    bday = response.birthday;
                    gender = response.gender;
                    uid = response.id;
                    createParse(uid, accessToken, expiresIn, firstName, lastName, bday, gender);
                    //loginParse(uid, accessToken, expiresIn);
                });
                //$.mobile.changePage("#main",{transition: "slide"});
            } else {
                //alert('User cancelled login or did not fully authorize.');
            }
        }, {
            scope: "email"
        }
    );
}

/*
function facebookWallPost() {
    console.log('Debug 1');
    var params = {
        method: 'feed',
        name: 'Facebook Dialogs',
        link: 'https://developers.facebook.com/docs/reference/dialogs/',
        picture: 'http://fbrell.com/f8.jpg',
        caption: 'Reference Documentation',
        description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
    };
    console.log(params);
    FB.ui(params, function (obj) {
        console.log(obj);
    });
}

function publishStoryFriend() {
    randNum = Math.floor(Math.random() * friendIDs.length);

    var friendID = friendIDs[randNum];
    if (friendID == undefined) {
        alert('please click the me button to get a list of friends first');
    } else {
        console.log("friend id: " + friendID);
        console.log('Opening a dialog for friendID: ', friendID);
        var params = {
            method: 'feed',
            to: friendID.toString(),
            name: 'Facebook Dialogs',
            link: 'https://developers.facebook.com/docs/reference/dialogs/',
            picture: 'http://fbrell.com/f8.jpg',
            caption: 'Reference Documentation',
            description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
        };
        FB.ui(params, function (obj) {
            console.log(obj);
        });
    }
}
*/
function createParse(uid, token, exp, firstName, lastName, bday, gender) {
    //alert("createParse got called!");
    //alert( uid + " " + token + " "  + exp + " " + firstName + " " + lastName);
    var dataSend = {
        "account_medium": "facebook",
        "credentials": {
            "id": uid,
            "access_token": token,
            "expires": parseInt(exp)
        },
        "profile": {
            "email": "nickvincent@ucla.edu",
            "first_name": firstName,
            "last_name": lastName,
            "birthday": bday,
            "base_categories": gender
        }
    };

    $.ajax({
        url: 'http://phresh-lb-1028091368.us-west-2.elb.amazonaws.com/phresh-server/user',
        type: 'POST',
        data: JSON.stringify(dataSend),
        processData: false,
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response, textStatus, jqXHR) {
            $('#splashSpinner').remove();
            //alert("Created a user!");
            $('#main').data("auth_token", response.auth_token);
            $.mobile.changePage("#main", {
                transition: "slide"
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown);

        }
    });
}

function loginParse(uid, token, exp) {
    var dataSend = {
        "account_medium": "facebook",
        "credentials": {
            "id": uid,
            "access_token": token,
            "expires": parseInt(exp)
        },
        "profile": {}
    };

    $.ajax({
        url: 'http://phresh-lb-1028091368.us-west-2.elb.amazonaws.com/phresh-server/user/login',
        type: 'POST',
        data: JSON.stringify(dataSend),
        processData: false,
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response, textStatus, jqXHR) {
            alert("Logged in!");
            alert(response.auth_token);
            $('#main').data("auth_token", response.auth_token);
            $.mobile.changePage("#main", {
                transition: "slide"
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

document.addEventListener('deviceready', function () {
    try {
        FB.init({
            appId: "644930635566311",
            nativeInterface: CDV.FB,
            useCachedDialogs: false
        });
    } catch (e) {
        alert(e);
    }
}, false);