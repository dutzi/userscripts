// ==UserScript==
// @name         Whatsapp Hebrew Font
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://web.whatsapp.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.head.innerHTML += '<style>.message .message-text{font-family: helvetica !important}</style>';
    // Your code here...
})();
