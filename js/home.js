const profile = document.querySelector(".profile_image");
const name = document.querySelector(".nameandlast");
const parseuserinfo = JSON.parse(localStorage.passemail);
let useride;
parseuserinfo.map((e) => {
  useride = e.id;
});
function setprofiladnname() {
  const userinfo = JSON.parse(localStorage.info);
  userinfo.map((data) => {
    profile.setAttribute("src", data.profile);
    name.innerText = data.name + " " + data.lastname;
  });
}
setprofiladnname();
const cardcontainer = document.querySelector(".products");
function setsome1(product) {
  fetch(`http://localhost:3000/${product}`)
    .then((res) => res.json())
    .then((data) => {
      if (product !== "mostpopular") {
        document.getElementById("allbtn").classList.add("btn-outline-dark");
        document.getElementById("allbtn").classList.remove("btn-dark");
      }
      cardcontainer.textContent = " ";
      data.map((element) => {
        const card = document.createElement("div");
        card.innerHTML = ` <div onclick="productinfo_shower(${element.id})" class="prodoct_image_shown">
            <img width="150" class="productimg_popular1 productimg_popular" src="${element.image}" alt="K-Swiss ista ">
        </div>
        <h4 style="max-width: 12rem;
        max-height: 1.5rem;
        overflow: hidden;">${element.name}</h4>
        <h5>${element.Price}</h5>`;

        cardcontainer.appendChild(card);
      });
    });
}

async function setsome(pro) {
  const res = await fetch(`http://localhost:3000/${pro}`);
  const data = await res.json();
  if (pro !== "mostpopular") {
    document.getElementById("allbtn").classList.add("btn-outline-dark");
    document.getElementById("allbtn").classList.remove("btn-dark");
  }
  cardcontainer.textContent = " ";
  data.map((element) => {
    const card = document.createElement("div");
    card.innerHTML = ` <div onclick="productinfo_shower(${element.id})" class="prodoct_image_shown">
      <img width="150" class="productimg_popular1 productimg_popular" src="${element.image}" alt="K-Swiss ista ">
  </div>
  <h4 style="max-width: 12rem;
  max-height: 1.5rem;
  overflow: hidden;">${element.name}</h4>
  <h5>${element.Price}</h5>`;

    cardcontainer.appendChild(card);
  });
}

function saygood() {
  const today = new Date();
  const curHr = today.getHours();
  const saygood = document.querySelector(".saygood");
  if (curHr < 12) {
    saygood.innerHTML = "good morning🌅 👋";
  } else if (curHr < 18) {
    saygood.innerHTML = "good afternoon 👋";
  } else {
    saygood.innerHTML = "good evening🌆 👋";
  }
}
saygood();
function showmore() {
  document.querySelector(".morebtn").remove();
  const anothercompny = `<div class="arm-box">
<div class="arms" id="kafshmeli">
    <img id="kafshmeli" width="50"  class="ar9" src="/imges/download.jpg" alt="">
</div>
<p>kafshmeli</p>
</div>
<div class="arm-box">
<div class="arms" id="irankafsh">
    <img width="50" id="irankafsh" class="ar10" src="/imges//logo-2-1.png" alt="">
</div>
<p>irankafsh</p>
</div>`;
  document.querySelector(".categories").innerHTML += anothercompny;
}

document.querySelector(".categories").addEventListener("click", (event) => {
  if (
    event.target.id == "Nike" ||
    event.target.id == "adidas" ||
    event.target.id == "puma" ||
    event.target.id == "asics" ||
    event.target.id == "reebok" ||
    event.target.id == "newbalance" ||
    event.target.id == "converse" ||
    event.target.id == "irankafsh" ||
    event.target.id == "kafshmeli"
  ) {
    //sorry for this Ugly code first time I write a include but it doesn't work so I have little time and I can't so think on one thing and I should end this project then I think abou fix this
    localStorage.setItem("productchoose", event.target.id);
    window.location.pathname = "/html/Products.html";
  }
});
function productinfo_shower(id) {
  localStorage.sendpage = "/html/home.html";
  localStorage.setItem("procuctidtoshow", id);
  window.location.pathname = "/html/product.html";
}

function change_page_tosearch() {
  location.href = "/html/search.html";
}

function showordersuccessful() {
  if (localStorage.orderstatus) {
    const statusorder = JSON.parse(localStorage.orderstatus);
    statusorder.map((ele) => {
      if (useride == ele.userid) {
        document.querySelector(".succsessghost").classList.remove("hidden");
        document.querySelector(".order-successful").classList.remove("hidden");
        document.querySelector("body").classList.add("noscrool");
        localStorage.removeItem("orderstatus");
      }
    });
  }
}
showordersuccessful();
setsome("mostpopular");

function hidesuccessful() {
  deletelastcart();
  document.querySelector(".succsessghost").classList.add("hidden");
  document.querySelector(".order-successful").classList.add("hidden");
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
function setsearchhistory() {
  if (localStorage.searchhistory) {
    const searchdata = JSON.parse(localStorage.searchhistory);
    searchdata.map((element) => {
      fetch(`http://localhost:3000/userssearch`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          historyword: element.historyword,
          userid: useride,
        }),
      });
    });
    localStorage.removeItem("searchhistory");
  }
}
setsearchhistory();
