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

function fetchAlbums(ARTIST_NAME) {
  loadingDiv.style.display = 'block';

  fetch(
    `https://itunes.apple.com/search?term=${ARTIST_NAME}&media=music&entity=album&attribute=artistTerm&limit=200`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.results);

      data.results.forEach((albumItem) => {
        renderAlbum(albumItem);
      });

      loadingDiv.style.display = 'none';
      searchResultsDisplay.style.display = 'block';
      count.innerText = data.resultCount;
    });
}

function clearResults() {
  searchResultsDisplay.style.display = 'none';
  count.innerText = '';
}

//event listeners for search icon click or enter key press
searchIcon.addEventListener('click', () => {
  console.log('search clicked!! input value is', input.value);
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
    console.log('enter pressed', input.value);
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
