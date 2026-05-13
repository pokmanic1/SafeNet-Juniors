let arrQuest = [
    [
        {
            quest1: "Termina jocul password in 20secunde",
            quest2: "Termina jocul True False cu 5 incercri",
            quest3: "Termina jocul shufle in 2 minute",
            quest4: "Termina jocul password nivelul 3",
        }
    ],
    [
        {
            quest1: "Termina jocul password in 20secunde",
            quest2: "Termina jocul True False cu 5 incercri",
            quest3: "Termina jocul shufle in 2 minute",
            quest4: "Termina jocul password nivelul 3",
        }
    ],
    [
        {
            quest1: "Termina jocul password in 20secunde",
            quest2: "Termina jocul True False cu 5 incercri",
            quest3: "Termina jocul shufle in 2 minute",
            quest4: "Termina jocul password nivelul 3",
        }
    ]
]

let arrQuest_folosit = []
let nrRandom = Math.floor(Math.random() * arrQuest.length);
console.log(nrRandom);
arrQuest_folosit.push(arrQuest[nrRandom]);
console.log(arrQuest_folosit);
arrQuest_folosit.forEach(item => {
    console.log(item);
})

