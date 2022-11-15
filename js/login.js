function toggleshowpsw() {
  //when we click on eye icon this function  will show password by changing input type to text
  const pass = document.getElementById("password_signin");
  document
    .querySelector(".togglepswvisibleeye")
    .setAttribute("src", "/imges/eye.png");
  if (pass.type === "password") {
    pass.type = "text";
  } else {
    document
      .querySelector(".togglepswvisibleeye")
      .setAttribute("src", "/imges/invisiblel.png");
    pass.type = "password";
  }
}
function changeeyeimoji() {
  //add border to external div to be showing great interface
  document.querySelector(".eyecontainer").style.border = " 1px solid black";
  document.querySelector(".eyecontainer").style.borderLeft = " none";
}
function hideborder() {
  //opposite 'changeemyoijo' function
  document.querySelector(".eyecontainer").style.border = " none";
}
function changeeyecolor() {
  //when we type in password input this function will change color of sign in button & eye icon
  document
    .querySelector(".togglepswvisibleeye")
    .setAttribute("src", "/imges/invisiblel.png");
  document.querySelector(".signinbtn").style.backgroundColor = "#212529";
}

function backtoslider() {
  //I think name was explain everything
  window.location.pathname = "/html/slider.html";
}

const emailelement = document.getElementById("email_signin");
const passwordelement = document.getElementById("password_signin");
document
  .getElementById("sign_in_button")
  .addEventListener("click", function login_access(event) {
    event.preventDefault();

    fetch("http://localhost:3000/user")
      .then((res) => {
        if (res.ok == !true) {
          window.location.href = "/html/error.html";
        }
        return res.json();
      })

      .then((d) => userlogin(d));
    function userlogin(data) {
      data.forEach((element) => {
        let userinfo = [];
        let userinfo2 = []; //this is for name and profile because i don`t want to push all thing in one key localStorage
        if (
          emailelement.value == element.Email &&
          passwordelement.value == element.password
        ) {
          //Save user information in localstorage if any
          userinfo.push({
            email: emailelement.value,
            pws: passwordelement.value,
            id: element.id,
          });
          userinfo2.push({
            name: element.firstname,
            lastname: element.Lastname,
            profile: element.profile,
          });
          localStorage.setItem("info", JSON.stringify(userinfo2));
          localStorage.setItem("passemail", JSON.stringify(userinfo));
          window.location.pathname = "/html/home.html";
          document.getElementById("cantlogmessageid").remove();
        } else {
          //show not found text
          document
            .getElementById("cantlogmessageid")
            .classList.remove("hidden");
        }
      });
    }
  });
const checkremember = document.getElementById("remembermeid");
checkremember.addEventListener("click", () => {
  if (checkremember.checked) {
    //remember user password and email
    localStorage.remember = true;
  } else {
    localStorage.remember = false;
  }
});

if (localStorage.remember == "true") {
  //if user click to remember me the remember me input should be chacked
  setremember();
  checkremember.setAttribute("checked", "checked");
}

function setremember() {
  //this function is working when user click on remember me and find user email and password and fills  the inputs
  localStorage.setItem("remember", true);
  const usersave = JSON.parse(localStorage.passemail);
  usersave.map((e) => {
    emailelement.value = e.email;
    passwordelement.value = e.pws;
  });
}

if (localStorage.remember) {
  //when the user click to remember me the sign in button should be anable
  const parseremember = JSON.parse(localStorage.remember);
  if (parseremember == true) {
    document.querySelector(".signinbtn").style.backgroundColor = "#212529";
  }
}
