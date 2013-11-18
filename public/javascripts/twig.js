$(function() {

  // Gets and renders twig template.
  f.render = function (template, object) {
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

})