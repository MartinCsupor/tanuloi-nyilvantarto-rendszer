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


function modositas() {
    
}

function torles(index){
 //A táblázat minden sorában legyen egy:Törlés gomb. A kiválasztott tanulót távolítsa el a tömbből és a táblázatból.
 tanulo.splice(index, 1);
    
    megjelenitTablazat();
}

function kereses(){

}

function statisztikak(){

}

function JegyStatisztika(){

}
function megjelenitTablazat() {
    const tableBody = document.getElementById("tableBody");
    tableBody.replaceChildren();

    tanulo.forEach((diak, index) => {
        const row = document.createElement("tr");

        [diak.nev, diak.osztaly, diak.atlag].forEach((ertek) => {
            const cell = document.createElement("td");
            cell.className = "px-4 py-3";
            cell.textContent = ertek;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        actionCell.className = "px-4 py-3";

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "rounded-lg bg-red-600 px-3 py-1 font-medium text-white transition hover:bg-red-700";
        deleteButton.textContent = "Törlés";
        
        
        deleteButton.addEventListener("click", () => {
            torles(index,1);
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
    });
}
megjelenitTablazat();