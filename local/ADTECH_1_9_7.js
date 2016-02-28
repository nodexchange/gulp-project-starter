/*!
 * Cross-Browser DOM Ready code extracted from jQuery.
 *
 * jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 *
 * @author Pictela Support <support@pictela.com>
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
// DOM ready event listener
var ADTECHDomReady = (function() {
  var ready_event_fired = false;
  var ready_event_listener = function(fn) {

    // Create an idempotent version of the 'fn' function
    var idempotent_fn = function() {
      if (ready_event_fired) {
        return;
      }
      ready_event_fired = true;
      return fn();
    }

    // The DOM ready check for Internet Explorer
    var do_scroll_check = function() {
      if (ready_event_fired) {
        return;
      }

      // If IE is used, use the trick by Diego Perini
      // http://javascript.nwbox.com/IEContentLoaded/
      try {
        document.documentElement.doScroll('left');
      } catch (e) {
        setTimeout(do_scroll_check, 1);
        return;
      }

      // Execute any waiting functions
      return idempotent_fn();
    }

    // If the browser ready event has already occured
    if (document.readyState === "complete") {
      return idempotent_fn()
    }

    // Mozilla, Opera and webkit nightlies currently support this event
    if (document.addEventListener) {

      // Use the handy event callback
      document.addEventListener("DOMContentLoaded", idempotent_fn, false);

      // A fallback to window.onload, that will always work
      window.addEventListener("load", idempotent_fn, false);

      // If IE event model is used
    } else if (document.attachEvent) {

      // Ensure firing before onload; maybe late but safe also for iframes
      document.attachEvent("onreadystatechange", idempotent_fn);

      // A fallback to window.onload, that will always work
      window.attachEvent("onload", idempotent_fn);

      // If IE and not a frame:
      // continually check to see if the document is ready
      var toplevel = false;

      try {
        toplevel = window.frameElement == null;
      } catch (e) {
      }

      if (document.documentElement.doScroll && toplevel) {
        return do_scroll_check();
      }
    }
  };
  return ready_event_listener;
})();
// Copyright 2010 AOL Platforms.
/*
 * @author Pictela Support <support@pictela.com>
 */
/*!
 * ADTECH Rich Media Core Library $VERSION$ Copyright 2010 AOL Platforms.
 */
var com = com || {};
com.adtech = com.adtech || {};
/*
    json2.js
    2014-02-04

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function () {
                return this.valueOf();
            };
    }

    var cx,
        escapable,
        gap,
        indent,
        meta,
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());// Copyright 2010 AOL Platforms.

/**
 * Custom RichMedia event class.
 *
 * All event dispatching objects in ADTECH
 * Richmedia Core Lib dispatch only RichMediaEvent events. This enables a programmer
 * to not have to concern themselves with different event implementations
 * across different browsers.
 *
 * @class
 * @constructor
 * @author Pictela Support <support@pictela.com>
 * @param type the type of the event.
 */
com.adtech.RichMediaEvent = function(type) {
  /**
   * The event type.
   * @type String
   */
  this.type = type;

  /**
   * A reference to the source EventDispatcher that dispatched the event.
   * @type Object
   */
  this.target = null;

  /**
   * A reference to the EventDispatcher currently dispatching the event.
   * @type Object
   */
  this.currentTarget = null;
}

/**
 * The RichMediaEvent.DOM_LOAD constant defines the value of the type property of an DOMLoad
 * event object.
 * @see com.adtech.AdManager
 * @type String
 */
com.adtech.RichMediaEvent.DOM_LOAD = 'DOMLoad';
/**
 * The RichMediaEvent.ENGAGEMENT constant defines the value of the type property of a engagement
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent.ENGAGEMENT = 'engagement';
/** @private */
com.adtech.RichMediaEvent.VIEWABLE_IMPRESSION = 'viewableImpression';
/** @private */
com.adtech.RichMediaEvent.INTERACTIVE_IMPRESSION = 'interactiveImpression';
/** @private */
com.adtech.RichMediaEvent.VIDEO_IMPRESSION = 'videoImpression';
/** @private */
com.adtech.RichMediaEvent.QUALIFIED_ROLLOVER = 'qualifiedRollover';
/** @private */
com.adtech.RichMediaEvent.BACKUP_VIEW = 'backupView';
/** @private */
com.adtech.RichMediaEvent.UNSUPPORTED_CLIENT = 'unsupportedClient';
/** @private */
com.adtech.RichMediaEvent.BACKUP_VIEWABLE_IMPRESSION = 'backupViewableImpression';
/** @private */
com.adtech.RichMediaEvent.INDETERMINABLE_VIEWABILITY = 'indeterminableViewability';
/** @private */
com.adtech.RichMediaEvent.MOUSE_MOVE = 'mouseMove';
/**
 * The RichMediaEvent.MOUSE_OUT constant defines the value of the type property of a mouseOut
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent.MOUSE_OUT = 'mouseOut';
/**
 * The RichMediaEvent.MOUSE_OVER constant defines the value of the type property of a mouseOver
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent.MOUSE_OVER = 'mouseOver';
/**
 * The RichMediaEvent.PAGE_LOAD constant defines the value of the type property of a pageLoad
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent.PAGE_LOAD = 'pageLoad';
/**
 * The RichMediaEvent.PAGE_SCROLL constant defines the value of the type property of a pageScroll
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent.PAGE_SCROLL = 'pageScroll';
/**
 * The RichMediaEvent.BLUR constant defines the value of the type property of a blur
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent.BLUR = 'blur';
/**
 * The RichMediaEvent.ORIENTATION_CHANGE constant defines the value of the type property of an
 * orientationChange event object.
 * @type String
 */
com.adtech.RichMediaEvent.ORIENTATION_CHANGE = 'orientationChange';
/**
 * The RichMediaEvent.TOUCH_START constant defines the value of the type property of a touchStart
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent.TOUCH_START = 'touchStart';
/**
 * The RichMediaEvent.FOCUS constant defines the value of the type property of a focus
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent.FOCUS = 'focus';
/**
 * The RichMediaEvent.RENDER constant defines the value of the type property of a render
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent.RENDER = 'render';
/** @private */
com.adtech.RichMediaEvent.REPORT = 'reporting';
/** @private */
com.adtech.RichMediaEvent.ADVERT_ADDED = 'advertAdded';
/**
 * The RichMediaEvent.PAGE_RESIZE constant defines the value of the type property of a pageResize
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent.PAGE_RESIZE = 'pageResize';
/** @private */
com.adtech.RichMediaEvent.SERVE = 'serve';
/**
 * The RichMediaEvent.IN_VIEWPORT constant defines the value of the type property of a inViewport
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent.IN_VIEWPORT = 'inViewport';
/**
 * The RichMediaEvent.OUT_VIEWPORT constant defines the value of the type property of a outViewport
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent.OUT_VIEWPORT = 'outViewport';
/** @private */
com.adtech.RichMediaEvent.EXPANDED = 'ADTECH.expanded';
/** @private */
com.adtech.RichMediaEvent.CONTRACTED = 'ADTECH.contracted';
/** @ private */
com.adtech.RichMediaEvent.LOADED = 'ADTECH.loaded';
/** @private */
com.adtech.RichMediaEvent.CLICK = 'click';
/** @private */
com.adtech.RichMediaEvent.CLOSE = 'close';
/** @private */
com.adtech.RichMediaEvent.HIDE = 'hide';
/** @private */
com.adtech.RichMediaEvent.SHOW = 'show';
/** @private */
com.adtech.RichMediaEvent.READY = 'ready';
/** @private */
com.adtech.RichMediaEvent.ERROR = 'error';
/** @private */
com.adtech.RichMediaEvent.MRAID_READY = 'MRAIDReady';
/** @private */
com.adtech.RichMediaEvent.MRAID_ERROR = 'MRAIDError';
/**
 * The RichMediaEvent.MRAID_VIEWABLE_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 1.0
 */
com.adtech.RichMediaEvent.MRAID_VIEWABLE_CHANGE = 'viewableChange';
/**
 * The RichMediaEvent.MRAID_STATE_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 1.0
 */
com.adtech.RichMediaEvent.MRAID_STATE_CHANGE = 'stateChange';
/**
 * The RichMediaEvent.MRAID_KEYBOARD_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0 draft
 */
com.adtech.RichMediaEvent.MRAID_KEYBOARD_CHANGE = 'keyboardChange';
/**
 * The RichMediaEvent.MRAID_LOCATION_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0 draft
 */
com.adtech.RichMediaEvent.MRAID_LOCATION_CHANGE = 'locationChange';
/**
 * The RichMediaEvent.MRAID_HEADING_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0 draft
 */
com.adtech.RichMediaEvent.MRAID_HEADING_CHANGE = 'headingChange';
/**
 * The RichMediaEvent.MRAID_NETWORK_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0 draft
 */
com.adtech.RichMediaEvent.MRAID_NETWORK_CHANGE = 'networkChange';
/**
 * The RichMediaEvent.MRAID_ORIENTATION_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0 draft
 */
com.adtech.RichMediaEvent.MRAID_ORIENTATION_CHANGE = 'orientationChange';
/**
 * The RichMediaEvent.MRAID_SCREEN_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0 draft
 */
com.adtech.RichMediaEvent.MRAID_SCREEN_CHANGE = 'screenChange';
/**
 * The RichMediaEvent.MRAID_SIZE_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0
 */
com.adtech.RichMediaEvent.MRAID_SIZE_CHANGE = 'sizeChange';
/**
 * The RichMediaEvent.MRAID_TILT_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0 draft
 */
com.adtech.RichMediaEvent.MRAID_TILT_CHANGE = 'tiltChange';
/**
 * The RichMediaEvent.MRAID_TILT_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0 draft
 */
com.adtech.RichMediaEvent.MRAID_SHAKE = 'shake';
/**
 * The RichMediaEvent.MRAID_RESPONSE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0 draft
 */
com.adtech.RichMediaEvent.MRAID_RESPONSE = 'response';

/** @private */
com.adtech.RichMediaEvent.CONFIG_CHANGE = 'ADTECH.configChange';

/** @private */
com.adtech.RichMediaEvent.DYNAMIC = 'PICTELA.dynamic';

/** @private */
com.adtech.RichMediaEvent.DCO_DATA_ERROR = 'dcoDataError';

/**
 * Inspector Category Events
 */
/** @private */
com.adtech.RichMediaEvent.DURATION_START = 'durationStart';
/** @private */
com.adtech.RichMediaEvent.DURATION_END = 'durationEnd';
/** @private */
com.adtech.RichMediaEvent.VIDEO = 'video';
/** @private */
com.adtech.RichMediaEvent.VIDEO_INTERACTION = 'videoInteraction';
/** @private */
com.adtech.RichMediaEvent.THIRD_PARTY = 'thirdParty';

/**
 * Dynamically adds a property to the event object and returns a reference to
 * itself to enable chaining.
 *
 * @param name the name of the property.
 * @param value the value of the new property.
 */
com.adtech.RichMediaEvent.prototype.property = function(name, value) {
  if (name != 'type' && name != 'target') {
    this[name] = value;
  }
  return this;
}
// Copyright 2014 AOL Platforms.

/**
 * @author martin.wojtala@adtech.com
 *
 * Constants of reported state changes in MRAID 2.0.
 */
com.adtech.MRAIDState = {};
com.adtech.MRAIDState.DEFAULT = 'default';
com.adtech.MRAIDState.EXPANDED = 'expanded';
com.adtech.MRAIDState.HIDDEN = 'hidden';
com.adtech.MRAIDState.LOADING = 'loading';
com.adtech.MRAIDState.RESIZED = 'resized';
// Copyright 2010 AOL Platforms.

/**
 * Base class for all runtime objects that dispatch events.
 *
 * @class
 * @constructor
 * @author Pictela Support <support@pictela.com>
 */
com.adtech.EventDispatcher = function() {
  /** @private */
  this.eventTypes = {};
};

/**
 * Registers an event listener object with an EventDispatcher object so that
 * the listener receives notification of an event.
 *
 * @param type the type of event to listen for.
 * @param handler the callback function that will handle the event.
 * @param obj optional Object instance containing the function that will
 *     handle the event.
 */
com.adtech.EventDispatcher.prototype.addEventListener = function(type, handler, obj) {
  if (typeof this.eventTypes[type] == 'undefined') {
    this.eventTypes[type] = [];
  }
  if (!com.adtech.Utils.inArray(handler, this.eventTypes[type])) {
    if (typeof obj == 'undefined') {
      this.eventTypes[type].push(handler);
    } else {
      this.eventTypes[type].push({'ref': obj, 'handler': handler});
    }
  }
}

/**
 * Removes a listener from the EventDispatcher object.
 *
 * @param type the event type to remove the listener for.
 * @param handler the callback function that was handling the event for the
 *     specified type.
 * @param obj optional Object instance containing the function that was
 *     handling the event for the specified type.
 */
com.adtech.EventDispatcher.prototype.removeEventListener = function(type, handler, obj) {
  if (typeof this.eventTypes[type] == 'undefined') {
    return;
  }
  var typeLength = this.eventTypes[type].length;
  for (var i = 0; i < typeLength; i++) {
    var callbackObj = this.eventTypes[type][i];
    var callbackType = (typeof obj == 'undefined') ? 'function' : 'object';
    if (callbackType == typeof callbackObj) {
      switch (callbackType) {
        case 'function':
          if (callbackObj == handler) {
            this.eventTypes[type].splice(i, 1);
          }
        break;
        case 'object':
          if (callbackObj.handler == handler && callbackObj.ref == obj) {
            this.eventTypes[type].splice(i, 1);
          }
        break;
      }
    }
  }
}

/**
 * Returns a flag indicating if the event dispatcher is already registered to listen for
 * a specific event.
 *
 * @param type the event type to check against.
 * @param handler the optional event handler that would be triggered if the event is dispatcehd
 * @param obj the optional context in which the event handler would be triggered
 */
