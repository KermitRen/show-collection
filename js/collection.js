//Global Variables
var searchBar, gallery;


//setting up references
window.onload = function() {
    gallery = document.getElementById("gallery");
    searchBar = document.getElementById("navSearchBar");
    reloadShows();
};

function reloadShows() {
    myCollection = JSON.parse(window.localStorage.getItem("collection"));
    if(myCollection != null) {
        let filteredList1 = myCollection.filter(show => show.name.toLowerCase().includes(searchBar.value.toLowerCase()));
        let filteredList2 = filteredList1.filter(show => show.genres.toLowerCase().includes(findSelectedGenre()));
        let sortedList = sortList(filteredList2);
        displayShows(sortedList);
    }
}

function sortList(list) {
    
    if(document.getElementById("collectionSortName").checked) {
        list.sort((s1, s2) => {
            if(s1.name < s2.name) {
                return -1;
            } else if(s1.name > s2.name) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if(document.getElementById("collectionSortRating").checked){
        list.sort((s1, s2) => {
            let s1Rating = window.localStorage.getItem(s1.id) ?? 0;
            let s2Rating = window.localStorage.getItem(s2.id) ?? 0;
            if(s1Rating > s2Rating) {
                return -1;
            } else if(s1Rating < s2Rating) {
                return 1;
            } else {
                return 0;
            }
        })
    }
    return list;
}

function displayShows(showList) {

    //Remove all shows in the gallery
    while(gallery.children.length > 0) {
        gallery.removeChild(gallery.children[0]);
    }

    //Add all shows in the showList ot the gallery
    for(var i = 0; i < showList.length; i++) {

        let sName = showList[i].name;
        let sID = showList[i].id;
        let sGenres = showList[i].genres;
        let sPoster = showList[i].posterPath;

        //Create container
        var posterContainer = document.createElement("div");
        posterContainer.className += "showPoster";
        let buttonMask = ("".concat("addButton",i));
        posterContainer.onclick = function (e) {
            if(e.target.id != buttonMask) {
                window.location.href="showcase.html?show=" + sID;
            }
        };
        gallery.appendChild(posterContainer);

        //Create image
        var poster = document.createElement("img");
        poster.src = sPoster;
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
        addIcon.onclick = function() {toggleShow(sName, sGenres, sPoster, sID, buttonMask); reloadShows(); };
        showAdd.appendChild(addIcon);

        var addIconTooltip = document.createElement("p");
        addIconTooltip.className += "addIconTooltip"
        addIconTooltip.innerHTML = "Add show to your collection";
        showAdd.appendChild(addIconTooltip);
        flipAddIcon(addIcon, !showIsInCollection(showList[i].name));

        //Create rating
        var ratingContainer = document.createElement("div");
        ratingContainer.className += "ratingContainer";
        posterContainer.appendChild(ratingContainer);

        var starIcon = document.createElement("i");
        starIcon.className += "material-icons";
        starIcon.innerHTML = "star";
        ratingContainer.appendChild(starIcon);

        var rating = document.createElement("p");
        if(window.localStorage.getItem(sID) != null) {
            rating.innerHTML = "".concat(window.localStorage.getItem(sID)/10," / 10");
        } else {
            starIcon.style.display = "none";
            rating.innerHTML = "-";
        }
        rating.className += "ratingText";
        ratingContainer.appendChild(rating);
    }
}
