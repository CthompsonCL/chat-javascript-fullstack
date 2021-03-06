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
        socket.emit('new:user',$nickname.val(), data => {
            if(data){
             $("#NickWrap").hide();
             $("#contentWrap").show();

            }else{
                $nickerror.html(`
                <div class='alert alert-danger'>
                    That username already exits.
                </div>
                `);
            }
            $nickname.val('');
        });
    });

    $messageForm.submit( e =>  {
        e.preventDefault();
        socket.emit('send:message', $messageBox.val(), data => {
            $chat.append(`<p class='error'>${data}</p>`);
        }); 
        $messageBox.val('');
    });

    

    socket.on('new:message',function(data){
        DisplayMessage(data);
    })

    socket.on('usernames', data => {
        let html = "";
        for (let i = 0; i < data.length; i++) {
            html += `<p><i class='fas fa-user'></i>&nbsp;${data[i]}</p>`
            
        }
        $users.html(html);
    });

    socket.on('whisper',data => {
        $chat.append(`<p class='whisper'><b>${data.nick}:</b> ${data.msg}</p>`);
    });
    socket.on('load old messages', data =>{
        for(let i = 0; i<data.length;i++){
            DisplayMessage(data[i]);
        }
    })

    function DisplayMessage(data){
        $chat.append('<b>'+data.nick + '</b>: ' + data.msg+"<br/>");
    }


})
