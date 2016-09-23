/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, Mom said I should brush my teeth"
 *  Alexa: "You should probably do as she says: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.b3b14306-9252-40de-ad82-eef696463571";

/**
 * Array containing space responses.
 */
var RESPONSES = [
    "In the scheme of things, how important is it that you're right?",
    "Try to see the situation from OBJECT perspective.  I think you'll find it's probably okay.",
    "You should probably do as SUBJECT says, SUBJECT's usually right.",
    "This is something SUBJECT knows very well.  I'd go with it.",
    "Perhaps you can come up with a plan to meet OBJECT halfway.",
    "Does everything need to be a fight, or could you let OBJECT win this one?",
    "Part of growing up is knowing when to take good advice.",
    "SUBJECT has a point.  Perhaps you could find a way to at least meet OBJECT halfway."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Resolution = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Resolution.prototype = Object.create(AlexaSkill.prototype);
Resolution.prototype.constructor = Resolution;

Resolution.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Resolution.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    response.ask("Tell me who you're arguing with and what they said");
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Resolution.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Resolution.prototype.intentHandlers = {
    "CheckFemaleIsRightIntent": function (intent, session, response) {
        handleNewFemaleRequest(response);
    },

    "CheckMaleIsRightIntent": function (intent, session, response) {
        handleNewMaleRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.tell("I try to understand about your disagreement and provide advice as to how you can resolve it.  If you explain what was said, I might be able to help");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

function handleNewRequest(response, subject, object) {
    // Get a random response from list
    var resolutionIndex = Math.floor(Math.random() * RESPONSES.length);
    var randomResponse = RESPONSES[resolutionIndex];

    // Create speech output
    var speechOutput =  randomResponse.replace(/SUBJECT/g, subject).replace(/OBJECT/g, object);
    var cardTitle = "Your Resolution";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

/**
 * Gets a random new Resolution from the list and returns to the user.
 */
function handleNewFemaleRequest(response) {
    handleNewRequest(response, "she", "her")
}

function handleNewMaleRequest(response) {
    handleNewRequest(response, "he", "him")
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var resolutionIndex = new Resolution();
    resolutionIndex.execute(event, context);
};
