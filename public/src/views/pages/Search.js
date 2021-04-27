import Utils from './../../services/Utils.js'
import * as DB from './../../services/DB.js'

let Search = {
    render : async() => {
        let request = Utils.parseRequestURL();
        let query = decodeURIComponent(request.id);

        return `
        <section class="search-results-section">
            <h2 id="section-search-h2" class="sections-text">Song search</h2>
            <div class="description-text">Founded songs across all uploaded... </div>
            <ul id="search-results" class="playlist-songs"></ul> 
            <div id="myModal" class="modal">
                <div class="modal-header">
                    <span class="close">&times;</span>
                </div>
                <div class="modal-content">
                    <div class="modal-body">
                        <pre id="song-lyrics"></pre>
                    </div>
                </div>
            </div>
        </section>
        `
    },

    after_render: async() => {
        let request = Utils.parseRequestURL();
        let query = decodeURIComponent(request.id);
        const h2 = document.getElementById('section-search-h2');
        const lyrics = document.getElementById('song-lyrics');

        var modal = document.getElementById('myModal');
        var btn;
        var span = document.getElementsByClassName("close")[0];

        h2.innerHTML = "Search results for " + query;
        const searchContainer = document.getElementById("search-results");

        const snapshot = await firebase.database().ref('/songs');
        snapshot.on("value", async function(snapshot){
            let songList = snapshot.val();
            songList.forEach(async function(itemRef, index)
            {
                if(itemRef.name.toLowerCase().includes(query) || itemRef.author.toLowerCase().includes(query))
                {
                    const picUrl = await DB.getSongPic(itemRef.picture);
                    let songLi = document.createElement("li");
                    songLi.className = "playlist-songs-item"
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
                                <a href="#" class="song-author">${itemRef.author}</a>
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
        }),function(e){
            console.log("Fail:",e.code);
        }

        searchContainer.addEventListener("click", async function(e)
        {
            let id = e.target.id.split("-")[1];
            let song = await DB.getItems('songs/'+ id);
            console.log(song); 
            lyrics.innerHTML = song.lyrics;           
            modal.style.display = "block";
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

export default Search;