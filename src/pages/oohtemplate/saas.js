function showUserPage(){
    document.getElementById("page-user").style.display    = "flex";
    document.getElementById("page-search").style.display  = "none";
    document.getElementById("page-play").style.display    = "none";

    document.getElementById("nav-user").style.marginBottom   = "-3px";
    document.getElementById("nav-search").style.marginBottom = "0";
    document.getElementById("nav-play").style.marginBottom   = "0";
}
function showSearchPage(){
    document.getElementById("page-user").style.display   = "none";
    document.getElementById("page-search").style.display  = "flex";
    document.getElementById("page-play").style.display    = "none";

    document.getElementById("nav-user").style.marginBottom   = "0";
    document.getElementById("nav-search").style.marginBottom = "-3px";
    document.getElementById("nav-play").style.marginBottom   = "0";
}
function showPlayPage(){
    document.getElementById("page-user").style.display   = "none";
    document.getElementById("page-search").style.display  = "none";
    document.getElementById("page-play").style.display    = "flex";

    document.getElementById("nav-user").style.marginBottom   = "0";
    document.getElementById("nav-search").style.marginBottom = "0";
    document.getElementById("nav-play").style.marginBottom   = "-3px";
}