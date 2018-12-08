(function() {

    // Q.js should support onready callbacks
    Q(function() {
        console.log('DOM is ready. Start manipulating it');
    });

    // Q.js should support looping through selected elements
    Q('body').each(function() {
        Q(this).addClass('italic');
    });

    // Q.js should support querying with a selector and a class to the selected elements
    Q('body').addClass('beige-background');

    // Q.js should support multiple selectors and ability add/remove multiple classes
    Q('p.p1,p.p2').addClass('color-red font-22');

    // Q.js should support chaining
    Q('p.p2').addClass('bold').removeClass('color-red');

    // Q.js should support get and set text content
    Q('p.author').text('Lokesh Cherukuri');

    // Q.js should support event listeners and chaining of events
    Q('.button')
        .on('click', function() {
            Q('.event-status').text('Button Clicked');
        })
        .on('mouseover', function() {
            Q('.event-status').text('Mouse hovered on button');
        });

})();
