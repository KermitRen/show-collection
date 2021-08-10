//Variables
var searchBar, gallery;
var apiKey = "0e657fa9149b1bbf497985c5de06f62d";
var baseURL = "https://api.themoviedb.org/3/";


//Setting up references
window.onload = function() {
    gallery = document.getElementById("gallery");
    searchBar = document.getElementById("navSearchBar");
    //window.localStorage.clear();
    changeDiscoverFunction()
};

function activateSearchBar(e) {
    if(e.keyCode == 13) {
        searchForShow();
    }
}

function checkSearchBar() {
    if(searchBar.value.toLowerCase()== "") {
        changeDiscoverFunction();
    }
}

function changeDiscoverFunction() {
    if(document.getElementById("discoverCheckPopular").checked) {
        let mostPopular = JSON.parse(sessionStorage.getItem("mostPopular"));
        if(mostPopular != null) {
            displayShowList(mostPopular);
        } else {
            findAndDisplayMostPopular();
        }
    } else if(document.getElementById("discoverCheckTopRated").checked) {
        let topRated = JSON.parse(sessionStorage.getItem("topRated"));
        if(topRated != null) {
            displayShowList(topRated);
        } else {
            findAndDisplayTopRated();
        } 
    }
}

function searchForShow() {
    let searchTerm = searchBar.value.toLowerCase();
    if(searchTerm == "") {
        changeDiscoverFunction();
    } else {
        let url = "".concat(baseURL,"search/tv?api_key=",apiKey,"&language=en-US","&query=",searchTerm);
        fetch(url).then( results =>
            data = results.json()    
        ).then( data => {
            console.log(data);
            interestingResults = [];
            for(var i = 0; i < data.results.length;i++) {
                if(data.results[i].poster_path != null && data.results[i].vote_count > (data.results.length * 4)){
                    interestingResults.push(data.results[i]);
                }
            }
            displayShowList(interestingResults);
        })
    }
}

function findAndDisplayTopRated() {
    let popularUrl = "".concat(baseURL,"tv/top_rated?api_key=", apiKey, "&language=en-US");
    let results = [];
    let pages = 20;
    let pageCount = 0;
    for(var i = 1; i <= pages; i++) {
        let url = "".concat(popularUrl,"&page=",i);
        fetch(url).then( result =>
            data = result.json()  
        ).then( data => {
            let pageResults = data.results;
            for(i=0; i <pageResults.length;i++) {
                if(pageResults[i].vote_count > 2000) {
                    results.push(pageResults[i]);
                }
            }
        }).then(() => {
            pageCount++;
            if(pageCount == pages) {
                results.sort((s1, s2) => {
                    if(s1.vote_average > s2.vote_average) {
                        return -1;
                    } else if(s1.vote_average < s2.vote_average) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                window.sessionStorage.setItem("topRated", JSON.stringify(results));
                displayShowList(results);
            }
        })
    }
}

function findAndDisplayMostPopular() {
    let popularUrl = "".concat(baseURL,"tv/popular?api_key=", apiKey, "&language=en-US");
    let results = [];
    let pages = 15;
    let pageCount = 0;
    for(var i = 1; i <= pages; i++) {
        let url = "".concat(popularUrl,"&page=",i);
        fetch(url).then( result =>
            data = result.json()  
        ).then( data => {
            let pageResults = data.results;
            for(i=0; i <pageResults.length;i++) {
                if(pageResults[i].vote_count > 2500) {
                    results.push(pageResults[i]);
                }
            }
        }).then(() => {
            pageCount++;
            if(pageCount == pages) {
                results.sort((s1, s2) => {
                    if(s1.popularity > s2.popularity) {
                        return -1;
                    } else if(s1.popularity < s2.popularity) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                window.sessionStorage.setItem("mostPopular", JSON.stringify(results));
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

        let sName = showList[i].name;
        let sID = showList[i].id;
        let sGenres = "";
        for(var j = 0; j < showList[i].genre_ids.length;j++) {
            sGenres += genreIdMap(showList[i].genre_ids[j])
            if( j < showList[i].genre_ids.length - 1) {
                sGenres += ", ";
            }
        }
        let sPoster = "".concat("https://image.tmdb.org/t/p/w342/",showList[i].poster_path);

        //Create container
        var posterContainer = document.createElement("div");
        posterContainer.className += "showPoster";
        let buttonMask = ("".concat("addButton",i));
        posterContainer.onclick = function (e) {
            if(e.target.id != buttonMask) {
                window.location.href="showcase.html?show=" + sID
            }
        };
        gallery.appendChild(posterContainer);

        //Create image
        var poster = document.createElement("img");
        poster.src = sPoster
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
        showName.innerHTML = sName;
        showInfo.appendChild(showName);

        var showGenres= document.createElement("p");
        showGenres.className += "showGenres";
        showGenres.innerHTML = sGenres;
        showInfo.appendChild(showGenres);

        var showAdd = document.createElement("div");
        showAdd.className += "showAdd";
        hoverContainer.appendChild(showAdd);

        var addIcon = document.createElement("i");
        addIcon.id = buttonMask;
        addIcon.onclick = function() {toggleShow(sName, sGenres, sPoster, sID, buttonMask); };
        showAdd.appendChild(addIcon);

        var addIconTooltip = document.createElement("p");
        addIconTooltip.className += "addIconTooltip"
        addIconTooltip.innerHTML = "Add show to your collection";
        showAdd.appendChild(addIconTooltip);
        flipAddIcon(addIcon, !showIsInCollection(showList[i].name));
    }
}
