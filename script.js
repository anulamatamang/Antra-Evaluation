const input = document.querySelector('.search-header__input');
const searchIcon = document.querySelector('.search-header__icon');
const albumsContainer = document.querySelector('.albums-container');
const albumTemplate = document.querySelector('#album-item-template');
const searchResultsDisplay = document.querySelector(
  '.search-header__results-display'
);
const count = document.querySelector('.count');
const loadingDiv = document.querySelector(
  '.search-header__loading-animation-div'
);
const showMore = document.querySelector('.show-more');

function fetchAlbums(ARTIST_NAME) {
  loadingDiv.style.display = 'block';

  fetch(
    `https://itunes.apple.com/search?term=${ARTIST_NAME}&media=music&entity=album&attribute=artistTerm&limit=200`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.results);

      const results = [];
      data.results.forEach((item) => {
        results.push(item);
      });
      console.log('results', results);
      // show 20 data first
      // on show more show next 20 data

      // data.results.forEach((albumItem) => {
      //   renderAlbum(albumItem);
      // });

      // show items from index 0 - 19
      let index1 = 0;
      let index2 = 20;

      showTwentyItems(index1, index2, results);

      showMore.addEventListener('click', () => {
        // show next 20 items from data.results
        index1 = index1 + 20;
        index2 = index2 + 20;
        console.log(index1, index2);
        showTwentyItems(index1, index2, results);
      });

      loadingDiv.style.display = 'none';
      searchResultsDisplay.style.display = 'block';
      count.innerText = data.resultCount;
    });
}

function showTwentyItems(index1, index2, results) {
  for (let i = index1; i < index2; i++) {
    renderAlbum(results[i]);
  }
}

function clearResults() {
  searchResultsDisplay.style.display = 'none';
  count.innerText = '';
}

//event listeners for search icon click or enter key press
searchIcon.addEventListener('click', () => {
  if (input.value === '') {
    alert(`Please enter artist's name`);
  } else {
    clearResults();
    albumsContainer.innerHTML = '';
    fetchAlbums(input.value);
  }
  input.value = '';
});

input.addEventListener('keypress', (e) => {
  if (e.key == 'Enter') {
    if (input.value === '') {
      alert(`Please enter artist's name`);
    } else {
      clearResults();
      albumsContainer.innerHTML = '';
      fetchAlbums(input.value);
    }
    input.value = '';
  }
});

function renderAlbum(item) {
  const templateClone = albumTemplate.content.cloneNode(true);
  const albumCard = templateClone.querySelector('.album-card');
  const albumImg = templateClone.querySelector('.album-img');
  albumImg.src = item.artworkUrl100;
  const artistName = templateClone.querySelector('.artist-name');
  artistName.innerText = item.artistName;
  const albumName = templateClone.querySelector('.album-name');
  albumName.innerText = item.collectionName;
  const albumGenre = templateClone.querySelector('.album-genre');
  albumGenre.innerText = item.primaryGenreName;
  const trackCount = templateClone.querySelector('.track-count');
  trackCount.innerText = item.trackCount;
  const albumCopyRight = templateClone.querySelector('.album-copyright');
  albumCopyRight.innerText = item.copyright;
  albumsContainer.appendChild(templateClone);
}
