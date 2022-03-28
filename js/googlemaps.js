checkLocationPermission();

function checkLocationPermission() {
    navigator.permissions.query({name:'geolocation'}).then(function(result) {
        if (result.state == 'granted') {
          permission = true;
          const div = document.getElementById("LocationPrompt");
          div.classList.toggle("Hide");
        }
    })
}

// Initialize and add the map
function initMap() {
    let currentLat = 52.652899;
    let currentLong = -0.478253;

    function setPosition(position) {
        currentLat = position.coords.latitude;
        currentLong = position.coords.longitude;
    }

    const div = document.getElementById("LocationPrompt");
    if (div.classList.contains("Hide") == true) {
        navigator.geolocation.getCurrentPosition(function (position) {
            setPosition(position);

            const centerLat = Number(((currentLat+52.652899)/2));
            const centerLong = Number(((currentLong-0.478253)/2));
            
            // Set locations
            const stamford = { lat: 52.652899, lng: -0.478253 };
            const currentLoc = { lat: currentLat, lng: currentLong };
            const centerZone = {lat: centerLat, lng: centerLong };
        
            // Create map
            const map = new google.maps.Map(document.getElementById("map"), { zoom: 10, center: centerZone, });
        
            // Create markers
            const marker1 = new google.maps.Marker({ position: stamford, map: map, });
            const marker2 = new google.maps.Marker({ position: currentLoc, map: map, });

        });
    }

    else {
        const centerLat = Number(((currentLat+52.652899)/2).toFixed(6));
        const centerLong = Number(((currentLong-0.478253)/2).toFixed(6));
        
        // Set locations
        const stamford = { lat: 52.652899, lng: -0.478253 };
        const currentLoc = { lat: currentLat, lng: currentLong };
        const centerZone = {lat: centerLat, lng: centerLong };
    
        // Create map
        const map = new google.maps.Map(document.getElementById("map"), { zoom: 10, center: centerZone, });
    
        // Create markers
        const marker1 = new google.maps.Marker({ position: stamford, map: map, });
        const marker2 = new google.maps.Marker({ position: currentLoc, map: map, });
    }   
};

