const artistContainer = document.getElementById('artistContainer');
const adminPanel = document.getElementById('adminPanel');
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

let artists = [];

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}

async function loadArtistsAndSongs() {
  const res = await fetch('/api/artists');
  artists = await res.json();

  const songsRes = await fetch('/api/songs');
  const allSongs = await songsRes.json();

  artistContainer.innerHTML = '';

  artists.forEach(artist => {

const artistSongs = allSongs.filter(s =>
  s.artist &&
  (typeof s.artist === 'object'
    ? s.artist._id === artist._id
    : s.artist === artist._id)
);

    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      ${artist.image ? `<img src="${artist.image}" class="artist-img">` : ''}
      <h3>${artist.name}</h3>
      <p>Genre: ${artist.genre}</p>
      <p>Debut: ${artist.debutYear}</p>

      ${role === 'admin'
        ? `<button onclick="deleteArtist('${artist._id}')">Delete Artist</button>`
        : ''
      }

      <div class="song-list">
        <strong>Songs:</strong>
        ${
          artistSongs.length
            ? artistSongs.map(s => `
                <div class="song">
                  <p>
                    <a href="${s.youtubeUrl}" target="_blank">
                      ${s.title} (${s.duration} min)
                    </a>
                    ${role === 'admin'
                      ? `<button onclick="deleteSong('${s._id}')">Delete</button>`
                      : ''
                    }
                  </p>
                </div>
              `).join('')
            : '<p>No songs yet</p>'
        }
      </div>
    `;

    artistContainer.appendChild(card);
  });

  if (role === 'admin') {
    const songArtistSelect = document.getElementById('songArtist');
    songArtistSelect.innerHTML = '';

    artists.forEach(a => {
      const option = document.createElement('option');
      option.value = a._id;
      option.textContent = a.name;
      songArtistSelect.appendChild(option);
    });

    adminPanel.style.display = 'block';
  }
}

// ===== ADMIN =====
if (role === 'admin') {

  document.getElementById('addArtistForm')
    .addEventListener('submit', async e => {
      e.preventDefault();

      await fetch('/api/artists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: artistName.value,
          genre: artistGenre.value,
          debutYear: artistDebut.value,
          image: artistImage?.value
        })
      });

      e.target.reset();
      loadArtistsAndSongs();
    });

  document.getElementById('addSongForm')
    .addEventListener('submit', async e => {
      e.preventDefault();

      await fetch('/api/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: songTitle.value,
          duration: songDuration.value,
          artist: songArtist.value,
          youtubeUrl: songYoutube?.value // <-- здесь YouTube ссылка
        })
      });

      e.target.reset();
      loadArtistsAndSongs();
    });
}

async function deleteArtist(id) {
  await fetch(`/api/artists/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  loadArtistsAndSongs();
}

async function deleteSong(id) {
  await fetch(`/api/songs/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  loadArtistsAndSongs();
}

loadArtistsAndSongs();
