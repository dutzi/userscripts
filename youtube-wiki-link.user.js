// ==UserScript==
// @name           Youtube wiki link
// @match https://*.youtube.com/*
// @version        1.0
// ==/UserScript==

setInterval(() => {
	if (!document.querySelector('.wikilink')) {
		addWikiLink();
	}
}, 1000);

function addWikiLink() {
	var item = [].slice
		.call(document.querySelectorAll('#watch-description-extras .title'))
		.find(item => item.innerText.trim() === 'Music');
	var title = '';

	if (item) {
		title = item.closest('li').querySelector('li').childNodes[0].textContent.slice(1, -5);
		var artist = item.closest('li').querySelector('li').querySelector('.spf-link');
		if (artist) {
			title += ' ' + artist.innerText;
		}

		title = 'site:wikipedia.org ' + title;
	} else {
		title = 'site:wikipedia.org ' + document.querySelector('.watch-title').innerText;
	}

	var wikiLink = document.createElement('span');
	wikiLink.classList.add('wikilink')
	wikiLink.innerHTML = `(<a target='_blank' style='color: #167ac6' href='http://www.google.com/search?q=${title.replace(/ /g, '+')}&btnI'>wiki</a>)`;
	document.querySelector('.watch-title').append(wikiLink)
}