function setVersion() {
	var elements = document.getElementsByClassName("status");
	elements[0].innerHTML = "Version 1.0.4";
}

// Creates and adds states to the Player’s state machine.
var pageState = new StateMachine([new unknown(), new onboard(), new pause(), new invite(), new waiting(), new navigation(), new trinity(), new fraunces(), new pauls(), new bowling()]);

window.onload = function() {
	logMessage('Window Loaded' + JSON.stringify(gameState.get()));

	$('.page').hide();
	setVersion();

	updatePage();
}


function updatePage() {

	var currentGameState = gameState.get();

	if (jQuery.isEmptyObject(currentGameState)) {
		/* Set up GameState */
		participantTypeState.enter(unknown);
		playerModeState.enter(unknown);
		currentScore = 0;
		currentVisits = [];
		goTo(onboard);
	}
	if (jQuery.isEmptyObject(currentParticipants.get())) {
		playerModeState.enter(singleplayer);
		/* Singleplayer mode */
		if (pageState.currentStateName == undefined) {
			goTo(onboard);
			return;
		}
		else {
			$("#" + pageState.currentStateName + ".page").show();
		}
	}
	else {
		playerModeState.enter(multiplayer);
		/* Multiplayer mode */
		switch (currentGameState.participantType) {
			case owner.name:
				if (pageState.currentStateName == undefined) {
					goTo(invite);
					return;
				}
				else {
					$("#" + pageState.currentStateName + ".page").show();
				}
				break;
			default:
				switch (gameModeState.currentStateName) {
				case active.name:
					goTo(navigation);
					break;
				default:
					goTo(waiting);
					break;
				}
				break;
			}
		}
	}

// Creates and adds states to the Player’s state machine.
var pageState = new StateMachine([new unknown(), new onboard(), new pause(), new invite(), new waiting(), new navigation(), new trinity(), new fraunces(), new pauls(), new bowling()]);
var participantTypeState = new StateMachine([new unknown(), new owner(), new privateUser(), new publicUser()]);
var playerModeState = new StateMachine([new unknown(), new singleplayer(), new multiplayer()]);
var currentScore;
var currentVisits;

// The GameState is a JSON String that the each WebView Archive creates and maintains.
// This is private to each User.
// The GameState Truth comes from each Uaer.
// The GameState is blank for each user on the WebArchive creation.
// Set the GameState here to Sync with CloudKit

var gameState = {

	set: function(newValue) {
		logMessage('Game State Set ' + JSON.stringify(newValue));

		if (newValue == undefined) {
			return;
		}
		if (newValue.participantType) {
			var participantTypeClass = participantTypeState.classFromClassName(newValue.participantType);
			participantTypeState.enter(participantTypeClass);
		}
		if (newValue.playerMode) {
			var playerModeClass = playerModeState.classFromClassName(newValue.playerMode);
			playerModeState.enter(playerModeClass);
		}
		if (newValue.score) {
			currentScore = newValue.score;
		}
		if (newValue.visited) {
			currentVisits = newValue.visited;
		}
		if (newValue.page) {
			var pageClass = pageState.classFromClassName(newValue.page);
			pageState.enter(pageClass);
		}

	},
	get: function() {
		return jQuery.extend(true, {}, {
			get page() {
				return pageState.currentStateName;
			},
			get participantType() {
				return participantTypeState.currentStateName;
			},
			get playerMode() {
				return playerModeState.currentStateName;
			},
			get score() {
				return currentScore;
			},
			get visited() {
				return currentVisits;
			}
		});
	}
};

/*
 * gameShareState
 *
 * Store in the webview the gameShareState
 *
 * The GameShareState is a JSON String that the owner of a multiplayer WebView Archive creates and maintains.
 * This is public to each User that has accepted the share.
 * The GameShareState Truth comes from the Owner.
 * The GameShareState is empty until the Owner creates it. When a User accepts the share this value will be populated.
 * Set GameShareState here to Sync with Cloudkit
 */


