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
    {
        propozitii: [
            { text: 'x 1', raspuns: true },
            { text: 'y 2', raspuns: false },
            { text: 'w 3', raspuns: true }
        ]
    },
    {
        propozitii: [
            { text: 'x 1', raspuns: true },
            { text: 'y 2', raspuns: false },
            { text: 'w 3', raspuns: true }
        ]
    },
    {
        propozitii: [
            { text: 'x 1', raspuns: true },
            { text: 'y 2', raspuns: false },
            { text: 'w 3', raspuns: true }
        ]
    },
    {
        propozitii: [
            { text: 'x 1', raspuns: true },
            { text: 'y 2', raspuns: false },
            { text: 'w 3', raspuns: true }
        ]
    },
    {
        propozitii: [
            { text: 'x 1', raspuns: true },
            { text: 'y 2', raspuns: false },
            { text: 'w 3', raspuns: true }
        ]
    },
    {
        propozitii: [
            { text: 'x 1', raspuns: true },
            { text: 'y 2', raspuns: false },
            { text: 'w 3', raspuns: true }
        ]
    },
    {
        propozitii: [
            { text: 'x 1', raspuns: true },
            { text: 'y 2', raspuns: false },
            { text: 'w 3', raspuns: true }
        ]
    },
    {
        propozitii: [
            { text: 'x 1', raspuns: true },
            { text: 'y 2', raspuns: false },
            { text: 'w 3', raspuns: true }
        ]
    },
    {
        propozitii: [
            { text: 'x 1', raspuns: true },
            { text: 'y 2', raspuns: false },
            { text: 'w 3', raspuns: true }
        ]
    }
]
let newArr = [];
let arrCuExercitii = [];
let arrIndex = [];
creareArr();

function creareArr() {
    for (let i = 0; i < 10; i++) {
        let nr;
        let adv = true;
        while (adv) {
            let mem =false;
            nr = Math.floor(Math.random() *  arr.length);
            for (let j = 0; j < arrIndex.length; j++) {
                if(nr===arrIndex[j]){
                    mem=true;
                }
            }
                if ( !mem) {
                    adv = false;
                    console.log(nr);arrIndex.push(nr);
                }
                

        }
        for (let j = 0; j < arr.length; j++) {
            if (nr === j) {
                newArr.push(arr[j]);

            }
        }

    }


    for (let i = 0; i < newArr.length; i++) {
        let nr = Math.floor(Math.random() * 3);
        arrCuExercitii.push(newArr[i].propozitii[nr]);

        console.log('arraiul');
        console.log(newArr[i].propozitii[nr]);
    }
}





let contor = 0;
let contorCorect = 0;
function genereazaHTML() {

    if (contor < 10) {

        document.querySelector('.restart').innerHTML = "";

        document.querySelector('#true').style.display = 'inline-block';
        document.querySelector('#false').style.display = 'inline-block';

        document.querySelector('.nrIntrebare').innerHTML = `Intrebare ${contor + 1}`;
        document.querySelector('.textIntrebare').innerHTML = `${arrCuExercitii[contor].text}`;
        document.querySelector(".scorul").innerHTML = `Scorul ${contorCorect}`;
        document.querySelector(".scorul").style.display = 'block';

    }
    else {

        document.querySelector(".scorul").innerHTML = `Scorul ${contorCorect}`;
        document.querySelector('.textIntrebare').innerHTML =
            `Ai răspuns corect la ${contorCorect} întrebări din 10.`;

        document.querySelector('#true').style.display = 'none';
        document.querySelector('#false').style.display = 'none';

        document.querySelector('.restart').innerHTML = `
            <button class="raspuns mt-2 w-[300px] h-[50px]" id="restart-btn">
                <img class="w-[300px] h-[50px] object-cover rounded-[20px]"
                     src="../../assets/img/true-false-game/image 11.png" alt="">
            </button>
        `;

        document.querySelector('#restart-btn').addEventListener('click', function () {
            restart();
        });
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

document.querySelector('.restart').addEventListener('click', function () {
    restart();
    genereazaHTML();
});

function initializare() {
    genereazaHTML()
}

function restart() {
    contor = 0;
    contorCorect = 0;
    newArr = []
    arrCuExercitii = [];
    creareArr();
    genereazaHTML();
}

initializare();