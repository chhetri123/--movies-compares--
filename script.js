// import axios from './node_modules/axios/dist/axios.js';
// import axios from 'axios';
import { createAutoComplete } from './autocomplete.js';

const autocompleteConfig = {
  renderOption(movie) {
    return `
     <img src="${movie.Poster === 'N/A' ? '' : movie.Poster}" />
      <h1>${movie.Title}(${movie.Year})</h1>`;
  },

  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie);
  },
  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchTerm) {
    try {
      const response = await axios.get('http://www.omdbapi.com/', {
        params: {
          apikey: '260c416c',
          s: searchTerm,
        },
      });
      let data = response.data.Search;
      if (!data) throw Error('Not found Movie');
      return data;
    } catch (err) {
      throw err;
    }
  },
};
createAutoComplete({
  ...autocompleteConfig,
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
  },
});

createAutoComplete({
  ...autocompleteConfig,
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');

    onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
  },
});

let LeftMovie, RightMovie;
const footer = document.querySelector('.footer');
const onMovieSelect = async (movie, summaryElement, side) => {
  try {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: '260c416c',
        i: movie.imdbID,
      },
    });

    summaryElement.innerHTML = movieTemplate(response.data);

    if (side === 'left') {
      LeftMovie = response.data;
    } else {
      RightMovie = response.data;
    }
    if (LeftMovie && RightMovie) {
      runComparison(LeftMovie, RightMovie);
    }
  } catch (err) {
    throw err;
  }
};

const runComparison = function () {
  let left = 0,
    right = 0;

  const leftSideStats = document.querySelectorAll(
    '#left-summary .notification'
  );
  const rightSideStats = document.querySelectorAll(
    '#right-summary .notification'
  );
  leftSideStats.forEach((leftStat, ind) => {
    const rightStat = rightSideStats[ind];
    const leftSideValue = +leftStat.dataset.value;
    const rightSideValue = +rightStat.dataset.value;
    if (rightSideValue > leftSideValue) {
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning');
      leftStat.style.border = '3px solid red';
      rightStat.style.border = '3px solid green';
      right++;
    } else if (rightSideValue < leftSideValue) {
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
      rightStat.style.border = '3px solid red';
      leftStat.style.border = '3px solid green';
      left++;
    } else {
      return;
    }
  });
  footer.style.display = 'block';
  if (right > left) {
    footer.querySelector(
      'p'
    ).innerHTML = `OverAll <b>${RightMovie.Title} </b>is best movie than <b>${LeftMovie.Title}</b>`;
  } else if (right < left) {
    footer.querySelector(
      'p'
    ).innerHTML = `OverAll <b>${LeftMovie.Title}</b> is best movie than <b>${RightMovie.Title}</b>`;
  } else {
    footer.querySelector('p').innerHTML = 'Both are best';
  }
};

const checkData = (data) => {
  return data === 'N/A' ? 'Not Found' : data;
};
const movieTemplate = (movieDetail) => {
  const dollars =
    movieDetail.BoxOffice === 'N/A' || !movieDetail.BoxOffice
      ? 0
      : +movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '');

  const metascore =
    movieDetail.Metascore === 'N/A' ? 0 : +movieDetail.Metascore;
  const imdbRating = +movieDetail.imdbRating;
  const imdbVotes = +movieDetail.imdbVotes.replace(/,/g, '');

  const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
    const value = +word;
    if (isNaN(value)) return prev;
    return prev + value;
  }, 0);

  return `
  <article class="media">
  <figure class="media-left">
  <p class="image">
  <img src="${movieDetail.Poster}">
  </p>  </figure>
  <div class="media=content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4> ${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}
        </div>
      </div>
  </article>
  <article data-value=${awards} class="notification is-primary">
  <p class="title"> ${checkData(movieDetail.Awards)}</p>
  <p class="subtitle"> Awards</p>
  </article>
  <article data-value=${dollars} class="notification is-primary">
  <p class="title"> ${checkData(movieDetail.BoxOffice)}</p>
  <p class="subtitle"> BoxOffice</p>
  </article>
  <article data-value=${metascore} class="notification is-primary">
  <p class="title"> ${checkData(movieDetail.Metascore)}</p>
  <p class="subtitle"> MetaScore</p>
  </article>
  <article data-value=${imdbRating} class="notification is-primary">
  <p class="title"> ${checkData(movieDetail.imdbRating)}</p>
  <p class="subtitle"> IMDB rating</p>
  </article>
  <article data-value=${imdbVotes} class="notification is-primary">
  <p class="title"> ${checkData(movieDetail.imdbVotes)}</p>
  <p class="subtitle"> IMDB votes</p>
  </article>
  <article >
 <a target="_blank" href="https://yts.mx/movies/${movieDetail.Title.replace(
   /\s+/g,
   '-'
 ).toLowerCase()}-${movieDetail.Year}" ><button> DOWNLOAD</button></a>
  </article>
  `;
};
