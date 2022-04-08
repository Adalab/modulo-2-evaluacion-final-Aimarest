"use strict";
const serverUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const title = document.querySelector(".js-title");
const form = document.querySelector(".js-form");
const searchButton = document.querySelector(".js-button");
const resetButton = document.querySelector(".js-reset");
const searchInput = document.querySelector(".js-searchInput");
const drinkList = document.querySelector(".js-drinkList");
let allDrinks = [];

//Funciones:

function renderDrinks() {
  let html = "";
  for (const drink of allDrinks) {
    html += `<li class ="drink js-drink" id=${drink.idDrink}>`;
    html += `<h2>${drink.strDrink}</h2>`;
    html += `<img src="${drink.strDrinkThumb}"/>`;
    html += `</li>`;
  }
  drinkList.innerHTML = html;
}
function filterDrinks() {
  let wantedDrink = searchInput.value;
  fetch(`${serverUrl}${wantedDrink}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      allDrinks = data.drinks;
      console.log(data);
      renderDrinks();
    });
}

function resetFilter(event) {
  event.preventDefault();
  drinkList.innerHTML = "";
  searchInput.value = "";
}
//Eventos:

searchButton.addEventListener("click", filterDrinks);
resetButton.addEventListener("click", resetFilter);
