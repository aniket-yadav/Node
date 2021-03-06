var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);
app.get('/',function(req,res){
res.sendFile(__dirname+'/index.html');
});
app.get('/index.css',function(req,res){
res.sendFile(__dirname+'/index.css');
});
app.get('/index.js',function(req,res){
res.sendFile(__dirname+'/index.js');
});
var users = [];
var messages=[];
io.on('connection', function(socket) {
console.log('A user connected');
socket.on('setUsername', function(data) {
console.log(data);

if(users.indexOf(data) > -1) {
socket.emit('userExists', data + ' username is taken! Try some other username.');
} else {
users.push(data);
socket.emit('userSet', {username: data});
io.sockets.emit('newmsg',messages);
}
});

socket.on('msg', function(data) {

messages.push(data);
io.sockets.emit('newmsg',messages);
})
socket.on('disconnect',function(){
console.log(' A user disconnected');
});
});
http.listen(3000, function() {
console.log('listening on localhost:3000');
});
