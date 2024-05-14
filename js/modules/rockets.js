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
    var valor = (rocket.cost_per_launch)
    var numeroFormateado = "$ " + new Intl.NumberFormat('es-ES').format(valor);

    let generalInfo = document.getElementById("headerRockets");
    generalInfo.innerHTML = `
        <p id="namee">${rocket.name}</p>
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
    let infoRocket = document.getElementById("info1");
    infoRocket.innerHTML = `
        <h2>${rocket.country}</h2>
        <p>${rocket.description}</p>

    `;

    let infRocket = document.getElementById("info2");
    infRocket.innerHTML = `
        <h2>The estimated cost per rocket launch</h2>
        <p>${numeroFormateado}</p>
    `;
    let inRocket = document.getElementById("info3");
    inRocket.innerHTML = `
        <h2>The date of the first flight of the rocket</h2>
        <p>${rocket.first_flight}</p>
    `;
    let iRocket = document.getElementById("info4");
    iRocket.innerHTML = `
        <h2>Read more about the coete</h2>
        <a href="${rocket.wikipedia}">Wikipedia</a>
    `;
}
