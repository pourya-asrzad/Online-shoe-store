const searchinput = document.getElementById("searchinput");
const cardcontainer = document.querySelector(".products");
const resfor = document.querySelector(".res");
const resulttxt = document.querySelector(".resulttxt");
const numberfound = document.querySelector(".Number-found");
const notfound = document.querySelector(".saynotfound");
const parseuserinfo = JSON.parse(localStorage.passemail);
let useride;
parseuserinfo.map((e) => {
  useride = e.id;
});
let searchhistory = JSON.parse(localStorage.getItem("searchhistory")) || [];
function search(e) {
  e.preventDefault();
  document.querySelector(".hr").classList.add("hidden");
  document.querySelector(".allrecent").classList.add("hidden");
  document.querySelector(".result").classList.add("hidden");

  if (searchinput.value.length !== 0) {
    cardcontainer.innerHTML = " ";
    resulttxt.classList.remove("hidden");
    resfor.innerHTML = ` "${searchinput.value}" `;

    searchhistory.push({ historyword: searchinput.value });
    localStorage.searchhistory = JSON.stringify(searchhistory);
    fetch(`http://localhost:3000/products?q=${searchinput.value}`)
      .then((res) => res.json())
      .then((data) => {
        numberfound.innerHTML = `${data.length} founds`;
        if (data.length == 0) {
          notfound.classList.remove("hidden");
        } else {
          notfound.classList.add("hidden");
        }
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
}
function productinfo_shower(id) {
  localStorage.setItem("procuctidtoshow", id);
  localStorage.sendpage = "/html/home.html";
  window.location.pathname = "/html/product.html";
}
async function gethistory() {
  try {
    const res = await fetch(
      `http://localhost:3000/userssearch?userid=${useride}`
    );
    const data = await res.json();
    console.log(data.length);
    if (data.length == 0) {
      document.querySelector(".allrecent").classList.add("hidden");
    }
    data.map((ele) => {
      const historyword = `<div  class="resin">
   <span onclick="usehistory('${ele.historyword}')" class="restext"> ${ele.historyword}</span>
   <img onclick="deleteonehistory(${ele.id})" src="/imges/deletebtn.png" alt="delete">
</div>`;
      document.querySelector(".result").innerHTML += historyword;
    });
  } catch {
    window.location.href = "/html/error.html";
  }
}
gethistory();

function usehistory(word) {
  searchinput.value = word;
  document.querySelector(".result").classList.add("hidden");
  document.querySelector(".hr").classList.add("hidden");
  document.querySelector(".allrecent").classList.add("hidden");

  search(event);
}

function deleteonehistory(id) {
  fetch(`http://localhost:3000/userssearch/${id}`, {
    method: "DELETE",
  });
}
function cleareallhistory() {
  document.querySelector(".hr").classList.add("hidden");
  document.querySelector(".allrecent").classList.add("hidden");
  document.querySelector(".result").classList.add("hidden");
  fetch(`http://localhost:3000/userssearch?userid=${useride}`)
    .then((res) => res.json())
    .then((data) => {
      data.map((ele) => {
        fetch(`http://localhost:3000/userssearch/${ele.id}`, {
          method: "DELETE",
        });
      });
    });
}
