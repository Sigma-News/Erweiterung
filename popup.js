var pro = 15;
var con = 4;
var sum = 0;

function bestaetigen() {
    pro++;
    sum = Math.round(pro/(pro+con)*100) + '%';
    document.getElementById("sum").innerHTML = sum;
}
function report() {
    con++;    
    sum = Math.round(pro/(pro+con)*100) + '%';
    document.getElementById("sum").innerHTML = sum;
}

sum = Math.round(pro/(pro+con)*100) + '%';
//document.getElementById("sum").innerHTML = sum;

