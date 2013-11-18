$(function() {

  // Sets a console message if in debugging mode.
  f.clm = function (message) {
    if (vars.debug) {
      console.log(message)
    }
  }


  // Translation support
  f.t = function (string) {
    return string
  }

})