com.adtech.EventDispatcher.prototype.hasEventListener = function(type, handler, obj) {
  if (typeof this.eventTypes[type] == 'undefined' || this.eventTypes[type].length == 0) {
    return false;
  }
  var typeLength = this.eventTypes[type].length;
  for (var i = 0; i < typeLength; i++) {
    var callbackObj = this.eventTypes[type][i];
    var callbackType = (typeof obj == 'undefined') ? 'function' : 'object';
    if (callbackType == typeof callbackObj) {
      switch (callbackType) {
        case 'function':
          if (callbackObj === handler) {
            return true;
          }
          break;
        case 'object':
          if (callbackObj.handler === handler && callbackObj.ref === obj) {
            return true;
          }
        break;
      }
    }
  }
  return false;
}

/**
 * Dispatches an event into the event flow.
 *
 * @param event the event object to be dispatched. This parameter can either be an event type
 *     string or a <code>RichMediaEvent</code> instance.
 */
com.adtech.EventDispatcher.prototype.dispatchEvent = function(event) {
  if (typeof event == 'string') {
    /*
     * Assume that all string events are of type com.adtech.RichMediaEvent (it's the
     * only event class we have, after all). This is for convenience, meaning
     * that HTML advert authors can simply dispatch simple events like so:
     *   instance.dispatchEvent('someEvent');
     * instead of:
     *   instance.dispatchEvent(new com.adtech.RichMediaEvent#VERSION#('someEvent'))
     * OR
     *   instance.dispatchEvent({'type':'someEvent'});
     *
     * This will allow us to reduce a few bytes of code in the library, too.
     */
    event = new com.adtech.RichMediaEvent(event);
  }
  if ((typeof event.type == 'string') && (typeof this.eventTypes[event.type] != 'undefined')) {
    if (typeof event.target == 'undefined' || event.target === null) {
      event.target = this;
    }
    event.currentTarget = this;
    /*
     * Clone event types as an event handler could call removeEventListener API, altering the
     * specific eventType array.
     */
    var eventTypeClone = this.eventTypes[event.type].slice(0);
    for (var i = 0; i < eventTypeClone.length; i++) {
      var callbackObj = eventTypeClone[i];
      if (typeof callbackObj == 'object') {
        callbackObj.handler.call(callbackObj.ref, event);
      } else {
        callbackObj(event);
      }
    }
  }
}
// Copyright 2010 AOL Platforms.

com.adtech.Utils = {};

com.adtech.Utils.registerNativeEventHandler = function(node, event, handler) {
  // Ensure that event listener for a specific handler is only added once.
  com.adtech.Utils.removeNativeEventHandler(node, event, handler);
  if (typeof node.addEventListener == 'function') {
    node.addEventListener(event, handler, false);
  } else {
    node.attachEvent('on' + event, handler);
  }
}

com.adtech.Utils.removeNativeEventHandler = function(node, event, handler) {
  if (typeof node.removeEventListener == 'function') {
    node.removeEventListener(event, handler, false);
  } else {
    node.detachEvent('on' + event, handler);
  }
}


/**
 * Returns the dco mapping object associated with content name and property
 * if dynamic. If content is not dynamic, returns null.
 *
 * @param dynamicMap The map configuration object for DCO.
 * @param contentName The content name.
 * @param propertyName The property name of the content if an object.
 *
 */
com.adtech.Utils.getDCOMapContent = function(dynamicMap, contentName, propertyName) {
  var basePropKey = 'baseProperties';
  for (var contentKey in dynamicMap) {
    var keyMatches = (contentKey == contentName || !propertyName && contentKey == basePropKey);
    if (dynamicMap.hasOwnProperty(contentKey) && keyMatches) {
      var mapArray = dynamicMap[contentKey];
      for (var i = 0, len = mapArray.length; i < len; i++) {
        var mapObj = mapArray[i];
        var mappingKey = (contentKey == basePropKey) ? contentName : propertyName;
        if (mapObj.mapping && mapObj.mapping[mappingKey]) {
          return mapObj;
        }
      }
    }
  }
  return null;
}

/**
 * Creates a closure which is useful to maintain the correct context for event
 * handling code.
 *
 * @param target the target object on which to run the handler.
 * @param handler the method to invoke on the target object.
 * @type Function
 * @return a function that will invoke the handler in the correct context.
 */
com.adtech.Utils.createClosure = function(target, handler) {
  var extraArgs = [].slice.call(arguments, 2);
  var delegate = function() {
    var self = arguments.callee;
    var callbackArgs = [].slice.call(arguments);
    var fullArgs = self.extraArgs.concat(callbackArgs, [self]);
    return self.handler.apply(self.target, fullArgs);
  }

  delegate.extraArgs = extraArgs;
  delegate.target = target;
  delegate.handler = handler;

  return delegate;
}

/**
 * Gets the value of a query string variable if defined; null otherwise.
 *
 * @param variableName the name of the required variable value.
 */
com.adtech.Utils.getQueryStringVariable = function(variableName) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] == variableName) {
      return pair[1];
    }
  }
  return null;
}

/**
 * Checks if a value exists in an array or in a hash. Searches haystack for
 * needle.
 *
 * @param needle the searched value.
 * @param haystack the array to be searched.
 * @type Boolean
 * @return flag indicating whenever the needle was located in the haystack.
 */
com.adtech.Utils.inArray = function(needle, haystack) {
  for (var i in haystack) {
    if (haystack[i] == needle) {
      return true;
    }
  }
  return false;
}

/**
 * Helper function to aid with class inheritance.
 *
 * @param subClass the extending class.
 * @param superClass the class to be extended.
 */
com.adtech.Utils.extend = function(subClass, superClass){
  var tempFunc = function(){};
  tempFunc.prototype = superClass.prototype;
  subClass.prototype = new tempFunc();
  subClass.prototype.constructor = subClass;
  // YUI compressor doesn't like 'super' being used this way.
  subClass.supa = superClass.prototype;
  if (superClass.prototype.constructor == Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
  }
}

/**
 * Calculates and returns the current viewport dimensions.
 *
 * return object with a 'w' and 'h' property.
 * @type Object
 */
com.adtech.Utils.getViewportDims = function() {
  var width =  window.innerWidth ||
      (document.documentElement.clientWidth || document.body.clientWidth);
  var height = window.innerHeight ||
      (document.documentElement.clientHeight || document.body.clientHeight);
  return {'w': width, 'h': height};
}

/**
 * Returns a boolean flag indicating if an object is an array.
 */
com.adtech.Utils.isArray = function(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() == 'array';
}

/**
 * Checks if the browser supports touch or pointer events.
 * Note: This method only indicates if the browser supports touch or pointer events,
 * which does not necessarily reflect a touchscreen device that doesn't have a mouse.
 */
com.adtech.Utils.supportsTouch = function() {
  return ('ontouchstart' in window)
      || window.DocumentTouch && document instanceof DocumentTouch
      || ('onpointerdown' in window && navigator.userAgent.match(/Touch/g))
      || ('onMSPointerDown' in window && navigator.userAgent.match(/Touch/g));
}
// Copyright 2010 AOL Platforms.

/**
 * @author Pictela Support <support@pictela.com>
 *
 * Constants refactored out of Advert in order to be used by the Core class.
 */

com.adtech.Advert = com.adtech.Advert || function(){};

/** @private */
com.adtech.Advert.ENGAGEMENT_THRESHOLD = 2000;
/** @private */
com.adtech.Advert.QUALIFIED_ROLLOVER_THRESHOLD = 500;
/** @private */
com.adtech.Advert.VIEWABLE_IMPRESSION_THRESHOLD = 1000;
/** @private */
com.adtech.Advert.MOUSE_OVER_TIMERS_FLUSH_TIMEOUT = 1000;
/** @private */
com.adtech.Advert.TIMER_LOGGING_THRESHOLD = 900000;
/** @private */
com.adtech.Advert.INPAGE_UNIT_CHECK_INTERVAL = 1000;
/** @private */
com.adtech.Advert.TRACK_TYPE_PIXEL = '1_PIXEL';
/** @private */
com.adtech.Advert.TRACK_TYPE_JS = 'JS_URL';
/** @private */
com.adtech.Advert.TRACK_TYPE_REDIRECT = 'REDIRECT_URL';
/** @private */
com.adtech.Advert.TRACK_EVENT_VIEW = 'VIEW';
/** @private */
com.adtech.Advert.TRACK_EVENT_INTERACTION = 'INTERACTION';
/** @private */
com.adtech.Advert.TRACK_EVENT_SPECIFIC_EVENT = 'SPECIFIC_EVENT';
/** @private */
com.adtech.Advert.TRACK_EVENT_SPECIFIC_CLICK = 'SPECIFIC_CLICK';
/** @private */
com.adtech.Advert.TRACK_EVENT_CLICKS_ALL = 'CLICKS_ALL';
/** @private */
com.adtech.Advert.TRACK_EVENT_ALL = 'EVENTS_ALL';
/** @private */
com.adtech.Advert.TRACK_EVENT_INTERACTIONS_ALL = 'INTERACTIONS_ALL';
/** @private */
com.adtech.Advert.DISPLAY_TIMER = 'displayTimer';
/** @private */
com.adtech.Advert.VIEW_TIMER = 'viewTimer';
/** @private */
com.adtech.Advert.ENGAGEMENT_TIMER = 'engagementTimer';
/** @private */
com.adtech.Advert.INTERACTION_TIMER = 'interactionTimer';
/** @private */
com.adtech.Advert.EXPANSION_TIMER = 'expansionTimer';
/** @private */
com.adtech.Advert.DEFAULT_CLICK = 'default';
/** @private */
com.adtech.Advert.BACKUP_CLICK = 'backupImageClickthrough';
/** @private */
com.adtech.Advert.ALT_TEXT_VARIABLE_KEY = 'Backup Alt Text';
/** @private */
com.adtech.Advert.ACTION_TARGET_SELF = 'self';
/** @private */
com.adtech.Advert.ACTION_TARGET_WILDCARD = '*';
/** @private */
com.adtech.Advert.MACRO_AD_TIME = '_ADTIME_';
/** @private */
com.adtech.Advert.MACRO_TIMESTAMP = '_TIMESTAMP_';
/** @private */
com.adtech.Advert.MACRO_ASSET = '_ASSETSHOST_';
/** @private */
com.adtech.Advert.CONFIG_TRACKING_MACROS_KEY = 'trackingMacros';
/** @private */
com.adtech.Advert.BUYSIGHT_KEY = 'buysightDataKey';
/** @private */
com.adtech.Advert.CONTENT_SEPARATOR = ': ';
/** @private */
com.adtech.Advert.CONTENT_PROPERTY_TRACKING_KEY = 'Tracking Id';
/** @private */
com.adtech.Advert.CONTENT_PROPERTY_PARENT_TRACKING_KEY = 'Parent Tracking Id';
/** @private */
com.adtech.Advert.VIDEO_EVENT_VIEW = 'Video View';
/** @private */
com.adtech.Advert.VIDEO_EVENT_START = 'Video Start';
/** @private */
com.adtech.Advert.VIDEO_EVENT_RESUME = 'Video Resume';
/** @private */
com.adtech.Advert.VIDEO_EVENT_REPLAY = 'Video Replay';
/** @private */
com.adtech.Advert.VIDEO_EVENT_PAUSE = 'Video Pause';
/** @private */
com.adtech.Advert.VIDEO_EVENT_PLAY = 'Video Play';
/** @private */
com.adtech.Advert.VIDEO_FIRST_QUARTILE = 'Video First Quartile';
/** @private */
com.adtech.Advert.VIDEO_MIDPOINT = 'Video Midpoint';
/** @private */
com.adtech.Advert.VIDEO_THIRD_QUARTILE = 'Video Third Quartile';
/** @private */
com.adtech.Advert.VIDEO_EVENT_COMPLETE = 'Video Complete';
/** @private */
com.adtech.Advert.VIDEO_EVENT_MUTE = 'Video Mute';
/** @private */
com.adtech.Advert.OPT_TRACKING_KEYS = {
    'creativeId': 'kvu.3rd-creative',
    'placementId': 'kvu.3rd-plc'
};
/** @private */
com.adtech.Advert.VIDEO_BUFFERING_EVENT = 'Video Buffering';
/** @private */
com.adtech.Advert.VIDEO_BUFFERING_END_EVENT = 'Video Buffering End';
/** @private */
com.adtech.Advert.TAGVARS_SUBSTITUTION_MAP = {'__SC__': ';'};
// Copyright 2010 AOL Platforms.

/**
 * @author Pictela Support <support@pictela.com>
 *
 * Constants refactored out of HtmlContent in order to be used by the Core class.
 */

com.adtech.HtmlContent = com.adtech.HtmlContent || function(){};

/**  @private */
com.adtech.HtmlContent.CMD_TYPE_DISPATCH = 'dispatch';
/**  @private */
com.adtech.HtmlContent.CMD_TYPE_EXEC = 'exec';
/**  @private */
com.adtech.HtmlContent.CMD_TYPE_INIT = 'init';
/**  @private */
com.adtech.HtmlContent.CMD_TYPE_MRAID = 'CMD_MRAID';
/**  @private */
com.adtech.HtmlContent.PROPERTY_DELIM = 'A$T$P';
/**  @private */
com.adtech.HtmlContent.OBJECT_DELIM = 'A#T#O';
/**  @private */
com.adtech.HtmlContent.KEY_VALUE_DELIM = '#:#';
/**  @private */
com.adtech.HtmlContent.ENVIRONMENT_WEB = 'WEB';
/**  @private */
com.adtech.HtmlContent.ENVIRONMENT_MRAID = 'MRAID';
/** @private */
com.adtech.HtmlContent.ENVIRONMENT_ORMMA = 'ORMMA';
// Copyright 2010 AOL Platforms.

/**
 * The ADTECH core library is required to be inserted into the head
 *     of every HTML document within an HTML advert. Once included, a global
 *     object name <code>ADTECH</code> will be available, exposing the following
 *     documented API.
 * @author Pictela Support <support@pictela.com>
 * @extends com.adtech.EventDispatcher
 * @namespace ADTECH
 * @global
 */
