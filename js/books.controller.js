"use strict";

function onInit() {
  paginationChanged();
  $(".add-book").hide();
  renderBooks();
  doTrans();
}
function renderBooks(lang = "en") {
  var books = getBooks();
  var strHtml = "";
  strHtml = books.map((book) => {
    return `<tr>
          <td >${book.id}</td>
          <td ><img width="100px" src="${
            book.imgUrl
          }" class="img-fluid img-thumbnail" align="center" class="img-responsive"></td>
          <td>${book.name}</td>
          <td>${formatCurrency(lang, book.price)}</td>
          <td>${book.rate}</td> 

          <td><button onclick="onReadBook('${
            book.id
          }')" type="button" class="btn btn-success" data-trans = "read">${getTrans(
      "read"
    )}</button>
          <button onclick="onUpdateBook('${
            book.id
          }')" type="button"  class="btn btn-warning" data-trans = "update" >${getTrans(
      "update"
    )}</button>
          <button onclick="onRemoveBook('${
            book.id
          }')" type="button" class="btn btn-danger" data-trans = "remove">${getTrans(
      "remove"
    )}</button>
          </td>
        </tr>`;
  });
  document.querySelector("tbody").innerHTML = strHtml.join("");
}

function onReadBook(bookID) {
  var book = findBookById(bookID);
  if (!book) return;
  var $elModal = $(".modal");
  $elModal.children("h3").text(book.name);
  $elModal.children("h6").text(book.price + "$");
  $elModal.children("p").text(book.description);
  $(".modal .close-madal").html(
    `<button onclick="onCloseModal('${book.id}')" data-trans="close">${getTrans(
      "close"
    )}</button>`
  );
  $elModal.show();
  console.dir($elModal);
}
function onCloseModal(bookId) {
  var rate = $("#book-rate").val();
  rate = rate ? rate : 0;
  $("#book-rate").val("");
  if (rate >= 0 && rate <= 10) {
    updateRate(bookId, rate);
    renderBooks();
  }
  $(".modal").hide();
}
function onUpdateBook(bookID) {
  var newPrice = +prompt(getTrans("update new price:"));
  updateCar(bookID, newPrice);
  renderBooks();
}
function onRemoveBook(bookID) {
  removeBook(bookID);
  paginationChanged();
  renderBooks();
}
function onOpenAddtionBook() {
  $(".btn-new-book").hide();
  $(".add-book").show();
}
function onAddBook() {
  var $elName = $("#book-name");
  var $elPrice = $("#book-price");
  if ($elPrice.val() === "" || $elName.val() === "") return;
  $(".btn-new-book").show();
  $(".add-book").hide();
  addBook($elName.val(), $elPrice.val());
  paginationChanged();
  renderBooks();
  $elName.val("");
  $elPrice.val("");
}
function onCancelAddBook() {
  $(".add-book").hide();
  $(".btn-new-book").show();
}
function onNextPage() {
  nextPage();
  renderBooks();
}
function onPlusRate() {
  var rate = +$("#book-rate").val();
  if (rate >= 10) return;
  $("#book-rate").val(rate + 1);
}
function onMinusRate() {
  var rate = +$("#book-rate").val();
  if (rate <= 0) return;
  $("#book-rate").val(rate - 1);
}
function onSetSort(sotrBy) {
  console.log("sorting By:", sotrBy);
  // var books = _loadFromStorege();
  setSort(sotrBy);
  if (sotrBy === "NAME") sotrByName();
  else if (sotrBy === "PRICE") sortByPrice();
  else sortByRate();
  renderBooks();
  // saveToStorage();
}
function onChangePage(page) {
  changePage(page);
  renderBooks();
}
function paginationChanged() {
  var elContainer = document.querySelector(".page-pagination-container");
  var pageCount = getPageCount();
  var strHtmls = "";
  for (var i = 1; i <= pageCount; i++) {
    strHtmls += `<button class="m-1 btn btn-primary page${i}" onclick="onChangePage(${i})">${i}</button>`;
  }
  elContainer.innerHTML = strHtmls;
}
function onSetLang(lang) {
  setLang(lang);
  var $elBody = $(".body");
  if (lang === "he") {
    $elBody.add(".rtl");
  } else {
    $elBody.remove(".rtl");
  }
  doTrans();
  renderBooks(lang);
}
