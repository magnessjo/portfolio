

// Project Titles

function projectTitles() {

  var container = document.querySelector( '#projects' );
  var wrappers = container.querySelectorAll( '.project-details' );

  for ( var i = 0; i < wrappers.length; i++ ) {
    var wrapper = wrappers[i];

    ( function( element ) {

      var title = element.querySelector( 'h3' );
      var data = element.querySelector( '.info' );

      // Resize overlay based on content size

      function resize() {

        // Set margin for container based on content

        data.style.paddingTop = ( (title.offsetHeight / 2) + 50 ) + 'px';

        // Position Content

        var contentPosition = ( title.offsetHeight / 2 ) + 'px'
        title.style.transform = 'translateY(' + contentPosition + ')';

      }

      // Resize Event

      window.addEventListener('resize', resize);

      // load

      resize();

    })( wrapper );

  }

}

// Add Scroll To for Project Selection

function projectSelect() {

  var container = document.querySelector( '.selector' );
  var buttons = container.querySelectorAll( 'button' );

  function scrollTo(element) {

    const documentBody = document.documentElement.scrollTop || document.body.scrollTop;
    const elm = document.body;
    let from = 0;
    const to = element.getBoundingClientRect();
    const toPosition = documentBody == 0 ? (to.top - from) + 30 : to.top - 30;
    const currentPosition = window.pageYOffset;
    let frames = 60;
    const jump = (toPosition - from) / frames;
    from = currentPosition;

    function scroll() {

      if ( frames > 0 ) {

        const position = from + jump;

        from = position;
        elm.scrollTop = from;
        document.documentElement.scrollTop = from;

        frames--;
        window.requestAnimationFrame(scroll);

      }

    }

    window.requestAnimationFrame(scroll);

  }


  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];

    button.addEventListener('click', function() {
      var id = this.getAttribute('data-id');
      var element = document.querySelector('[data-project="' + id + '"]');
      var button = element.querySelector('a');
      scrollTo(element);
      button.focus();
    });

  }


}

// Fixed Position Selector

function projectSelectorScroll() {

  var container = document.querySelector('.selector');
  var wrapper = container.querySelector('.wrapper');

  function scroll() {

    var selectorRect = container.getBoundingClientRect();

    if (selectorRect.top < 0) {
      wrapper.setAttribute('data-scrolling', '');
    } else {
      wrapper.removeAttribute('data-scrolling');
    }

  }

  window.addEventListener('scroll', scroll);
  scroll();

}

// Dom Loaded

document.addEventListener('DOMContentLoaded', function() {

  projectTitles();
  projectSelectorScroll();
  projectSelect();

});