com.adtech.Core = function() {
  com.adtech.Core.supa.constructor.call(this);
  this.rmLibVersion = null; // Meaning pre-2.5.6.
  this.readyCallbacks = [];
  this.initialised = false;
  this.configLoaded = false;
  this.domLoaded = false;
  this.dataFeedRequestQueue = [];
  this.dataFeedRequestInProcess = false;
  this.macroMap = {};
  this.mouseX = -1;
  this.mouseY = -1;
  this.mraid = new com.adtech.MRAID(this);
  this.init();
}

com.adtech.Utils.extend(com.adtech.Core, com.adtech.EventDispatcher);
/** @private */
com.adtech.Core.VIDEO_CONTENT_EVENT_SEPARATOR = ":";

/** @private */
com.adtech.Core.prototype.init = function() {
  ADTECHDomReady(com.adtech.Utils.createClosure(this, this.domLoadHandler));
  // Retained for backwards compatibility for RM Lib < 1.11.0.
  this.pageLoaded = (com.adtech.Utils.getQueryStringVariable('pageLoaded') != null) ?
      true : false;
  this.addPostMessageListener();
  this.sendMessage(this.constructMessage(com.adtech.HtmlContent.CMD_TYPE_INIT));
}

/** @private */
com.adtech.Core.prototype.setMacroMap = function() {
  var tagTrackingMacros = this.adConfig.tagVars[com.adtech.Advert.CONFIG_TRACKING_MACROS_KEY];
  if (typeof tagTrackingMacros == 'object') {
    for (var macro in tagTrackingMacros) {
      if (tagTrackingMacros.hasOwnProperty(macro)) {
        this.macroMap['##' + macro + '##'] = tagTrackingMacros[macro];
      }
    }
  }
  this.macroMap[com.adtech.Advert.MACRO_AD_TIME] = this.adConfig.adServerVars.uid;
}

/** @private */
com.adtech.Core.prototype.addPostMessageListener = function() {
  com.adtech.Utils.registerNativeEventHandler(window, 'message',
      com.adtech.Utils.createClosure(this, this.postMessageHandler));
}

/** @private */
com.adtech.Core.prototype.addMouseMoveListener = function() {
  this.mouseMoveHandlerClosure =
      com.adtech.Utils.createClosure(this, this.mouseMoveHandler);
  com.adtech.Utils.registerNativeEventHandler(document, 'mousemove',
      this.mouseMoveHandlerClosure);
}

/** @private */
com.adtech.Core.prototype.removeMouseMoveListener = function() {
  if (this.mouseMoveHandlerClosure) {
    com.adtech.Utils.removeNativeEventHandler(document, 'mousemove',
        this.mouseMoveHandlerClosure);
  }
}

/** @private */
com.adtech.Core.prototype.sendMessage = function(message) {
  parent.postMessage(message, '*');
}

/** @private */
com.adtech.Core.prototype.constructMessageKeyValuePair = function(key, value) {
  return key + com.adtech.HtmlContent.KEY_VALUE_DELIM + value +
  com.adtech.HtmlContent.PROPERTY_DELIM;
}

/** @private */
com.adtech.Core.prototype.constructMessage = function(cmd, message) {
  var msg = cmd;
  if (message != undefined) {
    var messageStr = (typeof message == 'string') ? message : JSON.stringify(message);
    msg += com.adtech.HtmlContent.OBJECT_DELIM + messageStr;
  }
  return msg;
}

/** @private */
com.adtech.Core.prototype.constructMessageObject = function(message) {
  /*
   * Messages can have a maximum of two parts. One type and one optional value.
   */
  var messageObj = {};
  var messageBits = message.split(com.adtech.HtmlContent.OBJECT_DELIM);
  messageObj.cmd = messageBits[0];
  if (this.useJSONMessageSerialisation() ||
      (messageBits.length > 1 && messageBits[1].indexOf('{') == 0)) {
    messageObj.payload = (messageBits[1]) ? JSON.parse(messageBits[1]) : {};
  } else {
    if (messageBits.length > 1) {
      messageObj.vars = {};
      var kvpairs = messageBits[1].split(com.adtech.HtmlContent.PROPERTY_DELIM);
      for (var i = 0; i < kvpairs.length; i++) {
        if (kvpairs[i].indexOf(com.adtech.HtmlContent.KEY_VALUE_DELIM) < 0) {
          continue;
        }
        var kvpair = kvpairs[i].split(com.adtech.HtmlContent.KEY_VALUE_DELIM);
        messageObj.vars[kvpair[0]] = kvpair[1];
      }
    }
  }
  return messageObj;
}

/** @private */
com.adtech.Core.prototype.dispatchReadyEvent = function() {
  if (!this.initialised) {
    this.initialised = true;
    if (com.adtech.Utils.supportsTouch())  {
      this.sendSupportsTouchMessage();
    }
    this.dispatchEvent(com.adtech.RichMediaEvent.READY);
    for (var i = 0; i < this.readyCallbacks.length; i++) {
      var callbackObj = this.readyCallbacks[i];
      if (typeof callbackObj.callback == 'function') {
        try {
          callbackObj.callback.apply(null, callbackObj.deps);
        } catch (e) {
          this.logError('Failed to execute callback: ' + e);
        }
      }
    }
    this.readyCallbacks = [];
    this.addMouseMoveListener();
  }
}

/** @private */
com.adtech.Core.prototype.initEventMetaData = function(meta) {
  meta = meta || {};
  meta['__mouseX'] = this.mouseX;
  meta['__mouseY'] = this.mouseY;
  return meta;
}

// Public API

/**
 * Returns the load state of the page hosting the advert.
 * @returns Boolean
 * @function isPageLoaded
 * @memberof ADTECH
 */
com.adtech.Core.prototype.isPageLoaded = function() {
  return this.pageLoaded;
}

/**
 * Returns the initialisation state of the ADTECH object.
 * @returns Boolean
 * @function isInitialised
 * @memberof ADTECH
 */
com.adtech.Core.prototype.isInitialised = function() {
  return this.initialised;
}

/**
 * Dispatches an event of type <code>type</code> to the ADTECH Rich Media library event
 * flow. Used to count interactions and non-interaction events.
 *
 * @param {string} name the name of the event.
 * @param {object} [meta] optional meta data to pass with the event.
 * @function event
 * @memberof ADTECH
 */
com.adtech.Core.prototype.event = function(name, meta) {
  if (this.useJSONMessageSerialisation()) {
    var message = {"type": name};
    meta = this.initEventMetaData(meta);
    message['meta'] = meta;
  } else {
    var message = this.constructMessageKeyValuePair('type', name);
  }
  this.sendMessage(this.constructMessage(com.adtech.HtmlContent.CMD_TYPE_DISPATCH, message));
}

/**
 * Makes a logging request to indicate that the content defined by <code>contentName</code>
 * is in view.
 *
 * @param {string} contentName the name used as the key to retrieve the content.
 * @param {object} [contentItem] the optional contentItem content object.
 * @function contentView
 * @memberof ADTECH
 */
com.adtech.Core.prototype.contentView = function(contentName, contentItem) {
  var message = {method: 'contentView', params: [].slice.call(arguments)};
  this.sendMessage(this.constructMessage(com.adtech.HtmlContent.CMD_TYPE_EXEC, message));
}

/**
 * Dispatches a content event
 *
 * @param {string} contentName the name used as the key to retrieve the content.
 * @param {string} eventName the name of the event.
 * @param {object} [contentItem] an optional content object.
 * @function contentEvent
 * @memberof ADTECH
 */
com.adtech.Core.prototype.contentEvent = function(contentName, eventName, contentItem) {
  if (contentItem != undefined && contentItem &&
      contentItem[com.adtech.Advert.CONTENT_PROPERTY_TRACKING_KEY] != undefined) {
    this.event(contentName + com.adtech.Advert.CONTENT_SEPARATOR +
        contentItem[com.adtech.Advert.CONTENT_PROPERTY_TRACKING_KEY]
        + com.adtech.Advert.CONTENT_SEPARATOR + eventName);
  } else {
    this.event(contentName + com.adtech.Advert.CONTENT_SEPARATOR + eventName);
  }
}

/**
 * Dispatches a child content event
 *
 * @param {string} parentContentName the name used as the key to retrieve the content.
 * @param {string} contentName the name used as the key to retrieve the content.
 * @param {string} eventName the name of the event.
 * @param {object} [contentItem] an optional content object.
 * @function childContentEvent
 * @memberof ADTECH
 */
com.adtech.Core.prototype.childContentEvent = function(
    parentContentName, contentName, eventName, contentItem) {
  if (contentItem != undefined && contentItem &&
      contentItem[com.adtech.Advert.CONTENT_PROPERTY_TRACKING_KEY] != undefined &&
      contentItem[com.adtech.Advert.CONTENT_PROPERTY_PARENT_TRACKING_KEY] != undefined) {
    this.event(parentContentName + com.adtech.Advert.CONTENT_SEPARATOR +
        contentItem[com.adtech.Advert.CONTENT_PROPERTY_PARENT_TRACKING_KEY] +
        com.adtech.Advert.CONTENT_SEPARATOR +
        contentItem[com.adtech.Advert.CONTENT_PROPERTY_TRACKING_KEY] +
        com.adtech.Advert.CONTENT_SEPARATOR + eventName);
  }
}

/**
 * Gets the value of the content variable associated to the key if defined;
 * null otherwise. This method has been deprecated in favour of the
 * <code>getContent</code> API.
 *
 * @param {string} key the key of the content variable.
 * @param {string} defaultValue the value that should be returned if the
 *     variable cannot be determined.
 *
 * @returns {?object}
 * @deprecated
 * @see #ADTECH.getContent
 * @function getContentVariable
 * @memberof ADTECH
 */
com.adtech.Core.prototype.getContentVariable = function(key, defaultValue) {
  return (this.adConfig.contentVariables[key] != undefined) ?
      this.adConfig.contentVariables[key] : defaultValue;
}

/**
 * Gets the value of the content associated to the key and content group if defined;
 * null otherwise. Content variable values can be edited in the content panel.
 * <br/>
 * <br/>
 * Please visit following link for more info:
 * {@link http://canvas.adtech.com/docs/building-templates/ documentation}
 *
 * @param {string} key the key of the content
 * @param {object} defaultValue a value that should be returned in the case
 *     when the ad is not being served on the ADTECH platform.
 * @returns Object
 * @function getContent
 * @memberof ADTECH
 */
com.adtech.Core.prototype.getContent = function(key) {
  return (this.adConfig.contentProperties != undefined
      && this.adConfig.contentProperties[key] != undefined) ?
      this.replaceContentPropertyFileValue(this.adConfig.contentProperties[key]) : null;
}

/** @private */
com.adtech.Core.prototype.replaceContentPropertyFileValue = function(value) {
  switch (typeof value) {
    case 'string':
      return this.getFileUrl(value);
      break;
    case 'object':
      return this.replaceContentPropertyFileValues(value);
      break;
    default:
      return value;
    break;
  }
}

/** @private */
com.adtech.Core.prototype.replaceContentPropertyFileValues = function(value) {
  if (com.adtech.Utils.isArray(value)) {
    var returnArray = []; // Collections can contain objects.
    for (var i = 0; i < value.length; i++) {
      returnArray.push(this.replaceContentPropertyFileValue(value[i]));
    }
    return returnArray;
  } else {
    // Object
    var returnObject = {};
    var propertiesToIgnore = [com.adtech.Advert.CONTENT_PROPERTY_TRACKING_KEY,
                              com.adtech.Advert.CONTENT_PROPERTY_PARENT_TRACKING_KEY];
    for (var prop in value) {
      if (value.hasOwnProperty(prop)) {
        if (com.adtech.Utils.inArray(prop, propertiesToIgnore)) {
          returnObject[prop] = value[prop];
          continue;
        }
        returnObject[prop] = this.replaceContentPropertyFileValue(value[prop]);
      }
    }
    return returnObject;
  }
}

/**
 * Gets the hostnames to be used for services HTTP requests.
 * The return value will be an object with the following keys:
 * <ul>
 * <li>GET</li>
 * <li>POST</li>
 * </ul>
 *
 * @returns {object}
 * @function getServicesHosts
 * @memberof ADTECH
 */
com.adtech.Core.prototype.getServicesHosts = function() {
  return {
    'GET': this.adConfig.servicesHosts[this.adConfig.adServerVars.servingProto],
    'POST': this.adConfig.servicesHosts['post']
  };
}

/**
 * Returns the offset X value of the placement, relative to the top left corner of
 * the advert. This API is required for multi-directional expand support.
 *
 * @param {number} defaultValue the default value to use for offline testing.
 *     Defaults to 0 if ommitted.
 * @returns {number}
 * @function getOffsetX
 * @memberof ADTECH
 */
com.adtech.Core.prototype.getOffsetX = function() {
  return this.adConfig.assetContainers.main.contractedX;
}

/**
 * Returns the offset Y value of the placement, relative to the top left corner of
 * the advert. This API is required for multi-directional expand support.
 *
 * @param {number} defaultValue the default value to use for offline testing. Defaults to 0
 *     if ommitted.
 * @returns {number}
 * @function getOffsetY
 * @memberof ADTECH
 */
com.adtech.Core.prototype.getOffsetY = function() {
  return this.adConfig.assetContainers.main.contractedY;
}

/**
 * Configures the videoPlayer to ensure events fired correspond to the supplied reportingId
 * and tracking ids provided on the contentItem.
 *
 * @param {string} collectionName the reportingId for the content.
 * @param {object} videoObject the video player object from which events are fired.
 * @param {object} [contentItem] the optional content item.
 * @function setReportingIdFromContent
 * @memberof ADTECH
 * @see #ADTECH.registerVideoPlayer
 */
