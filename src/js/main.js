// 1- Traer los elementos del HTML que necesito usar en js.
"use strict";
const inputSearch = document.querySelector(".js-searchInput");
const buttonSearch = document.querySelector(".js-button");
const drinksList = document.querySelector(".js-drinkList");
const urlApi = "https:/www.thecocktaildb.com/api/json/v1/1/search.php?s=";
function handleClickSearch() {
  const inputValue = inputSearch.value;
  let allDrinks = [];
  fetch(`${urlApi}${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      allDrinks = data.drinks;
      console.log(allDrinks);
    });
}
buttonSearch.addEventListener("click", handleClickSearch);
