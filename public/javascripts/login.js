$(function() {

  // Try to login
  f.loginModal = function () {
      f.setModal({
        title: f.t('Hello!'),
        form: 'login-form',
        close: false,
        keyboard: false,
        backdrop: 'static',
        buttons: '<button id="login" type="submit" class="btn btn-primary">' + f.t('Login') + '</button>',
        content: '<div class="form-group">' +
                 '<a href="/auth/facebook" class="btn btn-primary"><i class="fa fa-facebook"></i> ' + f.t('Login with Facebook') + '</a>' +
                 '<a href="/auth/twitter" class="btn btn-primary"><i class="fa fa-twitter"></i> ' + f.t('Login with Twitter') + '</a>' +
                 '</div>'
      }, function () {
        $('#login-name').on('keyup change', function () {
          $('#login-form').removeClass('has-error')              
        })

        // Submit handler/
        $('#login').click(function () {
          if ($('#login-name').val() != '') {
            $.cookie('logged-in', $('#login-name').val())
            vars.cookie = $('#login-name').val()
            f.login()
          }
          else {
            $('#login-form').addClass('has-error')
          }

          return false
        })
      })
  }

  // Login
  f.login = function () {
    vars.socket.emit('logged-in', vars.cookie)
    $('#foModal').modal('hide')
  }

})