export { fetchPictures };

const BACE_URL = 'https://pixabay.com/api/';
const KEY = '30026905-3ea175f3d607ccbd72fb69757';
const PER_PAGE = 10;
const PAGE = 1;

// https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo


function fetchPictures(searchQuery) {
  const url = `${BACE_URL}/?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${PAGE}`;
  return fetch(url).then(response => response.json());
}
