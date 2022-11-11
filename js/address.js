const parseuserinfo = JSON.parse(localStorage.passemail);
let useride;
parseuserinfo.map((e) => {
  useride = e.id;
});
function getaddress(id) {
  fetch(`http://localhost:3000/user/${id}`)
    .then((res) => res.json())
    .then((data) => {
      for (const [key, value] of Object.entries(data.addresses[0])) {
        const addresdafault = `<div class="address-checkout">
        <img width="70" src="/imges/location.png" alt="">
        <div>
           <div class="defaulttofix">
            <h2 id="adtitle${value.id}">${value.title}</h2> <div class="default">Default</div>
           </div>
            <p id="addes${value.id}">${value.description}</p>
        </div>
          <input checked onclick="chooseaddress(${value.id})" type="radio" name="address" id="homeradiou${value.id}">
    </div>`;
        document.querySelector(".addresscomehere").innerHTML += addresdafault;
      }
      data.addresses.shift();
      data.addresses.map((element) => {
        const addresdafault = ` <div class="address-checkout">
        <img width="70" src="/imges/location.png" alt="">
        <div>
            <h2 id="adtitle${element.address.id}">${element.address.title}</h2>
            <p id="addes${element.address.id}">${element.address.description}</p>
        </div>
          <input onclick="chooseaddress(${element.address.id})" type="radio" name="address" id="homeradiou${element.address.id}">
    </div>`;
        document.querySelector(".addresscomehere").innerHTML += addresdafault;
      });
    });
}
getaddress(useride);
let saveaddresschoosen = [];
function chooseaddress(id) {
  saveaddresschoosen.push({
    title: document.getElementById(`adtitle${id}`).textContent,
    description: document.getElementById(`addes${id}`).textContent,
    userid: useride,
  });
}

function applyaddress() {
  localStorage.address = JSON.stringify(
    saveaddresschoosen[saveaddresschoosen.length - 1]
  );
  window.location.href = "/html/checkout.html";
}
