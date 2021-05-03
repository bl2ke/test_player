import Utils from './../../services/Utils.js'
import * as DB from './../../services/DB.js'

let Home = {
    render: async() => {
        let view =`
        <nav class="navigation-container">
        <div class="navigation">
            <a class="navigation-link" href="#playlists-title">Playlists</a>
            <a class="navigation-link" href="#genres-title">Genres</a>
            <a class="navigation-link" href="#artists-title">Artists</a>
            <a class="navigation-link" href="#albums-title">Albums</a>
            <a class="navigation-link" href="#/upload">Upload</a>
        </div>
    </nav>
        <section class="section-container">
            <h1 id="playlists-title">Create your playlists</h1>
            <ul class="playlist-items">
                <li class="playlist-item">
                    <div>
                        <a href="#/createPlaylist">
                            <img src="src/img/add-playlist.png" class="playlist-img" alt="playlist img">
                        </a>
                        <a href="#/createPlaylist" class="playlist-name-link">Create playlist</a>
                    </div>
                </li>
                <li class="playlist-item">
                    <div>
                        <a href="#/playlist">
                            <img src="src/img/empty_image.png" class="playlist-img" alt="playlist img">
                        </a>
                        <a href="#/playlist" class="playlist-name-link">Playlist name#1</a>
                    </div>
                </li>
            </ul>
        </section>
        <section class="section-container">
            <h2 id="genres-title">Genres</h2>
            <ul id="genres-list" class="playlist-items">
                
            </ul>
        </section>
        <section class="section-container">
            <h2 id="artists-title" >Artists</h2>
            <h3 class="description-text">Most popular artists</h3>
            <ul id="artists-list" class="artists-items">
            
            </ul>
        </section>
        <section class="section-container">
            <h2 id="albums-title" >Albums</h2>
            <ul id="albums-list" class="playlist-items">
                <li class="playlist-item">
                    <div>
                        <a href="#/playlist">
                            <img src="src/img/empty_image.png" class="playlist-img" alt="playlist img">
                        </a>
                        <a href="#/playlist" class="playlist-name-link">Album#1</a>
                    </div>
                </li>
            </ul>
        </section>

        `
        return view
    },

    after_render: async() => {
        const genres_ul = document.getElementById('genres-list');
        const artists_ul = document.getElementById('artists-list');
        const albums_ul = document.getElementById('albums-list');

        let genresList = await DB.getItems('genres');
        let artistsList = await DB.getItems('artists');
        let albumsList = await DB.getItems('albums');

        if(genresList)
        {
            genresList.forEach(async function(genreRef){
                console.log(genreRef);
                let snapshot = await firebase.database().ref('/genres/' + genreRef.genre_id).once('value');
                let genre = snapshot.val();
                let picUrl = await DB.getGenrePic(genre.genre_id);
                let genreLi = document.createElement('li');
                genreLi.className = 'playlist-item';
                genreLi.innerHTML = 
                `
                    <div>
                        <a href="#/genre/${genre.genre_id}">
                            <img src=${picUrl} class="playlist-img" alt="playlist img">
                        </a>
                        <a href="#/genre/${genre.genre_id}" class="playlist-name-link">${genre.name}</a>
                    </div>
                `
                genres_ul.appendChild(genreLi);
            },
            function(e){
                console.log(e.code);
            });
        }

        if(artistsList)
        {
            artistsList.forEach(async function(artistRef, index){
                console.log(artistRef);
                console.log(index);
                let snapshot = await firebase.database().ref('/artists/' + index).once('value');
                let artist = snapshot.val();
                let picUrl = await DB.getArtistPic(artistRef.art_pic_id);
                let artistLi = document.createElement('li');
                artistLi.className = 'artist-item';
                artistLi.innerHTML = 
                `
                <div>
                    <a href="#/artist/${artistRef.name}">
                        <img src=${picUrl} class="artist-img" alt="artist-img">
                    </a>
                </div>
                <a href="#/artist/${artistRef.name}" class="artist-name-link">${artistRef.name}</a>
                `;
                artists_ul.appendChild(artistLi);
            },
            function(e)
            {
                console.log(e.code);
            });
        }

        if(albumsList)
        {
            albumsList.forEach(async function(albumRef, index){
                console.log(albumRef);
                console.log(index);
                let snapshot = await firebase.database().ref('/albums/' + index).once('value');
                let album = snapshot.val();
                let picUrl = await DB.getAlbumPic(albumRef.album_pic_id);
                let albumLi = document.createElement('li');
                albumLi.className = 'playlist-item';
                albumLi.innerHTML = 
                `
                <div>
                    <a href="#/album/${index}">
                        <img src="${picUrl}" class="playlist-img" alt="playlist img">
                    </a>
                    <a href="#/album/${index}" class="playlist-name-link">${albumRef.name}</a>
                </div>
                `;
                albums_ul.appendChild(albumLi);
            },
            function(e)
            {
                console.log(e.code);
            });
        }
    }
}

export default Home;