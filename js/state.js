/*
 * state.js
 *
 * Version 1.0
 *
 */

function setVersion() {
    var elements = document.getElementsByClassName("state");
    if (!jQuery.isEmptyObject(elements)) {
        elements[0].innerHTML = "Version 1.0";
    }
}

/*
 ********************************************************************************************
 * 
 *  Page State
 *
 ********************************************************************************************
 */


/*
 * Onboard
 *
 *
 */

var onboard = function () {
    //Define a variable unique to each instance
    this.type = 'onboard';
};
        
onboard.prototype = new State();

onboard.prototype.isValidNextState = function (nextState) {
	return true;
    switch (nextState.type) {
        case invite.name:
        case navigation.name:
        case pause.name:
            return true;
            break;
        default:
            return false;
    }
};

onboard.prototype.didEnterFromPreviousState = function (previousState) {
    goToPageFromPageAnimated(this, previousState, true);
};


/*
 * Pause
 *
 *
 */

var pause = function () {
    //Define a variable unique to each instance
    this.type = 'pause';
};
        
pause.prototype = new State();

pause.prototype.isValidNextState = function (nextState) {
	return true;
    switch (nextState.type) {
        case onboard.name:
        case navigation.name:
            return true;
            break;
        default:
            return false;
    }
};

pause.prototype.didEnterFromPreviousState = function (previousState) {
    goToPageFromPageAnimated(this, previousState, true);
};

/*
 * Invite
 *
 *
 */

var invite = function () {
    //Define a variable unique to each instance
    this.type = 'invite';
};
        
invite.prototype = new State();

invite.prototype.isValidNextState = function (nextState) {
	return true;
	switch (nextState.type) {
        case navigation.name:
            return true;
            break;
        default:
            return false;
    }
};

invite.prototype.didEnterFromPreviousState = function (previousState) {
    goToPageFromPageAnimated(this, previousState, true);
};

/*
 * Waiting
 *
 *
 */

var waiting = function () {
    //Define a variable unique to each instance
    this.type = 'waiting';
};
        
waiting.prototype = new State();

waiting.prototype.isValidNextState = function (nextState) {
	return true;
    switch (nextState.type) {
        case navigation.name:
		case waiting.name:
            return true;
            break;
        default:
            return false;
    }
};

waiting.prototype.didEnterFromPreviousState = function (previousState) {
    goToPageFromPageAnimated(this, previousState, true);
};

/*
 * Navigation
 *
 *
 */

var navigation = function () {
    //Define a variable unique to each instance
    this.type = 'navigation';
};
        
navigation.prototype = new State();

navigation.prototype.isValidNextState = function (nextState) {
	return nextState != navigation.name;
};

navigation.prototype.didEnterFromPreviousState = function (previousState) {
    goToPageFromPageAnimated(this, previousState, true);
};

/*
 * Trinity
 *
 *
 */

var trinity = function () {
    //Define a variable unique to each instance
    this.type = 'trinity';
};
        
trinity.prototype = new State();

trinity.prototype.isValidNextState = function (nextState) {
	return true;
	switch (nextState.type) {
        case navigation.name:
        case fraunces.name:
        case bowling.name:
        case pauls.name:
            return true;
            break;
        default:
            return false;
    }
};

trinity.prototype.didEnterFromPreviousState = function (previousState) {
   // present('notification', { title: 'The spirit energy is intense here.', subTitle: '', body: 'Open your SpectralGoggles to see if you can find the source', timeInterval: 0.1, repeats: false, sound: 'default', image: 'default', showInApp: true } );
    goToPageFromPageAnimated(this, previousState, true);
};

/*
 * Fraunces
 *
 *
 */

var fraunces = function () {
    //Define a variable unique to each instance
    this.type = 'fraunces';
};
        
fraunces.prototype = new State();

fraunces.prototype.isValidNextState = function (nextState) {
	return true;
    switch (nextState.type) {
        case navigation.name:
        case trinity.name:
        case bowling.name:
        case pauls.name:
            return true;
            break;
        default:
            return false;
    }
};

fraunces.prototype.didEnterFromPreviousState = function (previousState) {
    //present('notification', { title: 'The spirit energy is intense here.', subTitle: '', body: 'Open your SpectralGoggles to see if you can find the source', timeInterval: 0.1, repeats: false, sound: 'default', image: 'default', showInApp: true } );
    goToPageFromPageAnimated(this, previousState, true);
};


/*
 * Pauls
 *
 *
 */

var pauls = function () {
    //Define a variable unique to each instance
    this.type = 'pauls';
};
        
pauls.prototype = new State();


pauls.prototype.isValidNextState = function (nextState) {
	return true;
    switch (nextState.type) {
        case navigation.name:
        case trinity.name:
        case fraunces.name:
        case bowling.name:
            return true;
            break;
        default:
            return false;
    }
};

pauls.prototype.didEnterFromPreviousState = function (previousState) {
    //present('notification', { title: 'The spirit energy is intense here.', subTitle: '', body: 'Open your SpectralGoggles to see if you can find the source', timeInterval: 0.1, repeats: false, sound: 'default', image: 'default', showInApp: true } );
    goToPageFromPageAnimated(this, previousState, true);
};

