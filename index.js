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
let modositandoIndex = null;

const szovegRegex = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ ]+$/;
const osztalyRegex = /^(?:[1-9]|1[0-4])\.[A-Z]$/;
const atlagRegex = /^(?:[1-4](?:[,.]\d)?|5(?:[,.]0)?)$/;

function formtorles() {
    document.getElementById("formInfo").textContent = "";
    document.getElementById("nevInput").value = "";
    document.getElementById("osztalyInput").value = "";
    document.getElementById("atlagInput").value = "";
}

function modositas(e) {
    e.preventDefault();

    let formInfo = document.getElementById("formInfo");
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

        formInfo.className = "text-green-500 text-center"
        formInfo.textContent = "Sikeres felvétel";

        setTimeout(() => {
            formInfo.textContent = ""
        }, 3000);
        
        if (modositandoIndex != null){
            tanulo[modositandoIndex] = {nev: nevInput, osztaly: osztalyInput,atlag: atlagInput}
            modositandoIndex = null
        } else {
            tanulo.push({nev: nevInput, osztaly: osztalyInput,atlag: atlagInput})
        }
        
    } catch (err) {
        formInfo.className = "text-red-500 text-center"
        formInfo.textContent = err.message;
    }
    JegyStatisztika()
    megjelenitTablazat()
}

function torles(index){
 //A táblázat minden sorában legyen egy:Törlés gomb. A kiválasztott tanulót távolítsa el a tömbből és a táblázatból.
 tanulo.splice(index, 1);
    
    megjelenitTablazat();
    JegyStatisztika();
}

function kereses() {
    let keresesInput = document.getElementById("keresesInput");
    let keresesOutput = document.getElementById("keresesOutput");

    keresesInput.addEventListener("input", () => {
        let keresett = keresesInput.value;
        keresett = keresett.toLowerCase();
        
        let talaltak = tanulo.filter((diak) =>
            diak.nev.toLowerCase().includes(keresett)
        );

        keresesOutput.textContent = "";

        if (keresett === "") {
            keresesOutput.textContent = "";
            return;
        }
        
        if (talaltak.length > 0) {
            talaltak.forEach((diak) => {
                keresesOutput.innerHTML+= `${diak.nev}</br>`;
            });
        } else {
            keresesOutput.textContent = "Nincs ilyen tanuló.";
        }
    });
}


function statisztikak() {
    // 1. Összes tanuló száma
    let tanulokSzamaElem = document.getElementById("tanulokSzama");
    tanulokSzamaElem.textContent = `Tanulók száma: ${tanulo.length}`;

    // Ha nincsenek tanulók, kezeljük le alapértelmezett értékekkel
    if (tanulo.length === 0) {
        document.getElementById("osztalyAtlag").textContent = "Osztályátlag: Nincs adat";
        document.getElementById("legjobbTanulo").textContent = "Legjobb tanuló: Nincs adat";
        return;
    }

    // 2. Osztályonkénti átlagok kiszámítása
    let osztalyAdatok = {};
    tanulo.forEach((diak) => {
        if (!osztalyAdatok[diak.osztaly]) {
            osztalyAdatok[diak.osztaly] = { osszeg: 0, darab: 0 };
        }
        osztalyAdatok[diak.osztaly].osszeg += parseFloat(diak.atlag);
        osztalyAdatok[diak.osztaly].darab++;
    });

    let osztalyAtlagSzoveg = Object.entries(osztalyAdatok)
        .map(([osztaly, adatok]) => {
            let atlag = (adatok.osszeg / adatok.darab).toFixed(2);
            return `${osztaly}: ${atlag}`;
        })
        .join(" | ");

    document.getElementById("osztalyAtlag").textContent = `Osztályátlagok: ${osztalyAtlagSzoveg}`;

    // 3. Legjobb tanuló az egész iskolából
    let legjobb = tanulo.reduce((maxDiak, JelenlegiDiak) => {
        return parseFloat(JelenlegiDiak.atlag) > parseFloat(maxDiak.atlag) ? JelenlegiDiak : maxDiak;
    }, tanulo[0]);

    document.getElementById("legjobbTanulo").textContent = `Legjobb tanuló: ${legjobb.nev} (${legjobb.osztaly} - ${legjobb.atlag})`;
    
}


