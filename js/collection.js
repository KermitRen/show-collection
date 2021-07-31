//Global Variables
var allShows = []; setupAllShows(allShows);
var gallery;


//setting up references
window.onload = function() {
    gallery = document.getElementById("gallery");
    reloadShows();
};

function reloadShows() {
    let myCollection = window.localStorage.getItem("collection");
    let filteredList = allShows.filter(show => myCollection.split(", ").includes(show.name));
    displayShows(filteredList);
}

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
        addIcon.onclick = function() { addShow(this); };
        showAdd.appendChild(addIcon);

        var addIconTooltip = document.createElement("p");
        addIconTooltip.className += "addIconTooltip"
        addIconTooltip.innerHTML = "Add show to your collection";
        showAdd.appendChild(addIconTooltip);
        flipAddIcon(addIcon, !showIsInCollection(showList[i].name));
    }
}
