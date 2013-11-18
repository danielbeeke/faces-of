$(function() {

  // Renders the modal HTML if not, and calls it out for the current modal.
  f.setModal = function (modalData, callback) {
    var modal = f.render('modal', modalData)
    $('body').append(modal)
    $('#foModal').modal(modalData)
    $('#foModal').modal('show')

    // Make this function chainable.
    if (callback) { callback() }
  }

})