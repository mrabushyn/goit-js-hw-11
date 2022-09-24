import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const loadMoreBtn = document.querySelector('.load-more')
const KEY = '30026905-3ea175f3d607ccbd72fb69757';
const BACE_URL = 'https://pixabay.com/api/';
export default class SearchApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPictures() {
    const url = `${BACE_URL}/?key=${KEY}&q=${this.searchQuery}
    &image_type=photo&orientation=horizontal
    &safesearch=true&per_page=40&page=${this.page}`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      this.page += 1;
      return data;
    } catch (error) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.hidden = true;
    }
  }

  // fetchPictures() {
  //   const url = `${BACE_URL}/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

  //   return fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       this.page += 1;

  //       return data;
  //     });
  // }

  resetPage() {
    this.page = 1;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
