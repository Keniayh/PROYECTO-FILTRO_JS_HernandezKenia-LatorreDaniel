function fetchCompany() {
    let url = 'https://api.spacexdata.com/v4/company/';
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayInfoCompany(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function displayInfoCompany(company) {
    let infoCompany = document.getElementById("titulo");
    infoCompany.innerHTML = `
    ${company.name}
    `
    let info = document.getElementById("general");
    info.innerHTML = `
    <ul>Founder, Ceo and Cto: ${company.founder}</ul>
    <ul>Founded: ${company.founded}</ul>
    <ul>Employees: ${company.employees}</ul>
    <ul>Vehicles: ${company.vehicles}</ul>
    <ul>Launch sites: ${company.launch_sites}</ul>
    <ul>Test sites: ${company.test_sites}</ul>
    <ul>Coo: ${company.coo}</ul>
    <ul>Cto: ${company.cto_propulsion}</ul>
    <ul>Valuation: ${company.valuation}</ul>
    `
    let location = document.getElementById("location");
    location.innerHTML = `
    ${company.headquarters.state}, ${company.headquarters.city} ${company.headquarters.address}
    `

    let link = document.getElementById("links");
    link.innerHTML = `
      <a href="${company.links.website}"><img src="/Storage/img/spacex_logo_icon_144865.png"></a></ul>
      <a href="${company.links.flickr}"><img src="/Storage/img/49285.png"></a></ul>
      <a href="${company.links.twitter}"><img src="/Storage/img/twitter-brand-new-logo-3-d-with-new-x-shaped-graphic-of-the-world-s-most-popular-social-media-free-png.webp"></a></ul>
      <a href="${company.links.elon_twitter}"><img src="/Storage/img/44948.png"></a></ul>
    `
    let summary = document.getElementById("summary");
    summary.innerHTML = `
    ${company.summary}
    `
}
    

fetchCompany();




