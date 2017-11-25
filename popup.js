var pro = 0;
var con = 0;
var sum = 0;
var stat = document.cookie;

document.cookie = "status = not marked";

function bestaetigen() {
    if (!(stat === "status=marked")) {
        pro++;
        sumpro = Math.round(pro/(pro + con) * 100) + "%";
        document.getElementById("sumpro").innerHTML = sumpro;
        sumcon = Math.round(con/(pro + con) * 100) + "%";
        document.getElementById("sumcon").innerHTML = sumcon;
        document.cookie = "status = marked";
        stat = document.cookie
    } else {
        document.write("Du hast diese/n News/Post schon bewertet!");
    }
}

function report() {
    if (!(stat === "status=marked")) {
        con++;
        sumpro = Math.round(pro/(pro + con) * 100) + "%";
        document.getElementById("sumpro").innerHTML = sumpro;
        sumcon = Math.round(con/(pro + con) * 100) + "%";
        document.getElementById("sumcon").innerHTML = sumcon;
        document.cookie = "status = marked";
        stat = document.cookie
    } else {
        document.write("Du hast diese/n News/Post schon bewertet!");
    }
}