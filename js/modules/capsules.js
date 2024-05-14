let currentCapsuleIndex = 0;

function mostrarInformacionCapsula() {
    const capsule = capsulesData[currentCapsuleIndex];
    const headerCapsules = document.getElementById('headerCapsules');
    headerCapsules.innerText = `${capsule.serial}`;

    switch (capsule.status) {
        case 'active':
          statusCircle.style.backgroundColor = 'green';
          break;
        case 'destroyed':
          statusCircle.style.backgroundColor = 'red';
          break;
        case 'unknown':
        case 'retired':
          statusCircle.style.backgroundColor = 'orange';
          break;
        default:
          statusCircle.style.backgroundColor = 'transparent'; 
      }
  
    const caja1 = document.querySelector('.caja');
    caja1.innerText = `Reuses: ${capsule.reuse_count}
    Water Landings: ${capsule.water_landings}
    Land Landings: ${capsule.land_landings}
    `;

    const caja3 = document.querySelector('.OTR');
    caja3.innerText = `${capsule.last_update}`;

    const launchId = capsule.launches[0];
  const launchUrl = `https://api.spacexdata.com/v4/launches/${launchId}`;
  fetch(launchUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Hubo un problema al obtener los datos del lanzamiento.');
      }
      return response.json();
    })
    .then(launchData => {
      const patchImage = launchData.links.patch.small;
      const caja2 = document.querySelector('.caja2');
      caja2.innerHTML = `${capsule.type}
      <img src="${patchImage}" alt="Parche del Lanzamiento" id="lato">`;
    })
    .catch(error => {
      console.error('Se produjo un error al obtener los datos del lanzamiento:', error);
    });
  
    console.log(capsule);
  }


function cambiarCapsula(delta) {
  const newIndex = currentCapsuleIndex + delta;
  if (newIndex >= 0 && newIndex < capsulesData.length) {
    currentCapsuleIndex = newIndex;
    mostrarInformacionCapsula();
  }
}


const apiUrl = 'https://api.spacexdata.com/v4/capsules';
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Hubo un problema al obtener los datos.');
    }
    return response.json();
  })
  .then(data => {
    
    capsulesData = data;
    
    mostrarInformacionCapsula();
  })
  .catch(error => {
    console.error('Se produjo un error:', error);
  });
