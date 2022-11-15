const profile = document.querySelector(".profile_image");
const name = document.querySelector(".nameandlast");
const parseuserinfo = JSON.parse(localStorage.passemail);
let useride;
parseuserinfo.map((e) => {
  useride = e.id;
  //find user id to use
});
function setprofiladnname() {
  //set profile 🙂
  const userinfo = JSON.parse(localStorage.info);
  userinfo.map((data) => {
    profile.setAttribute("src", data.profile);
    name.innerText = data.name + " " + data.lastname;
  });
}
setprofiladnname();
const cardcontainer = document.querySelector(".products");

async function setsome(pro) {
  //this function called when we click on the most populars
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
  //worked when click on more btn and shows two another company
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
  //go to products page and set company name in localsrtorage
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
    localStorage.setItem("productchoose", event.target.id);
    window.location.pathname = "/html/Products.html";
  }
});
function productinfo_shower(id) {
  //this onclick is on the every product and help us when we want came back
  localStorage.sendpage = "/html/home.html";
  localStorage.setItem("procuctidtoshow", id);
  window.location.pathname = "/html/product.html";
}

function change_page_tosearch() {
  location.href = "/html/search.html";
}

function showordersuccessful() {
  //when the pay is successful this will show a toast
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
  // if we click around of successful toast the toast will gone by this function
  deletelastcart();
  document.querySelector(".succsessghost").classList.add("hidden");
  document.querySelector(".order-successful").classList.add("hidden");
}
function deletelastcart() {
  //it will fix json-server bug that when more request we sand the json-server crash and I fix that by this function
  //this functyion delete all in cart but when we are in the app not when we are in the payment
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
  //Set the user's search history in this function when the user returns to the home page from the search page
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
