// 1- Traer los elementos del HTML que necesito usar en js.
"use strict";
const inputSearch = document.querySelector(".js-searchInput");
const buttonSearch = document.querySelector(".js-button");
const drinksList = document.querySelector(".js-drinkList");
const urlApi = "https:/www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const favourites = document.querySelector(".js-favourites");

//Función manejadora del evento 'click' en el botón de buscar bebidas.

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
      drinksList.addEventListener("click", makeFavourites);
    });
}
//Creo una función que valga para pintar en una lista del HTML cada objeto de un array como un li.

function paintDrinks(list, listDOM) {
  let html = "";
  for (const li of list) {
    html += `<li class="drink js-drink" id=${li.id}>`;
    html += `<h2 class= "drink__title"> ${li.name}</h2>`;
    html += `<img class= "drink__image" src="${li.image}"/>`;
    html += `</li>`;
  }
  listDOM.innerHTML = html;
}
//Función manejadora del evento de escucha del click en un elemento de la lista:

function makeFavourites(event) {
  console.log("holis caracolis");
  console.log(event.target);
}
//Eventos:

buttonSearch.addEventListener("click", handleClickSearch);
