class Chats extends Main {
  constructor() {
    super();
    this.alias = 'chats';
    this.chatId = null;
    $('#action-chat-list').on('click', () => {
      this.list();
    });
    $('body').on('click', `.action-${this.alias}-chat`, (chat) => {
      this.chatId = $(chat.currentTarget).attr('data-chat-id');
      this.messages();
    }).on('click', '#chats-write-message', () => {
      this.writeMessage();
    });
  }

  list() {
    this.ajax({
      url: '/chats',
      method: 'GET',
    })
      .then((chats) => {
        let html = '';
        for (let a = 0; a < chats.length; a++) {
          const chat = chats[a];
          html += `
            <tr data-chat-id="${chat.id}" class="action-chats-chat">
              <th scope="row">${chat.name}</th>
              <td>Last Message (2018/11/21)</td>
              <td>${chat.unread_messages}</td>
            </tr>
          `;
        }
        const resultHtml = `
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Last Message</th>
              <th scope="col">Unread Messages</th>
            </tr>
          </thead>
          <tbody>
            ${html}
          </tbody>
        </table> `;
        this.setHtml(resultHtml);
      })
      .catch(console.log);
  }

  messages() {
    const html = `
      <textarea class="form-control" id="message-text" rows="3"></textarea>
      <br />
      <button type="button" id="chats-write-message" class="btn btn-primary">Send</button>
    `;
    this.setHtml(html);
  }

  writeMessage() {
    this.ajax({
      url: '/messages/' + this.chatId,
      method: 'POST',
      data: {
        content: $('#message-text').val(),
        type: 0,
      },
    })
      .then((data) => {
        console.log(data);
      })
      .catch(console.log);
  }
}