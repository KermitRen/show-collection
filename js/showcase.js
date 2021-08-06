//Global Variables
var showName;
var apiKey = "0e657fa9149b1bbf497985c5de06f62d";

window.onload = function() {

    //setting up references
    showName = document.getElementById("showTitle");

    //Getting URL parameter
    let querystring = window.location.search;
    if(querystring.startsWith("?show=")) {
        var show = querystring.substring(6,querystring.length).replaceAll("%20", " ");
    }
    showName.innerHTML = show;

    setupPage(show);
};

function setupPage(show) {

    let baseURL = "https://api.themoviedb.org/3/"

    let url = "".concat(baseURL,"search/tv?api_key=",apiKey,"&language=en-US","&query=",show);
    fetch(url).then( result => 
        data = result.json()
    ).then( data => {
        let poster = document.getElementById("showPoster");
        let posterImgPath = "".concat("https://image.tmdb.org/t/p/w500/",data.results[0].poster_path);
        poster.src = posterImgPath;
    }).catch( err => 
        console.log(err)
    )

    let testUrl = "".concat(baseURL,"genre/tv/list?api_key=", apiKey, "&language=en-US");
    fetch(testUrl).then( result =>
        data = result.json()  
    ).then( data =>
        console.log(data)
    )

}