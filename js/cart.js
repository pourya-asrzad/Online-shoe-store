const parseuserinfo = JSON.parse(localStorage.passemail);
const selecttotalelem = document.querySelector(".totalprice");
let useride;
parseuserinfo.map((e) => {
  useride = e.id;
});
let total = 0;
deletelastcart();
get_card_data();
function get_card_data() {
  fetch(`http://localhost:3000/cart?userid=${useride}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length == 0) {
        document.querySelector(".saynotfound").classList.remove("hidden");
        document.querySelector("body").style.cssText =
          " background-color:white !important;";
      } else {
        document.querySelector(".checkout-cart").classList.remove("hidden");
      }

      data.map((element) => {
        for (const iterator of element.cartarr) {
          fetch(`http://localhost:3000/products/${iterator.productid}`)
            .then((res) => res.json())
            .then((data) => {
              const price = data.Price.split(" ");
              total += element.indexprice * price[1];
              selecttotalelem.innerHTML = "$ " + total + ".00";
              const cardcart = `   <div class="card-cart" id="${element.id}">
                    <div class="img-container-cart">
                        <img width="110" src="${data.image}" alt="">
                    </div>
                    <div class="details-card-cart">
                        <div class="header-card-cart">
                            <h1>${data.name}</h1>
                            <img onclick="deleteatcartmodal(${
                              element.id
                            })" src="/imges/bin.png" alt="bin">
                        </div>
    
                        <div class="info-shoe-cart">
                            <div class="color-shoe-cart ${
                              iterator.color
                            }"></div>
                            <p>${iterator.color}</p>
                            <div class="hei-hr"></div>
                            <p> Size =${iterator.size}</p>
                        </div>
                        <div class="price-index-cart">
                            <h3 class="lastprice price-cart${element.id}">
                          $${element.indexprice * price[1]}.00
                            </h3>
                            <div class="conuter-cart">
                                <img onclick="price_reduction(${element.id},${
                price[1]
              })" width="18" src="/imges/minez.png" alt="">
                                <div class="index-price-number-in-cart${
                                  element.id
                                }">${element.indexprice}</div>
                                <img onclick="price_increase(${element.id},${
                price[1]
              })" height="25" src="/imges/plus.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>`;
              document.querySelector(".all-card-cart").innerHTML += cardcart;
            });
        }
      });
    });
}

function price_increase(id, price) {
  const selectindexprice = document.querySelector(
    `.index-price-number-in-cart${id}`
  );
  selectindexprice.innerHTML = +selectindexprice.textContent + 1;
  document.querySelector(`.price-cart${id}`).innerHTML =
    "$" + selectindexprice.textContent * price + ".00";
  let tnum = selecttotalelem.textContent.split(" ");
  selecttotalelem.innerHTML = "$ " + (+tnum[1] + price) + ".00";

  fetch(`http://localhost:3000/cart/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      indexprice: +selectindexprice.textContent,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
function price_reduction(id, price) {
  const selectindexprice = document.querySelector(
    `.index-price-number-in-cart${id}`
  );
  selectindexprice.textContent--;
  document.querySelector(`.price-cart${id}`).innerHTML =
    "$" + selectindexprice.textContent * price + ".00";
  let tnum = selecttotalelem.textContent.split(" ");
  selecttotalelem.innerHTML = "$ " + (+tnum[1] - price) + ".00";
  if (selectindexprice.textContent == "0") {
    deleteatcartmodal(id);
    selectindexprice.textContent++;
    document.querySelector(`.price-cart${id}`).innerHTML =
      "$" + selectindexprice.textContent * price + ".00";
    let tnum = selecttotalelem.textContent.split(" ");
    selecttotalelem.innerHTML = "$ " + (+tnum[1] + price) + ".00";
  } else if (
    selectindexprice.textContent != "0" ||
    selectindexprice.textContent != "1"
  ) {
    fetch(`http://localhost:3000/cart/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        indexprice: +selectindexprice.textContent,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }
}

function deleteatcartmodal(id) {
  fetch(`http://localhost:3000/cart/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".modalbtns").innerHTML = `
        <button class="cancelbtn">Cancel</button>
      <button onclick="removefromcart(${data.id})"  class="removebtn">Yes,Remove</button>`;
      data.cartarr.map((element) => {
        fetch(`http://localhost:3000/products/${element.productid}`)
          .then((res) => res.json())
          .then((productdata) => {
            const getlast = productdata.Price.split(" ");

            const removemodal = `          <div class="card-cart">
         <div class="img-container-cart">
             <img width="110" src="${productdata.image}" alt="">
         </div>
         <div class="details-card-cart">
             <div class="header-card-cart">
                 <h1>${productdata.name}</h1>
             </div>
 
             <div class="info-shoe-cart">
                 <div class="modalpcolor ${element.color}"></div>
                 <p>${element.color}</p>
                 <div class="hei-hr"></div>
                 <p> Size =${element.size}</p>
             </div>
             <div class="price-index-cart">
                 <h3 class="price-cart">
                     $${getlast[1] * data.indexprice}.00
                 </h3>
                 <div class="madalpindex">
                  ${data.indexprice}
                 </div>
             </div>
         </div>
     </div>`;
            document.querySelector(".cartremove-comehere").innerHTML =
              removemodal;
            document.querySelector(".ghost-modal").classList.remove("hidden");
            document.querySelector(".deletemodal").classList.remove("hidden");
          });

        document.querySelector(".cancelbtn").addEventListener("click", () => {
          document.querySelector(".ghost-modal").classList.add("hidden");
          document.querySelector(".deletemodal").classList.add("hidden");
        });
      });
    });
}

function removefromcart(id) {
  fetch(`http://localhost:3000/cart/${id}`, {
    method: "DELETE",
  });
  document.querySelector(".ghost-modal").classList.remove("hidden");
  document.querySelector(".deletemodal").classList.remove("hidden");
}

function hidemodal() {
  document.querySelector(".ghost-modal").classList.add("hidden");
  document.querySelector(".deletemodal").classList.add("hidden");
}

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
