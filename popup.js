var HOST = "localhost";
var pro = 0;
var con = 0;
var sum = 0;
var tablink;
var cook = document.cookie;
chrome.tabs.getSelected(null, function(tab) {
    tablink = tab.url;
});
var ctx = document.getElementById('chart').getContext('2d');
Chart.defaults.global.title.display = false;
Chart.defaults.global.defaultFontColor = "#fff";
// Formatiere die Parameter zu GET-fähigen Parametern
function formatParams(params) {
    return "?" + Object
        .keys(params)
        .map(function(key) {
            return key + "=" + encodeURIComponent(params[key])
        })
        .join("&")
}

// Cookies aus dem Zwischenspeicher mit ihrem Namen holen
function getCookie(name) {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? value[1] : null;
}

// get Statistics for the page
function getStats() {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:8081/stats', true);
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
    // send Voting Request
function sendVote(vote, Url) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:8081/vote' + formatParams({
        link: Url,
        vote: vote
    }), true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {} else {
            // We reached our target server, but it returned an error
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
    };
    request.send();

}

// Function for sending the upvote (sorry for function name, not my fault)
function bestaetigen() {
        if (!(getCookie("lastPage") === tablink)) {
            document.cookie = "status=unmarked";
            document.cookie = "lastPage=" + tablink;
        }
        var stats = getStats();
        setTimeout(function() {
            if (!(getCookie("status") === "marked")) {

                sendVote(1, tablink);
                var myBarChart = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: ["Positiv", "Negativ"],
                        datasets: [{
                            label: "Abstimmung",
                            backgroundColor: ['#ECF0F1', '#2C3E50'],

                            data: [35, 70]
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                ticks: {
                                    min: 0,
                                    steps: 10,
                                    stepValue: 10,
                                    max: 100
                                },

                            }],

                        },
                        legend: {
                            display: false
                        }
                    }
                });
                // fading the 1. background, 2. Blockquote, 3. Warning
                stats.upv < stats.dow ? document.body.classList.add("redC") : document.body.classList.add("greenC");
                stats.upv < stats.dow ? null : document.querySelector('blockquote').classList.add("blockquote_a");
                stats.upv < stats.dow ?document.querySelector('#forbidden').classList.add("forbiddenR") : null;   
                document.cookie = "status = marked;"
                document.getElementById("confirmButton").setAttribute("disabled", "disabled");
                document.getElementById("reportButton").setAttribute("disabled", "disabled");
            } else {
                var myBarChart = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: ["Positiv", "Negativ"],
                        datasets: [{
                            label: "Abstimmung",
                            backgroundColor: ['#ECF0F1', '#2C3E50'],
                            data: [35, 70]
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                ticks: {
                                    min: 0,
                                    steps: 10,
                                    stepValue: 10,
                                    max: 100
                                },

                            }],

                        },
                        legend: {
                            display: false
                        }
                    }
                });
               // fading the 1. background, 2. Blockquote, 3. Warning
                stats.upv < stats.dow ? document.body.classList.add("redC") : document.body.classList.add("greenC");
                stats.upv < stats.dow ? null : document.querySelector('blockquote').classList.add("blockquote_a");
                stats.upv < stats.dow ?document.querySelector('#forbidden').classList.add("forbiddenR") : null;      
                document.getElementById("forbidden").removeAttribute("hidden");
                document.getElementById("confirmButton").setAttribute("disabled", "disabled");
                document.getElementById("reportButton").setAttribute("disabled", "disabled");
            }

        }, 500);

    }
    // Function for sending the downvote (sorry for function name, not my fault)
function report() {
    if (!(getCookie("lastPage") === tablink)) {
        document.cookie = "status=unmarked";
        document.cookie = "lastPage=" + tablink;
        cook = document.cookie;
    }
    var stats = getStats();
    setTimeout(function() {
        if (!(getCookie("status") === "marked")) {
            sendVote(0, tablink);
            var myBarChart = new Chart(ctx, {
                type: 'horizontalBar',
                data: {
                    labels: ["Positiv", "Negativ"],
                    datasets: [{
                        label: "Abstimmung",
                         backgroundColor: ['#ECF0F1', '#2C3E50'],
                        data: [35, 70]
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            ticks: {
                                min: 0,
                                steps: 10,
                                stepValue: 10,
                                max: 100
                            },

                        }],

                    },
                    legend: {
                        display: false
                    }
                }
            });
            // fading the 1. background, 2. Blockquote, 3. Warning
            stats.upv < stats.dow ? document.body.classList.add("redC") : document.body.classList.add("greenC");
            stats.upv < stats.dow ? null : document.querySelector('blockquote').classList.add("blockquote_a");
            stats.upv < stats.dow ?document.querySelector('#forbidden').classList.add("forbiddenR") : null;   
            document.cookie = "status = marked;"
            document.getElementById("confirmButton").setAttribute("disabled", "disabled");
            document.getElementById("reportButton").setAttribute("disabled", "disabled");
        } else {

            var myBarChart = new Chart(ctx, {
                type: 'horizontalBar',
                data: {
                    labels: ["Positiv", "Negativ"],
                    datasets: [{
                        label: "Abstimmung",
                        backgroundColor: ['#ECF0F1', '#2C3E50'],
                        data: [35, 70]
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            ticks: {
                                min: 0,
                                steps: 10,
                                stepValue: 10,
                                max: 100
                            },

                        }],

                    },
                    legend: {
                        display: false
                    }
                }
            });
            // fading the 1. background, 2. Blockquote, 3. Warning
            stats.upv < stats.dow ? document.body.classList.add("redC") : document.body.classList.add("greenC");
            stats.upv < stats.dow ? null : document.querySelector('blockquote').classList.add("blockquote_a");
            stats.upv < stats.dow ?document.querySelector('#forbidden').classList.add("forbiddenR") : null;   
            document.getElementById("forbidden").removeAttribute("hidden");
            document.getElementById("confirmButton").setAttribute("disabled", "disabled");
            document.getElementById("reportButton").setAttribute("disabled", "disabled");
        }
    }, 500)
}




document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#CookieButton').addEventListener('click', function() {});

});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#confirmButton').addEventListener('click', function() {
        bestaetigen();
    });

});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#reportButton').addEventListener('click', function() {
        report();
    });

});