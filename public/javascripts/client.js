$(function() {

    // Settings of the clientside app.
    window.vars = {
      host: 'http://localhost:3000',
      socket: io.connect(this.host),
      cookie: $.cookie('logged-in'),
      debug: true,
      templates: {},
    }

    // Global for all the functions.
    window.f = {}

})