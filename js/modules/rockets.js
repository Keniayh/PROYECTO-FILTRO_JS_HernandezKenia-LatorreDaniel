function fetchRockets(index) {
    // Agrega la clase de animación de carga al elemento del encabezado cuando se inicia la solicitud a la API
    document.getElementById("headerRockets").classList.add("add");

    let url = 'https://api.spacexdata.com/v4/rockets/';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (index >= 0 && index < data.length) {
                const rocket = data[index];
                // Una vez que la información se ha cargado, quita la clase de animación de carga
                document.getElementById("headerRockets").classList.remove("add");
                // Muestra el nombre del cohete en el encabezado
                displayHeaderRockets(rocket);
                console.log(rocket);
            } else {
                console.log('Índice de cohete fuera de rango.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // En caso de error, asegúrate de quitar la clase de animación de carga también
            document.getElementById("headerRockets").classList.remove("add");
        });
}

fetchRockets(1);

function displayHeaderRockets(rocket) {
    let generalInfo = document.getElementById("headerRockets");
    generalInfo.innerHTML = `
        <p>${rocket.name}</p>
    `;
    let imageRocket = document.getElementById("image");
    imageRocket.innerHTML = `
        <img src="${rocket.flickr_images[0]}" alt="imagen1" class="imgNave">
        <img src="${rocket.flickr_images[1]}" alt="imagen1" class="imgNave">
        <img src="${rocket.flickr_images[2]}" alt="imagen1" class="imgNave">
        <img src="${rocket.flickr_images[3]}" alt="imagen1" class="imgNave">
        <img src="${rocket.flickr_images[4]}" alt="imagen1" class="imgNave">
        <img src="${rocket.flickr_images[5]}" alt="imagen1" class="imgNave">
        
    `;
}
