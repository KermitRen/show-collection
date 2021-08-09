function toggleFilters() {
    let filters = document.getElementById("filters");
    let filterHandle = document.getElementById("filterHandleIcon");
    if(filters.style.width != "300px") {
        filters.style.width = "300px";
        filterHandle.style.transform = "translate(-20%,0) rotate(180deg)";
    } else {
        filters.style.width = "0px";
        filterHandle.style.transform = "translate(-20%,0) rotate(0deg)";
    }
}

function toggleShow(showName, showGenres, posterPath, showID, iconTagid) {
    let iconTag = document.getElementById(iconTagid);
    let oldCollection = JSON.parse(window.localStorage.getItem("collection"));
    if(oldCollection == null) {
        oldCollection = [];
    }

    //Add the show to collection if not already done
    if(!showIsInCollection(showName)) {
        //Add Show
        flipAddIcon(iconTag, false);
        oldCollection.push({name: showName, genres: showGenres, posterPath: posterPath, id: showID});
        window.localStorage.setItem("collection", JSON.stringify(oldCollection));
    } else {
        //Remove Show
        flipAddIcon(iconTag, true);
        let newCollection = oldCollection.filter(s => s.name != showName);
        window.localStorage.removeItem(showID);
        window.localStorage.setItem("collection", JSON.stringify(newCollection));
    }
}

function flipAddIcon(iconTag, status) {
    if(status) {
        iconTag.innerHTML = "add_circle_outline";
        iconTag.className = "material-icons add";
        iconTag.parentElement.children[1].innerHTML = "Add show to your collection";
    } else {
        iconTag.innerHTML = "highlight_off";
        iconTag.className = "material-icons remove";
        iconTag.parentElement.children[1].innerHTML = "Remove show from collection";
    }
}

function showIsInCollection(showName) {
    let collection = JSON.parse(window.localStorage.getItem("collection"));
    if(collection == null) {
        return false;
    } else {
        for(var i = 0; i < collection.length;i++) {
            if(collection[i].name == showName) {
                return true
            }
        }
        return false;
    }
}

function genreIdMap(genreID) {

    switch(genreID) {
        case 10759: return "Action, Adventure";
        case 16: return "Animation";
        case 35: return "Comedy";
        case 80: return "Crime";
        case 99: return "Documentary";
        case 18: return "Drama";
        case 10751: return "Family";
        case 10762: return "Kids";
        case 9648: return "Mystery";
        case 10763: return "News";
        case 10764: return "Reality";
        case 10765: return "Sci-fi, Fantasy";
        case 10766: return "Soap";
        case 10767: return "Talk";
        case 10768: return "War, Politics";
        case 37: return "Western";
        case 10402: return "Music";
        default: throw new Error("Unknown Genre ID".concat(genreID));
    }
}

function collectionSortClick(checkbox) {
    let checkboxes = document.getElementsByClassName("collectionSortCheckbox");
    for(var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
    checkbox.checked = true;
    reloadShows();
}

function genreFilterClick(checkbox) {
    let checkboxes = document.getElementsByClassName("genreFilterCheckbox");
    for(var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
    checkbox.checked = true;
    reloadShows();
}

function discoverCheckClick(checkbox) {
    let checkboxes = document.getElementsByClassName("discoverCheckbox");
    for(var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
    checkbox.checked = true;
    changeDiscoverFunction();
}

function findSelectedGenre() {
    let checkboxes = document.getElementsByClassName("genreFilterCheckbox");
    for(var i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked) {
            return checkboxes[i].id;
        }
    }
}