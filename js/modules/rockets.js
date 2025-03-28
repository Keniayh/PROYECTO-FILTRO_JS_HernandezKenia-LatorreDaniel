
class MoreButton extends HTMLElement {
    constructor() {
        super();

        // Adjuntar un shadow DOM al elemento personalizado
        const shadow = this.attachShadow({ mode: 'open' });

        // Crear un contenedor para el contenido del componente
        const container = document.createElement('div');
        container.classList.add('containe');

        // Crear un contenedor para el contenido del slot
        const slot = document.createElement('slot');

        // Adjuntar los elementos al shadow DOM
        container.appendChild(slot);
        shadow.appendChild(container);

        // Estilos del componente
        const style = document.createElement('style');
        style.textContent = `
            .containe {
                padding: 16px;
                border-radius: 8px;
            }
            ::slotted(*) {
                margin: 0;
                font-size: 1em;
                color: #666;
            }
        `;

        // Adjuntar estilos al shadow DOM
        shadow.appendChild(style);
    }
}

// Definir el nuevo elemento
customElements.define('more-button', MoreButton);

function generateCircularProgressBar(percent, diameter, strokeWidth, title, kN, lbf) {
    const radius = diameter / 2;
    const circumference = Math.PI * (radius * 2);
    const progressLength = ((100 - percent) / 100) * circumference;
    const textMargin = 0.5; // Margen entre los textos en vw
    const textX = radius;
    const textY1 = radius - 30;
    const textY2 = radius;
    const textY3 = radius + 30;
    const textY4 = radius + 60;
    const fontSize = "0.7vw"; // Tamaño de la fuente

    return `
        <div class="circle-progress-bar">
            <svg width="${diameter}%" height="${diameter}" >
                <circle cx="${radius}" cy="${radius}" r="${radius - (strokeWidth / 2)}" fill="none" stroke="#007bff" stroke-width="${strokeWidth}" stroke-dasharray="${circumference}" stroke-dashoffset="${progressLength}"></circle>
                <text x="${textX}" y="${textY1}" text-anchor="middle" dominant-baseline="middle" fill="white" font-weight="bold" font-size="${fontSize}">${title}</text>
                <text x="${textX}" y="${textY2}" text-anchor="middle" dominant-baseline="middle" fill="white" font-size="${fontSize}">${percent.toFixed(2)}%</text>
                <text x="${textX}" y="${textY3}" text-anchor="middle" dominant-baseline="middle" fill="white" font-size="${fontSize}">${kN}kN</text>
                <text x="${textX}" y="${textY4}" text-anchor="middle" dominant-baseline="middle" fill="white" font-size="${fontSize}">${lbf}Lbf</text>
            </svg>
        </div>
    `;
}



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

    var kilo = (rocket.mass.kg)
    var numeroKilo = new Intl.NumberFormat('es-ES').format(kilo) + " kg";

    var libra = (rocket.mass.lb)
    var numeroLibra = new Intl.NumberFormat('es-ES').format(libra) + " lb";

    let generalInfo = document.getElementById("headerRockets");
    generalInfo.innerHTML = `
        <h2 id="namee">${rocket.name}</h2>
    `;
    let imageRocket = document.getElementById("image");
    imageRocket.innerHTML = `
        <img src="${rocket.flickr_images[0]}" alt="imagen1" class="imgNave" referrerpolicy="no-referrer">
        <img src="${rocket.flickr_images[1]}" alt="imagen1" class="imgNave" referrerpolicy="no-referrer">
        <img src="${rocket.flickr_images[2]}" alt="imagen1" class="imgNave" referrerpolicy="no-referrer">
        <img src="${rocket.flickr_images[3]}" alt="imagen1" class="imgNave" referrerpolicy="no-referrer">
        <img src="${rocket.flickr_images[4]}" alt="imagen1" class="imgNave" referrerpolicy="no-referrer">
        <img src="${rocket.flickr_images[5]}" alt="imagen1" class="imgNave" referrerpolicy="no-referrer">
        
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
    let moreInfo = document.getElementById("moreInfo");
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
    let moreInfoo = document.getElementById("moreInfoo");
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
 

    let informationNave = document.getElementById("infoRocket");
    informationNave.innerHTML = `
    <div class="informationContainer" id="informationNave1">
        <div class="progress-container">
            <label id="spam">Rocket diameter : </label>
            <progress max="12.2" value="${rocket.diameter.meters}"></progress>
        </div>
        <div class="div2">
            <span id="spam">
                ${(rocket.diameter.meters && rocket.diameter.meters ? (rocket.diameter.meters).toString().replace(".", ",") + "     M" : '')}
                <br>
                ${(rocket.diameter.meters && rocket.diameter.meters ? (rocket.diameter.feet).toString().replace(".", ",") + "     F" : '')}
            </span>
        </div>
    </div>
    <div class="informationContainer" id="informationNave2">
        <div class="progress-container">
            <label id="spam">Rocket weight : </label>
            <progress max="1420788" value="${rocket.mass.kg}"></progress>
        </div>
        <div class="div2">
            <span id="spam">${numeroKilo}<br>${numeroLibra}</span>
        </div>
    </div>
    <div class="informationContainer" id="informationNave7">
        <div class="progress-container">
            <label id="spam">Rocket height : </label>
            <progress max="118" value="${rocket.height.meters}"></progress>
        </div>
        <div class="div2">
            <span id="spam"><span id="spam">${(rocket.height.meters).toString().replace(".", ",") + "     M"}<br>${(rocket.height.feet).toString().replace(".", ",") + "     F"}</span></span>
        </div>
    </div>
    <div class="informationContainer" id="informationNave7" style="display: ${(rocket.second_stage.payloads.composite_fairing.diameter && (rocket.second_stage.payloads.composite_fairing.diameter.meters || rocket.second_stage.payloads.composite_fairing.diameter.feet)) ? 'flex' : 'none'}">
        <div class="progress-container">
            <label id="spam">Diameter rocket shield : </label>
            <progress max="5.2" value="${(rocket.second_stage.payloads.composite_fairing.diameter.meters)}"></progress>
        </div>
        <div class="div2">
            <span id="spam">
                ${(rocket.second_stage.payloads.composite_fairing.diameter && rocket.second_stage.payloads.composite_fairing.diameter.meters ? (rocket.second_stage.payloads.composite_fairing.diameter.meters).toString().replace(".", ",") + "     M" : '')}
                <br>
                ${(rocket.second_stage.payloads.composite_fairing.diameter && rocket.second_stage.payloads.composite_fairing.diameter.feet ? (rocket.second_stage.payloads.composite_fairing.diameter.feet).toString().replace(".", ",") + "     F" : '')}
            </span>
        
        </div>
    </div>
    <div class="informationContainer" id="informationNave7" style="display: ${(rocket.second_stage.payloads.composite_fairing.diameter && (rocket.second_stage.payloads.composite_fairing.diameter.meters || rocket.second_stage.payloads.composite_fairing.diameter.feet)) ? 'flex' : 'none'}">
        <div class="progress-container">
            <label id="spam">Height rocket shield : </label>
            <progress max="13.1" value="${(rocket.second_stage.payloads.composite_fairing.height.meters)}"></progress>
        </div>
        <div class="div2">
            <span id="spam">
                ${(rocket.second_stage.payloads.composite_fairing.height && rocket.second_stage.payloads.composite_fairing.height.meters ? (rocket.second_stage.payloads.composite_fairing.height.meters).toString().replace(".", ",") + "     M" : '')}
                <br>
                ${(rocket.second_stage.payloads.composite_fairing.height && rocket.second_stage.payloads.composite_fairing.height.feet ? (rocket.second_stage.payloads.composite_fairing.height.feet).toString().replace(".", ",") + "     F" : '')}
            </span>
        </div>
    </div>
    `;
    rocket.payload_weights.forEach(function(weight) {
        // Crear un nuevo div para cada grupo de pesos de carga
        var weightDiv = document.createElement("div");
        weightDiv.classList.add("informationContainer");
        
        // Generar la barra de progreso para el peso actual
        var progressBar = generateProgressBar(weight.kg, 150000); // Usar weight.kg como value y 1500000 como max
        
        // HTML interno del div
        weightDiv.innerHTML = `
            <div class="progress-container">
                <label id="spam">${weight.name} : </label>
                ${progressBar.outerHTML} <!-- Insertar la barra de progreso generada -->
            </div>
            <div class="div2">
                <span id="spam">${(weight.kg.toLocaleString('es-ES')) + " kg"}<br>${(weight.lb.toLocaleString('es-ES')) + " lb"}</span>
            </div>
        `;
    
        // Agregar el div al contenedor principal
        informationNave.appendChild(weightDiv);
    });
    // Calcular los porcentajes
    let percent = ((rocket.engines.thrust_sea_level.kN) / ((rocket.engines.thrust_sea_level.kN + rocket.engines.thrust_vacuum.kN)) * 100);
    let percentt = ((rocket.engines.thrust_vacuum.kN) / ((rocket.engines.thrust_sea_level.kN + rocket.engines.thrust_vacuum.kN)) * 100);
    let title = "Atmospheric acceleration";
    let titlee = "Speed in space";
    let kN = (rocket.engines.thrust_sea_level.kN);
    let kNN = (rocket.engines.thrust_vacuum.kN);
    let lbf = new Intl.NumberFormat('es-ES').format((rocket.engines.thrust_sea_level.lbf));
    let lbff = new Intl.NumberFormat('es-ES').format((rocket.engines.thrust_vacuum.lbf));
    // Variables para el tamaño del círculo de progreso
    const diameter = 170; // Diámetro del círculo en píxeles
    const strokeWidth = 10; // Ancho de la barra de progreso en píxeles
    const radius = diameter / 2;

    // Limpiar el contenido existente en el contenedor de velocidad
    let speedRocket = document.getElementById("speed");
    speedRocket.innerHTML = '';

    // Generar HTML para la primera barra de progreso (Atmospheric acceleration)
    let progressBarHTML = generateCircularProgressBar(percent, diameter, strokeWidth, title, kN, lbf);
    speedRocket.innerHTML = progressBarHTML;

    // Generar HTML para la segunda barra de progreso (Speed in space)
    let progressBarHTMLt = generateCircularProgressBar(percentt, diameter, strokeWidth, titlee, kNN, lbff);
    speedRocket.innerHTML += progressBarHTMLt;
}

function generateProgressBar(value, max) {
    const progress = document.createElement("progress");
    progress.max = max;
    progress.value = value;

    const container = document.createElement("div");
    container.classList.add("progress-container");
    container.appendChild(progress);

    return container;
}
