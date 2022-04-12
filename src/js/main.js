// 1- Traer los elementos del HTML que necesito usar en js.
"use strict";
const inputSearch = document.querySelector(".js-searchInput");
const buttonSearch = document.querySelector(".js-button");
const resetButton = document.querySelector(".js-reset");
const drinksList = document.querySelector(".js-drinkList");
const urlApi = "www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const header = document.querySelector(".js-title");
const listOfFavourites = document.querySelector(".js-favourites");
let favourites = [];
let classFavorite = "";
const buttonNumFav = document.querySelector(".js-numFav");
//Función manejadora del evento 'click' en el botón de buscar bebidas.
function handleClickSearch() {
  const inputValue = inputSearch.value;
  let allDrinks = [];
  fetch(`https://${urlApi}${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.drinks === null) {
        drinksList.innerHTML = `<p class=error> Oups! No existen bebidas con tu búsqueda</p>`;
        return;
      }
      allDrinks = data.drinks;
      //Creo un array que contenga los objetos solo con las propiedades que necesito(nombre,imagen,id)
      const wantedDrinks = allDrinks.map((drink) => {
        const wDrinks = {
          name: drink.strDrink,
          id: drink.idDrink,
          image: drink.strDrinkThumb,
          ingredient1: drink.strIngredient1,
          ingredient2: drink.strIngredient2,
          ingredient3: drink.strIngredient3,
          ingredient4: drink.strIngredient4,
        };
        return wDrinks;
      });
      paintDrinks(wantedDrinks, drinksList, false);
      // la variable drink contiene el objeto javascript con la informacion para pintar
      for (const drink of wantedDrinks) {
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
            currentDrink.classList.add("Drink__favourite");
          } else {
            //Busco la posición de la bebida, y lo elimino.
            fav(ourites.splice(favouriteDrinkIndex, 1);
            currentDrink.classList.remove("Drink__favourite");
          }
          paintDrinks(favourites, listOfFavourites, true);
          // paintDrinks(wantedDrinks, drinksList, false);
          localStorage.setItem("favourites", JSON.stringify(favourites));
        });
      }

      const savedDrinks = JSON.parse(localStorage.getItem("favourites"));
    });
  //Creo una función que valga para pintar en una lista del HTML cada objeto de un array como un li.
  function paintDrinks(list, listDOM, itsFavourite) {
    let html = "";
    let index = 0;
    for (const li of list) {
      let printedID = itsFavourite ? "" : "id=" + li.id;
      const classFavorite = itsFavourite ? "Drink__favourite" : "";

      html += `<li class="drink js-drink ${classFavorite}" ${printedID}>`;
      html += `<div class="drink__container">`;
      html += `<h2 class= "drink__title"> ${li.name}</h2>`;
      if (itsFavourite) {
        html += `<button class= "drink__action" id="fav-${index}"> Eliminar </button>`;
      }
      html += `<img class= "drink__image" src="${li.image}"/>`;
      if (itsFavourite === false) {
        html += `<p> Ingredientes: ${li.ingredient1} ${li.ingredient2} ${li.ingredient3}</p>`;
        if (li.ingredient4 !== null) {
          html += `<p> ${li.ingredient4}`;
        }
      }
      html += `</div>`;
      html += `</li>`;
      index++;
    }
    listDOM.innerHTML = html;
    if (itsFavourite) {
      for (let i = 0; i < index; i++) {
        // agregamos el evento click a cada botón por el id creado
        document.getElementById("fav-" + i).addEventListener("click", () => {
          // Al eliminar un elemento, splice me devuelve los elementos eliminados, sólo 1 en este caso, por eso accedemos a la posición 0
          const currentDrinkRemove = favourites.splice(i, 1);
          // Buscamos el elemento por su id y repintamos la lista de favoritos
          document
            .getElementById(currentDrinkRemove[0].id)
            .classList.remove("Drink__favourite");
          paintDrinks(favourites, listOfFavourites, true);
        });
      }
    }
  }
}
// Obtengo lo que hay en el LS
const coctelStorage = JSON.parse(localStorage.getItem("favourites"));
localStorage.setItem("favourites", JSON.stringify(listOfFavourites));

function resetFilter(event) {
  event.preventDefault();
  drinksList.innerHTML = "";
  inputSearch.value = "";
  listOfFavourites.innerHTML = "";
  favourites = [];
  window.localStorage.clear();
}
function paintNumFav(event) {
  event.preventDefault();
  console.log(favourites.length);
}
//Eventos:

buttonSearch.addEventListener("click", handleClickSearch);
resetButton.addEventListener("click", resetFilter);
buttonNumFav.addEventListener("click", paintNumFav);
