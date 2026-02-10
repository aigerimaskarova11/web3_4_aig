const artistContainer = document.getElementById('artistContainer');
const adminPanel = document.getElementById('adminPanel');
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

let artists = [];

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.href = 'login.html';
}

async function loadArtistsAndSongs() {
  const res = await fetch('/api/artists');
  artists = await res.json();

  const songsRes = await fetch('/api/songs');
  const allSongs = await songsRes.json();

  artistContainer.innerHTML = '';

  artists.forEach(artist => {
    const artistSongs = allSongs.filter(s => s.artist._id === artist._id);

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${artist.name}</h3>
      <p>Genre: ${artist.genre}</p>
      <p>Debut: ${artist.debutYear}</p>
      ${role === 'admin' ? `<button onclick="deleteArtist('${artist._id}')">Delete Artist</button>` : ''}
      <div class="song-list">
        <strong>Songs:</strong>
        ${artistSongs.map(s => `<p>${s.title} (${s.duration} min) ${role==='admin'?`<button onclick="deleteSong('${s._id}')">Delete</button>`:''}</p>`).join('')}
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
      option.text = a.name;
      songArtistSelect.appendChild(option);
    });
    adminPanel.style.display = 'block';
  }
}

// Admin: Add Artist
if (role === 'admin') {
  document.getElementById('addArtistForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('artistName').value;
    const genre = document.getElementById('artistGenre').value;
    const debutYear = document.getElementById('artistDebut').value;

    await fetch('/api/artists', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, genre, debutYear })
    });

    document.getElementById('addArtistForm').reset();
    loadArtistsAndSongs();
  });

  // Add Song
  document.getElementById('addSongForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('songTitle').value;
    const duration = document.getElementById('songDuration').value;
    const artistId = document.getElementById('songArtist').value;

    await fetch('/api/songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, duration, artist: artistId })
    });

    document.getElementById('addSongForm').reset();
    loadArtistsAndSongs();
  });
}

async function deleteArtist(id) {
  await fetch(`/api/artists/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  loadArtistsAndSongs();
}

async function deleteSong(id) {
  await fetch(`/api/songs/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  loadArtistsAndSongs();
}

loadArtistsAndSongs();
