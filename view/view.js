export default class View {
  renderSearchData(items, handler) {
    this._summary.innerText = '';
    this._dropdown.classList.remove('is-active');
    this._results.innerHTML = '';
    this._dropdown.classList.add('is-active');
    for (let item of items) {
      const option = document.createElement('a');
      option.classList.add('dropdown-item');
      option.innerHTML = `<img src="${
        item.Poster === 'N/A' ? '' : item.Poster
      }" />
      <h1>${item.Title}(${item.Year})</h1>`;
      this._results.appendChild(option);
      option.addEventListener('click', function () {
        handler(item.imdbID);
      });
    }
  }
  _checkData = (data) => {
    return data === 'N/A' ? 'Not Found' : data;
  };
  _setDataValue(item) {
    const dollars =
      item.BoxOffice === 'N/A' || !item.BoxOffice
        ? 0
        : +item.BoxOffice.replace(/\$/g, '').replace(/,/g, '');

    const metascore = item.Metascore === 'N/A' ? 0 : +item.Metascore;
    const imdbRating = +item.imdbRating;
    const imdbVotes = +item.imdbVotes.replace(/,/g, '');

    const awards = item.Awards.split(' ').reduce((prev, word) => {
      const value = +word;
      if (isNaN(value)) return prev;
      return prev + value;
    }, 0);

    return { dollars, metascore, imdbRating, imdbVotes, awards };
  }
  renderSearchResult(item) {
    this._input.value = item.Title;
    this._dropdown.classList.remove('is-active');
    this._tutorial.classList.add('is-hidden');
    const { dollars, metascore, imdbRating, imdbVotes, awards } =
      this._setDataValue(item);
    const html = `<article class="media">
  <figure class="media-left">
  <p class="image">
  <img src="${item.Poster}">
  </p>  </figure>
  <div class="media=content">
        <div class="content">
          <h1>${item.Title}</h1>
          <h4> ${item.Genre}</h4>
          <p>${item.Plot}
        </div>
      </div>
  </article>
  <article data-value=${awards} class="notification is-primary">
  <p class="title"> ${this._checkData(item.Awards)}</p>
  <p class="subtitle"> Awards</p>
  </article>
  <article data-value=${dollars} class="notification is-primary">
  <p class="title"> ${this._checkData(item.BoxOffice)}</p>
  <p class="subtitle"> BoxOffice</p>
  </article>
  <article data-value=${metascore} class="notification is-primary">
  <p class="title"> ${this._checkData(item.Metascore)}</p>
  <p class="subtitle"> MetaScore</p>
  </article>
  <article data-value=${imdbRating} class="notification is-primary">
  <p class="title"> ${this._checkData(item.imdbRating)}</p>
  <p class="subtitle"> IMDB rating</p>
  </article>
  <article data-value=${imdbVotes} class="notification is-primary">
  <p class="title"> ${this._checkData(item.imdbVotes)}</p>
  <p class="subtitle"> IMDB votes</p>
  </article>
  <article >
 <a target="_blank" href="https://yts.mx/movies/${item.Title.replace(
   /\s+/g,
   '-'
 ).toLowerCase()}-${item.Year}" ><button> DOWNLOAD</button></a>
  </article>
  `;

    this._summary.innerHTML = html;
  }

  addEventHandler(handler) {
    let that = this;
    this._input.addEventListener('input', function (e) {
      e.preventDefault;
      const data = e.target.value;
      that._summary.innerText = '';
      if (e.target.value === '') return;
      handler(data);
    });
  }
  hideResult() {
    document.addEventListener('click', (event) => {
      if (!this._parentEl.contains(event.target)) {
        this._dropdown.classList.remove('is-active');
      }
    });
  }
  renderError(msg = '') {
    this._summary.innerText = msg;
  }
}
