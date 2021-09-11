const storeForm = document.getElementById("store-form");
const storeAdd = document.getElementById("store-add");
const storeName = document.getElementById("store-name");

let sendBody = {
  _id_: null,
  name: null,
  orgnr: null,
  adresse: null

};

let testArray = [];

// Send POST to API to add store
async function searchClient(e) {
  e.preventDefault();

  if(storeName.value===""){
    alert("Please fill in name");
  }

  try {

    const res = await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/?navn=${storeName.value}`)
      const kunde = await res.json();
      const html = kunde._embedded.enheter.map((navn, index) => {
        if (navn.forretningsadresse != null) {
          const test = {
            _id_: index,
            name: navn.navn,
            orgnr: navn.organisasjonsnummer,
            adr: navn.forretningsadresse.adresse + ", " + navn.forretningsadresse.poststed + ", " + navn.forretningsadresse.land

          };
          testArray.push(test);

          return `
          <div style="margin-top:20px" id="${index}" onclick="reply_click(this.id)">
          <div class="demo">
          <h5 class="display-4 text-center">
          <p class="h5">${navn.navn}</p>
          <p class="h5">${navn.organisasjonsnummer}</p>
          <p class="h5">${navn.forretningsadresse.adresse}, ${navn.forretningsadresse.poststed}</p>
          </h5>
          </div>
          </div>
          `;
        }
      }).join(" ");

      document.getElementById("demo").innerHTML = html;

    } catch (err) {
      alert(err);
      return;
    }
  }

async function myFunction2(clicked_id) {
    try {
      console.log(testArray[clicked_id]);
      const res2 = await fetch("/api/v1/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sendBody = {
          _id_: JSON.stringify(testArray[clicked_id].orgnr),
          name: JSON.stringify(testArray[clicked_id].name),
          orgnr: JSON.stringify(testArray[clicked_id].orgnr),
          adresse: JSON.stringify(testArray[clicked_id].adr)
        })

      });
      console.log(sendBody);
      if(res2.status === 400) {
        throw Error("Client already exists!")
      }
      document.getElementById("demo").innerHTML = "Client added!";
    } catch (e) {
      alert(e);
      return;
    }
  }

function reply_click(clicked_id) {
    myFunction2(clicked_id);
  }

storeForm.addEventListener("submit", searchClient);
