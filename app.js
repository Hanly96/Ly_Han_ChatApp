var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = process.env.PORT || 3030;

//tell express where our static files are (js, imagesm css etc)
app.use(express.static('public'));

app.get('/',(req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

http.listen(port, () => {
    console.lof(`app is running on port ${port}`);
});