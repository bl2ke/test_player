import Utils from './../../services/Utils.js'
import * as DB from './../../services/DB.js'


let Genre = {
    render: async() => {
        
        let view =`
        <section class="playlist-container">
            <div class="playlist-header">
                <div class="playlist-header-img">
                    <button class="playlist-play-button">
                        <img id="artist-img" class="playlist-image" src="src/img/empty_image.png">
                        <img class="playlist-play" src="src/img/Play.png">
                    </button>
                </div>
                <div class="playlist-info">
                    <h1 id="artist-name" class="playlist-name">Artist</h1>
                </div>
            </div>
            <div>
                <ul id="artist-songs" class="playlist-songs"> 
                </ul>
            </div>

            <div id="myModal" class="modal">
                <div class="modal-header">
                    <span id="close" class="close">&times;</span>
                </div>
                <div class="modal-content">
                    <div class="modal-body">
                        <pre id="song-lyrics"></pre>
                    </div>
                </div>
            </div>
        </section>
        `

        return view
    },

    after_render: async() => {

        let request = Utils.parseRequestURL()
        let query = decodeURIComponent(request.id);

        const h1 =  document.getElementById('artist-name');
        const pic = document.getElementById('artist-img');
        const lyrics = document.getElementById('song-lyrics');
        const searchContainer = document.getElementById('artist-songs');

        const modal = document.getElementById('myModal');
        const span = document.getElementById("close");

        let artistRealName = query;
        let genre_name;
        h1.innerHTML = artistRealName;
        
        let artistsList = await DB.getItems('genres');
        artistsList.forEach(async function(artist){

            if(artist.genre_id.toString() === query){
                console.log("Нашёл");
                h1.innerHTML = artist.name;
                genre_name = artist.name;
                let picUrl = await DB.getGenrePic(artist.genre_id);
                pic.src = picUrl;
            }
        },
        function(e){
            console.log(e.code);
        });

        let songsList = await DB.getItems('songs'); 
        songsList.forEach(async function(itemRef, index){
            if(itemRef.genre.toLowerCase().includes(genre_name.toLowerCase())){
                let picUrl = await DB.getSongPic(itemRef.picture);
                let songLi = document.createElement('li');
                songLi.className = 'playlist-songs-item';
                songLi.innerHTML = 
                `
                <div class="playlist-song">
                    <div class="playlist-song-image">
                        <button class="song-play-button">
                            <img class="song-image" src=${picUrl}>
                            <img id=${index} class="song-play-image" src="src/img/Play.png">
                        </button>
                    </div>
                    <p class="song-name">${itemRef.name}</p>
                    <a href="#/artist/${itemRef.author}" class="song-author">${itemRef.author}</a>
                </div>
                <div class="playlist-song-duration">
                    <p class="duration">2:33</p>
                    <button id=${index} class="song-text-button">
                        <img id="text-${index}" class="song-text" src="src/img/text.png">
                    </button>
                </div>
                `;
                searchContainer.appendChild(songLi);
            }
        });

        searchContainer.addEventListener("click", async function(e)
        {
            if(e.target.id.includes("text"))
            {
                let id = e.target.id.split("-")[1];
                let song = await DB.getItems('songs/'+ id);
                //console.log(song); 
                lyrics.innerHTML = song.lyrics;           
                modal.style.display = "block";
            }
            if(e.target.className == "song-play-image")
            {
                console.log("Кнопка воспроизведения");
            }
        })

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    
}


export default Genre;