mapboxgl.accessToken = 'pk.eyJ1Ijoibm9zaG1lY2tpZSIsImEiOiJja2JwYm9tYzkxaTRxMndwOWhwZ2k3cnI2In0.TFYXAhbT-BhuK5k4jkXG4w';
const openWeatherMapApiKey = "8285612423da51eb79643f99d1e7d697";

const landingSpot = [
    {
        name: "Kennedy Space Center, Florida",
        location: {lat: 28.621300, lng: -80.608078},
        style: "mapbox://styles/noshmeckie/ckbno54092kc01ilx4ue40x44"
    }, {
        name: "McMurdo Station, Antarctica",
        location: {lat: -80.602078, lng: -80.602078},
        style: "mapbox://styles/noshmeckie/ckbnza4uz2v341imve442bm3p"
    }, {
        name: "Amsterdam, the Netherlands",
        location: {lat: 52.370216, lng: 4.895168},
        style: "mapbox://styles/noshmeckie/ckbnztyu82vsp1jqqxkbqcgd2"
    }, {
        name: "Nuuk, Greenland",
        location: {lat: 64.18347, lng: -51.72157},
        style: "mapbox://styles/noshmeckie/ckbnzkvtw2vdr1imvutxzs30m"
    }, {
        name: "JSLC, China",
        location: {lat: 40.9675, lng: 100.278611},
        style: "mapbox://styles/noshmeckie/ckbnzfop12va01ilx2et08g73"
    }, {
        name: "Cape Town, South Africa",
        location: {lat: -33.918861, lng: 18.423300},
        style: "mapbox://styles/noshmeckie/ckbnznwz62uh01ilp7roic8lq"
    }, {
        name: "Sydney, Australia",
        location: {lat: -33.865143, lng: 151.209900},
        style: "mapbox://styles/noshmeckie/ckbnzqzkt2k9d1in0h9rw8hjj"
    }
];

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/noshmeckie/ckbno54092kc01ilx4ue40x44',
    center: [18.423300, -33.918861],
    zoom: 15,
});


function weatherLookup(index, lng, lat) {
    console.log(`Check weather for coordinate: ${lng}, ${lat}`);

    let request = new XMLHttpRequest();
    request.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${openWeatherMapApiKey}&mode=html&unit=metric`);
    request.onload = function () {
        console.log(this.response);
        let popup = document.getElementById(`popup-${index}`);
        let weatherElement = document.createElement('div');
        weatherElement.innerHTML = this.response;
        if (popup.childElementCount === 1)
            popup.removeChild(popup.childNodes[0]);
        popup.append(weatherElement)
    };

    request.send()
}

map.addControl(new mapboxgl.NavigationControl());

for (let i = 0; i < landingSpot.length; i++) {
    const markerElement = document.createElement('div');
    markerElement.className = 'candidateMarker';
    markerElement.onclick = () => {
        weatherLookup(i, landingSpot[i].location.lng, landingSpot[i].location.lat);
        map.setStyle(landingSpot[i].style);
    }

    const popup = new mapboxgl
        .Popup()
        .setHTML(`<h3>${landingSpot[i].name}</h3><div id="popup-${i}"></div><p class="${i === 0 ? "perfect" : "candidate"}-location-popup">${i === 0 ? "Perfect" : "Not ideal"} for landing.</p>`)

    const candidateMarker = new mapboxgl
        .Marker(markerElement)
        .setLngLat([landingSpot[i].location.lng, landingSpot[i].location.lat])
        .setPopup(popup)
        .addTo(map);
}

