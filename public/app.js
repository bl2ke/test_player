import Utils from './src/services/Utils.js'
import Header from './src/views/components/Header.js'
import Footer from './src/views/components/Footer.js'
import Player from './src/views/components/Player.js'
import Home from './src/views/pages/Home.js'
import Login from './src/views/pages/Login.js'
import Register from './src/views/pages/Register.js'
import Playlist from './src/views/pages/Playlist.js'
import CreatePlaylist from './src/views/pages/CreatePlaylist.js'
import Upload from './src/views/pages/Upload.js'
import Search from './src/views/pages/Search.js'

const routes = {
    '/' : Home,
    '/index' : Home,
    '/upload' : Upload,
    '/login' : Login,
    '/registration' : Register,
    '/createplaylist' : CreatePlaylist,
    '/playlist' : Playlist,
    '/search' : Search,
    '/search/:id' : Search
};

const router = async() => {

    const header = null || document.getElementById('header');
    const main = null || document.getElementById('main');
    const footer = null || document.getElementById('footer');
    const player = null || document.getElementById('player');

    header.innerHTML = await Header.render();
    await Header.after_render();
    footer.innerHTML = await Footer.render();
    await Footer.after_render();
    player.innerHTML = await Player.render();
    await Player.after_render();

    let url = Utils.parseRequestURL();

    let parsedURL2 = 
       routes[location.hash.slice(1).toLowerCase() || '/'] ? (location.hash.slice(1).toLowerCase() || '/') :
    ((url.resourse ? '/' + url.resourse : '/') + (url.id ? '/:id' : '') + (url.verb ? '/' + url.verb : ''))
    console.log("Первый урл: ",parsedURL2)
    //let parsedURL = (url.resource ? '/' + url.resource : '/') + (url.id ? '/:id' : '') + (url.verb ? '/' + url.verb : '')
    //console.log("Второй урл: ",parsedURL)
    //console.log(parsedURL);
    //console.log(routes[parsedURL])

    let page = routes[parsedURL2];
    //console.log(page);
    main.innerHTML = await page.render();
    await page.after_render();
    //const snapshot = await firebase.database().ref('/songs');


}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);