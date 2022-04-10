// 1- Traer los elementos del HTML que necesito usar en js.

const inputSearch = document.querySelector(".js-searchInput");
const buttonSearch = document.querySelector(".js-button");
function handleClickSearch() {
  const inputValue = inputSearch.value;
}
buttonSearch.addEventListener("click", handleClickSearch);
