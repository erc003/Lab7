// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
var i = 1;

setState('home', '', '', 1);
setState('home', '', '', 1);

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


          //   {
          //   state: 'entry',
          //   num: entryNum,
          //   postInfo: entry
          // });

        });

        
        i++;
        
      });
    });
});

const heading = document.querySelector('h1');

heading.addEventListener('click', () => {

  // setState({ state: 'heading' });

  setState('home', '', '', 1);

});


const setting = document.querySelector("img[src = 'settings.svg']");

setting.addEventListener('click', () => {

  // setState({ state: 'setting' });

  setState('settings', '', '', 1);

});


window.addEventListener('popstate', (e) => {
  console.log(e);

  setState(e['state']['page'], e['state']['number'], e['state']['content'], e['state']['push']);     // e.state.page

  // setState(e['state']['page'], '', '');

});