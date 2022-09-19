import axios from 'axios';
// import { fetchPictures } from './fetchPictures';
import SearchApiService from './fetchPictures';

const refs = {
  //   body: document.querySelector('body'),
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
  searchApiService.fetchPictures().then(hits => console.log(hits));
}


function renderHits(hits) {
  refs.galleryContainer.insertAdjacentHTML(
    'beforeend',
    `<div class="photo-card">
  <img src="${hits}" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`
  );
}