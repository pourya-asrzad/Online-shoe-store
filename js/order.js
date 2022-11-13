document.querySelector(".active").style.borderBottom = "4px solid";
document.querySelector(".complete").style.borderBottom = " 1px solid #0000004a";
const parseuserinfo = JSON.parse(localStorage.passemail);
let useride;
parseuserinfo.map((e) => {
  useride = e.id;
});

document.querySelector(".complete").addEventListener("click", function () {
  document.querySelector(".complete").style.borderBottom = "4px solid";
  document.querySelector(".active").style.borderBottom = " 1px solid #0000004a";
  document.querySelector(".orders").innerHTML = " ";
});
document.querySelector(".active").addEventListener("click", function () {
  document.querySelector(".active").style.borderBottom = "4px solid";
  document.querySelector(".complete").style.borderBottom =
    " 1px solid #0000004a ";
  document.querySelector(".orders").innerHTML = " ";
  get_order_data();
});

function get_order_data() {
  fetch(`http://localhost:3000/order?userid=${useride}`)
    .then((res) => res.json())
    .then((dataorder) => {
      if (dataorder.length == 0) {
        document.querySelector(".saynotfound").classList.remove("hidden");
        document.querySelector("body").style.cssText =
          " background-color:white !important;";
      }

      dataorder.map((element) => {
        for (const iterator of element.cartarr) {
          fetch(`http://localhost:3000/products/${iterator.productid}`)
            .then((res) => res.json())
            .then((data) => {
              const price = data.Price.split(" ");

              const ordercard = `  <div class="card-order">
              <div class="img-container-order">
                  <img width="110" src="${data.image}" alt="">
              </div>
              <div class="details-card-order">
                  <div class="header-card-order">
                      <h1>${data.name}</h1>
                  </div>
                  <div class="info-shoe-order">
                      <div class="modalpcolor ${iterator.color}"></div>
                      <p>${iterator.color}</p>
                      <div class="hei-hr"></div>
                      <p> Size =${iterator.size}</p>
                      <div class="hei-hr"></div>
                      <p>Qty=${element.indexprice}</p>
                  </div>
                  <div class="indelivery">
                      <span>in Delivery</span>
                  </div>
                  <div class="price-index-order">
                      <h3 class="price-order">
                      $${element.indexprice * price[1]}.00
                      </h3>
                     
                       <button class="order-trackbtn">
                          <span>Track Order</span>
                       </button>
                     
                  </div>
              </div>
          </div>`;
              document.querySelector(".orders").innerHTML += ordercard;
            });
        }
      });
    });
}
get_order_data();
function deletelastcart() {
  if (localStorage.deletedataascart) {
    const deldata = JSON.parse(localStorage.deletedataascart);
    deldata.map((ele) => {
      fetch(`http://localhost:3000/cart/${ele.productids}`, {
        method: "DELETE",
      });
    });
    localStorage.removeItem("deletedataascart");
  }
}
deletelastcart();
