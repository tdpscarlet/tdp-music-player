const SONGS_STORAGE_KEY = 'TDP_SONGS';

var songs = [
    [
        {
        name:'4 In The Morning',
        singer:'Gwen Stefani',
        path: './assets/music/1/4 In The Morning - Gwen Stefani [Lossless_FLAC].flac',
        image: './assets/img/picture.jpg'
        },
        {
        name:'Chasing Pavements',
        singer:'Adele',
        path: './assets/music/1/Chasing Pavements - Adele [FLAC Lossless].flac',
        image: './assets/img/picture.jpg'
        },
        {
        name:'Grenade',
        singer:'Bruno Mars',
        path: './assets/music/1/Grenade - Bruno Mars [Lossless_FLAC].flac',
        image: './assets/img/picture.jpg'
        },
        {
        name:'Insomnia',
        singer:'Craig David',
        path: './assets/music/1/Insomnia - Craig David [Lossless_FLAC].flac',
        image: './assets/img/picture.jpg'
        },
        {
        name:'Kiss Me Thru The Phone',
        singer:'Soulja Boy',
        path: './assets/music/1/Kiss Me Thru The Phone - Soulja Boy_ Sam [FLAC Lossless].flac',
        image: './assets/img/picture.jpg'
        },
        {
        name:'Littlest Things',
        singer:'Lily Allen',
        path: './assets/music/1/Littlest Things - Lily Allen [Lossless_FLAC].flac',
        image: './assets/img/picture.jpg'
        },
        {
        name:'Meet Me Halfway',
        singer:'The Black Eyed Peas',
        path: './assets/music/1/Meet Me Halfway - The Black Eyed Peas [Lossless_FLAC].flac',
        image: './assets/img/picture.jpg'
        },
        {
        name:'Rain',
        singer:'Mika',
        path: './assets/music/1/Rain - Mika [FLAC Lossless].flac',
        image: './assets/img/picture.jpg'
        },
        {
        name:'Right Now (Na Na Na)',
        singer:'Akon',
        path: './assets/music/1/Right Now (Na Na Na) - Akon - NhacCuaTui.MP3',
        image: './assets/img/picture.jpg'
        },
        {
        name:'Beggin',
        singer:'Madcon',
        path: './assets/music/1/Beggin_ - Madcon [FLAC Lossless].flac',
        image: './assets/img/picture.jpg'
        },
        {
        name:'Fireflies',
        singer:'Owl City',
        path: './assets/music/1/Fireflies - Owl City [Lossless_FLAC].flac',
        image: './assets/img/picture.jpg'
        },
        {
        name:'Haven\'t Met You Yet',
        singer:'Michael Bublé',
        path: './assets/music/1/Haven_t Met You Yet - Michael Buble [FLAC Lossless].flac',
        image: './assets/img/picture.jpg'
        },
        {
        name:'Iridescent',
        singer:'Linkin Park',
        path: './assets/music/1/Iridescent - Linkin Park [Lossless_FLAC].flac',
        image: './assets/img/picture.jpg'
        },
        {
        name:'Jar Of Hearts',
        singer:'Christina Perri',
        path: './assets/music/1/Jar Of Hearts - Christina Perri [Lossless_FLAC].flac',
        image: './assets/img/picture.jpg'
        },
        {
        name:'Love You Like A Love Song',
        singer:'Selena Gomez',
        path: './assets/music/1/Love__You__Like__A__Love__Song - Selena [Lossless_FLAC].flac',
        image: './assets/img/picture.jpg'
        },
        {
        name:'Smile',
        singer:'Avril Lavigne',
        path: './assets/music/1/Smile - Avril Lavigne.mp3',
        image: './assets/img/picture.jpg'
        }
    ],
    [
        {
            name:'80s Remix - Baby',
            singer:'Justin Bieber',
            path: './assets/music/2/80s_Remix-_Baby_-_Justin_Bieber.mp3',
            image: './assets/img/80Remix.jpg'
        },
        {
            name:'80s Remix - Closer',
            singer:'The Chainsmokers',
            path: './assets/music/2/80s_Remix-_-Closer-_-_The_Marlboro_Smokers.mp3',
            image: './assets/img/80Remix.jpg'
        },
        {
            name:'80s Remix - Focus',
            singer:'Ariana Grande',
            path: './assets/music/2/y2mate.com - 80s Remix Focus  Ariana Grande_320kbps.mp3',
            image: './assets/img/80Remix.jpg'
        },
        {
            name:'80s Remix - What Do You Mean',
            singer:'Justin Bieber',
            path: './assets/music/2/80s_Remix-_Justin_Bieber_-_What_Do_You_Mean_it\'s_1985-.mp3',
            image: './assets/img/80Remix.jpg'
        },
        {
            name:'80s Remix - Love Me Harder',
            singer:'Ariana Grande',
            path: './assets/music/2/y2mate.com - 80s Remix  Love Me Harder_320kbps.mp3',
            image: './assets/img/80Remix.jpg'
        },
        {
            name:'80s Remix - Versace On The Floor',
            singer:'Bruno Mars',
            path: './assets/music/2/80s Remix Versace On The Floor.mp3',
            image: './assets/img/80Remix.jpg'
        },
        {
            name:'80s Remix - What Do You Mean',
            singer:'Ariana Grande',
            path: './assets/music/2/y2mate.com - 80s Remix Into You  Dangerous 80s_320kbps.mp3',
            image: './assets/img/80Remix.jpg'
        },
    ]
];

localStorage.setItem(SONGS_STORAGE_KEY, JSON.stringify(songs));