var gameShareState = {

	set: function(newValue) {
		if (newValue == undefined) {
			return;
		}
		var currentState = this.get();
		if (newValue.gameMode) {
			var gameModeClass = gameModeState.classFromClassName(newValue.gameMode);
			gameModeState.enter(gameModeClass);
		}
		var newState = this.get();
		if (currentState != newState) {
			gameShareStateUpdated(newValue);
		}
	},
	get: function() {
		return jQuery.extend(true, {}, {
			get gameMode() {
				return gameModeState.currentStateName;
			},
		});
	}
};

/*
 * shareState
 * Store in the webview the shareState
 *
 * the shareState is a json serialized blob that can be used by the web archive to store its global state
 *
 * The ShareState is a JSON String that represents a snapshot of the ShareMO.
 * The ShareState Truth comes from Cloudkit
 * The ShareState is created with the GameShareState
 * Set ShareState here to Sync with Cloudkit
 *
 */

var currentParticipants;// = new stateProperty("currentParticipants");
var currentUrl;


var shareState = {

	set: function(newValue) {
		if (newValue == undefined) {
			return;
		}
		var currentShareState = this.get();
		if (newValue.participants) {
			currentParticipants = newValue.participants;
		}
		if (newValue.url) {
			currentUrl = newValue.url
		}
		var newShareState = this.get();
		if (currentShareState != newShareState) {
			shareStateUpdated(newValue);
		}
	},
	get: function() {
		return {
			get participants() {
				return currentParticipants;
			},
			get url() {
				return currentUrl;
			}
		}
	}
};

/*
 * playerState
 *
 * The current User's ID and Display Name.
 *
 */

var playerState = new stateProperty("playerState");

// changes the page and updates the pageState

function goTo(stateClass) {
	pageState.enter(stateClass);
}

function goToPageFromPageAnimated(newPage, oldPage, animated) {
	if (oldPage == undefined) {
		$("#" + newPage.type + '.page').show();
	}
	else {
		if (animated == undefined) {
			animated = true;
		}
		if (animated) {
			$("#" + oldPage.type + '.page').slideUp();
			$("#" + newPage.type + '.page').slideDown();
		}
		else {
			$("#" + oldPage.type + '.page').hide();
			$("#" + newPage.type + '.page').show();
		}
	}
	pageStateUpdated();
}

/*
 * This is where to put code to test for changes in the GameState
 * Do not call this directly. The GameState will be updated by CloudKit
 * or gameState.set(newState);
 */


function stateUpdated(changedProperty, changedValue) {

	logMessage("changedProperty: " + changedProperty + ", changeValue: " + changedValue);

	switch (changedProperty) {
	case "shareState":
		shareStateUpdated(changedValue);
		break;
	case "isMultiplayer":
		playerModeStateUpdated();
		// Since the pageState is resposible for setting the multiplayer state no need to persist the multiplayer state here
		break;
	case "currentParticipantType":
		participantTypeUpdated();
		break;
	case "currentScore":
		scoreUpdated();
		break;
	case "isActive":
		activeUpdated()
		break;
	case "urlPath":
		break;
	case "currentParticipants":
		participantStateUpdated();
		break;
	case "currentPage":
		pageStateUpdated();
		break;
	case "currentVisits":
		visitedStateUpdated();
	default:
		break;
	}
}

/* gameShareStateUpdated
 *
 * This will get called in response to a Notfication
 * Do not call this directly.
 */

function gameShareStateUpdated(changedProperty) {
	if (participantTypeState.currentStateName == owner.name) {
		saveGameShareState(gameShareState.get());
	}
// 	if (changedProperty.gameMode == gameModeState.currentStateName) {
		
// 	}
// 	logMessage("gameShareStateUpdated");
// 	var activeState = gameModeState.currentStateName;
// 	var currentShareState = shareState.get();
// 	if (!jQuery.isEmptyObject(currentShareState)) {
// 		if (currentShareState.isOwner != true) {
// 			var currentPage = pageState.get();
// 			if (currentPage == Waiting && isActive == true) {
// 				goTo(Navigation);
// 			}
// 			if (currentPage == Navigation && isActive == false) {
// 				goTo(Waiting);
// 			}
// 		}
// 	}
}

