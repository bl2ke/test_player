import * as DB from '../../services/DB.js'

let Upload = {
    render: async() => {
        let view =`
        <section class="upload-section">
            <h1>Upload song</h1>
            <label class="upload-label">Name</label>
            <input id="name" class="upload-input">
            <label class="upload-label">Author</label>
            <input id="author" class="upload-input">
            <label class="upload-label">Lyrics</label>
            <textarea id="lyrics" class="upload-input upload-lyrics"></textarea>
            <div class="upload-file">
                <label class="select-button">
                    Select cover
                    <input id="upload-img" type="file" value="upload" accept=".png">
                </label>
                <p id="file-img-name" class="file-name"></p>
            </div>
            <div class="upload-file">
                <label class="select-button">
                    Select song
                    <input id="upload-song" type="file" value="upload" accept=".mp3">
                </label>
                <p id="file-name" class="file-name"></p>
            </div>
            <label class="upload-label">Select genre</label>
            <ul id="1" class="genre-selection-list">
                <li class="genre-selection-item">
                    <input id="genre-selection1" value="Жанр1" name="genre" class="genre-selection" type="radio">
                    <label class="genre-selection-label" for="genre-selection1">Жанр#1</label>
                </li>
                <li class="genre-selection-item">
                    <input id="genre-selection2" name="genre" class="genre-selection" type="radio">
                    <label class="genre-selection-label" for="genre-selection2">Жанр#2</label>
                </li>
                <li class="genre-selection-item">
                    <input id="genre-selection3" name="genre" class="genre-selection" type="radio">
                    <label class="genre-selection-label" for="genre-selection3">Жанр#3</label>
                </li>
                <li class="genre-selection-item">
                    <input id="genre-selection4" name="genre" class="genre-selection" type="radio">
                    <label class="genre-selection-label" for="genre-selection4">Жанр#4</label>
                </li>
                <li class="genre-selection-item">
                    <input id="genre-selection5" name="genre" class="genre-selection" type="radio">
                    <label class="genre-selection-label" for="genre-selection5">Жанр#5</label>
                </li>
            </ul>
            <button id="upload-button" class="upload-button">Upload</button>
        </section>
        `

        return view
    },

    after_render: async() => {
        
        const fileButton = document.getElementById('upload-song');
        const pictureButton = document.getElementById('upload-img');

        const uploadButton = document.getElementById('upload-button');
        const fileName = document.getElementById('file-name');
        const pictureName = document.getElementById('file-img-name');

        const nameInput = document.getElementById('name');
        const authorInput = document.getElementById('author');
        const lyricsInput = document.getElementById('lyrics');

        let file = null;
        let picture = "null";
        let song_lyric = "Empty";

        fileButton.addEventListener('change', (event) => {
            file = event.target.files[0];
            fileName.innerHTML = file.name;
            console.log(file);
        });

        pictureButton.addEventListener('change', (event) => {
            picture = event.target.files[0];
            pictureName.innerHTML = picture.name;
            console.log(picture);
        });

        const songs = await DB.getItems('songs');
        console.log(songs);
        let pic_id;
        let song_id;
        if(songs == null)
        {
            pic_id = 0;
            song_id = 0;
        }
        else
        {
            pic_id = songs.length;
            song_id = songs.length;
        }
        console.log("Длинна массива песен: ",song_id);


        uploadButton.addEventListener('click', e => {
            if (!nameInput.value || !authorInput.value)
            {
                alert("All fields must be provided!");
            }
            else if(file)
            {
                let storageRef = firebase.storage().ref('song_mp3/id'+song_id+'.mp3');
                storageRef.put(file);

                if(picture)
                {
                    let storageRef = firebase.storage().ref('song_pic/id'+pic_id+'.png');
                    storageRef.put(picture);
                }

                const rbs = document.querySelectorAll('.genre-selection');
                let selectedValue = 'none';
                for (const rb of rbs) {
                    if (rb.checked) {
                        selectedValue = rb.value;
                        break;
                    }
                }
                console.log(selectedValue);
                song_lyric = lyricsInput.value;

                firebase.database().ref('songs/' + song_id).set({
                    name: nameInput.value,
                    author: authorInput.value,
                    lyrics: song_lyric,
                    id_mp3: song_id,
                    picture: pic_id,
                    genre: selectedValue
                }, function(error) {
                    if (error) {
                        alert(error.message);
                    } else {
                        console.log('data saved succsessfully!');
                    }
                });

            }
            else
            {
                alert("Select song!");
            }
        })
    }
}

export default Upload;