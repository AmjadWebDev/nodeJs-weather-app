const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const firstMsg = document.querySelector("#msg-1");
const secMsg = document.querySelector("#msg-2");
const errorMsg = document.querySelector("#error");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  firstMsg.textContent = "Loading...";
  secMsg.textContent = "";

  fetch(`/weather?city=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        firstMsg.textContent = data.error;
      } else {
        firstMsg.textContent = data.location;
        secMsg.textContent = data.forecast;
      }
    });
  });
});
