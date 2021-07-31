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

function addShow(iconTag) {
    let showName = iconTag.parentElement.parentElement.children[0].children[0].innerHTML;
    let oldCollection = window.localStorage.getItem("collection");

    //Add the show to collection if not already done
    if(!showIsInCollection(showName)) {
        //Add Show
        flipAddIcon(iconTag, false);
        if(oldCollection == null) {
            window.localStorage.setItem("collection", showName);
        } else {
            window.localStorage.setItem("collection",oldCollection + ", " + showName);
        }
    } else {
        //Remove Show
        flipAddIcon(iconTag, true);
        let newCollection = oldCollection.split(", ").filter(show => show != showName);
        if(newCollection.length == 0) {
            window.localStorage.removeItem("collection");
        } else {
            window.localStorage.setItem("collection", newCollection.join(", "));
        }
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
    if(window.localStorage.getItem("collection") == null) {
        return false;
    } else {
        return window.localStorage.getItem("collection").split(", ").includes(showName);
    }
}

function setupAllShows(allShows) {
    allShows.push({name:"stranger things", genres:["drama","sci-fi","horror","mystery"]})
    allShows.push({name:"mindhunter", genres:["drama", "crime", "thriller"]})
    allShows.push({name:"game of thrones", genres:["action","adventure","fantasy","drama"]})
    allShows.push({name:"rick and morty", genres:["sci-fi", "animation", "comedy", "adventure"]})
    allShows.push({name:"the haunting of bly manor", genres:["drama","horror","mystery","romance"]})
    allShows.push({name:"the queens gambit", genres:["drama"]})
    allShows.push({name:"the umbrella academy", genres:["action","comedy","adventure"]})
    allShows.push({name:"westworld", genres:["sci-fi", "mystery","drama"]})
    allShows.push({name:"breaking bad", genres:["crime", "drama","thriller"]})
    allShows.push({name:"the walking dead", genres:["drama","horror","thriller"]})
    allShows.push({name:"friends", genres:["comedy","sitcom","romance"]})
    allShows.push({name:"how i met your mother", genres:["comedy","sitcom","romance"]})
    allShows.push({name:"chernobyl", genres:["drama","thriller","history"]})
    allShows.push({name:"modern family", genres:["comedy","sitcom"]})
    allShows.push({name:"the mandalorian", genres:["adventure","sci-fi","action"]})
    allShows.push({name:"the boys", genres:["action","drama"]})
    allShows.push({name:"the witcher", genres:["action","fantasy","adventure"]})
    allShows.push({name:"american horror story", genres:["horror","drama","thriller"]})
    allShows.push({name:"13 reasons why", genres:["drama","mystery","thriller"]})
    allShows.push({name:"lucifer", genres:["crime","drama","fantasy"]})
    allShows.push({name:"brooklyn nine-nine", genres:["comedy","sitcom","crime"]})
    allShows.push({name:"community", genres:["comedy","sitcom"]})

    //allShows.push({name:"", genres:[]})
}