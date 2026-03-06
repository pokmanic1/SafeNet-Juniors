import { auth, onAuthStateChanged } from "../fierbase/firebase-init.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "../conecteazate.html";
    }
});

let arr = [
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
let intrebareElement = document.querySelector('.intrebarea1');
let varianta1Element = document.querySelector('.varianta1');
let varianta2Element = document.querySelector('.varianta2');
let varianta3Element = document.querySelector('.varianta3');
let varianta4Element = document.querySelector('.varianta4');

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
        } else {
            alert("Greșit! ");
        }
        contor++;
        genereazaHTML();
    });
});