window.onload = function() {
  
  var socket = io();
  var messages = [];
  var field = document.getElementById('field');
  var sendButton = document.getElementById('send');
  var content = document.getElementById('content');
  
  socket.on('getChatMessage', function (data) {
    if(data.message) {
      messages.push(data);
      var html = '';
      for(var i = 0; i < messages.length; i++) {
        html += messages[i].message + '<br />';
      }
     
      content.innerHTML = html;
    } else {
      console.log('not working', data);
    }
  });

  sendButton.onclick = sendMessage = function() {
    var text = field.value;
    socket.emit('sendChatMessage', {message: text});
    field.value = '';
  };

}

$(document).ready(function() {
  $('#field').keyup(function(e) {
     if(e.keyCode == 13) {
       sendMessage();
     }
  });
});



