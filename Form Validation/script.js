"use strict";
const form = document.getElementById("form");
const password1El = document.getElementById("password");
const password2El = document.getElementById("password2");
const messageContainer = document.querySelector(".message-container");
const message = document.getElementById("message");
const webUrl = document.getElementById("website-url");

let isValid = false;
let passwordMatch = false;

function validateForm() {
  // using Contraint API
  isValid = form.checkValidity();
  if (!isValid) {
    message.textContent = "Please fill out all field";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
  }
  if (password1El.value === password2El.value) {
    passwordMatch = true;
    message.style.color = "green";
    messageContainer.style.borderColor = "green";
    message.textContent = "Register succeed";
    password1El.style.borderColor = "green";
    password2El.style.borderColor = "green";
  } else {
    message.textContent = "please make sure password is match";
    message.style.color = "red";
    messageContainer.style.borderColor = "red";
    messageContainer.style.borderColor = "red";
    password1El.style.borderColor = "red";
    password2El.style.borderColor = "red";
  }
}
function addText() {
    webUrl.value = "https://";
  }

function formValidData(e) {
  e.preventDefault();
  validateForm();
}
//let textUrl = false;

// Form Validation
form.addEventListener("submit", formValidData);
/////


webUrl.addEventListener("click", addText);
