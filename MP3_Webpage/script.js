// Sample tracks - replace these with your actual MP3 files
const tracks = [
    {
        title: "Bells 3",
        file: "001.mp3"
    },
    {
        title: "Sample Track 2",
        file: "001.mp3"
    },
    {
        title: "Sample Track 3",
        file: "001.mp3"
    }
];

const audioPlayer = document.getElementById('audio-player');
const trackList = document.getElementById('track-list');
const currentTrackDisplay = document.getElementById('current-track');

let currentTrackIndex = 0;

// Initialize the playlist
function initializePlaylist() {
    tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = track.title;
        li.addEventListener('click', () => playTrack(index));
        trackList.appendChild(li);
    });
}

// Play a specific track
function playTrack(index) {
    if (index >= 0 && index < tracks.length) {
        currentTrackIndex = index;
        const track = tracks[currentTrackIndex];
        
        // Update audio source
        audioPlayer.src = track.file;
        audioPlayer.load();
        audioPlayer.play().catch(error => {
            console.log("Error playing audio:", error);
            currentTrackDisplay.textContent = "Error playing audio. Please check if the file exists.";
        });
       

        
        // Update display
        currentTrackDisplay.textContent = track.title;
        
        // Update active track in playlist
        Array.from(trackList.children).forEach((li, i) => {
            li.classList.toggle('active', i === currentTrackIndex);
        });
    }
}

// Handle track ending
audioPlayer.addEventListener('ended', () => {
    // Play next track if available
    //if (currentTrackIndex < tracks.length - 1) {
    //    playTrack(currentTrackIndex + 1);
    //}
});

// Initialize the player
initializePlaylist();

// Add drag and drop functionality for MP3 files
document.addEventListener('DragEvent', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
        file.type === 'audio/mpeg' || file.name.endsWith('.mp3')
    );
    
    files.forEach(file => {
        const track = {
            title: file.name.replace('.mp3', ''),
            file: URL.createObjectURL(file)
        };
        
        tracks.push(track);
        
        const li = document.createElement('li');
        li.textContent = track.title;
        li.addEventListener('click', () => playTrack(tracks.length - 1));
        trackList.appendChild(li);
    });
}); 