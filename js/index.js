// index.html

function load(url, cb) {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      cb(this);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

load("./products.json", demoCallback);

function demoCallback(xhr) {
  const products = JSON.parse(xhr.responseText);

  let item = products.items;
  let output1 = "";
  for (let i = 0; i < item.length; i++) {
    output1 +=
      "<div id='card' class='card' style='width: 12rem;'>" +
      "<img src=" +
      item[i].bild +
      ">" +
      "<div class='card-body' style='padding: 5px !important;'>" +
      "<h5 id='title' class='card-title'>" +
      item[i].title +
      "</h5>" +
      "<h6 class='card-text card-content'>" +
      item[i].beskrivning +
      "</h6>" +
      "<h6 id='pris' class='card-text'>" +
      item[i].pris +
      "</h6>" +
      "<a href='./index.html' class='index btn btn-primary'><div><i class='fa fa-shopping-basket'></i></div>&nbsp;Buy</a></div></div>";
  }
  document.getElementById("container1").innerHTML = output1;

  let a = document.getElementsByClassName("index");

  for (let i = 0; i < item.length; i++) {
    a[i].addEventListener("click", function() {
      localStorage.setItem("orderItem" + i, JSON.stringify(item[i]));
      antalProdukter();
    });
  }
}

// beräkna antal produkter i varukorgen
function antalProdukter() {
  let antal = 0;
  let x;
  Object.keys(localStorage).forEach(function(key) {
    let obj3 = JSON.parse(localStorage.getItem(`${key}`));
    x = parseInt(obj3.antal);
    antal += x;
  });
  document.getElementById("antal-produkter").innerHTML = antal;
}

antalProdukter();


