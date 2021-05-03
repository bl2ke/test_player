export async function getSongs(){
    const snapshot = await firebase.database().ref('/songs');
    return snapshot;
}

export async function getSongId(){
    const snapshot = await firebase.database().ref('/song_id/id').once('value');
    return snapshot.val();
}

export async function getPicId(){
    const snapshot = await firebase.database().ref('/song_pic_id/id').once('value');
    return snapshot.val();
}


export async function getSongPic(id){
    const snapshot = firebase.storage().ref();
    const img = snapshot.child("song_pic/id"+id+".png");
    const url = await img.getDownloadURL();
    return url;
}

export async function getArtistPic(id){
    const snapshot = firebase.storage().ref();
    const img = snapshot.child("artist_pic/id"+id+".png");
    const url = await img.getDownloadURL();
    return url;
}

export async function getGenrePic(id){
    const snapshot = firebase.storage().ref();
    const img = snapshot.child("genre_pic/id"+id+".png");
    const url = await img.getDownloadURL();
    return url;
}

export async function getAlbumPic(id){
    const snapshot = firebase.storage().ref();
    const img = snapshot.child("album_pic/id"+id+".png");
    const url = await img.getDownloadURL();
    return url;
}

export async function getItems(value){
    const snapshot = await firebase.database().ref('/' + value).once('value');
    return snapshot.val();
}