console.log("halo halo dzień dobry")

const visitsLabel = document.getElementById("visitsCounterDiv")
const clicksLabel = document.getElementById("clicksCounterDiv")

let clicks = 0
let visits = 0
let history = []


window.onload = () => {
    history = JSON.parse(decodeURIComponent(getCookie("history") || "[]"))

    visits = parseInt(getCookie("visits")) || 0
    visits++;

    history.push(0)

    setCookies()
    display()
}


function clicked(){
    clicks++
    history[history.length - 1] = clicks

    setCookies()
    display()

    console.log(clicks)
}

function resetAll(){
    clicks = 0
    visits = 0

    setCookies()
    display()
}

function resetVisits(){
    visits = 0

    setCookies()
    display()
}

function resetClicks(){
    clicks = 0

    setCookies()
    display();
}

function display(){
    visitsLabel.innerHTML = 
    `<h4> Liczba odwiedzin strony:</h4>
    <h5> ${visits} <h5>`

    clicksLabel.innerHTML = 
    `<h4> Liczba kliknięć w tej sesji:</h4>
    <h5> ${clicks} <h5>`

    let list = document.cookie
    console.log(list)
}

function setCookies() {
    const d = new Date();
    d.setTime(d.getTime() + (36000*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();

    document.cookie = "visits=" + visits + ";" + expires + ";path=/";
    document.cookie = "history=" + encodeURIComponent(JSON.stringify(history)) + ";" + expires + ";path=/";
    console.log(document.cookie)
}

function getCookie(cname) {
let name = cname + "=";
let decodedCookie = decodeURIComponent(document.cookie);
let ca = decodedCookie.split(';');
for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
    c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
    return c.substring(name.length, c.length);
    }
}
return "";
}