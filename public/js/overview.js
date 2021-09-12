const storeForm = document.getElementById("store-form");

let allClients = [];
// Fetch stores from API
async function getClients() {
  try {
  const res = await fetch("/api/v1/clients");
  const data = await res.json();

  const clients = data.data.map((client, index) => {

    const ffs = {
           name: data.data[index].name,
           orgnr: data.data[index].orgnr,



  };


  return `
  <div style="margin-top:20px" id="demo">
  <div class="demo">
  <h5 class="display-4 text-center">
  <p class="h5">${ffs.name}</p>
  <p class="h5">Orgnr: ${ffs.orgnr}</p>

  </h5>
  </div>
  </div>
  `;

}

).join(" ");

document.getElementById("demo").innerHTML = clients;
}
catch (err) {
alert(err);
return;
}
}

getClients();
