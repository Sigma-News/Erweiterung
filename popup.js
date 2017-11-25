var pro = 0;
var con = 0;
var sum = 0;
var stat = document.cookie;

function bestaetigen() {
    if (!(stat === "status=marked")) {
        pro++;
        sumpro = "Positiv: " + Math.round(pro/(pro + con) * 100) + "%";
        document.getElementById("sumpro").innerHTML = sumpro;
        sumcon = "Negativ: " + Math.round(con/(pro + con) * 100) + "%";
        document.getElementById("sumcon").innerHTML = sumcon;
        document.cookie = "status = marked";
        stat = document.cookie
    } else {
        pro++;
        sumpro = "Positiv: " + Math.round(pro/(pro + con) * 100) + "%";
        document.getElementById("sumpro").innerHTML = sumpro;
        sumcon = "Negativ: " + Math.round(con/(pro + con) * 100) + "%";
        document.getElementById("sumcon").innerHTML = sumcon;
        document.cookie = "status = marked";
        document.getElementById("forbidden").removeAttribute("hidden");
        document.cookie = "status=marked"
    }
}

function report() {
    if (!(stat === "status=marked")) {
        con++;
        sumpro = "Positiv: " + Math.round(pro/(pro + con) * 100) + "%";
        document.getElementById("sumpro").innerHTML = sumpro;
        sumcon = "Positiv: " + Math.round(con/(pro + con) * 100) + "%";
        document.getElementById("sumcon").innerHTML = sumcon;
        document.cookie = "status = marked";
        stat = document.cookie
    } else {
        con++;
        sumpro = "Positiv: " + Math.round(pro/(pro + con) * 100) + "%";
        document.getElementById("sumpro").innerHTML = sumpro;
        sumcon = "Positiv: " + Math.round(con/(pro + con) * 100) + "%";
        document.getElementById("sumcon").innerHTML = sumcon;
        document.cookie = "status = marked";
        stat = document.cookie
        document.getElementById("forbidden").removeAttribute("hidden");
        document.cookie = "status=marked"
    }
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#CookieButton').addEventListener('click', function () {
        document.cookie = "status = not marked";
  });

});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#confirmButton').addEventListener('click', function () {
        bestaetigen();
  });

});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#reportButton').addEventListener('click', function () {
        report();
  });

});