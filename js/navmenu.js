const menuopener = document.getElementById("menuopener");
menuopener.addEventListener("click", togglemodal, false)

const menuopener2 = document.getElementById("menuopener2");
menuopener2.addEventListener("click", togglemodal, false)

const menu = document.getElementById("menu");

function togglemodal(event) {
    event.preventDefault();
    if (menu.style.display == "block") { menu.style.display = "none"; }
    else { menu.style.display = "block"; }
}