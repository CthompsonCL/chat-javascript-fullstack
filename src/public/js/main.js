$(function(){
    
    const socket = io();
    
    //Obtaining DOM elements from the interface
    const $messageForm = $('#messageForm');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    const $nickForm = $("#nickForm");
    const $nickname = $("#nickname");
    const $nickerror = $("#nickerror");

    const $users = $("#usernames");
    //Events

    $nickForm.submit(e => {
        e.preventDefault();
        socket.emit('new:user',$nickname.val(),data => {

        });
    })

    $messageForm.submit( e =>  {
        e.preventDefault();
        socket.emit('send:message', $messageBox.val()); 
        $messageBox.val('');
    });

    socket.on('new:message',function(data){
        $chat.append(data + '<br/>');
    })

})