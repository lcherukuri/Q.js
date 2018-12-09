(function() {

    const domReadyCallbacks = [];

    function _(selector) {
        return new Q(selector);
    }

    class Q {
        constructor(selector) {
            this.nodes = [];
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
        
        each(callback) {
            const nodes = this.nodes;
            for (var i=0; i<nodes.length; i++) {
                callback.call(nodes[i]);
            }
            return this;
        }

        addClass(classNames) {
            const classes = classNames.split(' ');
            return this.each(function() {
                for (var i=0; i<classes.length; i++) {
                    this.classList.add(classes[i]);
                }
            });
        }

        removeClass(classNames) {
            const classes = classNames.split(' ');
            return this.each(function() {
                for (var i=0; i<classes.length; i++) {
                    this.classList.remove(classes[i]);
                }
            });
        }

        text(text) {
            if (text) {
                this.each(function() {
                    this.innerHTML = text;
                });
            }
            return this.nodes.length && this.nodes[0].innerHTML;
        }

        on(event, callback) {
            return this.each(function() {
                this.addEventListener(event, function() {
                    callback.call(document);
                });
            });
        }

        ajax(options) {
            const xhr = {
                successCallbacks: [],
                failCallbacks: [],
                done: function(callback) {
                    this.successCallbacks.push(callback);
                    return this;
                },
                fail: function(callback) {
                    this.failCallbacks.push(callback);
                    return this;
                }
            };
    
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    while (xhr.successCallbacks.length) {
                        xhr.successCallbacks.pop().call(this, this.response);
                    }
                }
            };
            xmlHttp.open(options.method || "GET", options.URL, options.async || true);
            xmlHttp.send();
    
            return xhr;
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        while(domReadyCallbacks.length) {
            domReadyCallbacks.pop().call(document);
        }
    });

    window._ = _;

})(window);