com.adtech.Core.prototype.setReportingIdFromContent = function(
    collectionName, videoObject, contentItem) {
  var reportingId = collectionName;
  if (contentItem != undefined &&
      contentItem[com.adtech.Advert.CONTENT_PROPERTY_TRACKING_KEY] != undefined) {
    reportingId += com.adtech.Advert.CONTENT_SEPARATOR +
        contentItem[com.adtech.Advert.CONTENT_PROPERTY_TRACKING_KEY];
  }
  reportingId += com.adtech.Advert.CONTENT_SEPARATOR;
  /* registerVideoPlayer already adds trailing whitespace to reporting ID, so we
   * must remove the extra one here, that is included in CONTENT_SEPARATOR.
   */
  reportingId = reportingId.substring(0, reportingId.length - 1);
  //TODO: Check if object has src already. If so, UNLOAD! the video.
  this.registerVideoPlayer(videoObject, reportingId);
}

/**
 * Opens a new window with the address matching the one defined in the Canvas
 * web UI with the corresponding identifier.
 *
 * @param {string} identifier
 *          the user defined identifier for the click.
 * @param {string} defaultUrl
 *          the destination of the click mapped to the identifier. This value
 *          can be overridden in the Canvas web UI after the asset has been
 *          uploaded.
 *
 * @function click
 * @memberof ADTECH
 */
com.adtech.Core.prototype.click = function(identifier, defaultUrl) {
  this.executeClick(identifier);
}

/**
 *  Opens a new window with the address matching that of the <tt>url</tt> parameter. The
 *  click will increment the click count for identifier.
 *
 * @param {string} identifier the user defined identifier to report the dynamic click under.
 * @param {string} url the destination url for the click.
 * @function dynamicClick
 * @memberof ADTECH
 */
com.adtech.Core.prototype.dynamicClick = function(identifier, url) {
  this.executeClick(identifier, url);
}

/**
 * Dispatches a content click
 *
 * @param {string} contentName the name used as the key to retrieve the content.
 * @param {string} clickName the name of the click.
 * @param {object} [contentItem] the optional content object.
 * @param {string} [overrideUrl] the optional override url.
 */
com.adtech.Core.prototype.contentClick = function(contentName,
    clickName, contentItem, overrideUrl) {
  var name;
  if (contentItem != undefined &&
      contentItem[com.adtech.Advert.CONTENT_PROPERTY_TRACKING_KEY] != undefined) {
    name = contentName + com.adtech.Advert.CONTENT_SEPARATOR +
        contentItem[com.adtech.Advert.CONTENT_PROPERTY_TRACKING_KEY] +
        com.adtech.Advert.CONTENT_SEPARATOR + clickName;
  } else {
    name = contentName + com.adtech.Advert.CONTENT_SEPARATOR + clickName;
  }
  // Send a message out to RMLib in order to track any ADR product third party pixels.
  var message = {method: 'contentClick', params: [contentName, contentItem]};
  this.sendMessage(this.constructMessage(com.adtech.HtmlContent.CMD_TYPE_EXEC, message));
  if (!overrideUrl &&
      this.adConfig.dynamic && this.contentIsDynamic(contentName, clickName)) {
    /* Check if the content is dynamic. If so, pass the property containing the URL
     * string as the override URL because dynamic ads can not update the clickthrough
     * configuration. The limitation is there because there can be more dynamic items
     * in a collection than we have clickthrough records for (hence the 6+ tracking ID).
     */
    overrideUrl = (contentItem != undefined) ?
        contentItem[clickName] : this.getContent(contentName)[clickName];
  }
  this.executeClick(name, overrideUrl);
}

/**
 * @private
 * Returns a flag denoting if the specified content is sourced from DCO or not. Can also check if
 * it's a certain dco content type.
 *
 * @param contentName The name of the content.
 * @param propertyName The name of the property from the content.
 * @param contentType The dynamic type of the content to check against if specified.
 *
 */
com.adtech.Core.prototype.contentIsDynamic = function(
    contentName, propertyName, contentType) {
  var dcoConfig = this.adConfig.adrConfig || this.adConfig.dcoConfig;
  if (dcoConfig) {
    var contentMapObj = com.adtech.Utils
        .getDCOMapContent(dcoConfig.map, contentName, propertyName);
    if (contentMapObj) {
      if (contentType) {
        var dcoType = contentMapObj.dcoType || contentMapObj.adrType;
        return dcoType == contentType;
      } else {
        return true;
      }
    }
  }
  return false;
}

/**
 * Gets the absolute path to the file with the name that matches filename;
 * filename otherwise. This method is deprecated, and should no longer be
 * required for HTML ads.
 *
 * @param filename the name of required file.
 * @returns String
 *
 * @deprecated
 * @function getFileUrl
 * @memberof ADTECH
 */
com.adtech.Core.prototype.getFileUrl = function(filename) {
  // For backwards compatibility with pre-2.0 rmlib, continue to support baseURL.
  var assetBaseURL = this.adConfig.adServerVars.assetBaseURL ?
      this.adConfig.adServerVars.assetBaseURL : this.adConfig.adServerVars.baseURL;
  for (var i = 0; i < this.adConfig.assets.length; i++) {
    var asset = this.adConfig.assets[i];
    if (asset.name == filename) {
     return assetBaseURL + asset.url;
    }
  }
  return filename;
}

/**
 * Gets the absolute path to the file identified by identifier in the Canvas
 * web UI, if defined. If defaultFile is supplied and a match is not found
 * for the supplied identifer, then defaultFile is returned.
 *
 * @param {string} identifier the identifier of the required file.
 * @param {string} defaultFilename a name of a file that should be returned in the case when the ad is
 *     not being served on the ADTECH platform.
 * @returns String
 *
 * @function getFileUrlById
 * @memberof ADTECH
 */
com.adtech.Core.prototype.getFileUrlById = function(id, defaultFile) {
  // For backwards compatability with pre-2.0 rmlib, continue to support baseURL.
  var assetBaseURL = this.adConfig.adServerVars.assetBaseURL ?
      this.adConfig.adServerVars.assetBaseURL : this.adConfig.adServerVars.baseURL;
  for (var i = 0; i < this.adConfig.assets.length; i++) {
    var asset = this.adConfig.assets[i];
    if (asset.id == id) {
      return assetBaseURL + asset.url;
    }
  }
  return defaultFile;
}

/**
 * Gets a geo data value associated to the name if defined; defaultValue otherwise.
 *
 * @param {string} name the name of the reqired geo variable. Valid string values are:
 * area, city, country, state, zip.
 * @param {string} defaultValue the value to return if the geo variable cannot be found.
 * @returns string
 *
 * @function getGeoValue
 * @memberof ADTECH
 */
com.adtech.Core.prototype.getGeoValue = function(name, defaultValue) {
  var geoValue = this.adConfig.geoData[name];
  return (geoValue == undefined || geoValue.substring(0, 3) == '_AD') ?
      defaultValue: geoValue;
}

/**
 * Instructs the containing content layer to expand to it's expanded dimensions.
 * @function expand
 * @memberof ADTECH
 */
com.adtech.Core.prototype.expand = function(meta) {
  this.event('expand', meta);
}

/**
 * Instructs the containing content layer to return to its contracted dimensions.
 * @function contract
 * @memberof ADTECH
 */
com.adtech.Core.prototype.contract = function() {
  this.event('contract');
}

/**
 * Removes the containing content layer from the DOM.
 * @function close
 * @memberof ADTECH
 */
com.adtech.Core.prototype.close = function() {
  this.event('close');
}

/**
 * Shows the containing content layer.
 * @function show
 * @memberof ADTECH
 */
com.adtech.Core.prototype.show = function() {
  this.event('show');
}

/**
 * Hides the containing content layer.
 * @function hide
 * @memberof ADTECH
 */
com.adtech.Core.prototype.hide = function() {
  this.event('hide');
}

/**
 * Reloads the content within the containing content layer.
 * @function reload
 * @memberof ADTECH
 */
com.adtech.Core.prototype.reload = function() {
  this.event('reload');
}

/** @deprecated */
com.adtech.Core.prototype.callback = function(func) {
  this.ready(func);
}

/**
 * Invokes a user defined function when the core library has been fully initiated, the DOM
 * has loaded and optional dependencies have been loaded.
 *
 * @param {(Function|Array)} callbackFunctionOrDeps the desired function to be
 *     invoked on initialisation, or the array of module dependencies.
 * @param {Function} [callbackFunction] the desired function to be invoked after
 *     the specified module dependencies have loaded and class initialisation.
 * @function ready
 * @memberof ADTECH
 */
com.adtech.Core.prototype.ready = function(callbackFunctionOrDeps, callbackFunction) {
  if (com.adtech.Utils.isArray(callbackFunctionOrDeps)) {
    var _this = this;
    this.require(callbackFunctionOrDeps, function() {
  _this.checkReadyState({callback: callbackFunction,
                               deps: Array.prototype.slice.call(arguments)});
    });
  } else {
    this.checkReadyState({callback: callbackFunctionOrDeps, deps:[]});
  }
}

/** @private */
com.adtech.Core.prototype.checkReadyState = function(callbackObj) {
  if (this.initialised) {
    if (typeof callbackObj.callback == 'function') {
      callbackObj.callback.apply(null, callbackObj.deps);
    }
  } else {
    this.readyCallbacks.push(callbackObj);
  }
}

/**
 * @private
 *
 * Gets the value of any ad configuration value. The parameter must be a string.
 * The format of the string must be in dot notation; i.e: adServerVars.baseURL.
 */
com.adtech.Core.prototype.getConfigValue = function(configPath) {
  var argBits = configPath.split('.');
  var bitsLength = argBits.length;
  if (bitsLength > 0) {
    var property = this.adConfig;
    for (var i = 0; i < bitsLength; i++) {
      try {
        property = property[argBits[i]];
      } catch (e) {
        // Property does not exist.
      }
    }
    try {
      var test = property.toString();
      return property;
    } catch (e) {
      // Property does not exist.
    }
  }
  return '';
}

/**
 * Fetches the contents of the resource specified by the url parameter and passes
 * them to the callback function as a String.
 *
 * Requires rich media lib 1.6.0+
 *
 * @param {string} name the identifier for the data feed record.
 * @param {string} url the required url to be retrieved.
 * @param {function} callback the function to be invoked after the
 *     data has been fetched.
 * @param {object} [scope] optional scope for the function to be invoked in.
 *
 * @function getDataFeed
 * @memberof ADTECH
 */
com.adtech.Core.prototype.getDataFeed = function(name, url, callback, scope) {
  var execScope = scope || null;
  var requestUrl = this.getServicesHosts()['GET'] + 'a/proxy/text?url='
      + encodeURIComponent(url);
  this.addToDataFeedQueue({"name": name, "url": requestUrl , "callback": callback,
      "scope": execScope});
}

/**
 * Makes a request for poll data.
 *
 * Requires rich media lib 1.13.0+
 *
 * @param {string} name the name of the poll
 * @param {function} callback the name of the function to be invoked after
 *     the data has been fetched.
 * @param {object} [scope] optional scope for the function to be invoked in.
 *
 * @function getPollResults
 * @memberof ADTECH
 */
com.adtech.Core.prototype.getPollResults = function(name, callback, scope) {
  var execScope = scope || null;
  var requestUrl = this.getServicesHosts()['GET'] + 'a/poll/' + encodeURIComponent(name) +
      '/' + this.adConfig.canvasId + '.json';
  this.addToDataFeedQueue({"name": name, "url": requestUrl , "callback": callback,
      "scope": execScope});
}
/**
 * Captures the results of a custom user poll.
 * @example
 * {"answers": [
 *     {"answer":"Ice Cream", "selected": false},
 *     {"answer":"Chocolate", "selected": true}
 *   ]
 * }
 *
 * // This example collects the results from a two question poll and displays the results.
 * var choiceOneButton = document.createElement('img');
 * var choiceTwoButton = document.createElement('img');
 *
 * ADTECH.ready(initiateAd);
 *
 * function initiateAd(){
 *   var pollButtons = [choiceOneButton,choiceTwoButton];
 *   for (var i=0;i&lt;pollButtons.length;i++){
 *     pollButtons[i].src = ADTECH.getFileUrl('image.gif');
 *     pollButtons[i].onclick = submitButtonClickHandler;
 *     document.body.appendChild(pollButtons[i]);
 *   }
 * }
 *
 * function submitButtonClickHandler(event) {
 *   var choiceOneSelected = false;
 *   var choiceTwoSelected = false;
 *   if(event.target == choiceOneButton){
 *     choiceOneSelected = true;
 *   } else {
 *     choiceTwoSelected = true;
 *   }
 *   var choiceOneAnswer = {answer: "Ice Cream", selected:choiceOneSelected};
 *   var choiceTwoAnswer = {answer: "Chocolate", selected:choiceTwoSelected};
 *   var pollData = {answers:[choiceOneAnswer,choiceTwoAnswer]};
 *   ADTECH.submitPollResponse('Ice cream or chocolate?', pollData, pollResultsLoadedHandler);
 * }
 * function pollResultsLoadedHandler(results){
 *   for (var i=0; i&lt;results.answers.length; i++)
 *   {
 *     var answer = results.answers[i];
 *     // The answer of the questions. In this case it will be either "Ice Cream" or "Chocolate".
 *     alert(answer.answer);
 *     // The current count of votes for this answer.
 *     alert(answer.count);
 *   }
 * }
 * @param {string} name a name for the poll.
 * @param {object} data an object containing the poll information.
 *     The object should contain a single key, 'answers' that has a value of an
 *     Array containing Object instances which in turn contain they keys 'answer'
 *     and 'selected'.
 * @param {Function} callback the function to invoke when the poll results are sent back from
 *     the server. The function will be passed a single JSON object parameter.
 * @see ADTECH.#getPollResults
 * @function submitPollResponse
 * @memberof ADTECH
 */
