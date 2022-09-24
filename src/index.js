import SearchApiService from './fetchPictures';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  formField: document.querySelector('form'),
  inputField: document.querySelector('input'),
  loadMoreBtn: document.querySelector('.load-more'),
  galleryContainer: document.querySelector('.gallery'),
};

refs.inputField.addEventListener("input", hideLoadMoreBtn)
hideLoadMoreBtn();

const searchApiService = new SearchApiService();

refs.formField.addEventListener('submit', onSearchName);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearchName(event) {
  event.preventDefault();

  searchApiService.query = event.currentTarget.elements.searchQuery.value;
  searchApiService.resetPage();
  searchApiService.fetchPictures().then(({ hits, totalHits }) => {
    
    if (totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      hideLoadMoreBtn();
    } 
    else Notify.success(`"Hooray! We found ${totalHits} images."`);
    clearGalleryContainer();
    markupGallery(hits);
  });

  refs.loadMoreBtn.hidden = false;
}

function onLoadMore() {
  searchApiService.fetchPictures().then(({ hits, totalHits }) => {
    markupGallery(hits);
  });
}

const renderGallery = function createGalleryItem(hits) {
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
        <a class="gallery__item" href="${largeImageURL}">
<img class="gallery__image" src="${webformatURL}" alt="" title="${tags}" width=100px height=75/>
</a>
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

function markupGallery(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', renderGallery(hits));

  new SimpleLightbox('.gallery a', {
  captionPosition: 'bottom',
  captionDelay: 250,
});

setStyle();
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
  
}

function setStyle() {
  refs.galleryContainer.style.display = 'flex';
  refs.galleryContainer.style.flexWrap = 'wrap';
}

function hideLoadMoreBtn() {
  refs.loadMoreBtn.hidden = true;
}