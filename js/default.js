/*
 * default.js
 *
 * District 1.0
 *
 */



window.addEventListener('load', function() {
	console.log('All assets are loaded');
	//setupForTesting();
	//readLocalStore();
});


// function readLocalStore() {
// 	var localGameState = JSON.parse(localStorage['gameState']);
// 	gameState.set(localGameState);
// 	logMessage("Read Local Storage Game State: " + JSON.stringify(gameState.get()));
// 	var localGameShareState = JSON.parse(localStorage['gameShareState']);
// 	gameShareState.set(localGameShareState);
// 	logMessage("Read Local Storage Game Share State: " + JSON.stringify(gameShareState.get()));
// }

// function setupForTesting() {
// 	setupAsOwner();
// 	//setupAsParticipant();
// }

function setupAsOwner() {
	playerState.set({
		"isDeveloper": "false",
		"city": "",
		"email": "",
		"playerID": "_b2f297a01484a83818b6cbefab2aaead",
		"placeName": "",
		"details": "",
		"gender": "",
		"familyName": "",
		"birthday": "",
		"beaconName": "",
		"latitude": "40.7092078813386",
		"occupation": "",
		"playerDisplayName": "",
		"phone": "",
		"beaconID": "",
		"placeID": "",
		"longitude": "-74.0169528768857"
	});
	
// 	shareState.set({
// 		"participants": [{
// 			"name": "William Aurnhammer",
// 			"participantID": "__defaultOwner__",
// 			"type": "owner",
// 			"acceptanceStatus": "accepted",
// 			"permission": "readWrite"
// 		}],
// 		"url": "https:\/\/www.icloud.com\/share\/0SKcszSSQ-63WVyMVPK0fPp3Q#Ghost_Stories_of_New_York"
// 	});
	
	gameState.set({
		"participantType": "owner",
// 		"page": "navigation"
	});
}

// function setupAsParticipant() {
// 	gameState.set({
// 		"participantType": "publicUser"
// 	});
// }

// function setupAsParticipant2() {
// playerState.set({
// 	"isDeveloper": "false",
// 	"city": "",
// 	"email": "",
// 	"playerID": "_c7fcbe21901c3b07467ecf5db401f2d0",
// 	"placeName": "",
// 	"details": "",
// 	"gender": "",
// 	"familyName": "",
// 	"birthday": "",
// 	"beaconName": "",
// 	"latitude": "40.7092433529603",
// 	"occupation": "",
// 	"playerDisplayName": "",
// 	"phone": "",
// 	"beaconID": "",
// 	"placeID": "",
// 	"longitude": "-74.0169597033561"
// });
// shareState.set({
// 	"participants": [{
// 		"name": "William Aurnhammer",
// 		"participantID": "_b2f297a01484a83818b6cbefab2aaead",
// 		"type": "owner",
// 		"acceptanceStatus": "accepted",
// 		"permission": "readWrite"
// 	}, {
// 		"name": "Bill Aurnhammer",
// 		"participantID": "__defaultOwner__",
// 		"type": "publicUser",
// 		"acceptanceStatus": "accepted",
// 		"permission": "readWrite"
// 	}],
// 	"url": "https:\/\/www.icloud.com\/share\/0SKcszSSQ-63WVyMVPK0fPp3Q#Ghost_Stories_of_New_York"
// });

// gameShareState.set({
// 	"gameMode": "inactive"
// });
// gameState.set({
// 	"participantType": "publicUser"
// });

// }


// Will log message to the browser's console when debugging in browser and log to the native console in the app.
function logMessage(message) {
	console.log(message);
}


// Used to simulate when the owner sets the game to active
function setGameShareStateActive() {
	gameShareState.set({"gameMode" : "active"});
}

// This method is overriden in app
function multiplayerSelected() {
	showCloudSharing();
	setupAsOwner();
	playerModeState.enter(multiplayer);
	goTo(invite);
}

function singleplayerSelected() {
	playerModeState.enter(singleplayer);
	goTo(navigation);
}

function startMultiplayer() {
	goTo(navigation);
	gameShareState.set({"gameMode" : "active"});
	//gameModeState.enter(active);
}

// function setGameState() {
// 	gameState.set({
// 		playerMode: "multiplayer",
// 		page: 'navigation'
// 	});
// }

function pauseGame() {
	goTo(pause);
//	gameModeState.enter(inactive);
	gameShareState.set({"gameMode" : "inactive"});
}

function resumeGame() {
	goTo(navigation);
//	gameModeState.enter(active);
	gameShareState.set({"gameMode" : "active"});

}

/*
 * Notification Object
 *
 * Store in the webview the current Notification to fire. The navtive app will query this value before fireing.
 *
 *
*/

function userNotificationUpdated() {}

var notificationObject = {
	title: 'Title',
	subTitle: 'SubTitle',
	body: 'Body',
	timeInterval: 0.1,
	repeats: false,
	sound: 'default',
	image: 'default',
	showInApp: false
};

function present(message, settings) {
	alert(message + ": " + JSON.stringify(settings));
}


// function sendMessageToRecipients(message, recipients) {
// 	alert(message + ": " + JSON.stringify(recipients));
// }


// function sendTestMessage() {
// 	var participants = shareState.get().paricipants;
// 	if (participants != undefined) {
// 		var participantIDs = shareState.get().participants.map(participant => participant.participantID);
// 		sendMessageToRecipients("test", participantIDs);

// 	}
// 	else {
// 		alert("participants not defined");
// 	}
// }