com.adtech.Core.prototype.submitPollResponse = function(name, data, callback, scope) {
  var serialisedData;
  try {
    // NOTE: JSON.stringify will only work when document is running in standards mode > 7 for IE.
    // Possibly get Asset Inspector to set the correct doctype during inspection?
    serialisedData = JSON.stringify(data);
  } catch (e) {
    this.logError('Failed to serialise poll data: ' + e);
    return;
  }
  var dataStr = 'pictela_id=' + this.adConfig.canvasId + '&poll_name=' +
      name + '&poll_answers=' + encodeURIComponent(serialisedData);
  this.xhrArray = this.xhrArray || [];
  this.pollResponseCallbacks = this.pollResponseCallbacks || [];
  scope == undefined ? null : scope;
  this.pollResponseCallbacks.push({"callback": callback, "scope": scope});
  var idx = this.xhrArray.length;
  var url = this.getServicesHosts()['POST'] + 'a/poll.json';
  if (window.XDomainRequest && (!window.XMLHttpRequest ||
      (new window.XMLHttpRequest().responseType == undefined))) {
    // Legacy IE gashness.
    this.xhrArray[idx] = new XDomainRequest();
    this.xhrArray[idx].onload = com.adtech.Utils.createClosure(this,
        this.pollSubmitResponseHandler);
    // XDR object must post data using the same protocol.
    this.xhrArray[idx].open('POST', url.replace(/^https?:/i, ''));
  } else {
    this.xhrArray[idx] = new XMLHttpRequest();
    this.xhrArray[idx].open('POST', url, true);
    this.xhrArray[idx].withCredentials = true;
    this.xhrArray[idx].setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    var self = this;
    this.xhrArray[idx].onreadystatechange = function() {
      if (self.xhrArray[idx].readyState === 4 && self.xhrArray[idx].status === 200) {
        self.pollSubmitResponseHandler();
      }
    };
  }
  this.xhrArray[idx].send(dataStr);
}

/**
 * Captures any custom data in a database which can accessed through the Canvas UI.
 * Requires rm lib 1.7+.
 *
 * @param {object} data a JSON object consisting of the required data keys and values.
 *
 * @function captureData
 * @memberof ADTECH
 */
com.adtech.Core.prototype.captureData = function(data, key) {
  try {
    // NOTE: JSON.stringify will only work when document is running in standards mode > 7 for IE.
    // Possibly get Asset Inspector to set the correct doctype during inspection?
    serialisedData = JSON.stringify(data);
  } catch (e) {
    this.logError('Failed to serialise datacapture data: ' + e);
    return;
  }
  if (typeof key == 'undefined') {
    // Deprecated use of legacy services infrastructure.
    // Remove support in April 2014.
    data['adtech_canvas_id'] = this.adConfig.canvasId;
    data['adtech_flight_id'] = this.adConfig.adServerVars.id;
    data['adtech_banner_id'] = this.adConfig.adServerVars.bannerId;
    data['adtech_is_preview'] = this.adConfig.preview;
    this.sendDataToUrl(this.adConfig.servicesUrl + 'capture', data);
  } else {
    data['pictela_advert_id'] = this.adConfig.canvasId;
    data['pictela_flight_id'] = this.adConfig.adServerVars.id;
    var serviceURL = this.getServicesHosts()['POST'] + 'a/capture/' + key;
    var xhrObj;
    if (window.XDomainRequest && (!window.XMLHttpRequest ||
        (new window.XMLHttpRequest().responseType == undefined))) {
      // Legacy IE gashness.
      xhrObj = new XDomainRequest();
      serviceURL = serviceURL.replace(/^https?:/i, '');
    } else {
      xhrObj = new XMLHttpRequest();
    }
    xhrObj.open('POST', serviceURL, true);
    xhrObj.send(serialisedData);
  }
}

/**
 * Method to enable simple management of MRAID state changes.
 *
 * This method only functions within an MRAID environment.
 *
 * @param configuration an object containing keys with values of the
 *     standard MRAID states ('default', 'resized', 'expanded', 'hidden'),
 *     with callback function as values.
 *
 * @function addMRAIDStateChangeHandlers
 * @memberof ADTECH
 */
com.adtech.Core.prototype.addMRAIDStateChangeHandlers = function(configuration) {
  if (typeof configuration == 'object') {
    this.mraid.stateChangeCallbacks = configuration;
  }
}

// End public API

/** @private */
com.adtech.Core.prototype.logError = function(message) {
  if (typeof console != 'undefined') {
    console.warn('[PTLA]', message);
  }
}

/** @private */
com.adtech.Core.prototype.addToDataFeedQueue = function(dataRequestObject) {
  this.dataFeedRequestQueue.push(dataRequestObject);
  if (!this.dataFeedRequestInProcess) {
    this.loadExternalDataFeed(dataRequestObject);
  }
}

/** @private */
com.adtech.Core.prototype.loadExternalDataFeed = function(dataRequestObject) {
  this.dataFeedRequestInProcess = true;
  var externalData = document.createElement('script');
  var feedUrl = dataRequestObject['url'];
  if (feedUrl.indexOf('?') < 0) {
    feedUrl += '?';
  }
  externalData.src = feedUrl + '&callback=ADTECH.externalDataFeedLoadHandler';
  document.body.appendChild(externalData);
}

/**
 * @private
 */
com.adtech.Core.prototype.checkDataFeedQueue = function() {
  if (this.dataFeedRequestQueue.length > 0) {
    this.loadExternalDataFeed(this.dataFeedRequestQueue[0]);
  } else {
    this.dataFeedRequestInProcess = false;
  }
}

/** @private */
com.adtech.Core.prototype.logClick = function(identifier, overrideUrl, meta) {
  if (this.useJSONMessageSerialisation()) {
    var message = {"method": "logClick", "params": [].slice.call(arguments)};
  } else {
    var message = this.constructMessageKeyValuePair('method', 'logClick') +
        this.constructMessageKeyValuePair('params', identifier);
  }
  this.sendMessage(this.constructMessage(com.adtech.HtmlContent.CMD_TYPE_EXEC, message));
}

/** @private */
com.adtech.Core.prototype.executeClick = function (identifier, overrideUrl, meta) {
  identifier = this.verifyClickIdentifier(identifier);
  if (typeof this.adConfig.clickthroughs[identifier] != 'undefined') {
    this.removeMouseMoveListener();
    meta = this.initEventMetaData(meta);
    var clk = this.adConfig.clickthroughs[identifier];
    var dest = this.generateClickUrl(identifier, overrideUrl);
    this.logClick(identifier, overrideUrl, meta);
    if (this.env != com.adtech.HtmlContent.ENVIRONMENT_WEB) {
     return;
    }
    switch (clk.target) {
      case '_self':
        top.location.href = dest;
        break;
      default:
        window.open(dest, this.adConfig.adServerVars.uid + (+new Date()), clk.features);
        break;
    }
    // Add the mouse move listener after the new window has opened.
    var self = this;
    setTimeout(function() {
      self.addMouseMoveListener();
    }, 1000);
  }
}

/**
 * @private
 *
 * Generates the clickthrough URL including publisher redirect, tracking redirect and
 * third party redirects (if applicable for any).
 */
com.adtech.Core.prototype.generateClickUrl = function (identifier, overrideUrl) {
  var disableTracking = (typeof this.adConfig.adtechDisableClickTracking != 'undefined') ?
      true : false;
  identifier = this.verifyClickIdentifier(identifier);
  if (typeof this.adConfig.clickthroughs[identifier] != 'undefined') {
    var clk = this.adConfig.clickthroughs[identifier];
    var dest = (typeof overrideUrl != 'undefined' && overrideUrl) ? overrideUrl : clk.dest;
    if (!disableTracking) {
      dest = this.addThirdPartyRedirectsToClickUrl(identifier, dest);
      var redirectUrl = this.generateClickRedirectUrl({"id": clk.id});
      if (redirectUrl) {
        dest = redirectUrl + escape(dest);
      }
      if (typeof this.adConfig.pubVars.clickRedirect != 'undefined'
          && this.adConfig.pubVars.clickRedirect) {
        dest = this.replaceServerMacros(this.adConfig.pubVars.clickRedirect) + dest;
      }
    }
    return dest;
  }
  return '';
}

/** @private */
com.adtech.Core.prototype.generateClickRedirectUrl = function(macroMap) {
  var clickRedirectUrl = '';
  if (typeof this.adConfig.clickRedirect != 'undefined' && this.adConfig.clickRedirect) {
    clickRedirectUrl = this.adConfig.clickRedirect.replace(/_CLK_ID_/g, macroMap['id']);
    var linkFragment = ';link=';
    var linkRegExp = new RegExp(linkFragment, 'g');
    var trackingKeys = com.adtech.Advert.OPT_TRACKING_KEYS;
    if (typeof this.adConfig.tagVars.creativeId != 'undefined') {
      clickRedirectUrl = clickRedirectUrl.replace(linkRegExp,
          ';' + trackingKeys['creativeId'] + '=' + this.adConfig.tagVars.creativeId + linkFragment);
    }
    if (typeof this.adConfig.tagVars.placementId != 'undefined') {
      clickRedirectUrl = clickRedirectUrl.replace(linkRegExp,
          ';' + trackingKeys['placementId'] + '=' + this.adConfig.tagVars.placementId + linkFragment);
    }
  }
  return clickRedirectUrl;
}

/** @private */
com.adtech.Core.prototype.verifyClickIdentifier = function (identifier) {
  return (typeof identifier == 'undefined' || identifier == null || !identifier) ?
      'default' : identifier;
}

/** @private */
com.adtech.Core.prototype.addThirdPartyRedirectsToClickUrl = function(identifier, url) {
  for (var i = 0; i < this.adConfig.thirdPartyTracking.length; i++) {
    var tracking = this.adConfig.thirdPartyTracking[i];
    if (this.clickMustMakeThirdPartyRequest(tracking, identifier) &&
        (tracking.type == com.adtech.Advert.TRACK_TYPE_REDIRECT) && tracking.url) {
      url =  this.replaceServerMacros(tracking.url) + escape(url);
    }
  }
  return url;
}

/** @private */
com.adtech.Core.prototype.replaceServerMacros = function(url) {
  for (var key in this.macroMap) {
    url = url.replace(key, this.macroMap[key]);
  }
  return url.replace(com.adtech.Advert.MACRO_TIMESTAMP, +new Date());
}

/**
 * @private
 * @param tracking tracking object from advert JSON configuration.
 * @param identifer click identifier.
 */
com.adtech.Core.prototype.clickMustMakeThirdPartyRequest = function(tracking, identifier) {
  if (tracking.onEvent == com.adtech.Advert.TRACK_EVENT_CLICKS_ALL ||
      tracking.onEvent == com.adtech.Advert.TRACK_EVENT_ALL ||
      (tracking.onEvent == com.adtech.Advert.TRACK_EVENT_SPECIFIC_CLICK &&
      tracking.eventName == identifier)) {
    return true;
  }
  return false;
}

/** @private */
com.adtech.Core.prototype.sendDataToUrl = function(url, params, method) {
  method = method || 'post';

  var formFrame = document.createElement('iframe');
  formFrame.style.display = 'none';
  document.body.appendChild(formFrame);
  var frameName = 'pctf_' + Math.random().toString().split('.')[1];
  var frameId = 'id_' + frameName;
  formFrame.contentWindow.name = frameName;
  var form = document.createElement('form');
  var formId = 'pctFrm_' + frameName;
  form.setAttribute('method', method);
  form.setAttribute('action', url);
  form.setAttribute('target', frameName);

  for (var key in params) {
    var hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', key);
    hiddenField.setAttribute('value', params[key]);
    form.appendChild(hiddenField);
  }

  document.body.appendChild(form);
  form.submit();
}

/** @private */
com.adtech.Core.prototype.sendSupportsTouchMessage = function() {
    if (this.useJSONMessageSerialisation()) {
      // Support since RMLib 2.10.0
      var message = {"method": "touchStart", "params": []};
      this.sendMessage(this.constructMessage(com.adtech.HtmlContent.CMD_TYPE_EXEC, message));
    }
}

/**
 * @private
 *
 * Invoked by JSONP response to notify that the request has completed.
 */
com.adtech.Core.prototype.externalDataFeedLoadHandler = function(data) {
  var dataRequestObject = this.dataFeedRequestQueue.shift();
  dataRequestObject['callback'].call(dataRequestObject['scope'], data);
  this.checkDataFeedQueue();
}

/** @private */
com.adtech.Core.prototype.useJSONMessageSerialisation = function() {
  return (this.rmLibVersion && (this.rmLibVersion['major'] > 2 ||
      (this.rmLibVersion['major'] == 2 &&
       (this.rmLibVersion['minor'] > 5 ||
           (this.rmLibVersion['minor'] == 5 && this.rmLibVersion['revision'] >= 6)))));
}

/** @private */
com.adtech.Core.prototype.setRmLibVersionInfo = function() {
  if (this.adConfig.rmLibVersion) {
    var rmLibVersionBits = this.adConfig.rmLibVersion.split('_');
    if (rmLibVersionBits.length == 3) {
      this.rmLibVersion = {'major': parseInt(rmLibVersionBits[0]),
          'minor': parseInt(rmLibVersionBits[1]), 'revision': parseInt(rmLibVersionBits[2])};
    }
  }
}

// Event handlers

com.adtech.Core.prototype.coreEventHandler = function(eventType, properties) {
  switch (eventType) {
    case com.adtech.RichMediaEvent.READY:
      if (this.domLoaded) {
        this.dispatchReadyEvent();
      }
      this.configLoaded = true;
      break;
    case com.adtech.RichMediaEvent.PAGE_LOAD:
      this.pageLoaded = true;
      this.dispatchEvent(eventType);
      break;
    default:
      var event = new com.adtech.RichMediaEvent(eventType);
      if (typeof properties == 'object') {
        for (var prop in  properties) {
          if (prop == 'type') {
            continue;
          }
          if (properties.hasOwnProperty(prop)) {
            event[prop] = properties[prop];
          }
        }
      }
      this.dispatchEvent(event);
  }
}

com.adtech.Core.prototype.domLoadHandler = function() {
  if (this.configLoaded) {
    this.dispatchReadyEvent();
  }
  this.domLoaded = true;
}