/*
 * Bowling
 *
 *
 */

var bowling = function () {
    //Define a variable unique to each instance
    this.type = 'bowling';
};
        
bowling.prototype = new State();

bowling.prototype.isValidNextState = function (nextState) {
	return true;
    switch (nextState.type) {
        case navigation.name:
        case trinity.name:
        case fraunces.name:
        case pauls.name:
            return true;
            break;
        default:
            return false;
    }
};

bowling.prototype.didEnterFromPreviousState = function (previousState) {
    //present('notification', { title: 'The spirit energy is intense here.', subTitle: '', body: 'Open your SpectralGoggles to see if you can find the source', timeInterval: 0.1, repeats: false, sound: 'default', image: 'default', showInApp: true } );
    goToPageFromPageAnimated(this, previousState, true);
};



/*
 ********************************************************************************************
 * 
 *  Player Mode State
 *
 ********************************************************************************************
 */

/*
 * unknown
 */

var unknown = function () {
    //Define a variable unique to each instance
    this.type = 'unknown';
};
        
unknown.prototype = new State();

unknown.prototype.isValidNextState = function (nextState) {
   return nextState != unknown.name;
};

unknown.prototype.didEnterFromPreviousState = function (previousState) {
    
};


/*
 * Multiplayer
 *
 */

var multiplayer = function () {
    //Define a variable unique to each instance
    this.type = 'multiplayer';
};
        
multiplayer.prototype = new State();

multiplayer.prototype.isValidNextState = function (nextState) {
    switch (nextState.type) {
        case unknown.name:
            return true;
            break;
        default:
            return false;
    }
};

multiplayer.prototype.didEnterFromPreviousState = function (previousState) {
    playerModeStateUpdated();
};

/*
 * Singleplayer
 *
 *
 */

var singleplayer = function () {
    //Define a variable unique to each instance
    this.type = 'singleplayer';
};
        
singleplayer.prototype = new State();

singleplayer.prototype.isValidNextState = function (nextState) {
    switch (nextState.type) {
        case unknown.name:
        case multiplayer.name:
            return true;
            break;
        default:
            return false;
    }
};

singleplayer.prototype.didEnterFromPreviousState = function (previousState) {
     playerModeStateUpdated();
};

// Creates and adds states to the Player’s state machine.
var playerModeState = new StateMachine([new unknown(), new singleplayer(), new multiplayer()]);

/*
 ********************************************************************************************
 * 
 *  Participant Type State
 *
 ********************************************************************************************
 */

/*
 * Owner
 */

var owner = function () {
    //Define a variable unique to each instance
    this.type = 'owner';
};
        
owner.prototype = new State();

owner.prototype.isValidNextState = function (nextState) {
   switch (nextState.type) {
        case unknown.name:
            return true;
            break;
        default:
            return false;
    }
};

owner.prototype.didEnterFromPreviousState = function (previousState) {
    participantTypeStateUpdated();
};

/*
 * PrivateUser
 */

var privateUser = function () {
    //Define a variable unique to each instance
    this.type = 'privateUser';
};
        
privateUser.prototype = new State();

privateUser.prototype.isValidNextState = function (nextState) {
    switch (nextState.type) {
        case publicUser.name:
        case unknown.name:
            return true;
            break;
        default:
            return false;
    }
};

privateUser.prototype.didEnterFromPreviousState = function (previousState) {
    participantTypeStateUpdated();
};

/*
 * PublicUser
 */

var publicUser = function () {
    //Define a variable unique to each instance
    this.type = 'publicUser';
};
        
publicUser.prototype = new State();

publicUser.prototype.isValidNextState = function (nextState) {
    switch (nextState.type) {
        case privateUser.name:
        case unknown.name:
            return true;
            break;
        default:
            return false;
    }
};

publicUser.prototype.didEnterFromPreviousState = function (previousState) {
    participantTypeStateUpdated();
};

var participantTypeState = new StateMachine([new unknown(), new owner(), new privateUser(), new publicUser()]);

/*
 ********************************************************************************************
 * 
 *  Game Mode State
 *
 ********************************************************************************************
 */

/*
 * Active
 */

var active = function () {
    //Define a variable unique to each instance
    this.type = 'active';
};
        
active.prototype = new State();

active.prototype.isValidNextState = function (nextState) {
    switch (nextState.type) {
        case inactive.name:
            return true;
            break;
        default:
            return false;
    }
};

active.prototype.didEnterFromPreviousState = function (previousState) {
    gameModeStateUpdated();
};

/*
 * Inactive
 */

var inactive = function () {
    //Define a variable unique to each instance
    this.type = 'inactive';
};
        
inactive.prototype = new State();

inactive.prototype.isValidNextState = function (nextState) {
    switch (nextState.type) {
        case active.name:
            return true;
            break;
        default:
            return false;
    }
};

inactive.prototype.didEnterFromPreviousState = function (previousState) {
    gameModeStateUpdated();
};

var gameModeState = new StateMachine([new unknown(), new inactive(), new active()]);


var urlPath = new stateProperty('urlPath');
var currentParticipants = new stateProperty('currentParticipants');

