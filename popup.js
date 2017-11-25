var pro = 0;
var con = 0;
var sum = 0;
var tablink;
var stat = document.cookie;
chrome.tabs.getSelected(null,function(tab) {
    tablink = tab.url;
});

function formatParams( params ){
  return "?" + Object
        .keys(params)
        .map(function(key){
          return key+"="+encodeURIComponent(params[key])
        })
        .join("&")
}

function getStats(){
        var request = new XMLHttpRequest();
        request.open('GET', 'http://10.23.41.199:8081/stats', true);
        var res = {};
        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            res.upv = parseInt(data.up);
            res.dow = parseInt(data.down);
          } else {
            // We reached our target server, but it returned an error

          }
        };

        request.onerror = function() {
          // There was a connection error of some sort
        };

        request.send();

        console.log(res);
        return res;
  }

function sendVote(vote, Url){
        var request = new XMLHttpRequest();

        request.open('GET', 'http://10.23.41.199:8081/vote' + formatParams({link: Url, vote: vote}), false);

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


function bestaetigen() {
   
        var stats = getStats();
        console.log(stats.upv);
        setTimeout(function(){
        if (!(stat === "status=marked")) {
        sendVote(1, tablink);
        sumpro = "Positiv: " + Math.round(stats.upv/(stats.upv + stats.dow) * 100) + "%";
        document.getElementById("sumpro").innerHTML = sumpro;
        sumcon = "Negativ: " + Math.round(stats.dow/(stats.upv + stats.dow) * 100) + "%";
        document.getElementById("sumcon").innerHTML = sumcon;
        document.cookie = "status = marked";
        document.getElementById("confirmButton").setAttribute("disabled", "disabled");
        document.getElementById("reportButton").setAttribute("disabled", "disabled");
    } else {
        sumpro = "Positiv: " + Math.round(stats.upv/(stats.upv + stats.dow) * 100) + "%";
        document.getElementById("sumpro").innerHTML = sumpro;
        sumcon = "Negativ: " + Math.round(stats.dow/(stats.upv + stats.dow) * 100) + "%";
        document.getElementById("sumcon").innerHTML = sumcon;
        document.getElementById("forbidden").removeAttribute("hidden");
        document.getElementById("confirmButton").setAttribute("disabled", "disabled");
        document.getElementById("reportButton").setAttribute("disabled", "disabled");
    }

        },500)
        
}

function report() {
        var stats = getStats();
        setTimeout(function(){
        if (!(stat === "status=marked")) {
        sendVote(0, tablink);
        sumpro = "Positiv: " + Math.round(stats.upv/(stats.upv + stats.dow) * 100) + "%";
        document.getElementById("sumpro").innerHTML = sumpro;
        sumcon = "Negativ: " + Math.round(stats.dow/(stats.upv + stats.dow) * 100) + "%";
        document.getElementById("sumcon").innerHTML = sumcon;
        document.cookie = "status = marked";
        document.getElementById("confirmButton").setAttribute("disabled", "disabled");
        document.getElementById("reportButton").setAttribute("disabled", "disabled");
    } else {
        sumpro = "Positiv: " + Math.round(stats.upv/(stats.upv + stats.dow) * 100) + "%";
        document.getElementById("sumpro").innerHTML = sumpro;
        sumcon = "Negativ: " + Math.round(stats.dow/(stats.upv + stats.dow) * 100) + "%";
        document.getElementById("sumcon").innerHTML = sumcon;
        document.getElementById("forbidden").removeAttribute("hidden");
        document.getElementById("confirmButton").setAttribute("disabled", "disabled");
        document.getElementById("reportButton").setAttribute("disabled", "disabled");
    }
        }, 500)
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