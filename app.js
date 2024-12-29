// Sample song data (you can change this based on your actual song files)
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
        `;

        songItem.addEventListener("click", () => playSong(song, index));
        songList.appendChild(songItem);
})}

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

    // Highlight the currently playing song
    const songItems = document.querySelectorAll('.song-item');
    songItems.forEach(item => item.classList.remove('playing')); // Remove from all
    songItems[index].classList.add('playing'); // Add to the selected one
}

// Handle the Dark/Light Mode Toggle
const themeToggleButton = document.getElementById("theme-toggle");

themeToggleButton.addEventListener("click", () => {
    // Toggle 'light-mode' class on the body
    document.body.classList.toggle("light-mode");

    // Change the button text based on the theme
    if (document.body.classList.contains("light-mode")) {
        themeToggleButton.innerHTML = "🌙"; // Dark mode icon
    } else {
        themeToggleButton.innerHTML = "🌞"; // Light mode icon
    }

    // Save the theme preference to localStorage
    const currentTheme = document.body.classList.contains("light-mode") ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
});

// Check for stored theme preference on page load
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        themeToggleButton.innerHTML = "🌙"; // Switch to dark mode icon
    } else {
        document.body.classList.remove("light-mode");
        themeToggleButton.innerHTML = "🌞"; // Switch to light mode icon
    }
});
