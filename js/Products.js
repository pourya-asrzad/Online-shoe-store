function backtohome() {
  window.location.pathname = "/html/home.html";
}
const productchoosen = localStorage.getItem("productchoose");
document.getElementById("prudname").innerText = productchoosen;
const cardcontainer = document.querySelector(".products");
function setsome(product) {
  //the company name is come from localstorage and whe set that company product in the page by this function
  fetch(`http://localhost:3000/${product}`)
    .then((res) => res.json())
    .then((data) => {
      cardcontainer.textContent = " ";
      data.map((element) => {
        const card = document.createElement("div");
        card.innerHTML = ` <div onclick="productinfo_shower(${element.id})" class="prodoct_image_shown">
               <img width="150" class="productimg_popular1 productimg_popular" src="${element.image}" alt="K-Swiss ista ">
           </div>
           <h4 style="
           max-width: 12rem;">${element.name}</h4>
           <h5>${element.Price}</h5>`;
        cardcontainer.appendChild(card);
      });
    });
}
setsome(productchoosen);

function productinfo_shower(id) {
  //read this function work in the home.js
  localStorage.setItem("procuctidtoshow", id);
  localStorage.sendpage = "/html/Products.html";
  window.location.pathname = "/html/product.html";
}
