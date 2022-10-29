import { fetch } from './js/fetch';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  width: '280px',
  position: 'right-top',
  distance: '8px',
  opacity: 0.8,
  borderRadius: '.5rem',
  clickToClose: true,
  className: 'notiflix-notify',
  fontSize: '14px',
  useIcon: false,
  success: {
    background: '#32c682',
    textColor: '#fff',
  },
  failure: {
    background: '#ff5549',
    textColor: '#fff',
  },
  warning: {
    background: '#eebf31',
    textColor: '#fff',
  },
  info: {
    background: '#26c0d3',
    textColor: '#fff',
  },
});

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const axios = require('axios').default;

var debounce = require('lodash.debounce');

let gallery = new SimpleLightbox('.gallery a', {});

const refs = {
  box: document.querySelector('.search-box'),
  form: document.querySelector('.search-form'),
  input: document.querySelector('.search-input'),
  button: document.querySelector('.search-input'),
  results: document.querySelector('.search-results'),
  more: document.querySelector('.search-more-button'),
};

refs.form.addEventListener('submit', submit);
window.addEventListener('scroll', debounce(load, 500));
refs.more.style.visibility = 'hidden';

let page;
let query;

async function submit(e) {
  e.preventDefault();
  refs.results.innerHTML = '';

  query = refs.input.value;
  page = 1;

  let images = await fetch(query, page);

  if (images.hits.length === 0) {
    Notify.failure('😱 Sorry, there are no images matching your query...');
    return;
  }

  Notify.success(`👍 OK, we already found ${images.totalHits} images`);

  painter(images.hits);

  // refs.more.style.visibility = 'visible';
}

async function load() {
  let windowRelativeBottom =
    document.documentElement.getBoundingClientRect().bottom;
  console.log(windowRelativeBottom);

  if (windowRelativeBottom > document.documentElement.clientHeight + 100) {
    return;
  }

  page = page + 1;

  let images = await fetch(query, page);

  if (images.hits.length === 0) {
    Notify.failure('😱 Sorry, there are no more images matching your query...');
    refs.more.style.visibility = 'hidden';
    return;
  }
  Notify.success('👍 OK, 40 more images was added in search-results area');

  painter(images.hits);
}

function painter(images) {
  images.forEach(image => {
    refs.results.insertAdjacentHTML(
      'beforeend',
      `<a href="${image.largeImageURL}" class="search-results-card">
      <img src="${image.previewURL}" alt="${image.tags}">
      <ul class="search-results-stats">
        <li><b>likes:</b> ${image.likes}</li>
        <li><b>views:</b> ${image.views}</li>
        <li><b>comments:</b> ${image.comments}</li>
        <li><b>downloads:</b> ${image.downloads}</li>
      </ul>
      </a>`
    );
  });

  gallery.refresh();
}
