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
            <ul class="playlist-items">
                <li class="playlist-item">
                    <div>
                        <a href="#/playlist">
                            <img src="src/img/empty_image.png" class="playlist-img" alt="playlist img">
                        </a>
                        <a href="#/playlist" class="playlist-name-link">Genre#1</a>
                    </div>
                </li>
                <li class="playlist-item">
                    <div>
                        <a href="#/playlist">
                            <img src="src/img/empty_image.png" class="playlist-img" alt="playlist img">
                        </a>
                        <a href="#/playlist" class="playlist-name-link">Genre#2</a>
                    </div>
                </li>
                <li class="playlist-item">
                    <div>
                        <a href="#/playlist">
                            <img src="src/img/empty_image.png" class="playlist-img" alt="playlist img">
                        </a>
                        <a href="#/playlist" class="playlist-name-link">Genre#3</a>
                    </div>
                </li>
                <li class="playlist-item">
                    <div>
                        <a href="#/playlist">
                            <img src="src/img/empty_image.png" class="playlist-img" alt="playlist img">
                        </a>
                        <a href="#/playlist" class="playlist-name-link">Genre#4</a>
                    </div>
                </li>
            </ul>
        </section>
        <section class="section-container">
            <h2 id="artists-title" >Artists</h2>
            <h3 class="description-text">Most popular artists</h3>
            <ul class="artists-items">
                <li class="artist-item">
                    <div>
                        <a href="#/playlist">
                            <img src="src/img/empty_image.png" class="artist-img" alt="playlist img">
                        </a>
                    </div>
                    <a href="#/playlist" class="artist-name-link">Artist#1</a>
                </li>
                <li class="artist-item">
                    <div>
                        <a href="#/playlist">
                            <img src="src/img/empty_image.png" class="artist-img" alt="playlist img">
                        </a>
                    </div>
                    <a href="#/playlist" class="artist-name-link">Artist#2</a>
                </li>
                <li class="artist-item">
                    <div>
                        <a href="#/playlist">
                            <img src="src/img/empty_image.png" class="artist-img" alt="playlist img">
                        </a>
                    </div>
                    <a href="#/playlist" class="artist-name-link">Artist#3</a>
                </li>
                <li class="artist-item">
                    <div>
                        <a href="#/playlist">
                            <img src="src/img/empty_image.png" class="artist-img" alt="playlist img">
                        </a>
                    </div>
                    <a href="#/playlist" class="artist-name-link">Artist#4</a>
                </li>
            </ul>
        </section>
        <section class="section-container">
            <h2 id="albums-title" >Albums</h2>
            <ul class="playlist-items">
                <li class="playlist-item">
                    <div>
                        <a href="#/playlist">
                            <img src="src/img/empty_image.png" class="playlist-img" alt="playlist img">
                        </a>
                        <a href="#/playlist" class="playlist-name-link">Album#1</a>
                    </div>
                </li>
                <li class="playlist-item">
                    <div>
                        <a href="#/playlist">
                            <img src="src/img/empty_image.png" class="playlist-img" alt="playlist img">
                        </a>
                        <a href="#/playlist" class="playlist-name-link">Album#2</a>
                    </div>
                </li>
                <li class="playlist-item">
                    <div >
                        <a href="#/playlist">
                            <img src="src/img/empty_image.png" class="playlist-img" alt="playlist img">
                        </a>
                        <a href="#/playlist" class="playlist-name-link">Album#3</a>
                    </div>
                </li>
                <li class="playlist-item">
                    <div>
                        <a href="#/playlist">
                            <img src="src/img/empty_image.png" class="playlist-img" alt="playlist img">
                        </a>
                        <a href="#/playlist" class="playlist-name-link">Album#4</a>
                    </div>
                </li>
            </ul>
        </section>

        `
        return view
    },

    after_render: async() => {}
}

export default Home;