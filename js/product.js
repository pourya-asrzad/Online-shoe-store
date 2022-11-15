const checkedicon = document.querySelector(".checkedicon");
const productchoosen_id = JSON.parse(localStorage.getItem("procuctidtoshow"));
const shoeimg2 = document.querySelector(".shoeimg2");
const shoeimg3 = document.querySelector(".shoeimg3");
const shoeimg1 = document.querySelector(".shoeimg1");
const shoeprice = document.querySelector(".shoeprice");
const shoename = document.querySelector(".shoename");
const adddollar = document.getElementById("ad_d");
const counternumber = document.querySelector(".counternumber");
let cartarr = [{ productid: "n", color: "n", size: 41 }];
let indexpricevar;
function viemore() {
  //view more abo
  document.getElementById("para").classList.remove("description");
  document.querySelector(".vewmore").remove();
  document.querySelector(".Quantity").style.top = "46.2rem";
}
document.querySelector(".colors").addEventListener("click", (event) => {
  //checked the color
  const deletelastclass = event.target.className;
  document
    .querySelector(`.${deletelastclass.split(" ")[0]}`)
    .appendChild(checkedicon);
  cartarr.map((e) => {
    e.color = deletelastclass.split(" ")[0];
  });
});
function showing_shoe_detail(id) {
  //get product detail
  cartarr.map((e) => {
    e.productid = id;
  });
  fetch(`http://localhost:3000/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      shoeimg1.setAttribute("src", `${data.image}`);
      shoeimg2.setAttribute("src", `${data.otherimg1}`);
      shoeimg3.setAttribute("src", `${data.otherimg2}`);
      shoename.innerText = data.name;
      shoeprice.innerText = data.Price;
      const colors = data.color;
      document.querySelector(".buttoncomehere").innerHTML = `
      <button id="addtocart${id}"  onclick=" addtocart(useride,${id});" class="btn btn-dark bg-black cartbtn"><img src="/imges/carticon.png" alt="">
                              <h4> Add to
                                  Cart</h4>
                          </button>`;
      const removdollor = data.Price.split(" ");
      fetch(`http://localhost:3000/cart?userid=${useride}`)
        .then((res) => res.json())
        .then((data) => {
          data.map((ele) => {
            for (const iterator of ele.cartarr) {
              if (iterator.productid == id) {
                document.querySelector(".buttoncomehere").innerHTML = `
                <button id="addedtocart" onclick="shoeincart()"    class="btn btn-dark bg-black cartbtn cartbtnadded">
                <h4 id="addtocarttxt"> Added to cart</h4>
            </button>`;
              } else if (iterator.productid == !id) {
                document.querySelector(".buttoncomehere").innerHTML = `
                <button id="addtocart${id}"  onclick=" addtocart(useride,${id});" class="btn btn-dark bg-black cartbtn"><img src="/imges/carticon.png" alt="">
                                        <h4> Add to
                                            Cart</h4>
                                    </button>`;
              }
            }
          });
        });
      localStorage.setItem("pruductprice", removdollor[1]);
      for (const iterator of colors) {
        const colordiv = document.createElement("div");
        colordiv.classList.add(`${iterator}`);
        colordiv.classList.add(`c`);
        document.querySelector(".colors").appendChild(colordiv);
      }
      checkedicon.classList.remove("hidden");
      const choosedefault = document.querySelectorAll(".c")[0];
      choosedefault.appendChild(checkedicon);
      cartarr.map((e) => {
        e.color = choosedefault.className.split(" ")[0];
      });
    });
}
showing_shoe_detail(productchoosen_id);

function whereback() {
  //back to page where that came from
  window.location.href = localStorage.getItem("sendpage");
}
let tofix_increas = 0;
function price_increase() {
  //plus btn
  tofix_increas++;
  adddollar.classList.remove("hidden");
  if (tofix_increas == 1) {
    counternumber.textContent++;
    let increas = localStorage.pruductprice * counternumber.textContent;
    shoeprice.textContent = increas + ".00";
  } else {
    counternumber.textContent++;
    let increas = localStorage.pruductprice * counternumber.textContent;
    shoeprice.textContent = increas + ".00";
  }

  indexpricevar = +counternumber.textContent;
}
indexpricevar = +counternumber.textContent;

function price_reduction() {
  //oposite plus btn 😃
  if (counternumber.textContent !== "1") {
    counternumber.textContent--;
    let reduction = counternumber.textContent * localStorage.pruductprice;
    shoeprice.textContent = reduction + ".00";
  }

  indexpricevar = +counternumber.textContent;
}

function choosesize(size) {
  //if else in this function it just fix bootstrap btn
  if (size !== 41) {
    document.getElementById("size-41").classList.remove("btn-dark");
    document.getElementById("size-41").classList.add("btn-outline-dark");
  } else if (size !== 42) {
    document.getElementById("size-42").classList.remove("btn-dark");
    document.getElementById("size-42").classList.add("btn-outline-dark");
  }
  if (size !== 40) {
    document.getElementById("size-42").classList.remove("btn-dark");
    document.getElementById("size-42").classList.add("btn-outline-dark");
    document.getElementById("size-40").classList.remove("btn-dark");
    document.getElementById("size-40").classList.add("btn-outline-dark");
  } else if (size == 40) {
    document.getElementById("size-42").classList.remove("btn-dark");
    document.getElementById("size-42").classList.add("btn-outline-dark");
  }
  document.getElementById(`size-${size}`).classList.add("btn-dark");
  document.getElementById(`size-${size}`).classList.remove("btn-outline-dark");
  console.log(size);

  cartarr.map((e) => {
    e.size = size;
  });
}

const parseuserinfo = JSON.parse(localStorage.passemail);
let useride;
parseuserinfo.map((e) => {
  useride = e.id;
});

function addtocart(id, pid) {
  fetch(`http://localhost:3000/cart`, {
    method: "Post",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      cartarr,
      indexprice: indexpricevar,
      userid: id,
    }),
  });
}

function shoeincart() {
  location.href = "/html/cart.html";
}
