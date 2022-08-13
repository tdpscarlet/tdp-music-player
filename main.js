'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'TDP_PLAYER';
const player = $('.player');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const progress = $('#progress');
const playlist = $('.playlist');
const themeBtn = $('.btn-light');
const listsBtn = $('.btn-playlist');
const myPlaylists = $('.my-playlists');
const app = {
    currentIndex: 0,
    currentPlaylist: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isDarkTheme: true,
    isPLaylistON: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songLists: JSON.parse(localStorage.getItem(SONGS_STORAGE_KEY)) || [],
    playlists: JSON.parse(localStorage.getItem(PLAYLISTS_STORAGE_KEY)) || [],
    playedSong: [],
    songs: [],

    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    
    renderSongs: function() {
        this.songs = this.songLists[this.currentPlaylist];
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song s${index}" data-index-number="${index}">
                <div class="thumb" style="background-image: url(${song.image})"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option" style="color: transparent">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        });
        $('.playlist').innerHTML = htmls.join('');
    },

    renderPlaylists: function() {
        const playlists = this.playlists;
        const htmls = this.playlists.map((playlist, index) => {
            return `
            <div class="my-playlist p${index}" data-index-number="${index}">
                <div class="playlist-thumb-wrapper">
                    <i class="play-icon far fa-play-circle"></i>
                    <div class="playlist-thumb" style="background-image: url(${playlist.image})"></div>
                </div>
                <div class="body">
                    <h3 class="title">${playlist.name}</h3>
                </div>
            </div>
            `
        });
        $('.my-playlists').innerHTML = htmls.join('');
    },

    handleEvents: function () {
        const _this = this;
        const cd = $('.cd');
        const cdWidth = cd.offsetWidth;
        
        //Xử lý phóng to/thu nhỏ
        document.onscroll = function() {
            const scrollTop = document.documentElement.scrollTop || window.scrollY;
            const newCdWidth = cdWidth - scrollTop;
            if(window.innerWidth <= 1023) {
                cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
                cd.style.opacity = newCdWidth / cdWidth;
            }
        };

        //Xử lý cd quay
        const cdThumbAnimate = cdThumb.animate([
                { transform:'rotate(360deg)' }
            ], {
                duration: 10000,
                iterations: Infinity
        });
        cdThumbAnimate.pause();

        //Xử lý play/pause
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            };
        };

        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        };

        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        };

        //Xử lý thanh progress
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            };
        };

        //Xử lý tua song
        progress.oninput = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        };

        //Xử lý next/prev
        nextBtn.onclick = function() {
            const prevIndex = _this.currentIndex;
            if(_this.isRandom) {
                _this.playRandom();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.activeSong(prevIndex);
        };

        prevBtn.onclick = function() {
            const prevIndex = _this.currentIndex;
            if(_this.isRandom) {
                _this.playRandom();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.activeSong(prevIndex);
        };

        //Xử lý random
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active',_this.isRandom);
        };

        //Xử lý khi hết bài hát
        audio.onended = function() {
            if(!_this.isRepeat) {
                nextBtn.click();
            };
            audio.play();
        };

        //Xử lý repeat
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active',_this.isRepeat);
        };

        //Xử ý khi user nhấn vào playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            const prevIndex = _this.currentIndex;
            if(songNode || e.target.closest('.option')) {
                _this.currentIndex = songNode.dataset.indexNumber;
                _this.loadCurrentSong();
                _this.activeSong(prevIndex);
                audio.play();
            };
            if(e.target.closest('.option')) {
            
            };
        };

        //Xử lý khi user chọn playlist phát
        myPlaylists.onclick = function(e) {
            const listNode = e.target.closest('.my-playlist:not(.active)');
            if(listNode) {      
                _this.currentPlaylist = listNode.dataset.indexNumber;
                _this.renderSongs();
                _this.currentIndex = 0;
                _this.playedSong = [];
                _this.loadCurrentSong();
                _this.activeSong(); 
                audio.play();
            };
        }

        //Xử lý dark theme
        themeBtn.onclick = function() {
            _this.isDarkTheme = !_this.isDarkTheme;
            _this.setConfig('isDarkTheme', _this.isDarkTheme);
            themeBtn.classList.toggle('active', _this.isDarkTheme);
            _this.changeTheme();
        };

        //Xử lý nút hiện các playlist
        listsBtn.onclick = function() {
            _this.isPLaylistON = !_this.isPLaylistON;
            myPlaylists.classList.toggle('enable', _this.isPLaylistON);
            listsBtn.classList.toggle('active', _this.isPLaylistON);
            if(window.innerWidth <= 1023) {
                if(_this.isPLaylistON) {
                    playlist.classList.add('disable');
                } else {
                    playlist.classList.remove('disable');
                }
            }
        };
    },

    //Định nghĩa current song
    defineProperties: function() {
        this.songs = this.songLists[this.currentPlaylist];
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        });
    },

    loadCurrentSong: function() {
        const heading = $('header h2');
        const singer = $('header h3');
        const cdThumb = $('.cd-thumb');
        const audio = $('#audio');
        heading.textContent = this.currentSong.name;
        singer.textContent = this.currentSong.singer;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    loadConfig:function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
        this.isDarkTheme = this.config.isDarkTheme;
    },

    nextSong: function() {
        this.songs = this.songLists[this.currentPlaylist];
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        };
        this.loadCurrentSong();     
    },

    prevSong: function() {
        this.songs = this.songLists[this.currentPlaylist];
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        };
        this.loadCurrentSong();     
    },

    playRandom: function() {
        this.songs = this.songLists[this.currentPlaylist];
        let newIndex;
        if(this.songs.length > 1) {
            do{
                newIndex = Math.floor(Math.random() * this.songs.length);
            } while (this.playedSong.includes(newIndex) || newIndex === this.currentIndex);
            this.currentIndex = newIndex;
            this.playedSong.push(this.currentIndex);
            if(this.playedSong.length >= this.songs.length) {
                this.playedSong = [];
            };
        };
        this.loadCurrentSong();     
    },

    changeTheme: function() {
        const dashboard = $('.dashboard');
        const controlBtn = $$('.control .btn');
        if(!this.isDarkTheme) {
            if(window.innerWidth > 1024){
                document.body.style.backgroundImage = 'url(./assets/img/bg/wp2448301.jpg)';
            }
            document.documentElement.style.setProperty('--background-color', '#f5f5f5');
            document.documentElement.style.setProperty('--text-color', '#333');
            document.documentElement.style.setProperty('--dashboard-color', 'rgba(255,255,255,.2)');
            document.documentElement.style.setProperty('--m-dashboard-color', '#fff');
            document.documentElement.style.setProperty('--btn-color', '#666');
            document.documentElement.style.setProperty('--author-color', '#404040');
            document.documentElement.style.setProperty('--scroll-bar-color', 'rgba(51,51,51,.3)');
            progress.classList.add('light');
        } else {
            if(window.innerWidth > 1024){
                document.body.style.backgroundImage = 'url(./assets/img/bg/wp2448347.jpg';
            }
            document.documentElement.style.setProperty('--background-color', '#51557E');
            document.documentElement.style.setProperty('--text-color', '#fff');
            document.documentElement.style.setProperty('--dashboard-color', 'rgba(0,0,0,.5)');
            document.documentElement.style.setProperty('--m-dashboard-color', '#1B2430');
            document.documentElement.style.setProperty('--btn-color', '#fff');
            document.documentElement.style.setProperty('--author-color', '#999');
            document.documentElement.style.setProperty('--scroll-bar-color', 'rgba(255,255,255,.3)');
            progress.classList.remove('light');
        };
    },

    activeSong: function(prevIndex) {
        const getCurrentSong = $(`.song.s${this.currentIndex}`);
        const getPrevSong = $(`.song.s${prevIndex}`);
        getCurrentSong.classList.add('active');
        setTimeout(() => {
            getCurrentSong.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        }, 300);
        if(prevIndex != null && this.songs.length > 1 ) { getPrevSong.classList.remove('active'); }
    },

    start: function() {
        this.loadConfig(); 
        this.defineProperties(); //Định nghĩa các thuộc tính cho object 
        this.handleEvents(); //Lắng nghe và xử lý các sự kiện
        this.loadCurrentSong(); //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.renderSongs(); //Render songs
        this.renderPlaylists();
        this.activeSong();  
        this.changeTheme();
        randomBtn.classList.toggle('active',this.isRandom);
        repeatBtn.classList.toggle('active',this.isRepeat);
        themeBtn.classList.toggle('active',this.isDarkTheme);
    }
};

app.start();