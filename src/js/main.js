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
      //Creo un array que contenga los objetos solo con las propiedades que necesito(nombre,imagen,id)
      const wantedDrinks = allDrinks.map((drink) => {
        const wDrinks = {
          name: drink.strDrink,
          id: drink.idDrink,
          image: drink.strDrinkThumb,
        };
        return wDrinks;
      });
      console.log(wantedDrinks);
      paintDrinks(wantedDrinks, drinksList);
    });
}
function paintDrinks(list, listDOM) {
  console.log("holis");
  // listDOM.innerHTML = ;
}

buttonSearch.addEventListener("click", handleClickSearch);
