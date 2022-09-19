import axios from 'axios';
import { fetchPictures } from './fetchPictures';

const refs = {
  //   body: document.querySelector('body'),
  formField: document.querySelector('form'),
  inputField: document.querySelector('input'),
  //   coutryInfo: document.querySelector('.country-info'),
};

refs.formField.addEventListener('submit', onSearchName);

function onSearchName(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.searchQuery.value;
  console.log(searchQuery);
  fetchPictures(searchQuery);
}

//   fetchCountries(q.trim())
//     .then(q => render(q))
//     .catch(onError);
