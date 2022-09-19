export default class SearchApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
    this.baseUrl = 'https://pixabay.com/api/';
    this.key = '30026905-3ea175f3d607ccbd72fb69757';
  }

  fetchPictures() {
    console.log(this);
    const url = `${this.baseUrl}/?key=${this.key}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.page += 1;
        // return data
        return data.hits
        // , data.totalHits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
