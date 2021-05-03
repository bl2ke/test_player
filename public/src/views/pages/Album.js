import Utils from './../../services/Utils.js'
import * as DB from './../../services/DB.js'


let Album = {
    render: async() => {

        let view =`
        <section class="playlist-container">
        <div class="playlist-header">
            <div class="playlist-header-img">
                <button class="playlist-play-button">
                    <img id="album-img" class="playlist-image" src="src/img/empty_image.png">
                    <img class="playlist-play" src="src/img/Play.png">
                </button>
            </div>
            <div class="playlist-info">
                <h1 id="album-name" class="playlist-name">Album</h1>
                <p id="album-description" class="playlist-desc">Description</p>
            </div>
        </div>
        <div>
            <ul id="album-songs" class="playlist-songs"> 
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

        const h1 =  document.getElementById('album-name');
        const pic = document.getElementById('album-img');
        const lyrics = document.getElementById('song-lyrics');
        const searchContainer = document.getElementById('album-songs');
        const modal = document.getElementById('myModal');
        const span = document.getElementById("close");
        let albumRealName = query;
        h1.innerHTML = albumRealName;
        
        let albumsList = await DB.getItems('albums');
        albumsList.forEach(async function(album, index){
            console.log(album.name.toLowerCase());
            if(index.toString() === query.toLowerCase()){
                h1.innerHTML = album.name;
                let picUrl = await DB.getAlbumPic(album.album_pic_id);
                pic.src = picUrl;
            }
        },
        function(e){
            console.log(e.code);
        });


        let snapshot_album = await firebase.database().ref('/albums/' + query).once('value');
        let sn_album = snapshot_album.val();
        let array = sn_album.songs;
        array.forEach(async function(item, index){
            let pesnya = await firebase.database().ref('/songs/' + item.id).once('value');
            let song = pesnya.val();
            let picUrl = await DB.getSongPic(song.picture);
            let songLi = document.createElement('li');
            songLi.className = 'playlist-songs-item';
            songLi.innerHTML = 
            `
                <div class="playlist-song">
                    <div class="playlist-song-image">
                        <button class="song-play-button">
                            <img class="song-image" src=${picUrl}>
                            <img id=${item.id} class="song-play-image" src="src/img/Play.png">
                        </button>
                    </div>
                    <p class="song-name">${song.name}</p>
                    <a href="#/artist/${song.author}" class="song-author">${song.author}</a>
                </div>
                <div class="playlist-song-duration">
                    <p class="duration">2:33</p>
                    <button id=${item.id} class="song-text-button">
                        <img id="text-${item.id}" class="song-text" src="src/img/text.png">
                    </button>
                </div>
            `;
            searchContainer.appendChild(songLi);
        
        },
        function(e){
            console.log(e.code);
        });

        searchContainer.addEventListener("click", async function(e)
        {
            if(e.target.id.includes("text"))
            {
                //console.log(e.target.id);
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


export default Album;