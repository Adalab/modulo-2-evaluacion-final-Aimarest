'use strict';
const serverUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const title = document.querySelector('.js-title');
const form = document.querySelector('.js-form');
const searchButton = document.querySelector('.js-button');
const resetButton = document.querySelector('.js-reset');
const searchInput = document.querySelector('.js-searchInput');
const drinkList = document.querySelector('.js-drinkList');

fetch(serverUrl)
.then(function (response) {
  return response.json();
})
.then(function (data) {
    let drinks = JSON.stringify (data.drinks); 
  console.log(data.drinks);
});