let CreatePlaylist = {
    render: async() => {
        let view =`
        <section class="playlist-container">
                <h1 class="edit-header">Creating playlist</h1>
                <div>
                    <div class="playlist-edit-header">
                        <div class="playlist-header-img">
                            <div>
                                <img class="playlist-image" src="src/img/empty_image.png">
                            </div>
                        </div>
                        <div class="playlist-info">
                            <div class="playlist-info">
                                <input class="playlist-edit-name" value="Name"></input>
                                <input class="playlist-edit-desc" value="Description"></input>
                            </div>
                        </div>
                    </div>
                    <div class="buttons">
                        <div class="playlist-button-div">
                            
                            <label class="playlist-button">
                                Select picture
                                <input id="playlist-img" type="file">
                            </label>
                        </div>
                        <div class="playlist-button-div">
                            <button class="playlist-button">Save</button>
                        </div>
                        <div class="playlist-button-div">
                            <button class="playlist-button">Delete</button>
                        </div>
                    </div>
                </div>
                <div>
                    <ul class="playlist-songs"></ul>
                </div>
            </section>
            <section class="search-results-section">
                <h2 class="sections-text">Song search</h2>
                <input class="playlist-search" placeholder="Search">
                <ul class="playlist-songs"></ul> 
            </section>
        `

        return view
    },

    after_render: async() => {}
  
}

export default CreatePlaylist;