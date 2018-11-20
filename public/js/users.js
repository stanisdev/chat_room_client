class Users extends Main {
  constructor() {
    super();
    this.alias = 'users';
    $('#action-login').on('click', () => {
      this.login();
    });
    $('body').on('click', '#users-login-send-form', () => {
      this.ajax({
        url: '/users/login',
        method: 'POST',
        data: {
          email: $(`#${this.alias}-login-email`).val(),
          password: $(`#${this.alias}-login-password`).val(),
        },
        auth: false,
      })
        .then((data) => {
          if (!(data instanceof Object) || typeof data.token !== 'string') {
            return alert('Unable to log in. Try again!');
          }
          const {token} = data;
          localStorage.setItem('auth_token', token);
          $('#action-chat-list').click();
        })
        .catch(Symbol);
    });
  }

  login() {
    const html = `
      <div style="width: 400px">
        <input type="email" class="form-control" value="mary@gmail.com" id="users-login-email" placeholder="Enter email">
        <br />
        <input type="password" class="form-control" value="nice_password" id="users-login-password" placeholder="Password">
        <br />
        <button id="users-login-send-form" type="submit" class="btn btn-primary">Submit</button>
      </div>
    `;
    this.setHtml(html);
  }
}