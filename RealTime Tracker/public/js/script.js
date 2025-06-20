// const socket = io();

// if(navigator.geolocation){
//     navigator.geolocation.watchPosition((position)=>{
//         const {latitude, longitude} = position.coords;
//         socket.emit("send-location", {latitude: latitude, longitude : longitude})
//     }, (error)=>{
//         console.log(error);
//     },
//     {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0,

//     }
// );
// }

// const map = L.map("map").setView([0,0], 16);

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
//     attribution: "OpenStreetMap"
// }).addTo(map);

// const markers = {};

// socket.on("receive-location",(data)=>{
//     const {id, latitude, longitude} = data;
//     map.setView([latitude, longitude],20);

//     // Only center the map on *your own* location
//     // if (id === myId) {
//     //     map.setView([latitude, longitude], 20);
//     // }
//     if(markers[id]){
//         markers[id].setLatLng([latitude, longitude]);
//     } else{
//         markers[id] = L.marker([latitude, longitude]).addTo(map);
//     }
// })

// socket.on("user-disconnected", (id)=>{
//     if(markers[id]){
//         map.removeLayer(markers[id]);
//         delete markers[id];
//     }
// });


const socket = io();
let myId = null;

socket.on("connect", () => {
    myId = socket.id;
    console.log("My socket ID:", myId);
});

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            console.log("Sending location:", latitude, longitude);
            socket.emit("send-location", { latitude, longitude });
        },
        (error) => {
            console.log(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
}

const map = L.map("map").setView([0, 0], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenStreetMap contributors",
}).addTo(map);

const markers = {};

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;
    console.log("Received:", id, latitude, longitude);

    // Safeguard invalid coordinates
    if (!latitude || !longitude) return;

    if (!markers[id]) {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    } else {
        markers[id].setLatLng([latitude, longitude]);
    }

    if (id === myId) {
        map.setView([latitude, longitude], 20);
    }
});

socket.on("user-disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});