// The Share State is Determind by CloudKit
// This is is where to react to changes to shareState.set(string)
// Do not call this directly
// In this example we send a notification to District-1 telling the Participant someone has joing the Game.
function shareStateUpdated(shareState) {
	logMessage("shareStateUpdated");
// 	if (participantTypeState.currentStateName == unknown.name) {
// 		var participants = currentParticipants;
// 		let currentParticipant = participants.filter(function isDefaultOwner(object) {
// 													 return object.participantID == "__defaultOwner__";
// 													 })[0];
		
		
// 		participantTypeState.enter(participantTypeState.classFromClassName(currentParticipant.type));
//		switch (currentParticipant.type) {
//			case owner.name:
//				participantTypeState.enter(owner);
//				break;
//			default:
//				participantTypeState.enter(publicUser);
//				break;
//		}
//	}
	
	
	
	// 	var participantType = gameState.get().participantType;
	
	// 	if (shareState.isOwner == true) {
	// 		let gameShare = gameShareState.get();
	// 		if (gameShare == undefined) {
	// 			gameShareState.set({
	// 				active: false
	// 			});
	// 		}
	// 	}
}


// 	var participants = shareState.participants;
// 	var oldParticipants = currentParticipants;
// 	let changedParticipants = $(participants).not(oldParticipants).get();
// 	for (index in changedParticipants) {
// 		let participant = participants[index];
// 		if ("__defaultOwner__" != participant.participantID && participant.type != 'owner') {
// 			let participantName = participant.name;
// 			present('notification', {
// 				title: "Ghost Stories of New York",
// 				subTitle: '',
// 				body: participantName + ' has joined the Adventure',
// 				timeInterval: 0.1,
// 				repeats: false,
// 				sound: 'default',
// 				image: 'default',
// 				showInApp: true
// 			});
// 		}
// 	}
//participantsState.set(participants)

// function participantsStateUpdated(newParticipantsState) {

// }

// Page has been set. Do any additonal page setup here
function pageStateUpdated() {
// 	logMessage('pageStateUpdated' + JSON.stringify(gameState.get()));
	var page = gameState.get().page;
	switch (page) {
	case onboard.name:
		break;
	case pause.name:
		break;
	case invite.name:
		//playerModeState.enter(multiplayer);
		break;
	case navigation.name:
		updateNavigation();
		break;
	case fraunces.name:
	case bowling.name:
	case trinity.name:
	case pauls.name:
		updateDetail(page);
		break;
	default:
		break;
	}
	saveGameState(gameState.get());
}

function playerModeStateUpdated() {
	saveGameState(gameState.get());

	switch (playerModeState.currentStateName) {
	case multiplayer.name:
		//isOwner.set(true);
		//persistGameState();
		//setParticipantShareState();
		break;
	default:
		break;
	}
}

function visitedStateUpdated() {
}

function participantTypeStateUpdated() {

}

function participantStateUpdated() {
	if (gameState.participantType == undefined) {
		setupParticipantType();
	}
	if (participantTypeState.currentStateName == owner.name) {
		goTo(invite);
	}
}

function scoreUpdated() {
}

function gameModeStateUpdated() {
	if (participantTypeState.currentStateName != owner.name) {
		switch (gameModeState.currentStateName) {
			case active.name:
				goTo(navigation);
			break
			default:
				goTo(waiting);
			break;
		}
	}
}

// function activeUpdated() {
// 	if (isOwner.get() == true) {
// 		saveGameShareState(gameShareState.get());
// 	}
// }

function setupParticipantType() {
	var participants = shareState.get().participants;
	var currentParticipant = participants.filter(function(object) {
		return object.participantID == "__defaultOwner__";
	})[0];
	var fetchedClass = participantTypeState.classFromClassName(currentParticipant.type);

	participantTypeState.enter(fetchedClass);

	saveGameState(gameState.get());
}

// React to iBeacon 

