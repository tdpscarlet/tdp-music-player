const PLAYLISTS_STORAGE_KEY = 'TDP_PLAYLISTS';

var playlists = [
        {
            name: 'US-UK 2010s',
            image: './assets/img/picture.jpg'
        },
        {
            name: 'NEW',
            image: './assets/img/picture.jpg'
        },
        {
            name: 'This is a demo playlist so i have to make it very long',
            image: './assets/img/picture.jpg'
        },
        {
            name: 'UWU',
            image: './assets/img/picture.jpg'
        },
        {
            name: 'OWO',
            image: './assets/img/picture.jpg'
        }
]

localStorage.setItem(PLAYLISTS_STORAGE_KEY, JSON.stringify(playlists));