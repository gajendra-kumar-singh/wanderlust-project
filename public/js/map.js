mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    // center: [85.8245, 20.2961], // starting position [lng, lat]
    center: listing.geometry.coordinates,
    zoom: 9, // starting zooms
});

// console.log(coordinates);

const marker = new mapboxgl.Marker({color: "red" })
    .setLngLat(listing.geometry.coordinates) // Listing.geometry.coordinates

    .setPopup( 
        new mapboxgl.Popup({offset: 25}).setHTML(
            `<h4>${listing.location}</h4><p>Exact location will be provided after booking</p>`
        )
    )
    .addTo(map);
