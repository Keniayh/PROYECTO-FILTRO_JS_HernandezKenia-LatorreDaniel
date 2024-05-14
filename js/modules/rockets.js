function fetchRockets(index) {
    // Agrega la clase de animación de carga al elemento del encabezado cuando se inicia la solicitud a la API
    document.getElementById("headerRockets").classList.add("loding");

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
            document.getElementById("headerRockets").classList.remove("loding");
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
        <p><a href="${rocket.wikipedia}" id="wiki">Wikipedia</a></p>
    `;
    let moreInfo = document.getElementById("moreInfo")
    moreInfo.innerHTML = `
        <div class="infoMore" id="more1">
            <span id="spam">Type</span>
            <strong id="strom">${rocket.type}</strong>
        </div>
        <div class="infoMore" id="more1">
            <span id="spam">Rocket in service</span>
            <strong id="strom">${rocket.active? 'Active' : 'Low'}</strong>
        </div>
        <div class="infoMore" id="more1">
            <span id="spam">Number of stages</span>
            <strong id="strom">${rocket.stages}</strong>
        </div>
        <div class="infoMore" id="more1">
            <span id="spam">Number of boosters</span>
            <strong id="strom">${rocket.boosters}</strong>
        </div>
        <div class="infoMore" id="more1">
            <span id="spam">Landing legs</span>
            <strong id="strom">${rocket.landing_legs.number}</strong>
        </div>
        <div class="infoMore" id="more1">
            <span id="spam">Leg material</span>
            <strong id="strom">${rocket.landing_legs.material}</strong>
        </div>
    `;
    let moreInfoo = document.getElementById("moreInfoo")
    moreInfoo.innerHTML = `
        <div class="infoMore" id="more1">
            <span id="spam">Type</span>
            <strong id="strom">${rocket.engines.type} ${rocket.engines.version}</strong>
        </div>
        <div class="infoMore" id="more1">
            <span id="spam">Maximum power loss</span>
            <strong id="strom">${rocket.engines.engine_loss_max}</strong>
        </div>
        <div class="infoMore" id="more1">
            <span id="spam">Engine availability</span>
            <strong id="strom">${rocket.engines.layout}</strong>
        </div>
        <div class="infoMore" id="more1">
            <span id="spam">Number of engines</span>
            <strong id="strom">${rocket.engines.number}</strong>
        </div>
        <div class="infoMore" id="more1">
            <span id="spam">Stage 1 fuel</span>
            <strong id="strom">${rocket.engines.propellant_1}</strong>
        </div>
        <div class="infoMore" id="more1">
            <span id="spam">Stage 2 fuel</span>
            <strong id="strom">${rocket.engines.propellant_2}</strong>
        </div>
    `;
}
