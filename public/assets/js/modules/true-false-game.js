let arr = [
    {
        propozitii: [
            { text: 'hariu', raspuns: true },
            { text: 'b', raspuns: false },
            { text: 'c', raspuns: true }
        ]
    },
    {
        propozitii: [
            { text: 'd', raspuns: true },
            { text: 'e', raspuns: false },
            { text: 'f', raspuns: true }
        ]
    },
    {
        propozitii: [
            { text: 'g', raspuns: true },
            { text: 'h', raspuns: false },
            { text: 'i ', raspuns: true }
        ]
    },
    {
        propozitii: [
            { text: 'j ', raspuns: true },
            { text: 'k', raspuns: false },
            { text: 'l', raspuns: true }
        ]
    },
    {
        propozitii: [
            { text: 'm', raspuns: true },
            { text: 'n 2', raspuns: false },
            { text: 'o 3', raspuns: true }
        ]
    },
    {
        propozitii: [
            { text: 'p 1', raspuns: true },
            { text: 'q 2', raspuns: false },
            { text: 'r 3', raspuns: true }
        ]
    },
    {
        propozitii: [
            { text: 's 1', raspuns: true },
            { text: 't 2', raspuns: false },
            { text: 'z 3', raspuns: true }
        ]
    },
    {
        propozitii: [
            { text: 'x 1', raspuns: true },
            { text: 'y 2', raspuns: false },
            { text: 'w 3', raspuns: true }
        ]
    },
]
let newArr = [];
for (let i = 0; i < 10; i++) {
    let nr;
    let adv = true;
    while (adv) {
        nr = Math.floor(Math.random() * 100);
        if (nr < arr.length) {
            adv = false;
        }
    }
    for (let j = 0; j < arr.length; j++) {
        if (nr === j) {
            newArr.push(arr[j]);
        }
    }

}

let arrCuExercitii = [];
for (let i = 0; i < newArr.length; i++) {
    let nr = Math.floor(Math.random() * 3);
    arrCuExercitii.push(newArr[i].propozitii[nr]);
}


console.log(arrCuExercitii);


let contor = 0;
let contorCorect = 0;
function genereazaHTML() {
    if (contor < 10)    {
    let nrIntrebare = `Intrebare ${contor +1}`;
     let intrebare = arrCuExercitii[contor].text;
    
    document.querySelector('.nrIntrebare').innerHTML=`Intrebare ${contor +1}`;
    document.querySelector('.textIntrebare').innerHTML=`${arrCuExercitii[contor].text}`;
    }
    else {
        document.querySelector('.nrIntrebare').innerHTML=`Felicitări! Ai terminat jocul!`;
        document.querySelector('.textIntrebare').innerHTML=`Ai răspuns corect la ${contorCorect} întrebări din 10.`;
        document.querySelector('#true').style.display = 'none';
        document.querySelector('#false').style.display = 'none';
    }

}

function dacaECorect(raspunsUtilizator) {
    {
        if (raspunsUtilizator === arrCuExercitii[contor].raspuns) {
            contorCorect++;
        }
        else {
            contorCorect = contorCorect;
        }
        contor++;
    }
}

document.querySelector('#true').addEventListener('click', function () {
    dacaECorect(true);
    genereazaHTML();
});

document.querySelector('#false').addEventListener('click', function () {
    dacaECorect(false);
    genereazaHTML();
});



function initializare(){
    genereazaHTML()
}

initializare();