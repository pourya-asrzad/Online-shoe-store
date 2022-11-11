const parseuserinfo = JSON.parse(localStorage.passemail);
let useride;
parseuserinfo.map((e) => {
  useride = e.id;
});
let saveshipping = [];
function chooseshipping(id) {
  saveshipping.push({
    mode: document.querySelector(`.mode${id}`).textContent,
    description: document.querySelector(`.shippingdescription${id}`)
      .textContent,
    pic: document.getElementById(`shipimage${id}`).getAttribute("src"),
    Price: document.querySelector(`.shippingprice${id}`).textContent,
    userid: useride,
  });
}

function applyshipping() {
  localStorage.shipping = JSON.stringify(saveshipping[saveshipping.length - 1]);
  window.location.href = "/html/checkout.html";
}