function JegyStatisztika(){
    const jeles = document.getElementById("jeles")
    const jo = document.getElementById("jo")
    const kozepes = document.getElementById("kozepes")
    const elegseges = document.getElementById("elegseges")
    const elegtelen = document.getElementById("elegtelen")

    let jelesek = 0 ;
    let jok = 0;
    let kozepesek = 0;
    let elegsegesek =0;
    let elegtelenek = 0;

    tanulo.forEach(tan => {
         if (tan.atlag >= 4.5) {
            jelesek++;
        } else if (tan.atlag >= 3.5) {
            jok++;
        } else if (tan.atlag >= 2.5) {
            kozepesek++;
        } else if (tan.atlag >= 2) {
            elegsegesek++;
        } else {
            elegtelenek++;
        }
    })

    jeles.textContent = jelesek
    jo.textContent = jok
    kozepes.textContent = kozepesek
    elegseges.textContent = elegsegesek
    elegtelen.textContent = elegtelenek
}

function megjelenitTablazat(adatLista = tanulo) {
    const tableBody = document.getElementById("tableBody");
    tableBody.replaceChildren();

    adatLista.forEach((diak) => {
        
        const eredetiIndex = tanulo.indexOf(diak);

        const row = document.createElement("tr");

        [diak.nev, diak.osztaly, diak.atlag].forEach((ertek) => {
            const cell = document.createElement("td");
            cell.className = "px-4 py-3";
            cell.textContent = ertek;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        actionCell.className = "px-4 py-3";

        const modositButton = document.createElement("button");
        modositButton.type = "button";
        modositButton.className = "rounded-lg bg-blue-600 px-3 py-1 font-medium text-white transition hover:bg-blue-700 mr-3 mb-1";
        modositButton.textContent = "Módosítás";

        modositButton.addEventListener("click", () => {
            document.getElementById("nevInput").value = diak.nev;
            document.getElementById("osztalyInput").value = diak.osztaly;
            document.getElementById("atlagInput").value = diak.atlag;
            modositandoIndex = eredetiIndex; 
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "rounded-lg bg-red-600 px-3 py-1 font-medium text-white transition hover:bg-red-700";
        deleteButton.textContent = "Törlés";
        
        deleteButton.addEventListener("click", () => {
            torles(eredetiIndex); 
        });

        actionCell.appendChild(modositButton);
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
    });

    statisztikak();
     JegyStatisztika();
}

function atlagCsokkeno() {
    tanulo.sort((a, b) => parseFloat(b.atlag) - parseFloat(a.atlag));
    megjelenitTablazat(); 
}

function rendezesABC() {
    tanulo.sort((a, b) => a.nev.localeCompare(b.nev));
    megjelenitTablazat(); 
}


function csakKituno() {
    
    const kitunoTanulok = tanulo.filter(tan => parseFloat(tan.atlag) >= 4.5);
    
     megjelenitTablazat(kitunoTanulok);
}

function kiemeles() {
    const tableRows = document.querySelectorAll("#tableBody tr");
    
    tableRows.forEach((row, index) => {
        let atlag = parseFloat(tanulo[index].atlag);
        
        
        row.classList.remove("bg-green-100", "bg-red-100");
        
        
        if (atlag >= 4.5) {
            row.classList.add("bg-green-100");
        } 
       
        else if (atlag < 2.0) {
            row.classList.add("bg-red-100");
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    megjelenitTablazat();
    kereses();
    JegyStatisztika(); 
    statisztikak();
});;