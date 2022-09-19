import axios from 'axios';
// import { fetchPictures } from './fetchPictures';
import SearchApiService from './fetchPictures';

const refs = {
  formField: document.querySelector('form'),
  loadMoreBtn: document.querySelector('.load-more'),
  galleryContainer: document.querySelector('.gallery'),
};

const searchApiService = new SearchApiService();

refs.formField.addEventListener('submit', onSearchName);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearchName(event) {
  event.preventDefault();
  searchApiService.query = event.currentTarget.elements.searchQuery.value;
  searchApiService.resetPage();
  searchApiService.fetchPictures().then(renderHits);
}

function onLoadMore() {
  searchApiService.fetchPictures().then(renderHits);
}

const rg = function createGalleryItem(hits) {
  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width = 200px/>
    <div class="info">
      <p class="info-item">
        <b>Likes ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads ${downloads}</b>
      </p>
    </div>
  </div>`
    )
    .join('');
};

function renderHits(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', rg(hits));
    setStyle();
}

function setStyle() {
  refs.galleryContainer.style.display = 'flex';
  refs.galleryContainer.style.flexWrap = 'wrap';
  refs.galleryContainer.style.margin = '20px';

}
