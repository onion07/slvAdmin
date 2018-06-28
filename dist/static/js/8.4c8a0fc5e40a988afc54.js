webpackJsonp([8],{522:function(e,t,n){n(639);var r=n(197)(n(641),n(642),"data-v-04525cef",null);e.exports=r.exports},526:function(e,t,n){"use strict";function r(e){var t,n;this.promise=new e(function(e,r){if(void 0!==t||void 0!==n)throw TypeError("Bad Promise constructor");t=e,n=r}),this.resolve=o(t),this.reject=o(n)}var o=n(196);e.exports.f=function(e){return new r(e)}},527:function(e,t,n){var r=n(134),o=n(49)("toStringTag"),a="Arguments"==r(function(){return arguments}()),i=function(e,t){try{return e[t]}catch(e){}};e.exports=function(e){var t,n,l;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=i(t=Object(e),o))?n:a?r(t):"Object"==(l=r(t))&&"function"==typeof t.callee?"Arguments":l}},528:function(e,t,n){var r=n(65),o=n(196),a=n(49)("species");e.exports=function(e,t){var n,i=r(e).constructor;return void 0===i||void 0==(n=r(i)[a])?t:o(n)}},529:function(e,t,n){var r,o,a,i=n(195),l=n(543),c=n(201),s=n(135),u=n(33),f=u.process,d=u.setImmediate,p=u.clearImmediate,v=u.MessageChannel,h=u.Dispatch,b=0,y={},m=function(){var e=+this;if(y.hasOwnProperty(e)){var t=y[e];delete y[e],t()}},g=function(e){m.call(e.data)};d&&p||(d=function(e){for(var t=[],n=1;arguments.length>n;)t.push(arguments[n++]);return y[++b]=function(){l("function"==typeof e?e:Function(e),t)},r(b),b},p=function(e){delete y[e]},"process"==n(134)(f)?r=function(e){f.nextTick(i(m,e,1))}:h&&h.now?r=function(e){h.now(i(m,e,1))}:v?(o=new v,a=o.port2,o.port1.onmessage=g,r=i(a.postMessage,a,1)):u.addEventListener&&"function"==typeof postMessage&&!u.importScripts?(r=function(e){u.postMessage(e+"","*")},u.addEventListener("message",g,!1)):r="onreadystatechange"in s("script")?function(e){c.appendChild(s("script")).onreadystatechange=function(){c.removeChild(this),m.call(e)}}:function(e){setTimeout(i(m,e,1),0)}),e.exports={set:d,clear:p}},530:function(e,t){e.exports=function(e){try{return{e:!1,v:e()}}catch(e){return{e:!0,v:e}}}},531:function(e,t,n){var r=n(65),o=n(66),a=n(526);e.exports=function(e,t){if(r(e),o(t)&&t.constructor===e)return t;var n=a.f(e);return(0,n.resolve)(t),n.promise}},532:function(e,t,n){"use strict";var r=Object.prototype.hasOwnProperty,o=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),a=function(e){for(var t;e.length;){var n=e.pop();if(t=n.obj[n.prop],Array.isArray(t)){for(var r=[],o=0;o<t.length;++o)void 0!==t[o]&&r.push(t[o]);n.obj[n.prop]=r}}return t};t.arrayToObject=function(e,t){for(var n=t&&t.plainObjects?Object.create(null):{},r=0;r<e.length;++r)void 0!==e[r]&&(n[r]=e[r]);return n},t.merge=function(e,n,o){if(!n)return e;if("object"!=typeof n){if(Array.isArray(e))e.push(n);else{if("object"!=typeof e)return[e,n];(o.plainObjects||o.allowPrototypes||!r.call(Object.prototype,n))&&(e[n]=!0)}return e}if("object"!=typeof e)return[e].concat(n);var a=e;return Array.isArray(e)&&!Array.isArray(n)&&(a=t.arrayToObject(e,o)),Array.isArray(e)&&Array.isArray(n)?(n.forEach(function(n,a){r.call(e,a)?e[a]&&"object"==typeof e[a]?e[a]=t.merge(e[a],n,o):e.push(n):e[a]=n}),e):Object.keys(n).reduce(function(e,a){var i=n[a];return r.call(e,a)?e[a]=t.merge(e[a],i,o):e[a]=i,e},a)},t.assign=function(e,t){return Object.keys(t).reduce(function(e,n){return e[n]=t[n],e},e)},t.decode=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}},t.encode=function(e){if(0===e.length)return e;for(var t="string"==typeof e?e:String(e),n="",r=0;r<t.length;++r){var a=t.charCodeAt(r);45===a||46===a||95===a||126===a||a>=48&&a<=57||a>=65&&a<=90||a>=97&&a<=122?n+=t.charAt(r):a<128?n+=o[a]:a<2048?n+=o[192|a>>6]+o[128|63&a]:a<55296||a>=57344?n+=o[224|a>>12]+o[128|a>>6&63]+o[128|63&a]:(r+=1,a=65536+((1023&a)<<10|1023&t.charCodeAt(r)),n+=o[240|a>>18]+o[128|a>>12&63]+o[128|a>>6&63]+o[128|63&a])}return n},t.compact=function(e){for(var t=[{obj:{o:e},prop:"o"}],n=[],r=0;r<t.length;++r)for(var o=t[r],i=o.obj[o.prop],l=Object.keys(i),c=0;c<l.length;++c){var s=l[c],u=i[s];"object"==typeof u&&null!==u&&-1===n.indexOf(u)&&(t.push({obj:i,prop:s}),n.push(u))}return a(t)},t.isRegExp=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},t.isBuffer=function(e){return null!==e&&void 0!==e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))}},533:function(e,t,n){"use strict";var r=String.prototype.replace,o=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return r.call(e,o,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},534:function(e,t,n){"use strict";function r(e,t,n,r){if(void 0===e||"object"!==(void 0===t?"undefined":s()(t))||Array.isArray(t)||"function"!=typeof n)return!1;p.a.get(e,{params:t}).then(function(e){"function"==typeof n&&n(e.data)}).catch(function(e){console.log(e),"function"==typeof r&&r(e)})}function o(e,t,n){if(void 0===e||"object"!==(void 0===t?"undefined":s()(t))||Array.isArray(t)||"function"!=typeof n)return!1;p.a.get(e,{params:t}).then(function(e){var t=void 0!==e.data.b.pageData&&e.data.b.pageData,r=void 0!==e.data.b.dataTotal&&e.data.b.dataTotal;if(e.data.b.pageData.length){if(t[0].headPic||t[0].qsStatus||t[0].urls){var o=["不通过","未知","通过"];console.log("有聊审核模块..."),t.filter(function(e){return e.headPic+="&x-oss-process=image/resize,m_lfit,h_200,w_135",e.qsStatus=o[e.qsStatus],e.urls=e.urls.map(function(e){return e+="?x-oss-process=image/resize,m_lfit,h_200,w_135"}),e})}(t[0].osType||t[0].osVersion||t[0].phone)&&(console.log("关键字与审计模块..."),t.map(function(e){return e.flag=0===e.flag?"登录":"注册",e.status="undefined"===e.status?"":1===e.status?"成功":"失败",e.ip=void 0===e.ip?"":e.ip,e.phone=e.phone.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2"),e})),(t[0].objId||t[0].objType||t[0].processedResult)&&(console.log("举报模块..."),t.map(function(e){return e.descriptionInfo=e.descriptionInfo||"",e}))}if("function"!=typeof n)return!1;n(t,r)}).catch(function(e){console.log(e)})}function a(e,t,n,r){if(void 0===e||"object"!==(void 0===t?"undefined":s()(t))||Array.isArray(t)||"function"!=typeof n)return!1;p.a.post(e,h.a.stringify(t)).then(function(e){var t=e.data.h;if("function"!=typeof n)return!1;n(t)}).catch(function(e){console.log(e),"function"==typeof r&&r(e)})}function i(e,t,n){if(void 0===e||"object"!==(void 0===t?"undefined":s()(t))||Array.isArray(t)||"function"!=typeof n)return!1;p.a.get(e,{params:t}).then(function(e){var t=void 0!==e.data.b.pageData&&e.data.b.pageData,r=void 0!==e.data.b.dataTotal&&e.data.b.dataTotal;if(t.map(function(e){return e.status=3===e.status?"正常":e.status,e}),"function"!=typeof n)return!1;n(t,r)}).catch(function(e){console.log(e)})}function l(e,t,n){if(void 0===e||"object"!==(void 0===t?"undefined":s()(t))||Array.isArray(t)||"function"!=typeof n)return!1;p.a.get(e,{params:t}).then(function(e){var t=void 0!==e.data.b.data&&e.data.b.data,r=void 0!==e.data.b.dataTotal&&e.data.b.dataTotal;if("function"!=typeof n)return!1;n(t,r)}).catch(function(e){console.log(e)})}t.a=r,t.c=o,t.e=a,t.b=i,t.d=l;var c=n(67),s=n.n(c),u=n(535),f=n.n(u),d=n(204),p=n.n(d),v=n(550),h=n.n(v);p.a.interceptors.request.use(function(e){return e.headers={"Content-Type":"application/x-www-form-urlencoded"},e},function(e){return f.a.reject(e)})},535:function(e,t,n){e.exports={default:n(536),__esModule:!0}},536:function(e,t,n){n(203),n(199),n(202),n(537),n(548),n(549),e.exports=n(64).Promise},537:function(e,t,n){"use strict";var r,o,a,i,l=n(90),c=n(33),s=n(195),u=n(527),f=n(87),d=n(66),p=n(196),v=n(538),h=n(539),b=n(528),y=n(529).set,m=n(544)(),g=n(526),_=n(530),x=n(531),j=c.TypeError,w=c.process,D=c.Promise,O="process"==u(w),A=function(){},P=o=g.f,T=!!function(){try{var e=D.resolve(1),t=(e.constructor={})[n(49)("species")]=function(e){e(A,A)};return(O||"function"==typeof PromiseRejectionEvent)&&e.then(A)instanceof t}catch(e){}}(),C=function(e){var t;return!(!d(e)||"function"!=typeof(t=e.then))&&t},k=function(e,t){if(!e._n){e._n=!0;var n=e._c;m(function(){for(var r=e._v,o=1==e._s,a=0;n.length>a;)!function(t){var n,a,i=o?t.ok:t.fail,l=t.resolve,c=t.reject,s=t.domain;try{i?(o||(2==e._h&&E(e),e._h=1),!0===i?n=r:(s&&s.enter(),n=i(r),s&&s.exit()),n===t.promise?c(j("Promise-chain cycle")):(a=C(n))?a.call(n,l,c):l(n)):c(r)}catch(e){c(e)}}(n[a++]);e._c=[],e._n=!1,t&&!e._h&&S(e)})}},S=function(e){y.call(c,function(){var t,n,r,o=e._v,a=R(e);if(a&&(t=_(function(){O?w.emit("unhandledRejection",o,e):(n=c.onunhandledrejection)?n({promise:e,reason:o}):(r=c.console)&&r.error&&r.error("Unhandled promise rejection",o)}),e._h=O||R(e)?2:1),e._a=void 0,a&&t.e)throw t.v})},R=function(e){if(1==e._h)return!1;for(var t,n=e._a||e._c,r=0;n.length>r;)if(t=n[r++],t.fail||!R(t.promise))return!1;return!0},E=function(e){y.call(c,function(){var t;O?w.emit("rejectionHandled",e):(t=c.onrejectionhandled)&&t({promise:e,reason:e._v})})},I=function(e){var t=this;t._d||(t._d=!0,t=t._w||t,t._v=e,t._s=2,t._a||(t._a=t._c.slice()),k(t,!0))},U=function(e){var t,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===e)throw j("Promise can't be resolved itself");(t=C(e))?m(function(){var r={_w:n,_d:!1};try{t.call(e,s(U,r,1),s(I,r,1))}catch(e){I.call(r,e)}}):(n._v=e,n._s=1,k(n,!1))}catch(e){I.call({_w:n,_d:!1},e)}}};T||(D=function(e){v(this,D,"Promise","_h"),p(e),r.call(this);try{e(s(U,this,1),s(I,this,1))}catch(e){I.call(this,e)}},r=function(e){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},r.prototype=n(545)(D.prototype,{then:function(e,t){var n=P(b(this,D));return n.ok="function"!=typeof e||e,n.fail="function"==typeof t&&t,n.domain=O?w.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&k(this,!1),n.promise},catch:function(e){return this.then(void 0,e)}}),a=function(){var e=new r;this.promise=e,this.resolve=s(U,e,1),this.reject=s(I,e,1)},g.f=P=function(e){return e===D||e===i?new a(e):o(e)}),f(f.G+f.W+f.F*!T,{Promise:D}),n(91)(D,"Promise"),n(546)("Promise"),i=n(64).Promise,f(f.S+f.F*!T,"Promise",{reject:function(e){var t=P(this);return(0,t.reject)(e),t.promise}}),f(f.S+f.F*(l||!T),"Promise",{resolve:function(e){return x(l&&this===i?D:this,e)}}),f(f.S+f.F*!(T&&n(547)(function(e){D.all(e).catch(A)})),"Promise",{all:function(e){var t=this,n=P(t),r=n.resolve,o=n.reject,a=_(function(){var n=[],a=0,i=1;h(e,!1,function(e){var l=a++,c=!1;n.push(void 0),i++,t.resolve(e).then(function(e){c||(c=!0,n[l]=e,--i||r(n))},o)}),--i||r(n)});return a.e&&o(a.v),n.promise},race:function(e){var t=this,n=P(t),r=n.reject,o=_(function(){h(e,!1,function(e){t.resolve(e).then(n.resolve,r)})});return o.e&&r(o.v),n.promise}})},538:function(e,t){e.exports=function(e,t,n,r){if(!(e instanceof t)||void 0!==r&&r in e)throw TypeError(n+": incorrect invocation!");return e}},539:function(e,t,n){var r=n(195),o=n(540),a=n(541),i=n(65),l=n(200),c=n(542),s={},u={},t=e.exports=function(e,t,n,f,d){var p,v,h,b,y=d?function(){return e}:c(e),m=r(n,f,t?2:1),g=0;if("function"!=typeof y)throw TypeError(e+" is not iterable!");if(a(y)){for(p=l(e.length);p>g;g++)if((b=t?m(i(v=e[g])[0],v[1]):m(e[g]))===s||b===u)return b}else for(h=y.call(e);!(v=h.next()).done;)if((b=o(h,m,v.value,t))===s||b===u)return b};t.BREAK=s,t.RETURN=u},540:function(e,t,n){var r=n(65);e.exports=function(e,t,n,o){try{return o?t(r(n)[0],n[1]):t(n)}catch(t){var a=e.return;throw void 0!==a&&r(a.call(e)),t}}},541:function(e,t,n){var r=n(88),o=n(49)("iterator"),a=Array.prototype;e.exports=function(e){return void 0!==e&&(r.Array===e||a[o]===e)}},542:function(e,t,n){var r=n(527),o=n(49)("iterator"),a=n(88);e.exports=n(64).getIteratorMethod=function(e){if(void 0!=e)return e[o]||e["@@iterator"]||a[r(e)]}},543:function(e,t){e.exports=function(e,t,n){var r=void 0===n;switch(t.length){case 0:return r?e():e.call(n);case 1:return r?e(t[0]):e.call(n,t[0]);case 2:return r?e(t[0],t[1]):e.call(n,t[0],t[1]);case 3:return r?e(t[0],t[1],t[2]):e.call(n,t[0],t[1],t[2]);case 4:return r?e(t[0],t[1],t[2],t[3]):e.call(n,t[0],t[1],t[2],t[3])}return e.apply(n,t)}},544:function(e,t,n){var r=n(33),o=n(529).set,a=r.MutationObserver||r.WebKitMutationObserver,i=r.process,l=r.Promise,c="process"==n(134)(i);e.exports=function(){var e,t,n,s=function(){var r,o;for(c&&(r=i.domain)&&r.exit();e;){o=e.fn,e=e.next;try{o()}catch(r){throw e?n():t=void 0,r}}t=void 0,r&&r.enter()};if(c)n=function(){i.nextTick(s)};else if(a){var u=!0,f=document.createTextNode("");new a(s).observe(f,{characterData:!0}),n=function(){f.data=u=!u}}else if(l&&l.resolve){var d=l.resolve();n=function(){d.then(s)}}else n=function(){o.call(r,s)};return function(r){var o={fn:r,next:void 0};t&&(t.next=o),e||(e=o,n()),t=o}}},545:function(e,t,n){var r=n(50);e.exports=function(e,t,n){for(var o in t)n&&e[o]?e[o]=t[o]:r(e,o,t[o]);return e}},546:function(e,t,n){"use strict";var r=n(33),o=n(64),a=n(51),i=n(52),l=n(49)("species");e.exports=function(e){var t="function"==typeof o[e]?o[e]:r[e];i&&t&&!t[l]&&a.f(t,l,{configurable:!0,get:function(){return this}})}},547:function(e,t,n){var r=n(49)("iterator"),o=!1;try{var a=[7][r]();a.return=function(){o=!0},Array.from(a,function(){throw 2})}catch(e){}e.exports=function(e,t){if(!t&&!o)return!1;var n=!1;try{var a=[7],i=a[r]();i.next=function(){return{done:n=!0}},a[r]=function(){return i},e(a)}catch(e){}return n}},548:function(e,t,n){"use strict";var r=n(87),o=n(64),a=n(33),i=n(528),l=n(531);r(r.P+r.R,"Promise",{finally:function(e){var t=i(this,o.Promise||a.Promise),n="function"==typeof e;return this.then(n?function(n){return l(t,e()).then(function(){return n})}:e,n?function(n){return l(t,e()).then(function(){throw n})}:e)}})},549:function(e,t,n){"use strict";var r=n(87),o=n(526),a=n(530);r(r.S,"Promise",{try:function(e){var t=o.f(this),n=a(e);return(n.e?t.reject:t.resolve)(n.v),t.promise}})},550:function(e,t,n){"use strict";var r=n(551),o=n(552),a=n(533);e.exports={formats:a,parse:o,stringify:r}},551:function(e,t,n){"use strict";var r=n(532),o=n(533),a={brackets:function(e){return e+"[]"},indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},i=Date.prototype.toISOString,l={delimiter:"&",encode:!0,encoder:r.encode,encodeValuesOnly:!1,serializeDate:function(e){return i.call(e)},skipNulls:!1,strictNullHandling:!1},c=function e(t,n,o,a,i,c,s,u,f,d,p,v){var h=t;if("function"==typeof s)h=s(n,h);else if(h instanceof Date)h=d(h);else if(null===h){if(a)return c&&!v?c(n,l.encoder):n;h=""}if("string"==typeof h||"number"==typeof h||"boolean"==typeof h||r.isBuffer(h)){if(c){return[p(v?n:c(n,l.encoder))+"="+p(c(h,l.encoder))]}return[p(n)+"="+p(String(h))]}var b=[];if(void 0===h)return b;var y;if(Array.isArray(s))y=s;else{var m=Object.keys(h);y=u?m.sort(u):m}for(var g=0;g<y.length;++g){var _=y[g];i&&null===h[_]||(b=Array.isArray(h)?b.concat(e(h[_],o(n,_),o,a,i,c,s,u,f,d,p,v)):b.concat(e(h[_],n+(f?"."+_:"["+_+"]"),o,a,i,c,s,u,f,d,p,v)))}return b};e.exports=function(e,t){var n=e,i=t?r.assign({},t):{};if(null!==i.encoder&&void 0!==i.encoder&&"function"!=typeof i.encoder)throw new TypeError("Encoder has to be a function.");var s=void 0===i.delimiter?l.delimiter:i.delimiter,u="boolean"==typeof i.strictNullHandling?i.strictNullHandling:l.strictNullHandling,f="boolean"==typeof i.skipNulls?i.skipNulls:l.skipNulls,d="boolean"==typeof i.encode?i.encode:l.encode,p="function"==typeof i.encoder?i.encoder:l.encoder,v="function"==typeof i.sort?i.sort:null,h=void 0!==i.allowDots&&i.allowDots,b="function"==typeof i.serializeDate?i.serializeDate:l.serializeDate,y="boolean"==typeof i.encodeValuesOnly?i.encodeValuesOnly:l.encodeValuesOnly;if(void 0===i.format)i.format=o.default;else if(!Object.prototype.hasOwnProperty.call(o.formatters,i.format))throw new TypeError("Unknown format option provided.");var m,g,_=o.formatters[i.format];"function"==typeof i.filter?(g=i.filter,n=g("",n)):Array.isArray(i.filter)&&(g=i.filter,m=g);var x=[];if("object"!=typeof n||null===n)return"";var j;j=i.arrayFormat in a?i.arrayFormat:"indices"in i?i.indices?"indices":"repeat":"indices";var w=a[j];m||(m=Object.keys(n)),v&&m.sort(v);for(var D=0;D<m.length;++D){var O=m[D];f&&null===n[O]||(x=x.concat(c(n[O],O,w,u,f,d?p:null,g,v,h,b,_,y)))}var A=x.join(s),P=!0===i.addQueryPrefix?"?":"";return A.length>0?P+A:""}},552:function(e,t,n){"use strict";var r=n(532),o=Object.prototype.hasOwnProperty,a={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:r.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},i=function(e,t){for(var n={},r=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,i=t.parameterLimit===1/0?void 0:t.parameterLimit,l=r.split(t.delimiter,i),c=0;c<l.length;++c){var s,u,f=l[c],d=f.indexOf("]="),p=-1===d?f.indexOf("="):d+1;-1===p?(s=t.decoder(f,a.decoder),u=t.strictNullHandling?null:""):(s=t.decoder(f.slice(0,p),a.decoder),u=t.decoder(f.slice(p+1),a.decoder)),o.call(n,s)?n[s]=[].concat(n[s]).concat(u):n[s]=u}return n},l=function(e,t,n){for(var r=t,o=e.length-1;o>=0;--o){var a,i=e[o];if("[]"===i)a=[],a=a.concat(r);else{a=n.plainObjects?Object.create(null):{};var l="["===i.charAt(0)&&"]"===i.charAt(i.length-1)?i.slice(1,-1):i,c=parseInt(l,10);!isNaN(c)&&i!==l&&String(c)===l&&c>=0&&n.parseArrays&&c<=n.arrayLimit?(a=[],a[c]=r):a[l]=r}r=a}return r},c=function(e,t,n){if(e){var r=n.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,a=/(\[[^[\]]*])/,i=/(\[[^[\]]*])/g,c=a.exec(r),s=c?r.slice(0,c.index):r,u=[];if(s){if(!n.plainObjects&&o.call(Object.prototype,s)&&!n.allowPrototypes)return;u.push(s)}for(var f=0;null!==(c=i.exec(r))&&f<n.depth;){if(f+=1,!n.plainObjects&&o.call(Object.prototype,c[1].slice(1,-1))&&!n.allowPrototypes)return;u.push(c[1])}return c&&u.push("["+r.slice(c.index)+"]"),l(u,t,n)}};e.exports=function(e,t){var n=t?r.assign({},t):{};if(null!==n.decoder&&void 0!==n.decoder&&"function"!=typeof n.decoder)throw new TypeError("Decoder has to be a function.");if(n.ignoreQueryPrefix=!0===n.ignoreQueryPrefix,n.delimiter="string"==typeof n.delimiter||r.isRegExp(n.delimiter)?n.delimiter:a.delimiter,n.depth="number"==typeof n.depth?n.depth:a.depth,n.arrayLimit="number"==typeof n.arrayLimit?n.arrayLimit:a.arrayLimit,n.parseArrays=!1!==n.parseArrays,n.decoder="function"==typeof n.decoder?n.decoder:a.decoder,n.allowDots="boolean"==typeof n.allowDots?n.allowDots:a.allowDots,n.plainObjects="boolean"==typeof n.plainObjects?n.plainObjects:a.plainObjects,n.allowPrototypes="boolean"==typeof n.allowPrototypes?n.allowPrototypes:a.allowPrototypes,n.parameterLimit="number"==typeof n.parameterLimit?n.parameterLimit:a.parameterLimit,n.strictNullHandling="boolean"==typeof n.strictNullHandling?n.strictNullHandling:a.strictNullHandling,""===e||null===e||void 0===e)return n.plainObjects?Object.create(null):{};for(var o="string"==typeof e?i(e,n):e,l=n.plainObjects?Object.create(null):{},s=Object.keys(o),u=0;u<s.length;++u){var f=s[u],d=c(f,o[f],n);l=r.merge(l,d,n)}return r.compact(l)}},639:function(e,t,n){var r=n(640);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(198)("7b823f90",r,!0)},640:function(e,t,n){t=e.exports=n(89)(void 0),t.push([e.i,".handle-box[data-v-04525cef]{margin-bottom:20px}.handle-select[data-v-04525cef]{width:120px}.handle-input[data-v-04525cef]{width:300px;display:inline-block}.user-img[data-v-04525cef]{float:left;display:inline-block;max-width:135px;max-height:200px;margin:4px}.el-table.el-table--fit[data-v-04525cef]{display:none}.el-table--fit.blk[data-v-04525cef],.table .el-table.el-table--fit[data-v-04525cef]{display:block}#d-table h3[data-v-04525cef]{margin-top:30px;border-bottom:1px solid #ddd}#d-table label[data-v-04525cef]{display:inline-block;margin-right:8px;color:#797979}#uxininfo[data-v-04525cef]{margin-top:20px}.mrt-10[data-v-04525cef]{margin-top:30px}.in-block[data-v-04525cef]{display:inline-block}.btn-wrap[data-v-04525cef]{padding:5px}",""])},641:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(534);t.default={data:function(){return{url:"",uidV:"",tableData1:[],tableData2:[],tableData3:[],multipleSelection:[],sle_value1:"",sle_value2:"",dev_disabled:!0,imei_ios:!1,options1:[],optionsReport:[{value:"0",label:"未处理",disabled:!0},{value:"1",label:"不予处理",disabled:!0},{value:"2",label:"警告",disabled:!0},{value:"3",label:"封禁社交功能",children:[{value:"3天",label:"3天"},{value:"7天",label:"7天"},{value:"14天",label:"14天"},{value:"三年",label:"三年"}]},{value:"4",label:"封禁账号",children:[{value:"3天",label:"3天"},{value:"7天",label:"7天"},{value:"14天",label:"14天"},{value:"三年",label:"三年"}]},{value:"5",label:"封禁设备",disabled:!1,children:[{value:"3天",label:"3天"},{value:"7天",label:"7天"},{value:"14天",label:"14天"},{value:"三年",label:"三年"}]}]}},created:function(){this.getOptionArr()},computed:{},methods:{handleCurrentChange:function(e){this.getData()},getOptionArr:function(){var e=this,t="/h5/v1/report/queryAllEnums";e.$axios.get(t,{params:{}}).then(function(t){var n=t.data.h,r=t.data.b;if(200==n.code){r.reportType.map(function(t,n){return e.options1.push({value:n,label:t}),t})}})},getTabelList:function(){var e=this;e.url="/h5/v1/report/getAllClosureRecordsByUxinUid",e.$axios.get(e.url,{params:{uxinUid:e.uidV}}).then(function(t){if(200===t.data.h.code){var n=t.data.b.pageData;n&&(n.map(function(t){return t.bannedDays=0!=t.bannedDays?t.bannedDays>365?t.bannedDays/365+"年":t.bannedDays+"天":"",t.dealType=e.optionsReport[t.dealType].label,t}),e.tableData3=n,console.info("++++++++++",e.tableData3))}else e.$message({duration:2e3,message:t.data.h.msg,onClose:function(){}})})},setDeviceDisable:function(e){this.optionsReport[5].disabled=e},getIMEIS:function(){var e=this;e.imei_url="/h5/v1/report/getIMEIByUxinUid",e.$axios.get(e.imei_url,{params:{uxinUid:e.uidV}}).then(function(t){200===t.data.h.code?0==t.data.b.IMEI&&(e.imei_ios=!0,e.setDeviceDisable(!0)):console.log("失败！！")})},getData:function(){var e=this;e.getTabelList(),e.url="/h5/v1/audit/queryUserById",e.$axios.get(e.url,{params:{uid:e.uidV}}).then(function(t){200===t.data.h.code?(t.data.b.liveinfo&&(e.tableData1=t.data.b.liveinfo,e.getIMEIS()),t.data.b.uxininfo&&(e.tableData2=t.data.b.uxininfo)):e.$message({duration:2e3,message:t.h.msg,onClose:function(){}})})},handleDeal:function(e){var t=this,n=t.sle_value2,o=n[0],a=n[1]?n[1]:"",i=null,l="【处理原因】"+t.options1[t.sle_value1].label+",【处理方式】"+t.optionsReport[o].label+","+a;i=a.match("三年")?1095:""==a?0:a.replace(/[^0-9]/gi,""),t.rp_url="/h5/v1/report/closureByUxinUid",t.$confirm(l,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){console.info("=============",t.uidV,t.options1[t.sle_value1].value,o,i),Object(r.a)(t.rp_url,{uxinUid:t.uidV,reportType:t.options1[t.sle_value1].value,closureType:o,bannedDays:i},function(e){t.$message({duration:2e3,message:e.h.msg,onClose:function(){200===e.h.code&&t.getData()}})})}).catch(function(){})},handleSelect_1:function(e){this.sle_value1=e},handleSelect_2:function(e){this.sle_value2=e},search:function(){this.getData()},handleSelectionChange:function(e){this.multipleSelection=e}}}},642:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"table"},[n("div",{staticClass:"crumbs"},[n("el-breadcrumb",{attrs:{separator:"/"}},[n("el-breadcrumb-item",[n("i",{staticClass:"el-icon-menu"}),e._v(" 基础列表")]),e._v(" "),n("el-breadcrumb-item",[e._v("用户处理历史")])],1)],1),e._v(" "),n("div",{staticClass:"handle-box"},[n("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"请输入有信UID"},model:{value:e.uidV,callback:function(t){e.uidV=t},expression:"uidV"}}),e._v(" "),n("el-button",{attrs:{type:"primary",icon:"search"},on:{click:e.search}},[e._v("搜索")])],1),e._v(" "),n("div",{attrs:{id:"d-table"}},[n("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData3,border:"",stripe:""},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{prop:"reportUxinUid",label:"用户有信UID",width:"200"}}),e._v(" "),n("el-table-column",{attrs:{prop:"pageData",label:"平台处理历史"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("div",{staticClass:"btn-wrap bw2"},[n("span",[e._v(e._s(t.row.dealTime))])]),e._v(" "),n("div",{staticClass:"btn-wrap"},[n("span",[e._v(e._s(t.row.dealType)+e._s(t.row.bannedDays))])])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"aaaaaa",label:"直播处理历史"}}),e._v(" "),n("el-table-column",{attrs:{prop:"aaaaaa",label:"动态处理历史"}}),e._v(" "),n("el-table-column",{attrs:{prop:"aaaaaa",label:"轰趴处理历史"}}),e._v(" "),n("el-table-column",{attrs:{prop:"bbbbbb",label:"有聊处理历史"}})],1),e._v(" "),n("h3",[e._v("基本信息")]),e._v(" "),e._l(e.tableData2,function(t,r){return n("div",{attrs:{id:"liveinfo"}},[n("label",[e._v(e._s(r))]),e._v(" "),n("label",[e._v(e._s(t))])])}),e._v(" "),n("h3",[e._v("直播信息")]),e._v(" "),e._l(e.tableData1,function(t,r){return n("div",{attrs:{id:"liveinfo"}},[n("label",[e._v(e._s(r)+": ")]),e._v(" "),n("label",[e._v(e._s(t))])])}),e._v(" "),n("div",{staticClass:"mrt-10"},[n("span",[e._v("处理方式：")]),e._v(" "),n("el-select",{attrs:{placeholder:"处理原因"},on:{change:e.handleSelect_1},model:{value:e.sle_value1,callback:function(t){e.sle_value1=t},expression:"sle_value1"}},e._l(e.options1,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),n("div",{staticClass:"in-block"},[n("el-cascader",{staticClass:"f-right mr10",attrs:{placeholder:"处理方式",options:e.optionsReport,"expand-trigger":"hover"},on:{change:e.handleSelect_2},model:{value:e.sle_value2,callback:function(t){e.sle_value2=t},expression:"sle_value2"}})],1),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.handleDeal}},[e._v("确定")])],1)],2)])},staticRenderFns:[]}}});