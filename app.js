// Client ID zWsHIInzwkCXLA9ZS5q4HAaLOwadiHOi
// Client Secret kyGL18H4d80Ag6CD

//Google Maps
////////////////////////////////////////////////////////////////////////////////////////////////////////
// AIzaSyDttWY6FVRVPYVS04eTBI7OX0xMHgeEFNM
const APIkey = 'AIzaSyDttWY6FVRVPYVS04eTBI7OX0xMHgeEFNM';

var map;
var infowindow;
var service;
var bounds;

var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';



function initMap() {
    var Phoenix = {
        lat: 33.2696,
        lng: -111.8367
    }
    var NYC = {
        lat: 40.749460,
        lng: -73.988631
    };
    var Wellington = {
        lat: -41.2865,
        lng: 174.7762
    };
    var Paris = {
        lat: 48.8566,
        lng: 2.3522
    }
    var Motor = {
        lat: 50.8230,
        lng: -1.4536
    }
    var Wight = {
        lat: 50.7005,
        lng: -1.2930
    }
    var markers = [];

    map = new google.maps.Map(document.getElementById('map'), {
        center: NYC,
        zoom: 2,
        gestureHandling: 'cooperative',
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: true
    });

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    console.log(service);
    // service.nearbySearch({
    //   location: NYC,
    //   radius: 50000,
    //   keyword: 'museum',
    //   maxResults: 20,
    //   // rankby: distance
    // }, callback);

    console.log(google);
    // console.log(markers);

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)


    /////////////////////////////////////////////////////////////////////////////////////////////
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {

        bounds = new google.maps.LatLngBounds();

        var places = searchBox.getPlaces();
        var place = places[0];
        // places long form
        // var places = new google.maps.places.SearchBox(document.getElementById('pac-input')).getPlaces();
        console.log(places);
        console.log(places[0].name);

        if (places.length == 0) {
            return;
        }

        service.textSearch({
            query: place.name,
            type: 'museum'
        }, callback);

        if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
        //       console.log(markers);
        //   });
    });
    /////////////////////////////////////////////////////////////////////////////////////////////
}

function callback(results, status) {
    console.log(`status parameter is ${status}`);
    console.log(results);
    console.log(results[0].place_id);
    // getPlaceDetailsById (results[0].place_id);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        results.forEach(createMarker);
    }
}

function createMarker(place) {
    markers = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: iconBase + 'museum_maps.png'
    });

    // Opens new window when user clicks on marker
    google.maps.event.addListener(markers, 'click', function () {
        // window.open("https://www.w3schools.com");
        getChannelFromYouTube(place.name);
        // getDataFromYouTube();
        var request = {
            reference: place.reference
        };
        service.getDetails(request, function (details, status) {
            console.log([
          details.name,
          details.formatted_address,
          details.website,
          details.rating,
          details.formatted_phone_number]);
            // infowindow.open(map, marker);
        });
    });

    // Shows name when user hovers over markers
    google.maps.event.addListener(markers, 'mouseover', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });


    // Change Museum results as User moves around the map
}

// Clear out the old markers.
// markers.forEach(function(marker) {
//   marker.setMap(null);
// });
// markers = [];


//     // For each place, get the icon, name and location.
//     places.forEach(function(place) {
//       if (!place.geometry) {
//         console.log("Returned place contains no geometry");
//         return;
//       }
//       var icon = {
//         url: place.icon,
//         size: new google.maps.Size(71, 71),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(17, 34),
//         scaledSize: new google.maps.Size(25, 25)
//       };

//       // Create a marker for each place.
//       markers.push(new google.maps.Marker({
//         map: map,
//         icon: icon,
//         title: place.name,
//         position: place.geometry.location
//       }));


//Google Street View

//YouTube API


// getApiData ('The MET', (data) => console.log(data))

// Function takes in Museum Name from Google as parameter
// API call using YouTube search to identify if channel is present
// If Channel is present,

///////////////////////////////////////////////////////////////////////////////////////
//Google to YouTube "Translator"
//Language translation for YouTube search Louvre Museum to Musee du Louvre
//Youtube search parameters for accuracy


var YTchannelId;

function getChannelFromYouTube(searchTerm) {
    // if (search) {
    //   endpoint = "https://www.googleapis.com/youtube/v3/search"
    // }
    var result = $.ajax({
            /* update API end point */
            url: "https://www.googleapis.com/youtube/v3/search",
            data: {
                q: searchTerm + ' channel',
                part: 'snippet',
                maxResults: 20,
                key: APIkey,
                // order: 'relevance'
                // location: '(-41.3064,174.8243)',
                // locationRadius: '1000km',
                // type: 'channel'
            },
            dataType: "jsonp",
            /*set the call type GET / POST*/
            type: "GET",
            crossDomain: true
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            /* if the results are meeningful, we can just console.log them */
            console.log(result);
            findChannel(result);
            // YTchannelId = result.items[0].id.channelId;
            // console.log(result.items[0].id.channelId)
            // getDataFromYouTube(result.items[0].id.channelId);
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}


function findChannel(data) {
    var foundElem = [];
    data.items.forEach(function (elem) {
        if (elem.id.kind === 'youtube#channel') {
            console.log(elem);
            foundElem.push(elem);
        }
    })
    if (foundElem.length > 0) {
        console.log(foundElem[0].id.channelId);
        getDataFromYouTube(foundElem[0].id.channelId, foundElem[0].snippet.channelTitle);
    } else {
        console.log("No channel found");
    }
}

//Filter functions to be added here
function filterChannel(foundElem) {
    //filter results by keyword here
}

function getDataFromYouTube(channelId, channelTitle) {
    var result = $.ajax({
            /* update API end point */
            url: "https://www.googleapis.com/youtube/v3/search",
            data: {
                channelId: channelId,
                part: 'snippet',
                maxResults: 10,
                key: APIkey
            },
            dataType: "jsonp",
            /*set the call type GET / POST*/
            type: "GET",
            crossDomain: true
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            /* if the results are meeningful, we can just console.log them */
            console.log(result);
            displayResults(result, channelTitle);
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}
///////////////////////////////////////////////////////////////////////////////////////\

// function that generates results string
function generateResults(elem) {
    console.log(`Results string generated here`);
    return `
        <div class ="thumbnail-div">
            <a href="https://www.youtube.com/watch?v=${elem.id.videoId}" target=_blank>
                <img src="${elem.snippet.thumbnails.medium.url}" class="thumbnail-img">
                <h3 class='video-title'>${elem.snippet.title}</h3>
            </a>
        </div>`;
}

function displayResults(data, channel) {
    console.log(`Display Results ran`);
    console.log(data);
    const results = data.items.map((elem, index) => generateResults(elem));
    $('.js-search-results').html(`<p id="results-str">${channel} Channel Videos</p>`);
    $('.js-search-results').append(results);
}

function submitListen() {
    console.log(`the submitListen function ran`);
    $('.js-search-form').submit(event => {
        event.preventDefault();
        console.log(`Submit button heard`);

        const queryTarget = $(event.currentTarget).find('.js-query');
        const userText = queryTarget.val();
        // clear out the input
        queryTarget.val("");
        $('.js-search-results').prop('hidden', false);

        getApiData(userText);
        // displayResults();
    })
}


$(submitListen());