/*
 * CurrentPlaceState
 *
 * Store in the webview the Player's PlaceState
 *
 * Uses: currentPlaceState.set({'placeID' : XXX });, currentPlaceState.get()
 *
 * A dictionary of representing the current place.
 */

var defaultPlace = {
	placeName: 'Fraunces Tavern',
	placeID: '5229721F-3F7B-4685-95DA-10FF6FB46DBF',
	city: '',
	state: '',
	zip: '',
	accuracy: 30,
	currentDistance: 0,
	descriptiveText: '',
	favorite: true,
	imageSmall: '',
	latitude: 0,
	longitude: 0,
	major: '1044',
	tags: ''
};

var currentPlaceState = globalCurrentPlaceState();

function globalCurrentPlaceState() {
	var closure;
	return {
		get: function() {
			return jQuery.extend(true, {}, closure); //performs a deep copy to pass object by value
		},
		set: function(object) {
			newValue = JSON.stringify(object);
			oldValue = JSON.stringify(closure);
			if (newValue != oldValue) {
				closure = object;
				currentPlaceStateUpdated();
			}
		}
	};
}

/*
 * BeaconState
 *
 * Store in the webview the Player's BeaconState
 *
 * Uses: beaconState({'beaconID' : XXX });, beaconState.get()
 *
 * A dictionary of representing the current beacon.
*/

var beaconState = globalBeaconState();

var defaultBeacon =
{
	beaconName: 'Beacon 1',
	beaconID: 'E3A42479-6D11-4CBC-9BF8-869F511A9F0F'
};

function globalBeaconState() {
	var closure;
	return {
		get: function() {
			return jQuery.extend(true, {}, closure); //performs a deep copy to pass object by value
		},
		set: function(object) {
			closure = object;
			beaconStateUpdated();
		}
	};
}


var message = message()

function message(newValue) {
	return {
		set: function(newValue) {
			present('notification', {
				title: "Ghost Stories of New York",
				subTitle: '',
				body: newValue,
				timeInterval: 0.1,
				repeats: false,
				sound: 'default',
				image: 'default',
				showInApp: true
			});
		}
	}
}


/* Helper Functions */

function paginateText(text) {
	var clueString = "";
	for (var i = 0; i < text.length; i++) {
		if (i === 0) {
			// first line, do leading capital
			var initialChar = (text[i]).charAt(0);
			var followingText = (text[i]).substring(1);
			console.log("clue first line: " + initialChar + " followed by " + followingText);
			clueString = clueString + "<span class='leading'>" + initialChar + "</span>" + followingText + "<br>";
		}
		else {
			clueString = clueString + text[i] + "<br> ";
		}
	}
	return clueString;
}

var special = ['zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
var deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

function stringifyNumber(n) {
	if (n < 20)
		return special[n];
	if (n % 10 === 0)
		return deca[Math.floor(n / 10) - 2] + 'ieth';
	return deca[Math.floor(n / 10) - 2] + 'y-' + special[n % 10];
}

function presentDirections(latitude, longitude) {
	alert("latitude: " + latitude.toString() + ", longitude: " + longitude.toString())
}

/*
 *
 *
 * StateMachine
 *
 *
 */

function StateMachine(newStates) {
	this.states = newStates;
}

StateMachine.prototype = {

	stateForClass: function(stateClass) {
		return this.states.filter(function(state) {
			return state instanceof stateClass;
		})[0];
	},

	stateFromClassName: function(name) {
		return this.states.filter(function(state) {
			return state.type == name;
		})[0];
	},

	classFromClassName: function(name) {
		return window[name];
	},

	enter: function(stateClass) {

		if (this.canEnterState(stateClass)) {

			var previousState = this.stateFromClassName(this.currentStateName);
			this.currentStateName = stateClass.name;
			var nextState = this.stateForClass(stateClass);
			if (previousState != undefined) {
				previousState.willExitTo(nextState);
			}
			nextState.didEnterFromPreviousState(previousState);
			return true;
		}
		else {
			return false;
		}
	},
	canEnterState: function(stateClass) {
		if (this.currentStateName === undefined) {
			return true;
		}
		var newState = this.stateForClass(stateClass);
		var currentState = this.stateFromClassName(this.currentStateName);
		return currentState.isValidNextState(newState);
	}
}

/*
 * State
 *
 *
 */


var State = function() {
	this.type = 'Default';
};


State.prototype = {

	isValidNextState: function(nextState) {
		return false;
	},

	didEnterFromPreviousState: function(previousState) {
	},

	willExitTo: function(nextState) {

	}
};


function stateProperty(name) {
	var closure;
	return {
		get: function() {
			//return jQuery.extend(true, {}, closure);  //performs a deep copy to pass object by value
			return closure; //pass object
		},
		set: function(object) {
			newValue = JSON.stringify(object);
			oldValue = JSON.stringify(closure);
			if (newValue != oldValue) {
				closure = object;
				stateUpdated(name, closure);
			}
		}
	};
}

function perform(message) {
	logMessage("Perform: " + JSON.stringify(message));
}


function saveGameState(newState) {
	logMessage("GameState Persist: " + JSON.stringify(newState));
	localStorage['gameState'] = JSON.stringify(newState); // Disable Cross-Origin Restrictions
}

function saveGameShareState(newState) {
	logMessage("GameShareState Persist: " + JSON.stringify(newState));
	localStorage['gameShareState'] = JSON.stringify(newState); // Disable Cross-Origin Restrictions
}