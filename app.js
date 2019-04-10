var express = require('express');
var app = express();
var io = require('socket.io')();

const port = process.env.PORT || 3000;

//tell express where our static files are -> js, images, css
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/logout', (req, res, next) => {
    res.sendFile(__dirname + '/views/logout.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

var users = []; 

io.attach(server);
// socket.io   
io.on('connection', function (socket) {
    console.log('a user has connected');
    socket.emit('connected', { sID: `${socket.id}`, message: 'new connection' });

    // listen to an incoming message from anyone connected to the app
    socket.on('chat message', function (msg) {
        // check the message 
        console.log('message: ', msg, 'socket: ', socket.id);
  
        //send the message to everyone that you connected to the app
        io.emit('chat message', { id: `${socket.id}`, message: msg });
    });
    
    //listen to  an incoming message from anyone disconnected to the app
    socket.on('log out', function (name) {
        let index = users.map(function(e) { return e.name; }).indexOf(name.name);
        console.log('index: ' + index, name.name );
        if (index > -1) {
            users.splice(index, 1);
         }
        io.emit('userLogout', {message: name, userList: users});
    });
  });