let tanulo=[{
    nev:"Kiss Anna",
    osztaly:"12.A",
    atlag:4.7
    },
{
    nev:"Takács István",
    osztaly:"11.C",
    atlag:3.8
},
{
    nev:"Tóth László",
    osztaly:"11.E",
    atlag:4.8
},
{
    nev:"Farkas Mária",
    osztaly:"10.B",
    atlag:2.1

},
{
    nev:"Rostás Albert",
    osztaly:"9.D",
    atlag:1.2
}]

const szovegRegex = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ ]+$/;
const osztalyRegex = /^\d+\.[A-Z]$/;
const atlagRegex = /^[1-5](?:[,.]\d+)?$/;

function formtorles() {
    document.getElementById("formHiba").textContent = "";
    document.getElementById("nevInput").value = "";
    document.getElementById("osztalyInput").value = "";
    document.getElementById("atlagInput").value = "";
}

function modositas(e) {
    e.preventDefault();

    let formHiba = document.getElementById("formHiba");
    let nevInput = document.getElementById("nevInput").value;
    nevInput = nevInput.trim();

    let osztalyInput = document.getElementById("osztalyInput").value;
    let atlagInput = document.getElementById("atlagInput").value;

    try {
        if (nevInput.length == 0) {
            throw new Error("Nem lehet üres a név mező");
        } else if (!szovegRegex.test(nevInput)) {
            throw new Error("A név csak magyar betűket és szóközt tartalmazhat");
        }

        if (osztalyInput.length == 0) {
            throw new Error("Nem lehet üres az osztály mező");
        } else if (!osztalyRegex.test(osztalyInput)) {
            throw new Error("Nem megfelelő osztály");
        }

        if (atlagInput.length == 0) {
            throw new Error("Nem lehet üres az átlag mező");
        } else if (!atlagRegex.test(atlagInput)) {
            throw new Error("Az átlag 1 és 5 közötti szám kell legyen");
        }

        formHiba.textContent = "";

        tanulo.push({nevInput, osztalyInput, atlagInput})
        console.log(tanulo)

    } catch (err) {
        formHiba.textContent = err.message;
    }
}

function torles(){

}

function kereses(){

}

function statisztikak(){

}

function JegyStatisztika(){

}
