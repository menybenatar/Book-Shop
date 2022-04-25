var gTrans = {
  title: {
    en: "Book Shop",
    es: "Librería",
    he: "חנות ספרים",
  },
  name: {
    en: "Name",
    es: "Nombre",
    he: "שם",
  },
  price: {
    en: "Price",
    es: "Precio",
    he: "מחיר",
  },
  rate: {
    en: "Rate",
    es: "Velocidad",
    he: "דירוג",
  },
  "new-book": {
    en: "Create new book",
    es: "Crear nuevo libro",
    he: "ליצור ספר חדש",
  },

  add: {
    en: "Add",
    es: "Aggregar",
    he: "הוסף",
  },
  cancel: {
    en: "cancel",
    es: "cancelar",
    he: "ביטול",
  },
  id: {
    en: "ID",
    es: "identificación",
    he: "תְעוּדַת זֶהוּת",
  },
  img: {
    en: "Image",
    es: "Imagen",
    he: "תמונה",
  },
  actions: {
    en: "Actions",
    es: "Acciónes",
    he: "פעולות",
  },
  read: {
    en: "Read",
    es: "Leer",
    he: "לקרוא",
  },
  update: {
    en: "Update",
    es: "Actualizar",
    he: "לעדכן",
  },
  remove: {
    en: "Remove",
    es: "Retirar",
    he: "לְהַסִיר",
  },
  close: {
    en: "Close",
    es: "Cerrar",
    he: "סגור",
  },

  sure: {
    en: "Are you sure?",
    es: "Estas Seguru?",
    he: "בטוח נשמה?",
  },
  "update new price:": {
    en: "update new price:",
    es: "Actualizar nuevo precio:",
    he: "עדכן מחיר חדש:",
  },
};

var gCurrLang = "en";

function getTrans(transKey) {
  var keyTrans = gTrans[transKey];
  // TODO: if key is unknown return 'UNKNOWN'
  if (!keyTrans) return "UNKNOWN";
  // TODO: get from gTrans
  var txt = keyTrans[gCurrLang];
  // TODO: If translation not found - use english
  if (!txt) txt = keyTrans.en;
  return txt;
}

function doTrans() {
  // TODO:
  // for each el:
  //    get the data-trans and use getTrans to replace the innerText
  var els = document.querySelectorAll("[data-trans]");
  els.forEach((el) => {
    var nameToTrans = el.dataset.trans;
    //  ITP: support placeholder
    if (el.nodeName === "INPUT") {
      el.placeholder = getTrans(nameToTrans);
    } else {
      el.innerText = getTrans(nameToTrans);
      console.log(el.innerText);
    }
  });
}

function setLang(lang) {
  gCurrLang = lang;
}

function formatNumOlder(num) {
  return num.toLocaleString("es");
}

function formatNum(num) {
  return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(lang, num) {
  var iCurrency = lang === "en" ? "USD" : lang === "es" ? "EUR" : "ILS";

  var options = {
    style: "currency",
    currency: iCurrency,
  };
  return new Intl.NumberFormat(lang, options).format(num);
}

function formatDate(time) {
  var options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
  return km / 1.609;
}
