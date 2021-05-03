import Utils from './../../services/Utils.js'
import * as DB from './../../services/DB.js'

let Search = {
    render : async() => {

        return `
        <section class="search-results-section">
            <h2 id="section-search-h2" class="sections-text">Song search</h2>
            <div class="description-text">Founded songs across all uploaded... </div>
            <ul id="search-results" class="playlist-songs"></ul> 
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
    },

    after_render: async() => {
        let request = Utils.parseRequestURL();
        let query = decodeURIComponent(request.id);
        const h2 = document.getElementById('section-search-h2');
        const lyrics = document.getElementById('song-lyrics');
        const searchContainer = document.getElementById("search-results");
        var modal = document.getElementById('myModal');
        var span = document.getElementById("close");

        h2.innerHTML = "Results for " + query;
    
        const songList2 = await DB.getItems('songs');
        songList2.forEach(async function(song, index)
            {
                if(song.name.toLowerCase().includes(query) || song.author.toLowerCase().includes(query))
                {
                    let picUrl = await DB.getSongPic(song.picture);
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
                                <p class="song-name">${song.name}</p>
                                <a href="#/artist/${song.author}" class="song-author">${song.author}</a>
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

        // snapshot.on("value", async function(snapshot){
        //     let songList = snapshot.val();
        //     songList.forEach(async function(song, index)
        //     {
        //         if(song.name.toLowerCase().includes(query) || song.author.toLowerCase().includes(query))
        //         {
        //             const picUrl = await DB.getSongPic(song.picture);
        //             let songLi = document.createElement("li");
        //             songLi.className = "playlist-songs-item"
        //             songLi.innerHTML = 
        //             `
        //                     <div class="playlist-song">
        //                         <div class="playlist-song-image">
        //                             <button class="song-play-button">
        //                                 <img class="song-image" src=${picUrl}>
        //                                 <img id=${index} class="song-play-image" src="src/img/Play.png">
        //                             </button>
        //                         </div>
        //                         <p class="song-name">${song.name}</p>
        //                         <a href="#/artist/${song.author}" class="song-author">${song.author}</a>
        //                     </div>
        //                     <div class="playlist-song-duration">
        //                         <p class="duration">2:33</p>
        //                         <button id=${index} class="song-text-button">
        //                             <img id="text-${index}" class="song-text" src="src/img/text.png">
        //                         </button>
        //                     </div>
        //             `;
        //             searchContainer.appendChild(songLi);
        //         }
        //     });
        // }),function(e){
        //     console.log("Fail:",e.code);
        // }

        console.log("Проверка")
        // добавить воспроизвидение по кнопке
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

export default Search;