//Variables
var allShows = []; setupAllShows(allShows);
var mostPopular = [];
var searchBar, gallery;
var apiKey = "0e657fa9149b1bbf497985c5de06f62d";
var baseURL = "https://api.themoviedb.org/3/";


//Setting up references
window.onload = function() {
    gallery = document.getElementById("gallery");
    searchBar = document.getElementById("navSearchBar");
    //window.localStorage.clear();
    findAndDisplayMostPopular();
    //displayShows(allShows);
};

function activateSearchBar(e) {
    if(e.keyCode == 13) {
        searchForShow();
    }
}

function checkSearchBar() {
    if(searchBar.value.toLowerCase()== "") {
        displayShowList(mostPopular);
    }
}

function reloadShows() {
    let filteredList1 = allShows.filter(show => show.name.includes(searchBar.value.toLowerCase()));
    displayShows(filteredList1);
}

function searchForShow() {
    let searchTerm = searchBar.value.toLowerCase();
    if(searchTerm == "") {
        displayShowList(mostPopular);
    } else {
        let url = "".concat(baseURL,"search/tv?api_key=",apiKey,"&language=en-US","&query=",searchTerm);
        fetch(url).then( results =>
            data = results.json()    
        ).then( data => {
            interestingResults = [];
            for(var i = 0; i < data.results.length;i++) {
                console.log(data);
                if(data.results[i].poster_path != null && data.results[i].vote_count > 50){
                    interestingResults.push(data.results[i]);
                }
            }
            displayShowList(interestingResults);
        })
    }
}

function findAndDisplayMostPopular() {
    let popularUrl = "".concat(baseURL,"tv/popular?api_key=", apiKey, "&language=en-US");
    let results = [];
    let pages = 10;
    let pageCount = 0;
    for(var i = 1; i <= pages; i++) {
        let url = "".concat(popularUrl,"&page=",i);
        fetch(url).then( result =>
            data = result.json()  
        ).then( data => {
            let pageResults = data.results;
            for(i=0; i <pageResults.length;i++) {
                if(pageResults[i].vote_count > 3000) {
                    results.push(pageResults[i]);
                }
            }
        }).then(() => {
            pageCount++;
            if(pageCount == pages) {
                console.log(results);
                mostPopular = results;
                displayShowList(results);
            }
        })
    }
}

function displayShowList(showList) {
    //Remove all shows in the gallery
    while(gallery.children.length > 0) {
        gallery.removeChild(gallery.children[0]);
    }

    //Add all shows in the showList ot the gallery
    for(var i = 0; i < showList.length; i++) {

        //Create container
        var posterContainer = document.createElement("div");
        posterContainer.className += "showPoster";
        let nameOfShow = showList[i].name;
        posterContainer.onclick = function (e) {
            if(e.target.id != "addButton") {
                window.location.href="showcase.html?show=" + nameOfShow
            }
        };
        gallery.appendChild(posterContainer);

        //Create image
        var poster = document.createElement("img");
        poster.src = "".concat("https://image.tmdb.org/t/p/w342/",showList[i].poster_path);
        posterContainer.appendChild(poster);

        //Create hover information
        var hoverContainer = document.createElement("div");
        hoverContainer.className += "showHover";
        posterContainer.appendChild(hoverContainer);

        var showInfo = document.createElement("div");
        showInfo.className += "showInfo";
        hoverContainer.appendChild(showInfo);

        var showName = document.createElement("p");
        showName.className += "showName";
        showName.innerHTML = showList[i].name;
        showInfo.appendChild(showName);

        var showGenres= document.createElement("p");
        showGenres.className += "showGenres";
        let genreList = "";
        for(var j = 0; j < showList[i].genre_ids.length;j++) {
            genreList += genreIdMap(showList[i].genre_ids[j])
            if( j < showList[i].genre_ids.length - 1) {
                genreList += ", ";
            }
        }
        showGenres.innerHTML = showList[i].vote_count;
        showInfo.appendChild(showGenres);

        var showAdd = document.createElement("div");
        showAdd.className += "showAdd";
        hoverContainer.appendChild(showAdd);

        var addIcon = document.createElement("i");
        addIcon.id = "addButton";
        addIcon.onclick = function(e) {addShow(this) };
        showAdd.appendChild(addIcon);

        var addIconTooltip = document.createElement("p");
        addIconTooltip.className += "addIconTooltip"
        addIconTooltip.innerHTML = "Add show to your collection";
        showAdd.appendChild(addIconTooltip);
        flipAddIcon(addIcon, !showIsInCollection(showList[i].name));
    }
}

/*
function displayShows(showList) {

    //Remove all shows in the gallery
    while(gallery.children.length > 0) {
        gallery.removeChild(gallery.children[0]);
    }

    //Add all shows in the showList ot the gallery
    for(var i = 0; i < showList.length; i++) {

        //Create container
        var posterContainer = document.createElement("div");
        posterContainer.className += "showPoster";
        let nameOfShow = showList[i].name;
        posterContainer.onclick = function (e) {
            if(e.target.id != "test123") {
                window.location.href="showcase.html?show=" + nameOfShow
            }
        };
        gallery.appendChild(posterContainer);

        //Create image
        var poster = document.createElement("img");
        poster.src = "images/" + showList[i].name + ".jpg";
        posterContainer.appendChild(poster);

        //Create hover information
        var hoverContainer = document.createElement("div");
        hoverContainer.className += "showHover";
        posterContainer.appendChild(hoverContainer);

        var showInfo = document.createElement("div");
        showInfo.className += "showInfo";
        hoverContainer.appendChild(showInfo);

        var showName = document.createElement("p");
        showName.className += "showName";
        showName.innerHTML = showList[i].name;
        showInfo.appendChild(showName);

        var showGenres= document.createElement("p");
        showGenres.className += "showGenres";
        showGenres.innerHTML = showList[i].genres.join(", ");
        showInfo.appendChild(showGenres);

        var showAdd = document.createElement("div");
        showAdd.className += "showAdd";
        hoverContainer.appendChild(showAdd);

        var addIcon = document.createElement("i");
        addIcon.id = "test123";
        addIcon.onclick = function(e) {;addShow(this); };
        showAdd.appendChild(addIcon);

        var addIconTooltip = document.createElement("p");
        addIconTooltip.className += "addIconTooltip"
        addIconTooltip.innerHTML = "Add show to your collection";
        showAdd.appendChild(addIconTooltip);
        flipAddIcon(addIcon, !showIsInCollection(showList[i].name));
    }
}
*/