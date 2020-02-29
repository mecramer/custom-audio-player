// get DOM elements
const musicContainer = document.querySelector('#music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('#progress');
const progressContainer = document.querySelector('#progress-container');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const cover = document.querySelector('#cover');

// Song titles
// array of objects with information for each song
const songs = [
  {
    filename:'working-week',
    title: 'Welcome to the Working Week',
    artist: 'Elvis Costello'
  },
  {
    filename:'summer-samba',
    title: 'Summer Samba',
    artist: 'Marcos Valle & Norman Gimbel'
  },
  {
    filename:'rue-st-vincent',
    title: 'Rue St Vincent',
    artist: 'Yves Montand'
  },
];

// Keep track of current song
let songIndex = 2;

// Initially load song details into DOM
// choose which member of the songs array to load
loadSong(songs[songIndex]);

// Play song
// add class of play, for styling purposes
// then change the play icon to a pause icon
// then use the HTML5 API to play the audio, audio.play()
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('em.fas').classList.remove('fa-play');
  playBtn.querySelector('em.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
// remove class of play
// then change pause icon back to a play icon
// then use the HTML5 API to pause the audio, audio.pause()
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('em.fas').classList.remove('fa-pause');
  playBtn.querySelector('em.fas').classList.add('fa-play');

  audio.pause();
}

// Previous Song
// by decreasing index position by 1
// check if decreasing took the index position below 0 and, if so, reset the song index to the last one in the array
// then load the song by calling loadSong()
// then play the song by calling playSong()
function prevSong() {
  songIndex--;

  if(songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex])
  playSong();
}

// Next Song
// by increasing index position by 1
// check if increasing took the index position above the index number of last song in arrad
//    and, if so, reset the song index to the first one in the array
// then load the song by calling loadSong()
// then play the song by calling playSong()
function nextSong() {
  songIndex++;

  if(songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex])
  playSong();
}

// Update progress bar
// we can get the duration and currentTime from the srcElement of the event, here we use destructuring to extract
// we can then get the percent of audioo played by currenTime divided by duration, multiplied by 100
// we then use that number and apply it to the width of the progress bar to shade whichever percent is done
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  // console.log(duration, currentTime);
  const progressPercent = (currentTime / duration) * 100;
  // console.log(progressPercent);
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar when user clicks on it
// clientWidth is a JS property used to find the inner width of an element, its total width
// we then use offsetX to get position clicked on
// we then get the duration of the song from audio.duration
// and finally use some math to set the currentTime to the point clicked on
function setProgress(e) {
  const width = this.clientWidth;
  // console.log(width);
  const clickX = e.offsetX;
  // console.log(clickX);
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Update song details
// grab the song title from array and use it for title, artis, audio and cover
// note that this requires the mp3 and img to have the same file name
function loadSong(song) {
  artist.innerText = song.artist;
  title.innerText = song.title;
  audio.src = `mp3/${song.filename}.mp3`;
  cover.src = `img/${song.filename}.jpg`;
}


// Event Listeners
// to play the song...
// check if its already playing, using the existance of the play class
// if playing, run pauseSong(), if not playing, run playSong()
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if(isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song on clicking previous or next buttons
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
// timeupdate is an event that runs when the playing position of an audio or video has changed
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar and have song set to that point in time
progressContainer.addEventListener('click', setProgress);

// Song ends
// automatically start next song on the ended eveent
audio.addEventListener('ended', nextSong);
