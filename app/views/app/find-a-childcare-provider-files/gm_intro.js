var sm_utils = {
    init: function () {
        if (typeof JSON != "undefined") {
            this.bind();
            this.autoOpen();
            this.addElement('LINK', { 'rel': 'stylesheet', 'type': 'text/css', 'href': SERVMETRIC_CDN_URL + '/css/modal2/modal.css?v=' + SERVMETRIC_VERSION }, 'HEAD');

            this.addEvent('message', this.message);
            this.addEvent('focus', this.lostfocus);
        }
    },
    bind: function () {
        var links = document.getElementsByTagName("A");
        for (var i = 0, l = links.length; i < l; i++) {
            if (links[i].className.indexOf('gm_sidebar_anchor') >= 0) {
                links[i].onclick = (function (j) {
                    j.preventDefault;
                    var link = links[j];
                    return function () {
                        if (!sm_selector.enable_highlighting) return sm_utils.click(link);
                    }
                })(i);
            }
        }
    },
    click: function (link) {
        sm_utils.returnElem = link;

        try {
            if (typeof window.sm_watch != 'undefined') { clearInterval(window.sm_watch); }

            var survey_url = link.getAttribute('href') + ((link.getAttribute('href').indexOf('?') > 0) ? '&' : '?') + 'modal=1&vpDimensions=' + window.innerWidth + 'x' + window.innerHeight;

            setTimeout(function () {
                var overlay = sm_utils.addElement('DIV', { 'id': 'servmetric_overlay' }, 'BODY');
                var frame = sm_utils.addElement('DIV', { 'id': 'servmetric_frame', 'class': 'servmetric_hidden' }, 'BODY');
                var content = sm_utils.addElement('DIV', { 'class': 'servmetric_content' }, frame);
                var header = sm_utils.addElement('DIV', { 'class': 'servmetric_header' }, content);
                var lang = document.getElementsByTagName('html')[0].getAttribute('lang');

                var alt_link = sm_utils.addElement('A', { 'href': link.getAttribute('href'), 'class': 'servmetric_altlink' }, header);
                alt_link.innerHTML = sm_utils.isNederlands ? 'Open deze enquête in dit venster' : 'Open the survey in this window';
                var iframe = sm_utils.addElement('IFRAME', { 'id': 'servmetric_iframe', 'class': 'servmetric_iframe', 'allowTransparency': 'true', 'frameBorder': '0', 'title': 'Feedback popup' }, content);
                var doc = iframe.contentWindow.document;
                doc.open();
                doc.write('<html><head><title>Feedback popup</title></head><body><a href="' + link.getAttribute('href') + '" style="position:absolute; left:-9999px">' + alt_link.innerHTML + '</a></body></html>');
                doc.close();

                sm_utils.makeVisible(frame, 100);
                setTimeout(function () {
                    iframe.src = survey_url;
                }, 1);

                sm_utils.addClick(overlay, function () { sm_utils.close(); });
                sm_utils.addClick(frame, function () { sm_utils.close(); });
            }, 50);
        }
        catch (e) {
        }

        return false;
    },
    addElement: function (type, attribs, dest) {
        var elem = document.createElement(type);
        for (var prop in attribs) {
            if (attribs.hasOwnProperty(prop)) {
                if (prop != 'class') {
                    elem.setAttribute(prop, attribs[prop]);
                } else {
                    elem.setAttribute('class', attribs[prop]) ||
                        elem.setAttribute('className', attribs[prop]);
                }
            }
        }
        if (dest !== null && typeof dest !== "undefined") {
            if (typeof dest == "string") {
                document.getElementsByTagName(dest)[0].appendChild(elem);
            } else {
                dest.appendChild(elem);
            }
        }

        return elem;
    },
    addClick: function (obj, handler) {
        obj.clickhandler = handler;

        if (obj.addEventListener) {
            obj.addEventListener("click", function (e) { obj['clickhandler'](e); }, true);
        } else if (obj.attachEvent) {
            obj.attachEvent("onclick", function (e) { obj['clickhandler'](e); });
        } else {
            var originalHandler = obj["onclick"];
            if (originalHandler) {
                obj["onclick"] = function (e) { originalHandler(e); obj['clickhandler'](e); };
            } else {
                obj["onclick"] = obj['clickhandler'];
            }
        }

        return false;
    },
    addEvent: function (event, callback) {
        if (window.attachEvent) {
            window.attachEvent('on' + event, callback);
        }
        else if (window.addEventListener) {
            window.addEventListener('message', callback, false);
        }
    },
    lostfocus: function (event) {
        var iframe = document.getElementById('servmetric_iframe');
        if (iframe && iframe.contentWindow) { iframe.contentWindow.focus(); }
    },
    message: function (event) {
        var iframe = document.getElementById('servmetric_iframe'), message = null;

        // Only proceed if the origin has been verified as coming from our IFRAME.
        if (iframe && iframe.contentWindow && event.source === iframe.contentWindow) {
            try {
                try {
                    message = JSON.parse(event.data);
                } catch (e) {
                    message = {};

                    var clean = event.data.substring(1, event.data.length - 1);
                    var instructions = clean.split(",");
                    for (var i = 0; i < instructions.length; i++) {
                        var parts = instructions[i].split(":");
                        message[parts[0].replace(/\"/gi, "")] = parts[1].replace(/\"/gi, "");
                    }
                }

                if (message !== null) {
                    switch (message.method) {
                        case 'ready': {
                            sm_utils.display();
                        } break;
                        case 'redirect': {
                            sm_utils.close();
                            location.href = encodeURI(message.url);
                        } break;
                        case 'top': {
                            var frame = document.getElementById("servmetric_frame");
                            if (frame !== null) {
                                sm_utils.makeVisible(frame, message.surveyHeight);
                            }
                        } break;
                        case 'close': {
                            sm_utils.close();
                        } break;
                        case 'scroll': {
                            if (message.posy) {
                                window.scrollTo(0, message.posy);
                            }
                        } break;
                        case 'elementCapture': { sm_selector.init(); } break;
                    }
                }
            }
            catch (e) { return; }
        }
    },
    makeVisible: function (sm_header, svyHeight) {
        var vpw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var vph = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var topY = ((vph * .8) < svyHeight) ? 0 : ((vph - svyHeight) >> 1);
        var newY = window.pageYOffset + topY;
        sm_header.style.top = newY + 'px';
        document.body.className = document.body.className;
        if (vpw <= 768) setTimeout(function () { window.scrollTo(0, newY - topY) }, 5);
    },
    findTopOfModal: function (obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return [curtop];
        }
    },
    display: function () {
        var frame = document.getElementById('servmetric_frame'),
            iframe = document.getElementById('servmetric_frame');
        if (typeof frame != 'undefined' && frame !== null) {
            frame.removeAttribute('class');
            frame.removeAttribute('className');
            iframe.contentWindow.focus();
        }
    },
    close: function () {
        var overlay = document.getElementById('servmetric_overlay');
        if (overlay) { (overlay.parentNode).removeChild(overlay); }

        var container = document.getElementById('servmetric_frame');
        if (container) { (container.parentNode).removeChild(container); }

        if (sm_utils.returnElem) setTimeout(function () { sm_utils.returnElem.focus(); }, 200);
    },
    highlighter: (function () {
        var self = this, tasks = [];

        var chain = function (tasks, delay) {
            if (!tasks || !tasks.length) return;
            var pos = 0, delay = delay || 100;
            setTimeout(function () {
                tasks[pos++]();
                if (pos < tasks.length) setTimeout(arguments.callee, delay);
            }, delay);
        }

        var updateClass = function (s, cName) {
            return function () { s.className = cName; }
        }

        var highlight = function () {
            setInterval(function () {
                chain(tasks, 200);
            }, self.config.subsequent_wait);
        }

        var initialise = function (cfg) {
            self.config = cfg;
            var smileys = document.getElementsByClassName('gm_smiley_img');

            if (smileys.length) {
                for (var i = 0; i < smileys.length; i++) {
                    tasks.push(updateClass(smileys[i], 'gm_smiley_img hlight'));
                    tasks.push(updateClass(smileys[i], 'gm_smiley_img'));
                }

                setTimeout(highlight, self.config.initial_wait);
            }
        }

        return {
            Init: initialise
        }
    })(),
    autoOpen: function () {
        if (typeof sm_trigger != 'undefined') {
            var sm_gap = 0, sm_interval = 500, sm_pageview = 0;

            window.sm_watch = setInterval(function () {
                sm_gap += sm_interval;
                sm_pageview += sm_interval;

                if (sm_pageview >= sm_trigger.min_opentime && sm_gap >= sm_trigger.min_inactivity) {
                    clearInterval(window.sm_watch);

                    var link = sm_utils.addElement('A', { 'href': sm_trigger.url });
                    sm_utils.click(link);
                }
            }, sm_interval);

            this.addEvent("mousemove", function () { sm_gap = 0; });
        }
    },
    isNederlands: function () {
        var lang = document.getElementsByTagName('html')[0].getAttribute('lang');
        if (!lang) lang = navigator.language;
        return (lang && lang.toLowerCase().indexOf('nl') >= 0);
    }()
};

sm_selector = {
    init: function () {
        var selector = sm_utils.addElement('DIV', { id: 'sm-selector' }, 'BODY');
        this.elements = {
            prompt: sm_utils.addElement('A', { id: 'selector-prompt' }, selector),
            top: sm_utils.addElement('DIV', { id: 'selector-top' }, selector),
            left: sm_utils.addElement('DIV', { id: 'selector-left' }, selector),
            right: sm_utils.addElement('DIV', { id: 'selector-right' }, selector),
            bottom: sm_utils.addElement('DIV', { id: 'selector-bottom' }, selector)
        };

        this.enableHighlighting(true);
    },
    enableHighlighting: function (enable) {
        if (enable !== this.enable_highlighting) {
            this.enable_highlighting = enable;
            this.currentlySelectedElement = null;
            this.currentlyHoveredElement = null;
            var selector = sm_selector.elements.top.parentNode;
            selector.style.display = (enable ? "" : "none");

            var overlay = document.getElementById('servmetric_overlay');
            if (overlay) { overlay.style.display = (enable ? "none" : ""); }

            var container = document.getElementById('servmetric_frame');
            if (container) { container.style.display = (enable ? "none" : ""); }

            if (enable) {
                this.enableListeners();
            }
        }
    },
    enableListeners: function () {
        document.addEventListener("click", this.elementClickHandler); //detect snippet invocation
        document.addEventListener("mousemove", this.elementHoverHandler); //detect element hover
        document.addEventListener("touchend", this.elementTapHandler); //detect mobile tap
        sm_selector.elements.prompt.addEventListener("touchend", sm_selector.elementClickHandler);
    },
    elementHoverHandler: function (e) {
        //First ensure that highlighting is enabled and the element is 'hoverable'
        if (!sm_selector.enable_highlighting || (e.target.id && e.target.id.indexOf('selector') !== -1) || e.target.tagName === 'BODY' || e.target.tagName === 'HTML') {
            //sm_selector.currentlyHoveredElement = null;
            return;
        }

        var target = e.target;
        sm_selector.highlightElement(target);
    },
    elementTapHandler: function (e) {
        if (sm_selector.enable_highlighting && e.cancelable) {
            e.preventDefault();

            //First ensure that highlighting is enabled and the element is 'hoverable'
            if (!sm_selector.enable_highlighting || (e.target.id && e.target.id.indexOf('selector') !== -1) || e.target.tagName === 'BODY' || e.target.tagName === 'HTML') {
                sm_selector.currentlyHoveredElement = null;
                return;
            }

            var target = e.target;
            sm_selector.highlightElement(target);
        }
    },
    elementClickHandler: function (e) {
        if (!sm_selector.enable_highlighting || sm_selector.currentlyHoveredElement === null) {
            return;
        }

        sm_selector.currentlySelectedElement = sm_selector.currentlyHoveredElement;
        var elementPath = sm_selector.getElementCSSPath(sm_selector.currentlySelectedElement);

        e.preventDefault();

        try {
            sm_selector.enableHighlighting(false);
            sm_selector.sendElementSelector(elementPath);
        } catch (e) {
            console.log('Couldn\'t get element by path!', e);
        }
    },
    highlightElement: function (target) {
        var tOffset = target.getBoundingClientRect(), tHeight = tOffset.height, tWidth = tOffset.width;

        //Get the highest z-index in the DOM and ensure we put the selection box at the same level
        var highestZIndex = sm_selector.findHighestZIndex();
        sm_selector.elements.top.style.zIndex = highestZIndex;
        sm_selector.elements.bottom.style.zIndex = highestZIndex;
        sm_selector.elements.left.style.zIndex = highestZIndex;
        sm_selector.elements.right.style.zIndex = highestZIndex;
        sm_selector.elements.prompt.style.zIndex = highestZIndex;

        var top = tOffset.top + window.pageYOffset;

        sm_selector.updateElementSelector(sm_selector.elements.top, (top - 4), (tOffset.left - 4), null, (tWidth + 5));
        sm_selector.updateElementSelector(sm_selector.elements.bottom, (top + tHeight + 1), (tOffset.left - 3), null, (tWidth + 4));
        sm_selector.updateElementSelector(sm_selector.elements.left, (top - 4), (tOffset.left - 5), (tHeight + 8), null);
        sm_selector.updateElementSelector(sm_selector.elements.right, (top - 4), (tOffset.left + tWidth + 1), (tHeight + 8), null);

        if (sm_selector.elements.prompt.innerText == "") sm_selector.elements.prompt.innerText = sm_utils.isNederlands ? "SELECTEER" : "SELECT";
        var pOffset = sm_selector.elements.prompt.getBoundingClientRect();
        sm_selector.updateElementSelector(sm_selector.elements.prompt, ((top + tHeight) - pOffset.height + 1), ((tOffset.left + tWidth + 1) - pOffset.width), null, null);

        if (target !== null && target !== sm_selector.currentlyHoveredElement) {
            console.log('Setting target', target);
            sm_selector.currentlyHoveredElement = target;
        }
    },
    updateElementSelector: function (element, top, left, height, width) {
        if (!sm_selector.enable_highlighting) {
            return;
        }
        if (top) element.style.top = top + 'px';
        if (left) element.style.left = left + 'px';
        if (height) element.style.height = height + 'px';
        if (width) element.style.width = width + 'px';
    },
    hasAncestorWithSelector: function (el, sel) {
        while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el, sel)));
        return el;
    },
    findHighestZIndex: function () {
        var elems = document.getElementsByTagName("*");
        var highest = 0;
        for (var i = 0; i < elems.length; i++) {
            var zindex = document.defaultView.getComputedStyle(elems[i], null).getPropertyValue("z-index");
            var visible = sm_selector.isElementVisible(elems[i]);
            if (visible && (zindex > highest) && (zindex != 'auto')) {
                highest = zindex;
            }
        }
        return highest;
    },
    isElementVisible: function (el) {
        var rect = el.getBoundingClientRect(),
			vWidth = window.innerWidth || doc.documentElement.clientWidth,
			vHeight = window.innerHeight || doc.documentElement.clientHeight,
			efp = function (x, y) { return document.elementFromPoint(x, y) };

        // Return false if it's not in the viewport
        if (rect.right < 0 || rect.bottom < 0
			|| rect.left > vWidth || rect.top > vHeight)
            return false;

        // Return true if any of its four corners are visible
        return (
			el.contains(efp(rect.left, rect.top))
			|| el.contains(efp(rect.right, rect.top))
			|| el.contains(efp(rect.right, rect.bottom))
			|| el.contains(efp(rect.left, rect.bottom))
		);
    },
    getElementCSSPath: function (node) {
        var path;
        while (typeof node !== 'undefined') {
            var realNode = node, name = realNode.localName;
            if (!name) break;
            name = name.toLowerCase();

            var parent = node.parentNode;

            var sameTagSiblings = parent.childNodes;
            if (sameTagSiblings.length > 1) {
                allSiblings = parent.childNodes;
                var index = Array.prototype.indexOf(allSiblings, realNode) + 1;
                if (index > 1) {
                    name += ':nth-child(' + index + ')';
                }
            }

            path = name + (path ? '>' + path : '');
            node = parent;
        }

        return path;
    },
    sendElementSelector: function (elementSelector) {
        var iframe = document.getElementById('servmetric_iframe');

        if (iframe && iframe.contentWindow) {
            var payload = JSON.stringify({ "method": "elementCapture", "selector": elementSelector });

            iframe.contentWindow
                .postMessage(payload, "*");
        }
    }
};

sm_utils.init();