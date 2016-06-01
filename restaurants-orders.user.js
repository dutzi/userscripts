// ==UserScript==
// @name           Restaurants Orders
// @match http://*.wix.com/*
// @version        1.0
// ==/UserScript==

var numIframesReplaced = 0;

function setHeaderText(text, color) {
	color = color || 'black';

	var prevStyle = document.querySelector('style[data-userscript-id=restaurants-orders]');
	if (prevStyle) {
		prevStyle.remove();
	}

	var style = document.createElement('style');
	style.setAttribute('data-userscript-id', 'restaurants-orders');
	style.type = 'text/css';
	style.appendChild(document.createTextNode(`
		body:before {
			content: "${text}";
			position: fixed;
			top: 2px;
			left: 2px;
			font: bold 10px/1em menlo,monospace;
			background: white;
			color: ${color};
			z-index: 1000000;
			padding: 7px;
		}
	`));

	setTimeout(() => {
		style.appendChild(document.createTextNode(`
			body:before {
				opacity: 0.4;
				transition: opacity 1s ease-out 5s;
			}
		`));
	}, 10);

	document.head.appendChild(style);
}

function onDOMSubtreeModified() {
	var iframe = [].slice.call(document.querySelectorAll('iframe'))
		.find(function (iframe) {
			iframe.src.startsWith('https://restaurants.wix.com');
		});

	if (iframe) {
		iframe.src = iframe.src.replace('https://restaurants.wix.com',
			'http://alpha.openrest.com');

		numIframesReplaced++;

		console.log('%crestaurants-order userscript updated iframe location',
			'background: #222; color: yellow; padding: 0px 3px');
		setHeaderText(`restaurants-orders userscript running (×${numIframesReplaced})`);
	}
}

function addEventListener() {
	document.body.addEventListener('DOMSubtreeModified', onDOMSubtreeModified, false);
}

function init() {
	addEventListener();
	setHeaderText('restaurants-orders userscript running');
}

init();

// unsafeWindow.__restaurants_orders_userscript = {
// 	disable() {
// 		localStorage.setItem('__restaurants_orders_userscript_disabled', true);
// 		init();
// 	},

// 	enable() {
// 		localStorage.removeItem('__restaurants_orders_userscript_disabled');
// 		init();
// 	}
// }

// function removeEventListener() {
// 	document.body.removeEventListener('DOMSubtreeModified', onDOMSubtreeModified, false);
// }

// function init() {
// 	if (localStorage.getItem('__restaurants_orders_userscript_disabled')) {
// 		removeEventListener();
// 		setHeaderText('restaurants-orders userscript disabled :(', 'grey');
// 	} else {
// 		addEventListener();
// 		setHeaderText('restaurants-orders userscript running');
// 	}
// }

// init();
