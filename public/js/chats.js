class Chats extends Main {
  constructor() {
    super();
    this.alias = 'chats';
    $('#action-chat-list').on('click', () => {
      this.list();
    });
  }

  list() {
    const html = `
    <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Last Message</th>
        <th scope="col">Unread Messages</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Default</th>
        <td>Last Message (2018/11/21)</td>
        <td>3</td>
      </tr>
    </tbody>
  </table> 
    `;
    this.ajax({
      url: '/chats',
      method: 'GET',
    })
      .then((data) => {
        console.log(data[0]);
        this.setHtml(html);
      })
      .catch(Symbol);
  }
}