// references
const auth = require('./auth.json');
const http = require("http");
var Discord = require('discord.js');
// Retreive data
const stored_data = require('./data.js');
var trivia_array = stored_data.trivia_array;
var reply_msg = stored_data.reply_msg;

// Initialize Discord Bot
var bot = new Discord.Client();
bot.on('ready', (evt) => {
    console.log('Connected');
});
//Commands
bot.on('message', message => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    var text = message.content;
    var channel = message.channel;
    if (text.substring(0, 3) == '/sn') {
        var cmd = text.substring(3).split(' ').join('').toString().toLowerCase();
        var msg = "";
        var file_options = undefined;

        // Check commands
        if (cmd == 'trivia') { // trivia
            msg = trivia_array[Math.floor(Math.random() * trivia_array.length)];
            file_options = {
                files : [{
                    attachment: 'img/pose.jpg',
                    name: 'pose.jpg'
                }]
            }
        }
        else if (Object.keys(reply_msg).indexOf(cmd) != -1){ // Message to Subaru
            msg = reply_msg[cmd]
        }
        else if(cmd.substring(0, 4) == 'play'){
            var play_param = text.substring(3).split(' ').join('').substring(4);
            if (play_param == ''){
                msg = "It's blank, get your shit together"
            }
            console.log('play')
        }
        else { // Invalid Input
            msg = 'Bad input, try again';
            file_options = {
                files : [{
                    attachment: 'img/you-died.jpg',
                    name: 'you-died.jpg'
                }]
            }
        }
        // Send message
        channel.send(msg, file_options); // send to Discord Channel
    }
});

bot.login(auth.token);