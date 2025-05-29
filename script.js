console.log("halo halo dzień dobry")

const visitsLabel = document.getElementById("visitsCounterDiv")
const clicksLabel = document.getElementById("clicksCounterDiv")
const historyTable = document.querySelector("#historyListDiv table")

let clicks = 0
let visits = 0
let history = []
let dates = []

window.onload = () => {
    history = JSON.parse(decodeURIComponent(getCookie("history") || "[]"))
    dates = JSON.parse(decodeURIComponent(getCookie("dates") || "[]"))

    visits = parseInt(getCookie("visits")) || 0
    visits++

    // Dodajemy nową wizytę z 0 kliknięciami i aktualną datą
    history.push(0)
    dates.push(new Date().toLocaleString())

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
    history = []
    dates = []

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
    history[history.length - 1] = 0
    setCookies()
    display()
}

// Reset wszystkich kliknięć w historii (czyli czyścimy tablicę kliknięć i dat)
function resetAllClicks(){
    clicks = 0
    history = []
    dates = []
    setCookies()
    display()
}

function display(){
    visitsLabel.innerHTML = 
    `<h4> Liczba odwiedzin strony:</h4>
    <h5> ${visits} </h5>`

    clicksLabel.innerHTML = 
    `<h4> Liczba kliknięć w tej sesji:</h4>
    <h5> ${clicks} </h5>`

    // Czyścimy stare wiersze w tabeli (poza nagłówkiem)
    while(historyTable.rows.length > 1){
        historyTable.deleteRow(1)
    }

    // Dodajemy wiersze do tabeli
    for(let i=0; i < history.length; i++){
        let row = historyTable.insertRow(-1) // wstawiamy na koniec
        let cellVisit = row.insertCell(0)
        let cellDate = row.insertCell(1)
        let cellClicks = row.insertCell(2)

        cellVisit.textContent = i + 1
        cellDate.textContent = dates[i] || "brak daty"
        cellClicks.textContent = history[i]
    }

    console.log("Cookies:", document.cookie)
}

function setCookies() {
    const d = new Date();
    d.setTime(d.getTime() + (36000*24*60*60*1000)); // 36000 dni
    let expires = "expires="+ d.toUTCString();

    document.cookie = "visits=" + visits + ";" + expires + ";path=/";
    document.cookie = "history=" + encodeURIComponent(JSON.stringify(history)) + ";" + expires + ";path=/";
    document.cookie = "dates=" + encodeURIComponent(JSON.stringify(dates)) + ";" + expires + ";path=/";

    console.log(document.cookie)
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
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