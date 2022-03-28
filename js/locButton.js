const EnableLocationButton = document.getElementById("locationPermsButton");
EnableLocationButton.addEventListener("click", triggerPositionPrompt, false);

function triggerPositionPrompt() {
    navigator.geolocation.getCurrentPosition(test)
}

function test() {
    window.location="/findus.html";
}