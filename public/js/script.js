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
});