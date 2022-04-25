"use strict";
const IMG_BOOK = "./img/book.jpg";
const PAGE_SIZE = 4;
var gBooks;
var gPageIdx = 0;
var gSortBy = "NAME";

_creatBooks();

function _creatBook(name, price, url, rate = 0) {
  return {
    id: makeId(),
    price,
    name,
    imgUrl: url,
    description: makeLorem(),
    rate,
  };
}
function _creatBooks() {
  gBooks = _loadFromStorege();
  if (!gBooks || !gBooks.length) {
    var books = [
      _creatBook("Ulysses", 200, "./img/ulysses.jpg"),
      _creatBook("Don Quixote", 320, "./img/Don Quixote.jpg"),
      _creatBook("Moby Dick", 199, "./img/MobyDick.jpg"),
      _creatBook("War and Peace", 290, "./img/WarAndPeace.jpg"),
      _creatBook("Hamlet", 179, "./img/Hamlet.jpg"),
    ];
    gBooks = books;
    _saveBooksToStorage();
  }
  sotrByName();
}
function getBooks() {
  const fromIdx = gPageIdx * PAGE_SIZE;
  var books = gBooks.slice(fromIdx, fromIdx + PAGE_SIZE);
  return books;
}
function nextPage(page) {
  gPageIdx++;
  if (gPageIdx * PAGE_SIZE >= gBooks.length) {
    gPageIdx = 0;
  }
  // gPageIdx = page
}
function changePage(page) {
  gPageIdx = page - 1;
}
function getPageCount() {
  var pageCount = Math.ceil(gBooks.length / PAGE_SIZE);
  return pageCount;
}
function findBookById(bookID) {
  var books = getBooks();
  return books.find((book) => book.id === bookID);
}
function updateCar(bookID, newPrice) {
  var book = findBookById(bookID);
  book.price = newPrice;
  _saveBooksToStorage();
}
function removeBook(bookID) {
  var bookIdx = gBooks.findIndex((book) => book.id === bookID);
  gBooks.splice(bookIdx, 1);
  _saveBooksToStorage();
}
function addBook(name, price) {
  var book = _creatBook(name, price, IMG_BOOK);
  gBooks.push(book);
  _saveBooksToStorage();
}
function updateRate(bookId, rate) {
  var book = findBookById(bookId);
  book.rate = rate;
  _saveBooksToStorage();
}
function _saveBooksToStorage() {
  saveToStorage("bookDB", gBooks);
}
function _loadFromStorege() {
  return loadFromStorage("bookDB");
}
function setSort(sortby) {
  gSortBy = sortby;
}
function sotrByName() {
  gBooks.sort((book1, book2) => {
    let a = book1.name.toLowerCase(),
      b = book2.name.toLowerCase();
    return a < b ? -1 : a > b ? 1 : 0;
  });
  _saveBooksToStorage();
}
function sortByPrice() {
  gBooks.sort((book1, book2) => book1.price - book2.price);
  _saveBooksToStorage();
}
function sortByRate() {
  gBooks.sort((book1, book2) => book2.rate - book1.rate);
  _saveBooksToStorage();
}