com.adtech.Core.prototype.postMessageHandler = function(event) {
  var messageObj = this.constructMessageObject(event.data);
  var messageData = (messageObj.vars) ? messageObj.vars : messageObj.payload;
  switch (messageObj.cmd) {
    case com.adtech.HtmlContent.CMD_TYPE_INIT:
      if (messageData.env) {
        this.env = messageData.env;
        return;
      }
      this.adConfig = (typeof messageData.adConfig == 'string') ?
          JSON.parse(messageData.adConfig) : messageData.adConfig;
      this.setRmLibVersionInfo();
      this.setMacroMap();
      this.coreEventHandler(com.adtech.RichMediaEvent.READY);
      break;
    case com.adtech.HtmlContent.CMD_TYPE_DISPATCH:
      this.coreEventHandler(messageData.type, messageData);
      break;
    case com.adtech.HtmlContent.CMD_TYPE_MRAID:
      this.mraid.postMessageHandler(messageObj);
      break;
  }
}

/** @private */
com.adtech.Core.prototype.pollSubmitResponseHandler = function() {
  if (this.xhrArray) {
    var callbackObj = this.pollResponseCallbacks.shift();
    var xhr = this.xhrArray.shift();
    var response = JSON.parse(xhr.responseText);
    if (callbackObj.scope) {
      callbackObj.callback.call(callbackObj.scope, response);
    } else {
      callbackObj.callback.call(null, response);
    }
  }
}

/** @private */
com.adtech.Core.prototype.mouseMoveHandler = function(event) {
  this.mouseX = event.clientX;
  this.mouseY = event.clientY;
}
// Copyright 2010 AOL Platforms.

/**
 * MRAID Core implementation. Documentation for methods extracted from from "IAB
 * Mobile Rich-media Ad Interface Definitions v.1.0" document found at
 * http://www.iab.net/mraid.
 *
 * @class
 *
 * @author christopher.sancho@adtech.com
 */
com.adtech.MRAID = function(core) {
  com.adtech.MRAID.supa.constructor.call(this);
  this.core = core;
  window.mraid = this;
  this.stateChangeCallbacks = {};
  this.mraidContainerState = com.adtech.MRAIDState.LOADING;
  this.core.addEventListener(com.adtech.RichMediaEvent.READY, this.coreReadyEventHandler, this);
}

com.adtech.Utils.extend(com.adtech.MRAID, com.adtech.EventDispatcher);

/**
 * @override
 * @since MRAID 1.0
 */
com.adtech.MRAID.prototype.addEventListener = function(type, handler, obj) {
  if (this.core.rmLibVersion != null && !this.hasEventListener(type, handler, obj)) {
    // Not null condition satisfied if RM lib version > 2.5.6.
    // Only get RMLib to add the event listener ONCE for each MRAID event.
    this.sendMessage('addEventListener', type);
  }
  com.adtech.MRAID.supa.addEventListener.call(this, type, handler, obj);
}

/**
 * @override
 * @since MRAID 1.0
 */
com.adtech.MRAID.prototype.removeEventListener = function(type, handler, obj) {
  if (this.core.rmLibVersion != null) {
    // Not null condition satisfied if RM lib version > 2.5.6.
    this.sendMessage('removeEventListener', type);
  }
  com.adtech.MRAID.supa.removeEventListener.call(this, type, handler, obj);
}

/**
 * @private
 *
 * Converts an object to a string message.
 */
com.adtech.MRAID.prototype.constructMessageValueString = function(params) {
  var delim = com.adtech.HtmlContent.KEY_VALUE_DELIM;
  var msg = '';
  for ( var i = 0; i < params.length; i++) {
    if (typeof params[i] == 'object') {
      /* JSON supported in all major mobile browsers except iOS Safari 3.2 */
      params[i] = JSON.stringify(params[i]);
    }
    params[i] = escape(params[i]);
    msg += params[i] + delim;
  }
  return msg.substring(msg.length - delim.length, 0);
}

/**
 * @private
 *
 * Proxies mraid method <code>sendMessage</code> to rich media library for
 * handling.
 *
 * @param method
 *          The MRAID method to call.
 * @param params
 *          The method's parameters.
 */
com.adtech.MRAID.prototype.sendMessage = function(method) {
  var params = [].slice.call(arguments);
  params.shift();
  if (this.core.useJSONMessageSerialisation()) {
    var message = {
      "method" : method,
      "params" : params
    };
  } else {
    var message = this.core.constructMessageKeyValuePair('method', method)
        + this.core.constructMessageKeyValuePair('params',
                this.constructMessageValueString(params));
  }
  this.core.sendMessage(this.core.constructMessage(com.adtech.HtmlContent.CMD_TYPE_MRAID, message));
}

/**
 * Displays an embedded browser window in the application that loads an external
 * URL.
 *
 * @param url
 *          the URL of the web page.
 * @since MRAID 1.0
 */
com.adtech.MRAID.prototype.open = function(url) {
  this.core.click('default', url);
}

/**
 * The close method will cause the ad container to downgrade its state. For ads
 * in an expanded or resized state, the close() method moves the ad to a default
 * state. For interstitial ads in a default state, the close() method moves to a
 * hidden state.
 *
 * @since MRAID 1.0
 */
com.adtech.MRAID.prototype.close = function() {
  switch (this.getPlacementType()) {
  case 'interstitial':
    this.core.close();
    break;
  case 'inline':
    this.core.contract();
    break;
  }
}

/**
 * Causes the existing web view to open at the highest level (e.g., at a higher
 * z-index value than any app content) in the view hierarchy.
 *
 * Note: Canvas only supports 1-part creatives for MRAID. This is why the method
 * signature differs from the official MRAID specification.
 *
 * @since MRAID 1.0
 */
com.adtech.MRAID.prototype.expand = function() {
  this.core.expand();
}

/**
 * The resize method will cause the existing web view to change size using the
 * existing HTML document.
 *
 * @since MRAID 2.0
 */
com.adtech.MRAID.prototype.resize = function() {
  this.sendMessage('resize');
}

/**
 * Set the ad's resize properties, in particular the width and height of the
 * resized ad creative.
 *
 * @since MRAID 2.0
 */
com.adtech.MRAID.prototype.setResizeProperties = function(properties) {
  this.sendMessage('setResizeProperties', properties);
}

/**
 * Proxies mraid method <code>createEvent</code> to rich media library for
 * handling.
 *
 * @param date
 *          The date and time of the event.
 * @param title
 *          The title of the event.
 * @param body
 *          The body of the event.
 * @since MRAID 2.0 draft
 */
com.adtech.MRAID.prototype.createEvent = function(date, title, body) {
  this.sendMessage('createEvent', date.getTime(), title, body);
}

/**
 * Proxies mraid method <code>createCalendarEvent</code> to rich media library
 * for handling.
 *
 * @param parameters
 *          JSON object that contains parameters for a calendar entry based off
 *          the <a
 *          href="http://www.w3.org/TR/calendar-api/#idl-def-CalendarEvent"> W3C
 *          specification</a>.
 *
 * @since MRAID 2.0
 */
com.adtech.MRAID.prototype.createCalendarEvent = function(parameters) {
  this.sendMessage('createCalendarEvent', parameters);
}

/**
 * Proxies mraid method <code>makeCall</code> to rich media library for
 * handling.
 *
 * @param number
 *          String value of the phone number.
 * @since MRAID 2.0 draft
 */
com.adtech.MRAID.prototype.makeCall = function(number) {
  this.sendMessage('makeCall', number);
}

/**
 * Proxies mraid method <code>openMap</code> to rich media library for
 * handling.
 *
 * @param poi
 *          Google Maps-formatted argument. The parameter must describe a
 *          point-of-interest on a map, not, for example, driving directions.
 * @param fullscreen
 *          Whether the map displays within the current View or within a new
 *          view that takes up the whole screen.
 * @since MRAID 2.0 draft
 */
com.adtech.MRAID.prototype.openMap = function(poi, fullscreen) {
  this.sendMessage('openMap', poi, fullscreen);
}

/**
 * Proxies mraid method <code>playAudio</code> to rich media library for
 * handling.
 *
 * @param url
 *          The URL of the audio or audio stream.
 * @param properties
 *          JSON list of the properties for native player.
 * @since MRAID 2.0 draft
 */
com.adtech.MRAID.prototype.playAudio = function(url, properties) {
  this.sendMessage('playAudio', url, properties);
}

/**
 * Proxies mraid method <code>playVideo</code> to rich media library for
 * handling.
 *
 * @param url
 *          The URL of the video or video stream.
 * @param properties
 *          properties (JSON - required only for ORMMA) : list of the properties for native player
 * @since MRAID 2.0
 */
com.adtech.MRAID.prototype.playVideo = function(url, properties) {
  if (typeof properties == 'object' &&
      this.core.env == com.adtech.HtmlContent.ENVIRONMENT_ORMMA) {
    this.sendMessage('playVideo', url, properties);
  } else {
    this.sendMessage('playVideo', url);
  }
}

/**
 * Proxies mraid method <code>sendMail</code> to rich media library for
 * handling.
 *
 * @param recipient
 *          The email address for the message.
 * @param subject
 *          The subject line of the message.
 * @param body
 *          The body of the message.
 * @since MRAID 2.0 draft
 */
com.adtech.MRAID.prototype.sendMail = function(recipient, subject, body) {
  this.sendMessage('sendMail', recipient, subject, body);
}

/**
 * Proxies mraid method <code>sendSMS</code> to rich media library for
 * handling.
 *
 * @param recipient
 *          The email address for the message.
 * @param body
 *          The body of the message.
 * @since MRAID 2.0 draft
 */
com.adtech.MRAID.prototype.sendSMS = function(recipient, body) {
  this.sendMessage('sendSMS', recipient, body);
}

/**
 * Proxies mraid method <code>storePicture</code> to rich media library for
 * handling.
 *
 * @param url
 *          The URL to the image or other media asset.
 * @since MRAID 2.0
 */
com.adtech.MRAID.prototype.storePicture = function(url) {
  this.sendMessage('storePicture', url);
}

/**
 * Proxies mraid method <code>useCustomClose</code> to rich media library for
 * handling.
 *
 * @param bool
 *          <code>true</code> â€“ Allows creative supplies its own designs for
 *          the close area.<br/> <code>false</code> â€“ Shows the SDK default
 *          image for the close area.
 * @since MRAID 1.0
 */
com.adtech.MRAID.prototype.useCustomClose = function(bool) {
  this.sendMessage('useCustomClose', bool);
}

/**
 * Proxies mraid method <code>setShakeProperties</code> to rich media library
 * for handling.
 *
 * @param properties
 *          The JSON object that contains both <code>intensity</code> and <code>interval</code>.
 *          keys.
 * @since MRAID 2.0 draft
 */
com.adtech.MRAID.prototype.setShakeProperties = function(properties) {
  var validShakeProperties = ['interval', 'intensity'];
  var validProperties = com.adtech.MRAID.utils.createValidObject(properties, validShakeProperties);
  com.adtech.MRAID.utils.mergeObjects(this.core.adConfig.mraid.shakeProperties,
      validProperties);
  this.sendMessage('setShakeProperties', this.core.adConfig.mraid.shakeProperties);
}

/**
 * Proxies mraid method <code>setExpandProperties</code> to rich media library
 * for handling.
 *
 * @param properties
 *          The JSON object that contains properties for the expandable ad.
 * @since MRAID 1.0
 */
com.adtech.MRAID.prototype.setExpandProperties = function(properties) {
  // isModal is a read-only property, so do not allow user to set it.
  var validExpandProperties = ['width', 'height', 'useCustomClose'];
  var validProperties = com.adtech.MRAID.utils.createValidObject(properties, validExpandProperties);
  com.adtech.MRAID.utils.mergeObjects(this.core.adConfig.mraid.expandProperties,
      validProperties);
  this.sendMessage('setExpandProperties', this.core.adConfig.mraid.expandProperties);
}

/**
 * Proxies mraid method <code>getExpandProperties</code>.
 *
 * @return JSON <code>{ width, height, useCustomClose, isModal }</code>
 * @since MRAID 1.0
 */
com.adtech.MRAID.prototype.getExpandProperties = function() {
  return this.core.adConfig.mraid.expandProperties;
}

/**
 * Proxies mraid method <code>getResizeProperties</code>.
 *
 * @return JSON <code>{ width, height, useCustomClose, isModal }</code>
 * @since MRAID 2.0
 */
com.adtech.MRAID.prototype.getResizeProperties = function() {
  return this.core.adConfig.mraid.resizeProperties;
}

/**
 * Proxies mraid method <code>getState</code>.
 *
 * @return String Possible results may include "loading", "default", "expanded", "resized"
 *     or "hidden". "resized" value introduced in version 2.0.
 *
 * @since MRAID 1.0
 */
com.adtech.MRAID.prototype.getState = function() {
  if (typeof this.core.adConfig != 'undefined') {
    return this.core.adConfig.mraid.state;
  }
  return com.adtech.MRAIDState.LOADING;
}

/**
 * Proxies mraid method <code>getShakeProperties</code>.
 *
 * @return JSON <code>{ intensity, interval }</code>
 * @since MRAID 2.0 draft
 */
com.adtech.MRAID.prototype.getShakeProperties = function() {
  return this.core.adConfig.mraid.shakeProperties;
}

/**
 * Proxies mraid method <code>getKeyboard</code>.
 *
 * @return Boolean The virtual keyboard is present
 * @since MRAID 2.0 draft
 */
com.adtech.MRAID.prototype.getKeyboard = function() {
  return this.core.adConfig.mraid.keyboard;
}

/**
 * Proxies mraid method <code>getHeading</code>.
 *
 * @return Integer <code>0-359</code> compass direction in degrees.
 * @since MRAID 2.0 draft
 */
com.adtech.MRAID.prototype.getHeading = function() {
  return this.core.adConfig.mraid.heading;
}

/**
 * Proxies mraid method <code>getLocation</code>.
 *
 * @return JSON <code>{lat, lon, acc}</code> - the latitude, longitude, and
 *         accuracy of the reading or null.
 * @since MRAID 2.0 draft
 */
com.adtech.MRAID.prototype.getLocation = function() {
  return this.core.adConfig.mraid.location;
}

/**
 * Proxies mraid method <code>getScreenSize</code>.
 *
 * @return JSON <code>{width, height}</code>
 * @since MRAID 2.0
 */
