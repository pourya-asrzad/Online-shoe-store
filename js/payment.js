const parseuserinfo = JSON.parse(localStorage.passemail);
let useride;
parseuserinfo.map((e) => {
  useride = e.id;
});
const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
const cardnumberpatern = /^4[0-9]{12}(?:[0-9]{3})?$/;
const cvvpatern = /^[0-9]{4}$/;
const expyearpatern = /^[12][0-9]{3}$/;

const cname = document.getElementById("cname");
const cardnumber = document.getElementById("ccnum");
const Month = document.getElementById("monthes");
const year = document.getElementById("expyear");
const cvv = document.getElementById("cvv");
const validationtext = document.querySelector(".validation");
function checkinputgotohomepage(e) {
  let fix = 0;
  const nameval = cname.value.trim();
  const numberval = cardnumber.value.trim();
  const monthval = Month.value.trim();
  const cvvval = cvv.value.trim();
  const yearval = year.value.trim();
  e.preventDefault();
  if (nameval === "") {
    validationtext.innerHTML = "Enter your name";
  } else if (!nameval.match(regName)) {
    validationtext.innerHTML = "Enter valid name";
  } else {
    fix++;
  }

  if (numberval === "") {
    validationtext.innerHTML = "Enter your credit card number";
  } else if (!numberval.match(cardnumberpatern)) {
    validationtext.innerHTML = "Enter valid credit card number";
  } else {
    fix++;
  }

  if (cvvval === "") {
    validationtext.innerHTML = "Enter cvv";
  } else if (!cvvval.match(cvvpatern)) {
    validationtext.innerHTML = "Enter valid cvv";
  } else {
    fix++;
  }

  if (yearval === "") {
    validationtext.innerHTML = "Enter year";
  } else if (!yearval.match(expyearpatern)) {
    validationtext.innerHTML = "Enter valid exp year";
  } else {
    fix++;
  }

  /*4111111111111111 visa card*/
  if (fix == 4) {
    let arr = [];
    let dataid = [];
    arr.push({ userid: useride, order: 1 });
    localStorage.orderstatus = JSON.stringify(arr);
    async function aysnclike() {
      try {
        const res = await fetch(`http://localhost:3000/cart?userid=${useride}`);
        const data = await res.json();
        await data.map((ele) => {
          dataid.push({ productids: ele.id });
          fetch("http://localhost:3000/order", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              cartarr: ele.cartarr,
              indexprice: ele.indexprice,
              userid: ele.userid,
            }),
          });
        });

        localStorage.deletedataascart = JSON.stringify(dataid);
        localStorage.gohome = "true";
      } catch {
        window.location.pathname = "/html/error.html";
      }
    }
    aysnclike();
  }
}

function gohome() {
  if (localStorage.gohome) {
    window.location.href = "/html/home.html";
    localStorage.removeItem("gohome");
  }
}
gohome();
