var pro = 0;
var con = 0;
var sum = 0;
var stat = document.cookie;

function getStats(){
        var request = new XMLHttpRequest();
        request.open('GET', 'http://10.23.41.199:8081/stats', true);

        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            console.log(data.Message);
          } else {
            // We reached our target server, but it returned an error

          }
        };

        request.onerror = function() {
          // There was a connection error of some sort
        };

        request.send();

  }


getStats();

function bestaetigen() {
    if (!(stat === "status=marked")) {
 
        pro++;
        sumpro = "Positiv: " + Math.round(pro/(pro + con) * 100) + "%";
        document.getElementById("sumpro").innerHTML = sumpro;
        sumcon = "Negativ: " + Math.round(con/(pro + con) * 100) + "%";
        document.getElementById("sumcon").innerHTML = sumcon;
        document.cookie = "status = marked";
    } else {
        pro++;
        sumpro = "Positiv: " + Math.round(pro/(pro + con) * 100) + "%";
        document.getElementById("sumpro").innerHTML = sumpro;
        sumcon = "Negativ: " + Math.round(con/(pro + con) * 100) + "%";
        document.getElementById("sumcon").innerHTML = sumcon;
        document.getElementById("forbidden").removeAttribute("hidden");
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
       stat = "status=marked";
    } else {
        con++;
        sumpro = "Positiv: " + Math.round(pro/(pro + con) * 100) + "%";
        document.getElementById("sumpro").innerHTML = sumpro;
        sumcon = "Positiv: " + Math.round(con/(pro + con) * 100) + "%";
        document.getElementById("sumcon").innerHTML = sumcon;
        document.getElementById("forbidden").removeAttribute("hidden");
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