com.adtech.MRAID.prototype.getScreenSize = function() {
  return this.core.adConfig.mraid.screenSize;
}

/**
 * Proxies mraid method <code>getDefaultPosition</code>.
 *
 * @return JSON <code>{x, y, width, height}</code>
 * @since MRAID 2.0, ORMMA 1.0
 */
com.adtech.MRAID.prototype.getDefaultPosition = function() {
  return this.core.adConfig.mraid.defaultPosition;
}

/**
 * Proxies mraid method <code>getCurrentPosition</code>.
 *
 * @return JSON <code>{x, y, width, height}</code>
 * @since MRAID 2.0
 */
com.adtech.MRAID.prototype.getCurrentPosition = function() {
  return this.core.adConfig.mraid.currentPosition;
}

/**
 * Proxies mraid method <code>getNetwork</code>.
 *
 * @return String Possible results may include "offline," "wifi," "cell," or
 *         "unknown."
 * @since MRAID 2.0 draft
 */
com.adtech.MRAID.prototype.getNetwork = function() {
  return this.core.adConfig.mraid.network;
}

/**
 * Proxies mraid method <code>getOrientation</code>.
 *
 * @return Integer <code>-1</code> - Device orientation unknown.<br/>
 *         <code>0</code> - 0 degrees (portrait).<br/> <code>90</code> - 90
 *         degrees (tilted clockwise to landscape).<br/> <code>180</code> -
 *         180 degrees (portrait upside down).<br/> <code>270</code> - 270
 *         degrees (tilted counter-clockwise to landscape).
 * @since MRAID 2.0 draft
 */
com.adtech.MRAID.prototype.getOrientation = function() {
  return this.core.adConfig.mraid.orientation;
}

/**
 * Proxies mraid method <code>getMaxSize</code>.
 *
 * @return JSON <code>{width, height}</code>
 * @since MRAID 2.0
 */
com.adtech.MRAID.prototype.getMaxSize = function() {
  return this.core.adConfig.mraid.maxSize;
}

/**
 * Proxies mraid method <code>getSize</code>.
 *
 * @return JSON <code>{width, height}</code>
 * @since MRAID 2.0 draft
 */
com.adtech.MRAID.prototype.getSize = function() {
  return this.core.adConfig.mraid.size;
}

/**
 * Proxies mraid method <code>getTilt</code>.
 *
 * @return JSON <code>{width, height}</code>
 * @since MRAID 2.0 draft
 */
com.adtech.MRAID.prototype.getTilt = function() {
  return this.core.adConfig.mraid.tilt;
}

/**
 * Proxies mraid method <code>getPlacementType</code>.
 *
 * @return String "inline", "interstitial"
 * @since MRAID 1.0
 */
com.adtech.MRAID.prototype.getPlacementType = function() {
  return this.core.adConfig.mraid.placementType;
}

/**
 * Proxies mraid method <code>getVersion</code>.
 *
 * @return String The current MRAID specification of the SDK.
 * @since MRAID 1.0
 */
com.adtech.MRAID.prototype.getVersion = function() {
  return this.core.adConfig.mraid.version;
}

/**
 * Proxies mraid method <code>getVersion</code>.
 *
 * @return Boolean Whether the ad container is currently on or off the screen.
 * @since MRAID 1.0
 */
com.adtech.MRAID.prototype.isViewable = function() {
  return this.core.adConfig.mraid.viewable;
}

/**
 * Proxies mraid method <code>supports</code>.
 *
 * @param feature
 *          Name of feature.
 *
 * @return Boolean <code>true</code> - The feature is supported and getter and
 *         events are available.<br/> <code>false</code> - The feature is not
 *         supported on this device.
 * @since MRAID 2.0 draft
 */
com.adtech.MRAID.prototype.supports = function(feature) {
  if (this.core.adConfig.mraid.supports &&
      this.core.adConfig.mraid.supports.hasOwnProperty(feature)) {
    return this.core.adConfig.mraid.supports[feature];
  }
}

/**
 * @private
 *
 * Updates the relevant property and notifies ad content.
 */
com.adtech.MRAID.prototype.postMessageHandler = function(messageObj) {
  if (this.core.useJSONMessageSerialisation()) {
    var params = messageObj.payload.params;
    var property = messageObj.payload.property;
    var changeEvent = new com.adtech.RichMediaEvent(messageObj.payload.event);
  } else {
    var params = JSON.parse(unescape(messageObj.vars.params));
    var property = messageObj.vars.property;
    var changeEvent = new com.adtech.RichMediaEvent(messageObj.vars.event);
  }
  if (typeof params == 'object') {
    if (this.core.adConfig.mraid.hasOwnProperty(property)) {
      if (typeof this.core.adConfig.mraid[property] != 'object' ||
          this.core.adConfig.mraid[property] === null) {
        this.core.adConfig.mraid[property] = {};
      }
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          this.core.adConfig.mraid[property][key] = params[key];
          changeEvent.property(key, params[key]);
        }
      }
    }
  } else {
    if (this.core.adConfig.mraid.hasOwnProperty(property)) {
      this.core.adConfig.mraid[property] = params;
      changeEvent.property(property, params);
    }
  }
  this.dispatchEvent(changeEvent);
}

// Utility functions
com.adtech.MRAID.utils = {};

/**
 * @private
 *
 * Checks if a value exists in an array.
 *
 * @param needle the value to search the array for.
 * @param haystack the array to be searched.
 */
com.adtech.MRAID.utils.inArray = function(needle, haystack) {
  for (var i = 0; i < haystack.length; i++) {
    if (haystack[i] == needle) {
      return true;
    }
  }
  return false;
}

/**
 * @private
 *
 * Takes and input object and returns an object containing only the valid keys and
 * corresponding values as specified by the validKeys argument.
 *
 * @param obj the input object.
 * @param validKeys an array containing the valid key names that should be retained.
 */
com.adtech.MRAID.utils.createValidObject = function(obj, validKeys) {
  var validObject = {};
  for (var key in obj) {
    if (com.adtech.MRAID.utils.inArray(key, validKeys)) {
      validObject[key] = obj[key];
    }
  }
  return validObject;
}

/**
 * @private
 *
 * Merges the keys from two objects, overwriting the values in obj1 with the values
 * found in obj2 with the same keys.
 */
com.adtech.MRAID.utils.mergeObjects = function(obj1, obj2) {
  for (var key in obj2) {
    obj1[key] = obj2[key];
  }
}

// Event handlers

/** @private */
com.adtech.MRAID.prototype.coreReadyEventHandler = function() {
  if (this.core.env == com.adtech.HtmlContent.ENVIRONMENT_MRAID ||
      this.core.env == com.adtech.HtmlContent.ENVIRONMENT_ORMMA) {
    this.currentContainerState = this.core.adConfig.mraid.state;
    this.addEventListener(com.adtech.RichMediaEvent.MRAID_STATE_CHANGE, this.stateChangeHandler, this);
    this.dispatchEvent(com.adtech.RichMediaEvent.READY);
  }
}

/** @private */
com.adtech.MRAID.prototype.stateChangeHandler = function(event) {
  var newState = event.state;
  if (this.currentContainerState == newState) {
    return;
  }
  this.currentContainerState = newState;
  if (this.stateChangeCallbacks.hasOwnProperty(newState)) {
    this.stateChangeCallbacks[newState]();
  }
}
// Copyright 2014 AOL Platforms.

/*
 * Video reporting functionality for Core class.
 * @author Pictela Support <support@pictela.com>
 */

/**
 * Registers a function to be called once the ADTECH object has been initialised.
 *
 * @param videoObject a reference to the video object in the DOM.
 * @param reportingId optional video reporting identifier. Required if you wish to track
 *     multiple videos separately. The reporting identifier will be used as a prefix to the
 *     logged video events.
 */
com.adtech.Core.prototype.registerVideoPlayer = function(videoObject, reportingId) {
  if (videoObject) {
    ADTECH.require(['VideoTracking/1.1.8/VideoTracking'], function() {
      ADTECH.modules.VideoTracking.registerVideoPlayer(videoObject, reportingId);
    });
  }
}
// Copyright 2010 AOL Platforms.

/**
 * The ADTECH core library is required to be inserted into the head
 *     of every HTML document within an HTML advert. Once included, a global
 *     object name <code>ADTECH</code> will be available, exposing the following
 *     documented API.
 *
 * @private
 * @author Pictela Support <support@pictela.com>
 */
