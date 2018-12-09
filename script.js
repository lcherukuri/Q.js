(function() {

    // In jQuery, we use `$`. Here i a using `_`

    // Q.js should support onready callbacks
    _(function() {
        console.log('DOM is ready. Start manipulating it');
    });

    // Q.js should support looping through selected elements
    _('body').each(function() {
        _(this).addClass('italic');
    });

    // Q.js should support querying with a selector and add a class to the selected elements
    _('body').addClass('beige-background');

    // Q.js should support multiple selectors and ability to add/remove multiple classes
    _('p.p1,p.p2').addClass('color-red font-22');

    // Q.js should support chaining
    _('p.p2').addClass('bold').removeClass('color-red');

    // Q.js should support get and set text content
    _('p.author').text('Lokesh Cherukuri');

    // Q.js should support event listeners and chaining of events
    _('.button')
        .on('click', function() {
            _('.event-status').text('Button Clicked');
        })
        .on('mouseover', function() {
            _('.event-status').text('Mouse hovered on button');
        });

    // Q.js should support ajax calls
    _().ajax({
        method: 'GET',
        URL: 'https://httpbin.org/get'
    }).done(function(response) {
        console.log("Ajax Done-1", response);
    }).done(function(response) {
        console.log("Ajax Done-2", response);
    }).fail(function(error) {
        console.log(error);
    });

})();