function currentPlaceStateUpdated() {
	let currentMajor = currentPlaceState.get().major;
	// if state is joined, process the place event
	if (currentMajor !== undefined) {
		switch (currentMajor) {
		case '1043':
		case '1044':
			showDetailPage(fraunces.name);
			break;
		case '1083':
		case '1006':
			showDetailPage(trinity.name);
			break;
		case '1023':
		case '1022':
			showDetailPage(pauls.name);
			break;
		case '1047':
		case '1054':
		case '1055':
		case '1002':
			showDetailPage(bowling.name);
		default:
			break;
		}
	}
}

function showAR(named) {
	var sceneName = named + ".scn";
	present('augmentedReality', {
		'scene': sceneName,
		'title': 'SpectralGoggles',
		'notAvailable': 'Specter Tracking not available',
		'initializing': 'Initializing SpecterScope',
		'excessiveMotion': 'Too much motion',
		'insufficientFeatures': 'Not enough ectoplasm detected',
		'normal': 'Move to find a specter'
	})
}

function showDirections(named) {
	switch (named) {
	case fraunces.name:
		present('directions', {
			'latitude': 40.7031,
			'longitude': -74.0115
		});
		break;
	case bowling.name:
		present('directions', {
			'latitude': 40.7049,
			'longitude': -74.0136
		});
		break;
	case trinity.name:
		present('directions', {
			'latitude': 40.70787,
			'longitude': -74.0118
		});
		break;
	case pauls.name:
		present('directions', {
			'latitude': 40.7109,
			'longitude': -74.0091
		});
		break;
	default:
		break;
	}
	;
}

function showCloudSharing() {
	present("cloudSharing");
}

function sendMessage() {
	var messageString = prompt("Please enter your message", "");
	if (messageString != null) {
		var participants = shareState.get().paricipants;
		if (participants != undefined) {
			var participantIDs = shareState.get().participants.map(participant => participant.participantID);
			perform({'function': 'message', 'messageString' : messageString, 'participantIDs' : participantIDs})
		}
	}
}

function updateNavigation() {

	switch (playerModeState.currentStateName) {
	case multiplayer.name:
		$('#invite.button').show();
		switch (participantTypeState.currentStateName) {
		case owner.name:
			$('#pause.button').show();
			break;
		default:
			$('#pause.button').hide();
			break;
		}
		break;
	case singleplayer.name:
		$('#invite.button').show();
		$('#pause.button').show();
		break;
	}

	$('#navigation.page').find('.main .button').css("background-color", '#4CAF50');
	if (currentVisits != undefined && !jQuery.isEmptyObject(currentVisits)) {
		for (let visit of currentVisits) {
			$('#' + visit + '.button').css("background-color", "red");
		}
	}
}


function updateDetail(named) {
	var visitElement = $('#ar' + '.button');
	if (currentVisits != undefined && !jQuery.isEmptyObject(currentVisits)) {
		let wasVisited = currentVisits.filter(function wasBeaconVisited(visit) {
			return visit == named;
		})[0];
		if (wasVisited == named) {
			visitElement.show();
		}
		else {
			visitElement.hide();
		}
	}
	else {
		visitElement.hide();
	}

}

function showDetailPage(named) {
	if (jQuery.isEmptyObject(currentVisits)) {
		currentVisits = [];
		currentVisits.push(named);
		presentNotificationAndGoToPage(named);
	}
	else {
		let wasVisited = currentVisits.filter(function(visit) {
			return visit == named;
		}).length;

		console.log(wasVisited);
		if (wasVisited == false) {
			currentVisits.push(named);
			presentNotificationAndGoToPage(named);
		}
	}
}

function presentNotificationAndGoToPage(named) {
	present('notification', {
		title: 'The spirit energy is intense here.',
		subTitle: '',
		body: 'Open your SpectralGoggles to see if you can find the source',
		timeInterval: 0.1,
		repeats: false,
		sound: 'default',
		image: 'default',
		showInApp: true
	});

	goTo(pageState.classFromClassName(named));
}

function reset() {
	//isMultiplayer.set(false);
	//var currentState = gameState.get();
	//currentState.visited = [];
	//gameState.set(currentState);
	goTo(onboard);
	gameModeState.enter(unknown);
	playerModeState.enter(unknown);
	participantTypeState.enter(unknown);
	persistGameState();
	persistGameShareState();

}

