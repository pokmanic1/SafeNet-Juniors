let ArrJocuri = [
    {
        nume: 'Shuffle game',
        descriere: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        incercari: 1,
        media: 30,
        ancora:''
    },
    {
        nume: 'Documentatia Shuffle game',
        descriere: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        incercari: -1,
        media: 0,
        ancora:''
    },
    // --------------------------
    {
        nume: 'True-False game',
        descriere: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        incercari: 2,
        media: 50,
        ancora:''
    },
    {
        nume: 'Documentatia True-False game',
        descriere: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        incercari: -1,
        media: 0,
        ancora:''
    },
    // ---------------------------------
    {
        nume: 'Password game',
        descriere: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        incercari: 4,
        media: 20,
        ancora:''
    },
    {
        nume: 'Documentatia Password game',
        descriere: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        incercari: -1,
        media: 0,
        ancora:''
    },
    // ---------------------------------
    {
        nume: 'Variante Game',
        descriere: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        incercari: 5,
        media: 10,
        ancora:''
    },
    {
        nume: 'Documentatia Variante game',
        descriere: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        incercari: -1,
        media: 0,
        ancora:''
    },
]

let sageata_jos="../assets/img/img-assasment/Sageata_jos.png";
let sageata_stanga="../assets/img/img-assasment/Sageata_stanga.png";

let incercariGeneral=5;
let AssasmentHTML = ``;
ArrJocuri.forEach((item) => {

    if (item.incercari === -1) {
        
        AssasmentHTML+=`<div class="container flex flex-col items-center justify-center mt-[40px]">
            <div class="card-total overflow-hidden relative w-[800px] h-[300px] flex items-center justify-center">


                <!-- --------- -->
                <div
                    class="card-sus w-[800px] h-[80px] bg-[#DADADA] rounded-[30px] absolute top-0 left-0 z-10 flex items-center justify-between px-6" >
                    <div class="icon h-[60%] mt-[11px] w-[50px]"> <img
                            src="../assets/img/img-assasment/Calendar_Check.png" alt=""></div>
                    <div class="text text-black  mt-[23px] text-xl w-[400px] h-[60%]">${item.nume}</div>
                    <button class="sageata h-[60%] mt-[21px] w-[50px] ml-[210px]"><img
                            src=${sageata_stanga} alt=""></div>
                </button>
                <!-- -------- -->
                <div
                    class="card-jos flex overflow-hidden bg-[#EEEEEE] w-[800px] h-[300px] absolute top-0 left-0 z-0 rounded-[30px] p-[30px]" style="display:none">
                    <div class="w-70%">
                        <h2 class="mt-[70px] text-black w-[550px] h-[50px] ">${item.descriere}</h2>
                    </div>
                    <div class="w-[100px] h-[50px] mt-[200px] bg-black ml-[95px] rounded-[30px]">
                        <a class="flex items-center justify-center w-full h-full text-white" href=${item.ancora}>
                            Invata
                        </a>
                    </div>
                </div>
            </div>
        </div>`
    }

    else{
               
        AssasmentHTML+=`<div class="container flex flex-col items-center justify-center mt-[40px]">
            <div class="card-total overflow-hidden relative w-[800px] h-[300px] flex items-center justify-center">


                <!-- --------- -->
                <div
                    class="card-sus w-[800px] h-[80px] bg-[#DADADA] rounded-[30px] absolute top-0 left-0 z-10 flex items-center justify-between px-6">
                    <div class="icon h-[60%] mt-[11px] w-[50px]"> <img
                            src="../assets/img/img-assasment/Calendar_Check.png" alt=""></div>
                    <div class="text text-black  mt-[23px] text-xl w-[400px] h-[60%]">${item.nume}</div>
                    <button class="sageata h-[60%] mt-[21px] w-[50px] ml-[210px]"><img
                            src=${sageata_stanga} alt=""></div>
                </button>
                <!-- -------- -->
                <div
                    class="card-jos flex overflow-hidden bg-[#EEEEEE] w-[800px] h-[300px] absolute top-0 left-0 z-0 rounded-[30px] p-[30px]" style="display:none">
                    <div class="w-70%">
                        <h2 class="mt-[70px] text-black w-[550px] h-[50px] ">${item.descriere}</h2>
                        <h3 class="mt-[85px] text-black w-[200px] h-[30px] ">Reușită: ${item.media}%</h3>
                        <h3 class=" text-black w-[200px] h-[30px] ">Încercări: ${item.incercari}/${incercariGeneral}</h3>
                    </div>
                    <div class="w-[100px] h-[50px] mt-[200px] bg-black ml-[95px] rounded-[30px]">
                        <a class="flex items-center justify-center w-full h-full text-white" href=${item.ancora}>
                            Joaca-te
                        </a>
                    </div>
                </div>
            </div>
        </div>`


    }

})

document.querySelector('.tabele_assasment').innerHTML=AssasmentHTML;


const carduri = document.querySelectorAll('.card-total');
const carduri_jos=document.querySelectorAll('.card-jos')
carduri.forEach((card) => {
    const buton = card.querySelector('.sageata');
    const imagineSageata = buton.querySelector('img');
    const cardJos = card.querySelector('.card-jos');
    const cardTotal = card; 

    buton.addEventListener('click', () => {
        if (imagineSageata.getAttribute('src') === sageata_jos) {
            imagineSageata.setAttribute('src', sageata_stanga);
            cardJos.style.display = 'none';
            cardTotal.style.height = '80px'; 
        } else {
            imagineSageata.setAttribute('src', sageata_jos);
            cardJos.style.display = 'flex';
            cardTotal.style.height = '300px'; 
        }
    });
});