let Player = {
    render: async() => {
        let view = `
        <section>
                <div class="player-slider">
                    <input type="range" min="0" max="500" value="0" >
                </div>
                <div class="player">
                    <div class="player-song-info">
                        <img class="player-song-img" src="src/img/empty_image.png">
                        <p class="player-song-name">Name</p>
                        <p class="player-song-author">Author</p>
                    </div>
                    <div class="player-buttons">
                        <button class="player-img-button">
                            <img class="player-img" src="src/img/next.png">
                        </button>
                        <button class="player-img-button">
                            <img class="player-img" src="src/img/Play.png">
                        </button>
                        <button class="player-img-button">
                            <img class="player-img" src="src/img/prev.png">
                        </button>
                    </div>
                    <div class="player-duration">
                        <p class="player-duration-time">0:00</p>
                    </div>
                </div>
        </section>
        `
        return view
    },
    after_render: async() => {}
}

export default Player;