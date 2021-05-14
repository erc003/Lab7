// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/Lab7/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

var i = 1;

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

        let entryNum = i;

        newPost.addEventListener('click', () => {

          setState('entry', entryNum, entry, 1);

        });

        i++;
        
      });
    });
});

const heading = document.querySelector('h1');

heading.addEventListener('click', () => {

  setState('home', '', '', 1);

});


const setting = document.querySelector("img[src = 'settings.svg']");

setting.addEventListener('click', () => {

  setState('settings', '', '', 1);

});


window.addEventListener('popstate', (e) => {

  if(e['state'] === null) {

    setState('home', '', '', 0);

  } else {

    setState(e['state']['page'], e['state']['number'], e['state']['content'], e['state']['push']);

  }

});