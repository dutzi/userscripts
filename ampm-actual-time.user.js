// ==UserScript==
// @name           AM/PM -> Actual time
// @match          https://www.google.com/flights/*
// @version        0.2
// ==/UserScript==

(function() {
	'use strict';


	function convertTime(string) {
		var myRe = /(\d\d?):(\d\d)( ?)(AM|PM)/ig;
		var regexRes;
		let result = '';
		let lastIndex = 0;

		while ((regexRes = myRe.exec(string)) !== null) {
			let fullTime = regexRes[0],
				hours = regexRes[1],
				mins = regexRes[2],
				ampm = regexRes[4];

			if (ampm.toLowerCase() === 'pm') {
				if (hours !== '12') {
					hours = parseInt(hours) + 12;
					if (hours === 24) hours = '00';
				}
			} else if (hours === '12') {
				hours = '00';
			}

			let fullConvertedTime = hours + ':' + mins;

			result += string.substring(lastIndex, regexRes.index) + fullConvertedTime;

			lastIndex = regexRes.index + fullTime.length;
		}

		result += string.substr(lastIndex);

		return result;
	}

	function isAmpmString(string) {
		return !!string.match(/\d\d?:\d\d ?(AM|PM)/i);
	}

	function convertAllTime() {
		let found = false;

		document.querySelectorAll('span, div').forEach(el => {
			if (isAmpmString(el.innerHTML)) {
				found = true;
				el.innerHTML = convertTime(el.innerHTML);
			}
		});

		if (found) {
			console.log('%cAM/PM -> Actual time replaced something on the page', 'background: #222; color: yellow; padding: 0px 3px');
		}
	}

	setInterval(convertAllTime, 1000);
})();
