// 1- Traer los elementos del HTML que necesito usar en js.
"use strict";
const inputSearch = document.querySelector(".js-searchInput");
const buttonSearch = document.querySelector(".js-button");
const resetButton = document.querySelector(".js-reset");
const drinksList = document.querySelector(".js-drinkList");
const urlApi = "www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const listOfFavourites = document.querySelector(".js-favourites");
let favourites = [];
//Función manejadora del evento 'click' en el botón de buscar bebidas.

function handleClickSearch() {
  const inputValue = inputSearch.value;
  let allDrinks = [];
  fetch(`https://${urlApi}${inputValue}`)
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
      paintDrinks(wantedDrinks, drinksList);
      // la variable drink contiene el objeto javascript con la informacion para pintar
      for (const drink of wantedDrinks) {
        let classFavorite = "";
        // currentDrink contiene el li al que quiero agregar el evento click
        const currentDrink = document.getElementById(drink.id);
        currentDrink.addEventListener("click", function () {
          //Busco la bebida si está en favoritos, para añadirlo o no:
          const favouriteDrinkIndex = favourites.findIndex(
            (fav) => fav.id === drink.id
          );
          if (favouriteDrinkIndex === -1) {
            //Devuelve -1 porque no lo encontró en el listado, por lo que hago el push para añadirlo.
            favourites.push(drink);
            classFavorite = "Drink__favourite";
          } else {
            favourites.splice(favouriteDrinkIndex, 1); //Busco la posición de la bebida, y lo elimino.
            classFavorite = "";
          }
          paintDrinks(favourites, listOfFavourites);
        });
      }
      addlocalStorage(listOfFavourites);
    });
  // obtenermos lo que hay en el LS
  function addlocalStorage(listOfFavourites) {
    localStorage.setItem("favourites", JSON.stringify(listOfFavourites));
  }
  function getFavourites() {
    let favouriteList = localStorage.getItem("listOfFavourites");
    if (favouriteList == null) {
      listOfFavourites = [];
    } else {
      listOfFavourites = JSON.parse(favouriteList);
    }
    paintDrinks(favourites, listOfFavourites);
  }
  //Creo una función que valga para pintar en una lista del HTML cada objeto de un array como un li.
  function paintDrinks(list, listDOM) {
    let html = "";
    for (const li of list) {
      html += `<li class="drink js-drink" id=${li.id}>`;
      html += `<div class="drink__container">`;
      html += `<h2 class= "drink__title"> ${li.name}</h2>`;
      html += `<img class= "drink__image" src="${li.image}"/>`;
      html += `</div>`;
      html += `</li>`;
    }
    listDOM.innerHTML = html;
  }
}
function resetFilter(event) {
  event.preventDefault();
  drinksList.innerHTML = "";
  inputSearch.value = "";
}

//Eventos:

buttonSearch.addEventListener("click", handleClickSearch);
resetButton.addEventListener("click", resetFilter);
