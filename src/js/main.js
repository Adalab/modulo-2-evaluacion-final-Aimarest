"use strict";
const serverUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const title = document.querySelector(".js-title");
const form = document.querySelector(".js-form");
const searchButton = document.querySelector(".js-button");
const resetButton = document.querySelector(".js-reset");
const searchInput = document.querySelector(".js-searchInput");
const drinkList = document.querySelector(".js-drinkList");
const favouritesList = document.querySelector(".js-favourites");
let allDrinks = [];
let favourites = [];

//Funciones:

function renderDrinks(list, drinks) {
  let html = "";
  for (const drink of drinks) {
    html += `<li class ="drink js-drink" id=${drink.idDrink}>`;
    html += `<h2>${drink.strDrink}</h2>`;
    html += `<img src="${drink.strDrinkThumb}"/>`;
    html += `</li>`;
  }
  list.innerHTML = html;
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
      renderDrinks(drinkList, allDrinks);
      for (const drink of allDrinks) {
        const currentDrink = document.getElementById(drink.idDrink);
        currentDrink.addEventListener("click", function () {
          renderFavouriteDrink(currentDrink);
        });
      }
    });
}

function resetFilter(event) {
  event.preventDefault();
  drinkList.innerHTML = "";
  searchInput.value = "";
}
function renderFavouriteDrink(currentDrink) {
  console.log(currentDrink);
  renderDrinks();
}
//Busco la bebida si está en favoritos, para añadirlo o no:

const favouriteDrinkIndex = favourites.findIndex((fav) => {
  return fav === currentDrink;
});
if (favouriteDrinkIndex === -1) {
  //Devuelve -1 porque no lo encontró en el listado, por lo que hago el push para añadirlo.
  favourites.push(currentDrink);
} else {
  favourites.splice(favouriteDrinkIndex, 1); //Busco la posición de la bebida, y lo elimino.
}
searchButton.addEventListener("click", filterDrinks);
resetButton.addEventListener("click", resetFilter);

//Eventos:
