"use strict";

// console.log("Running");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch("http://localhost:3000/weather?address=manila").then((response) => {
//   response.json().then((address) => {
//     if (address.error) {
//       console.log(address.error);
//     }

//     console.log(address.location);
//     console.log(address.forecast);
//   });
// });

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = searchElement.value;

  messageOne.textContent = "Searching...";
  messageTwo.textContent = " ";
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((address) => {
      if (address.error) {
        console.log(address.error);
        return (messageOne.textContent = `ERROR: ${address.error}`);
      }

      messageOne.textContent = `LOCATION: ${address.location}`;
      messageTwo.textContent = `FORECAST: ${address.forecast}`;
      console.log(address.location);
      console.log(address.forecast);
    });
  });
});
