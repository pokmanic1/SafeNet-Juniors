let arrQuest = [

    {
        img: "assets/img/assasment/quest3.png",
        quest: [
            "Termina jocul password in 20secund -----------------------------------------1e",
            "Termina jocul True False cu 5 incercri -----------------------------------------1",
            "Termina jocul shufle in 2 minute -----------------------------------------1",
            "Termina jocul password nivelul 3 -----------------------------------------1",
        ]
    },

    {
        img: "assets/img/assasment/quest3.png",
        quest: [
            "Termina jocul password in 20secunde---------------------------------2",
            "Termina jocul True False cu 5 incercri---------------------------------2",
            "Termina jocul shufle in 2 minute---------------------------------2",
            "Termina jocul password nivelul 3---------------------------------2",
        ]
    },

    {
        img: "assets/img/assasment/quest3.png",
        quest: [
            "Termina jocul password in 20secunde ----------------------3",
            "Termina jocul True False cu 5 incercri ----------------------3",
            "Termina jocul shufle in 2 minute ----------------------3",
            "Termina jocul password nivelul 3 ----------------------3",
        ]
    }

]

let arrQuest_folosit = []

let nrRandom = Math.floor(Math.random() * arrQuest.length);

console.log(nrRandom);
arrQuest_folosit.push(arrQuest[nrRandom]);
console.log(arrQuest_folosit);


let strQuest = ``;

let i = 0;
arrQuest_folosit.forEach((item) => {

    console.log(item);

    strQuest += `<div class="quest">`;

    item.quest.forEach((q, i) => {

        strQuest += `<h3>${i + 1}. ${q}</h3>`;

    });

    strQuest += `</div>`;

});


document.querySelector(".questuri-side").innerHTML = strQuest;

