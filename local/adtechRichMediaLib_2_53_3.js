// Copyright 2010 AOL Platforms.

/*!
 * ADTECH Rich Media JS Library 2_53_3 Copyright 2010 AOL Platforms.
 */
/**
 * Code inserted into the head of the compiled richmediaLib. General namespace
 * setup and any other general initialization should be performed here.
 *
 * @author Pictela Support <support@pictela.com>
 */
var com = com || {};
com.adtech = com.adtech || {};
/**
 * Polyfill for the bind method on Function objects.
 * Code lifted from public MDN page:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
 */
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
/**
 * Polyfill for the indexOf method on Array objects.
 * Code lifted from public MDN page:
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
 */
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {

    var k;

    // 1. Let O be the result of calling ToObject passing
    //    the this value as the argument.
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of O with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}
/**
 * Polyfill for the forEach method on Array objects. Code lifted from public MDN
 * Code lifted from public MDN page:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
 */
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback, thisArg) {

    var T, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as
    // the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O
    // with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      // This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal
      // method of O with argument Pk.
      // This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O
        // with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as the this
        // value and
        // argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}/**
 * Polyfill for the keys method on Objects. Code lifted from public MDN Code
 * lifted from public MDN page:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
 */
if (!Object.keys) {
  Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasDontEnumBug = !({
      toString : null
    }).propertyIsEnumerable('toString');
    var dontEnums = ['toString', 'toLocaleString', 'valueOf',
        'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
    var dontEnumsLength = dontEnums.length;

    return function(obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
};/*
 Copyright (c) 2010, Linden Research, Inc.
 Copyright (c) 2014, Joshua Bell

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 $/LicenseInfo$
 */

// Original can be found at:
//   https://bitbucket.org/lindenlab/llsd
// Modifications by Joshua Bell inexorabletash@gmail.com
//   https://github.com/inexorabletash/polyfill

// ES3/ES5 implementation of the Krhonos Typed Array Specification
//   Ref: http://www.khronos.org/registry/typedarray/specs/latest/
//   Date: 2011-02-01
//
// Variations:
//  * Allows typed_array.get/set() as alias for subscripts (typed_array[])
//  * Gradually migrating structure from Khronos spec to ES6 spec
(function(global) {
  'use strict';
  var undefined = (void 0); // Paranoia

  // Beyond this value, index getters/setters (i.e. array[0], array[1]) are so slow to
  // create, and consume so much memory, that the browser appears frozen.
  var MAX_ARRAY_LENGTH = 1e5;

  // Approximations of internal ECMAScript conversion functions
  function Type(v) {
    switch(typeof v) {
    case 'undefined': return 'undefined';
    case 'boolean': return 'boolean';
    case 'number': return 'number';
    case 'string': return 'string';
    default: return v === null ? 'null' : 'object';
    }
  }

  // Class returns internal [[Class]] property, used to avoid cross-frame instanceof issues:
  function Class(v) { return Object.prototype.toString.call(v).replace(/^\[object *|\]$/g, ''); }
  function IsCallable(o) { return typeof o === 'function'; }
  function ToObject(v) {
    if (v === null || v === undefined) throw TypeError();
    return Object(v);
  }
  function ToInt32(v) { return v >> 0; }
  function ToUint32(v) { return v >>> 0; }

  // Snapshot intrinsics
  var LN2 = Math.LN2,
      abs = Math.abs,
      floor = Math.floor,
      log = Math.log,
      max = Math.max,
      min = Math.min,
      pow = Math.pow,
      round = Math.round;

  // emulate ES5 getter/setter API using legacy APIs
  // http://blogs.msdn.com/b/ie/archive/2010/09/07/transitioning-existing-code-to-the-es5-getter-setter-apis.aspx
  // (second clause tests for Object.defineProperty() in IE<9 that only supports extending DOM prototypes, but
  // note that IE<9 does not support __defineGetter__ or __defineSetter__ so it just renders the method harmless)

  (function() {
    var orig = Object.defineProperty;
    var dom_only = !(function(){try{return Object.defineProperty({},'x',{});}catch(_){return false;}}());

    if (!orig || dom_only) {
      Object.defineProperty = function (o, prop, desc) {
        // In IE8 try built-in implementation for defining properties on DOM prototypes.
        if (orig)
          try { return orig(o, prop, desc); } catch (_) {}
        if (o !== Object(o))
          throw TypeError('Object.defineProperty called on non-object');
        if (Object.prototype.__defineGetter__ && ('get' in desc))
          Object.prototype.__defineGetter__.call(o, prop, desc.get);
        if (Object.prototype.__defineSetter__ && ('set' in desc))
          Object.prototype.__defineSetter__.call(o, prop, desc.set);
        if ('value' in desc)
          o[prop] = desc.value;
        return o;
      };
    }
  }());

  // ES5: Make obj[index] an alias for obj._getter(index)/obj._setter(index, value)
  // for index in 0 ... obj.length
  function makeArrayAccessors(obj) {
    if (obj.length > MAX_ARRAY_LENGTH) throw RangeError('Array too large for polyfill');

    function makeArrayAccessor(index) {
      Object.defineProperty(obj, index, {
        'get': function() { return obj._getter(index); },
        'set': function(v) { obj._setter(index, v); },
        enumerable: true,
        configurable: false
      });
    }

    var i;
    for (i = 0; i < obj.length; i += 1) {
      makeArrayAccessor(i);
    }
  }

  // Internal conversion functions:
  //    pack<Type>()   - take a number (interpreted as Type), output a byte array
  //    unpack<Type>() - take a byte array, output a Type-like number

  function as_signed(value, bits) { var s = 32 - bits; return (value << s) >> s; }
  function as_unsigned(value, bits) { var s = 32 - bits; return (value << s) >>> s; }

  function packI8(n) { return [n & 0xff]; }
  function unpackI8(bytes) { return as_signed(bytes[0], 8); }

  function packU8(n) { return [n & 0xff]; }
  function unpackU8(bytes) { return as_unsigned(bytes[0], 8); }

  function packU8Clamped(n) { n = round(Number(n)); return [n < 0 ? 0 : n > 0xff ? 0xff : n & 0xff]; }

  function packI16(n) { return [(n >> 8) & 0xff, n & 0xff]; }
  function unpackI16(bytes) { return as_signed(bytes[0] << 8 | bytes[1], 16); }

  function packU16(n) { return [(n >> 8) & 0xff, n & 0xff]; }
  function unpackU16(bytes) { return as_unsigned(bytes[0] << 8 | bytes[1], 16); }

  function packI32(n) { return [(n >> 24) & 0xff, (n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff]; }
  function unpackI32(bytes) { return as_signed(bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], 32); }

  function packU32(n) { return [(n >> 24) & 0xff, (n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff]; }
  function unpackU32(bytes) { return as_unsigned(bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], 32); }

  function packIEEE754(v, ebits, fbits) {

    var bias = (1 << (ebits - 1)) - 1,
        s, e, f, ln,
        i, bits, str, bytes;

    function roundToEven(n) {
      var w = floor(n), f = n - w;
      if (f < 0.5)
        return w;
      if (f > 0.5)
        return w + 1;
      return w % 2 ? w + 1 : w;
    }

    // Compute sign, exponent, fraction
    if (v !== v) {
      // NaN
      // http://dev.w3.org/2006/webapi/WebIDL/#es-type-mapping
      e = (1 << ebits) - 1; f = pow(2, fbits - 1); s = 0;
    } else if (v === Infinity || v === -Infinity) {
      e = (1 << ebits) - 1; f = 0; s = (v < 0) ? 1 : 0;
    } else if (v === 0) {
      e = 0; f = 0; s = (1 / v === -Infinity) ? 1 : 0;
    } else {
      s = v < 0;
      v = abs(v);

      if (v >= pow(2, 1 - bias)) {
        e = min(floor(log(v) / LN2), 1023);
        f = roundToEven(v / pow(2, e) * pow(2, fbits));
        if (f / pow(2, fbits) >= 2) {
          e = e + 1;
          f = 1;
        }
        if (e > bias) {
          // Overflow
          e = (1 << ebits) - 1;
          f = 0;
        } else {
          // Normalized
          e = e + bias;
          f = f - pow(2, fbits);
        }
      } else {
        // Denormalized
        e = 0;
        f = roundToEven(v / pow(2, 1 - bias - fbits));
      }
    }

    // Pack sign, exponent, fraction
    bits = [];
    for (i = fbits; i; i -= 1) { bits.push(f % 2 ? 1 : 0); f = floor(f / 2); }
    for (i = ebits; i; i -= 1) { bits.push(e % 2 ? 1 : 0); e = floor(e / 2); }
    bits.push(s ? 1 : 0);
    bits.reverse();
    str = bits.join('');

    // Bits to bytes
    bytes = [];
    while (str.length) {
      bytes.push(parseInt(str.substring(0, 8), 2));
      str = str.substring(8);
    }
    return bytes;
  }

  function unpackIEEE754(bytes, ebits, fbits) {
    // Bytes to bits
    var bits = [], i, j, b, str,
        bias, s, e, f;

    for (i = bytes.length; i; i -= 1) {
      b = bytes[i - 1];
      for (j = 8; j; j -= 1) {
        bits.push(b % 2 ? 1 : 0); b = b >> 1;
      }
    }
    bits.reverse();
    str = bits.join('');

    // Unpack sign, exponent, fraction
    bias = (1 << (ebits - 1)) - 1;
    s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
    e = parseInt(str.substring(1, 1 + ebits), 2);
    f = parseInt(str.substring(1 + ebits), 2);

    // Produce number
    if (e === (1 << ebits) - 1) {
      return f !== 0 ? NaN : s * Infinity;
    } else if (e > 0) {
      // Normalized
      return s * pow(2, e - bias) * (1 + f / pow(2, fbits));
    } else if (f !== 0) {
      // Denormalized
      return s * pow(2, -(bias - 1)) * (f / pow(2, fbits));
    } else {
      return s < 0 ? -0 : 0;
    }
  }

  function unpackF64(b) { return unpackIEEE754(b, 11, 52); }
  function packF64(v) { return packIEEE754(v, 11, 52); }
  function unpackF32(b) { return unpackIEEE754(b, 8, 23); }
  function packF32(v) { return packIEEE754(v, 8, 23); }

  //
  // 3 The ArrayBuffer Type
  //

  (function() {

    function ArrayBuffer(length) {
      length = ToInt32(length);
      if (length < 0) throw RangeError('ArrayBuffer size is not a small enough positive integer.');
      Object.defineProperty(this, 'byteLength', {value: length});
      Object.defineProperty(this, '_bytes', {value: Array(length)});

      for (var i = 0; i < length; i += 1)
        this._bytes[i] = 0;
    }

    global.ArrayBuffer = global.ArrayBuffer || ArrayBuffer;

    //
    // 5 The Typed Array View Types
    //

    function $TypedArray$() {

      // %TypedArray% ( length )
      if (!arguments.length || typeof arguments[0] !== 'object') {
        return (function(length) {
          length = ToInt32(length);
          if (length < 0) throw RangeError('length is not a small enough positive integer.');
          Object.defineProperty(this, 'length', {value: length});
          Object.defineProperty(this, 'byteLength', {value: length * this.BYTES_PER_ELEMENT});
          Object.defineProperty(this, 'buffer', {value: new ArrayBuffer(this.byteLength)});
          Object.defineProperty(this, 'byteOffset', {value: 0});

         }).apply(this, arguments);
      }

      // %TypedArray% ( typedArray )
      if (arguments.length >= 1 &&
          Type(arguments[0]) === 'object' &&
          arguments[0] instanceof $TypedArray$) {
        return (function(typedArray){
          if (this.constructor !== typedArray.constructor) throw TypeError();

          var byteLength = typedArray.length * this.BYTES_PER_ELEMENT;
          Object.defineProperty(this, 'buffer', {value: new ArrayBuffer(byteLength)});
          Object.defineProperty(this, 'byteLength', {value: byteLength});
          Object.defineProperty(this, 'byteOffset', {value: 0});
          Object.defineProperty(this, 'length', {value: typedArray.length});

          for (var i = 0; i < this.length; i += 1)
            this._setter(i, typedArray._getter(i));

        }).apply(this, arguments);
      }

      // %TypedArray% ( array )
      if (arguments.length >= 1 &&
          Type(arguments[0]) === 'object' &&
          !(arguments[0] instanceof $TypedArray$) &&
          !(arguments[0] instanceof ArrayBuffer || Class(arguments[0]) === 'ArrayBuffer')) {
        return (function(array) {

          var byteLength = array.length * this.BYTES_PER_ELEMENT;
          Object.defineProperty(this, 'buffer', {value: new ArrayBuffer(byteLength)});
          Object.defineProperty(this, 'byteLength', {value: byteLength});
          Object.defineProperty(this, 'byteOffset', {value: 0});
          Object.defineProperty(this, 'length', {value: array.length});

          for (var i = 0; i < this.length; i += 1) {
            var s = array[i];
            this._setter(i, Number(s));
          }
        }).apply(this, arguments);
      }

      // %TypedArray% ( buffer, byteOffset=0, length=undefined )
      if (arguments.length >= 1 &&
          Type(arguments[0]) === 'object' &&
          (arguments[0] instanceof ArrayBuffer || Class(arguments[0]) === 'ArrayBuffer')) {
        return (function(buffer, byteOffset, length) {

          byteOffset = ToUint32(byteOffset);
          if (byteOffset > buffer.byteLength)
            throw RangeError('byteOffset out of range');

          // The given byteOffset must be a multiple of the element
          // size of the specific type, otherwise an exception is raised.
          if (byteOffset % this.BYTES_PER_ELEMENT)
            throw RangeError('buffer length minus the byteOffset is not a multiple of the element size.');

          if (length === undefined) {
            var byteLength = buffer.byteLength - byteOffset;
            if (byteLength % this.BYTES_PER_ELEMENT)
              throw RangeError('length of buffer minus byteOffset not a multiple of the element size');
            length = byteLength / this.BYTES_PER_ELEMENT;

          } else {
            length = ToUint32(length);
            byteLength = length * this.BYTES_PER_ELEMENT;
          }

          if ((byteOffset + byteLength) > buffer.byteLength)
            throw RangeError('byteOffset and length reference an area beyond the end of the buffer');

          Object.defineProperty(this, 'buffer', {value: buffer});
          Object.defineProperty(this, 'byteLength', {value: byteLength});
          Object.defineProperty(this, 'byteOffset', {value: byteOffset});
          Object.defineProperty(this, 'length', {value: length});

        }).apply(this, arguments);
      }

      // %TypedArray% ( all other argument combinations )
      throw TypeError();
    }

    // Properties of the %TypedArray Instrinsic Object

    // %TypedArray%.from ( source , mapfn=undefined, thisArg=undefined )
    Object.defineProperty($TypedArray$, 'from', {value: function(iterable) {
      return new this(iterable);
    }});

    // %TypedArray%.of ( ...items )
    Object.defineProperty($TypedArray$, 'of', {value: function(/*...items*/) {
      return new this(arguments);
    }});

    // %TypedArray%.prototype
    var $TypedArrayPrototype$ = {};
    $TypedArray$.prototype = $TypedArrayPrototype$;

    // WebIDL: getter type (unsigned long index);
    Object.defineProperty($TypedArray$.prototype, '_getter', {value: function(index) {
      if (arguments.length < 1) throw SyntaxError('Not enough arguments');

      index = ToUint32(index);
      if (index >= this.length)
        return undefined;

      var bytes = [], i, o;
      for (i = 0, o = this.byteOffset + index * this.BYTES_PER_ELEMENT;
           i < this.BYTES_PER_ELEMENT;
           i += 1, o += 1) {
        bytes.push(this.buffer._bytes[o]);
      }
      return this._unpack(bytes);
    }});

    // NONSTANDARD: convenience alias for getter: type get(unsigned long index);
    Object.defineProperty($TypedArray$.prototype, 'get', {value: $TypedArray$.prototype._getter});

    // WebIDL: setter void (unsigned long index, type value);
    Object.defineProperty($TypedArray$.prototype, '_setter', {value: function(index, value) {
      if (arguments.length < 2) throw SyntaxError('Not enough arguments');

      index = ToUint32(index);
      if (index >= this.length)
        return;

      var bytes = this._pack(value), i, o;
      for (i = 0, o = this.byteOffset + index * this.BYTES_PER_ELEMENT;
           i < this.BYTES_PER_ELEMENT;
           i += 1, o += 1) {
        this.buffer._bytes[o] = bytes[i];
      }
    }});

    // get %TypedArray%.prototype.buffer
    // get %TypedArray%.prototype.byteLength
    // get %TypedArray%.prototype.byteOffset
    // -- applied directly to the object in the constructor

    // %TypedArray%.prototype.constructor
    Object.defineProperty($TypedArray$.prototype, 'constructor', {value: $TypedArray$});

    // %TypedArray%.prototype.copyWithin (target, start, end = this.length )
    Object.defineProperty($TypedArray$.prototype, 'copyWithin', {value: function(target, start) {
      var end = arguments[2];

      var o = ToObject(this);
      var lenVal = o.length;
      var len = ToUint32(lenVal);
      len = max(len, 0);
      var relativeTarget = ToInt32(target);
      var to;
      if (relativeTarget < 0)
        to = max(len + relativeTarget, 0);
      else
        to = min(relativeTarget, len);
      var relativeStart = ToInt32(start);
      var from;
      if (relativeStart < 0)
        from = max(len + relativeStart, 0);
      else
        from = min(relativeStart, len);
      var relativeEnd;
      if (end === undefined)
        relativeEnd = len;
      else
        relativeEnd = ToInt32(end);
      var final;
      if (relativeEnd < 0)
        final = max(len + relativeEnd, 0);
      else
        final = min(relativeEnd, len);
      var count = min(final - from, len - to);
      var direction;
      if (from < to && to < from + count) {
        direction = -1;
        from = from + count - 1;
        to = to + count - 1;
      } else {
        direction = 1;
      }
      while (count > 0) {
        o._setter(to, o._getter(from));
        from = from + direction;
        to = to + direction;
        count = count - 1;
      }
      return o;
    }});

    // %TypedArray%.prototype.entries ( )
    // -- defined in es6.js to shim browsers w/ native TypedArrays

    // %TypedArray%.prototype.every ( callbackfn, thisArg = undefined )
    Object.defineProperty($TypedArray$.prototype, 'every', {value: function(callbackfn) {
      if (this === undefined || this === null) throw TypeError();
      var t = Object(this);
      var len = ToUint32(t.length);
      if (!IsCallable(callbackfn)) throw TypeError();
      var thisArg = arguments[1];
      for (var i = 0; i < len; i++) {
        if (!callbackfn.call(thisArg, t._getter(i), i, t))
          return false;
      }
      return true;
    }});

    // %TypedArray%.prototype.fill (value, start = 0, end = this.length )
    Object.defineProperty($TypedArray$.prototype, 'fill', {value: function(value) {
      var start = arguments[1],
          end = arguments[2];

      var o = ToObject(this);
      var lenVal = o.length;
      var len = ToUint32(lenVal);
      len = max(len, 0);
      var relativeStart = ToInt32(start);
      var k;
      if (relativeStart < 0)
        k = max((len + relativeStart), 0);
      else
        k = min(relativeStart, len);
      var relativeEnd;
      if (end === undefined)
        relativeEnd = len;
      else
        relativeEnd = ToInt32(end);
      var final;
      if (relativeEnd < 0)
        final = max((len + relativeEnd), 0);
      else
        final = min(relativeEnd, len);
      while (k < final) {
        o._setter(k, value);
        k += 1;
      }
      return o;
    }});

    // %TypedArray%.prototype.filter ( callbackfn, thisArg = undefined )
    Object.defineProperty($TypedArray$.prototype, 'filter', {value: function(callbackfn) {
      if (this === undefined || this === null) throw TypeError();
      var t = Object(this);
      var len = ToUint32(t.length);
      if (!IsCallable(callbackfn)) throw TypeError();
      var res = [];
      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        var val = t._getter(i); // in case fun mutates this
        if (callbackfn.call(thisp, val, i, t))
          res.push(val);
      }
      return new this.constructor(res);
    }});

    // %TypedArray%.prototype.find (predicate, thisArg = undefined)
    Object.defineProperty($TypedArray$.prototype, 'find', {value: function(predicate) {
      var o = ToObject(this);
      var lenValue = o.length;
      var len = ToUint32(lenValue);
      if (!IsCallable(predicate)) throw TypeError();
      var t = arguments.length > 1 ? arguments[1] : undefined;
      var k = 0;
      while (k < len) {
        var kValue = o._getter(k);
        var testResult = predicate.call(t, kValue, k, o);
        if (Boolean(testResult))
          return kValue;
        ++k;
      }
      return undefined;
    }});

    // %TypedArray%.prototype.findIndex ( predicate, thisArg = undefined )
    Object.defineProperty($TypedArray$.prototype, 'findIndex', {value: function(predicate) {
      var o = ToObject(this);
      var lenValue = o.length;
      var len = ToUint32(lenValue);
      if (!IsCallable(predicate)) throw TypeError();
      var t = arguments.length > 1 ? arguments[1] : undefined;
      var k = 0;
      while (k < len) {
        var kValue = o._getter(k);
        var testResult = predicate.call(t, kValue, k, o);
        if (Boolean(testResult))
          return k;
        ++k;
      }
      return -1;
    }});

    // %TypedArray%.prototype.forEach ( callbackfn, thisArg = undefined )
    Object.defineProperty($TypedArray$.prototype, 'forEach', {value: function(callbackfn) {
      if (this === undefined || this === null) throw TypeError();
      var t = Object(this);
      var len = ToUint32(t.length);
      if (!IsCallable(callbackfn)) throw TypeError();
      var thisp = arguments[1];
      for (var i = 0; i < len; i++)
        callbackfn.call(thisp, t._getter(i), i, t);
    }});

    // %TypedArray%.prototype.indexOf (searchElement, fromIndex = 0 )
    Object.defineProperty($TypedArray$.prototype, 'indexOf', {value: function(searchElement) {
      if (this === undefined || this === null) throw TypeError();
      var t = Object(this);
      var len = ToUint32(t.length);
      if (len === 0) return -1;
      var n = 0;
      if (arguments.length > 0) {
        n = Number(arguments[1]);
        if (n !== n) {
          n = 0;
        } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
          n = (n > 0 || -1) * floor(abs(n));
        }
      }
      if (n >= len) return -1;
      var k = n >= 0 ? n : max(len - abs(n), 0);
      for (; k < len; k++) {
        if (t._getter(k) === searchElement) {
          return k;
        }
      }
      return -1;
    }});

    // %TypedArray%.prototype.join ( separator )
    Object.defineProperty($TypedArray$.prototype, 'join', {value: function(separator) {
      if (this === undefined || this === null) throw TypeError();
      var t = Object(this);
      var len = ToUint32(t.length);
      var tmp = Array(len);
      for (var i = 0; i < len; ++i)
        tmp[i] = t._getter(i);
      return tmp.join(separator === undefined ? ',' : separator); // Hack for IE7
    }});

    // %TypedArray%.prototype.keys ( )
    // -- defined in es6.js to shim browsers w/ native TypedArrays

    // %TypedArray%.prototype.lastIndexOf ( searchElement, fromIndex = this.length-1 )
    Object.defineProperty($TypedArray$.prototype, 'lastIndexOf', {value: function(searchElement) {
      if (this === undefined || this === null) throw TypeError();
      var t = Object(this);
      var len = ToUint32(t.length);
      if (len === 0) return -1;
      var n = len;
      if (arguments.length > 1) {
        n = Number(arguments[1]);
        if (n !== n) {
          n = 0;
        } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
          n = (n > 0 || -1) * floor(abs(n));
        }
      }
      var k = n >= 0 ? min(n, len - 1) : len - abs(n);
      for (; k >= 0; k--) {
        if (t._getter(k) === searchElement)
          return k;
      }
      return -1;
    }});

    // get %TypedArray%.prototype.length
    // -- applied directly to the object in the constructor

    // %TypedArray%.prototype.map ( callbackfn, thisArg = undefined )
    Object.defineProperty($TypedArray$.prototype, 'map', {value: function(callbackfn) {
      if (this === undefined || this === null) throw TypeError();
      var t = Object(this);
      var len = ToUint32(t.length);
      if (!IsCallable(callbackfn)) throw TypeError();
      var res = []; res.length = len;
      var thisp = arguments[1];
      for (var i = 0; i < len; i++)
        res[i] = callbackfn.call(thisp, t._getter(i), i, t);
      return new this.constructor(res);
    }});

    // %TypedArray%.prototype.reduce ( callbackfn [, initialValue] )
    Object.defineProperty($TypedArray$.prototype, 'reduce', {value: function(callbackfn) {
      if (this === undefined || this === null) throw TypeError();
      var t = Object(this);
      var len = ToUint32(t.length);
      if (!IsCallable(callbackfn)) throw TypeError();
      // no value to return if no initial value and an empty array
      if (len === 0 && arguments.length === 1) throw TypeError();
      var k = 0;
      var accumulator;
      if (arguments.length >= 2) {
        accumulator = arguments[1];
      } else {
        accumulator = t._getter(k++);
      }
      while (k < len) {
        accumulator = callbackfn.call(undefined, accumulator, t._getter(k), k, t);
        k++;
      }
      return accumulator;
    }});

    // %TypedArray%.prototype.reduceRight ( callbackfn [, initialValue] )
    Object.defineProperty($TypedArray$.prototype, 'reduceRight', {value: function(callbackfn) {
      if (this === undefined || this === null) throw TypeError();
      var t = Object(this);
      var len = ToUint32(t.length);
      if (!IsCallable(callbackfn)) throw TypeError();
      // no value to return if no initial value, empty array
      if (len === 0 && arguments.length === 1) throw TypeError();
      var k = len - 1;
      var accumulator;
      if (arguments.length >= 2) {
        accumulator = arguments[1];
      } else {
        accumulator = t._getter(k--);
      }
      while (k >= 0) {
        accumulator = callbackfn.call(undefined, accumulator, t._getter(k), k, t);
        k--;
      }
      return accumulator;
    }});

    // %TypedArray%.prototype.reverse ( )
    Object.defineProperty($TypedArray$.prototype, 'reverse', {value: function() {
      if (this === undefined || this === null) throw TypeError();
      var t = Object(this);
      var len = ToUint32(t.length);
      var half = floor(len / 2);
      for (var i = 0, j = len - 1; i < half; ++i, --j) {
        var tmp = t._getter(i);
        t._setter(i, t._getter(j));
        t._setter(j, tmp);
      }
      return t;
    }});

    // %TypedArray%.prototype.set(array, offset = 0 )
    // %TypedArray%.prototype.set(typedArray, offset = 0 )
    // WebIDL: void set(TypedArray array, optional unsigned long offset);
    // WebIDL: void set(sequence<type> array, optional unsigned long offset);
    Object.defineProperty($TypedArray$.prototype, 'set', {value: function(index, value) {
      if (arguments.length < 1) throw SyntaxError('Not enough arguments');
      var array, sequence, offset, len,
          i, s, d,
          byteOffset, byteLength, tmp;

      if (typeof arguments[0] === 'object' && arguments[0].constructor === this.constructor) {
        // void set(TypedArray array, optional unsigned long offset);
        array = arguments[0];
        offset = ToUint32(arguments[1]);

        if (offset + array.length > this.length) {
          throw RangeError('Offset plus length of array is out of range');
        }

        byteOffset = this.byteOffset + offset * this.BYTES_PER_ELEMENT;
        byteLength = array.length * this.BYTES_PER_ELEMENT;

        if (array.buffer === this.buffer) {
          tmp = [];
          for (i = 0, s = array.byteOffset; i < byteLength; i += 1, s += 1) {
            tmp[i] = array.buffer._bytes[s];
          }
          for (i = 0, d = byteOffset; i < byteLength; i += 1, d += 1) {
            this.buffer._bytes[d] = tmp[i];
          }
        } else {
          for (i = 0, s = array.byteOffset, d = byteOffset;
               i < byteLength; i += 1, s += 1, d += 1) {
            this.buffer._bytes[d] = array.buffer._bytes[s];
          }
        }
      } else if (typeof arguments[0] === 'object' && typeof arguments[0].length !== 'undefined') {
        // void set(sequence<type> array, optional unsigned long offset);
        sequence = arguments[0];
        len = ToUint32(sequence.length);
        offset = ToUint32(arguments[1]);

        if (offset + len > this.length) {
          throw RangeError('Offset plus length of array is out of range');
        }

        for (i = 0; i < len; i += 1) {
          s = sequence[i];
          this._setter(offset + i, Number(s));
        }
      } else {
        throw TypeError('Unexpected argument type(s)');
      }
    }});

    // %TypedArray%.prototype.slice ( start, end )
    Object.defineProperty($TypedArray$.prototype, 'slice', {value: function(start, end) {
      var o = ToObject(this);
      var lenVal = o.length;
      var len = ToUint32(lenVal);
      var relativeStart = ToInt32(start);
      var k = (relativeStart < 0) ? max(len + relativeStart, 0) : min(relativeStart, len);
      var relativeEnd = (end === undefined) ? len : ToInt32(end);
      var final = (relativeEnd < 0) ? max(len + relativeEnd, 0) : min(relativeEnd, len);
      var count = final - k;
      var c = o.constructor;
      var a = new c(count);
      var n = 0;
      while (k < final) {
        var kValue = o._getter(k);
        a._setter(n, kValue);
        ++k;
        ++n;
      }
      return a;
    }});

    // %TypedArray%.prototype.some ( callbackfn, thisArg = undefined )
    Object.defineProperty($TypedArray$.prototype, 'some', {value: function(callbackfn) {
      if (this === undefined || this === null) throw TypeError();
      var t = Object(this);
      var len = ToUint32(t.length);
      if (!IsCallable(callbackfn)) throw TypeError();
      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (callbackfn.call(thisp, t._getter(i), i, t)) {
          return true;
        }
      }
      return false;
    }});

    // %TypedArray%.prototype.sort ( comparefn )
    Object.defineProperty($TypedArray$.prototype, 'sort', {value: function(comparefn) {
      if (this === undefined || this === null) throw TypeError();
      var t = Object(this);
      var len = ToUint32(t.length);
      var tmp = Array(len);
      for (var i = 0; i < len; ++i)
        tmp[i] = t._getter(i);
      if (comparefn) tmp.sort(comparefn); else tmp.sort(); // Hack for IE8/9
      for (i = 0; i < len; ++i)
        t._setter(i, tmp[i]);
      return t;
    }});

    // %TypedArray%.prototype.subarray(begin = 0, end = this.length )
    // WebIDL: TypedArray subarray(long begin, optional long end);
    Object.defineProperty($TypedArray$.prototype, 'subarray', {value: function(start, end) {
      function clamp(v, min, max) { return v < min ? min : v > max ? max : v; }

      start = ToInt32(start);
      end = ToInt32(end);

      if (arguments.length < 1) { start = 0; }
      if (arguments.length < 2) { end = this.length; }

      if (start < 0) { start = this.length + start; }
      if (end < 0) { end = this.length + end; }

      start = clamp(start, 0, this.length);
      end = clamp(end, 0, this.length);

      var len = end - start;
      if (len < 0) {
        len = 0;
      }

      return new this.constructor(
        this.buffer, this.byteOffset + start * this.BYTES_PER_ELEMENT, len);
    }});

    // %TypedArray%.prototype.toLocaleString ( )
    // %TypedArray%.prototype.toString ( )
    // %TypedArray%.prototype.values ( )
    // %TypedArray%.prototype [ @@iterator ] ( )
    // get %TypedArray%.prototype [ @@toStringTag ]
    // -- defined in es6.js to shim browsers w/ native TypedArrays

    function makeTypedArray(elementSize, pack, unpack) {
      // Each TypedArray type requires a distinct constructor instance with
      // identical logic, which this produces.
      var TypedArray = function() {
        Object.defineProperty(this, 'constructor', {value: TypedArray});
        $TypedArray$.apply(this, arguments);
        makeArrayAccessors(this);
      };
      if ('__proto__' in TypedArray) {
        TypedArray.__proto__ = $TypedArray$;
      } else {
        TypedArray.from = $TypedArray$.from;
        TypedArray.of = $TypedArray$.of;
      }

      TypedArray.BYTES_PER_ELEMENT = elementSize;

      var TypedArrayPrototype = function() {};
      TypedArrayPrototype.prototype = $TypedArrayPrototype$;

      TypedArray.prototype = new TypedArrayPrototype();

      Object.defineProperty(TypedArray.prototype, 'BYTES_PER_ELEMENT', {value: elementSize});
      Object.defineProperty(TypedArray.prototype, '_pack', {value: pack});
      Object.defineProperty(TypedArray.prototype, '_unpack', {value: unpack});

      return TypedArray;
    }

    var Int8Array = makeTypedArray(1, packI8, unpackI8);
    var Uint8Array = makeTypedArray(1, packU8, unpackU8);
    var Uint8ClampedArray = makeTypedArray(1, packU8Clamped, unpackU8);
    var Int16Array = makeTypedArray(2, packI16, unpackI16);
    var Uint16Array = makeTypedArray(2, packU16, unpackU16);
    var Int32Array = makeTypedArray(4, packI32, unpackI32);
    var Uint32Array = makeTypedArray(4, packU32, unpackU32);
    var Float32Array = makeTypedArray(4, packF32, unpackF32);
    var Float64Array = makeTypedArray(8, packF64, unpackF64);

    global.Int8Array = global.Int8Array || Int8Array;
    global.Uint8Array = global.Uint8Array || Uint8Array;
    global.Uint8ClampedArray = global.Uint8ClampedArray || Uint8ClampedArray;
    global.Int16Array = global.Int16Array || Int16Array;
    global.Uint16Array = global.Uint16Array || Uint16Array;
    global.Int32Array = global.Int32Array || Int32Array;
    global.Uint32Array = global.Uint32Array || Uint32Array;
    global.Float32Array = global.Float32Array || Float32Array;
    global.Float64Array = global.Float64Array || Float64Array;
  }());

  //
  // 6 The DataView View Type
  //

  (function() {
    function r(array, index) {
      return IsCallable(array.get) ? array.get(index) : array[index];
    }

    var IS_BIG_ENDIAN = (function() {
      var u16array = new Uint16Array([0x1234]),
          u8array = new Uint8Array(u16array.buffer);
      return r(u8array, 0) === 0x12;
    }());

    // DataView(buffer, byteOffset=0, byteLength=undefined)
    // WebIDL: Constructor(ArrayBuffer buffer,
    //                     optional unsigned long byteOffset,
    //                     optional unsigned long byteLength)
    function DataView(buffer, byteOffset, byteLength) {
      if (!(buffer instanceof ArrayBuffer || Class(buffer) === 'ArrayBuffer')) throw TypeError();

      byteOffset = ToUint32(byteOffset);
      if (byteOffset > buffer.byteLength)
        throw RangeError('byteOffset out of range');

      if (byteLength === undefined)
        byteLength = buffer.byteLength - byteOffset;
      else
        byteLength = ToUint32(byteLength);

      if ((byteOffset + byteLength) > buffer.byteLength)
        throw RangeError('byteOffset and length reference an area beyond the end of the buffer');

      Object.defineProperty(this, 'buffer', {value: buffer});
      Object.defineProperty(this, 'byteLength', {value: byteLength});
      Object.defineProperty(this, 'byteOffset', {value: byteOffset});
    };

    // get DataView.prototype.buffer
    // get DataView.prototype.byteLength
    // get DataView.prototype.byteOffset
    // -- applied directly to instances by the constructor

    function makeGetter(arrayType) {
      return function GetViewValue(byteOffset, littleEndian) {
        byteOffset = ToUint32(byteOffset);

        if (byteOffset + arrayType.BYTES_PER_ELEMENT > this.byteLength)
          throw RangeError('Array index out of range');

        byteOffset += this.byteOffset;

        var uint8Array = new Uint8Array(this.buffer, byteOffset, arrayType.BYTES_PER_ELEMENT),
            bytes = [];
        for (var i = 0; i < arrayType.BYTES_PER_ELEMENT; i += 1)
          bytes.push(r(uint8Array, i));

        if (Boolean(littleEndian) === Boolean(IS_BIG_ENDIAN))
          bytes.reverse();

        return r(new arrayType(new Uint8Array(bytes).buffer), 0);
      };
    }

    Object.defineProperty(DataView.prototype, 'getUint8', {value: makeGetter(Uint8Array)});
    Object.defineProperty(DataView.prototype, 'getInt8', {value: makeGetter(Int8Array)});
    Object.defineProperty(DataView.prototype, 'getUint16', {value: makeGetter(Uint16Array)});
    Object.defineProperty(DataView.prototype, 'getInt16', {value: makeGetter(Int16Array)});
    Object.defineProperty(DataView.prototype, 'getUint32', {value: makeGetter(Uint32Array)});
    Object.defineProperty(DataView.prototype, 'getInt32', {value: makeGetter(Int32Array)});
    Object.defineProperty(DataView.prototype, 'getFloat32', {value: makeGetter(Float32Array)});
    Object.defineProperty(DataView.prototype, 'getFloat64', {value: makeGetter(Float64Array)});

    function makeSetter(arrayType) {
      return function SetViewValue(byteOffset, value, littleEndian) {
        byteOffset = ToUint32(byteOffset);
        if (byteOffset + arrayType.BYTES_PER_ELEMENT > this.byteLength)
          throw RangeError('Array index out of range');

        // Get bytes
        var typeArray = new arrayType([value]),
            byteArray = new Uint8Array(typeArray.buffer),
            bytes = [], i, byteView;

        for (i = 0; i < arrayType.BYTES_PER_ELEMENT; i += 1)
          bytes.push(r(byteArray, i));

        // Flip if necessary
        if (Boolean(littleEndian) === Boolean(IS_BIG_ENDIAN))
          bytes.reverse();

        // Write them
        byteView = new Uint8Array(this.buffer, byteOffset, arrayType.BYTES_PER_ELEMENT);
        byteView.set(bytes);
      };
    }

    Object.defineProperty(DataView.prototype, 'setUint8', {value: makeSetter(Uint8Array)});
    Object.defineProperty(DataView.prototype, 'setInt8', {value: makeSetter(Int8Array)});
    Object.defineProperty(DataView.prototype, 'setUint16', {value: makeSetter(Uint16Array)});
    Object.defineProperty(DataView.prototype, 'setInt16', {value: makeSetter(Int16Array)});
    Object.defineProperty(DataView.prototype, 'setUint32', {value: makeSetter(Uint32Array)});
    Object.defineProperty(DataView.prototype, 'setInt32', {value: makeSetter(Int32Array)});
    Object.defineProperty(DataView.prototype, 'setFloat32', {value: makeSetter(Float32Array)});
    Object.defineProperty(DataView.prototype, 'setFloat64', {value: makeSetter(Float64Array)});

    global.DataView = global.DataView || DataView;

  }());

}(this));
/*
 Copyright 2013-2014 Daniel Wirtz <dcode@dcode.io>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @license ByteBuffer.js (c) 2013-2014 Daniel Wirtz <dcode@dcode.io>
 * This version of ByteBuffer.js uses an ArrayBuffer (AB) as its backing buffer and is compatible with modern browsers.
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/ByteBuffer.js for details
 */ //
(function(global) {
    "use strict";

    /**
     * @param {function(new: Long, number, number, boolean=)=} Long
     * @returns {function(new: ByteBuffer, number=, boolean=, boolean=)}}
     * @inner
     */
    function loadByteBuffer(Long) {

        /**
         * Constructs a new ByteBuffer.
         * @class The swiss army knife for binary data in JavaScript.
         * @exports ByteBuffer
         * @constructor
         * @param {number=} capacity Initial capacity. Defaults to {@link ByteBuffer.DEFAULT_CAPACITY}.
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @expose
         */
        var ByteBuffer = function(capacity, littleEndian, noAssert) {
            if (typeof capacity     === 'undefined') capacity     = ByteBuffer.DEFAULT_CAPACITY;
            if (typeof littleEndian === 'undefined') littleEndian = ByteBuffer.DEFAULT_ENDIAN;
            if (typeof noAssert     === 'undefined') noAssert     = ByteBuffer.DEFAULT_NOASSERT;
            if (!noAssert) {
                capacity = capacity | 0;
                if (capacity < 0)
                    throw RangeError("Illegal capacity");
                littleEndian = !!littleEndian;
                noAssert = !!noAssert;
            }

            /**
             * Backing buffer.
             * @type {!ArrayBuffer}
             * @expose
             */
            this.buffer = capacity === 0 ? EMPTY_BUFFER : new ArrayBuffer(capacity);

            /**
             * Data view to manipulate the backing buffer. Becomes `null` if the backing buffer has a capacity of `0`.
             * @type {?DataView}
             * @expose
             */
            this.view = capacity === 0 ? null : new DataView(this.buffer);

            /**
             * Absolute read/write offset.
             * @type {number}
             * @expose
             * @see ByteBuffer#flip
             * @see ByteBuffer#clear
             */
            this.offset = 0;

            /**
             * Marked offset.
             * @type {number}
             * @expose
             * @see ByteBuffer#mark
             * @see ByteBuffer#reset
             */
            this.markedOffset = -1;

            /**
             * Absolute limit of the contained data. Set to the backing buffer's capacity upon allocation.
             * @type {number}
             * @expose
             * @see ByteBuffer#flip
             * @see ByteBuffer#clear
             */
            this.limit = capacity;

            /**
             * Whether to use little endian byte order, defaults to `false` for big endian.
             * @type {boolean}
             * @expose
             */
            this.littleEndian = typeof littleEndian !== 'undefined' ? !!littleEndian : false;

            /**
             * Whether to skip assertions of offsets and values, defaults to `false`.
             * @type {boolean}
             * @expose
             */
            this.noAssert = !!noAssert;
        };

        /**
         * ByteBuffer version.
         * @type {string}
         * @const
         * @expose
         */
        ByteBuffer.VERSION = "3.5.4";

        /**
         * Little endian constant that can be used instead of its boolean value. Evaluates to `true`.
         * @type {boolean}
         * @const
         * @expose
         */
        ByteBuffer.LITTLE_ENDIAN = true;

        /**
         * Big endian constant that can be used instead of its boolean value. Evaluates to `false`.
         * @type {boolean}
         * @const
         * @expose
         */
        ByteBuffer.BIG_ENDIAN = false;

        /**
         * Default initial capacity of `16`.
         * @type {number}
         * @expose
         */
        ByteBuffer.DEFAULT_CAPACITY = 16;

        /**
         * Default endianess of `false` for big endian.
         * @type {boolean}
         * @expose
         */
        ByteBuffer.DEFAULT_ENDIAN = ByteBuffer.BIG_ENDIAN;

        /**
         * Default no assertions flag of `false`.
         * @type {boolean}
         * @expose
         */
        ByteBuffer.DEFAULT_NOASSERT = false;

        /**
         * A `Long` class for representing a 64-bit two's-complement integer value. May be `null` if Long.js has not been loaded
         *  and int64 support is not available.
         * @type {?Long}
         * @const
         * @see https://github.com/dcodeIO/Long.js
         * @expose
         */
        ByteBuffer.Long = Long || null;

        /**
         * @alias ByteBuffer.prototype
         * @inner
         */
        var ByteBufferPrototype = ByteBuffer.prototype;

        // helpers

        /**
         * @type {!ArrayBuffer}
         * @inner
         */
        var EMPTY_BUFFER = new ArrayBuffer(0);

        /**
         * String.fromCharCode reference for compile-time renaming.
         * @type {function(...number):string}
         * @inner
         */
        var stringFromCharCode = String.fromCharCode;

        /**
         * Creates a source function for a string.
         * @param {string} s String to read from
         * @returns {function():number|null} Source function returning the next char code respectively `null` if there are
         *  no more characters left.
         * @throws {TypeError} If the argument is invalid
         * @inner
         */
        function stringSource(s) {
            var i=0; return function() {
                return i < s.length ? s.charCodeAt(i++) : null;
            };
        }

        /**
         * Creates a destination function for a string.
         * @returns {function(number=):undefined|string} Destination function successively called with the next char code.
         *  Returns the final string when called without arguments.
         * @inner
         */
//---------------------------
        function stringDestination() {
            var cs = [], ps = []; return function() {
                if (arguments.length === 0)
                    return ps.join('')+stringFromCharCode.apply(String, cs);
                if (cs.length + arguments.length > 1024)
                    ps.push(stringFromCharCode.apply(String, cs)),
                        cs.length = 0;
                Array.prototype.push.apply(cs, arguments);
            };
        }
//---------------------------

        /**
         * Allocates a new ByteBuffer backed by a buffer of the specified capacity.
         * @param {number=} capacity Initial capacity. Defaults to {@link ByteBuffer.DEFAULT_CAPACITY}.
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer}
         * @expose
         */
        ByteBuffer.allocate = function(capacity, littleEndian, noAssert) {
            return new ByteBuffer(capacity, littleEndian, noAssert);
        };

        /**
         * Tests if the specified type is a ByteBuffer.
         * @param {*} bb ByteBuffer to test
         * @returns {boolean} `true` if it is a ByteBuffer, otherwise `false`
         * @expose
         */
        ByteBuffer.isByteBuffer = function(bb) {
            return (bb && bb instanceof ByteBuffer) === true;
        };
        /**
         * Gets the backing buffer type.
         * @returns {Function} `Buffer` for NB builds, `ArrayBuffer` for AB builds (classes)
         * @expose
         */
        ByteBuffer.type = function() {
            return ArrayBuffer;
        };

        /**
         * Wraps a buffer or a string. Sets the allocated ByteBuffer's {@link ByteBuffer#offset} to `0` and its
         *  {@link ByteBuffer#limit} to the length of the wrapped data.
         * @param {!ByteBuffer|!ArrayBuffer|!Uint8Array|string|!Array.<number>} buffer Anything that can be wrapped
         * @param {(string|boolean)=} encoding String encoding if `buffer` is a string ("base64", "hex", "binary", defaults to
         *  "utf8")
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer} A ByteBuffer wrapping `buffer`
         * @expose
         *
        ByteBuffer.wrap = function(buffer, encoding, littleEndian, noAssert) {
            if (typeof encoding !== 'string') {
                noAssert = littleEndian;
                littleEndian = encoding;
                encoding = undefined;
            }
            if (typeof buffer === 'string') {
                if (typeof encoding === 'undefined')
                    encoding = "utf8";
                switch (encoding) {
                    case "base64":
                        return ByteBuffer.fromBase64(buffer, littleEndian);
                    case "hex":
                        return ByteBuffer.fromHex(buffer, littleEndian);
                    case "binary":
                        return ByteBuffer.fromBinary(buffer, littleEndian);
                    case "utf8":
                        return ByteBuffer.fromUTF8(buffer, littleEndian);
                    case "debug":
                        return ByteBuffer.fromDebug(buffer, littleEndian);
                    default:
                        throw Error("Unsupported encoding: "+encoding);
                }
            }
            if (buffer === null || typeof buffer !== 'object')
                throw TypeError("Illegal buffer");
            var bb;
            if (ByteBuffer.isByteBuffer(buffer)) {
                bb = ByteBufferPrototype.clone.call(buffer);
                bb.markedOffset = -1;
                return bb;
            }
            if (buffer instanceof Uint8Array) { // Extract ArrayBuffer from Uint8Array
                bb = new ByteBuffer(0, littleEndian, noAssert);
                if (buffer.length > 0) { // Avoid references to more than one EMPTY_BUFFER
                    bb.buffer = buffer.buffer;
                    bb.offset = buffer.byteOffset;
                    bb.limit = buffer.byteOffset + buffer.length;
                    bb.view = buffer.length > 0 ? new DataView(buffer.buffer) : null;
                }
            } else if (buffer instanceof ArrayBuffer) { // Reuse ArrayBuffer
                bb = new ByteBuffer(0, littleEndian, noAssert);
                if (buffer.byteLength > 0) {
                    bb.buffer = buffer;
                    bb.offset = 0;
                    bb.limit = buffer.byteLength;
                    bb.view = buffer.byteLength > 0 ? new DataView(buffer) : null;
                }
            } else if (Object.prototype.toString.call(buffer) === "[object Array]") { // Create from octets
                bb = new ByteBuffer(buffer.length, littleEndian, noAssert);
                bb.limit = buffer.length;
                for (i=0; i<buffer.length; ++i)
                    bb.view.setUint8(i, buffer[i]);
            } else
                throw TypeError("Illegal buffer"); // Otherwise fail
            return bb;
        };
*/
        // types/ints/int8

        /**
         * Writes an 8bit signed integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeInt8 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value |= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 1;
            var capacity0 = this.buffer.byteLength;
            if (offset > capacity0)
                this.resize((capacity0 *= 2) > offset ? capacity0 : offset);
            offset -= 1;
            this.view.setInt8(offset, value);
            if (relative) this.offset += 1;
            return this;
        };

        /**
         * Writes an 8bit signed integer. This is an alias of {@link ByteBuffer#writeInt8}.
         * @function
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeByte = ByteBufferPrototype.writeInt8;

        /**
         * Reads an 8bit signed integer.
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {number} Value read
         * @expose
         *
        ByteBufferPrototype.readInt8 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 1 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
            }
            var value = this.view.getInt8(offset);
            if (relative) this.offset += 1;
            return value;
        };
*/
        /**
         * Reads an 8bit signed integer. This is an alias of {@link ByteBuffer#readInt8}.
         * @function
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {number} Value read
         * @expose
         */
//        ByteBufferPrototype.readByte = ByteBufferPrototype.readInt8;

        /**
         * Writes an 8bit unsigned integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeUint8 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value >>>= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 1;
            var capacity1 = this.buffer.byteLength;
            if (offset > capacity1)
                this.resize((capacity1 *= 2) > offset ? capacity1 : offset);
            offset -= 1;
            this.view.setUint8(offset, value);
            if (relative) this.offset += 1;
            return this;
        };

        /**
         * Reads an 8bit unsigned integer.
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `1` if omitted.
         * @returns {number} Value read
         * @expose
         */
        ByteBufferPrototype.readUint8 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 1 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
            }
            var value = this.view.getUint8(offset);
            if (relative) this.offset += 1;
            return value;
        };

        // types/ints/int16

        /**
         * Writes a 16bit signed integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @throws {TypeError} If `offset` or `value` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         */
        ByteBufferPrototype.writeInt16 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value |= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 2;
            var capacity2 = this.buffer.byteLength;
            if (offset > capacity2)
                this.resize((capacity2 *= 2) > offset ? capacity2 : offset);
            offset -= 2;
            this.view.setInt16(offset, value, this.littleEndian);
            if (relative) this.offset += 2;
            return this;
        };

        /**
         * Writes a 16bit signed integer. This is an alias of {@link ByteBuffer#writeInt16}.
         * @function
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @throws {TypeError} If `offset` or `value` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         */
        ByteBufferPrototype.writeShort = ByteBufferPrototype.writeInt16;

        /**
         * Reads a 16bit signed integer.
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @returns {number} Value read
         * @throws {TypeError} If `offset` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         *
        ByteBufferPrototype.readInt16 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 2 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+2+") <= "+this.buffer.byteLength);
            }
            var value = this.view.getInt16(offset, this.littleEndian);
            if (relative) this.offset += 2;
            return value;
        };
*/
        /**
         * Reads a 16bit signed integer. This is an alias of {@link ByteBuffer#readInt16}.
         * @function
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @returns {number} Value read
         * @throws {TypeError} If `offset` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         */
 //       ByteBufferPrototype.readShort = ByteBufferPrototype.readInt16;

        /**
         * Writes a 16bit unsigned integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @throws {TypeError} If `offset` or `value` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         */
        ByteBufferPrototype.writeUint16 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value >>>= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 2;
            var capacity3 = this.buffer.byteLength;
            if (offset > capacity3)
                this.resize((capacity3 *= 2) > offset ? capacity3 : offset);
            offset -= 2;
            this.view.setUint16(offset, value, this.littleEndian);
            if (relative) this.offset += 2;
            return this;
        };

        /**
         * Reads a 16bit unsigned integer.
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `2` if omitted.
         * @returns {number} Value read
         * @throws {TypeError} If `offset` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @expose
         *
        ByteBufferPrototype.readUint16 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 2 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+2+") <= "+this.buffer.byteLength);
            }
            var value = this.view.getUint16(offset, this.littleEndian);
            if (relative) this.offset += 2;
            return value;
        };
*/
        // types/ints/int32

        /**
         * Writes a 32bit signed integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @expose
         */
        ByteBufferPrototype.writeInt32 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value |= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 4;
            var capacity4 = this.buffer.byteLength;
            if (offset > capacity4)
                this.resize((capacity4 *= 2) > offset ? capacity4 : offset);
            offset -= 4;
            this.view.setInt32(offset, value, this.littleEndian);
            if (relative) this.offset += 4;
            return this;
        };

        /**
         * Writes a 32bit signed integer. This is an alias of {@link ByteBuffer#writeInt32}.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @expose
         */
        ByteBufferPrototype.writeInt = ByteBufferPrototype.writeInt32;

        /**
         * Reads a 32bit signed integer.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {number} Value read
         * @expose
         *
        ByteBufferPrototype.readInt32 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 4 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
            }
            var value = this.view.getInt32(offset, this.littleEndian);
            if (relative) this.offset += 4;
            return value;
        };*/

        /**
         * Reads a 32bit signed integer. This is an alias of {@link ByteBuffer#readInt32}.
         * @param {number=} offset Offset to read from. Will use and advance {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {number} Value read
         * @expose
         */
        //ByteBufferPrototype.readInt = ByteBufferPrototype.readInt32;

        /**
         * Writes a 32bit unsigned integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @expose
         */
        ByteBufferPrototype.writeUint32 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value >>>= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 4;
            var capacity5 = this.buffer.byteLength;
            if (offset > capacity5)
                this.resize((capacity5 *= 2) > offset ? capacity5 : offset);
            offset -= 4;
            this.view.setUint32(offset, value, this.littleEndian);
            if (relative) this.offset += 4;
            return this;
        };

        /**
         * Reads a 32bit unsigned integer.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {number} Value read
         * @expose
         *
        ByteBufferPrototype.readUint32 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 4 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
            }
            var value = this.view.getUint32(offset, this.littleEndian);
            if (relative) this.offset += 4;
            return value;
        };*/

        // types/ints/int64



        // types/floats/float32

        /**
         * Writes a 32bit float.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeFloat32 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number')
                    throw TypeError("Illegal value: "+value+" (not a number)");
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 4;
            var capacity8 = this.buffer.byteLength;
            if (offset > capacity8)
                this.resize((capacity8 *= 2) > offset ? capacity8 : offset);
            offset -= 4;
            this.view.setFloat32(offset, value, this.littleEndian);
            if (relative) this.offset += 4;
            return this;
        };

        /**
         * Writes a 32bit float. This is an alias of {@link ByteBuffer#writeFloat32}.
         * @function
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeFloat = ByteBufferPrototype.writeFloat32;

        /**
         * Reads a 32bit float.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {number}
         * @expose
         *
        ByteBufferPrototype.readFloat32 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 4 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
            }
            var value = this.view.getFloat32(offset, this.littleEndian);
            if (relative) this.offset += 4;
            return value;
        };
*/
        /**
         * Reads a 32bit float. This is an alias of {@link ByteBuffer#readFloat32}.
         * @function
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `4` if omitted.
         * @returns {number}
         * @expose
         */
    //    ByteBufferPrototype.readFloat = ByteBufferPrototype.readFloat32;

        // types/floats/float64

        /**
         * Writes a 64bit float.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeFloat64 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number')
                    throw TypeError("Illegal value: "+value+" (not a number)");
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            offset += 8;
            var capacity9 = this.buffer.byteLength;
            if (offset > capacity9)
                this.resize((capacity9 *= 2) > offset ? capacity9 : offset);
            offset -= 8;
            this.view.setFloat64(offset, value, this.littleEndian);
            if (relative) this.offset += 8;
            return this;
        };

        /**
         * Writes a 64bit float. This is an alias of {@link ByteBuffer#writeFloat64}.
         * @function
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.writeDouble = ByteBufferPrototype.writeFloat64;

        /**
         *
         * Reads a 64bit float.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {number}
         * @expose
         *
        ByteBufferPrototype.readFloat64 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 8 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+8+") <= "+this.buffer.byteLength);
            }
            var value = this.view.getFloat64(offset, this.littleEndian);
            if (relative) this.offset += 8;
            return value;
        };
*/

        /**
         * Reads a 64bit float. This is an alias of {@link ByteBuffer#readFloat64}.
         * @function
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by `8` if omitted.
         * @returns {number}
         * @expose
         */
  //      ByteBufferPrototype.readDouble = ByteBufferPrototype.readFloat64;


        // types/varints/varint32

        /**
         * Maximum number of bytes required to store a 32bit base 128 variable-length integer.
         * @type {number}
         * @const
         * @expose
         */
        ByteBuffer.MAX_VARINT32_BYTES = 5;

        /**
         * Calculates the actual number of bytes required to store a 32bit base 128 variable-length integer.
         * @param {number} value Value to encode
         * @returns {number} Number of bytes required. Capped to {@link ByteBuffer.MAX_VARINT32_BYTES}
         * @expose
         */
        ByteBuffer.calculateVarint32 = function(value) {
            // ref: src/google/protobuf/io/coded_stream.cc
            value = value >>> 0;
                 if (value < 1 << 7 ) return 1;
            else if (value < 1 << 14) return 2;
            else if (value < 1 << 21) return 3;
            else if (value < 1 << 28) return 4;
            else                      return 5;
        };

        /**
         * Zigzag encodes a signed 32bit integer so that it can be effectively used with varint encoding.
         * @param {number} n Signed 32bit integer
         * @returns {number} Unsigned zigzag encoded 32bit integer
         * @expose
         */
        ByteBuffer.zigZagEncode32 = function(n) {
            return (((n |= 0) << 1) ^ (n >> 31)) >>> 0; // ref: src/google/protobuf/wire_format_lite.h
        };

        /**
         * Decodes a zigzag encoded signed 32bit integer.
         * @param {number} n Unsigned zigzag encoded 32bit integer
         * @returns {number} Signed 32bit integer
         * @expose
         *
        ByteBuffer.zigZagDecode32 = function(n) {
            return ((n >>> 1) ^ -(n & 1)) | 0; // // ref: src/google/protobuf/wire_format_lite.h
        };*/

        /**
         * Writes a 32bit base 128 variable-length integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {!ByteBuffer|number} this if `offset` is omitted, else the actual number of bytes written
         * @expose
         */
        ByteBufferPrototype.writeVarint32 = function(value, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value |= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            var size = ByteBuffer.calculateVarint32(value),
                b;
            offset += size;
            var capacity10 = this.buffer.byteLength;
            if (offset > capacity10)
                this.resize((capacity10 *= 2) > offset ? capacity10 : offset);
            offset -= size;
            // ref: http://code.google.com/searchframe#WTeibokF6gE/trunk/src/google/protobuf/io/coded_stream.cc
            this.view.setUint8(offset, b = value | 0x80);
            value >>>= 0;
            if (value >= 1 << 7) {
                b = (value >> 7) | 0x80;
                this.view.setUint8(offset+1, b);
                if (value >= 1 << 14) {
                    b = (value >> 14) | 0x80;
                    this.view.setUint8(offset+2, b);
                    if (value >= 1 << 21) {
                        b = (value >> 21) | 0x80;
                        this.view.setUint8(offset+3, b);
                        if (value >= 1 << 28) {
                            this.view.setUint8(offset+4, (value >> 28) & 0x0F);
                            size = 5;
                        } else {
                            this.view.setUint8(offset+3, b & 0x7F);
                            size = 4;
                        }
                    } else {
                        this.view.setUint8(offset+2, b & 0x7F);
                        size = 3;
                    }
                } else {
                    this.view.setUint8(offset+1, b & 0x7F);
                    size = 2;
                }
            } else {
                this.view.setUint8(offset, b & 0x7F);
                size = 1;
            }
            if (relative) {
                this.offset += size;
                return this;
            }
            return size;
        };

        /**
         * Writes a zig-zag encoded 32bit base 128 variable-length integer.
         * @param {number} value Value to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {!ByteBuffer|number} this if `offset` is omitted, else the actual number of bytes written
         * @expose
         */
        ByteBufferPrototype.writeVarint32ZigZag = function(value, offset) {
            return this.writeVarint32(ByteBuffer.zigZagEncode32(value), offset);
        };

        /**
         * Reads a 32bit base 128 variable-length integer.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {number|!{value: number, length: number}} The value read if offset is omitted, else the value read
         *  and the actual number of bytes read.
         * @throws {Error} If it's not a valid varint. Has a property `truncated = true` if there is not enough data available
         *  to fully decode the varint.
         * @expose
         *
        ByteBufferPrototype.readVarint32 = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 1 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
            }
            // ref: src/google/protobuf/io/coded_stream.cc
            var size = 0,
                value = 0 >>> 0,
                temp,
                ioffset;
            do {
                ioffset = offset+size;
                if (!this.noAssert && ioffset > this.limit) {
                    var err = Error("Truncated");
                    err['truncated'] = true;
                    throw err;
                }
                temp = this.view.getUint8(ioffset);
                if (size < 5)
                    value |= ((temp&0x7F)<<(7*size)) >>> 0;
                ++size;
            } while ((temp & 0x80) === 0x80);
            value = value | 0; // Make sure to discard the higher order bits
            if (relative) {
                this.offset += size;
                return value;
            }
            return {
                "value": value,
                "length": size
            };
        };
*/

        /**
         * Reads a zig-zag encoded 32bit base 128 variable-length integer.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {number|!{value: number, length: number}} The value read if offset is omitted, else the value read
         *  and the actual number of bytes read.
         * @throws {Error} If it's not a valid varint
         * @expose
         *
        ByteBufferPrototype.readVarint32ZigZag = function(offset) {
            var val = this.readVarint32(offset);
            if (typeof val === 'object')
                val["value"] = ByteBuffer.zigZagDecode32(val["value"]);
            else
                val = ByteBuffer.zigZagDecode32(val);
            return val;
        };
*/

        // types/varints/varint64



        // types/strings/cstring

        /**
         * Writes a NULL-terminated UTF8 encoded string. For this to work the specified string must not contain any NULL
         *  characters itself.
         * @param {string} str String to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  contained in `str` + 1 if omitted.
         * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written
         * @expose
         */
        ByteBufferPrototype.writeCString = function(str, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            var i,
                k = str.length;
            if (!this.noAssert) {
                if (typeof str !== 'string')
                    throw TypeError("Illegal str: Not a string");
                for (i=0; i<k; ++i) {
                    if (str.charCodeAt(i) === 0)
                        throw RangeError("Illegal str: Contains NULL-characters");
                }
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            var start = offset;
            // UTF8 strings do not contain zero bytes in between except for the zero character, so:
            k = utfx.calculateUTF16asUTF8(stringSource(str))[1];
            offset += k+1;
            var capacity12 = this.buffer.byteLength;
            if (offset > capacity12)
                this.resize((capacity12 *= 2) > offset ? capacity12 : offset);
            offset -= k+1;
            utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
                this.view.setUint8(offset++, b);
            }.bind(this));
            this.view.setUint8(offset++, 0);
            if (relative) {
                this.offset = offset - start;
                return this;
            }
            return k;
        };

        /**
         * Reads a NULL-terminated UTF8 encoded string. For this to work the string read must not contain any NULL characters
         *  itself.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
         *  read and the actual number of bytes read.
         * @expose
         *
        ByteBufferPrototype.readCString = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 1 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
            }
            var start = offset,
                temp;
            // UTF8 strings do not contain zero bytes in between except for the zero character itself, so:
            var sd, b = -1;
            utfx.decodeUTF8toUTF16(function() {
                if (b === 0) return null;
                if (offset >= this.limit)
                    throw RangeError("Illegal range: Truncated data, "+offset+" < "+this.limit);
                return (b = this.view.getUint8(offset++)) === 0 ? null : b;
            }.bind(this), sd = stringDestination(), true);
            if (relative) {
                this.offset = offset;
                return sd();
            } else {
                return {
                    "string": sd(),
                    "length": offset - start
                };
            }
        };
*/
        // types/strings/istring

        /**
         * Writes a length as uint32 prefixed UTF8 encoded string.
         * @param {string} str String to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {!ByteBuffer|number} `this` if `offset` is omitted, else the actual number of bytes written
         * @expose
         * @see ByteBuffer#writeVarint32
         */
        ByteBufferPrototype.writeIString = function(str, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof str !== 'string')
                    throw TypeError("Illegal str: Not a string");
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            var start = offset,
                k;
            k = utfx.calculateUTF16asUTF8(stringSource(str), this.noAssert)[1];
            offset += 4+k;
            var capacity13 = this.buffer.byteLength;
            if (offset > capacity13)
                this.resize((capacity13 *= 2) > offset ? capacity13 : offset);
            offset -= 4+k;
            this.view.setUint32(offset, k, this.littleEndian);
            offset += 4;
            utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
                this.view.setUint8(offset++, b);
            }.bind(this));
            if (offset !== start + 4 + k)
                throw RangeError("Illegal range: Truncated data, "+offset+" == "+(offset+4+k));
            if (relative) {
                this.offset = offset;
                return this;
            }
            return offset - start;
        };

        /**
         * Reads a length as uint32 prefixed UTF8 encoded string.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
         *  read and the actual number of bytes read.
         * @expose
         * @see ByteBuffer#readVarint32

        ByteBufferPrototype.readIString = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 4 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+4+") <= "+this.buffer.byteLength);
            }
            var temp = 0,
                start = offset,
                str;
            temp = this.view.getUint32(offset, this.littleEndian);
            offset += 4;
            var k = offset + temp,
                sd;
            utfx.decodeUTF8toUTF16(function() {
                return offset < k ? this.view.getUint8(offset++) : null;
            }.bind(this), sd = stringDestination(), this.noAssert);
            str = sd();
            if (relative) {
                this.offset = offset;
                return str;
            } else {
                return {
                    'string': str,
                    'length': offset - start
                };
            }
        };
*/
        // types/strings/utf8string

        /**
         * Metrics representing number of UTF8 characters. Evaluates to `c`.
         * @type {string}
         * @const
         * @expose
         */
        ByteBuffer.METRICS_CHARS = 'c';

        /**
         * Metrics representing number of bytes. Evaluates to `b`.
         * @type {string}
         * @const
         * @expose
         */
        ByteBuffer.METRICS_BYTES = 'b';

        /**
         * Writes an UTF8 encoded string.
         * @param {string} str String to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} if omitted.
         * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written.
         * @expose
         */
        ByteBufferPrototype.writeUTF8String = function(str, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            var k;
            var start = offset;
            k = utfx.calculateUTF16asUTF8(stringSource(str))[1];
            offset += k;
            var capacity14 = this.buffer.byteLength;
            if (offset > capacity14)
                this.resize((capacity14 *= 2) > offset ? capacity14 : offset);
            offset -= k;
            utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
                this.view.setUint8(offset++, b);
            }.bind(this));
            if (relative) {
                this.offset = offset;
                return this;
            }
            return offset - start;
        };

        /**
         * Writes an UTF8 encoded string. This is an alias of {@link ByteBuffer#writeUTF8String}.
         * @function
         * @param {string} str String to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} if omitted.
         * @returns {!ByteBuffer|number} this if offset is omitted, else the actual number of bytes written.
         * @expose
         */
        ByteBufferPrototype.writeString = ByteBufferPrototype.writeUTF8String;

        /**
         * Calculates the number of UTF8 characters of a string. JavaScript itself uses UTF-16, so that a string's
         *  `length` property does not reflect its actual UTF8 size if it contains code points larger than 0xFFFF.
         * @function
         * @param {string} str String to calculate
         * @returns {number} Number of UTF8 characters
         * @expose
         */
        ByteBuffer.calculateUTF8Chars = function(str) {
            return utfx.calculateUTF16asUTF8(stringSource(str))[0];
        };

        /**
         * Calculates the number of UTF8 bytes of a string.
         * @function
         * @param {string} str String to calculate
         * @returns {number} Number of UTF8 bytes
         * @expose
         */
        ByteBuffer.calculateUTF8Bytes = function(str) {
            return utfx.calculateUTF16asUTF8(stringSource(str))[1];
        };

        /**
         * Reads an UTF8 encoded string.
         * @param {number} length Number of characters or bytes to read.
         * @param {string=} metrics Metrics specifying what `length` is meant to count. Defaults to
         *  {@link ByteBuffer.METRICS_CHARS}.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
         *  read and the actual number of bytes read.
         * @expose
         *
        ByteBufferPrototype.readUTF8String = function(length, metrics, offset) {
            if (typeof metrics === 'number') {
                offset = metrics;
                metrics = undefined;
            }
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (typeof metrics === 'undefined') metrics = ByteBuffer.METRICS_CHARS;
            if (!this.noAssert) {
                if (typeof length !== 'number' || length % 1 !== 0)
                    throw TypeError("Illegal length: "+length+" (not an integer)");
                length |= 0;
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            var i = 0,
                start = offset,
                sd;
            if (metrics === ByteBuffer.METRICS_CHARS) { // The same for node and the browser
                sd = stringDestination();
                utfx.decodeUTF8(function() {
                    return i < length && offset < this.limit ? this.view.getUint8(offset++) : null;
                }.bind(this), function(cp) {
                    ++i; utfx.UTF8toUTF16(cp, sd);
                }.bind(this));
                if (i !== length)
                    throw RangeError("Illegal range: Truncated data, "+i+" == "+length);
                if (relative) {
                    this.offset = offset;
                    return sd();
                } else {
                    return {
                        "string": sd(),
                        "length": offset - start
                    };
                }
            } else if (metrics === ByteBuffer.METRICS_BYTES) {
                if (!this.noAssert) {
                    if (typeof offset !== 'number' || offset % 1 !== 0)
                        throw TypeError("Illegal offset: "+offset+" (not an integer)");
                    offset >>>= 0;
                    if (offset < 0 || offset + length > this.buffer.byteLength)
                        throw RangeError("Illegal offset: 0 <= "+offset+" (+"+length+") <= "+this.buffer.byteLength);
                }
                var k = offset + length;
                utfx.decodeUTF8toUTF16(function() {
                    return offset < k ? this.view.getUint8(offset++) : null;
                }.bind(this), sd = stringDestination(), this.noAssert);
                if (offset !== k)
                    throw RangeError("Illegal range: Truncated data, "+offset+" == "+k);
                if (relative) {
                    this.offset = offset;
                    return sd();
                } else {
                    return {
                        'string': sd(),
                        'length': offset - start
                    };
                }
            } else
                throw TypeError("Unsupported metrics: "+metrics);
        };
*/
        /**
         * Reads an UTF8 encoded string. This is an alias of {@link ByteBuffer#readUTF8String}.
         * @function
         * @param {number} length Number of characters or bytes to read
         * @param {number=} metrics Metrics specifying what `n` is meant to count. Defaults to
         *  {@link ByteBuffer.METRICS_CHARS}.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
         *  read and the actual number of bytes read.
         * @expose
         */
        //ByteBufferPrototype.readString = ByteBufferPrototype.readUTF8String;

        // types/strings/vstring

        /**
         * Writes a length as varint32 prefixed UTF8 encoded string.
         * @param {string} str String to write
         * @param {number=} offset Offset to write to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted.
         * @returns {!ByteBuffer|number} `this` if `offset` is omitted, else the actual number of bytes written
         * @expose
         * @see ByteBuffer#writeVarint32
         */
        ByteBufferPrototype.writeVString = function(str, offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof str !== 'string')
                    throw TypeError("Illegal str: Not a string");
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            var start = offset,
                k, l;
            k = utfx.calculateUTF16asUTF8(stringSource(str), this.noAssert)[1];
            l = ByteBuffer.calculateVarint32(k);
            offset += l+k;
            var capacity15 = this.buffer.byteLength;
            if (offset > capacity15)
                this.resize((capacity15 *= 2) > offset ? capacity15 : offset);
            offset -= l+k;
            offset += this.writeVarint32(k, offset);
            utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
                this.view.setUint8(offset++, b);
            }.bind(this));
            if (offset !== start+k+l)
                throw RangeError("Illegal range: Truncated data, "+offset+" == "+(offset+k+l));
            if (relative) {
                this.offset = offset;
                return this;
            }
            return offset - start;
        };

        /**
         * Reads a length as varint32 prefixed UTF8 encoded string.
         * @param {number=} offset Offset to read from. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {string|!{string: string, length: number}} The string read if offset is omitted, else the string
         *  read and the actual number of bytes read.
         * @expose
         * @see ByteBuffer#readVarint32
         *
        ByteBufferPrototype.readVString = function(offset) {
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 1 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+1+") <= "+this.buffer.byteLength);
            }
            var temp = this.readVarint32(offset),
                start = offset,
                str;
            offset += temp['length'];
            temp = temp['value'];
            var k = offset + temp,
                sd = stringDestination();
            utfx.decodeUTF8toUTF16(function() {
                return offset < k ? this.view.getUint8(offset++) : null;
            }.bind(this), sd, this.noAssert);
            str = sd();
            if (relative) {
                this.offset = offset;
                return str;
            } else {
                return {
                    'string': str,
                    'length': offset - start
                };
            }
        };
*/

        /**
         * Appends some data to this ByteBuffer. This will overwrite any contents behind the specified offset up to the appended
         *  data's length.
         * @param {!ByteBuffer|!ArrayBuffer|!Uint8Array|string} source Data to append. If `source` is a ByteBuffer, its offsets
         *  will be modified according to the performed read operation.
         * @param {(string|number)=} encoding Encoding if `data` is a string ("base64", "hex", "binary", defaults to "utf8")
         * @param {number=} offset Offset to append at. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         * @example A relative `<01 02>03.append(<04 05>)` will result in `<01 02 04 05>, 04 05|`
         * @example An absolute `<01 02>03.append(04 05>, 1)` will result in `<01 04>05, 04 05|`
         */
        ByteBufferPrototype.append = function(source, encoding, offset) {
            if (typeof encoding === 'number' || typeof encoding !== 'string') {
                offset = encoding;
                encoding = undefined;
            }
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            if (!(source instanceof ByteBuffer))
                source = ByteBuffer.wrap(source, encoding);
            var length = source.limit - source.offset;
            if (length <= 0) return this; // Nothing to append
            offset += length;
            var capacity16 = this.buffer.byteLength;
            if (offset > capacity16)
                this.resize((capacity16 *= 2) > offset ? capacity16 : offset);
            offset -= length;
            new Uint8Array(this.buffer, offset).set(new Uint8Array(source.buffer).subarray(source.offset, source.limit));
            source.offset += length;
            if (relative) this.offset += length;
            return this;
        };

        /**
         * Appends this ByteBuffer's contents to another ByteBuffer. This will overwrite any contents behind the specified
         *  offset up to the length of this ByteBuffer's data.
         * @param {!ByteBuffer} target Target ByteBuffer
         * @param {number=} offset Offset to append to. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  read if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         * @see ByteBuffer#append
         *
        ByteBufferPrototype.appendTo = function(target, offset) {
            target.append(this, offset);
            return this;
        };
*/

        /**
         * Enables or disables assertions of argument types and offsets. Assertions are enabled by default but you can opt to
         *  disable them if your code already makes sure that everything is valid.
         * @param {boolean} assert `true` to enable assertions, otherwise `false`
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.assert = function(assert) {
            this.noAssert = !assert;
            return this;
        };

        /**
         * Gets the capacity of this ByteBuffer's backing buffer.
         * @returns {number} Capacity of the backing buffer
         * @expose
         */
        ByteBufferPrototype.capacity = function() {
            return this.buffer.byteLength;
        };

        /**
         * Clears this ByteBuffer's offsets by setting {@link ByteBuffer#offset} to `0` and {@link ByteBuffer#limit} to the
         *  backing buffer's capacity. Discards {@link ByteBuffer#markedOffset}.
         * @returns {!ByteBuffer} this
         * @expose
         *
        ByteBufferPrototype.clear = function() {
            this.offset = 0;
            this.limit = this.buffer.byteLength;
            this.markedOffset = -1;
            return this;
        };
*/
        /**
         * Creates a cloned instance of this ByteBuffer, preset with this ByteBuffer's values for {@link ByteBuffer#offset},
         *  {@link ByteBuffer#markedOffset} and {@link ByteBuffer#limit}.
         * @param {boolean=} copy Whether to copy the backing buffer or to return another view on the same, defaults to `false`
         * @returns {!ByteBuffer} Cloned instance
         * @expose
         *
        ByteBufferPrototype.clone = function(copy) {
            var bb = new ByteBuffer(0, this.littleEndian, this.noAssert);
            if (copy) {
                var buffer = new ArrayBuffer(this.buffer.byteLength);
                new Uint8Array(buffer).set(this.buffer);
                bb.buffer = buffer;
                bb.view = new DataView(buffer);
            } else {
                bb.buffer = this.buffer;
                bb.view = this.view;
            }
            bb.offset = this.offset;
            bb.markedOffset = this.markedOffset;
            bb.limit = this.limit;
            return bb;
        };
*/
        /**
         * Compacts this ByteBuffer to be backed by a {@link ByteBuffer#buffer} of its contents' length. Contents are the bytes
         *  between {@link ByteBuffer#offset} and {@link ByteBuffer#limit}. Will set `offset = 0` and `limit = capacity` and
         *  adapt {@link ByteBuffer#markedOffset} to the same relative position if set.
         * @param {number=} begin Offset to start at, defaults to {@link ByteBuffer#offset}
         * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
         * @returns {!ByteBuffer} this
         * @expose
         *
        ByteBufferPrototype.compact = function(begin, end) {
            if (typeof begin === 'undefined') begin = this.offset;
            if (typeof end === 'undefined') end = this.limit;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            if (begin === 0 && end === this.buffer.byteLength)
                return this; // Already compacted
            var len = end - begin;
            if (len === 0) {
                this.buffer = EMPTY_BUFFER;
                this.view = null;
                if (this.markedOffset >= 0) this.markedOffset -= begin;
                this.offset = 0;
                this.limit = 0;
                return this;
            }
            var buffer = new ArrayBuffer(len);
            new Uint8Array(buffer).set(new Uint8Array(this.buffer).subarray(begin, end));
            this.buffer = buffer;
            this.view = new DataView(buffer);
            if (this.markedOffset >= 0) this.markedOffset -= begin;
            this.offset = 0;
            this.limit = len;
            return this;
        };
*/
        /**
         * Creates a copy of this ByteBuffer's contents. Contents are the bytes between {@link ByteBuffer#offset} and
         *  {@link ByteBuffer#limit}.
         * @param {number=} begin Begin offset, defaults to {@link ByteBuffer#offset}.
         * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
         * @returns {!ByteBuffer} Copy
         * @expose
         *
        ByteBufferPrototype.copy = function(begin, end) {
            if (typeof begin === 'undefined') begin = this.offset;
            if (typeof end === 'undefined') end = this.limit;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            if (begin === end)
                return new ByteBuffer(0, this.littleEndian, this.noAssert);
            var capacity = end - begin,
                bb = new ByteBuffer(capacity, this.littleEndian, this.noAssert);
            bb.offset = 0;
            bb.limit = capacity;
            if (bb.markedOffset >= 0) bb.markedOffset -= begin;
            this.copyTo(bb, 0, begin, end);
            return bb;
        };
*/
        /**
         * Copies this ByteBuffer's contents to another ByteBuffer. Contents are the bytes between {@link ByteBuffer#offset} and
         *  {@link ByteBuffer#limit}.
         * @param {!ByteBuffer} target Target ByteBuffer
         * @param {number=} targetOffset Offset to copy to. Will use and increase the target's {@link ByteBuffer#offset}
         *  by the number of bytes copied if omitted.
         * @param {number=} sourceOffset Offset to start copying from. Will use and increase {@link ByteBuffer#offset} by the
         *  number of bytes copied if omitted.
         * @param {number=} sourceLimit Offset to end copying from, defaults to {@link ByteBuffer#limit}
         * @returns {!ByteBuffer} this
         * @expose
         *
        ByteBufferPrototype.copyTo = function(target, targetOffset, sourceOffset, sourceLimit) {
            var relative,
                targetRelative;
            if (!this.noAssert) {
                if (!ByteBuffer.isByteBuffer(target))
                    throw TypeError("Illegal target: Not a ByteBuffer");
            }
            targetOffset = (targetRelative = typeof targetOffset === 'undefined') ? target.offset : targetOffset | 0;
            sourceOffset = (relative = typeof sourceOffset === 'undefined') ? this.offset : sourceOffset | 0;
            sourceLimit = typeof sourceLimit === 'undefined' ? this.limit : sourceLimit | 0;

            if (targetOffset < 0 || targetOffset > target.buffer.byteLength)
                throw RangeError("Illegal target range: 0 <= "+targetOffset+" <= "+target.buffer.byteLength);
            if (sourceOffset < 0 || sourceLimit > this.buffer.byteLength)
                throw RangeError("Illegal source range: 0 <= "+sourceOffset+" <= "+this.buffer.byteLength);

            var len = sourceLimit - sourceOffset;
            if (len === 0)
                return target; // Nothing to copy

            target.ensureCapacity(targetOffset + len);

            new Uint8Array(target.buffer).set(new Uint8Array(this.buffer).subarray(sourceOffset, sourceLimit), targetOffset);

            if (relative) this.offset += len;
            if (targetRelative) target.offset += len;

            return this;
        };*/

        /**
         * Makes sure that this ByteBuffer is backed by a {@link ByteBuffer#buffer} of at least the specified capacity. If the
         *  current capacity is exceeded, it will be doubled. If double the current capacity is less than the required capacity,
         *  the required capacity will be used instead.
         * @param {number} capacity Required capacity
         * @returns {!ByteBuffer} this
         * @expose
         *
        ByteBufferPrototype.ensureCapacity = function(capacity) {
            var current = this.buffer.byteLength;
            if (current < capacity)
                return this.resize((current *= 2) > capacity ? current : capacity);
            return this;
        };
*/
        /**
         * Overwrites this ByteBuffer's contents with the specified value. Contents are the bytes between
         *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}.
         * @param {number|string} value Byte value to fill with. If given as a string, the first character is used.
         * @param {number=} begin Begin offset. Will use and increase {@link ByteBuffer#offset} by the number of bytes
         *  written if omitted. defaults to {@link ByteBuffer#offset}.
         * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
         * @returns {!ByteBuffer} this
         * @expose
         * @example `someByteBuffer.clear().fill(0)` fills the entire backing buffer with zeroes
         *
        ByteBufferPrototype.fill = function(value, begin, end) {
            var relative = typeof begin === 'undefined';
            if (relative) begin = this.offset;
            if (typeof value === 'string' && value.length > 0)
                value = value.charCodeAt(0);
            if (typeof begin === 'undefined') begin = this.offset;
            if (typeof end === 'undefined') end = this.limit;
            if (!this.noAssert) {
                if (typeof value !== 'number' || value % 1 !== 0)
                    throw TypeError("Illegal value: "+value+" (not an integer)");
                value |= 0;
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            if (begin >= end)
                return this; // Nothing to fill
            while (begin < end) this.view.setUint8(begin++, value);
            if (relative) this.offset = begin;
            return this;
        };
*/
        /**
         * Makes this ByteBuffer ready for a new sequence of write or relative read operations. Sets `limit = offset` and
         *  `offset = 0`. Make sure always to flip a ByteBuffer when all relative read or write operations are complete.
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.flip = function() {
            this.limit = this.offset;
            this.offset = 0;
            return this;
        };
        /**
         * Marks an offset on this ByteBuffer to be used later.
         * @param {number=} offset Offset to mark. Defaults to {@link ByteBuffer#offset}.
         * @returns {!ByteBuffer} this
         * @throws {TypeError} If `offset` is not a valid number
         * @throws {RangeError} If `offset` is out of bounds
         * @see ByteBuffer#reset
         * @expose
         *
        ByteBufferPrototype.mark = function(offset) {
            offset = typeof offset === 'undefined' ? this.offset : offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            this.markedOffset = offset;
            return this;
        };*/
        /**
         * Sets the byte order.
         * @param {boolean} littleEndian `true` for little endian byte order, `false` for big endian
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.order = function(littleEndian) {
            if (!this.noAssert) {
                if (typeof littleEndian !== 'boolean')
                    throw TypeError("Illegal littleEndian: Not a boolean");
            }
            this.littleEndian = !!littleEndian;
            return this;
        };

        /**
         * Switches (to) little endian byte order.
         * @param {boolean=} littleEndian Defaults to `true`, otherwise uses big endian
         * @returns {!ByteBuffer} this
         * @expose
         */
        ByteBufferPrototype.LE = function(littleEndian) {
            this.littleEndian = typeof littleEndian !== 'undefined' ? !!littleEndian : true;
            return this;
        };

        /**
         * Switches (to) big endian byte order.
         * @param {boolean=} bigEndian Defaults to `true`, otherwise uses little endian
         * @returns {!ByteBuffer} this
         * @expose
         *
        ByteBufferPrototype.BE = function(bigEndian) {
            this.littleEndian = typeof bigEndian !== 'undefined' ? !bigEndian : false;
            return this;
        };
*/
        /**
         * Prepends some data to this ByteBuffer. This will overwrite any contents before the specified offset up to the
         *  prepended data's length. If there is not enough space available before the specified `offset`, the backing buffer
         *  will be resized and its contents moved accordingly.
         * @param {!ByteBuffer|string|!ArrayBuffer} source Data to prepend. If `source` is a ByteBuffer, its offset will be
         *  modified according to the performed read operation.
         * @param {(string|number)=} encoding Encoding if `data` is a string ("base64", "hex", "binary", defaults to "utf8")
         * @param {number=} offset Offset to prepend at. Will use and decrease {@link ByteBuffer#offset} by the number of bytes
         *  prepended if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         * @example A relative `00<01 02 03>.prepend(<04 05>)` results in `<04 05 01 02 03>, 04 05|`
         * @example An absolute `00<01 02 03>.prepend(<04 05>, 2)` results in `04<05 02 03>, 04 05|`
         *
        ByteBufferPrototype.prepend = function(source, encoding, offset) {
            if (typeof encoding === 'number' || typeof encoding !== 'string') {
                offset = encoding;
                encoding = undefined;
            }
            var relative = typeof offset === 'undefined';
            if (relative) offset = this.offset;
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: "+offset+" (not an integer)");
                offset >>>= 0;
                if (offset < 0 || offset + 0 > this.buffer.byteLength)
                    throw RangeError("Illegal offset: 0 <= "+offset+" (+"+0+") <= "+this.buffer.byteLength);
            }
            if (!(source instanceof ByteBuffer))
                source = ByteBuffer.wrap(source, encoding);
            var len = source.limit - source.offset;
            if (len <= 0) return this; // Nothing to prepend
            var diff = len - offset;
            var arrayView;
            if (diff > 0) { // Not enough space before offset, so resize + move
                var buffer = new ArrayBuffer(this.buffer.byteLength + diff);
                arrayView = new Uint8Array(buffer);
                arrayView.set(new Uint8Array(this.buffer).subarray(offset, this.buffer.byteLength), len);
                this.buffer = buffer;
                this.view = new DataView(buffer);
                this.offset += diff;
                if (this.markedOffset >= 0) this.markedOffset += diff;
                this.limit += diff;
                offset += diff;
            } else {
                arrayView = new Uint8Array(this.buffer);
            }
            arrayView.set(new Uint8Array(source.buffer).subarray(source.offset, source.limit), offset - len);
            source.offset = source.limit;
            if (relative)
                this.offset -= len;
            return this;
        };
*/

        /**
         * Prepends this ByteBuffer to another ByteBuffer. This will overwrite any contents before the specified offset up to the
         *  prepended data's length. If there is not enough space available before the specified `offset`, the backing buffer
         *  will be resized and its contents moved accordingly.
         * @param {!ByteBuffer} target Target ByteBuffer
         * @param {number=} offset Offset to prepend at. Will use and decrease {@link ByteBuffer#offset} by the number of bytes
         *  prepended if omitted.
         * @returns {!ByteBuffer} this
         * @expose
         * @see ByteBuffer#prepend
         *
        ByteBufferPrototype.prependTo = function(target, offset) {
            target.prepend(this, offset);
            return this;
        };
*/
        /**
         * Prints debug information about this ByteBuffer's contents.
         * @param {function(string)=} out Output function to call, defaults to console.log
         * @expose
         *
        ByteBufferPrototype.printDebug = function(out) {
            if (typeof out !== 'function') out = console.log.bind(console);
            out(
                this.toString()+"\n"+
                "-------------------------------------------------------------------\n"+
                this.toDebug(true)
            );
        };
*/
        /**
         * Gets the number of remaining readable bytes. Contents are the bytes between {@link ByteBuffer#offset} and
         *  {@link ByteBuffer#limit}, so this returns `limit - offset`.
         * @returns {number} Remaining readable bytes. May be negative if `offset > limit`.
         * @expose
         *
        ByteBufferPrototype.remaining = function() {
            return this.limit - this.offset;
        };*/
        /**
         * Resets this ByteBuffer's {@link ByteBuffer#offset}. If an offset has been marked through {@link ByteBuffer#mark}
         *  before, `offset` will be set to {@link ByteBuffer#markedOffset}, which will then be discarded. If no offset has been
         *  marked, sets `offset = 0`.
         * @returns {!ByteBuffer} this
         * @see ByteBuffer#mark
         * @expose
         *
        ByteBufferPrototype.reset = function() {
            if (this.markedOffset >= 0) {
                this.offset = this.markedOffset;
                this.markedOffset = -1;
            } else {
                this.offset = 0;
            }
            return this;
        };*/
        /**
         * Resizes this ByteBuffer to be backed by a buffer of at least the given capacity. Will do nothing if already that
         *  large or larger.
         * @param {number} capacity Capacity required
         * @returns {!ByteBuffer} this
         * @throws {TypeError} If `capacity` is not a number
         * @throws {RangeError} If `capacity < 0`
         * @expose
         */
        ByteBufferPrototype.resize = function(capacity) {
            if (!this.noAssert) {
                if (typeof capacity !== 'number' || capacity % 1 !== 0)
                    throw TypeError("Illegal capacity: "+capacity+" (not an integer)");
                capacity |= 0;
                if (capacity < 0)
                    throw RangeError("Illegal capacity: 0 <= "+capacity);
            }
            if (this.buffer.byteLength < capacity) {
                var buffer = new ArrayBuffer(capacity);
                new Uint8Array(buffer).set(new Uint8Array(this.buffer));
                this.buffer = buffer;
                this.view = new DataView(buffer);
            }
            return this;
        };
        /**
         * Reverses this ByteBuffer's contents.
         * @param {number=} begin Offset to start at, defaults to {@link ByteBuffer#offset}
         * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
         * @returns {!ByteBuffer} this
         * @expose

        ByteBufferPrototype.reverse = function(begin, end) {
            if (typeof begin === 'undefined') begin = this.offset;
            if (typeof end === 'undefined') end = this.limit;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            if (begin === end)
                return this; // Nothing to reverse
            Array.prototype.reverse.call(new Uint8Array(this.buffer).subarray(begin, end));
            this.view = new DataView(this.buffer); // FIXME: Why exactly is this necessary?
            return this;
        };*/
        /**
         * Skips the next `length` bytes. This will just advance
         * @param {number} length Number of bytes to skip. May also be negative to move the offset back.
         * @returns {!ByteBuffer} this
         * @expose
         *
        ByteBufferPrototype.skip = function(length) {
            if (!this.noAssert) {
                if (typeof length !== 'number' || length % 1 !== 0)
                    throw TypeError("Illegal length: "+length+" (not an integer)");
                length |= 0;
            }
            var offset = this.offset + length;
            if (!this.noAssert) {
                if (offset < 0 || offset > this.buffer.byteLength)
                    throw RangeError("Illegal length: 0 <= "+this.offset+" + "+length+" <= "+this.buffer.byteLength);
            }
            this.offset = offset;
            return this;
        };
*/
        /**
         * Slices this ByteBuffer by creating a cloned instance with `offset = begin` and `limit = end`.
         * @param {number=} begin Begin offset, defaults to {@link ByteBuffer#offset}.
         * @param {number=} end End offset, defaults to {@link ByteBuffer#limit}.
         * @returns {!ByteBuffer} Clone of this ByteBuffer with slicing applied, backed by the same {@link ByteBuffer#buffer}
         * @expose
         *
        ByteBufferPrototype.slice = function(begin, end) {
            if (typeof begin === 'undefined') begin = this.offset;
            if (typeof end === 'undefined') end = this.limit;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            var bb = this.clone();
            bb.offset = begin;
            bb.limit = end;
            return bb;
        };
*/
        /**
         * Returns a copy of the backing buffer that contains this ByteBuffer's contents. Contents are the bytes between
         *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}. Will transparently {@link ByteBuffer#flip} this
         *  ByteBuffer if `offset > limit` but the actual offsets remain untouched.
         * @param {boolean=} forceCopy If `true` returns a copy, otherwise returns a view referencing the same memory if
         *  possible. Defaults to `false`
         * @returns {!ArrayBuffer} Contents as an ArrayBuffer
         * @expose

        ByteBufferPrototype.toBufferx = function(forceCopy) {
            var offset = this.offset,
                limit = this.limit;
            if (offset > limit) {
                var t = offset;
                offset = limit;
                limit = t;
            }
            if (!this.noAssert) {
                if (typeof offset !== 'number' || offset % 1 !== 0)
                    throw TypeError("Illegal offset: Not an integer");
                offset >>>= 0;
                if (typeof limit !== 'number' || limit % 1 !== 0)
                    throw TypeError("Illegal limit: Not an integer");
                limit >>>= 0;
                if (offset < 0 || offset > limit || limit > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+offset+" <= "+limit+" <= "+this.buffer.byteLength);
            }
            // NOTE: It's not possible to have another ArrayBuffer reference the same memory as the backing buffer. This is
            // possible with Uint8Array#subarray only, but we have to return an ArrayBuffer by contract. So:
            if (!forceCopy && offset === 0 && limit === this.buffer.byteLength) {
                return this.buffer;
            }
            if (offset === limit) {
                return EMPTY_BUFFER;
            }
            var buffer = new ArrayBuffer(limit - offset);
            new Uint8Array(buffer).set(new Uint8Array(this.buffer).subarray(offset, limit), 0);
            return buffer;
        };
*/
        /**
         * Returns a raw buffer compacted to contain this ByteBuffer's contents. Contents are the bytes between
         *  {@link ByteBuffer#offset} and {@link ByteBuffer#limit}. Will transparently {@link ByteBuffer#flip} this
         *  ByteBuffer if `offset > limit` but the actual offsets remain untouched. This is an alias of
         *  {@link ByteBuffer#toBuffer}.
         * @function
         * @param {boolean=} forceCopy If `true` returns a copy, otherwise returns a view referencing the same memory.
         *  Defaults to `false`
         * @returns {!ArrayBuffer} Contents as an ArrayBuffer
         * @expose
         */
  //      ByteBufferPrototype.toArrayBuffer = ByteBufferPrototype.toBuffer;


        /**
         * Converts the ByteBuffer's contents to a string.
         * @param {string=} encoding Output encoding. Returns an informative string representation if omitted but also allows
         *  direct conversion to "utf8", "hex", "base64" and "binary" encoding. "debug" returns a hex representation with
         *  highlighted offsets.
         * @param {number=} begin Offset to begin at, defaults to {@link ByteBuffer#offset}
         * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}
         * @returns {string} String representation
         * @throws {Error} If `encoding` is invalid
         * @expose
         *

        ByteBufferPrototype.toString = function(encoding, begin, end) {
            if (typeof encoding === 'undefined')
                return "ByteBufferAB(offset="+this.offset+",markedOffset="+this.markedOffset+",limit="+this.limit+",capacity="+this.capacity()+")";
            if (typeof encoding === 'number')
                encoding = "utf8",
                begin = encoding,
                end = begin;
            switch (encoding) {
                case "utf8":
                    return this.toUTF8(begin, end);
                case "base64":
                    return this.toBase64(begin, end);
                case "hex":
                    return this.toHex(begin, end);
                case "binary":
                    return this.toBinary(begin, end);
                case "debug":
                    return this.toDebug();
                case "columns":
                    return this.toColumns();
                default:
                    throw Error("Unsupported encoding: "+encoding);
            }
        };
*/
        // lxiv-embeddable
      //---------------------
        /**
         * lxiv-embeddable (c) 2014 Daniel Wirtz <dcode@dcode.io>
         * Released under the Apache License, Version 2.0
         * see: https://github.com/dcodeIO/lxiv for details
         */
        var lxiv = function() {
            "use strict";

            /**
             * lxiv namespace.
             * @type {!Object.<string,*>}
             * @exports lxiv
             */
            var lxiv = {};

            /**
             * Character codes for output.
             * @type {!Array.<number>}
             * @inner
             */
            var aout = [
                65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
                81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102,
                103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118,
                119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47
            ];

            /**
             * Character codes for input.
             * @type {!Array.<number>}
             * @inner
             */
            var ain = [];
            for (var i=0, k=aout.length; i<k; ++i)
                ain[aout[i]] = i;

            /**
             * Encodes bytes to base64 char codes.
             * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if
             *  there are no more bytes left.
             * @param {!function(number)} dst Characters destination as a function successively called with each encoded char
             *  code.
             */
            lxiv.encode = function(src, dst) {
                var b, t;
                while ((b = src()) !== null) {
                    dst(aout[(b>>2)&0x3f]);
                    t = (b&0x3)<<4;
                    if ((b = src()) !== null) {
                        t |= (b>>4)&0xf;
                        dst(aout[(t|((b>>4)&0xf))&0x3f]);
                        t = (b&0xf)<<2;
                        if ((b = src()) !== null)
                            dst(aout[(t|((b>>6)&0x3))&0x3f]),
                            dst(aout[b&0x3f]);
                        else
                            dst(aout[t&0x3f]),
                            dst(61);
                    } else
                        dst(aout[t&0x3f]),
                        dst(61),
                        dst(61);
                }
            };
//---------------------
            /**
             * Decodes base64 char codes to bytes.
             * @param {!function():number|null} src Characters source as a function returning the next char code respectively
             *  `null` if there are no more characters left.
             * @param {!function(number)} dst Bytes destination as a function successively called with the next byte.
             * @throws {Error} If a character code is invalid

            lxiv.decode = function(src, dst) {
                var c, t1, t2;
                function fail(c) {
                    throw Error("Illegal character code: "+c);
                }
                while ((c = src()) !== null) {
                    t1 = ain[c];
                    if (typeof t1 === 'undefined') fail(c);
                    if ((c = src()) !== null) {
                        t2 = ain[c];
                        if (typeof t2 === 'undefined') fail(c);
                        dst((t1<<2)>>>0|(t2&0x30)>>4);
                        if ((c = src()) !== null) {
                            t1 = ain[c];
                            if (typeof t1 === 'undefined')
                                if (c === 61) break; else fail(c);
                            dst(((t2&0xf)<<4)>>>0|(t1&0x3c)>>2);
                            if ((c = src()) !== null) {
                                t2 = ain[c];
                                if (typeof t2 === 'undefined')
                                    if (c === 61) break; else fail(c);
                                dst(((t1&0x3)<<6)>>>0|t2);
                            }
                        }
                    }
                }
            };
*/
            /**
             * Tests if a string is valid base64.
             * @param {string} str String to test
             * @returns {boolean} `true` if valid, otherwise `false`
             *
            lxiv.test = function(str) {
                return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str);
            };
*/
            return lxiv;
        }();


        // encodings/base64

        /**
         * Encodes this ByteBuffer's contents to a base64 encoded string.
         * @param {number=} begin Offset to begin at, defaults to {@link ByteBuffer#offset}.
         * @param {number=} end Offset to end at, defaults to {@link ByteBuffer#limit}.
         * @returns {string} Base64 encoded string
         * @expose
         */
        ByteBufferPrototype.toBase64 = function(begin, end) {
            if (typeof begin === 'undefined')
                begin = this.offset;
            if (typeof end === 'undefined')
                end = this.limit;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            var sd; lxiv.encode(function() {
                return begin < end ? this.view.getUint8(begin++) : null;
            }.bind(this), sd = stringDestination());
            return sd();
        };


/*        ByteBufferPrototype.toBase85 = function() {
      var ASCII85_ENC_START = ''//'<~';
      var ASCII85_ENC_END   = ''//'~>';

      var enctable = {
    0:  '!',
    1:  '"',
    2:  '#',
    3:  '$',
    4:  '%',
    5:  '&',
    6:  '\'',
    7:  '(',
    8:  ')',
    9:  '*',
    10: '+',
    11: ',',
    12: '-',
    13: '.',
    14: '/',
    15: '0',
    16: '1',
    17: '2',
    18: '3',
    19: '4',
    20: '5',
    21: '6',
    22: '7',
    23: '8',
    24: '9',
    25: ':',
    26: ';',
    27: '<',
    28: '=',
    29: '>',
    30: '?',
    31: '@',
    32: 'A',
    33: 'B',
    34: 'C',
    35: 'D',
    36: 'E',
    37: 'F',
    38: 'G',
    39: 'H',
    40: 'I',
    41: 'J',
    42: 'K',
    43: 'L',
    44: 'M',
    45: 'N',
    46: 'O',
    47: 'P',
    48: 'Q',
    49: 'R',
    50: 'S',
    51: 'T',
    52: 'U',
    53: 'V',
    54: 'W',
    55: 'X',
    56: 'Y',
    57: 'Z',
    58: '[',
    59: '\\',
    60: ']',
    61: '^',
    62: '_',
    63: '`',
    64: 'a',
    65: 'b',
    66: 'c',
    67: 'd',
    68: 'e',
    69: 'f',
    70: 'g',
    71: 'h',
    72: 'i',
    73: 'j',
    74: 'k',
    75: 'l',
    76: 'm',
    77: 'n',
    78: 'o',
    79: 'p',
    80: 'q',
    81: 'r',
    82: 's',
    83: 't',
    84: 'u'
      };
            var buffer = this.buffer;
            var bufferLength = buffer.byteLength;
      var padding = (bufferLength % 4 === 0) ? 0 : 4 - bufferLength % 4;

      var result = '';
      for (var i = 0; i < bufferLength; i += 4) {
    *//* 32 bit number of the current 4 bytes (padded with 0 as necessary) *//*
    var num = ((this.readUint8(i) << 24) >>> 0) +
        ((((i + 1) >= bufferLength ? 0 : this.readUint8((i + 1))) << 16) >>> 0) +
        ((((i + 2) >= bufferLength ? 0 : this.readUint8((i + 2))) <<  8) >>> 0) +
        ((((i + 3) >= bufferLength ? 0 : this.readUint8((i + 3))) <<  0) >>> 0);
    *//* Create 5 characters from '!' to 'u' alphabet *//*
    var block = [];

    for (var j = 0; j < 5; j++) {
        block.unshift(enctable[num % 85]);
        num = Math.floor(num / 85);
    }

    *//* And append them to the result *//*
    result += block.join('');
      }

      return ASCII85_ENC_START +
    result.substring(0, result.length - padding) +
    ASCII85_ENC_END;
  };*/

        /**
         * Decodes a base64 encoded string to a ByteBuffer.
         * @param {string} str String to decode
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer} ByteBuffer
         * @expose
         *
        ByteBuffer.fromBase64 = function(str, littleEndian, noAssert) {
            if (!noAssert) {
                if (typeof str !== 'string')
                    throw TypeError("Illegal str: Not a string");
                if (str.length % 4 !== 0)
                    throw TypeError("Illegal str: Length not a multiple of 4");
            }
            var bb = new ByteBuffer(str.length/4*3, littleEndian, noAssert),
                i = 0;
            lxiv.decode(stringSource(str), function(b) {
                bb.view.setUint8(i++, b);
            });
            bb.limit = i;
            return bb;
        };
*/
        /**
         * Encodes a binary string to base64 like `window.btoa` does.
         * @param {string} str Binary string
         * @returns {string} Base64 encoded string
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.btoa
         * @expose
         *
        ByteBuffer.btoa = function(str) {
            return ByteBuffer.fromBinary(str).toBase64();
        };
*/
        /**
         * Decodes a base64 encoded string to binary like `window.atob` does.
         * @param {string} b64 Base64 encoded string
         * @returns {string} Binary string
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.atob
         * @expose
         *
        ByteBuffer.atob = function(b64) {
            return ByteBuffer.fromBase64(b64).toBinary();
        };
*/

        // encodings/binary

        /**
         * Encodes this ByteBuffer to a binary encoded string, that is using only characters 0x00-0xFF as bytes.
         * @param {number=} begin Offset to begin at. Defaults to {@link ByteBuffer#offset}.
         * @param {number=} end Offset to end at. Defaults to {@link ByteBuffer#limit}.
         * @returns {string} Binary encoded string
         * @throws {RangeError} If `offset > limit`
         * @expose
         *
        ByteBufferPrototype.toBinary = function(begin, end) {
            begin = typeof begin === 'undefined' ? this.offset : begin;
            end = typeof end === 'undefined' ? this.limit : end;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            if (begin === end)
                return "";
            var cc = [], pt = [];
            while (begin < end) {
                cc.push(this.view.getUint8(begin++));
                if (cc.length >= 1024)
                    pt.push(String.fromCharCode.apply(String, cc)),
                    cc = [];
            }
            return pt.join('') + String.fromCharCode.apply(String, cc);
        };
*/
        /**
         * Decodes a binary encoded string, that is using only characters 0x00-0xFF as bytes, to a ByteBuffer.
         * @param {string} str String to decode
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer} ByteBuffer
         * @expose
         *
        ByteBuffer.fromBinary = function(str, littleEndian, noAssert) {
            if (!noAssert) {
                if (typeof str !== 'string')
                    throw TypeError("Illegal str: Not a string");
            }
            var i = 0, k = str.length, charCode,
                bb = new ByteBuffer(k, littleEndian, noAssert);
            while (i<k) {
                charCode = str.charCodeAt(i);
                if (!noAssert && charCode > 255)
                    throw RangeError("Illegal charCode at "+i+": 0 <= "+charCode+" <= 255");
                bb.view.setUint8(i++, charCode);
            }
            bb.limit = k;
            return bb;
        };
*/
        // encodings/debug

        /**
         * Encodes this ByteBuffer to a hex encoded string with marked offsets. Offset symbols are:
         * * `<` : offset,
         * * `'` : markedOffset,
         * * `>` : limit,
         * * `|` : offset and limit,
         * * `[` : offset and markedOffset,
         * * `]` : markedOffset and limit,
         * * `!` : offset, markedOffset and limit
         * @param {boolean=} columns If `true` returns two columns hex + ascii, defaults to `false`
         * @returns {string|!Array.<string>} Debug string or array of lines if `asArray = true`
         * @expose
         * @example `>00'01 02<03` contains four bytes with `limit=0, markedOffset=1, offset=3`
         * @example `00[01 02 03>` contains four bytes with `offset=markedOffset=1, limit=4`
         * @example `00|01 02 03` contains four bytes with `offset=limit=1, markedOffset=-1`
         * @example `|` contains zero bytes with `offset=limit=0, markedOffset=-1`
         *
        ByteBufferPrototype.toDebug = function(columns) {
            var i = -1,
                k = this.buffer.byteLength,
                b,
                hex = "",
                asc = "",
                out = "";
            while (i<k) {
                if (i !== -1) {
                    b = this.view.getUint8(i);
                    if (b < 0x10) hex += "0"+b.toString(16).toUpperCase();
                    else hex += b.toString(16).toUpperCase();
                    if (columns) {
                        asc += b > 32 && b < 127 ? String.fromCharCode(b) : '.';
                    }
                }
                ++i;
                if (columns) {
                    if (i > 0 && i % 16 === 0 && i !== k) {
                        while (hex.length < 3*16+3) hex += " ";
                        out += hex+asc+"\n";
                        hex = asc = "";
                    }
                }
                if (i === this.offset && i === this.limit)
                    hex += i === this.markedOffset ? "!" : "|";
                else if (i === this.offset)
                    hex += i === this.markedOffset ? "[" : "<";
                else if (i === this.limit)
                    hex += i === this.markedOffset ? "]" : ">";
                else
                    hex += i === this.markedOffset ? "'" : (columns || (i !== 0 && i !== k) ? " " : "");
            }
            if (columns && hex !== " ") {
                while (hex.length < 3*16+3) hex += " ";
                out += hex+asc+"\n";
            }
            return columns ? out : hex;
        };
*/
        /**
         * Decodes a hex encoded string with marked offsets to a ByteBuffer.
         * @param {string} str Debug string to decode (not be generated with `columns = true`)
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer} ByteBuffer
         * @expose
         * @see ByteBuffer#toDebug

        ByteBuffer.fromDebug = function(str, littleEndian, noAssert) {
            var k = str.length,
                bb = new ByteBuffer(((k+1)/3)|0, littleEndian, noAssert);
            var i = 0, j = 0, ch, b,
                rs = false, // Require symbol next
                ho = false, hm = false, hl = false, // Already has offset, markedOffset, limit?
                fail = false;
            while (i<k) {
                switch (ch = str.charAt(i++)) {
                    case '!':
                        if (!noAssert) {
                            if (ho || hm || hl) {
                                fail = true; break;
                            }
                            ho = hm = hl = true;
                        }
                        bb.offset = bb.markedOffset = bb.limit = j;
                        rs = false;
                        break;
                    case '|':
                        if (!noAssert) {
                            if (ho || hl) {
                                fail = true; break;
                            }
                            ho = hl = true;
                        }
                        bb.offset = bb.limit = j;
                        rs = false;
                        break;
                    case '[':
                        if (!noAssert) {
                            if (ho || hm) {
                                fail = true; break;
                            }
                            ho = hm = true;
                        }
                        bb.offset = bb.markedOffset = j;
                        rs = false;
                        break;
                    case '<':
                        if (!noAssert) {
                            if (ho) {
                                fail = true; break;
                            }
                            ho = true;
                        }
                        bb.offset = j;
                        rs = false;
                        break;
                    case ']':
                        if (!noAssert) {
                            if (hl || hm) {
                                fail = true; break;
                            }
                            hl = hm = true;
                        }
                        bb.limit = bb.markedOffset = j;
                        rs = false;
                        break;
                    case '>':
                        if (!noAssert) {
                            if (hl) {
                                fail = true; break;
                            }
                            hl = true;
                        }
                        bb.limit = j;
                        rs = false;
                        break;
                    case "'":
                        if (!noAssert) {
                            if (hm) {
                                fail = true; break;
                            }
                            hm = true;
                        }
                        bb.markedOffset = j;
                        rs = false;
                        break;
                    case ' ':
                        rs = false;
                        break;
                    default:
                        if (!noAssert) {
                            if (rs) {
                                fail = true; break;
                            }
                        }
                        b = parseInt(ch+str.charAt(i++), 16);
                        if (!noAssert) {
                            if (isNaN(b) || b < 0 || b > 255)
                                throw TypeError("Illegal str: Not a debug encoded string");
                        }
                        bb.view.setUint8(j++, b);
                        rs = true;
                }
                if (fail)
                    throw TypeError("Illegal str: Invalid symbol at "+i);
            }
            if (!noAssert) {
                if (!ho || !hl)
                    throw TypeError("Illegal str: Missing offset or limit");
                if (j<bb.buffer.byteLength)
                    throw TypeError("Illegal str: Not a debug encoded string (is it hex?) "+j+" < "+k);
            }
            return bb;
        };
*/
        // encodings/hex

        /**
         * Encodes this ByteBuffer's contents to a hex encoded string.
         * @param {number=} begin Offset to begin at. Defaults to {@link ByteBuffer#offset}.
         * @param {number=} end Offset to end at. Defaults to {@link ByteBuffer#limit}.
         * @returns {string} Hex encoded string
         * @expose
         *
        ByteBufferPrototype.toHex = function(begin, end) {
            begin = typeof begin === 'undefined' ? this.offset : begin;
            end = typeof end === 'undefined' ? this.limit : end;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            var out = new Array(end - begin),
                b;
            while (begin < end) {
                b = this.view.getUint8(begin++);
                if (b < 0x10)
                    out.push("0", b.toString(16));
                else out.push(b.toString(16));
            }
            return out.join('');
        };
*/
        /**
         * Decodes a hex encoded string to a ByteBuffer.
         * @param {string} str String to decode
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer} ByteBuffer
         * @expose

        ByteBuffer.fromHex = function(str, littleEndian, noAssert) {
            if (!noAssert) {
                if (typeof str !== 'string')
                    throw TypeError("Illegal str: Not a string");
                if (str.length % 2 !== 0)
                    throw TypeError("Illegal str: Length not a multiple of 2");
            }
            var k = str.length,
                bb = new ByteBuffer((k / 2) | 0, littleEndian),
                b;
            for (var i=0, j=0; i<k; i+=2) {
                b = parseInt(str.substring(i, i+2), 16);
                if (!noAssert)
                    if (!isFinite(b) || b < 0 || b > 255)
                        throw TypeError("Illegal str: Contains non-hex characters");
                bb.view.setUint8(j++, b);
            }
            bb.limit = j;
            return bb;
        };
*/
        // utfx-embeddable

        /**
         * utfx-embeddable (c) 2014 Daniel Wirtz <dcode@dcode.io>
         * Released under the Apache License, Version 2.0
         * see: https://github.com/dcodeIO/utfx for details
         */
        var utfx = function() {
            "use strict";

            /**
             * utfx namespace.
             * @inner
             * @type {!Object.<string,*>}
             */
            var utfx = {};

            /**
             * Maximum valid code point.
             * @type {number}
             * @const
             */
            utfx.MAX_CODEPOINT = 0x10FFFF;

            /**
             * Encodes UTF8 code points to UTF8 bytes.
             * @param {(!function():number|null) | number} src Code points source, either as a function returning the next code point
             *  respectively `null` if there are no more code points left or a single numeric code point.
             * @param {!function(number)} dst Bytes destination as a function successively called with the next byte
             */
            utfx.encodeUTF8 = function(src, dst) {
                var cp = null;
                if (typeof src === 'number')
                    cp = src,
                    src = function() { return null; };
                while (cp !== null || (cp = src()) !== null) {
                    if (cp < 0x80)
                        dst(cp&0x7F);
                    else if (cp < 0x800)
                        dst(((cp>>6)&0x1F)|0xC0),
                        dst((cp&0x3F)|0x80);
                    else if (cp < 0x10000)
                        dst(((cp>>12)&0x0F)|0xE0),
                        dst(((cp>>6)&0x3F)|0x80),
                        dst((cp&0x3F)|0x80);
                    else
                        dst(((cp>>18)&0x07)|0xF0),
                        dst(((cp>>12)&0x3F)|0x80),
                        dst(((cp>>6)&0x3F)|0x80),
                        dst((cp&0x3F)|0x80);
                    cp = null;
                }
            };

            /**
             * Decodes UTF8 bytes to UTF8 code points.
             * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if there
             *  are no more bytes left.
             * @param {!function(number)} dst Code points destination as a function successively called with each decoded code point.
             * @throws {RangeError} If a starting byte is invalid in UTF8
             * @throws {Error} If the last sequence is truncated. Has an array property `bytes` holding the
             *  remaining bytes.

            utfx.decodeUTF8 = function(src, dst) {
                var a, b, c, d, fail = function(b) {
                    b = b.slice(0, b.indexOf(null));
                    var err = Error(b.toString());
                    err.name = "TruncatedError";
                    err['bytes'] = b;
                    throw err;
                };
                while ((a = src()) !== null) {
                    if ((a&0x80) === 0)
                        dst(a);
                    else if ((a&0xE0) === 0xC0)
                        ((b = src()) === null) && fail([a, b]),
                        dst(((a&0x1F)<<6) | (b&0x3F));
                    else if ((a&0xF0) === 0xE0)
                        ((b=src()) === null || (c=src()) === null) && fail([a, b, c]),
                        dst(((a&0x0F)<<12) | ((b&0x3F)<<6) | (c&0x3F));
                    else if ((a&0xF8) === 0xF0)
                        ((b=src()) === null || (c=src()) === null || (d=src()) === null) && fail([a, b, c ,d]),
                        dst(((a&0x07)<<18) | ((b&0x3F)<<12) | ((c&0x3F)<<6) | (d&0x3F));
                    else throw RangeError("Illegal starting byte: "+a);
                }
            };
*/
            /**
             * Converts UTF16 characters to UTF8 code points.
             * @param {!function():number|null} src Characters source as a function returning the next char code respectively
             *  `null` if there are no more characters left.
             * @param {!function(number)} dst Code points destination as a function successively called with each converted code
             *  point.
             */
            utfx.UTF16toUTF8 = function(src, dst) {
                var c1, c2 = null;
                while (true) {
                    if ((c1 = c2 !== null ? c2 : src()) === null)
                        break;
                    if (c1 >= 0xD800 && c1 <= 0xDFFF) {
                        if ((c2 = src()) !== null) {
                            if (c2 >= 0xDC00 && c2 <= 0xDFFF) {
                                dst((c1-0xD800)*0x400+c2-0xDC00+0x10000);
                                c2 = null; continue;
                            }
                        }
                    }
                    dst(c1);
                }
                if (c2 !== null) dst(c2);
            };

            /**
             * Converts UTF8 code points to UTF16 characters.
             * @param {(!function():number|null) | number} src Code points source, either as a function returning the next code point
             *  respectively `null` if there are no more code points left or a single numeric code point.
             * @param {!function(number)} dst Characters destination as a function successively called with each converted char code.
             * @throws {RangeError} If a code point is out of range
             *
            utfx.UTF8toUTF16 = function(src, dst) {
                var cp = null;
                if (typeof src === 'number')
                    cp = src, src = function() { return null; };
                while (cp !== null || (cp = src()) !== null) {
                    if (cp <= 0xFFFF)
                        dst(cp);
                    else
                        cp -= 0x10000,
                        dst((cp>>10)+0xD800),
                        dst((cp%0x400)+0xDC00);
                    cp = null;
                }
            };
*/
            /**
             * Converts and encodes UTF16 characters to UTF8 bytes.
             * @param {!function():number|null} src Characters source as a function returning the next char code respectively `null`
             *  if there are no more characters left.
             * @param {!function(number)} dst Bytes destination as a function successively called with the next byte.
             */
            utfx.encodeUTF16toUTF8 = function(src, dst) {
                utfx.UTF16toUTF8(src, function(cp) {
                    utfx.encodeUTF8(cp, dst);
                });
            };

            /**
             * Decodes and converts UTF8 bytes to UTF16 characters.
             * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if there
             *  are no more bytes left.
             * @param {!function(number)} dst Characters destination as a function successively called with each converted char code.
             * @throws {RangeError} If a starting byte is invalid in UTF8
             * @throws {Error} If the last sequence is truncated. Has an array property `bytes` holding the remaining bytes.
             */
            utfx.decodeUTF8toUTF16 = function(src, dst) {
                utfx.decodeUTF8(src, function(cp) {
                    utfx.UTF8toUTF16(cp, dst);
                });
            };

            /**
             * Calculates the byte length of an UTF8 code point.
             * @param {number} cp UTF8 code point
             * @returns {number} Byte length
             */
            utfx.calculateCodePoint = function(cp) {
                return (cp < 0x80) ? 1 : (cp < 0x800) ? 2 : (cp < 0x10000) ? 3 : 4;
            };

            /**
             * Calculates the number of UTF8 bytes required to store UTF8 code points.
             * @param {(!function():number|null)} src Code points source as a function returning the next code point respectively
             *  `null` if there are no more code points left.
             * @returns {number} The number of UTF8 bytes required
             */
            utfx.calculateUTF8 = function(src) {
                var cp, l=0;
                while ((cp = src()) !== null)
                    l += utfx.calculateCodePoint(cp);
                return l;
            };

            /**
             * Calculates the number of UTF8 code points respectively UTF8 bytes required to store UTF16 char codes.
             * @param {(!function():number|null)} src Characters source as a function returning the next char code respectively
             *  `null` if there are no more characters left.
             * @returns {!Array.<number>} The number of UTF8 code points at index 0 and the number of UTF8 bytes required at index 1.
             */
            utfx.calculateUTF16asUTF8 = function(src) {
                var n=0, l=0;
                utfx.UTF16toUTF8(src, function(cp) {
                    ++n; l += utfx.calculateCodePoint(cp);
                });
                return [n,l];
            };

            return utfx;
        }();

        // encodings/utf8

        /**
         * Encodes this ByteBuffer's contents between {@link ByteBuffer#offset} and {@link ByteBuffer#limit} to an UTF8 encoded
         *  string.
         * @returns {string} Hex encoded string
         * @throws {RangeError} If `offset > limit`
         * @expose

        ByteBufferPrototype.toUTF8 = function(begin, end) {
            if (typeof begin === 'undefined') begin = this.offset;
            if (typeof end === 'undefined') end = this.limit;
            if (!this.noAssert) {
                if (typeof begin !== 'number' || begin % 1 !== 0)
                    throw TypeError("Illegal begin: Not an integer");
                begin >>>= 0;
                if (typeof end !== 'number' || end % 1 !== 0)
                    throw TypeError("Illegal end: Not an integer");
                end >>>= 0;
                if (begin < 0 || begin > end || end > this.buffer.byteLength)
                    throw RangeError("Illegal range: 0 <= "+begin+" <= "+end+" <= "+this.buffer.byteLength);
            }
            var sd; try {
                utfx.decodeUTF8toUTF16(function() {
                    return begin < end ? this.view.getUint8(begin++) : null;
                }.bind(this), sd = stringDestination());
            } catch (e) {
                if (begin !== end)
                    throw RangeError("Illegal range: Truncated data, "+begin+" != "+end);
            }
            return sd();
        };
*/
        /**
         * Decodes an UTF8 encoded string to a ByteBuffer.
         * @param {string} str String to decode
         * @param {boolean=} littleEndian Whether to use little or big endian byte order. Defaults to
         *  {@link ByteBuffer.DEFAULT_ENDIAN}.
         * @param {boolean=} noAssert Whether to skip assertions of offsets and values. Defaults to
         *  {@link ByteBuffer.DEFAULT_NOASSERT}.
         * @returns {!ByteBuffer} ByteBuffer
         * @expose

        ByteBuffer.fromUTF8 = function(str, littleEndian, noAssert) {
            if (!noAssert)
                if (typeof str !== 'string')
                    throw TypeError("Illegal str: Not a string");
            var bb = new ByteBuffer(utfx.calculateUTF16asUTF8(stringSource(str), true)[1], littleEndian, noAssert),
                i = 0;
            utfx.encodeUTF16toUTF8(stringSource(str), function(b) {
                bb.view.setUint8(i++, b);
            });
            bb.limit = i;
            return bb;
        };*/


        return ByteBuffer;
    }


        (global.com.adtech.dcodeIO = global.com.adtech.dcodeIO || {})['ByteBuffer'] =
            loadByteBuffer(global.com.adtech.dcodeIO['Long']);
})(this);
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
}());
/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @license ProtoBuf.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/ProtoBuf.js for details
 */
(function(global) {
    "use strict";

    function init(ByteBuffer) {

        /**
         * The ProtoBuf namespace.
         * @exports ProtoBuf
         * @namespace
         * @expose
         */
        var ProtoBuf = {};

        /**
         * ProtoBuf.js version.
         * @type {string}
         * @const
         * @expose
         */
        ProtoBuf.VERSION = "4.0.0-pre";

        /**
         * Wire types.
         * @type {Object.<string,number>}
         * @const
         * @expose
         */
        ProtoBuf.WIRE_TYPES = {};

        /**
         * Varint wire type.
         * @type {number}
         * @expose
         */
        ProtoBuf.WIRE_TYPES.VARINT = 0;

        /**
         * Fixed 64 bits wire type.
         * @type {number}
         * @const
         * @expose
         */
        ProtoBuf.WIRE_TYPES.BITS64 = 1;

        /**
         * Length delimited wire type.
         * @type {number}
         * @const
         * @expose
         */
        ProtoBuf.WIRE_TYPES.LDELIM = 2;

        /**
         * Start group wire type.
         * @type {number}
         * @const
         * @expose
         */
        ProtoBuf.WIRE_TYPES.STARTGROUP = 3;

        /**
         * End group wire type.
         * @type {number}
         * @const
         * @expose
         */
        ProtoBuf.WIRE_TYPES.ENDGROUP = 4;

        /**
         * Fixed 32 bits wire type.
         * @type {number}
         * @const
         * @expose
         */
        ProtoBuf.WIRE_TYPES.BITS32 = 5;

        /**
         * Packable wire types.
         * @type {!Array.<number>}
         * @const
         * @expose
         */
        ProtoBuf.PACKABLE_WIRE_TYPES = [
            ProtoBuf.WIRE_TYPES.VARINT,
            ProtoBuf.WIRE_TYPES.BITS64,
            ProtoBuf.WIRE_TYPES.BITS32
        ];

        /**
         * Types.
         * @dict
         * @type {Object.<string,{name: string, wireType: number}>}
         * @const
         * @expose
         */
        ProtoBuf.TYPES = {
            // According to the protobuf spec.
            "int32": {
                name: "int32",
                wireType: ProtoBuf.WIRE_TYPES.VARINT
            },
            "uint32": {
                name: "uint32",
                wireType: ProtoBuf.WIRE_TYPES.VARINT
            },
            "sint32": {
                name: "sint32",
                wireType: ProtoBuf.WIRE_TYPES.VARINT
            },
            "int64": {
                name: "int64",
                wireType: ProtoBuf.WIRE_TYPES.VARINT
            },
            "uint64": {
                name: "uint64",
                wireType: ProtoBuf.WIRE_TYPES.VARINT
            },
            "sint64": {
                name: "sint64",
                wireType: ProtoBuf.WIRE_TYPES.VARINT
            },
            "bool": {
                name: "bool",
                wireType: ProtoBuf.WIRE_TYPES.VARINT
            },
            "double": {
                name: "double",
                wireType: ProtoBuf.WIRE_TYPES.BITS64
            },
            "string": {
                name: "string",
                wireType: ProtoBuf.WIRE_TYPES.LDELIM
            },
            "bytes": {
                name: "bytes",
                wireType: ProtoBuf.WIRE_TYPES.LDELIM
            },
            "fixed32": {
                name: "fixed32",
                wireType: ProtoBuf.WIRE_TYPES.BITS32
            },
            "sfixed32": {
                name: "sfixed32",
                wireType: ProtoBuf.WIRE_TYPES.BITS32
            },
            "fixed64": {
                name: "fixed64",
                wireType: ProtoBuf.WIRE_TYPES.BITS64
            },
            "sfixed64": {
                name: "sfixed64",
                wireType: ProtoBuf.WIRE_TYPES.BITS64
            },
            "float": {
                name: "float",
                wireType: ProtoBuf.WIRE_TYPES.BITS32
            },
            "enum": {
                name: "enum",
                wireType: ProtoBuf.WIRE_TYPES.VARINT
            },
            "message": {
                name: "message",
                wireType: ProtoBuf.WIRE_TYPES.LDELIM
            },
            "group": {
                name: "group",
                wireType: ProtoBuf.WIRE_TYPES.STARTGROUP
            }
        };

        /**
         * Minimum field id.
         * @type {number}
         * @const
         * @expose
         */
        ProtoBuf.ID_MIN = 1;

        /**
         * Maximum field id.
         * @type {number}
         * @const
         * @expose
         */
        ProtoBuf.ID_MAX = 0x1FFFFFFF;

        /**
         * @type {!function(new: ByteBuffer, ...[*])}
         * @expose
         */
        ProtoBuf.ByteBuffer = ByteBuffer;

        /**
         * @type {?function(new: Long, ...[*])}
         * @expose
         */
        ProtoBuf.Long = ByteBuffer.Long || null;

        /**
         * If set to `true`, field names will be converted from underscore notation to camel case. Defaults to `false`.
         *  Must be set prior to parsing.
         * @type {boolean}
         * @expose
         */
//        ProtoBuf.convertFieldsToCamelCase = false;

        /**
         * By default, messages are populated with (setX, set_x) accessors for each field. This can be disabled by
         *  setting this to `false` prior to building messages.
         * @type {boolean}
         * @expose
         */
        ProtoBuf.populateAccessors = true;

        /**
         * @alias ProtoBuf.Util
         * @expose
         */
        ProtoBuf.Util = (function() {
            "use strict";

            // Object.create polyfill
            // ref: https://developer.mozilla.org/de/docs/JavaScript/Reference/Global_Objects/Object/create
            if (!Object.create)
                /** @expose */
                Object.create = function (o) {
                    if (arguments.length > 1)
                        throw Error('Object.create polyfill only accepts the first parameter.');
                    function F() {}
                    F.prototype = o;
                    return new F();
                };

            /**
             * ProtoBuf utilities.
             * @exports ProtoBuf.Util
             * @namespace
             */
            var Util = {};

            /**
             * Flag if running in node (fs is available) or not.
             * @type {boolean}
             * @const
             * @expose
             */
            Util.IS_NODE = false;

            /**
             * Constructs a XMLHttpRequest object.
             * @return {XMLHttpRequest}
             * @throws {Error} If XMLHttpRequest is not supported
             * @expose

            Util.XHR = function() {
                // No dependencies please, ref: http://www.quirksmode.org/js/xmlhttp.html
                var XMLHttpFactories = [
                    function () {return new XMLHttpRequest()},
                    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
                    function () {return new ActiveXObject("Msxml3.XMLHTTP")},
                    function () {return new ActiveXObject("Microsoft.XMLHTTP")}
                ];
                var xhr = null;
                for (var i=0;i<XMLHttpFactories.length;i++) {
                    try { xhr = XMLHttpFactories[i](); }
                    catch (e) { continue; }
                    break;
                }
                if (!xhr)
                    throw Error("XMLHttpRequest is not supported");
                return xhr;
            };
*/

            /**
             * Tests if an object is an array.
             * @function
             * @param {*} obj Object to test
             * @returns {boolean} true if it is an array, else false
             * @expose
             */
            Util.isArray = Array.isArray || function(obj) {
                return Object.prototype.toString.call(obj) === "[object Array]";
            };

            return Util;
        })();

        /**
         * Language expressions.
         * @type {!Object.<string,string|!RegExp>}
         * @expose
         */
        ProtoBuf.Lang = {
            OPEN: "{",
            CLOSE: "}",
            OPTOPEN: "[",
            OPTCLOSE: "]",
            OPTEND: ",",
            EQUAL: "=",
            END: ";",
            STRINGOPEN: '"',
            STRINGCLOSE: '"',
            STRINGOPEN_SQ: "'",
            STRINGCLOSE_SQ: "'",
            COPTOPEN: '(',
            COPTCLOSE: ')',
            DELIM: /[\s\{\}=;\[\],'"\(\)]/g,
            // KEYWORD: /^(?:package|option|import|message|enum|extend|service|syntax|extensions|group)$/,
            RULE: /^(?:required|optional|repeated)$/,
            TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/,
            NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/,
            TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/,
            TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
            FQTYPEREF: /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/,
            NUMBER: /^-?(?:[1-9][0-9]*|0|0x[0-9a-fA-F]+|0[0-7]+|([0-9]*\.[0-9]+([Ee][+-]?[0-9]+)?))$/,
            NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/,
            NUMBER_HEX: /^0x[0-9a-fA-F]+$/,
            NUMBER_OCT: /^0[0-7]+$/,
            NUMBER_FLT: /^[0-9]*\.[0-9]+([Ee][+-]?[0-9]+)?$/,
            ID: /^(?:[1-9][0-9]*|0|0x[0-9a-fA-F]+|0[0-7]+)$/,
            NEGID: /^\-?(?:[1-9][0-9]*|0|0x[0-9a-fA-F]+|0[0-7]+)$/,
            WHITESPACE: /\s/,
            STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g,
            BOOL: /^(?:true|false)$/i
        };


        /**
         * @alias ProtoBuf.Reflect
         * @expose
         */
        ProtoBuf.Reflect = (function(ProtoBuf) {
            "use strict";

            /**
             * Reflection types.
             * @exports ProtoBuf.Reflect
             * @namespace
             */
            var Reflect = {};

            /**
             * Constructs a Reflect base class.
             * @exports ProtoBuf.Reflect.T
             * @constructor
             * @abstract
             * @param {!ProtoBuf.Builder} builder Builder reference
             * @param {?ProtoBuf.Reflect.T} parent Parent object
             * @param {string} name Object name
             */
            var T = function(builder, parent, name) {

                /**
                 * Builder reference.
                 * @type {!ProtoBuf.Builder}
                 * @expose
                 */
                this.builder = builder;

                /**
                 * Parent object.
                 * @type {?ProtoBuf.Reflect.T}
                 * @expose
                 */
                this.parent = parent;

                /**
                 * Object name in namespace.
                 * @type {string}
                 * @expose
                 */
                this.name = name;

                /**
                 * Fully qualified class name
                 * @type {string}
                 * @expose
                 */
                this.className;
            };

            /**
             * @alias ProtoBuf.Reflect.T.prototype
             * @inner
             */
            var TPrototype = T.prototype;

            /**
             * Returns the fully qualified name of this object.
             * @returns {string} Fully qualified name as of ".PATH.TO.THIS"
             * @expose
             */
            TPrototype.fqn = function() {
                var name = this.name,
                    ptr = this;
                do {
                    ptr = ptr.parent;
                    if (ptr == null)
                        break;
                    name = ptr.name+"."+name;
                } while (true);
                return name;
            };

            /**
             * Returns a string representation of this Reflect object (its fully qualified name).
             * @param {boolean=} includeClass Set to true to include the class name. Defaults to false.
             * @return String representation
             * @expose
             */
            TPrototype.toString = function(includeClass) {
                return (includeClass ? this.className + " " : "") + this.fqn();
            };

            /**
             * Builds this type.
             * @throws {Error} If this type cannot be built directly
             * @expose
             */
            TPrototype.build = function() {
                throw Error(this.toString(true)+" cannot be built directly");
            };

            /**
             * @alias ProtoBuf.Reflect.T
             * @expose
             */
            Reflect.T = T;

            /**
             * Constructs a new Namespace.
             * @exports ProtoBuf.Reflect.Namespace
             * @param {!ProtoBuf.Builder} builder Builder reference
             * @param {?ProtoBuf.Reflect.Namespace} parent Namespace parent
             * @param {string} name Namespace name
             * @param {Object.<string,*>=} options Namespace options
             * @constructor
             * @extends ProtoBuf.Reflect.T
             */
            var Namespace = function(builder, parent, name, options) {
                T.call(this, builder, parent, name);

                /**
                 * @override
                 */
                this.className = "Namespace";

                /**
                 * Children inside the namespace.
                 * @type {!Array.<ProtoBuf.Reflect.T>}
                 */
                this.children = [];

                /**
                 * Options.
                 * @type {!Object.<string, *>}
                 */
                this.options = options || {};
            };

            /**
             * @alias ProtoBuf.Reflect.Namespace.prototype
             * @inner
             */
            var NamespacePrototype = Namespace.prototype = Object.create(T.prototype);

            /**
             * Returns an array of the namespace's children.
             * @param {ProtoBuf.Reflect.T=} type Filter type (returns instances of this type only). Defaults to null (all children).
             * @return {Array.<ProtoBuf.Reflect.T>}
             * @expose
             */
            NamespacePrototype.getChildren = function(type) {
                type = type || null;
                if (type == null)
                    return this.children.slice();
                var children = [];
                for (var i=0, k=this.children.length; i<k; ++i)
                    if (this.children[i] instanceof type)
                        children.push(this.children[i]);
                return children;
            };

            /**
             * Adds a child to the namespace.
             * @param {ProtoBuf.Reflect.T} child Child
             * @throws {Error} If the child cannot be added (duplicate)
             * @expose
             */
            NamespacePrototype.addChild = function(child) {
                var other;
                if (other = this.getChild(child.name)) {
                    // Try to revert camelcase transformation on collision
                    if (other instanceof Message.Field && other.name !== other.originalName && this.getChild(other.originalName) === null)
                        other.name = other.originalName; // Revert previous first (effectively keeps both originals)
                    else if (child instanceof Message.Field && child.name !== child.originalName && this.getChild(child.originalName) === null)
                        child.name = child.originalName;
                    else
                        throw Error("Duplicate name in namespace "+this.toString(true)+": "+child.name);
                }
                this.children.push(child);
            };

            /**
             * Gets a child by its name or id.
             * @param {string|number} nameOrId Child name or id
             * @return {?ProtoBuf.Reflect.T} The child or null if not found
             * @expose
             */
            NamespacePrototype.getChild = function(nameOrId) {
                var key = typeof nameOrId === 'number' ? 'id' : 'name';
                for (var i=0, k=this.children.length; i<k; ++i)
                    if (this.children[i][key] === nameOrId)
                        return this.children[i];
                return null;
            };

            /**
             * Resolves a reflect object inside of this namespace.
             * @param {string|!Array.<string>} qn Qualified name to resolve
             * @param {boolean=} excludeFields Excludes fields, defaults to `false`
             * @return {?ProtoBuf.Reflect.Namespace} The resolved type or null if not found
             * @expose
             */
            NamespacePrototype.resolve = function(qn, excludeFields) {
                var part = typeof qn === 'string' ? qn.split(".") : qn,
                    ptr = this,
                    i = 0;
                if (part[i] === "") { // Fully qualified name, e.g. ".My.Message'
                    while (ptr.parent !== null)
                        ptr = ptr.parent;
                    i++;
                }
                var child;
                do {
                    do {
                        child = ptr.getChild(part[i]);
                        if (!child || !(child instanceof Reflect.T) || (excludeFields && child instanceof Reflect.Message.Field)) {
                            ptr = null;
                            break;
                        }
                        ptr = child; i++;
                    } while (i < part.length);
                    if (ptr != null)
                        break; // Found
                    // Else search the parent
                    if (this.parent !== null) {
                        return this.parent.resolve(qn, excludeFields);
                    }
                } while (ptr != null);
                return ptr;
            };

            /**
             * Determines the shortest qualified name of the specified type, if any, relative to this namespace.
             * @param {!ProtoBuf.Reflect.T} t Reflection type
             * @returns {string} The shortest qualified name or, if there is none, the fqn
             * @expose
             */
            NamespacePrototype.qn = function(t) {
                var part = [], ptr = t;
                do {
                    part.unshift(ptr.name);
                    ptr = ptr.parent;
                } while (ptr !== null);
                for (var len=1; len <= part.length; len++) {
                    var qn = part.slice(part.length-len);
                    if (t === this.resolve(qn))
                        return qn.join(".");
                }
                return t.fqn();
            };

            /**
             * Builds the namespace and returns the runtime counterpart.
             * @return {Object.<string,Function|Object>} Runtime namespace
             * @expose
             */
            NamespacePrototype.build = function() {
                /** @dict */
                var ns = {};
                var children = this.children;
                for (var i=0, k=children.length, child; i<k; ++i) {
                    child = children[i];
                    if (child instanceof Namespace)
                        ns[child.name] = child.build();
                }
                if (Object.defineProperty)
                    Object.defineProperty(ns, "$options", { "value": this.buildOpt() });
                return ns;
            };

            /**
             * Builds the namespace's '$options' property.
             * @return {Object.<string,*>}
             */
            NamespacePrototype.buildOpt = function() {
                var opt = {},
                    keys = Object.keys(this.options);
                for (var i=0, k=keys.length; i<k; ++i) {
                    var key = keys[i],
                        val = this.options[keys[i]];
                    // TODO: Options are not resolved, yet.
                    // if (val instanceof Namespace) {
                    //     opt[key] = val.build();
                    // } else {
                    opt[key] = val;
                    // }
                }
                return opt;
            };

            /**
             * Gets the value assigned to the option with the specified name.
             * @param {string=} name Returns the option value if specified, otherwise all options are returned.
             * @return {*|Object.<string,*>}null} Option value or NULL if there is no such option
             */
            NamespacePrototype.getOption = function(name) {
                if (typeof name === 'undefined')
                    return this.options;
                return typeof this.options[name] !== 'undefined' ? this.options[name] : null;
            };

            /**
             * @alias ProtoBuf.Reflect.Namespace
             * @expose
             */
            Reflect.Namespace = Namespace;

            /**
             * Constructs a new Message.
             * @exports ProtoBuf.Reflect.Message
             * @param {!ProtoBuf.Builder} builder Builder reference
             * @param {!ProtoBuf.Reflect.Namespace} parent Parent message or namespace
             * @param {string} name Message name
             * @param {Object.<string,*>=} options Message options
             * @param {boolean=} isGroup `true` if this is a legacy group
             * @constructor
             * @extends ProtoBuf.Reflect.Namespace
             */
            var Message = function(builder, parent, name, options, isGroup) {
                Namespace.call(this, builder, parent, name, options);

                /**
                 * @override
                 */
                this.className = "Message";

                /**
                 * Extensions range.
                 * @type {!Array.<number>}
                 * @expose
                 */
                this.extensions = [ProtoBuf.ID_MIN, ProtoBuf.ID_MAX];

                /**
                 * Runtime message class.
                 * @type {?function(new:ProtoBuf.Builder.Message)}
                 * @expose
                 */
                this.clazz = null;

                /**
                 * Whether this is a legacy group or not.
                 * @type {boolean}
                 * @expose
                 */
                this.isGroup = !!isGroup;

                // The following cached collections are used to efficiently iterate over or look up fields when decoding.

                /**
                 * Cached fields.
                 * @type {?Array.<!ProtoBuf.Reflect.Message.Field>}
                 * @private
                 */
                this._fields = null;

                /**
                 * Cached fields by id.
                 * @type {?Object.<number,!ProtoBuf.Reflect.Message.Field>}
                 * @private
                 */
                this._fieldsById = null;

                /**
                 * Cached fields by name.
                 * @type {?Object.<string,!ProtoBuf.Reflect.Message.Field>}
                 * @private
                 */
                this._fieldsByName = null;
            };

            /**
             * @alias ProtoBuf.Reflect.Message.prototype
             * @inner
             */
            var MessagePrototype = Message.prototype = Object.create(Namespace.prototype);

            /**
             * Builds the message and returns the runtime counterpart, which is a fully functional class.
             * @see ProtoBuf.Builder.Message
             * @param {boolean=} rebuild Whether to rebuild or not, defaults to false
             * @return {ProtoBuf.Reflect.Message} Message class
             * @throws {Error} If the message cannot be built
             * @expose
             */
            MessagePrototype.build = function(rebuild) {
                if (this.clazz && !rebuild)
                    return this.clazz;

                // Create the runtime Message class in its own scope
                var clazz = (function(ProtoBuf, T) {

                    var fields = T.getChildren(ProtoBuf.Reflect.Message.Field),
                        oneofs = T.getChildren(ProtoBuf.Reflect.Message.OneOf);

                    /**
                     * Constructs a new runtime Message.
                     * @name ProtoBuf.Builder.Message
                     * @class Barebone of all runtime messages.
                     * @param {!Object.<string,*>|string} values Preset values
                     * @param {...string} var_args
                     * @constructor
                     * @throws {Error} If the message cannot be created
                     */
                    var Message = function(values, var_args) {
                        ProtoBuf.Builder.Message.call(this);

                        // Create virtual oneof properties
                        for (var i=0, k=oneofs.length; i<k; ++i)
                            this[oneofs[i].name] = null;
                        // Create fields and set default values
                        for (i=0, k=fields.length; i<k; ++i) {
                            var field = fields[i];
                            this[field.name] = field.repeated ? [] : null;
                            if (field.required && field.defaultValue !== null)
                                this[field.name] = field.defaultValue;
                        }

                        if (arguments.length > 0) {
                            var value;
                            // Set field values from a values object
                            if (arguments.length === 1 && typeof values === 'object' &&
                                /* not another Message */ typeof values.encode !== 'function' &&
                                /* not a repeated field */ !ProtoBuf.Util.isArray(values) &&
                                /* not a ByteBuffer */ !(values instanceof ByteBuffer) &&
                                /* not an ArrayBuffer */ !(values instanceof ArrayBuffer) &&
                                /* not a Long */ !(ProtoBuf.Long && values instanceof ProtoBuf.Long)) {
                                this.$set(values);
                            } else // Set field values from arguments, in declaration order
                                for (i=0, k=arguments.length; i<k; ++i)
                                    if (typeof (value = arguments[i]) !== 'undefined')
                                        this.$set(fields[i].name, value); // May throw
                        }
                    };

                    /**
                     * @alias ProtoBuf.Builder.Message.prototype
                     * @inner
                     */
                    var MessagePrototype = Message.prototype = Object.create(ProtoBuf.Builder.Message.prototype);

                    /**
                     * Adds a value to a repeated field.
                     * @name ProtoBuf.Builder.Message#add
                     * @function
                     * @param {string} key Field name
                     * @param {*} value Value to add
                     * @param {boolean=} noAssert Whether to assert the value or not (asserts by default)
                     * @throws {Error} If the value cannot be added
                     * @expose
                     */
                    MessagePrototype.add = function(key, value, noAssert) {
                        var field = T._fieldsByName[key];
                        if (!noAssert) {
                            if (!field)
                                throw Error(this+"#"+key+" is undefined");
                            if (!(field instanceof ProtoBuf.Reflect.Message.Field))
                                throw Error(this+"#"+key+" is not a field: "+field.toString(true)); // May throw if it's an enum or embedded message
                            if (!field.repeated)
                                throw Error(this+"#"+key+" is not a repeated field");
                        }
                        if (this[field.name] === null)
                            this[field.name] = [];
                        this[field.name].push(noAssert ? value : field.verifyValue(value, true));
                    };

                    /**
                     * Adds a value to a repeated field. This is an alias for {@link ProtoBuf.Builder.Message#add}.
                     * @name ProtoBuf.Builder.Message#$add
                     * @function
                     * @param {string} key Field name
                     * @param {*} value Value to add
                     * @param {boolean=} noAssert Whether to assert the value or not (asserts by default)
                     * @throws {Error} If the value cannot be added
                     * @expose
                     */
                    MessagePrototype.$add = MessagePrototype.add;

                    /**
                     * Sets a field's value.
                     * @name ProtoBuf.Builder.Message#set
                     * @function
                     * @param {string|!Object.<string,*>} keyOrObj String key or plain object holding multiple values
                     * @param {(*|boolean)=} value Value to set if key is a string, otherwise omitted
                     * @param {boolean=} noAssert Whether to not assert for an actual field / proper value type, defaults to `false`
                     * @returns {!ProtoBuf.Builder.Message} this
                     * @throws {Error} If the value cannot be set
                     * @expose
                     */
                    MessagePrototype.set = function(keyOrObj, value, noAssert) {
                        if (keyOrObj && typeof keyOrObj === 'object') {
                            noAssert = value;
                            for (var ikey in keyOrObj)
                                if (keyOrObj.hasOwnProperty(ikey) && typeof (value = keyOrObj[ikey]) !== 'undefined')
                                    this.$set(ikey, value, noAssert);
                            return this;
                        }
                        var field = T._fieldsByName[keyOrObj];
                        if (!noAssert) {
                            if (!field)
                                throw Error(this+"#"+keyOrObj+" is not a field: undefined");
                            if (!(field instanceof ProtoBuf.Reflect.Message.Field))
                                throw Error(this+"#"+keyOrObj+" is not a field: "+field.toString(true));
                            this[field.name] = (value = field.verifyValue(value)); // May throw
                        } else {
                            this[field.name] = value;
                        }
                        if (field.oneof) {
                            if (value !== null) {
                                if (this[field.oneof.name] !== null)
                                    this[this[field.oneof.name]] = null; // Unset the previous (field name is the oneof field's value)
                                this[field.oneof.name] = field.name;
                            } else if (field.oneof.name === keyOrObj)
                                this[field.oneof.name] = null;
                        }
                        return this;
                    };

                    /**
                     * Sets a field's value. This is an alias for [@link ProtoBuf.Builder.Message#set}.
                     * @name ProtoBuf.Builder.Message#$set
                     * @function
                     * @param {string|!Object.<string,*>} keyOrObj String key or plain object holding multiple values
                     * @param {*=} value Value to set if key is a string
                     * @param {boolean=} noAssert Whether to not assert the value, defaults to `false`
                     * @throws {Error} If the value cannot be set
                     * @expose
                     */
                    MessagePrototype.$set = MessagePrototype.set;

                    /**
                     * Gets a field's value.
                     * @name ProtoBuf.Builder.Message#get
                     * @function
                     * @param {string} key Key
                     * @param {boolean=} noAssert Whether to not assert for an actual field, defaults to `false`
                     * @return {*} Value
                     * @throws {Error} If there is no such field
                     * @expose

                    MessagePrototype.get = function(key, noAssert) {
                        if (noAssert)
                            return this[key];
                        var field = T._fieldsByName[key];
                        if (!field || !(field instanceof ProtoBuf.Reflect.Message.Field))
                            throw Error(this+"#"+key+" is not a field: undefined");
                        if (!(field instanceof ProtoBuf.Reflect.Message.Field))
                            throw Error(this+"#"+key+" is not a field: "+field.toString(true));
                        return this[field.name];
                    };
*/
                    /**
                     * Gets a field's value. This is an alias for {@link ProtoBuf.Builder.Message#$get}.
                     * @name ProtoBuf.Builder.Message#$get
                     * @function
                     * @param {string} key Key
                     * @return {*} Value
                     * @throws {Error} If there is no such field
                     * @expose
                     */
                    //MessagePrototype.$get = MessagePrototype.get;

                    // Getters and setters

                    for (var i=0; i<fields.length; i++) {
                        var field = fields[i];
                        // no setters for extension fields as these are named by their fqn
                        if (field instanceof ProtoBuf.Reflect.Message.ExtensionField)
                            continue;

                        if (T.builder.options['populateAccessors'])
                            (function(field) {
                                // set/get[SomeValue]
                                var Name = field.originalName.replace(/(_[a-zA-Z])/g, function(match) {
                                    return match.toUpperCase().replace('_','');
                                });
                                Name = Name.substring(0,1).toUpperCase() + Name.substring(1);

                                // set/get_[some_value] FIXME: Do we really need these?
                                var name = field.originalName.replace(/([A-Z])/g, function(match) {
                                    return "_"+match;
                                });

                                /**
                                 * The current field's unbound setter function.
                                 * @function
                                 * @param {*} value
                                 * @param {boolean=} noAssert
                                 * @returns {!ProtoBuf.Builder.Message}
                                 * @inner
                                 */
                                var setter = function(value, noAssert) {
                                    this[field.name] = noAssert ? value : field.verifyValue(value);
                                    return this;
                                };

                                /**
                                 * The current field's unbound getter function.
                                 * @function
                                 * @returns {*}
                                 * @inner
                                 */
                                var getter = function() {
                                    return this[field.name];
                                };

                                /**
                                 * Sets a value. This method is present for each field, but only if there is no name conflict with
                                 *  another field.
                                 * @name ProtoBuf.Builder.Message#set[SomeField]
                                 * @function
                                 * @param {*} value Value to set
                                 * @param {boolean=} noAssert Whether to not assert the value, defaults to `false`
                                 * @returns {!ProtoBuf.Builder.Message} this
                                 * @abstract
                                 * @throws {Error} If the value cannot be set
                                 */
                                if (T.getChild("set"+Name) === null)
                                    MessagePrototype["set"+Name] = setter;

                                /**
                                 * Sets a value. This method is present for each field, but only if there is no name conflict with
                                 *  another field.
                                 * @name ProtoBuf.Builder.Message#set_[some_field]
                                 * @function
                                 * @param {*} value Value to set
                                 * @param {boolean=} noAssert Whether to not assert the value, defaults to `false`
                                 * @returns {!ProtoBuf.Builder.Message} this
                                 * @abstract
                                 * @throws {Error} If the value cannot be set
                                 */
                                if (T.getChild("set_"+name) === null)
                                    MessagePrototype["set_"+name] = setter;

                                /**
                                 * Gets a value. This method is present for each field, but only if there is no name conflict with
                                 *  another field.
                                 * @name ProtoBuf.Builder.Message#get[SomeField]
                                 * @function
                                 * @abstract
                                 * @return {*} The value
                                 */
                                if (T.getChild("get"+Name) === null)
                                    MessagePrototype["get"+Name] = getter;

                                /**
                                 * Gets a value. This method is present for each field, but only if there is no name conflict with
                                 *  another field.
                                 * @name ProtoBuf.Builder.Message#get_[some_field]
                                 * @function
                                 * @return {*} The value
                                 * @abstract
                                 */
                                if (T.getChild("get_"+name) === null)
                                    MessagePrototype["get_"+name] = getter;

                            })(field);
                    }

                    // En-/decoding

                    /**
                     * Encodes the message.
                     * @name ProtoBuf.Builder.Message#$encode
                     * @function
                     * @param {(!ByteBuffer|boolean)=} buffer ByteBuffer to encode to. Will create a new one and flip it if omitted.
                     * @param {boolean=} noVerify Whether to not verify field values, defaults to `false`
                     * @return {!ByteBuffer} Encoded message as a ByteBuffer
                     * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
                     *  returns the encoded ByteBuffer in the `encoded` property on the error.
                     * @expose
                     * @see ProtoBuf.Builder.Message#encode64
                     * @see ProtoBuf.Builder.Message#encodeHex
                     * @see ProtoBuf.Builder.Message#encodeAB
                     */
                    MessagePrototype.encode = function(buffer, noVerify) {
                        if (typeof buffer === 'boolean')
                            noVerify = buffer,
                            buffer = undefined;
                        var isNew = false;
                        if (!buffer)
                            buffer = new ByteBuffer(),
                            isNew = true;
                        var le = buffer.littleEndian;
                        try {
                            T.encode(this, buffer.LE(), noVerify);
                            return (isNew ? buffer.flip() : buffer).LE(le);
                        } catch (e) {
                            buffer.LE(le);
                            throw(e);
                        }
                    };

                    /**
                     * Calculates the byte length of the message.
                     * @name ProtoBuf.Builder.Message#calculate
                     * @function
                     * @returns {number} Byte length
                     * @throws {Error} If the message cannot be calculated or if required fields are missing.
                     * @expose
                     *
                    MessagePrototype.calculate = function() {
                        return T.calculate(this);
                    };
*/

                    /**
                     * Encodes the varint32 length-delimited message.
                     * @name ProtoBuf.Builder.Message#encodeDelimited
                     * @function
                     * @param {(!ByteBuffer|boolean)=} buffer ByteBuffer to encode to. Will create a new one and flip it if omitted.
                     * @return {!ByteBuffer} Encoded message as a ByteBuffer
                     * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
                     *  returns the encoded ByteBuffer in the `encoded` property on the error.
                     * @expose

                    MessagePrototype.encodeDelimited = function(buffer) {
                        var isNew = false;
                        if (!buffer)
                            buffer = new ByteBuffer(),
                            isNew = true;
                        var enc = new ByteBuffer().LE();
                        T.encode(this, enc).flip();
                        buffer.writeVarint32(enc.remaining());
                        buffer.append(enc);
                        return isNew ? buffer.flip() : buffer;
                    };
*/
                    /**
                     * Directly encodes the message to an ArrayBuffer.
                     * @name ProtoBuf.Builder.Message#encodeAB
                     * @function
                     * @return {ArrayBuffer} Encoded message as ArrayBuffer
                     * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
                     *  returns the encoded ArrayBuffer in the `encoded` property on the error.
                     * @expose

                    MessagePrototype.encodeAB = function() {
                        try {
                            return this.encode().toArrayBuffer();
                        } catch (e) {
                            if (e["encoded"]) e["encoded"] = e["encoded"].toArrayBuffer();
                            throw(e);
                        }
                    };
*/
                    /**
                     * Returns the message as an ArrayBuffer. This is an alias for {@link ProtoBuf.Builder.Message#encodeAB}.
                     * @name ProtoBuf.Builder.Message#toArrayBuffer
                     * @function
                     * @return {ArrayBuffer} Encoded message as ArrayBuffer
                     * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
                     *  returns the encoded ArrayBuffer in the `encoded` property on the error.
                     * @expose
                     */
                    MessagePrototype.toArrayBuffer = MessagePrototype.encodeAB;

                    /**
                     * Directly encodes the message to a node Buffer.
                     * @name ProtoBuf.Builder.Message#encodeNB
                     * @function
                     * @return {!Buffer}
                     * @throws {Error} If the message cannot be encoded, not running under node.js or if required fields are
                     *  missing. The later still returns the encoded node Buffer in the `encoded` property on the error.
                     * @expose

                    MessagePrototype.encodeNB = function() {
                        try {
                            return this.encode().toBuffer();
                        } catch (e) {
                            if (e["encoded"]) e["encoded"] = e["encoded"].toBuffer();
                            throw(e);
                        }
                    };
*/

                    /**
                     * Returns the message as a node Buffer. This is an alias for {@link ProtoBuf.Builder.Message#encodeNB}.
                     * @name ProtoBuf.Builder.Message#toBuffer
                     * @function
                     * @return {!Buffer}
                     * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
                     *  returns the encoded node Buffer in the `encoded` property on the error.
                     * @expose
                     */
  //                  MessagePrototype.toBuffer = MessagePrototype.encodeNB;

                    /**
                     * Directly encodes the message to a base64 encoded string.
                     * @name ProtoBuf.Builder.Message#encode64
                     * @function
                     * @return {string} Base64 encoded string
                     * @throws {Error} If the underlying buffer cannot be encoded or if required fields are missing. The later
                     *  still returns the encoded base64 string in the `encoded` property on the error.
                     * @expose
                     */
                    MessagePrototype.encode64 = function() {
                        try {
                            return this.encode().toBase64();
                        } catch (e) {
                            if (e["encoded"]) e["encoded"] = e["encoded"].toBase64();
                            throw(e);
                        }
                    };

                    /**
                     * Returns the message as a base64 encoded string. This is an alias for {@link ProtoBuf.Builder.Message#encode64}.
                     * @name ProtoBuf.Builder.Message#toBase64
                     * @function
                     * @return {string} Base64 encoded string
                     * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
                     *  returns the encoded base64 string in the `encoded` property on the error.
                     * @expose
                     */
                    MessagePrototype.toBase64 = MessagePrototype.encode64;

                    /**
                     * Directly encodes the message to a hex encoded string.
                     * @name ProtoBuf.Builder.Message#encodeHex
                     * @function
                     * @return {string} Hex encoded string
                     * @throws {Error} If the underlying buffer cannot be encoded or if required fields are missing. The later
                     *  still returns the encoded hex string in the `encoded` property on the error.
                     * @expose

                    MessagePrototype.encodeHexx = function() {
                        try {
                            return this.encode().toHex();
                        } catch (e) {
                            if (e["encoded"]) e["encoded"] = e["encoded"].toHex();
                            throw(e);
                        }
                    };
*/
                    /**
                     * Returns the message as a hex encoded string. This is an alias for {@link ProtoBuf.Builder.Message#encodeHex}.
                     * @name ProtoBuf.Builder.Message#toHex
                     * @function
                     * @return {string} Hex encoded string
                     * @throws {Error} If the message cannot be encoded or if required fields are missing. The later still
                     *  returns the encoded hex string in the `encoded` property on the error.
                     * @expose
                     */
                    //MessagePrototype.toHex = MessagePrototype.encodeHex;

                    /**
                     * Clones a message object to a raw object.
                     * @param {*} obj Object to clone
                     * @param {boolean} includeBinaryAsBase64 Whether to include binary data as base64 strings or not
                     * @returns {*} Cloned object
                     * @inner

                    function cloneRaw(obj, includeBinaryAsBase64) {
                        var clone = {};
                        for (var i in obj)
                            if (obj.hasOwnProperty(i)) {
                                if (obj[i] === null || typeof obj[i] !== 'object')
                                    clone[i] = obj[i];
                                else if (obj[i] instanceof ByteBuffer) {
                                    if (includeBinaryAsBase64)
                                        clone[i] = obj[i].toBase64();
                                } else // is a non-null object
                                    clone[i] = cloneRaw(obj[i], includeBinaryAsBase64);
                            }
                        return clone;
                    }
*/
                    /**
                     * Returns the message's raw payload.
                     * @param {boolean=} includeBinaryAsBase64 Whether to include binary data as base64 strings or not, defaults to `false`
                     * @returns {Object.<string,*>} Raw payload
                     * @expose

                    MessagePrototype.toRaw = function(includeBinaryAsBase64) {
                        return cloneRaw(this, !!includeBinaryAsBase64);
                    };
*/
                    /**
                     * Decodes a message from the specified buffer or string.
                     * @name ProtoBuf.Builder.Message.decode
                     * @function
                     * @param {!ByteBuffer|!ArrayBuffer|!Buffer|string} buffer Buffer to decode from
                     * @param {string=} enc Encoding if buffer is a string: hex, utf8 (not recommended), defaults to base64
                     * @return {!ProtoBuf.Builder.Message} Decoded message
                     * @throws {Error} If the message cannot be decoded or if required fields are missing. The later still
                     *  returns the decoded message with missing fields in the `decoded` property on the error.
                     * @expose
                     * @see ProtoBuf.Builder.Message.decode64
                     * @see ProtoBuf.Builder.Message.decodeHex

                    Message.decode = function(buffer, enc) {
                        if (typeof buffer === 'string')
                            buffer = ByteBuffer.wrap(buffer, enc ? enc : "base64");
                        buffer = buffer instanceof ByteBuffer ? buffer : ByteBuffer.wrap(buffer); // May throw
                        var le = buffer.littleEndian;
                        try {
                            var msg = T.decode(buffer.LE());
                            buffer.LE(le);
                            return msg;
                        } catch (e) {
                            buffer.LE(le);
                            throw(e);
                        }
                    };
*/
                    /**
                     * Decodes a varint32 length-delimited message from the specified buffer or string.
                     * @name ProtoBuf.Builder.Message.decodeDelimited
                     * @function
                     * @param {!ByteBuffer|!ArrayBuffer|!Buffer|string} buffer Buffer to decode from
                     * @param {string=} enc Encoding if buffer is a string: hex, utf8 (not recommended), defaults to base64
                     * @return {ProtoBuf.Builder.Message} Decoded message or `null` if not enough bytes are available yet
                     * @throws {Error} If the message cannot be decoded or if required fields are missing. The later still
                     *  returns the decoded message with missing fields in the `decoded` property on the error.
                     * @expose

                    Message.decodeDelimited = function(buffer, enc) {
                        if (typeof buffer === 'string')
                            buffer = ByteBuffer.wrap(buffer, enc ? enc : "base64");
                        buffer = buffer instanceof ByteBuffer ? buffer : ByteBuffer.wrap(buffer); // May throw
                        if (buffer.remaining() < 1)
                            return null;
                        var off = buffer.offset,
                            len = buffer.readVarint32();
                        if (buffer.remaining() < len) {
                            buffer.offset = off;
                            return null;
                        }
                        try {
                            var msg = T.decode(buffer.slice(buffer.offset, buffer.offset + len).LE());
                            buffer.offset += len;
                            return msg;
                        } catch (err) {
                            buffer.offset += len;
                            throw err;
                        }
                    };
*/
                    /**
                     * Decodes the message from the specified base64 encoded string.
                     * @name ProtoBuf.Builder.Message.decode64
                     * @function
                     * @param {string} str String to decode from
                     * @return {!ProtoBuf.Builder.Message} Decoded message
                     * @throws {Error} If the message cannot be decoded or if required fields are missing. The later still
                     *  returns the decoded message with missing fields in the `decoded` property on the error.
                     * @expose

                    Message.decode64 = function(str) {
                        return Message.decode(str, "base64");
                    };

  */                  /**
                     * Decodes the message from the specified hex encoded string.
                     * @name ProtoBuf.Builder.Message.decodeHex
                     * @function
                     * @param {string} str String to decode from
                     * @return {!ProtoBuf.Builder.Message} Decoded message
                     * @throws {Error} If the message cannot be decoded or if required fields are missing. The later still
                     *  returns the decoded message with missing fields in the `decoded` property on the error.
                     * @expose

                    Message.decodeHex = function(str) {
                        return Message.decode(str, "hex");
                    };
*/
                    // Utility

                    /**
                     * Returns a string representation of this Message.
                     * @name ProtoBuf.Builder.Message#toString
                     * @function
                     * @return {string} String representation as of ".Fully.Qualified.MessageName"
                     * @expose
                     */
                    MessagePrototype.toString = function() {
                        return T.toString();
                    };

                    // Properties

                    /**
                     * Message options.
                     * @name ProtoBuf.Builder.Message.$options
                     * @type {Object.<string,*>}
                     * @expose
                     */
                    var $optionsS; // cc needs this

                    /**
                     * Message options.
                     * @name ProtoBuf.Builder.Message#$options
                     * @type {Object.<string,*>}
                     * @expose
                     */
                    var $options;

                    /**
                     * Reflection type.
                     * @name ProtoBuf.Builder.Message.$type
                     * @type {!ProtoBuf.Reflect.Message}
                     * @expose
                     */
                    var $typeS;

                    /**
                     * Reflection type.
                     * @name ProtoBuf.Builder.Message#$type
                     * @type {!ProtoBuf.Reflect.Message}
                     * @expose
                     */
                    var $type;

                    if (Object.defineProperty)
                        Object.defineProperty(Message, '$options', { "value": T.buildOpt() }),
                        Object.defineProperty(MessagePrototype, "$options", { "value": Message["$options"] }),
                        Object.defineProperty(Message, "$type", { "value": T }),
                        Object.defineProperty(MessagePrototype, "$type", { "value": T });

                    return Message;

                })(ProtoBuf, this);

                // Static enums and prototyped sub-messages / cached collections
                this._fields = [];
                this._fieldsById = {};
                this._fieldsByName = {};
                for (var i=0, k=this.children.length, child; i<k; i++) {
                    child = this.children[i];
                    if (child instanceof Enum)
                        clazz[child.name] = child.build();
                    else if (child instanceof Message)
                        clazz[child.name] = child.build();
                    else if (child instanceof Message.Field)
                        child.build(),
                        this._fields.push(child),
                        this._fieldsById[child.id] = child,
                        this._fieldsByName[child.name] = child;
                    else if (!(child instanceof Message.OneOf) && !(child instanceof Extension)) // Not built
                        throw Error("Illegal reflect child of "+this.toString(true)+": "+children[i].toString(true));
                }

                return this.clazz = clazz;
            };

            /**
             * Encodes a runtime message's contents to the specified buffer.
             * @param {!ProtoBuf.Builder.Message} message Runtime message to encode
             * @param {ByteBuffer} buffer ByteBuffer to write to
             * @param {boolean=} noVerify Whether to not verify field values, defaults to `false`
             * @return {ByteBuffer} The ByteBuffer for chaining
             * @throws {Error} If required fields are missing or the message cannot be encoded for another reason
             * @expose
             */
            MessagePrototype.encode = function(message, buffer, noVerify) {
                var fieldMissing = null,
                    field;
                for (var i=0, k=this._fields.length, val; i<k; ++i) {
                    field = this._fields[i];
                    val = message[field.name];
                    if (field.required && val === null) {
                        if (fieldMissing === null)
                            fieldMissing = field;
                    } else
                        field.encode(noVerify ? val : field.verifyValue(val), buffer);
                }
                if (fieldMissing !== null) {
                    var err = Error("Missing at least one required field for "+this.toString(true)+": "+fieldMissing);
                    err["encoded"] = buffer; // Still expose what we got
                    throw(err);
                }
                return buffer;
            };

            /**
             * Calculates a runtime message's byte length.
             * @param {!ProtoBuf.Builder.Message} message Runtime message to encode
             * @returns {number} Byte length
             * @throws {Error} If required fields are missing or the message cannot be calculated for another reason
             * @expose

            MessagePrototype.calculate = function(message) {
                for (var n=0, i=0, k=this._fields.length, field, val; i<k; ++i) {
                    field = this._fields[i];
                    val = message[field.name];
                    if (field.required && val === null)
                       throw Error("Missing at least one required field for "+this.toString(true)+": "+field);
                    else
                        n += field.calculate(val);
                }
                return n;
            };
*/

            /**
             * Skips all data until the end of the specified group has been reached.
             * @param {number} expectedId Expected GROUPEND id
             * @param {!ByteBuffer} buf ByteBuffer
             * @returns {boolean} `true` if a value as been skipped, `false` if the end has been reached
             * @throws {Error} If it wasn't possible to find the end of the group (buffer overrun or end tag mismatch)
             * @inner
             *
            function skipTillGroupEnd(expectedId, buf) {
                var tag = buf.readVarint32(), // Throws on OOB
                    wireType = tag & 0x07,
                    id = tag >> 3;
                switch (wireType) {
                    case ProtoBuf.WIRE_TYPES.VARINT:
                        do tag = buf.readUint8();
                        while ((tag & 0x80) === 0x80);
                        break;
                    case ProtoBuf.WIRE_TYPES.BITS64:
                        buf.offset += 8;
                        break;
                    case ProtoBuf.WIRE_TYPES.LDELIM:
                        tag = buf.readVarint32(); // reads the varint
                        buf.offset += tag;        // skips n bytes
                        break;
                    case ProtoBuf.WIRE_TYPES.STARTGROUP:
                        skipTillGroupEnd(id, buf);
                        break;
                    case ProtoBuf.WIRE_TYPES.ENDGROUP:
                        if (id === expectedId)
                            return false;
                        else
                            throw Error("Illegal GROUPEND after unknown group: "+id+" ("+expectedId+" expected)");
                    case ProtoBuf.WIRE_TYPES.BITS32:
                        buf.offset += 4;
                        break;
                    default:
                        throw Error("Illegal wire type in unknown group "+expectedId+": "+wireType);
                }
                return true;
            }
*/
            /**
             * Decodes an encoded message and returns the decoded message.
             * @param {ByteBuffer} buffer ByteBuffer to decode from
             * @param {number=} length Message length. Defaults to decode all the available data.
             * @param {number=} expectedGroupEndId Expected GROUPEND id if this is a legacy group
             * @return {ProtoBuf.Builder.Message} Decoded message
             * @throws {Error} If the message cannot be decoded
             * @expose
             *
            MessagePrototype.decodex = function(buffer, length, expectedGroupEndId) {
                length = typeof length === 'number' ? length : -1;
                var start = buffer.offset,
                    msg = new (this.clazz)(),
                    tag, wireType, id, field;
                while (buffer.offset < start+length || (length === -1 && buffer.remaining() > 0)) {
                    tag = buffer.readVarint32();
                    wireType = tag & 0x07;
                    id = tag >> 3;
                    if (wireType === ProtoBuf.WIRE_TYPES.ENDGROUP) {
                        if (id !== expectedGroupEndId)
                            throw Error("Illegal group end indicator for "+this.toString(true)+": "+id+" ("+(expectedGroupEndId ? expectedGroupEndId+" expected" : "not a group")+")");
                        break;
                    }
                    if (!(field = this._fieldsById[id])) {
                        // "messages created by your new code can be parsed by your old code: old binaries simply ignore the new field when parsing."
                        switch (wireType) {
                            case ProtoBuf.WIRE_TYPES.VARINT:
                                buffer.readVarint32();
                                break;
                            case ProtoBuf.WIRE_TYPES.BITS32:
                                buffer.offset += 4;
                                break;
                            case ProtoBuf.WIRE_TYPES.BITS64:
                                buffer.offset += 8;
                                break;
                            case ProtoBuf.WIRE_TYPES.LDELIM:
                                var len = buffer.readVarint32();
                                buffer.offset += len;
                                break;
                            case ProtoBuf.WIRE_TYPES.STARTGROUP:
                                while (skipTillGroupEnd(id, buffer)) {}
                                break;
                            default:
                                throw Error("Illegal wire type for unknown field "+id+" in "+this.toString(true)+"#decode: "+wireType);
                        }
                        continue;
                    }
                    if (field.repeated && !field.options["packed"])
                        msg[field.name].push(field.decode(wireType, buffer));
                    else {
                        msg[field.name] = field.decode(wireType, buffer);
                        if (field.oneof) {
                            if (this[field.oneof.name] !== null)
                                this[this[field.oneof.name]] = null;
                            msg[field.oneof.name] = field.name;
                        }
                    }
                }

                // Check if all required fields are present and set default values for optional fields that are not
                for (var i=0, k=this._fields.length; i<k; ++i) {
                    field = this._fields[i];
                    if (msg[field.name] === null)
                        if (field.required) {
                            var err = Error("Missing at least one required field for "+this.toString(true)+": "+field.name);
                            err["decoded"] = msg; // Still expose what we got
                            throw(err);
                        } else if (field.defaultValue !== null)
                            msg[field.name] = field.defaultValue;
                }
                return msg;
            };
*/
            /**
             * @alias ProtoBuf.Reflect.Message
             * @expose
             */
            Reflect.Message = Message;

            /**
             * Constructs a new Message Field.
             * @exports ProtoBuf.Reflect.Message.Field
             * @param {!ProtoBuf.Builder} builder Builder reference
             * @param {!ProtoBuf.Reflect.Message} message Message reference
             * @param {string} rule Rule, one of requried, optional, repeated
             * @param {string} type Data type, e.g. int32
             * @param {string} name Field name
             * @param {number} id Unique field id
             * @param {Object.<string,*>=} options Options
             * @param {!ProtoBuf.Reflect.Message.OneOf=} oneof Enclosing OneOf
             * @constructor
             * @extends ProtoBuf.Reflect.T
             */
            var Field = function(builder, message, rule, type, name, id, options, oneof) {
                T.call(this, builder, message, name);

                /**
                 * @override
                 */
                this.className = "Message.Field";

                /**
                 * Message field required flag.
                 * @type {boolean}
                 * @expose
                 */
                this.required = rule === "required";

                /**
                 * Message field repeated flag.
                 * @type {boolean}
                 * @expose
                 */
                this.repeated = rule === "repeated";

                /**
                 * Message field type. Type reference string if unresolved, protobuf type if resolved.
                 * @type {string|{name: string, wireType: number}}
                 * @expose
                 */
                this.type = type;

                /**
                 * Resolved type reference inside the global namespace.
                 * @type {ProtoBuf.Reflect.T|null}
                 * @expose
                 */
                this.resolvedType = null;

                /**
                 * Unique message field id.
                 * @type {number}
                 * @expose
                 */
                this.id = id;

                /**
                 * Message field options.
                 * @type {!Object.<string,*>}
                 * @dict
                 * @expose
                 */
                this.options = options || {};

                /**
                 * Default value.
                 * @type {*}
                 * @expose
                 */
                this.defaultValue = null;

                /**
                 * Enclosing OneOf.
                 * @type {?ProtoBuf.Reflect.Message.OneOf}
                 * @expose
                 */
                this.oneof = oneof || null;

                /**
                 * Original field name.
                 * @type {string}
                 * @expose
                 */
                this.originalName = this.name; // Used to revert camelcase transformation on naming collisions

                // Convert field names to camel case notation if the override is set
                //if (this.builder.options['convertFieldsToCamelCase'] && !(this instanceof Message.ExtensionField))
                //    this.name = Field._toCamelCase(this.name);
            };

            /**
             * Converts a field name to camel case.
             * @param {string} name Likely underscore notated name
             * @returns {string} Camel case notated name
             * @private
             *
            Field._toCamelCase = function(name) {
                return name.replace(/_([a-zA-Z])/g, function($0, $1) {
                    return $1.toUpperCase();
                });
            };*/

            /**
             * @alias ProtoBuf.Reflect.Message.Field.prototype
             * @inner
             */
            var FieldPrototype = Field.prototype = Object.create(T.prototype);

            /**
             * Builds the field.
             * @override
             * @expose
             */
            FieldPrototype.build = function() {
                this.defaultValue = typeof this.options['default'] !== 'undefined'
                    ? this.verifyValue(this.options['default']) : null;
            };

            /**
             * Makes a Long from a value.
             * @param { {low: number, high: number, unsigned: boolean} |string|number} value Value
             * @param {boolean=} unsigned Whether unsigned or not, defaults to reuse it from Long-like objects or to signed for
             *  strings and numbers
             * @returns {!Long}
             * @throws {Error} If the value cannot be converted to a Long
             * @inner
             */
            function mkLong(value, unsigned) {
                if (value && typeof value.low === 'number' && typeof value.high === 'number' && typeof value.unsigned === 'boolean'
                    && value.low === value.low && value.high === value.high)
                    return new ProtoBuf.Long(value.low, value.high, typeof unsigned === 'undefined' ? value.unsigned : unsigned);
                if (typeof value === 'string')
                    return ProtoBuf.Long.fromString(value, unsigned || false, 10);
                if (typeof value === 'number')
                    return ProtoBuf.Long.fromNumber(value, unsigned || false);
                throw Error("not convertible to Long");
            }

            /**
             * Checks if the given value can be set for this field.
             * @param {*} value Value to check
             * @param {boolean=} skipRepeated Whether to skip the repeated value check or not. Defaults to false.
             * @return {*} Verified, maybe adjusted, value
             * @throws {Error} If the value cannot be set for this field
             * @expose
             */
            FieldPrototype.verifyValue = function(value, skipRepeated) {
                skipRepeated = skipRepeated || false;
                var fail = function(val, msg) {
                    throw Error("Illegal value for "+this.toString(true)+" of type "+this.type.name+": "+val+" ("+msg+")");
                }.bind(this);
                if (value === null) { // NULL values for optional fields
                    if (this.required)
                        fail(typeof value, "required");
                    return null;
                }
                var i;
                if (this.repeated && !skipRepeated) { // Repeated values as arrays
                    if (!ProtoBuf.Util.isArray(value))
                        value = [value];
                    var res = [];
                    for (i=0; i<value.length; i++)
                        res.push(this.verifyValue(value[i], true));
                    return res;
                }
                // All non-repeated fields expect no array
                if (!this.repeated && ProtoBuf.Util.isArray(value))
                    fail(typeof value, "no array expected");

                switch (this.type) {
                    // Signed 32bit
                    case ProtoBuf.TYPES["int32"]:
                    case ProtoBuf.TYPES["sint32"]:
                    case ProtoBuf.TYPES["sfixed32"]:
                        // Account for !NaN: value === value
                        if (typeof value !== 'number' || (value === value && value % 1 !== 0))
                            fail(typeof value, "not an integer");
                        return value > 4294967295 ? value | 0 : value;

                    // Unsigned 32bit
                    case ProtoBuf.TYPES["uint32"]:
                    case ProtoBuf.TYPES["fixed32"]:
                        if (typeof value !== 'number' || (value === value && value % 1 !== 0))
                            fail(typeof value, "not an integer");
                        return value < 0 ? value >>> 0 : value;

                    // Signed 64bit
                    case ProtoBuf.TYPES["int64"]:
                    case ProtoBuf.TYPES["sint64"]:
                    case ProtoBuf.TYPES["sfixed64"]: {
                        if (ProtoBuf.Long)
                            try {
                                return mkLong(value, false);
                            } catch (e) {
                                fail(typeof value, e.message);
                            }
                        else
                            fail(typeof value, "requires Long.js");
                    }

                    // Unsigned 64bit
                    case ProtoBuf.TYPES["uint64"]:
                    case ProtoBuf.TYPES["fixed64"]: {
                        if (ProtoBuf.Long)
                            try {
                                return mkLong(value, true);
                            } catch (e) {
                                fail(typeof value, e.message);
                            }
                        else
                            fail(typeof value, "requires Long.js");
                    }

                    // Bool
                    case ProtoBuf.TYPES["bool"]:
                        if (typeof value !== 'boolean')
                            fail(typeof value, "not a boolean");
                        return value;

                    // Float
                    case ProtoBuf.TYPES["float"]:
                    case ProtoBuf.TYPES["double"]:
                        if (typeof value !== 'number')
                            fail(typeof value, "not a number");
                        return value;

                    // Length-delimited string
                    case ProtoBuf.TYPES["string"]:
                        if (typeof value !== 'string' && !(value && value instanceof String))
                            fail(typeof value, "not a string");
                        return ""+value; // Convert String object to string

                    // Length-delimited bytes
                    case ProtoBuf.TYPES["bytes"]:
                        if (ByteBuffer.isByteBuffer(value))
                            return value;
                        return ByteBuffer.wrap(value, "base64");

                    // Constant enum value
                    case ProtoBuf.TYPES["enum"]: {
                        var values = this.resolvedType.getChildren(Enum.Value);
                        for (i=0; i<values.length; i++)
                            if (values[i].name == value)
                                return values[i].id;
                            else if (values[i].id == value)
                                return values[i].id;
                        fail(value, "not a valid enum value");
                    }
                    // Embedded message
                    case ProtoBuf.TYPES["group"]:
                    case ProtoBuf.TYPES["message"]: {
                        if (!value || typeof value !== 'object')
                            fail(typeof value, "object expected");
                        if (value instanceof this.resolvedType.clazz)
                            return value;
                        if (value instanceof ProtoBuf.Builder.Message) {
                            // Mismatched type: Convert to object (see: https://github.com/dcodeIO/ProtoBuf.js/issues/180)
                            var obj = {};
                            for (var i in value)
                                if (value.hasOwnProperty(i))
                                    obj[i] = value[i];
                            value = obj;
                        }
                        // Else let's try to construct one from a key-value object
                        return new (this.resolvedType.clazz)(value); // May throw for a hundred of reasons
                    }
                }

                // We should never end here
                throw Error("[INTERNAL] Illegal value for "+this.toString(true)+": "+value+" (undefined type "+this.type+")");
            };

            /**
             * Encodes the specified field value to the specified buffer.
             * @param {*} value Verified field value
             * @param {ByteBuffer} buffer ByteBuffer to encode to
             * @return {ByteBuffer} The ByteBuffer for chaining
             * @throws {Error} If the field cannot be encoded
             * @expose
             */
            FieldPrototype.encode = function(value, buffer) {
                if (this.type === null || typeof this.type !== 'object')
                    throw Error("[INTERNAL] Unresolved type in "+this.toString(true)+": "+this.type);
                if (value === null || (this.repeated && value.length == 0))
                    return buffer; // Optional omitted
                try {
                    if (this.repeated) {
                        var i;
                        // "Only repeated fields of primitive numeric types (types which use the varint, 32-bit, or 64-bit wire
                        // types) can be declared 'packed'."
                        if (this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                            // "All of the elements of the field are packed into a single key-value pair with wire type 2
                            // (length-delimited). Each element is encoded the same way it would be normally, except without a
                            // tag preceding it."
                            buffer.writeVarint32((this.id << 3) | ProtoBuf.WIRE_TYPES.LDELIM);
                            buffer.ensureCapacity(buffer.offset += 1); // We do not know the length yet, so let's assume a varint of length 1
                            var start = buffer.offset; // Remember where the contents begin
                            for (i=0; i<value.length; i++)
                                this.encodeValue(value[i], buffer);
                            var len = buffer.offset-start,
                                varintLen = ByteBuffer.calculateVarint32(len);
                            if (varintLen > 1) { // We need to move the contents
                                var contents = buffer.slice(start, buffer.offset);
                                start += varintLen-1;
                                buffer.offset = start;
                                buffer.append(contents);
                            }
                            buffer.writeVarint32(len, start-varintLen);
                        } else {
                            // "If your message definition has repeated elements (without the [packed=true] option), the encoded
                            // message has zero or more key-value pairs with the same tag number"
                            for (i=0; i<value.length; i++)
                                buffer.writeVarint32((this.id << 3) | this.type.wireType),
                                this.encodeValue(value[i], buffer);
                        }
                    } else
                        buffer.writeVarint32((this.id << 3) | this.type.wireType),
                        this.encodeValue(value, buffer);
                } catch (e) {
                    throw Error("Illegal value for "+this.toString(true)+": "+value+" ("+e+")");
                }
                return buffer;
            };

            /**
             * Encodes a value to the specified buffer. Does not encode the key.
             * @param {*} value Field value
             * @param {ByteBuffer} buffer ByteBuffer to encode to
             * @return {ByteBuffer} The ByteBuffer for chaining
             * @throws {Error} If the value cannot be encoded
             * @expose
             */
            FieldPrototype.encodeValue = function(value, buffer) {
                if (value === null) return buffer; // Nothing to encode
                // Tag has already been written

                switch (this.type) {
                    // 32bit signed varint
                    case ProtoBuf.TYPES["int32"]:
                        // "If you use int32 or int64 as the type for a negative number, the resulting varint is always ten bytes
                        // long â€“ it is, effectively, treated like a very large unsigned integer." (see #122)
                        if (value < 0)
                            buffer.writeVarint64(value);
                        else
                            buffer.writeVarint32(value);
                        break;

                    // 32bit unsigned varint
                    case ProtoBuf.TYPES["uint32"]:
                        buffer.writeVarint32(value);
                        break;

                    // 32bit varint zig-zag
                    case ProtoBuf.TYPES["sint32"]:
                        buffer.writeVarint32ZigZag(value);
                        break;

                    // Fixed unsigned 32bit
                    case ProtoBuf.TYPES["fixed32"]:
                        buffer.writeUint32(value);
                        break;

                    // Fixed signed 32bit
                    case ProtoBuf.TYPES["sfixed32"]:
                        buffer.writeInt32(value);
                        break;

                    // 64bit varint as-is
                    case ProtoBuf.TYPES["int64"]:
                    case ProtoBuf.TYPES["uint64"]:
                        buffer.writeVarint64(value); // throws
                        break;

                    // 64bit varint zig-zag
                    case ProtoBuf.TYPES["sint64"]:
                        buffer.writeVarint64ZigZag(value); // throws
                        break;

                    // Fixed unsigned 64bit
                    case ProtoBuf.TYPES["fixed64"]:
                        buffer.writeUint64(value); // throws
                        break;

                    // Fixed signed 64bit
                    case ProtoBuf.TYPES["sfixed64"]:
                        buffer.writeInt64(value); // throws
                        break;

                    // Bool
                    case ProtoBuf.TYPES["bool"]:
                        if (typeof value === 'string')
                            buffer.writeVarint32(value.toLowerCase() === 'false' ? 0 : !!value);
                        else
                            buffer.writeVarint32(value ? 1 : 0);
                        break;

                    // Constant enum value
                    case ProtoBuf.TYPES["enum"]:
                        buffer.writeVarint32(value);
                        break;

                    // 32bit float
                    case ProtoBuf.TYPES["float"]:
                        buffer.writeFloat32(value);
                        break;

                    // 64bit float
                    case ProtoBuf.TYPES["double"]:
                        buffer.writeFloat64(value);
                        break;

                    // Length-delimited string
                    case ProtoBuf.TYPES["string"]:
                        buffer.writeVString(value);
                        break;

                    // Length-delimited bytes
                    case ProtoBuf.TYPES["bytes"]:
                        if (value.remaining() < 0)
                            throw Error("Illegal value for "+this.toString(true)+": "+value.remaining()+" bytes remaining");
                        var prevOffset = value.offset;
                        buffer.writeVarint32(value.remaining());
                        buffer.append(value);
                        value.offset = prevOffset;
                        break;

                    // Embedded message
                    case ProtoBuf.TYPES["message"]:
                        var bb = new ByteBuffer().LE();
                        this.resolvedType.encode(value, bb);
                        buffer.writeVarint32(bb.offset);
                        buffer.append(bb.flip());
                        break;

                    // Legacy group
                    case ProtoBuf.TYPES["group"]:
                        this.resolvedType.encode(value, buffer);
                        buffer.writeVarint32((this.id << 3) | ProtoBuf.WIRE_TYPES.ENDGROUP);
                        break;

                    default:
                        // We should never end here
                        throw Error("[INTERNAL] Illegal value to encode in "+this.toString(true)+": "+value+" (unknown type)");
                }
                return buffer;
            };

            /**
             * Calculates the length of this field's value on the network level.
             * @param {*} value Field value
             * @returns {number} Byte length
             * @expose
             *
            FieldPrototype.calculate = function(value) {
                value = this.verifyValue(value); // May throw
                if (this.type === null || typeof this.type !== 'object')
                    throw Error("[INTERNAL] Unresolved type in "+this.toString(true)+": "+this.type);
                if (value === null || (this.repeated && value.length == 0))
                    return 0; // Optional omitted
                var n = 0;
                try {
                    if (this.repeated) {
                        var i, ni;
                        if (this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                            n += ByteBuffer.calculateVarint32((this.id << 3) | ProtoBuf.WIRE_TYPES.LDELIM);
                            ni = 0;
                            for (i=0; i<value.length; i++)
                                ni += this.calculateValue(value[i]);
                            n += ByteBuffer.calculateVarint32(ni);
                            n += ni;
                        } else {
                            for (i=0; i<value.length; i++)
                                n += ByteBuffer.calculateVarint32((this.id << 3) | this.type.wireType),
                                n += this.calculateValue(value[i]);
                        }
                    } else {
                        n += ByteBuffer.calculateVarint32((this.id << 3) | this.type.wireType);
                        n += this.calculateValue(value);
                    }
                } catch (e) {
                    throw Error("Illegal value for "+this.toString(true)+": "+value+" ("+e+")");
                }
                return n;
            };
*/
            /**
             * Calculates the byte length of a value.
             * @param {*} value Field value
             * @returns {number} Byte length
             * @throws {Error} If the value cannot be calculated
             * @expose
             */
            FieldPrototype.calculateValue = function(value) {
                if (value === null) return 0; // Nothing to encode
                // Tag has already been written
                var n;
                switch (this.type) {
                    case ProtoBuf.TYPES["int32"]:
                        return value < 0 ? ByteBuffer.calculateVarint64(value) : ByteBuffer.calculateVarint32(value);
                    case ProtoBuf.TYPES["uint32"]:
                        return ByteBuffer.calculateVarint32(value);
                    case ProtoBuf.TYPES["sint32"]:
                        return ByteBuffer.calculateVarint32(ByteBuffer.zigZagEncode32(value));
                    case ProtoBuf.TYPES["fixed32"]:
                    case ProtoBuf.TYPES["sfixed32"]:
                    case ProtoBuf.TYPES["float"]:
                        return 4;
                    case ProtoBuf.TYPES["int64"]:
                    case ProtoBuf.TYPES["uint64"]:
                        return ByteBuffer.calculateVarint64(value);
                    case ProtoBuf.TYPES["sint64"]:
                        return ByteBuffer.calculateVarint64(ByteBuffer.zigZagEncode64(value));
                    case ProtoBuf.TYPES["fixed64"]:
                    case ProtoBuf.TYPES["sfixed64"]:
                        return 8;
                    case ProtoBuf.TYPES["bool"]:
                        return 1;
                    case ProtoBuf.TYPES["enum"]:
                        return ByteBuffer.calculateVarint32(value);
                    case ProtoBuf.TYPES["double"]:
                        return 8;
                    case ProtoBuf.TYPES["string"]:
                        n = ByteBuffer.calculateUTF8Bytes(value);
                        return ByteBuffer.calculateVarint32(n) + n;
                    case ProtoBuf.TYPES["bytes"]:
                        if (value.remaining() < 0)
                            throw Error("Illegal value for "+this.toString(true)+": "+value.remaining()+" bytes remaining");
                        return ByteBuffer.calculateVarint32(value.remaining()) + value.remaining();
                    case ProtoBuf.TYPES["message"]:
                        n = this.resolvedType.calculate(value);
                        return ByteBuffer.calculateVarint32(n) + n;
                    case ProtoBuf.TYPES["group"]:
                        n = this.resolvedType.calculate(value);
                        return n + ByteBuffer.calculateVarint32((this.id << 3) | ProtoBuf.WIRE_TYPES.ENDGROUP);
                }
                // We should never end here
                throw Error("[INTERNAL] Illegal value to encode in "+this.toString(true)+": "+value+" (unknown type)");
            };

            /**
             * Decode the field value from the specified buffer.
             * @param {number} wireType Leading wire type
             * @param {ByteBuffer} buffer ByteBuffer to decode from
             * @param {boolean=} skipRepeated Whether to skip the repeated check or not. Defaults to false.
             * @return {*} Decoded value
             * @throws {Error} If the field cannot be decoded
             * @expose

            FieldPrototype.decode = function(wireType, buffer, skipRepeated) {
                var value, nBytes;
                if (wireType != this.type.wireType && (skipRepeated || (wireType != ProtoBuf.WIRE_TYPES.LDELIM || !this.repeated)))
                    throw Error("Illegal wire type for field "+this.toString(true)+": "+wireType+" ("+this.type.wireType+" expected)");
                if (wireType == ProtoBuf.WIRE_TYPES.LDELIM && this.repeated && this.options["packed"] && ProtoBuf.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {
                    if (!skipRepeated) {
                        nBytes = buffer.readVarint32();
                        nBytes = buffer.offset + nBytes; // Limit
                        var values = [];
                        while (buffer.offset < nBytes)
                            values.push(this.decode(this.type.wireType, buffer, true));
                        return values;
                    }
                    // Read the next value otherwise...
                }
                switch (this.type) {
                    // 32bit signed varint
                    case ProtoBuf.TYPES["int32"]:
                        return buffer.readVarint32() | 0;

                    // 32bit unsigned varint
                    case ProtoBuf.TYPES["uint32"]:
                        return buffer.readVarint32() >>> 0;

                    // 32bit signed varint zig-zag
                    case ProtoBuf.TYPES["sint32"]:
                        return buffer.readVarint32ZigZag() | 0;

                    // Fixed 32bit unsigned
                    case ProtoBuf.TYPES["fixed32"]:
                        return buffer.readUint32() >>> 0;

                    case ProtoBuf.TYPES["sfixed32"]:
                        return buffer.readInt32() | 0;

                    // 64bit signed varint
                    case ProtoBuf.TYPES["int64"]:
                        return buffer.readVarint64();

                    // 64bit unsigned varint
                    case ProtoBuf.TYPES["uint64"]:
                        return buffer.readVarint64().toUnsigned();

                    // 64bit signed varint zig-zag
                    case ProtoBuf.TYPES["sint64"]:
                        return buffer.readVarint64ZigZag();

                    // Fixed 64bit unsigned
                    case ProtoBuf.TYPES["fixed64"]:
                        return buffer.readUint64();

                    // Fixed 64bit signed
                    case ProtoBuf.TYPES["sfixed64"]:
                        return buffer.readInt64();

                    // Bool varint
                    case ProtoBuf.TYPES["bool"]:
                        return !!buffer.readVarint32();

                    // Constant enum value (varint)
                    case ProtoBuf.TYPES["enum"]:
                        // The following Builder.Message#set will already throw
                        return buffer.readVarint32();

                    // 32bit float
                    case ProtoBuf.TYPES["float"]:
                        return buffer.readFloat();

                    // 64bit float
                    case ProtoBuf.TYPES["double"]:
                        return buffer.readDouble();

                    // Length-delimited string
                    case ProtoBuf.TYPES["string"]:
                        return buffer.readVString();

                    // Length-delimited bytes
                    case ProtoBuf.TYPES["bytes"]: {
                        nBytes = buffer.readVarint32();
                        if (buffer.remaining() < nBytes)
                            throw Error("Illegal number of bytes for "+this.toString(true)+": "+nBytes+" required but got only "+buffer.remaining());
                        value = buffer.clone(); // Offset already set
                        value.limit = value.offset+nBytes;
                        buffer.offset += nBytes;
                        return value;
                    }

                    // Length-delimited embedded message
                    case ProtoBuf.TYPES["message"]: {
                        nBytes = buffer.readVarint32();
                        return this.resolvedType.decode(buffer, nBytes);
                    }

                    // Legacy group
                    case ProtoBuf.TYPES["group"]:
                        return this.resolvedType.decode(buffer, -1, this.id);
                }

                // We should never end here
                throw Error("[INTERNAL] Illegal wire type for "+this.toString(true)+": "+wireType);
            };
*/
            /**
             * @alias ProtoBuf.Reflect.Message.Field
             * @expose
             */
            Reflect.Message.Field = Field;

            /**
             * Constructs a new Message ExtensionField.
             * @exports ProtoBuf.Reflect.Message.ExtensionField
             * @param {!ProtoBuf.Builder} builder Builder reference
             * @param {!ProtoBuf.Reflect.Message} message Message reference
             * @param {string} rule Rule, one of requried, optional, repeated
             * @param {string} type Data type, e.g. int32
             * @param {string} name Field name
             * @param {number} id Unique field id
             * @param {Object.<string,*>=} options Options
             * @constructor
             * @extends ProtoBuf.Reflect.Message.Field
             */
            var ExtensionField = function(builder, message, rule, type, name, id, options) {
                Field.call(this, builder, message, rule, type, name, id, options);

                /**
                 * Extension reference.
                 * @type {!ProtoBuf.Reflect.Extension}
                 * @expose
                 */
                this.extension;
            };

            // Extends Field
            ExtensionField.prototype = Object.create(Field.prototype);

            /**
             * @alias ProtoBuf.Reflect.Message.ExtensionField
             * @expose
             */
            Reflect.Message.ExtensionField = ExtensionField;

            /**
             * Constructs a new Message OneOf.
             * @exports ProtoBuf.Reflect.Message.OneOf
             * @param {!ProtoBuf.Builder} builder Builder reference
             * @param {!ProtoBuf.Reflect.Message} message Message reference
             * @param {string} name OneOf name
             * @constructor
             * @extends ProtoBuf.Reflect.T
             */
            var OneOf = function(builder, message, name) {
                T.call(this, builder, message, name);

                /**
                 * Enclosed fields.
                 * @type {!Array.<!ProtoBuf.Reflect.Message.Field>}
                 * @expose
                 */
                this.fields = [];
            };

            /**
             * @alias ProtoBuf.Reflect.Message.OneOf
             * @expose
             */
            Reflect.Message.OneOf = OneOf;

            /**
             * Constructs a new Enum.
             * @exports ProtoBuf.Reflect.Enum
             * @param {!ProtoBuf.Builder} builder Builder reference
             * @param {!ProtoBuf.Reflect.T} parent Parent Reflect object
             * @param {string} name Enum name
             * @param {Object.<string,*>=} options Enum options
             * @constructor
             * @extends ProtoBuf.Reflect.Namespace
             */
            var Enum = function(builder, parent, name, options) {
                Namespace.call(this, builder, parent, name, options);

                /**
                 * @override
                 */
                this.className = "Enum";

                /**
                 * Runtime enum object.
                 * @type {Object.<string,number>|null}
                 * @expose
                 */
                this.object = null;
            };

            /**
             * @alias ProtoBuf.Reflect.Enum.prototype
             * @inner
             */
            var EnumPrototype = Enum.prototype = Object.create(Namespace.prototype);

            /**
             * Builds this enum and returns the runtime counterpart.
             * @return {Object<string,*>}
             * @expose
             */
            EnumPrototype.build = function() {
                var enm = {},
                    values = this.getChildren(Enum.Value);
                for (var i=0, k=values.length; i<k; ++i)
                    enm[values[i]['name']] = values[i]['id'];
                if (Object.defineProperty)
                    Object.defineProperty(enm, '$options', { "value": this.buildOpt() });
                return this.object = enm;
            };

            /**
             * @alias ProtoBuf.Reflect.Enum
             * @expose
             */
            Reflect.Enum = Enum;

            /**
             * Constructs a new Enum Value.
             * @exports ProtoBuf.Reflect.Enum.Value
             * @param {!ProtoBuf.Builder} builder Builder reference
             * @param {!ProtoBuf.Reflect.Enum} enm Enum reference
             * @param {string} name Field name
             * @param {number} id Unique field id
             * @constructor
             * @extends ProtoBuf.Reflect.T
             */
            var Value = function(builder, enm, name, id) {
                T.call(this, builder, enm, name);

                /**
                 * @override
                 */
                this.className = "Enum.Value";

                /**
                 * Unique enum value id.
                 * @type {number}
                 * @expose
                 */
                this.id = id;
            };

            // Extends T
            Value.prototype = Object.create(T.prototype);

            /**
             * @alias ProtoBuf.Reflect.Enum.Value
             * @expose
             */
            Reflect.Enum.Value = Value;

            /**
             * An extension (field).
             * @exports ProtoBuf.Reflect.Extension
             * @constructor
             * @param {!ProtoBuf.Builder} builder Builder reference
             * @param {!ProtoBuf.Reflect.T} parent Parent object
             * @param {string} name Object name
             * @param {!ProtoBuf.Reflect.Message.Field} field Extension field
             */
            var Extension = function(builder, parent, name, field) {
                T.call(this, builder, parent, name);

                /**
                 * Extended message field.
                 * @type {!ProtoBuf.Reflect.Message.Field}
                 * @expose
                 */
                this.field = field;
            };

            // Extends T
            Extension.prototype = Object.create(T.prototype);

            /**
             * @alias ProtoBuf.Reflect.Extension
             * @expose
             */
            Reflect.Extension = Extension;

            /**
             * Constructs a new Service.
             * @exports ProtoBuf.Reflect.Service
             * @param {!ProtoBuf.Builder} builder Builder reference
             * @param {!ProtoBuf.Reflect.Namespace} root Root
             * @param {string} name Service name
             * @param {Object.<string,*>=} options Options
             * @constructor
             * @extends ProtoBuf.Reflect.Namespace
             */
            var Service = function(builder, root, name, options) {
                Namespace.call(this, builder, root, name, options);

                /**
                 * @override
                 */
                this.className = "Service";

                /**
                 * Built runtime service class.
                 * @type {?function(new:ProtoBuf.Builder.Service)}
                 */
                this.clazz = null;
            };

            /**
             * @alias ProtoBuf.Reflect.Service.prototype
             * @inner
             */
            var ServicePrototype = Service.prototype = Object.create(Namespace.prototype);

            /**
             * Builds the service and returns the runtime counterpart, which is a fully functional class.
             * @see ProtoBuf.Builder.Service
             * @param {boolean=} rebuild Whether to rebuild or not
             * @return {Function} Service class
             * @throws {Error} If the message cannot be built
             * @expose
             */
            ServicePrototype.buildx = function(rebuild) {
                if (this.clazz && !rebuild)
                    return this.clazz;

                // Create the runtime Service class in its own scope
                return this.clazz = (function(ProtoBuf, T) {

                    /**
                     * Constructs a new runtime Service.
                     * @name ProtoBuf.Builder.Service
                     * @param {function(string, ProtoBuf.Builder.Message, function(Error, ProtoBuf.Builder.Message=))=} rpcImpl RPC implementation receiving the method name and the message
                     * @class Barebone of all runtime services.
                     * @constructor
                     * @throws {Error} If the service cannot be created
                     */
    //                var Service = function(rpcImpl) {
  //                      ProtoBuf.Builder.Service.call(this);
//
                        /**
                         * Service implementation.
                         * @name ProtoBuf.Builder.Service#rpcImpl
                         * @type {!function(string, ProtoBuf.Builder.Message, function(Error, ProtoBuf.Builder.Message=))}
                         * @expose
                         */
    //                    this.rpcImpl = rpcImpl || function(name, msg, callback) {
                            // This is what a user has to implement: A function receiving the method name, the actual message to
                            // send (type checked) and the callback that's either provided with the error as its first
                            // argument or null and the actual response message.
      //                      setTimeout(callback.bind(this, Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")), 0); // Must be async
                        //};
                    //};

                    /**
                     * @alias ProtoBuf.Builder.Service.prototype
                     * @inner
                     */
                    //var ServicePrototype = Service.prototype = Object.create(ProtoBuf.Builder.Service.prototype);

                    /**
                     * Asynchronously performs an RPC call using the given RPC implementation.
                     * @name ProtoBuf.Builder.Service.[Method]
                     * @function
                     * @param {!function(string, ProtoBuf.Builder.Message, function(Error, ProtoBuf.Builder.Message=))} rpcImpl RPC implementation
                     * @param {ProtoBuf.Builder.Message} req Request
                     * @param {function(Error, (ProtoBuf.Builder.Message|ByteBuffer|Buffer|string)=)} callback Callback receiving
                     *  the error if any and the response either as a pre-parsed message or as its raw bytes
                     * @abstract
                     */

                    /**
                     * Asynchronously performs an RPC call using the instance's RPC implementation.
                     * @name ProtoBuf.Builder.Service#[Method]
                     * @function
                     * @param {ProtoBuf.Builder.Message} req Request
                     * @param {function(Error, (ProtoBuf.Builder.Message|ByteBuffer|Buffer|string)=)} callback Callback receiving
                     *  the error if any and the response either as a pre-parsed message or as its raw bytes
                     * @abstract
                     */
/*
                    var rpc = T.getChildren(ProtoBuf.Reflect.Service.RPCMethod);
                    for (var i=0; i<rpc.length; i++) {
                        (function(method) {

                            // service#Method(message, callback)
                            ServicePrototype[method.name] = function(req, callback) {
                                try {
                                    if (!req || !(req instanceof method.resolvedRequestType.clazz)) {
                                        setTimeout(callback.bind(this, Error("Illegal request type provided to service method "+T.name+"#"+method.name)), 0);
                                        return;
                                    }
                                    this.rpcImpl(method.fqn(), req, function(err, res) { // Assumes that this is properly async
                                        if (err) {
                                            callback(err);
                                            return;
                                        }
                                        try { res = method.resolvedResponseType.clazz.decode(res); } catch (notABuffer) {}
                                        if (!res || !(res instanceof method.resolvedResponseType.clazz)) {
                                            callback(Error("Illegal response type received in service method "+ T.name+"#"+method.name));
                                            return;
                                        }
                                        callback(null, res);
                                    });
                                } catch (err) {
                                    setTimeout(callback.bind(this, err), 0);
                                }
                            };

                            // Service.Method(rpcImpl, message, callback)
                            Service[method.name] = function(rpcImpl, req, callback) {
                                new Service(rpcImpl)[method.name](req, callback);
                            };

                            if (Object.defineProperty)
                                Object.defineProperty(Service[method.name], "$options", { "value": method.buildOpt() }),
                                Object.defineProperty(ServicePrototype[method.name], "$options", { "value": Service[method.name]["$options"] });
                        })(rpc[i]);
                    } */

                    // Properties

                    /**
                     * Service options.
                     * @name ProtoBuf.Builder.Service.$options
                     * @type {Object.<string,*>}
                     * @expose
                     */
                    var $optionsS; // cc needs this

                    /**
                     * Service options.
                     * @name ProtoBuf.Builder.Service#$options
                     * @type {Object.<string,*>}
                     * @expose
                     */
                    var $options;

                    /**
                     * Reflection type.
                     * @name ProtoBuf.Builder.Service.$type
                     * @type {!ProtoBuf.Reflect.Service}
                     * @expose
                     */
                    var $typeS;

                    /**
                     * Reflection type.
                     * @name ProtoBuf.Builder.Service#$type
                     * @type {!ProtoBuf.Reflect.Service}
                     * @expose
                     */
                    var $type;

                    if (Object.defineProperty)
                        Object.defineProperty(Service, "$options", { "value": T.buildOpt() }),
                        Object.defineProperty(ServicePrototype, "$options", { "value": Service["$options"] }),
                        Object.defineProperty(Service, "$type", { "value": T }),
                        Object.defineProperty(ServicePrototype, "$type", { "value": T });

                    return Service;

                })(ProtoBuf, this);
            };

            /**
             * @alias ProtoBuf.Reflect.Service
             * @expose
             */
            Reflect.Service = Service;

            /**
             * Abstract service method.
             * @exports ProtoBuf.Reflect.Service.Method
             * @param {!ProtoBuf.Builder} builder Builder reference
             * @param {!ProtoBuf.Reflect.Service} svc Service
             * @param {string} name Method name
             * @param {Object.<string,*>=} options Options
             * @constructor
             * @extends ProtoBuf.Reflect.T
             */
            var Method = function(builder, svc, name, options) {
                T.call(this, builder, svc, name);

                /**
                 * @override
                 */
                this.className = "Service.Method";

                /**
                 * Options.
                 * @type {Object.<string, *>}
                 * @expose
                 */
                this.options = options || {};
            };

            /**
             * @alias ProtoBuf.Reflect.Service.Method.prototype
             * @inner
             */
            var MethodPrototype = Method.prototype = Object.create(T.prototype);

            /**
             * Builds the method's '$options' property.
             * @name ProtoBuf.Reflect.Service.Method#buildOpt
             * @function
             * @return {Object.<string,*>}
             */
            MethodPrototype.buildOpt = NamespacePrototype.buildOpt;

            /**
             * @alias ProtoBuf.Reflect.Service.Method
             * @expose
             */
            Reflect.Service.Method = Method;

            /**
             * RPC service method.
             * @exports ProtoBuf.Reflect.Service.RPCMethod
             * @param {!ProtoBuf.Builder} builder Builder reference
             * @param {!ProtoBuf.Reflect.Service} svc Service
             * @param {string} name Method name
             * @param {string} request Request message name
             * @param {string} response Response message name
             * @param {Object.<string,*>=} options Options
             * @constructor
             * @extends ProtoBuf.Reflect.Service.Method
             */
            var RPCMethod = function(builder, svc, name, request, response, options) {
                Method.call(this, builder, svc, name, options);

                /**
                 * @override
                 */
                this.className = "Service.RPCMethod";

                /**
                 * Request message name.
                 * @type {string}
                 * @expose
                 */
                this.requestName = request;

                /**
                 * Response message name.
                 * @type {string}
                 * @expose
                 */
                this.responseName = response;

                /**
                 * Resolved request message type.
                 * @type {ProtoBuf.Reflect.Message}
                 * @expose
                 */
                this.resolvedRequestType = null;

                /**
                 * Resolved response message type.
                 * @type {ProtoBuf.Reflect.Message}
                 * @expose
                 */
                this.resolvedResponseType = null;
            };

            // Extends Method
            RPCMethod.prototype = Object.create(Method.prototype);

            /**
             * @alias ProtoBuf.Reflect.Service.RPCMethod
             * @expose
             */
            Reflect.Service.RPCMethod = RPCMethod;

            return Reflect;

        })(ProtoBuf);

        /**
         * @alias ProtoBuf.Builder
         * @expose
         */
        ProtoBuf.Builder = (function(ProtoBuf, Lang, Reflect) {
            "use strict";

            /**
             * Constructs a new Builder.
             * @exports ProtoBuf.Builder
             * @class Provides the functionality to build protocol messages.
             * @param {Object.<string,*>=} options Options
             * @constructor
             */
            var Builder = function(options) {

                /**
                 * Namespace.
                 * @type {ProtoBuf.Reflect.Namespace}
                 * @expose
                 */
                this.ns = new Reflect.Namespace(this, null, ""); // Global namespace

                /**
                 * Namespace pointer.
                 * @type {ProtoBuf.Reflect.T}
                 * @expose
                 */
                this.ptr = this.ns;

                /**
                 * Resolved flag.
                 * @type {boolean}
                 * @expose
                 */
                this.resolved = false;

                /**
                 * The current building result.
                 * @type {Object.<string,ProtoBuf.Builder.Message|Object>|null}
                 * @expose
                 */
                this.result = null;

                /**
                 * Imported files.
                 * @type {Array.<string>}
                 * @expose
                 */
                this.files = {};

                /**
                 * Import root override.
                 * @type {?string}
                 * @expose
                 */
                this.importRoot = null;

                /**
                 * Options.
                 * @type {!Object.<string, *>}
                 * @expose
                 */
                this.options = options || {};
            };

            /**
             * @alias ProtoBuf.Builder.prototype
             * @inner
             */
            var BuilderPrototype = Builder.prototype;

            /**
             * Resets the pointer to the root namespace.
             * @expose
             */
            BuilderPrototype.reset = function() {
                this.ptr = this.ns;
            };

            /**
             * Defines a package on top of the current pointer position and places the pointer on it.
             * @param {string} pkg
             * @return {ProtoBuf.Builder} this
             * @throws {Error} If the package name is invalid
             * @expose
             */
            BuilderPrototype.define = function(pkg) {
                if (typeof pkg !== 'string' || !Lang.TYPEREF.test(pkg))
                    throw Error("Illegal package: "+pkg);
                var part = pkg.split("."), i, ns;
                for (i=0; i<part.length; i++) // To be absolutely sure
                    if (!Lang.NAME.test(part[i]))
                        throw Error("Illegal package: "+part[i]);
                for (i=0; i<part.length; i++) {
                    ns = this.ptr.getChild(part[i]);
                    if (ns === null) // Keep existing
                        this.ptr.addChild(ns = new Reflect.Namespace(this, this.ptr, part[i]));
                    this.ptr = ns;
                }
                return this;
            };

            /**
             * Tests if a definition is a valid message definition.
             * @param {Object.<string,*>} def Definition
             * @return {boolean} true if valid, else false
             * @expose
             */
            Builder.isValidMessage = function(def) {
                // Messages require a string name
                if (typeof def["name"] !== 'string' || !Lang.NAME.test(def["name"]))
                    return false;
                // Messages must not contain values (that'd be an enum) or methods (that'd be a service)
                if (typeof def["values"] !== 'undefined' || typeof def["rpc"] !== 'undefined')
                    return false;
                // Fields, enums and messages are arrays if provided
                var i;
                if (typeof def["fields"] !== 'undefined') {
                    if (!ProtoBuf.Util.isArray(def["fields"]))
                        return false;
                    var ids = [], id; // IDs must be unique
                    for (i=0; i<def["fields"].length; i++) {
                        if (!Builder.isValidMessageField(def["fields"][i]))
                            return false;
                        id = parseInt(def["fields"][i]["id"], 10);
                        if (ids.indexOf(id) >= 0)
                            return false;
                        ids.push(id);
                    }
                    ids = null;
                }
                if (typeof def["enums"] !== 'undefined') {
                    if (!ProtoBuf.Util.isArray(def["enums"]))
                        return false;
                    for (i=0; i<def["enums"].length; i++)
                        if (!Builder.isValidEnum(def["enums"][i]))
                            return false;
                }
                if (typeof def["messages"] !== 'undefined') {
                    if (!ProtoBuf.Util.isArray(def["messages"]))
                        return false;
                    for (i=0; i<def["messages"].length; i++)
                        if (!Builder.isValidMessage(def["messages"][i]) && !Builder.isValidExtend(def["messages"][i]))
                            return false;
                }
                if (typeof def["extensions"] !== 'undefined')
                    if (!ProtoBuf.Util.isArray(def["extensions"]) || def["extensions"].length !== 2 || typeof def["extensions"][0] !== 'number' || typeof def["extensions"][1] !== 'number')
                        return false;
                return true;
            };

            /**
             * Tests if a definition is a valid message field definition.
             * @param {Object} def Definition
             * @return {boolean} true if valid, else false
             * @expose
             */
            Builder.isValidMessageField = function(def) {
                // Message fields require a string rule, name and type and an id
                if (typeof def["rule"] !== 'string' || typeof def["name"] !== 'string' || typeof def["type"] !== 'string' || typeof def["id"] === 'undefined')
                    return false;
                if (!Lang.RULE.test(def["rule"]) || !Lang.NAME.test(def["name"]) || !Lang.TYPEREF.test(def["type"]) || !Lang.ID.test(""+def["id"]))
                    return false;
                if (typeof def["options"] !== 'undefined') {
                    // Options are objects
                    if (typeof def["options"] !== 'object')
                        return false;
                    // Options are <string,string|number|boolean>
                    var keys = Object.keys(def["options"]);
                    for (var i=0, key; i<keys.length; i++)
                        if (typeof (key = keys[i]) !== 'string' || (typeof def["options"][key] !== 'string' && typeof def["options"][key] !== 'number' && typeof def["options"][key] !== 'boolean'))
                            return false;
                }
                return true;
            };

            /**
             * Tests if a definition is a valid enum definition.
             * @param {Object} def Definition
             * @return {boolean} true if valid, else false
             * @expose
             */
            Builder.isValidEnum = function(def) {
                // Enums require a string name
                if (typeof def["name"] !== 'string' || !Lang.NAME.test(def["name"]))
                    return false;
                // Enums require at least one value
                if (typeof def["values"] === 'undefined' || !ProtoBuf.Util.isArray(def["values"]) || def["values"].length == 0)
                    return false;
                for (var i=0; i<def["values"].length; i++) {
                    // Values are objects
                    if (typeof def["values"][i] != "object")
                        return false;
                    // Values require a string name and an id
                    if (typeof def["values"][i]["name"] !== 'string' || typeof def["values"][i]["id"] === 'undefined')
                        return false;
                    if (!Lang.NAME.test(def["values"][i]["name"]) || !Lang.NEGID.test(""+def["values"][i]["id"]))
                        return false;
                }
                // It's not important if there are other fields because ["values"] is already unique
                return true;
            };

            /**
             * Creates ths specified protocol types at the current pointer position.
             * @param {Array.<Object.<string,*>>} defs Messages, enums or services to create
             * @return {ProtoBuf.Builder} this
             * @throws {Error} If a message definition is invalid
             * @expose
             */
            BuilderPrototype.create = function(defs) {
                if (!defs)
                    return this; // Nothing to create
                if (!ProtoBuf.Util.isArray(defs))
                    defs = [defs];
                if (defs.length === 0)
                    return this;

                // It's quite hard to keep track of scopes and memory here, so let's do this iteratively.
                var stack = [];
                stack.push(defs); // One level [a, b, c]
                while (stack.length > 0) {
                    defs = stack.pop();
                    if (ProtoBuf.Util.isArray(defs)) { // Stack always contains entire namespaces
                        while (defs.length > 0) {
                            var def = defs.shift(); // Namespace always contains an array of messages, enums and services
                            if (Builder.isValidMessage(def)) {
                                var obj = new Reflect.Message(this, this.ptr, def["name"], def["options"], def["isGroup"]);
                                // Create OneOfs
                                var oneofs = {};
                                if (def["oneofs"]) {
                                    var keys = Object.keys(def["oneofs"]);
                                    for (var i=0, k=keys.length; i<k; ++i)
                                        obj.addChild(oneofs[keys[i]] = new Reflect.Message.OneOf(this, obj, keys[i]));
                                }
                                // Create fields
                                if (def["fields"] && def["fields"].length > 0) {
                                    for (i=0, k=def["fields"].length; i<k; ++i) { // i:k=Fields
                                        var fld = def['fields'][i];
                                        if (obj.getChild(fld['id']) !== null)
                                            throw Error("Duplicate field id in message "+obj.name+": "+fld['id']);
                                        if (fld["options"]) {
                                            var opts = Object.keys(fld["options"]);
                                            for (var j= 0,l=opts.length; j<l; ++j) { // j:l=Option names
                                                if (typeof opts[j] !== 'string')
                                                    throw Error("Illegal field option name in message "+obj.name+"#"+fld["name"]+": "+opts[j]);
                                                if (typeof fld["options"][opts[j]] !== 'string' && typeof fld["options"][opts[j]] !== 'number' && typeof fld["options"][opts[j]] !== 'boolean')
                                                    throw Error("Illegal field option value in message "+obj.name+"#"+fld["name"]+"#"+opts[j]+": "+fld["options"][opts[j]]);
                                            }
                                        }
                                        var oneof = null;
                                        if (typeof fld["oneof"] === 'string') {
                                            oneof = oneofs[fld["oneof"]];
                                            if (typeof oneof === 'undefined')
                                                throw Error("Illegal oneof in message "+obj.name+"#"+fld["name"]+": "+fld["oneof"]);
                                        }
                                        fld = new Reflect.Message.Field(this, obj, fld["rule"], fld["type"], fld["name"], fld["id"], fld["options"], oneof);
                                        if (oneof)
                                            oneof.fields.push(fld);
                                        obj.addChild(fld);
                                    }
                                }
                                // Push enums and messages to stack
                                var subObj = [];
                                if (typeof def["enums"] !== 'undefined' && def['enums'].length > 0)
                                    for (i=0; i<def["enums"].length; i++)
                                        subObj.push(def["enums"][i]);
                                if (def["messages"] && def["messages"].length > 0)
                                    for (i=0; i<def["messages"].length; i++)
                                        subObj.push(def["messages"][i]);
                                // Set extension range
                                if (def["extensions"]) {
                                    obj.extensions = def["extensions"];
                                    if (obj.extensions[0] < ProtoBuf.ID_MIN)
                                        obj.extensions[0] = ProtoBuf.ID_MIN;
                                    if (obj.extensions[1] > ProtoBuf.ID_MAX)
                                        obj.extensions[1] = ProtoBuf.ID_MAX;
                                }
                                this.ptr.addChild(obj); // Add to current namespace
                                if (subObj.length > 0) {
                                    stack.push(defs); // Push the current level back
                                    defs = subObj; // Continue processing sub level
                                    subObj = null;
                                    this.ptr = obj; // And move the pointer to this namespace
                                    obj = null;
                                    continue;
                                }
                                subObj = null;
                                obj = null;
                            } else if (Builder.isValidEnum(def)) {
                                obj = new Reflect.Enum(this, this.ptr, def["name"], def["options"]);
                                for (i=0; i<def["values"].length; i++)
                                    obj.addChild(new Reflect.Enum.Value(this, obj, def["values"][i]["name"], def["values"][i]["id"]));
                                this.ptr.addChild(obj);
                                obj = null;
                            } else if (Builder.isValidService(def)) {
                                obj = new Reflect.Service(this, this.ptr, def["name"], def["options"]);
                                for (i in def["rpc"])
                                    if (def["rpc"].hasOwnProperty(i))
                                        obj.addChild(new Reflect.Service.RPCMethod(this, obj, i, def["rpc"][i]["request"], def["rpc"][i]["response"], def["rpc"][i]["options"]));
                                this.ptr.addChild(obj);
                                obj = null;
                            } else if (Builder.isValidExtend(def)) {
                                obj = this.ptr.resolve(def["ref"]);
                                if (obj) {
                                    for (i=0; i<def["fields"].length; i++) { // i=Fields
                                        if (obj.getChild(def['fields'][i]['id']) !== null)
                                            throw Error("Duplicate extended field id in message "+obj.name+": "+def['fields'][i]['id']);
                                        if (def['fields'][i]['id'] < obj.extensions[0] || def['fields'][i]['id'] > obj.extensions[1])
                                            throw Error("Illegal extended field id in message "+obj.name+": "+def['fields'][i]['id']+" ("+obj.extensions.join(' to ')+" expected)");
                                        // Convert extension field names to camel case notation if the override is set
                                        var name = def["fields"][i]["name"];
                                        //if (this.options['convertFieldsToCamelCase'])
                                        //    name = Reflect.Message.Field._toCamelCase(def["fields"][i]["name"]);
                                        // see #161: Extensions use their fully qualified name as their runtime key and...
                                        fld = new Reflect.Message.ExtensionField(this, obj, def["fields"][i]["rule"], def["fields"][i]["type"], this.ptr.fqn()+'.'+name, def["fields"][i]["id"], def["fields"][i]["options"]);
                                        // ...are added on top of the current namespace as an extension which is used for
                                        // resolving their type later on (the extension always keeps the original name to
                                        // prevent naming collisions)
                                        var ext = new Reflect.Extension(this, this.ptr, def["fields"][i]["name"], fld);
                                        fld.extension = ext;
                                        this.ptr.addChild(ext);
                                        obj.addChild(fld);
                                    }
                                } else if (!/\.?google\.protobuf\./.test(def["ref"])) // Silently skip internal extensions
                                    throw Error("Extended message "+def["ref"]+" is not defined");
                            } else
                                throw Error("Not a valid definition: "+JSON.stringify(def));
                            def = null;
                        }
                        // Break goes here
                    } else
                        throw Error("Not a valid namespace: "+JSON.stringify(defs));
                    defs = null;
                    this.ptr = this.ptr.parent; // This namespace is s done
                }
                this.resolved = false; // Require re-resolve
                this.result = null; // Require re-build
                return this;
            };

            /**
             * Imports another definition into this builder.
             * @param {Object.<string,*>} json Parsed import
             * @param {(string|{root: string, file: string})=} filename Imported file name
             * @return {ProtoBuf.Builder} this
             * @throws {Error} If the definition or file cannot be imported
             * @expose
             */
            BuilderPrototype["import"] = function(json, filename) {
                if (typeof filename === 'string') {
                    if (ProtoBuf.Util.IS_NODE)
                        filename = require("path")['resolve'](filename);
                    if (this.files[filename] === true) {
                        this.reset();
                        return this; // Skip duplicate imports
                    }
                    this.files[filename] = true;
                }
                if (!!json['imports'] && json['imports'].length > 0) {
                    var importRoot, delim = '/', resetRoot = false;
                    if (typeof filename === 'object') { // If an import root is specified, override
                        this.importRoot = filename["root"]; resetRoot = true; // ... and reset afterwards
                        importRoot = this.importRoot;
                        filename = filename["file"];
                        if (importRoot.indexOf("\\") >= 0 || filename.indexOf("\\") >= 0) delim = '\\';
                    } else if (typeof filename === 'string') {
                        if (this.importRoot) // If import root is overridden, use it
                            importRoot = this.importRoot;
                        else { // Otherwise compute from filename
                            if (filename.indexOf("/") >= 0) { // Unix
                                importRoot = filename.replace(/\/[^\/]*$/, "");
                                if (/* /file.proto */ importRoot === "")
                                    importRoot = "/";
                            } else if (filename.indexOf("\\") >= 0) { // Windows
                                importRoot = filename.replace(/\\[^\\]*$/, "");
                                delim = '\\';
                            } else
                                importRoot = ".";
                        }
                    } else
                        importRoot = null;

                    for (var i=0; i<json['imports'].length; i++) {
                        if (typeof json['imports'][i] === 'string') { // Import file
                            if (!importRoot)
                                throw Error("Cannot determine import root: File name is unknown");
                            var importFilename = json['imports'][i];
                            if (/^google\/protobuf\//.test(importFilename))
                                continue; // Not needed and therefore not used
                            importFilename = importRoot+delim+importFilename;
                            if (this.files[importFilename] === true)
                                continue; // Already imported
                            if (/\.proto$/i.test(importFilename) && !ProtoBuf.DotProto)     // If this is a NOPARSE build
                                importFilename = importFilename.replace(/\.proto$/, ".json"); // always load the JSON file
                            var contents = ProtoBuf.Util.fetch(importFilename);
                            if (contents === null)
                                throw Error("Failed to import '"+importFilename+"' in '"+filename+"': File not found");
                            if (/\.json$/i.test(importFilename)) // Always possible
                                this["import"](JSON.parse(contents+""), importFilename); // May throw
                            else
                                this["import"]((new ProtoBuf.DotProto.Parser(contents+"")).parse(), importFilename); // May throw
                        } else // Import structure
                            if (!filename)
                                this["import"](json['imports'][i]);
                            else if (/\.(\w+)$/.test(filename)) // With extension: Append _importN to the name portion to make it unique
                                this["import"](json['imports'][i], filename.replace(/^(.+)\.(\w+)$/, function($0, $1, $2) { return $1+"_import"+i+"."+$2; }));
                            else // Without extension: Append _importN to make it unique
                                this["import"](json['imports'][i], filename+"_import"+i);
                    }
                    if (resetRoot) // Reset import root override when all imports are done
                        this.importRoot = null;
                }
                if (json['package'])
                    this.define(json['package']);
                var base = this.ptr;
                if (json['options'])
                    Object.keys(json['options']).forEach(function(key) {
                        base.options[key] = json['options'][key];
                    });
                if (json['messages'])
                    this.create(json['messages']),
                    this.ptr = base;
                if (json['enums'])
                    this.create(json['enums']),
                    this.ptr = base;
                if (json['services'])
                    this.create(json['services']),
                    this.ptr = base;
                if (json['extends'])
                    this.create(json['extends']);
                this.reset();
                return this;
            };

            /**
             * Tests if a definition is a valid service definition.
             * @param {Object} def Definition
             * @return {boolean} true if valid, else false
             * @expose
             */
            Builder.isValidService = function(def) {
                // Services require a string name and an rpc object
                return !(typeof def["name"] !== 'string' || !Lang.NAME.test(def["name"]) || typeof def["rpc"] !== 'object');
            };

            /**
             * Tests if a definition is a valid extension.
             * @param {Object} def Definition
             * @returns {boolean} true if valid, else false
             * @expose
            */
            Builder.isValidExtend = function(def) {
                if (typeof def["ref"] !== 'string' || !Lang.TYPEREF.test(def["ref"]))
                    return false;
                var i;
                if (typeof def["fields"] !== 'undefined') {
                    if (!ProtoBuf.Util.isArray(def["fields"]))
                        return false;
                    var ids = [], id; // IDs must be unique (does not yet test for the extended message's ids)
                    for (i=0; i<def["fields"].length; i++) {
                        if (!Builder.isValidMessageField(def["fields"][i]))
                            return false;
                        id = parseInt(def["id"], 10);
                        if (ids.indexOf(id) >= 0)
                            return false;
                        ids.push(id);
                    }
                    ids = null;
                }
                return true;
            };

            /**
             * Resolves all namespace objects.
             * @throws {Error} If a type cannot be resolved
             * @expose
             */
            BuilderPrototype.resolveAll = function() {
                // Resolve all reflected objects
                var res;
                if (this.ptr == null || typeof this.ptr.type === 'object')
                    return; // Done (already resolved)
                if (this.ptr instanceof Reflect.Namespace) {
                    // Build all children
                    var children = this.ptr.children;
                    for (var i= 0, k=children.length; i<k; ++i)
                        this.ptr = children[i],
                        this.resolveAll();
                } else if (this.ptr instanceof Reflect.Message.Field) {
                    if (!Lang.TYPE.test(this.ptr.type)) { // Resolve type...
                        if (!Lang.TYPEREF.test(this.ptr.type))
                            throw Error("Illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.type);
                        res = (this.ptr instanceof Reflect.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, true);
                        if (!res)
                            throw Error("Unresolvable type reference in "+this.ptr.toString(true)+": "+this.ptr.type);
                        this.ptr.resolvedType = res;
                        if (res instanceof Reflect.Enum)
                            this.ptr.type = ProtoBuf.TYPES["enum"];
                        else if (res instanceof Reflect.Message)
                            this.ptr.type = res.isGroup ? ProtoBuf.TYPES["group"] : ProtoBuf.TYPES["message"];
                        else
                            throw Error("Illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.type);
                    } else
                        this.ptr.type = ProtoBuf.TYPES[this.ptr.type];
                } else if (this.ptr instanceof ProtoBuf.Reflect.Enum.Value) {
                    // No need to build enum values (built in enum)
                } else if (this.ptr instanceof ProtoBuf.Reflect.Service.Method) {
                    if (this.ptr instanceof ProtoBuf.Reflect.Service.RPCMethod) {
                        res = this.ptr.parent.resolve(this.ptr.requestName);
                        if (!res || !(res instanceof ProtoBuf.Reflect.Message))
                            throw Error("Illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.requestName);
                        this.ptr.resolvedRequestType = res;
                        res = this.ptr.parent.resolve(this.ptr.responseName);
                        if (!res || !(res instanceof ProtoBuf.Reflect.Message))
                            throw Error("Illegal type reference in "+this.ptr.toString(true)+": "+this.ptr.responseName);
                        this.ptr.resolvedResponseType = res;
                    } else {
                        // Should not happen as nothing else is implemented
                        throw Error("Illegal service type in "+this.ptr.toString(true));
                    }
                } else if (!(this.ptr instanceof ProtoBuf.Reflect.Message.OneOf) && !(this.ptr instanceof ProtoBuf.Reflect.Extension))
                    throw Error("Illegal object in namespace: "+typeof(this.ptr)+":"+this.ptr);
                this.reset();
            };

            /**
             * Builds the protocol. This will first try to resolve all definitions and, if this has been successful,
             * return the built package.
             * @param {(string|Array.<string>)=} path Specifies what to return. If omitted, the entire namespace will be returned.
             * @return {ProtoBuf.Builder.Message|Object.<string,*>}
             * @throws {Error} If a type could not be resolved
             * @expose
             */
            BuilderPrototype.build = function(path) {
                this.reset();
                if (!this.resolved)
                    this.resolveAll(),
                    this.resolved = true,
                    this.result = null; // Require re-build
                if (this.result === null) // (Re-)Build
                    this.result = this.ns.build();
                if (!path)
                    return this.result;
                else {
                    var part = typeof path === 'string' ? path.split(".") : path,
                        ptr = this.result; // Build namespace pointer (no hasChild etc.)
                    for (var i=0; i<part.length; i++)
                        if (ptr[part[i]])
                            ptr = ptr[part[i]];
                        else {
                            ptr = null;
                            break;
                        }
                    return ptr;
                }
            };

            /**
             * Similar to {@link ProtoBuf.Builder#build}, but looks up the internal reflection descriptor.
             * @param {string=} path Specifies what to return. If omitted, the entire namespace wiil be returned.
             * @return {ProtoBuf.Reflect.T} Reflection descriptor or `null` if not found
             */
            BuilderPrototype.lookup = function(path) {
                return path ? this.ns.resolve(path) : this.ns;
            };

            /**
             * Returns a string representation of this object.
             * @return {string} String representation as of "Builder"
             * @expose
             */
            BuilderPrototype.toString = function() {
                return "Builder";
            };

            // Pseudo types documented in Reflect.js.
            // Exist for the sole purpose of being able to "... instanceof ProtoBuf.Builder.Message" etc.
            Builder.Message = function() {};
            Builder.Service = function() {};

            return Builder;

        })(ProtoBuf, ProtoBuf.Lang, ProtoBuf.Reflect);


        /**
         * Constructs a new empty Builder.
         * @param {Object.<string,*>=} options Builder options, defaults to global options set on ProtoBuf
         * @return {!ProtoBuf.Builder} Builder
         * @expose
         */
        ProtoBuf.newBuilder = function(options) {
            options = options || {};
            //if (typeof options['convertFieldsToCamelCase'] === 'undefined')
            //    options['convertFieldsToCamelCase'] = ProtoBuf.convertFieldsToCamelCase;
            if (typeof options['populateAccessors'] === 'undefined')
                options['populateAccessors'] = ProtoBuf.populateAccessors;
            return new ProtoBuf.Builder(options);
        };

        /**
         * Loads a .json definition and returns the Builder.
         * @param {!*|string} json JSON definition
         * @param {(ProtoBuf.Builder|string|{root: string, file: string})=} builder Builder to append to. Will create a new one if omitted.
         * @param {(string|{root: string, file: string})=} filename The corresponding file name if known. Must be specified for imports.
         * @return {ProtoBuf.Builder} Builder to create new messages
         * @throws {Error} If the definition cannot be parsed or built
         * @expose
         */
        ProtoBuf.loadJson = function(json, builder, filename) {
            if (typeof builder === 'string' || (builder && typeof builder["file"] === 'string' && typeof builder["root"] === 'string'))
                filename = builder,
                builder = null;
            if (!builder || typeof builder !== 'object')
                builder = ProtoBuf.newBuilder();
            if (typeof json === 'string')
                json = JSON.parse(json);
            else if (!json) {
                json = {};
            }
            builder["import"](json, filename);
            builder.resolveAll();
            return builder;
        };

        return ProtoBuf;
    }

// Init here
        (global.com.adtech.dcodeIO =  global.com.adtech.dcodeIO || {})['ProtoBuf'] =
            init(global.com.adtech.dcodeIO['ByteBuffer']);

})(this);
// Copyright 2010 AOL Platforms.

/**
 * Utility class for ADTECH Richmedia Iframe ad serving management.
 *
 * @class
 * @author Pictela Support <support@pictela.com>
 */
com.adtech.IframeUtils_2_53_3 = function(){};

com.adtech.IframeUtils_2_53_3.IFRAME_AD_CONFIG_FILE = 'iframeadconfig.js';
com.adtech.IframeUtils_2_53_3.DELIM = '|ifv|';
com.adtech.IframeUtils_2_53_3.ARRAY_DELIM = '|ae|';
com.adtech.IframeUtils_2_53_3.ADTIME_MACRO = '_ADTIME_';

com.adtech.IframeUtils_2_53_3.adServerVars = {};
com.adtech.IframeUtils_2_53_3.pubVars = {};
com.adtech.IframeUtils_2_53_3.geoData = {};
com.adtech.IframeUtils_2_53_3.tagVars = {};
com.adtech.IframeUtils_2_53_3.rmLibUrl = '';
com.adtech.IframeUtils_2_53_3.clickRedirect = '';
com.adtech.IframeUtils_2_53_3.displayWindowTarget = null;
com.adtech.IframeUtils_2_53_3.postAdConfigProcessedCallback = null;

/**
 * Returns a boolean flag indicating if the ad has been served into an iframe.
 * This function returns false if the ad is in the preview iframe/frame in the Canvas UI.
 */
com.adtech.IframeUtils_2_53_3.isInIframe = function() {
  return ((typeof adtechCanvasAdPreview == 'undefined' || !adtechCanvasAdPreview) &&
      (window != top));
}

/**
 * Returns a boolean flag indicating if the ad has been served into a friendly iframe.
 */
com.adtech.IframeUtils_2_53_3.isInFriendlyIframe = function(adConfig) {
  var canCommunicateWithTarget = false;
  try {
    var targetDoc = this.determineDisplayWindowTarget(adConfig).document;
    // Webkit does not throw an error here but evaluate targetDoc to undefined.
    if (targetDoc) {
      canCommunicateWithTarget = true;
    }
  } catch (e) {}
  return canCommunicateWithTarget;
}

com.adtech.IframeUtils_2_53_3.isBreakoutAdType = function(adConfig) {
  for (var containerKey in adConfig.assetContainers) {
    if (adConfig.assetContainers.hasOwnProperty(containerKey)) {
      var container = adConfig.assetContainers[containerKey];
      switch (container.type) {
        case com.adtech.AssetContainerFactory_2_53_3.NO_CONTENT:
        case com.adtech.AssetContainerFactory_2_53_3.FLOATING_DIV:
          return true;
        case com.adtech.AssetContainerFactory_2_53_3.INLINE_DIV:
          if (container.isExpandable) {
            return true;
          }
          break;
      }
    }
  }
  return false;
}

com.adtech.IframeUtils_2_53_3.getTargetParentIframeEle = function(target) {
  var iframeEles = target.document.getElementsByTagName('iframe');
  for (i = 0; i < iframeEles.length; i++) {
    var iframeEle = iframeEles[i];
    if (target == parent && iframeEle.contentWindow == window ||
        target == parent.parent && iframeEle.contentWindow == window.parent ||
        target == parent.parent.parent && iframeEle.contentWindow == window.parent.parent) {
      return iframeEle;
    }
  }
}

com.adtech.IframeUtils_2_53_3.registerAdOnTargetParent = function(target, adConfig) {
  this.displayWindowTarget = target;
  var targetIframe = this.getTargetParentIframeEle(target);
  /*
   * Fix any broken callback keys due to the ad serving out of a non-friendly iframe
   * and iframeAdConfig.js not having it's unique identifier macros replaced prior to
   * the callback being added.
   */
  if (typeof target.adtechAdCallbacks != 'undefined' &&
      target.adtechAdCallbacks[this.ADTIME_MACRO]) {
    if (com.adtech.Utils_2_53_3.isArray(target.adtechAdCallbacks[this.ADTIME_MACRO])) {
      target.adtechAdCallbacks[adConfig.adServerVars.uid] =
        target.adtechAdCallbacks[this.ADTIME_MACRO].slice();
      delete target.adtechAdCallbacks[this.ADTIME_MACRO];
    }
  }
  // adtechAdCallback is now deprecated. Support for it shall be removed at a later date.
  if (target.adtechAdCallback && target.adtechAdCallback[this.ADTIME_MACRO]) {
    target.adtechAdCallback[adConfig.adServerVars.uid] = target.adtechAdCallback[this.ADTIME_MACRO];
    delete target.adtechAdCallback[this.ADTIME_MACRO];
  }

  if (typeof target.adtechAdManager_2_53_3 == 'undefined') {
    target.adtechAdQueue = target.adtechAdQueue || [];
    target.adtechAdTargetIframeQueue = target.adtechAdTargetIframeQueue || {};
    target.adtechAdQueue.push(adConfig);
    target.adtechAdTargetIframeQueue[adConfig.adServerVars.uid] = targetIframe;
    if (typeof target.adtechAdManagerReqs == 'undefined' ||
        !target.adtechAdManagerReqs['2_53_3']) {
      target.adtechAdManagerReqs = target.adtechAdManagerReqs || {};
      target.adtechAdManagerReqs['2_53_3'] = true;
      var libraryjs = target.document.createElement('script');
      libraryjs.src = adConfig.rmLibUrl;
      /*
       *  Append script to parent of iframe, as appending to document assumes that the
       *  DOM has been loaded.
       */
      targetIframe.parentNode.insertBefore(libraryjs, targetIframe);
    }
  } else {
    target.adtechAdManager_2_53_3.registerAd(adConfig, targetIframe, false);
  }
}

com.adtech.IframeUtils_2_53_3.determineDisplayWindowTarget = function(adConfig) {
  var adtechOverrideDisplayWindowTarget =
    com.adtech.Utils_2_53_3.getConfigOverride(adConfig, 'displayWindowTarget');
  if (adtechOverrideDisplayWindowTarget != null) {
    // if determining this value from within the proxy iframe, we need to go up one parent.
    if (typeof adtechIframeHashArray != 'undefined' && window != top) {
      adtechOverrideDisplayWindowTarget = (adtechOverrideDisplayWindowTarget == top) ?
          top : adtechOverrideDisplayWindowTarget.parent;
    }
    return adtechOverrideDisplayWindowTarget;
  }
  // Cycle through parents and attempt to find a friendly window.
  var defaultTarget = top;
  var calculatedTarget = null;
  var currentWindow = parent;
  while (currentWindow != null) {
    try {
      var targetDoc = currentWindow.document;
      if (targetDoc) {
        calculatedTarget = currentWindow;
      }
    } catch(e) {}
    currentWindow = (currentWindow == top) ? null : currentWindow.parent;
  }
  return calculatedTarget || defaultTarget;
}

/**
 * @private
 * Returns either a reference to the top window if it has permissions to modify it;
 * self otherwise.
 */
com.adtech.IframeUtils_2_53_3.topOrSelf = function() {
  var canCommunicateWithTop = false;
  try {
    var topDoc = top.document;
    if (topDoc) {
      canCommunicateWithTop = true;
    }
  } catch(e) {}
  return (canCommunicateWithTop) ? top : window;
}

// Utilised by modified SwfObject code as well as this utility.
com.adtech.IframeUtils_2_53_3.getDisplayWindowTarget = function() {
  return (this.displayWindowTarget) ?
      this.displayWindowTarget : this.topOrSelf();
}

/**
 * @private
 *
 * Registers a callback to be called after the ad config has been processed.
 * This function is only required for non-friendly iframe delivery, and is
 * invoked by the iframe specific ad configuration file.
 */
com.adtech.IframeUtils_2_53_3.registerCallback = function(callback) {
  this.postAdConfigProcessedCallback = callback;
}

com.adtech.IframeUtils_2_53_3.processAdConfig = function(adConfig) {
  adConfig.adServerVars = this.adServerVars;
  adConfig.pubVars = this.pubVars;
  adConfig.geoData = this.geoData;
  adConfig.tagVars = this.tagVars;
  adConfig.clickRedirect = this.clickRedirect;
  adConfig.rmlibUrl = this.rmLibUrl;
  if (typeof adtechConfigureAdFLP == 'function') {
    // Flight placement re-configuration requires the adServerVars to be replaced.
    // TODO: Support for this was removed in Oct 2013. Remove from code in March 2014.
    adtechConfigureAdFLP();
  } else if (this.postAdConfigProcessedCallback) {
    this.postAdConfigProcessedCallback(adConfig.adServerVars.id);
  }
  this.registerAdOnTargetParent(this.determineDisplayWindowTarget(adConfig), adConfig);
}

/**
 * Makes a request to the statically generated config javascript file.
 */
com.adtech.IframeUtils_2_53_3.loadAdJsFile = function() {
  // This adjs file has a callback to processAdConfig.
  // iframe config file MUST be delivered from IQ, as it cannot be cached!
  var scr = 'scr';
  document.write('<' + scr + 'ipt src="' + this.adServerVars.configBaseURL +
      this.IFRAME_AD_CONFIG_FILE + '" type="text/javascript"></' + scr + 'ipt>');
}

com.adtech.IframeUtils_2_53_3.setPropertiesOnObject = function(obj, str) {
  var arr = str.split('&');
  for (var i = 0; i < arr.length; i++){
    var kv = arr[i].split('=');
    obj[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
  }
}

com.adtech.IframeUtils_2_53_3.setIframeObjectsFromHashArray = function() {
  this.rmLibUrl = adtechIframeHashArray[0];
  this.setPropertiesOnObject(this.adServerVars, adtechIframeHashArray[1]);
  this.setPropertiesOnObject(this.pubVars, adtechIframeHashArray[2]);
  this.setPropertiesOnObject(this.geoData, adtechIframeHashArray[3]);
  this.clickRedirect = adtechIframeHashArray[4];
  this.setPropertiesOnObject(this.tagVars, adtechIframeHashArray[5]);
}

com.adtech.IframeUtils_2_53_3.getStringFromSimpleJsonObject = function(jsonObj){
  var jsonString = '';
  for (var ele in jsonObj) {
    if (jsonObj.hasOwnProperty(ele)) {
      jsonString += (this.applyHashEncoding(ele) + '=' +
          this.applyHashEncoding(jsonObj[ele]) + '&');
    }
  }
  // Strip off the trailing ampersand.
  return jsonString.substring(0, jsonString.length - 1);
}

com.adtech.IframeUtils_2_53_3.applyHashEncoding = function(value) {
  var encodingAmount = (com.adtech.Utils_2_53_3.isFirefox()) ? 2 : 1;
  while (encodingAmount) {
    value = encodeURIComponent(value);
    encodingAmount--;
  }
  return value;
}

com.adtech.IframeUtils_2_53_3.loadIframeBuster = function(iframeBusterPath, adConfig) {
  /* This regex below gets the root domain of the page that this ad is being delivered on, whether
   * https or not. For example, if given http://www.adtech.com/richmedia/page, the regex would
   * return http://www.adtech.com. We then append the iframe buster path to this domain to get the
   * url for the iframe buster html file
   */
  var hostUrl = document.referrer;
  if (hostUrl == '') {
    try {
      hostUrl = parent.location.href;
    } catch (e) {
      // Snooze this.
    }
  }
  try {
    /*
     * In case we are double nested. Only works if both iframes are on same domain.
     * Ads should never really be served like this, but just-in-case.
     */
    var parentHostUrl = parent.document.referrer;
    if (parentHostUrl) {
      hostUrl = parentHostUrl;
    }
  } catch (e) {}
  var referrer = hostUrl.match(/https?:\/\/[^:\/]*/i);
  if(iframeBusterPath.indexOf('/') != 0) {
    iframeBusterPath = '/' + iframeBusterPath;
  }
  iframeBusterPath += '#' + adConfig.rmLibUrl + this.DELIM +
      this.getStringFromSimpleJsonObject(adConfig.adServerVars) + this.DELIM +
      this.getStringFromSimpleJsonObject(adConfig.pubVars) + this.DELIM +
      this.getStringFromSimpleJsonObject(adConfig.geoData) + this.DELIM +
      adConfig.clickRedirect + this.DELIM +
      this.getStringFromSimpleJsonObject(adConfig.tagVars);
  document.write('<iframe src="' + referrer + iframeBusterPath + '" width="0" height="0"' +
      ' frameborder="0" scrolling="no"></iframe>');
}

/**
 * Applies cross-browser allowfullscreen attribute to an iframe.
 */
com.adtech.IframeUtils_2_53_3.applyAllowFullScreenAttribute = function(iframe) {
  iframe.setAttribute('allowfullscreen', 'true');
  iframe.setAttribute('allowFullScreen', 'true');
  iframe.setAttribute('mozallowFullScreen', 'true');
  iframe.setAttribute('webkitAllowFullScreen', 'true');
}
// Copyright 2010 AOL Platforms.

/**
 * Utility class for ADTECH Richmedia Core Lib.
 *
 * @class
 * @constructor
 * @author Pictela Support <support@pictela.com>
 */
com.adtech.Utils_2_53_3 = function(){};

com.adtech.Utils_2_53_3.IE_9_TRIDENT_VERSION = 5;
com.adtech.Utils_2_53_3.IE_8_TRIDENT_VERSION = 4;
com.adtech.Utils_2_53_3.JSON_CD_POST_REQUEST_FIELD = 'event';

/**
 * @private
 *
 * We will attempt to serve ads to all W3C DOM level 1 compliant browsers.
 */
com.adtech.Utils_2_53_3.isBrowserW3CCompliant = function() {
  var UNDEF = 'undefined';
  var doc = document;
  return (typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF &&
      typeof doc.createElement != UNDEF);
}

/**
 * Returns the user agent string in lower case.
 */
com.adtech.Utils_2_53_3.getUserAgent = function() {
  return navigator.userAgent.toLowerCase();
}

/**
 * Returns the app version string in lower case.
 */
com.adtech.Utils_2_53_3.getAppVersion = function() {
  return navigator.appVersion.toLowerCase();
}

/**
 * Returns the app name string in lower case.
 */
com.adtech.Utils_2_53_3.getAppName = function() {
  return navigator.appName.toLowerCase();
}

/**
 *  Returns a boolean flag indicating if the ad has been rendered in Linux.
 */
com.adtech.Utils_2_53_3.isLinux = function() {
  return this.getAppVersion().indexOf('linux') > -1;
}

/**
 *  Returns a boolean flag indicating if the ad has been rendered in Windows.
 */
com.adtech.Utils_2_53_3.isWin = function() {
  return this.getAppVersion().indexOf('windows') > -1;
}

/**
 *  Returns a boolean flag indicating if the ad has been rendered in OS X.
 */
com.adtech.Utils_2_53_3.isMac = function() {
  return this.getAppVersion().indexOf('mac') > -1;
}

/**
 *  Returns a boolean flag indicating if the ad has been rendered in iOS.
 */
com.adtech.Utils_2_53_3.isiOS = function() {
  return (this.getUserAgent().match(/(ipad|iphone|ipod)/i)) ? true : false;
}

/**
 *  Returns iOS version information as an object with the following keys:
 *  major, minor
 */
com.adtech.Utils_2_53_3.getiOSVersion = function() {
  if (!this.isiOS()) {
    return null;
  }
  var match = (navigator.appVersion).match(/os (\d+)_(\d+)_?(\d+)?/i);
  return (match) ?
      {'major': parseInt(match[1], 10), 'minor': parseInt(match[2], 10)} : null;
}

/** @private */
com.adtech.Utils_2_53_3.fileIsImage = function(fileName) {
  var imageExtensions = ['gif', 'jpeg', 'jpg', 'png'];
  try {
    var fileParts = fileName.split('.');
  } catch (e) {
    return false;
  }
  if (fileParts.length > 1) {
    var fileExtension = fileParts[fileParts.length - 1].toLowerCase();
    for (var i = 0; i  < imageExtensions.length; i++) {
      if (fileExtension == imageExtensions[i]) {
        return true;
      }
    }
  }
  return false;
}

/**
 *  Returns a boolean flag indicating if the ad has been rendered in Internet Explorer browser.
 */
com.adtech.Utils_2_53_3.isIE = function() {
  var ua = this.getUserAgent();
  if (this.getAppName() == 'netscape') {
    var re = new RegExp('trident/.*rv:([0-9]{1,}[\.0-9]{0,})');
    if (re.exec(ua) != null) {
      return 1;
    }
  }
  return ua.indexOf('msie') > -1;
}

/**
 * Returns a boolean flag indicating if the ad is running in Firefox.
 */
com.adtech.Utils_2_53_3.isFirefox = function() {
  return this.getUserAgent().indexOf('firefox') > -1;
}

/**
 *  Returns a boolean flag indicating if the ad has been rendered in Webkit browser.
 */
com.adtech.Utils_2_53_3.isWebkit = function() {
  return this.getUserAgent().indexOf('applewebkit') > -1;
}

/**
 * Returns a boolean flag indicating if the ad is running in Safari.
 */
com.adtech.Utils_2_53_3.isSafari = function() {
  return ((this.getUserAgent().indexOf('safari') > -1)
      && !this.isChrome());
}

/**
 * Returns a boolean flag indicating if the ad is running in Chrome.
 */
com.adtech.Utils_2_53_3.isChrome = function() {
  return typeof window.chrome == 'object';
}

/**
 *  Returns IE version information as an object with the following keys:
 *  major, minor
 */
com.adtech.Utils_2_53_3.getIEVersion = function() {
  if (!this.isIE()) {
    return null;
  }
  var ua = this.getUserAgent();
  if (this.getAppName() == 'netscape') {
    var re = new RegExp('trident/.*rv:([0-9]{1,}[\.0-9]{0,})');
    if (re.exec(ua) != null)
      return {'major': parseInt(RegExp.$1, 10), 'minor': parseInt(RegExp.$1, 10)};
  }
  var match = (ua).match(/msie\s+(\d*\.?\d+)/i);
  return (match) ?
      {'major': parseInt(match[1], 10), 'minor': parseInt(match[2], 10)} : null;
}

com.adtech.Utils_2_53_3.isIEQuirksMode = function() {
  return (this.isIE() && document.compatMode &&
      document.compatMode == 'BackCompat');
}


/**
 * @private
 *
 * Checks if a plugin is enabled on the client.
 */
com.adtech.Utils_2_53_3.isPluginEnabled = function(contentType,
    requiredVersion, HTMLAdsTridentVersionMin) {
  var uaString = this.getUserAgent();
  if (/msie\s[^\s]*\smac/.test(uaString)) {
    // IE on a Mac. Hell no.
    return false;
  }
  var ieVersionInfo = this.getIEVersion();
  var ieMajorVersion = (ieVersionInfo) ? ieVersionInfo['major'] : 0;
  // IE 9 has trident version 5.0. IE will set IE version to 7 when in compatibility mode.
  var tridentMatch = /trident\/(\d*\.?\d+)/.exec(uaString);
  var ieTridentVersion = (tridentMatch !== null && ieMajorVersion >= 7) ?
      parseInt(tridentMatch[1]) : 0;
  switch (contentType) {
    case com.adtech.ContentFactory_2_53_3.FLASH:
      try {
        /* Catches case where user has created a Flash advert for mobile in-app delivery.
         * swfobject will be undefined. Fallback to fallback gif/jpeg.
         */
        return com.adtech.swfobject_2_53_3.hasFlashPlayerVersion(requiredVersion);
      } catch (e) {
        return false;
      }
    case com.adtech.ContentFactory_2_53_3.HTML:
      return ((!this.isIE() ||
          (ieMajorVersion && ieTridentVersion >= HTMLAdsTridentVersionMin)) &&
          (typeof window.postMessage != 'undefined') && this.userAgentSupportsJSON());
    default:
      // For noContent and script.
      return true;
  }
}

com.adtech.Utils_2_53_3.userAgentSupportsJSON = function() {
  return window.JSON && JSON.parse && JSON.stringify;
}

/**
 * Helper function to aid with class inheritance.
 *
 * @param subClass the extending class.
 * @param superClass the class to be extended.
 */
com.adtech.Utils_2_53_3.extend = function(subClass, superClass) {
  var TempFunc = function(){};
  TempFunc.prototype = superClass.prototype;
  subClass.prototype = new TempFunc();
  subClass.prototype.constructor = subClass;
  // YUI compressor doesn't like 'super' being used this way.
  subClass.supa = superClass.prototype;
  if (superClass.prototype.constructor == Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
  }
}

/**
 * Returns a boolean flag indicating if an object is an array.
 */
com.adtech.Utils_2_53_3.isArray = function(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() == 'array';
}

/**
 * Checks if a value exists in an array or in a hash. Searches haystack for
 * needle.
 *
 * @param needle the searched value.
 * @param haystack the array to be searched.
 * @type Boolean
 * @return flag indicating whether the needle was located in the haystack.
 */
com.adtech.Utils_2_53_3.inArray = function(needle, haystack) {
  if (this.isArray(haystack)) {
    for (var i = 0; i < haystack.length; i++) {
      if (haystack[i] == needle) {
        return true;
      }
    }
  } else {
    for (var key in haystack) {
      if (haystack.hasOwnProperty(key) && haystack[key] == needle) {
        return true;
      }
    }
  }
  return false;
}

/**
 * @private
 * Returns the first object within an <code>Array</code> that contains the required
 * key with the specified value, <code>null</code> otherwise.
 *
 * @param haystack the array containing the objects.
 * @param key the key to check for.
 * @param value the value to check for.
 */
com.adtech.Utils_2_53_3.getMatchingObjectFromArray =
    function(haystack, key, value) {
  for (var i = 0; i < haystack.length; i++) {
    var obj = haystack[i];
    if (typeof obj[key] != 'undefined'  && obj[key] === value) {
      return obj;
    }
  }
  return null;
}


/**
 * @private
 *
 * Recursively replaces all instances of a string within all nested values within
 * an object.
 *
 * @param obj the object to perform the replacement on
 * @param substitutionMap a map of strings to substitutions that should be used.
 */
com.adtech.Utils_2_53_3.recursiveSubtitute = function(obj, substitutionMap) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] == 'object' && !com.adtech.Utils_2_53_3.isArray(obj[key])) {
        this.recursiveSubtitute(obj[key], substitutionMap);
      } else if (typeof obj[key] == 'string') {
        for (var substitution in substitutionMap) {
          if (substitutionMap.hasOwnProperty(substitution)) {
            var regexp = new RegExp(substitution, 'g');
            obj[key] = obj[key].replace(regexp, substitutionMap[substitution]);
          }
        }
      }
    }
  }
}


/**
 * @private
 *
 * Dispatches the RichMediaEvent.FOCUS or BLUR event from an EventDispatcher and sets the
 * windowInFocus property.
 *
 * @param context object from which to dispatch the event.
 * @param windowInFocus a flag indicating if the target window is in focus.
 */
com.adtech.Utils_2_53_3.dispatchElementFocusEvent = function(context, windowInFocus) {
  if (windowInFocus && !context.windowInFocus) {
    context.windowInFocus = true;
    context.dispatchEvent(com.adtech.RichMediaEvent_2_53_3.FOCUS);
  } else if (!windowInFocus && context.windowInFocus) {
    context.windowInFocus = false;
    context.dispatchEvent(com.adtech.RichMediaEvent_2_53_3.BLUR);
  }
}

/**
 * @private
 *
 * Adds an event listener on the specified EventDispatcher for format or advert
 * specific events.
 *
 * The handler object will be expected to implement a handleCustomEvent method.
 *
 * @param dispatcher the object to add the listener to.
 * @param handler the object that will handle the event.
 * @param events the events array from the advert config JSON object.
 */
com.adtech.Utils_2_53_3.addCustomEventHandler = function(dispatcher, handler, events) {
  if (dispatcher instanceof com.adtech.EventDispatcher_2_53_3) {
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      if (event.custom) {
        dispatcher.addEventListener(event.name, handler.customEventHandler, handler);
      }
    }
  }
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
com.adtech.Utils_2_53_3.createClosure = function(target, handler) {
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
 * Cross browser method to add event listeners.
 *
 * @param node DOM node to add the listener to.
 * @param event type of event to listen for.
 * @param handler the handling function to be invoked on dispatch of the
 *     registered type.
 */
com.adtech.Utils_2_53_3.registerNativeEventHandler = function(node, event, handler) {
  if (typeof node.addEventListener == 'function') {
    node.addEventListener(event, handler, false);
  } else {
    node.attachEvent('on' + event, handler);
  }
}

/**
 * Cross browser method to remove listeners.
 *
 * @param node DOM node to remove the listener from.
 * @param event type of event.
 * @param handler the registered event handling function to be de-registered.
 */
com.adtech.Utils_2_53_3.deregisterNativeEventHandler = function(node, event, handler) {
  if (typeof node.removeEventListener == 'function') {
    node.removeEventListener(event, handler, false);
  } else {
    node.detachEvent('on' + event, handler);
  }
}

/**
 * Calculates and returns the current page offsets.
 *
 * @param inFriendlyIframe flag to indicate if the ad is rendering in a friendly iframe.
 *
 * The return value is an object with 'x' and 'y' keys.
 * @type Object
 */
com.adtech.Utils_2_53_3.getPageOffsets = function(inFriendlyIframe) {
  var doc = (inFriendlyIframe) ?
      com.adtech.IframeUtils_2_53_3.topOrSelf().document : document;
  var offsetX =
    doc.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft;
  var offsetY =
    doc.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop;
  return {"x": offsetX, "y": offsetY};
}

/**
 * @private
 *
 * Calculates and returns the current viewport dimensions.
 *
 * @param inFriendlyIframe flag to indicate if the ad is rendering in a friendly iframe.
 *
 * return object with a 'w' and 'h' property.
 * @type Object
 */
com.adtech.Utils_2_53_3.getViewportDims = function(inFriendlyIframe) {
  var doc = (inFriendlyIframe) ?
      com.adtech.IframeUtils_2_53_3.topOrSelf().document : document;
  var docElemPropW = doc.documentElement['clientWidth'];
  var width = doc.compatMode === 'CSS1Compat' && docElemPropW ||
      doc.body['clientWidth'] || docElemPropW;
  var docElemPropH = doc.documentElement['clientHeight'];
  var height = doc.compatMode === 'CSS1Compat' && docElemPropH ||
      doc.body['clientHeight'] || docElemPropH;
  if (this.isiOS()) {
    if (height < window.innerHeight) {
      height = window.innerHeight;
    }
  }
  return {"w": width, "h": height};
}


/**
 * Calculates the absolute position of an object within the page.
 *
 * The return value is an Object with 'x' and 'y' keys.
 *
 * @param obj the required object.
 * @type Object
 */
com.adtech.Utils_2_53_3.calculateAbsolutePosition = function(obj) {
  var absTop = 0;
  var absLeft = 0;
  while (obj) {
    absTop += obj.offsetTop;
    absLeft += obj.offsetLeft;
    obj = obj.offsetParent;
  }
  return  {"x": absLeft, "y": absTop};
}

/**
 * Gets the height of the current document.
 *
 * This should be invoked after the DOM has loaded.
 */
com.adtech.Utils_2_53_3.getDocumentHeight = function() {
  var doc = document;
  return Math.max(
      Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
      Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
      Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
  );
}

/**
 * Gets the width of the current document.
 *
 * This should be invoked after the DOM has loaded.
 */
com.adtech.Utils_2_53_3.getDocumentWidth = function() {
  var doc = document;
  return Math.max(
      Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth),
      Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth),
      Math.max(doc.body.clientWidth, doc.documentElement.clientWidth)
  );
}

/**
 * Gets the computed style of an element in the document.
 */
com.adtech.Utils_2_53_3.getComputedStyle = function(elem, style) {
  try {
    return (typeof elem.currentStyle != 'undefined') ?
        elem.currentStyle[style] :
        window.getComputedStyle(elem, null)[style];
  } catch(e) {
    return null;
  }
}

/**
 * @private
 *
 * Returns a flag denoting if the client can deal with CSS position:fixed.
 */
com.adtech.Utils_2_53_3.canUseFixedPositioning = function() {
  return !((this.isiOS() && this.getiOSVersion()['major'] < 5) ||
      this.getUserAgent().indexOf('opera mini') > -1 ||
      (this.isIE() && this.getIEVersion()['major'] < 8));
}

/** @private */
com.adtech.Utils_2_53_3.requestJs = function(url) {
  com.adtech.Utils_2_53_3.debug('Requesting third party JS ' + url);
  try {
    var thirdPartyScript = document.createElement('script');
    thirdPartyScript.src = url;
    thirdPartyScript.charset = 'utf-8';
    document.body.appendChild(thirdPartyScript);
  } catch (e) {
    // Variables required, as Rhino compiles the string literal concatenations into one string.
    var scriptBit1 = '<scr';
    var scriptBit2 = 'ipt>';
    document.write(scriptBit1 + 'ipt type="text/javascript" charset="utf-8" src="' +
        url + '"></scr' + scriptBit2);
  }
}

/** @private */
com.adtech.Utils_2_53_3.canRenderRich = function(config) {
  var containers = config.assetContainers;
  var hasRequiredPlugin = true;
  var HTMLAdsTridentVersionMin = this.getConfigOverride(config, 'HTMLOnIE8') ?
      this.IE_8_TRIDENT_VERSION : this.IE_9_TRIDENT_VERSION;
  for (var id in containers) {
    if (containers.hasOwnProperty(id)) {
      var contentType =
          (containers[id].type == com.adtech.AssetContainerFactory_2_53_3.NO_CONTENT) ?
              '' : containers[id].contentType;
      if (!this.isPluginEnabled(contentType,
          containers[id].pluginVersion, HTMLAdsTridentVersionMin)) {
        hasRequiredPlugin = false;
        break;
      }
    }
  }
  return (this.passesRenderRichExclusions(config) && this.isBrowserW3CCompliant() &&
      hasRequiredPlugin);
}

/** @private */
com.adtech.Utils_2_53_3.passesRenderRichExclusions = function(config) {
  var usesWindowWmode = false;
  for (var id in config.assetContainers) {
    if (config.assetContainers.hasOwnProperty(id)) {
      var container = config.assetContainers[id];
      if (container.contentType == com.adtech.ContentFactory_2_53_3.FLASH &&
          container.wmode == 'window') {
        usesWindowWmode = true;
        break;
      }
    }
  }
  /* No rich for Flash with window wmode on any non-chrome browser on Linux.
   * The Flash object in these browsers fails to capture the mouse events.
   */
  if (usesWindowWmode && this.isLinux() && !this.isWebkit()) {
    return false;
  }
  return true;
}

/** @private */
com.adtech.Utils_2_53_3.calculatePercentValue = function(whole, percentage) {
  return Math.round((whole / 100) * percentage);
}

/** @private */
com.adtech.Utils_2_53_3.getVideoReportingIdFromEventName = function (eventName) {
  var STANDARD_INCLUSION = 'Video ';
  if ((eventName.indexOf(STANDARD_INCLUSION) == eventName.lastIndexOf(STANDARD_INCLUSION)) &&
      eventName.indexOf(STANDARD_INCLUSION) == 0) {
    return '';
  }
  return eventName.substring(0, eventName.lastIndexOf(' ' + STANDARD_INCLUSION)) + ' ';
}

/**
 * @private
 *
 * Gets the config override value if defined, null otherwise.
 */
com.adtech.Utils_2_53_3.getConfigOverride = function(adConfig, name) {
  return (typeof adConfig == 'object' &&
      typeof adConfig.overrides == 'object' && adConfig.overrides[name] !== undefined) ?
          adConfig.overrides[name] : null;
}

/**
 * Gets the querystring value for the specified name if defined, null otherwise.
 *
 * This method will attempt to get querystring variables from the window that the ad
 * has been rendered in and the top window.
 *
 * @param name name of the required querystring variable
 */
com.adtech.Utils_2_53_3.getQueryStringValue = function(name) {
  if (!this.queryStringMap) {
    // Build the map, just once.
    this.queryStringMap = {};
    var keyValues = window.location.search.substr(1).split('&');
    if (window != top) {
      // Attempt to get the values from the top window merged in.
      try {
        keyValues.concat(top.location.search.substr(1).split('&'));
      } catch (e) {
        // Snooze.
      }
    }
    for (var i = 0; i < keyValues.length; ++i) {
      var keyValue = keyValues[i].split('=');
      if (keyValue.length === 2) {
        this.queryStringMap[keyValue[0]] = decodeURIComponent(keyValue[1].replace(/\+/g, ' '));
      }
    }
  }
  return this.queryStringMap[name] || null;
}

/**
 * Merges all the properties from obj2 into ob1, overwriting any duplicate properties.
 *
 * @param obj1 the object to merge all of the properties to.
 * @param obj2 the object to merge the properties from.
 */
com.adtech.Utils_2_53_3.mergeObjects = function(obj1, obj2) {
  for (var prop in obj2) {
    if (obj2.hasOwnProperty(prop)) {
      obj1[prop] = obj2[prop];
    }
  }
}

com.adtech.Utils_2_53_3.isEmptyObj = function(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false;
  }
  return true;
}

/**
 * Creates a deep clone of a simple object.
 */
com.adtech.Utils_2_53_3.clone = function(obj) {
  if (obj == null || typeof(obj) != 'object') {
    return obj;
  }
  var temp;
  if (this.isArray(obj)) {
    temp = [];
    for (var i = 0; i < obj.length; i++) {
      temp[i] = com.adtech.Utils_2_53_3.clone(obj[i]);
    }
  } else {
    temp = {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        temp[key] = com.adtech.Utils_2_53_3.clone(obj[key]);
      }
    }
  }
  return temp;
}

com.adtech.Utils_2_53_3.displayError = function(message) {
  if (typeof console != 'undefined') {
    console.warn('[PTLA]', message);
  }
}

/*SRCONLY BEGIN*/
/** @private */
com.adtech.Utils_2_53_3.debug = function(message) {
  if (typeof console != 'undefined') {
    try {
      console.log.apply(console, [].slice.call(arguments));
    } catch (e) {
      // crappy IE
      console.log(arguments[0]);
    }
  } else {
    var loggerDiv = document.getElementById("CanvasLoggerDiv");
    if (loggerDiv) {
      loggerDiv.innerHTML += message + "<br/>";
    }
  }
}
/*SRCONLY END*/

/**
 * Remove the element and its children from the DOM safely
 *
 * @param el Element to remove
 */
com.adtech.Utils_2_53_3.removeChildSafe = function(el) {
  //before deleting el, recursively delete all of its children.
  while (el.childNodes.length > 0) {
    com.adtech.Utils_2_53_3.removeChildSafe(el.childNodes[el.childNodes.length - 1]);
  }
  el.parentNode.removeChild(el);
}

/**
 * Creates an XHR Object to establish a CORS(Cross-origin resource sharing) Request
 *
 * @param method The method 'GET,PUT,POST,DELETE'
 * @param url The url where the request is sent
 *
 * The return value is an XHR Object.
 * @type XMLHttpRequest
 */
com.adtech.Utils_2_53_3.createCORSRequest = function(method, url) {
  var xhr = new XMLHttpRequest();
  if ('withCredentials' in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari/IE10.
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'text/plain');
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

/**
 * Creates an form inside a iframe to establish a cross domain Post Request
 *
 * @param url The url where the post request is sent
 * @param data The data to send
 */
com.adtech.Utils_2_53_3.createIframeFormPostRequest = function(url, data) {
  var iframe = document.createElement('iframe'),
      form = document.createElement('form'),
      div = document.createElement('div'),
      input = document.createElement('input');
  if (div.style.setAttribute) {
    div.style.setAttribute('cssText', 'display:none;');
  } else {
    div.setAttribute('style', 'display:none;');
  }
  form.setAttribute('action', url);
  form.setAttribute('method', 'POST');
  form.setAttribute('enctype', 'text/plain');
  form.setAttribute('encoding', 'text/plain');
  input.setAttribute('type', 'hidden');
  input.setAttribute('name', com.adtech.Utils_2_53_3.JSON_CD_POST_REQUEST_FIELD);
  input.setAttribute('value', JSON.stringify(data));
  form.appendChild(input);
  div.appendChild(iframe);
  // Use insertBefore as opposed to appendChild, in case the DOM hasn't loaded.
  document.body.insertBefore(div, document.body.firstChild);
  var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
  innerDoc.open();
  innerDoc.write('<!DOCTYPE html><html><body></body></html>');
  innerDoc.close();
  com.adtech.Utils_2_53_3.registerNativeEventHandler(iframe, 'load', function() {
    com.adtech.Utils_2_53_3.removeChildSafe(div);
  });
  innerDoc.body.appendChild(form);
  innerDoc.getElementsByTagName('form')[0].submit();
}

/**
 * Makes a POST Cross Domain Request
 *
 * @param url The url where the post request is sent
 * @param data The data to send
 */
com.adtech.Utils_2_53_3.makeJsonPostCdRequest = function(url, data) {
  var xhr = com.adtech.Utils_2_53_3.createCORSRequest('POST', url),
      params = com.adtech.Utils_2_53_3.JSON_CD_POST_REQUEST_FIELD + '=';
  if (!xhr) {
    com.adtech.Utils_2_53_3.createIframeFormPostRequest(url, data);
    return;
  }
  xhr.onerror = function() {
    com.adtech.Utils_2_53_3.createIframeFormPostRequest(url, data);
  };
  params = params + JSON.stringify(data);
  xhr.send(params);
}

/**
 * Replaces tokens within an input string using the tokenMap argument.
 */
com.adtech.Utils_2_53_3.replaceTokens = function(inputString, tokenMap) {
  for (var key in tokenMap) {
    if (tokenMap.hasOwnProperty(key)) {
      var re = new RegExp(key.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g');
      inputString = inputString.replace(re, tokenMap[key]);
    }
  }
  return inputString;
}

/**
 * Replaces a character within a string at a particular index, returning the new string.
 *
 * @param string the input string.
 * @param index the index at which to perform the replacement.
 * @param replacement the replacement string to be inserted.
 */
com.adtech.Utils_2_53_3.replaceCharAt = function(string, index, replacement) {
  return string.substr(0, index) + replacement +
      string.substr((index + 1), string.length);
}

/**
 * Iterates over the object executing the function for element in it with the target in question.
 * @param obj The object to be iterated.
 * @param callback The function to be executed for each element in the object.
 * @param target the target object on which to run the function.
 */
com.adtech.Utils_2_53_3.forEach = function(obj, callback, target) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      callback.call(target, key, obj[key]);
    }
  }
}
// Copyright 2013 AOL Platforms.

/**
 * Utility class for ADTECH Richmedia safeframe ad serving management.
 *
 * @author Pictela Support <support@pictela.com>
 */
com.adtech.SafeframeUtils_2_53_3 = function() {};

/**
 * Returns a boolean flag indicating if the ad has been served into an safeframe.
 */
com.adtech.SafeframeUtils_2_53_3.isInSafeframe = function() {
  try {
    var sfAPI = window.sfAPI || $sf.ext;
    if (sfAPI) {
      return true;
    }
  } catch (e) {}
  return false;
}

/**
 * Returns a boolean flag indicating if the ad is running in the ADTECH safeframe sandox.
 */
com.adtech.SafeframeUtils_2_53_3.isInSafeframeSandbox = function() {
  return (this.getSafeframeSandbox()) ? true : false;
}

/**
 * Returns the ADTECH safeframe sandbox iframe.
 */
com.adtech.SafeframeUtils_2_53_3.getSafeframeSandbox = function() {
  return window.adtechSafeframeSandbox;
}

/**
 * Register the ad with the sameframe.
 */
com.adtech.SafeframeUtils_2_53_3.register = function(width, height, callbackFunction) {
  try {
    this.sfAPI = parent.sfAPI || parent.$sf.ext;
    if (this.sfAPI) {
      this.sfAPI.register(width, height, callbackFunction);
    }
  } catch (e) {}
}

/**
 * Return the percentage of the ad in view.
 */
com.adtech.SafeframeUtils_2_53_3.getInViewPercentage = function() {
  try {
    if (this.sfAPI) {
      var geom = this.sfAPI.geom();
      return geom.self.iv * 100;
    }
  } catch (e) {}
  return;
}

/**
 * Return the maximum ad area.
 */
com.adtech.SafeframeUtils_2_53_3.getMaximumAdArea = function() {
  try {
    if (this.sfAPI) {
      var geom = this.sfAPI.geom();
      return (geom.self.b - geom.self.t) * (geom.self.r - geom.self.l);
    }
  } catch (e) {}
  return;
}

/**
 * Expand the ad.
 */
com.adtech.SafeframeUtils_2_53_3.expand = function(divContainer, safeframeObj) {
  this.adjustSafeframeContainer(divContainer, safeframeObj);
  /*
   * Give right and bottom the value 0 when expanding on opposite directions for the safeframe
   * API expand method.
   */
  if (divContainer.contractedX && divContainer.contractedX !=
      divContainer.contentWidth - divContainer.contractedWidth) {
    safeframeObj.r = 0;
  }
  if (divContainer.contractedY && divContainer.contractedY !=
      divContainer.contentHeight - divContainer.contractedHeight) {
    safeframeObj.b = 0;
  }
  try {
    if (this.sfAPI) {
      this.sfAPI.expand(safeframeObj);
    }
  } catch (e) {}
  return;
}

/**
 * Calculate the number of pixels to grow in each direction from the clip and unclip styles:
 */
com.adtech.SafeframeUtils_2_53_3.prototype.safeframeObjFromClips = function(clipStyle, unclipStyle, push) {
  var pattern = /rect\s*\(\s*(\w+)px\s*,\s*(\w+)px\s*,\s*(\w+)px\s*,\s*(\w+)px\s*\)/i;
  var clipMatch = pattern.exec(clipStyle);
  var unclipMatch = pattern.exec(unclipStyle);

  var result = new Object();
  result.push = push;
  result.t = Math.abs(parseInt(unclipMatch[1]) - parseInt(clipMatch[1]));
  result.r = Math.abs(parseInt(unclipMatch[2]) - parseInt(clipMatch[2]));
  result.b = Math.abs(parseInt(unclipMatch[3]) - parseInt(clipMatch[3]));
  result.l = Math.abs(parseInt(unclipMatch[4]) - parseInt(clipMatch[4]));
  return result;
}

/**
 * Collapse the ad.
 */
com.adtech.SafeframeUtils_2_53_3.collapse = function(divContainer) {
  this.adjustSafeframeContainer(divContainer);
  try {
    if (this.sfAPI) {
      this.sfAPI.collapse();
    }
  } catch (e) {}
  return;
}

/**
 * @private
 *
 * Adjusts the relative position of the safeframe sandbox iframe and the container based on the
 * safeframeObj.
 *
 * @param divContainer DivContainer object
 * @param safeframeObj Object that contains the number of pixels to grow in each direction
 *     {t, r, b, l} (top, right, bottom, left) from the clip and unclip styles
 */
com.adtech.SafeframeUtils_2_53_3.adjustSafeframeContainer = function(divContainer, safeframeObj) {
  var adtechSafeframeSandbox = this.getSafeframeSandbox();
  if (!safeframeObj) {
    adtechSafeframeSandbox.style.position = 'static';
    adtechSafeframeSandbox.style.left = 'auto';
    adtechSafeframeSandbox.style.top = 'auto';
    divContainer.anchorDiv.style.left = 'auto';
    divContainer.anchorDiv.style.top = 'auto';
    return;
  }
  adtechSafeframeSandbox.style.position = 'relative';
  if (safeframeObj.l) {
    adtechSafeframeSandbox.style.left = - safeframeObj.l +
        (divContainer.contentWidth - this.sfAPI.geom().self.w) + 'px';
    divContainer.anchorDiv.style.left = divContainer.contractedX  + 'px';
  }
  if (safeframeObj.t) {
    adtechSafeframeSandbox.style.top = - safeframeObj.t +
        (divContainer.contentHeight - this.sfAPI.geom().self.h) + 'px';
    divContainer.anchorDiv.style.top = divContainer.contractedY + 'px';
  }
}

/**
 * @private
 *
 * Creates a friendly iframe in the safeframe in order for us to use clean native JS methods.
 */
com.adtech.SafeframeUtils_2_53_3.createSafeframeSandbox = function(adConfig) {
  var iframeId = 'adtechSafeFrameSandbox_' + adConfig.adServerVars.uid;
  var width = adConfig.assetContainers.main.contentWidth;
  var height = adConfig.assetContainers.main.contentHeight;
  var style = 'width:' + width + 'px;height:' + height + 'px;border:0px;';
  document.write('<iframe id="' + iframeId + '" style="' + style + '" seamless="seamless" ' +
      'scrolling="no" frameborder="0" allowtransparency="true" allowFullScreen="true" ' +
      'mozallowFullScreen="true" webkitAllowFullScreen="true"></iframe>');
  var sandboxIframe = document.getElementById(iframeId);
  //TODO (samuel.adu): Ensure we have the reference first!
  var sandboxWin = sandboxIframe.contentWindow;
  var sandboxDoc = sandboxWin.document;
  var scr = 'scr';
  sandboxDoc.open();
  /* We must set the window properties after the document is opened, as
     IE wipes any existing ones out at this point.*/
  sandboxWin.adtechSafeframeSandbox = sandboxIframe;
  adConfig.overrides = adConfig.overrides || {};
  adConfig.overrides['displayWindowTarget'] = sandboxWin;
  sandboxWin.adtechAdQueue = [adConfig];
  sandboxWin.adtechAdManagerReqs = {'2_53_3': true};
  if (window.adtechAdCallbacks) {
    sandboxWin.adtechAdCallbacks = window.adtechAdCallbacks;
  }
  sandboxDoc.write('<html><head></head><body style="padding:0px;margin:0px;">' +
      '<' + scr + 'ipt type="text/javascript" src="' + adConfig.rmLibUrl + '">' +
      '</' + scr + 'ipt></body><html>');
  sandboxDoc.close();
}/*!  SWFObject v2.2 <http://code.google.com/p/swfobject/>
  is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
// ADTECH: swfobject placed in adtech namespace as we have made changes.
com.adtech.swfobject_2_53_3 = function() {

  var UNDEF = "undefined",
    OBJECT = "object",
    SHOCKWAVE_FLASH = "Shockwave Flash",
    SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
    FLASH_MIME_TYPE = "application/x-shockwave-flash",
    ON_READY_STATE_CHANGE = "onreadystatechange",

    win = window,
    doc = document,
    nav = navigator,

    plugin = false,
    domLoadFnArr = [],
    // ADTECH: Two new properties below.
    overrideableDOMLoadHandlers = [],
    overrideableDOMLoadHandlersInvoked = false,
    regObjArr = [],
    objIdArr = [],
    listenersArr = [],
    storedCallbackFn,
    storedCallbackObj,
    isDomLoaded = false,
    dynamicStylesheet,
    dynamicStylesheetMedia,
    autoHideShow = true,

  /* Centralized function for browser feature detection
    - User agent string detection is only used when no good alternative is possible
    - Is executed directly for optimal performance
  */
  ua = function() {
    var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
      u = nav.userAgent.toLowerCase(),
      p = nav.platform.toLowerCase(),
      windows = p ? /win/.test(p) : /win/.test(u),
      mac = p ? /mac/.test(p) : /mac/.test(u),
      webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
      ie = !+"\v1", // feature detection based on Andrea Giammarchi's solution: http://webreflection.blogspot.com/2009/01/32-bytes-to-know-if-your-browser-is-ie.html
      playerVersion = [0,0,0],
      d = null;
    if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
      d = nav.plugins[SHOCKWAVE_FLASH].description;
      if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) { // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
        plugin = true;
        ie = false; // cascaded feature detection for Internet Explorer
        d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
        playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
        playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
        playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
      }
    }
    else if (typeof win.ActiveXObject != UNDEF) {
      try {
        var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
        if (a) { // a will return null when ActiveX is disabled
          d = a.GetVariable("$version");
          if (d) {
            ie = true; // cascaded feature detection for Internet Explorer
            d = d.split(" ")[1].split(",");
            playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
          }
        }
      }
      catch(e) {}
    }
    return { w3:w3cdom, pv:playerVersion, wk:webkit, ie:ie, win:windows, mac:mac, string:u };
  }(),

  /* Cross-browser onDomLoad
    - Will fire an event as soon as the DOM of a web page is loaded
    - Internet Explorer workaround based on Diego Perini's solution: http://javascript.nwbox.com/IEContentLoaded/
    - Regular onload serves as fallback
  */
  onDomLoad = function() {
    if (!ua.w3) { return; }
    if ((typeof doc.readyState != UNDEF && doc.readyState == "complete") || (typeof doc.readyState == UNDEF && (doc.getElementsByTagName("body")[0] || doc.body))) { // function is fired after onload, e.g. when script is inserted dynamically
      callDomLoadFunctions();
    }
    if (!isDomLoaded) {
      if (typeof doc.addEventListener != UNDEF) {
        doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, false);
      }
      if (ua.ie && ua.win) {
        doc.attachEvent(ON_READY_STATE_CHANGE, function() {
          if (doc.readyState == "complete") {
            doc.detachEvent(ON_READY_STATE_CHANGE, arguments.callee);
            callDomLoadFunctions();
          }
        });
        if (win == top) { // if not inside an iframe
          (function(){
            if (isDomLoaded) { return; }
            try {
              doc.documentElement.doScroll("left");
            }
            catch(e) {
              setTimeout(arguments.callee, 0);
              return;
            }
            callDomLoadFunctions();
          })();
        }
      }
      if (ua.wk) {
        (function(){
          if (isDomLoaded) { return; }
          if (!/loaded|complete/.test(doc.readyState)) {
            setTimeout(arguments.callee, 0);
            return;
          }
          callDomLoadFunctions();
        })();
      }
      addLoadEvent(callDomLoadFunctions);
    }
  }();

  function callDomLoadFunctions() {
    if (isDomLoaded) {
      return;
    }
    try { // test if we can really add/remove elements to/from the DOM; we don't want to fire it too early
      var t = doc.getElementsByTagName("body")[0].appendChild(createElement("span"));
      t.parentNode.removeChild(t);
    } catch (e) {
      return;
    }
    isDomLoaded = true;
    invokeOverrideableDOMLoadHandlers();
    var dl = domLoadFnArr.length;
    for (var i = 0; i < dl; i++) {
      domLoadFnArr[i]();
    }
  }

  function invokeOverrideableDOMLoadHandlers() {
    if (overrideableDOMLoadHandlersInvoked) {
      return;
    }
    overrideableDOMLoadHandlersInvoked = true;
    var handlersLength = overrideableDOMLoadHandlers.length;
    for (var i = 0; i < handlersLength; i++) {
      overrideableDOMLoadHandlers[i]();
    }
  }

  function addDomLoadEvent(fn) {
    if (isDomLoaded) {
      fn();
    } else {
      domLoadFnArr[domLoadFnArr.length] = fn; // Array.push() is only available in IE5.5+
    }
  }

  /*
   * ADTECH new function added that gets triggered on the earliest of DOM Load of
   * invocation of invokeDOMLoadHandlers.
   */
  function addOverrideableDomLoadHandler(fn) {
    if (overrideableDOMLoadHandlersInvoked || isDomLoaded) {
      fn();
    } else {
      overrideableDOMLoadHandlers[overrideableDOMLoadHandlers.length] = fn; // Array.push() is only available in IE5.5+
    }
  }

  /* Cross-browser onload
    - Based on James Edwards' solution: http://brothercake.com/site/resources/scripts/onload/
    - Will fire an event as soon as a web page including all of its assets are loaded
   */
  function addLoadEvent(fn) {
    var iframeUtils = com.adtech.IframeUtils_2_53_3;
    /* ADTECH - If we're rendering within a friendly iframe, we always want to add the load
     * event listener to the top most frame if possible. If not, we fallback to self.
     */
    var winContext = (iframeUtils && iframeUtils.isInIframe() && iframeUtils.isInFriendlyIframe()) ?
            iframeUtils.topOrSelf() : win;
    if (typeof win.addEventListener != UNDEF) {
      winContext.addEventListener("load", fn, false);
    }
    else if (typeof doc.addEventListener != UNDEF) {
      winContext.document.addEventListener("load", fn, false);
    }
    else if (typeof win.attachEvent != UNDEF) {
      addListener(winContext, "onload", fn);
    }
    else if (typeof winContext.onload == "function") {
      var fnOld = winContext.onload;
      winContext.onload = function() {
        fnOld();
        fn();
      };
    }
    else {
      winContext.onload = fn;
    }
  }

  /* Cross-browser dynamic SWF creation
  */
  function createSWF(attObj, parObj, id) {
    var r, el = getElementById(id);
     // ADTECH: Fix for publishers who move the containers from the DOM on DOMLoad.
    if (!el) {
      var callbackCount = (arguments.length > 3) ? arguments[3] + 1 : 0;
      var self = this;
      var callback = function() {
        createSWF.apply(self, [attObj, parObj, id, callbackCount]);
      }
      if (arguments.length == 3) {
        setTimeout(callback, 10);
      } else if (callbackCount < 5) {
        setTimeout(callback, 50);
      }
    }
    // ADTECH: End fix.
    if (ua.wk && ua.wk < 312) { return r; }
    if (el) {
      if (typeof attObj.id == UNDEF) { // if no 'id' is defined for the object element, it will inherit the 'id' from the alternative content
        attObj.id = id;
      }
      if (ua.ie && ua.win) { // Internet Explorer + the HTML object element + W3C DOM methods do not combine: fall back to outerHTML
        var att = "";
        for (var i in attObj) {
          if (attObj[i] != Object.prototype[i]) { // filter out prototype additions from other potential libraries
            if (i.toLowerCase() == "data") {
              parObj.movie = attObj[i];
            }
            else if (i.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
              att += ' class="' + attObj[i] + '"';
            }
            else if (i.toLowerCase() != "classid") {
              att += ' ' + i + '="' + attObj[i] + '"';
            }
          }
        }
        var par = "";
        for (var j in parObj) {
          if (parObj[j] != Object.prototype[j]) { // filter out prototype additions from other potential libraries
            par += '<param name="' + j + '" value="' + parObj[j] + '" />';
          }
        }
        el.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + att + '>' + par + '</object>';
        objIdArr[objIdArr.length] = attObj.id; // stored to fix object 'leaks' on unload (dynamic publishing only)
        r = getElementById(attObj.id);
      }
      else { // well-behaving browsers
        var o = createElement(OBJECT);
        o.setAttribute("type", FLASH_MIME_TYPE);
        for (var m in attObj) {
          if (attObj[m] != Object.prototype[m]) { // filter out prototype additions from other potential libraries
            if (m.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
              o.setAttribute("class", attObj[m]);
            }
            else if (m.toLowerCase() != "classid") { // filter out IE specific attribute
              o.setAttribute(m, attObj[m]);
            }
          }
        }
        for (var n in parObj) {
          if (parObj[n] != Object.prototype[n] && n.toLowerCase() != "movie") { // filter out prototype additions from other potential libraries and IE specific param element
            createObjParam(o, n, parObj[n]);
          }
        }
        el.parentNode.replaceChild(o, el);
        r = o;
      }
    }
    return r;
  }

  function createObjParam(el, pName, pValue) {
    var p = createElement("param");
    p.setAttribute("name", pName);
    p.setAttribute("value", pValue);
    el.appendChild(p);
  }

  /* Cross-browser SWF removal
    - Especially needed to safely and completely remove a SWF in Internet Explorer
  */
  function removeSWF(id) {
    var obj = getElementById(id);
    if (obj && obj.nodeName == "OBJECT") {
      if (ua.ie && ua.win) {
        obj.style.display = "none";
        (function(){
          if (obj.readyState == 4) {
            removeObjectInIE(id);
          }
          else {
            setTimeout(arguments.callee, 10);
          }
        })();
      }
      else {
        obj.parentNode.removeChild(obj);
      }
    }
  }

  function removeObjectInIE(id) {
    var obj = getElementById(id);
    if (obj) {
      for (var i in obj) {
        if (typeof obj[i] == "function") {
          obj[i] = null;
        }
      }
      obj.parentNode.removeChild(obj);
    }
  }

  /* Functions to optimize JavaScript compression
  */
  function getElementById(id) {
    var el = null;
    try {
      el = doc.getElementById(id);
    }
    catch (e) {}
    return el;
  }

  function createElement(el) {
    return doc.createElement(el);
  }

  /* Updated attachEvent function for Internet Explorer
    - Stores attachEvent information in an Array, so on unload the detachEvent functions can be called to avoid memory leaks
  */
  function addListener(target, eventType, fn) {
    target.attachEvent(eventType, fn);
    listenersArr[listenersArr.length] = [target, eventType, fn];
  }

  /* Flash Player and SWF content version matching
  */
  function hasPlayerVersion(rv) {
    // ADTECH: Force rv to be a string to prevent rv.split failing.
    rv += '';
    var pv = ua.pv, v = rv.split(".");
    v[0] = parseInt(v[0], 10);
    v[1] = parseInt(v[1], 10) || 0; // supports short notation, e.g. "9" instead of "9.0.0"
    v[2] = parseInt(v[2], 10) || 0;
    return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
  }

  /* Cross-browser dynamic CSS creation
    - Based on Bobby van der Sluis' solution: http://www.bobbyvandersluis.com/articles/dynamicCSS.php
  */
  function createCSS(sel, decl, media, newStyle) {
    if (ua.ie && ua.mac) { return; }
    var h = doc.getElementsByTagName("head")[0];
    if (!h) { return; } // to also support badly authored HTML pages that lack a head element
    var m = (media && typeof media == "string") ? media : "screen";
    if (newStyle) {
      dynamicStylesheet = null;
      dynamicStylesheetMedia = null;
    }
    if (!dynamicStylesheet || dynamicStylesheetMedia != m) {
      // create dynamic stylesheet + get a global reference to it
      var s = createElement("style");
      s.setAttribute("type", "text/css");
      s.setAttribute("media", m);
      dynamicStylesheet = h.appendChild(s);
      if (ua.ie && ua.win && typeof doc.styleSheets != UNDEF && doc.styleSheets.length > 0) {
        dynamicStylesheet = doc.styleSheets[doc.styleSheets.length - 1];
      }
      dynamicStylesheetMedia = m;
    }
    // add style rule
    if (ua.ie && ua.win) {
      if (dynamicStylesheet && typeof dynamicStylesheet.addRule == OBJECT) {
        dynamicStylesheet.addRule(sel, decl);
      }
    }
    else {
      if (dynamicStylesheet && typeof doc.createTextNode != UNDEF) {
        dynamicStylesheet.appendChild(doc.createTextNode(sel + " {" + decl + "}"));
      }
    }
  }

  function setVisibility(id, isVisible) {
    if (!autoHideShow) { return; }
    var v = isVisible ? "inherit" : "hidden";
    if (isDomLoaded && getElementById(id)) {
       getElementById(id).style.visibility = v;
    }
    else {
      createCSS("#" + id, "visibility:" + v);
    }
  }

  /* Filter to avoid XSS attacks
  */
  function urlEncodeIfNecessary(s) {
    var regex = /[\\\"<>\.;]/;
    var hasBadChars = regex.exec(s) !== null;
    return hasBadChars && typeof encodeURIComponent != UNDEF ? encodeURIComponent(s) : s;
  }

  /* Release memory to avoid memory leaks caused by closures, fix hanging audio/video threads and force open sockets/NetConnections to disconnect (Internet Explorer only)
  */
  var cleanup = function() {
    if (ua.ie && ua.win) {
      window.attachEvent("onunload", function() {
        // remove listeners to avoid memory leaks
        var ll = listenersArr.length;
        for (var i = 0; i < ll; i++) {
          listenersArr[i][0].detachEvent(listenersArr[i][1], listenersArr[i][2]);
        }
        // cleanup dynamically embedded objects to fix audio/video threads and force open sockets and NetConnections to disconnect
        var il = objIdArr.length;
        for (var j = 0; j < il; j++) {
          removeSWF(objIdArr[j]);
        }
        // cleanup library's main closures to avoid memory leaks
        for (var k in ua) {
          ua[k] = null;
        }
        ua = null;
        // ADTECH: Namespace added.
        for (var l in com.adtech.swfobject) {
          com.adtech.swfobject[l] = null;
        }
        com.adtech.swfobject = null;
      });
    }
  }();

  return {
    /* Public API
      - Reference: http://code.google.com/p/swfobject/wiki/documentation
    */

    embedSWF: function(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, flashvarsObj, parObj, attObj, callbackFn) {
      var callbackObj = {success:false, id:replaceElemIdStr};
      if (ua.w3 && !(ua.wk && ua.wk < 312) && swfUrlStr && replaceElemIdStr && widthStr && heightStr && swfVersionStr) {
        setVisibility(replaceElemIdStr, false);
        addOverrideableDomLoadHandler(function() {
          widthStr += ""; // auto-convert to string
          heightStr += "";
          var att = {};
          if (attObj && typeof attObj === OBJECT) {
            for (var i in attObj) { // copy object to avoid the use of references, because web authors often reuse attObj for multiple SWFs
              att[i] = attObj[i];
            }
          }
          att.data = swfUrlStr;
          att.width = widthStr;
          att.height = heightStr;
          var par = {};
          if (parObj && typeof parObj === OBJECT) {
            for (var j in parObj) { // copy object to avoid the use of references, because web authors often reuse parObj for multiple SWFs
              par[j] = parObj[j];
            }
          }
          if (flashvarsObj && typeof flashvarsObj === OBJECT) {
            for (var k in flashvarsObj) { // copy object to avoid the use of references, because web authors often reuse flashvarsObj for multiple SWFs
              if (typeof par.flashvars != UNDEF) {
                par.flashvars += "&" + k + "=" + flashvarsObj[k];
              }
              else {
                par.flashvars = k + "=" + flashvarsObj[k];
              }
            }
          }
          if (hasPlayerVersion(swfVersionStr)) { // create SWF
            var obj = createSWF(att, par, replaceElemIdStr);
            if (att.id == replaceElemIdStr) {
              setVisibility(replaceElemIdStr, true);
            }
            callbackObj.success = true;
            callbackObj.ref = obj;
          } else { // show alternative content
            setVisibility(replaceElemIdStr, true);
          }
          if (callbackFn) {
            callbackFn(callbackObj);
          }
        });
      } else if (callbackFn) {
        callbackFn(callbackObj);
      }
    },

    switchOffAutoHideShow: function() {
      autoHideShow = false;
    },

    ua: ua,

    getFlashPlayerVersion: function() {
      return { major:ua.pv[0], minor:ua.pv[1], release:ua.pv[2] };
    },

    hasFlashPlayerVersion: hasPlayerVersion,

    createSWF: function(attObj, parObj, replaceElemIdStr) {
      if (ua.w3) {
        return createSWF(attObj, parObj, replaceElemIdStr);
      }
      else {
        return undefined;
      }
    },

    removeSWF: function(objElemIdStr) {
      if (ua.w3) {
        removeSWF(objElemIdStr);
      }
    },

    createCSS: function(selStr, declStr, mediaStr, newStyleBoolean) {
      if (ua.w3) {
        createCSS(selStr, declStr, mediaStr, newStyleBoolean);
      }
    },

    // ADTECH: Added this method.
    setDOMContext: function(context) {
      doc = context;
    },

    // ADTECH: Added this method.
    forceSWFRender: function() {
      invokeOverrideableDOMLoadHandlers();
    },

    addDomLoadEvent: addDomLoadEvent,
    addLoadEvent: addLoadEvent
  };
}();
// Copyright 2014 AOL Platforms.

/**
 * Utility class for DCO functionality.
 *
 * @class
 * @constructor
 * @author Pictela Support <support@pictela.com>
 */
com.adtech.DCOUtils_2_53_3 = function(){};

com.adtech.DCOUtils_2_53_3.TIMER_STR = 'Timer';

/**
 * Converts a Pictela event name to an object, containing relevant properties for
 * tracking the event using the DCO logger.
 *
 * The return object will contain the following keys
 * section
 * component
 * content
 * detail
 * action
 */
com.adtech.DCOUtils_2_53_3.eventNameToObject = function(eventName) {
  var classifiedObject = {
    "section": null,
    "component": null,
    "content": null,
    "detail": null,
    "action": null
  };
  try {
    var eventNameBits = eventName.split(': ');
  } catch (e) {
    return classifiedObject;
  }
  var sectionComponentBits = eventNameBits[0].split(' - ');
  if (sectionComponentBits.length == 2) {
    classifiedObject['section'] = sectionComponentBits[0];
    classifiedObject['component'] = sectionComponentBits[1];
    eventNameBits.shift();
  }

  switch (eventNameBits.length) {
    case 1:
      classifiedObject['action'] = eventNameBits[0];
      break;
    case 2:
      classifiedObject['content'] = eventNameBits[0];
      classifiedObject['action'] = eventNameBits[1];
      break;
    case 3:
      classifiedObject['content'] = eventNameBits[0];
      classifiedObject['detail'] = eventNameBits[1];
      classifiedObject['action'] = eventNameBits[2];
      break;
  }
  return classifiedObject;
}

/**
 * Sanitise the name of the event for DCO reporting purposes.
 *
 * @param event The event where the name will be sanitised.
 */
com.adtech.DCOUtils_2_53_3.sanitiseEventName = function(event) {
  if (event.contentTypeId == com.adtech.ContentRenditionProcessor_2_53_3.TYPE_ID_VIDEO
      && event.name.indexOf(com.adtech.Advert_2_53_3.CONTENT_SEPARATOR) == -1) {
    var reportingId =
        com.adtech.Utils_2_53_3.getVideoReportingIdFromEventName(event.name);
    event.name = reportingId.slice(0, -1) + com.adtech.Advert_2_53_3.CONTENT_SEPARATOR
        + event.name.replace(reportingId, '');
  }
  event.sanitisedName = com.adtech.DCOUtils_2_53_3.eventNameToObject(event.name)['action'];
}

/**
 * Converts an old-style Pictela timer name to fall in line with the new DCO formatting.
 */
com.adtech.DCOUtils_2_53_3.convertTimerName = function(timerName) {
  if (timerName.match(/[^\s]Timer$/)) {
    timerName = timerName.replace(com.adtech.DCOUtils_2_53_3.TIMER_STR, '');
    return com.adtech.Utils_2_53_3.replaceCharAt(
        timerName, 0, timerName.charAt(0).toUpperCase());
  } else if (timerName.match(/Video View$/)) {
    return timerName.replace(/\sView$/, '');
  }
  return timerName;
}

/**
 * Check if the id from the ad server is a string, if it is set it to 0.
 *
 *  @param value The value to check.
 */
com.adtech.DCOUtils_2_53_3.processDCOAdServerId = function(value) {
  if (com.adtech.Utils_2_53_3.isArray(value)) {
    var processedArray = [];
    var arrayLength = value.length;
    for (var i = 0; i < arrayLength; i++) {
      processedArray[i] =
        com.adtech.DCOUtils_2_53_3.processDCOAdServerId(value[i]);
    }
    return processedArray;
  } else {
    return isNaN(value) ? 0 : value;
  }
};

/**
 * Check in a object if a value is undefined, if it is set it null
 * Converts an number to a string
 */
com.adtech.DCOUtils_2_53_3.processDCOValue = function(obj) {
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] && obj[key].constructor == {}.constructor) {
        obj[key] = com.adtech.DCOUtils_2_53_3.processDCOValue(obj[key]);
      } else {
        obj[key] = (typeof obj[key] != 'undefined' && obj[key] !== null)
            ? obj[key] : '';
        obj[key] = (!com.adtech.Utils_2_53_3.isArray(obj[key]))
            ? obj[key] + '' : obj[key];
      }
    }
  }
  return obj;
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
com.adtech.DCOUtils_2_53_3.getDCOMapContent = function(dynamicMap, contentName, propertyName) {
  for (var contentKey in dynamicMap) {
    var baseProperties = com.adtech.DCODataLoader_2_53_3.BASE_PROPERTIES;
    var keyMatches = (contentKey == contentName || !propertyName && contentKey == baseProperties);
    if (dynamicMap.hasOwnProperty(contentKey) && keyMatches) {
      var mapArray = dynamicMap[contentKey];
      for (var i = 0, len = mapArray.length; i < len; i++) {
        var mapObj = mapArray[i];
        var mappingKey = (contentKey == baseProperties)
            ? contentName : propertyName;
        if (mapObj.mapping && mapObj.mapping[mappingKey]) {
          return mapObj;
        }
      }
    }
  }
  return null;
}
// Copyright 2010 AOL Platforms.

/**
 * Base class for all runtime objects that dispatch events.
 *
 * @class
 * @constructor
 * @author Pictela Support <support@pictela.com>
 */
com.adtech.EventDispatcher_2_53_3 = function() {
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
com.adtech.EventDispatcher_2_53_3.prototype.addEventListener = function(type, handler, obj) {
  if (typeof this.eventTypes[type] == 'undefined') {
    this.eventTypes[type] = [];
  }
  if (!com.adtech.Utils_2_53_3.inArray(handler, this.eventTypes[type])) {
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
com.adtech.EventDispatcher_2_53_3.prototype.removeEventListener = function(type, handler, obj) {
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
com.adtech.EventDispatcher_2_53_3.prototype.hasEventListener = function(type, handler, obj) {
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
com.adtech.EventDispatcher_2_53_3.prototype.dispatchEvent = function(event) {
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
    event = new com.adtech.RichMediaEvent_2_53_3(event);
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
com.adtech.RichMediaEvent_2_53_3 = function(type) {
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
com.adtech.RichMediaEvent_2_53_3.DOM_LOAD = 'DOMLoad';
/**
 * The RichMediaEvent.ENGAGEMENT constant defines the value of the type property of a engagement
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent_2_53_3.ENGAGEMENT = 'engagement';
/** @private */
com.adtech.RichMediaEvent_2_53_3.VIEWABLE_IMPRESSION = 'viewableImpression';
/** @private */
com.adtech.RichMediaEvent_2_53_3.INTERACTIVE_IMPRESSION = 'interactiveImpression';
/** @private */
com.adtech.RichMediaEvent_2_53_3.VIDEO_IMPRESSION = 'videoImpression';
/** @private */
com.adtech.RichMediaEvent_2_53_3.QUALIFIED_ROLLOVER = 'qualifiedRollover';
/** @private */
com.adtech.RichMediaEvent_2_53_3.BACKUP_VIEW = 'backupView';
/** @private */
com.adtech.RichMediaEvent_2_53_3.UNSUPPORTED_CLIENT = 'unsupportedClient';
/** @private */
com.adtech.RichMediaEvent_2_53_3.BACKUP_VIEWABLE_IMPRESSION = 'backupViewableImpression';
/** @private */
com.adtech.RichMediaEvent_2_53_3.INDETERMINABLE_VIEWABILITY = 'indeterminableViewability';
/** @private */
com.adtech.RichMediaEvent_2_53_3.MOUSE_MOVE = 'mouseMove';
/**
 * The RichMediaEvent.VIEWABLE_CHANGE constant defines the value of the type property
 * of a viewableChange
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent_2_53_3.VIEWABLE_CHANGE = 'viewableChange';
/**
 * The RichMediaEvent.CONTAINER_RESIZE constant defines the value of the type property
 * of a viewableChange
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent_2_53_3.CONTAINER_RESIZE = 'resize';
/**
 * The RichMediaEvent.MOUSE_OUT constant defines the value of the type property of a mouseOut
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent_2_53_3.MOUSE_OUT = 'mouseOut';
/**
 * The RichMediaEvent.MOUSE_OVER constant defines the value of the type property of a mouseOver
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent_2_53_3.MOUSE_OVER = 'mouseOver';
/**
 * The RichMediaEvent.PAGE_LOAD constant defines the value of the type property of a pageLoad
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent_2_53_3.PAGE_LOAD = 'pageLoad';
/**
 * The RichMediaEvent.PAGE_SCROLL constant defines the value of the type property of a pageScroll
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent_2_53_3.PAGE_SCROLL = 'pageScroll';
/**
 * The RichMediaEvent.BLUR constant defines the value of the type property of a blur
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent_2_53_3.BLUR = 'blur';
/**
 * The RichMediaEvent.ORIENTATION_CHANGE constant defines the value of the type property of an
 * orientationChange event object.
 * @type String
 */
com.adtech.RichMediaEvent_2_53_3.ORIENTATION_CHANGE = 'orientationChange';
/**
 * The RichMediaEvent.TOUCH_START constant defines the value of the type property of a touchStart
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent_2_53_3.TOUCH_START = 'touchStart';
/**
 * The RichMediaEvent.FOCUS constant defines the value of the type property of a focus
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent_2_53_3.FOCUS = 'focus';
/**
 * The RichMediaEvent.RENDER constant defines the value of the type property of a render
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent_2_53_3.RENDER = 'render';
/** @private */
com.adtech.RichMediaEvent_2_53_3.REPORT = 'reporting';
/** @private */
com.adtech.RichMediaEvent_2_53_3.ADVERT_ADDED = 'advertAdded';
/**
 * The RichMediaEvent.PAGE_RESIZE constant defines the value of the type property of a pageResize
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent_2_53_3.PAGE_RESIZE = 'pageResize';
/** @private */
com.adtech.RichMediaEvent_2_53_3.SERVE = 'serve';
/**
 * The RichMediaEvent.IN_VIEWPORT constant defines the value of the type property of a inViewport
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent_2_53_3.IN_VIEWPORT = 'inViewport';
/**
 * The RichMediaEvent.OUT_VIEWPORT constant defines the value of the type property of a outViewport
 * event object.
 * @type String
 */
com.adtech.RichMediaEvent_2_53_3.OUT_VIEWPORT = 'outViewport';
/** @private */
com.adtech.RichMediaEvent_2_53_3.EXPANDED = 'ADTECH.expanded';
/** @private */
com.adtech.RichMediaEvent_2_53_3.CONTRACTED = 'ADTECH.contracted';
/** @ private */
com.adtech.RichMediaEvent_2_53_3.LOADED = 'ADTECH.loaded';
/** @private */
com.adtech.RichMediaEvent_2_53_3.CLICK = 'click';
/** @private */
com.adtech.RichMediaEvent_2_53_3.CLOSE = 'close';
/** @private */
com.adtech.RichMediaEvent_2_53_3.HIDE = 'hide';
/** @private */
com.adtech.RichMediaEvent_2_53_3.SHOW = 'show';
/** @private */
com.adtech.RichMediaEvent_2_53_3.READY = 'ready';
/** @private */
com.adtech.RichMediaEvent_2_53_3.ERROR = 'error';
/** @private */
com.adtech.RichMediaEvent_2_53_3.MRAID_READY = 'MRAIDReady';
/** @private */
com.adtech.RichMediaEvent_2_53_3.MRAID_ERROR = 'MRAIDError';
/**
 * The RichMediaEvent.MRAID_VIEWABLE_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 1.0
 */
com.adtech.RichMediaEvent_2_53_3.MRAID_VIEWABLE_CHANGE = 'viewableChange';
/**
 * The RichMediaEvent.MRAID_STATE_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 1.0
 */
com.adtech.RichMediaEvent_2_53_3.MRAID_STATE_CHANGE = 'stateChange';
/**
 * The RichMediaEvent.MRAID_KEYBOARD_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0 draft
 */
com.adtech.RichMediaEvent_2_53_3.MRAID_KEYBOARD_CHANGE = 'keyboardChange';
/**
 * The RichMediaEvent.MRAID_LOCATION_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0 draft
 */
com.adtech.RichMediaEvent_2_53_3.MRAID_LOCATION_CHANGE = 'locationChange';
/**
 * The RichMediaEvent.MRAID_HEADING_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0 draft
 */
com.adtech.RichMediaEvent_2_53_3.MRAID_HEADING_CHANGE = 'headingChange';
/**
 * The RichMediaEvent.MRAID_NETWORK_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0 draft
 */
com.adtech.RichMediaEvent_2_53_3.MRAID_NETWORK_CHANGE = 'networkChange';
/**
 * The RichMediaEvent.MRAID_ORIENTATION_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0 draft
 */
com.adtech.RichMediaEvent_2_53_3.MRAID_ORIENTATION_CHANGE = 'orientationChange';
/**
 * The RichMediaEvent.MRAID_SCREEN_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0 draft
 */
com.adtech.RichMediaEvent_2_53_3.MRAID_SCREEN_CHANGE = 'screenChange';
/**
 * The RichMediaEvent.MRAID_SIZE_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0
 */
com.adtech.RichMediaEvent_2_53_3.MRAID_SIZE_CHANGE = 'sizeChange';
/**
 * The RichMediaEvent.MRAID_TILT_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0 draft
 */
com.adtech.RichMediaEvent_2_53_3.MRAID_TILT_CHANGE = 'tiltChange';
/**
 * The RichMediaEvent.MRAID_TILT_CHANGE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0 draft
 */
com.adtech.RichMediaEvent_2_53_3.MRAID_SHAKE = 'shake';
/**
 * The RichMediaEvent.MRAID_RESPONSE constant defines the value of the type property
 * of an MRAID event object.
 * @type String
 * @since MRAID 2.0 draft
 */
com.adtech.RichMediaEvent_2_53_3.MRAID_RESPONSE = 'response';

/** @private */
com.adtech.RichMediaEvent_2_53_3.CONFIG_CHANGE = 'ADTECH.configChange';

/** @private */
com.adtech.RichMediaEvent_2_53_3.DYNAMIC = 'PICTELA.dynamic';

/** @private */
com.adtech.RichMediaEvent_2_53_3.DCO_DATA_ERROR = 'dcoDataError';

/**
 * Inspector Category Events
 */
/** @private */
com.adtech.RichMediaEvent_2_53_3.DURATION_START = 'durationStart';
/** @private */
com.adtech.RichMediaEvent_2_53_3.DURATION_END = 'durationEnd';
/** @private */
com.adtech.RichMediaEvent_2_53_3.VIDEO = 'video';
/** @private */
com.adtech.RichMediaEvent_2_53_3.VIDEO_INTERACTION = 'videoInteraction';
/** @private */
com.adtech.RichMediaEvent_2_53_3.THIRD_PARTY = 'thirdParty';

/**
 * Dynamically adds a property to the event object and returns a reference to
 * itself to enable chaining.
 *
 * @param name the name of the property.
 * @param value the value of the new property.
 */
com.adtech.RichMediaEvent_2_53_3.prototype.property = function(name, value) {
  if (name != 'type' && name != 'target') {
    this[name] = value;
  }
  return this;
}
// Copyright 2010 AOL Platforms.

/**
 * Sends metric logging requests back to the AdServer.
 *
 * @private
 * @author Pictela Support <support@pictela.com>
 */
com.adtech.Logger_2_53_3 = function(adManager) {
  this.adManager = adManager;
  this.eventBin = {};
  this.pixelRequests = [];
}

com.adtech.Logger_2_53_3.HELIOS_TRACKING_VERSION = '3.0';
com.adtech.Logger_2_53_3.LIVE_STATS_BASE_URL = 'http://rt.pictela.net';
com.adtech.Logger_2_53_3.AD_LOGGER_BASE_URL = 'http://ads.pictela.net/a/log';
com.adtech.Logger_2_53_3.REPORT_ERRORS = {
  'ZERO_ID': '1000'
};

/**
 * Receives logging event objects from all advert instances and makes requests
 * to the adserver.
 *
 * Event objects will have the following properties:
 * - adId (a.k.a flight ID)
 * - bannerId
 * - canvasId
 * - clickName [optional]
 * - clickUrl [optional]
 * - creativeId
 * - eventId
 * - eventIds [optional]
 * - eventName
 * - eventValues [optional]
 * - host
 * - interaction
 * - networkId
 * - pageId
 * - placementId
 * - size
 * - subNetworkId
 * - thirdPartyUrl [optional]
 * - thirdPartyCreativeId [optional]
 * - thirdPartyPlacementId [optional]
 * - timerEvent [optional]
 * - timeElapsed [optional]
 */
com.adtech.Logger_2_53_3.prototype.log = function(event) {
  if (!this.eventBin[event.adId]) {
    this.eventBin[event.adId] = [];
  }
  this.eventBin[event.adId].push(event);
  this.filterForLiveStats(event);
  if (typeof event.clickName != 'undefined') {
    com.adtech.Utils_2_53_3.debug('Click event logged.');
    // Click events are only reported on in Canvas ad preview for debugging/QA purposes.
    return;
  }
  if (typeof event.thirdPartyUrl != 'undefined') {
    this.performRequest(event.thirdPartyUrl);
    return;
  }
  if (!event.networkId || event.networkId.indexOf('_') > -1) {
    return;
  }
  if (event.category) {
    switch (event.category) {
      case com.adtech.RichMediaEvent_2_53_3.DURATION_START:
        return;
    }
  }
  this.validateEvent(event);
  var eventValuesString = (typeof event.eventValues != 'undefined') ?
      ';EventVals=' + event.eventValues.join(',') : '';
  var eventIdString = (typeof event.eventIds != 'undefined') ?
      event.eventIds.join(',') : event.eventId;
  var thirdPartyPLCRString = '';
  if (typeof event.thirdPartyPlacementId != 'undefined') {
    thirdPartyPLCRString += ';kvu.3rd-plc=' + event.thirdPartyPlacementId;
  }
  if (typeof event.thirdPartyCreativeId != 'undefined') {
    thirdPartyPLCRString += ';kvu.3rd-creative=' + event.thirdPartyCreativeId;
  }
  var reportingUrl = event.proto + '://' + event.host + '/custrmevent/' +
      com.adtech.Logger_2_53_3.HELIOS_TRACKING_VERSION + '/' + event.networkId + '.' +
      event.subNetworkId + '/' + event.placementId + '/' + event.pageId + '/' + event.size +
      '/AdId=' + event.adId + ';CreativeId=' + event.creativeId + ';BnId=' + event.bannerId +
      ';misc=' + (+new Date()) + ';refsequenceid=' + event.sequenceId32 + ';refseqid2=' +
      event.sequenceId64 + ';BnNum=' + event.bannerUid + ';EventIds=' + eventIdString + eventValuesString +
      thirdPartyPLCRString;
  this.performRequest(reportingUrl);
}

com.adtech.Logger_2_53_3.prototype.filterForLiveStats = function(event) {
  if (!(event.target.liveStatsEnabled && (event.interaction || event.clickName))) {
    return;
  }
  // TODO: SSL using event.proto
  var requestUrl = com.adtech.Logger_2_53_3.LIVE_STATS_BASE_URL + '/' +
      event.adId + '/' + event.eventId + '/' + (+new Date());
  this.performRequest(requestUrl);
}

com.adtech.Logger_2_53_3.prototype.performRequest = function(url) {
  com.adtech.Utils_2_53_3.debug('Logger making logging request for ' + url);
  var idx = this.pixelRequests.length;
  this.pixelRequests[idx] = new Image();
  this.pixelRequests[idx].src = url;
}

com.adtech.Logger_2_53_3.prototype.validateEvent = function(event) {
  var eventIdIsValid = false;
  try {
    if (typeof event.eventIds != 'undefined') {
      var eventCount = event.eventIds.length;
      var validCount = 0;
      for (var i = 0; i < eventCount; i++) {
        var eventId = event.eventIds[i] / 1;
        if (eventId > 0) {
          validCount++;
        }
      }
      if (validCount == eventCount) {
        eventIdIsValid = true;
      }
    } else {
      var eventId = event.eventId / 1;
      if (eventId > 0) {
        eventIdIsValid = true;
      }
    }
  } catch (e) {}
  if (!eventIdIsValid) {
    this.performRequest(com.adtech.Logger_2_53_3.AD_LOGGER_BASE_URL + '/' +
        event.canvasId + '/' + com.adtech.Logger_2_53_3.REPORT_ERRORS['ZERO_ID']);
  }
}
// Copyright 2014 AOL Platforms.

/**
 * Sends metric logging requests back to the DCO AdServer.
 *
 * @private
 * @author Pictela Support <support@pictela.com>
 */
com.adtech.DCOLogger_2_53_3 = function(adManager) {
  this.dcoRequests = [];
  com.adtech.DCOLogger_2_53_3.supa.constructor.call(this, adManager);
}

com.adtech.Utils_2_53_3.extend(com.adtech.DCOLogger_2_53_3,
    com.adtech.Logger_2_53_3);

com.adtech.DCOLogger_2_53_3.DCO_DATA_FIELD = 'dcoData';
com.adtech.DCOLogger_2_53_3.DCO_EVENT_KEY = 'event';
com.adtech.DCOLogger_2_53_3.DCO_EVENT_MESSAGE = 'eventMessage';
com.adtech.DCOLogger_2_53_3.GET_REQUEST_MAX_LENGTH = 2083;

com.adtech.DCOLogger_2_53_3.prototype.log = function(event) {
  if (typeof event[com.adtech.DCOLogger_2_53_3.DCO_DATA_FIELD] == 'object') {
    this.dcoRequests[this.dcoRequests.length] =
      event[com.adtech.DCOLogger_2_53_3.DCO_DATA_FIELD];
    try {
      var eventMessage = event[com.adtech.DCOLogger_2_53_3.DCO_EVENT_MESSAGE];
      var eventBuffer = new eventMessage(
          event[com.adtech.DCOLogger_2_53_3.DCO_DATA_FIELD]).encode();
      var eventLoggingUrl = event.eventEndpoint + '?' +
          'blen=' + eventBuffer.buffer.byteLength + '&' +
          com.adtech.DCOLogger_2_53_3.DCO_EVENT_KEY + '64=' +
          encodeURIComponent(eventBuffer.toBase64());
      this.performRequest(eventLoggingUrl);
      com.adtech.Utils_2_53_3.debug('Logging request url length: ' + eventLoggingUrl.length);
      if (eventLoggingUrl.length > com.adtech.DCOLogger_2_53_3.GET_REQUEST_MAX_LENGTH
          && com.adtech.Utils_2_53_3.isIE()) {
        throw new Error('Max length exceeded.');
      }
    } catch (e) {
      com.adtech.Utils_2_53_3.makeJsonPostCdRequest(
          event.eventEndpoint,
          event[com.adtech.DCOLogger_2_53_3.DCO_DATA_FIELD]);
    }
  } else {
    com.adtech.DCOLogger_2_53_3.supa.log.call(this, event);
  }
}// Copyright 2014 AOL Platforms

/**
 * Loads and processes dynamically optimised advert content from DCO. <br/><br/>
 * <strong>Dispatched events</strong> <table border="1">
 * <tr>
 * <th>Type</th>
 * <th>Properties</th>
 * </tr>
 * <tr>
 * <td>com.adtech.RichMediaEvent.LOADED</td>
 * <td><code>DCODataLoader</code> target</td>
 * </tr>
 * <tr>
 * <td>com.adtech.RichMediaEvent.ERROR</td>
 * <td><code>Advert</code> target</td>
 * </tr>
 * </table>
 *
 * @class
 * @extends com.adtech.EventDispatcher_2_53_3
 * @constructor
 * @author Pictela Support <support@pictela.com>
 * @private
 */
com.adtech.DCODataLoader_2_53_3 = function(adConfig, impressionDcoEvent) {
  /**
   * @private
   * The mapping object between the content properties and the DCO data objects
   */
  this.config = adConfig.adrConfig || adConfig.dcoConfig;
  /** @private */
  this.servingProto = adConfig.adServerVars.servingProto;
  /** @private */
  this.mainContainer = adConfig.assetContainers.main;
  this.view = (adConfig.preview) ? com.adtech.DCODataLoader_2_53_3.VIEW_PREVIEW :
      com.adtech.DCODataLoader_2_53_3.VIEW_CONTENT;
  /** @private */
  this.conditionalMap = {};
  this.arbitaryConditionalMap = adConfig.tagVars
      [com.adtech.DCODataLoader_2_53_3.ARBITRARY_PAIRS_KEY] || null;
  /** @private */
  this.dataLoadTimeout = null;
  /** @private */
  this.timeoutErrorState = false;
  /** The raw data returned from the DCO content API */
  this.data = null;
  /** @private */
  this.impression = impressionDcoEvent;
  this.buildConditionalParamsMap(adConfig);
  com.adtech.DCODataLoader_2_53_3.supa.constructor.call(this);
}

/** @private */
com.adtech.DCODataLoader_2_53_3.CONTENT_ENDPOINT_PATH =
    '{advcode}/creatives/{creativeid}/{view}';
/** @private */
com.adtech.DCODataLoader_2_53_3.DCO_DATA_TYPES = {
  'PACKAGE': 'package',
  'PRODUCTS': 'products',
  'PROMOS': 'promotions',
  'OBJ_GRPS': 'objectgroups',
  'USER_DATA': 'advuserdata'
};

com.adtech.DCODataLoader_2_53_3.ARBITRARY_PAIRS_KEY = 'dcoKvs';
com.adtech.DCODataLoader_2_53_3.BASE_PROPERTIES = 'baseProperties';
com.adtech.DCODataLoader_2_53_3.CONTENT_INDEX_KEY = '__idx';
com.adtech.DCODataLoader_2_53_3.CONTENT_MAP = 'CM';
com.adtech.DCODataLoader_2_53_3.CONTENT_META_KEY = '__meta';
com.adtech.DCODataLoader_2_53_3.CONTENT_PROPERTIES = 'CP';
com.adtech.DCODataLoader_2_53_3.DATA_LOAD_TIMEOUT = 5000;
com.adtech.DCODataLoader_2_53_3.DEFAULT_PRODUCT_COUNT = 5;
com.adtech.DCODataLoader_2_53_3.DEFAULT_TRACKING_ID_PREFIX = 'Item';
com.adtech.DCODataLoader_2_53_3.PRODUCT_ITEM_CLICK_URLS_KEY = 'ctUrls';
com.adtech.DCODataLoader_2_53_3.PRODUCT_ITEM_IMP_URLS_KEY = 'itUrls';
com.adtech.DCODataLoader_2_53_3.TAGVAR_CLICK_TRACKER = 'ct';
com.adtech.DCODataLoader_2_53_3.TAGVAR_REDIRECT = 'clk';
com.adtech.DCODataLoader_2_53_3.TAGVAR_PRODUCT_CATEGORY = 'cat';
com.adtech.DCODataLoader_2_53_3.TAGVAR_PRODUCT_ID_LIST = 'plist';
com.adtech.DCODataLoader_2_53_3.TAGVAR_MACRO_PRODUCT_ID = '[DCO_PID]';
com.adtech.DCODataLoader_2_53_3.TAGVAR_MACRO_PRODUCT_CATEGORY = '[DCO_CID]';
com.adtech.DCODataLoader_2_53_3.TAGVAR_IMPRESSION_ID = 'IMPTID';
com.adtech.DCODataLoader_2_53_3.VIEW_PREVIEW = 'preview';
com.adtech.DCODataLoader_2_53_3.VIEW_CONTENT = 'content';
com.adtech.DCODataLoader_2_53_3.ADR_PRODUCT_MACRO_PATTERN = /\[DCO_C|PID\]/ig;

com.adtech.Utils_2_53_3.extend(com.adtech.DCODataLoader_2_53_3,
    com.adtech.EventDispatcher_2_53_3);

/**
 * Returns the DCO configuration.
 */
com.adtech.DCODataLoader_2_53_3.prototype.getConfig = function() {
  return this.config;
}

/**
 * Requests the dynamic content from the DCO content endpoint.
 *
 * @param advertiserCode the DCO advertiser ID/code.
 * @param creativeId the DCO creative ID.
 */
com.adtech.DCODataLoader_2_53_3.prototype.load = function() {
  if (!(this.config && this.config.map)) {
    this.dispatchEvent(com.adtech.RichMediaEvent_2_53_3.ERROR);
    com.adtech.Utils_2_53_3.displayError(
        'Missing data map from the advert configuration.');
    return;
  }
  var tokenMap = {
    '{advcode}': this.config.advertiserCode,
    '{creativeid}': this.config.creativeId,
    '{view}': this.view
  };
  var contentEndpoint =
      this.config.contentAPIBaseUrl.replace(/^https?/i, this.servingProto) +
      com.adtech.DCODataLoader_2_53_3.CONTENT_ENDPOINT_PATH;
  var contentUrl = com.adtech.Utils_2_53_3.replaceTokens(contentEndpoint, tokenMap);
  var callbackFunctionName = 'DCODataLoadedHandler_' + (+new Date());
  var productCount = this.config.productCount ?
      this.config.productCount :
      com.adtech.DCODataLoader_2_53_3.DEFAULT_PRODUCT_COUNT;
  window[callbackFunctionName] =
      com.adtech.Utils_2_53_3.createClosure(this, this.dataLoadedHandler);
  var eventMessage = this.impression[com.adtech.DCOLogger_2_53_3.DCO_EVENT_MESSAGE];
  var eventBuffer =
      new eventMessage(this.impression[com.adtech.DCOLogger_2_53_3.DCO_DATA_FIELD]).encode();
  contentUrl += '?width=' + this.mainContainer.width + '&height=' + this.mainContainer.height;
  if (this.view == com.adtech.DCODataLoader_2_53_3.VIEW_CONTENT) {
    contentUrl += '&event64=' + encodeURIComponent(eventBuffer.toBase64());
  }
  contentUrl += '&format=jsonp&pcount=' + productCount + '&callback=' + callbackFunctionName;
  com.adtech.Utils_2_53_3.requestJs(this.addConditionalParams(contentUrl));
  var self = this;
  this.dataLoadTimeout = setTimeout(function() {
    self.dataLoadFailHandler();
  }, com.adtech.DCODataLoader_2_53_3.DATA_LOAD_TIMEOUT);
}


/**
 * @private
 */
com.adtech.DCODataLoader_2_53_3.prototype.buildConditionalParamsMap = function(adConfig) {
  var pattern = com.adtech.DCODataLoader_2_53_3.ADR_PRODUCT_MACRO_PATTERN;
  if (adConfig.pubVars.clickPixel.match(pattern) !== null) {
    this.conditionalMap['ct'] = adConfig.pubVars.clickPixel;
  }
  if (adConfig.pubVars.clickRedirect.match(pattern) !== null) {
    this.conditionalMap['clk'] = adConfig.pubVars.clickRedirect;
  }
}

/**
 * Extends the content url based on which parameters are to be sent.
 *
 * @param contentUrl the content url.
 */
com.adtech.DCODataLoader_2_53_3.prototype.addConditionalParams = function(contentUrl) {

  for (var param in this.conditionalMap) {
      if (this.conditionalMap.hasOwnProperty(param) && this.conditionalMap[param]) {
        contentUrl += '&' + param + '=' + encodeURIComponent(this.conditionalMap[param]);
      }
  }
  if (this.arbitaryConditionalMap) {
    for (var param in this.arbitaryConditionalMap) {
      if (this.arbitaryConditionalMap.hasOwnProperty(param)
          && this.arbitaryConditionalMap[param]) {
        contentUrl += '&' + param + '=' + encodeURIComponent(this.arbitaryConditionalMap[param]);
      }
    }
  }
  return contentUrl;
}

com.adtech.DCODataLoader_2_53_3.prototype.getGroupProperties = function(propertiesArray) {

  var groupObject;
  var dcoObjGrp;
  var basePropertiesArr = [];
  var contentMap;

  // Find the first package, promotions or products feed if there is any, get the value from it
  // and remove it from the array
  for (var i = 0; i < propertiesArray.length; i++) {

    var mappingItem = propertiesArray[i];
    var type = mappingItem.adrType || mappingItem.dcoType;
    var dcoType = (type ==
        com.adtech.DCODataLoader_2_53_3.DCO_DATA_TYPES['PACKAGE']) ?
        com.adtech.DCODataLoader_2_53_3.DCO_DATA_TYPES['OBJ_GRPS'] :
        type;
    var dcoTypeObject = this.data[dcoType];

    switch (type) {
      case com.adtech.DCODataLoader_2_53_3.DCO_DATA_TYPES['PACKAGE']:
        var matchedObjectGroup = com.adtech.Utils_2_53_3.getMatchingObjectFromArray(
            dcoTypeObject, 'id', mappingItem.id);
        if (matchedObjectGroup != null) {
          groupObject = this.getPackageItems(matchedObjectGroup.objects, mappingItem.mapping);
          contentMap = this.extractContentMeta(matchedObjectGroup.objects);
        }
        break;
      case com.adtech.DCODataLoader_2_53_3.DCO_DATA_TYPES['PRODUCTS']:
        groupObject = this.getProductFeedItems(dcoTypeObject, mappingItem.mapping);
        break;
      case com.adtech.DCODataLoader_2_53_3.DCO_DATA_TYPES['PROMOS']:
        groupObject = this.getPromotionItem(dcoTypeObject, mappingItem.mapping);
        break;
      case com.adtech.DCODataLoader_2_53_3.DCO_DATA_TYPES['OBJ_GRPS']:
        var matchedObjectGroup = com.adtech.Utils_2_53_3.getMatchingObjectFromArray(
            dcoTypeObject, 'id', mappingItem.id);
        if (matchedObjectGroup != null) {
          dcoObjGrp = this.getPackageItems(matchedObjectGroup.objects, mappingItem.mapping);
        }
        basePropertiesArr.push(mappingItem);
        break;
    }
  }

  // Go through the rest of the array to extend the group properties
  // from the object groups if there are any.
  if (com.adtech.Utils_2_53_3.isArray(groupObject)) {
    for (var j = 0; j < groupObject.length; j++) {
      com.adtech.Utils_2_53_3.mergeObjects(groupObject[j], this.getBaseProperties(basePropertiesArr)
          .baseProperties);
    }
  } else {
    // If there were no packages associated with it
    if (typeof groupObject == 'undefined') {
      groupObject = dcoObjGrp;
      if (com.adtech.Utils_2_53_3.isEmptyObj(groupObject[0])) {
        groupObject = null;
      }
      else {
        com.adtech.Utils_2_53_3.mergeObjects(groupObject[0], this.getBaseProperties(basePropertiesArr)
            .baseProperties);
      }
    } else {
      com.adtech.Utils_2_53_3.mergeObjects(groupObject, this.getBaseProperties(basePropertiesArr)
          .baseProperties);
    }
  }

  return {'groupObject': groupObject, 'contentMap': contentMap};

}

com.adtech.DCODataLoader_2_53_3.prototype.getBaseProperties = function(propertiesArray) {

  var baseProperties = {};
  var contentMap = {};

  for (var i = 0; i < propertiesArray.length; i++) {

    var mappingItem = propertiesArray[i];
    var type = mappingItem.adrType || mappingItem.dcoType;
    var dcoType = (type ==
        com.adtech.DCODataLoader_2_53_3.DCO_DATA_TYPES['PACKAGE']) ?
        com.adtech.DCODataLoader_2_53_3.DCO_DATA_TYPES['OBJ_GRPS'] :
        type;

    var dcoTypeObject = this.data[dcoType];

    if (typeof dcoTypeObject != 'undefined') {
      var matchedObjectGroup = com.adtech.Utils_2_53_3.getMatchingObjectFromArray(
          dcoTypeObject, 'id', mappingItem.id);
      //Packages, Object Groups
      //Get from first object group [0]
      if (matchedObjectGroup != null) {
        for (var key in mappingItem.mapping) {
          if (mappingItem.mapping.hasOwnProperty(key)) {
            baseProperties[key] = matchedObjectGroup.objects[0][mappingItem.mapping[key]];
            var contentMapArray = this.extractContentMeta(matchedObjectGroup.objects);
            if (contentMapArray.length > 0) {
              contentMap[key] = contentMapArray[0];
            }
          }
        }
      //Products Feed
      //Get from the first product [0]
      } else if (com.adtech.Utils_2_53_3.isArray(dcoTypeObject)) {
        for (var key in mappingItem.mapping) {
          if (mappingItem.mapping.hasOwnProperty(key)) {
            baseProperties[key] = dcoTypeObject[0][mappingItem.mapping[key]]
          }
        }
      //Promotions
      } else {
        for (var key in mappingItem.mapping) {
          if (mappingItem.mapping.hasOwnProperty(key)) {
            baseProperties[key] = dcoTypeObject[mappingItem.mapping[key]]
          }
        }
      }
    }

  }

  return {'baseProperties': baseProperties, 'contentMap': contentMap};

}

/**
 * @private
 *
 * Processes the data returned by the content API, returning a object
 * with the new content property values.
 */
com.adtech.DCODataLoader_2_53_3.prototype.getContentPropertyValues = function() {

  var dynamicContentProperties = {};
  var contentMap = {};

  for (var contentPropertyKey in this.config.map) {
    if (this.config.map.hasOwnProperty(contentPropertyKey)) {
      var mapping = this.config.map[contentPropertyKey];
      if (contentPropertyKey != com.adtech.DCODataLoader_2_53_3.BASE_PROPERTIES) {

        var objGroup = this.getGroupProperties(mapping);
        if (objGroup.groupObject) {
          dynamicContentProperties[contentPropertyKey] = objGroup.groupObject;
          contentMap[contentPropertyKey] = objGroup.contentMap;
        }

      } else {
        var objBaseProperties = this.getBaseProperties(mapping);
        com.adtech.Utils_2_53_3.mergeObjects(dynamicContentProperties,
            objBaseProperties.baseProperties);
        com.adtech.Utils_2_53_3.mergeObjects(contentMap, objBaseProperties.contentMap);
      }
    }
  }
  var processedData = {};
  processedData[com.adtech.DCODataLoader_2_53_3.CONTENT_PROPERTIES] =
      dynamicContentProperties;
  processedData[com.adtech.DCODataLoader_2_53_3.CONTENT_MAP] = contentMap;
  return processedData;
}

com.adtech.DCODataLoader_2_53_3.prototype.getThirdPartyTrackingData = function() {
  var trackingObject = {};
  trackingObject[com.adtech.Advert_2_53_3.TRACK_EVENT_VIEW] = [];
  trackingObject[com.adtech.Advert_2_53_3.TRACK_EVENT_CLICKS_ALL] = [];
  if (typeof this.data.trackers == 'object') {
    if (this.data.trackers.adview) {
      for (var i = 0; i < this.data.trackers.adview.length; i++) {
        trackingObject[com.adtech.Advert_2_53_3.TRACK_EVENT_VIEW].push(
            this.data.trackers.adview[i]);
      }
    }
    if (this.data.trackers.click) {
      for (var i = 0; i < this.data.trackers.click.length; i++) {
        trackingObject[com.adtech.Advert_2_53_3.TRACK_EVENT_CLICKS_ALL].push(
            this.data.trackers.click[i]);
      }
    }
  }
  return trackingObject;
}

com.adtech.DCODataLoader_2_53_3.prototype.getPackageItems = function(
    dcoPackage, mapping) {
  var contentObjects = [];
  for (var i = 0; i < dcoPackage.length; i++) {
    var contentObject = {};
    for (var contentKey in mapping) {
      if (mapping.hasOwnProperty(contentKey)) {
        contentObject[contentKey] = dcoPackage[i][mapping[contentKey]];
      }
    }
    this.addDynamicItemProperties(contentObject, i);
    contentObjects.push(contentObject);
  }
  return contentObjects;
}

com.adtech.DCODataLoader_2_53_3.prototype.getPromotionItem = function(
    dcoPromotion, mapping) {
  var promotionItem = {};
  if (dcoPromotion !== null) {
    for (var contentKey in mapping) {
      if (mapping.hasOwnProperty(contentKey)) {
        promotionItem[contentKey] = dcoPromotion[mapping[contentKey]];
      }
    }
  }
  return promotionItem;
}

/**
 * Generates the product array, using the mapping defined by the user.
 *
 * @param mapping the mapping object
 */
com.adtech.DCODataLoader_2_53_3.prototype.getProductFeedItems = function(
    products, mapping) {
  var productItems = products;
  var productCount = productItems.length;
  for (var i = 0; i < productCount; i++) {
    for (var contentKey in mapping) {
      if (mapping.hasOwnProperty(contentKey)) {
        var dcoItemKey = mapping[contentKey];
        if (productItems[i].hasOwnProperty(dcoItemKey)) {
          productItems[i][contentKey] = productItems[i][dcoItemKey];
          this.addDynamicItemProperties(productItems[i], i);
          // Delete the unused DCO key.
          //delete productItems[i][dcoItemKey];
        }
      }
    }
  }
  return productItems;
}

/**
 * Adds the relevant 'Tracking ID' and __idx key values to dynamic items.
 */
com.adtech.DCODataLoader_2_53_3.prototype.addDynamicItemProperties = function(
    item, index) {
  item[com.adtech.DCODataLoader_2_53_3.CONTENT_INDEX_KEY] = index;
  var trackingIdPrefix = (this.config.iqCollectionIdPrefix) ?
      this.config.iqCollectionIdPrefix :
      com.adtech.DCODataLoader_2_53_3.DEFAULT_TRACKING_ID_PREFIX;
  var trackingIdSuffix = (index < 5) ? index + 1 : '6+';
  item[com.adtech.Advert_2_53_3.CONTENT_PROPERTY_TRACKING_KEY] =
      trackingIdPrefix + ' ' + trackingIdSuffix;
}

/**
 * Returns the defined meta data from each dynamic object.
 */
com.adtech.DCODataLoader_2_53_3.prototype.extractContentMeta = function(contentObjects) {
  var meta = [];
  for (var i = 0; i < contentObjects.length; i++) {
    var contentObject = contentObjects[i];
    if (typeof contentObject == 'object' &&
        contentObject.hasOwnProperty(com.adtech.DCODataLoader_2_53_3.CONTENT_META_KEY)) {
      meta.push(contentObject[com.adtech.DCODataLoader_2_53_3.CONTENT_META_KEY]);
    }
  }
  return meta;
}

com.adtech.DCODataLoader_2_53_3.prototype.dataLoadFailHandler = function() {
  com.adtech.Utils_2_53_3.displayError('DCO response maximum timeout exceeded.');
  this.timeoutErrorState = true;
  this.dispatchEvent(com.adtech.RichMediaEvent_2_53_3.ERROR);
}

com.adtech.DCODataLoader_2_53_3.prototype.dataLoadedHandler = function(data) {
  if (this.timeoutErrorState) {
    // Timeout value has been exceeded. Do not dispatch successful event to any clients.
    return;
  }
  clearTimeout(this.dataLoadTimeout);
  this.data = data;
  try {
    if (typeof data != 'object' || data.errors) {
      com.adtech.Utils_2_53_3.displayError(data.errors);
      throw new Error();
    }
  } catch (e) {
    this.dispatchEvent(com.adtech.RichMediaEvent_2_53_3.ERROR);
    return;
  }
  var contentProperties = this.getContentPropertyValues();
  var event = new com.adtech.RichMediaEvent_2_53_3(
      com.adtech.RichMediaEvent_2_53_3.LOADED).
      property('contentProperties', contentProperties[
          com.adtech.DCODataLoader_2_53_3.CONTENT_PROPERTIES]).
      property('contentMap', contentProperties[
          com.adtech.DCODataLoader_2_53_3.CONTENT_MAP]).
      property('dcoData', data.dcoData || {}).
      property('reqClickUrl', data.reqClickUrl || null).
      property('thirdPartyTracking', this.getThirdPartyTrackingData());
  this.dispatchEvent(event);
}
// Copyright 2014 AOL Platforms.

/**
 * Generates the DCO Data for the report event
 *
 * @private
 * @author Pictela Support <support@pictela.com>
 */
com.adtech.DCOEventRecordGenerator_2_53_3 = function() {
  this.engagementSequence = 0;
  this.eventMessage = (com.adtech.dcodeIO.ProtoBuf.loadJson({
    "package": "com.pictela",
    "messages": [
        {
            "name": "CreativeEvent",
            "fields": [
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "eventType",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "EventHeader",
                    "name": "eventHeader",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "EngagementHeader",
                    "name": "engagementHeader",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "ActionHeader",
                    "name": "actionHeader",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "width",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "height",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "name",
                    "id": 7
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "url",
                    "id": 8
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "percent",
                    "id": 9
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "duration",
                    "id": 10
                },
                {
                    "rule": "optional",
                    "options": {},
                    "type": "string",
                    "name": "percentage",
                    "id": 11
                }
            ],
            "enums": [],
            "messages": [
                {
                    "name": "EmptyObject",
                    "fields": [],
                    "enums": [],
                    "messages": [],
                    "options": {},
                    "oneofs": {}
                },
                {
                    "name": "EventHeader",
                    "fields": [
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "DcoData",
                            "name": "dcoData",
                            "id": 1
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "APID",
                            "id": 2
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "UTID",
                            "id": 3
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "device",
                            "id": 4
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "browser",
                            "id": 5
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "os",
                            "id": 6
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "pageUrl",
                            "id": 7
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "mobileAppName",
                            "id": 66
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "mobileDeviceId",
                            "id": 8
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "iframeDomain",
                            "id": 9
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "deliveryFramework",
                            "id": 10
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "language",
                            "id": 11
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "screenResolution",
                            "id": 12
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "viewportSize",
                            "id": 13
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "deviceOrientation",
                            "id": 14
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "viewable",
                            "id": 15
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "positionOnPage",
                            "id": 16
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "eventTimestamp",
                            "id": 17
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "callerIP",
                            "id": 18
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "serverIP",
                            "id": 19
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "userAgent",
                            "id": 20
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "EmptyObject",
                            "name": "extension",
                            "id": 21
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "PictelaData",
                            "name": "pictelaData",
                            "id": 22
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "AdtechData",
                            "name": "adtechData",
                            "id": 23
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "ExternalData",
                            "name": "externalData",
                            "id": 24
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "deliveryPlatform",
                            "id": 25
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "IMPTID",
                            "id": 26
                        }
                    ],
                    "enums": [],
                    "messages": [
                        {
                            "name": "DcoData",
                            "fields": [
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "uuid",
                                    "id": 1
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "advertiserId",
                                    "id": 2
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "campaignId",
                                    "id": 3
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "placementId",
                                    "id": 4
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "creativeId",
                                    "id": 5
                                },
                                {
                                    "rule": "repeated",
                                    "options": {},
                                    "type": "ObjectGroup",
                                    "name": "objectGroups",
                                    "id": 6
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "promotionId",
                                    "id": 7
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "impressionId",
                                    "id": 8
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "impressionTs",
                                    "id": 9
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "lat",
                                    "id": 10
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "lon",
                                    "id": 11
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "ip",
                                    "id": 12
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "country",
                                    "id": 13
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "region",
                                    "id": 14
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "metro",
                                    "id": 15
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "pc",
                                    "id": 16
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "properties",
                                    "id": 17
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "advertiserCode",
                                    "id": 18
                                },
                                {
                                    "rule": "repeated",
                                    "options": {},
                                    "type": "TargetingSet",
                                    "name": "targetingSets",
                                    "id": 19
                                }
                            ],
                            "enums": [],
                            "messages": [
                                {
                                    "name": "ObjectGroup",
                                    "fields": [
                                        {
                                            "rule": "optional",
                                            "options": {},
                                            "type": "string",
                                            "name": "objectGroupId",
                                            "id": 1
                                        },
                                        {
                                            "rule": "optional",
                                            "options": {},
                                            "type": "string",
                                            "name": "objectId",
                                            "id": 2
                                        },
                                        {
                                            "rule": "optional",
                                            "options": {},
                                            "type": "string",
                                            "name": "algoId",
                                            "id": 3
                                        },
                                        {
                                            "rule": "optional",
                                            "options": {},
                                            "type": "string",
                                            "name": "targetingSetId",
                                            "id": 4
                                        },
                                        {
                                            "rule": "optional",
                                            "options": {},
                                            "type": "string",
                                            "name": "targetingItemId",
                                            "id": 5
                                        }
                                    ],
                                    "enums": [],
                                    "messages": [],
                                    "options": {},
                                    "oneofs": {}
                                },
                                {
                                    "name": "TargetingItemSubItem",
                                    "fields": [
                                        {
                                            "rule": "optional",
                                            "options": {},
                                            "type": "string",
                                            "name": "id",
                                            "id": 1
                                        },
                                        {
                                            "rule": "optional",
                                            "options": {},
                                            "type": "string",
                                            "name": "type",
                                            "id": 2
                                        },
                                        {
                                            "rule": "optional",
                                            "options": {},
                                            "type": "string",
                                            "name": "startTs",
                                            "id": 3
                                        },
                                        {
                                            "rule": "optional",
                                            "options": {},
                                            "type": "string",
                                            "name": "endTs",
                                            "id": 4
                                        }
                                    ],
                                    "enums": [],
                                    "messages": [],
                                    "options": {},
                                    "oneofs": {}
                                },
                                {
                                    "name": "TargetingItem",
                                    "fields": [
                                        {
                                            "rule": "optional",
                                            "options": {},
                                            "type": "string",
                                            "name": "targetingItemId",
                                            "id": 1
                                        },
                                        {
                                            "rule": "optional",
                                            "options": {},
                                            "type": "string",
                                            "name": "advertiserId",
                                            "id": 2
                                        },
                                        {
                                            "rule": "optional",
                                            "options": {},
                                            "type": "string",
                                            "name": "type",
                                            "id": 3
                                        },
                                        {
                                            "rule": "repeated",
                                            "options": {},
                                            "type": "TargetingItemSubItem",
                                            "name": "items",
                                            "id": 4
                                        }
                                    ],
                                    "enums": [],
                                    "messages": [],
                                    "options": {},
                                    "oneofs": {}
                                },
                                {
                                    "name": "TargetingSetRule",
                                    "fields": [
                                        {
                                            "rule": "optional",
                                            "options": {},
                                            "type": "string",
                                            "name": "op",
                                            "id": 1
                                        },
                                        {
                                            "rule": "repeated",
                                            "options": {},
                                            "type": "TargetingItem",
                                            "name": "targetingItems",
                                            "id": 2
                                        },
                                        {
                                            "rule": "repeated",
                                            "options": {},
                                            "type": "TargetingSet",
                                            "name": "targetingSets",
                                            "id": 3
                                        }
                                    ],
                                    "enums": [],
                                    "messages": [],
                                    "options": {},
                                    "oneofs": {}
                                },
                                {
                                    "name": "TargetingSet",
                                    "fields": [
                                        {
                                            "rule": "optional",
                                            "options": {},
                                            "type": "string",
                                            "name": "targetingSetId",
                                            "id": 1
                                        },
                                        {
                                            "rule": "optional",
                                            "options": {},
                                            "type": "string",
                                            "name": "advertiserId",
                                            "id": 2
                                        },
                                        {
                                            "rule": "repeated",
                                            "options": {},
                                            "type": "TargetingSetRule",
                                            "name": "includeSets",
                                            "id": 3
                                        },
                                        {
                                            "rule": "repeated",
                                            "options": {},
                                            "type": "TargetingSetRule",
                                            "name": "excludeSets",
                                            "id": 4
                                        }
                                    ],
                                    "enums": [],
                                    "messages": [],
                                    "options": {},
                                    "oneofs": {}
                                }
                            ],
                            "options": {},
                            "oneofs": {}
                        },
                        {
                            "name": "PictelaData",
                            "fields": [
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "adId",
                                    "id": 1
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "formatId",
                                    "id": 2
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "templateId",
                                    "id": 3
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "productFamilyId",
                                    "id": 4
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "customMeta",
                                    "id": 5
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "eventId",
                                    "id": 6
                                }
                            ],
                            "enums": [],
                            "messages": [],
                            "options": {},
                            "oneofs": {}
                        },
                        {
                            "name": "AdtechData",
                            "fields": [
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "regionId",
                                    "id": 1
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "networkId",
                                    "id": 2
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "advertiserId",
                                    "id": 3
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "campaignId",
                                    "id": 4
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "flightId",
                                    "id": 5
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "publisherId",
                                    "id": 6
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "sectionId",
                                    "id": 7
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "placementId",
                                    "id": 8
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "bannerId",
                                    "id": 9
                                }
                            ],
                            "enums": [],
                            "messages": [],
                            "options": {},
                            "oneofs": {}
                        },
                        {
                            "name": "ExternalData",
                            "fields": [
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "placementId",
                                    "id": 1
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "creativeId",
                                    "id": 2
                                },
                                {
                                    "rule": "repeated",
                                    "options": {},
                                    "type": "string",
                                    "name": "segments",
                                    "id": 3
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "companyId",
                                    "id": 4
                                },
                                {
                                    "rule": "optional",
                                    "options": {},
                                    "type": "string",
                                    "name": "userId",
                                    "id": 5
                                }
                            ],
                            "enums": [],
                            "messages": [],
                            "options": {},
                            "oneofs": {}
                        }
                    ],
                    "options": {},
                    "oneofs": {}
                },
                {
                    "name": "EngagementHeader",
                    "fields": [
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "EventHeader",
                            "name": "eventHeader",
                            "id": 1
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "advertiserContentId",
                            "id": 2
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "contentName",
                            "id": 3
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "contentTypeId",
                            "id": 4
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "contentIndex",
                            "id": 5
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "componentId",
                            "id": 6
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "componentName",
                            "id": 7
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "componentProductId",
                            "id": 8
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "sectionName",
                            "id": 9
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "sectionIndex",
                            "id": 10
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "sequenceNo",
                            "id": 11
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "EmptyObject",
                            "name": "data",
                            "id": 12
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "detail",
                            "id": 13
                        }
                    ],
                    "enums": [],
                    "messages": [],
                    "options": {},
                    "oneofs": {}
                },
                {
                    "name": "ActionHeader",
                    "fields": [
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "EngagementHeader",
                            "name": "engagementHeader",
                            "id": 1
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "x",
                            "id": 2
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "y",
                            "id": 3
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "actionTypeId",
                            "id": 4
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "actionCategoryId",
                            "id": 5
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "actionName",
                            "id": 6
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "actionId",
                            "id": 7
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "detail",
                            "id": 8
                        },
                        {
                            "rule": "optional",
                            "options": {},
                            "type": "string",
                            "name": "value",
                            "id": 9
                        }
                    ],
                    "enums": [],
                    "messages": [],
                    "options": {},
                    "oneofs": {}
                }
            ],
            "options": {},
            "oneofs": {}
        }
    ],
    "enums": [],
    "imports": [],
    "options": {
        "java_package": "com.aolplatforms.dco.dataflows.protobuf",
        "java_outer_classname": "Events"
    },
    "services": []
}
)).
      build('com.pictela.CreativeEvent');
};

/** @private */
com.adtech.DCOEventRecordGenerator_2_53_3.IMPRESSION = 'impression';
/** @private */
com.adtech.DCOEventRecordGenerator_2_53_3.USER_INTERACTION = 'userInteraction';
/** @private */
com.adtech.DCOEventRecordGenerator_2_53_3.OTHER = 'other';
/** @private */
com.adtech.DCOEventRecordGenerator_2_53_3.CLICK = 'click';
/** @private */
com.adtech.DCOEventRecordGenerator_2_53_3.VIEWABLE_IMPRESSION = 'viewableImpression';
/** @private */
com.adtech.DCOEventRecordGenerator_2_53_3.INTERACTIVE_IMPRESSION = 'interactiveImpression';
/** @private */
com.adtech.DCOEventRecordGenerator_2_53_3.BACKUP_VIEW = 'backupView';
/** @private */
com.adtech.DCOEventRecordGenerator_2_53_3.BACKUP_VIEWABLE_IMPRESSION = 'backupViewableImpression';
/** @private */
com.adtech.DCOEventRecordGenerator_2_53_3.BACKUP_CLICK = 'backupClickthrough';
/** @private */
com.adtech.DCOEventRecordGenerator_2_53_3.CONTENT_VIEW = 'contentView';
/** @private */
com.adtech.DCOEventRecordGenerator_2_53_3.COMPONENT_VIEW = 'componentView';
/** @private */
com.adtech.DCOEventRecordGenerator_2_53_3.OTHER_USER_ACTION = 'otherUserAction';
/** @private */
com.adtech.DCOEventRecordGenerator_2_53_3.CONTENT_DURATION = 'contentDuration';
/** @private */
com.adtech.DCOEventRecordGenerator_2_53_3.INTERACTION_DURATION = 'interactionDuration';
/** @private */
com.adtech.DCOEventRecordGenerator_2_53_3.IMPRESSION_DURATION = 'impressionDuration';
/** @private */
com.adtech.DCOEventRecordGenerator_2_53_3.INDETERMINABLE_VIEWABILITY = 'indeterminableViewability';

/**
 * @private
 */
com.adtech.DCOEventRecordGenerator_2_53_3.prototype.generateDCOData = function(event) {
  com.adtech.DCOUtils_2_53_3.sanitiseEventName(event);
  return event.property(com.adtech.DCOLogger_2_53_3.DCO_DATA_FIELD,
      com.adtech.DCOUtils_2_53_3.processDCOValue(this.getDCOData(event)))
      .property(com.adtech.DCOLogger_2_53_3.DCO_EVENT_MESSAGE, this.eventMessage);
}

/**
 * @private
 */
com.adtech.DCOEventRecordGenerator_2_53_3.prototype.getDCOData = function(event) {
  var dcoData = {
    'eventType': event.dcoType,
    'width': event.width,
    'height': event.height
  };
  switch (event.dcoType) {
    case com.adtech.DCOEventRecordGenerator_2_53_3.BACKUP_VIEW:
      dcoData.eventType = 'backupImpression';
      dcoData.eventHeader = this.getDCOEventHeader(event);
      break;
    case com.adtech.DCOEventRecordGenerator_2_53_3.IMPRESSION:
    case com.adtech.DCOEventRecordGenerator_2_53_3.VIEWABLE_IMPRESSION:
    case com.adtech.DCOEventRecordGenerator_2_53_3.INTERACTIVE_IMPRESSION:
    case com.adtech.DCOEventRecordGenerator_2_53_3.BACKUP_VIEWABLE_IMPRESSION:
    case com.adtech.DCOEventRecordGenerator_2_53_3.INDETERMINABLE_VIEWABILITY:
      dcoData.eventHeader = this.getDCOEventHeader(event);
      break;
    case com.adtech.DCOEventRecordGenerator_2_53_3.CONTENT_VIEW:
    case com.adtech.DCOEventRecordGenerator_2_53_3.COMPONENT_VIEW :
      dcoData.engagementHeader = this.getDCOEngagementHeader(event);
      break;
    case com.adtech.DCOEventRecordGenerator_2_53_3.USER_INTERACTION:
    case com.adtech.DCOEventRecordGenerator_2_53_3.OTHER_USER_ACTION:
      dcoData.actionHeader = this.getDCOActionHeader(event);
      break;
    case com.adtech.DCOEventRecordGenerator_2_53_3.CLICK:
      dcoData.actionHeader = this.getDCOActionHeader(event);
      dcoData.url = event.url;
      break;
    case com.adtech.DCOEventRecordGenerator_2_53_3.CONTENT_DURATION :
      dcoData.engagementHeader = this.getDCOEngagementHeader(event);
      dcoData.percentage = event.percentage;
      dcoData.duration = event.duration;
      dcoData.name = event.sanitisedName;
      break;
    case com.adtech.DCOEventRecordGenerator_2_53_3.INTERACTION_DURATION:
      dcoData.actionHeader = this.getDCOActionHeader(event);
      dcoData.duration = event.duration;
      break;
    case com.adtech.DCOEventRecordGenerator_2_53_3.IMPRESSION_DURATION:
      dcoData.eventHeader = this.getDCOEventHeader(event);
      dcoData.name = com.adtech.DCOUtils_2_53_3.convertTimerName(event.name);
      dcoData.duration = event.duration;
      break;
    case com.adtech.DCOEventRecordGenerator_2_53_3.OTHER:
      dcoData.actionHeader = this.getDCOActionHeader(event);
  }
  return dcoData;
}

/**
 * @private
 */
com.adtech.DCOEventRecordGenerator_2_53_3.prototype.getDCOEventHeader = function(event) {
  var inFriendlyIframe = com.adtech.IframeUtils_2_53_3.topOrSelf() == top;
  var viewPortSizeObj = com.adtech.Utils_2_53_3.getViewportDims(inFriendlyIframe);
  var processDCOAdServerId = com.adtech.DCOUtils_2_53_3.processDCOAdServerId;
  var pictelaData = {
    'adId': event.canvasId,
    'formatId': event.formatId,
    'templateId': event.templateId,
    'productFamilyId': event.productFamilyId,
    'eventId': event.plid || null,
    'customMeta': event.customMeta || null
  };
  var adtechData = {
    'regionId': processDCOAdServerId(event.regionId),
    'networkId': processDCOAdServerId(event.networkId),
    'advertiserId': processDCOAdServerId(event.advertiserId),
    'campaignId': processDCOAdServerId(event.campaignId),
    'flightId': processDCOAdServerId(event.adId),
    'publisherId': processDCOAdServerId(event.publisherId),
    'sectionId': processDCOAdServerId(event.sectionId),
    'placementId': processDCOAdServerId(event.placementId),
    'bannerId': processDCOAdServerId(event.bannerId)
  };
  var externalData = {
    'placementId': processDCOAdServerId(event.thirdPartyPlacementId),
    'creativeId': processDCOAdServerId(event.thirdPartyCreativeId),
    'segments': processDCOAdServerId(event.segmentIds),
    'companyId': null,
    'userId': null
  };
  return {
    'dcoData': event.dcoEventData,
    'APID': null,
    'UTID': null,
    'device': null,
    'browser': null,
    'os': null,
    'pageUrl': inFriendlyIframe ? top.location.href : null,
    'mobileAppName': null,
    'mobileDeviceId': null,
    'iframeDomain': null,
    'deliveryFramework': null,
    'language': null,
    'screenResolution': null,
    'viewportSize': viewPortSizeObj.w + 'x' + viewPortSizeObj.h,
    'deviceOrientation': null,
    'viewable': null,
    'positionOnPage': null,
    'eventTimestamp': null,
    'callerIP': null,
    'serverIP': null,
    'userAgent': null,
    'extension': {},
    'pictelaData': pictelaData,
    'adtechData': adtechData,
    'externalData': externalData,
    'deliveryPlatform': null,
    'IMPTID': event[com.adtech.DCODataLoader_2_53_3.TAGVAR_IMPRESSION_ID]
  };
}

/**
 * @private
 */
com.adtech.DCOEventRecordGenerator_2_53_3.prototype.getDCOEngagementHeader = function(event) {
  var eventNameObject = com.adtech.DCOUtils_2_53_3.eventNameToObject(event.name);
  return {
    'eventHeader': this.getDCOEventHeader(event),
    'advertiserContentId': event.advertiserContentId,
    'contentName': event.contentName || eventNameObject.content,
    'contentTypeId': event.contentTypeId,
    'contentIndex':null,
    'componentId': null,
    'componentName': eventNameObject.component,
    'componentProductId': null,
    'sectionName': eventNameObject.section,
    'sectionIndex': null,
    'sequenceNo': this.engagementSequence++,
    'data': {},
    'detail': eventNameObject.detail
  };
}

/**
 * @private
 */
com.adtech.DCOEventRecordGenerator_2_53_3.prototype.getDCOActionHeader = function(event) {
  var eventNameObject = com.adtech.DCOUtils_2_53_3.eventNameToObject(event.name);
  return {
    'engagementHeader': this.getDCOEngagementHeader(event),
    'x': event.x,
    'y': event.y,
    'actionTypeId': null,
    'actionCategoryId': null,
    'actionName': eventNameObject.action,
    'actionId': null,
    'detail': eventNameObject.detail,
    'value': null
  };
}
// Copyright 2014 AOL Platforms.

/**
 * Class that extends EventDispatcher to support dynamic events.
 * @class
 * @author Pictela Support <support@pictela.com>
 * @extends com.adtech.EventDispatcher_2_53_3
 * @constructor
 */

com.adtech.DynamicEventDispatcher_2_53_3 = function() {
  com.adtech.DynamicEventDispatcher_2_53_3.supa.constructor.call(this);
}

com.adtech.Utils_2_53_3.extend(com.adtech.DynamicEventDispatcher_2_53_3,
    com.adtech.EventDispatcher_2_53_3);

com.adtech.DynamicEventDispatcher_2_53_3.prototype.dispatchEvent = function(event) {
  if ((typeof event == 'string') &&
      (typeof this.eventTypes[com.adtech.RichMediaEvent_2_53_3.DYNAMIC] != 'undefined') &&
      (typeof this.eventTypes[event] == 'undefined')) {
    event = new com.adtech.RichMediaEvent_2_53_3(com.adtech.RichMediaEvent_2_53_3.DYNAMIC).
        property('dynamicValue', event);
  }
  com.adtech.DynamicEventDispatcher_2_53_3.supa.dispatchEvent.call(this, event);
}// Copyright 2014 AOL Platforms.

/*
 * File Selection (Graceful degradation) for Core class.
 * @author Pictela Support <support@pictela.com>
 * @class
 */

com.adtech.ContentRenditionProcessor_2_53_3 = function() {};

/** @private */
com.adtech.ContentRenditionProcessor_2_53_3.TYPE_ID_TEXT = 1;
com.adtech.ContentRenditionProcessor_2_53_3.TYPE_ID_IMAGE = 2;
com.adtech.ContentRenditionProcessor_2_53_3.TYPE_ID_VIDEO = 5;
/** @private */
com.adtech.ContentRenditionProcessor_2_53_3.CONTENT_HUB_ASSET_COLLECTION_IDX = 'idx';
/** @private */
com.adtech.ContentRenditionProcessor_2_53_3.CONTENT_HUB_ASSET_COLLECTION_KEY = 'key';
/** @private */
com.adtech.ContentRenditionProcessor_2_53_3.CONTENT_HUB_ASSET_DEFAULT_KEY = '__default';

/**
 *
 * Applies the content from the hub assets into the contentProperties
 *
 * @param advert the mapping object.
 * @param conf the configuration from the advert.
 */
com.adtech.ContentRenditionProcessor_2_53_3.applyContentHubData = function(advert, conf) {
  com.adtech.Utils_2_53_3.forEach(advert.contentHubConfig.mapping,
      function(hubId, hubObj) {
        if (advert.contentHubConfig.assets[hubId]) {
          com.adtech.Utils_2_53_3.forEach(hubObj, function(contentProperty, keys) {
            if (com.adtech.Utils_2_53_3.isArray(keys)) {
              for (var i = 0; i < keys.length; i++ ) {
                var property = keys[i];
                if (contentProperty == com.adtech.DCODataLoader_2_53_3.BASE_PROPERTIES) {
                  if (typeof this.contentProperties[property] != 'undefined') {
                    this.contentProperties[property] =
                        com.adtech.ContentRenditionProcessor_2_53_3.getRenditionValue(
                            this.contentHubConfig.assets[hubId],
                            this.contentProperties[property]);
                  }
                } else {
                  if (typeof this.contentProperties[contentProperty] != 'undefined') {
                    if (property && typeof property == 'object') {
                      var collectionIdx =
                          property[com.adtech.ContentRenditionProcessor_2_53_3.
                              CONTENT_HUB_ASSET_COLLECTION_IDX];
                      var collectionKey =
                          property[com.adtech.ContentRenditionProcessor_2_53_3.
                              CONTENT_HUB_ASSET_COLLECTION_KEY];
                      if (collectionIdx >= 0 && collectionKey
                          && this.contentProperties[contentProperty].length > collectionIdx) {
                        this.contentProperties[contentProperty][collectionIdx][collectionKey] =
                            com.adtech.ContentRenditionProcessor_2_53_3.getRenditionValue(
                                this.contentHubConfig.assets[hubId],
                                this.contentProperties[contentProperty][collectionIdx][collectionKey]);
                      }
                    } else {
                      if (typeof this.contentProperties[contentProperty][property] != 'undefined') {
                        this.contentProperties[contentProperty][property] =
                            com.adtech.ContentRenditionProcessor_2_53_3.getRenditionValue(
                                this.contentHubConfig.assets[hubId],
                                this.contentProperties[contentProperty][property]);
                      }
                    }
                  }
                }
              }
            }
          }, advert);
        }
      }, advert);
}

/**
 * Returns the specified rendition object with the default value made accessible
 * via a special key, if the asset is an object.
 */
com.adtech.ContentRenditionProcessor_2_53_3.getRenditionValue = function(
    renditionObject, defaultValue) {
  switch (typeof renditionObject) {
    case 'undefined':
      return defaultValue;
    case 'object':
      var clonedAsset = com.adtech.Utils_2_53_3.clone(renditionObject);
      clonedAsset[
          com.adtech.ContentRenditionProcessor_2_53_3.CONTENT_HUB_ASSET_DEFAULT_KEY] =
          defaultValue;
      return clonedAsset;
    default:
      return renditionObject;
  }
}

/**
 *
 * Processes the assets and returns the appropriate asset according to the present env.
 *
 * @param renditionObject the rendition object that contains the assets.
 * @param contentType the content type of the advert.
 * @param defaultValue the default value to be returned if the asset is not available.
 */
com.adtech.ContentRenditionProcessor_2_53_3.processAssets = function(renditionObject,
    contentType, servingProtocol) {
  switch (renditionObject.typeId) {
    case com.adtech.ContentRenditionProcessor_2_53_3.TYPE_ID_TEXT:
    case com.adtech.ContentRenditionProcessor_2_53_3.TYPE_ID_IMAGE:
      return renditionObject.value;
      break;
    case com.adtech.ContentRenditionProcessor_2_53_3.TYPE_ID_VIDEO:
      var fileQuality = com.adtech.ContentRenditionProcessor_2_53_3.determineQuality();
      var selectedQualityFileSet;
      var selectedFile;
      if (com.adtech.Utils_2_53_3.isiOS()) {
        // HLS rendition value will be a string value, pointing to the stream definition.
        selectedFile = renditionObject.hls;
      } else {
        if (contentType == com.adtech.ContentFactory_2_53_3.FLASH) {
          // fileQuality for Surface tablet, Blackberry tablets and other mobile devices supporting FP.
          selectedQualityFileSet = renditionObject.mp4;
        } else {
          var support = com.adtech.ContentRenditionProcessor_2_53_3.getSupportedVideoTypes();
          selectedQualityFileSet = (support.mp4 === '') ?
              renditionObject.webm : renditionObject.mp4;
        }
        selectedFile = selectedQualityFileSet[fileQuality];
        if (typeof selectedFile == 'undefined' || !selectedFile) {
          /* Attempt to find the next available lower quality file if the required version is not
           * available or defined.*/
          var qualityPrecedence = ['mid', 'low'];
          var startIndex = 0;
          switch (fileQuality) {
            case 'low':
              break;
            case 'mid':
              startIndex = 1;
            default:
              for (var i = startIndex; i < qualityPrecedence.length; i++) {
                if (selectedQualityFileSet[qualityPrecedence[i]]) {
                  selectedFile = selectedQualityFileSet[qualityPrecedence[i]];
                  break;
                }
              }
          }
        }
      }
      if (selectedFile) {
        return renditionObject.baseUrl.replace(/^https?/i, servingProtocol) + selectedFile;
      } else {
        /* Rendition objects will have the content property default value stored on under
         * a named key.
         */
        var defaultKeyValue = renditionObject[
            com.adtech.ContentRenditionProcessor_2_53_3.CONTENT_HUB_ASSET_DEFAULT_KEY];
        if (typeof defaultKeyValue != 'undefined') {
          return defaultKeyValue;
        }
      }
    }
  return renditionObject;
}

/**
 * Determines the suitable quality for transcoded media assets.
 *
 * Current logic overview:
 * If the connection is WiFi the high quality is returned.
 * if the screen area is < (1024 * 768) AND the connection is not wifi, the medium is returned.
 * if the screen area is < (500 * 800) AND the connection is not wifi, the low quality is returned.
 */
com.adtech.ContentRenditionProcessor_2_53_3.determineQuality = function() {
  var pixelRatio = window.devicePixelRatio;
  var availWidth = window.screen.availWidth * pixelRatio;
  var availHeight = window.screen.availHeight * pixelRatio;
  var pixelResolution = availWidth * availHeight;
  var screenDimensions = screen.width * screen.height;
  var tabletResolution = 1024 * 768;
  var mobileResolution = 500 * 800;
  if (com.adtech.ContentRenditionProcessor_2_53_3.deviceHasWiFiConnection() ||
      (screenDimensions > tabletResolution && pixelResolution > tabletResolution)) {
    // Well-connected mobile, table or desktop device.
    return 'high';
  }
  if ((screenDimensions <= tabletResolution && screenDimensions >= mobileResolution) &&
      (pixelResolution <= tabletResolution && pixelResolution >= mobileResolution)) {
    // Tablet
    return 'mid';
  }
  // Mobile phone screen
  return 'low';
};

/**
 * Checks supported file formats for HTML5 Video element.
 */
com.adtech.ContentRenditionProcessor_2_53_3.getSupportedVideoTypes = function() {
  var testEl = document.createElement('video');
  var supportTypeObject = {};
  if (testEl.canPlayType) {
    supportTypeObject.mp4 = '' !== (testEl.canPlayType('video/mp4; codecs="avc1.42E01E"') ||
        testEl.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'));
    supportTypeObject.webm = '' !== testEl.canPlayType('video/webm; codecs="vp8, vorbis"');
  }
  return supportTypeObject;
};

/**
 * Checks if connection type is WiFi (Doesn't work on Mobile Safari)
 */
com.adtech.ContentRenditionProcessor_2_53_3.deviceHasWiFiConnection = function() {
  try {
    if (navigator.connection.type == 'wifi') {
      return true;
    }
  } catch (e) {
  }
  return false;
};
// Copyright 2010 AOL Platforms.

/**
 * Handles all native browser page events and dispatches the relevant
 * RichMediaEvent to all registered Advert instances in response to native events.
 * @class
 * @author Pictela Support <support@pictela.com>
 *
 * @constructor
 * @see com.adtech.Advert
 */
com.adtech.AdManager_2_53_3 = function() {
  /** @private */
  this.adverts = {};
  /**
   * Reference to the <code>EventDispatcher</code> instance that dispatches page level events for all
   * <code>Advert</code> instances to listen to.
   * <br />
   * The <code>EventDispatcher</code> instance used for the global event bus has an additional
   * <code>pageLoaded</code> property to indicate if the page has loaded.
   * <br/><br/>
   * <strong>Dispatched events</strong>
   * <table border="1">
   *   <tr><th>Type</th><th>Properties</th></tr>
   *   <tr><td>com.adtech.RichMediaEvent.DOM_LOAD</td><td><code>EventDispatcher</code> target</td></tr>
   *   <tr><td>com.adtech.RichMediaEvent.PAGE_LOAD</td><td><code>EventDispatcher</code> target</td></tr>
   *   <tr><td>com.adtech.RichMediaEvent.PAGE_SCROLL</td>
   *       <td><code>EventDispatcher</code> target, <code>Number</code> offsetX, <code>Number</code> offsetY, <code>Number</code> width, <code>Number</code> height</td>
   *   </tr>
   *   <tr><td>com.adtech.RichMediaEvent_2_53_3.PAGE_RESIZE</td>
   *       <td><code>EventDispatcher</code> target, <code>Number</code> offsetX, <code>Number</code> offsetY, <code>Number</code> width, <code>Number</code> height</td>
   *   </tr>
   * </table>
   *
   * @see com.adtech.EventDispatcher
   * @see com.adtech.RichMediaEvent
   */
  this.globalEventBus = new com.adtech.EventDispatcher_2_53_3();
  /** @private */
  this.renderingInFiF = false;
  /** @private */
  this.renderingInSafeframe = false;
  /** @private */
  this.advertClass = com.adtech.Advert_2_53_3;
  this.createLogger();
  this.init();
}

/** @private */
com.adtech.AdManager_2_53_3.PAGE_LOAD_TIMEOUT = 4000;

/**
 * @private
 *
 * Begins the initialisation sequence for the AdManager instance.
 */
com.adtech.AdManager_2_53_3.prototype.init = function() {
  /*
   * FIXME?: DOM load event fires even in the event that the script is
   * loaded after the event has taken place. Page load event does not. Am
   * yet to find a way to establish if this event has been fired before
   * this method is invoked.
   */
  var self = this;
  var swfobj = com.adtech.swfobject_2_53_3;
  swfobj.addDomLoadEvent(function() {
    self.dispatchDOMLoadEvent();
    self.checkPageLoadStatus();
  });
  swfobj.addLoadEvent(function() {
    self.dispatchPageLoadEvent();
  });
}

/** @private */
com.adtech.AdManager_2_53_3.prototype.addWindowEventListeners = function() {
  if (!this.windowEventListenersAdded) {
    this.windowEventListenersAdded = true;
    /* We need to cope with friendly iframes contained within non-friendly iframes, hence
     * the call to topOrSelf.
     */
    var scrollResizeEventTargetWin = (this.renderingInFiF) ?
        com.adtech.IframeUtils_2_53_3.topOrSelf() : window;
    com.adtech.Utils_2_53_3.registerNativeEventHandler(scrollResizeEventTargetWin, 'scroll',
        com.adtech.Utils_2_53_3.createClosure(this, this.scrollHandler));
    com.adtech.Utils_2_53_3.registerNativeEventHandler(scrollResizeEventTargetWin, 'resize',
        com.adtech.Utils_2_53_3.createClosure(this, this.resizeHandler));
    com.adtech.Utils_2_53_3.registerNativeEventHandler(scrollResizeEventTargetWin, 'orientationchange',
        com.adtech.Utils_2_53_3.createClosure(this, this.orientationChangeHandler));
    // Set initial value for page focus.
    (scrollResizeEventTargetWin.hasFocus && !scrollResizeEventTargetWin.hasFocus()) ?
        this.blurHandler() : this.focusHandler();
    com.adtech.Utils_2_53_3.registerNativeEventHandler(scrollResizeEventTargetWin, 'blur',
        com.adtech.Utils_2_53_3.createClosure(this, this.blurHandler));
    com.adtech.Utils_2_53_3.registerNativeEventHandler(scrollResizeEventTargetWin, 'focus',
        com.adtech.Utils_2_53_3.createClosure(this, this.focusHandler));
  }
}

/** @private */
com.adtech.AdManager_2_53_3.prototype.createLogger = function() {
  this.logger = (typeof com.adtech.debugLogger_2_53_3 == 'undefined') ?
      new com.adtech.DCOLogger_2_53_3(this) : new com.adtech.debugLogger_2_53_3();
}

/**
 * @private
 *
 * Ensures that the PAGE_LOAD event is dispatched.
 */
com.adtech.AdManager_2_53_3.prototype.checkPageLoadStatus = function() {
  if (!this.globalEventBus.pageLoaded) {
    var self = this;
    this.pageLoadStatusTimeout = setTimeout(function() {
      self.dispatchPageLoadEvent();
      clearTimeout(self.pageLoadStatusTimeout);
    }, com.adtech.AdManager_2_53_3.PAGE_LOAD_TIMEOUT);
  }
}

/**
 * @private
 *
 * Dispatches the RichMediaEvent.DOM_LOAD event from the global event bus.
 */
com.adtech.AdManager_2_53_3.prototype.dispatchDOMLoadEvent = function() {
  if (!this.globalEventBus.DOMLoaded) {
    this.globalEventBus.DOMLoaded = true;
    this.globalEventBus.dispatchEvent(com.adtech.RichMediaEvent_2_53_3.DOM_LOAD);
  }
}

/**
 * @private
 *
 * Dispatches the RichMediaEvent.PAGE_LOAD event from the global event bus.
 */
com.adtech.AdManager_2_53_3.prototype.dispatchPageLoadEvent = function() {
  if (!this.globalEventBus.pageLoaded) {
    this.globalEventBus.pageLoaded = true;
    this.dispatchViewPortEvent(com.adtech.RichMediaEvent_2_53_3.PAGE_LOAD);
  }
}

/**
 * Initialises a new advert in the window that it will be rendered in:
 * (i.e - post iframe breakout).
 *
 * @private
 * @param adConfig the JSON configuration of the advert.
 * @param targetIframe the reference to the iframe the ad should be served into or false.
 * @param targetDiv the reference to the div the ad should be served into or false.
 */
com.adtech.AdManager_2_53_3.prototype.initialiseAd =
    function(adConfig, targetIframe, targetDiv) {
      this.createGlobalAdvertAccessor();
      this.addWindowEventListeners();
      this.adverts[adConfig.adServerVars.uid] = new this.advertClass(targetIframe, targetDiv);
      var advert = this.adverts[adConfig.adServerVars.uid];
      com.adtech.Utils_2_53_3.debug('Created Advert instance.');
      /*
       * TODO(samuel.adu): Currently all Advert instances use the same logger instance.
       * This is subject to change.
       */
      advert.addEventListener(com.adtech.RichMediaEvent_2_53_3.REPORT,
          function(event) {
            this.logger.log(event);
            this.globalEventBus.dispatchEvent(event);
          }, this);

      var advertUID = adConfig.adServerVars.uid;
      // Invoke preInit method on callback instances, if defined.
      this.checkCustomCallbacks(advertUID, false);
      /*
       * IMPORTANT: Initialisation is explicitly invoked by the AdManger after the
       * logger has been registered as a listener in order to reduce the risk of any
       * events being missed during initialisation phase.
       */
      advert.init(adConfig, this.globalEventBus, this.renderingInFiF, this.renderingInSafeframe);
      this.globalEventBus.dispatchEvent(
          {'type': com.adtech.RichMediaEvent_2_53_3.ADVERT_ADDED, 'advert': advert});
      this.checkCustomCallbacks(advertUID, true);

      // adtechAdCallback deprecated since 2.5.0.
      if (typeof adtechAdCallback != 'undefined' && adtechAdCallback[advertUID]) {
        this.invokeAdvertCallback(advertUID, adtechAdCallback[advertUID], true);
      }
    }

com.adtech.AdManager_2_53_3.prototype.checkCustomCallbacks =
    function(advertUID, advertInitialised) {
      if (typeof adtechAdCallbacks != 'undefined' && adtechAdCallbacks[advertUID]) {
        if (com.adtech.Utils_2_53_3.isArray(adtechAdCallbacks[advertUID])) {
          for (var i = 0; i < adtechAdCallbacks[advertUID].length; i++) {
            this.invokeAdvertCallback(advertUID, adtechAdCallbacks[advertUID][i], advertInitialised);
          }
        }
      }
    }

/** @private */
com.adtech.AdManager_2_53_3.prototype.invokeAdvertCallback =
    function(uid, advertCallback, advertInitialised) {
      switch (typeof advertCallback) {
        case 'function':
          if (advertInitialised) {
            advertCallback(this.adverts[uid]);
          }
          break;
        case 'object':
          var methodToInvoke = (advertInitialised) ? 'init' : 'preInit';
          try {
            advertCallback[methodToInvoke](this.adverts[uid]);
          } catch (e){}
          break;
      }
    }

/**
 * Registers the ad on the relevant window and initialises it.
 *
 * @param adConfig the JSON configuration of the advert.
 * @param targetIframe the reference to the iframe the ad should be served into or false.
 * @param targetDiv the reference to the div the ad should be served into or false.
 */
com.adtech.AdManager_2_53_3.prototype.registerAd = function(adConfig, targetIframe, targetDiv) {
  var overrideDisplayWindowTarget =
      com.adtech.Utils_2_53_3.getConfigOverride(adConfig, 'displayWindowTarget');
  var forceDefaultInNonFiF = adConfig.tagVars.forceDefault;
  // Set override to false to prevent default being shown in all cases. @see line 228.
  adConfig.tagVars.forceDefault = (adConfig.tagVars.forceBackup) ? true : false;
  if (com.adtech.SafeframeUtils_2_53_3.isInSafeframe()) {
    com.adtech.SafeframeUtils_2_53_3.createSafeframeSandbox(adConfig);
    return;
  }
  if (targetIframe || targetDiv ||
      (!com.adtech.SafeframeUtils_2_53_3.isInSafeframeSandbox() &&
      overrideDisplayWindowTarget == window)) {
    // Ad broken out of iframe, or is an AJAX load, or has been forced to not break out of the iframe.
    this.initialiseAd(adConfig, targetIframe, targetDiv);
    return;
  }
  // Non-rich will also break out of iframes. This enables us to track viewability
  // consistently per advert-placement combination.
  if (!com.adtech.SafeframeUtils_2_53_3.isInSafeframeSandbox() &&
      com.adtech.IframeUtils_2_53_3.isInIframe() &&
      com.adtech.IframeUtils_2_53_3.isBreakoutAdType(adConfig)) {
    if (com.adtech.IframeUtils_2_53_3.isInFriendlyIframe(adConfig)) {
      // Friendly iframe serving.
      com.adtech.IframeUtils_2_53_3.registerAdOnTargetParent(
          com.adtech.IframeUtils_2_53_3.determineDisplayWindowTarget(adConfig), adConfig);
    } else {
      // Stage 1 of non-friendly iframe serving.
      if (forceDefaultInNonFiF) {
        // Stop-gap solution to force render defaults in non-friendly iframes when configured.
        adConfig.tagVars.forceDefault = true;
        this.initialiseAd(adConfig);
      } else {
        var adtechIframeProxyPath = (adConfig.pubVars.iframeBusterPath) ?
            adConfig.pubVars.iframeBusterPath : 'adtech/iframeproxy.html';
        com.adtech.IframeUtils_2_53_3.loadIframeBuster(adtechIframeProxyPath, adConfig);
      }
    }
  } else {
    // Rendering phase.
    this.renderingInSafeframe = com.adtech.SafeframeUtils_2_53_3.isInSafeframeSandbox();
    if (!this.renderingInSafeframe) {
      this.renderingInFiF = (com.adtech.IframeUtils_2_53_3.isInIframe() &&
      com.adtech.IframeUtils_2_53_3.isInFriendlyIframe(adConfig));
    }
    this.initialiseAd(adConfig);
  }
}

/**
 * Creates a method that will be available in com.adtech that returns a advert by its id
 *
 */
com.adtech.AdManager_2_53_3.prototype.createGlobalAdvertAccessor = function() {
  com.adtech.getAdvertById = function(id) {
    for (var key in window) {
      if (window.hasOwnProperty(key) && key.match(/^adtechAdManager/g) && window[key].adverts) {
        var adverts = window[key].adverts;
        for (var advertUid in adverts) {
          if (adverts.hasOwnProperty(advertUid) && adverts[advertUid].canvasId == id) {
            return adverts[advertUid];
          }
        }
      }
    }
    return null;
  }
}

/**
 * Calls register ad on an array of new adverts.
 *
 * @param adConfigArray an array of JSON advert configuration objects.
 */
com.adtech.AdManager_2_53_3.prototype.registerAds = function(adConfigArray) {
  var len = adConfigArray.length;
  for (var i = (len - 1); i > -1; i--) {
    if (adConfigArray[i]['rmLibUrl'].indexOf('2_53_3') == -1) {
      // Ensure that each ad is rendered by the correct versioned library.
      continue;
    }
    var adConfig = adConfigArray.splice(i, 1)[0];
    var targetIframe = (typeof adtechAdTargetIframeQueue != 'undefined' &&
    adtechAdTargetIframeQueue[adConfig.adServerVars.uid]) ?
        adtechAdTargetIframeQueue[adConfig.adServerVars.uid] : false;
    var targetDiv = (typeof adtechAdTargetDivQueue != 'undefined' &&
    adtechAdTargetDivQueue[adConfig.adServerVars.uid]) ?
        adtechAdTargetDivQueue[adConfig.adServerVars.uid] : false;
    this.registerAd(adConfig, targetIframe, targetDiv);
  }
}

/**
 * Returns the advert associated to the unique identifier if defined; null
 * otherwise.
 *
 * @return the relevant Advert instance.
 * @see com.adtech.Advert
 */
com.adtech.AdManager_2_53_3.prototype.getAdvert = function(uid) {
  return (typeof this.adverts[uid] != 'undefined') ?
      this.adverts[uid] : null;
}

/** @private */
com.adtech.AdManager_2_53_3.prototype.dispatchViewPortEvent = function(type) {
  offsets = com.adtech.Utils_2_53_3.getPageOffsets(this.renderingInFiF);
  dims = com.adtech.Utils_2_53_3.getViewportDims(this.renderingInFiF);
  this.globalEventBus.dispatchEvent(new com.adtech.RichMediaEvent_2_53_3(type)
      .property('offsetX', offsets.x).property('offsetY', offsets.y)
      .property('width', dims.w).property('height', dims.h));
}

// Event handlers follow.

/** @private */
com.adtech.AdManager_2_53_3.prototype.scrollHandler = function() {
  this.dispatchViewPortEvent(com.adtech.RichMediaEvent_2_53_3.PAGE_SCROLL);
}

/** @private */
com.adtech.AdManager_2_53_3.prototype.resizeHandler = function() {
  this.dispatchViewPortEvent(com.adtech.RichMediaEvent_2_53_3.PAGE_RESIZE);
}

/** @private */
com.adtech.AdManager_2_53_3.prototype.orientationChangeHandler = function() {
  this.dispatchViewPortEvent(com.adtech.RichMediaEvent_2_53_3.ORIENTATION_CHANGE);
}

/** @private */
com.adtech.AdManager_2_53_3.prototype.blurHandler = function() {
  com.adtech.Utils_2_53_3.dispatchElementFocusEvent(this.globalEventBus, false);
}

/** @private */
com.adtech.AdManager_2_53_3.prototype.focusHandler = function() {
  com.adtech.Utils_2_53_3.dispatchElementFocusEvent(this.globalEventBus, true);
}
// Copyright 2010 AOL Platforms.

/**
 * Represents a rich media advert. This class is a wrapper around the advert JSON configuration.
 * <br/><br/>
 * <strong>Dispatched events</strong>
 * <table border="1">
 *   <tr><th>Type</th><th>Properties</th></tr>
 *   <tr><td>com.adtech.RichMediaEvent.RENDER</td><td><code>Advert</code> target</td></tr>
 * </table>
 *
 * @class
 * @extends com.adtech.EventDispatcher_2_53_3
 * @constructor
 * @author Pictela Support <support@pictela.com>
 */
com.adtech.Advert_2_53_3 = function(targetIframe, targetDiv) {
  com.adtech.Advert_2_53_3.supa.constructor.call(this);
  this.assetContainers = {};
  /**
   * Flag indicating if any one of the containers for this advert instance has been rendered.
   * @type Boolean
   */
  this.rendered = false;
  /** @private */
  this.reportedEvents = [];
  /**
   * Flag indicating if the rendered advert is the rich version.
   * @type Boolean
   */
  this.richView = true;
  /** @private */
  this.targetIframe = targetIframe;
  /** @private */
  this.targetDiv = targetDiv;
  /** @private */
  this.containerMouseOverCount = 0;
  /** @private */
  this.timersFlushed = false;
  /** @private */
  this.macroMap = {};
  /** @private */
  this.windowInFocus = true;
  /** @private */
  this.viewEventsLogged = false;
  /** @private */
  this.isTouchDevice = false;
  /**@ private */
  this.interactionEventBuffer = [];
  /** @private */
  this.hasQualifiedRollover = false;
  /** @private */
  this.userHasInteracted = false;
  /** @private */
  this.interactionStartTime = null;
  /** @private */
  this.playingVideos = {};
  /** @private */
  this.logTimers = true;
  /** @private */
  this.forceRenderBackup = false;
  /** @private */
  this.isBuySightAd = false;
  /** @private */
  this.dcoEventData = null;
  /** @private */
  this.dcoContentMap = {};
  /** @private */
  this.tagVarsPropertyMap = {
      'forceDefault': 'forceRenderBackup',
      'placementId': 'thirdPartyPlacementId',
      'creativeId': 'thirdPartyCreativeId',
      'segmentIds': 'segmentIds'
  };
  /**
   * Reference to the <code>EventDispatcher</code> instance used for the advert level event bus.
   * All custom events dispatched by ad content (<code>HtmlContent</code> or <code>FlashContent</code>)
   * will be dispatched via this event bus.
   *
   * <br/><br/>
   * <strong>Dispatched events</strong>
   * <table border="1">
   *   <tr><th>Type</th><th>Properties</th></tr>
   *   <tr><td>com.adtech.RichMediaEvent.ENGAGEMENT</td><td><code>Advert</code> target</td></tr>
   *   <tr><td>* - custom events defined by ad/format author</td><td><code>HtmlContent</code> target</td></tr>
   * </table>
   */
  this.eventBus = new com.adtech.DynamicEventDispatcher_2_53_3();
  /** @private */
  this.rmEvent = com.adtech.RichMediaEvent_2_53_3;
}

/*
 * For class constants, please see common/AdvertConstants.js
 */

com.adtech.Utils_2_53_3.extend(com.adtech.Advert_2_53_3,
    com.adtech.EventDispatcher_2_53_3);

/** @private */
com.adtech.Advert_2_53_3.prototype.init = function(config, globalEventBus, renderingInFiF,
    renderingInSafeframe) {
  var utils = com.adtech.Utils_2_53_3;
  this.canRenderRich = utils.canRenderRich(config);
  this.renderingInFiF = renderingInFiF;
  this.renderingInSafeframe = renderingInSafeframe;
  this.id = config.adServerVars.id;
  utils.debug('Advert rendered in friendly iframe ' + this.renderingInFiF);
  utils.debug('Advert rendered in safeframe ' + this.renderingInSafeframe);
  /* Fix any potential semi-colon replacements introduced to work-around
   * adserver limitations for key-values.
   */
  utils.recursiveSubtitute(config.tagVars, com.adtech.Advert_2_53_3.TAGVARS_SUBSTITUTION_MAP);
  var propertiesToCopy = [
    'canvasId', 'servicesUrl', 'servicesHosts', 'adServerVars', 'pubVars', 'clickTrackerUrl',
    'clickthroughs', 'clickRedirect', 'contentVariables', 'contentProperties', 'geoData', 'tagVars',
    'assets', 'thirdPartyTracking', 'events', 'timers', 'dataFeeds', 'liveStatsEnabled', 'polls',
    'fallback', 'formatId', 'productFamilyId', 'templateId', 'dynamic', 'contentHubConfig'
  ];
  for (var i=0; i < propertiesToCopy.length; i++) {
    var propertyName = propertiesToCopy[i];
    if (config.hasOwnProperty(propertyName)) {
      this[propertyName] = config[propertyName];
    }
  }
  var shouldLaunchAdInspector = (utils.getQueryStringValue('adInspector') === '1');
  if (shouldLaunchAdInspector) {
    (function(){var scr=document.createElement('script');scr.src='//origin-ads.pictela.net/rm/lib/richmedia/adInspector/AdInspector.js?'+new Date();document.body.appendChild(scr);})();

  }
  this.debugMode = (utils.getQueryStringValue('canvasDebugAdId') == this.canvasId.toString());
  this.processTagVars();
  if (this.pubVars.clickPixel) {
    this.addToThirdPartyTracking(this.pubVars.clickPixel,
        com.adtech.Advert_2_53_3.TRACK_TYPE_PIXEL,
        com.adtech.Advert_2_53_3.TRACK_EVENT_CLICKS_ALL);
  }
  var overrideEngagementThreshold = utils.getConfigOverride(config, 'engagementThreshold');
  this.engagementThreshold = (overrideEngagementThreshold !== null) ?
      overrideEngagementThreshold : com.adtech.Advert_2_53_3.ENGAGEMENT_THRESHOLD;
  var overrideQualifiedRolloverThreshold =
      utils.getConfigOverride(config, 'qualifiedRolloverThreshold');
  this.qualifiedRolloverThreshold = (overrideQualifiedRolloverThreshold !== null) ?
      overrideQualifiedRolloverThreshold :
      com.adtech.Advert_2_53_3.QUALIFIED_ROLLOVER_THRESHOLD;
  var overrideViewableImpressionThreshold =
      utils.getConfigOverride(config, 'viewableImpressionThreshold');
  this.viewableImpressionThreshold = (overrideViewableImpressionThreshold !== null) ?
      overrideViewableImpressionThreshold :
      com.adtech.Advert_2_53_3.VIEWABLE_IMPRESSION_THRESHOLD;
  this.trackViewOnEngagement = (utils.getConfigOverride(config, 'trackViewOnEngagement') === true);
  this.disableMouseOverEngagement =
      (utils.getConfigOverride(config, 'disableMouseOverEngagement') === true);
  this.initTimers();
  this.eventActions = config.eventHandlers;
  this.setMacroMap();
  this.setDebugOverrides();
  if (!this.forceRenderBackup && this.canRenderRich) {
    var containers = config.assetContainers;
    for (var id in containers) {
      if (containers.hasOwnProperty(id)) {
        this.playingVideos[id] = [];
        var container = com.adtech.AssetContainerFactory_2_53_3.getContainer(
            containers[id].type, this, config, id, this.eventBus, globalEventBus);
        container.addEventListener(this.rmEvent.RENDER, this.renderEventHandler, this);
        container.addEventListener(this.rmEvent.MOUSE_OVER, this.mouseOverEventHandler, this);
        container.addEventListener(this.rmEvent.MOUSE_OUT, this.mouseOutEventHandler, this);
        // Enable the MOUSE_OVER and MOUSE_OUT event to be trigger custom actions.
        container.addEventListener(this.rmEvent.MOUSE_OVER, this.customEventHandler, this);
        container.addEventListener(this.rmEvent.MOUSE_OUT, this.customEventHandler, this);
        container.addEventListener(this.rmEvent.IN_VIEWPORT, this.containerViewHandler, this);
        container.addEventListener(this.rmEvent.OUT_VIEWPORT, this.containerViewHandler, this);
        container.addEventListener(this.rmEvent.CLOSE, this.containerCloseHandler, this);
        container.addEventListener(this.rmEvent.HIDE, this.containerHideHandler, this);
        if (container.isExpandable) {
          container.addEventListener(this.rmEvent.EXPANDED,
              this.containerExpansionStateChangeHandler, this);
          container.addEventListener(this.rmEvent.CONTRACTED,
              this.containerExpansionStateChangeHandler, this);
        }
        this.assetContainers[id] = container;
      }
    }
    if (config.dynamic) {
      this.eventBus.addEventListener(this.rmEvent.DYNAMIC, this.customEventHandler, this);
    }
    // Custom events go through the event bus in order for container siblings to pick up.
    this.addVideoEventHandlers();
    // NOTE: Adding video handlers must be done before adding custom event handler.
    // This ensures that the video timer meta data is registered before we attempt to log events
    //  - which depends on this metadata.
    utils.addCustomEventHandler(this.eventBus, this, config.events);
  } else {
    this.richView = false;
    if (config.assetContainers.main.type ==
      com.adtech.AssetContainerFactory_2_53_3.INLINE_DIV) {
      config.assetContainers.main.content = this.fallback;
      config.assetContainers.main.contentType = com.adtech.ContentFactory_2_53_3.HTML;
      config.assetContainers.main.x = 0;
      config.assetContainers.main.y = 0;
      config.assetContainers.main.contentWidth = config.assetContainers.main.width;
      config.assetContainers.main.contentHeight = config.assetContainers.main.height;
      config.assetContainers.main.contractedX = 0;
      config.assetContainers.main.contractedY = 0;
      config.assetContainers.main.isExpandable = false;
      var backupContainer = com.adtech.AssetContainerFactory_2_53_3.getContainer(
          config.assetContainers.main.type, this, config, 'main', this.eventBus, globalEventBus);
      backupContainer.addEventListener(this.rmEvent.IN_VIEWPORT,
          this.containerViewHandler, this);
      backupContainer.addEventListener(this.rmEvent.OUT_VIEWPORT,
          this.containerViewHandler, this);
      backupContainer.addEventListener(this.rmEvent.RENDER,
          this.backupImageRenderEventHandler, this);
      this.assetContainers['main'] = backupContainer;
    } else {
      // Nothing to render, track event.
      this.reportEvent(this.rmEvent.UNSUPPORTED_CLIENT);
    }
  }
  /* Viewability metrics will not be available for non-friendly iframe serving or adverts
     rendered in a double-nested iframe */
  this.canMeasureViewExposure = (window == top || this.renderingInSafeframe ||
      (renderingInFiF && (top == parent) && (com.adtech.IframeUtils_2_53_3.topOrSelf() != window)));
  if (this.canMeasureViewExposure) {
    this.windowInFocus = globalEventBus.windowInFocus;
    globalEventBus.addEventListener(this.rmEvent.BLUR, this.windowFocusEventHandler, this);
    globalEventBus.addEventListener(this.rmEvent.FOCUS, this.windowFocusEventHandler, this);
    globalEventBus.addEventListener(this.rmEvent.SCROLL, this.windowScrollEventHandler, this);
  }
  // Gets content from Content Hub and apply it on the content properties.
  this.dcoConfig = config.adrConfig || config.dcoConfig;
  if (config.contentHubConfig
      && config.contentHubConfig.mapping && config.contentHubConfig.assets) {
    com.adtech.ContentRenditionProcessor_2_53_3.applyContentHubData(this, config);
    this.processContent(this.contentProperties);
  }
  // Dispatch the serve event to all containers.
  if (this.dcoConfig) {
    if (this.dcoConfig.eventEndpoint) {
      this.dcoConfig.eventEndpoint =
          this.dcoConfig.eventEndpoint.replace(/^https?/i, this.adServerVars.servingProto);
    }
    this.dcoEventRecordGenerator = new com.adtech.DCOEventRecordGenerator_2_53_3(this);
    if (config.dynamic) {
      var impressionDcoEvent = this.dcoEventRecordGenerator.generateDCOData(
          this.createDCOEvent(com.adtech.DCOEventRecordGenerator_2_53_3.IMPRESSION));
      var dcoDataLoader = new com.adtech.DCODataLoader_2_53_3(config, impressionDcoEvent);
      dcoDataLoader.addEventListener(com.adtech.RichMediaEvent_2_53_3.LOADED,
          this.dcoDataLoadedHandler, this);
      dcoDataLoader.addEventListener(com.adtech.RichMediaEvent_2_53_3.ERROR,
          this.dcoDataErrorHandler, this);
      dcoDataLoader.load();
    } else {
      this.eventBus.dispatchEvent(this.rmEvent.SERVE);
    }
  } else {
    this.eventBus.dispatchEvent(this.rmEvent.SERVE);
  }
  this.trackViewEvents();
}

/**
 * @private
 *
 * Generates and returns Rich Media reporting event object with all of the standard properties.
 * An event param will not be passed to this for timer, clicks, and third party pixel logging.
 */
com.adtech.Advert_2_53_3.prototype.generateReportEvent = function(event) {
  var eventName = '';
  var eventId = '';
  var interaction = false;
  var meta = null;
  if (typeof event != 'undefined') {
    eventName = event.name;
    eventId = event.id;
    interaction = event.interaction;
    meta = event.meta || null;
  }
  var reportingEvent = new this.rmEvent(this.rmEvent.REPORT).
      property('canvasId', this.canvasId).
      property('adId', this.id).
      property('eventId', eventId).
      property('eventName', eventName).
      property('proto', this.adServerVars.servingProto).
      property('host', this.adServerVars.servingHost).
      property('bannerId', this.adServerVars.bannerId).
      property('bannerUid', this.adServerVars.bannerUid).
      property('networkId', this.adServerVars.networkId).
      property('subNetworkId', this.adServerVars.subNetworkId).
      property('creativeId', this.adServerVars.creativeId).
      property('placementId', this.adServerVars.placementId).
      property('size', this.adServerVars.adSize).
      property('pageId', this.adServerVars.pageId).
      property('category', (interaction) ?
          com.adtech.DCOEventRecordGenerator_2_53_3.USER_INTERACTION :
          com.adtech.DCOEventRecordGenerator_2_53_3.OTHER).
      property('meta', meta).
      property('timestamp', new Date().getTime()).
      property('sequenceId32', this.adServerVars.sequenceId32).
      property('sequenceId64', this.adServerVars.sequenceId64).
      property('thirdPartyCreativeId', this.thirdPartyCreativeId || '0').
      property('thirdPartyPlacementId', this.thirdPartyPlacementId || '0').
      property('segmentIds', this.segmentIds || []).
      property('interaction', interaction);
  return reportingEvent;
}

/**
 * @private
 *
 * Dispatches the reporting event with the relevant parameters for the ad
 * instance.
 */
com.adtech.Advert_2_53_3.prototype.reportEvent = function(reportedEvent) {
  reportedEvent = (typeof reportedEvent == 'string') ?
      new this.rmEvent(reportedEvent) : reportedEvent;
  for (var i = 0; i < this.events.length; i++) {
    var event = this.events[i];
    if (event.name != reportedEvent.type || !event.isLoggable) {continue;}
    // Check to see if the event logging must wait until the rollover is qualified or not.
    var eventRequiresBuffering = ((reportedEvent.type != this.rmEvent.ENGAGEMENT) &&
        (reportedEvent.type != this.rmEvent.INTERACTIVE_IMPRESSION) && event.interaction &&
        !event.forceLog) ?
            true : false;
    if (eventRequiresBuffering && !this.hasQualifiedRollover) {
      com.adtech.Utils_2_53_3.debug('Storing event "' + reportedEvent.type + '" in event buffer.');
      // Store only last event for now. Leave buffer as array until we decide that this is
      // correct approach.
      this.interactionEventBuffer[0] = reportedEvent;
      return;
    }
    // Check if event is a video event. Ensure that the container is actually visible
    // (i.e: not hidden) before logging. Skip this check if the event is force logged.
    if (event.video && !(event.interaction || reportedEvent.forceLog)) {
      var videoReportingIdentifier =
          com.adtech.Utils_2_53_3.getVideoReportingIdFromEventName(reportedEvent.type);
      var videoViewTimerName = videoReportingIdentifier +
          com.adtech.Advert_2_53_3.VIDEO_EVENT_VIEW;
      var containerPlayingVideoIsInView = false;
      for (var containerId in this.assetContainers) {
        if (this.assetContainers.hasOwnProperty(containerId)) {
          if (com.adtech.Utils_2_53_3.inArray(videoViewTimerName,
              this.playingVideos[containerId])) {
            containerPlayingVideoIsInView = true;
            break;
          }
        }
      }
      if (!containerPlayingVideoIsInView) {
        return;
      }
    }
    // End event buffering logic.
    if (event.cumulative ||
        (!event.cumulative &&
        !com.adtech.Utils_2_53_3.inArray(reportedEvent.type, this.reportedEvents))) {
      this.thirdPartyEventTrackingCheck(event);
      var eventObj = this.generateReportEvent(event);
      if (typeof reportedEvent.meta == 'object' &&
          typeof reportedEvent.meta.reportingData == 'object') {
        var eventValues = [];
        for (var eventValueKey in reportedEvent.meta.reportingData) {
          if (reportedEvent.meta.reportingData.hasOwnProperty(eventValueKey)) {
            var customMetricValue = reportedEvent.meta.reportingData[eventValueKey];
            if (typeof customMetricValue == 'number') {
              eventValues.push(parseInt(customMetricValue));
              break; // Initial phase, we only accept one value.
            }
          }
        }
        if (eventValues.length > 0) {
          eventObj = eventObj.property('eventValues', eventValues);
        }
      }
      switch (reportedEvent.type) {
        case (com.adtech.DCOEventRecordGenerator_2_53_3.INTERACTIVE_IMPRESSION):
        case (com.adtech.DCOEventRecordGenerator_2_53_3.VIEWABLE_IMPRESSION):
        case (com.adtech.DCOEventRecordGenerator_2_53_3.BACKUP_VIEWABLE_IMPRESSION):
        case com.adtech.DCOEventRecordGenerator_2_53_3.BACKUP_VIEW:
        case com.adtech.DCOEventRecordGenerator_2_53_3.INDETERMINABLE_VIEWABILITY:
          this.reportDCOEvent(reportedEvent.type, this.addDCOEventProperties(event, {}));
      }
      if (event.custom) {
        var eventDcoData = {'name': reportedEvent.type};
        this.addDCOEventProperties(event, eventDcoData);
        if (event.interaction && this.hasQualifiedRollover) {
          if (event.video) {
            eventObj.property('category', this.rmEvent.VIDEO_INTERACTION);
            eventDcoData.contentTypeId = com.adtech.ContentRenditionProcessor_2_53_3.TYPE_ID_VIDEO;
          }
          this.extractDCOMetaFromEvent(reportedEvent.meta, eventDcoData);
          this.reportDCOEvent(com.adtech.DCOEventRecordGenerator_2_53_3.USER_INTERACTION,
              eventDcoData);
        } else if (event.video) {
          eventObj.property('category', this.rmEvent.VIDEO);
        } else {
          this.reportDCOEvent(com.adtech.DCOEventRecordGenerator_2_53_3.OTHER, eventDcoData);
        }
      }
      this.dispatchEvent(eventObj);
      this.reportedEvents.push(reportedEvent.type);
      if (reportedEvent.type == this.rmEvent.ENGAGEMENT) {
        // Dispatch engagement event for containers to cancel auto-timeouts etc.
        this.eventBus.dispatchEvent(this.rmEvent.ENGAGEMENT);

      }
      if (event.interaction && (reportedEvent.type != this.rmEvent.ENGAGEMENT)) {
        if (!com.adtech.Utils_2_53_3.inArray(this.rmEvent.ENGAGEMENT, this.reportedEvents)) {
          // A custom interaction event has been logged, so log the standard
          // engagement event as well as dispatching the event to notify the containers.
          this.reportEvent(this.rmEvent.ENGAGEMENT);
        }
        if (this.hasQualifiedRollover && !com.adtech.Utils_2_53_3.inArray(
            this.rmEvent.INTERACTIVE_IMPRESSION, this.reportedEvents)) {
          this.userHasInteracted = true;
          this.startTimer(com.adtech.Advert_2_53_3.INTERACTION_TIMER);
          this.reportEvent(this.rmEvent.INTERACTIVE_IMPRESSION);
          // Dispatch for content.
          this.eventBus.dispatchEvent(this.rmEvent.INTERACTIVE_IMPRESSION);
        }
      }
    }
  }
}

/**
 * @private
 *
 * Tracks all of the relevant view events when the advert is rendered.
 */
com.adtech.Advert_2_53_3.prototype.trackViewEvents = function() {
  if (!this.viewEventsLogged) {
    this.viewEventsLogged = true;
    // Standard ADTECH view counter must be treated as a third party pixel.
    var trackingKeys = com.adtech.Advert_2_53_3.OPT_TRACKING_KEYS;
    if (typeof this.thirdPartyCreativeId != 'undefined') {
      this.adServerVars.viewCounter += trackingKeys['creativeId'] + '=' +
          this.thirdPartyCreativeId + ';';
    }
    if (typeof this.thirdPartyPlacementId != 'undefined') {
      this.adServerVars.viewCounter += trackingKeys['placementId'] + '=' +
          this.thirdPartyPlacementId + ';';
    }
    this.thirdPartyPixelLog(this.adServerVars.viewCounter);
    if (!this.dynamic) {
      this.reportDCOEvent(com.adtech.DCOEventRecordGenerator_2_53_3.IMPRESSION);
    }
    this.thirdPartyEventTrackingCheck(com.adtech.Advert_2_53_3.TRACK_EVENT_VIEW);
    // Publisher defined view counter.
    this.thirdPartyPixelLog(this.pubVars.viewCountUrl);
  }
}

/**
 * @private
 */
com.adtech.Advert_2_53_3.prototype.logViewabilityAvailability = function() {
  if (!this.canMeasureViewExposure) {
    this.reportEvent(this.rmEvent.INDETERMINABLE_VIEWABILITY);
    // Ensure content thinks it's in view if we cannot determine it.
    this.eventBus.dispatchEvent(this.rmEvent.IN_VIEWPORT);
    com.adtech.Utils_2_53_3.debug('Advert can NOT measure view exposure.');
  }
}

/**
 * @private
 *
 * Provides the view and display timer with their default values.
 */
com.adtech.Advert_2_53_3.prototype.initTimers = function() {
  for (var i = 0; i < this.timers.length; i++) {
    this.timers[i].meta = {"requestNum": 1, "previousVal": 0};
    switch (this.timers[i].name) {
      case com.adtech.Advert_2_53_3.DISPLAY_TIMER:
      case com.adtech.Advert_2_53_3.VIEW_TIMER:
        this.timers[i].timeElapsed = 0;
        break;
    }
  }
}

/** @private */
com.adtech.Advert_2_53_3.prototype.checkDisplayTimerValue = function() {
  var timer = this.getTimer(com.adtech.Advert_2_53_3.DISPLAY_TIMER);
  var timeElapsed = (typeof timer.timeElapsed == 'number' && timer.timeElapsed) ?
      timer.timeElapsed : ((new Date().getTime()) - timer.startTime);
  if (timeElapsed >= com.adtech.Advert_2_53_3.TIMER_LOGGING_THRESHOLD) {
    this.logTimers = false;
  }
}

/** @private */
com.adtech.Advert_2_53_3.prototype.flushTimers = function() {
  this.checkDisplayTimerValue();
  if (!this.timersFlushed && this.logTimers) {
    this.timersFlushed = true;
    com.adtech.Utils_2_53_3.debug('Flushing timers.');
    var eventIds = [];
    var eventVals = [];
    for (var i = 0; i < this.timers.length; i++) {
      var timer = this.timers[i];
      this.stopTimer(timer.name);
      if (this.isExcludedTimer(name)) {
        com.adtech.Utils_2_53_3.debug('NOT logging timer ' + name);
        continue;
      }
      if (typeof timer.timeElapsed == 'number' && timer.timeElapsed > 0) {
        eventIds.push(timer.id);
        eventVals.push(this.getTimerLogPayloadValue(timer));
        if (timer.name == com.adtech.Advert_2_53_3.DISPLAY_TIMER ||
            timer.name == com.adtech.Advert_2_53_3.VIEW_TIMER) {
          this.reportDCOEvent(com.adtech.DCOEventRecordGenerator_2_53_3.IMPRESSION_DURATION,
              this.addDCOEventProperties(timer, {
                'name': timer.name,
                'duration': this.getTimerLogPayloadValue(timer)
              }));
        }
      }
    }
    if (eventIds.length > 0) {
      var eventObj = this.generateReportEvent().
          property('timerEvent', true).property('eventValues', eventVals).
          property('eventIds', eventIds);
      this.dispatchEvent(eventObj);
    }
  }
}

/** @private */
com.adtech.Advert_2_53_3.prototype.isExcludedTimer = function(name) {
  var touchExcludedTimers = [com.adtech.Advert_2_53_3.ENGAGEMENT_TIMER,
                             com.adtech.Advert_2_53_3.INTERACTION_TIMER];
  if (this.isTouchDevice &&
      com.adtech.Utils_2_53_3.inArray(name, touchExcludedTimers)) {
    return true;
  }
  return false;
}

/**
 * @private
 *
 * Dispatches a report event in order for an individual timer value to be logged.
 * Requests for certain timers may be performed multiple times during an impression,
 * so calculations are performed here to ensure that the average value is correct.
 */
com.adtech.Advert_2_53_3.prototype.logTimerValue = function(name) {
  this.checkDisplayTimerValue();
  if (this.isExcludedTimer(name)) {
    return;
  }
  var timer = this.getTimer(name);
  if (this.logTimers && timer && typeof timer.startTime == 'number' && timer.startTime > 0) {
    if (timer.name === com.adtech.Advert_2_53_3.INTERACTION_TIMER &&
        this.interactionStartTime != null) {
      timer.timeElapsed = timer.startTime - this.interactionStartTime;
      this.interactionStartTime = null;
    }
    var valueToLog = this.getTimerLogPayloadValue(timer);
    if (valueToLog > 0) {
      var eventObj = this.generateReportEvent().
          property('timerEvent', true).property('eventValues', [valueToLog]).
          property('eventIds', [timer.id]).property('category', this.rmEvent.DURATION_END).
          property('eventName', timer.name);
      this.dispatchEvent(eventObj);
      if (timer.name === com.adtech.Advert_2_53_3.INTERACTION_TIMER) {
        this.reportDCOEvent(com.adtech.DCOEventRecordGenerator_2_53_3.INTERACTION_DURATION,
            this.addDCOEventProperties(timer, {
              'name': com.adtech.Advert_2_53_3.INTERACTION_TIMER,
              'duration': valueToLog
            }));
      }
      if (timer.meta.percentage) {
        this.reportDCOEvent(com.adtech.DCOEventRecordGenerator_2_53_3.CONTENT_DURATION,
            this.addDCOEventProperties(timer, {
              'name': name,
              'duration': valueToLog
            }));
      }
    }
  }
}

/** @private */
com.adtech.Advert_2_53_3.prototype.getTimerLogPayloadValue = function(timer) {
  this.stopTimer(timer.name);
  var valueToLog = (timer.meta.requestNum * timer.timeElapsed) + timer.meta.previousVal;
  com.adtech.Utils_2_53_3.debug('Timer \'' + timer.name + '\' payload value of ' + valueToLog);
  timer.meta.requestNum++;
  timer.meta.previousVal = timer.timeElapsed;
  timer.timeElapsed = 0;
  return valueToLog;
}

/** @private */
com.adtech.Advert_2_53_3.prototype.startTimer = function(name) {
  if (!this.richView) {
    return;
  }
  var timer = this.getTimer(name);
  if (timer && (typeof timer.isRunning == 'undefined' || !timer.isRunning)) {
    timer.startTime = new Date().getTime();
    if (name == com.adtech.Advert_2_53_3.ENGAGEMENT_TIMER) {
      // Engagement actually started prior to this moment. Account for that.
      timer.startTime = timer.startTime - this.engagementThreshold;
    }
    timer.isRunning = true;
    if (typeof timer.timeElapsed == 'undefined') {
      timer.timeElapsed = 0;
    }
    com.adtech.Utils_2_53_3.debug('Starting timer \'' + name + '\'');
    var reportEvent = this.generateReportEvent().property('startTime', timer.startTime)
        .property('category', this.rmEvent.DURATION_START)
        .property('eventName', name);
    this.dispatchEvent(reportEvent);
  }
}

/** @private */
com.adtech.Advert_2_53_3.prototype.stopTimer = function(name) {
  var timer = this.getTimer(name);
  if (timer && timer.isRunning) {
    timer.timeElapsed += new Date().getTime() - timer.startTime;
    timer.isRunning = false;
    com.adtech.Utils_2_53_3.debug('Stopping timer \'' + name + '\'');
  }
}

/** @private */
com.adtech.Advert_2_53_3.prototype.getTimer = function(name) {
  for (var i = 0; i < this.timers.length; i++) {
    if (this.timers[i].name == name) {
     return this.timers[i];
    }
  }
  return null;
}

/** @private */
com.adtech.Advert_2_53_3.prototype.startViewTimer = function() {
  var self = this;
  this.viewableImpressionCheckTimer = setTimeout(function() {
        self.reportEvent(self.rmEvent.VIEWABLE_IMPRESSION);
        if (!self.richView) {
          com.adtech.Utils_2_53_3.debug('Backup viewable impression threshold reached.');
          self.reportEvent(self.rmEvent.BACKUP_VIEWABLE_IMPRESSION);
        }
      }, this.viewableImpressionThreshold);
  this.startTimer(com.adtech.Advert_2_53_3.VIEW_TIMER);
}

/** @private */
com.adtech.Advert_2_53_3.prototype.stopViewTimer = function() {
  if (this.viewableImpressionCheckTimer) {
    clearTimeout(this.viewableImpressionCheckTimer);
  }
  this.stopTimer(com.adtech.Advert_2_53_3.VIEW_TIMER);
}

/** @private */
com.adtech.Advert_2_53_3.prototype.startEngagementTimer = function() {
  if (!this.disableMouseOverEngagement) {
    this.reportEvent(this.rmEvent.ENGAGEMENT);
  }
  this.startTimer(com.adtech.Advert_2_53_3.ENGAGEMENT_TIMER);
}

/** @private */
com.adtech.Advert_2_53_3.prototype.addVideoEventHandlers = function() {
  this.videoReportingIdentifiers = [];
  for (var i = 0; i < this.events.length; i++) {
    var event = this.events[i];
    if (typeof event.video != 'undefined' && event.video) {
      this.eventBus.addEventListener(event.name, this.videoEventHandler, this);
      var reportingIdentifier =
          com.adtech.Utils_2_53_3.getVideoReportingIdFromEventName(event.name);
      if (!com.adtech.Utils_2_53_3.inArray(
          reportingIdentifier, this.videoReportingIdentifiers)) {
        this.videoReportingIdentifiers.push(reportingIdentifier);
      }
    }
  }
  for (i = 0; i < this.videoReportingIdentifiers.length; i++) {
    this.eventBus.addEventListener(this.videoReportingIdentifiers[i] +
        com.adtech.Advert_2_53_3.VIDEO_BUFFERING_EVENT, this.videoEventHandler, this);
    this.eventBus.addEventListener(this.videoReportingIdentifiers[i] +
        com.adtech.Advert_2_53_3.VIDEO_BUFFERING_END_EVENT, this.videoEventHandler, this);
  }
}

/**
 * @private
 */
com.adtech.Advert_2_53_3.prototype.getBackupImageHTML = function(imageFileName) {
  com.adtech.Utils_2_53_3.debug('Fallback image ' + imageFileName + ' being rendered.');
  var functionName = 'adtclk' + this.adServerVars.uid;
  this.createFallbackClickHandler(functionName);
  var altText = this.getContentVariable(com.adtech.Advert_2_53_3.ALT_TEXT_VARIABLE_KEY);
  return '<a href="javascript:' + functionName + '();void(0);" target="_self">' +
      '<img src="' + this.getFileUrl(imageFileName) + '" alt="' +
      altText.replace(/"/g, '&quot;') + '" style="border:0px;"/></a>';
}

/** @private */
com.adtech.Advert_2_53_3.prototype.createFallbackClickHandler = function(functionName) {
  var self = this;
  var clickIdentifier = (this.clickthroughs[com.adtech.Advert_2_53_3.BACKUP_CLICK]) ?
      com.adtech.Advert_2_53_3.BACKUP_CLICK : com.adtech.Advert_2_53_3.DEFAULT_CLICK;
  window[functionName] = function() {
    self.click(clickIdentifier);
  }
}

/**
 * Gets the hostnames to be used for services HTTP requests.
 * The return value will be an object with the following keys:
 * <ul>
 * <li>GET</li>
 * <li>POST</li>
 * </ul>
 */
com.adtech.Advert_2_53_3.prototype.getServicesHosts = function() {
  return {
    'GET': this.servicesHosts[this.adServerVars.servingProto],
    'POST': this.servicesHosts['post']
  };
}

/**
 * Gets all AssetContainer instances associated with the advert.
 *
 * @type Object
 * @see com.adtech.AssetContainer
 */
com.adtech.Advert_2_53_3.prototype.getAssetContainers = function() {
  return this.assetContainers;
}

/**
 * Gets the AssetContainer with the matching identifier if defined; null
 * otherwise.
 *
 * @param id the id of the required AssetContainer.
 * @see com.adtech.AssetContainer
 */
com.adtech.Advert_2_53_3.prototype.getAssetContainer = function(id) {
  if (typeof this.assetContainers[id] != 'undefined') {
    return this.assetContainers[id];
  }
  return null;
}

/**
 * Gets the value of the content variable associated to the key if defined; null
 * otherwise. Content variable values can be edited in the content panel.
 *
 * @param key the key of the content variable.
 * @type String
 */
com.adtech.Advert_2_53_3.prototype.getContentVariable = function(key) {
  return (this.contentVariables[key] !== undefined) ? this.contentVariables[key] : null;
}

/**
 * Gets the value of the content associated to the key and content group if defined;
 * null otherwise. Content variable values can be edited in the content panel.
 * <br/>
 * <br/>
 * Please visit following link for more info:
 * {@link http://canvas.adtech.com/docs/building-templates/ documentation}
 *
 * @param key the key of the content
 * @param defaultValue a value that should be returned in the case when the ad is not being served
 *     on the ADTECH platform.
 * @type String
 */
com.adtech.Advert_2_53_3.prototype.getContent = function(key) {
  return (this.contentProperties == undefined || this.contentProperties[key] == undefined) ?
      null : this.replaceContentPropertyFileValue(this.contentProperties[key]);
}

/** @private */
com.adtech.Advert_2_53_3.prototype.replaceContentPropertyFileValue = function(value) {
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
com.adtech.Advert_2_53_3.prototype.replaceContentPropertyFileValues = function(value) {
  if (com.adtech.Utils_2_53_3.isArray(value)) {
    var returnArray = []; // Collections can contain objects.
    for (var i = 0; i < value.length; i++) {
      returnArray.push(this.replaceContentPropertyFileValue(value[i]));
    }
    return returnArray;
  } else {
    // Object
    var returnObject = {};
    var propertiesToIgnore = [com.adtech.Advert_2_53_3.CONTENT_PROPERTY_TRACKING_KEY,
                              com.adtech.Advert_2_53_3.CONTENT_PROPERTY_PARENT_TRACKING_KEY];
    for (var prop in value) {
      if (value.hasOwnProperty(prop)) {
        if (com.adtech.Utils_2_53_3.inArray(prop, propertiesToIgnore)) {
          returnObject[prop] = value[prop];
          continue;
        }
        returnObject[prop] = this.replaceContentPropertyFileValue(value[prop]);
      }
    }
    return returnObject;
  }
}

/** @private */
com.adtech.Advert_2_53_3.prototype.contentView = function(contentName, contentItem) {
  if (typeof contentItem != 'object') {
    return;
  }
  var contentProperty = this.getContent(contentName);
  var contentMap = this.dcoContentMap[contentName];
  if (contentProperty && contentMap) {
    if (com.adtech.Utils_2_53_3.isArray(contentMap)) {
      if (contentItem.hasOwnProperty(
          com.adtech.DCODataLoader_2_53_3.CONTENT_INDEX_KEY)) {
        contentMap = contentMap[
            contentItem[com.adtech.DCODataLoader_2_53_3.CONTENT_INDEX_KEY]];
      }
    }
    if (typeof contentMap == 'object') {
      this.reportDCOEvent(com.adtech.DCOEventRecordGenerator_2_53_3.CONTENT_VIEW,
          {'advertiserContentId': contentMap.cid,
           'contentTypeId': contentMap.tid,
           'contentName': contentMap.name,
           'name': contentName});
    }
  }
  // Check if item is an DCO product. If so, request all tracking pixels.
  var impUrls = contentItem[com.adtech.DCODataLoader_2_53_3.PRODUCT_ITEM_IMP_URLS_KEY];
  if (com.adtech.Utils_2_53_3.isArray(impUrls)) {
    for (var i = 0; i < impUrls.length; i++) {
      this.thirdPartyPixelLog(impUrls[i]);
    }
  }
}

/**
 * @private
 * Checks if item is an DCO product, tracking all third party pixels if so.
 */
com.adtech.Advert_2_53_3.prototype.contentClick = function(contentName, contentItem) {
  if (com.adtech.Utils_2_53_3.isArray(this.getContent(contentName))
      && typeof contentItem == 'object') {
    var itemThirdPartyUrls =
      contentItem[com.adtech.DCODataLoader_2_53_3.PRODUCT_ITEM_CLICK_URLS_KEY];
    if (com.adtech.Utils_2_53_3.isArray(itemThirdPartyUrls)) {
      for (var i = 0; i < itemThirdPartyUrls.length; i++) {
        this.thirdPartyPixelLog(itemThirdPartyUrls[i]);
      }
    }
  }
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
com.adtech.Advert_2_53_3.prototype.contentIsDynamic = function(
    contentName, propertyName, contentType) {
  if (this.dcoDataLoader) {
    var dynamicMap = this.dcoDataLoader.getConfig().map;
    var contentMapObj =
        com.adtech.DCOUtils_2_53_3.getDCOMapContent(dynamicMap, contentName, propertyName);
    if (contentMapObj) {
      if (contentType) {
        return contentType == (contentMapObj.dcoType || contentMapObj.adrType)
      } else {
        return true;
      }
    }
  }
  return false;
}

/**
 * Gets the value of a geo variable associated to the key if defined; null
 * otherwise.
 *
 * @type String
 */
com.adtech.Advert_2_53_3.prototype.getGeoVariable = function(key) {
  return (this.geoData[key] !== undefined) ? this.geoData[key] : null;
}


/**
 * Gets the url of the ADTECH hosted copy of an external data feed if defined; null
 * otherwise.
 *
 * @param name the user defined name of the feed.
 *
 * @type String
 */
com.adtech.Advert_2_53_3.prototype.getDataFeedUrl = function(name) {
  return (this.dataFeeds !== undefined && this.dataFeeds[name] !== undefined) ?
      this.dataFeeds[name] : null;
}

/**
 * Gets the url of the ADTECH hosted screengrab image if defined; null otherwise.
 *
 * @param name the user defined name of the screen grab.
 *
 * @type String
 */
com.adtech.Advert_2_53_3.prototype.getScreenGrabUrl = function(name) {
  return (this.screenGrabs && this.screenGrabs[name]) ?
      this.screenGrabs[name] : null;
}

/**
 * Returns the latest poll results for the named poll.
 *
 * @param name the user defined name of the poll.
 *
 * @type String
 */
com.adtech.Advert_2_53_3.prototype.getPollResultUrl = function(name) {
  return (this.polls && this.polls[name]) ?
      this.polls[name] : null;
}

/**
 * Removes the advert from the viewport and stops any further metric logging.
 */
com.adtech.Advert_2_53_3.prototype.close = function() {
  for (var id in this.assetContainers) {
    if (this.assetContainers.hasOwnProperty(id)) {
      this.assetContainers[id].close();
    }
  }
}

/**
 * Opens a new window with the address matching that of the <tt>url</tt> parameter. The
 * click will increment the click count for identifier.
 *
 * @param identifier
 *          the user defined identifier for the click.
 * @param defaultUrl
 *          the destination of the click mapped to the identifier. This value
 *          can be overridden in the Canvas web UI after the asset has been
 *          uploaded.
 */
com.adtech.Advert_2_53_3.prototype.click = function(identifier, defaultUrl) {
  this.executeClick(identifier);
}

/**
 *  Opens a new window with the address matching that of the url parameter. The
 *  click will increment the click count for identifier.
 *
 * @param identifier the user defined identifier to report the dynamic click under.
 * @param url the destination url for the click.
 */
com.adtech.Advert_2_53_3.prototype.dynamicClick = function(identifier, url) {
  this.executeClick(identifier, url);
}

/**
 * Gets the absolute path to the file with the name that matches filename;
 * otherwise the default <tt>filename</tt> parameter is returned.
 *
 * @param filename the name of the required file.
 * @type String
 */
com.adtech.Advert_2_53_3.prototype.getFileUrl = function(filename) {
  if (filename) {
    for (var i = 0; i < this.assets.length; i++) {
      var asset = this.assets[i];
      if (asset.name == filename) {
       return this.adServerVars.assetBaseURL + asset.url;
      }
    }
  }
  return filename;
}

/**
 * Gets the absolute path to the file identified by identifier in the Canvas web
 * UI, if defined. If defaultFile is supplied and a match is not found for the
 * supplied identifier, then defaultFile is returned
 *
 * @param identifier
 *          the identifier of the file to be displayed in the Canvas UI.
 * @param defaultFilename
 *          a name of a file that should be returned in the case when the ad is
 *          not being served on the ADTECH platform.
 * @type String
 */
com.adtech.Advert_2_53_3.prototype.getFileUrlById = function(identifier, defaultFile) {
  for (var i = 0; i < this.assets.length; i++) {
    var asset = this.assets[i];
    if (asset.id === identifier) {
      return this.adServerVars.assetBaseURL + asset.url;
    }
  }
  return defaultFile;
}

/** @private */
com.adtech.Advert_2_53_3.prototype.executeClick = function (identifier, overrideUrl) {
  identifier = this.verifyClickIdentifier(identifier);
  if (typeof this.clickthroughs[identifier] != 'undefined') {
    var clk = this.clickthroughs[identifier];
    var dest = this.generateClickUrl(identifier, overrideUrl);
    this.logClick(identifier, overrideUrl);
    switch (clk.target) {
      case '_self':
        top.location.href = dest;
        break;
      default:
        window.open(dest, this.adServerVars.uid + (+new Date()), clk.features);
        break;
    }
  }
}

/**
 * Generates the clickthrough URL including publisher redirect, tracking redirect and
 * third party redirects (if applicable for any).
 *
 * @param identifier the string identifier of the clickthrough.
 * @param overrideUrl the override destination url of the clickthrough, if required.
 *
 * @type String
 */
com.adtech.Advert_2_53_3.prototype.generateClickUrl = function (identifier, overrideUrl) {
  var disableTracking = (typeof adtechDisableClickTracking != 'undefined') ? true : false;
  identifier = this.verifyClickIdentifier(identifier);
  if (typeof this.clickthroughs[identifier] != 'undefined') {
    var clk = this.clickthroughs[identifier];
    var clkId = clk.id;
    if (identifier == com.adtech.Advert_2_53_3.BACKUP_CLICK) {
      clk = this.clickthroughs[com.adtech.Advert_2_53_3.DEFAULT_CLICK];
      clkId = this.clickthroughs[com.adtech.Advert_2_53_3.BACKUP_CLICK].id;
    }
    var dest = (typeof overrideUrl != 'undefined' && overrideUrl) ? overrideUrl : clk.dest;
    if (!disableTracking) {
      dest = this.addThirdPartyRedirectsToClickUrl(identifier, dest);
      var redirectUrl = this.generateClickRedirectUrl({"id": clkId});
      if (redirectUrl) {
        dest = redirectUrl + escape(dest);
      }
      var clickRedirect = this.pubVars.clickRedirect;
      if (typeof clickRedirect != 'undefined' && clickRedirect) {
        dest = this.replaceServerMacros(clickRedirect) + dest;
      }
    }
    return dest;
  }
  return '';
}

/** @private */
com.adtech.Advert_2_53_3.prototype.generateClickRedirectUrl = function(macroMap) {
  var clickRedirectUrl = '';
  if (typeof this.clickRedirect != 'undefined' && this.clickRedirect) {
    clickRedirectUrl = this.clickRedirect.replace(/_CLK_ID_/g, macroMap['id']);
    var linkFragment = ';link=';
    var linkRegExp = new RegExp(linkFragment, 'g');
    var trackingKeys = com.adtech.Advert_2_53_3.OPT_TRACKING_KEYS;
    if (typeof this.thirdPartyCreativeId != 'undefined') {
      clickRedirectUrl = clickRedirectUrl.replace(linkRegExp,
          ';' + trackingKeys['creativeId'] + '=' + this.thirdPartyCreativeId + linkFragment);
    }
    if (typeof this.thirdPartyPlacementId != 'undefined') {
      clickRedirectUrl = clickRedirectUrl.replace(linkRegExp,
          ';' + trackingKeys['placementId'] + '=' + this.thirdPartyPlacementId + linkFragment);
    }
  }
  return clickRedirectUrl;
}

/** @private */
com.adtech.Advert_2_53_3.prototype.verifyClickIdentifier = function (identifier) {
  return (typeof identifier == 'undefined' || identifier === null || !identifier) ?
      'default' : identifier;
}

/**
 * @private
 *
 * Dispatches a report event for the logger to pick up with a 'clickName' and 'url'
 * attribute. Used for logging in Canvas ad preview and Ad Inspector.
 */
com.adtech.Advert_2_53_3.prototype.logClick = function(identifier, overrideUrl, meta) {
  var isBackupClick = false;
  var destinationUrl = this.generateClickUrl(identifier, overrideUrl);
  if (identifier == com.adtech.Advert_2_53_3.BACKUP_CLICK) {
    isBackupClick = true;
    identifier = com.adtech.Advert_2_53_3.DEFAULT_CLICK;
  }
  var clickObj = this.clickthroughs[identifier];
  // Log any potential third party tracking pixels.
  this.thirdPartyClickTrackingCheck(identifier);
  // Ensure than an interactive impression AND an engagement has been logged against the impression.
  this.reportEvent(this.rmEvent.INTERACTIVE_IMPRESSION);
  this.reportEvent(this.rmEvent.ENGAGEMENT);
  var dcoEventName = (isBackupClick) ?
      com.adtech.DCOEventRecordGenerator_2_53_3.BACKUP_CLICK : identifier;
  var dcoEventObj = {
      'url': (typeof overrideUrl != 'undefined' && overrideUrl) ? overrideUrl : clickObj.dest,
      'name': dcoEventName,
      'x': null,
      'y': null
  };
  this.addDCOEventProperties(clickObj, dcoEventObj);
  this.extractDCOMetaFromEvent(meta, dcoEventObj);
  this.reportDCOEvent(com.adtech.DCOEventRecordGenerator_2_53_3.CLICK,
      dcoEventObj);
  this.userHasInteracted = true;
  this.hasQualifiedRollover = true;
  var eventObj = this.generateReportEvent().property(
      'clickName', identifier).property('clickUrl', destinationUrl).property(
      'eventId', clickObj.id).property('category', this.rmEvent.CLICK);
  this.dispatchEvent(eventObj);
  var clickEventObj = {
    'type': this.rmEvent.CLICK,
    'data': {
      'identifier': identifier,
      'destinationUrl': destinationUrl,
      'meta': meta || null
    }
  };
  this.dispatchEvent(clickEventObj);
  if (this.isBuySightAd && this.canRenderRich) {
    this.requestBuySightThirdPartyClickPixels(identifier);
  }
}

/** @private */
com.adtech.Advert_2_53_3.prototype.thirdPartyEventTrackingCheck = function(event) {
  var eventName = (typeof event == 'string') ? event : event.name;
  for (var i = 0; i < this.thirdPartyTracking.length; i++) {
    var tracking = this.thirdPartyTracking[i];
    if (tracking.onEvent == com.adtech.Advert_2_53_3.TRACK_EVENT_ALL ||
        (tracking.onEvent == com.adtech.Advert_2_53_3.TRACK_EVENT_VIEW &&
        eventName == com.adtech.Advert_2_53_3.TRACK_EVENT_VIEW) ||
        (tracking.onEvent == com.adtech.Advert_2_53_3.TRACK_EVENT_INTERACTION &&
        eventName == this.rmEvent.ENGAGEMENT) ||
        (tracking.onEvent == com.adtech.Advert_2_53_3.TRACK_EVENT_SPECIFIC_EVENT &&
        tracking.eventName == eventName) ||
        (tracking.onEvent == com.adtech.Advert_2_53_3.TRACK_EVENT_INTERACTIONS_ALL &&
         eventName != this.rmEvent.INTERACTIVE_IMPRESSION &&
         eventName != this.rmEvent.ENGAGEMENT &&
         typeof event == 'object' && event.interaction)) {
      com.adtech.Utils_2_53_3.debug('Advert making third party tracking request on ' +
          'event ' + eventName);
      this.makeThirdPartyRequest(tracking);
    }
  }
}

/** @private */
com.adtech.Advert_2_53_3.prototype.thirdPartyClickTrackingCheck = function(identifier) {
  for (var i = 0; i < this.thirdPartyTracking.length; i++) {
    var tracking = this.thirdPartyTracking[i];
    if (this.clickMustMakeThirdPartyRequest(tracking, identifier) &&
        ((tracking.type == com.adtech.Advert_2_53_3.TRACK_TYPE_PIXEL) ||
          tracking.type == com.adtech.Advert_2_53_3.TRACK_TYPE_JS)) {
      this.makeThirdPartyRequest(tracking);
    }
  }
}

/**
 * @private
 */
com.adtech.Advert_2_53_3.prototype.addThirdPartyRedirectsToClickUrl = function(
    identifier, url) {
  for (var i = 0; i < this.thirdPartyTracking.length; i++) {
    var tracking = this.thirdPartyTracking[i];
    if (this.clickMustMakeThirdPartyRequest(tracking, identifier) &&
        (tracking.type == com.adtech.Advert_2_53_3.TRACK_TYPE_REDIRECT) && tracking.url) {
      url = this.replaceServerMacros(tracking.url) + escape(url);
      com.adtech.Utils_2_53_3.debug('Adding 3rd party redirect to: ' + url);
    }
  }
  return url;
}

/**
 * @private
 * @param tracking tracking object from advert JSON configuration.
 * @param identifer click identifier.
 */
com.adtech.Advert_2_53_3.prototype.clickMustMakeThirdPartyRequest =
    function(tracking, identifier) {
  if (tracking.onEvent == com.adtech.Advert_2_53_3.TRACK_EVENT_CLICKS_ALL ||
      tracking.onEvent == com.adtech.Advert_2_53_3.TRACK_EVENT_ALL ||
      (tracking.onEvent == com.adtech.Advert_2_53_3.TRACK_EVENT_SPECIFIC_CLICK &&
      tracking.eventName == identifier)) {
    return true;
  }
  return false;
}

/**
 * @private
 * Makes a third party pixel or JS request.
 */
com.adtech.Advert_2_53_3.prototype.makeThirdPartyRequest = function(thirdPartyObject) {
  var url = '';
  if (this.adServerVars.servingProto == 'https' && thirdPartyObject.secureUrl) {
    url = thirdPartyObject.secureUrl;
  } else {
    url = (thirdPartyObject.url) ? thirdPartyObject.url : thirdPartyObject.secureUrl;
  }
  if (!url) {
    return;
  }
  url = this.replaceServerMacros(url);
  switch(thirdPartyObject.type) {
    case com.adtech.Advert_2_53_3.TRACK_TYPE_PIXEL:
      this.thirdPartyPixelLog(url);
      break;
    case com.adtech.Advert_2_53_3.TRACK_TYPE_JS:
      com.adtech.Utils_2_53_3.requestJs(url);
      break;
  }
}

/**
 * @private
 *
 * Checks tagVars for any actionable properties.
 */
com.adtech.Advert_2_53_3.prototype.processTagVars = function() {
  for (var key in this.tagVars) {
    if (this.tagVars.hasOwnProperty(key)) {
      switch (key) {
        case com.adtech.Advert_2_53_3.BUYSIGHT_KEY:
          this.applyTrackingIdsToTagData(key);
          this.processBuysightData(this.tagVars[key]);
          break;
        default:
          if (this.tagVarsPropertyMap.hasOwnProperty(key)) {
            this[this.tagVarsPropertyMap[key]] = this.tagVars[key];
          }
      }
    }
  }
  // Alter segment IDs to always be an array.
  if (typeof this.segmentIds == 'string') {
    // TODO: Ad.com segment IDs only returns one value for now. This delimeter
    // does not exist, but we will log segment IDs as an array.
    this.segmentIds = this.segmentIds.split(',');
  }
}

/**
 * @private
 * Processes the dynamic content:
 *  - Expands the relevant macros inside the content.
 *  - Processes the rendition object if detected.
 *
 * @param dynamicContentProperties The dynamic content.
 */
com.adtech.Advert_2_53_3.prototype.processContent = function(contentProperties) {
  com.adtech.Utils_2_53_3.forEach(contentProperties, function(prop, content) {
    if (com.adtech.Utils_2_53_3.isArray(content)) {
      for (var i = 0; i < content.length; i++) {
        this.processContent(content[i]);
      }
    } else if (typeof content == 'object') {
      if (content.typeId) {
        contentProperties[prop] =
            com.adtech.ContentRenditionProcessor_2_53_3.processAssets(content,
                this.assetContainers.main.contentType, this.adServerVars.servingProto);
        if (typeof contentProperties[prop] == 'string') {
          // TODO: This all needs a refactor!
          contentProperties[prop] =
              com.adtech.Utils_2_53_3.replaceTokens(contentProperties[prop], this.macroMap);
        }
      } else {
        this.processContent(content);
      }
    } else if (typeof content == 'string') {
      contentProperties[prop] =
          com.adtech.Utils_2_53_3.replaceTokens(content, this.macroMap);
    }
  }, this);

}

/**
 * @private
 * Applies the dynamic content to the contentProperties.
 */
com.adtech.Advert_2_53_3.prototype.applyDynamicContent = function(dynamicContentProperties) {
  for (var key in this.contentProperties) {
    if (this.contentProperties.hasOwnProperty(key) &&
        dynamicContentProperties.hasOwnProperty(key)) {
      var contentType = typeof this.contentProperties[key];
      switch (contentType) {
        case 'string':
        case 'number':
        case 'boolean':
          this.contentProperties[key] =
            com.adtech.ContentRenditionProcessor_2_53_3.getRenditionValue(
                dynamicContentProperties[key], this.contentProperties[key]);
          break;
        case 'object':
          // objects are treated as packages. 'packages' always return arrays.
          if (com.adtech.Utils_2_53_3.isArray(this.contentProperties[key])) {
            for (var i = 0; i < dynamicContentProperties[key].length; i++) {
              if (typeof this.contentProperties[key][i] == 'undefined') {
                // If the item doesn't exist on the collection
                // create new item based on the first item.
                this.contentProperties[key][i] = com.adtech.Utils_2_53_3.clone(
                    this.contentProperties[key][0]);
              }
              com.adtech.Utils_2_53_3.forEach(dynamicContentProperties[key][i], function(itemKey) {
                this.contentProperties[key][i][itemKey] =
                    com.adtech.ContentRenditionProcessor_2_53_3.getRenditionValue(
                        dynamicContentProperties[key][i][itemKey],
                        this.contentProperties[key][i][itemKey]);
              }, this);
            }
          } else {
            // Content property is a group: Merge all processed rendition properties.
            com.adtech.Utils_2_53_3.forEach(dynamicContentProperties[key][0], function(itemKey) {
              this.contentProperties[key][itemKey] =
                  com.adtech.ContentRenditionProcessor_2_53_3.getRenditionValue(
                      dynamicContentProperties[key][0][itemKey], this.contentProperties[key][itemKey]);
            }, this);
          }
          break;
      }
    }
  }
}

/**
 * @private
 *
 * Applies tracking ids to tag data and copies over to contentProperties
 */
com.adtech.Advert_2_53_3.prototype.applyTrackingIdsToTagData = function(tagVarKey) {
  var tagData = this.tagVars[tagVarKey];
  try {
    for (var key in this.contentProperties) {
      if (com.adtech.Utils_2_53_3.isArray(this.contentProperties[key]) &&
          tagData.hasOwnProperty(key) && com.adtech.Utils_2_53_3.isArray(tagData[key])) {
        for (var i = 0; i < this.contentProperties[key].length; i++) {
          tagData[key][i][com.adtech.Advert_2_53_3.CONTENT_PROPERTY_TRACKING_KEY] =
            this.contentProperties[key][i][com.adtech.Advert_2_53_3.CONTENT_PROPERTY_TRACKING_KEY];
          if (this.contentProperties[key][i][com.adtech.Advert_2_53_3.CONTENT_PROPERTY_PARENT_TRACKING_KEY]) {
            tagData[key][i][com.adtech.Advert_2_53_3.CONTENT_PROPERTY_PARENT_TRACKING_KEY] =
              this.contentProperties[key][i][com.adtech.Advert_2_53_3.CONTENT_PROPERTY_PARENT_TRACKING_KEY];
          }
        }
      }
    }
    for (var key in tagData) {
      if (tagData.hasOwnProperty(key)) {
        this.contentProperties[key] = tagData[key];
      }
    }
  } catch (e) {
    this.contentProperties[tagVarKey] = tagData;
    com.adtech.Utils_2_53_3.debug('Tag variable "' + tagVarKey +
        '" is not a valid plain object and processed to contentProperties without tracking ids.');
  }
}

/** @private */
com.adtech.Advert_2_53_3.prototype.processBuysightData = function(remoteData) {
  this.isBuySightAd = true;
  var firstItem = remoteData.items[0];
  if (remoteData.status !== '1' && this.canRenderRich) {
    try {
      for (var i = 0; i < remoteData.items.length; i++) {
        var clickthroughKey = 'items' + com.adtech.Advert_2_53_3.CONTENT_SEPARATOR +
            remoteData.items[i][com.adtech.Advert_2_53_3.CONTENT_PROPERTY_TRACKING_KEY] +
            com.adtech.Advert_2_53_3.CONTENT_SEPARATOR + 'landingUrl';
        if (this.clickthroughs[clickthroughKey]) {
          this.clickthroughs[clickthroughKey].dest = remoteData.items[i].landingUrl;
        }
      }
      this.clickthroughs[com.adtech.Advert_2_53_3.DEFAULT_CLICK].dest =
        (remoteData.fallbackClickUrl) ? remoteData.fallbackClickUrl : firstItem.landingUrl;
      this.addToThirdPartyTracking(firstItem.impressionUrl,
          com.adtech.Advert_2_53_3.TRACK_TYPE_PIXEL,
          com.adtech.Advert_2_53_3.TRACK_EVENT_VIEW);
      for (var key in remoteData.customEvents) {
        if (remoteData.customEvents.hasOwnProperty(key)) {
          var customEventTracking = (com.adtech.Utils_2_53_3.isArray(remoteData.customEvents[key])) ?
              remoteData.customEvents[key] : [remoteData.customEvents[key]];
        }
        for (var i = 0; i < customEventTracking.length; i++) {
          this.addToThirdPartyTracking(
              customEventTracking[i],
              com.adtech.Advert_2_53_3.TRACK_TYPE_PIXEL,
              com.adtech.Advert_2_53_3.TRACK_EVENT_SPECIFIC_EVENT,
              key);
        }
      }
    } catch (e) {
      this.renderBuysightFallback(remoteData);
      if (window.console) {
        console.error('buysightDataKey could not be processed! Fallback rendered.');
      }
      return;
    }
  } else {
    // Buysight server could not return full dynamic data, or no flash support from client.
    this.renderBuysightFallback(remoteData);
  }
  // Third party impressions urls.
  for (var i = 0; i < firstItem.itUrls.length; i++) {
    this.addToThirdPartyTracking(firstItem.itUrls[i],
        com.adtech.Advert_2_53_3.TRACK_TYPE_PIXEL,
        com.adtech.Advert_2_53_3.TRACK_EVENT_VIEW);
  }
}

/** @private
 *
 * Expand the clk and ct from DCO and add them to the third party tracking on the backup click.
 * @param remoteData The data containing the key values from DCO.
 * @param dcoKey The key from the DCO to be processed.
 */
com.adtech.Advert_2_53_3.prototype.processDCOKvsTagVar = function(remoteData, dcoKey) {
  if (remoteData && remoteData[com.adtech.DCODataLoader_2_53_3.TAGVAR_PRODUCT_ID_LIST]
      && remoteData[com.adtech.DCODataLoader_2_53_3.TAGVAR_PRODUCT_CATEGORY]) {
    var dcoTokenMap = {};
    dcoTokenMap[com.adtech.DCODataLoader_2_53_3.TAGVAR_MACRO_PRODUCT_ID] =
        remoteData[com.adtech.DCODataLoader_2_53_3.TAGVAR_PRODUCT_ID_LIST].split('/')[0];
    dcoTokenMap[com.adtech.DCODataLoader_2_53_3.TAGVAR_MACRO_PRODUCT_CATEGORY] =
        remoteData[com.adtech.DCODataLoader_2_53_3.TAGVAR_PRODUCT_CATEGORY];
    switch (dcoKey) {
      case com.adtech.DCODataLoader_2_53_3.TAGVAR_REDIRECT:
        this.addToThirdPartyTracking(
            com.adtech.Utils_2_53_3.replaceTokens(remoteData[dcoKey], dcoTokenMap),
            com.adtech.Advert_2_53_3.TRACK_TYPE_REDIRECT,
            com.adtech.Advert_2_53_3.TRACK_EVENT_SPECIFIC_CLICK,
            com.adtech.Advert_2_53_3.BACKUP_CLICK);
        break;
      case com.adtech.DCODataLoader_2_53_3.TAGVAR_CLICK_TRACKER:
        this.addToThirdPartyTracking(
            com.adtech.Utils_2_53_3.replaceTokens(remoteData[dcoKey], dcoTokenMap),
            com.adtech.Advert_2_53_3.TRACK_TYPE_PIXEL,
            com.adtech.Advert_2_53_3.TRACK_EVENT_SPECIFIC_CLICK,
            com.adtech.Advert_2_53_3.DEFAULT_CLICK);
    }
  }
}


/**
 * @private
 *
 * Invoked when the remote data from the BuySite adserver returns an error.
 * Advert should render a backup image in this case.
 */
com.adtech.Advert_2_53_3.prototype.renderBuysightFallback = function(remoteData) {
  var firstItemClickUrls = remoteData.items[0].ctUrls;
  for (var i = 0; i < firstItemClickUrls.length; i++) {
    this.addToThirdPartyTracking(firstItemClickUrls[i],
        com.adtech.Advert_2_53_3.TRACK_TYPE_PIXEL,
        com.adtech.Advert_2_53_3.TRACK_EVENT_CLICKS_ALL);
  }
  this.fallback = remoteData.fallbackImageUrl;
  this.clickthroughs[com.adtech.Advert_2_53_3.DEFAULT_CLICK].dest =
      (remoteData.fallbackClickUrl) ? remoteData.fallbackClickUrl : remoteData.items[0].landingUrl;
  var fallbackImpUrl = (remoteData.fallbackImpressionUrl) ?
      remoteData.fallbackImpressionUrl : remoteData.items[0].impressionUrl;
  this.addToThirdPartyTracking(fallbackImpUrl, com.adtech.Advert_2_53_3.TRACK_TYPE_PIXEL,
      com.adtech.Advert_2_53_3.TRACK_EVENT_VIEW);
  this.forceRenderBackup = true;
}

/** @private */
com.adtech.Advert_2_53_3.prototype.requestBuySightThirdPartyClickPixels = function(identifier) {
  if (identifier.indexOf(com.adtech.Advert_2_53_3.CONTENT_SEPARATOR) > 0) {
    // Figure out tracking key value.
    var identifierBits = identifier.split(com.adtech.Advert_2_53_3.CONTENT_SEPARATOR);
    if (identifierBits.length >= 3) {
      // Format: contentName SEP trackingKey SEP clickName.
      var trackingKey = identifierBits[identifierBits.length - 2];
      var items = this.getContent('items');
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item[com.adtech.Advert_2_53_3.CONTENT_PROPERTY_TRACKING_KEY] == trackingKey) {
          for (var j = 0; j < item.ctUrls.length; j++) {
            this.thirdPartyPixelLog(item.ctUrls[j]);
          }
          break;
        }
      }
    }
  }
}

/** @private */
com.adtech.Advert_2_53_3.prototype.addToThirdPartyTracking =
    function(url, type, onEvent, eventName) {
  var thirdPartyTrackingItem = {"url": url, "type": type,
                                "onEvent": onEvent, "eventName": eventName};
  this.thirdPartyTracking.push(thirdPartyTrackingItem);
}

/** @private */
com.adtech.Advert_2_53_3.prototype.setMacroMap = function() {
  this.macroMap[com.adtech.Advert_2_53_3.MACRO_AD_TIME] = this.adServerVars.uid;
  this.macroMap[com.adtech.Advert_2_53_3.MACRO_ASSET] =
      (this.servicesHosts) ? this.servicesHosts[this.adServerVars.servingProto] : '';
  var tagTrackingMacros = this.tagVars[com.adtech.Advert_2_53_3.CONFIG_TRACKING_MACROS_KEY];
  if (typeof tagTrackingMacros == 'object') {
    for (var macro in tagTrackingMacros) {
      if (tagTrackingMacros.hasOwnProperty(macro)) {
        this.macroMap['##' + macro + '##'] = tagTrackingMacros[macro];
      }
    }
  }
}

/**
 * @private
 * Replaces any ADTECH ad server variable macros with the actual value, defined at serve time.
 */
com.adtech.Advert_2_53_3.prototype.replaceServerMacros = function(url) {
  for (var key in this.macroMap) {
    if (this.macroMap.hasOwnProperty(key)) {
      var macroRegExp = new RegExp(key, 'g');
      url = url.replace(macroRegExp, this.macroMap[key]);
    }
  }
  var timestampRegExp = new RegExp(com.adtech.Advert_2_53_3.MACRO_TIMESTAMP, 'g');
  return url.replace(timestampRegExp, +new Date());
}

/** @private */
com.adtech.Advert_2_53_3.prototype.thirdPartyPixelLog = function(url) {
  if (/^http(s)?:\/\//i.test(url)) {
    var eventObj = this.generateReportEvent().property('thirdPartyUrl', url)
        .property('category', this.rmEvent.THIRD_PARTY);
    this.dispatchEvent(eventObj);
  }
}

/**
 * @private
 *
 * Checks to see if the inpage unit anchordiv is still in the DOM. If not, close all other
 * assetContainers.
 */
com.adtech.Advert_2_53_3.prototype.checkInPageUnit = function() {
  if (!this.getAssetContainer('main').anchorDiv.parentNode) {
    // The node is not attached to the document, assume it has been removed by the publisher.
    clearInterval(this.inpageUnitCheckInterval);
    this.close();
  }
}

/** @private */
com.adtech.Advert_2_53_3.prototype.checkVisibleContainerCount = function() {
  var visibleCount = 0;
  for (var id in this.assetContainers) {
    if (this.assetContainers.hasOwnProperty(id)) {
      var adContainerEvent = new this.rmEvent(this.rmEvent.VIEWABLE_CHANGE);
      if (this.assetContainers[id].visibleinViewport && !this.assetContainers[id].closed) {
        visibleCount++;
        adContainerEvent.property('viewable', this.windowInFocus);
      } else {
        adContainerEvent.property('viewable', false);
      }
      adContainerEvent.
          property('containerId', id).
          property('availableHeight', this.assetContainers[id].contentHeight).
          property('availableWidth', this.assetContainers[id].contentWidth);
      this.assetContainers[id].dispatchEvent(adContainerEvent);
    }
  }
  if (visibleCount && this.windowInFocus) {
    this.eventBus.dispatchEvent(this.rmEvent.IN_VIEWPORT);
    this.startViewTimer();
  } else {
    this.eventBus.dispatchEvent(this.rmEvent.OUT_VIEWPORT);
    this.stopViewTimer();
  }
}

/** @private */
com.adtech.Advert_2_53_3.prototype.setTouchDeviceProperties = function() {
  this.isTouchDevice = true;
  this.qualifiedRolloverHandler();
}

/** @private */
com.adtech.Advert_2_53_3.prototype.setDebugOverrides = function() {
  if (this.debugMode) {
    var overrideAssetBasePath =
        com.adtech.Utils_2_53_3.getQueryStringValue('canvasAssetBasePath');
    if (overrideAssetBasePath) {
      this.adServerVars.assetBaseURL = 'http://localhost/' + overrideAssetBasePath + '/';
    }
  }
}

/** @private **/
com.adtech.Advert_2_53_3.prototype.flushInteractionEventBuffer = function() {
  com.adtech.Utils_2_53_3.debug('Flushing out interaction event buffer.');
  this.interactionEventBuffer = [];
}

/** @private */
com.adtech.Advert_2_53_3.prototype.flushMouseOverEventTimers = function() {
  this.logTimerValue(com.adtech.Advert_2_53_3.ENGAGEMENT_TIMER);
  if (this.userHasInteracted && this.getPlayingVideosCount() === 0) {
    this.logTimerValue(com.adtech.Advert_2_53_3.INTERACTION_TIMER);
  }
}

/** @private */
com.adtech.Advert_2_53_3.prototype.addToPlayingVideos = function(videoViewTimerName,
    containerId) {
  if (!com.adtech.Utils_2_53_3.inArray(videoViewTimerName, this.playingVideos[containerId])) {
    com.adtech.Utils_2_53_3.debug('Adding ' + videoViewTimerName + ' to playingVideos for ' + containerId);
    this.playingVideos[containerId].push(videoViewTimerName);
    this.startTimer(videoViewTimerName);
  }
}

/** @private */
com.adtech.Advert_2_53_3.prototype.removeFromPlayingVideos = function(videoViewTimerName,
    containerId) {
  for (var i = 0; i < this.playingVideos[containerId].length; i++) {
    if (this.playingVideos[containerId][i] === videoViewTimerName) {
      com.adtech.Utils_2_53_3.debug('Removing ' + videoViewTimerName + ' from playingVideos for ' + containerId);
      this.playingVideos[containerId].splice(i, 1);
      this.logTimerValue(videoViewTimerName);
      break;
    }
  }
  if (this.getPlayingVideosCount() === 0 && this.containerMouseOverCount === 0) {
    // Video stops playing when mouse is off unit. Stop interaction timer.
    this.logTimerValue(com.adtech.Advert_2_53_3.INTERACTION_TIMER);
  }
}

/** @private */
com.adtech.Advert_2_53_3.prototype.removeAllPlayingVideosFromContainer = function(
    containerId) {
  // Only stop the video timer IF the same timer is not present in a different container.
  var allRunningVideosTimers = [];
  var duplicateVideoTimers = [];
  for (var contId in this.playingVideos) {
    if (this.playingVideos.hasOwnProperty(contId)) {
      for (var i = 0; i < this.playingVideos[contId]; i++) {
        if (com.adtech.Utils_2_53_3.inArray(
            this.playingVideos[contId][i], allRunningVideosIds)) {
          duplicateVideoTimers.push(this.playingVideos[contId][i]);
        }
        allRunningVideosTimers.push(this.playingVideos[contId][i]);
      }
    }
  }
  for (var k = 0; k < this.playingVideos[containerId].length; k++) {
    var videoViewTimerName = this.playingVideos[containerId][k];
    if (!com.adtech.Utils_2_53_3.inArray(videoViewTimerName, duplicateVideoTimers)) {
      this.removeFromPlayingVideos(videoViewTimerName, containerId);
    }
  }
  // Remove all timer IDs associated to the container.
  this.playingVideos[containerId] = [];
}

/** @private */
com.adtech.Advert_2_53_3.prototype.getPlayingVideosCount = function() {
  var count = 0;
  for (var containerId in this.playingVideos) {
    if (this.playingVideos.hasOwnProperty(containerId)) {
      count += this.playingVideos[containerId].length;
    }
  }
  return count;
}

/** @private*/
com.adtech.Advert_2_53_3.prototype.checkContainersExpansionState = function() {
  for (var id in this.assetContainers) {
    if (this.assetContainers.hasOwnProperty(id)) {
      if (!this.assetContainers[id].closed &&
          this.assetContainers[id].isExpanded) {
        // Any container not closed and expanded? Ensure the timer is running.
        this.startTimer(com.adtech.Advert_2_53_3.EXPANSION_TIMER);
        return;
      }
    }
  }
  this.logTimerValue(com.adtech.Advert_2_53_3.EXPANSION_TIMER);
}

/** @private */
com.adtech.Advert_2_53_3.prototype.extractDCOMetaFromEvent = function(metaObject,
    dcoEventObject) {
  if (metaObject && typeof metaObject.__mouseX == 'number' &&
      typeof metaObject.__mouseY == 'number') {
    dcoEventObject['x'] = metaObject.__mouseX;
    dcoEventObject['y'] = metaObject.__mouseY;
  }
}

/** @private */
com.adtech.Advert_2_53_3.prototype.createDCOEvent = function(eventType, props) {
    var IMPTID = com.adtech.DCODataLoader_2_53_3.TAGVAR_IMPRESSION_ID;
    var dcoEvent = this.generateReportEvent().
        property('dcoType', eventType).
        property('dcoEventData', this.dcoEventData || {}).
        property('formatId', this.formatId).
        property('productFamilyId', this.productFamilyId).
        property('templateId', this.templateId).
        property('regionId', this.adServerVars.regionId).
        property('advertiserId', this.adServerVars.advertiserId).
        property('campaignId', this.adServerVars.campaignId).
        property('publisherId', this.adServerVars.publisherId).
        property('regionId', this.adServerVars.regionId).
        property('sectionId', this.adServerVars.pageId).
        property('bannerId', this.adServerVars.bannerId).
        property('width', this.getAssetContainer('main').width).
        property('height', this.getAssetContainer('main').height).
        property(IMPTID, this.tagVars[IMPTID]).
        property('eventEndpoint', this.dcoConfig.eventEndpoint);
    for (var prop in props) {
      if (props.hasOwnProperty(prop)) {
        dcoEvent.property(prop, props[prop]);
      }
    }
    return dcoEvent;
}

/** @private */
com.adtech.Advert_2_53_3.prototype.reportDCOEvent = function(eventType, props) {
  if (typeof this.dcoEventRecordGenerator != 'undefined') {
    var dcoEvent = this.createDCOEvent(eventType, props);
    this.dispatchEvent(this.dcoEventRecordGenerator.generateDCOData(dcoEvent));
  }
}

/** @private **/
com.adtech.Advert_2_53_3.prototype.addDCOEventProperties = function(eventObject,
    eventProperties) {
  eventProperties = eventProperties || {};
  if (eventObject.hasOwnProperty('plid')) {
    eventProperties['plid'] = eventObject.plid;
  }
  return eventProperties;
}

// Event handlers follow.

/**
 * @private
 *
 * Handles the events that indicates if an asset container is hidden from view or re-displayed
 * after it has been rendered.
 */
com.adtech.Advert_2_53_3.prototype.containerViewHandler = function(event) {
  if (this.canMeasureViewExposure) {
    this.checkVisibleContainerCount();
  }
}

/**
 * @private
 *
 * Handles the events that indicates when focus changed on the main display window.
 */
com.adtech.Advert_2_53_3.prototype.windowFocusEventHandler = function(event) {
  this.windowInFocus = event.target.windowInFocus;
  this.checkVisibleContainerCount();
}

/** @private */
com.adtech.Advert_2_53_3.prototype.windowScrollEventHandler = function(event) {
  // If the window is scrolled force set focus property to true.
  this.windowInFocus = event.target.windowInFocus = true;
}

/** @private */
com.adtech.Advert_2_53_3.prototype.touchStartHandler = function() {
  this.setTouchDeviceProperties();
}

/**
 * @private
 *
 * Invoked when an asset container instance is closed.
 */
com.adtech.Advert_2_53_3.prototype.containerCloseHandler = function(event) {
  com.adtech.Utils_2_53_3.debug('container close handler invoked');
  this.removeAllPlayingVideosFromContainer(event.target.id);
  this.checkContainersExpansionState();
  for (var id in this.assetContainers) {
    if (this.assetContainers.hasOwnProperty(id)) {
      if (!this.assetContainers[id].closed) {
        return;
      }
    }
  }
  this.flushTimers();
}

com.adtech.Advert_2_53_3.prototype.containerHideHandler = function(event) {
  com.adtech.Utils_2_53_3.debug('container hide handler invoked');
  this.removeAllPlayingVideosFromContainer(event.target.id);
}

/** @private */
com.adtech.Advert_2_53_3.prototype.mouseOverEventHandler = function(event) {
  if (this.containerMouseOverCount === 0) {
    var self = this;
    if (this.interactionEventBufferFlushTimer) {
      clearTimeout(this.interactionEventBufferFlushTimer);
    }
    if (this.flushMouseOverEventsTimeout) {
      clearTimeout(this.flushMouseOverEventsTimeout);
    }
    this.engagementCheckTimer = setTimeout(function() {
          self.startEngagementTimer();
        }, this.engagementThreshold);

    this.qualifiedRolloverEventTimer = setTimeout(function() {
          self.qualifiedRolloverHandler();
        }, this.qualifiedRolloverThreshold);
  }
  this.containerMouseOverCount++;
}

/** @private */
com.adtech.Advert_2_53_3.prototype.mouseOutEventHandler = function(event) {
  if (this.containerMouseOverCount === 1) {
    var self = this;
    if (this.engagementCheckTimer) {
      this.stopTimer(com.adtech.Advert_2_53_3.ENGAGEMENT_TIMER);
      clearTimeout(this.engagementCheckTimer);
    }
    if (this.qualifiedRolloverEventTimer) {
      clearTimeout(this.qualifiedRolloverEventTimer);
    }
    this.flushMouseOverEventsTimeout = setTimeout(function() {
      self.flushMouseOverEventTimers();
    }, com.adtech.Advert_2_53_3.MOUSE_OVER_TIMERS_FLUSH_TIMEOUT);
    if (!this.hasQualifiedRollover) {
      // Flush the interaction event buffer half a second after the mouse has left the last
      // container. This ensures that all events dispatched from the Flash movie, make into the
      // buffer, prior to the flush.
      this.interactionEventBufferFlushTimer = setTimeout(function() {
            self.flushInteractionEventBuffer();
          }, 500);
    }
  }
  this.containerMouseOverCount--;
}

/** @private */
com.adtech.Advert_2_53_3.prototype.qualifiedRolloverHandler = function() {
  com.adtech.Utils_2_53_3.debug('Qualified rollover');
  this.hasQualifiedRollover = true;
  while (this.interactionEventBuffer.length > 0) {
    this.reportEvent(this.interactionEventBuffer.shift());
  }
  if (this.userHasInteracted) {
    this.startTimer(com.adtech.Advert_2_53_3.INTERACTION_TIMER);
  } else {
    this.interactionStartTime = new Date().getTime() - this.qualifiedRolloverThreshold;
  }
}

/**
 * @private
 *
 * Invoked when the backup image has been rendered.
 */
com.adtech.Advert_2_53_3.prototype.backupImageRenderEventHandler = function(event) {
  if (!this.rendered) {
    this.rendered = true;
    this.reportEvent(this.rmEvent.BACKUP_VIEW);
    this.logViewabilityAvailability();
  }
}

/** @private*/
com.adtech.Advert_2_53_3.prototype.containerExpansionStateChangeHandler =
    function(event) {
  this.checkContainersExpansionState();
}

/**
 * @private
 *
 * Invoked when the first AssetContainer has rendered. Used to report the view event
 * back to the Ad Server.
 */
com.adtech.Advert_2_53_3.prototype.renderEventHandler = function(event) {
  if (!this.rendered) {
    this.rendered = true;
    var self = this;
    for (var id in this.assetContainers) {
      if (this.assetContainers.hasOwnProperty(id)) {
        this.assetContainers[id].removeEventListener(this.rmEvent.RENDER,
            this.renderEventHandler, this);
      }
    }
    this.dispatchEvent(this.rmEvent.RENDER);
    this.logViewabilityAvailability();
    // View timer is started by the container dispatching a IN_VIEWPORT event.
    this.startTimer(com.adtech.Advert_2_53_3.DISPLAY_TIMER);
    this.checkContainersExpansionState();
    // TODO(samuel.adu): Do I have to worry about DOM load here? This event can be dispatched for
    // various reasons, document.write etc. Read more.
    com.adtech.Utils_2_53_3.registerNativeEventHandler(window, 'beforeunload',
        com.adtech.Utils_2_53_3.createClosure(this, this.flushTimers));
    /*
     * The following code is included to deal with publishers reloading iframes in an AJAX
     * environment. The interval handler checks on the status of the main container div, IF
     * it is an inpage div only. When removed, all other containers must be closed. We are
     * to assume that the publisher cleared out the containing node, so we must clean up any
     * possible containers that are not children of the containing node.
     */
    var mainContainer = this.getAssetContainer('main');
    if (mainContainer && (mainContainer instanceof com.adtech.DivContainer_2_53_3) &&
        !(typeof com.adtech.FloatingDivContainer_2_53_3 != 'undefined' &&
            mainContainer instanceof com.adtech.FloatingDivContainer_2_53_3)) {
      var assetContainerCount = 0;
      for (var id in this.assetContainers) {
        if (this.assetContainers.hasOwnProperty(id)) {
          assetContainerCount++;
        }
      }
      if (assetContainerCount > 1) {
        // The advert is an in-page with additional containers.
        this.inpageUnitCheckInterval = setInterval(function() {
          self.checkInPageUnit();
          }, com.adtech.Advert_2_53_3.INPAGE_UNIT_CHECK_INTERVAL);
      }
    }
  }
}

/**
 * @private
 *
 * Handles all video events dispatched by the event bus in order to manage the video view timer.
 */
com.adtech.Advert_2_53_3.prototype.videoEventHandler = function(event) {
  for (var i = 0; i < this.videoReportingIdentifiers.length; i++) {
    var reportingIdentifier = this.videoReportingIdentifiers[i];
    var videoViewTimerName = reportingIdentifier + com.adtech.Advert_2_53_3.VIDEO_EVENT_VIEW;
    var sourceContainerId = (event.target instanceof com.adtech.HtmlContent_2_53_3) ?
        event.target.parent.id : event.target.id;
    var videoTimer = this.getTimer(videoViewTimerName);
    var eventDcoData = {
      'name': event.type,
      'duration': '',
      'percentage': (videoTimer) ? videoTimer.meta.percentage || '0' : '0',
      'contentTypeId': com.adtech.ContentRenditionProcessor_2_53_3.TYPE_ID_VIDEO
    };
    var videoEvent = {};
    for (var j = 0; j < this.events.length; j++) {
      if (this.events[j].name == event.type) {
        videoEvent = this.events[j]
      }
    }
    this.addDCOEventProperties(videoEvent, eventDcoData);
    switch (event.type) {
      case reportingIdentifier + com.adtech.Advert_2_53_3.VIDEO_BUFFERING_EVENT:
        this.stopTimer(videoViewTimerName);
        break;
      case reportingIdentifier + com.adtech.Advert_2_53_3.VIDEO_BUFFERING_END_EVENT:
        this.startTimer(videoViewTimerName);
        break;
      case reportingIdentifier + com.adtech.Advert_2_53_3.VIDEO_FIRST_QUARTILE:
        eventDcoData.percentage = '25';
        this.reportDCOEvent(com.adtech.DCOEventRecordGenerator_2_53_3.CONTENT_DURATION,
            eventDcoData);
        break;
      case reportingIdentifier + com.adtech.Advert_2_53_3.VIDEO_MIDPOINT:
        eventDcoData.percentage = '50';
        this.reportDCOEvent(com.adtech.DCOEventRecordGenerator_2_53_3.CONTENT_DURATION,
            eventDcoData);
        break;
      case reportingIdentifier + com.adtech.Advert_2_53_3.VIDEO_THIRD_QUARTILE:
        eventDcoData.percentage = '75';
        this.reportDCOEvent(com.adtech.DCOEventRecordGenerator_2_53_3.CONTENT_DURATION,
            eventDcoData);
        break;
      case reportingIdentifier + com.adtech.Advert_2_53_3.VIDEO_EVENT_START:
        this.reportEvent(new this.rmEvent(this.rmEvent.VIDEO_IMPRESSION).
            property('forceLog', true));
        this.addToPlayingVideos(videoViewTimerName, sourceContainerId);
        eventDcoData.percentage = '0';
        this.reportDCOEvent(com.adtech.DCOEventRecordGenerator_2_53_3.CONTENT_DURATION,
            eventDcoData);
        break;
      case reportingIdentifier + com.adtech.Advert_2_53_3.VIDEO_EVENT_RESUME:
        this.addToPlayingVideos(videoViewTimerName, sourceContainerId);
        break;
      case reportingIdentifier + com.adtech.Advert_2_53_3.VIDEO_EVENT_PAUSE:
        if (com.adtech.Utils_2_53_3.inArray(videoViewTimerName,
                this.playingVideos[sourceContainerId])) {
          // This property gets passed into reportEvent. See customEventHandler.
          event.forceLog = true;
        }
        this.removeFromPlayingVideos(videoViewTimerName, sourceContainerId);
        this.reportDCOEvent(com.adtech.DCOEventRecordGenerator_2_53_3.OTHER_USER_ACTION, eventDcoData);
        break;
      case reportingIdentifier + com.adtech.Advert_2_53_3.VIDEO_EVENT_MUTE:
        this.reportDCOEvent(com.adtech.DCOEventRecordGenerator_2_53_3.OTHER_USER_ACTION, eventDcoData);
        break;
      case reportingIdentifier + com.adtech.Advert_2_53_3.VIDEO_EVENT_COMPLETE:
        if (com.adtech.Utils_2_53_3.inArray(videoViewTimerName,
                this.playingVideos[sourceContainerId])) {
          // This property gets passed into reportEvent. See customEventHandler.
          event.forceLog = true;
        }
        this.removeFromPlayingVideos(videoViewTimerName, sourceContainerId);
        eventDcoData.percentage = '100';
        this.reportDCOEvent(com.adtech.DCOEventRecordGenerator_2_53_3.CONTENT_DURATION,
            eventDcoData);
        break;
    }
    if (videoTimer) {
      videoTimer.meta.percentage = eventDcoData.percentage;
    }
  }
}

/** @private */
com.adtech.Advert_2_53_3.prototype.dcoDataLoadedHandler = function(event) {
  this.dcoDataLoader = event.target;
  this.dcoEventData = event.dcoData;
  var viewPixels = event.thirdPartyTracking[com.adtech.Advert_2_53_3.TRACK_EVENT_VIEW];
  var clickPixels = event.thirdPartyTracking[com.adtech.Advert_2_53_3.TRACK_EVENT_CLICKS_ALL];
  for (var i = 0; i < viewPixels.length; i++) {
    this.thirdPartyPixelLog(viewPixels[i]);
  }
  for (var i = 0; i < clickPixels.length; i++) {
    this.addToThirdPartyTracking(clickPixels[i],
        com.adtech.Advert_2_53_3.TRACK_TYPE_PIXEL,
        com.adtech.Advert_2_53_3.TRACK_EVENT_CLICKS_ALL);
  }
  this.applyDynamicContent(event.contentProperties);
  this.processContent(this.contentProperties);
  this.dcoContentMap = event.contentMap;
  if (event.reqClickUrl) {
    this.pubVars.clickRedirect = event.reqClickUrl;
  }
  if (!this.richView) {
    if (!event.reqClickUrl) {
      this.processDCOKvsTagVar(this.tagVars[com.adtech.DCODataLoader_2_53_3.ARBITRARY_PAIRS_KEY],
          com.adtech.DCODataLoader_2_53_3.TAGVAR_REDIRECT);
    }
    if (clickPixels.length == 0) {
      this.processDCOKvsTagVar(this.tagVars[com.adtech.DCODataLoader_2_53_3.ARBITRARY_PAIRS_KEY],
          com.adtech.DCODataLoader_2_53_3.TAGVAR_CLICK_TRACKER);
    }
  }
  this.eventBus.dispatchEvent(this.rmEvent.SERVE);
}

/**
 * @private
 * Renders the backup image for inline containers if the DCO data fails to load.
 */
com.adtech.Advert_2_53_3.prototype.dcoDataErrorHandler = function(event) {
  this.richView = false;
  this.processDCOKvsTagVar(this.tagVars[com.adtech.DCODataLoader_2_53_3.ARBITRARY_PAIRS_KEY],
      com.adtech.DCODataLoader_2_53_3.TAGVAR_REDIRECT);
  this.processDCOKvsTagVar(this.tagVars[com.adtech.DCODataLoader_2_53_3.ARBITRARY_PAIRS_KEY],
      com.adtech.DCODataLoader_2_53_3.TAGVAR_CLICK_TRACKER);
  // Ensure we do not try to make DCO pixel server requests.
  this.dcoEventRecordGenerator = undefined;
  var mainContainer = this.getAssetContainer('main');
  if (mainContainer instanceof com.adtech.DivContainer_2_53_3 &&
      !(mainContainer instanceof com.adtech.FloatingDivContainer_2_53_3)) {
    mainContainer.anchorDiv.innerHTML = this.getBackupImageHTML(this.fallback);
    this.reportEvent(this.rmEvent.DCO_DATA_ERROR);
    this.reportEvent(this.rmEvent.BACKUP_VIEW);
    this.rendered = true;
    this.dispatchEvent(this.rmEvent.RENDER);
  }
}

/**
 * @private
 *
 * Custom format/advert events are handled here. Within this method we check
 * the event type against the event actions in the advert configuration to see
 * if we need to invoke an AssetContainer action on an event.
 */
com.adtech.Advert_2_53_3.prototype.customEventHandler = function(event) {
  this.reportEvent(event);
  for (var i = 0; i < this.eventActions.length; i++) {
    var action = this.eventActions[i];
    if (action.name != event.type) {
      continue;
    }
    var targetContainerId;
    var sourceContainerId = (event.target instanceof com.adtech.HtmlContent_2_53_3) ?
        event.target.parent.id : event.target.id;
    switch (action.target) {
      case com.adtech.Advert_2_53_3.ACTION_TARGET_SELF:
        targetContainerId = sourceContainerId;
        break;
      default:
        targetContainerId = action.target;
    }
    if ((action.source == com.adtech.Advert_2_53_3.ACTION_TARGET_WILDCARD ||
        action.source == sourceContainerId) ||
        (action.source == com.adtech.Advert_2_53_3.ACTION_TARGET_SELF &&
        sourceContainerId == targetContainerId)) {
      var args = (typeof event.meta == 'object') ? [event.meta] : [];
      var targetContainer = this.getAssetContainer(targetContainerId);
      targetContainer[action.action].apply(targetContainer, args);
    }
  }
}
// Copyright 2010 AOL Platforms.

/**
 * @author Pictela Support <support@pictela.com>
 *
 * Constants refactored out of Advert in order to be used by the Core class.
 */

com.adtech.Advert_2_53_3 = com.adtech.Advert_2_53_3 || function(){};

/** @private */
com.adtech.Advert_2_53_3.ENGAGEMENT_THRESHOLD = 2000;
/** @private */
com.adtech.Advert_2_53_3.QUALIFIED_ROLLOVER_THRESHOLD = 500;
/** @private */
com.adtech.Advert_2_53_3.VIEWABLE_IMPRESSION_THRESHOLD = 1000;
/** @private */
com.adtech.Advert_2_53_3.MOUSE_OVER_TIMERS_FLUSH_TIMEOUT = 1000;
/** @private */
com.adtech.Advert_2_53_3.TIMER_LOGGING_THRESHOLD = 900000;
/** @private */
com.adtech.Advert_2_53_3.INPAGE_UNIT_CHECK_INTERVAL = 1000;
/** @private */
com.adtech.Advert_2_53_3.TRACK_TYPE_PIXEL = '1_PIXEL';
/** @private */
com.adtech.Advert_2_53_3.TRACK_TYPE_JS = 'JS_URL';
/** @private */
com.adtech.Advert_2_53_3.TRACK_TYPE_REDIRECT = 'REDIRECT_URL';
/** @private */
com.adtech.Advert_2_53_3.TRACK_EVENT_VIEW = 'VIEW';
/** @private */
com.adtech.Advert_2_53_3.TRACK_EVENT_INTERACTION = 'INTERACTION';
/** @private */
com.adtech.Advert_2_53_3.TRACK_EVENT_SPECIFIC_EVENT = 'SPECIFIC_EVENT';
/** @private */
com.adtech.Advert_2_53_3.TRACK_EVENT_SPECIFIC_CLICK = 'SPECIFIC_CLICK';
/** @private */
com.adtech.Advert_2_53_3.TRACK_EVENT_CLICKS_ALL = 'CLICKS_ALL';
/** @private */
com.adtech.Advert_2_53_3.TRACK_EVENT_ALL = 'EVENTS_ALL';
/** @private */
com.adtech.Advert_2_53_3.TRACK_EVENT_INTERACTIONS_ALL = 'INTERACTIONS_ALL';
/** @private */
com.adtech.Advert_2_53_3.DISPLAY_TIMER = 'displayTimer';
/** @private */
com.adtech.Advert_2_53_3.VIEW_TIMER = 'viewTimer';
/** @private */
com.adtech.Advert_2_53_3.ENGAGEMENT_TIMER = 'engagementTimer';
/** @private */
com.adtech.Advert_2_53_3.INTERACTION_TIMER = 'interactionTimer';
/** @private */
com.adtech.Advert_2_53_3.EXPANSION_TIMER = 'expansionTimer';
/** @private */
com.adtech.Advert_2_53_3.DEFAULT_CLICK = 'default';
/** @private */
com.adtech.Advert_2_53_3.BACKUP_CLICK = 'backupImageClickthrough';
/** @private */
com.adtech.Advert_2_53_3.ALT_TEXT_VARIABLE_KEY = 'Backup Alt Text';
/** @private */
com.adtech.Advert_2_53_3.ACTION_TARGET_SELF = 'self';
/** @private */
com.adtech.Advert_2_53_3.ACTION_TARGET_WILDCARD = '*';
/** @private */
com.adtech.Advert_2_53_3.MACRO_AD_TIME = '_ADTIME_';
/** @private */
com.adtech.Advert_2_53_3.MACRO_TIMESTAMP = '_TIMESTAMP_';
/** @private */
com.adtech.Advert_2_53_3.MACRO_ASSET = '_ASSETSHOST_';
/** @private */
com.adtech.Advert_2_53_3.CONFIG_TRACKING_MACROS_KEY = 'trackingMacros';
/** @private */
com.adtech.Advert_2_53_3.BUYSIGHT_KEY = 'buysightDataKey';
/** @private */
com.adtech.Advert_2_53_3.CONTENT_SEPARATOR = ': ';
/** @private */
com.adtech.Advert_2_53_3.CONTENT_PROPERTY_TRACKING_KEY = 'Tracking Id';
/** @private */
com.adtech.Advert_2_53_3.CONTENT_PROPERTY_PARENT_TRACKING_KEY = 'Parent Tracking Id';
/** @private */
com.adtech.Advert_2_53_3.VIDEO_EVENT_VIEW = 'Video View';
/** @private */
com.adtech.Advert_2_53_3.VIDEO_EVENT_START = 'Video Start';
/** @private */
com.adtech.Advert_2_53_3.VIDEO_EVENT_RESUME = 'Video Resume';
/** @private */
com.adtech.Advert_2_53_3.VIDEO_EVENT_REPLAY = 'Video Replay';
/** @private */
com.adtech.Advert_2_53_3.VIDEO_EVENT_PAUSE = 'Video Pause';
/** @private */
com.adtech.Advert_2_53_3.VIDEO_EVENT_PLAY = 'Video Play';
/** @private */
com.adtech.Advert_2_53_3.VIDEO_FIRST_QUARTILE = 'Video First Quartile';
/** @private */
com.adtech.Advert_2_53_3.VIDEO_MIDPOINT = 'Video Midpoint';
/** @private */
com.adtech.Advert_2_53_3.VIDEO_THIRD_QUARTILE = 'Video Third Quartile';
/** @private */
com.adtech.Advert_2_53_3.VIDEO_EVENT_COMPLETE = 'Video Complete';
/** @private */
com.adtech.Advert_2_53_3.VIDEO_EVENT_MUTE = 'Video Mute';
/** @private */
com.adtech.Advert_2_53_3.OPT_TRACKING_KEYS = {
    'creativeId': 'kvu.3rd-creative',
    'placementId': 'kvu.3rd-plc'
};
/** @private */
com.adtech.Advert_2_53_3.VIDEO_BUFFERING_EVENT = 'Video Buffering';
/** @private */
com.adtech.Advert_2_53_3.VIDEO_BUFFERING_END_EVENT = 'Video Buffering End';
/** @private */
com.adtech.Advert_2_53_3.TAGVARS_SUBSTITUTION_MAP = {'__SC__': ';'};
// Copyright 2010 AOL Platforms.

/**
 * @private
 *
 * Alignment only has an effect on popups or floating (div) containers. Inline
 * containers are always aligned relative to the ad slot. The default values for
 * alignment are relative to the page top and the page left.
 *
 * @author Pictela Support <support@pictela.com>
 * TODO(samuel.adu): Screen values for popups? Currently popups will be aligned to the window.
 */
com.adtech.AssetContainerAlignmentOption_2_53_3 = function() {}
com.adtech.AssetContainerAlignmentOption_2_53_3.PAGE_LEFT = 'pageLeft';
com.adtech.AssetContainerAlignmentOption_2_53_3.PAGE_TOP = 'pageTop';
com.adtech.AssetContainerAlignmentOption_2_53_3.PAGE_RIGHT = 'pageRight';
com.adtech.AssetContainerAlignmentOption_2_53_3.PAGE_BOTTOM = 'pageBottom';
com.adtech.AssetContainerAlignmentOption_2_53_3.PAGE_CENTER = 'pageCenter';
com.adtech.AssetContainerAlignmentOption_2_53_3.AD_SLOT_LEFT = 'adSlotLeft';
com.adtech.AssetContainerAlignmentOption_2_53_3.AD_SLOT_TOP = 'adSlotTop';
// Copyright 2010 AOL Platforms.

/**
 * Abstract class for containers which contain advert assets.
 * <br/><br/>
 * <strong>Dispatched events</strong>
 * <table border="1">
 *   <tr><th>Type</th><th>Properties</th></tr>
 *   <tr><td>com.adtech.RichMediaEvent.RENDER</td><td><code>AssetContainer</code> target</td></tr>
 *   <tr><td>com.adtech.RichMediaEvent.MOUSE_OVER</td><td><code>AssetContainer</code> target</td></tr>
 *   <tr><td>com.adtech.RichMediaEvent.MOUSE_OUT<td><code>AssetContainer</code> target</td></tr>
 *   <tr><td>com.adtech.RichMediaEvent.CLOSE<td><code>AssetContainer</code> target</td></tr>
 * </table>
 *
 * @class
 * @extends com.adtech.EventDispatcher
 * @constructor
 * @author Pictela Support <support@pictela.com>

 *
 * @param parent the Advert instance of which this is a composite.
 * @param adConfig the JSON configuration of the advert.
 * @param id the unique identifier of the asset container object in the JSON
 *     configuration.
 * @param adEventBus advert level EventDispatcher for all asset containers to
 *     listen for custom events on.
 * @param globalEventBus global EventDispatcher for all interested parties to
 *     listen for page events on.
 * @see com.adtech.EventDispatcher
 *
 */
com.adtech.AssetContainer_2_53_3 = function(parent, adConfig, id, adEventBus, globalEventBus) {
  com.adtech.Utils_2_53_3.debug('AssetContainer constructor called.');
  com.adtech.AssetContainer_2_53_3.supa.constructor.call(this);
  /** @private */
  this.parent = parent;
  /** @private */
  this.windowContext = window;
  /**
   * The identifier for the <code>AssetContainer</code> instance.
   * @type String
   */
  this.id = id;
  /**
   * Flag indicating if the container is viewable in the browser viewport.
   * @type Boolean
   */
  this.visibleinViewport = false;
  /**
   * Flag indicating if the container is visible.
   * @type Boolean
   */
  this.visible = false;
  /**
   * Flag indicating if the container has been rendered.
   * @type Boolean
   */
  this.rendered = false;
  /** @private */
  this.floatOffsetLeft = 0;
  /** @private */
  this.floatOffsetTop = 0;
  /**
   * Flag indicating if the container has been rendered and then closed.
   * @type Boolean
   */
  this.closed = false;
  /** @private */
  this.globalEventBus = globalEventBus;
  /** @private */
  this.autoCloseTimeout = null;
  /** @private */
  this.adEventBus = adEventBus;
  /**
   * The unique DOM ID of the anchor div that is written to the page on delivery.
   *
   * @type String
   */
  this.advertAnchorId = com.adtech.AssetContainer_2_53_3.ANCHOR_ID_PREFIX +
      adConfig.adServerVars.id + '_' + adConfig.adServerVars.uid;
  /**
   * Flag indicating if the mouse pointer is over the container.
   * @type Boolean
   */
  this.mouseIsOver = false;
  /** @private */
  this.content = null;
  /** @private */
  this.rmEvent = com.adtech.RichMediaEvent_2_53_3;
  this.init(adConfig, adEventBus);
}

/** @private */
com.adtech.AssetContainer_2_53_3.ANCHOR_ID_PREFIX = 'adtechAdContainer_';

/** @private */
com.adtech.AssetContainer_2_53_3.CONTENT_ID_PREFIX = 'adtechAdContent_';

/** @private */
com.adtech.AssetContainer_2_53_3.DWELL_MIN_VIEWABLE_PERCENTAGE = 50;
/**
 * @private
 * Any ad, regardless of size, that has this many pixels in view will count as a view.
 * This value is half the area of a 300x250 ad.
 */
com.adtech.AssetContainer_2_53_3.ACCEPTABLE_VIEW_AREA = 37500;

com.adtech.Utils_2_53_3.extend(com.adtech.AssetContainer_2_53_3,
    com.adtech.EventDispatcher_2_53_3);

/**
 * @private
 */
com.adtech.AssetContainer_2_53_3.prototype.init = function(adConfig) {
  com.adtech.Utils_2_53_3.debug('AssetContainer init called.');
  var containerObj = adConfig.assetContainers[this.id];
  for (var prop in containerObj) {
    if (containerObj.hasOwnProperty(prop)) {
      switch (prop) {
        case 'isExpandable':
          // Work out if the container really is expandable for inline units.
          if (containerObj['type'] == com.adtech.AssetContainerFactory_2_53_3.INLINE_DIV) {
            this[prop] = !((containerObj['contentWidth'] === containerObj['contractedWidth']) &&
                (containerObj['contentHeight'] === containerObj['contractedHeight']));
          } else {
            // FloatingDivs re-calculate this property in the init override.
            this[prop] = containerObj[prop];
          }
          break;
        case 'isResponsive':
          this[prop] = (containerObj[prop] === true &&
              containerObj['contentType'] == com.adtech.ContentFactory_2_53_3.HTML &&
              containerObj['type'] == com.adtech.AssetContainerFactory_2_53_3.INLINE_DIV);
          break;
        default:
          this[prop] = containerObj[prop];
          break;
      }
    }
  }
  // Unique DOM identifier for the AssetContainers.
  this.uid = this.id.replace(/[ \/\.-]/g, '_') + '_' + adConfig.adServerVars.uid;
  this.contentId = com.adtech.AssetContainer_2_53_3.CONTENT_ID_PREFIX + this.uid;
  this.addRenderEventListeners();
  this.content = com.adtech.ContentFactory_2_53_3.getContent(
      this.contentType, this, adConfig, this.id, this.adEventBus,
      this.globalEventBus, this.contentId);
  if (com.adtech.Utils_2_53_3.getConfigOverride(adConfig, 'forcePageLoad')) {
    this.content.forcePageLoad();
  }
  com.adtech.Utils_2_53_3.addCustomEventHandler(this.adEventBus, this, adConfig.events);
}

/**
 * @private
 *
 * Add event listeners to the global event bus for core events that can
 * possibly trigger a render.
 */
com.adtech.AssetContainer_2_53_3.prototype.addRenderEventListeners = function() {
  this.globalEventBus.addEventListener(this.rmEvent.DOM_LOAD, this.coreLibEventHandler, this);
  this.globalEventBus.addEventListener(this.rmEvent.PAGE_LOAD, this.coreLibEventHandler, this);
  // Serve and engagement are special cases. They are dispatched from Advert instance.
  // TODO: Advert dispatches these via the advert event bus
  this.adEventBus.addEventListener(this.rmEvent.SERVE, this.coreLibEventHandler, this);
  this.adEventBus.addEventListener(this.rmEvent.ENGAGEMENT, this.coreLibEventHandler, this);
}

/**
 * @private
 *
 * Checks if the event is the relevant one to render on. If so, then rendering
 * takes place.
 */
com.adtech.AssetContainer_2_53_3.prototype.checkRenderEvent = function(type) {
  if (!this.rendered && type == this.renderEvent) {
    this.render();
    com.adtech.Utils_2_53_3.debug('AssetContainer ' + this.id +
        ' has been rendered on event: ' + type);
  }
}

/**
 * @private
 *
 * Renders the asset container.
 */
com.adtech.AssetContainer_2_53_3.prototype.render = function() {
  if (!this.rendered && !this.closed) {
    this.rendered = true;
    this.visible = true;
    this.dispatchEvent(this.rmEvent.RENDER);
  }
}

/**
 * Gets a reference to the content instance that renders the content.
 *
 * This method will return null prior to the content being rendered.
 *
 * @see com.adtech.HtmlContent
 * @see com.adtech.FlashContent
 */
com.adtech.AssetContainer_2_53_3.prototype.getContent = function() {
  return this.content;
}

/**
 * @private
 */
com.adtech.AssetContainer_2_53_3.prototype.dispatchMouseOverEvent = function() {
  if (!this.mouseIsOver) {
    this.dispatchEvent(this.rmEvent.MOUSE_OVER);
    this.mouseIsOver = true;
    com.adtech.Utils_2_53_3.debug('Container ' + this.id + ' dispatching a mouse over event');
  }
}

/**
 * @private
 */
com.adtech.AssetContainer_2_53_3.prototype.dispatchMouseOutEvent = function() {
  if (this.mouseIsOver) {
    this.dispatchEvent(this.rmEvent.MOUSE_OUT);
    com.adtech.Utils_2_53_3.debug('Container ' + this.id +
        ' dispatching a mouse out event');
    this.mouseIsOver = false;
  }
}

/**
 * @private
 */
com.adtech.AssetContainer_2_53_3.prototype.dispatchInViewportEvent = function() {
  if (!this.visibleinViewport) {
    this.visibleinViewport = true;
    this.dispatchEvent(this.rmEvent.IN_VIEWPORT);
  }
}

/**
 * @private
 */
com.adtech.AssetContainer_2_53_3.prototype.dispatchOutViewportEvent = function() {
  if (this.visibleinViewport) {
    this.visibleinViewport = false;
    this.dispatchEvent(this.rmEvent.OUT_VIEWPORT);
  }
}

/**
 * @private
 *
 * Sets the top and left offsets for floating asset containers based on alignment values from
 * the advert configuration.
 */
com.adtech.AssetContainer_2_53_3.prototype.setFloatingOffsets = function() {
  var dims = com.adtech.Utils_2_53_3.getViewportDims();
  var slotPosition = com.adtech.Utils_2_53_3.calculateAbsolutePosition(
      document.getElementById(this.advertAnchorId));
  switch (this.xRel) {
    case com.adtech.AssetContainerAlignmentOption_2_53_3.PAGE_RIGHT:
      this.floatOffsetLeft = dims.w;
      break;
    case com.adtech.AssetContainerAlignmentOption_2_53_3.PAGE_CENTER:
      // If available width not enough, dock to 0px.
      var halfWidth = dims.w / 2;
      this.floatOffsetLeft = (this.x < 0 && (halfWidth + this.x < 0)) ?
          -this.x : halfWidth;
      break;
    case com.adtech.AssetContainerAlignmentOption_2_53_3.AD_SLOT_LEFT:
      this.floatOffsetLeft = slotPosition.x;
      break;
    default:
      this.floatOffsetLeft = 0;
  }
  switch (this.yRel) {
    case com.adtech.AssetContainerAlignmentOption_2_53_3.PAGE_BOTTOM:
      this.floatOffsetTop = dims.h;
      break;
    case com.adtech.AssetContainerAlignmentOption_2_53_3.PAGE_CENTER:
      // If available height not enough, dock to 0px.
      var halfHeight = dims.h / 2;
      this.floatOffsetTop = (this.y < 0 && (halfHeight + this.y < 0)) ?
          -this.y : halfHeight;
      break;
    case com.adtech.AssetContainerAlignmentOption_2_53_3.AD_SLOT_TOP:
      this.floatOffsetTop = slotPosition.y;
      break;
    default:
      this.floatOffsetTop = 0;
  }
}


// Public interface/API

/**
 * Shows the container if it's already rendered and invisible.
 */
com.adtech.AssetContainer_2_53_3.prototype.show = function() {
  this.visible = true;
}

/**
 * Hides the container from view if it's already rendered and visible.
 */
com.adtech.AssetContainer_2_53_3.prototype.hide = function() {
  this.visible = false;
  this.dispatchEvent(this.rmEvent.HIDE);
}

/**
 * Expands the container from the width and height dimensions to the
 * content width and content height dimensions.
 */
com.adtech.AssetContainer_2_53_3.prototype.expand = function() {
  if (this.isExpandable) {
    this.isExpanded = true;
    this.dispatchEvent(this.rmEvent.EXPANDED);
  }
}

/**
 * Contracts the container from the content width and content height dimensions
 * to the width and height dimensions.
 */
com.adtech.AssetContainer_2_53_3.prototype.contract = function() {
  if (this.isExpandable) {
    this.isExpanded = false;
    this.dispatchEvent(this.rmEvent.CONTRACTED);
  }
}

/**
 * Reloads the content within the container.
 */
com.adtech.AssetContainer_2_53_3.prototype.reload = function() {}

/**
 * Removes the content from the viewport and destroys all references to it.
 */
com.adtech.AssetContainer_2_53_3.prototype.close = function() {
  // Ensure that any mouseover timers are stopped (mainly for engagement timer).
  this.dispatchMouseOutEvent();
  this.content.remove();
  this.content = null;
  this.rendered = false;
  this.closed = true;
  this.dispatchEvent(this.rmEvent.CLOSE);
}

// Event handlers follow.

/**
 * @private
 *
 * Event handler for events defined and hard-coded in RmCoreLib only.
 */
com.adtech.AssetContainer_2_53_3.prototype.coreLibEventHandler = function(event) {
  this.checkRenderEvent(event.type);
  if (event.type == this.rmEvent.ENGAGEMENT && this.autoCloseTimeout) {
    com.adtech.Utils_2_53_3.debug('Cancelling auto close timeout.');
    clearTimeout(this.autoCloseTimeout);
  }
}

/**
 * @private
 *
 * Handles all custom events
 */
com.adtech.AssetContainer_2_53_3.prototype.customEventHandler = function(event) {
  if (event.target != this.content) {
    /*
     * Self content can not be responsible for dispatching an event that
     * renders itself.
     */
    this.checkRenderEvent(event.type);
  }
}
// Copyright 2010 AOL Platforms.

/**
 * Wrapper around an inline div container.
 *
 * @class
 * @extends com.adtech.AssetContainer
 * @constructor
 * @author Pictela Support <support@pictela.com>
 *
 * @param parent reference to the Advert instance of which the DivContainer is
 *     a composite.
 * @param adConfig the JSON configuration of the advert.
 * @param id the unique identifier of the asset container object in the JSON
 *     configuration.
 * @param adEventBus advert level EventDispatcher for all asset containers to
 *     listen for custom events on.
 * @param globalEventBus global EventDispatcher for all interested parties to
 *     listen for page events on.
 */
com.adtech.DivContainer_2_53_3 = function(parent, adConfig, id, adEventBus, globalEventBus) {
  /** @private */
  this.isExpanded = false;
  /** @private */
  this.visible = false;
  /**
   * A handle to the div that is written out in the placement where the advert is served.
   */
  this.anchorDiv = null;
  /**
   * A handle to the div that contains the advert content.
   *
   * Please note that this property will be null until the container has rendered.
   * The events dispatched from this class are detailed in <code>AssetContainer</code>
   * <br/>
   * see: <a href="AssetContainer.html">com.adtech.AssetContainer</a>
   */
  this.div = null;
  /**
   * @private
   *
   * The intervals used to attempt to get a reference to the anchor div.
   * This is required to work around a Webkit bug.
   *
   * @see com.adtech.DivContainer#render
   */
  this.anchorDivAttemptIntervals = [10, 20, 50, 100, 200, 500];
  /** @private */
  this.anchorStartWidth = 1;
  /** @private */
  this.anchorStartHeight = 0;
  /**
   * @private
   * Overridden for responsive ads. This unit value is used for anchorDiv dimensions when ad unit
   * breaks out of iframes.
   */
  this.dimensionUnits = 'px';
  /**
   * @private
   * An override to prevent the container from rendering.
   */
  this.preventRender = false;
  /**
   * @private
   * An override to force the container/SWF to render regardless of DOM Load state.
   */
  this.forceRender = false;
  com.adtech.DivContainer_2_53_3.supa.constructor.call(
      this, parent, adConfig, id, adEventBus, globalEventBus);
  this.setAnchorDivStyle();
  this.createAnchorDiv();
}

com.adtech.Utils_2_53_3.extend(com.adtech.DivContainer_2_53_3,
    com.adtech.AssetContainer_2_53_3);

/** @private */
com.adtech.DivContainer_2_53_3.SCALE_UP = 'u';
/** @private */
com.adtech.DivContainer_2_53_3.SCALE_DOWN = 'd';
/** @private */
com.adtech.DivContainer_2_53_3.ANIMATION_PERIOD = 40; //24 steps per second for animated scaling.
/** @private */
com.adtech.DivContainer_2_53_3.ZINDEX_BUMP = 10;

/**
 * @private
 *
 * Default Timeout until we force render creatives.
 */
com.adtech.DivContainer_2_53_3.DOM_LOAD_TIMEOUT = 2000;

/**
 * @private
 *
 * Adds the extra event listeners that are useful for div containers.
 */
com.adtech.DivContainer_2_53_3.prototype.init = function(adConfig) {
  com.adtech.DivContainer_2_53_3.supa.init.call(this, adConfig);
  if (this.parent.renderingInFiF && (com.adtech.IframeUtils_2_53_3.topOrSelf() != self)) {
    /* Should only occur for inline containers that have not broken out.
     * MRAID adverts will never satisfy this condition. as Advert instance will never have
     * renderingInFiF flag passed to it, resulting in a false value.
     */
    this.containingIframe = com.adtech.IframeUtils_2_53_3.getTargetParentIframeEle(top);
  }
  this.setCoreLibPageEventListeners(true);
  if (this.isExpandable) {
    this.isExpanded = !this.startContracted;
  }
  this.setClipStyle();
  var overrideDOMLoadTimeout =
      com.adtech.Utils_2_53_3.getConfigOverride(adConfig, 'domLoadTimeout');
  this.DOMLoadTimeout = (overrideDOMLoadTimeout != null) ?
      overrideDOMLoadTimeout : com.adtech.DivContainer_2_53_3.DOM_LOAD_TIMEOUT;
  if (this.parent.renderingInSafeframe) {
    com.adtech.SafeframeUtils_2_53_3.register(this.width, this.height,
        com.adtech.Utils_2_53_3.createClosure(this, this.statusEventHandler));
  }
}

/** @private */
com.adtech.DivContainer_2_53_3.prototype.getAnchorDivDisplayStyle = function() {
  /**
   * Always display anchors as inline elements due to the fact the anchor is replacing
   * an inline HTML element (iframe). Inline display only works for IE in quirks mode,
   * inline-block for all other cases.
   */
  return (com.adtech.Utils_2_53_3.isIEQuirksMode()) ?
      'inline' : 'inline-block';
}

/** @private */
com.adtech.DivContainer_2_53_3.prototype.setClipStyle = function() {
  this.initialClipStyle = (this.isExpandable && this.startContracted) ?
      this.getClippedStyle() : this.getUnclippedStyle();
}

/**
 * @private
 *
 * Either adds or removes specific core lib event listeners that DivContainers will be
 * interested in.
 */
com.adtech.DivContainer_2_53_3.prototype.setCoreLibPageEventListeners =
    function(registerToListen) {
  var coreLibPageEvents = [
      /*this.rmEvent.MOUSE_MOVE,*/
      this.rmEvent.PAGE_RESIZE,
      this.rmEvent.PAGE_SCROLL,
      this.rmEvent.ORIENTATION_CHANGE
    ];
  for (var i = 0; i < coreLibPageEvents.length; i++) {
    if (registerToListen) {
      this.globalEventBus.addEventListener(coreLibPageEvents[i], this.coreLibEventHandler, this);
    } else {
      this.globalEventBus.removeEventListener(coreLibPageEvents[i],
          this.coreLibEventHandler, this);
    }
  }
}

/**
 * @private
 *
 * Calculates the absolute position of the div within the page.
 */
com.adtech.DivContainer_2_53_3.prototype.calculateAbsolutePosition = function() {
  var absPosition = com.adtech.Utils_2_53_3.calculateAbsolutePosition(
      (this.containingIframe) ? this.containingIframe : this.div);
  this.absTop = absPosition.y;
  this.absLeft = absPosition.x;
}

/**
 * @private
 */
com.adtech.DivContainer_2_53_3.prototype.getVisibleDims = function() {
  if (this.containingIframe) {
    return {"w": parseInt(com.adtech.Utils_2_53_3.getComputedStyle(this.containingIframe,
                 'width')),
             "h": parseInt(com.adtech.Utils_2_53_3.getComputedStyle(this.containingIframe,
                 'height'))};
  }
  if (this.isResponsive) {
    // Calculate the actual width and height.
    this.width = parseInt(com.adtech.Utils_2_53_3.getComputedStyle(this.div, 'width'));
    this.height = parseInt(com.adtech.Utils_2_53_3.getComputedStyle(this.div, 'height'));
  }
  return (this.isExpanded) ? {"w": this.contentWidth, "h": this.contentHeight} :
      {"w": this.width, "h": this.height};
}

/**
 * @private
 */
com.adtech.DivContainer_2_53_3.prototype.getVisiblePos = function() {
  return (this.isExpanded) ? {"l": this.absLeft, "t": this.absTop} :
      {"l": (this.absLeft + this.contractedX), "t": (this.absTop + this.contractedY)};
}

/**
 * @private
 *
 * Called post-render to check the initial visibility state.
 */
com.adtech.DivContainer_2_53_3.prototype.setInitialVisibilityState = function() {
  if (!this.parent.renderingInSafeframe) {
    var viewportDims = com.adtech.Utils_2_53_3.getViewportDims(this.parent.renderingInFiF);
    var pageOffsets = com.adtech.Utils_2_53_3.getPageOffsets(this.parent.renderingInFiF);
    this.calculateAbsolutePosition();
    this.checkAssetVisibility(pageOffsets.x, pageOffsets.y, viewportDims.w, viewportDims.h);
  } else {
    this.checkAssetVisibility();
  }
}

/** @private */
com.adtech.DivContainer_2_53_3.prototype.checkRenderEvent = function(type) {
  if ((!this.rendered && type == this.renderEvent) && !this.globalEventBus.DOMLoaded) {
    this.addDOMLoadRenderTimeout();
  }
  com.adtech.DivContainer_2_53_3.supa.checkRenderEvent.call(this, type);
}

/** @private */
com.adtech.DivContainer_2_53_3.prototype.addDOMLoadRenderTimeout = function() {
  if (!this.globalEventBus.DOMLoaded && !this.DOMLoadRenderTimeout) {
    var self = this;
    this.DOMLoadRenderTimeout = setTimeout(function() {
        self.forceRendering();
      }, this.DOMLoadTimeout);
  }
}

/** @private */
com.adtech.DivContainer_2_53_3.prototype.forceRendering = function() {
  this.forceRender = true;
  if (typeof com.adtech.swfobject_2_53_3 != 'undefined') {
    com.adtech.swfobject_2_53_3.forceSWFRender();
  }
}

/**
 * @private
 *
 * Checks that the unit is at least 50% visible or a minimum amount of pixels are visible.
 */
com.adtech.DivContainer_2_53_3.prototype.checkAssetVisibility =
    function(pageOffsetX, pageOffsetY, winWidth, winHeight) {
  if (!this.rendered) {
    return;
  }

  var maximumAdArea;
  var areaInView;
  if (this.parent.renderingInSafeframe) {
    var percentageInView = com.adtech.SafeframeUtils_2_53_3.getInViewPercentage();
    maximumAdArea = com.adtech.SafeframeUtils_2_53_3.getMaximumAdArea();
    areaInView = (percentageInView / 100) * maximumAdArea;
  } else {
    var visibleAdDims = this.getVisibleDims();
    /*
     * Method to calculate how much of the ad is in view is based on
     * "How much do we clip off each end of the total width/height".
     */
    if (pageOffsetX >= this.absLeft + visibleAdDims.w || (this.absLeft - pageOffsetX) > winWidth) {
      // If the ad is totally off screen, either to the left or the right.
      var widthInView = 0;
    } else {
      var leftClip = (pageOffsetX < this.absLeft) ? 0 : Math.abs(this.absLeft - pageOffsetX);
      var rightClip = Math.max(this.absLeft + visibleAdDims.w - winWidth - pageOffsetX, 0);
      var widthInView = visibleAdDims.w - leftClip - rightClip;
    }

    if (pageOffsetY >= this.absTop + visibleAdDims.h || (this.absTop - pageOffsetY) > winHeight) {
      // If the ad is totally off screen, either top or bottom.
      var heightInView = 0;
    } else {
      var topClip = (pageOffsetY < this.absTop) ? 0 : Math.abs(this.absTop - pageOffsetY);
      var bottomClip = Math.max(this.absTop + visibleAdDims.h - winHeight - pageOffsetY, 0);
      var heightInView = visibleAdDims.h - topClip - bottomClip;
    }
    maximumAdArea = visibleAdDims.w * visibleAdDims.h;
    areaInView = widthInView * heightInView;
  }
  this.dispatchViewportEvents(areaInView, maximumAdArea);
}

com.adtech.DivContainer_2_53_3.prototype.dispatchViewportEvents = function (areaInView, maximumAdArea) {
  var thresholdFactor = com.adtech.AssetContainer_2_53_3.DWELL_MIN_VIEWABLE_PERCENTAGE / 100;
  if (areaInView >= (maximumAdArea * thresholdFactor) ||
      areaInView >= com.adtech.AssetContainer_2_53_3.ACCEPTABLE_VIEW_AREA || this.stickyY) {
    this.dispatchInViewportEvent();
  } else {
    this.dispatchOutViewportEvent();
  }
}


/**
 * @private
 *
 * Sets the value of the anchor div style. This differs between div implementations.
 */
com.adtech.DivContainer_2_53_3.prototype.setAnchorDivStyle = function() {
  com.adtech.Utils_2_53_3.debug('DivContainer setAnchorDiv style called.');
  var startWidth = this.width;
  var startHeight = this.height;
  if (this.pushesContent && !this.startContracted) {
    startWidth = this.contentWidth;
    startHeight = this.contentHeight;
  }
  if (this.isResponsive) {
    this.dimensionUnits = '%';
    startWidth = startHeight = this.contentWidth = this.contentHeight = 100;
  }
  this.anchorDivStyle = 'position:relative;width:' + startWidth + this.dimensionUnits + ';' +
      'height:' + startHeight + this.dimensionUnits + ';display:' + this.getAnchorDivDisplayStyle() +
      ';z-index:' + this.zIndex + ';';
  this.anchorStartWidth = startWidth;
  this.anchorStartHeight = startHeight;
}

/**
 * @private
 *
 * Creates an anchor/wrapper div and stores the reference.
 */
com.adtech.DivContainer_2_53_3.prototype.createAnchorDiv = function() {
  com.adtech.Utils_2_53_3.debug('DivContainer createAnchorDiv called.');
  var anchorDivHtml = '<div id="' + this.advertAnchorId + '" style="' + this.anchorDivStyle +
      '"></div>';
  var existingAnchor = document.getElementById(this.advertAnchorId);
  com.adtech.Utils_2_53_3.debug('Exisiting anchor is: ' + existingAnchor);
  if (!existingAnchor) {
    var targetIframe = this.getTargetIframeReference();
    if (targetIframe) {
      com.adtech.Utils_2_53_3.debug('Advert broken out of iframe!');
      // Advert has been served in iframe and has broken out.
      this.anchorDiv = document.createElement('div');
      this.anchorDiv.id = this.advertAnchorId;
      this.anchorDiv.style.position = 'relative';
      this.anchorDiv.style.width = this.anchorStartWidth + this.dimensionUnits;
      this.anchorDiv.style.height = this.anchorStartHeight + this.dimensionUnits;
      this.anchorDiv.style.zIndex = this.zIndex;
      if (this.type == com.adtech.AssetContainerFactory_2_53_3.INLINE_DIV) {
        /**
         * Copy the relevant styles from the iframe object that the advert is replacing.
         * Map padding values to margin values, as the nested div is positioned absolutely within
         * the relatively positioned anchorDiv.
         * NOTE: This action should only be performed for inline containers.
         */
        this.anchorDiv.style.margin = '0';
        var stylesToCopyMap = {'marginTop': 'marginTop', 'marginRight': 'marginRight',
                            'marginBottom': 'marginBottom', 'marginLeft': 'marginLeft',
                            'paddingTop': 'marginTop', 'paddingRight': 'marginRight',
                            'paddingBottom': 'marginBottom', 'paddingLeft': 'marginLeft'};
        for (var computedStyleName in stylesToCopyMap) {
          if (stylesToCopyMap.hasOwnProperty(computedStyleName)) {
            var existingIframeStyleValue = parseInt(com.adtech.Utils_2_53_3.getComputedStyle(
                targetIframe, computedStyleName));
            if (!isNaN(existingIframeStyleValue)) {
              var anchorDivCurrentStyleValue =
                  parseInt(this.anchorDiv.style[stylesToCopyMap[computedStyleName]]);
              this.anchorDiv.style[stylesToCopyMap[computedStyleName]] =
                  anchorDivCurrentStyleValue + parseInt(existingIframeStyleValue) + 'px';
            }
          }
        }
        this.anchorDiv.style.display = this.getAnchorDivDisplayStyle();
        if (com.adtech.Utils_2_53_3.isIE() && !com.adtech.Utils_2_53_3.isIEQuirksMode()) {
          this.anchorDiv.style.clear = 'none';
        }
        targetIframe.style.width = targetIframe.style.height = '0px';
        targetIframe.style.display = 'none';
      } else {
        // Non-inline containers are visible, but have height set to 0px not to modify the layout.
        this.anchorDiv.style.display = 'block';
      }
      targetIframe.parentNode.insertBefore(this.anchorDiv, targetIframe);
    } else {
      this.writeAnchorDivHtml(anchorDivHtml);
    }
  } else {
    com.adtech.Utils_2_53_3.debug('The anchor exists already, setting instance property');
    this.anchorDiv = existingAnchor;
  }
}

/**
 * @private
 *
 * Writes out the anchor div to the page.
 */
com.adtech.DivContainer_2_53_3.prototype.writeAnchorDivHtml = function(anchorDivHtml) {
  com.adtech.Utils_2_53_3.debug('Writing Anchor DIV: ' + anchorDivHtml);
  document.write(anchorDivHtml);
  this.anchorDiv = document.getElementById(this.advertAnchorId);
}

/**
 * @private
 *
 * Gets the iframe object reference that the advert was delivered into if served into an iframe;
 * null otherwise.
 */
com.adtech.DivContainer_2_53_3.prototype.getTargetIframeReference = function() {
  var targetIframe =  this.parent.targetIframe;
  targetIframe = (typeof targetIframe == 'string') ?
      document.getElementById(targetIframe) : targetIframe;
  return targetIframe;
}

/**
 * @private
 */
com.adtech.DivContainer_2_53_3.prototype.createContentDiv = function() {
  if (this.isExpandable && this.isMultiDirectionalExpand) { // TODO(samuel.adu): not MRAID?
    this.setMDEOverrides();
  }
  var style = 'position:absolute;width:' + this.contentWidth + this.dimensionUnits +
      ';height:' + this.contentHeight + this.dimensionUnits + ';left:' + this.x +
      'px;top:' + this.y + 'px;';
  if (this.isExpandable) {
    style += 'clip:' + this.initialClipStyle + ';z-index:' + (this.zIndex + 1) + ';'
  }
  var div = '<div id="' + this.contentId + '" style="' + style + '"></div>';
  var overflowFixDepth = parseInt(this.parent.pubVars.overflowFixLevel);
  if (isNaN(overflowFixDepth) || overflowFixDepth == 0) {
    // Ensure that the parent of the advert has overflow fixed by default.
    overflowFixDepth = 1;
  }
  // Set parent overflows before writing out div in case ad starts expanded.
  this.fixParentOverflow(overflowFixDepth);
  this.anchorDiv.innerHTML = div;
}

/** @private */
com.adtech.DivContainer_2_53_3.prototype.getClippedStyle = function() {
  return 'rect(' + this.contractedY + 'px, ' + (this.contractedX + this.contractedWidth) +
     'px, ' + (this.contractedY + this.contractedHeight) + 'px, ' + this.contractedX + 'px)';
}

/** @private */
com.adtech.DivContainer_2_53_3.prototype.getUnclippedStyle = function(overrides) {
  var clippedWidth = this.contentWidth;
  var clippedHeight = this.contentHeight;
  if (typeof overrides == 'object') {
    if (typeof overrides.width == 'number') {
      clippedWidth = overrides.width;
    }
    if (typeof overrides.height == 'number') {
      clippedHeight = overrides.height;
    }
  }
  return 'rect(0px, ' + clippedWidth + 'px, ' + clippedHeight + 'px, 0px)';
}

/**
 * @private
 *
 * Sets the potional values for the expandable unit if it is configured to be multi-directional.
 */
com.adtech.DivContainer_2_53_3.prototype.setMDEOverrides = function() {
  var placementPosition = com.adtech.Utils_2_53_3.calculateAbsolutePosition(
      this.anchorDiv);
  var documentWidth = com.adtech.Utils_2_53_3.getDocumentWidth();
  var documentHeight = com.adtech.Utils_2_53_3.getDocumentHeight();
  var contentContainerConfig = this.content.adConfig.assetContainers.main;
  if (this.expandsInPlaneY()) {
    if (((placementPosition.y + this.contentHeight) < documentHeight)
        || (placementPosition.y < (this.contentHeight - this.height))) {
      // Should expand down.
      this.y = this.contractedY = contentContainerConfig.y =
        contentContainerConfig.contractedY = 0;
    } else {
      // Should expand up.
      this.y = contentContainerConfig.y = (this.height - this.contentHeight);
      this.contractedY = contentContainerConfig.contractedY = Math.abs(this.y);
      // Stop any content pushing.
      this.pushesContent = false;
    }
  }

  if (this.expandsInPlaneX()) {
    if ((placementPosition.x > (this.contentWidth - this.width))) {
      // Should expand left.
      this.x = contentContainerConfig.x = (this.width - this.contentWidth);
      this.contractedX = contentContainerConfig.contractedX = Math.abs(this.x);
    } else {
      // Should expand right.
      this.x = this.contractedX =
          contentContainerConfig.x = contentContainerConfig.contractedX = 0;
    }
  }
  this.setClipStyle();
}

/** @private */
com.adtech.DivContainer_2_53_3.prototype.expandsInPlaneY = function() {
  return (this.isExpandable && (this.contentHeight > this.height));
}

/** @private */
com.adtech.DivContainer_2_53_3.prototype.expandsInPlaneX = function() {
  return (this.isExpandable && (this.contentWidth > this.width));
}

/**
 * @private
 * Sets container divs overflow to visible. This method is controlled by the
 * publisher variable 'overflowFixLevel'.
 */
com.adtech.DivContainer_2_53_3.prototype.fixParentOverflow = function(depthCount) {
  if (isNaN(depthCount) || depthCount == 0) {
   return;
  }
  var parentContainer = this.anchorDiv.parentNode;
  while (parentContainer) {
    if (depthCount == 0) {
     break;
    }
    if (this.pushesContent) {
      parentContainer.style.height = 'auto';
    } else {
      parentContainer.style.overflow = 'visible';
    }
    parentContainer = parentContainer.parentNode;
    depthCount--;
  }
}

/**
 * @private
 *
 * Rendering is invoked when the desired event has been dispatched from any
 * of the object associated to the advert instance.
 */
com.adtech.DivContainer_2_53_3.prototype.render = function() {
  // No rendering if container has been rendered and closed already.
  if (!this.rendered && !this.closed) {
    com.adtech.Utils_2_53_3.debug('DivContainer: Rendering advert content.');
    if (!this.anchorDiv) {
      com.adtech.Utils_2_53_3.debug('Anchor div reference not set, trying to fix..');
      this.anchorDiv = document.getElementById(this.advertAnchorId);
      /*
       * Fix for WebKit taking its' time to render the div when the page is reloaded by
       * the user focusing on the address bar and hitting enter. This bug appears to only
       * happen when the HTTP response status shows up as 'from cache', in the Chrome/Safari
       * network monitoring tool.
       */
      if (!this.anchorDiv) {
        var self = this;
        if (this.anchorDivAttemptIntervals.length > 0) {
          setTimeout(com.adtech.Utils_2_53_3.createClosure(self, self.render),
              this.anchorDivAttemptIntervals.shift());
          return;
        } else {
          /*
           * TODO(samuel.adu): We should never really reach here. But if we do, perhaps we should
           * attempt to render the backup image? If so, we'd really have to do that after DOMLoad
           * seeing as we have introduced a sudo-async process prior to this point (setTimeout).
           */
          return;
        }
      }
    }
    this.createContentDiv();
    this.div = document.getElementById(this.contentId);
    this.addMouseListeners();
    if (this.isExpandable && this.isMultiDirectionalExpand && !this.globalEventBus.DOMLoaded) {
      // Only render content for MDEs on domload.
      this.globalEventBus.addEventListener(this.rmEvent.DOM_LOAD,
          this.content.render, this.content);
    } else {
      this.content.render();
    }
    this.content.addEventListener(com.adtech.RichMediaEvent_2_53_3.READY,
        com.adtech.Utils_2_53_3.createClosure(this, this.contentReadyHandler));
    com.adtech.DivContainer_2_53_3.supa.render.call(this);
    this.setInitialVisibilityState();

    if (this.isExpandable && this.isExpanded && this.parent.renderingInSafeframe) {
      com.adtech.SafeframeUtils_2_53_3.expand(this,
          com.adtech.SafeframeUtils_2_53_3.prototype.safeframeObjFromClips(
              this.getClippedStyle(), this.getUnclippedStyle(), this.pushesContent));
    }

    /* Recheck the initial state just before the viewable impression is recorded, just in case
     * the ad has been rendered on screen and shifted as a result of another element loading/etc.
     * Additionally, the initial visibility state will be rechecked on DOM_LOAD and PAGE_LOAD.
     */
    var self = this;
    setTimeout(com.adtech.Utils_2_53_3.createClosure(self, self.setInitialVisibilityState),
        com.adtech.Advert_2_53_3.VIEWABLE_IMPRESSION_THRESHOLD - 300);
  }
}

/**
 * @private
 *
 * Adds listeners for mouse out and mouse over events.
 */
com.adtech.DivContainer_2_53_3.prototype.addMouseListeners = function() {
  if (this.contentType == com.adtech.ContentFactory_2_53_3.FLASH &&
      this.wmode == 'window') {
    this.content.handleMouseEvents();
    this.content.addEventListener(this.rmEvent.MOUSE_OVER,
        this.dispatchMouseOverEvent, this);
    this.content.addEventListener(this.rmEvent.MOUSE_OUT,
        this.dispatchMouseOutEvent, this);
  } else {
    com.adtech.Utils_2_53_3.registerNativeEventHandler(this.div, 'mouseover',
        com.adtech.Utils_2_53_3.createClosure(this, this.dispatchMouseOverEvent));
    com.adtech.Utils_2_53_3.registerNativeEventHandler(this.div, 'mouseout',
        com.adtech.Utils_2_53_3.createClosure(this, this.dispatchMouseOutEvent));
  }
}

/**
 * @private
 */
com.adtech.DivContainer_2_53_3.prototype.anchorDivScaleStep = function() {
  var isScalingUp = (this.anchorDivScaleMode == com.adtech.DivContainer_2_53_3.SCALE_UP) ?
      true : false;
  var currentHeight = parseInt(this.anchorDiv.style.height);
  var nextValue = (isScalingUp) ? (currentHeight + this.animationStepDelta) :
      (currentHeight - this.animationStepDelta);
  if (this.currentAnimationStep < this.totalAnimationSteps) {
    this.resizeContainer(nextValue);
    this.anchorDiv.style.height = nextValue + 'px';
    this.currentAnimationStep++;
  } else {
    var finalValue = (isScalingUp) ? this.contentHeight : this.height;
    this.resizeContainer(finalValue);
    this.anchorDiv.style.height = finalValue + 'px';
    this.resetAnimationInterval();
    if (!isScalingUp) {
      this.finaliseContract();
    }
  }
}

/**
 * @private
 */
com.adtech.DivContainer_2_53_3.prototype.resetAnimationInterval = function() {
  if (this.animationIntervalTimer) {
    clearInterval(this.animationIntervalTimer);
    this.animationIntervalTimer = null;
  }
}

/**
 * @private
 */
com.adtech.DivContainer_2_53_3.prototype.animateAnchorDivScaling = function() {
  this.heightDelta = this.contentHeight - this.height;
  this.animationStepDelta =
    Math.floor((this.heightDelta * com.adtech.DivContainer_2_53_3.ANIMATION_PERIOD) /
        (this.animationDuration * 1000));
  this.totalAnimationSteps = Math.floor(this.heightDelta / this.animationStepDelta);
  this.currentAnimationStep = 0;
  this.animationIntervalTimer = setInterval(
      com.adtech.Utils_2_53_3.createClosure(this, this.anchorDivScaleStep),
      com.adtech.DivContainer_2_53_3.ANIMATION_PERIOD);
}

/**
 * @private
 *
 * Expands the anchor div, pushing the content around it.
 */
com.adtech.DivContainer_2_53_3.prototype.expandAnchorDiv = function() {
  if (this.expandAnimationDuration) {
    this.resetAnimationInterval();
    this.anchorDivScaleMode = com.adtech.DivContainer_2_53_3.SCALE_UP;
    this.animationDuration = this.expandAnimationDuration;
    this.animateAnchorDivScaling();
  } else {
    this.anchorDiv.style.height = this.contentHeight + 'px';
  }
}

/**
 * @private
 */
com.adtech.DivContainer_2_53_3.prototype.contractAnchorDiv = function() {
  if (this.contractAnimationDuration) {
    this.resetAnimationInterval();
    this.anchorDivScaleMode = com.adtech.DivContainer_2_53_3.SCALE_DOWN;
    this.animationDuration = this.contractAnimationDuration;
    this.animateAnchorDivScaling();
  } else {
    this.anchorDiv.style.height = this.height + 'px';
    this.finaliseContract();
  }
}

/**
 * @private
 *
 * Provided for overriding in subclasses.
 */
com.adtech.DivContainer_2_53_3.prototype.resizeContainer = function(height) {}

// Public API methods - AKA 'actions'.

/**
 * @inheritDoc
 */
com.adtech.DivContainer_2_53_3.prototype.show = function() {
  com.adtech.DivContainer_2_53_3.supa.show.call(this);
}

/**
 * @inheritDoc
 */
com.adtech.DivContainer_2_53_3.prototype.hide = function() {
  com.adtech.DivContainer_2_53_3.supa.hide.call(this);
}

/**
 * @inheritDoc
 */
com.adtech.DivContainer_2_53_3.prototype.expand = function(eventMeta) {
  if (this.rendered) {
    if (this.isExpandable && !this.isExpanded) {
      if (this.pushesContent && !this.parent.renderingInSafeframe) {
        this.expandAnchorDiv();
      }
      com.adtech.DivContainer_2_53_3.supa.expand.call(this);
      var clipStyle = this.getUnclippedStyle(eventMeta);
      this.div.style.clip = clipStyle;
      if (typeof com.adtech.FlashContent_2_53_3 != 'undefined' &&
          this.content instanceof com.adtech.FlashContent_2_53_3) {
        this.content.resizeObject(this.rectObjFromClip(clipStyle));
      }
      this.anchorDiv.style.zIndex = this.zIndex + com.adtech.DivContainer_2_53_3.ZINDEX_BUMP;
      this.div.style.zIndex = this.zIndex + 1 + com.adtech.DivContainer_2_53_3.ZINDEX_BUMP;
      this.calculateAbsolutePosition();
      if (this.parent.renderingInSafeframe) {
        com.adtech.SafeframeUtils_2_53_3.expand(this,
            com.adtech.SafeframeUtils_2_53_3.prototype.safeframeObjFromClips(
                this.getClippedStyle(), this.getUnclippedStyle(eventMeta), this.pushesContent));
      }
    }
  }
}

com.adtech.DivContainer_2_53_3.prototype.rectObjFromClip = function(clipStyle) {
  var pattern = /rect\s*\(\s*(\w+)\s*,\s*(\w+)\s*,\s*(\w+)\s*,\s*(\w+)\s*\)/i;
  var match = pattern.exec(clipStyle);
  return {'top': match[1], 'right': match[2], 'bottom': match[3], 'left': match[4]};
}

/**
 * @inheritDoc
 */
com.adtech.DivContainer_2_53_3.prototype.contract = function() {
  if (this.rendered) {
    if (this.isExpandable && this.isExpanded) {
      if (this.pushesContent && !this.parent.renderingInSafeframe) {
        this.contractAnchorDiv();
        // If anchor div animates contract, we need to delay the clip call.
        return;
      }
      this.finaliseContract();
    }
  }
}

/**
 * @inheritDoc
 */
com.adtech.DivContainer_2_53_3.prototype.reload = function() {
  if (this.rendered) {
    this.content.remove();
    this.content.forcePageLoad();
    this.content.render();
    this.show();
  } else {
    this.render();
  }
}

/**
 * @private
 */
com.adtech.DivContainer_2_53_3.prototype.finaliseContract = function() {
  com.adtech.DivContainer_2_53_3.supa.contract.call(this);
  var clipStyle = this.getClippedStyle();
  this.div.style.clip = clipStyle;
  if (typeof com.adtech.FlashContent_2_53_3 != 'undefined' &&
      this.content instanceof com.adtech.FlashContent_2_53_3) {
    this.content.resizeObject(this.rectObjFromClip(clipStyle));
  }
  this.anchorDiv.style.zIndex = this.zIndex;
  this.div.style.zIndex = this.zIndex + 1;
  this.calculateAbsolutePosition();
  if (this.parent.renderingInSafeframe) {
    com.adtech.SafeframeUtils_2_53_3.collapse(this);
  }
}

/**
 * @inheritDoc
 */
com.adtech.DivContainer_2_53_3.prototype.close = function() {
  if (this.rendered && !this.closed) {
    // Free up memory by removing the redundant event listeners.
    this.setCoreLibPageEventListeners(false);
    com.adtech.DivContainer_2_53_3.supa.close.call(this);
    try {
      if (this.div.parentNode == this.anchorDiv) {
        this.anchorDiv.parentNode.removeChild(this.anchorDiv);
      } else {
        // Support case where div has been moved about by customAd code.
        this.div.parentNode.removeChild(this.div);
        this.anchorDiv.parentNode.removeChild(this.anchorDiv);
      }
    } catch (e) {
      // Snooze this error, as it may have been the publisher who removed the advert from the DOM.
    }
  }
}

// Event handlers follow.

com.adtech.DivContainer_2_53_3.prototype.statusEventHandler = function(status, data) {
  if (status == 'geom-update') {
    this.checkAssetVisibility();
  }
}

/**
 * @private
 *
 * Class specific event handling.
 */
com.adtech.DivContainer_2_53_3.prototype.coreLibEventHandler = function(event) {
  com.adtech.DivContainer_2_53_3.supa.coreLibEventHandler.call(this, event);
  if (this.rendered) {
    switch (event.type) {
      case this.rmEvent.PAGE_SCROLL:
      case this.rmEvent.PAGE_RESIZE:
        this.calculateAbsolutePosition();
        this.checkAssetVisibility(event.offsetX, event.offsetY, event.width, event.height);
      case this.rmEvent.DOM_LOAD:
      case this.rmEvent.PAGE_LOAD:
        // Recheck initial visibility state in case loaded elements shift the position of the ad.
        this.setInitialVisibilityState();
      break;
    }
  }
}

/**
 * @private
 * Ensures that Flash Objects for expandable are resized if required.
 */
com.adtech.DivContainer_2_53_3.prototype.contentReadyHandler = function(event) {
  if (typeof com.adtech.FlashContent_2_53_3 != 'undefined' &&
      this.content instanceof com.adtech.FlashContent_2_53_3) {
    if (this.isExpandable && this.startContracted) {
      this.content.resizeObject(this.rectObjFromClip(this.getClippedStyle()));
    }
  }
  if (com.adtech.Utils_2_53_3.isChrome()) {
    var left = this.div.style.left;
    var top = this.div.style.top;
    this.div.style.left = '';
    this.div.style.top = '';
    var self = this;
    setTimeout(function (){
      self.div.style.left = left;
      self.div.style.top = top;
    }, 10);
  }
}
// Copyright 2010 AOL Platforms.

/**
 * Wrapper around a floating div container.
 *
 * @class
 * @extends com.adtech.DivContainer
 * @constructor
 * @author Pictela Support <support@pictela.com>
 *
 * @param parent reference to the Advert instance of which the DivContainer is
 *     a composite.
 * @param adConfig the JSON configuration of the advert.
 * @param id the unique identifier of the asset container object in the JSON
 *     configuration.
 * @param adEventBus advert level EventDispatcher for all asset containers to
 *     listen for custom events on.
 * @param globalEventBus global EventDispatcher for all interested parties to
 *     listen for page events on.
 */
com.adtech.FloatingDivContainer_2_53_3 = function(parent, adConfig, id, adEventBus,
    globalEventBus) {
  /** @private */
  this.isPercentageRendered = false;
  com.adtech.FloatingDivContainer_2_53_3.supa.constructor.call(
      this, parent, adConfig, id, adEventBus, globalEventBus);
}

com.adtech.Utils_2_53_3.extend(com.adtech.FloatingDivContainer_2_53_3,
    com.adtech.DivContainer_2_53_3);

com.adtech.FloatingDivContainer_2_53_3.MODAL_COLOUR_CONTENT_VARIABLE =
    'Overlay background colour';
com.adtech.FloatingDivContainer_2_53_3.MODAL_OPACITY_CONTENT_VARIABLE = 'Overlay opacity';
com.adtech.FloatingDivContainer_2_53_3.DEFAULT_MODAL_COLOUR = '#000000';
com.adtech.FloatingDivContainer_2_53_3.DEFAULT_MODAL_OPACITY = '0.4';

/**
 * @private
 */
com.adtech.FloatingDivContainer_2_53_3.prototype.init = function(adConfig) {
  var containerConfig = adConfig.assetContainers[this.id];
  if (containerConfig['contentWidthUnit'] == '%' || containerConfig['contentHeightUnit'] == '%') {
    adConfig.assetContainers[this.id].isExpandable = false;
  }
  com.adtech.FloatingDivContainer_2_53_3.supa.init.call(this, adConfig);
}

/**
 * @private
 *
 * Alters the initial floating dimensions only if some of the dimension units are expressed
 * as a percentage of the viewport.
 */
com.adtech.FloatingDivContainer_2_53_3.prototype.setInitialDimensions = function() {
  var viewportDims = com.adtech.Utils_2_53_3.getViewportDims();
  this.originalContentWidth = this.contentWidth;
  this.originalContentHeight = this.contentHeight;
  this.contentWidth = (this.contentWidthUnit == '%' && !this.isExpandable) ?
      com.adtech.Utils_2_53_3.calculatePercentValue(viewportDims.w, this.contentWidth) :
      this.contentWidth;
  this.contentHeight = (this.contentHeightUnit == '%' && !this.isExpandable) ?
      com.adtech.Utils_2_53_3.calculatePercentValue(viewportDims.h, this.contentHeight) :
      this.contentHeight;
  if ((this.contentHeightUnit == '%' || this.contentWidthUnit == '%') && !this.isExpandable) {
    // Percentage rendering, so recalculate clipping region as contentWidth/Height have changed.
    this.isPercentageRendered = true;
    this.initialClipStyle = this.getUnclippedStyle();
  }
}

/**
 * @private
 * Overridden to ensure that floating divs are rendered after the DOM load has taken place.
 */
com.adtech.FloatingDivContainer_2_53_3.prototype.checkRenderEvent = function(type) {
  if (!this.preventRender && !this.rendered && type == this.renderEvent) {
    if (!this.globalEventBus.DOMLoaded) {
      // Change serve event into DOMLoad.
      this.renderEvent = this.rmEvent.DOM_LOAD;
      this.addDOMLoadRenderTimeout();
      return;
    }
    com.adtech.FloatingDivContainer_2_53_3.supa.checkRenderEvent.call(this, type);
  }
}

/** @private */
com.adtech.FloatingDivContainer_2_53_3.prototype.forceRendering = function() {
  com.adtech.FloatingDivContainer_2_53_3.supa.forceRendering.call(this);
  this.render();
}

/**
 * @private
 *
 * Sets the value of the anchor div style. This differs between div implementations.
 */
com.adtech.FloatingDivContainer_2_53_3.prototype.setAnchorDivStyle = function() {
  // Floating divs should not affect page layout at all.
  var targetWidth = targetHeight = 1;
  this.anchorDivStyle = 'width:' + targetWidth + 'px;' + 'height:' + targetHeight +
      'px;position:relative;';
}

/** @private */
com.adtech.FloatingDivContainer_2_53_3.prototype.createContentDiv = function() {
  if (this.modal) {
    this.createModalLayer();
  }
  this.setFloatingOffsets();
  this.setInitialDimensions();
  this.checkPublisherPositionalOverrides();
  // Switch style position to be fixed if stickyX and stickyY.
  this.fixedPosition = (com.adtech.Utils_2_53_3.canUseFixedPositioning() && this.stickyX && this.stickyY) ? true : false;
  if (this.fixedPosition &&
      (this.xRel == com.adtech.AssetContainerAlignmentOption_2_53_3.PAGE_RIGHT)) {
    var leftPos = null;
    var rightPos = -this.x - this.contentWidth + 'px';
  } else {
    var leftPos = this.floatOffsetLeft + this.x + 'px';
    var rightPos = null;
  }
  if (this.fixedPosition &&
      (this.yRel == com.adtech.AssetContainerAlignmentOption_2_53_3.PAGE_BOTTOM)) {
    var topPos = null;
    var bottomPos = -this.y - this.contentHeight + 'px';
  } else {
    var topPos = this.floatOffsetTop + this.y + 'px';
    var bottomPos = null;
  }

  this.createDiv(this.contentId, this.fixedPosition ? 'fixed' : 'absolute',
      this.contentWidth + 'px', this.contentHeight + 'px', leftPos, topPos,
      this.zIndex, this.initialClipStyle, rightPos, bottomPos);
  this.checkCloseTimeout();
}

/**
 * @private
 */
com.adtech.FloatingDivContainer_2_53_3.prototype.createDiv =
    function(id, position, width, height, left, top, zIndex, clip, right, bottom) {
  var div = document.createElement('div');
  div.setAttribute('id', id);
  div.style.position = position;
  div.style.width = width;
  div.style.height = height;
  if (left) {
    div.style.left = left;
  }
  if (right) {
    div.style.right = right;
  }
  if (top) {
    div.style.top = top;
  }
  if (bottom) {
    div.style.bottom = bottom;
  }
  div.style.zIndex = zIndex;
  div.style.padding = '0px';
  div.style.margin = '0px';
  if (clip) {
    div.style.clip = clip;
  }
  if (this.forceRender) {
    // insertBefore. Also start the rendering process here!
    document.body.insertBefore(div, document.body.firstChild);
  } else {
    document.body.appendChild(div);
  }
  return div;
}

/**
 * @private
 */
com.adtech.FloatingDivContainer_2_53_3.prototype.createModalLayer = function() {
  var viewportDims = com.adtech.Utils_2_53_3.getViewportDims();
  this.modalDiv = this.createDiv(this.contentId + '_modal', 'fixed', viewportDims.w + 'px',
      viewportDims.h + 'px', '0px', '0px', this.zIndex - 1);
  var userDefinedModalOpacity = this.parent.getContentVariable(
      com.adtech.FloatingDivContainer_2_53_3.MODAL_OPACITY_CONTENT_VARIABLE);
  var userDefinedModalBackgroundColour = this.parent.getContentVariable(
      com.adtech.FloatingDivContainer_2_53_3.MODAL_COLOUR_CONTENT_VARIABLE);
  var modalOpacity =
    userDefinedModalOpacity || com.adtech.FloatingDivContainer_2_53_3.DEFAULT_MODAL_OPACITY;
  var modalColour =
    userDefinedModalBackgroundColour || com.adtech.FloatingDivContainer_2_53_3.DEFAULT_MODAL_COLOUR;
  this.modalDiv.style.opacity = modalOpacity;
  this.modalDiv.style.filter = 'alpha(opacity:' + (parseFloat(modalOpacity) * 100) + ')';
  this.modalDiv.style.backgroundColor =
      (modalColour.indexOf('#') != 0) ? '#' + modalColour : modalColour;
  com.adtech.Utils_2_53_3.registerNativeEventHandler(this.modalDiv, 'click',
      com.adtech.Utils_2_53_3.createClosure(this, this.modalClickHandler));
}

/**
 * @private
 */
com.adtech.FloatingDivContainer_2_53_3.prototype.adjustModalDiv = function(event) {
  this.modalDiv.style.width = event.width + 'px';
  this.modalDiv.style.height = event.height + 'px';
}

/**
 * @private
 */
com.adtech.FloatingDivContainer_2_53_3.prototype.checkPublisherPositionalOverrides = function() {
  if (this.xRel == com.adtech.AssetContainerAlignmentOption_2_53_3.PAGE_LEFT) {
   var publisherOverrideX = parseInt(this.parent.pubVars.overrideX);
   this.x = (isNaN(publisherOverrideX)) ? this.x : publisherOverrideX;
  }
  if (this.yRel == com.adtech.AssetContainerAlignmentOption_2_53_3.PAGE_TOP) {
    var publisherOverrideY = parseInt(this.parent.pubVars.overrideY);
    this.y = (isNaN(publisherOverrideY)) ? this.y : publisherOverrideY;
  }
}

/**
 * @private
 */
com.adtech.FloatingDivContainer_2_53_3.prototype.addStickyOffsets = function(event) {
  if (this.stickyY) {
    this.floatOffsetTop += event.offsetY;
  }
  if (this.stickyX) {
    this.floatOffsetLeft += event.offsetX;
  }
}

/**
 * @private
 *
 * Invoked on page resize for only percent with/height rendered divs.
 */
com.adtech.FloatingDivContainer_2_53_3.prototype.resize = function() {
  var viewportDims = com.adtech.Utils_2_53_3.getViewportDims();
  if (this.contentWidthUnit == '%') {
    this.contentWidth = com.adtech.Utils_2_53_3.calculatePercentValue(
        viewportDims.w, this.originalContentWidth);
    this.div.style.width = this.contentWidth + 'px';
  }
  if (this.contentHeightUnit == '%') {
    this.contentHeight = com.adtech.Utils_2_53_3.calculatePercentValue(
        viewportDims.h, this.originalContentHeight);
    this.div.style.height = this.contentHeight + 'px';
  }
  if (this.visible) {
    this.div.style.clip = this.getUnclippedStyle();
  }
}

/**
 * @private
 */
com.adtech.FloatingDivContainer_2_53_3.prototype.reposition = function() {
  if (this.rendered && !this.closed) {
    var alignmentOption = com.adtech.AssetContainerAlignmentOption_2_53_3;
    if (this.stickyX || this.xRel == alignmentOption.AD_SLOT_LEFT) {
      this.div.style.left = this.floatOffsetLeft + this.x + 'px';
    }
    if (this.stickyY || this.yRel == alignmentOption.AD_SLOT_TOP) {
      this.div.style.top = this.floatOffsetTop + this.y + 'px';
    }
  }
}

/**
 * @private
 * @override
 */
com.adtech.FloatingDivContainer_2_53_3.prototype.expandAnchorDiv = function() {}

/**
 * @private
 * @override
 */
com.adtech.FloatingDivContainer_2_53_3.prototype.contractAnchorDiv = function() {}

/**
 * @override
 */
com.adtech.FloatingDivContainer_2_53_3.prototype.render = function() {
  // Ensure that floating ads always attempt to render after DOM load.
  if (!this.forceRender && !this.globalEventBus.DOMLoaded) {
    this.globalEventBus.addEventListener(this.rmEvent.DOM_LOAD,
        com.adtech.Utils_2_53_3.createClosure(this, this.render));
    return;
  }
  com.adtech.FloatingDivContainer_2_53_3.supa.render.call(this);
}

/** @private */
com.adtech.FloatingDivContainer_2_53_3.prototype.checkCloseTimeout = function() {
  // Publisher timeout always presides over creative one.
  var pubTimeout = (this.parent.pubVars.closeTimeout == '0') ? 0 : this.parent.pubVars.closeTimeout;
  var t = pubTimeout || this.closeTimeout;
  var closeTimeout = parseInt(t);
  if (!isNaN(closeTimeout) && closeTimeout) {
    var self = this;
    var eventToDispatch = (this.isTiedToAnInPageUnit()) ? this.rmEvent.HIDE : this.rmEvent.CLOSE;
    this.autoCloseTimeout = setTimeout(com.adtech.Utils_2_53_3.createClosure(self.content,
        self.content.dispatchAdvertLevelEvent, new self.rmEvent(eventToDispatch)),
        (closeTimeout * 1000));
  }
}

/** @private */
com.adtech.FloatingDivContainer_2_53_3.prototype.isTiedToAnInPageUnit = function() {
  for (var key in this.parent.assetContainers) {
    if (this.parent.assetContainers.hasOwnProperty(key)) {
      var assetContainer = this.parent.assetContainers[key];
      if (this.id != assetContainer.id) {
        if (!(assetContainer instanceof com.adtech.FloatingDivContainer_2_53_3)) {
          return true;
        }
      }
    }
  }
  return false;
}

// Actions API

/**
 * @inheritDoc
 */
com.adtech.FloatingDivContainer_2_53_3.prototype.show = function() {
  if (!this.rendered) {
    this.render();
    return;
  }
  if (!this.visible && this.rendered) {
    this.div.style.clip = this.preHiddenClipStyle;
    /*
     * z-index bump up and down to fix webkit rendering issues where the Flash object is not
     * visible until the page is resized/scrolled. Additionally we force the display of the
     * content object.
     * @see hide
     */
    this.div.style.zIndex++;
    if (this.modalDiv) {
      this.modalDiv.style.visibility = 'visible';
    }
    this.content.contentObject.style.display = 'block';
    com.adtech.FloatingDivContainer_2_53_3.supa.show.call(this);
  }
}

/**
 * @inheritDoc
 */
com.adtech.FloatingDivContainer_2_53_3.prototype.hide = function() {
  if (this.rendered && this.visible) {
    /*
     * For hiding, we clip the divs to 0px in order to retain any communication between Flash
     * and JavaScript for IE.
     */
    this.preHiddenClipStyle = this.div.style.clip;
    this.div.style.clip = 'rect(0px, 0px, 0px, 0px)';
    this.div.style.zIndex--;
    if (this.modalDiv) {
      this.modalDiv.style.visibility = 'hidden';
    }
    com.adtech.FloatingDivContainer_2_53_3.supa.hide.call(this);
  }
}

/**
 * Closes the div container if it's already rendered and invisible.
 */
com.adtech.FloatingDivContainer_2_53_3.prototype.close = function() {
  if (this.rendered && !this.closed) {
    this.setCoreLibPageEventListeners(false);
    if (this.closeDelayTimeout) {
      return;
    }
    this.div.style.visibility = 'hidden';
    // Timeout added to prevent iOS browsers from crashing when close command
    // is invoked in response to a message sent from the iframe.
    var self = this;
    this.closeDelayTimeout = setTimeout(function() {
      com.adtech.DivContainer_2_53_3.supa.close.call(self);
      self.div.parentNode.removeChild(self.div);
      if (self.modalDiv) {
        self.modalDiv.parentNode.removeChild(self.modalDiv);
      }
    }, 100);
  }
}

// Event handlers
/** @private */
com.adtech.FloatingDivContainer_2_53_3.prototype.modalClickHandler = function() {
  this.content.dispatchAdvertLevelEvent(new this.rmEvent(this.rmEvent.CLOSE));
}


/**
 * @private
 *
 * Overridden to deal with page resize or scroll events in order to reposition or resize the div
 * if required.
 */
com.adtech.FloatingDivContainer_2_53_3.prototype.coreLibEventHandler = function(event) {
  if (this.xRel == com.adtech.AssetContainerAlignmentOption_2_53_3.AD_SLOT_LEFT ||
      this.yRel == com.adtech.AssetContainerAlignmentOption_2_53_3.AD_SLOT_TOP ||
      this.stickyX || this.stickyY) {
    switch (event.type) {
      case this.rmEvent.PAGE_SCROLL:
      case this.rmEvent.PAGE_RESIZE:
      case this.rmEvent.ORIENTATION_CHANGE:
        this.setFloatingOffsets();
        if (!this.fixedPosition) {
          this.addStickyOffsets(event);
          try {
            this.reposition();
          } catch (e) {};
        }
        break;
    }
  }
  if (this.isPercentageRendered && this.rendered &&
      (event.type == this.rmEvent.PAGE_RESIZE || event.type == this.rmEvent.PAGE_SCROLL)) {
    this.resize();
    var adContainerEvent = new this.rmEvent(this.rmEvent.RESIZE).
      property('containerId', this.id).
      property('availableHeight', this.contentHeight).
      property('availableWidth', this.contentWidth).
      property('viewable', this.visibleinViewport)
    this.dispatchEvent(adContainerEvent);
  }
  if (event.type == this.rmEvent.ENGAGEMENT) {
    // Cancel the auto close timeout if it's there.
    if (this.autoCloseTimeout != null) {
      clearTimeout(this.autoCloseTimeout);
    }
  }
  if (this.modalDiv && event.type == this.rmEvent.PAGE_RESIZE) {
    this.adjustModalDiv(event);
  }
  com.adtech.FloatingDivContainer_2_53_3.supa.coreLibEventHandler.call(this, event);
}
// Copyright 2010 AOL Platforms.

/**
 * Dummy container class to support formats that do not require a content container
 * e.g: wallpaper ads.
 *
 * @class
 * @extends com.adtech.AssetContainer
 * @constructor
 * @author Pictela Support <support@pictela.com>
 *
 * @param parent reference to the Advert instance of which the DivContainer is
 *     a composite.
 * @param adConfig the JSON configuration of the advert.
 * @param id the unique identifier of the asset container object in the JSON
 *     configuration.
 * @param adEventBus advert level EventDispatcher for all asset containers to
 *     listen for custom events on.
 * @param globalEventBus global EventDispatcher for all interested parties to
 *     listen for page events on.
 */
com.adtech.NoContentContainer_2_53_3 =
    function(parent, adConfig, id, adEventBus, globalEventBus) {
  com.adtech.NoContentContainer_2_53_3.supa.constructor.call(
      this, parent, adConfig, id, adEventBus, globalEventBus);
}

com.adtech.Utils_2_53_3.extend(com.adtech.NoContentContainer_2_53_3,
    com.adtech.AssetContainer_2_53_3);

com.adtech.NoContentContainer_2_53_3.prototype.init = function(adConfig) {
  var containerObj = adConfig.assetContainers[this.id];
  for (var prop in containerObj) {
    if (containerObj.hasOwnProperty(prop)) {
      this[prop] = containerObj[prop];
    }
  }
  // Set the following property to ensure that the view timer can be started.
  this.visibleinViewport = true;
  this.addRenderEventListeners();
}
// Copyright 2010 AOL Platforms.

/**
 * Static factory function for creating different asset container objects.
 *
 * @author Pictela Support <support@pictela.com>
 */
com.adtech.AssetContainerFactory_2_53_3 = function() {};

com.adtech.AssetContainerFactory_2_53_3.CHROMELESS_POPUP = "chromelessPopup";
com.adtech.AssetContainerFactory_2_53_3.POPUP = "popup";
com.adtech.AssetContainerFactory_2_53_3.INLINE_DIV = "inlineDiv";
com.adtech.AssetContainerFactory_2_53_3.FLOATING_DIV = "floatingDiv";
com.adtech.AssetContainerFactory_2_53_3.NO_CONTENT = "noContent";

/**
 * @private
 * @param type the type of container to create.
 * @param parent the advert instance that is creating the container.
 * @param adConfig the advert configuration JSON object.
 * @param id the unique identifier of the asset container object in the JSON
 *     configuration.
 * @param adEventBus advert level EventDispatcher for all asset containers to
 *     listen for custom events on.
 * @param globalEventBus global EventDispatcher for all interested parties to
 *     listen for page events on.
 */
com.adtech.AssetContainerFactory_2_53_3.getContainer =
    function(type, parent, adConfig, id, adEventBus, globalEventBus) {
  switch (type) {
    case this.CHROMELESS_POPUP:
      var objectType = (typeof com.adtech.debugLogger_2_53_3 == 'undefined') ?
          com.adtech.ChromelessWindowContainer_2_53_3 :
          com.adtech.PreviewChromelessWindowContainer_2_53_3;
      return new objectType(parent, adConfig, id, adEventBus, globalEventBus);
    break;
    case this.POPUP:
      return new com.adtech.WindowContainer_2_53_3(
          parent, adConfig, id, adEventBus, globalEventBus);
      break;
    case this.INLINE_DIV:
      return new com.adtech.DivContainer_2_53_3(
          parent, adConfig, id, adEventBus, globalEventBus);
    case this.FLOATING_DIV:
      return new com.adtech.FloatingDivContainer_2_53_3(
          parent, adConfig, id, adEventBus, globalEventBus);
    break;
    case this.NO_CONTENT:
      return new com.adtech.NoContentContainer_2_53_3(
          parent, adConfig, id, adEventBus, globalEventBus);
    default:
      return null;
  }
}
// Copyright 2010 AOL Platforms.

/**
 * Wrapper for HTML ad content.
 *
 * @class
 * @extends com.adtech.EventDispatcher
 * @constructor
 * @author Pictela Support <support@pictela.com>
 *
 * @param parent the AssetContainer instance of which the HtmlContent is a
 *     composite.
 * @param adConfig the JSON configuration of the advert
 * @param assetContainerId the unique identifier of the asset container object
 *     in the JSON configuration wrapping the content instance.
 * @param targetId the id of the node to populate with the content.
 */
com.adtech.HtmlContent_2_53_3 = function(parent, adConfig, assetContainerId, eventBus,
    globalEventBus, targetId) {
  com.adtech.HtmlContent_2_53_3.supa.constructor.call(this);
  /** @private */
  this.parent = parent;
  /** @private */
  this.eventBus = eventBus;
  /** @private */
  this.containerObject = null;
  /**
   * @private
   *
   * Flag used to indicate if the content object should handle the mouseover and mouseout
   * events (the container would delegate this to the content). Only one use case for this
   * at the moment - When flash content has been set to use window as the wmode.
   * */
  this.shouldHandleMouseEvents = false;
  /**  @private */
  this.mouseIsOver = null;
  /**
   * Flag used to indicate if the content has been rendered and is initialised.
   */
  this.contentReady = false;
  /**  @private */
  this.outgoingMessageQueue = [];
  /**
   * A reference to the actual DOM content object (i.e: Embedded Flash object/Iframe object).
   * This reference will be null prior to the content being rendered.
   */
  this.contentObject = null;
  /**
   * @private
   */
  this.globalEventBus = globalEventBus;
  /**
   * A flag indicating if the content has been rendered.
   * @type Boolean
   */
  this.rendered = false;
  /** @private */
  this.DOMContext = document;
  /** @private */
  this.advertRef = this.parent.parent;
  /** @private */
  this.targetId = targetId;
  /** @private */
  this.pageLoadForced = false;
  /** @private */
  this.isStaticContent = false;
  /** @private */
  this.contentIsOne = false;
  this.init(adConfig, assetContainerId);
}

com.adtech.Utils_2_53_3.extend(com.adtech.HtmlContent_2_53_3,
    com.adtech.EventDispatcher_2_53_3);

/**
 * For class constants, please see common/HtmlConstants.js
 */

/**
 * @private
 *
 * The delay (in milliseconds) between each queued message that we send into the content, once
 * rendered from the outgoingMessageQueue array. Running with no delay causes browsers to crash
 * (for externalInterface transactions, anyhow).
 */
com.adtech.HtmlContent_2_53_3.QUEUED_MESSAGE_PUSH_DELAY = 50;

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.init = function(adConfig, assetContainerId) {
  /*
   * TODO: No real chance that adConfig.assetContainers[assetContainerId] will
   * be undefined (You'll see why in AssetContainer), however throughout this
   * library I have omitted throwing exceptions. I'm sat on the fence at the
   * moment between silent failures and logging issues with the console for
   * production ads. We can not and should not throw exceptions that we do not
   * catch.
   */
  com.adtech.Utils_2_53_3.debug('HtmlContent init method invoked.');
  com.adtech.Utils_2_53_3.debug('adConfig is ' + adConfig + 'assetContainerId: ' + assetContainerId);
  var assetConfig = adConfig.assetContainers[assetContainerId];
  this.content = assetConfig.content;
  this.langVersion = (assetConfig.langVersion) ? assetConfig.langVersion : 0;
  com.adtech.Utils_2_53_3.debug('HtmlContent post check for langVersion.');
  this.width = (this.renderWidthAsPercentage(assetConfig)) ? '100%' : assetConfig.contentWidth;
  this.height = (this.renderHeightAsPercentage(assetConfig)) ? '100%' : assetConfig.contentHeight;
  var rmEvent = com.adtech.RichMediaEvent_2_53_3;
  this.globalEventBus.addEventListener(rmEvent.PAGE_LOAD, this.customEventHandler, this);
  this.globalEventBus.addEventListener(rmEvent.PAGE_RESIZE, this.customEventHandler, this);
  this.globalEventBus.addEventListener(rmEvent.PAGE_SCROLL, this.customEventHandler, this);
  com.adtech.Utils_2_53_3.addCustomEventHandler(this.eventBus, this, adConfig.events);
  var advertEventsToDispatchToContent = [rmEvent.ENGAGEMENT, rmEvent.IN_VIEWPORT,
                                         rmEvent.OUT_VIEWPORT, rmEvent.INTERACTIVE_IMPRESSION];
  for (var i = 0; i < advertEventsToDispatchToContent.length; i++) {
    this.eventBus.addEventListener(advertEventsToDispatchToContent[i],
        this.customEventHandler, this);
  }

  this.setAdConfig(adConfig);
  // Give content the ability to pick up on mouseOver and mouseOut events.
  this.parent.addEventListener(rmEvent.MOUSE_OVER, this.customEventHandler, this);
  this.parent.addEventListener(rmEvent.MOUSE_OUT, this.customEventHandler, this);
  this.parent.addEventListener(rmEvent.VIEWABLE_CHANGE, this.customEventHandler, this);
  this.parent.addEventListener(rmEvent.CONTAINER_RESIZE, this.customEventHandler, this);
}

/**
 * @private
 *
 * HTML content requires the adConfig to be stored and sent to the iframe via postMessage.
 */
com.adtech.HtmlContent_2_53_3.prototype.setAdConfig = function(adConfig) {
  this.adConfig = adConfig;
  if (typeof com.adtech.debugLogger_2_53_3 != 'undefined') {
    this.adConfig.adtechDisableClickTracking = true;
  }
}

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.renderWidthAsPercentage = function(assetConfig) {
  return (assetConfig.isResponsive ||
        (this.containerIsFloatingDiv(assetConfig) && !assetConfig.isExpandable &&
            assetConfig.contentWidthUnit == '%'));
}

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.renderHeightAsPercentage = function(assetConfig) {
  return (assetConfig.isResponsive ||
      (this.containerIsFloatingDiv(assetConfig) && !assetConfig.isExpandable &&
       assetConfig.contentHeightUnit == '%'));
}

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.containerIsFloatingDiv = function(assetConfig) {
  return (assetConfig.type == com.adtech.AssetContainerFactory_2_53_3.FLOATING_DIV);
}

/**
 * @private
 * @param context the document on which to perform operations. By default, DOM
 *     operations are performed on the current document.
 */
com.adtech.HtmlContent_2_53_3.prototype.setDOMContext = function(context) {
  this.DOMContext = context;
}

/**
 * @private
 *
 * Renders the defined content as a child of the element in the DOM with the
 * relevant id.
 */
com.adtech.HtmlContent_2_53_3.prototype.render = function() {
  com.adtech.Utils_2_53_3.debug('HtmlContent rendered.');
  this.containerObject = this.DOMContext.getElementById(this.targetId);
  this.renderContent();
  this.rendered = true;
  this.dispatchEvent(com.adtech.RichMediaEvent_2_53_3.RENDER);
}

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.forcePageLoad = function() {
  this.dispatchToContent(this.createContentEvent(
      new com.adtech.RichMediaEvent_2_53_3(com.adtech.RichMediaEvent_2_53_3.PAGE_LOAD)));
  this.pageLoadForced = true;
}
/** @private */
com.adtech.HtmlContent_2_53_3.prototype.getWindowScript = function() {
  return '';
}

/**
 * @private
 *
 * Method that actually handles the rendering. This method should be overridden
 * in subclasses which require a different rendering technique other than a
 * simple innerHTML change.
 */
com.adtech.HtmlContent_2_53_3.prototype.renderContent = function() {
  if (com.adtech.Utils_2_53_3.fileIsImage(this.content)) {
    // Simple image render.
    this.isStaticContent = true;
    this.containerObject.innerHTML = this.advertRef.getBackupImageHTML(this.content);
    this.contentInitialised();
  } else {
    // Iframe render.
    var iframeObjId = this.targetId + '_iframe';
    /*
     * Shortest UserAgent QueryString length limit
     * IE :2083
     * HTML ad supported browsers: IE8+, Opera 9.5, FF3, Safari, Chrome.
     */
    this.addPostMessageListener();
    // TODO(samuel.adu): Port checking in for same origin check?
    //var port = (window.location.port) ? ':' + window.location.port : '';
    var contentUrl = this.advertRef.getFileUrl(this.content);
    if (this.globalEventBus.pageLoaded) {
      this.forcePageLoad();
    }
    com.adtech.Utils_2_53_3.debug('advert iframe url: ' + contentUrl);
    this.contentOrigin = contentUrl.split('/').splice(0, 3).join('/');
    var iframe = document.createElement('iframe');
    iframe.src = contentUrl;
    iframe.seamless = 'seamless';
    iframe.width = this.width;
    iframe.height = this.height;
    iframe.id = iframeObjId;
    iframe.style.padding = '0px';
    iframe.style.border = '0px none transparent';
    iframe.style.width = this.width.toString().match('%') ? this.width : this.width + 'px';
    iframe.style.height = this.height.toString().match('%') ? this.height : this.height + 'px';
    iframe.scrolling = 'no';
    iframe.frameBorder = 'no';
    iframe.allowtransparency = true;
    com.adtech.IframeUtils_2_53_3.applyAllowFullScreenAttribute(iframe);
    if (com.adtech.Utils_2_53_3.isWebkit()) {
      // Prevent the iframe from flashing white on initial load.
      iframe.style.visibility = 'hidden';
      setTimeout(function() {
        iframe.style.visibility = 'visible';
      }, 200);
    }
    if (com.adtech.IframeUtils_2_53_3.isInFriendlyIframe()) {
      this.addAllowFullscreenAttribute();
    }
    this.containerObject.appendChild(iframe);
    this.contentObject = this.DOMContext.getElementById(iframeObjId);
  }
}

/**
 * @private
 *
 * Adds allowfullscreen attribute to iFrame.
 */
com.adtech.HtmlContent_2_53_3.prototype.addAllowFullscreenAttribute = function() {
  var iframes = window.parent.document.getElementsByTagName('iframe');
  for (var i = 0; i < iframes.length; i++) {
    if (iframes[i].contentWindow == window) {
      com.adtech.IframeUtils_2_53_3.applyAllowFullScreenAttribute(iframes[i]);
    }
  }
}

/**
 * @private
 *
 * @see mraid/HTMLContent
 */
com.adtech.HtmlContent_2_53_3.prototype.getContentEnvironment = function() {
  return com.adtech.HtmlContent_2_53_3.ENVIRONMENT_WEB;
}

/**
 * @private
 *
 * Removes the rendered content from the DOM.
 */
com.adtech.HtmlContent_2_53_3.prototype.remove = function() {
  if ((typeof this.containerObject != 'undefined') && this.rendered) {
    this.containerObject.innerHTML = '';
    this.rendered = false;
    this.contentReady = false;
    if (this.adContentWindow) {
      this.adContentWindow = null;
    }
  }
}

/**
 * @private
 *
 * If invoked, content will attach mouse over and mouse out event listeners to the
 * DOM content objects, as the containers would have delegated the mouse handling
 * responsibility to the content.
 */
com.adtech.HtmlContent_2_53_3.prototype.handleMouseEvents = function() {
  this.shouldHandleMouseEvents = true;
}

/**
 * @private
 *
 * Invoked by the content instruct the JS that the event handlers have
 * been registered. Any failed calls can now be performed.
 */
com.adtech.HtmlContent_2_53_3.prototype.contentInitialised = function() {
  this.contentReady = true;
  if (this.outgoingMessageQueue.length > 0) {
    this.sendQueuedMessagesToContent();
  }
  this.dispatchEvent(com.adtech.RichMediaEvent_2_53_3.READY);
}

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.addToOutgoingQueue = function(data) {
  // foo[foo.length] looks to be better performance-wise across browsers.
  this.outgoingMessageQueue[this.outgoingMessageQueue.length] = data;
}

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.sendQueuedMessagesToContent = function() {
  this.dispatchToContent(this.outgoingMessageQueue.shift());
  if (this.outgoingMessageQueue.length > 0) {
    setTimeout(com.adtech.Utils_2_53_3.createClosure(this, this.sendQueuedMessagesToContent),
        com.adtech.HtmlContent_2_53_3.QUEUED_MESSAGE_PUSH_DELAY);
  }
}

/**
 * @private
 *
 * Creates an object containing event properties that are not tied to the javascript library
 * in order to prepare them to be dispatched to the content.
 */
com.adtech.HtmlContent_2_53_3.prototype.createContentEventProperties = function(event) {
  var eventProps = {};
  var propsToIgnore = ['type', 'target', 'currentTarget'];
  for (var prop in event) {
    if (event.hasOwnProperty(prop)) {
      if (com.adtech.Utils_2_53_3.inArray(prop, propsToIgnore) ||
          typeof event[prop] == 'function') {
        continue;
      }
      eventProps[prop] = event[prop];
    }
  }
  return eventProps;
}

/**
 * @private
 *
 * Dispatches an event to the content.
 */
com.adtech.HtmlContent_2_53_3.prototype.dispatchToContent = function(data) {
  if (!this.isStaticContent && this.contentReady) {
    this.sendMessage(
        this.constructMessage(com.adtech.HtmlContent_2_53_3.CMD_TYPE_DISPATCH, data));
  } else {
    this.addToOutgoingQueue(data);
  }
}

/**
 * Dispatches a custom event via the Advert level event bus in order for all
 * <code>AssetContainers</code> to pick up the event.
 */
com.adtech.HtmlContent_2_53_3.prototype.dispatchAdvertLevelEvent = function(event) {
  // Force event target to be the content instance instead of the eventBus.
  com.adtech.Utils_2_53_3.debug('Advert event follows...');
  com.adtech.Utils_2_53_3.debug(event);
  event.target = this;
  this.eventBus.dispatchEvent(event);
}

/**
 * @private
 *
 * Creates an object specifically formatted for the content type that dispatches an event
 * within the content object.
 */
com.adtech.HtmlContent_2_53_3.prototype.createContentEvent = function(event) {
  if (this.isStaticContent) {
    return null;
  }
  var message = {"type": event.type};
  var eventProps = this.createContentEventProperties(event);
  for (var prop in eventProps) {
    if (eventProps.hasOwnProperty(prop)) {
      message[prop] = eventProps[prop];
    }
  }
  return message;
}

// Post message methods

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.addPostMessageListener = function() {
  if (!this.contentOrigin) {
    // Only add this event handler once.
    com.adtech.Utils_2_53_3.registerNativeEventHandler(window, 'message',
        com.adtech.Utils_2_53_3.createClosure(this, this.postMessageHandler));
  }
}

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.constructMessage = function(type, message) {
  var msg = '';
  if (this.contentIsOne) {
    msg = JSON.stringify({cmd: type, msg: message});
  } else {
    msg = type;
    if (message.adConfig) {
      message.adConfig = JSON.stringify(message.adConfig)
    }
    msg += (message != undefined) ?
        com.adtech.HtmlContent_2_53_3.OBJECT_DELIM + JSON.stringify(message) : '';
  }
  return msg;
}

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.sendMessage = function(message) {
  if (typeof this.adContentWindow != 'undefined') {
    this.adContentWindow.postMessage(message, this.contentOrigin);
  }
}

com.adtech.HtmlContent_2_53_3.prototype.sendEnvironmentInfo = function() {
  var message = {"env": this.getContentEnvironment()};
  this.sendMessage(this.constructMessage(com.adtech.HtmlContent_2_53_3.CMD_TYPE_INIT,
      message));
}

/**
 * @private
 *
 * Sends serialised advert configuration to the advert page in order for the advert page
 * to be able to pull data via the ADTECH core API.
 */
com.adtech.HtmlContent_2_53_3.prototype.sendConfig = function() {
  com.adtech.Utils_2_53_3.debug('HtmlContent sending configuration to content.');
  this.adConfig.clickDestinations = {};
  if (this.adConfig.overrides) {
    delete this.adConfig.overrides;
  }
  this.adConfig.rmLibVersion = '2_53_3';
  var message = {adConfig: this.adConfig, id: this.parent.id};
  this.sendMessage(this.constructMessage(com.adtech.HtmlContent_2_53_3.CMD_TYPE_INIT,
      message));
  this.contentInitialised();
}

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.constructMessageObject = function(message) {
  /*
   * Messages can have a maximum of two parts.
   */
  var messageObj = {};
  try {
    messageObj = JSON.parse(message);
    messageObj.payload = messageObj.msg;
  } catch (error) {
    var messageBits = message.split(com.adtech.HtmlContent_2_53_3.OBJECT_DELIM);
    messageObj.cmd = messageBits[0];
    if (messageBits.length > 1) {
      messageObj.payload = JSON.parse(messageBits[1]);
    }
  }
  return messageObj;
}

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.setMessageFormat = function(messageFormat) {
  this.contentIsOne = (messageFormat == 'one');
}

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.getTypeEventFromMessage = function(msg) {
  var type = '';
  var advertConstants = com.adtech.Advert_2_53_3;
  if (msg.content) {
    type += msg.content + advertConstants.CONTENT_SEPARATOR;
    if (msg.contentItem && msg.contentItem[advertConstants.CONTENT_PROPERTY_TRACKING_KEY]) {
      if (msg.childContent &&
          msg.contentItem[advertConstants.CONTENT_PROPERTY_PARENT_TRACKING_KEY]) {
        type += msg.contentItem[advertConstants.CONTENT_PROPERTY_PARENT_TRACKING_KEY];
      }
      type += msg.contentItem[advertConstants.CONTENT_PROPERTY_TRACKING_KEY] +
          advertConstants.CONTENT_SEPARATOR;
    }

  }
  type += msg.name;
  return type;
}

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.getParamsFromMessage = function(msg) {
  var params = msg.params || {};
  switch (msg.method) {
    case 'logClick':
      return [params.identifier, params.overrideUrl, params.meta];
    case 'contentClick':
    case 'contentView':
      return [params.content, params.contentItem];
    default :
      return [];
  }
}

// End Post message methods

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.logClick = function(identifier,
    overrideUrl, meta) {
  this.advertRef.logClick(identifier, overrideUrl, meta);
}

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.touchStart = function() {
  this.advertRef.setTouchDeviceProperties();
}

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.contentView = function(
    contentName, contentItem) {
  this.advertRef.contentView(contentName, contentItem);
}

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.contentClick = function(
    contentName, contentItem) {
  this.advertRef.contentClick(contentName, contentItem);
}

/**
 * @private
 *
 * Returns a flag indicating if the message received by the post message handler
 * was intended for this content instance.
 */
com.adtech.HtmlContent_2_53_3.prototype.shouldAcceptMessage = function(event) {
  if (event.origin != this.contentOrigin ||
      !this.contentObject || !this.contentObject.contentWindow ||
      this.contentObject.contentWindow != event.source) {
    /*
     *  TODO: Potentially just check without the protocol. IP addresses do not work in all
     *  user agents, due to them (Chrome) dropping the protocol part.
     */
    return false;
  }
  return true;
}



// Event handlers.

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.mouseOverHandler = function() {
  if (!this.mouseIsOver) {
    this.mouseIsOver = true;
    this.dispatchEvent(com.adtech.RichMediaEvent_2_53_3.MOUSE_OVER);
  }
}

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.mouseOutHandler = function() {
  if (this.mouseIsOver) {
    this.mouseIsOver = false;
    this.dispatchEvent(com.adtech.RichMediaEvent_2_53_3.MOUSE_OUT);
  }
}

/**
 * Returns true to indicate message was handled. Returns false to indicate message was ignored
 * because it was from some other content window.
 *
 * @private
 */
com.adtech.HtmlContent_2_53_3.prototype.postMessageHandler = function(event) {
  if (!this.shouldAcceptMessage(event)) {
    return false;
  }
  this.adContentWindow = this.adContentWindow || event.source;
  var messageObj = this.constructMessageObject(event.data);
  switch (messageObj.cmd) {
    case com.adtech.HtmlContent_2_53_3.CMD_TYPE_INIT:
      if (messageObj.payload) {
        this.setMessageFormat(messageObj.payload.format);
      }
      this.sendEnvironmentInfo();
      this.sendConfig();
      break;
    case com.adtech.HtmlContent_2_53_3.CMD_TYPE_DISPATCH:
      if (this.contentIsOne) {
        messageObj.payload.type = this.getTypeEventFromMessage(messageObj.payload);
      }
      var event = new com.adtech.RichMediaEvent_2_53_3(messageObj.payload.type);
      if (typeof messageObj.payload.meta == 'object') {
        event['meta'] = messageObj.payload.meta;
      }
      this.dispatchAdvertLevelEvent(event);
      break;
    case com.adtech.HtmlContent_2_53_3.CMD_TYPE_EXEC:
      if (this.contentIsOne) {
        messageObj.payload.params = this.getParamsFromMessage(messageObj.payload);
      }
      // Only logClick and touchStart are permitted.
      this[messageObj.payload.method].apply(this, messageObj.payload.params);
  }
  return true;
}

/** @private */
com.adtech.HtmlContent_2_53_3.prototype.customEventHandler = function(event) {
  var events = com.adtech.RichMediaEvent_2_53_3;
  if (event.target == this || (this.pageLoadForced && event.type == events.PAGE_LOAD)) {
    /*
     * If this instance dispatched the event, then we do not send the same
     * event back into the HTML content.
     */
    return;
  }
  switch (event.type) {
    case events.PAGE_LOAD:
    case events.PAGE_RESIZE:
    case events.PAGE_SCROLL:
      event.availableWidth = event.width;
      event.availableHeight = event.height;
      event.scrollOffsetTop = event.offsetY;
      event.scrollOffsetLeft = event.offsetX;
  }
  this.dispatchToContent(this.createContentEvent(event));
}
// Copyright 2010 AOL Platforms.

/**
 * @author Pictela Support <support@pictela.com>
 *
 * Constants refactored out of HtmlContent in order to be used by the Core class.
 */

com.adtech.HtmlContent_2_53_3 = com.adtech.HtmlContent_2_53_3 || function(){};

/**  @private */
com.adtech.HtmlContent_2_53_3.CMD_TYPE_DISPATCH = 'dispatch';
/**  @private */
com.adtech.HtmlContent_2_53_3.CMD_TYPE_EXEC = 'exec';
/**  @private */
com.adtech.HtmlContent_2_53_3.CMD_TYPE_INIT = 'init';
/**  @private */
com.adtech.HtmlContent_2_53_3.CMD_TYPE_MRAID = 'CMD_MRAID';
/**  @private */
com.adtech.HtmlContent_2_53_3.CMD_TYPE_VPAID = 'CMD_VPAID';
/**  @private */
com.adtech.HtmlContent_2_53_3.PROPERTY_DELIM = 'A$T$P';
/**  @private */
com.adtech.HtmlContent_2_53_3.OBJECT_DELIM = 'A#T#O';
/**  @private */
com.adtech.HtmlContent_2_53_3.KEY_VALUE_DELIM = '#:#';
/**  @private */
com.adtech.HtmlContent_2_53_3.ENVIRONMENT_WEB = 'WEB';
/**  @private */
com.adtech.HtmlContent_2_53_3.ENVIRONMENT_MRAID = 'MRAID';
/** @private */
com.adtech.HtmlContent_2_53_3.ENVIRONMENT_ORMMA = 'ORMMA';
/** @private */
com.adtech.HtmlContent_2_53_3.ENVIRONMENT_VPAID = 'VPAID';
// Copyright 2013 AOL Advertising

/**
 * A dummy wrapper to facilitate creating assetContainers wihtout content that is
 * managed outside of RMLib.
 *
 * @private
 *
 * @class
 * @extends com.adtech.HtmlContent
 * @constructor
 * @author Pictela Support <support@pictela.com>
 *
 * @param parent the AssetContainer instance of which the NoContent is a
 *     composite.
 * @param adConfig the Advert JSON config object.
 * @param id the unique identifier of the asset container object in the JSON
 *     configuration wrapping the content instance.
 */
com.adtech.NoContent_2_53_3 = function(parent, adConfig, assetContainerId,
    eventBus, globalEventBus, targetId) {
  com.adtech.NoContent_2_53_3.supa.constructor.call(
      this, parent, adConfig, assetContainerId, eventBus, globalEventBus, targetId);
}

com.adtech.Utils_2_53_3.extend(com.adtech.NoContent_2_53_3,
    com.adtech.HtmlContent_2_53_3);

com.adtech.NoContent_2_53_3.prototype.renderContent = function() {}
// Copyright 2010 AOL Platforms.

/**
 * Wrapper around an embedded Flash object.
 *
 * @class
 * @extends com.adtech.HtmlContent
 * @constructor
 * @author Pictela Support <support@pictela.com>
 *
 * @param parent the AssetContainer instance of which the HtmlContent is a
 *     composite.
 * @param adConfig the Advert JSON config object.
 * @param id the unique identifier of the asset container object in the JSON
 *     configuration wrapping the content instance.
 */
com.adtech.FlashContent_2_53_3 = function(parent, adConfig, assetContainerId,
    eventBus, globalEventBus, targetId) {
  /** @private */
  this.params = {};
  /** @private */
  this.objectResizingEnabled = false;
  com.adtech.FlashContent_2_53_3.supa.constructor.call(
      this, parent, adConfig, assetContainerId, eventBus, globalEventBus, targetId);
}

com.adtech.Utils_2_53_3.extend(com.adtech.FlashContent_2_53_3,
    com.adtech.HtmlContent_2_53_3);

/** @private*/
com.adtech.FlashContent_2_53_3.prototype.init = function(adConfig, assetContainerId) {
  com.adtech.FlashContent_2_53_3.supa.init.call(this, adConfig, assetContainerId);
  var assetContainer = adConfig.assetContainers[assetContainerId];
  this.externalInterfaceHandler = this.targetId + '_handler';
  this.params['menu'] = 'false';
  this.params['allowscriptaccess'] = 'always';
  this.params['allowFullScreen'] = 'true';
  this.params['wmode'] = assetContainer.wmode;
  this.flashVersion = assetContainer.pluginVersion;
  this.createFlashVars(adConfig);
  var utils = com.adtech.Utils_2_53_3;
  if ((utils.isMac() && (utils.isSafari() || utils.isFirefox()))) {
    var stageAlignValue = this.generateAlignmentValue(assetContainer);
    if (stageAlignValue) {
      this.objectResizingEnabled = true;
      this.flashVars['salign'] = stageAlignValue;
      this.flashVars['scaleMode'] = 'noScale';
      this.startContracted = assetContainer.startContracted;
    }
  }
}

/** @private */
com.adtech.FlashContent_2_53_3.prototype.generateAlignmentValue = function(assetContainer) {
  var salign = '';
  if (assetContainer.contractedY == 0) {
    salign = 'T';
  } else if (assetContainer.contractedY ==
      (assetContainer.contentHeight - assetContainer.contractedHeight)) {
    salign = 'B';
  }
  if (assetContainer.contractedX == 0) {
    salign += 'L';
  } else if (assetContainer.contractedX ==
      (assetContainer.contentWidth - assetContainer.contractedWidth)) {
    salign += 'R';
  }
  // Salign expansion method only applies to creatives that are aligned to either
  // one of the four corners of the stage.
  return salign.length == 2 ? salign : '';
}

/** @private */
com.adtech.FlashContent_2_53_3.prototype.createFlashVars = function(adConfig) {
  var htmlContentClass = com.adtech.HtmlContent_2_53_3;
  this.flashVars = {
      'renderingDomain': window.location.hostname,
      'keyValueDelim': htmlContentClass.KEY_VALUE_DELIM,
      'propDelim': htmlContentClass.PROPERTY_DELIM,
      'objDelim': htmlContentClass.OBJECT_DELIM,
      'clickTargets': this.serializeClickTargets(adConfig.clickthroughs),
      'preview': adConfig.preview,
      'canvas_id': adConfig.canvasId,
      'flight_id': adConfig.adServerVars.id,
      'banner_id': adConfig.adServerVars.bannerId
  };
}

/** @private */
com.adtech.FlashContent_2_53_3.prototype.forcePageLoad = function() {
  this.flashVars.pageLoaded = 'true';
  this.pageLoadForced = true;
}

/** @private */
com.adtech.FlashContent_2_53_3.prototype.serializeClickTargets = function(clickthroughs) {
  var htmlContentClass = com.adtech.HtmlContent_2_53_3;
  var clickTargetsStr = '';
  for (var clickId in clickthroughs) {
    if (clickthroughs.hasOwnProperty(clickId)) {
      if (clickTargetsStr != '') {
        clickTargetsStr += htmlContentClass.OBJECT_DELIM;
      }
      var clk = clickthroughs[clickId];
      clickTargetsStr += 'id' + htmlContentClass.KEY_VALUE_DELIM + escape(clickId) +
          htmlContentClass.PROPERTY_DELIM + 'target' +
          htmlContentClass.KEY_VALUE_DELIM + escape(clk.target) +
          htmlContentClass.PROPERTY_DELIM + 'features' +
          htmlContentClass.KEY_VALUE_DELIM + escape(clk.features);
    }
  }
  // Double escaping because Flash automatically unescapes FlashVars.
  return escape(clickTargetsStr);
}

/**
 * @private
 * @param context the document on which to perform operations on. By default,
 *     DOM operations are performed on the current document.
 */
com.adtech.FlashContent_2_53_3.prototype.setDOMContext = function(context) {
  com.adtech.FlashContent_2_53_3.supa.setDOMContext.call(this, context);
  com.adtech.swfobject_2_53_3.setDOMContext(context);
}

/**
 * @private
 * @override
 * @see com.adtech.HtmlContent#renderContent
 */
com.adtech.FlashContent_2_53_3.prototype.renderContent = function() {
  /*
   * The object tag will be provided with the same id as the the unique
   * identifier of the FlashContent instance with '_swf' appended to the end.
   * This leaves us with our containers and SWF objects having totally unique
   * ids per serve.
   */
  var swfObjId = this.targetId + '_swf';
  this.containerObject.innerHTML = '<div id="' + swfObjId + '"></div>';
  this.attributes = {'id': swfObjId, 'name': swfObjId, 'style': 'display:block;padding:0px;'};
  this.flashVars.uid = this.targetId;
  if (this.globalEventBus.pageLoaded) {
    this.forcePageLoad();
  }
  this.addExternalInterfaceHandler();
  var swfobj = com.adtech.swfobject_2_53_3;
  var swfUrl = this.advertRef.getFileUrl(this.content);
  if (swfobj.ua.string.toUpperCase().indexOf('AOL') != -1) {
    // Hack to fix the ads in the AOL client. A cached SWF never appears to render.
    swfUrl += '?' + Math.random();
  }
  swfobj.embedSWF(swfUrl, swfObjId, this.width, this.height, this.flashVersion, this.flashVars,
      this.params, this.attributes,
      com.adtech.Utils_2_53_3.createClosure(this, this.embedHandler));
}

/**
 * @private
 *
 * Creates a uniquely named function in the global namespace that handles
 * ExternalInterface calls from the Flash movie. Calls to the global function
 * invoke closures that route back to the relevant FlashContent instance.
 */
com.adtech.FlashContent_2_53_3.prototype.addExternalInterfaceHandler = function() {
  var self = this;
  try {
    this.parent.windowContext[this.targetId + '_handler'] = function(data) {
        return self.flashEventHandler(data);
    };
  } catch (e) {
    /*
     * Chromeless window created content. Cannot add any functions to window object.
     * ExternalInterface handler added by ChromelessWindowContainer.getWindowScript.
     */
  }
}

/**
 * @private
 *
 * Returns a script block that should be inserted into a document to handle External
 * Interface calls in the case of the container being a ChromelessWindow.
 */
com.adtech.FlashContent_2_53_3.prototype.getWindowScript = function() {
  if (typeof window[this.externalInterfaceHandler] != 'function') {
    var self = this;
    window[this.externalInterfaceHandler] = function(data) {
      return self.flashEventHandler(data);
    }
  }
  return '<script type="text/javascript">function ' + this.externalInterfaceHandler + '(data) {' +
      'return parent.' + this.externalInterfaceHandler + '(data);}</script>';
}

/**
 * @private
 *
 * Sends a message into the Flash content via ExternalInterface.
 * TODO(samuel.adu): Sync events.
 *
 * @param data object of data to send to the Flash component. Required
 *     properties: command (String), type (String). Optional: args (Object).
 */
com.adtech.FlashContent_2_53_3.prototype.dispatchToContent = function(data) {
  if (this.contentReady) {
    try {
      // Make sure that ExternalInterface is ready.
      this.contentObject.jsEventHandler(data);
    } catch (e) {
      this.addToOutgoingQueue(data);
    }
  } else {
    this.addToOutgoingQueue(data);
  }
}

/**
 * @private
 * @override
 */
com.adtech.FlashContent_2_53_3.prototype.createContentEvent = function(event) {
  var eventProps = this.createContentEventProperties(event);
  return {'command': com.adtech.HtmlContent_2_53_3.CMD_TYPE_DISPATCH,
      'type': event.type, 'args': eventProps};
}

/**
 * @private
 *
 * Invoked by Flash to instruct the JS that the externalInterface handlers have
 * been registered. Any failed calls can now be performed.
 *
 * @param componentCapabilities object passed back from the Core component to
 *     indicate to the JS what the component is capable of supporting.
 */
com.adtech.FlashContent_2_53_3.prototype.flashInitialised = function(componentCapabilities) {
  this.componentCapabilities = (componentCapabilities) ? componentCapabilities : null;
  this.contentInitialised();
}

/**
 * @private
 *
 * Gets the value of any ad configuration value. The argument must be an array with a single
 * string element. The format of the string must be in dot notation; i.e: adServerVars.baseURL.
 */
com.adtech.FlashContent_2_53_3.prototype.getConfigValue = function(configPath) {
  var argBits = configPath.split('.');
  var bitsLength = argBits.length;
  if (bitsLength > 0) {
    var property = this.advertRef;
    for (var i = 0; i < bitsLength; i++) {
      try {
        property = property[argBits[i]];
      } catch (e) {
        // Property does not exist.
      }
    }
    try {
      return property.toString();
    } catch (e) {
      // Property does not exist.
    }
  }
  return '';
}

/** @private */
com.adtech.FlashContent_2_53_3.prototype.getOffsetX = function() {
  return this.adConfig.assetContainers.main.contractedX;
}

/** @private */
com.adtech.FlashContent_2_53_3.prototype.getOffsetY = function() {
  return this.adConfig.assetContainers.main.contractedY;
}

/** @private */
com.adtech.FlashContent_2_53_3.prototype.contentIsDynamic = function(
    contentName, propertyName) {
  return this.advertRef.contentIsDynamic(contentName, propertyName);
}

/**
 * @private
 * ExternalInterface falls over when sending an object out to the JavaScript, which
 * contains keys that have spaces in them. The core component replaces the spaces with
 * a known string - This method reverses the process.
 */
com.adtech.FlashContent_2_53_3.prototype.contentClick = function(
    contentName, contentItem) {
  var restoredItem = {};
  if (typeof contentItem == 'object') {
    for (var key in contentItem) {
      var restoredKey = key.split(com.adtech.HtmlContent_2_53_3.PROPERTY_DELIM).join(' ');
      restoredItem[restoredKey] = contentItem[key];
      delete contentItem[key];
    }
  }
  com.adtech.FlashContent_2_53_3.supa.contentClick.call(this, contentName, restoredItem);
}

/** @private
 *
 * @param rect object for the expansion in, requiring the following keys:
 * top, right, bottom, left
 */
com.adtech.FlashContent_2_53_3.prototype.resizeObject = function(rectObject) {
  if (!this.objectResizingEnabled || this.componentCapabilities == null) {
    return;
  }
  if (this.contentReady) {
    this.contentObject.style.marginTop = rectObject['top'];
    this.contentObject.style.marginLeft = rectObject['left'];
    this.contentObject.width = this.contentObject.style.width =
        (parseInt(rectObject['right'], 10) - parseInt(rectObject['left'], 10)) + 'px';
    this.contentObject.height = this.contentObject.style.height =
        (parseInt(rectObject['bottom'], 10) - parseInt(rectObject['top'], 10)) + 'px';
  } else {
    var callback = com.adtech.Utils_2_53_3.createClosure(
        this, this.resizeObject);
    this.addEventListener(com.adtech.RichMediaEvent_2_53_3.READY, callback, rectObject);
  }
}

/**
 * @private
 *
 * Controls if Flash launches the windows via external Interface or
 * getURL/navigateToURL.
 *
 * Currently: Firefox and IE > 7 launch new windows via external interface for AS3.
 */
com.adtech.FlashContent_2_53_3.prototype.shouldLaunchWinViaExtInterface = function() {
  var asVersion = parseInt(this.langVersion);
  if (asVersion >= 3 &&
      (parseInt(com.adtech.Utils_2_53_3.getIEVersion()['major']) >= 7)) {
    return 'true';
  } else {
    return 'false';
  }
}

//Event handlers.

/**
 * @private
 *
 * Invoked by swfobject once the embedding has taken place. Failure will only
 * ever occur if the required Flash player has not been detected, but this is
 * dealt with sooner than this point, so the code below always assumes
 * success. This method provides us with the handler for the Flash object to
 * invoke ExternalInterface calls on.
 */
com.adtech.FlashContent_2_53_3.prototype.embedHandler = function(event) {
  this.contentObject = event.ref;
  if (this.shouldHandleMouseEvents) {
    /* TODO (samuel.adu): This code does not fire at all on FF/Opera on Linux,
     * and it never seems to fire first time for FF 5.0 on Win. The result of
     * this is that the engagement timer will not be recorded (this conditional
     * code is only executed when wmode is window (rare case). It's not the end
     * of the world, considering that timer stats are averages. If a timer is
     * not started, a zero count WILL NOT be logged.
     */
    com.adtech.Utils_2_53_3.registerNativeEventHandler(this.contentObject, 'mouseover',
        com.adtech.Utils_2_53_3.createClosure(this, this.mouseOverHandler));
    com.adtech.Utils_2_53_3.registerNativeEventHandler(this.contentObject, 'mouseout',
        com.adtech.Utils_2_53_3.createClosure(this, this.mouseOutHandler));
  }
}

/**
 * @private
 *
 * Handles the events dispatched from Flash to the JS.
 *
 * @param payload an object containing at least one property
 */
com.adtech.FlashContent_2_53_3.prototype.flashEventHandler = function(payload) {
  com.adtech.Utils_2_53_3.debug(+new Date(), 'Flash movie making call out', payload);
  switch (payload.command) {
    case com.adtech.HtmlContent_2_53_3.CMD_TYPE_DISPATCH:
      var event = new com.adtech.RichMediaEvent_2_53_3(payload.type);
      if (typeof payload.meta == 'object') {
        event['meta'] = payload.meta;
      }
      this.dispatchAdvertLevelEvent(event);
      break;
    case com.adtech.HtmlContent_2_53_3.CMD_TYPE_EXEC:
      var args = (payload.args) ? payload.args : [];
      if (typeof this[payload.type] == 'function') {
        return this[payload.type].apply(this, args);
      } else {
        var returnValue = this.advertRef[payload.type].apply(this.advertRef, args);
        if (com.adtech.Utils_2_53_3.isArray(returnValue)) {
          /* Fix required for when containers are expandable and delivered into
           * a friendly iframe. The array constructor is defined in each window, meaning
           * that a check against the parent window Array constructor will result in a false
           * result. (which Flash external interface must do).*/
          return [].slice.call(returnValue);
        }
        com.adtech.Utils_2_53_3.debug(+new Date(), 'Javascript returning value to Flash.');
        return returnValue;
      }
      break;
  }
}
// Copyright 2010 AOL Platforms.

/**
 * Wrapper around a third party script tag.
 *
 * @private
 *
 * @class
 * @extends com.adtech.HtmlContent
 * @constructor
 * @author Pictela Support <support@pictela.com>
 *
 * @param parent the AssetContainer instance of which the ScriptContent is a
 *     composite.
 * @param adConfig the Advert JSON config object.
 * @param id the unique identifier of the asset container object in the JSON
 *     configuration wrapping the content instance.
 */
com.adtech.ScriptContent_2_53_3 = function(parent, adConfig, assetContainerId,
    eventBus, globalEventBus, targetId) {
  com.adtech.ScriptContent_2_53_3.supa.constructor.call(
      this, parent, adConfig, assetContainerId, eventBus, globalEventBus, targetId);
}

com.adtech.Utils_2_53_3.extend(com.adtech.ScriptContent_2_53_3,
    com.adtech.HtmlContent_2_53_3);

com.adtech.ScriptContent_2_53_3.prototype.renderContent = function() {
  this.replaceKeyValues();
  com.adtech.Utils_2_53_3.debug('ScriptContent rendered.');
  /* If tag is a simple iframe tag, simply set the innerHTML of the container div.
   * This prevents the iframe from reloading (which I have noticed) - Which would
   * cause double-counting.
   */
  if (/^\s*<\s*iframe/i.test(this.content)) {
    this.containerObject.innerHTML = this.content;
    return;
  }
  this.tmpContainerObjId = this.targetId + '_tmpContainer';
  document.write('<div id="' + this.tmpContainerObjId + '" style="position:absolute;' +
      'clip:rect(0px, 1px, 1px, 0px)">');
  document.write(this.content);
  document.write('</div>');
  if (this.globalEventBus.DOMLoaded) {
    this.moveThirdPartyContent();
  } else {
    this.globalEventBus.addEventListener(com.adtech.RichMediaEvent_2_53_3.PAGE_LOAD,
        this.moveThirdPartyContent, this);
  }
}

com.adtech.ScriptContent_2_53_3.prototype.moveThirdPartyContent = function() {
  var tmpContainer = document.getElementById(this.tmpContainerObjId);
  var childLength = tmpContainer.childNodes.length;
  var nodesToMove = [];
  for (var i = 0; i < childLength; i++) {
    // Grab references to the elements that we will shift first as if we move
    // them on this first pass then the index value, 'i' will change.
    var element = tmpContainer.childNodes[i];
    if ((element.nodeName == 'SCRIPT') || (element.nodeName == 'NOSCRIPT')) {
      continue;
    } else if ((element.nodeName == 'IMG')) {
      var attributeWidth = parseInt(element.getAttribute('width'));
      var cssWidth = parseInt(element.style.width);
      if ((!isNaN(cssWidth) && cssWidth <= 1) ||
          !isNaN(attributeWidth) && attributeWidth <= 1) {
        // Do not attempt to move any tracking pixels. Could cause double-counting.
        continue;
      }
    }
    nodesToMove.push(element);
  }
  var nodesToMoveLength = nodesToMove.length;
  for (var j = 0; j < nodesToMoveLength; j++) {
    var element = nodesToMove[j];
    element.parentNode.removeChild(element);
    this.containerObject.appendChild(element);
  }
  tmpContainer.style.display = 'none';
}

// TODO(samuel.adu): Move the logic up to Advert.
com.adtech.ScriptContent_2_53_3.prototype.replaceKeyValues = function() {
  if (this.adConfig.pubVars.kvs) {
    var keyValues = this.adConfig.pubVars.kvs.split('#~~#');
    for (var i = 0; i < keyValues.length; i++) {
      var keyValue = keyValues[i].split('#=#');
      if (keyValue.length == 2) {
        var regExp = new RegExp('_' + keyValue[0] + '_', 'g');
        this.content = this.content.replace(regExp, keyValue[1]);
      }
    }
  }
}
// Copyright 2010 AOL Platforms.

/**
 * Static factory function for creating different content object types.
 *
 * @author Pictela Support <support@pictela.com>
 */
com.adtech.ContentFactory_2_53_3 = function(){};

com.adtech.ContentFactory_2_53_3.HTML = 'html';
com.adtech.ContentFactory_2_53_3.FLASH = 'flash';
com.adtech.ContentFactory_2_53_3.SCRIPT = 'script';
com.adtech.ContentFactory_2_53_3.NO_CONTENT = 'noContent';

/**
 * @private
 * @param type the type of container to create.
 * @param parent the AssetContainer instance that is creating the container.
 * @param adConfig the advert configuration JSON object.
 * @param id the unique identifier of the asset container object in the JSON
 *     configuration wrapping the content instance.
 */
com.adtech.ContentFactory_2_53_3.getContent = function(
    type, parent, adConfig, id, eventBus, globalEventBus, targetId) {
  switch(type) {
    case this.HTML:
      return new com.adtech.HtmlContent_2_53_3(
          parent, adConfig, id, eventBus, globalEventBus, targetId);
    break;
    case this.FLASH:
      return new com.adtech.FlashContent_2_53_3(
          parent, adConfig, id, eventBus, globalEventBus, targetId);
    break;
    case this.SCRIPT:
      return new com.adtech.ScriptContent_2_53_3(
          parent, adConfig, id, eventBus, globalEventBus, targetId);
    break;
    case this.NO_CONTENT:
      return new com.adtech.NoContent_2_53_3(
          parent, adConfig, id, eventBus, globalEventBus, targetId);
    break;
  }
}
// Copyright 2010 AOL Platforms.

/**
 * Code inserted into the foot of the compiled richmediaLib.
 *
 * General initialisation code should be placed here.
 *
 * @author Pictela Support <support@pictela.com>
 */
if (typeof adtechIframeHashArray != 'undefined' && self != top) {
  /* Stage 2 of non-friendly iframe serving. This block is invoked when the library
   * is loaded into the 1x1 iframe created within the placement iframe.
   */
  com.adtech.IframeUtils_2_53_3.setIframeObjectsFromHashArray();
  com.adtech.IframeUtils_2_53_3.loadAdJsFile();
} else if (typeof adtechAdManager_2_53_3 == 'undefined') {
  var adtechAdManager_2_53_3 = new com.adtech.AdManager_2_53_3();
  if (typeof adtechAdQueue != 'undefined') {
    adtechAdManager_2_53_3.registerAds(adtechAdQueue);
  }
}
