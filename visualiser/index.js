var opn = require('opn');
var UI = require('readline-ui');
var ui = new UI();
 
// first, we need to render the "question" 
// to display in the terminal
var prompt = 'Welcome to the Visualiser! Opening the visualiser in your default browser...';
ui.render(prompt);
// opens the url in the default browser 
opn('src/visualiser.html');