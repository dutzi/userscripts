// ==UserScript==
// @name        Wolt Open Notifier
// @namespace   Violentmonkey Scripts
// @match       https://wolt.com/*
// @grant       none
// @version     1.3
// @author      -
// @description This will notify you when a restaurant is open for delivery.
// ==/UserScript==

async function checkIfOpen() {
  const id = window.location.pathname.split('/').pop();
  return fetch(`https://restaurant-api.wolt.com/v3/venues/slug/${id}`)
    .then((res) => res.json())
    .then((res) => {
      return res.results[0].delivery_specs.delivery_enabled && res.results[0].online;
    });
}

checkIfOpen().then((isOpen) => {
  if (isOpen) {
    return;
  }

  const id = window.location.pathname.split('/').pop();

  const button = document.createElement('button');

  function startWatcher() {
    button.innerText = 'סבבה, נודיע!';

    const interval = setInterval(async () => {
      const isOpen = checkIfOpen();
      if (isOpen) {
        new Notification(`${id} is open!`);
        clearInterval(interval);
      }
    }, 1000);
  }

  Object.assign(button.style, {
    position: 'fixed',
    top: '1rem',
    left: '1rem',
    padding: '1rem 2rem',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    background: '#000',
    color: '#fff',
  });

  button.innerText = 'תודיעו לי כשפתוח';

  document.body.appendChild(button);

  function handleClick() {
    if (Notification.permission === 'denied') {
      alert('Could not show notifications :(');
      return;
    }

    button.removeEventListener('click', handleClick);

    if (Notification.permission === 'granted') {
      startWatcher();
      return;
    }

    Notification.requestPermission().then(function (permission) {
      if (permission !== 'granted') {
        return;
      }

      startWatcher();
    });
  }

  button.addEventListener('click', handleClick);
});