var ADTECH = new com.adtech.Core();
(function(){/*
 MIT License (c) copyright 2010-2013 B Cavalier & J Hann */
(function(p){function I(){}function x(a,b){return 0==V.call(a).indexOf("[object "+b)}function M(a){return a&&"/"==a.charAt(a.length-1)?a.substr(0,a.length-1):a}function L(a,b){var f,d,y,c;f=1;d=a;"."==d.charAt(0)&&(y=!0,d=d.replace(W,function(a,b,d,y){d&&f++;return y||""}));if(y){y=b.split("/");c=y.length-f;if(0>c)return a;y.splice(c,f);return y.concat(d||[]).join("/")}return d}function F(a){var b=a.indexOf("!");return{f:a.substr(b+1),d:0<=b&&a.substr(0,b)}}function E(){}function u(a,b){E.prototype=
a||S;var f=new E;E.prototype=S;for(var d in b)f[d]=b[d];return f}function J(){function a(a,b,f){d.push([a,b,f])}function b(a,b){for(var f,y=0;f=d[y++];)(f=f[a])&&f(b)}var f,d,y;f=this;d=[];y=function(f,c){a=f?function(a){a&&a(c)}:function(a,b){b&&b(c)};y=I;b(f?0:1,c);b=I;d=r};this.then=function(b,d,y){a(b,d,y);return f};this.resolve=function(a){f.w=a;y(!0,a)};this.reject=function(a){f.qa=a;y(!1,a)};this.t=function(a){b(2,a)}}function H(a){return a instanceof J||a instanceof h}function w(a,b,f,d){H(a)?
a.then(b,f,d):b(a)}function K(a,b,f){var d;return function(){0<=--a&&b&&(d=b.apply(r,arguments));0==a&&f&&f(d);return d}}function e(){var a,b;z="";a=[].slice.call(arguments);x(a[0],"Object")&&(b=a.shift(),b=N(b));return new h(a[0],a[1],a[2],b)}function N(a,b,f){var d;z="";if(a&&(m.O(a),n=m.b(a),"preloads"in a&&(d=new h(a.preloads,r,f,O,!0),m.j(function(){O=d})),a=a.main))return new h(a,b,f)}function h(a,b,f,d,y){var c;c=m.i(n,r,[].concat(a),y);this.then=this.then=a=function(a,b){w(c,function(b){a&&
a.apply(r,b)},function(a){if(b)b(a);else throw a;});return this};this.next=function(a,b,d){return new h(a,b,d,c)};this.config=N;(b||f)&&a(b,f);m.j(function(){w(y||O,function(){w(d,function(){m.o(c)},f)})})}function P(a){var b,f;b=a.id;b==r&&(Q!==r?Q={F:"Multiple anonymous defines encountered"}:(b=m.ca())||(Q=a));if(b!=r){f=v[b];b in v||(f=m.h(b,n),f=m.B(f.b,b),v[b]=f);if(!H(f))throw Error("duplicate define: "+b);f.ha=!1;m.C(f,a)}}function q(){var a=m.$(arguments);P(a)}var z,n,A,G,l=p.document,D=l&&
(l.head||l.getElementsByTagName("head")[0]),c=D&&D.getElementsByTagName("base")[0]||null,s={},t={},C={},X="addEventListener"in p?{}:{loaded:1,complete:1},S={},V=S.toString,r,v={},R={},O=!1,Q,U=/^\/|^[^:]+:\/\/|^[A-Za-z]:[\\/]/,W=/(\.)(\.?)(?:$|\/([^\.\/]+.*)?)/g,Y=/\/\*[\s\S]*?\*\/|\/\/.*?[\n\r]/g,Z=/require\s*\(\s*(["'])(.*?[^\\])\1\s*\)|[^\\]?(["'])/g,$=/\s*,\s*/,T,m;m={k:function(a,b,f){var d;a=L(a,b);if("."==a.charAt(0))return a;d=F(a);a=(b=d.d)||d.f;a in f.c&&(a=f.c[a].J||a);b&&(0>b.indexOf("/")&&
!(b in f.c)&&(a=M(f.M)+"/"+b),a=a+"!"+d.f);return a},i:function(a,b,f,d){function c(b,d){var f,B;f=m.k(b,g.id,a);if(!d)return f;B=F(f);if(!B.d)return f;f=v[B.d];B.f="normalize"in f?f.normalize(B.f,c,g.b)||"":c(B.f);return B.d+"!"+B.f}function k(b,f,k){var B;B=f&&function(a){f.apply(r,a)};if(x(b,"String")){if(B)throw Error("require(id, callback) not allowed");k=c(b,!0);b=v[k];if(!(k in v))throw Error("Module not resolved: "+k);return(k=H(b)&&b.a)||b}w(m.o(m.i(a,g.id,b,d)),B,k)}var g;g=new J;g.id=b||
"";g.da=d;g.D=f;g.b=a;g.u=k;k.toUrl=function(b){return m.h(c(b,!0),a).url};g.k=c;return g},B:function(a,b,f){var d,c,k;d=m.i(a,b,r,f);c=d.resolve;k=K(1,function(a){d.n=a;try{return m.U(d)}catch(b){d.reject(b)}});d.resolve=function(a){w(f||O,function(){c(v[d.id]=R[d.url]=k(a))})};d.G=function(a){w(f||O,function(){d.a&&(k(a),d.t(t))})};return d},S:function(a,b,f,d){return m.i(a,f,r,d)},ba:function(a){return a.u},H:function(a){return a.a||(a.a={})},aa:function(a){var b=a.q;b||(b=a.q={id:a.id,uri:m.I(a),
exports:m.H(a),config:function(){return a.b}},b.a=b.exports);return b},I:function(a){return a.url||(a.url=m.A(a.u.toUrl(a.id),a.b))},O:function(a){var b,f,d,c,k;b="ADTECHCurl";f="ADTECHDefine";d=c=p;if(a&&(k=a.overwriteApi||a.oa,b=a.apiName||a.ja||b,d=a.apiContext||a.ia||d,f=a.defineName||a.la||f,c=a.defineContext||a.ka||c,A&&x(A,"Function")&&(p.curl=A),A=null,G&&x(G,"Function")&&(p.ADTECHDefine=G),G=null,!k)){if(d[b]&&d[b]!=e)throw Error(b+" already exists");if(c[f]&&c[f]!=q)throw Error(f+" already exists");
}d[b]=e;c[f]=q},b:function(a){function b(a,b){var f,d,g,e,s;for(s in a){g=a[s];x(g,"String")&&(g={path:a[s]});g.name=g.name||s;e=c;d=F(M(g.name));f=d.f;if(d=d.d)e=k[d],e||(e=k[d]=u(c),e.c=u(c.c),e.e=[]),delete a[s];d=g;var h=b,t=void 0;d.path=M(d.path||d.location||"");h&&(t=d.main||"./main","."==t.charAt(0)||(t="./"+t),d.J=L(t,d.name+"/"));d.b=d.config;d.b&&(d.b=u(c,d.b));d.P=f.split("/").length;f?(e.c[f]=d,e.e.push(f)):e.l=m.N(g.path,c)}}function f(a){var b=a.c;a.L=new RegExp("^("+a.e.sort(function(a,
d){return b[d].P-b[a].P}).join("|").replace(/\/|\./g,"\\$&")+")(?=\\/|$)");delete a.e}var d,c,k,g;"baseUrl"in a&&(a.l=a.baseUrl);"main"in a&&(a.J=a.main);"preloads"in a&&(a.pa=a.preloads);"pluginPath"in a&&(a.M=a.pluginPath);if("dontAddFileExt"in a||a.g)a.g=new RegExp(a.dontAddFileExt||a.g);d=n;c=u(d,a);c.c=u(d.c);k=a.plugins||{};c.plugins=u(d.plugins);c.s=u(d.s,a.s);c.r=u(d.r,a.r);c.e=[];b(a.packages,!0);b(a.paths,!1);for(g in k)a=m.k(g+"!","",c),c.plugins[a.substr(0,a.length-1)]=k[g];k=c.plugins;
for(g in k)if(k[g]=u(c,k[g]),a=k[g].e)k[g].e=a.concat(c.e),f(k[g]);for(g in d.c)c.c.hasOwnProperty(g)||c.e.push(g);f(c);return c},h:function(a,b){var c,d,e,k;c=b.c;e=U.test(a)?a:a.replace(b.L,function(a){d=c[a]||{};k=d.b;return d.path||""});return{b:k||n,url:m.N(e,b)}},N:function(a,b){var c=b.l;return c&&!U.test(a)?M(c)+"/"+a:a},A:function(a,b){return a+((b||n).g.test(a)?"":".js")},p:function(a,b,f){var d=l.createElement("script");d.onload=d.onreadystatechange=function(c){c=c||p.event;if("load"==
c.type||X[d.readyState])delete C[a.id],d.onload=d.onreadystatechange=d.onerror="",b()};d.onerror=function(){f(Error("Syntax or http error: "+a.url))};d.type=a.K||"text/javascript";d.charset="utf-8";d.async=!a.ea;d.src=a.url;C[a.id]=d;D.insertBefore(d,c);return d},V:function(a){var b=[],c;("string"==typeof a?a:a.toSource?a.toSource():a.toString()).replace(Y,"").replace(Z,function(a,e,k,g){g?c=c==g?r:c:c||b.push(k);return""});return b},$:function(a){var b,c,d,e,k,g;k=a.length;d=a[k-1];e=x(d,"Function")?
d.length:-1;2==k?x(a[0],"Array")?c=a[0]:b=a[0]:3==k&&(b=a[0],c=a[1]);!c&&0<e&&(g=!0,c=["require","exports","module"].slice(0,e).concat(m.V(d)));return{id:b,n:c||[],v:0<=e?d:function(){return d},m:g}},U:function(a){var b;b=a.v.apply(a.m?a.a:r,a.n);b===r&&a.a&&(b=a.q?a.a=a.q.exports:a.a);return b},C:function(a,b){a.v=b.v;a.m=b.m;a.D=b.n;m.o(a)},o:function(a){function b(a,b,c){g[b]=a;c&&n(a,b)}function c(b,d){if(b.match(/^\.\//)){var f=document.location.href.split("/");f.splice(f.length-1,1);b=f.join("/")+
"/"+b.replace(/^\.\//,"");b.match(/\.js$/i)&&(b="js!"+b)}var e,k,g;e=K(1,function(a){k(a);B(a,d)});k=K(1,function(a){n(a,d)});g=m.X(b,a);(f=H(g)&&g.a)&&k(f);w(g,e,a.reject,a.a&&function(a){g.a&&(a==s?k(g.a):a==t&&e(g.a))})}function d(){a.resolve(g)}var e,k,g,h,l,n,B;g=[];k=a.D;h=k.length;0==k.length&&d();n=K(h,b,function(){a.G&&a.G(g)});B=K(h,b,d);for(e=0;e<h;e++)l=k[e],l in T?(B(T[l](a),e,!0),a.a&&a.t(s)):l?c(l,e):B(r,e,!0);return a},Y:function(a){m.I(a);m.p(a,function(){var b=Q;
Q=r;!1!==a.ha&&(!b||b.F?a.reject(Error(b&&b.F||"define() missing or duplicated: "+a.url)):m.C(a,b))},a.reject);return a},X:function(a,b){var c,d,e,k,g,s,h,t,l,r,q,C;c=b.k;d=b.da;e=b.b||n;g=c(a);g in v?s=g:(k=F(g),t=k.f,s=k.d||t,l=m.h(s,e));if(!(g in v))if(C=m.h(t,e).b,k.d)h=s;else if(h=C.moduleLoader||C.na||C.loader||C.ma)t=s,s=h,l=m.h(h,e);s in v?r=v[s]:l.url in R?r=v[s]=R[l.url]:(r=m.B(C,s,d),r.url=m.A(l.url,l.b),v[s]=R[l.url]=r,m.Y(r));s==h&&(k.d&&e.plugins[k.d]&&(C=e.plugins[k.d]),q=new J,w(r,
function(a){var b,e,g;g=a.dynamic;t="normalize"in a?a.normalize(t,c,r.b)||"":c(t);e=h+"!"+t;b=v[e];if(!(e in v)){b=m.S(C,e,t,d);g||(v[e]=b);var s=function(a){g||(v[e]=a);b.resolve(a)};s.resolve=s;s.reject=s.error=b.reject;a.load(t,b.u,s,C)}q!=b&&w(b,q.resolve,q.reject,q.t)},q.reject));return q||r},ca:function(){var a;if(!x(p.opera,"Opera"))for(var b in C)if("interactive"==C[b].readyState){a=b;break}return a},Z:function(a){var b=0,c,d;for(c=l&&(l.scripts||l.getElementsByTagName("script"));c&&(d=c[b++]);)if(a(d))return d},
W:function(){var a,b="";(a=m.Z(function(a){(a=a.getAttribute("data-curl-run"))&&(b=a);return a}))&&a.setAttribute("data-curl-run","");return b},Q:function(){function a(){m.p({url:d.shift()},b,b)}function b(){z&&(d.length?(m.j(c),a()):c("run.js script did not run."))}function c(a){throw Error(a||"Primary run.js failed. Trying fallback.");}var d=z.split($);d.length&&a()},j:function(a){setTimeout(a,0)}};T={require:m.ba,exports:m.H,module:m.aa};e.version="0.8.10";e.config=N;q.amd={plugins:!0,jQuery:!0,
curl:"0.8.10"};n={l:"",M:"curl/plugin",g:/\?|\.js\b/,s:{},r:{},plugins:{},c:{},L:/$^/};A=p.curl;G=p.ADTECHDefine;A&&x(A,"Object")?(p.curl=r,N(A)):m.O();(z=m.W())&&m.j(m.Q);v.curl=e;v["curl/_privileged"]={core:m,cache:v,config:function(){return n},_define:P,_curl:e,Promise:J}})(this.window||"undefined"!=typeof global&&global||this);
(function(p){function I(){var c;c=q.createElement("link");c.rel="stylesheet";c.type="text/css";return c}function x(c,e){c.onload=function(){D.load=D.load||!0;e()}}function M(c,e){c.onerror=function(){D.error=D.error||!0;e()}}function L(c,e,h){G.push({url:c,R:e,T:function(){h(Error("HTTP or network error."))}});(c=E())&&F(c)}function F(c){var e,t;e=G.shift();t=c.styleSheet;e?(c.onload=function(){e.R(e.fa);F(c)},c.onerror=function(){e.T();F(c)},e.fa=t.imports[t.addImport(e.url)]):(c.onload=c.onerror=
h,A.push(c))}function E(){var c;c=A.shift();!c&&12>n.length&&(c=q.createElement("style"),n.push(c),z.appendChild(c));return c}function u(c){var e,h,l;if(!c.href||q.readyState&&"complete"!=q.readyState)return!1;e=!1;try{if(h=c.sheet)l=h.cssRules,e=null===l,!e&&l&&(h.insertRule("-curl-css-test {}",0),h.deleteRule(0),e=!0)}catch(n){e="[object Opera]"!=Object.prototype.toString.call(window.opera)&&/security|denied/i.test(n.message)}return e}function J(c,e,l){D.load||(u(c)?l(c.sheet):c.onload==h||!c.onload||
P(function(){J(c,e,l)},e))}function H(c,l,t){function n(){c.onload!=h&&c.onload&&(c.onload=c.onerror=h,e(function(){t(c.sheet)}))}x(c,n);J(c,l,n)}function w(c,e){M(c,function(){c.onload!=h&&c.onload&&(c.onload=c.onerror=h,e(Error("HTTP or network error.")))})}function K(c,e,h,l){var n;n=I();H(n,l,e);w(n,h);n.href=c;z.appendChild(n)}function e(c){function e(){q.readyState&&"complete"!=q.readyState?P(e,10):c()}e()}function N(c){return c.lastIndexOf(".")<=c.lastIndexOf("/")?c+".css":c}function h(){}
var P=p.setTimeout,q=p.document,z;p=q&&q.createStyleSheet&&!(10<=q.documentMode);var n=[],A=[],G=[],l,D={};q&&(z=q.head||q.getElementsByTagName("head")[0],l=p?L:K);ADTECHDefine("curl/plugin/css",{normalize:function(c,e){var h,l;if(!c)return c;h=c.split(",");l=[];for(var n=0,q=h.length;n<q;n++)l.push(e(h[n]));return l.join(",")},load:function(c,e,h,n){function q(c){1<r.length&&D.push(c);0==--w&&h(1==r.length?c:D)}function p(c){(h.reject||function(c){throw c;})(c)}var D,r,v,w,A;D=[];r=(c||"").split(",");
v=n.cssWatchPeriod||50;n=n.cssNoWait;w=r.length;for(A=0;A<r.length;A++){c=r[A];var u;c=N(e.toUrl(c));n?(u=I(),u.href=c,z.appendChild(u),q(u.sheet||u.styleSheet)):l(c,q,p,v)}},cramPlugin:"../cram/css"})})(this);
(function(p,I,x){ADTECHDefine("curl/plugin/js",["curl/_privileged"],function(p){function L(e,u,h){function w(){z||(q<new Date?h():setTimeout(w,10))}var q,z,n;q=(new Date).valueOf()+(e.ga||3E5);h&&e.a&&setTimeout(w,10);n=p.core.p(e,function(){z=!0;e.a&&(e.w=x(e.a));!e.a||e.w?u(n):h()},function(e){z=!0;h(e)})}function F(e,p){L(e,function(){var h=u.shift();w=0<u.length;h&&F.apply(null,h);p.resolve(e.w||!0)},function(e){p.reject(e)})}var E={},u=[],J=I&&1==I.createElement("script").async,H,w,K=/\?|\.js\b/;
H=p.Promise;return{dynamic:!0,normalize:function(e,p){var h=e.indexOf("!");return 0<=h?p(e.substr(0,h))+e.substr(h):p(e)},load:function(e,p,h,x){function q(e){(h.error||function(c){throw c;})(e)}var z,n,A,G,l;z=0<e.indexOf("!order");n=e.indexOf("!exports=");A=0<n?e.substr(n+9):x.a;G="prefetch"in x?x.prefetch:!0;e=z||0<n?e.substr(0,e.indexOf("!")):e;n=(n=x.dontAddFileExt||x.g)?new RegExp(n):K;l=p.toUrl(e);n.test(l)||(l=l.lastIndexOf(".")<=l.lastIndexOf("/")?l+".js":l);l in E?E[l]instanceof H?E[l].then(h,
q):h(E[l]):(e={name:e,url:l,ea:z,a:A,ga:x.timeout},E[l]=p=new H,p.then(function(e){E[l]=e;h(e)},q),z&&!J&&w?(u.push([e,p]),G&&(e.K="text/cache",L(e,function(e){e&&e.parentNode.removeChild(e)},function(){}),e.K="")):(w=w||z,F(e,p)))},cramPlugin:"../cram/js"}})})(this,this.document,function(p){try{return eval(p)}catch(I){}});
}).call(this);

(function() {
   /* The base URL is set to inherit the protocol of the page (//ads.pictela.net), so
    * we need to account for when the extension is requested from the desktop.
    */
  var extensionsBaseUrl = '//secure-ads.pictela.net/rm/lib/richmedia/extensions/';
  if (!document.location.protocol.match(/^http/i) && !extensionsBaseUrl.match(/^http/i)) {
    extensionsBaseUrl = 'http:' + extensionsBaseUrl;
  }
  ADTECHCurl({
    baseUrl: extensionsBaseUrl,
    apiName: 'require',
    apiContext: ADTECH
  });
  // Maintain support for curl API
  window.curl = ADTECHCurl;
})();
