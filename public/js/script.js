class Main {
  constructor() {
    this.server = 'http://localhost:4000';
  }
  setHtml(html) {
    $('#main-container').html(html);
  }
  ajax(params) {
    return new Promise((resolve, reject) => {
      const {method, url, data, auth} = params;
      $.ajax({
        url: this.server + url,
        method,
        cache: false,
        dataType: 'json',
        data,
        beforeSend(xhr) {
          if (auth !== false) {
            const authToken = localStorage.getItem('auth_token');
            xhr.setRequestHeader('Authorization', 'Bearer ' + authToken);
          }
        },
        success(data) {
          resolve(data);
        },
        error(err) {
          alert('Error during request');
          reject();
        }
      });
    });
  }
}

$(() => {
  new Users();
  new Chats();
  $('#action-chat-list').click();
  // return;
  let connection;
  try {
    connection = new WebSocket('ws://127.0.0.1:4000?access_token=' + localStorage.getItem('auth_token'));
  } catch (err) {
    
  }
  connection.onopen = function () {
    console.log('Opened');
    connection.send('Message From Client');
  };
  connection.onerror = function (error) {
    console.log('On Error');
    console.log(error);
  };
  connection.onmessage = function(event) {
    console.log('Received From Server');
    console.log(event);
  }
});