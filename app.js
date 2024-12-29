// Add event listener for the Spotify logo click
const logo = document.getElementById("spotify-logo");

if (logo) {
    logo.addEventListener("click", function() {
        window.location.reload();  // Refresh the page when logo is clicked
    });
}

// The rest of your code remains unchanged
const songs = [
    { title: "Song 1", artist: "Artist 1", audioUrl: "Spotify Clone/songs/1.mp3", coverImage: "Spotify Clone/Covers/1.jpg" },
    { title: "Song 2", artist: "Artist 2", audioUrl: "Spotify Clone/songs/2.mp3", coverImage: "Spotify Clone/Covers/2.jpg" },
    { title: "Song 3", artist: "Artist 3", audioUrl: "Spotify Clone/songs/3.mp3", coverImage: "Spotify Clone/Covers/3.jpg" },
    { title: "Song 4", artist: "Artist 4", audioUrl: "Spotify Clone/songs/4.mp3", coverImage: "Spotify Clone/Covers/4.jpg" },
    { title: "Song 5", artist: "Artist 5", audioUrl: "Spotify Clone/songs/5.mp3", coverImage: "Spotify Clone/Covers/5.jpg" },
    { title: "Song 6", artist: "Artist 6", audioUrl: "Spotify Clone/songs/6.mp3", coverImage: "Spotify Clone/Covers/6.jpg" },
    { title: "Song 7", artist: "Artist 7", audioUrl: "Spotify Clone/songs/7.mp3", coverImage: "Spotify Clone/Covers/7.jpg" },
    { title: "Song 8", artist: "Artist 8", audioUrl: "Spotify Clone/songs/8.mp3", coverImage: "Spotify Clone/Covers/8.jpg" },
    { title: "Song 9", artist: "Artist 9", audioUrl: "Spotify Clone/songs/9.mp3", coverImage: "Spotify Clone/Covers/9.jpg" },
    { title: "Song 10", artist: "Artist 10", audioUrl: "Spotify Clone/songs/10.mp3", coverImage: "Spotify Clone/Covers/10.jpg" },
];

// Populate Song List
const songList = document.getElementById("song-list");

function populateSongList(songsToDisplay) {
    songList.innerHTML = ""; // Clear existing song list
    songsToDisplay.forEach((song, index) => {
        const songItem = document.createElement("div");
        songItem.classList.add("song-item");

        // Add the background image for each song item from the correct folder
        songItem.style.backgroundImage = `url('${song.coverImage}')`;

        songItem.innerHTML = `
            <strong>${song.title}</strong><br>
            <small>${song.artist}</small>
            <img src="Spotify Clone/playing.gif" alt="Playing" class="playing-gif"> <!-- GIF Image -->
        `;

        songItem.addEventListener("click", () => playSong(song, index));
        songList.appendChild(songItem);
    });
}

// Initially populate the song list with all songs
populateSongList(songs);

// Search Input Event Listener
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", function() {
    const query = searchInput.value.toLowerCase();
    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query)
    );
    populateSongList(filteredSongs); // Populate filtered songs
});

// Function to Play Song
function playSong(song, index) {
    const audioPlayer = document.getElementById("audio-player");
    const audioSource = document.getElementById("audio-source");
    const currentSongDisplay = document.getElementById("current-song");

    audioSource.src = song.audioUrl; // Set the song source
    audioPlayer.load(); // Reload the player with the new song
    audioPlayer.play(); // Start playing the song

    // Display the song name and artist in white color
    currentSongDisplay.innerHTML = `Now Playing: <strong>${song.title}</strong> by <strong>${song.artist}</strong>`;
    currentSongDisplay.style.color = "white"; // Set text color to white

    // Remove the playing GIF from all song items
    const songItems = document.querySelectorAll('.song-item');
    songItems.forEach(item => {
        const gif = item.querySelector('.playing-gif');
        if (gif) {
            gif.style.display = 'none'; // Hide the GIF for all items
        }
    });

    // Add the playing GIF to the clicked song
    const clickedSongItem = songItems[index];
    const gif = clickedSongItem.querySelector('.playing-gif');
    if (gif) {
        gif.style.display = 'block'; // Show the GIF for the clicked song
    }

    // Highlight the currently playing song
    songItems.forEach(item => item.classList.remove('playing')); // Remove from all
    songItems[index].classList.add('playing'); // Add to the selected one

    // Add event listener to switch to the next song when the current song ends
    audioPlayer.addEventListener('ended', function() {
        const nextSongIndex = (index + 1) % songs.length; // Loop back to the first song
        playSong(songs[nextSongIndex], nextSongIndex);
    });
}
