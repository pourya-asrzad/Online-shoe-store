const parseuserinfo = JSON.parse(localStorage.passemail);
let useride;
parseuserinfo.map((e) => {
  useride = e.id;
});
let amount = 0;
let totalprice = 0;
let shippigchoosed = 0;

getshippingmode();
function showincheckout() {
  fetch(`http://localhost:3000/cart?userid=${useride}`)
    .then((res) => res.json())
    .then((data) => {
      data.map((element) => {
        for (const iterator of element.cartarr) {
          fetch(`http://localhost:3000/products/${iterator.productid}`)
            .then((res) => res.json())
            .then((prodata) => {
              const deletedollar = prodata.Price.split(" ");
              amount += element.indexprice * deletedollar[1];
              totalprice += element.indexprice * deletedollar[1];
              const checkoutcart = `<div class="card-checkout">
                <div class="img-container-checkout">
                    <img width="110" src="${prodata.image}" alt="">
                </div>
                <div class="details-card-checkout">
                    <div class="header-card-checkout">
                        <h1>${prodata.name}</h1>
                    </div>
                
                    <div class="info-shoe-checckout">
                        <div class="color-shoe-checkout ${
                          iterator.color
                        }"></div>
                        <p>${iterator.color}</p>
                        <div class="hei-hr"></div>
                        <p> Size =${iterator.size}</p>
                    </div>
                    <div class="price-index-cart">
                        <h3 class="price-checkout">
                            $${element.indexprice * +deletedollar[1]}.00
                        </h3>
                        <div class="conuter-checkout">
                            <div>
                                <h3 class="index-shoe">${
                                  element.indexprice
                                }</h3>
                            </div>
                        </div>
                    </div>
                </div>
                </div>`;

              document.querySelector(
                ".checkout-list-will-come-here"
              ).innerHTML += checkoutcart;
              document.querySelector(".amount").innerHTML = `$${amount}.00`;
              document.querySelector(
                ".totalprice"
              ).innerHTML = `$${totalprice}.00`;
            });
        }
      });
    });
}
showincheckout();

function addresschoosen() {
  if (localStorage.address) {
    const address = JSON.parse(localStorage.address);

    if (address.userid == useride) {
      document.querySelector(".addresstitle").innerHTML = address.title;
      document.querySelector(".addessdetail").innerHTML = address.description;
    }
  }
}
addresschoosen();
function getshippingmode() {
  if (localStorage.shipping) {
    const shipping = JSON.parse(localStorage.shipping);
    if (shipping.userid == useride) {
      shippigchoosed = 1;
      totalprice += +shipping.Price.split("$")[1];
      document.querySelector(".shippingprice").innerHTML = shipping.Price;
      document
        .querySelector(".choose-shipping-checkout")
        .classList.add("hidden");
      document.querySelector(
        ".shippingmodecomehere"
      ).innerHTML = `        <div class="shippig-mode">
      <img width="70" src="${shipping.pic}" alt="">
      <div>
          <h2 class="shippingmode">${shipping.mode}</h2>
          <p class="shippingdes">${shipping.description}</p>
      </div>
       <div class="fixtomoney">
          <h2>${shipping.Price}</h2>
          <a href="/html/chooseshipping.html">
          <img width="30" src="/imges/edit.png" alt="">
          </a>
      </div>
  </div>`;
    }
  }
}

function gotochoosepayment() {
  if (shippigchoosed == 1) {
    window.location.href = "/html/choosepayment.html";
  } else {
    document.querySelector(".validationshipping").classList.remove("hidden");
  }
}
