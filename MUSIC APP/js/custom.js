const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#previous')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// song titles
const songs = ['hey','summer','ukulele','Chaleya','Saari Duniya Jalaa Denge']

// keeps track of songs
let songIndex = 2

// initially load song info DOM

loadsong(songs[songIndex])

// update song details
function loadsong(song){
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

function playSong(){
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()

}

function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    audio.pause()
    
}


function prevsong(){
    songIndex--
    if(songIndex<0){
        songIndex = songs.length - 1
    }
    loadsong(songs[songIndex])
    playSong()
}

function nextsong(){
    songIndex++
    if(songIndex>songs.length-1){
        songIndex = 0
    }
    loadsong(songs[songIndex])
    playSong()
}

function updateprogress(e){
    const {duration , currentTime} = e.srcElement
    const progressPercent = (currentTime/duration)*100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX/width)*duration

}



//play button eventlisteners
playBtn.addEventListener('click',()=>{
    const isplaying = musicContainer.classList.contains('play');

    if(isplaying){
        pauseSong()
    }else{
        playSong()
    }
})


// change song evenetlisteners

prevBtn.addEventListener('click',prevsong)

nextBtn.addEventListener('click',nextsong)



// song navigation bar

audio.addEventListener('timeupdate',updateprogress)

// song navigation bar click event 

progressContainer.addEventListener('click',setProgress)

//song change to next song after ending event

audio.addEventListener('ended',nextsong)