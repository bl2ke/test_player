let Playlist = {
    render: async() => {
        let view =`
        <section class="playlist-container">
        <div class="playlist-header">
            <div class="playlist-header-img">
                <button class="playlist-play-button">
                    <img class="playlist-image" src="src/img/empty_image.png">
                    <img class="playlist-play" src="src/img/Play.png">
                </button>
            </div>
            <div class="playlist-info">
                <h1 class="playlist-name">Name</h1>
                <p class="playlist-desc">Description-text</p>
            </div>
        </div>
        <div>
            <ul class="playlist-songs">
                <li class="playlist-songs-item">
                    <div class="playlist-song">
                        <div class="playlist-song-image">
                            <button class="song-play-button" >
                                <img class="song-image" src="src/img/empty_image.png">
                                <img class="song-play-image" src="src/img/Play.png">
                            </button>
                        </div>
                        <p class="song-name">Name</p>
                        <a class="song-author">Author</a>
                    </div>
                    <div class="playlist-song-duration">
                        <p class="duration">2:33</p>
                        <button class="song-text-button">
                            <img class="song-text" src="src/img/text.png">
                        </button>
                    </div>
                </li>
                <li class="playlist-songs-item">
                    <div class="playlist-song">
                        <div class="playlist-song-image">
                            <button class="song-play-button" >
                                <img class="song-image" src="src/img/empty_image.png">
                                <img class="song-play-image" src="src/img/Play.png">
                            </button>
                        </div>
                        <p class="song-name">Name</p>
                        <a class="song-author">Author</a>
                    </div>
                    <div class="playlist-song-duration">
                        <p class="duration">2:33</p>
                        <button class="song-text-button">
                            <img class="song-text" src="src/img/text.png">
                        </button>
                    </div>
                </li>
                <li class="playlist-songs-item">
                    <div class="playlist-song">
                        <div class="playlist-song-image">
                            <button class="song-play-button" >
                                <img class="song-image" src="src/img/empty_image.png">
                                <img class="song-play-image" src="src/img/Play.png">
                            </button>
                        </div>
                        <p class="song-name">Name</p>
                        <a class="song-author">Author</a>
                    </div>
                    <div class="playlist-song-duration">
                        <p class="duration">2:33</p>
                        <button class="song-text-button">
                            <img class="song-text" src="src/img/text.png">
                        </button>
                    </div>
                </li>   
                <li class="playlist-songs-item">
                    <div class="playlist-song">
                        <div class="playlist-song-image">
                            <button class="song-play-button" >
                                <img class="song-image" src="src/img/empty_image.png">
                                <img class="song-play-image" src="src/img/Play.png">
                            </button>
                        </div>
                        <p class="song-name">Name</p>
                        <a class="song-author">Author</a>
                    </div>
                    <div class="playlist-song-duration">
                        <p class="duration">2:33</p>
                        <button class="song-text-button">
                            <img class="song-text" src="src/img/text.png">
                        </button>
                    </div>
                </li>
            </ul>
        </div>
        <div id="myModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                <span class="close">&times;</span>
                </div>
                    <div class="modal-body">
                    <p>Какой-то текст в теле модального окна</p>
                    <p>Ещё другой текст...</p>
                    </div>
            </div>
        </div>
    </section>
        `

        return view
    },

    after_render: async() => {
        var modal = document.getElementById('myModal');
        var btn = document.getElementsByClassName("song-text")[0];
        var span = document.getElementsByClassName("close")[0];


        btn.onclick = function() {
            modal.style.display = "block";
        }


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


export default Playlist;