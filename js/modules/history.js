function fetchRockets(index) {
    let url = 'https://api.spacexdata.com/v4/history/';
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
                displayHeaderHistory(rocket);
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

fetchRockets(10);

function displayHeaderHistory(rocket) {

    variable = (rocket.event_date_utc);
    variable = variable.slice(0, 10);
    arrayFechas = variable.split('-');
    ano = arrayFechas[0]
    mes = arrayFechas[1]
    dia = arrayFechas[2]
    fechaFinal = mes + "/" + dia + "/" + ano

    let generalInfo = document.getElementById("headerHistory");
    generalInfo.innerHTML = `
        <h4 id="namee">${rocket.title}</h4>
    `;

    let infoDetails = document.getElementById("infoD");
    infoDetails.innerHTML = `
        <div class="deta">
            <h5>Details</h5>
        </div>
        <div>
            <p>${rocket.details}</p>
        </div>
    `;

    let url = rocket.links.article;
    const link = url;
    
    const vistaPreviaHTML = `
        <iframe id="vista-previa" src="${link}" frameborder="0"></iframe>
    `;

    document.getElementById("vista-previa-enlace").innerHTML = vistaPreviaHTML;
    
    let infoDate = document.getElementById("eventDate")
    infoDate.innerHTML = `
        <div class="date">
            <h5>Event date (utc): </h5>
            <p>${fechaFinal}</p>
        </div>
        <div class="date">
            <h5>Event date (unix): </h5>
            <p>${rocket.event_date_unix}</p>
        </div>
        <div class="date">
            <h5>Id: </h5>
            <p>${rocket.id}</p>
        </div>
    `;
    
}
