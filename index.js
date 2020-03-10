let entbtn= document.querySelector("#entbtn");
let send= document.querySelector("#send");
let msginput = document.querySelector("#message");
let nameinput = document.querySelector("#name");
let socket = io();
let user;

entbtn.addEventListener("click",()=>{
let name=document.querySelector('#name').value;
if (name=name.trim()) {
socket.emit('setUsername', name);
user=name;
}
})
send.addEventListener("click",()=>{
sendMessage();
msginput.value="";
})

msginput.addEventListener("keyup",(event)=>{
if (event.keyCode === 13) {
event.preventDefault();
document.querySelector("#send").click();
msginput.value="";
}
})

nameinput.addEventListener("keyup",(event)=>{
if (event.keyCode === 13) {
event.preventDefault();
document.querySelector("#entbtn").click();
msginput.value="";
}
})
socket.on('userExists', function(data) {
document.querySelector('#error-container').innerHTML = data;
});
socket.on('userSet', function(data) {
user = data.username;
sendMessage();
document.querySelector("#username").innerHTML=`Hello, ${data.username}`;
document.querySelector(".container1").style.display="none";
document.querySelector(".container2").style.display="block";
});

function sendMessage() {
var msg = document.querySelector('#message').value;
if(msg) {
socket.emit('msg', {message: msg, user: user});
}
}

socket.on('newmsg', function(messages) {
let m='';

for(var i=0;i<messages.length;i++){
   if (messages[i].user==user) {
      m=m+`<div id="mymsg" style="float:right"<li style="list-style-type:none">
      ${messages[i].message} :<b> ${messages[i].user}</b>
      </li></div></br></br>`;

   }else{
      m=m+`<div id="othermsg" style="float:left"<li style="list-style-type:none">
      <b>${messages[i].user}</b> : ${messages[i].message}
     </li></div></br></br>`;
  

   }

}
document.querySelector('#mess').innerHTML=m;

let mcdiv=document.querySelector("#message-container");
mcdiv.scrollTop= mcdiv.scrollHeight;
})