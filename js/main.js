const accessKey = 'nmFVT0MnvNntAUvo-kWX1OnzlrHgSpZ2ht5ZsC0v6as';
const apiUrl = `https://api.unsplash.com/photos/?client_id=${accessKey}&query=Uxdesign&orientation=landscape`;

const cardContent = document.getElementById('cardContent');
const searchBox = document.getElementById('searchBox');

async function fetchPhotos() {
  try {
    const response = await fetch(apiUrl);
    const photos = await response.json();
    displayPhotos(photos);
  } catch (error) {
    console.error('Error fetching data from Unsplash API:', error);
  }
}

function displayPhotos(photos) {
  const cards = photos.map(photo => {
    return `
      <div class="card" data-title="${photo.description ?? 'No description'}">
        <img src="${photo.urls.small}" alt="${photo.alt_description}">
        <p>${photo.description ?? 'No description'}</p>
      </div>
    `;
  }).join('');
  cardContent.innerHTML = cards;
  cardContent.style.textAlign = "center";
}

function filterCards() {
  const searchTerm = searchBox.value.toLowerCase();
  const cards = cardContent.getElementsByClassName('card');

  for (let card of cards) {
    const title = card.getAttribute('data-title').toLowerCase();
    if (title.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  }
}

searchBox.addEventListener('keyup', filterCards);

// Fetch photos when the page loads
fetchPhotos();
