$(function() {

    var vars = {
      socket: io.connect('http://localhost:3000'),
      facebookId: $.cookie('facebookId'),
      debug: true,
      templates: {}
    }

    // An object so everything stays nice and clean.
    var f = functions = {
      // Init the app.
      init: function () {
        if (!vars.facebookId) {
          f.clm('no facebookId')
          f.login()
        }
        else {
          vars.socket.emit('loggedIn', { facebookId: vars.facebookId })
        }
      },

      // React on the socket.io server.
      recieve: function (data) {

      },

      // Try to login
      login: function () {
          f.setModal({
            title: f.t('What is your facebook ID?'),
            form: 'connectFacebook',
            close: false,
            keyboard: false,
            backdrop: 'static',
            buttons: '<button id="login" type="submit" class="btn btn-primary">' + f.t('Login') + '</button>',
            content: '<div class="form-group">' +
                        '<label class="sr-only" for="facebookId">Facebook ID</label>' +
                        '<input type="text" class="form-control" id="facebookId" placeholder="Facebook ID">' +
                        '<img class="img-thumbnail" src="/images/default-image-small.jpg" id="facebook-profile-image" />' +
                      '</div>'
          }, function () {
            // The modal is set, attach handlers.
            // When the image is not found we fix it to the default image.
            $('#facebook-profile-image').error(function () {
              $(this).attr('src', '/images/default-image-small.jpg')
            })

            // Change the image on keypress.
            $('#facebookId').on('keyup change', function () {
              $('#connectFacebook').removeClass('has-error')
              $('#facebook-profile-image').attr('src', 'https://graph.facebook.com/' + $(this).val() + '/picture')
            })

            // Submit handler/
            $('#login').click(function () {
              // If the default image is gone.
              if ($('#facebook-profile-image').attr('src') != '/images/default-image-small.jpg') {
                $.cookie('facebookId', $('#facebookId').val())
                vars.facebookId = $('#facebookId').val()
                vars.socket.emit('loggedIn', { facebookId: vars.facebookId })
                $('#foModal').modal('hide')
              }
              else {
                $('#connectFacebook').addClass('has-error')
              }

              return false
            })
          })
      },

      // Sets a console message if in debugging mode.
      clm: function (message) {
        if (vars.debug) {
          console.log(message)
        }
      },

      // Renders the modal HTML if not, and calls it out for the current modal.
      setModal: function (modalData, callback) {
        var modal = f.render('modal', modalData)
        $('body').append(modal)
        $('#foModal').modal({
          backdrop: modalData.backdrop,
          keyboard: modalData.keyboard
        })
        $('#foModal').modal('show')

        if (callback) {
          callback()
        }
      },

      // Translation support
      t: function (string) {
        return string
      },

      // Gets and renders twig template.
      render: function (template, object) {
        if (!vars.templates[template]) {
          vars.templates[template] = true
          twig({
              id: template,
              href: 'templates/' + template + '.twig',
              async: false
          })
        }

        return twig({ ref: template }).render(object);
      }
    }

    // Attaching events.
    vars.socket.on('message', function (data) {
      f.recieve(data)
    })

    // Init the app.
    f.init()
})