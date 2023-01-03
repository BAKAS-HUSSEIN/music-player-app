const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

// Song Titles
const songs = ['Aras Xapa gyan','Summer', 'Halparke Kurdi','Shakira' ,'Argy Tataki' ]

// keeep track of the songs
let songIndex = 0;

// Initially load song info DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `img/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.pause();
}

function nextSong() {
    songIndex++;
    if(songIndex > songs.length -1 ){
      songIndex = 0;
    }
    loadSong(songs[songIndex]);
  
    if(musicContainer.classList.contains('play')){
      playSong();
    } else {
      pauseSong();
    }
}

function prevSong() {
  
  songIndex--;
  if(songIndex < 0) {
    songIndex = songs.length-1;
  }
  loadSong(songs[songIndex]);
  if(musicContainer.classList.contains('play')){
    playSong();
  } else {
    pauseSong();
  }
  
}

// creating the Time Progress
function updateProgress(e) {
  const {duration, currentTime}  = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}



// Event Listeners
playBtn.addEventListener('click', ()=> {
  const isPlaying = musicContainer.classList.contains('play');

  if(isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
})


// Change song events
nextBtn.addEventListener('click', nextSong) ;


prevBtn.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);
