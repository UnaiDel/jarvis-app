// Module to handle voice-related tasks
const say = require('say');

exports.speak = (text) => {
    say.speak(text);
};
