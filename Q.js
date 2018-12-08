(function() {

    const domReadyCallbacks = [];

    function Q(selector) {
        this.nodes = [];
        
        if (!(this instanceof Q)) {
            return new Q(selector);
        }

        if (typeof selector === 'function') {
            document.readyState === 'complete' ? selector.call(document) : domReadyCallbacks.push(selector);
        } else if (typeof selector === 'string') {
            this.nodes = document.querySelectorAll(selector);
        } else if (selector instanceof HTMLElement) {
            this.nodes = [selector];
        } else if (selector instanceof NodeList) {
            this.nodes = selector;
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        while(domReadyCallbacks.length) {
            domReadyCallbacks.pop().call(document);
        }
    });

    Q.prototype.each = function(callback) {
        const nodes = this.nodes;
        for (var i=0; i<nodes.length; i++) {
            callback.call(nodes[i]);
        }
        return this;
    }

    Q.prototype.addClass = function(classNames) {
        const classes = classNames.split(' ');
        return this.each(function() {
            for (var i=0; i<classes.length; i++) {
                this.classList.add(classes[i]);
            }
        });
    }

    Q.prototype.removeClass = function(classNames) {
        const classes = classNames.split(' ');
        return this.each(function() {
            for (var i=0; i<classes.length; i++) {
                this.classList.remove(classes[i]);
            }
        });
    }

    Q.prototype.text = function(text) {
        if (text) {
            this.each(function() {
                this.innerHTML = text;
            });
        }
        return this.nodes.length && this.nodes[0].innerHTML;
    }

    Q.prototype.on = function(event, callback) {
        return this.each(function() {
            this.addEventListener(event, function() {
                callback.call(document);
            });
        });
    }

    window.Q = Q;

})(window);