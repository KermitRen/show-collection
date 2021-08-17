//Global Variables
var baseURL = "https://api.themoviedb.org/3/";
var apiKey = "0e657fa9149b1bbf497985c5de06f62d";
var idOfShow;

window.onload = function() {

    //Getting URL parameter
    let querystring = window.location.search;
    if(querystring.startsWith("?show=")) {
        var showID = querystring.substring(6,querystring.length);
        idOfShow = showID;
    }

    requestInfo(showID);
};

function requestInfo(showID) {

    //Requesting the show details
    let url = "".concat(baseURL,"tv/", showID,"?api_key=",apiKey,"&language=en-US");

    fetch(url).then( result => 
        data = result.json()
    ).then( data => {
        console.log(data);
        setupPage(data);
    }).catch( err => 
        console.log(err)
    )

}

function setupPage(showData) {

    //Setup left info block
    
    //Title
    document.getElementById("showTitle").innerHTML = showData.name;

    //Genres
    let genreList = "";
    for(var j = 0; j < showData.genres.length;j++) {
        genreList += genreIdMap(showData.genres[j].id)
        if( j < showData.genres.length - 1) {
            genreList += ", ";
        }
    }
    document.getElementById("showGenres").innerHTML = genreList;

    //Airtime
    let airTimeString = ""
    airTimeString = showData.first_air_date.substring(0, 4);
    if(!showData.in_production) {
        airTimeString += "".concat(" - ", showData.last_air_date.substring(0, 4));
    } else {
        airTimeString += " &rarr;";
    }
    document.getElementById("showAirtime").innerHTML = airTimeString;

    //Seasons
    document.getElementById("showSeasons").innerHTML = "".concat(showData.number_of_seasons, " Seasons"," &nbsp;  (", showData.number_of_episodes," Episodes)");

    //Description
    document.getElementById("showDescription").innerHTML = showData.overview;

    //Rating
    if(showIsInCollection(showData.name)) {
        document.getElementById("rateButton").style.visibility = "visible";
        updateRating();
    }

    //Setup poster
    let posterImgPath = "".concat("https://image.tmdb.org/t/p/w500/",showData.poster_path);
    document.getElementById("showPoster").src = posterImgPath;

    //Setup cast
    let castUrl = "".concat(baseURL,"tv/", showData.id,"/credits?api_key=",apiKey,"&language=en-US");
    let castContainer = document.getElementById("castContainer");
    fetch(castUrl).then( result =>
         data = result.json()
    ).then( data => {
        console.log(data);
        for(var i = 0; i < data.cast.length; i++) {
            if(data.cast[i].profile_path != null) {
                let actorContainer = document.createElement("div");
                actorContainer.className += "actorContainer";
                castContainer.appendChild(actorContainer);
    
                let actorImage = document.createElement("img");
                actorImage.alt = data.cast[i].name + "-picture";
                actorImage.src = "".concat("https://image.tmdb.org/t/p/w185/",data.cast[i].profile_path);
                actorContainer.appendChild(actorImage);
    
                let actorName = document.createElement("p");
                actorName.innerHTML = data.cast[i].name;
                actorName.className += "actorName";
                actorName.setAttribute("data-name", data.cast[i].name + "\u00A0 \u00A0 \u00A0 ");
                actorContainer.appendChild(actorName);
    
                let actorCharacter = document.createElement("p");
                actorCharacter.innerHTML = data.cast[i].character;
                actorCharacter.className += "characterName";
                actorCharacter.setAttribute("data-name", data.cast[i].character + "\u00A0 \u00A0 \u00A0 ");
                actorContainer.appendChild(actorCharacter);
            }
        }
    })

}

function updateRating() {
    console.log(window.localStorage.getItem(idOfShow));
    if(window.localStorage.getItem(idOfShow) != null) {
        console.log("test");
        let rateButton = document.getElementById("rateButton");
        rateButton.children[0].innerHTML = "star";
        rateButton.children[1].innerHTML = "".concat(window.localStorage.getItem(idOfShow)/10, " / 10");
        document.getElementById("valueSlider").value = window.localStorage.getItem(idOfShow);
        updateRatingValue(document.getElementById("valueSlider"));
    }
}

function openRatingPopup() {
    document.getElementById("ratePopup").style.display = "block";
}

function closeRatingPopup() {
    document.getElementById("ratePopup").style.display = "none";
    window.localStorage.setItem(idOfShow, document.getElementById("valueSlider").value);
    updateRating();
}

function updateRatingValue(slider) {
    let sliderText = "".concat(slider.value/10, " / 10");
    document.getElementById("popupValue").innerHTML = sliderText;
}