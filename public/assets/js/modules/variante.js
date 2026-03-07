import { auth, onAuthStateChanged } from "../fierbase/firebase-init.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "../conecteazate.html";
    }
});

let arr1 = [
    {
        intrebare: "intrebare1",
        variante: [
            { varianta: "varianta1", raspuns: false },
            { varianta: "varianta2", raspuns: true },
            { varianta: "varianta3", raspuns: false },
            { varianta: "varianta4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare2",
        variante: [
            { varianta: "varianta1", raspuns: false },
            { varianta: "varianta2", raspuns: true },
            { varianta: "varianta3", raspuns: false },
            { varianta: "varianta4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare3",
        variante: [
            { varianta: "varianta1", raspuns: false },
            { varianta: "varianta2", raspuns: true },
            { varianta: "varianta3", raspuns: false },
            { varianta: "varianta4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare4",
        variante: [
            { varianta: "varianta1", raspuns: false },
            { varianta: "varianta2", raspuns: true },
            { varianta: "varianta3", raspuns: false },
            { varianta: "varianta4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare5",
        variante: [
            { varianta: "varianta1", raspuns: false },
            { varianta: "varianta2", raspuns: true },
            { varianta: "varianta3", raspuns: false },
            { varianta: "varianta4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare6",
        variante: [
            { varianta: "varianta1", raspuns: false },
            { varianta: "varianta2", raspuns: true },
            { varianta: "varianta3", raspuns: false },
            { varianta: "varianta4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare7",
        variante: [
            { varianta: "varianta1", raspuns: false },
            { varianta: "varianta2", raspuns: true },
            { varianta: "varianta3", raspuns: false },
            { varianta: "varianta4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare8",
        variante: [
            { varianta: "varianta1", raspuns: false },
            { varianta: "varianta2", raspuns: true },
            { varianta: "varianta3", raspuns: false },
            { varianta: "varianta4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare9",
        variante: [
            { varianta: "varianta1", raspuns: false },
            { varianta: "varianta2", raspuns: true },
            { varianta: "varianta3", raspuns: false },
            { varianta: "varianta4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare19",
        variante: [
            { varianta: "varianta1", raspuns: false },
            { varianta: "varianta2", raspuns: true },
            { varianta: "varianta3", raspuns: false },
            { varianta: "varianta4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare11",
        variante: [
            { varianta: "varianta1", raspuns: false },
            { varianta: "varianta2", raspuns: true },
            { varianta: "varianta3", raspuns: false },
            { varianta: "varianta4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare12",
        variante: [
            { varianta: "varianta1", raspuns: false },
            { varianta: "varianta2", raspuns: true },
            { varianta: "varianta3", raspuns: false },
            { varianta: "varianta4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare13",
        variante: [
            { varianta: "varianta1", raspuns: false },
            { varianta: "varianta2", raspuns: true },
            { varianta: "varianta3", raspuns: false },
            { varianta: "varianta4", raspuns: false },
        ]
    },
];
let arr2 = [
    {
        intrebare: "intrebare1-2",
        variante: [
            { varianta: "varianta1-2", raspuns: false },
            { varianta: "varianta2-2", raspuns: true },
            { varianta: "varianta3-2", raspuns: false },
            { varianta: "varianta4-2", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare2-2",
        variante: [
            { varianta: "varianta1-2", raspuns: false },
            { varianta: "varianta2-2", raspuns: true },
            { varianta: "varianta3-2", raspuns: false },
            { varianta: "varianta4-2", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare3-2",
        variante: [
            { varianta: "varianta1-2", raspuns: false },
            { varianta: "varianta2-2", raspuns: true },
            { varianta: "varianta3-2", raspuns: false },
            { varianta: "varianta4-2", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare4",
        variante: [
            { varianta: "varianta1-2", raspuns: false },
            { varianta: "varianta2-2", raspuns: true },
            { varianta: "varianta3-2", raspuns: false },
            { varianta: "varianta4-2", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare5-2",
        variante: [
            { varianta: "varianta1-2", raspuns: false },
            { varianta: "varianta2-2", raspuns: true },
            { varianta: "varianta3-2", raspuns: false },
            { varianta: "varianta4-2", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare6-2",
        variante: [
            { varianta: "varianta1-2", raspuns: false },
            { varianta: "varianta2-2", raspuns: true },
            { varianta: "varianta3-2", raspuns: false },
            { varianta: "varianta4-2", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare7-2",
        variante: [
            { varianta: "varianta1-2", raspuns: false },
            { varianta: "varianta2-2", raspuns: true },
            { varianta: "varianta3-2", raspuns: false },
            { varianta: "varianta4-2", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare8-2",
        variante: [
            { varianta: "varianta1-2", raspuns: false },
            { varianta: "varianta2-2", raspuns: true },
            { varianta: "varianta3-2", raspuns: false },
            { varianta: "varianta4-2", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare9-2",
        variante: [
            { varianta: "varianta1-2", raspuns: false },
            { varianta: "varianta2-2", raspuns: true },
            { varianta: "varianta3-2", raspuns: false },
            { varianta: "varianta4-2", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare19-2",
        variante: [
            { varianta: "varianta1-2", raspuns: false },
            { varianta: "varianta2-2", raspuns: true },
            { varianta: "varianta3-2", raspuns: false },
            { varianta: "varianta4-2", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare11-2",
        variante: [
            { varianta: "varianta1-2", raspuns: false },
            { varianta: "varianta2-2", raspuns: true },
            { varianta: "varianta3-2", raspuns: false },
            { varianta: "varianta4-2", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare12-2",
        variante: [
            { varianta: "varianta1-2", raspuns: false },
            { varianta: "varianta2-2", raspuns: true },
            { varianta: "varianta3-2", raspuns: false },
            { varianta: "varianta4-2", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare13-2",
        variante: [
            { varianta: "varianta1-2", raspuns: false },
            { varianta: "varianta2-2", raspuns: true },
            { varianta: "varianta3-2", raspuns: false },
            { varianta: "varianta4-2", raspuns: false },
        ]
    },
];
let arr3 = [
    {
        intrebare: "intrebare1-3",
        variante: [
            { varianta: "varianta1-3", raspuns: false },
            { varianta: "varianta2-3", raspuns: true },
            { varianta: "varianta3-3", raspuns: false },
            { varianta: "varianta4-3", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare2-3",
        variante: [
            { varianta: "varianta1-3", raspuns: false },
            { varianta: "varianta2-3", raspuns: true },
            { varianta: "varianta3-3", raspuns: false },
            { varianta: "varianta4-3", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare3-3",
        variante: [
            { varianta: "varianta1-3", raspuns: false },
            { varianta: "varianta2-3", raspuns: true },
            { varianta: "varianta3-3", raspuns: false },
            { varianta: "varianta4-3", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare4",
        variante: [
            { varianta: "varianta1-3", raspuns: false },
            { varianta: "varianta2-3", raspuns: true },
            { varianta: "varianta3-3", raspuns: false },
            { varianta: "varianta4-3", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare5-3",
        variante: [
            { varianta: "varianta1-3", raspuns: false },
            { varianta: "varianta2-3", raspuns: true },
            { varianta: "varianta3-3", raspuns: false },
            { varianta: "varianta4-3", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare6-3",
        variante: [
            { varianta: "varianta1-3", raspuns: false },
            { varianta: "varianta2-3", raspuns: true },
            { varianta: "varianta3-3", raspuns: false },
            { varianta: "varianta4-3", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare7-3",
        variante: [
            { varianta: "varianta1-3", raspuns: false },
            { varianta: "varianta2-3", raspuns: true },
            { varianta: "varianta3-3", raspuns: false },
            { varianta: "varianta4-3", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare8-3",
        variante: [
            { varianta: "varianta1-3", raspuns: false },
            { varianta: "varianta2-3", raspuns: true },
            { varianta: "varianta3-3", raspuns: false },
            { varianta: "varianta4-3", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare9-3",
        variante: [
            { varianta: "varianta1-3", raspuns: false },
            { varianta: "varianta2-3", raspuns: true },
            { varianta: "varianta3-3", raspuns: false },
            { varianta: "varianta4-3", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare19-3",
        variante: [
            { varianta: "varianta1-3", raspuns: false },
            { varianta: "varianta2-3", raspuns: true },
            { varianta: "varianta3-3", raspuns: false },
            { varianta: "varianta4-3", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare11-3",
        variante: [
            { varianta: "varianta1-3", raspuns: false },
            { varianta: "varianta2-3", raspuns: true },
            { varianta: "varianta3-3", raspuns: false },
            { varianta: "varianta4-3", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare12-3",
        variante: [
            { varianta: "varianta1-3", raspuns: false },
            { varianta: "varianta2-3", raspuns: true },
            { varianta: "varianta3-3", raspuns: false },
            { varianta: "varianta4-3", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare13-3",
        variante: [
            { varianta: "varianta1-3", raspuns: false },
            { varianta: "varianta2-3", raspuns: true },
            { varianta: "varianta3-3", raspuns: false },
            { varianta: "varianta4-3", raspuns: false },
        ]
    },
];
let arr4 = [
    {
        intrebare: "intrebare1-4",
        variante: [
            { varianta: "varianta1-4", raspuns: false },
            { varianta: "varianta2-4", raspuns: true },
            { varianta: "varianta3-4", raspuns: false },
            { varianta: "varianta4-4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare2-4",
        variante: [
            { varianta: "varianta1-4", raspuns: false },
            { varianta: "varianta2-4", raspuns: true },
            { varianta: "varianta3-4", raspuns: false },
            { varianta: "varianta4-4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare3-4",
        variante: [
            { varianta: "varianta1-4", raspuns: false },
            { varianta: "varianta2-4", raspuns: true },
            { varianta: "varianta3-4", raspuns: false },
            { varianta: "varianta4-4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare4",
        variante: [
            { varianta: "varianta1-4", raspuns: false },
            { varianta: "varianta2-4", raspuns: true },
            { varianta: "varianta3-4", raspuns: false },
            { varianta: "varianta4-4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare5-4",
        variante: [
            { varianta: "varianta1-4", raspuns: false },
            { varianta: "varianta2-4", raspuns: true },
            { varianta: "varianta3-4", raspuns: false },
            { varianta: "varianta4-4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare6-4",
        variante: [
            { varianta: "varianta1-4", raspuns: false },
            { varianta: "varianta2-4", raspuns: true },
            { varianta: "varianta3-4", raspuns: false },
            { varianta: "varianta4-4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare7-4",
        variante: [
            { varianta: "varianta1-4", raspuns: false },
            { varianta: "varianta2-4", raspuns: true },
            { varianta: "varianta3-4", raspuns: false },
            { varianta: "varianta4-4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare8-4",
        variante: [
            { varianta: "varianta1-4", raspuns: false },
            { varianta: "varianta2-4", raspuns: true },
            { varianta: "varianta3-4", raspuns: false },
            { varianta: "varianta4-4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare9-4",
        variante: [
            { varianta: "varianta1-4", raspuns: false },
            { varianta: "varianta2-4", raspuns: true },
            { varianta: "varianta3-4", raspuns: false },
            { varianta: "varianta4-4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare19-4",
        variante: [
            { varianta: "varianta1-4", raspuns: false },
            { varianta: "varianta2-4", raspuns: true },
            { varianta: "varianta3-4", raspuns: false },
            { varianta: "varianta4-4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare11-4",
        variante: [
            { varianta: "varianta1-4", raspuns: false },
            { varianta: "varianta2-4", raspuns: true },
            { varianta: "varianta3-4", raspuns: false },
            { varianta: "varianta4-4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare12-4",
        variante: [
            { varianta: "varianta1-4", raspuns: false },
            { varianta: "varianta2-4", raspuns: true },
            { varianta: "varianta3-4", raspuns: false },
            { varianta: "varianta4-4", raspuns: false },
        ]
    },
    {
        intrebare: "intrebare13-4",
        variante: [
            { varianta: "varianta1-4", raspuns: false },
            { varianta: "varianta2-4", raspuns: true },
            { varianta: "varianta3-4", raspuns: false },
            { varianta: "varianta4-4", raspuns: false },
        ]
    },
];

const selectNivel = document.querySelector(".nivelul");
let nivelul = 1;
selectNivel.addEventListener('change', (event) => {
    nivelul = event.target.value;
    if (nivelul == 1) {
        arr = arr1;
        console.log("nivelul a fost schimbat");

    } else if (nivelul == 2) {
        arr = arr2;
                console.log("nivelul a fost schimbat");

    } else if (nivelul == 3) {
        arr = arr3;        console.log("nivelul a fost schimbat");

    } else if (nivelul == 4) {
        arr = arr4;        console.log("nivelul a fost schimbat");

    }
    restart()

});




let intrebareElement = document.querySelector('.intrebarea1');
let varianta1Element = document.querySelector('.varianta1');
let varianta2Element = document.querySelector('.varianta2');
let varianta3Element = document.querySelector('.varianta3');
let varianta4Element = document.querySelector('.varianta4');

let textIntrebare=document.querySelector('.textIntrebare');
let textScoar=document.querySelector('.textScoar');
let contorScor=0;
let butonRestart=document.querySelector('.butonRestart');


let arr=[...arr1];
let newArr = [];
let arrCuExercitii = [];
let arrIndex = [];
createArr();

function createArr() {
    for (let i = 0; i < 10; i++) {
        let nr;
        let adv = true;
        while (adv) {
            let mem = false;
            nr = Math.floor(Math.random() * arr.length);
            for (let j = 0; j < arrIndex.length; j++) {
                if (nr === arrIndex[j]) {
                    mem = true;
                }
            }
            if (!mem) {
                adv = false;
                arrIndex.push(nr);
            }
        }

        newArr.push(arr[nr]);
    }


}
console.log(newArr);
let contor = 0;
function genereazaHTML() {
    if (contor < newArr.length) {

        let itemCurent = newArr[contor];
        intrebareElement.innerHTML = itemCurent.intrebare;
        varianta1Element.innerHTML = itemCurent.variante[0].varianta;
        varianta2Element.innerHTML = itemCurent.variante[1].varianta;
        varianta3Element.innerHTML = itemCurent.variante[2].varianta;
        varianta4Element.innerHTML = itemCurent.variante[3].varianta;
        textIntrebare.innerHTML=contor;
        textScoar.innerHTML=contorScor;
    } else {
        alert("Testul s-a terminat!");
    }
}
genereazaHTML();

let butoane = document.querySelectorAll('.butonVariante');

butoane.forEach((buton, index) => {  
    buton.addEventListener('click', () => {
        let intrebareCurenta = newArr[contor];

        if (intrebareCurenta.variante[index].raspuns === true) {
            alert("Corect! ");
            contorScor++;
        } else {
            alert("Greșit! ");
        }
        contor++;
        genereazaHTML();
    });
});

butonRestart.addEventListener('click',()=>{
    newArr = [];
 arrCuExercitii = [];
arrIndex = [];
contor=0;
contorScor=0;
createArr();
genereazaHTML();
})


