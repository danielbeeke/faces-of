$(function() {

    var vars = {
      socket: io.connect('http://localhost:3000'),
      facebookId: $.cookie('facebookId'),
      debug: true,
      templates: {},
    }

    // An object so everything stays nice and clean.
    var f = functions = {
      // Init the app.
      init: function () {
        if (!vars.facebookId) {
          f.clm('no facebookId')
          f.loginModal()
        }
        else {
          f.login()
        }
      },

      // React on the socket.io server.
      recieve: function (data) {

      },

      // Try to login
      loginModal: function () {
          f.setModal({
            title: f.t('What is your facebook ID?'),
            form: 'connectFacebook',
            close: false,
            keyboard: false,
            backdrop: 'static',
            buttons: '<button id="login" type="submit" class="btn btn-primary">' + f.t('Login') + '</button>',
            content: '<div class="form-group">' +
                        '<label class="sr-only" for="facebookId">Facebook ID</label>' +
                        '<input type="text" id="facebookId" class="form-control" placeholder="Facebook ID">' +
                        '<div id="person-login"></div>' +
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

              $.getJSON('https://graph.facebook.com/' + $(this).val(), function (response) {
                $('#person-login').html(f.render('person-login', response))
              })
            })

            // Submit handler/
            $('#login').click(function () {
              // If the default image is gone.
              if ($('#facebook-profile-image').attr('src') != '/images/default-image-small.jpg') {
                $.cookie('facebookId', $('#facebookId').val())
                vars.facebookId = $('#facebookId').val()
                f.login()
              }
              else {
                $('#connectFacebook').addClass('has-error')
              }

              return false
            })
          })
      },

      // Login
      login: function () {
        $.getJSON('https://graph.facebook.com/' + vars.facebookId, function (response) {
          vars.socket.emit('loggedIn', response)
          $('#foModal').modal('hide')
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

      // Add a person to the grid.
      addPersonOnline: function (data) {
        console.log(data)

        var person = f.render('person-online', data)
        
        if ($('#' + data.facebookId).length) {
          $('#' + data.facebookId).remove()
        }

        $('#people').append(person)
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

    vars.socket.on('addPersonOnline', function (data) {
      f.addPersonOnline(data)
    })

    // Init the app.
    f.init()
})