
function loadPopup(popUpid) {
    document.getElementById(popUpid).style.display = "block";
    document.getElementById("mainContent").style.filter = "blur(5px)";
    document.getElementById("navbar").style.filter = "blur(5px)";
}

function closePopup(popUpid) {
    document.getElementById(popUpid).style.display = "none";
    document.getElementById("mainContent").style.filter = "";
    document.getElementById("navbar").style.filter = "";
}