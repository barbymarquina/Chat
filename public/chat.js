const socket= io();
//Elementos del DOM
let message= document.getElementById('message');
let username= document.getElementById('username');
let btn= document.getElementById('send');
let output= document.getElementById('output');
let actions= document.getElementById('actions');
//emite
btn.addEventListener('click', function(){
    socket.emit('chat:message',{
        username: username.value,
        message: message.value
    });
});

message.addEventListener('keypress', function() {
    socket.emit('chat:typing', username.value);
})
//escucha
socket.on('chat:message', function(data){
    actions.innerHTML= '';
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`
});

socket.on('chat:typing', function(data){
actions.innerHTML= `<p><em>${data} esta escribiendo un mensaje...<em></p> `
});