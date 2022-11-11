function backtohome() {
  window.location.pathname = "/html/home.html";
}
const cardcontainer = document.querySelector(".products");

setsome("mostpopular");
function setsome(product) {
  if (product !== "mostpopular") {
    document.getElementById("allbtn").classList.remove("btn-dark");
    document.getElementById("allbtn").classList.add("btn-outline-dark");
  }

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
function productinfo_shower(id) {
  localStorage.sendpage = "/html/seeall.html";
  localStorage.setItem("procuctidtoshow", id);
  window.location.pathname = "/html/product.html";
}
