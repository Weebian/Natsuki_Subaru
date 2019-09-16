// references
const {prefix, token} = require('./auth.json');
const http = require("http");
var Discord = require('discord.js');
// Retreive data
const stored_data = require('./data.js');
var trivia_array = stored_data.trivia_array;
var reply_msg = stored_data.reply_msg;

// Initialize Discord Bot
var client = new Discord.Client();
client.on('ready', (evt) => {
    console.log('Connected');
});
//Commands
client.on('message', message => {
    //Check if valid command message
    if (message.author.bot) return;  // From itself
    if (!message.content.startsWith(prefix)) return; // Is not a command

    // Obtain command
    var text = message.content; // Full message
    var channel = message.channel; // Current Channel
    var cmd = text.substring(3).split(' ').join('').toString().toLowerCase(); //Strip down message
    console.log(text)

    //Initialize Message and file options
    var msg = "";
    var file_options = undefined;

    // Check commands
    if (cmd == 'trivia') { // trivia
        msg = trivia_array[Math.floor(Math.random() * trivia_array.length)];
        file_options = {
            files: [{
                attachment: 'img/pose.jpg',
                name: 'pose.jpg'
            }]
        }
    }
    else if (Object.keys(reply_msg).indexOf(cmd) != -1) { // Message to Subaru
        msg = reply_msg[cmd]
    }
    else if (cmd.substring(0, 4) == 'play') {
        var play_param = text.substring(3).split(' ').join('').substring(4);
        if (play_param == '') {
            msg = "It's blank, get your shit together"
        }
        console.log('play')
    }
    else { // Invalid Input
        msg = 'Bad input, try again';
        file_options = {
            files: [{
                attachment: 'img/you-died.jpg',
                name: 'you-died.jpg'
            }]
        }
    }
    // Send message
    channel.send(msg, file_options); // send to Discord Channel
});

client.login(token);